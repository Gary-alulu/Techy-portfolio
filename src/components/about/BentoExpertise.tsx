"use client";
import { motion } from "framer-motion";

export function BentoExpertise() {
  return (
    <section className="py-24 relative max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Core Expertise</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {/* UI Design - Spans 2 columns */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass-panel rounded-[var(--radius-card)] p-10 md:p-12 relative overflow-hidden group hover:bg-white/5 transition-colors"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-blue)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-2xl font-bold mb-2">UI/UX Design</h3>
          <p className="text-[var(--color-secondary)] max-w-sm">Designing intuitive, accessible, and beautiful interfaces that people love to use.</p>
          <div className="absolute bottom-10 left-10 flex gap-3">
             <span className="glass-pill px-4 py-2 text-sm font-medium">Figma</span>
             <span className="glass-pill px-4 py-2 text-sm font-medium">Protopie</span>
          </div>
        </motion.div>

        {/* Frontend - Spans 1 column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-[var(--radius-card)] p-10 md:p-12 relative overflow-hidden group hover:bg-white/5 transition-colors"
        >
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--color-accent-orange)]/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
          <h3 className="text-2xl font-bold mb-2">Frontend</h3>
          <p className="text-[var(--color-secondary)] text-sm">Bringing designs to life with modern code.</p>
          <div className="absolute bottom-10 left-10 flex flex-col gap-2">
             <span className="text-sm font-medium text-[var(--color-secondary)]">React / Next.js</span>
             <span className="text-sm font-medium text-[var(--color-secondary)]">Tailwind CSS</span>
          </div>
        </motion.div>

        {/* Motion - Spans 1 column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-[var(--radius-card)] p-10 md:p-12 relative overflow-hidden group hover:bg-white/5 transition-colors"
        >
          <h3 className="text-2xl font-bold mb-2">Motion</h3>
          <p className="text-[var(--color-secondary)] text-sm">Adding delight through micro-interactions.</p>
          <div className="absolute bottom-10 left-10">
            <span className="glass-pill px-4 py-2 text-sm font-medium">Framer Motion</span>
          </div>
        </motion.div>

        {/* Branding - Spans 2 columns */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 glass-panel rounded-[var(--radius-card)] p-10 md:p-12 relative overflow-hidden group hover:bg-white/5 transition-colors flex flex-col justify-end"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[var(--color-accent-purple)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Brand Identity</h3>
            <p className="text-[var(--color-secondary)] max-w-md">Creating cohesive visual systems that tell a compelling story across all mediums.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
