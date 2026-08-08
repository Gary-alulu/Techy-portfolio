"use client";
import { PenTool, Code2, MonitorPlay, Sparkles } from "lucide-react";

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <div className="absolute top-32 left-[15%] text-white/5">
        <Code2 className="w-10 h-10" />
      </div>
      <div className="absolute bottom-40 left-[10%] text-white/5">
        <PenTool className="w-12 h-12" />
      </div>
      <div className="absolute top-64 right-[15%] text-white/5">
        <MonitorPlay className="w-12 h-12" />
      </div>
      <div className="absolute bottom-64 right-[20%] text-white/5">
        <Sparkles className="w-8 h-8" />
      </div>
    </div>
  );
}
