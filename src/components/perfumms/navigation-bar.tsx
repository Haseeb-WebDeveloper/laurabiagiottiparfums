"use client";

import { useLocale } from "@/lib/i18n/context";
import { RelatedProduct } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function NavigationBar({
  previous,
  next,
}: {
  previous: RelatedProduct;
  next: RelatedProduct;
}) {
  const { locale, t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isFixed, setIsFixed] = useState(true);
  const [hoveredElement, setHoveredElement] = useState<"prev" | "next" | null>(null);
  const [navPosition, setNavPosition] = useState({ top: 0, left: 0, right: 0 });

  // Create portal containers for hover images
  const prevImageRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLDivElement>(null);

  // Timers for delayed hide to prevent flickering
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update navigation position when it changes between fixed and relative
  const updateNavPosition = () => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setNavPosition({
        top: rect.top,
        left: rect.left,
        right: window.innerWidth - rect.right,
      });
    }
  };

  useEffect(() => {
    updateNavPosition();
    window.addEventListener('resize', updateNavPosition);
    window.addEventListener('scroll', updateNavPosition);
    
    return () => {
      window.removeEventListener('resize', updateNavPosition);
      window.removeEventListener('scroll', updateNavPosition);
    };
  }, [isFixed]);

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
          gsap.set(navRef.current, {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
          });
        }
        
        // Update position after changing layout
        setTimeout(updateNavPosition, 0);
      },
    });
  }, []);

  const showHoverImage = (element: "prev" | "next") => {
    const imageRef = element === "prev" ? prevImageRef : nextImageRef;
    if (!imageRef.current) return;

    // Clear any pending hide timer
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    setHoveredElement(element);
    
    gsap.fromTo(imageRef.current, 
      { 
        opacity: 0, 
        scale: 0.8,
        y: 20
      },
      { 
        opacity: 1, 
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      }
    );
  };

  const hideHoverImage = (element: "prev" | "next") => {
    const imageRef = element === "prev" ? prevImageRef : nextImageRef;
    if (!imageRef.current) return;

    // Use a small delay to prevent flickering when moving between button and image
    hideTimerRef.current = setTimeout(() => {
      setHoveredElement(null);
      
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        ease: "power2.in"
      });
    }, 100); // 100ms delay
  };

  const handleImageMouseEnter = (element: "prev" | "next") => {
    // Clear hide timer when hovering over image
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setHoveredElement(element);
  };

  const handleImageMouseLeave = (element: "prev" | "next") => {
    hideHoverImage(element);
  };

  // Calculate image positions based on nav position
  const getImagePosition = (element: "prev" | "next") => {
    
    if (isFixed) {
      // Fixed positioning - relative to viewport
      return {
        position: "fixed" as const,
        bottom: "30px",
        top: "auto",
        transform: element === "prev" ? "translateX(-50%)" : "translateX(50%)",
      };
    } else {
      // Absolute positioning - relative to nav's document position
      return {
        position: "absolute" as const,
        top: `${navPosition.top - 220}px`, // 220px above nav (200px image height + 20px margin)
        bottom: "auto",
        transform: element === "prev" ? "translateX(-50%)" : "translateX(50%)",
      };
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Hover Images - Positioned dynamically based on nav state */}
      <div className="fixed inset-0 pointer-events-none z-[200]">
        {/* Previous Image */}
        <div
          ref={prevImageRef}
          className="opacity-0 left-[12%] pb-[20px] pointer-events-auto"
          style={getImagePosition("prev")}
          onMouseEnter={() => handleImageMouseEnter("prev")}
          onMouseLeave={() => handleImageMouseLeave("prev")}
        >
          <Link
            href={`/${locale}/${previous.category}-perfume/${previous.slug}`}
            className="block"
          >
            <div className="w-[200px] h-[200px] rounded-2xl shadow-2xl bg-white overflow-hidden">
              <Image
                src={previous.featuredImage.asset.url}
                alt={previous.title}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>
        </div>

        {/* Next Image */}
        <div
          ref={nextImageRef}
          className="opacity-0 right-[12%] pb-[20px] pointer-events-auto"
          style={getImagePosition("next")}
          onMouseEnter={() => handleImageMouseEnter("next")}
          onMouseLeave={() => handleImageMouseLeave("next")}
        >
          <Link
            href={`/${locale}/${next.category}-perfume/${next.slug}`}
            className="block"
          >
            <div className="w-[200px] h-[200px] rounded-2xl shadow-2xl bg-white overflow-hidden">
              <Image
                src={next.featuredImage.asset.url}
                alt={next.title}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <div ref={containerRef} className="h-fit max-w-screen">
        <section
          ref={navRef}
          className="bg-foreground text-background 2xl:px-[34px] md:px-[38px] px-[18px] w-full"
          style={{
            position: isFixed ? 'fixed' : 'relative',
            bottom: isFixed ? 0 : 'auto',
            left: isFixed ? 0 : 'auto',
            right: isFixed ? 0 : 'auto',
            zIndex: isFixed ? 50 : 1,
          }}
        >
          <div className="flex gap-4 justify-between max-w mx-auto">
            {/* Previous Button */}
            <div
              className={`flex gap-12 justify-start items-center px-[0.51rem] w-[200px] transition-all duration-300 py-[0.3rem] cursor-pointer ${
                hoveredElement === "prev" 
                  ? "bg-background text-foreground" 
                  : "hover:bg-background hover:text-foreground"
              }`}
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
            </div>

            {/* Center */}
            <div className="flex gap-4 items-center">
              <span className="text-[0.9rem]">{t("relatedFragrances")}</span>
            </div>

            {/* Next Button */}
            <div
              className={`flex gap-12 justify-end items-center px-[0.51rem] w-[200px] transition-all duration-300 py-[0.3rem] cursor-pointer ${
                hoveredElement === "next" 
                  ? "bg-background text-foreground" 
                  : "hover:bg-background hover:text-foreground"
              }`}
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
}