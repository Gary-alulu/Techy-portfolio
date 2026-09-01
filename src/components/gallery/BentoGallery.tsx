"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import ExpandableImage from "@/components/ui/ExpandableImage";
import Link from "next/link";
import { IProject } from "@/models/Project";
import { ArrowUpRight } from "lucide-react";

export default function BentoGallery({ projects }: { projects: IProject[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scrollY instead of container target for global parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Split projects into 3 columns
  const col1: IProject[] = [];
  const col2: IProject[] = [];
  const col3: IProject[] = [];

  projects.forEach((p, i) => {
    if (i % 3 === 0) col1.push(p);
    else if (i % 3 === 1) col2.push(p);
    else col3.push(p);
  });

  // Refined Parallax transforms (smoother, less extreme)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Handle bento sizing
  const getBentoClasses = (index: number, colIndex: number) => {
    // Generate some variety in aspect ratios
    const isTall = (index + colIndex) % 3 === 0;
    const isSquare = (index + colIndex) % 3 === 1;
    
    if (isTall) return "aspect-[3/4]";
    if (isSquare) return "aspect-square";
    return "aspect-[4/3]"; // Wide
  };

  const ProjectCard = ({ project, index, colIndex }: { project: IProject, index: number, colIndex: number }) => {
    return (
      <Link href={`/work/${project.slug}`} className="block w-full">
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className={`relative w-full rounded-[var(--radius-container)] overflow-hidden group ${getBentoClasses(index, colIndex)} border border-white/5`}
        >
          {/* Subtle base overlay for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
          
          {project.thumbnailUrl ? (
            <ExpandableImage 
              src={project.thumbnailUrl} 
              alt={project.title} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
            />
          ) : (
            <div className="w-full h-full bg-neutral-900 z-0" />
          )}
          
          {/* Content */}
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">
            {/* Top Right Arrow */}
            <div className="flex justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
            
            {/* Bottom Text */}
            <div className="flex flex-col items-start opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
              <span className="glass-pill px-3 py-1.5 text-[0.65rem] md:text-xs font-semibold tracking-[0.15em] uppercase text-white/90 mb-3 w-fit">
                {project.category || "Exploration"}
              </span>
              <h3 className="text-2xl md:text-3xl font-medium tracking-wide text-white leading-tight drop-shadow-lg">
                {project.title}
              </h3>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

  return (
    <div ref={containerRef} className="pb-24 overflow-hidden min-h-screen relative">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent-blue)]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-[var(--color-accent-orange)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Header */}
        <div className="py-24 md:py-32 flex flex-col items-center text-center cursor-default select-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full"
          >
            <h1 
              className="text-[14vw] md:text-[9vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent transition-all duration-700 hover:text-white"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
            >
              VISUAL
            </h1>
            <h1 className="text-[14vw] md:text-[9vw] leading-[0.8] font-black uppercase tracking-tighter text-white">
              GALLERY
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl mt-8 font-light"
          >
            A curated showcase of aesthetic moments, design explorations, and premium digital identities.
          </motion.p>
        </div>

        {/* Bento Grid */}
        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex justify-center items-center h-64 text-white/50 text-xl border border-white/10 rounded-[var(--radius-container)] bg-white/5"
          >
            No images uploaded yet.
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* Column 1 */}
            <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8">
              {col1.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} colIndex={0} />
              ))}
            </motion.div>

            {/* Column 2 */}
            <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-8 hidden md:flex pt-12">
              {col2.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} colIndex={1} />
              ))}
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: y3 }} className="flex flex-col gap-6 md:gap-8 hidden md:flex pt-24">
              {col3.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} colIndex={2} />
              ))}
            </motion.div>

            {/* Mobile fallback for Col 2 and 3 */}
            <div className="flex flex-col gap-6 md:hidden">
              {[...col2, ...col3].map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} colIndex={1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
