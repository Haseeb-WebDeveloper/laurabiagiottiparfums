"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect } from "react";

function SmoothScrolling({ children }: { children: ReactNode }) {

  useEffect(() => {
    document.body.classList.remove('transition-link');
  }, []);


  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.09, // Reduced for smoother interpolation
        smoothWheel: true, // Enable smooth mouse wheel scrolling
        duration: 1, // Increased for longer, smoother animations
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Custom easing function for smoother motion
      }}
    >
      <div className="lenis-wrapper">
        {children}
      </div>
    </ReactLenis>
  );
}

export default SmoothScrolling;