"use client";
import { motion } from "framer-motion";

const LINES = [
  "Great design isn't decoration.",
  "It's clarity.",
  "It's emotion.",
  "It's solving problems beautifully."
];

export function DesignPhilosophy() {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      {/* Subtle Liquid Waves Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] rounded-[100%] blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center z-10 space-y-4">
        {LINES.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: idx * 0.3, ease: "easeOut" }}
          >
            <h2 className={`text-4xl md:text-6xl font-bold tracking-tight ${idx === 0 ? "text-[var(--color-secondary)]" : "text-white"}`}>
              {line}
            </h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
