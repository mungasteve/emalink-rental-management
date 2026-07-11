"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin, Bed, Bath, Ruler, CheckCircle, ArrowLeft, Phone, Mail, Calendar, FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryErrors, setInquiryErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProperty(data);
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading property...</p>
      </div>
    );
  }

  if (!property) return notFound();

  async function handleApplyNow() {
    toast.success("Application Started", {
      description: "Redirecting to application form...",
    });
  }

  async function handleBookViewing() {
    toast.success("Viewing Scheduled", {
      description: "We'll contact you within 24 hours to confirm the viewing time.",
    });
  }

  async function handleInquirySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const phone = form.get("phone") as string;
    const message = form.get("message") as string;

    if (!name?.trim()) newErrors.name = "Name required";
    if (!email?.trim()) newErrors.email = "Email required";
    if (!email?.includes("@")) newErrors.email = "Invalid email";
    if (!phone?.trim()) newErrors.phone = "Phone required";
    if (!message?.trim()) newErrors.message = "Message required";

    if (Object.keys(newErrors).length > 0) {
      setInquiryErrors(newErrors);
      return;
    }

    setInquiryErrors({});
    setInquiryLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          source: "property_inquiry",
          notes: `Property: ${property.title}\n\n${message.trim()}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to send inquiry");

      toast.success("Inquiry Sent!", {
        description: "We'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Inquiry error:", error);
      toast.error("Failed to send inquiry", {
        description: "Please try again or call us directly.",
      });
    } finally {
      setInquiryLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-navy-800 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/properties" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Properties
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden bg-gray-100">
              <div className="col-span-2 relative h-72 sm:h-80 flex items-center justify-center">
                <span className="text-gray-400">Property Image</span>
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="relative h-40 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">Image {i + 1}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={property.status === "Available" ? "bg-green-500 text-white" : "bg-orange-500 text-white"}>
                  {property.status}
                </Badge>
                <Badge variant="outline" className="capitalize">{property.type}</Badge>
              </div>
              <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-1 text-navy-600">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 py-4 border-y">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-navy-600" />
                  <span className="text-sm"><strong>{property.bedrooms}</strong> Bedrooms</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-navy-600" />
                <span className="text-sm"><strong>{property.bathrooms || 1}</strong> Bathrooms</span>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-navy-800 text-lg mb-3">About This Property</h2>
              <p className="text-navy-600 leading-relaxed">
                {property.description || "A quality property managed by Emalink. Contact us for more details."}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-navy-800 mb-1">
                  KES {property.rent?.toLocaleString() || "0"}
                  <span className="text-sm text-navy-600 font-normal">/month</span>
                </p>

                {property.status === "Available" ? (
                  <div className="space-y-3 mt-6">
                    <Button
                      variant="gold"
                      className="w-full"
                      onClick={handleApplyNow}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleBookViewing}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Viewing
                    </Button>
                  </div>
                ) : (
                  <p className="text-center text-sm text-orange-600 font-medium py-3 bg-orange-50 rounded-lg mt-6">
                    This property is currently occupied
                  </p>
                )}

                <div className="mt-6 pt-4 border-t space-y-3">
                  <a href="tel:+254700000000" className="flex items-center gap-2 text-sm text-navy-600 hover:text-gold-500 transition-colors">
                    <Phone className="h-4 w-4" /> +254 700 000 000
                  </a>
                  <a href="mailto:info@emalink.co.ke" className="flex items-center gap-2 text-sm text-navy-600 hover:text-gold-500 transition-colors">
                    <Mail className="h-4 w-4" /> info@emalink.co.ke
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Send Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleInquirySubmit} noValidate>
                  <div>
                    <label className="text-xs font-semibold text-navy-800 mb-1 block">Name *</label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      className={inquiryErrors.name ? "border-red-500" : ""}
                    />
                    {inquiryErrors.name && <p className="text-xs text-red-500 mt-1">{inquiryErrors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-navy-800 mb-1 block">Email *</label>
                    <Input
                      name="email"
                      placeholder="your@email.com"
                      type="email"
                      className={inquiryErrors.email ? "border-red-500" : ""}
                    />
                    {inquiryErrors.email && <p className="text-xs text-red-500 mt-1">{inquiryErrors.email}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-navy-800 mb-1 block">Phone *</label>
                    <Input
                      name="phone"
                      placeholder="+254 700 000 000"
                      type="tel"
                      className={inquiryErrors.phone ? "border-red-500" : ""}
                    />
                    {inquiryErrors.phone && <p className="text-xs text-red-500 mt-1">{inquiryErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-navy-800 mb-1 block">Message *</label>
                    <Textarea
                      name="message"
                      placeholder="I'm interested in this property..."
                      rows={3}
                      className={inquiryErrors.message ? "border-red-500" : ""}
                    />
                    {inquiryErrors.message && <p className="text-xs text-red-500 mt-1">{inquiryErrors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    className="w-full"
                    disabled={inquiryLoading}
                  >
                    {inquiryLoading ? "Sending..." : "Send Message"}
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
