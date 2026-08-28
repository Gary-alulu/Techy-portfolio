import { Suspense } from "react";
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

export const revalidate = 60;
export const metadata = {
  title: "About",
  description: "Learn more about my design philosophy, creative journey, and the tools I use to build premium digital experiences.",
};

const SectionFallback = ({ height = "min-h-[150px]" }: { height?: string }) => (
  <div className={`py-16 ${height} w-full`}>
    <div className={`skeleton w-full ${height}`} />
  </div>
);

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white selection:bg-[var(--color-accent-blue)]/30">
      <AboutBackground />
      
      <main className="relative z-10 pb-32">
        <AboutHero />
        <StoryCards />
        <DesignPhilosophy />
        
        {/* Lazy Loaded Sections with Suspense boundaries */}
        <Suspense fallback={<SectionFallback height="min-h-[300px]" />}>
          <EvolutionTimeline />
        </Suspense>

        <Suspense fallback={<SectionFallback height="min-h-[400px]" />}>
          <BentoExpertise />
        </Suspense>

        <Suspense fallback={<SectionFallback height="min-h-[350px]" />}>
          <CreativeProcess />
        </Suspense>

        <Suspense fallback={<SectionFallback height="min-h-[250px]" />}>
          <FloatingTools />
        </Suspense>

        <Suspense fallback={<SectionFallback height="min-h-[200px]" />}>
          <PremiumStats />
        </Suspense>

        <Suspense fallback={<SectionFallback height="min-h-[300px]" />}>
          <BehindTheScenes />
        </Suspense>

        <Suspense fallback={<SectionFallback height="min-h-[250px]" />}>
          <FunFacts />
        </Suspense>

        {/* Testimonial Strip */}
        <TestimonialStrip />

        {/* Let's Build Something CTA */}
        <AboutCTA />
      </main>
    </div>
  );
}

