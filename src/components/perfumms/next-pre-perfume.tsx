"use client";

import { useLocale } from "@/lib/i18n/context";
import { RelatedProduct } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

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
      scrub: 0.5, // Smooth scrubbing effect
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress > 0) {
          // Transition to relative position
          gsap.set(navRef.current, {
            position: "relative",
            bottom: "auto",
            top: "auto"
          });
        } else {
          // Transition to fixed position
          gsap.set(navRef.current, {
            position: "fixed",
            bottom: 0,
            top: "auto"
          });
        }
      }
    });
  }, []);

  return (
    <div ref={wrapperRef} className="h-fit overflow-x-hidden max-w-screen">
      <section ref={navRef} className="bg-foreground text-background">
        <div className="flex gap-4 justify-between  max-w mx-auto">
          {/* Previous */}
          <div className="flex gap-4 relative group hover:bg-background hover:text-foreground px-[2rem] transition-all duration-300 py-[0.3rem]">
            <div className="flex gap-8 items-center ">
              <Image
                src="/icons/left.svg"
                alt="arrow-right"
                width={20}
                height={20}
                className="group-hover:invert max-h-[12px] transition-all duration-300"
              />
              <span className="text-[0.9rem]">Previous</span>
            </div>
            <Link
              href={`/${locale}/perfume/${previous.slug}`}
              className="absolute left-1/2 -translate-x-1/2 bottom-[40px] group-hover:opacity-100 opacity-0 transition-opacity duration-300 "
            >
              <div className="relative w-[200px] h-[200px]">
                <Image
                  src={previous.featuredImage.asset.url}
                  alt={previous.title}
                  width={200}
                  height={200}
                  className="object-cover border-[1px] border-transparent hover:border-foreground transition-all duration-300"
                />
              </div>
            </Link>
          </div>

          {/* Center */}
          <div className="flex gap-4 items-center">
            <span className="text-[0.9rem]">Related fragrances</span>
          </div>

          {/* Next */}
          <div className="flex gap-4 relative group hover:bg-background hover:text-foreground px-[2rem] transition-all duration-300 py-[0.3rem]">
            <div className="flex gap-8 items-center ">
              <span className="text-[0.9rem]">Next</span>
              <Image
                src="/icons/right.svg"
                alt="arrow-right"
                width={24}
                height={24}
                className="group-hover:invert max-h-[12px] transition-all duration-300"
              />
            </div>
            <Link
              href={`/${locale}/perfume/${next.slug}`}
              className="absolute left-1/2 -translate-x-1/2 bottom-[40px] group-hover:opacity-100 opacity-0 transition-opacity duration-300 "
            >
              <div className="relative w-[200px] h-[200px]">
                <Image
                  src={next.featuredImage.asset.url}
                  alt={next.title}
                  width={200}
                  height={200}
                  className="object-cover border-[1px] border-transparent hover:border-foreground transition-all duration-300"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
