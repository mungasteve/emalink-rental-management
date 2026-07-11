import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/health/db
 * Check database connection and health status
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Test basic connection
    await prisma.$queryRaw`SELECT 1`;
    const connectionTime = Date.now() - startTime;

    // 2. Test a simple query
    const queryStart = Date.now();
    const leadCount = await prisma.lead.count();
    const queryTime = Date.now() - queryStart;

    // 3. Return health status
    return NextResponse.json(
      {
        status: "healthy",
        database: {
          connected: true,
          connectionTime: `${connectionTime}ms`,
          queryTime: `${queryTime}ms`,
          leadCount,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Health Check] Database error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        status: "unhealthy",
        database: {
          connected: false,
          error: errorMessage,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
