"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  { name: "All" },
  { name: "UI/UX Design" },
  { name: "Front End Design" },
  { name: "Brand Identity" },
  { name: "Motion Graphics" }
];

const SUB_CATEGORIES: Record<string, string[]> = {
  "Brand Identity": ["Graphic Design", "Print Media"]
};

export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
  shortDescription?: string;
  thumbnailUrl?: string;
}

let cachedProjects: Project[] | null = null;

export function WorkContent({ activeCategory, projects: initialProjects }: { activeCategory: string, projects?: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || cachedProjects || []);
  const [active, setActive] = useState(activeCategory);
  const [activeSub, setActiveSub] = useState("All");
  const [isLoading, setIsLoading] = useState(!initialProjects && !cachedProjects);

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      cachedProjects = initialProjects;
      return;
    }
    if (cachedProjects) {
      setProjects(cachedProjects);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.success) {
          const mapped = data.projects.map((p: any) => ({ ...p, _id: p._id?.toString?.() || p._id }));
          cachedProjects = mapped;
          setProjects(mapped);
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [initialProjects]);

  const filteredProjects = useMemo(
    () => projects.filter((p) => {
      if (active !== "All" && p.category !== active) return false;
      if (activeSub !== "All" && p.subCategory !== activeSub) return false;
      return true;
    }),
    [projects, active, activeSub]
  );

  return (
    <div className="pb-24">
      <div className="pt-32 pb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Work<span className="text-[var(--color-accent-blue)]">.</span></h1>
        <p className="text-xl text-[var(--color-secondary)] max-w-2xl">
          A selection of projects where strategy, design, and code converge to create premium digital experiences.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-12 flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category.name}
            onClick={() => setActive(category.name)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer ${
              active === category.name 
                ? "bg-white text-black font-medium"
                : "glass-pill text-[var(--color-secondary)] hover:text-white hover:bg-white/10"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Sub Category Filter (e.g. Print Media under Brand Identity) */}
      {SUB_CATEGORIES[active] && (
        <div className="-mt-6 mb-12 flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {["All", ...SUB_CATEGORIES[active]].map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`px-5 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer text-sm ${
                activeSub === sub
                  ? "bg-white/90 text-black font-medium"
                  : "glass-pill text-[var(--color-secondary)] hover:text-white hover:bg-white/10"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Project Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-[400px]" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-32 text-center border border-white/5 rounded-[var(--radius-container)] bg-white/5"
        >
          <h3 className="text-3xl font-bold mb-4">Coming Soon...</h3>
          <p className="text-[var(--color-secondary)] max-w-md">
            New case studies are currently being documented. Check back later to see my latest work!
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/work/${project.slug}`} className="group block relative h-[400px] rounded-[var(--radius-container)] overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-900/50 group-hover:scale-105 transition-transform duration-700 ease-out z-0">
                    {project.thumbnailUrl ? (
                      <Image 
                        src={project.thumbnailUrl} 
                        alt={project.title} 
                        fill 
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-80" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black opacity-80" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-[70%] blur-gradient-overlay z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                  
                  <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="absolute left-6 right-6 bottom-6 md:left-10 md:right-10 md:bottom-10 z-20">
                    <div className="transform translate-y-0 group-hover:-translate-y-10 transition-transform duration-500 ease-out">
                      <span className="glass-pill px-3 py-1.5 text-[0.65rem] md:text-xs font-semibold tracking-[0.15em] uppercase text-white/90 mb-3 w-fit inline-block">
                        {project.category}{project.subCategory ? ` • ${project.subCategory}` : ""}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-wide text-white">{project.title}</h3>
                    </div>
                    <p className="text-white/60 text-sm line-clamp-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.shortDescription || "View the full case study →"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Premium Gallery Call to Action */}
      <div className="mt-32 py-24 md:py-32 relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-neutral-950 border border-white/10 flex flex-col items-center justify-center group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[var(--color-accent-blue)]/20 rounded-full blur-[100px] transition-transform duration-1000 group-hover:scale-110 group-hover:translate-x-12 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[var(--color-accent-orange)]/20 rounded-full blur-[100px] transition-transform duration-1000 group-hover:scale-110 group-hover:-translate-x-12 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full">
          <span className="glass-pill px-4 py-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/80 mb-8 md:mb-12 w-fit mx-auto">
            Visual Explorations
          </span>
          
          <div className="flex flex-col items-center mb-8 md:mb-12 w-full cursor-default select-none">
            <h2 
              className="text-[14vw] md:text-[9vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent transition-all duration-700 hover:text-white"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
            >
              VISUAL
            </h2>
            <h2 className="text-[14vw] md:text-[9vw] leading-[0.8] font-black uppercase tracking-tighter text-white">
              ARCHIVE
            </h2>
          </div>
          
          <p className="text-white/60 text-base md:text-xl max-w-2xl mx-auto mb-12 md:mb-16 font-light">
            Step beyond the case studies. Explore a curated stream of photography, design experiments, and visual brand identities crafted over the years.
          </p>

          <Link 
            href="/gallery"
            className="relative flex items-center gap-6 group/btn hover:scale-105 transition-transform duration-300"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white transition-colors duration-500 overflow-hidden relative backdrop-blur-sm bg-white/5">
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover/btn:text-black absolute transition-all duration-500 group-hover/btn:translate-x-16" />
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-black absolute transition-all duration-500 -translate-x-16 group-hover/btn:translate-x-0" />
            </div>
            <span className="text-lg md:text-2xl font-medium tracking-[0.1em] uppercase">Open Gallery</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
