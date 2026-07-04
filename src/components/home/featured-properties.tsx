"use client";

import { motion } from "framer-motion";
import { MapPin, Bed, Bath, ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { PropertyImage } from "@/components/properties/property-image";
import Link from "next/link";

const properties = [
  { id: 1, title: "Modern 2BR Apartment", location: "Westlands, Nairobi", rent: 45000, bedrooms: 2, bathrooms: 1, status: "Available" },
  { id: 2, title: "Spacious 3BR Penthouse", location: "Kilimani, Nairobi", rent: 85000, bedrooms: 3, bathrooms: 2, status: "Available" },
  { id: 3, title: "Commercial Office Space", location: "Upper Hill, Nairobi", rent: 120000, bedrooms: 0, bathrooms: 2, status: "Available" },
  { id: 4, title: "1BR Studio Apartment", location: "South B, Nairobi", rent: 25000, bedrooms: 1, bathrooms: 1, status: "Occupied" },
  { id: 5, title: "4BR Family Home", location: "Karen, Nairobi", rent: 150000, bedrooms: 4, bathrooms: 3, status: "Available" },
  { id: 6, title: "Warehouse & Storage", location: "Industrial Area, Nairobi", rent: 200000, bedrooms: 0, bathrooms: 1, status: "Available" },
];

export function FeaturedProperties() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <p className="text-navy-600 font-semibold text-sm uppercase tracking-[0.15em] mb-2">
              Featured Listings
            </p>
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800">
              Properties For Rent
            </h2>
          </div>
          <LinkButton href="/properties" variant="outline" className="hidden sm:flex border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white">
            View All
          </LinkButton>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" style={{ perspective: "1200px" }}>
          {properties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40, rotateX: 14, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              whileHover={{ y: -6, rotateX: -3, scale: 1.015 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
            >
              <Link href={`/properties/${property.id}`} className="block group">
                <article className="relative overflow-hidden rounded-xl border border-border/60 bg-white transition-all duration-300 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-gold-500/30">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <PropertyImage index={i} title={property.title} />
                    <span className={`absolute top-3 right-3 z-10 ${property.status === "Available" ? "badge-available" : "badge-occupied"}`}>
                      {property.status}
                    </span>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy-800/0 group-hover:bg-navy-800/10 transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-navy-800 text-lg leading-snug group-hover:text-navy-700 transition-colors">
                        {property.title}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-gold-500 transition-all duration-300 shrink-0 translate-y-1 group-hover:translate-y-0" />
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {property.location}
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      {property.bedrooms > 0 && (
                        <span className="flex items-center gap-1.5 bg-cream-100 px-2 py-0.5 rounded-md">
                          <Bed className="h-3.5 w-3.5" /> {property.bedrooms} BR
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 bg-cream-100 px-2 py-0.5 rounded-md">
                        <Bath className="h-3.5 w-3.5" /> {property.bathrooms} BA
                      </span>
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
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <LinkButton href="/properties" variant="outline" className="border-navy-800 text-navy-800 w-full justify-center">
            View All Properties
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
