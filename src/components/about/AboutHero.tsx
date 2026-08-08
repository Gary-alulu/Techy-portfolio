"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, Briefcase, Zap, Link as LinkIcon, Mail, Globe, Phone, MapPin, Image as ImageIcon, X, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useResumeModal } from "@/context/ResumeModalContext";

type ModalType = 'summary' | 'experience' | 'skills' | 'links' | null;

export function AboutHero() {
  const { openModal: openResume } = useResumeModal();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const NavButton = ({ id, icon: Icon, label }: { id: ModalType, icon: any, label: string }) => {
    const isActive = activeModal === id;
    return (
      <button 
        onMouseEnter={() => setActiveModal(id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
          isActive 
            ? 'bg-white text-black shadow-lg' 
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </button>
    );
  };

  const ModalContent = () => {
    switch (activeModal) {
      case 'summary':
        return (
          <div className="space-y-4 text-white/80 text-sm leading-relaxed">
            <h3 className="text-xl font-bold text-white mb-2">Professional Summary</h3>
            <p>
              I am a visionary Digital Product Designer with over 6 years of experience crafting premium, user-centric experiences.
            </p>
            <p>
              Having collaborated with industry-leading brands and fast-paced startups, I specialize in design systems, interaction design, and high-fidelity prototyping.
            </p>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Experience</h3>
            
            <div className="border-l border-white/10 pl-4 space-y-4">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-[var(--color-accent-orange)]" />
                <h4 className="text-base font-bold text-white">Senior Product Designer</h4>
                <p className="text-[var(--color-accent-orange)] text-xs mb-1">Techy Studios • 2023 - Present</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-white/20" />
                <h4 className="text-base font-bold text-white">UI/UX Designer</h4>
                <p className="text-white/50 text-xs mb-1">Creative Agency • 2020 - 2023</p>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Core Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <h4 className="text-white text-xs font-medium mb-1">Design</h4>
                <p className="text-white/60 text-[10px] leading-tight">UI/UX Design, Interaction, Wireframing</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <h4 className="text-white text-xs font-medium mb-1">Tools</h4>
                <p className="text-white/60 text-[10px] leading-tight">Figma, Adobe CS, Framer, Webflow</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <h4 className="text-white text-xs font-medium mb-1">Development</h4>
                <p className="text-white/60 text-[10px] leading-tight">HTML/CSS, React, Next.js, Tailwind</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <h4 className="text-white text-xs font-medium mb-1">Soft Skills</h4>
                <p className="text-white/60 text-[10px] leading-tight">Leadership, Agile, Research, Mentoring</p>
              </div>
            </div>
          </div>
        );
      case 'links':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Links</h3>
            <div className="flex flex-col gap-2">
              <a href="https://www.instagram.com/_techy55" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[var(--color-accent-orange)]" />
                  <span className="text-white text-sm font-medium">Instagram</span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" />
              </a>
              <a href="https://www.behance.net/garyalulu5" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-4 h-4 text-[var(--color-accent-orange)]" />
                  <span className="text-white text-sm font-medium">Behance</span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" />
              </a>
              <a href="https://github.com/Gary-alulu" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-4 h-4 text-[var(--color-accent-orange)]" />
                  <span className="text-white text-sm font-medium">GitHub</span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" />
              </a>
              <a href="mailto:alulugary5@gmail.com" className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--color-accent-orange)]" />
                  <span className="text-white text-sm font-medium">alulugary5@gmail.com</span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" />
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 px-4 md:px-8">
      
      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative border border-white/5 bg-[#121212]/90 backdrop-blur-2xl shadow-2xl flex flex-col min-h-[650px]"
      >
        {/* Abstract Glowing Backgrounds */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-[var(--color-accent-orange)]/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-orange)]/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/20 rounded-full blur-[80px]" />
        </div>

        {/* Top Header */}
        <div className="relative z-20 flex justify-between items-center p-8 md:px-12 md:py-10">
          <div className="flex items-center gap-2 text-sm font-medium text-white/80">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to work
          </div>
          <button 
            onClick={openResume}
            className="px-6 py-2.5 rounded-full bg-[var(--color-accent-orange)] text-black font-bold text-sm hover:scale-105 transition-transform"
          >
            Resume
          </button>
        </div>

        {/* Main Content Split */}
        <div className="relative z-10 flex flex-col md:flex-row flex-1 px-6 md:px-12 pb-0 md:pb-12">
          
          {/* Left: Typography & Contact Info */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-[var(--color-accent-orange)] font-bold tracking-wide">
                Digital Product Designer
              </h2>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white">
                Gary<br />Alulu
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 max-w-xl">
                <div className="flex items-center gap-4 text-white/80">
                  <Mail className="w-5 h-5 text-[var(--color-accent-orange)]" />
                  <a href="mailto:alulugary5@gmail.com" className="text-sm hover:text-white transition-colors">alulugary5@gmail.com</a>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <Globe className="w-5 h-5 text-[var(--color-accent-orange)]" />
                  <a href="https://www.behance.net/garyalulu5" target="_blank" rel="noreferrer" className="text-sm hover:text-white transition-colors">behance.net/garyalulu5</a>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <Phone className="w-5 h-5 text-[var(--color-accent-orange)]" />
                  <a href="tel:+254769680739" className="text-sm hover:text-white transition-colors">+254 769 680 739</a>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <MapPin className="w-5 h-5 text-[var(--color-accent-orange)]" />
                  <span className="text-sm">Nairobi, Kenya</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Portrait Silhouette Area */}
          <div className="w-full relative h-[380px] md:flex-1 md:h-auto md:min-h-[500px] mt-8 md:mt-0 flex items-end justify-center pointer-events-none mb-0 md:-mb-12">
            <div className="relative w-full max-w-[400px] md:max-w-[600px] h-full opacity-90 drop-shadow-[0_0_30px_rgba(255,107,0,0.2)] scale-100 md:scale-[1.15] origin-bottom">
              <Image 
                src="/images/SILHOUTE.png" 
                alt="Gary Alulu Silhouette" 
                fill 
                sizes="(max-width: 768px) 400px, 600px"
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Navigation Pill with Tooltip Modals */}
        <div 
          className="absolute z-50 w-[95%] md:w-full px-2 md:px-0 flex flex-col items-center bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
          onMouseLeave={() => setActiveModal(null)}
        >
          
          <AnimatePresence>
            {activeModal && activeModal !== ('gallery' as any) && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mb-4 w-full max-w-sm bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] pointer-events-auto"
              >
                <ModalContent />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full max-w-fit mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-2 flex items-center justify-start md:justify-between gap-1 overflow-x-auto hide-scrollbar shadow-2xl">
            
            <NavButton id="summary" icon={FileText} label="Summary" />
            <NavButton id="experience" icon={Briefcase} label="Experience" />
            <NavButton id="skills" icon={Zap} label="Skills" />
            
            <div className="relative">
              <Link 
                href="/gallery" 
                onMouseEnter={() => setActiveModal(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 font-medium text-sm transition-all whitespace-nowrap"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Gallery</span>
              </Link>
            </div>
            
            <NavButton id="links" icon={LinkIcon} label="Links" />
            
          </div>
        </div>

      </motion.div>
    </section>
  );
}
