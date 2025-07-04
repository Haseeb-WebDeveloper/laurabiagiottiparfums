"use client";

import { Perfume } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface PerfumeDropdownProps {
  perfumes: Perfume[];
  category: "mens" | "womens";
  locale: string;
  categoryName: string;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function PerfumeDropdown({
  perfumes,
  category,
  locale,
  categoryName,
  isOpen,
  onMouseEnter,
  onMouseLeave
}: PerfumeDropdownProps) {
  const [hoveredPerfume, setHoveredPerfume] = useState<Perfume | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const filteredPerfumes = perfumes.filter(
    (perfume) => perfume.category === (category === "mens" ? "mens" : "womens")
  );

  useEffect(() => {
    if (!dropdownRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        // Initial state
        gsap.set(dropdownRef.current, { 
          height: 0,
          opacity: 0,
          display: "block"
        });
        gsap.set(titleRefs.current, { 
          y: 20,
          opacity: 0
        });
        gsap.set(imageContainerRef.current, {
          scale: 0.8,
          opacity: 0
        });

        // Animate dropdown container
        const tl = gsap.timeline();
        tl.to(dropdownRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut"
        })
        // Stagger animate titles
        .to(titleRefs.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out"
        }, "-=0.1")
        // Animate image container
        .to(imageContainerRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        }, "-=0.2");
      } else {
        // Animate out
        const tl = gsap.timeline();
        tl.to([imageContainerRef.current, ...titleRefs.current], {
          opacity: 0,
          y: 20,
          duration: 0.2,
          ease: "power2.in"
        })
        .to(dropdownRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(dropdownRef.current, { display: "none" });
          }
        }, "-=0.1");
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div 
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        ref={dropdownRef}
        className="absolute left-0 top-[10rem] bg-background z-[110] w-screen overflow-hidden border-b border-foreground/[0.08]"
        style={{ display: "none" }}
      >
        <div className="max-w mx-auto px-[2rem] py-[4rem]">
          <div className="flex justify-center gap-[1rem]">
            {/* 1-3 */}
            <div className="w-[200px] flex flex-col justify-center gap-4">
              {filteredPerfumes.slice(0, 3).map((perfume, index) => (
                <div
                  key={perfume._id}
                  ref={el => {
                    if (el) titleRefs.current[index] = el;
                  }}
                >
                  <Link
                    href={`/${locale}/${category}-perfume/${perfume.slug}`}
                    className="px-4 transition-colors block hover:text-primary"
                    onMouseEnter={() => setHoveredPerfume(perfume)}
                    onMouseLeave={() => setHoveredPerfume(null)}
                  >
                    <p className="text-lg font-medium">{perfume.title}</p>
                  </Link>
                </div>
              ))}
            </div>
            {/* 4-6 */}
            <div className="w-[200px] flex flex-col justify-center gap-4">
              {filteredPerfumes.slice(3, 6).map((perfume, index) => (
                <div
                  key={perfume._id}
                  ref={el => {
                    if (el) titleRefs.current[index + 3] = el;
                  }}
                >
                  <Link
                    href={`/${locale}/${category}-perfume/${perfume.slug}`}
                    className="px-4 transition-colors block hover:text-primary"
                    onMouseEnter={() => setHoveredPerfume(perfume)}
                    onMouseLeave={() => setHoveredPerfume(null)}
                  >
                    <p className="text-lg font-medium">{perfume.title}</p>
                  </Link>
                </div>
              ))}
            </div>
            {/* Hovered perfume image */}
            <div ref={imageContainerRef}>
              {hoveredPerfume && hoveredPerfume.featuredImage ? (
                <div className="relative w-[220px] h-[160px] rounded-[1rem] overflow-hidden">
                  <Image
                    src={hoveredPerfume.featuredImage.asset.url}
                    alt={hoveredPerfume.title}
                    fill
                    className="object-cover rounded-[1rem] transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-[220px] h-[160px] rounded-[1rem] text-block bg-foreground text-background">
                  {categoryName}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
