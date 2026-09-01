"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ExpandableImageProps extends ImageProps {
  wrapperClassName?: string;
}

export default function ExpandableImage({
  wrapperClassName,
  className,
  ...props
}: ExpandableImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div 
        className={`relative cursor-pointer group ${wrapperClassName || ""}`}
        onClick={() => setIsExpanded(true)}
      >
        <Image className={`transition-transform duration-300 group-hover:scale-[1.02] ${className || ""}`} {...props} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-inherit flex items-center justify-center pointer-events-none">
          {/* Optional: Add an expand icon on hover if desired */}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm cursor-zoom-out"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[101]"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                {...props}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
