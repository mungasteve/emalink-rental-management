"use client";

import { motion } from "framer-motion";

const integrations = [
  { name: "M-Pesa", note: "Rent collection" },
  { name: "Equity Bank", note: "Owner payouts" },
  { name: "KCB", note: "Owner payouts" },
  { name: "EARB", note: "Licensed agents" },
  { name: "ISK", note: "Certified surveyors" },
];

export function TrustStrip() {
  return (
    <section className="py-8 sm:py-10 bg-white border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider shrink-0">
            Works with
          </p>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {integrations.map((item) => (
              <div key={item.name} className="text-center sm:text-left">
                <p className="text-sm font-bold text-navy-800">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
