"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HomePageNews } from "@/types/home-page";
import { ParallaxImage } from "../ui/ParallaxImage";
import Link from "next/link";
import { formatDate } from "@/utils/formet-data";

gsap.registerPlugin(ScrollTrigger);

const NewsHorizontalScroll = ({
  cards,
  locale,
}: {
  cards: HomePageNews[];
  locale: string;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Function to initialize the animation
  const initAnimation = () => {
    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger) return;

    // Check if it's desktop (1024px and up)
    const isDesktop = window.innerWidth >= 1024;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.scrollTrigger?.kill();
      timelineRef.current.kill();
    }

    // Only create animation for desktop
    if (!isDesktop) {
      return;
    }

    // Calculate the scroll width
    const totalWidth = container.scrollWidth;
    const windowWidth = window.innerWidth;
    const distance = totalWidth - windowWidth;

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top +=185px",
        end: () => `+=${distance * 0.7}`, // Adjust multiplier to control speed
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Add animation to timeline
    tl.to(container, {
      x: -distance,
      ease: "none",
      duration: 1,
    });

    // Store timeline reference
    timelineRef.current = tl;
  };

  useEffect(() => {
    // Handler for the columnHeightSet event
    const handleColumnHeightSet = () => {
      // Small delay to ensure DOM is settled
      setTimeout(() => {
        initAnimation();
        ScrollTrigger.refresh();
      }, 100);
    };

    // Listen for the columnHeightSet event
    window.addEventListener("columnHeightSet", handleColumnHeightSet);

    // Initialize animation immediately as well
    initAnimation();

    return () => {
      window.removeEventListener("columnHeightSet", handleColumnHeightSet);
      if (timelineRef.current) {
        timelineRef.current.scrollTrigger?.kill();
        timelineRef.current.kill();
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      initAnimation();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Desktop Layout - Horizontal Scroll */}
      <div
        ref={triggerRef}
        className="relative hidden lg:flex h-[calc(100vh-20px)] flex-col justify-between"
      >
        <h2 className="text-[3rem] font-bold">News</h2>
        {/* Container that moves horizontally */}
        <div
          ref={containerRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center gap-[7rem]"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            WebkitTransform: "translateZ(0)",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative flex-none overflow-hidden group w-fit"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="w-fit flex gap-[2rem] items-start h-full">
                <div className="aspect-[4/3] relative h-full w-[300px] min-h-[400px]">
                  <ParallaxImage
                    src={card.featuredImage?.asset.url || ""}
                    alt={card.title}
                    className="rounded-[1rem] w-full h-full object-cover"
                  />
                </div>
                <div className="w-fit h-full min-h-[400px] flex flex-col justify-between">
                  <div className="">
                    <div className="uppercase tracking-[0.1em] text-[0.875rem] font-[500]">
                      {formatDate(card._updatedAt)}
                    </div>
                    <h3 className="max-w-[300px] text-[2rem] font-bold line-clamp-2">
                      {card.title}
                    </h3>
                    <p className="pt-[1rem] text-[1rem] max-w-[300px] line-clamp-4">
                      {card.description}
                    </p>
                  </div>
                  <button className="mt-[4rem] cursor-pointer w-fit flex items-center justify-center uppercase tracking-[1.1px] text-[14px] leading-[20px] font-[400] border-b border-foreground transition-colors duration-300">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* View all circle button*/}
          <Link
            href={`/news`}
            className="relative flex-none overflow-hidden group min-w-[600px] h-full"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex items-center justify-center w-[190px] h-[190px] rounded-full border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300">
              <span className="uppercase text-[13px] tracking-wide font-[400] text-back">
                Discover all news
              </span>
            </div>
          </Link>
        </div>
        <Link
          href={`/news`}
          className="cursor-pointer uppercase w-fit px-[1.7rem] py-[0.6rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          Discover all news
        </Link>
      </div>

      {/* Tablet & Mobile Layout - Single Column */}
      <div className="block lg:hidden py-8">
        <h2 className="text-[2rem] md:text-[3rem] font-bold mb-8">News</h2>
        
        {/* Single column layout */}
        <div className="flex flex-col gap-8 md:gap-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                <div className="aspect-[4/3] relative w-full md:w-[300px] md:min-h-[300px]">
                  <ParallaxImage
                    src={card.featuredImage?.asset.url || ""}
                    alt={card.title}
                    className="rounded-[1rem] w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:flex-1 flex flex-col justify-between md:min-h-[300px]">
                  <div className="">
                    <div className="uppercase tracking-[0.1em] text-[0.875rem] font-[500]">
                      {formatDate(card._updatedAt)}
                    </div>
                    <h3 className="text-[1.5rem] md:text-[2rem] font-bold line-clamp-2 mt-2">
                      {card.title}
                    </h3>
                    <p className="pt-[1rem] text-[1rem] line-clamp-4 md:line-clamp-6">
                      {card.description}
                    </p>
                  </div>
                  <button className="mt-[2rem] md:mt-[4rem] cursor-pointer w-fit flex items-center justify-center uppercase tracking-[1.1px] text-[14px] leading-[20px] font-[400] border-b border-foreground transition-colors duration-300">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom button */}
        <div className="flex justify-center mt-12">
          <Link
            href={`/news`}
            className="cursor-pointer uppercase w-fit px-[1.7rem] py-[0.6rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Discover all news
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsHorizontalScroll;