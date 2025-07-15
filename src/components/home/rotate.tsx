"use client";

import { SanityImage } from "@/types/perfume";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

export default function Rotate({
  images,
}: {
  images: { asset: SanityImage }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const lastScrollY = useRef(0);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  useGSAP(() => {
    let scrollTimeout: NodeJS.Timeout;

    // Simplified scroll handler
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      rotationRef.current += delta * 0.1;  // adjust this value to change the sensitivity
      lastScrollY.current = currentScrollY;

      setForceUpdate((prev) => prev + 1);

      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
        gsap.to(containerRef.current, {
          rotationY: rotationRef.current,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            rotationY: rotationRef.current,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }, 100);
    };

    // Simplified wheel handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      rotationRef.current += e.deltaY * 0.5;
      setForceUpdate((prev) => prev + 1);

      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
        gsap.to(containerRef.current, {
          rotationY: rotationRef.current,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            rotationY: rotationRef.current,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }, 100);
    };

    // Simplified touch handlers
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].clientY;
      const delta = touchStartY - touchCurrentY;

      if (Math.abs(delta) > 5) {
        rotationRef.current += delta * 1;   //adjust this value to change the sensitivity
        setForceUpdate((prev) => prev + 1);

        if (containerRef.current) {
          gsap.killTweensOf(containerRef.current);
          gsap.to(containerRef.current, {
            rotationY: rotationRef.current,
            duration: 0.2,
            ease: "power2.out",
          });
        }

        touchStartY = touchCurrentY;
      }
    };

    const handleTouchEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            rotationY: rotationRef.current,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }, 100);
    };

    // Initialize
    lastScrollY.current = window.scrollY;

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: true });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
      clearTimeout(scrollTimeout);
    };
  }, [isMobile, isTablet]);

  const totalSlides = images.length;

  return (
    <div
      className="overflow-hidden w-full h-[400px] flex items-center justify-center touch-pan-y"
      style={{
        perspective: `1200px`,
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {images.map((item, index) => {
          const radius = isMobile ? 100 : isTablet ? 200 : 350;
          const angle = (index * 2 * Math.PI) / totalSlides;
          const x = radius * Math.sin(angle);
          const z = radius * Math.cos(angle);

          return (
            <div
              key={index}
              className="absolute pointer-events-none w-[90px] md:w-[200px] lg:w-[300px]"
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-rotationRef.current}deg)`,
              }}
            >
              <div className="w-full h-full overflow-hidden rounded-lg md:rounded-xl">
                <img
                  src={item.asset.url}
                  alt={`Ingredient ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}