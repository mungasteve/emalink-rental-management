import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!["OWNER", "ADMIN", "MANAGER"].includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const owner = await prisma.owner.findUnique({
    where: { userId: session.user.id },
  });

  if (!owner && session.user.role === "OWNER") {
    return NextResponse.json({ error: "Owner profile not found" }, { status: 404 });
  }

  const ownerId = session.user.role === "OWNER" ? owner!.id : undefined;

  const [payouts, properties] = await Promise.all([
    prisma.payout.findMany({
      where: { ownerId },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.property.findMany({
      where: { ownerId },
      include: {
        units: {
          include: {
            leases: {
              where: { status: "ACTIVE" },
              include: {
                payments: {
                  where: { status: "COMPLETED" },
                  orderBy: { paidAt: "desc" },
                  take: 3,
                },
              },
            },
          },
        },
      },
    }),
  ]);

  // Calculate revenue from active leases
  const totalRevenue = properties.reduce((sum: number, p: any) =>
    sum + p.units.reduce((uSum: number, u: any) =>
      uSum + u.leases.reduce((lSum: number, l: any) =>
        lSum + l.payments.reduce((pSum: number, pay: any) => pSum + pay.amount, 0), 0), 0), 0);

  const totalUnits = properties.reduce((sum: number, p: any) => sum + p.units.length, 0);
  const occupiedUnits = properties.reduce((sum: number, p: any) =>
    sum + p.units.filter((u: any) => u.status === "OCCUPIED").length, 0);

  return NextResponse.json({
    payouts,
    summary: {
      totalProperties: properties.length,
      totalUnits,
      occupiedUnits,
      occupancyRate: totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0,
      totalRevenue,
    },
  });
}
