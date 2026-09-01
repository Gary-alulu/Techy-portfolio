"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface WatermarkedImageProps extends ImageProps {
  expandable?: boolean;
}

export default function WatermarkedImage({ 
  src, 
  alt, 
  className, 
  fill,
  expandable = true,
  ...props 
}: WatermarkedImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract the string URL from the src prop
  const srcString = typeof src === 'string' ? src : (src as any).src || "";
  
  // Construct the URL to our API route
  const watermarkedSrc = `/api/watermark?url=${encodeURIComponent(srcString)}`;

  return (
    <>
      <div 
        className={`${fill ? 'absolute inset-0' : 'relative'} w-full h-full ${expandable ? 'cursor-pointer group' : ''}`}
        onClick={() => expandable && setIsExpanded(true)}
      >
        {/* The original image shown on the page. pointer-events-none prevents direct interaction. */}
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className={`pointer-events-none ${expandable ? 'transition-transform duration-300 group-hover:scale-[1.02]' : ''} ${className || ""}`}
          {...props}
        />
        
        {/* The invisible watermarked image that receives the right-click and Save Image As action */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={watermarkedSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full opacity-0 z-10 cursor-context-menu ${className || ""}`}
        />

        {expandable && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        )}
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
                src={src}
                alt={alt}
                fill
                className="object-contain pointer-events-none"
                sizes="100vw"
                quality={100}
                priority
              />
              
              {/* Invisible watermarked image overlay for the fullscreen view */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={watermarkedSrc}
                alt={alt}
                className="absolute inset-0 w-full h-full object-contain opacity-0 z-10 cursor-context-menu"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
