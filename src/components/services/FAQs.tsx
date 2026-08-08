"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  { q: "How long does a typical project take?", a: "Most projects range from 2 to 6 weeks, depending on the scope and complexity. We will establish a clear timeline during our initial discovery call." },
  { q: "What tools do you use?", a: "I primarily use Figma for design, React and Next.js for frontend development, and Adobe Creative Cloud (After Effects, Illustrator) for motion and branding." },
  { q: "Do you work remotely?", a: "Yes, I work with clients worldwide. We communicate asynchronously and have scheduled check-ins to ensure smooth progress." },
  { q: "Can you redesign an existing website?", a: "Absolutely. I often help brands modernize their existing digital presence to improve user experience and performance." },
  { q: "Do you provide ongoing support?", a: "Yes! After launch, I offer retainer packages for ongoing maintenance, design updates, and development support." },
];

export default function FAQs() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="mb-32 max-w-3xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">FAQs</h2>
        <p className="text-[var(--color-secondary)] text-lg">Common questions about working together.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => {
          const isOpen = openId === i;
          return (
            <motion.div 
              key={i}
              layout
              onClick={() => setOpenId(isOpen ? null : i)}
              className={`glass-panel rounded-[var(--radius-card)] overflow-hidden cursor-pointer transition-all duration-300 ${
                isOpen ? "bg-white/10 border-white/20" : "hover:bg-white/5 border-white/10"
              }`}
            >
              <motion.div layout className="p-6 flex items-center justify-between gap-4">
                <h3 className="font-bold text-lg">{faq.q}</h3>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-[var(--color-secondary)] leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
