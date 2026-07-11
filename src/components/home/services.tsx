"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users2,
  Wrench,
  CreditCard,
  Scale,
  Megaphone,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Property Management",
    description: "We act as the point of contact between you and your tenants.",
    details: [
      "Regular property inspections",
      "Lease renewals and negotiations",
      "Tenant complaint resolution",
      "Property maintenance coordination",
    ],
  },
  {
    icon: Users2,
    title: "Tenant Screening",
    description: "We find reliable tenants before they get the keys.",
    details: [
      "Background checks",
      "Employment verification",
      "Reference calls",
      "Credit assessment",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance Coordination",
    description: "Issues get fixed fast. You approve costs above KES 10,000.",
    details: [
      "Maintenance request tracking",
      "Vetted contractor network",
      "Cost approval workflow",
      "Emergency repair handling",
    ],
  },
  {
    icon: CreditCard,
    title: "Rent Collection & Payouts",
    description: "Automated collection. Monthly statements. Zero hassle.",
    details: [
      "M-Pesa and bank collection",
      "Automatic payment reminders",
      "Monthly itemized statements",
      "Instant payment confirmation",
    ],
  },
  {
    icon: Scale,
    title: "Legal & Compliance",
    description: "We handle the legal side. You stay compliant.",
    details: [
      "Lease agreement drafting",
      "Notice period management",
      "Eviction support",
      "Landlord-Tenant Act compliance",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing & Vacancy",
    description: "Minimize empty units. Maximize occupancy.",
    details: [
      "Listings on major Kenyan portals",
      "Social media marketing",
      "High-definition video tours",
      "Tenant acquisition support",
    ],
  },
];

export function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-cream-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto"
        >
          <div className="inline-block mb-4">
            <span className="text-gold-400 font-semibold text-xs uppercase tracking-[0.2em] bg-gold-500/10 px-4 py-2 rounded-full">
              What We Handle
            </span>
          </div>
          <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-navy-800 mb-4 leading-tight">
            Complete property management.
          </h2>
          <p className="text-navy-600 text-lg sm:text-xl leading-relaxed">
            From tenant screening to rent collection to maintenance coordination. Everything between you and your tenants. We handle the work, you stay informed.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 sm:p-8 elevation-card hover:elevation-card-hover transition-all duration-300 ease-out border border-cream-200 hover:border-gold-500/30"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-800 to-navy-700 flex items-center justify-center group-hover:from-gold-500 group-hover:to-gold-600 transition-all duration-300">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-2">
                {service.title}
              </h3>

              {/* Main Description */}
              <p className="text-navy-600 text-base leading-relaxed mb-6 font-medium">
                {service.description}
              </p>

              {/* Details List */}
              <ul className="space-y-3">
                {service.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-navy-600 text-sm leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Accent */}
              <div className="mt-6 pt-6 border-t border-cream-200 group-hover:border-gold-500/20 transition-colors duration-300">
                <p className="text-xs text-gold-500 font-semibold uppercase tracking-wider">
                  Service #{String(index + 1).padStart(2, "0")}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <p className="text-navy-600 text-lg mb-6">
            All services included in our transparent 10% management fee.
          </p>
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-6 py-3">
            <span className="text-sm font-semibold text-gold-600">✓ No hidden fees</span>
            <span className="text-navy-400">•</span>
            <span className="text-sm font-semibold text-gold-600">✓ All-inclusive service</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
