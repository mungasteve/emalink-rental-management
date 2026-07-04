"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "We don't disappear after signing",
    description:
      "A dedicated manager is assigned to your property. You have their direct line — not a support ticket queue.",
  },
  {
    title: "You see every shilling",
    description:
      "Monthly statements break down rent collected, expenses paid, and what lands in your account. No surprises.",
  },
  {
    title: "Maintenance doesn't stall",
    description:
      "Issues get logged, assigned, and tracked to completion. You're notified at each step, not after the fact.",
  },
  {
    title: "Compliant from day one",
    description:
      "Leases, notices, and eviction procedures follow Kenyan law. We keep you protected without you needing to know the Act.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-navy-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <p className="text-gold-300 font-semibold text-sm uppercase tracking-[0.15em] mb-3">
              How we work
            </p>
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Property management that actually manages.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Most landlords in Kenya manage their own properties because they
              don&apos;t trust anyone else to. We&apos;re building Emalink to
              change that — one property at a time.
            </p>
          </motion.div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6" style={{ perspective: "900px" }}>
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 30, rotateY: -12 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                whileHover={{ rotateY: 3, scale: 1.02, x: 4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                className="border-l-2 border-white/10 pl-4 hover:border-gold-500 transition-colors cursor-default"
              >
                <h3 className="font-semibold text-white text-lg mb-1.5">{reason.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
