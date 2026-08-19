"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LoadingScreen() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);

  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      const hasSeenIntro = sessionStorage.getItem("hasLoadedIntro");
      if (!hasSeenIntro) {
        setIsLoading(true);
        sessionStorage.setItem("hasLoadedIntro", "true");
        
        const dismiss = () => {
          setIsFadeOut(true);
          setTimeout(() => setIsLoading(false), 300);
        };

        if (document.readyState === "complete") {
          const timer = setTimeout(dismiss, 300);
          return () => clearTimeout(timer);
        } else {
          window.addEventListener("load", dismiss);
          const fallback = setTimeout(dismiss, 1500);
          return () => {
            window.removeEventListener("load", dismiss);
            clearTimeout(fallback);
          };
        }
      }
    }
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-[#0D0D0D] flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
        isFadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className={`relative z-10 flex flex-col items-center transition-all duration-300 ${isFadeOut ? "scale-98 opacity-0" : "scale-100 opacity-100"}`}>
        <Image 
          src="/images/MY LOGO.png" 
          alt="Gary Studio Logo" 
          width={240} 
          height={96} 
          sizes="200px"
          className="w-40 md:w-52 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          priority
        />
      </div>
    </div>
  );
}
