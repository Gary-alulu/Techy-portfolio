"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const phoneNumber = "254769680739";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi%20Gary!%20I'd%20like%20to%20inquire%20about%20starting%20a%20project.`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 2200); // Match loading screen duration (2200ms)
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || pathname.startsWith("/admin") || !hasLoaded) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-10 right-6 md:bottom-12 md:right-10 z-[9999] flex flex-col items-end gap-3"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-end gap-3"
      >
        {/* Cancel Button */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsVisible(false)}
          className="bg-neutral-900/50 backdrop-blur-md border border-white/10 text-[var(--color-secondary)] hover:text-white hover:bg-neutral-800/80 p-1.5 rounded-full shadow-lg transition-all duration-300"
          aria-label="Close WhatsApp widget"
        >
          <X className="w-4 h-4" />
        </motion.button>

        {/* Main WhatsApp Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur-xl border border-[#25D366]/30 p-2.5 md:p-3.5 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] hover:border-[#25D366]/60 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-[#25D366]/10 to-[#25D366]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          
          {/* WhatsApp Icon Container */}
          <div className="bg-[#25D366]/10 p-2.5 rounded-full group-hover:bg-[#25D366]/20 transition-colors">
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 md:w-7 md:h-7 relative z-10 fill-[#25D366]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </div>

          {/* Expanding Text */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative z-10 font-medium text-sm text-white whitespace-nowrap overflow-hidden hidden sm:block"
              >
                <span className="pl-1 pr-4">Inquire on WhatsApp</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
