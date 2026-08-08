"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Palette, Code2, PenTool, Braces, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Floating Icons Data
const floatingIcons = [
  { Icon: Palette, x: "10%", y: "20%", delay: 0 },
  { Icon: Code2, x: "80%", y: "15%", delay: 1 },
  { Icon: PenTool, x: "20%", y: "70%", delay: 2 },
  { Icon: Braces, x: "75%", y: "80%", delay: 3 },
  { Icon: Terminal, x: "50%", y: "10%", delay: 1.5 },
];

export default function NotFoundScene() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Custom Cursor State
  const [cursorVariant, setCursorVariant] = useState("default");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring for cursor
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  // Interaction States
  const [clicks, setClicks] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);
  const [orbHovered, setOrbHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (clicks >= 5 && !easterEgg) {
      setEasterEgg(true);
    }
  }, [clicks, easterEgg]);

  // Cursor Variants
  const variants = {
    default: { height: 32, width: 32, backgroundColor: "rgba(255, 255, 255, 0.5)", mixBlendMode: "difference" as any },
    hover: { height: 64, width: 64, backgroundColor: "rgba(255, 255, 255, 0.2)", mixBlendMode: "difference" as any },
    liquid: { 
      height: 80, 
      width: 80, 
      backgroundColor: easterEgg ? "rgba(255, 100, 0, 0.4)" : "rgba(100, 200, 255, 0.4)", 
      filter: "blur(4px)",
      mixBlendMode: "screen" as any
    }
  };

  const handleOrbClick = () => {
    setClicks(c => c + 1);
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center font-sans sm:cursor-none select-none">
      
      {/* Custom Cursor (hidden on mobile via CSS but kept in tree) */}
      <motion.div
        className="hidden sm:block fixed top-0 left-0 rounded-full pointer-events-none z-50 backdrop-blur-sm"
        style={{ x: cursorX, y: cursorY }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Animated Background Mesh & Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30 ${easterEgg ? 'bg-green-600' : 'bg-orange-600'}`}
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30 ${easterEgg ? 'bg-purple-600' : 'bg-blue-600'}`}
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute z-0 text-white/10 pointer-events-none"
          style={{ top: item.y, left: item.x }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, delay: 1.5 + item.delay, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
        >
          <item.Icon className="w-12 h-12" />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6">
        
        {/* The 404 Display */}
        <motion.div 
          className="flex items-center justify-center gap-4 sm:gap-10 md:gap-20 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-7xl sm:text-9xl md:text-[12rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20 leading-none">
            4
          </span>

          {/* Interactive Glass Orb */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center justify-center">
            
            {/* Constellation Navigation (Visible on Orb Hover) */}
            <AnimatePresence>
              {orbHovered && (
                <motion.div 
                  className="absolute inset-[-100px] sm:inset-[-140px] pointer-events-none hidden sm:block z-30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top: Home */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Home</span>
                    <motion.div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" initial={{height:0}} animate={{height:64}} />
                  </div>
                  {/* Bottom: Contact */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <motion.div className="w-px h-16 bg-gradient-to-t from-white/30 to-transparent" initial={{height:0}} animate={{height:64}} />
                    <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Contact</span>
                  </div>
                  {/* Left: About */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-xs font-medium text-white/50 tracking-widest uppercase">About</span>
                    <motion.div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent" initial={{width:0}} animate={{width:64}} />
                  </div>
                  {/* Right: Work */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <motion.div className="h-px w-16 bg-gradient-to-l from-white/30 to-transparent" initial={{width:0}} animate={{width:64}} />
                    <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Work</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Draggable Orb */}
            <motion.div
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0.2}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => { setCursorVariant("liquid"); setOrbHovered(true); }}
              onMouseLeave={() => { setCursorVariant("default"); setOrbHovered(false); }}
              onClick={handleOrbClick}
              className={`relative z-20 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full cursor-grab active:cursor-grabbing shadow-[inset_0_0_40px_rgba(255,255,255,0.2)] backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden
                ${easterEgg ? 'bg-orange-500/20' : 'bg-white/5'}
              `}
            >
              {/* Orb Reflections */}
              <div className="absolute top-2 left-4 w-6 h-3 md:w-8 md:h-4 bg-white/40 rounded-full blur-[2px] rotate-[-30deg]"></div>
              <div className="absolute bottom-4 right-4 w-10 h-5 md:w-12 md:h-6 bg-white/10 rounded-full blur-[4px] rotate-[30deg]"></div>
              {easterEgg && <span className="text-xl md:text-3xl">😎</span>}
            </motion.div>
          </div>

          <span className="text-7xl sm:text-9xl md:text-[12rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-bl from-white to-white/20 leading-none">
            4
          </span>
        </motion.div>

        {/* Text Message */}
        <motion.div 
          className="text-center space-y-4 mb-12 min-h-[6rem] flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {easterEgg ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-orange-400">Achievement Unlocked</h2>
              <p className="text-[var(--color-secondary)] sm:text-lg max-w-md mx-auto mt-2">You found the hidden prototype. The universe is slightly different now.</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl sm:text-4xl font-medium tracking-tight">Looks like you wandered<br/>outside my creative universe.</h2>
              <p className="text-[var(--color-secondary)] sm:text-lg max-w-md mx-auto mt-2">
                Don't worry. Let's get you back to somewhere more inspiring.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link href="/" passHref legacyBehavior>
            <motion.a 
              className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium text-center overflow-hidden"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                Go Home <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          </Link>
          
          <Link href="/work" passHref legacyBehavior>
            <motion.a 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 font-medium text-center hover:bg-white/10 transition-colors"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work
            </motion.a>
          </Link>
        </motion.div>

        {/* Hint text */}
        <motion.p 
          className="mt-12 text-sm text-[var(--color-secondary)] opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Or... try dragging the glowing orb.
        </motion.p>
      </div>

      {/* Minimal Footer */}
      <motion.div 
        className="absolute bottom-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p className="text-xs text-[var(--color-secondary)]">Lost? Let's create something amazing instead.</p>
        <p className="text-xs text-[var(--color-secondary)] mt-1">gary@email.com</p>
      </motion.div>
      
    </div>
  );
}
