"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";

export function Services() {
  return (
    <section className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-gold-500 font-semibold text-xs uppercase tracking-[0.2em]">
            What we handle
          </span>
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mt-3 leading-snug">
            Everything between you and your tenants.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-8 text-navy-600 text-[15px] leading-[1.8]"
        >
          <p>
            <strong className="text-navy-800">Tenant screening.</strong> Before anyone gets a set of keys, we run background checks, verify their employment, and call their references directly. This happens before a lease is signed, not after a problem shows up.
          </p>

          <p>
            <strong className="text-navy-800">Rent collection.</strong> Rent is collected through M-Pesa or bank transfer, with an automatic reminder sent before it&apos;s due. Payment is confirmed instantly to both you and your tenant, so neither of you is left guessing whether it went through. Every month, you receive a statement showing exactly what was collected and what it cost — if a tenant pays KES 50,000, our fee is KES 5,000, and that&apos;s the only deduction.
          </p>

          <p>
            <strong className="text-navy-800">Maintenance.</strong> When something breaks, it&apos;s logged and tracked until it&apos;s fixed. We use a vetted contractor network across Nairobi. Anything that will cost more than KES 10,000 comes to you for approval first — we don&apos;t spend your money without asking.
          </p>

          <p>
            <strong className="text-navy-800">Tenant relations.</strong> We&apos;re the point of contact for your tenants day to day, so complaints, questions, and routine requests come to us instead of your phone at midnight.
          </p>

          <p>
            <strong className="text-navy-800">Legal &amp; compliance.</strong> Leases are drafted under Kenya&apos;s Landlord and Tenant Act. Where a notice or an eviction becomes necessary, it&apos;s handled through the correct legal process, not a shortcut that creates a bigger problem later.
          </p>

          <p>
            <strong className="text-navy-800">Marketing &amp; vacancy.</strong> Empty units are listed on BuyRentKenya, Property24, and our own tenant network. You aren&apos;t charged for a vacancy we haven&apos;t managed to fill yet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 pt-8 border-t border-cream-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-navy-500 text-sm">
            One fee. All six included.{" "}
            <span className="font-semibold text-navy-800">10% of what we collect.</span>
          </p>
          <LinkButton href="/contact" variant="gold" size="sm">
            Talk to us
          </LinkButton>
        </motion.div>
      </div>
    </section>
  );
}
