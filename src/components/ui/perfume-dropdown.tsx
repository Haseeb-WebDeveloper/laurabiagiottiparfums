"use client";

import { CombinedPerfume } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

interface PerfumeDropdownProps {
  perfumes: {
    mens: CombinedPerfume[];
    womens: CombinedPerfume[];
  };
  category: "mens" | "womens";
  locale: string;
  categoryName: string;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isSlugPage?: boolean;
}

export default function PerfumeDropdown({
  perfumes,
  category,
  locale,
  categoryName,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  isSlugPage = false,
}: PerfumeDropdownProps) {
  const [hoveredPerfume, setHoveredPerfume] = useState<CombinedPerfume | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const wasOpenRef = useRef<boolean>(false);
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const storedHeightRef = useRef<number>(0);

  const categoryPerfumes =
    category === "mens" ? perfumes.mens : perfumes.womens;

  // Animate dropdown open/close
  useEffect(() => {
    if (!dropdownRef.current) return;

    // Kill any existing animation
    if (animationTimelineRef.current) {
      animationTimelineRef.current.kill();
    }

    const ctx = gsap.context(() => {
      if (isOpen) {
        wasOpenRef.current = true;
        // Ensure dropdown is visible before animating
        gsap.set(dropdownRef.current, {
          display: "block",
          height: "auto",
          opacity: 0,
          y: 0,
        });

        // Set initial states for opening animation
        gsap.set(titleRefs.current, {
          y: 50,
          opacity: 0,
        });
        gsap.set(imageContainerRef.current, {
          y: 250,
          height: "auto",
          opacity: 0,
        });

        // Get the actual height for smooth animation
        const height = dropdownRef.current?.offsetHeight || 0;
        storedHeightRef.current = height; // Store for closing animation
        gsap.set(dropdownRef.current, { height: 0 });

        // Animate dropdown container
        const tl = gsap.timeline();
        animationTimelineRef.current = tl;
        tl.to(dropdownRef.current, {
          height: height,
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        })
          // Stagger animate titles
          .to(
            titleRefs.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.1"
          )
          // Animate image container
          .to(
            imageContainerRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.2"
          )
          // Set height to auto after animation completes
          .set(dropdownRef.current, { height: "auto" });
      } else {
        // Only run closing animation if it was previously open
        if (!wasOpenRef.current) {
          return;
        }
        
        // Enhanced exit animation - perfect reverse of opening
        // Ensure dropdown is visible to get accurate height
        if (!dropdownRef.current) return;
        
        // Force display block to ensure we can measure height
        gsap.set(dropdownRef.current, { display: "block" });
        
        // Get current height - prefer stored height, then try to measure, then fallback
        let currentHeight = storedHeightRef.current;
        if (currentHeight === 0) {
          currentHeight = dropdownRef.current.offsetHeight;
          if (currentHeight === 0) {
            currentHeight = dropdownRef.current.scrollHeight;
            if (currentHeight === 0) {
              // Last resort: use a reasonable default
              currentHeight = 300;
            }
          }
        }
        
        // Set the current height explicitly - ensure it's at full height
        gsap.set(dropdownRef.current, { 
          height: currentHeight,
          opacity: 1,
          y: 0
        });

        // Prepare titles for reverse stagger (second column first, then first column)
        // Create reversed array of refs for proper reverse stagger
        const reversedTitleRefs = [...titleRefs.current].filter(Boolean).reverse();

        const tl = gsap.timeline();
        animationTimelineRef.current = tl;

        // First, animate the image container (reverse of opening)
        tl.to(imageContainerRef.current, {
          y: 250,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
          // Then animate titles with REVERSE stagger (second column first, then first column)
          .to(
            reversedTitleRefs,
            {
              opacity: 0,
              y: 50,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.in",
            },
            "-=0.1"
          )
          // Finally animate the dropdown container (background) - smooth collapse from top to bottom
          // Keep opacity at 1 during height collapse (reverse of opening where opacity goes 0->1)
          .to(
            dropdownRef.current,
            {
              height: 0,
              opacity: 1, // Keep fully visible during collapse
              duration: 0.3,
              ease: "power2.inOut",
              onComplete: () => {
                // Fade out opacity only after height has fully collapsed
                gsap.to(dropdownRef.current, {
                  opacity: 0,
                  duration: 0.1,
                  ease: "power2.in",
                  onComplete: () => {
                    wasOpenRef.current = false;
                    if (dropdownRef.current) {
                      gsap.set(dropdownRef.current, { display: "none", y: 0 });
                    }
                    // Reset image container
                    if (imageContainerRef.current) {
                      gsap.set(imageContainerRef.current, { 
                        height: "auto",
                        y: 0,
                        opacity: 0
                      });
                    }
                    // Reset titles
                    gsap.set(titleRefs.current, { 
                      y: 0,
                      opacity: 0
                    });
                  },
                });
              },
            },
            "-=0.2"
          );
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  // Split perfumes into two columns, but ensure first column has at least 3 perfumes if possible
  let midPoint = Math.ceil(categoryPerfumes?.length / 2);
  if (categoryPerfumes.length >= 3 && midPoint < 3) {
    midPoint = 3;
  }
  const firstColumnPerfumes = categoryPerfumes.slice(0, midPoint);
  const secondColumnPerfumes = categoryPerfumes.slice(midPoint);

  // For smooth image/link fade
  const [imageKey, setImageKey] = useState<string>("init");
  useEffect(() => {
    // Use a key that changes when hoveredPerfume or fallback changes
    if (hoveredPerfume && hoveredPerfume.featuredImage) {
      setImageKey(hoveredPerfume._id + "-img");
    } else {
      setImageKey("fallback-link");
    }
  }, [hoveredPerfume, category, categoryName]);

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={dropdownRef}
        className="overflow-hidden border-b border-foreground/[0.08]"
        style={{ display: "none" }}
      >
        <div className="pb-[4rem] mt-[0.5rem] pt-[2.8rem] bg-background/60 backdrop-blur-[10px]">
          <div className="flex justify-center gap-[1rem] max-w mx-auto px-[2rem] ">
            {/* First Column */}
            <div className="w-[200px] flex flex-col justify-center">
              {firstColumnPerfumes.map((perfume, index) => (
                <div
                  key={perfume._id}
                  ref={(el) => {
                    if (el) titleRefs.current[index] = el;
                  }}
                >
                  <Link
                    href={`/${locale}/${category}-perfume/${perfume.slug}`}
                    className="transition-colors block relative w-fit pb-[0.5rem]"
                    onMouseEnter={() => {
                      setHoveredPerfume(perfume);
                      setHoveredIndex(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredPerfume(null);
                      setHoveredIndex(null);
                    }}
                  >
                    <p
                      className="w-fit inline-block text-[0.9rem] font-medium relative"
                      style={{
                        wordSpacing: "0.05em",
                      }}
                    >
                      {perfume.title}
                      <motion.div
                        initial={{ width: 0, height: 2 }}
                        animate={
                          hoveredIndex === index
                            ? {
                                width: "100%",
                                height: 1,
                                opacity: 1,
                                transition: {
                                  width: { duration: 0.4, ease: "easeInOut" },
                                  height: { delay: 0.3, duration: 0.2 },
                                },
                              }
                            : {
                                width: 0,
                                height: 2,
                                opacity: 0,
                                transition: { duration: 0.2 },
                              }
                        }
                        className="absolute bottom-0 left-0 bg-foreground"
                      />
                    </p>
                  </Link>
                </div>
              ))}
            </div>
            {/* Second Column */}
            <div className="w-[200px] flex flex-col justify-center">
              {secondColumnPerfumes.map((perfume, index) => (
                <div
                  key={perfume._id}
                  ref={(el) => {
                    if (el) titleRefs.current[index + midPoint] = el;
                  }}
                >
                  <Link
                    href={`/${locale}/${category}-perfume/${perfume.slug}`}
                    className="transition-colors block relative w-fit pb-[0.5rem]"
                    onMouseEnter={() => {
                      setHoveredPerfume(perfume);
                      setHoveredIndex(index + midPoint);
                    }}
                    onMouseLeave={() => {
                      setHoveredPerfume(null);
                      setHoveredIndex(null);
                    }}
                  >
                    <p
                      className="w-fit inline-block text-[0.9rem] font-medium relative"
                      style={{
                        wordSpacing: "0.05em",
                      }}
                    >
                      {perfume.title}
                      <motion.div
                        initial={{ width: 0, height: 2 }}
                        animate={
                          hoveredIndex === index + midPoint
                            ? {
                                width: "100%",
                                height: 1,
                                opacity: 1,
                                transition: {
                                  width: { duration: 0.4, ease: "easeInOut" },
                                  height: { delay: 0.3, duration: 0.2 },
                                },
                              }
                            : {
                                width: 0,
                                height: 2,
                                opacity: 0,
                                transition: { duration: 0.2 },
                              }
                        }
                        className="absolute bottom-0 left-0 bg-foreground"
                      />
                    </p>
                  </Link>
                </div>
              ))}
            </div>
            {/* Hovered perfume image */}
            <div
              ref={imageContainerRef}
              className="flex items-center justify-center min-w-[220px] min-h-[160px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.32 } }}
                  exit={{ opacity: 0, transition: { duration: 0.22 } }}
                  className={
                    hoveredPerfume && hoveredPerfume.featuredImage
                      ? "relative w-[220px] h-[160px] rounded-[1rem] overflow-hidden"
                      : "w-[220px] h-[160px] flex items-center justify-center"
                  }
                >
                  {hoveredPerfume && hoveredPerfume.featuredImage ? (
                    <Image
                      src={hoveredPerfume.featuredImage.asset.url}
                      alt={hoveredPerfume.title}
                      fill
                      className="object-cover rounded-[1rem] transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <Link
                      href={`/${locale}/${category}-perfume`}
                      className="transcend flex items-center justify-center w-[220px] h-[160px] rounded-[1rem] text-block bg-foreground text-background border-foreground border-[1px] hover:bg-background hover:text-foreground transition-colors duration-500 text-[1.25rem] font-[400]"
                    >
                      {categoryName}
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
