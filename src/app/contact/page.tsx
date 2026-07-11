"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const message = form.get("message") as string;

    if (!name?.trim()) newErrors.name = "Name is required";
    if (!email?.trim()) newErrors.email = "Email is required";
    if (!email?.includes("@")) newErrors.email = "Please enter a valid email";
    if (!message?.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: (form.get("phone") as string)?.trim() || "",
          source: source || "contact_form",
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to send message");
      }

      setSubmitted(true);
      toast.success("Message sent!", {
        description: "We'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
      setSource("");

      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
            Get in Touch
          </p>
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Talk to us directly.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Whether you own a property, need a place to rent, or just have a question — we respond within 24 hours.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+254 700 000 000",
                  href: "tel:+254700000000",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@emalink.co.ke",
                  href: "mailto:info@emalink.co.ke",
                },
                {
                  icon: MapPin,
                  label: "Office",
                  value: "Nairobi, Kenya",
                  href: undefined,
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "Mon–Fri, 8AM–6PM EAT",
                  href: undefined,
                },
              ].map((item) => (
                <Card
                  key={item.label}
                  className="p-5 sm:p-6 flex items-start gap-4 elevation-card hover:elevation-card-hover transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-gold-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-navy-600 uppercase tracking-wider font-semibold mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-semibold text-navy-800 text-base hover:text-gold-500 transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-navy-800 text-base">{item.value}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 p-6 sm:p-8 elevation-card">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-[var(--font-heading)] text-2xl font-bold text-navy-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-navy-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-2">
                    Send us a message
                  </h2>
                  <p className="text-navy-600 text-sm mb-8">
                    Fill out the form below and we'll respond as soon as possible.
                  </p>

                  <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-navy-800 mb-2 block">
                          Full Name *
                        </label>
                        <Input
                          name="name"
                          placeholder="John Doe"
                          aria-invalid={!!errors.name}
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-navy-800 mb-2 block">
                          Email Address *
                        </label>
                        <Input
                          name="email"
                          placeholder="john@example.com"
                          type="email"
                          aria-invalid={!!errors.email}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Inquiry Type */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-navy-800 mb-2 block">
                          Phone Number
                        </label>
                        <Input
                          name="phone"
                          placeholder="+254 700 000 000"
                          type="tel"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-navy-800 mb-2 block">
                          Inquiry Type
                        </label>
                        <Select value={source} onValueChange={(v) => setSource(v ?? "")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">List My Property</SelectItem>
                            <SelectItem value="tenant">Become a Tenant</SelectItem>
                            <SelectItem value="demo">Schedule Demo</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm font-semibold text-navy-800 mb-2 block">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your inquiry..."
                        rows={6}
                        aria-invalid={!!errors.message}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-4 pt-4">
                      <Button
                        type="submit"
                        variant="gold"
                        size="lg"
                        className="px-8"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                      <p className="text-xs text-navy-600">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-navy-600 text-lg">
              Can't find what you're looking for? Reach out directly.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How quickly do you respond?",
                a: "We aim to respond to all inquiries within 24 hours during business hours (Mon–Fri, 8AM–6PM).",
              },
              {
                q: "What's the best way to contact you?",
                a: "Email is fastest for non-urgent matters. For urgent issues, call us directly.",
              },
              {
                q: "Do you offer property viewings?",
                a: "Yes. Schedule a viewing through the contact form or call us directly.",
              },
              {
                q: "Can I get a demo of the platform?",
                a: "Absolutely. Select 'Schedule Demo' in the inquiry type and we'll set up a time that works for you.",
              },
            ].map((item, i) => (
              <Card key={i} className="p-6 elevation-card">
                <h3 className="font-semibold text-navy-800 text-lg mb-2">
                  {item.q}
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
