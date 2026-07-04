"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Building2, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "Licensed & Regulated",
    desc: "Fully compliant with Kenya's Estate Agents Act and registered with the Estate Agents Registration Board.",
  },
  {
    icon: Award,
    title: "Professional Standards",
    desc: "Our team holds certifications from the Institution of Surveyors of Kenya (ISK) and EARB.",
  },
  {
    icon: Building2,
    title: "Portfolio Ready",
    desc: "Infrastructure built to manage 1 to 1,000+ units — from single landlords to large property firms.",
  },
  {
    icon: Users,
    title: "Early Access Open",
    desc: "Join property owners and tenants already onboarding ahead of our official launch.",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-navy-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-gold-500/10 text-gold-400 text-sm font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full mb-3">
            Launching Soon
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Built on Trust, Before Day One
          </h2>
          <p className="text-white/60 text-sm max-w-xl mx-auto">
            We&apos;re not asking you to take our word for it — here&apos;s what
            we&apos;re backed by before we even open the doors.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10" style={{ perspective: "1000px" }}>
          {trustSignals.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, rotateX: 15, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              whileHover={{ rotateX: -4, rotateY: 3, scale: 1.03, y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 cursor-default"
            >
              <div className="h-9 w-9 rounded-lg bg-gold-500/10 flex items-center justify-center mb-4">
                <item.icon className="h-4.5 w-4.5 text-gold-400" />
              </div>
              <p className="font-semibold text-white text-lg mb-1.5">{item.title}</p>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-gold-500/20 rounded-2xl p-8 text-center bg-gold-500/[0.03]"
        >
          <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">
            Be Among the First
          </p>
          <h3 className="text-white font-[var(--font-heading)] text-xl font-bold mb-2">
            Your review could be the first one here.
          </h3>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Get early access, priority onboarding, and locked-in pricing before
            we go public.
          </p>
          <LinkButton href="/contact" variant="gold" size="lg">
            Request Early Access
          </LinkButton>
        </motion.div>
      </div>
    </section>
  );
}
