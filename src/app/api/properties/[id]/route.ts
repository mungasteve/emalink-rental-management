export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        units: {
          select: {
            id: true,
            name: true,
            bedrooms: true,
            bathrooms: true,
            rent: true,
            deposit: true,
            status: true,
          },
        },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const unit = property.units[0];
    const formatted = {
      id: property.id,
      title: property.title,
      location: property.location,
      description: property.description,
      rent: unit?.rent || 0,
      deposit: unit?.deposit || 0,
      bedrooms: unit?.bedrooms || 0,
      bathrooms: unit?.bathrooms || 1,
      type: property.type.toLowerCase(),
      status: unit?.status === "AVAILABLE" ? "Available" : "Occupied",
      amenities: property.amenities || [],
      images: property.images || [],
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}
