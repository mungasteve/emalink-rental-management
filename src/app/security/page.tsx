"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Database, CheckCircle, Clock, FileText } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "All data in transit is encrypted using TLS 1.3. Sensitive data at rest is encrypted using AES-256.",
    status: "Live",
  },
  {
    icon: Database,
    title: "Secure Data Storage",
    desc: "Data hosted on Vercel's PostgreSQL infrastructure with automatic daily backups and disaster recovery.",
    status: "Live",
  },
  {
    icon: Shield,
    title: "Access Control",
    desc: "Role-based access control (RBAC) ensures users only access data they're authorized to view.",
    status: "Live",
  },
  {
    icon: FileText,
    title: "Audit Logging",
    desc: "All user actions are logged for compliance and security investigation purposes.",
    status: "Live",
  },
];

const complianceRoadmap = [
  {
    title: "Kenya Data Protection Act 2019",
    desc: "Full compliance with KDPA requirements for data handling, consent, and user rights.",
    status: "In Progress",
    timeline: "Q3 2025",
  },
  {
    title: "SOC 2 Type II",
    desc: "Third-party audit of security, availability, processing integrity, confidentiality, and privacy.",
    status: "Planned",
    timeline: "Q4 2025",
  },
  {
    title: "ISO 27001",
    desc: "International standard for information security management systems.",
    status: "Planned",
    timeline: "Q1 2026",
  },
  {
    title: "PCI DSS Compliance",
    desc: "Payment Card Industry Data Security Standard for secure payment processing.",
    status: "Planned",
    timeline: "Q2 2026",
  },
];

export default function SecurityPage() {
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
              Security & Compliance
            </p>
            <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Your data is protected.
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              We take security seriously. Here's exactly how we protect your property data and financial information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Current Security Features */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Security Features (Live)
            </h2>
            <p className="text-navy-600 text-lg">
              These security measures are active on Emalink today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 elevation-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                    {feature.status}
                  </span>
                </div>
                <h3 className="font-semibold text-navy-800 text-lg mb-2">{feature.title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Handling */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Data Handling & Infrastructure
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-cream-50 rounded-xl p-6 border border-border"
            >
              <h3 className="font-semibold text-navy-800 text-lg mb-4">Where Your Data Lives</h3>
              <ul className="space-y-3 text-navy-600 text-sm">
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>PostgreSQL database hosted on Vercel's infrastructure</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>Automatic daily backups with 30-day retention</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>Disaster recovery plan with RTO of 4 hours</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>99.95% uptime SLA</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-cream-50 rounded-xl p-6 border border-border"
            >
              <h3 className="font-semibold text-navy-800 text-lg mb-4">Incident Response</h3>
              <ul className="space-y-3 text-navy-600 text-sm">
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>24/7 security monitoring and alerting</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>Documented incident response procedures</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>User notification within 72 hours of breach</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>Regular security audits and penetration testing</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance Roadmap */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Compliance Roadmap
            </h2>
            <p className="text-navy-600 text-lg">
              Our commitment to enterprise-grade compliance standards.
            </p>
          </motion.div>

          <div className="space-y-4">
            {complianceRoadmap.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-navy-800 text-lg">{item.title}</h3>
                    <p className="text-navy-600 text-sm mt-1">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                        item.status === "Live"
                          ? "bg-green-100 text-green-700"
                          : item.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-600">
                  <Clock className="w-4 h-4" />
                  <span>{item.timeline}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Details */}
      <section className="section-padding bg-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4">
              Questions about security?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Contact our security team for detailed documentation, penetration test results, or compliance certifications.
            </p>
            <a
              href="mailto:security@emalink.co.ke"
              className="inline-block bg-gold-500 text-navy-800 font-semibold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors"
            >
              security@emalink.co.ke
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
