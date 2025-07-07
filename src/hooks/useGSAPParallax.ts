"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxConfig {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  start?: string;
  end?: string;
  ease?: string;
  scrub?: boolean | number;
  disabled?: boolean;
}

export const useGSAPParallax = (config: ParallaxConfig = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const {
    speed = 0.5,
    direction = 'up',
    start = 'top bottom',
    end = 'bottom top',
    ease = 'none',
    scrub = true,
    disabled = false,
  } = config;

  useEffect(() => {
    if (disabled || !elementRef.current) return;

    const element = elementRef.current;
    
    // Calculate movement based on direction and speed
    const getMovement = () => {
      const distance = 100 * speed;
      switch (direction) {
        case 'up':
          return { y: -distance };
        case 'down':
          return { y: distance };
        case 'left':
          return { x: -distance };
        case 'right':
          return { x: distance };
        default:
          return { y: -distance };
      }
    };

    // Create the parallax animation
    tweenRef.current = gsap.to(element, {
      ...getMovement(),
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
      },
    });

    // Cleanup function
    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction, start, end, ease, scrub, disabled]);

  return elementRef;
};

