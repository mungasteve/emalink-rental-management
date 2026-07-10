"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Lock, Zap, FileText, Bell } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

const features = [
  {
    icon: BarChart3,
    title: "Portfolio Dashboard",
    desc: "Real-time overview of all properties, units, occupancy rates, and financial performance in one view.",
  },
  {
    icon: FileText,
    title: "Financial Statements",
    desc: "Automated monthly statements showing rent collected, expenses paid, and net income per property.",
  },
  {
    icon: Bell,
    title: "Maintenance Tracking",
    desc: "Log, assign, and track maintenance requests from tenant report to completion.",
  },
  {
    icon: Users,
    title: "Tenant Management",
    desc: "Manage tenant profiles, lease agreements, payment history, and communication in one place.",
  },
  {
    icon: Zap,
    title: "Automated Collections",
    desc: "M-Pesa integration for automated rent collection with instant payment confirmation.",
  },
  {
    icon: Lock,
    title: "Secure Access",
    desc: "Role-based access control for owners, accountants, managers, and tenants.",
  },
];

export default function ProductPage() {
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
              The Platform
            </p>
            <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Built for property managers. Designed for Kenya.
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Emalink gives you complete visibility and control over your rental portfolio — from rent collection to maintenance to tenant communication.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Core Features
            </h2>
            <p className="text-navy-600 text-lg max-w-2xl">
              Everything you need to manage properties professionally.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 elevation-card hover:elevation-card-hover transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="font-semibold text-navy-800 text-lg mb-2">{feature.title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Owner Dashboard
            </h2>
            <p className="text-navy-600 text-lg">
              Complete portfolio visibility at a glance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-8 border border-white/10"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <p className="text-white/50 text-sm">Portfolio Overview</p>
                  <p className="text-white text-2xl font-bold">KES 2.4M</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-sm">This Month</p>
                  <p className="text-green-400 text-lg font-semibold">+12%</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/50 text-xs mb-1">Total Properties</p>
                  <p className="text-white text-2xl font-bold">12</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/50 text-xs mb-1">Total Units</p>
                  <p className="text-white text-2xl font-bold">48</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/50 text-xs mb-1">Occupancy Rate</p>
                  <p className="text-white text-2xl font-bold">94%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/50 text-xs mb-1">Pending Tasks</p>
                  <p className="text-white text-2xl font-bold">3</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <p className="text-white/50 text-sm mb-3">Recent Payments</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
                    <div>
                      <p className="text-white text-sm font-medium">Unit 4B - Westlands</p>
                      <p className="text-white/50 text-xs">Today at 2:45 PM</p>
                    </div>
                    <p className="text-green-400 font-semibold">+KES 45,000</p>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
                    <div>
                      <p className="text-white text-sm font-medium">Unit 2A - Kilimani</p>
                      <p className="text-white/50 text-xs">Yesterday at 10:15 AM</p>
                    </div>
                    <p className="text-green-400 font-semibold">+KES 85,000</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tenant Portal */}
      <section className="section-padding bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 mb-3">
              Tenant Portal
            </h2>
            <p className="text-navy-600 text-lg">
              Tenants manage payments and maintenance requests independently.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-border elevation-card"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="pb-6 border-b border-border">
                <p className="text-navy-600 text-sm mb-1">Welcome back</p>
                <p className="text-navy-800 text-2xl font-bold">Unit 4B, Westlands</p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gold-500 text-white rounded-lg p-4 font-semibold hover:bg-gold-600 transition-colors">
                  Pay Rent
                </button>
                <button className="bg-navy-800 text-white rounded-lg p-4 font-semibold hover:bg-navy-700 transition-colors">
                  Report Issue
                </button>
              </div>

              {/* Payment History */}
              <div>
                <p className="text-navy-800 font-semibold mb-3">Payment History</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-cream-100 rounded-lg p-3">
                    <div>
                      <p className="text-navy-800 text-sm font-medium">June 2025</p>
                      <p className="text-navy-600 text-xs">Paid via M-Pesa</p>
                    </div>
                    <p className="text-green-600 font-semibold">KES 45,000</p>
                  </div>
                  <div className="flex items-center justify-between bg-cream-100 rounded-lg p-3">
                    <div>
                      <p className="text-navy-800 text-sm font-medium">May 2025</p>
                      <p className="text-navy-600 text-xs">Paid via M-Pesa</p>
                    </div>
                    <p className="text-green-600 font-semibold">KES 45,000</p>
                  </div>
                </div>
              </div>

              {/* Maintenance Requests */}
              <div>
                <p className="text-navy-800 font-semibold mb-3">Active Requests</p>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-navy-800 font-medium">Water leak in bathroom</p>
                      <p className="text-navy-600 text-sm mt-1">Reported 2 days ago</p>
                    </div>
                    <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      In Progress
                    </span>
                  </div>
                </div>
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
              Ready to streamline your property management?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join property owners already using Emalink to manage their portfolios more efficiently.
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
