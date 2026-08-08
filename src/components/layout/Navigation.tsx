"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Menu, X } from "lucide-react";
import { useResumeModal } from "@/context/ResumeModalContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useResumeModal();

  useEffect(() => {
    let lastScroll = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== lastScroll) {
        lastScroll = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6 sm:px-12 lg:px-16 pointer-events-none"
      >
        <div
          className={twMerge(
            "pointer-events-auto flex items-center justify-between glass-pill transition-all duration-500 ease-out relative",
            scrolled ? "px-6 py-3 w-full max-w-3xl scale-95" : "px-8 py-4 w-full max-w-5xl"
          )}
        >
          {/* Background overlay for better readability on scroll */}
          <div className={twMerge("absolute inset-0 -z-10 rounded-full transition-opacity duration-500", scrolled ? "bg-black/95" : "bg-black/40")} />

          <Link href="/" className="z-10 flex items-center ml-2 md:ml-4" onClick={() => setIsOpen(false)}>
            <Image src="/images/MY LOGO.png" alt="Logo" width={240} height={96} className="h-16 md:h-24 w-auto object-contain" priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 relative z-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={clsx(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full hover:text-white",
                    isActive ? "text-white" : "text-[var(--color-secondary)]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 z-10">
            <button
              onClick={openModal}
              className="hidden md:block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Resume
            </button>
            <button className="hidden md:flex w-8 h-8 rounded-full bg-white/5 border border-white/10 items-center justify-center hover:bg-white/10 transition-colors">
              <span className="sr-only">Toggle Theme</span>
              <div className="w-3 h-3 rounded-full bg-[var(--color-accent-orange)] shadow-[0_0_10px_var(--color-accent-orange)]" />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center p-2 mr-1 text-[var(--color-secondary)] hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-neutral-950/95 pt-28 pb-12 px-8 flex flex-col"
          >
            <nav className="flex flex-col gap-6 flex-1 justify-center items-center mb-8 text-center">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "text-3xl font-medium tracking-tight transition-all duration-300 block",
                        isActive 
                          ? "text-white scale-110" 
                          : "text-[var(--color-secondary)] hover:text-white hover:scale-105"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-auto flex flex-col gap-8"
            >
              <button 
                onClick={() => {
                  setIsOpen(false);
                  openModal();
                }}
                className="glass-pill px-8 py-4 font-medium w-full text-center hover:bg-white/10 transition-all border border-white/10"
              >
                View Resume
              </button>
              
              <div className="flex gap-6 justify-center">
                <a href="#" className="text-sm font-medium text-[var(--color-secondary)] hover:text-white transition-colors">Twitter</a>
                <a href="https://www.instagram.com/_techy55" target="_blank" rel="noreferrer" className="text-sm font-medium text-[var(--color-secondary)] hover:text-white transition-colors">Instagram</a>
                <a href="https://www.behance.net/garyalulu5" target="_blank" rel="noreferrer" className="text-sm font-medium text-[var(--color-secondary)] hover:text-white transition-colors">Behance</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
