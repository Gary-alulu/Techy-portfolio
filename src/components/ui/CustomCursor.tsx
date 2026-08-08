"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    const checkTouch = () => setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Use motion values to bypass React state and avoid re-renders on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor components
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 1 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 1 });

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // passive: true drastically improves scroll/mouse performance
    window.addEventListener("mousemove", updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [mouseX, mouseY]);

  return isTouchDevice ? null : (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[99] opacity-20 will-change-transform"
        style={{
          background: "radial-gradient(circle, var(--color-accent-orange) 0%, transparent 70%)",
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
