"use client";

import { motion } from "framer-motion";

export default function HomeProcess() {
  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Creative Process</h2>
        <p className="text-[var(--color-secondary)] max-w-xl mx-auto">From concept to launch, a structured approach to delivering premium digital experiences.</p>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto gap-12 md:gap-0">
        {/* Animated Line connecting steps */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[var(--color-glass-border)] -translate-y-1/2 hidden md:block z-0" />
        {/* Vertical line for mobile */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[var(--color-glass-border)] -translate-x-1/2 md:hidden z-0" />
        
        {[
          { step: '01', title: 'Discover' },
          { step: '02', title: 'Strategy' },
          { step: '03', title: 'Design' },
          { step: '04', title: 'Develop' },
          { step: '05', title: 'Launch' },
        ].map((item, i) => (
          <motion.div 
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-4 group"
          >
            <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-lg font-bold group-hover:border-[var(--color-accent-orange)] transition-colors duration-300">
              {item.step}
            </div>
            <span className="font-medium">{item.title}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
