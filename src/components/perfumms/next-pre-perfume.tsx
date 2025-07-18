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
  const navRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevImageRef = useRef<HTMLImageElement>(null);
  const nextImageRef = useRef<HTMLImageElement>(null);
  const [hoveredElement, setHoveredElement] = useState<"prev" | "next" | null>(
    null
  );
  const { t } = useLocale();
  useGSAP(() => {
    if (!navRef.current || !wrapperRef.current) return;

    // Initial state - fixed at bottom
    gsap.set(navRef.current, {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
    });

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "bottom bottom-=30",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress > 0) {
          gsap.set(navRef.current, {
            position: "relative",
            bottom: "auto",
            top: "auto",
          });
        } else {
          gsap.set(navRef.current, {
            position: "fixed",
            bottom: 0,
            top: "auto",
          });
        }
      },
    });
  }, []);

  const handleMouseEnter = (element: "prev" | "next") => {
    setHoveredElement(element);
    const targetRef = element === "prev" ? prevImageRef : nextImageRef;

    gsap.to(targetRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
    });

    const linkRef = targetRef.current?.parentElement?.parentElement;
    if (linkRef) {
      gsap.set(linkRef, { display: "flex" });
    }
  };

  const handleMouseLeave = (element: "prev" | "next") => {
    setHoveredElement(null);
    const targetRef = element === "prev" ? prevImageRef : nextImageRef;

    gsap.to(targetRef.current, {
      scale: 1.2,
      duration: 0.3,
      onComplete: () => {
        const linkRef = targetRef.current?.parentElement?.parentElement;
        if (linkRef) {
          gsap.set(linkRef, { display: "none" });
        }
      },
    });
  };

  return (
    <div ref={wrapperRef} className="h-fit overflow-hidden max-w-screen">
      <section
        ref={navRef}
        className="bg-foreground text-background 2xl:px-[34px] md:px-[38px] px-[18px]"
      >
        <div className="flex gap-4 justify-between max-w mx-auto">
          {/* Previous */}
          <div
            className="flex gap-12 justify-start items-center relative hover:bg-background hover:text-foreground px-[0.51rem] w-[200px] transition-all duration-300 py-[0.3rem]"
            onMouseEnter={() => handleMouseEnter("prev")}
            onMouseLeave={() => handleMouseLeave("prev")}
          >
            <Image
              src="/icons/left.svg"
              alt="arrow-right"
              width={20}
              height={20}
              className={`${hoveredElement === "prev" ? "invert" : ""} max-h-[16px] transition-all duration-300`}
            />
            <span className="text-[0.9rem]">{t("previous")}</span>
            <Link
              href={`/${locale}/perfume/${previous.slug}`}
              className="absolute left-1/2 -translate-x-1/2 bottom-[30px] hidden overflow-hidden"
            >
              <div className="relative w-[210px] h-[210px] rounded-2xl px-[8px] pb-[45px]">
                <Image
                  ref={prevImageRef}
                  src={previous.featuredImage.asset.url}
                  alt={previous.title}
                  width={200}
                  height={200}
                  className="object-cover scale-120 opacity-0 shadow-2xl rounded-2xl border-[1px] border-transparent hover:border-foreground transition-all duration-300"
                />
              </div>
            </Link>
          </div>

          {/* Center */}
          <div className="flex gap-4 items-center">
            <span className="text-[0.9rem]">{t("relatedFragrances")}</span>
          </div>

          {/* Next */}
          <div
            className="flex gap-12 justify-end items-center relative hover:bg-background hover:text-foreground px-[0.51rem] w-[200px] transition-all duration-300 py-[0.3rem]"
            onMouseEnter={() => handleMouseEnter("next")}
            onMouseLeave={() => handleMouseLeave("next")}
          >
            <span className="text-[0.9rem]">{t("next")}</span>
            <Image
              src="/icons/right.svg"
              alt="arrow-right"
              width={24}
              height={24}
              className={`${hoveredElement === "next" ? "invert" : ""} max-h-[16px] transition-all duration-300`}
            />
            <Link
              href={`/${locale}/perfume/${next.slug}`}
              className="absolute left-1/2 -translate-x-1/2 bottom-[30px] hidden overflow-hidden"
            >
              <div className="relative w-[210px] h-[210px] rounded-2xl px-[8px] pb-[45px]">
                <Image
                  ref={nextImageRef}
                  src={next.featuredImage.asset.url}
                  alt={next.title}
                  width={200}
                  height={200}
                  className="object-cover scale-120 opacity-0 shadow-2xl rounded-2xl border-[1px] border-transparent hover:border-foreground transition-all duration-300"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
