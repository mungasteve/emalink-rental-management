"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Home, DollarSign } from "lucide-react";

const stats = [
  { icon: Home, label: "Properties", value: "500+", color: "from-gold-500/20 to-gold-500/5" },
  { icon: Users, label: "Active Users", value: "2.3K", color: "from-blue-500/20 to-blue-500/5" },
  { icon: DollarSign, label: "Managed", value: "KES 2.4B", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: TrendingUp, label: "Occupancy", value: "94%", color: "from-purple-500/20 to-purple-500/5" },
];

export function HeroStats() {
  return (
    <div className="hidden lg:block space-y-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-gold-400" />
            </div>
            <span className="text-xs font-semibold text-gold-400">Live</span>
          </div>
          <p className="text-white font-bold text-2xl mb-1">{stat.value}</p>
          <p className="text-white/60 text-xs">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
