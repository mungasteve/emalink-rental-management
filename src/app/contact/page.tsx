"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message", {
        description: "Please try again or email us directly.",
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
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Plain contact info — no cards */}
          <div className="mb-12 text-sm text-navy-600 leading-relaxed space-y-1">
            <p><strong className="text-navy-800">Email:</strong>{" "}<a href="mailto:info@emalink.co.ke" className="hover:text-gold-500 transition-colors">info@emalink.co.ke</a></p>
            <p><strong className="text-navy-800">Location:</strong> Nairobi, Kenya</p>
            <p><strong className="text-navy-800">Hours:</strong> Mon–Fri, 8AM–6PM EAT</p>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-[var(--font-heading)] text-2xl font-bold text-navy-800 mb-2">
                Message Sent!
              </h3>
              <p className="text-navy-600 mb-6">
                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-2">
                Send us a message
              </h2>
              <p className="text-navy-600 text-sm mb-8">
                Fill out the form below and we&apos;ll respond within 24 hours.
              </p>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-navy-800 mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      name="name"
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
                      type="email"
                      aria-invalid={!!errors.email}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-navy-800 mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
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

                <div>
                  <label className="text-sm font-semibold text-navy-800 mb-2 block">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your property or what you're looking for..."
                    rows={6}
                    aria-invalid={!!errors.message}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>

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
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      {/* FAQ Section — plain, no cards */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-10">
            Common questions
          </h2>

          <div className="space-y-8">
            {[
              {
                q: "How quickly do you respond?",
                a: "Within 24 hours during business hours (Mon–Fri, 8AM–6PM EAT).",
              },
              {
                q: "What's the best way to reach you?",
                a: "Email. Send us a message using the form above or write directly to info@emalink.co.ke.",
              },
              {
                q: "Do you offer property viewings?",
                a: "Yes. Select 'Become a Tenant' in the inquiry type and we'll arrange a time.",
              },
              {
                q: "Can I get a demo of the platform?",
                a: "Yes. Select 'Schedule Demo' and we'll set up a walkthrough.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-navy-800 text-base mb-1">
                  {item.q}
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
