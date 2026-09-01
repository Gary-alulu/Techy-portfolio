"use client";
import { useState } from "react";
import Image from "next/image";
import ExpandableImage from "@/components/ui/ExpandableImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BTSMedia } from "@/lib/getBehindTheScenes";

export function BTSGallery({ media }: { media: BTSMedia[] }) {
  const [active, setActive] = useState(0);

  if (media.length === 0) {
    return (
      <div className="w-full aspect-[16/9] rounded-[var(--radius-image)] bg-neutral-900 border border-white/10 flex items-center justify-center">
        <p className="text-sm text-[var(--color-secondary)]">No media yet.</p>
      </div>
    );
  }

  const current = media[active];

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + media.length) % media.length);
  };

  const mediaType = media[active].media_type || (current.media_url?.includes("/video") ? "video" : "image");

  return (
    <div>
      <div className="relative w-full aspect-[16/9] rounded-[var(--radius-image)] overflow-hidden bg-neutral-900 border border-white/10 group">
        {mediaType === "video" || current.media_url.includes("blob.vercel-storage.com/video") ? (
          <video
            src={current.media_url}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain"
          />
        ) : (
          <ExpandableImage
            src={current.media_url}
            alt={current.caption || "Behind the scenes media"}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-contain"
          />
        )}

        {current.caption && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-pill px-4 py-2 text-sm text-white/90 max-w-[80%] truncate">
            {current.caption}
          </div>
        )}

        {media.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous media"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/15 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next media"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/15 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
          {media.map((m, i) => (
            <button
              key={m._id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Media ${i + 1}`}
              className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border transition-colors ${
                i === active ? "border-[var(--color-accent-orange)]" : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              {(m.media_type === "video" || m.media_url.includes("blob.vercel-storage.com/video")) ? (
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs text-white/60">VID</div>
              ) : (
                <Image src={m.media_url} alt={m.caption || ""} fill sizes="80px" className="object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
