"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Shield, Zap } from "lucide-react";

const features = [
  { icon: CheckCircle, label: "Rent Collection", desc: "Automated M-Pesa payments", color: "from-gold-500/20 to-gold-500/5" },
  { icon: Clock, label: "24/7 Support", desc: "Tenant & owner assistance", color: "from-blue-500/20 to-blue-500/5" },
  { icon: Shield, label: "Secure", desc: "Bank-grade encryption", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: Zap, label: "Fast Setup", desc: "Live in 24 hours", color: "from-purple-500/20 to-purple-500/5" },
];

export function HeroStats() {
  return (
    <div className="hidden lg:block space-y-4">
      {features.map((feature, i) => (
        <motion.div
          key={feature.label}
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
          className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <feature.icon className="w-5 h-5 text-gold-400" />
            </div>
          </div>
          <p className="text-white font-bold text-lg mb-1">{feature.label}</p>
          <p className="text-white/60 text-xs">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
