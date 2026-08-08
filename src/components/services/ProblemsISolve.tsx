"use client";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

const PROBLEMS = [
  { prob: "Your website feels outdated.", sol: "Modern, responsive website." },
  { prob: "Your product isn't intuitive.", sol: "User-centered Interface." },
  { prob: "Your brand lacks consistency.", sol: "Strong Brand Identity." },
  { prob: "Your UI isn't converting users.", sol: "Interactive Prototype & Testing." },
  { prob: "You have an idea but no design direction.", sol: "Production-ready Frontend & Strategy." },
];

export default function ProblemsISolve() {
  return (
    <section className="mb-32 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Problems I Solve</h2>
        <p className="text-[var(--color-secondary)] text-lg">From friction to flow.</p>
      </div>

      <div className="space-y-6">
        {PROBLEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 glass-panel rounded-[var(--radius-container)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-transparent to-green-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
            
            <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
              <XCircle className="w-6 h-6 text-red-400 shrink-0" />
              <p className="text-[var(--color-secondary)] group-hover:text-white/50 transition-colors duration-500">{item.prob}</p>
            </div>
            
            <div className="hidden md:block w-12 h-px bg-white/20 relative overflow-hidden shrink-0">
               <motion.div 
                 initial={{ x: "-100%" }}
                 whileInView={{ x: "100%" }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
               />
            </div>
            
            <div className="flex items-center gap-4 flex-1 md:justify-end w-full md:w-auto mt-4 md:mt-0">
              <p className="font-medium text-white/50 group-hover:text-white transition-colors duration-500">{item.sol}</p>
              <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_rgba(74,222,128,0)] group-hover:shadow-[0_0_15px_rgba(74,222,128,0.5)] rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
