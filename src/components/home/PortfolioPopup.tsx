"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, Sparkles } from "lucide-react";

interface PortfolioMeta {
  title?: string;
  description?: string;
  fileName?: string;
  fileSize?: number;
  updatedAt?: string;
}

const AUTO_OPEN_DELAY = 2500;
const SESSION_KEY = "portfolioPopupSeen";

export default function PortfolioPopup() {
  const [meta, setMeta] = useState<PortfolioMeta | null>(null);
  const [open, setOpen] = useState(false);

  // Load portfolio metadata (only render if a file exists)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/portfolio", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.success && data.portfolio?.fileName) {
          setMeta(data.portfolio);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-open once per browser session, shortly after landing
  useEffect(() => {
    if (!meta) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, AUTO_OPEN_DELAY);

    return () => clearTimeout(timer);
  }, [meta]);

  // Escape to close + scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!meta) return null;

  return (
    <>
      {/* Floating trigger — reopen the popup anytime */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setOpen(true)}
        className="fixed bottom-10 left-6 md:bottom-12 md:left-10 z-[9998] flex items-center gap-2 glass-pill px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors shadow-lg"
        aria-label="Download portfolio"
      >
        <Download className="w-4 h-4 text-[var(--color-accent-orange)]" />
        <span className="hidden sm:inline">Portfolio</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            {/* Soft glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-[var(--color-accent-orange)]/20 rounded-full blur-[140px]"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-neutral-950/90 border border-white/10 rounded-[28px] shadow-2xl overflow-hidden"
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:rotate-90"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="px-8 pt-12 pb-8 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 18 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[var(--color-accent-orange)]/25 to-[var(--color-accent-blue)]/25 border border-white/10 flex items-center justify-center mb-6"
                >
                  <FileText className="w-8 h-8 text-white" />
                </motion.div>

                <span className="glass-pill px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/80 mb-4 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[var(--color-accent-orange)]" />
                  Portfolio
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  {meta.title || "Download My Portfolio"}
                </h2>
                <p className="text-[var(--color-secondary)] text-sm leading-relaxed mb-8 max-w-sm">
                  {meta.description ||
                    "A curated collection of my best work, case studies and capabilities — all in one document."}
                </p>

                <a
                  href="/api/portfolio/download"
                  download
                  onClick={() => setOpen(false)}
                  className="group relative w-full px-6 py-4 rounded-xl bg-white text-black font-semibold text-center overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow"
                >
                  <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download Portfolio
                  </span>
                </a>

                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 text-sm text-[var(--color-secondary)] hover:text-white transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
