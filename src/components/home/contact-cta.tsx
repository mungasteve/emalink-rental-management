"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";

export function ContactCTA() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-border rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="max-w-sm">
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-2">
              Ready to get started?
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              Schedule a demo to see how Emalink can help you manage your properties more efficiently.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <LinkButton
              href="/contact"
              size="lg"
              variant="gold"
              className="px-6 w-full sm:w-auto justify-center"
            >
              Schedule Demo
            </LinkButton>
            <LinkButton
              href="/properties"
              size="lg"
              variant="outline"
              className="px-6 w-full sm:w-auto justify-center"
            >
              Browse Properties
            </LinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
