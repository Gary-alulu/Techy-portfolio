"use client";
import { ServiceType } from "@/app/services/page";
import { motion } from "framer-motion";

interface Props {
  selected: ServiceType[];
}

const TECHNOLOGIES = [
  { 
    name: "Figma", 
    type: ["uiux", "graphic"],
    icon: (
      <svg viewBox="0 0 38 57" fill="none" className="w-10 h-10 md:w-14 md:h-14">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5a9.5 9.5 0 0 1 9.5-9.5H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
      </svg>
    )
  },
  { 
    name: "React", 
    type: ["frontend"],
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 md:w-14 md:h-14 text-[#61dafb]">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  { 
    name: "Next.js", 
    type: ["frontend"],
    icon: (
      <svg viewBox="0 0 180 180" className="w-10 h-10 md:w-14 md:h-14 text-white">
        <path fill="currentColor" d="M90 0C40.3 0 0 40.3 0 90s40.3 90 90 90 90-40.3 90-90S139.7 0 90 0zM72 121H59V59h13v62zm16 0 34-44v44h13V59h-12L88 104V59H75v62h13z"/>
      </svg>
    )
  },
  { 
    name: "Tailwind CSS", 
    type: ["frontend"],
    icon: (
      <svg viewBox="0 0 54 33" fill="none" className="w-10 h-10 md:w-14 md:h-14">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06B6D4"/>
      </svg>
    )
  },
  { 
    name: "Framer Motion", 
    type: ["frontend", "motion"],
    icon: (
      <svg viewBox="0 0 14 21" className="w-10 h-10 md:w-14 md:h-14 text-white">
        <path d="M0 0h14v7H7zm0 7h7l7 7H0zm7 7h7v7l-7-7z" fill="currentColor"/>
      </svg>
    )
  },
  { 
    name: "Photoshop", 
    type: ["graphic"],
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10 md:w-14 md:h-14">
        <rect width="40" height="40" rx="8" fill="#31a8ff"/>
        <text x="20" y="27" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="#001e36" textAnchor="middle">Ps</text>
      </svg>
    )
  },
  { 
    name: "Illustrator", 
    type: ["graphic"],
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10 md:w-14 md:h-14">
        <rect width="40" height="40" rx="8" fill="#ff9a00"/>
        <text x="20" y="27" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="#330000" textAnchor="middle">Ai</text>
      </svg>
    )
  },
  { 
    name: "After Effects", 
    type: ["motion"],
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10 md:w-14 md:h-14">
        <rect width="40" height="40" rx="8" fill="#9999ff"/>
        <text x="20" y="27" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="#00005b" textAnchor="middle">Ae</text>
      </svg>
    )
  },
  { 
    name: "Premiere Pro", 
    type: ["motion"],
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10 md:w-14 md:h-14">
        <rect width="40" height="40" rx="8" fill="#ea77ff"/>
        <text x="20" y="27" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="#00005b" textAnchor="middle">Pr</text>
      </svg>
    )
  },
];

export default function TechStack({ selected }: Props) {
  const filtered = selected.length === 0 
    ? TECHNOLOGIES 
    : TECHNOLOGIES.filter(t => t.type.some(type => selected.includes(type as ServiceType)));

  return (
    <section className="mb-32 max-w-7xl mx-auto px-4">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Technology & Tools</h2>
        <p className="text-[var(--color-secondary)] text-lg">The stack I use to bring ideas to life.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {filtered.map((item) => (
          <motion.div
            key={item.name}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ duration: 0.3 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full glass-panel flex flex-col items-center justify-center gap-4 group cursor-default border-white/10 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <div className="transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
               {item.icon}
            </div>
            <span className="text-xs md:text-sm font-medium text-center opacity-70 group-hover:opacity-100 px-2 leading-tight transition-opacity">
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
