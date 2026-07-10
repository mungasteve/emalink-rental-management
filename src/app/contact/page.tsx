"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    if (!form.get("name")) newErrors.name = "Name is required";
    if (!form.get("email")) newErrors.email = "Email is required";
    if (!form.get("message")) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setErrors({});
    setLoading(true);

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        source: source || "contact_form",
        message: form.get("message"),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Failed to send message. Please try again.");
      return;
    }

    toast.success("Message received", { description: "We'll get back to you within 24 hours." });
    (e.target as HTMLFormElement).reset();
    setSource("");
  }

  return (
    <div>
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">Get in Touch</p>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Talk to us directly.
          </h1>
          <p className="text-white/55 text-sm max-w-md">
            Whether you own a property, need a place to rent, or just have a question — we respond within 24 hours.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Phone", value: "Coming Soon", href: undefined },
                { icon: Mail, label: "Email", value: "info@emalink.co.ke", href: "mailto:info@emalink.co.ke" },
                { icon: MapPin, label: "Office", value: "Nairobi, Kenya", href: undefined },
                { icon: Clock, label: "Hours", value: "Mon–Fri, 8AM–6PM", href: undefined },
              ].map((item) => (
                <Card key={item.label} className="p-4 flex items-center gap-4 elevation-card">
                  <div className="h-10 w-10 rounded-lg bg-cream-100 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-navy-700" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-navy-800 text-sm hover:underline">{item.value}</a>
                    ) : (
                      <p className="font-medium text-navy-800 text-sm">{item.value}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="lg:col-span-2 p-6 elevation-card">
              <h2 className="font-semibold text-navy-800 text-lg mb-6">Send us a message</h2>
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input name="name" placeholder="Full Name" aria-invalid={!!errors.name} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Input name="email" placeholder="Email Address" type="email" aria-invalid={!!errors.email} />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input name="phone" placeholder="Phone Number" type="tel" />
                  <Select value={source} onValueChange={(v) => setSource(v ?? "")}>
                    <SelectTrigger><SelectValue placeholder="Inquiry Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Become a Tenant</SelectItem>
                      <SelectItem value="owner">List My Property</SelectItem>
                      <SelectItem value="viewing">Book a Viewing</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea name="message" placeholder="Your message..." rows={5} aria-invalid={!!errors.message} />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" variant="gold" className="w-full sm:w-auto px-8" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
