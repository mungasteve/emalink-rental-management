/**
 * Database Initialization & Verification
 * Run this on app startup to ensure database is ready
 */

import { prisma, testDatabaseConnection } from "@/lib/prisma";

export async function initializeDatabase() {
  console.log("[DB] Initializing database...");

  try {
    // 1. Test connection
    console.log("[DB] Testing connection...");
    const connected = await testDatabaseConnection();

    if (!connected) {
      throw new Error("Failed to connect to database");
    }

    // 2. Verify tables exist
    console.log("[DB] Verifying tables...");
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    if (!Array.isArray(tables) || tables.length === 0) {
      throw new Error("No tables found. Run migrations first: npx prisma migrate deploy");
    }

    console.log(`[DB] ✓ Found ${tables.length} tables`);

    // 3. Check critical tables
    const criticalTables = ["User", "Lead", "Property"];
    const tableNames = (tables as any[]).map((t) => t.table_name);

    for (const table of criticalTables) {
      if (!tableNames.includes(table)) {
        throw new Error(`Critical table missing: ${table}`);
      }
    }

    console.log("[DB] ✓ All critical tables present");

    // 4. Test write operation
    console.log("[DB] Testing write operation...");
    const testLead = await prisma.lead.create({
      data: {
        name: "Database Test",
        email: `test-${Date.now()}@emalink.local`,
        source: "system_test",
        notes: "Automatic database initialization test",
      },
    });

    console.log(`[DB] ✓ Write test successful (ID: ${testLead.id})`);

    // 5. Clean up test data
    await prisma.lead.delete({
      where: { id: testLead.id },
    });

    console.log("[DB] ✓ Cleanup successful");

    // 6. Get database stats
    const leadCount = await prisma.lead.count();
    const userCount = await prisma.user.count();
    const propertyCount = await prisma.property.count();

    console.log("[DB] ✓ Database Statistics:");
    console.log(`    - Leads: ${leadCount}`);
    console.log(`    - Users: ${userCount}`);
    console.log(`    - Properties: ${propertyCount}`);

    console.log("[DB] ✓ Database initialization complete!");
    return true;
  } catch (error) {
    console.error("[DB] ✗ Database initialization failed:");
    console.error(error);
    return false;
  }
}

/**
 * Health check function
 * Returns database status
 */
export async function getDatabaseHealth() {
  try {
    const startTime = Date.now();

    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    const connectionTime = Date.now() - startTime;

    // Get stats
    const leadCount = await prisma.lead.count();
    const userCount = await prisma.user.count();

    return {
      status: "healthy",
      connectionTime,
      leadCount,
      userCount,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Graceful shutdown
 * Call this when app is shutting down
 */
export async function shutdownDatabase() {
  console.log("[DB] Shutting down database connection...");
  try {
    await prisma.$disconnect();
    console.log("[DB] ✓ Database disconnected successfully");
  } catch (error) {
    console.error("[DB] ✗ Error during shutdown:", error);
  }
}
