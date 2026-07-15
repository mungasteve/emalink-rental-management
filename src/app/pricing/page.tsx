"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

const included = [
  "Rent collection via M-Pesa with instant confirmation",
  "Tenant screening and onboarding",
  "Maintenance request tracking and coordination",
  "Monthly statements for landlords",
  "Tenant portal for payments and requests",
  "You approve all costs above KES 10,000",
  "Legal compliance support",
  "Dedicated point of contact",
];

const faqs = [
  {
    q: "How is the 10% calculated?",
    a: "On gross receipts collected through Emalink. If a tenant pays KES 50,000, you pay KES 5,000. No hidden fees on top of that.",
  },
  {
    q: "What if a tenant pays outside Emalink?",
    a: "You can log payments manually. We only charge on rent collected through our platform.",
  },
  {
    q: "Are there setup or exit fees?",
    a: "No setup fee. 12-month initial term, renewing annually — but you can cancel with 30 days notice, no penalty, at any time.",
  },
  {
    q: "What payment methods do you accept for the management fee?",
    a: "Bank transfer, M-Pesa, or direct deduction from collected rent — whichever works for you.",
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
              Pricing
            </p>
            <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              One fee. Everything included.
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              10% of gross receipts collected. No hidden charges, no setup fee, cancel anytime with 30 days notice.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Fee Card */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 sm:p-10 border border-border elevation-card"
          >
            <div className="text-center mb-8 pb-8 border-b border-border">
              <div className="text-5xl font-bold text-navy-800 mb-1">10%</div>
              <p className="text-navy-600">of gross receipts collected</p>
            </div>

            <div className="space-y-3">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-700 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <LinkButton href="/contact" variant="gold" className="w-full justify-center">
                Get in Touch
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-10 text-center"
          >
            Questions
          </motion.h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-cream-50 rounded-xl p-6 border border-border"
              >
                <h3 className="font-semibold text-navy-800 text-lg mb-2">{faq.q}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4">
              Interested in working with us?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              We are onboarding our first landlords now. Reach out and we will walk you through how it works.
            </p>
            <LinkButton href="/contact" variant="gold" size="lg" className="px-8">
              Contact Us
            </LinkButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
