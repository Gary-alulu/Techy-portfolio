"use client";
import { ServiceType } from "@/app/services/page";
import { motion } from "framer-motion";

interface Props {
  selected: ServiceType[];
}

const DEFAULT_PROCESS = [
  { step: "Discover", desc: "Understanding goals" },
  { step: "Research", desc: "Market & user analysis" },
  { step: "Strategy", desc: "Planning the approach" },
  { step: "Design", desc: "Visuals & prototypes" },
  { step: "Develop", desc: "Building the solution" },
  { step: "Launch", desc: "Testing & deployment" },
];

export default function ProcessJourney({ selected }: Props) {
  const process = DEFAULT_PROCESS.filter(p => {
    if (selected.length === 0) return true;
    if (p.step === "Develop" && !selected.includes("frontend")) return false;
    return true; 
  });

  return (
    <section className="mb-32 max-w-6xl mx-auto px-4 overflow-hidden py-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">My Process</h2>
        <p className="text-[var(--color-secondary)] text-lg">A structured journey from idea to execution.</p>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-8 no-scrollbar snap-x px-4">
        {process.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center snap-center shrink-0 group"
          >
            <div className="w-40 h-40 rounded-full glass-panel flex flex-col items-center justify-center p-4 text-center border-white/10 group-hover:border-[var(--color-accent-blue)] transition-colors duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent-blue)]/0 to-[var(--color-accent-blue)]/0 group-hover:from-[var(--color-accent-blue)]/20 rounded-full transition-all duration-500" />
              <span className="text-sm font-medium text-[var(--color-accent-blue)] mb-2 relative z-10">0{i + 1}</span>
              <h3 className="font-bold text-lg mb-1 relative z-10">{item.step}</h3>
              <p className="text-[var(--color-secondary)] text-xs leading-tight relative z-10">{item.desc}</p>
            </div>
            
            {i < process.length - 1 && (
              <div className="w-8 md:w-16 h-px bg-white/20 mx-2 relative overflow-hidden shrink-0">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear", delay: i * 0.2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
