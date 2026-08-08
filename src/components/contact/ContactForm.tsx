"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Code, PenTool, Layout, Box, MonitorPlay } from "lucide-react";

const PROJECT_TYPES = [
  { id: "uiux", label: "UI/UX Design", icon: Layout },
  { id: "frontend", label: "Frontend Development", icon: Code },
  { id: "graphic", label: "Graphic Design", icon: PenTool },
  { id: "motion", label: "Motion Graphics", icon: MonitorPlay },
  { id: "brand", label: "Brand Identity", icon: Sparkles },
  { id: "web", label: "Website Design", icon: Box },
  { id: "other", label: "Other", icon: Box },
];

const BUDGETS = ["Under KES 50k", "KES 50k–150k", "KES 150k–400k", "KES 400k+"];
const TIMELINES = ["ASAP", "2 Weeks", "1 Month", "Flexible"];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      setStatus("success");
      
      // WhatsApp Redirect
      const WHATSAPP_NUMBER = "254769680739"; // Using the number you provided (formatted for Kenya)
      const text = `Hi Gary! I'm interested in working with you.
      
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || "N/A"}
Project Type: ${formData.projectType || "N/A"}
Budget: ${formData.budget || "N/A"}
Timeline: ${formData.timeline || "N/A"}

Message:
${formData.message}`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error(error);
      alert("There was an error sending your message. Please try again.");
      setStatus("idle");
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
        <p className="text-[var(--color-secondary)] max-w-sm mx-auto">
          Thanks for reaching out. I&apos;ll review your details and get back to you within 24 hours.
        </p>
        <button 
          onClick={() => { setStatus("idle"); setFormData({ name: "", email: "", phone: "", company: "", projectType: "", budget: "", timeline: "", message: "" }) }}
          className="mt-8 text-sm font-medium hover:text-white transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
      
      {/* Basic Info */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-secondary)] pl-1">Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-accent-blue)] focus:bg-white/10 transition-all text-white placeholder:text-white/20 shadow-inner"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-secondary)] pl-1">Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-accent-blue)] focus:bg-white/10 transition-all text-white placeholder:text-white/20 shadow-inner"
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-secondary)] pl-1">Phone Number</label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-accent-blue)] focus:bg-white/10 transition-all text-white placeholder:text-white/20 shadow-inner"
              placeholder="+254 700 000 000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-secondary)] pl-1">Company (Optional)</label>
          <input 
            type="text" 
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-accent-blue)] focus:bg-white/10 transition-all text-white placeholder:text-white/20 shadow-inner"
            placeholder="Acme Corp"
          />
          </div>
        </div>
      </div>

      {/* Project Type */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-[var(--color-secondary)] pl-1">Project Type</label>
        <div className="flex flex-wrap gap-3">
          {PROJECT_TYPES.map((type) => {
            const isSelected = formData.projectType === type.id;
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => updateField("projectType", type.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-300 ${
                  isSelected 
                    ? "bg-white/10 border-[var(--color-accent-blue)] text-white shadow-[0_0_15px_rgba(0,117,255,0.2)]"
                    : "bg-white/5 border-white/5 text-[var(--color-secondary)] hover:bg-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-[var(--color-accent-blue)]" : ""}`} />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--color-secondary)] pl-1">Budget</label>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((budget) => {
              const isSelected = formData.budget === budget;
              return (
                <button
                  key={budget}
                  type="button"
                  onClick={() => updateField("budget", budget)}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
                    isSelected 
                      ? "bg-white/10 border-[var(--color-accent-orange)] text-[var(--color-accent-orange)] shadow-[0_0_15px_rgba(255,107,0,0.2)]"
                      : "bg-white/5 border-white/5 text-[var(--color-secondary)] hover:bg-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {budget}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--color-secondary)] pl-1">Timeline</label>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((timeline) => {
              const isSelected = formData.timeline === timeline;
              return (
                <button
                  key={timeline}
                  type="button"
                  onClick={() => updateField("timeline", timeline)}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
                    isSelected 
                      ? "bg-white/10 border-[var(--color-accent-purple)] text-[var(--color-accent-purple)] shadow-[0_0_15px_rgba(157,0,255,0.2)]"
                      : "bg-white/5 border-white/5 text-[var(--color-secondary)] hover:bg-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {timeline}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-secondary)] pl-1">Message</label>
        <textarea 
          required
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 focus:outline-none focus:border-[var(--color-accent-blue)] focus:bg-white/10 transition-all text-white placeholder:text-white/20 shadow-inner resize-none"
          placeholder="Tell me about your project...&#10;&#10;Goals&#10;Target audience&#10;Timeline&#10;Anything you'd like me to know..."
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        disabled={status === "loading"}
        className="w-full glass-pill py-5 font-medium flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 group relative overflow-hidden disabled:cursor-wait"
      >
        {status === "loading" && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-purple)] to-[var(--color-accent-orange)] opacity-50"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        <span className="relative z-10 flex items-center gap-2 group-hover:text-white drop-shadow-md">
          {status === "loading" ? "Sending..." : "Send Message"}
          {status !== "loading" && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />}
        </span>
      </button>
    </form>
  );
}
