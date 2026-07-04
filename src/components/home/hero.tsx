"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";
import { ArrowRight, TrendingUp, Lock } from "lucide-react";
import { HeroStats } from "./hero-stats";

export function Hero() {
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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-navy-800">
      {/* Premium background with multiple layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold-500/[0.08] to-transparent blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gold-500/[0.05] to-transparent blur-[100px]" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Professional eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-gold-400" />
              <span className="text-gold-300 font-medium text-sm tracking-wide uppercase">
                Property Management Platform
              </span>
            </motion.div>

            {/* Professional headline */}
            <motion.h1
              variants={itemVariants}
              className="font-[var(--font-heading)] text-5xl sm:text-6xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
            >
              Stop chasing rent.
              <span className="block text-gold-400">Start managing.</span>
            </motion.h1>

            {/* Professional subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-white/75 max-w-xl leading-relaxed mb-8"
            >
              Automate rent collection, maintenance requests, and tenant communication. Get real-time insights into your portfolio.
            </motion.p>

            {/* Professional trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 mb-10 pt-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">500+</p>
                  <p className="text-white/60 text-xs">Properties Managed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Bank-Grade</p>
                  <p className="text-white/60 text-xs">Security & Compliance</p>
                </div>
              </div>
            </motion.div>

            {/* Professional CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <LinkButton
                href="/properties"
                size="lg"
                variant="gold"
                className="px-8 group"
              >
                <span>Start Browsing</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </LinkButton>
              <LinkButton
                href="/contact"
                size="lg"
                variant="outline-light"
                className="px-8"
              >
                Schedule Demo
              </LinkButton>
            </motion.div>
          </motion.div>

          {/* Right: Animated Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroStats />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
