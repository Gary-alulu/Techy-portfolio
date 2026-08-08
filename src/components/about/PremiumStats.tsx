"use client";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

function Counter({ from, to }: { from: number, to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });
  
  const spring = useSpring(from, { damping: 40, stiffness: 100 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, spring, to]);

  return <motion.span ref={nodeRef}>{display}</motion.span>;
}

const STATS = [
  { label: "Projects Delivered", value: 120, suffix: "+" },
  { label: "Happy Clients", value: 45, suffix: "+" },
  { label: "Years Designing", value: 8, suffix: "" },
  { label: "Years Coding", value: 4, suffix: "" },
];

export function PremiumStats() {
  return (
    <section className="py-24 relative max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-10 md:p-12 text-center rounded-[var(--radius-card)] group hover:bg-white/5 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-orange)]/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 font-mono">
              <Counter from={0} to={stat.value} />
              <span className="text-[var(--color-accent-orange)]">{stat.suffix}</span>
            </h3>
            <p className="text-[var(--color-secondary)] font-medium text-xs sm:text-sm uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
