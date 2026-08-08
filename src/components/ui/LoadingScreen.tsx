"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LoadingScreen() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only trigger on initial load, not on client-side route changes
    setIsLoading(true);
    document.body.style.overflow = "hidden";
    
    // Home page gets the longer logo intro, other pages get a snappier intro
    const duration = pathname === "/" ? 2200 : 1800;

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []); // Empty dependency array = only runs on initial page load

  const premiumEase = [0.76, 0, 0.24, 1] as const;
  const decelerateEase = [0.16, 1, 0.3, 1] as const;

  const isHome = pathname === "/";
  
  // Extract and format the page name from the pathname
  const rawPath = pathname.split('/')[1] || "";
  const pageName = isHome ? "" : rawPath.charAt(0).toUpperCase() + rawPath.slice(1);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: premiumEase }
          }}
          className="fixed inset-0 z-[999999] bg-[#0D0D0D] flex items-center justify-center pointer-events-auto"
        >
          {/* Subtle background pulse */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 0.2, 0.1], scale: [0.9, 1.1, 1] }}
            transition={{ duration: isHome ? 2.2 : 1.8, ease: decelerateEase }}
            className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent-orange)]/10 via-transparent to-[var(--color-accent-blue)]/10"
          />

          {isHome ? (
            /* --- HOME PAGE LOGO INTRO --- */
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                filter: "blur(0px)",
                transition: { duration: 1.2, ease: decelerateEase }
              }}
              exit={{ 
                scale: 0.95, 
                opacity: 0,
                filter: "blur(5px)",
                transition: { duration: 0.6, ease: premiumEase }
              }}
              className="relative z-10"
            >
              <Image 
                src="/images/MY LOGO.png" 
                alt="Gary Studio Logo" 
                width={300} 
                height={120} 
                className="w-48 md:w-64 h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                priority
              />
            </motion.div>
          ) : (
            /* --- OTHER PAGES TYPOGRAPHIC INTRO --- */
            <motion.div
              initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
              animate={{ 
                y: 0, 
                opacity: 1, 
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: decelerateEase, delay: 0.1 }
              }}
              exit={{ 
                y: -20, 
                opacity: 0,
                filter: "blur(5px)",
                transition: { duration: 0.4, ease: premiumEase }
              }}
              className="relative z-10 flex flex-col items-center gap-8"
            >
              {/* Logo on Subpages */}
              <Image 
                src="/images/MY LOGO.png" 
                alt="Gary Studio Logo" 
                width={200} 
                height={80} 
                className="w-32 md:w-40 h-auto object-contain opacity-50 mb-4"
                priority
              />
              
              <div className="flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                  {pageName}
                </h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: premiumEase, delay: 0.3 }}
                  className="h-[2px] bg-[var(--color-accent-orange)] mt-6 rounded-full shadow-[0_0_15px_var(--color-accent-orange)]" 
                />
              </div>
            </motion.div>
          )}

          {/* Loading progress bar - All Pages now get progress bar */}
          <motion.div
            className="absolute bottom-24 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: decelerateEase }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4, ease: premiumEase } }}
          >
            <motion.div
              className="h-full bg-[var(--color-accent-orange)] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: isHome ? 1.4 : 1.0, ease: premiumEase }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
