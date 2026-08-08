"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

// Placeholder colors instead of images for now
const IMAGES = [
  { id: 1, title: "Workspace", color: "from-blue-500/20 to-purple-500/20" },
  { id: 2, title: "Sketches", color: "from-orange-500/20 to-red-500/20" },
  { id: 3, title: "Wireframes", color: "from-green-500/20 to-emerald-500/20" },
  { id: 4, title: "Moodboards", color: "from-pink-500/20 to-rose-500/20" },
];

export function BehindTheScenes() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="py-24 relative max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Behind The Scenes</h2>
        <p className="text-[var(--color-secondary)]">Where the magic happens.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {IMAGES.map((img, idx) => (
          <motion.div
            key={img.id}
            layoutId={`card-${img.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedId(img.id)}
            className="cursor-pointer group relative h-64 rounded-[var(--radius-card)] overflow-hidden"
          >
            {/* Using gradient backgrounds as image placeholders */}
            <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute inset-0 bg-neutral-900 -z-10" />
            
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/20 group-hover:bg-transparent transition-colors">
              <span className="text-white font-bold text-xl">{img.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-12"
            >
              <div className="absolute top-6 right-6 p-2 glass-panel rounded-full cursor-pointer hover:bg-white/20 text-white z-10" onClick={() => setSelectedId(null)}>
                <X className="w-6 h-6" />
              </div>
              
              <motion.div
                layoutId={`card-${selectedId}`}
                className="w-full max-w-5xl aspect-video rounded-[var(--radius-card)] overflow-hidden relative shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Find the selected image data */}
                {(() => {
                  const img = IMAGES.find(i => i.id === selectedId);
                  if (!img) return null;
                  return (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-80`} />
                      <div className="absolute inset-0 bg-neutral-900 -z-10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-4xl">{img.title}</span>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
