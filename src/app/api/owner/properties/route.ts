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

  // Owner only sees their own properties
  const properties = await prisma.property.findMany({
    where: {
      ownerId: session.user.role === "OWNER" ? owner!.id : undefined,
    },
    include: {
      units: {
        select: {
          id: true,
          name: true,
          rent: true,
          status: true,
        },
      },
      _count: {
        select: { maintenance: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ properties });
}
