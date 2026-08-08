"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="py-32 relative max-w-5xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-panel p-12 md:p-24 rounded-[var(--radius-container)] relative overflow-hidden group"
      >
        {/* Background glowing meshes */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent-orange)]/10 via-transparent to-[var(--color-accent-blue)]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -right-[20%] w-[800px] h-[800px] bg-[var(--color-accent-orange)]/5 rounded-full blur-[100px] pointer-events-none"
        />
        
        <div className="relative z-10 space-y-8">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Have an idea?</h2>
          <p className="text-xl md:text-2xl text-[var(--color-secondary)] max-w-2xl mx-auto">
            Let's transform it into an exceptional digital experience.
          </p>
          
          <Link href="/contact" className="inline-block mt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors">Start a Project</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
