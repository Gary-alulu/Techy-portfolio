"use client";

import dynamic from "next/dynamic";

const ResumeModal = dynamic(() => import("@/components/ui/ResumeModal"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const AnimatedBackground = dynamic(() => import("@/components/ui/AnimatedBackground"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <CustomCursor />
      <AnimatedBackground />
      <WhatsAppButton />
      <ResumeModal />
    </>
  );
}
