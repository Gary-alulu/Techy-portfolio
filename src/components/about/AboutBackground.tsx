"use client";
import { motion } from "framer-motion";

export function AboutBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#0a0a0a]">
      {/* Layer 1: Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#050505]" />

      {/* Layer 2: Animated mesh */}
      <motion.div 
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%", "0% 0%"],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(at 40% 20%, rgba(255,107,0,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,117,255,0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(157,0,255,0.15) 0px, transparent 50%)",
          backgroundSize: "200% 200%"
        }}
      />

      {/* Layer 3: Noise texture */}
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')", backgroundRepeat: "repeat" }} />

      {/* Layer 4: Blurred glowing blobs */}
      <motion.div 
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[var(--color-accent-orange)]/10 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--color-accent-blue)]/10 rounded-full blur-[140px]"
      />

      {/* Layer 5: Glass reflections */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.02]" />

      {/* Layer 6: Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
