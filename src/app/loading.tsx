import { ArrowRight } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-xl">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Pulsating Glass Orb */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/20 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.1)] animate-pulse" />
          <div className="absolute inset-2 rounded-full border border-[var(--color-accent-orange)]/50 bg-[var(--color-accent-orange)]/10 blur-[2px] animate-ping opacity-50" />
          <div className="absolute top-4 left-4 w-6 h-3 bg-white/40 rounded-full blur-[2px] rotate-[-30deg]" />
          <div className="absolute bottom-4 right-4 w-8 h-4 bg-white/10 rounded-full blur-[4px] rotate-[30deg]" />
        </div>
        <p className="text-white/70 font-medium tracking-widest text-sm uppercase animate-pulse">Loading Experience</p>
      </div>
    </div>
  );
}
