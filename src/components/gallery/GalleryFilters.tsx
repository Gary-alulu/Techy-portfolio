"use client";

import { motion } from "framer-motion";

interface GalleryFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function GalleryFilters({ categories, activeCategory, onSelect }: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
      {["All", ...categories].map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors border border-white/10 ${
              isActive ? "text-black" : "text-white/70 hover:text-white bg-neutral-900/50"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
