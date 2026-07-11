"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-navy-800">
      {/* Premium background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold-500/[0.08] to-transparent blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gold-500/[0.05] to-transparent blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block text-gold-400 font-semibold text-xs uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
              Trusted by Property Owners Across Kenya
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-[var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          >
            Professional Property Management
            <span className="block text-gold-400">Made Simple</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed mb-8"
          >
            Manage your rental portfolio with confidence. From tenant screening to rent collection to maintenance coordination—we handle the complexity so you can focus on growth.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 mb-10"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-gold-400 flex-shrink-0" />
              <span className="text-white/80">500+ units managed across Kenya</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-gold-400 flex-shrink-0" />
              <span className="text-white/80">10 dedicated professionals on your team</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-gold-400 flex-shrink-0" />
              <span className="text-white/80">Transparent 10% fee with no hidden charges</span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <LinkButton
              href="/properties"
              size="lg"
              variant="gold"
              className="px-8 group w-full sm:w-auto justify-center sm:justify-start"
            >
              <span>Browse Properties</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </LinkButton>
            <LinkButton
              href="/contact"
              size="lg"
              variant="outline-light"
              className="px-8 w-full sm:w-auto justify-center sm:justify-start"
            >
              Schedule a Demo
            </LinkButton>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-white/50 mt-12"
          >
            Founded by E.O Masara • Established operator • Transparent pricing
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
