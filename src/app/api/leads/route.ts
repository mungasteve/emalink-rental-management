import { NextRequest, NextResponse } from "next/server";
import { prisma, withRetry } from "@/lib/prisma";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

// Validation schema
const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.string().email("Invalid email address").toLowerCase(),
  phone: z.string().optional(),
  source: z.string().optional().default("contact_form"),
  message: z.string().min(5, "Message must be at least 5 characters").trim(),
});

export const dynamic = "force-dynamic";

/**
 * POST /api/leads
 * Create a new lead from contact form, property inquiry, or other sources
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // 2. Check rate limit (5 requests per hour per IP)
    const { success, remaining } = rateLimit(ip, 5, 3600000);
    if (!success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: 3600,
        },
        { status: 429, headers: { "Retry-After": "3600" } }
      );
    }

    // 3. Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // 4. Validate data against schema
    const validation = leadSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 5. Create lead with retry logic
    const lead = await withRetry(
      async () => {
        return await prisma.lead.create({
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            source: data.source,
            notes: data.message,
            status: "new",
          },
          select: {
            id: true,
            email: true,
            createdAt: true,
          },
        });
      },
      3, // Max 3 retries
      1000 // Start with 1s delay
    );

    // 6. Log successful creation
    console.log(`[Lead] Created: ${lead.id} from ${data.source}`);

    // 7. Return success response
    return NextResponse.json(
      {
        success: true,
        id: lead.id,
        message: "Lead created successfully",
        email: lead.email,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle specific error types
    if (error instanceof z.ZodError) {
      console.error("[Lead] Validation error:", error.issues);
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      // Check for specific database errors
      if (error.message.includes("Unique constraint failed")) {
        console.warn("[Lead] Duplicate email:", error.message);
        return NextResponse.json(
          { error: "This email has already been submitted" },
          { status: 409 }
        );
      }

      if (error.message.includes("connection")) {
        console.error("[Lead] Database connection error:", error.message);
        return NextResponse.json(
          {
            error: "Database connection failed. Please try again later.",
          },
          { status: 503 }
        );
      }

      if (error.message.includes("timeout")) {
        console.error("[Lead] Database timeout:", error.message);
        return NextResponse.json(
          {
            error: "Request timeout. Please try again.",
          },
          { status: 504 }
        );
      }

      console.error("[Lead] Error:", error.message);
    }

    // Generic error response
    return NextResponse.json(
      {
        error: "Failed to create lead. Please try again later.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leads
 * Retrieve leads (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Proper auth check via session
    const { auth: getSession } = await import("@/lib/auth");
    const session = await getSession();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const source = searchParams.get("source");

    // Build query
    const where = source ? { source } : {};

    // Fetch leads with retry
    const leads = await withRetry(
      async () => {
        return await prisma.lead.findMany({
          where,
          take: limit,
          skip: offset,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            source: true,
            status: true,
            createdAt: true,
          },
        });
      },
      3,
      1000
    );

    // Get total count
    const total = await withRetry(
      async () => {
        return await prisma.lead.count({ where });
      },
      3,
      1000
    );

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("[Lead] GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
