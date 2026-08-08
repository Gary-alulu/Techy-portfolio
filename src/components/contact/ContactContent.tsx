"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, PenTool, Copy, Check, Download, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useResumeModal } from "@/context/ResumeModalContext";
import { ContactBackground } from "@/components/contact/ContactBackground";
import { FloatingElements } from "@/components/contact/FloatingElements";
import CursorGlow from "@/components/ui/CursorGlow";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimatedAccordion } from "@/components/ui/AnimatedAccordion";

const FAQS = [
  {
    question: "How soon can we start?",
    answer: "Within one week depending on current availability. We'll finalize the timeline during our initial call."
  },
  {
    question: "Do you work remotely?",
    answer: "Yes, I work remotely with clients worldwide."
  },
  {
    question: "What software do you use?",
    answer: "Figma, React, Next.js,\nPhotoshop, Illustrator,\nAfter Effects."
  }
];

function LocalTimeClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <span>Local Time • {time || "..."}</span>;
}

export default function ContactContent() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { openModal } = useResumeModal();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("alulugary5@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      <ContactBackground />
      <FloatingElements />
      <CursorGlow />
      
      <div className="min-h-screen pb-32 pt-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Bar Details */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between mb-16 text-sm text-[var(--color-secondary)] border-b border-white/5 pb-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Currently Available for Freelance Projects</span>
            </div>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <LocalTimeClock />
              <span>Average response time: within 24 hours</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative">
            
            {/* LEFT COLUMN - 60% (7 cols) */}
            <div className="lg:col-span-7 space-y-16">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] mb-6">
                  Let&apos;s Build <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Something Amazing.</span>
                </h1>
                <p className="text-xl text-[var(--color-secondary)] max-w-lg leading-relaxed">
                  Whether you&apos;re launching a startup, redesigning a product, or building your next digital experience, I&apos;d love to hear about it.
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-[var(--color-accent-blue)] to-transparent mt-8 rounded-full" />
              </motion.div>

              {/* Contact Methods */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {/* Email Card */}
                <div 
                  onClick={handleCopyEmail}
                  className="glass-panel p-6 rounded-[var(--radius-card)] cursor-pointer group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,117,255,0.1)] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-blue)]/0 to-[var(--color-accent-blue)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between mb-4">
                    <Mail className="w-6 h-6 text-[var(--color-accent-blue)] group-hover:rotate-6 transition-transform" />
                    {copiedEmail ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <div className="flex flex-col gap-1.5">
                    <a href="mailto:alulugary5@gmail.com" className="text-sm text-[var(--color-secondary)] hover:text-white transition-colors">alulugary5@gmail.com</a>
                    <a href="mailto:alulutechy@gmail.com" className="text-sm text-[var(--color-secondary)] hover:text-white transition-colors">alulutechy@gmail.com</a>
                  </div>
                  <p className="text-xs text-[var(--color-secondary)]/70 mt-2">Usually replies within 24 hours.</p>
                </div>

                {/* Phone Card */}
                <div className="glass-panel p-6 rounded-[var(--radius-card)] group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,117,255,0.1)] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between mb-4">
                    <Phone className="w-6 h-6 text-green-400 group-hover:rotate-6 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <div className="flex flex-col gap-1.5">
                    <a href="tel:+254769680739" className="text-sm text-[var(--color-secondary)] hover:text-white transition-colors">+254 769 680 739</a>
                    <a href="tel:+254736211607" className="text-sm text-[var(--color-secondary)] hover:text-white transition-colors">+254 736 211 607</a>
                  </div>
                </div>

                {/* Instagram Card */}
                <a href="https://www.instagram.com/_techy55" target="_blank" rel="noreferrer" className="glass-panel p-6 rounded-[var(--radius-card)] cursor-pointer group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,107,0,0.1)] transition-all duration-300 relative overflow-hidden block">
                  <div className="flex items-center justify-between mb-4">
                    <svg className="w-6 h-6 text-[#E1306C] group-hover:-rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <ArrowRight className="w-4 h-4 text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity group-hover:-rotate-45" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Instagram</h3>
                  <p className="text-sm text-[var(--color-secondary)]">Follow my latest updates.</p>
                </a>

                {/* GitHub Card */}
                <a href="https://github.com/Gary-alulu" target="_blank" rel="noreferrer" className="glass-panel p-6 rounded-[var(--radius-card)] cursor-pointer group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-all duration-300 relative overflow-hidden block">
                  <div className="flex items-center justify-between mb-4">
                    <svg className="w-6 h-6 text-white group-hover:rotate-6 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <ArrowRight className="w-4 h-4 text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity group-hover:-rotate-45" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">GitHub</h3>
                  <p className="text-sm text-[var(--color-secondary)]">Explore my code.</p>
                </a>

                {/* Behance Card */}
                <a href="https://www.behance.net/garyalulu5" target="_blank" rel="noreferrer" className="glass-panel p-6 rounded-[var(--radius-card)] cursor-pointer group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,107,0,0.1)] transition-all duration-300 relative overflow-hidden block">
                  <div className="flex items-center justify-between mb-4">
                    <PenTool className="w-6 h-6 text-[var(--color-accent-orange)] group-hover:-rotate-6 transition-transform" />
                    <ArrowRight className="w-4 h-4 text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity group-hover:-rotate-45" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Behance</h3>
                  <p className="text-sm text-[var(--color-secondary)]">See more design work.</p>
                </a>
              </motion.div>

              <div className="pt-4">
                <button onClick={openModal} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all group">
                  <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  View Resume
                </button>
              </div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6">Quick FAQ</h2>
                <AnimatedAccordion items={FAQS} />
              </motion.div>

            </div>

            {/* RIGHT COLUMN - 40% (5 cols) */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                className="sticky top-32 glass-panel p-8 sm:p-10 rounded-[var(--radius-container)] shadow-2xl border-white/10 relative overflow-hidden"
              >
                {/* Subtle glass reflection inside form container */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-[var(--radius-container)]" />
                
                <h2 className="text-2xl font-bold mb-8">Start a Project</h2>
                <ContactForm />
              </motion.div>
            </div>
          </div>
          
          {/* Final CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-40 glass-panel p-16 md:p-24 rounded-[48px] text-center relative overflow-hidden border-white/10"
          >
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[var(--color-accent-orange)]/15 rounded-full blur-[60px] -z-10 pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[var(--color-accent-blue)]/15 rounded-full blur-[60px] -z-10 pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to create <br /> something exceptional?
            </h2>
            <p className="text-xl text-[var(--color-secondary)] mb-12 max-w-2xl mx-auto">
              Whether it&apos;s a brand, a product, or a website, let&apos;s bring your vision to life.
            </p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="glass-pill px-10 py-5 font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Start Your Project
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
