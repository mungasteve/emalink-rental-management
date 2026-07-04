import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only TENANT, ADMIN, MANAGER can access
  if (!["TENANT", "ADMIN", "MANAGER"].includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Tenant can only see their own payments
  const tenant = await prisma.tenant.findUnique({
    where: { userId: session.user.id },
  });

  if (!tenant && session.user.role === "TENANT") {
    return NextResponse.json({ error: "Tenant profile not found" }, { status: 404 });
  }

  const payments = await prisma.payment.findMany({
    where: {
      tenantId: session.user.role === "TENANT" ? tenant!.id : undefined,
    },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      lease: {
        include: { unit: { include: { property: { select: { title: true } } } } },
      },
    },
  });

  return NextResponse.json({ payments });
}
