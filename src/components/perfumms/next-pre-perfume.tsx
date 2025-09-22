"use client";

import { useLocale } from "@/lib/i18n/context";
import { RelatedProduct } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function NextPrePerfume({
  previous,
  next,
}: {
  previous: RelatedProduct;
  next: RelatedProduct;
}) {
  const { locale } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const prevHoverRef = useRef<HTMLDivElement>(null);
  const nextHoverRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(true);
  const [hoveredElement, setHoveredElement] = useState<"prev" | "next" | null>(null);
  const { t } = useLocale();

  useGSAP(() => {
    if (!containerRef.current || !navRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "bottom bottom-=30",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        
        if (progress > 0) {
          setIsFixed(false);
          // Make it behave like a normal element in document flow
          gsap.set(navRef.current, {
            position: "relative",
            bottom: "auto",
            top: "auto",
            left: "auto",
            right: "auto",
            zIndex: 1,
          });
        } else {
          setIsFixed(true);
          // Make it stick to bottom
          gsap.set(navRef.current, {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
          });
        }
      },
    });
  }, []);

  const showHoverImage = (element: "prev" | "next") => {
    const hoverRef = element === "prev" ? prevHoverRef : nextHoverRef;
    if (!hoverRef.current) return;

    setHoveredElement(element);
    
    hoverRef.current.style.display = 'block';
    
    const img = hoverRef.current.querySelector('img');
    if (img) {
      gsap.fromTo(img, 
        { opacity: 0, scale: 1.2 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.3,
        }
      );
    }
  };

  const hideHoverImage = (element: "prev" | "next") => {
    const hoverRef = element === "prev" ? prevHoverRef : nextHoverRef;
    if (!hoverRef.current) return;

    setHoveredElement(null);
    
    const img = hoverRef.current.querySelector('img');
    if (img) {
      gsap.to(img, {
        opacity: 0,
        scale: 1.2,
        duration: 0.2,
        onComplete: () => {
          if (hoverRef.current) {
            hoverRef.current.style.display = 'none';
          }
        },
      });
    }
  };

  return (
    <div ref={containerRef} className="h-fit max-w-screen">

      <section
        ref={navRef}
        className="bg-foreground text-background 2xl:px-[34px] md:px-[38px] px-[18px] w-full overflow-visible"
        style={{
          position: isFixed ? 'fixed' : 'relative',
          bottom: isFixed ? 0 : 'auto',
          left: isFixed ? 0 : 'auto',
          right: isFixed ? 0 : 'auto',
          zIndex: isFixed ? 50 : 1,
        }}
      >
        <div className="flex gap-4 justify-between max-w mx-auto overflow-visible">
          {/* Previous Button */}
          <div
            className="flex gap-12 justify-start items-center relative hover:bg-background hover:text-foreground px-[0.51rem] w-[200px] transition-all duration-300 py-[0.3rem] cursor-pointer overflow-visible"
            onMouseEnter={() => showHoverImage("prev")}
            onMouseLeave={() => hideHoverImage("prev")}
          >
            <Image
              src="/icons/left.svg"
              alt="arrow-left"
              width={20}
              height={20}
              className={`${hoveredElement === "prev" ? "invert" : ""} max-h-[16px] transition-all duration-300`}
            />
            <span className="text-[0.9rem]">{t("previous")}</span>
            
            {/* Hover Image - Simple positioning */}
            <div
              ref={prevHoverRef}
              className="absolute left-1/2 -translate-x-1/2 z-[100]"
              style={{
                bottom: isFixed ? '100%' : '100%',
                marginBottom: isFixed ? '10px' : '10px',
                display: 'none'
              }}
            >
              <Link
                href={`/${locale}/${previous.category}-perfume/${previous.slug}`}
                className="block"
              >
                <div className="w-[210px] h-[210px] rounded-2xl shadow-2xl">
                  <Image
                    src={previous.featuredImage.asset.url}
                    alt={previous.title}
                    width={210}
                    height={210}
                    className="object-cover w-full h-full opacity-0 scale-120 transition-all duration-300"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Center */}
          <div className="flex gap-4 items-center">
            <span className="text-[0.9rem]">{t("relatedFragrances")}</span>
          </div>

          {/* Next Button */}
          <div
            className="flex gap-12 justify-end items-center relative hover:bg-background hover:text-foreground px-[0.51rem]  w-[200px] transition-all duration-300 py-[0.3rem] cursor-pointer overflow-visible"
            onMouseEnter={() => showHoverImage("next")}
            onMouseLeave={() => hideHoverImage("next")}
          >
            <span className="text-[0.9rem]">{t("next")}</span>
            <Image
              src="/icons/right.svg"
              alt="arrow-right"
              width={24}
              height={24}
              className={`${hoveredElement === "next" ? "invert" : ""} max-h-[16px] transition-all duration-300`}
            />
            
            {/* Hover Image - Simple positioning */}
            <div
              ref={nextHoverRef}
              className="absolute left-1/2 -translate-x-1/2 z-[900]"
              style={{
                bottom: isFixed ? '100%' : '10%',
                marginBottom: isFixed ? '10px' : '10px',
                display: 'none'
              }}
            >
              <Link
                href={`/${locale}/${next.category}-perfume/${next.slug}`}
                className=""
              >
                <div className="w-[210px] h-[210px] rounded-2xl shadow-2xl">
                  <Image
                    src={next.featuredImage.asset.url}
                    alt={next.title}
                    width={210}
                    height={210}
                    className="object-cover w-full h-full opacity-0 scale-120 transition-all duration-300"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}