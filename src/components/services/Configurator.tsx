"use client";
import { ServiceType } from "@/app/services/page";
import { Layers, Code, Sparkles, Video } from "lucide-react";

interface Props {
  selected: ServiceType[];
  onChange: (services: ServiceType[]) => void;
}

const OPTIONS = [
  { id: "graphic", label: "Brand Identity", icon: <Sparkles className="w-5 h-5" /> },
  { id: "uiux", label: "UI/UX Design", icon: <Layers className="w-5 h-5" /> },
  { id: "frontend", label: "Frontend Development", icon: <Code className="w-5 h-5" /> },
  { id: "motion", label: "Motion Graphics", icon: <Video className="w-5 h-5" /> },
];

export default function Configurator({ selected, onChange }: Props) {
  const toggle = (id: ServiceType) => {
    if (selected.includes(id)) {
      onChange(selected.filter(s => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <section className="mb-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Build Your Project</h2>
        <p className="text-[var(--color-secondary)]">Select what you need to see a tailored workflow below.</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto px-4">
        {OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt.id as ServiceType);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id as ServiceType)}
              className={`glass-pill px-6 py-4 flex items-center gap-3 transition-all duration-300 hover:scale-105 ${
                isSelected 
                  ? "bg-white/10 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                  : "hover:bg-white/5 opacity-70 hover:opacity-100"
              }`}
            >
              <div className={isSelected ? "text-white" : "text-[var(--color-secondary)]"}>
                {opt.icon}
              </div>
              <span className={`font-medium ${isSelected ? "text-white" : "text-[var(--color-secondary)]"}`}>
                {opt.label}
              </span>
              <div className={`w-4 h-4 rounded-full border-2 ml-2 flex items-center justify-center transition-colors ${
                isSelected ? "border-white bg-white" : "border-white/30"
              }`}>
                {isSelected && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
