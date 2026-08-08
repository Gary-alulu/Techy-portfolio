"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="max-w-5xl mx-auto px-4 mb-24 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-12 md:p-20 rounded-[var(--radius-container)] text-center relative overflow-hidden group border-white/10 hover:border-white/20 transition-colors"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[var(--color-accent-blue)]/20 to-[var(--color-accent-purple)]/20 rounded-full blur-[100px] -z-10 group-hover:scale-110 transition-transform duration-1000" />
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Have an idea?</h2>
        <p className="text-xl md:text-2xl text-[var(--color-secondary)] mb-12 max-w-2xl mx-auto">
          Let&apos;s turn it into something exceptional.
        </p>
        
        <Link 
          href="/contact"
          className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Start a Project
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}
