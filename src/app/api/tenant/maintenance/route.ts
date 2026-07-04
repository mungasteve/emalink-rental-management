import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const maintenanceSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(10).max(2000),
  propertyId: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "EMERGENCY"]).optional(),
});

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!["TENANT", "ADMIN", "MANAGER"].includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const tenant = await prisma.tenant.findUnique({
    where: { userId: session.user.id },
  });

  if (!tenant && session.user.role === "TENANT") {
    return NextResponse.json({ error: "Tenant profile not found" }, { status: 404 });
  }

  // Tenant only sees their own requests
  const requests = await prisma.maintenance.findMany({
    where: {
      tenantId: session.user.role === "TENANT" ? tenant!.id : undefined,
    },
    orderBy: { createdAt: "desc" },
    include: {
      property: { select: { title: true, location: true } },
    },
  });

  return NextResponse.json({ requests });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "TENANT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tenant = await prisma.tenant.findUnique({
    where: { userId: session.user.id },
  });

  if (!tenant) {
    return NextResponse.json({ error: "Tenant profile not found" }, { status: 404 });
  }

  const body = await request.json();
  const parsed = maintenanceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  // Verify tenant has a lease on this property
  const lease = await prisma.lease.findFirst({
    where: {
      tenantId: tenant.id,
      unit: { propertyId: parsed.data.propertyId },
      status: "ACTIVE",
    },
  });

  if (!lease) {
    return NextResponse.json(
      { error: "You don't have an active lease on this property" },
      { status: 403 }
    );
  }

  const maintenance = await prisma.maintenance.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      propertyId: parsed.data.propertyId,
      tenantId: tenant.id,
      priority: parsed.data.priority || "MEDIUM",
    },
  });

  return NextResponse.json({ maintenance }, { status: 201 });
}
