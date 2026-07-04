"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Bed, Bath, Search, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/ui/link-button";
import { PropertyImage } from "@/components/properties/property-image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allProperties = [
  { id: 1, title: "Modern 2BR Apartment", location: "Westlands, Nairobi", rent: 45000, bedrooms: 2, bathrooms: 1, type: "residential", status: "Available" },
  { id: 2, title: "Spacious 3BR Penthouse", location: "Kilimani, Nairobi", rent: 85000, bedrooms: 3, bathrooms: 2, type: "residential", status: "Available" },
  { id: 3, title: "Commercial Office Space", location: "Upper Hill, Nairobi", rent: 120000, bedrooms: 0, bathrooms: 2, type: "commercial", status: "Available" },
  { id: 4, title: "1BR Studio Apartment", location: "South B, Nairobi", rent: 25000, bedrooms: 1, bathrooms: 1, type: "residential", status: "Occupied" },
  { id: 5, title: "4BR Family Home", location: "Karen, Nairobi", rent: 150000, bedrooms: 4, bathrooms: 3, type: "residential", status: "Available" },
  { id: 6, title: "Warehouse & Storage", location: "Industrial Area, Nairobi", rent: 200000, bedrooms: 0, bathrooms: 1, type: "industrial", status: "Available" },
  { id: 7, title: "2BR Furnished Apartment", location: "Lavington, Nairobi", rent: 65000, bedrooms: 2, bathrooms: 1, type: "residential", status: "Available" },
  { id: 8, title: "Retail Shop Space", location: "CBD, Nairobi", rent: 80000, bedrooms: 0, bathrooms: 1, type: "commercial", status: "Available" },
  { id: 9, title: "3BR Bungalow", location: "Langata, Nairobi", rent: 95000, bedrooms: 3, bathrooms: 2, type: "residential", status: "Occupied" },
];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");

  const filtered = allProperties.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchType = type === "all" || p.type === type;
    const matchBedrooms = bedrooms === "all" || p.bedrooms === parseInt(bedrooms);
    return matchSearch && matchType && matchBedrooms;
  });

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="bg-navy-800 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white mb-2">
            Our Properties
          </h1>
          <p className="text-white/55 text-sm">Find your next home or business space</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                aria-label="Search properties"
              />
            </div>
            <div className="flex gap-3">
              <Select value={type} onValueChange={(v) => setType(v ?? "all")}>
                <SelectTrigger className="w-[140px] sm:w-[160px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
              <Select value={bedrooms} onValueChange={(v) => setBedrooms(v ?? "all")}>
                <SelectTrigger className="w-[120px] sm:w-[140px]">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Beds</SelectItem>
                  <SelectItem value="1">1 BR</SelectItem>
                  <SelectItem value="2">2 BR</SelectItem>
                  <SelectItem value="3">3 BR</SelectItem>
                  <SelectItem value="4">4+ BR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} properties found</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {filtered.map((property, i) => (
            <Link key={property.id} href={`/properties/${property.id}`} className="block group">
              <article className="relative overflow-hidden rounded-xl border border-border/60 bg-white transition-all duration-300 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-gold-500/30">
                <div className="relative overflow-hidden">
                  <PropertyImage index={i} title={property.title} />
                  <span className={`absolute top-3 right-3 z-10 ${property.status === "Available" ? "badge-available" : "badge-occupied"}`}>
                    {property.status}
                  </span>
                  <div className="absolute inset-0 bg-navy-800/0 group-hover:bg-navy-800/10 transition-colors duration-300" />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-navy-800 text-base leading-snug group-hover:text-navy-700 transition-colors">
                      {property.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-gold-500 transition-all duration-300 shrink-0 translate-y-1 group-hover:translate-y-0" />
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {property.location}
                  </div>

                  <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
                    {property.bedrooms > 0 && (
                      <span className="flex items-center gap-1.5 bg-cream-100 px-2 py-0.5 rounded-md">
                        <Bed className="h-3.5 w-3.5" /> {property.bedrooms} BR
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 bg-cream-100 px-2 py-0.5 rounded-md">
                      <Bath className="h-3.5 w-3.5" /> {property.bathrooms} BA
                    </span>
                    <Badge variant="outline" className="text-xs capitalize">{property.type}</Badge>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Monthly Rent</p>
                        <p className="text-xl font-bold text-navy-800 tracking-tight">
                          KES {property.rent.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
