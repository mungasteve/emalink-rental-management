import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !["OWNER", "ADMIN", "MANAGER"].includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const propertyId = request.nextUrl.searchParams.get("propertyId");

  const requests = await prisma.maintenance.findMany({
    where: propertyId ? { propertyId } : undefined,
    orderBy: { createdAt: "desc" },
    include: { property: { select: { title: true, location: true } } },
  });

  return NextResponse.json({ requests });
}
