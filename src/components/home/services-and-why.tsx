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

export function ServicesAndWhy() {
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
    <section className="section-padding bg-gradient-to-b from-white via-cream-50 to-white">
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start mb-16">
          {/* Services Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 grid sm:grid-cols-2 gap-6 sm:gap-8"
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
                      <span className="text-navy-600 text-sm leading-relaxed">
                        {detail}
                      </span>
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

          {/* Why Choose Us Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <div className="mb-8">
                <p className="text-gold-500 font-semibold text-sm uppercase tracking-[0.15em] mb-3">
                  How we work
                </p>
                <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 leading-tight">
                  Property management that actually manages.
                </h3>
              </div>

              <p className="text-navy-600 text-sm leading-relaxed mb-8">
                Most landlords in Kenya manage their own properties because they don't trust anyone else to. We're building Emalink to change that — one property at a time.
              </p>

              <div className="space-y-6">
                {reasons.map((reason, i) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-l-2 border-cream-300 pl-4 hover:border-gold-500 transition-colors cursor-default"
                  >
                    <h4 className="font-semibold text-navy-800 text-base mb-2">
                      {reason.title}
                    </h4>
                    <p className="text-xs text-navy-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center border-t border-cream-200 pt-12"
        >
          <p className="text-navy-600 text-lg mb-6">
            All services included in our transparent 10% management fee.
          </p>
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-6 py-3">
            <span className="text-sm font-semibold text-gold-600">
              ✓ No hidden fees
            </span>
            <span className="text-navy-400">•</span>
            <span className="text-sm font-semibold text-gold-600">
              ✓ All-inclusive service
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
