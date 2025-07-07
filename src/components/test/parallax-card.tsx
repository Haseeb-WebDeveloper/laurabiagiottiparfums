"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ParallaxCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !cardRef.current) return;

    // Create parallax effect for the image
    gsap.to(imageRef.current, {
      y: "30%", // Image will move 30% of its height
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // Smooth scrubbing effect
      },
    });

    // Optional: Add a subtle rotate effect to the card
    gsap.to(cardRef.current, {
      rotateX: 5, // Slight rotation for depth
      rotateY: -5,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div
        ref={cardRef}
        className="relative w-[400px] h-[600px] rounded-2xl"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Image container with parallax effect */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%]" // Extra height for parallax movement
          style={{
            backgroundImage: "url('/3d-test.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxCard;
