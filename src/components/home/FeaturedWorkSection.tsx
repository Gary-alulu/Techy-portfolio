"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Images } from "lucide-react";

interface PrintMediaItem {
  _id: string;
  title: string;
  imageUrl: string;
}

const PRINT_ROTATE_MS = 4000;

export default function FeaturedWorkSection({ initialProjects, initialPrintMedia, priorityCategory }: { initialProjects?: any[]; initialPrintMedia?: PrintMediaItem[]; priorityCategory?: string }) {
  const [projects, setProjects] = useState<any[]>(initialProjects || []);
  const [isLoading, setIsLoading] = useState(!initialProjects);
  const [displayCategory, setDisplayCategory] = useState(priorityCategory || "");

  const [printItems, setPrintItems] = useState<PrintMediaItem[]>(initialPrintMedia || []);
  const [printIndex, setPrintIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) setIsLoading(false);
    };

    const loadProjects = (category: string) => {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      params.set("excludeSubCategory", "Print Media");
      return fetch(`/api/projects?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (!cancelled && data.success) {
            setProjects(
              data.projects
                .slice(0, 3)
                .map((p: any) => ({ ...p, _id: p._id?.toString?.() || p._id }))
            );
          }
        })
        .catch(() => {});
    };

    fetch("/api/settings")
      .then((res) => res.json().catch(() => null))
      .then((data) => {
        if (cancelled) return;
        const realCategory = (data?.setting?.priorityCategory as string) || "";
        setDisplayCategory(realCategory);

        const serverUsedSameCategory =
          initialProjects && (priorityCategory || "") === realCategory;
        if (!serverUsedSameCategory) {
          return loadProjects(realCategory);
        }
      })
      .catch(() => {
        if (cancelled) return;
        if (!initialProjects) {
          return loadProjects(priorityCategory || "");
        }
      })
      .finally(() => finish());

    return () => {
      cancelled = true;
    };
  }, [initialProjects, priorityCategory]);

  useEffect(() => {
    if (initialPrintMedia && initialPrintMedia.length > 0) return;
    let cancelled = false;
    fetch("/api/print-media")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.success) {
          setPrintItems(
            data.items.map((it: any) => ({ ...it, _id: it._id?.toString?.() || it._id }))
          );
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [initialPrintMedia]);

  useEffect(() => {
    if (printItems.length <= 1) return;
    const id = window.setInterval(() => {
      setPrintIndex((i) => (i + 1) % printItems.length);
    }, PRINT_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [printItems.length]);

  const featuredProjects = projects.slice(0, 3);
  const currentPrint =
    printItems.length > 0 ? printItems[printIndex % printItems.length] : null;

  return (
    <section className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-4">Selected Work</h2>
          <p className="text-[var(--color-secondary)]">
            {displayCategory
              ? `Featured ${displayCategory} work.`
              : "A curated collection of my recent projects."}
          </p>
        </div>
        <Link href="/work" className="hidden sm:flex items-center gap-2 hover:text-[var(--color-accent-orange)] transition-colors group">
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="skeleton col-span-1 md:col-span-2 h-[400px] sm:h-[500px]" />
          <div className="skeleton h-[350px] sm:h-[400px] md:h-[500px]" />
          <div className="skeleton h-[350px] sm:h-[400px] md:h-[500px]" />
          <div className="skeleton h-[350px] sm:h-[400px] md:h-[500px]" />
        </div>
      ) : featuredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-[var(--radius-container)] bg-white/5">
          <h3 className="text-2xl font-bold mb-3">Coming Soon...</h3>
          <p className="text-[var(--color-secondary)] max-w-sm">
            New case studies are currently being documented. Check back later to see my latest work!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project: any, index: number) => {
            const isLarge = index === 0;
            
            return (
              <Fragment key={project._id}>
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
                      <Image src={project.thumbnailUrl} alt={project.title} fill className="object-cover opacity-80" priority={isLarge} />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black opacity-80" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-[70%] blur-gradient-overlay z-10" />
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

                {index === 0 && (
                  <Link
                    key="print-media-tile"
                    href="/work/brand-identity"
                    className="group block relative col-span-1 h-[350px] sm:h-[400px] md:h-[500px] rounded-[var(--radius-container)] overflow-hidden bg-neutral-900"
                  >
                    <div className="absolute inset-0 bg-neutral-900/40 z-0">
                      {currentPrint ? (
                        <AnimatePresence>
                          <motion.div
                            key={`${currentPrint._id}-${printIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={currentPrint.imageUrl}
                              alt={currentPrint.title}
                              fill
                              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-[70%] blur-gradient-overlay z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-20">
                      <span className="glass-pill px-3 py-1.5 text-[0.65rem] md:text-xs font-semibold tracking-[0.15em] uppercase text-white/90 mb-3 w-fit inline-flex items-center gap-1.5">
                        <Images className="w-3 h-3" /> Print Media
                      </span>
                      <h3 className="text-xl md:text-2xl font-medium tracking-wide mb-2">
                        {currentPrint?.title || "Explore the Archive"}
                      </h3>
                      {printItems.length > 1 && (
                        <div className="flex items-center gap-1.5">
                          {printItems.map((item, i) => (
                            <span
                              key={item._id}
                              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                                i === printIndex % printItems.length
                                  ? "bg-white"
                                  : "bg-white/30"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                )}
              </Fragment>
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