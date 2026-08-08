"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LoadingScreen() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only play intro on Home page AND only on first visit per session
    if (pathname === "/" && typeof window !== "undefined") {
      const hasSeenIntro = sessionStorage.getItem("hasLoadedIntro");
      if (!hasSeenIntro) {
        setIsLoading(true);
        sessionStorage.setItem("hasLoadedIntro", "true");
        
        const dismiss = () => setIsLoading(false);

        if (document.readyState === "complete") {
          // Page & images already loaded
          const timer = setTimeout(dismiss, 300);
          return () => clearTimeout(timer);
        } else {
          // Dismiss loading as soon as images and assets are ready
          window.addEventListener("load", dismiss);
          // Safety timeout so it never hangs
          const fallback = setTimeout(dismiss, 1500);

          return () => {
            window.removeEventListener("load", dismiss);
            clearTimeout(fallback);
          };
        }
      }
    }
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="fixed inset-0 z-[999999] bg-[#0D0D0D] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col items-center"
          >
            <Image 
              src="/images/MY LOGO.png" 
              alt="Gary Studio Logo" 
              width={240} 
              height={96} 
              sizes="200px"
              className="w-40 md:w-52 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

