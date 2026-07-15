"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-navy-800 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/maria-ziegler-jJnZg7vBfMs-unsplash.jpg')" }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
              About Us
            </p>
            <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Built by a property manager, for property owners.
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Most landlords in Kenya manage their own properties because the alternative is worse than the hassle. Emalink exists because that shouldn&apos;t be the only choice.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Founder Section */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-6">
              Founded by S.M. Maranga
            </h2>

            <div className="grid md:grid-cols-[1fr_280px] gap-8 items-start">
              <div className="text-navy-600 text-[15px] leading-[1.8] space-y-4">
                <p>
                  S.M. Maranga founded Emalink after managing rental properties in Nairobi and seeing firsthand where the process breaks down for landlords — chasing rent, fielding midnight calls, dealing with contractors who disappear.
                </p>
                <p>
                  Working directly with landlords, tenants, and maintenance teams gave him a clear view of what a better system would look like: a flat 10% fee, monthly statements showing every shilling, and a named manager you can actually reach.
                </p>
                <p>
                  Emalink is that system, built from the ground up for how property management actually works in Kenya.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden h-64 md:h-full">
                <img src="/images/clay-banks-urH155LONWs-unsplash.jpg" alt="Residential apartments in Nairobi" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we stand for — plain text, no icon cards */}
      <section className="section-padding bg-navy-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/60 text-[15px] leading-[1.8] space-y-6"
          >
            <p className="text-white font-[var(--font-heading)] text-2xl sm:text-3xl font-bold leading-snug">
              What we stand for
            </p>
            <p>
              <strong className="text-white">No surprises.</strong> Every shilling collected and every expense paid shows up on your monthly statement. If we spend above KES 10,000 on a repair, you approved it first.
            </p>
            <p>
              <strong className="text-white">Kenyan law, followed correctly.</strong> Leases drafted under the Landlord and Tenant Act. Notices served properly. Evictions handled through the process the law requires — not shortcuts that create bigger problems.
            </p>
            <p>
              <strong className="text-white">Accessible to every landlord.</strong> Whether you own two units in South B or twenty in Kilimani, the service is the same. One fee, one standard, one named contact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-4">
              Work with us from the start
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed mb-8 max-w-xl">
              We are onboarding our first landlords now. Direct access to the founder, no middlemen, no support queue.
            </p>
            <LinkButton href="/contact" variant="gold" size="lg">
              Get in Touch
            </LinkButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
