"use client";

import { motion } from "framer-motion";

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-navy-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <p className="text-gold-300 font-semibold text-sm uppercase tracking-[0.15em] mb-4">
              Why Emalink
            </p>
            <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Property management that actually manages.
            </h2>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Intro Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/70 text-lg leading-relaxed"
            >
              Most landlords in Kenya manage their own properties because they don't trust anyone else to. We're building Emalink to change that — one property at a time. Our approach is fundamentally different because we understand that property management isn't just about collecting rent. It's about building trust, maintaining transparency, and delivering results that matter.
            </motion.p>

            {/* Key Points Section */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 pt-4"
            >
              {/* Point 1 */}
              <div className="border-l-2 border-gold-500 pl-6">
                <h3 className="font-semibold text-white text-xl mb-2">
                  We don't disappear after signing
                </h3>
                <p className="text-white/60 leading-relaxed">
                  A dedicated manager is assigned to your property from day one. You have their direct line — not a support ticket queue that gets lost in the system. Your manager knows your property, understands your goals, and is accountable for results. They're your single point of contact for everything, ensuring nothing falls through the cracks.
                </p>
              </div>

              {/* Point 2 */}
              <div className="border-l-2 border-gold-500 pl-6">
                <h3 className="font-semibold text-white text-xl mb-2">
                  You see every shilling
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Monthly statements break down exactly what happened with your property. Rent collected, expenses paid, maintenance costs, and what lands in your account. No surprises, no hidden fees, no guesswork. You get detailed itemized reports showing every transaction, so you always know where your money is and how it's being managed.
                </p>
              </div>

              {/* Point 3 */}
              <div className="border-l-2 border-gold-500 pl-6">
                <h3 className="font-semibold text-white text-xl mb-2">
                  Maintenance doesn't stall
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Issues get logged immediately, assigned to vetted contractors, and tracked to completion. You're notified at each step — not after the fact. Emergency repairs are handled 24/7 to minimize tenant disruption and property damage. For costs above KES 10,000, you approve before we proceed. This means your property stays in top condition and your tenants stay satisfied.
                </p>
              </div>

              {/* Point 4 */}
              <div className="border-l-2 border-gold-500 pl-6">
                <h3 className="font-semibold text-white text-xl mb-2">
                  Compliant from day one
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Leases, notices, and eviction procedures follow Kenyan law. We keep you protected without you needing to know the Landlord-Tenant Act inside and out. Our legal expertise ensures proper documentation, protects you from costly disputes, and keeps everything above board. You can focus on growing your portfolio while we handle the legal complexity.
                </p>
              </div>
            </motion.div>

            {/* Closing Statement */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/70 text-lg leading-relaxed pt-4 border-t border-white/10"
            >
              At Emalink, we believe property management should be simple, transparent, and professional. You shouldn't have to choose between managing your properties yourself or trusting someone who disappears. We're here to prove there's a better way — one where you get dedicated attention, complete transparency, and peace of mind knowing your properties are in capable hands.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
