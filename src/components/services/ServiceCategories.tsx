"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Code, Sparkles, Video, ChevronDown } from "lucide-react";

const CATEGORIES = [
  {
    id: "uiux",
    title: "UI/UX Design",
    desc: "Designing intuitive digital experiences.",
    icon: <Layers className="w-6 h-6 text-[var(--color-accent-blue)]" />,
    items: ["Research", "Wireframes", "User Flow", "Prototype", "Design System", "Accessibility", "Developer Handoff"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    desc: "Building blazing fast, interactive web applications.",
    icon: <Code className="w-6 h-6 text-[var(--color-accent-orange)]" />,
    items: ["Responsive Websites", "React", "Next.js", "Animations", "Performance", "SEO", "CMS", "Deployment"],
  },
  {
    id: "graphic",
    title: "Graphic Design",
    desc: "Crafting memorable visual identities.",
    icon: <Sparkles className="w-6 h-6 text-[var(--color-accent-purple)]" />,
    items: ["Brand Identity", "Posters", "Packaging", "Marketing", "Social Media", "Print"],
  },
  {
    id: "motion",
    title: "Motion Graphics",
    desc: "Bringing static designs to life.",
    icon: <Video className="w-6 h-6 text-pink-500" />,
    items: ["Logo Animation", "Social Ads", "Explainers", "Product Showcase", "Reels", "Promos"],
  }
];

export default function ServiceCategories() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="mb-32 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Service Deep Dive</h2>
        <p className="text-[var(--color-secondary)] text-lg">Explore exactly what goes into each discipline.</p>
      </div>

      <div className="space-y-4">
        {CATEGORIES.map((cat) => {
          const isExpanded = expandedId === cat.id;
          
          return (
            <motion.div 
              key={cat.id}
              layout
              onClick={() => setExpandedId(isExpanded ? null : cat.id)}
              className="glass-panel rounded-[var(--radius-container)] overflow-hidden cursor-pointer hover:bg-white/5 transition-colors border-white/10"
            >
              <motion.div layout className="p-6 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">{cat.title}</h3>
                    <p className="text-[var(--color-secondary)] text-xs md:text-sm">{cat.desc}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-[var(--color-secondary)]" />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-8 md:px-8 pt-2">
                      <div className="h-px w-full bg-white/10 mb-6" />
                      <div className="flex flex-wrap gap-3">
                        {cat.items.map((item, i) => (
                          <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
