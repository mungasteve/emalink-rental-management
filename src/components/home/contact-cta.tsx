"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";

export function ContactCTA() {
  return (
    <section className="section-padding bg-gold-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 gap-6 sm:gap-8 items-center"
        >
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3 sm:mb-4">
              Ready to get started?
            </h2>
            <p className="text-navy-800/70 text-base sm:text-lg leading-relaxed">
              Schedule a demo to see how Emalink can help you manage your properties more efficiently.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <LinkButton
              href="/contact"
              size="lg"
              variant="default"
              className="px-6 sm:px-8 w-full sm:w-auto justify-center"
            >
              Schedule Demo
            </LinkButton>
            <LinkButton
              href="/product"
              size="lg"
              variant="outline"
              className="border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white px-6 sm:px-8 w-full sm:w-auto justify-center"
            >
              Learn More
            </LinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
