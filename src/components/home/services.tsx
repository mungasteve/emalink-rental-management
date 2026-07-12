"use client";

import { motion } from "framer-motion";

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
    description: "Logged, tracked, and fixed. You approve anything above KES 10,000 before we spend it.",
  },
  {
    title: "Tenant Relations",
    description: "We handle day-to-day contact with tenants so you don't have to field calls at midnight.",
  },
  {
    title: "Legal & Compliance",
    description: "Leases drafted under Kenya's Landlord and Tenant Act. Notice periods and evictions handled correctly.",
  },
  {
    title: "Marketing & Vacancy",
    description: "Listed on major Kenyan portals. We fill empty units — you don't pay for vacancies we can't fill.",
  },
];

export function Services() {
  return (
    <section className="section-padding bg-white scroll-mt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-gold-500 font-semibold text-xs uppercase tracking-[0.2em]">
            What we handle
          </span>
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mt-2 leading-snug">
            Everything between you and your tenants.
          </h2>
          <p className="text-navy-600 text-sm sm:text-base mt-2 max-w-xl">
            One fee. All of this included. Nothing farmed out to someone you've never met.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream-200 border border-cream-200 rounded-xl overflow-hidden"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="bg-white p-4 sm:p-6"
            >
              <p className="font-semibold text-navy-800 text-sm sm:text-base mb-1 leading-snug">
                {s.title}
              </p>
              <p className="text-navy-500 text-xs sm:text-sm leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs text-navy-400 mt-5 text-center"
        >
          All included in the 10% management fee — no add-ons, no surprises.
        </motion.p>

      </div>
    </section>
  );
}
