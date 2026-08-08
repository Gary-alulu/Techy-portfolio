"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Globe, Code, ZoomIn, ZoomOut, Maximize, ChevronLeft, ChevronRight, CheckCircle2, FileText } from "lucide-react";
import { useResumeModal } from "@/context/ResumeModalContext";

type RoleData = {
  id: string;
  title: string;
  stats: { label: string; value: string }[];
  expertise: string[];
  highlights: string[];
  availability: string;
  fileUrl: string;
};

const categoryMap: Record<string, string> = {
  "product": "Digital Product Designer",
  "uiux": "UI/UX Designer",
  "frontend": "Frontend Developer",
};

export default function ResumeModal() {
  const { isOpen, closeModal } = useResumeModal();
  const [rolesData, setRolesData] = useState<RoleData[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  
  const currentRole = rolesData.find(r => r.id === selectedRole) || rolesData[0];

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch("/api/resumes", { cache: "no-store" })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.resumes && data.resumes.length > 0) {
            const mappedRoles = data.resumes.map((dbRole: any) => ({
              id: dbRole.category,
              title: dbRole.title || categoryMap[dbRole.category] || "Role",
              stats: dbRole.stats || [],
              expertise: dbRole.expertise || [],
              highlights: dbRole.highlights || [],
              availability: dbRole.availability || "Available",
              fileUrl: dbRole.fileName ? `/api/resumes/${dbRole.category}` : "#"
            }));
            setRolesData(mappedRoles);
            setSelectedRole(mappedRoles[0].id);
          } else {
            setRolesData([]);
          }
        })
        .catch(console.error)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Soft Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div 
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]"
                animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none"></div>
            </div>
            
            {/* Modal Container */}
            <motion.div
              className="relative w-full max-w-[1100px] max-h-[90vh] bg-neutral-950/80 border border-white/10 rounded-[28px] sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              
              {/* Header */}
              <div className="flex items-center justify-between px-8 pt-9 pb-7 sm:px-12 sm:pt-11 sm:pb-9 border-b border-white/5 relative z-10 flex-shrink-0">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Resume</h2>
                  <p className="text-[var(--color-secondary)] text-sm mt-1.5 max-w-md">
                    A quick overview of my experience, skills and recent work.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:rotate-90 hover:scale-95 flex-shrink-0"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-8 py-8 sm:px-12 sm:py-10 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
                
                {isLoading ? (
                  <div className="flex items-center justify-center w-full min-h-[400px]">
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  </div>
                ) : rolesData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center w-full min-h-[400px] text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <FileText className="w-8 h-8 text-[var(--color-secondary)]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Resumes Yet</h3>
                    <p className="text-[var(--color-secondary)] max-w-md">
                      Resumes will appear here once they have been uploaded and configured via the admin panel.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Left Side: Interactive Preview Viewer */}
                    <div className="flex-1 flex flex-col order-2 lg:order-1 min-h-0">
                      
                      {/* Choose a Resume Selector */}
                      <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0">
                        <p className="text-sm font-medium mb-4 text-[var(--color-secondary)]">Choose a Resume Focus</p>
                        <div className="flex flex-wrap gap-2.5">
                          {rolesData.map((role) => (
                            <button
                              key={role.id}
                              onClick={() => setSelectedRole(role.id)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                                selectedRole === role.id 
                                ? "bg-white text-black" 
                                : "bg-white/5 text-[var(--color-secondary)] hover:bg-white/10 border border-white/5"
                              }`}
                            >
                              {selectedRole === role.id ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-white/30" />}
                              {role.title}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* PDF Mock Preview Viewer */}
                      <div className="w-full min-h-[400px] flex-1 rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden flex flex-col shadow-inner relative group">
                        {/* Viewer Toolbar */}
                        <div className="h-12 bg-neutral-950 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
                          <p className="text-xs font-medium text-white/50 truncate pr-2">Resume_Gary_Alulu_{currentRole?.id?.toUpperCase()}.pdf</p>
                          <div className="flex items-center gap-2 text-white/50 flex-shrink-0">
                            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))} className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"><ZoomOut className="w-4 h-4" /></button>
                            <button onClick={() => setZoom(z => Math.min(2.5, z + 0.2))} className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"><ZoomIn className="w-4 h-4" /></button>
                            <div className="w-px h-4 bg-white/10 mx-1" />
                            <button onClick={() => window.open(currentRole?.fileUrl || "#", "_blank")} className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"><Maximize className="w-4 h-4" /></button>
                          </div>
                        </div>
                        {/* Real PDF Document Page */}
                        <div className="flex-1 bg-neutral-800 overflow-auto relative">
                          <div className="min-w-full min-h-full flex items-start justify-center p-6 sm:p-8">
                            <motion.div 
                              key={selectedRole}
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: zoom }}
                              transition={{ duration: 0.2 }}
                              style={{ 
                                transformOrigin: 'top center',
                              }}
                              className="w-full max-w-[600px] aspect-[1/1.414] bg-white rounded shadow-xl relative"
                            >
                              {currentRole?.fileUrl && currentRole.fileUrl !== "#" ? (
                                <iframe 
                                  src={`${currentRole.fileUrl}#toolbar=0&navpanes=0&view=FitH`} 
                                  className="w-full h-full border-none rounded"
                                  title={`Resume ${currentRole.title}`}
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-400 flex-col gap-2">
                                  <FileText className="w-8 h-8 opacity-50" />
                                  <span>No PDF uploaded yet</span>
                                </div>
                              )}
                            </motion.div>
                          </div>
                        </div>
                        {/* Viewer Footer */}
                        <div className="h-12 bg-neutral-950 border-t border-white/10 flex items-center justify-between px-4 flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-white/30 hover:text-white hover:bg-white/10 rounded transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                            <span className="text-xs font-medium text-white/50">1 / 1</span>
                            <button className="p-1.5 text-white/30 hover:text-white hover:bg-white/10 rounded transition-colors"><ChevronRight className="w-4 h-4" /></button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-green-400 bg-green-400/10 px-2 py-1 rounded-full whitespace-nowrap"><CheckCircle2 className="w-3 h-3"/> ATS Optimized</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Side: Information & Actions */}
                    <div className="w-full lg:w-[400px] flex flex-col gap-8 order-1 lg:order-2 flex-shrink-0">
                      
                      {/* Profile Header */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-neutral-800 border border-white/10 p-1 flex-shrink-0">
                          <div className="w-full h-full rounded-full bg-neutral-700 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-blue-500/20" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Gary Alulu</h3>
                          <p className="text-orange-400 text-sm font-medium">{currentRole?.title}</p>
                          <p className="text-[var(--color-secondary)] text-xs mt-0.5">Nairobi, Kenya</p>
                        </div>
                      </div>

                      {/* Availability Pill */}
                      {currentRole?.availability && (
                        <div>
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
                            <span className={`w-2 h-2 rounded-full ${currentRole.availability.includes("Freelance") || currentRole.availability.includes("Available") ? "bg-green-500" : "bg-yellow-500"} animate-pulse`} />
                            {currentRole.availability}
                          </span>
                        </div>
                      )}

                      {/* Quick Stats Grid */}
                      {currentRole?.stats && currentRole.stats.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                          {currentRole.stats.map((stat, idx) => (
                            <motion.div 
                              key={`${currentRole.id}-stat-${idx}`}
                              className="bg-white/5 border border-white/5 rounded-xl p-5 sm:p-6 flex flex-col justify-center gap-1"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * idx }}
                            >
                              <span className="text-2xl font-bold text-white leading-tight">{stat.value}</span>
                              <span className="text-xs font-medium text-[var(--color-secondary)] leading-snug">{stat.label}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Expertise Pills */}
                      {currentRole?.expertise && currentRole.expertise.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider mb-3">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentRole.expertise.map((skill, idx) => (
                              <motion.span 
                                key={`${currentRole.id}-skill-${idx}`}
                                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (0.05 * idx) }}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlights */}
                      {currentRole?.highlights && currentRole.highlights.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider mb-3">Highlights</h4>
                          <ul className="space-y-3">
                            {currentRole.highlights.map((highlight, idx) => (
                              <motion.li 
                                key={`${currentRole.id}-hl-${idx}`}
                                className="flex items-start gap-3 text-sm text-[var(--color-secondary)] leading-relaxed"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (0.05 * idx) }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-orange-400/80 mt-0.5 flex-shrink-0" />
                                <span>{highlight}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 mt-auto pt-4">
                        <a 
                          href={currentRole?.fileUrl || "#"}
                          download
                          className="group relative w-full px-6 py-4 rounded-xl bg-white text-black font-semibold text-center overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow"
                        >
                          <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          <span className="relative flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download PDF Resume
                          </span>
                        </a>
                        <div className="grid grid-cols-2 gap-3">
                          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors">
                            <Globe className="w-4 h-4" /> LinkedIn
                          </a>
                          <a href="https://github.com/Gary-alulu" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors">
                            <Code className="w-4 h-4" /> GitHub
                          </a>
                        </div>
                      </div>

                    </div>
                  </>
                )}
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
