"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Lightbulb, PenTool, Layout, Box, Rocket } from "lucide-react";

const STEPS = [
  { name: "Discover", icon: Search },
  { name: "Strategy", icon: Lightbulb },
  { name: "Wireframe", icon: Layout },
  { name: "Design", icon: PenTool },
  { name: "Develop", icon: Box },
  { name: "Launch", icon: Rocket },
];

export function CreativeProcess() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-20%", once: true });

  return (
    <section className="py-24 relative max-w-7xl mx-auto px-4 md:px-8 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">Creative Process</h2>
      </div>

      <div ref={containerRef} className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        
        {/* Connecting Lines */}
        <div className="absolute left-[39px] md:left-0 md:top-[39px] top-0 w-1 md:w-full h-full md:h-1 bg-white/5 -z-10 rounded-full" />
        
        {/* Desktop animated line */}
        <motion.div 
          className="hidden md:block absolute left-0 top-[39px] h-1 bg-[var(--color-accent-blue)] -z-10 rounded-full origin-left shadow-[0_0_15px_rgba(0,117,255,0.5)]"
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Mobile animated line */}
        <motion.div 
          className="md:hidden absolute left-[39px] top-0 w-1 bg-[var(--color-accent-blue)] -z-10 rounded-full origin-top shadow-[0_0_15px_rgba(0,117,255,0.5)]"
          initial={{ height: "0%" }}
          animate={isInView ? { height: "100%" } : { height: "0%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.name} className="flex flex-row md:flex-col items-center gap-6 md:gap-4 w-full md:w-auto relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ delay: idx * 0.3, type: "spring" }}
                className="w-20 h-20 shrink-0 rounded-full glass-panel flex items-center justify-center bg-[#0a0a0a] border-2 border-white/20 relative group hover:border-[var(--color-accent-blue)] hover:shadow-[0_0_30px_rgba(0,117,255,0.3)] transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-[var(--color-secondary)] group-hover:text-white transition-colors" />
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: idx * 0.3 + 0.2 }}
                  className="absolute inset-0 rounded-full bg-[var(--color-accent-blue)]/20 blur-md -z-10"
                />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: idx * 0.3 + 0.1 }}
                className="font-bold text-lg md:text-base"
              >
                {step.name}
              </motion.span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
