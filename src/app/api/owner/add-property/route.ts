import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL"]),
  location: z.string().min(2),
  address: z.string().min(5),
  amenities: z.array(z.string()).optional(),
  units: z.array(z.object({
    name: z.string(),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().int().min(1),
    rent: z.number().positive(),
    deposit: z.number().positive(),
    size: z.number().optional(),
  })).min(1),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !["OWNER", "ADMIN", "MANAGER"].includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    let owner = await prisma.owner.findUnique({ where: { userId: session.user.id } });
    if (!owner) {
      owner = await prisma.owner.create({ data: { userId: session.user.id } });
    }

    const property = await prisma.property.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        type: parsed.data.type,
        location: parsed.data.location,
        address: parsed.data.address,
        amenities: parsed.data.amenities || [],
        ownerId: owner.id,
        units: {
          create: parsed.data.units.map((u) => ({
            name: u.name,
            bedrooms: u.bedrooms,
            bathrooms: u.bathrooms,
            rent: u.rent,
            deposit: u.deposit,
            size: u.size,
          })),
        },
      },
      include: { units: true },
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
