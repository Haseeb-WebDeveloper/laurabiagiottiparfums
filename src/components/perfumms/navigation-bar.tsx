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

  // Create portal containers for hover images
  const prevImageRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLDivElement>(null);

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
      },
    });
  }, []);

  const showHoverImage = (element: "prev" | "next") => {
    const imageRef = element === "prev" ? prevImageRef : nextImageRef;
    if (!imageRef.current) return;

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

    setHoveredElement(null);
    
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 20,
      duration: 0.2,
      ease: "power2.in"
    });
  };

  return (
    <>
      {/* Hover Images - Positioned absolutely in body, outside of navigation */}
      <div className="fixed inset-0 pointer-events-none z-[200]">
        {/* Previous Image */}
        <div
          ref={prevImageRef}
          className="absolute opacity-0"
          style={{
            left: '200px', // Adjust based on button position
            bottom: isFixed ? '80px' : 'auto',
            top: isFixed ? 'auto' : 'calc(100vh - 300px)',
            transform: 'translateX(-50%)',
          }}
        >
          <Link
            href={`/${locale}/${previous.category}-perfume/${previous.slug}`}
            className="block pointer-events-auto"
          >
            <div className="w-[200px] h-[200px] rounded-2xl shadow-2xl bg-white overflow-hidden border">
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
          className="absolute opacity-0"
          style={{
            right: '200px', // Adjust based on button position
            bottom: isFixed ? '80px' : 'auto',
            top: isFixed ? 'auto' : 'calc(100vh - 300px)',
            transform: 'translateX(50%)',
          }}
        >
          <Link
            href={`/${locale}/${next.category}-perfume/${next.slug}`}
            className="block pointer-events-auto"
          >
            <div className="w-[200px] h-[200px] rounded-2xl shadow-2xl bg-white overflow-hidden border">
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
              className="flex gap-12 justify-start items-center hover:bg-background hover:text-foreground px-[0.51rem] w-[200px] transition-all duration-300 py-[0.3rem] cursor-pointer"
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
              className="flex gap-12 justify-end items-center hover:bg-background hover:text-foreground px-[0.51rem] w-[200px] transition-all duration-300 py-[0.3rem] cursor-pointer"
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
