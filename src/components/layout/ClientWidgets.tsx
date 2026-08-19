"use client";

import dynamic from "next/dynamic";

const ResumeModal = dynamic(() => import("@/components/ui/ResumeModal"), {
  ssr: false,
  loading: () => null,
});

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
  loading: () => null,
});

const AnimatedBackground = dynamic(() => import("@/components/ui/AnimatedBackground"), {
  ssr: false,
  loading: () => null,
});

const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"), {
  ssr: false,
  loading: () => null,
});

export default function ClientWidgets() {
  return (
    <>
      <AnimatedBackground />
      <CustomCursor />
      <WhatsAppButton />
      <ResumeModal />
    </>
  );
}
