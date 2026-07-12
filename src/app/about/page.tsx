"use client";

import { motion } from "framer-motion";
import { Users, Award, Target } from "lucide-react";
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
                <p className="text-navy-600 text-sm leading-relaxed mb-6">
                  E.O Masara brings decades of property management experience to Emalink. Having managed hundreds of properties and worked directly with landlords, tenants, and maintenance teams, he understands the operational challenges that property owners face daily.
                </p>
                <p className="text-navy-600 text-sm leading-relaxed mb-6">
                  His vision for Emalink is simple: create a platform that makes property management transparent, efficient, and fair for everyone involved.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-navy-800">Nairobi-Based Team</p>
                      <p className="text-navy-600 text-sm">Managing properties across Kenya</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-navy-800">Dedicated Professionals</p>
                      <p className="text-navy-600 text-sm">Supporting property owners daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Our Team
            </h2>
            <p className="text-navy-600 text-lg max-w-2xl mx-auto">
              A dedicated team committed to making property management easier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-cream-50 rounded-xl p-6 text-center elevation-card"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-navy-800 text-lg mb-1">Team Member</h3>
                <p className="text-navy-600 text-sm mb-3">Role</p>
                <p className="text-navy-600 text-xs leading-relaxed">
                  Dedicated to delivering excellent property management solutions.
                </p>
              </motion.div>
            ))}
          </div>
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
              Join property owners already using Emalink
            </h2>
            <p className="text-navy-600 text-lg mb-8 max-w-2xl mx-auto">
              Manage your properties with confidence. Schedule a demo today.
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
