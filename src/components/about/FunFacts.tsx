"use client";
import { motion } from "framer-motion";

const FACTS = [
  { label: "Favorite Font", value: "Inter / Roboto Mono" },
  { label: "Favorite Coffee", value: "Double Espresso" },
  { label: "Favorite Design Book", value: "The Design of Everyday Things" },
  { label: "Current Playlist", value: "Lofi Beats & Synthwave" },
];

export function FunFacts() {
  return (
    <section className="py-24 relative max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Fun Facts</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {FACTS.map((fact, idx) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, type: "spring" }}
            className="group relative h-40 cursor-default"
            style={{ perspective: "1000px" }}
          >
            <div className="w-full h-full transition-transform duration-700" style={{ transformStyle: "preserve-3d" }}>
              <style jsx>{`
                .group:hover > div {
                  transform: rotateY(180deg);
                }
              `}</style>
              
              <div 
                className="absolute inset-0 glass-panel rounded-[var(--radius-card)] flex items-center justify-center p-6 border border-white/10"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="font-bold text-lg text-white/50 text-center">{fact.label}</span>
              </div>
              
              <div 
                className="absolute inset-0 glass-panel rounded-[var(--radius-card)] flex items-center justify-center p-6 bg-white/5 border border-[var(--color-accent-purple)]/50"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="font-bold text-xl text-center text-white">{fact.value}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
