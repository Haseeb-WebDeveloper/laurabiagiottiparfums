"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRingProps {
  images: string[];
}

const ScrollRing: React.FC<ScrollRingProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined" || !ringRef.current) return;

      const ring = ringRef.current;
      const container = containerRef.current;

      if (!container) return;

      // Set initial 3D perspective
      gsap.set(container, {
        perspective: 1200,
        perspectiveOrigin: "50% 50%",
      });

      gsap.set(ring, {
        transformStyle: "preserve-3d",
      });

      // Position images in circular ring
      const imageElements = ring.querySelectorAll(".ring-image");
      const radius = 280;
      const angleStep = 360 / images.length;

      imageElements.forEach((img, index) => {
        const angle = index * angleStep;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const z = Math.sin((angle * Math.PI) / 180) * radius;

        gsap.set(img, {
          x: x,
          z: z,
          rotationY: angle,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      });

      // Create smooth scroll-based rotation animation
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // Increased for smoother movement
        onUpdate: (self) => {
          // Calculate rotation based on scroll progress
          // Multiple full rotations for dramatic effect
          const rotation = self.progress * 1440; // 4 full rotations

          // Apply smooth rotation to the entire ring
          gsap.set(ring, {
            rotationY: rotation,
            force3D: true,
          });
        },
      });

      // Optional: Add a subtle floating animation
      gsap.to(ring, {
        y: -10,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="relative">
      {/* 3D Ring Container */}
      <div ref={containerRef} className="relative h-[300vh]overflow-hidden">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div ref={ringRef} className="relative w-[600px] h-[600px]">
            {images.map((image, index) => (
              <div
                key={index}
                className="ring-image absolute w-28 h-28 md:w-36 md:h-36 left-1/2 top-1/2"
                style={{
                  marginLeft: "-56px", // Half of w-28
                  marginTop: "-56px", // Half of h-28
                }}
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={image}
                    alt={`Ring image ${index + 1}`}
                    fill
                    className="object-cover rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 112px, 144px"
                    priority={index < 3} // Prioritize first 3 images
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollRing;
