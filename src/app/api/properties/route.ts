export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        units: {
          select: {
            id: true,
            name: true,
            bedrooms: true,
            bathrooms: true,
            rent: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = properties.map((p) => {
      const unit = p.units[0];
      return {
        id: p.id,
        title: p.title,
        location: p.location,
        rent: unit?.rent || 0,
        bedrooms: unit?.bedrooms || 0,
        bathrooms: unit?.bathrooms || 1,
        type: p.type.toLowerCase(),
        status: unit?.status === "AVAILABLE" ? "Available" : "Occupied",
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
