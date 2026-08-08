"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ResumeModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// Provide a safe default so the context is never undefined (even during SSR)
const ResumeModalContext = createContext<ResumeModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  return useContext(ResumeModalContext);
}
