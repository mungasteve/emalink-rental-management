"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
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
              Built by property managers, for property managers.
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Emalink was founded to solve the real problems property owners face in Kenya. We have been managing properties ourselves, so we know what works.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Founder Section */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Founded by E.O Masara
            </h2>
            <p className="text-navy-600 text-lg max-w-2xl">
              With years of experience managing properties across Kenya, E.O Masara founded Emalink to bring professional property management tools to every landlord.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 elevation-card"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl h-80 overflow-hidden">
                <img src="/images/clay-banks-urH155LONWs-unsplash.jpg" alt="Emalink office" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-navy-800 mb-4">
                  E.O Masara
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed mb-4">
                  E.O Masara founded Emalink after years of managing properties in Nairobi. Working directly with landlords, tenants, and maintenance teams gave him a clear view of where the process breaks down — and what a better system would look like.
                </p>
                <p className="text-navy-600 text-sm leading-relaxed">
                  Emalink is built on that experience: transparent fees, clear communication, and no surprises for landlords or tenants.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">Our Mission</h3>
              <p className="text-white/70 text-sm">
                Make professional property management accessible to every landlord in Kenya.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">Our Values</h3>
              <p className="text-white/70 text-sm">
                Transparency, reliability, and putting landlords first in everything we do.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">Our Commitment</h3>
              <p className="text-white/70 text-sm">
                Continuous improvement and support for every property owner we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Work with us from the start
            </h2>
            <p className="text-navy-600 text-lg mb-8 max-w-2xl mx-auto">
              We are onboarding our first landlords now. Get direct access to the founder and shape how the platform works.
            </p>
            <LinkButton href="/contact" variant="gold" size="lg" className="px-8">
              Schedule a Demo
            </LinkButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
