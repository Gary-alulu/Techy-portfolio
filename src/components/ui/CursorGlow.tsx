"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorGlow() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth trailing
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25, mass: 0.5 });
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkTouch = () => setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200); // 400px width / 2
      mouseY.set(e.clientY - 200);
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full mix-blend-screen z-50 transition-opacity duration-500"
      style={{
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0,
        background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)",
      }}
    />
  );
}
