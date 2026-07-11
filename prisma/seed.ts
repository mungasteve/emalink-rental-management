import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create owner user
  const ownerUser = await prisma.user.upsert({
    where: { email: "owner@emalink.local" },
    update: {},
    create: {
      name: "E.O Masara",
      email: "owner@emalink.local",
      phone: "+254700000000",
      password: await bcrypt.hash("password123", 10),
      role: "OWNER",
    },
  });

  // Create owner profile
  const owner = await prisma.owner.upsert({
    where: { userId: ownerUser.id },
    update: {},
    create: {
      userId: ownerUser.id,
      company: "Emalink Property Management",
    },
  });

  // Create properties with units
  const properties = [
    {
      title: "Modern 2BR Apartment",
      location: "Westlands, Nairobi",
      address: "123 Westlands Avenue",
      type: "RESIDENTIAL",
      bedrooms: 2,
      bathrooms: 1,
      rent: 45000,
      description: "Discover contemporary living in this beautifully appointed 2-bedroom apartment located in the heart of Westlands. This residence features an open-plan living and dining area with floor-to-ceiling windows that flood the space with natural light. The fully fitted kitchen includes modern appliances and ample storage, while the master bedroom offers an en-suite bathroom. Additional amenities include secure parking, 24/7 security, backup generator, and water storage tank. Walking distance to Sarit Centre, Westgate Mall, and Aga Khan Hospital. Ideal for young professionals and small families seeking convenience and modern comfort.",
    },
    {
      title: "Spacious 3BR Penthouse",
      location: "Kilimani, Nairobi",
      address: "456 Kilimani Road",
      type: "RESIDENTIAL",
      bedrooms: 3,
      bathrooms: 2,
      rent: 85000,
      description: "Experience luxury living in this stunning 3-bedroom penthouse with panoramic views of Nairobi's skyline. This premium residence features a spacious open-plan living area, fully equipped modern kitchen, and three generously sized bedrooms with the master suite offering an en-suite bathroom. The highlight is the expansive rooftop terrace, perfect for entertaining or relaxing. Located in a secure gated compound with 24/7 CCTV surveillance, gym access, and swimming pool. Additional features include backup power, lift access, and dedicated parking. Close to Yaya Centre and Junction Mall. Perfect for discerning families and executives seeking upscale accommodation.",
    },
    {
      title: "Commercial Office Space",
      location: "Upper Hill, Nairobi",
      address: "789 Upper Hill Plaza",
      type: "COMMERCIAL",
      bedrooms: 0,
      bathrooms: 2,
      rent: 120000,
      description: "Prime commercial office space in Upper Hill's prestigious business district. This 200 sqm open-plan office is ideal for corporate headquarters, professional services, or growing businesses. Features include high ceilings, abundant natural lighting, and flexible layout options. The space is equipped with fiber internet readiness, dedicated parking bays, reception area, and conference room. Additional amenities include backup power supply, air conditioning, and 24-hour security. Located minutes from Kenyatta Hospital and the CBD. Perfect for companies seeking a professional address with excellent accessibility and modern facilities.",
    },
    {
      title: "1BR Studio Apartment",
      location: "South B, Nairobi",
      address: "321 South B Lane",
      type: "RESIDENTIAL",
      bedrooms: 1,
      bathrooms: 1,
      rent: 25000,
      description: "Compact and efficiently designed studio apartment perfect for young professionals and students. This 45 sqm unit features a combined living and sleeping area, fitted kitchenette with modern appliances, and a full bathroom. Built-in wardrobes maximize storage space. Residents enjoy access to a shared rooftop lounge with city views, 24/7 security, reliable water supply, and backup power. Located in a vibrant neighborhood close to Capital Centre and South B Shopping Centre. Affordable, convenient, and move-in ready. Ideal for those seeking independence and affordability.",
    },
    {
      title: "4BR Family Home",
      location: "Karen, Nairobi",
      address: "654 Karen Estate",
      type: "RESIDENTIAL",
      bedrooms: 4,
      bathrooms: 3,
      rent: 150000,
      description: "Stunning family home set on half an acre in the serene and prestigious Karen neighborhood. This spacious 300 sqm residence features four generously sized bedrooms, three full bathrooms, and multiple living areas including a formal lounge and family room. The property boasts a large manicured garden with mature trees, separate servant quarter, double garage, and borehole for water security. Additional features include electric fencing, backup generator, and 24-hour security. Located in a peaceful area close to Karen Hospital, excellent schools, and shopping facilities. Perfect for families seeking privacy, space, and a secure environment.",
    },
    {
      title: "Warehouse & Storage",
      location: "Industrial Area, Nairobi",
      address: "987 Industrial Zone",
      type: "INDUSTRIAL",
      bedrooms: 0,
      bathrooms: 1,
      rent: 200000,
      description: "Large-scale warehouse and storage facility ideally suited for manufacturing, distribution, or logistics operations. This 500 sqm industrial space features high ceilings (5+ meters), reinforced heavy-duty flooring capable of supporting heavy machinery, and a loading bay for efficient cargo handling. The facility includes 24-hour security, 3-phase power supply, truck access, and ample parking for commercial vehicles. Located in the heart of the Industrial Area with easy access to Mombasa Road and major highways. Close to ICD Nairobi and JKIA. Excellent for businesses requiring secure, accessible industrial space.",
    },
    {
      title: "2BR Furnished Apartment",
      location: "Lavington, Nairobi",
      address: "147 Lavington Close",
      type: "RESIDENTIAL",
      bedrooms: 2,
      bathrooms: 1,
      rent: 65000,
      description: "Fully furnished 2-bedroom apartment in leafy and upscale Lavington. This 90 sqm residence is move-in ready with quality furniture, fully equipped kitchen with modern appliances, and fast Wi-Fi connectivity. Features include secure parking, 24/7 security, private garden access, and washing machine. The apartment is ideal for expats, corporate relocations, and professionals seeking short or long-term furnished accommodation. Located in a quiet, tree-lined neighborhood close to Lavington Mall, Valley Arcade, and Nairobi Hospital. Perfect for those seeking comfort and convenience without the hassle of furnishing.",
    },
    {
      title: "Retail Shop Space",
      location: "CBD, Nairobi",
      address: "258 CBD Main Street",
      type: "COMMERCIAL",
      bedrooms: 0,
      bathrooms: 1,
      rent: 80000,
      description: "High-visibility retail space on Kenyatta Avenue in Nairobi's Central Business District. This 60 sqm ground-floor unit features a large glass frontage ideal for product display and customer attraction. The space includes a back storage room for inventory management and is suitable for fashion retail, electronics, restaurants, or service businesses. Located in one of the city's highest foot-traffic areas with excellent visibility and accessibility. Close to Hilton Hotel, City Market, and major bus stations. 24-hour security and professional building management. Perfect for retail entrepreneurs seeking prime CBD location.",
    },
    {
      title: "3BR Bungalow",
      location: "Langata, Nairobi",
      address: "369 Langata Road",
      type: "RESIDENTIAL",
      bedrooms: 3,
      bathrooms: 2,
      rent: 95000,
      description: "Charming 3-bedroom bungalow in the quiet and family-friendly Langata neighborhood. This 180 sqm residence features three spacious bedrooms, two full bathrooms, and open living areas with natural light. The property sits on a generous plot with a mature garden, perfect for families with children and pets. Additional features include secure parking, borehole for water security, backup generator, 24-hour security, and a separate servant quarter. Located close to Nairobi National Park, excellent schools, and shopping facilities. Pet-friendly environment. Ideal for families seeking a peaceful, secure, and spacious home.",
    },
  ];

  for (const prop of properties) {
    const property = await prisma.property.upsert({
      where: { id: `prop-${prop.title.replace(/\s+/g, "-").toLowerCase()}` },
      update: { description: prop.description },
      create: {
        id: `prop-${prop.title.replace(/\s+/g, "-").toLowerCase()}`,
        title: prop.title,
        location: prop.location,
        address: prop.address,
        type: prop.type as any,
        description: prop.description,
        ownerId: owner.id,
      },
    });

    // Create unit for property
    await prisma.unit.upsert({
      where: { id: `unit-${property.id}` },
      update: {},
      create: {
        id: `unit-${property.id}`,
        name: prop.title,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        rent: prop.rent,
        deposit: prop.rent * 1.5,
        status: "AVAILABLE",
        propertyId: property.id,
      },
    });
  }

  console.log("✓ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
