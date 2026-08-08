"use client";
import { ServiceType } from "@/app/services/page";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  selected: ServiceType[];
}

const ALL_DELIVERABLES = [
  { name: "Design System", type: ["uiux", "frontend"] },
  { name: "Figma File", type: ["uiux", "graphic"] },
  { name: "Source Files", type: ["graphic", "motion"] },
  { name: "Developer Assets", type: ["uiux"] },
  { name: "Interactive Prototype", type: ["uiux"] },
  { name: "Brand Guidelines", type: ["graphic"] },
  { name: "Motion Assets", type: ["motion"] },
  { name: "Production Code", type: ["frontend"] },
  { name: "Deployment Support", type: ["frontend"] },
];

export default function Deliverables({ selected }: Props) {
  const filtered = selected.length === 0 
    ? ALL_DELIVERABLES 
    : ALL_DELIVERABLES.filter(d => d.type.some(t => selected.includes(t as ServiceType)));

  return (
    <section className="mb-32 max-w-5xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">What You Get</h2>
        <p className="text-[var(--color-secondary)] text-lg">Tangible deliverables ready for production.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.name}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass-pill px-6 py-3 flex items-center gap-3 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all cursor-default"
          >
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-green-400" />
            </div>
            <span className="font-medium text-sm md:text-base">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
