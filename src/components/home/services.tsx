"use client";

import { motion } from "framer-motion";
import {
  Building,
  Users,
  Wrench,
  DollarSign,
  Scale,
  Megaphone,
} from "lucide-react";

const services = [
  {
    icon: Building,
    title: "Property Management",
    description:
      "We act as the point of contact between you and your tenants. Inspections, renewals, complaints — handled.",
  },
  {
    icon: Users,
    title: "Tenant Screening",
    description:
      "Background checks, employment verification, and reference calls before anyone gets the keys.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Reported issues get assigned to vetted contractors. You approve costs above a set threshold — nothing more.",
  },
  {
    icon: DollarSign,
    title: "Rent & Payouts",
    description:
      "M-Pesa and bank collection, automatic reminders, and monthly owner statements with every transaction itemised.",
  },
  {
    icon: Scale,
    title: "Legal & Compliance",
    description:
      "Lease drafting, notice periods, and eviction support — all within Kenya's Landlord and Tenant Act.",
  },
  {
    icon: Megaphone,
    title: "Vacancy Marketing",
    description:
      "Listings on major Kenyan portals, social media, and our own network to minimise empty units.",
  },
];

export function Services() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-navy-600 font-semibold text-sm uppercase tracking-[0.15em] mb-2">
            What We Handle
          </p>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 max-w-sm">
            Everything between you and your tenant.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 lg:gap-x-12 lg:gap-y-8" style={{ perspective: "1000px" }}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24, rotateX: 10, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              whileHover={{ scale: 1.02, rotateX: -2, z: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
              className="flex gap-4 group"
            >
              <div className="shrink-0 h-11 w-11 rounded-lg bg-navy-800 flex items-center justify-center group-hover:bg-navy-700 transition-colors">
                <service.icon className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-800 text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
