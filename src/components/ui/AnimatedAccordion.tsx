"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AnimatedAccordion({ items }: { items: AccordionItemProps[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={index} className="border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveIndex(isActive ? null : index)}
              className="w-full flex items-center justify-between text-left group"
            >
              <span className={`font-medium transition-colors ${isActive ? "text-white" : "text-[var(--color-secondary)] group-hover:text-white"}`}>
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-[var(--color-secondary)] group-hover:text-white" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 text-sm text-[var(--color-secondary)] whitespace-pre-line leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
