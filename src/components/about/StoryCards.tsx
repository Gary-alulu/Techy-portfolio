"use client";
import { motion } from "framer-motion";

const STORIES = [
  { title: "Who I Am", content: "A passionate creator who believes in the intersection of logic and beauty." },
  { title: "How I Started", content: "I began manipulating pixels in Photoshop before writing my first line of code." },
  { title: "Where I Am Today", content: "Crafting end-to-end digital experiences for startups and enterprise clients." },
  { title: "Where I'm Going", content: "Pushing the boundaries of spatial design and interactive storytelling." },
];

export function StoryCards() {
  return (
    <section className="py-24 relative max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STORIES.map((story, idx) => (
          <motion.div
            key={story.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="glass-panel p-10 md:p-12 rounded-[var(--radius-card)] group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,117,255,0.1)] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[var(--color-accent-blue)] transition-colors">{story.title}</h3>
            <div className="w-8 h-px bg-white/20 mb-4 group-hover:w-full group-hover:bg-[var(--color-accent-blue)]/50 transition-all duration-500" />
            <p className="text-[var(--color-secondary)] leading-relaxed">{story.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
