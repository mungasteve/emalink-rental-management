"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";

const services = [
  {
    title: "Tenant Screening",
    description: "Background checks, employment verification, and reference calls before anyone gets the keys.",
  },
  {
    title: "Rent Collection",
    description: "M-Pesa and bank transfer. Automatic reminders. Monthly statements sent directly to you.",
  },
  {
    title: "Maintenance",
    description: "Logged, tracked, fixed. You approve anything above KES 10,000 before we spend it.",
  },
  {
    title: "Tenant Relations",
    description: "We handle day-to-day contact with tenants so you don't have to field calls at midnight.",
  },
  {
    title: "Legal & Compliance",
    description: "Leases drafted under Kenya's Landlord and Tenant Act. Notices and evictions handled correctly.",
  },
  {
    title: "Marketing & Vacancy",
    description: "Listed on major Kenyan portals. We fill empty units — you don't pay for vacancies we can't fill.",
  },
];

export function Services() {
  return (
    <section className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">

          {/* Left — sticky anchor */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
          >
            <span className="text-gold-500 font-semibold text-xs uppercase tracking-[0.2em]">
              What we handle
            </span>
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mt-3 mb-4 leading-snug">
              Everything between you and your tenants.
            </h2>
            <p className="text-navy-500 text-sm leading-relaxed mb-6">
              One fee. All six included. Nothing handed off to someone you've never met.
            </p>
            <div className="inline-block bg-cream-100 border border-cream-300 rounded-lg px-4 py-3 mb-8">
              <p className="text-navy-800 font-bold text-lg leading-none">10%</p>
              <p className="text-navy-500 text-xs mt-0.5">flat management fee</p>
            </div>
            <div className="block">
              <LinkButton href="/contact" variant="gold" size="sm" className="w-full justify-center sm:w-auto">
                Talk to us
              </LinkButton>
            </div>
          </motion.div>

          {/* Right — numbered list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={{ hidden: { opacity: 0, x: 12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } }}
                className="flex gap-6 py-6 border-b border-cream-200 last:border-0 group"
              >
                <span className="text-xs font-mono text-navy-300 pt-1 w-5 shrink-0 group-hover:text-gold-500 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold text-navy-800 text-base mb-1">{s.title}</p>
                  <p className="text-navy-500 text-sm leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
