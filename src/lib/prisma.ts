import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Global reference to prevent multiple instances in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

/**
 * Create a secure Prisma client with:
 * - Connection pooling
 * - SSL/TLS encryption
 * - Proper error handling
 * - Retry logic
 * - Connection timeout
 */
function createPrismaClient() {
  // Validate DATABASE_URL exists
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL environment variable is not set. Please configure your database connection."
    );
  }

  // Create connection pool with security and reliability settings
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Connection pool settings
    max: process.env.NODE_ENV === "production" ? 20 : 5, // More connections in production
    min: process.env.NODE_ENV === "production" ? 5 : 2,
    idleTimeoutMillis: 30000, // Close idle connections after 30s
    connectionTimeoutMillis: 10000, // Timeout after 10s if can't connect
    // SSL/TLS settings for secure connections
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: true } // Strict SSL in production
        : false, // Allow self-signed certs in development
    // Connection validation
    statement_timeout: 30000, // 30s query timeout
    application_name: "emalink-app",
  });

  // Handle pool errors
  pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
  });

  pool.on("connect", () => {
    console.log("[DB] New connection established");
  });

  pool.on("remove", () => {
    console.log("[DB] Connection removed from pool");
  });

  // Create Prisma adapter with the pool
  const adapter = new PrismaPg(pool);

  // Create Prisma client with error handling
  const client = new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

  // Handle Prisma errors
  client.$on("error", (e) => {
    console.error("[Prisma Error]", e);
  });

  // Graceful shutdown
  process.on("SIGTERM", async () => {
    console.log("[DB] SIGTERM received, closing database connection...");
    await client.$disconnect();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    console.log("[DB] SIGINT received, closing database connection...");
    await client.$disconnect();
    process.exit(0);
  });

  return client;
}

// Create or reuse existing client
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Only store in global in development to prevent multiple instances
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Utility function to test database connection
 * Use this to verify connection on startup
 */
export async function testDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("[DB] ✓ Database connection successful");
    return true;
  } catch (error) {
    console.error("[DB] ✗ Database connection failed:", error);
    return false;
  }
}

/**
 * Utility function to safely disconnect
 * Call this during graceful shutdown
 */
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log("[DB] ✓ Database disconnected successfully");
  } catch (error) {
    console.error("[DB] ✗ Error disconnecting database:", error);
  }
}

/**
 * Utility function for retry logic
 * Retries a database operation with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      console.warn(
        `[DB] Attempt ${attempt}/${maxRetries} failed: ${lastError.message}`
      );

      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = delayMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(
    `Database operation failed after ${maxRetries} attempts: ${lastError?.message}`
  );
}
