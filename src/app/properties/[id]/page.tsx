"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Bed, Bath, Ruler, CheckCircle, ArrowLeft, Phone, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const properties = [
  {
    id: 1, title: "Modern 2BR Apartment", location: "Westlands, Nairobi", address: "Rose Avenue, Westlands",
    rent: 45000, deposit: 90000, bedrooms: 2, bathrooms: 1, size: 85, type: "residential", status: "Available",
    description: "A beautifully designed modern apartment in the heart of Westlands. Features an open-plan living area, fully fitted kitchen, and private balcony with city views. Walking distance to shopping centers and public transport.",
    amenities: ["Parking", "Security 24/7", "Backup Generator", "Water Storage", "Balcony", "Fitted Kitchen"],
    nearby: ["Sarit Centre - 5 min", "Westgate Mall - 10 min", "Aga Khan Hospital - 8 min"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 2, title: "Spacious 3BR Penthouse", location: "Kilimani, Nairobi", address: "Argwings Kodhek Road, Kilimani",
    rent: 85000, deposit: 170000, bedrooms: 3, bathrooms: 2, size: 150, type: "residential", status: "Available",
    description: "Luxurious penthouse with panoramic views of Nairobi. Features a rooftop terrace, master en-suite, and premium finishes throughout. Located in a secure gated compound with ample parking.",
    amenities: ["Rooftop Terrace", "Master En-suite", "CCTV", "Gym Access", "Swimming Pool", "Lift"],
    nearby: ["Yaya Centre - 3 min", "Junction Mall - 7 min", "Nairobi Hospital - 10 min"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 3, title: "Commercial Office Space", location: "Upper Hill, Nairobi", address: "Hospital Road, Upper Hill",
    rent: 120000, deposit: 360000, bedrooms: 0, bathrooms: 2, size: 200, type: "commercial", status: "Available",
    description: "Prime open-plan office space in Upper Hill's business district. Ideal for corporates and growing businesses. High-speed internet ready, ample natural lighting, and dedicated parking bays.",
    amenities: ["Fiber Internet Ready", "Dedicated Parking", "Reception Area", "Conference Room", "Backup Power", "AC"],
    nearby: ["Kenyatta Hospital - 5 min", "CBD - 10 min", "Wilson Airport - 12 min"],
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 4, title: "1BR Studio Apartment", location: "South B, Nairobi", address: "Mombasa Road, South B",
    rent: 25000, deposit: 50000, bedrooms: 1, bathrooms: 1, size: 45, type: "residential", status: "Occupied",
    description: "Compact and modern studio apartment perfect for young professionals. Includes a fitted kitchenette, built-in wardrobes, and access to a shared rooftop lounge.",
    amenities: ["Security", "Water 24/7", "Kitchenette", "Built-in Wardrobes", "Rooftop Lounge"],
    nearby: ["Capital Centre - 5 min", "South B Shopping - 3 min", "JKIA - 15 min"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 5, title: "4BR Family Home", location: "Karen, Nairobi", address: "Karen Road, Karen",
    rent: 150000, deposit: 300000, bedrooms: 4, bathrooms: 3, size: 300, type: "residential", status: "Available",
    description: "Stunning family home set on half an acre in serene Karen. Features a large garden, separate servant quarter, double garage, and mature trees. Ideal for families seeking privacy and space.",
    amenities: ["Garden", "Servant Quarter", "Double Garage", "Borehole", "Electric Fence", "Mature Trees"],
    nearby: ["Karen Hospital - 5 min", "The Hub Karen - 8 min", "Galleria Mall - 12 min"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 6, title: "Warehouse & Storage", location: "Industrial Area, Nairobi", address: "Enterprise Road, Industrial Area",
    rent: 200000, deposit: 600000, bedrooms: 0, bathrooms: 1, size: 500, type: "industrial", status: "Available",
    description: "Large warehouse space suitable for manufacturing, storage, or distribution. Features high ceilings, loading bay, heavy-duty flooring, and 24-hour security. Easily accessible from major highways.",
    amenities: ["Loading Bay", "High Ceiling", "Heavy-Duty Floor", "24hr Security", "Truck Access", "3-Phase Power"],
    nearby: ["Mombasa Road - 2 min", "ICD Nairobi - 10 min", "JKIA - 20 min"],
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 7, title: "2BR Furnished Apartment", location: "Lavington, Nairobi", address: "James Gichuru Road, Lavington",
    rent: 65000, deposit: 130000, bedrooms: 2, bathrooms: 1, size: 90, type: "residential", status: "Available",
    description: "Fully furnished apartment in leafy Lavington. Move-in ready with quality furniture, equipped kitchen, and fast Wi-Fi. Ideal for expats and professionals on short or long-term stays.",
    amenities: ["Fully Furnished", "Wi-Fi", "Parking", "Security", "Garden", "Washing Machine"],
    nearby: ["Lavington Mall - 3 min", "Valley Arcade - 5 min", "Nairobi Hospital - 10 min"],
    images: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 8, title: "Retail Shop Space", location: "CBD, Nairobi", address: "Kenyatta Avenue, CBD",
    rent: 80000, deposit: 240000, bedrooms: 0, bathrooms: 1, size: 60, type: "commercial", status: "Available",
    description: "High foot-traffic retail space on Kenyatta Avenue. Ground floor with large glass frontage, perfect for fashion, electronics, or service businesses. Includes back storage room.",
    amenities: ["Glass Frontage", "Storage Room", "High Foot Traffic", "Ground Floor", "Security"],
    nearby: ["Hilton Hotel - 2 min", "City Market - 5 min", "Bus Station - 3 min"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 9, title: "3BR Bungalow", location: "Langata, Nairobi", address: "Langata Road, Langata",
    rent: 95000, deposit: 190000, bedrooms: 3, bathrooms: 2, size: 180, type: "residential", status: "Occupied",
    description: "Charming bungalow in quiet Langata neighborhood. Features a spacious compound, mature garden, and open living areas. Close to Nairobi National Park and excellent schools.",
    amenities: ["Garden", "Parking", "Borehole", "Security", "Servant Quarter", "Pet Friendly"],
    nearby: ["Nairobi National Park - 5 min", "T-Mall - 8 min", "Carnivore - 3 min"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
    ],
  },
];

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) return notFound();

  return (
    <div>
      {/* Back nav */}
      <div className="bg-navy-800 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/properties" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Properties
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Gallery + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
              <div className="col-span-2 relative h-72 sm:h-80">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {property.images.slice(1).map((img, i) => (
                <div key={i} className="relative h-40">
                  <Image src={img} alt={`${property.title} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Title + Meta */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={property.status === "Available" ? "bg-green-500 text-white" : "bg-orange-500 text-white"}>
                  {property.status}
                </Badge>
                <Badge variant="outline" className="capitalize">{property.type}</Badge>
              </div>
              <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.address}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 py-4 border-y">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-navy-600" />
                  <span className="text-sm"><strong>{property.bedrooms}</strong> Bedrooms</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-navy-600" />
                <span className="text-sm"><strong>{property.bathrooms}</strong> Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-navy-600" />
                <span className="text-sm"><strong>{property.size}</strong> sqm</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-semibold text-navy-800 text-lg mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-semibold text-navy-800 text-lg mb-3">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby */}
            <div>
              <h2 className="font-semibold text-navy-800 text-lg mb-3">Nearby Facilities</h2>
              <ul className="space-y-2">
                {property.nearby.map((n) => (
                  <li key={n} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-navy-600 shrink-0" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar — Pricing + Inquiry */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-navy-800 mb-1">
                  KES {property.rent.toLocaleString()}
                  <span className="text-sm text-muted-foreground font-normal">/month</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Deposit: KES {property.deposit.toLocaleString()}
                </p>

                {property.status === "Available" ? (
                  <div className="space-y-3">
                    <Button variant="gold" className="w-full">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Book Viewing
                    </Button>
                  </div>
                ) : (
                  <p className="text-center text-sm text-orange-600 font-medium py-3 bg-orange-50 rounded-lg">
                    This property is currently occupied
                  </p>
                )}

                <div className="mt-6 pt-4 border-t space-y-3">
                  <a href="tel:+254700000000" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-navy-800 transition-colors">
                    <Phone className="h-4 w-4" /> +254 700 000 000
                  </a>
                  <a href="mailto:info@emalink.co.ke" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-navy-800 transition-colors">
                    <Mail className="h-4 w-4" /> info@emalink.co.ke
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Inquiry Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Send Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-3">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Phone" type="tel" />
                  <Textarea placeholder="I'm interested in this property..." rows={3} />
                  <Button variant="default" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
