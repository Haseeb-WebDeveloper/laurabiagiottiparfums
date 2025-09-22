"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
import { HomePageNews } from "@/types/home-page";
import { ParallaxImage } from "../ui/ParallaxImage";
import Link from "next/link";
import { formatDate } from "@/utils/formet-data";
import { useLocale } from "@/lib/i18n/context";
import SplitText from "../ui/split-text";
// Local underline animation: keeps underline visible while hovered

gsap.registerPlugin(ScrollTrigger);

const NewsHorizontalScroll = ({
  cards,
  locale,
}: {
  cards: HomePageNews[];
  locale: string;
}) => {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Initialize underline baseline styles for GSAP-driven animation
  useEffect(() => {
    if (!underlineRefs.current) return;
    gsap.set(underlineRefs.current, {
      transformOrigin: "left",
      scaleX: 0,
      height: 2,
      opacity: 0,
    });
  }, [cards]);

  const animateUnderlineIn = (index: number) => {
    const el = underlineRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.set(el, { transformOrigin: "left", height: 2, opacity: 1 });
    const tl = gsap.timeline();
    tl.to(el, {
      scaleX: 1,
      duration: 0.6,
      ease: "power2.out",
    }).to(el, {
      height: 1,
      duration: 0.1,
      ease: "none",
    });
  };

  const animateUnderlineOut = (index: number) => {
    const el = underlineRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, {
      scaleX: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(el, { height: 2, opacity: 0 });
      },
    });
  };
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
        <SplitText
          className="md:text-[3rem] text-[3.5rem] font-bold"
          text="News"
          variant="heading"
        />
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
                    direction="horizontal"
                  />
                </div>
                <div className="w-fit h-full min-h-[400px] flex flex-col justify-between">
                  <div className="">
                    <SplitText
                      className="uppercase tracking-[0.1em] text-[0.875rem] font-[500]"
                      text={formatDate(card._updatedAt)}
                    />
                    <h3 className="max-w-[300px] text-[2rem] font-bold line-clamp-2">
                      {card.title}
                    </h3>
                    <p className="pt-[1rem] text-[1rem] max-w-[300px] line-clamp-4">
                      {card.description}
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/news/${card.slug}`}
                    className="relative inline-block mt-[4rem] pb-[3px] cursor-pointer w-fit tracking-[1.1px] text-[14px] leading-[20px] font-[400] transition-colors duration-300"
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      animateUnderlineIn(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex((prev) => (prev === index ? null : prev));
                      animateUnderlineOut(index);
                    }}
                  >
                    {t("readMore")}
                    <span
                      ref={(el) => {
                        underlineRefs.current[index] = el;
                      }}
                      className="pointer-events-none absolute left-0 right-0 bottom-0 w-full bg-foreground z-10"
                      style={{ willChange: "transform, height, opacity" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {/* View all circle button*/}
          <Link
            href={`/${locale}/news`}
            className="relative flex-none overflow-hidden group min-w-[600px] h-full"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex items-center justify-center xl:w-[210.66px] xl:h-[210.66px] w-[190px] h-[190px] rounded-full border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300">
              <span className="uppercase text-[13px] tracking-wide font-[400] text-back">
                {t("discoverAllNews")}
              </span>
            </div>
          </Link>
        </div>
        <Link
          href={`/${locale}/news`}
          className="cursor-pointer uppercase w-fit px-[1.7rem] py-[0.6rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          {t("discoverAllNews")}
        </Link>
      </div>

      {/* Tablet & Mobile Layout - Single Column */}
      <div className="block lg:hidden py-8">
        <SplitText
          className="text-[2rem] md:text-[3rem] font-bold mb-8"
          text="News"
          variant="heading"
        />

        {/* Single column layout */}
        <div className="flex flex-col gap-8 md:gap-12">
          {cards.map((card, index) => (
            <div key={index} className="relative overflow-hidden group">
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
                  <Link
                    href={`/${locale}/news/${card.slug}`}
                    className="mt-[2rem] md:mt-[4rem] cursor-pointer w-fit flex items-center justify-center  tracking-[1.1px] text-[14px] leading-[20px] font-[400] border-b border-foreground transition-colors duration-300"
                  >
                    {t("readMore")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom button */}
        <div className="flex mt-12">
          <Link
            href={`/${locale}/news`}
            className="cursor-pointer uppercase w-fit px-[1.7rem] py-[0.6rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            {t("discoverAllNews")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsHorizontalScroll;
