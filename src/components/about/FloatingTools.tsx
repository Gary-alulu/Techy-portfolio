"use client";
import { motion } from "framer-motion";

const TOOLS = [
  { name: "Figma", use: "Prototyping & UI Design" },
  { name: "React", use: "Component Architecture" },
  { name: "Next.js", use: "Fullstack Framework" },
  { name: "Tailwind", use: "Rapid Styling" },
  { name: "Framer", use: "Motion & Physics" },
  { name: "Photoshop", use: "Image Manipulation" },
  { name: "Illustrator", use: "Vector Graphics" },
  { name: "After Effects", use: "Complex Animation" },
];

export function FloatingTools() {
  return (
    <section className="py-24 relative max-w-5xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Tools & Technologies</h2>
        <p className="text-[var(--color-secondary)]">Hover to reveal how I use them.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {TOOLS.map((tool, idx) => {
          // Add some organic drifting animation to the container
          const randomY = Math.random() * 20 - 10;
          
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: idx * 0.1 }}
            >
              <motion.div 
                animate={{ y: [0, randomY, 0] }}
                transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                className="group relative w-36 h-36 sm:w-40 sm:h-40 cursor-default"
                style={{ perspective: "1000px" }}
              >
                <div 
                  className="w-full h-full transition-transform duration-700" 
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <style jsx>{`
                    .group:hover > div {
                      transform: rotateY(180deg);
                    }
                  `}</style>
                  
                  {/* Front side */}
                  <div 
                    className="absolute inset-0 glass-panel rounded-full flex items-center justify-center border border-white/10 group-hover:border-[var(--color-accent-blue)]/50 transition-colors"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="font-bold text-lg sm:text-xl text-white">{tool.name}</span>
                  </div>
                  
                  {/* Back side */}
                  <div 
                    className="absolute inset-0 glass-panel rounded-full flex items-center justify-center p-4 bg-white/5 border border-[var(--color-accent-blue)] shadow-[0_0_20px_rgba(0,117,255,0.2)]"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <span className="text-sm font-medium text-center text-white">{tool.use}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
