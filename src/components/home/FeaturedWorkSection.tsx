"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FeaturedWorkSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.success) {
          setProjects(
            data.projects
              .map((p: any) => ({ ...p, _id: p._id?.toString?.() || p._id }))
              .slice(0, 4)
          );
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-4">Selected Work</h2>
          <p className="text-[var(--color-secondary)]">A curated collection of my recent projects.</p>
        </div>
        <Link href="/work" className="hidden sm:flex items-center gap-2 hover:text-[var(--color-accent-orange)] transition-colors group">
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First item large */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[400px] sm:h-[500px] rounded-[var(--radius-container)] bg-white/5 animate-pulse" />
          <div className="col-span-1 h-[350px] sm:h-[400px] md:h-[500px] rounded-[var(--radius-container)] bg-white/5 animate-pulse" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-[var(--radius-container)] bg-white/5">
          <h3 className="text-2xl font-bold mb-3">Coming Soon...</h3>
          <p className="text-[var(--color-secondary)] max-w-sm">
            New case studies are currently being documented. Check back later to see my latest work!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any, index: number) => {
            const isLarge = index === 0;
            
            return (
              <Link 
                key={project._id}
                href={`/work/${project.slug}`} 
                className={`group block relative rounded-[var(--radius-container)] overflow-hidden ${
                  isLarge 
                    ? 'col-span-1 md:col-span-2 lg:col-span-2 h-[400px] sm:h-[500px]' 
                    : 'col-span-1 h-[350px] sm:h-[400px] md:h-[500px]'
                }`}
              >
                <div className="absolute inset-0 bg-neutral-900/50 group-hover:scale-105 transition-transform duration-700 ease-out z-0">
                  {project.thumbnailUrl ? (
                    <Image src={project.thumbnailUrl} alt={project.title} fill className="object-cover opacity-80" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black opacity-80" />
                  )}
                </div>
                {/* Subtle overall darkening */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                
                {/* Glassmorphic Gradient Mask */}
                <div className="absolute inset-x-0 bottom-0 h-[70%] blur-gradient-overlay z-10" />
                
                {/* Glassmorphic Tint */}
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                
                <div className={`absolute inset-0 flex flex-col justify-end z-20 ${isLarge ? 'p-8 md:p-12' : 'p-6 md:p-10'}`}>
                  <span className="glass-pill px-3 py-1.5 text-[0.65rem] md:text-xs font-semibold tracking-[0.15em] uppercase text-white/90 mb-3 w-fit">{project.category}</span>
                  <h3 className={`${isLarge ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} font-medium tracking-wide mb-2 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500`}>
                    {project.title}
                  </h3>
                  {isLarge && project.shortDescription && (
                    <p className="text-white/70 text-sm md:text-base max-w-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-100 font-light mt-2">
                      {project.shortDescription}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
      
      <div className="sm:hidden flex justify-center pt-8">
        <Link href="/work" className="glass-pill px-6 py-3 font-medium flex items-center gap-2">
          View All Work <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
