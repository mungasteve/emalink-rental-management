"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

const pricingTiers = [
  {
    name: "Individual",
    description: "For single property owners",
    price: "2%",
    period: "of collected rent",
    features: [
      "Up to 5 properties",
      "Up to 20 units",
      "Rent collection via M-Pesa",
      "Tenant portal",
      "Maintenance tracking",
      "Monthly statements",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Portfolio",
    description: "For growing property portfolios",
    price: "1.5%",
    period: "of collected rent",
    features: [
      "Unlimited properties",
      "Unlimited units",
      "Rent collection via M-Pesa",
      "Tenant portal",
      "Maintenance tracking",
      "Monthly statements",
      "Multi-user access (up to 5 users)",
      "Accountant access",
      "Priority email support",
      "Custom reporting",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large portfolios & institutions",
    price: "Custom",
    period: "based on volume",
    features: [
      "Unlimited everything",
      "Dedicated account manager",
      "Custom integrations",
      "API access",
      "Bulk import/export",
      "Advanced reporting & analytics",
      "Role-based access control",
      "SLA commitments",
      "24/7 phone support",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "How is the 2% calculated?",
    a: "The percentage is calculated on rent actually collected through Emalink. If a tenant pays KES 50,000, you pay KES 1,000 (2%). No hidden fees.",
  },
  {
    q: "What if I use M-Pesa outside Emalink?",
    a: "You can manually log payments in Emalink. We only charge on rent collected through our platform.",
  },
  {
    q: "Can I switch tiers?",
    a: "Yes. You can upgrade or downgrade anytime. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees. You only pay for rent collected. First month is free to test the platform.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Bank transfer, M-Pesa, or direct deduction from collected rent. Choose what works best for you.",
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
              Transparent Pricing
            </p>
            <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Simple, honest pricing.
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              No hidden fees. You only pay when rent is collected. Choose the plan that fits your portfolio.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 transition-all ${
                  tier.highlighted
                    ? "bg-navy-800 text-white border-2 border-gold-500 shadow-lg scale-105"
                    : "bg-white border border-border elevation-card"
                }`}
              >
                {tier.highlighted && (
                  <div className="mb-4">
                    <span className="bg-gold-500 text-navy-800 text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <h3 className={`font-[var(--font-heading)] text-2xl font-bold mb-1 ${tier.highlighted ? "text-white" : "text-navy-800"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-6 ${tier.highlighted ? "text-white/70" : "text-navy-600"}`}>
                  {tier.description}
                </p>

                <div className="mb-6">
                  <div className={`text-4xl font-bold ${tier.highlighted ? "text-gold-400" : "text-navy-800"}`}>
                    {tier.price}
                  </div>
                  <p className={`text-sm ${tier.highlighted ? "text-white/60" : "text-navy-600"}`}>
                    {tier.period}
                  </p>
                </div>

                <LinkButton
                  href="/contact"
                  variant={tier.highlighted ? "gold" : "outline"}
                  className="w-full mb-8 justify-center"
                >
                  {tier.cta}
                </LinkButton>

                <div className="space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? "text-gold-400" : "text-gold-500"}`} />
                      <span className={`text-sm ${tier.highlighted ? "text-white/80" : "text-navy-700"}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-cream-50 rounded-xl p-6 border border-border"
              >
                <h3 className="font-semibold text-navy-800 text-lg mb-2">{faq.q}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
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
              First month is free. No credit card required. Start managing your properties today.
            </p>
            <LinkButton href="/contact" variant="gold" size="lg" className="px-8">
              Request Early Access
            </LinkButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
