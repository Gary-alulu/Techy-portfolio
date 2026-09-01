"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BehindTheScenesItem } from "@/lib/getBehindTheScenes";

export function BehindTheScenesCard({
  item,
  index,
  onOpen,
}: {
  item: BehindTheScenesItem;
  index: number;
  onOpen: (item: BehindTheScenesItem) => void;
}) {
  const cover = item.cover_image || item.media.find((m) => m.media_type === "image")?.media_url || null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      onClick={() => onOpen(item)}
      aria-haspopup="dialog"
      aria-label={`Open ${item.title}`}
      className="group relative h-72 overflow-hidden rounded-[var(--radius-card)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-orange)] cursor-pointer border border-white/10"
    >
      {/* Cover / gradient */}
      {cover ? (
        <Image
          src={cover}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 transition-opacity duration-500" />
      )}
      <div className="absolute inset-0 bg-black/55 transition-colors duration-500 group-hover:bg-black/35" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/15 text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        <div>
          <h3 className="font-bold text-2xl text-white group-hover:-translate-y-1 transition-transform duration-500">
            {item.title}
          </h3>
          {item.short_description && (
            <p className="mt-2 text-sm text-white/70 line-clamp-2">
              {item.short_description}
            </p>
          )}
          <p className="mt-3 text-xs font-medium text-[var(--color-accent-orange)] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            View Process &rarr;
          </p>
        </div>
      </div>
    </motion.button>
  );
}
