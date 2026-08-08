"use client";

import { ResumeModalProvider } from "@/context/ResumeModalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ResumeModalProvider>{children}</ResumeModalProvider>;
}
