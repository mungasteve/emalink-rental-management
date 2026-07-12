"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Building2, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "Established Operator",
    desc: "Founded by E.O Masara with property management expertise and a commitment to transparency.",
  },
  {
    icon: Zap,
    title: "Interest-Free Loans",
    desc: "Short-term loans available to landlords, recovered directly from rent at zero interest.",
  },
  {
    icon: Building2,
    title: "Transparent Fees",
    desc: "10% of gross receipts. No hidden charges. You know exactly what you're paying.",
  },
  {
    icon: Users,
    title: "Built for Kenya",
    desc: "M-Pesa integration, local compliance, and support for Kenyan property management practices.",
  },
];

export function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="section-padding bg-navy-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-2">
            Why Emalink
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
            Four things that set us apart from every other property manager in Nairobi.
          </p>
        </motion.div>

        {/* Trust Signals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12"
        >
          {trustSignals.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 sm:p-6 cursor-default hover:bg-white/[0.06] transition-all duration-300 ease-out"
            >
              <div className="h-9 w-9 rounded-lg bg-gold-500/10 flex items-center justify-center mb-4 flex-shrink-0">
                <item.icon className="h-5 w-5 text-gold-400" />
              </div>
              <p className="font-semibold text-white text-base sm:text-lg mb-2">{item.title}</p>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-gold-500/20 rounded-2xl p-6 sm:p-8 text-center bg-gold-500/[0.03]"
        >
          <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">
            Get Started
          </p>
          <h3 className="text-white font-[var(--font-heading)] text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
            Ready to streamline your property management?
          </h3>
          <p className="text-white/50 text-sm sm:text-base mb-6 max-w-md mx-auto leading-relaxed">
            Be among the first property owners to experience professional, transparent property management built for Kenya.
          </p>
          <LinkButton href="/contact" variant="gold" size="lg" className="px-6 sm:px-8">
            Schedule a Demo
          </LinkButton>
        </motion.div>
      </div>
    </section>
  );
}
