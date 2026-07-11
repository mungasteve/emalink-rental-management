import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

let prismaInstance: PrismaClient | null = null;

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    // Return a no-op client during build
    return {
      $queryRaw: async () => null,
      $disconnect: async () => {},
      $on: () => {},
      user: { findMany: async () => [], findUnique: async () => null, update: async () => null },
      property: { findMany: async () => [], findUnique: async () => null },
      unit: { findMany: async () => [], findUnique: async () => null },
      lead: { create: async () => null, findMany: async () => [] },
      tenant: { findMany: async () => [], findUnique: async () => null },
      owner: { findMany: async () => [], findUnique: async () => null },
      lease: { findMany: async () => [], findUnique: async () => null },
      payment: { findMany: async () => [], findUnique: async () => null },
      maintenance: { findMany: async () => [], findUnique: async () => null },
    } as unknown as PrismaClient;
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: process.env.NODE_ENV === "production" ? 20 : 5,
    min: process.env.NODE_ENV === "production" ? 5 : 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: true }
        : false,
    statement_timeout: 30000,
    application_name: "emalink-app",
  });

  pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
  });

  const adapter = new PrismaPg(pool);

  const client = new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

  client.$on("error", (e) => {
    console.error("[Prisma Error]", e);
  });

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

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

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

export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log("[DB] ✓ Database disconnected successfully");
  } catch (error) {
    console.error("[DB] ✗ Error disconnecting database:", error);
  }
}

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
        const delay = delayMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(
    `Database operation failed after ${maxRetries} attempts: ${lastError?.message}`
  );
}
