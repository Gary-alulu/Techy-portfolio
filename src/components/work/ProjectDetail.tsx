"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import WatermarkedImage from "@/components/ui/WatermarkedImage";
import { ArrowLeft, ArrowUpRight, Code2, PenTool, Play } from "lucide-react";

type PreviewData = { imageUrl: string | null; title: string | null };

async function fetchPreview(url: string): Promise<PreviewData> {
  try {
    const res = await fetch(`/api/preview?url=${encodeURIComponent(url)}`);
    return await res.json();
  } catch {
    return { imageUrl: null, title: null };
  }
}

export function ProjectDetail({ project }: { project: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [previews, setPreviews] = useState<Record<string, PreviewData>>({});

  useEffect(() => {
    const urls: string[] = [];
    if (project.liveUrl) urls.push(project.liveUrl);
    if (project.githubUrl) urls.push(project.githubUrl);
    if (project.prototypeUrl) urls.push(project.prototypeUrl);
    urls.forEach(async (url) => {
      const data = await fetchPreview(url);
      setPreviews((prev) => ({ ...prev, [url]: data }));
    });
  }, [project.liveUrl, project.githubUrl, project.prototypeUrl]);

  if (!project) return null;

  return (
    <div className="pb-32 bg-black min-h-screen" ref={containerRef}>
      {/* 1. Immersive Hero Section */}
      <div className="relative w-full h-[80vh] md:h-[90vh] min-h-[600px] overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          {project.bannerUrl || project.thumbnailUrl ? (
            <WatermarkedImage 
              src={project.bannerUrl || project.thumbnailUrl} 
              alt={`${project.title} Banner`} 
              fill 
              quality={100}
              sizes="100vw"
              className="object-cover scale-105" 
              priority 
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}
          {/* Deep gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 z-10" />
        </motion.div>
        
        <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end z-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Link href="/work" className="w-fit flex items-center gap-3 text-white/70 hover:text-white transition-colors mb-10 group backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Work
            </Link>
            <span className="glass-pill px-4 py-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/90 mb-6 inline-block">
              {project.category}{project.subCategory ? ` • ${project.subCategory}` : ""}
            </span>
            <h1 className="text-6xl md:text-[8vw] leading-[0.9] font-black text-white tracking-tighter uppercase drop-shadow-2xl">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 space-y-32">
        {/* 2. The "Quick Facts" Bento Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 bg-white/5 flex flex-col justify-between">
            <span className="text-xs text-white/40 uppercase tracking-widest mb-4">Role / Category</span>
            <span className="text-lg md:text-xl font-medium text-white">{project.category}{project.subCategory ? ` • ${project.subCategory}` : ""}</span>
          </div>
          
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 bg-white/5 flex flex-col justify-between">
            <span className="text-xs text-white/40 uppercase tracking-widest mb-4">Timeline</span>
            <span className="text-lg md:text-xl font-medium text-white">{project.duration || "Ongoing"}</span>
          </div>
          
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 bg-white/5 flex flex-col justify-between md:col-span-2">
            <span className="text-xs text-white/40 uppercase tracking-widest mb-4">Core Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.length > 0 ? (
                project.technologies.map((tech: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90 backdrop-blur-sm border border-white/10">
                    {tech}
                  </span>
                ))
              ) : (
                <span className="text-lg md:text-xl font-medium text-white">Strategy & Design</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* 3. Editorial Storytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold sticky top-32 tracking-tight">The Vision</h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-12"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl text-white leading-tight font-light tracking-tight">
              {project?.shortDescription || "No detailed description provided."}
            </p>
            
            {project?.content && (
              <div className="text-lg md:text-xl text-white/60 leading-relaxed whitespace-pre-wrap font-light max-w-3xl">
                {project.content}
              </div>
            )}
          </motion.div>
        </div>

        {/* 4. Interactive Links */}
        {(project.liveUrl || project.githubUrl || project.prototypeUrl) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-[2rem] bg-neutral-900 border border-white/10 p-8 flex flex-col justify-between aspect-square hover:border-white/30 transition-colors">
                {previews[project.liveUrl]?.imageUrl ? (
                  <>
                    <img src={previews[project.liveUrl].imageUrl!} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-blue)]/30 via-neutral-900/80 to-neutral-900/95" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                <div className="flex justify-between items-start z-10 relative">
                  <span className="glass-pill px-4 py-2 text-xs font-semibold tracking-widest uppercase text-white/80">Live Site</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
                <div className="z-10 relative">
                  <h3 className="text-3xl md:text-4xl font-bold">View<br/>Production</h3>
                  {previews[project.liveUrl]?.title && (
                    <p className="text-white/40 text-sm mt-2 truncate max-w-[200px]">{previews[project.liveUrl].title}</p>
                  )}
                </div>
              </a>
            )}
            
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-[2rem] bg-neutral-900 border border-white/10 p-8 flex flex-col justify-between aspect-square hover:border-white/30 transition-colors">
                {previews[project.githubUrl]?.imageUrl ? (
                  <>
                    <img src={previews[project.githubUrl].imageUrl!} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-neutral-900/80 to-neutral-900/95" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                <div className="flex justify-between items-start z-10 relative">
                  <span className="glass-pill px-4 py-2 text-xs font-semibold tracking-widest uppercase text-white/80">Repository</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <Code2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="z-10 relative">
                  <h3 className="text-3xl md:text-4xl font-bold">Source<br/>Code</h3>
                  {previews[project.githubUrl]?.title && (
                    <p className="text-white/40 text-sm mt-2 truncate max-w-[200px]">{previews[project.githubUrl].title}</p>
                  )}
                </div>
              </a>
            )}

            {project.prototypeUrl && (
              <a href={project.prototypeUrl} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-[2rem] bg-neutral-900 border border-white/10 p-8 flex flex-col justify-between aspect-square hover:border-white/30 transition-colors">
                {previews[project.prototypeUrl]?.imageUrl ? (
                  <>
                    <img src={previews[project.prototypeUrl].imageUrl!} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F24E1E]/30 via-neutral-900/80 to-neutral-900/95" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F24E1E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                <div className="flex justify-between items-start z-10 relative">
                  <span className="glass-pill px-4 py-2 text-xs font-semibold tracking-widest uppercase text-white/80">Design</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#F24E1E] group-hover:text-white transition-colors duration-300 border-[#F24E1E]/30">
                    <PenTool className="w-5 h-5" />
                  </div>
                </div>
                <div className="z-10 relative">
                  <h3 className="text-3xl md:text-4xl font-bold">Figma<br/>Prototype</h3>
                  {previews[project.prototypeUrl]?.title && (
                    <p className="text-white/40 text-sm mt-2 truncate max-w-[200px]">{previews[project.prototypeUrl].title}</p>
                  )}
                </div>
              </a>
            )}
          </motion.div>
        )}

        {/* Video Walkthrough */}
        {project?.videoUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 relative group"
          >
            <div className="absolute top-6 left-6 z-10 glass-pill px-4 py-2 text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
              <Play className="w-3 h-3" /> Walkthrough
            </div>
            <div className="aspect-video w-full">
              <iframe 
                src={project.videoUrl} 
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}

        {/* 5. Cinematic Gallery Exhibition */}
        {project.galleryUrls && project.galleryUrls.length > 0 && (
          <div className="space-y-6 pt-16">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Visual Assets</h2>
              <div className="h-[1px] flex-grow bg-white/10"></div>
            </div>
            
            <div className="grid gap-6 md:gap-12">
              {project.galleryUrls.map((url: string, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 bg-white/5 relative"
                >
                  <WatermarkedImage 
                    src={url} 
                    alt={`${project.title} screenshot ${idx + 1}`} 
                    width={1920} 
                    height={1080} 
                    quality={100}
                    sizes="100vw"
                    className="w-full h-auto object-cover" 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Next Project CTA (Simple) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-32 pb-16 flex flex-col items-center text-center"
        >
          <p className="text-white/40 uppercase tracking-widest text-sm mb-8">End of Case Study</p>
          <Link href="/work" className="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-[var(--color-accent-blue)] transition-colors">
            Back to Work
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
