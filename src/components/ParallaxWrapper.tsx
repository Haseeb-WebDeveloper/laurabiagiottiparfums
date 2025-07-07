"use client";

import React, { ReactNode } from "react";
import { useGSAPParallax } from "@/hooks/useGSAPParallax";

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  start?: string;
  end?: string;
  ease?: string;
  scrub?: boolean | number;
  className?: string;
  disabled?: boolean;
}

export const ParallaxWrapper = ({
  children,
  speed = 0.5,
  direction = 'up',
  start = 'top bottom',
  end = 'bottom top',
  ease = 'none',
  scrub = true,
  className = '',
  disabled = false,
}: ParallaxWrapperProps) => {
  const parallaxRef = useGSAPParallax({
    speed,
    direction,
    start,
    end,
    ease,
    scrub,
    disabled,
  });

  return (
    <div
      ref={parallaxRef}
      className={`parallax-element ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
};
