"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Users,
  Users2,
  Wrench,
  CreditCard,
  Scale,
  Megaphone,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Tenant Relations",
    description: "We act as the point of contact between you and your tenants.",
    expandedContent: "Our dedicated property managers handle all day-to-day operations, ensuring your property is well-maintained and your tenants are satisfied. We conduct regular inspections, manage lease renewals, resolve tenant issues promptly, and coordinate all maintenance activities. You'll have direct access to your manager for any concerns.",
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
    expandedContent: "We conduct thorough vetting of all potential tenants to minimize risk. Our screening process includes comprehensive background checks, employment verification with current employers, reference calls from previous landlords, and credit assessments. This ensures you get reliable tenants who pay on time and respect your property.",
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
    expandedContent: "Maintenance requests are logged immediately and tracked to completion. We have a vetted network of reliable contractors for all types of repairs. For costs above KES 10,000, we get your approval before proceeding. Emergency repairs are handled 24/7 to minimize tenant disruption and property damage.",
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
    expandedContent: "We handle all rent collection through M-Pesa and bank transfers, with automatic reminders sent to tenants. You receive detailed monthly statements showing rent collected, expenses paid, and your net payout. Payments are processed instantly, and you're notified of every transaction. No more chasing tenants for rent.",
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
    expandedContent: "All leases are drafted in compliance with Kenyan law and tailored to your property. We manage notice periods, handle eviction procedures when necessary, and ensure you're always compliant with the Landlord-Tenant Act. Our legal expertise protects you from costly disputes and ensures proper documentation.",
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
    expandedContent: "We market your property across all major Kenyan rental portals with professional photography and HD video tours. Our social media campaigns reach qualified tenants actively searching for rentals. We handle tenant acquisition from start to finish, minimizing vacancy periods and maximizing your rental income.",
    details: [
      "Listings on major Kenyan portals",
      "Social media marketing",
      "High-definition video tours",
      "Tenant acquisition support",
    ],
  },
];

export function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
    <section className="section-padding bg-gradient-to-b from-white to-cream-50 scroll-mt-24">
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
              Huduma Kamili — Complete Service
            </span>
          </div>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3 leading-tight">
            Everything a Nairobi landlord needs.
          </h2>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed">
            Tenant screening, M-Pesa rent collection, maintenance coordination, and legal compliance — all under one roof.
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
              className="group bg-white rounded-2xl elevation-card hover:elevation-card-hover transition-all duration-300 ease-out border border-cream-200 hover:border-gold-500/30 overflow-hidden flex flex-col h-full"
            >
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="w-full text-left p-6 sm:p-8 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 flex flex-col flex-1"
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
                <p className="text-navy-600 text-base leading-relaxed font-medium mb-6 flex-1">
                  {service.description}
                </p>

                {/* Expand Button - pinned to bottom */}
                <div className="flex items-center gap-2 text-gold-600 font-semibold text-sm mt-auto">
                  <span>
                    {expandedIndex === index ? "Show less" : "Learn more"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIndex === index ? "auto" : 0,
                  opacity: expandedIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-cream-200"
              >
                <div className="px-6 sm:px-8 py-6 bg-cream-50">
                  <p className="text-navy-700 text-sm leading-relaxed mb-6">
                    {service.expandedContent}
                  </p>
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
                </div>
              </motion.div>
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
