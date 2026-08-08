"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mb-32 pt-12 flex flex-col items-center text-center px-4">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[var(--color-accent-purple)]/20 rounded-full blur-[100px] -z-10" />
      <motion.div 
        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full glass-panel opacity-50 -z-10"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -10, 0], rotate: [0, -5, 0] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full glass-panel opacity-30 -z-10 backdrop-blur-[40px]"
      />

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 max-w-5xl tracking-tight"
      >
        Helping brands create digital experiences people <span className="text-[var(--color-accent-blue)]">remember.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-[var(--color-secondary)] max-w-2xl mb-12"
      >
        Whether you&apos;re launching a startup, refreshing your brand, or building a modern web application, I design experiences that look exceptional and perform even better.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-6"
      >
        <Link href="/contact" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
          Start a Project
        </Link>
        <Link href="/work" className="glass-pill px-8 py-4 font-medium hover:bg-white/10 active:scale-95 transition-all duration-200 hover:text-white">
          View My Work
        </Link>
      </motion.div>
    </section>
  );
}
