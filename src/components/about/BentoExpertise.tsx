"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORY_LINKS: Record<string, string> = {
  "UI/UX Design": "/work/ui-ux",
  Frontend: "/work/frontend",
  Motion: "/work/motion-graphics",
  "Brand Identity": "/work/brand-identity",
};

interface ExpertiseProject {
  _id: string;
  title: string;
  category: string;
  thumbnailUrl?: string;
}

const CATEGORY_MAP: Record<string, string> = {
  "UI/UX Design": "UI/UX Design",
  Frontend: "Front End Design",
  Motion: "Motion Graphics",
  "Brand Identity": "Brand Identity",
};

type PreviewMap = Partial<Record<keyof typeof CATEGORY_MAP, string>>;

function buildPreviews(projects: ExpertiseProject[]): PreviewMap {
  const previews: PreviewMap = {};
  for (const [expertise, projectCategory] of Object.entries(CATEGORY_MAP) as [string, string][]) {
    const match = projects.find((p) => p.category === projectCategory && p.thumbnailUrl);
    if (match) previews[expertise as keyof typeof CATEGORY_MAP] = match.thumbnailUrl as string;
  }
  return previews;
}

export function BentoExpertise({ projects: initialProjects = [] }: { projects?: ExpertiseProject[] }) {
  const [previews, setPreviews] = useState<PreviewMap>(() => buildPreviews(initialProjects));
  const [loaded, setLoaded] = useState(initialProjects && initialProjects.length > 0);

  useEffect(() => {
    if (loaded) return;
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data.success) return;
        setPreviews(buildPreviews(data.projects));
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoaded(true); });
    return () => { cancelled = true; };
  }, [loaded]);

  const uiPreview = previews["UI/UX Design"];
  const frontendPreview = previews["Frontend"];
  const motionPreview = previews["Motion"];
  const brandPreview = previews["Brand Identity"];

  return (
    <section className="py-24 relative max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Core Expertise</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {/* UI Design - Spans 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass-panel rounded-[var(--radius-card)] p-0 relative overflow-hidden group hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Link href={CATEGORY_LINKS["UI/UX Design"]} className="absolute inset-0 z-0">
            {uiPreview && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-md scale-110 transition-transform duration-700 group-hover:scale-100"
                style={{ backgroundImage: `url(${uiPreview})` }}
              />
            )}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-blue)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white opacity-0 md:opacity-100 md:group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
          <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-12 pointer-events-none">
            <div>
              <h3 className="text-2xl font-bold mb-2">UI/UX Design</h3>
              <p className="text-[var(--color-secondary)] max-w-sm">Designing intuitive, accessible, and beautiful interfaces that people love to use.</p>
            </div>
            <div className="flex gap-3 mt-6">
              <span className="glass-pill px-4 py-2 text-sm font-medium">Figma</span>
              <span className="glass-pill px-4 py-2 text-sm font-medium">Protopie</span>
            </div>
          </div>
        </motion.div>

        {/* Frontend - Spans 1 column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-[var(--radius-card)] p-0 relative overflow-hidden group hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Link href={CATEGORY_LINKS.Frontend} className="absolute inset-0 z-0">
            {frontendPreview && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-md scale-110 transition-transform duration-700 group-hover:scale-100"
                style={{ backgroundImage: `url(${frontendPreview})` }}
              />
            )}
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--color-accent-orange)]/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
            <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white opacity-0 md:opacity-100 md:group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
          <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-12 pointer-events-none">
            <div>
              <h3 className="text-2xl font-bold mb-2">Frontend</h3>
              <p className="text-[var(--color-secondary)] text-sm">Bringing designs to life with modern code.</p>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <span className="text-sm font-medium text-[var(--color-secondary)]">React / Next.js</span>
              <span className="text-sm font-medium text-[var(--color-secondary)]">Tailwind CSS</span>
            </div>
          </div>
        </motion.div>

        {/* Motion - Spans 1 column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-[var(--radius-card)] p-0 relative overflow-hidden group hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Link href={CATEGORY_LINKS.Motion} className="absolute inset-0 z-0">
            {motionPreview && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-md scale-110 transition-transform duration-700 group-hover:scale-100"
                style={{ backgroundImage: `url(${motionPreview})` }}
              />
            )}
            <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white opacity-0 md:opacity-100 md:group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
          <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-12 pointer-events-none">
            <div>
              <h3 className="text-2xl font-bold mb-2">Motion</h3>
              <p className="text-[var(--color-secondary)] text-sm">Adding delight through micro-interactions.</p>
            </div>
            <div className="mt-6">
              <span className="glass-pill px-4 py-2 text-sm font-medium">Framer Motion</span>
            </div>
          </div>
        </motion.div>

        {/* Branding - Spans 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 glass-panel rounded-[var(--radius-card)] p-0 relative overflow-hidden group hover:bg-white/5 transition-colors flex flex-col justify-end cursor-pointer"
        >
          <Link href={CATEGORY_LINKS["Brand Identity"]} className="absolute inset-0 z-0">
            {brandPreview && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-md scale-110 transition-transform duration-700 group-hover:scale-100"
                style={{ backgroundImage: `url(${brandPreview})` }}
              />
            )}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[var(--color-accent-purple)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white opacity-0 md:opacity-100 md:group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
          <div className="relative z-10 p-10 md:p-12 pointer-events-none">
            <h3 className="text-2xl font-bold mb-2">Brand Identity</h3>
            <p className="text-[var(--color-secondary)] max-w-md">Creating cohesive visual systems that tell a compelling story across all mediums.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
