import dynamic from "next/dynamic";

import { AboutBackground } from "@/components/about/AboutBackground";
import { AboutHero } from "@/components/about/AboutHero";
import { StoryCards } from "@/components/about/StoryCards";
import { DesignPhilosophy } from "@/components/about/DesignPhilosophy";
import { TestimonialStrip } from "@/components/about/TestimonialStrip";
import { AboutCTA } from "@/components/about/AboutCTA";

// Dynamically import heavy components to reduce initial JS payload
const EvolutionTimeline = dynamic(() => import("@/components/about/EvolutionTimeline").then(mod => mod.EvolutionTimeline));
const BentoExpertise = dynamic(() => import("@/components/about/BentoExpertise").then(mod => mod.BentoExpertise));
const CreativeProcess = dynamic(() => import("@/components/about/CreativeProcess").then(mod => mod.CreativeProcess));
const FloatingTools = dynamic(() => import("@/components/about/FloatingTools").then(mod => mod.FloatingTools));
const PremiumStats = dynamic(() => import("@/components/about/PremiumStats").then(mod => mod.PremiumStats));
const BehindTheScenes = dynamic(() => import("@/components/about/BehindTheScenes").then(mod => mod.BehindTheScenes));
const FunFacts = dynamic(() => import("@/components/about/FunFacts").then(mod => mod.FunFacts));

export const metadata = {
  title: "About",
  description: "Learn more about my design philosophy, creative journey, and the tools I use to build premium digital experiences.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white selection:bg-[var(--color-accent-blue)]/30">
      <AboutBackground />
      
      <main className="relative z-10 pb-32">
        <AboutHero />
        <StoryCards />
        <DesignPhilosophy />
        
        {/* Lazy Loaded Sections */}
        <EvolutionTimeline />
        <BentoExpertise />
        <CreativeProcess />
        <FloatingTools />
        <PremiumStats />
        <BehindTheScenes />
        <FunFacts />

        {/* Testimonial Strip */}
        <TestimonialStrip />

        {/* Let's Build Something CTA */}
        <AboutCTA />
      </main>
    </div>
  );
}
