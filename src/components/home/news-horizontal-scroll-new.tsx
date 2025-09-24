"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomePageNews } from "@/types/home-page";
import { ParallaxImage } from "../ui/ParallaxImage";
import Link from "next/link";
import { formatDate } from "@/utils/formet-data";
import { useLocale } from "@/lib/i18n/context";
import SplitText from "../ui/split-text";

gsap.registerPlugin(ScrollTrigger);

const NewsHorizontalScrollNew = ({
  cards,
  locale,
}: {
  cards: HomePageNews[];
  locale: string;
}) => {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!container || !scrollContainer) return;

    // Check if it's desktop (1024px and up)
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    // Calculate scroll distance
    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = container.offsetWidth;
    const scrollDistance = scrollWidth - containerWidth;

    // Create the scroll trigger animation
    let scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top +=135px",
      end: `+=${scrollDistance + window.innerHeight}`,
      pin: true,
      scrub: 1,
      // markers: true,
      onUpdate: (self) => {
        // Calculate how much to translate based on scroll progress
        const progress = self.progress;
        const translateX = -scrollDistance * progress;
        gsap.set(scrollContainer, { x: translateX });
      },
      invalidateOnRefresh: true,
    });

    // Handle resize
    const handleResize = () => {
      scrollTrigger.kill();

      // Recalculate on resize
      setTimeout(() => {
        const newIsDesktop = window.innerWidth >= 1024;
        if (!newIsDesktop) return;

        const newScrollWidth = scrollContainer.scrollWidth;
        const newContainerWidth = container.offsetWidth;
        const newScrollDistance = newScrollWidth - newContainerWidth;

        scrollTrigger = ScrollTrigger.create({
          trigger: container,
          start: "top +=135px",
          end: `+=${newScrollDistance + window.innerHeight}`,
          pin: true,
          scrub: 1,
          // markers: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const translateX = -newScrollDistance * progress;
            gsap.set(scrollContainer, { x: translateX });
          },
          invalidateOnRefresh: true,
        });
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section className="relative">
      {/* Desktop Layout - Horizontal Scroll */}
      <div
        ref={containerRef}
        className="relative hidden lg:flex h-[calc(100vh-20px)] flex-col xl:gap-6 2xl:gap-10 justify-center"
      >
        <SplitText
          className="md:text-[2.85rem] text-[3.5rem] font-bold leading-[100%] tracking-[-0.05rem]"
          text="News"
          variant="heading"
        />

        {/* Container that moves horizontally */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-[7rem] pl-0 z-50"
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
                <div className="aspect-[4/3] rounded-[1rem] overflow-hidden relative h-full w-[300px] 2xl:min-h-[400px] min-h-[370px]">
                  <ParallaxImage
                    src={card.featuredImage?.asset.url || ""}
                    alt={card.title}
                    className="rounded-[1rem] w-full h-full object-cover scale-[108%]"
                    direction="horizontal"
                  />
                </div>
                <div className="w-fit h-full 2xl:min-h-[400px] min-h-[370px] flex flex-col justify-between">
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
            className="relative flex-none overflow-hidden group min-w-[600px] h-fit flex items-center justify-start "
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
          className="text-[2.25rem] md:text-[3rem] font-bold mb-8"
          text="News"
          variant="heading"
        />

        {/* Single column layout */}
        <div className="flex flex-col gap-8 md:gap-12">
          {cards.map((card, index) => (
            <div key={index} className="relative overflow-hidden group">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                <div className="aspect-[4/3] relative w-full min-h-[320px]">
                  <ParallaxImage
                    src={card.featuredImage?.asset.url || ""}
                    alt={card.title}
                    className="rounded-[1rem] w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:flex-1 flex flex-col justify-between">
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

export default NewsHorizontalScrollNew;
