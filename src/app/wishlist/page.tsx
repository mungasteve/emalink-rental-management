"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Bed, Bath, ArrowUpRight, Heart, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PropertyImage } from "@/components/properties/property-image";
import { LinkButton } from "@/components/ui/link-button";

interface Property {
  id: string;
  title: string;
  location: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  status: string;
}

export default function WishlistPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("saved-properties");
    setSavedIds(saved ? JSON.parse(saved) : []);
  }, []);

  useEffect(() => {
    if (!mounted || savedIds.length === 0) {
      setLoading(false);
      return;
    }

    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          const filtered = data.filter((p: Property) => savedIds.includes(p.id));
          setProperties(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [savedIds, mounted]);

  const removeSaved = (propertyId: string) => {
    const updated = savedIds.filter((id) => id !== propertyId);
    setSavedIds(updated);
    localStorage.setItem("saved-properties", JSON.stringify(updated));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-navy-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/properties" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Properties
          </Link>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-2">
            Saved Properties
          </h1>
          <p className="text-white/55">Your wishlist of favorite properties</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-navy-800 mb-2">No saved properties yet</h2>
            <p className="text-navy-600 mb-6">Start adding properties to your wishlist to see them here.</p>
            <LinkButton href="/properties" variant="gold" size="lg">
              Browse Properties
            </LinkButton>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">{properties.length} saved properties</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, i) => (
                <div key={property.id} className="relative group">
                  <Link href={`/properties/${property.id}`} className="block">
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
                          <p className="text-xl font-bold text-navy-800 tracking-tight">
                            KES {property.rent.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeSaved(property.id)}
                    className="absolute top-3 right-3 z-20 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
