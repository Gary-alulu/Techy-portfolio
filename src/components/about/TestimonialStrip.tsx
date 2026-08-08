"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating: number;
};

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    name: "Sarah J.",
    role: "Product Director",
    company: "TechCorp",
    quote: "Gary transformed our vague ideas into a stunning digital product.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael T.",
    role: "Founder",
    company: "VentureLab",
    quote: "The attention to detail and motion design is unmatched.",
    rating: 5,
  },
  {
    id: "3",
    name: "Elena R.",
    role: "Head of Product",
    company: "DesignCo",
    quote: "Not just a designer, but a true strategic design partner.",
    rating: 5,
  },
  {
    id: "4",
    name: "David L.",
    role: "VP of Engineering",
    company: "ScaleApp",
    quote: "Our conversion rate doubled after the complete redesign.",
    rating: 5,
  },
];

export function TestimonialStrip() {
  const [items, setItems] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    fetch("/api/testimonials?featured=true", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.testimonials && data.testimonials.length > 0) {
          const mapped = data.testimonials.map((t: any) => ({
            id: t._id,
            name: t.name,
            role: t.role,
            company: t.company,
            quote: t.quote,
            rating: t.rating || 5,
          }));
          setItems(mapped);
        }
      })
      .catch((err) => {
        console.error("Testimonials fetch error:", err);
      });
  }, []);

  // Duplicate items array for a seamless marquee loop
  const displayItems = [...items, ...items];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.015] overflow-hidden relative">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: Math.max(25, displayItems.length * 6), repeat: Infinity, ease: "linear" }}
          className="flex gap-8 pr-8 items-center"
        >
          {displayItems.map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`}
              className="flex flex-col gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md flex-shrink-0"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm md:text-base font-medium text-white italic max-w-md whitespace-normal">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-[var(--color-secondary)]">
                <span className="font-semibold text-white">{item.name}</span>
                <span>•</span>
                <span>{item.role} {item.company ? `(${item.company})` : ""}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
