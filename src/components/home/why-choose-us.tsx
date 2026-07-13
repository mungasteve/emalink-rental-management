"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";

const columns = [
  {
    heading: "10% flat fee",
    points: ["No hidden charges", "You approve costs above KES 10,000", "Nothing deducted without a statement"],
  },
  {
    heading: "M-Pesa first",
    points: ["Instant confirmation to you and tenant", "Bank transfer also accepted", "No more chasing rent"],
  },
  {
    heading: "Kenyan law",
    points: ["Landlord and Tenant Act compliance", "Leases we draft and stand behind", "Evictions handled correctly"],
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-navy-800 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-16 max-w-3xl"
        >
          <p className="text-gold-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6">
            Why Emalink
          </p>
          <p className="font-[var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl text-white leading-snug mb-5">
            Most landlords in Nairobi manage their own properties because handing your rent roll to a stranger is worse than the hassle.
          </p>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            We exist because that shouldn't be the choice.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-12" />

        {/* 3-column fact grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid sm:grid-cols-3 gap-8 sm:gap-12 mb-14"
        >
          {columns.map((col) => (
            <motion.div
              key={col.heading}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <p className="text-white font-semibold text-base mb-4 pb-3 border-b border-white/10">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.points.map((pt) => (
                  <li key={pt} className="text-white/50 text-sm leading-relaxed">
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-white/10"
        >
          <p className="text-white/40 text-sm flex-1">
            We are onboarding our first landlords now — direct access to the founder, no middlemen.
          </p>
          <LinkButton href="/contact" variant="gold" size="sm" className="shrink-0">
            Get in touch
          </LinkButton>
        </motion.div>

      </div>
    </section>
  );
}
