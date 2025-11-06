"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { BottlesSectionItem } from "@/types/collection";
import { gsap } from "gsap";

type Props = {
  items: BottlesSectionItem[];
};

export default function BottlesShowcase({ items }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const bottleRefs = useRef<HTMLDivElement[]>([]);
  bottleRefs.current = [];

  // Extract first image from each item (max 4)
  const images = useMemo(
    () =>
      items
        ?.slice(0, 4)
        .map((i) => i?.images?.[0]?.asset?.url)
        .filter(Boolean) as string[],
    [items]
  );

  // Curated absolute positions for desktop
  const positions = useMemo(
    () => [
      { top: "12%", left: "8%" },
      { bottom: "-4%", left: "28%" },
      { top: "15%", left: "54%" },
      { bottom: "-4%", left: "78%" },
    ],
    []
  );

  const addBottleRef = (el: HTMLDivElement | null) => {
    if (el && !bottleRefs.current.includes(el)) {
      bottleRefs.current.push(el);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !images?.length) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Consider desktop by width rather than pointer type (touch laptops)
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(min-width: 768px)").matches;

    if (prefersReduced || !isDesktop) return; // desktop hover only

    const ctx = gsap.context(() => {
      // Ensure initial transform state is registered with GSAP and restorable
      gsap.set(bottleRefs.current, {
        transformOrigin: "50% 50%",
        scale: 1,
        rotate: 0,
        force3D: true,
        x: 0,
        y: 0,
        zIndex: 10,
      });
      if (bgRef.current) {
        gsap.set(bgRef.current, { scale: 1, force3D: true });
      }

      // Per-hover index displacement map (units are vw/vh like percentages)
      const offsetMap: { [hoverIdx: number]: { x: number; y: number }[] } = {
        0: [
          { x: 0, y: 0 },
          { x: 2.5, y: 0.8 },
          { x: 4.0, y: 1.2 },
          { x: 1.2, y: -1.6 },
        ],
        1: [
          { x: -2.2, y: -0.6 },
          { x: 0, y: 0 },
          { x: 2.8, y: -0.6 },
          { x: -1.4, y: -1.4 },
        ],
        2: [
          { x: -3, y: -0.8 },
          { x: -6, y: -3 },
          { x: 0, y: 0 },
          { x: 4, y: -1.0 },
        ],
        3: [
          { x: -2, y: -2 },
          { x: -5, y: -3 },
          { x: -6, y: 0.6 },
          { x: 0, y: 0 },
        ],
      };

      const toPx = (xVw: number, yVh: number) => ({
        x: (xVw / 100) * window.innerWidth,
        y: (yVh / 100) * window.innerHeight,
      });

      const resetAll = () => {
        bottleRefs.current.forEach((el) => {
          gsap.to(el, {
            scale: 1,
            rotate: 0,
            duration: 0.35,
            ease: "power2.out",
            x: 0,
            y: 0,
            zIndex: 10,
          });
        });
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      };

      const handleEnter = (index: number) => {
        bottleRefs.current.forEach((el, i) => {
          const off = offsetMap[index]?.[i] ?? { x: 0, y: 0 };
          const { x, y } = toPx(off.x, off.y);
          gsap.to(el, {
            scale: i === index ? 1.15 : 0.7,
            rotate: i === index ? 3 : 0,
            x: i === index ? 0 : x,
            y: i === index ? 0 : y,
            zIndex: i === index ? 30 : 10,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            scale: 1.1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      // Bind listeners with explicit handlers so we can remove them
      const enterHandlers: Array<(e: Event) => void> = [];
      const leaveHandlers: Array<(e: Event) => void> = [];
      const focusHandlers: Array<() => void> = [];
      const blurHandlers: Array<() => void> = [];

      bottleRefs.current.forEach((el, i) => {
        const onEnter = () => handleEnter(i);
        const onLeave = () => resetAll();
        const onFocus = () => handleEnter(i);
        const onBlur = () => resetAll();
        enterHandlers.push(onEnter);
        leaveHandlers.push(onLeave);
        focusHandlers.push(onFocus);
        blurHandlers.push(onBlur);

        // Use mouseover/mouseout so events bubble from child <img>
        el.addEventListener("mouseover", onEnter);
        el.addEventListener("mouseout", onLeave);
        // Keyboard accessibility mirroring hover
        el.addEventListener("focus", onFocus);
        el.addEventListener("blur", onBlur);
      });

      container.addEventListener("mouseleave", resetAll);

      return () => {
        bottleRefs.current.forEach((el, i) => {
          el.removeEventListener("mouseover", enterHandlers[i]);
          el.removeEventListener("mouseout", leaveHandlers[i]);
          el.removeEventListener("focus", focusHandlers[i]);
          el.removeEventListener("blur", blurHandlers[i]);
        });
        container.removeEventListener("mouseleave", resetAll);
      };
    }, container);

    return () => ctx.revert();
  }, [images]);

  if (!images?.length) return null;

  return (
    <section
      aria-label="Collection bottles showcase"
      className="relative h-[100vh] w-full overflow-hidden"
    >
      {/* Background image layer for zoom effect */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-100 will-change-transform"
        style={{
          backgroundImage: "url(/bottle-backgroud.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />

      {/* Subtle gradient light to match art direction */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 25%)",
        }}
        aria-hidden
      />

      {/* Desktop absolute positioned bottles */}
      <div ref={containerRef} className="hidden md:block absolute inset-0 z-10">
        {images.map((src, idx) => (
          <div
            key={idx}
            ref={addBottleRef}
            className="absolute transform-gpu will-change-transform origin-center pointer-events-auto cursor-pointer"
            style={{ ...positions[idx] }}
            tabIndex={0}
          >
            <Image
              src={src}
              alt={`Bottle ${idx + 1}`}
              width={520}
              height={800}
              priority
              sizes="(max-width: 1280px) 25vw, 20vw"
              className="select-none w-[180px] lg:w-[220px] xl:w-[17vw] h-auto"
            />
          </div>
        ))}
      </div>

      {/* Mobile vertical stack, no interactions */}
      <div className="md:hidden relative z-10 h-full w-full flex flex-col items-center justify-center gap-10 px-6">
        {images.map((src, idx) => (
          <div key={idx} className="transform-gpu">
            <Image
              src={src}
              alt={`Bottle ${idx + 1}`}
              width={320}
              height={500}
              sizes="90vw"
              className="w-[65vw] max-w-[320px] h-auto"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
