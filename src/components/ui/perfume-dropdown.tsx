"use client";

import { CombinedPerfume } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

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
}

export default function PerfumeDropdown({
  perfumes,
  category,
  locale,
  categoryName,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: PerfumeDropdownProps) {
  const [hoveredPerfume, setHoveredPerfume] = useState<CombinedPerfume | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categoryPerfumes =
    category === "mens" ? perfumes.mens : perfumes.womens;

  // Handle image opacity transition when hovering over perfumes
  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      if (hoveredPerfume) {
        gsap.to(imageRef.current, {
          // opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(imageRef.current, {
              // opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, [hoveredPerfume]);

  useEffect(() => {
    if (!dropdownRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        // Initial state
        gsap.set(dropdownRef.current, {
          height: 0,
          opacity: 0,
          display: "block",
          y: 0,
        });
        gsap.set(titleRefs.current, {
          y: 50,
          opacity: 0,
        });
        gsap.set(imageContainerRef.current, {
          y: 250,
          height: "auto",
          opacity: 1,
        });

        // Animate dropdown container
        const tl = gsap.timeline();
        tl.to(dropdownRef.current, {
          height: "auto",
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
          );
      } else {
        // Enhanced exit animation
        const tl = gsap.timeline();

        // First, animate the image container to shrink vertically
        tl.to(imageContainerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        })
          // Then animate titles and move dropdown up
          .to(
            titleRefs.current,
            {
              opacity: 0,
              y: -20,
              duration: 0.2,
              ease: "power2.in",
            },
            "-=0.1"
          )
          // Finally animate the dropdown container
          .to(
            dropdownRef.current,
            {
              height: 0,
              opacity: 0,
              y: -20,
              duration: 0.2,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(dropdownRef.current, { display: "none", y: 0 });
                // Reset image container height
                gsap.set(imageContainerRef.current, { height: "auto" });
              },
            },
            "-=0.1"
          );
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  // Split perfumes into two columns
  const midPoint = Math.ceil(categoryPerfumes?.length / 2);
  const firstColumnPerfumes = categoryPerfumes.slice(0, midPoint);
  const secondColumnPerfumes = categoryPerfumes.slice(midPoint);

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
        <div className="max-w mx-auto px-[2rem] pb-[4rem] pt-[3.2rem]">
          <div className="flex justify-center gap-[1rem]">
            {/* First Column */}
            <div className="w-[200px] flex flex-col justify-center gap-[1rem]">
              {firstColumnPerfumes.map((perfume, index) => (
                <div
                  key={perfume._id}
                  ref={(el) => {
                    if (el) titleRefs.current[index] = el;
                  }}
                >
                  <Link
                    href={`/${locale}/${category}-perfume/${perfume.slug}`}
                    className="transition-colors block relativew-fit"
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
            <div className="w-[200px] flex flex-col justify-center gap-[1rem]">
              {secondColumnPerfumes.map((perfume, index) => (
                <div
                  key={perfume._id}
                  ref={(el) => {
                    if (el) titleRefs.current[index + midPoint] = el;
                  }}
                >
                  <Link
                    href={`/${locale}/${category}-perfume/${perfume.slug}`}
                    className="transition-colors block relative w-fit"
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
            <div ref={imageContainerRef}>
              <div
                ref={imageRef}
                className="opacity-100 transition-opacity duration-150"
              >
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
                  <Link href={`/${locale}/${category}-perfume`} className="transcend flex items-center justify-center w-[220px] h-[160px] rounded-[1rem] text-block bg-foreground text-background border-foreground border-[1px] hover:bg-background hover:text-foreground transition-colors duration-300 text-[1.25rem] font-[400]">
                    {categoryName}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
