"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Link from "next/link";
import { useResumeModal } from "@/context/ResumeModalContext";

export default function HomeHero() {
  const { openModal } = useResumeModal();
  return (
    <section className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 relative">
      {/* Left Content */}
      <div className="flex-1 space-y-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[var(--color-accent-orange)] font-medium tracking-wider text-sm uppercase mb-4">
            Hi, I&apos;m Gary.
          </h2>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            Digital Product <br /> Designer<span className="text-[var(--color-accent-blue)]">.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-[var(--color-secondary)] max-w-xl leading-relaxed"
        >
          I create brands, design experiences, and build modern web applications. 
          Blending aesthetics with robust engineering to deliver premium digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link
              href="/work"
              className="relative overflow-hidden glass-pill px-8 py-3.5 text-sm font-medium flex items-center justify-center hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,107,0,0.4)] transition-all duration-300"
            >
              <motion.span 
                animate={{ x: ["-100%", "250%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"
              />
              <span className="relative z-10">View My Work</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link
              href="/contact"
              className="px-8 py-3.5 text-sm font-medium hover:text-[var(--color-accent-blue)] transition-colors duration-300 flex items-center justify-center"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <button
              onClick={openModal}
              className="group relative overflow-hidden px-8 py-3.5 text-sm rounded-full bg-white/5 border border-white/10 font-medium text-center hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300 flex items-center justify-center gap-2"
              title="View Resume"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Download className="w-4 h-4 group-hover:text-white transition-colors" />
              </motion.div>
              <span className="relative z-10">
                Resume
              </span>
              {/* Animated Bottom Border on Hover */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:w-3/4 transition-all duration-500"></span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Floating Cards */}
      <div className="flex-1 w-full flex flex-col justify-center items-end gap-5 mt-12 lg:mt-0">
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 1, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full max-w-[360px] lg:max-w-[440px] glass-panel bg-[#0a0a0a] border-white/10 p-4 lg:p-7 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-full bg-[var(--color-accent-orange)]/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[var(--color-accent-orange)] shadow-[0_0_15px_var(--color-accent-orange)]" />
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-1">UI/UX Design</h3>
              <p className="text-sm lg:text-base text-[var(--color-secondary)] leading-snug">Crafting intuitive and engaging user experiences.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, -1, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-full max-w-[360px] lg:max-w-[440px] glass-panel bg-[#0a0a0a] border-white/10 p-4 lg:p-7 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-full bg-[var(--color-accent-blue)]/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[var(--color-accent-blue)] shadow-[0_0_15px_var(--color-accent-blue)]" />
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-1">Frontend Dev</h3>
              <p className="text-sm lg:text-base text-[var(--color-secondary)] leading-snug">Building responsive and performant web applications.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -12, 0],
            x: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="w-full max-w-[360px] lg:max-w-[440px] glass-panel bg-[#0a0a0a] border-white/10 p-4 lg:p-7 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-full bg-[var(--color-accent-purple)]/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[var(--color-accent-purple)] shadow-[0_0_15px_var(--color-accent-purple)]" />
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-1">Brand Identity</h3>
              <p className="text-sm lg:text-base text-[var(--color-secondary)] leading-snug">Developing cohesive and memorable brand systems.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
