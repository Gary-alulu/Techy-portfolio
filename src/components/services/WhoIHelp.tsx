"use client";
import { motion } from "framer-motion";
import { Rocket, Store, TrendingUp, Paintbrush } from "lucide-react";

const HELPS = [
  { icon: <Rocket className="w-6 h-6 text-blue-400" />, title: "Startups", desc: "Need an MVP quickly and a scalable design foundation." },
  { icon: <Store className="w-6 h-6 text-green-400" />, title: "Small Businesses", desc: "Need a modern online presence to build trust and convert." },
  { icon: <TrendingUp className="w-6 h-6 text-orange-400" />, title: "Growing Brands", desc: "Need a stronger visual identity to stand out in the market." },
  { icon: <Paintbrush className="w-6 h-6 text-purple-400" />, title: "Creative Teams", desc: "Need an experienced design and frontend partner to execute." },
];

export default function WhoIHelp() {
  return (
    <section className="mb-32 max-w-5xl mx-auto px-4 mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Who I Help</h2>
        <p className="text-[var(--color-secondary)] text-lg">Partnering with ambitious teams and individuals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HELPS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 rounded-[var(--radius-card)] group hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-[var(--color-secondary)] text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
