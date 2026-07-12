"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative overflow-hidden bg-navy-900 min-h-[520px] flex items-center">
      {/* Real Nairobi background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/brian-marete-V3YD8ACd0s0-unsplash.jpg')",
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-navy-900/80" />
      {/* Gold accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/60 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Location tag */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-gold-400 font-semibold text-xs uppercase tracking-widest">
              Nairobi, Kenya
            </span>
          </motion.div>

          {/* Headline — serif for authority */}
          <motion.h1
            variants={itemVariants}
            className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.2] mb-4"
          >
            Property management
            <span className="block text-gold-400">done right.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-white/70 leading-relaxed mb-6 max-w-xl"
          >
            Rent collection, tenant screening, maintenance, and legal compliance — handled by a dedicated team so you can focus on growing your portfolio.
          </motion.p>

          {/* Verified claims only */}
          <motion.div variants={itemVariants} className="space-y-2 mb-8">
            {[
              "Transparent 10% management fee — no hidden charges",
              "M-Pesa rent collection with instant confirmation",
              "You approve all costs above KES 10,000",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold-400 flex-shrink-0" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
            <LinkButton
              href="/contact"
              size="lg"
              variant="gold"
              className="px-6 sm:px-8 group w-full sm:w-auto justify-center"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </LinkButton>
            <LinkButton
              href="/properties"
              size="lg"
              variant="outline-light"
              className="px-6 sm:px-8 w-full sm:w-auto justify-center"
            >
              Browse Properties
            </LinkButton>
          </motion.div>

          {/* Founder line — no unverified claims */}
          <motion.p variants={itemVariants} className="text-xs text-white/40 mt-8">
            Founded by E.O Masara • Nairobi-based • Built for Kenyan landlords
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
