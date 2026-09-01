"use client";
import { ServiceType } from "@/app/services/page";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Props {
  selected: ServiceType[];
  projects: any[];
}

const CATEGORY_MAP: Record<string, string> = {
  "UI/UX Design": "uiux",
  "Front End Design": "frontend",
  "Brand Identity": "graphic",
  "Motion Graphics": "motion",
};

export default function FeaturedWork({ selected, projects }: Props) {
  const filtered = selected.length === 0 
    ? projects 
    : projects.filter((p) => {
        const mappedId = CATEGORY_MAP[p.category];
        return selected.includes(mappedId as ServiceType);
      });

  return (
    <section className="mb-32 max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
        <p className="text-[var(--color-secondary)] text-lg">See the services in action.</p>
      </div>

      {filtered.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-[var(--radius-container)] bg-white/5"
        >
          <h3 className="text-2xl font-bold mb-2">Coming Soon...</h3>
          <p className="text-[var(--color-secondary)] max-w-md">
            I am currently preparing new case studies for this category. Check back soon!
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filtered.map((item, index) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Link href={`/work/${item.slug}`} className="group block relative h-[300px] md:h-[400px] rounded-[var(--radius-container)] overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-900/50 group-hover:scale-105 transition-transform duration-700 ease-out z-0">
                    {item.thumbnailUrl ? (
                      <Image 
                        src={item.thumbnailUrl} 
                        alt={item.title} 
                        fill 
                        quality={100}
                        priority={index < 2}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-80" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black opacity-80" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                  
                  {/* Arrow icon - top right, appears on hover */}
                  <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Text content - pinned to bottom */}
                  <div className="absolute left-6 right-6 bottom-6 md:left-10 md:right-10 md:bottom-10 z-20">
                    {/* This block moves UP on hover to reveal sub-text */}
                    <div className="transform translate-y-0 group-hover:-translate-y-10 transition-transform duration-500 ease-out">
                      <span className="glass-pill px-3 py-1.5 text-[0.65rem] md:text-xs font-semibold tracking-[0.15em] uppercase text-white/90 mb-3 w-fit inline-block">
                        {item.category}{item.subCategory ? ` • ${item.subCategory}` : ""}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-wide text-white">{item.title}</h3>
                    </div>
                    {/* Sub-text: hidden by default, fades in on hover */}
                    <p className="text-white/60 text-sm line-clamp-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.shortDescription || "View the full case study →"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
