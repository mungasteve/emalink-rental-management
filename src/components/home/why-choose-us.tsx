"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";

export function WhyChooseUs() {
  return (
    <section className="bg-navy-800 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold-400 font-semibold text-xs uppercase tracking-[0.2em] mb-8">
            Why Emalink
          </p>

          <p className="font-[var(--font-heading)] text-xl sm:text-2xl text-white leading-relaxed mb-8">
            Most landlords in Nairobi manage their own properties because handing the rent roll to a stranger is worse than doing it yourself. We exist because that shouldn&apos;t be the only choice.
          </p>

          <div className="space-y-6 text-white/60 text-sm leading-relaxed">
            <p>
              Our fee is a flat 10% of what we actually collect — nothing more. There&apos;s no charge for a vacant unit, no setup cost, and nothing is deducted from your account without a statement showing what it was for.
            </p>
            <p>
              Rent moves through M-Pesa first, with bank transfer also accepted. Both you and your tenant get instant confirmation the moment a payment lands.
            </p>
            <p>
              Every lease we draft and every notice we issue follows Kenya&apos;s Landlord and Tenant Act. If a tenant needs to be given notice or evicted, it&apos;s done through the process the law actually requires.
            </p>
          </div>

          <div className="border-t border-white/10 pt-8 mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-white/40 text-sm flex-1">
              Onboarding our first landlords now — direct access to the founder.
            </p>
            <LinkButton href="/contact" variant="gold" size="sm" className="shrink-0">
              Get in touch
            </LinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
