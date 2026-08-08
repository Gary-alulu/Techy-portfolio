"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IProject } from "@/models/Project";
import WatermarkedImage from "@/components/ui/WatermarkedImage";

interface GalleryGridProps {
  projects: IProject[];
}

export default function GalleryGrid({ projects }: GalleryGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="w-full py-24 flex items-center justify-center border border-white/5 rounded-3xl bg-neutral-900/30">
        <p className="text-white/50 text-lg">No projects found in this category.</p>
      </div>
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
      <AnimatePresence mode="popLayout">
        {projects.map((project, idx) => {
          // Break the grid monotony by making featured projects span 2 columns and 2 rows,
          // or just 2 columns depending on the layout desired.
          const isFeatured = project.featured;
          
          return (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              key={project._id || project.slug}
              className={`group relative overflow-hidden rounded-[2rem] bg-neutral-900 border border-white/5 ${
                isFeatured ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"
              }`}
            >
              <Link href={`/work/${project.slug}`} className="absolute inset-0 block w-full h-full">
                {project.thumbnailUrl ? (
                  <WatermarkedImage 
                    src={project.thumbnailUrl} 
                    alt={project.title} 
                    fill 
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                    <span className="text-white/30">No Image</span>
                  </div>
                )}
                
                {/* Overlay Wash & Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-wider uppercase bg-white text-black rounded-full">
                      {project.category}
                    </span>
                    <h3 className={`font-bold text-white leading-tight ${isFeatured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
