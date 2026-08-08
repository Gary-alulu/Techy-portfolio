"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PenTool, Layout, MonitorPlay, Code2, Sparkles } from "lucide-react";

const TIMELINE = [
  {
    year: "2021",
    role: "Graphic Designer",
    icon: PenTool,
    description: "Started by manipulating pixels, creating marketing materials, brand identities, and social campaigns.",
    tools: ["Photoshop", "Illustrator", "InDesign"],
    lesson: "Learned the foundational rules of composition, color, and visual hierarchy."
  },
  {
    year: "2022",
    role: "Brand Strategist",
    icon: Layout,
    description: "Moved beyond visuals to understand the 'why' behind the design, developing cohesive brand systems.",
    tools: ["Figma", "Miro", "Keynote"],
    lesson: "Design must solve a business problem, not just look pretty."
  },
  {
    year: "2023",
    role: "UI/UX Designer",
    icon: MonitorPlay,
    description: "Fell in love with interactive design, wireframing, and creating high-fidelity prototypes for web and mobile.",
    tools: ["Figma", "Protopie", "After Effects"],
    lesson: "User experience is the bridge between a brand and its audience."
  },
  {
    year: "2024",
    role: "Frontend Developer",
    icon: Code2,
    description: "Decided to build what I design. Learned to code to bring my static interfaces to life.",
    tools: ["React", "Next.js", "Tailwind CSS"],
    lesson: "Understanding code makes you a vastly better designer."
  },
  {
    year: "2025",
    role: "Digital Product Designer",
    icon: Sparkles,
    description: "Combining everything: Strategy, UX/UI, and Frontend into a single, end-to-end creative process.",
    tools: ["Framer Motion", "Next.js", "Figma"],
    lesson: "The magic happens when design and engineering become indistinguishable."
  }
];

export function EvolutionTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 relative max-w-5xl mx-auto px-4 md:px-8">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">My Evolution</h2>
        <p className="text-[var(--color-secondary)] text-lg max-w-2xl mx-auto">From pixels to code, a journey of continuous growth.</p>
      </div>

      <div className="relative">
        {/* Background Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 rounded-full" />
        
        {/* Animated Glowing Line */}
        <motion.div 
          className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-[var(--color-accent-blue)] via-[var(--color-accent-purple)] to-[var(--color-accent-orange)] md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(0,117,255,0.5)] origin-top"
          style={{ height: lineHeight }}
        />

        <div className="space-y-24 relative z-10">
          {TIMELINE.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = item.icon;
            
            return (
              <motion.div 
                key={item.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-20%", once: true }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0a0a0a] border-4 border-white/20 z-20 transition-colors duration-500 hover:border-[var(--color-accent-blue)]" />

                {/* Content Card */}
                <div className={`self-end md:self-auto w-[calc(100%-3.5rem)] md:w-1/2 ${isEven ? "md:pl-16 text-left" : "md:pr-16 md:text-right"}`}>
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1, transition: { type: "spring", delay: 0.2 } }
                    }}
                    className="glass-panel p-10 md:p-12 rounded-[var(--radius-card)] group hover:bg-white/5 transition-all duration-300 relative overflow-hidden text-left"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Icon className="w-24 h-24" />
                    </div>
                    
                    <span className="text-[var(--color-accent-orange)] font-bold tracking-wider text-sm mb-2 block">{item.year}</span>
                    <h3 className="text-2xl font-bold mb-4">{item.role}</h3>
                    <p className="text-[var(--color-secondary)] mb-6 leading-relaxed relative z-10">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tools.map(tool => (
                        <span key={tool} className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full border border-white/10 group-hover:border-white/20 transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm italic text-white/60 flex gap-2">
                        <span className="not-italic text-white/40">💡</span>
                        {item.lesson}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative empty side for spacing */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
