"use client";

import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
              Transparent Terms
            </p>
            <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Clear, simple contract terms.
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              No surprises. Here's exactly what you're agreeing to when you partner with Emalink.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contract Terms */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Service Agreement
            </h2>
            <p className="text-navy-600 text-lg">
              Standard terms for all Emalink property management services.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Contract Term */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 elevation-card"
            >
              <h3 className="font-semibold text-navy-800 text-xl mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-gold-500" />
                Contract Term
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Initial Term</p>
                  <p className="text-navy-600">3 to 5 years, as agreed between Emalink and the property owner.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Renewal</p>
                  <p className="text-navy-600">Automatic renewal unless either party provides written notice 30 days before expiration.</p>
                </div>
              </div>
            </motion.div>

            {/* Cancellation Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-8 elevation-card"
            >
              <h3 className="font-semibold text-navy-800 text-xl mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-gold-500" />
                Cancellation
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Notice Period</p>
                  <p className="text-navy-600">30 days written notice required to terminate the agreement.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Early Termination</p>
                  <p className="text-navy-600">Early termination is allowed with 30 days notice. No penalties or hidden fees.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Final Settlement</p>
                  <p className="text-navy-600">All outstanding rent collected and expenses paid are settled within 7 days of termination.</p>
                </div>
              </div>
            </motion.div>

            {/* Management Fee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-8 elevation-card"
            >
              <h3 className="font-semibold text-navy-800 text-xl mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-gold-500" />
                Management Fee
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Fee Structure</p>
                  <p className="text-navy-600">10% of gross receipts collected through Emalink.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">What's Included</p>
                  <ul className="text-navy-600 space-y-1 ml-4">
                    <li>• Rent collection and M-Pesa integration</li>
                    <li>• Tenant screening and management</li>
                    <li>• Maintenance coordination</li>
                    <li>• Monthly financial statements</li>
                    <li>• 24/7 platform access</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Payment</p>
                  <p className="text-navy-600">Fee is deducted from collected rent or paid separately via bank transfer or M-Pesa.</p>
                </div>
              </div>
            </motion.div>

            {/* Interest-Free Loans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-8 elevation-card border-2 border-gold-500/20"
            >
              <h3 className="font-semibold text-navy-800 text-xl mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-gold-500" />
                Interest-Free Landlord Loans
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Availability</p>
                  <p className="text-navy-600">Short-term loans available to qualified property owners managing properties through Emalink.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Interest Rate</p>
                  <p className="text-navy-600">Zero interest. Loans are recovered directly from collected rent.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Use Cases</p>
                  <p className="text-navy-600">Property improvements, maintenance, emergency repairs, or other property-related needs.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Application</p>
                  <p className="text-navy-600">Contact our team to discuss eligibility and loan terms.</p>
                </div>
              </div>
            </motion.div>

            {/* Maintenance Threshold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-8 elevation-card"
            >
              <h3 className="font-semibold text-navy-800 text-xl mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-gold-500" />
                Maintenance Approval Threshold
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Approval Required</p>
                  <p className="text-navy-600">Any single repair issue above KES 10,000 requires owner approval before proceeding.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Routine Maintenance</p>
                  <p className="text-navy-600">Repairs below KES 10,000 can be approved by our maintenance team for faster resolution.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 mb-1">Emergency Repairs</p>
                  <p className="text-navy-600">Critical issues (water leaks, electrical hazards, etc.) are handled immediately with owner notification.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6"
          >
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Questions About Terms?</h3>
                <p className="text-blue-800 text-sm mb-4">
                  These are our standard terms. If you have specific requirements or questions, we're happy to discuss custom arrangements.
                </p>
                <LinkButton href="/contact" variant="outline" size="sm">
                  Contact Us
                </LinkButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Schedule a demo to learn more about how Emalink can help manage your properties.
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
