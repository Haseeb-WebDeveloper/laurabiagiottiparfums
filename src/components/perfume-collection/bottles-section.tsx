"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import BottleCard from "./bottle-card";
import type { BottlesSectionItem, Collection } from "@/types/collection";

gsap.registerPlugin();

type Props = {
  items: BottlesSectionItem[];
  firstSection: Collection["firstSection"];
};

export default function BottlesSection({ items, firstSection }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const baseBgRef = useRef<HTMLDivElement>(null);
  const fgBgRef = useRef<HTMLDivElement>(null);
  const bottleRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const openTls = useRef<(gsap.core.Timeline | null)[]>([]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // 1st & 3rd move to RIGHT, 2nd & 4th move to LEFT
  const goesRight = useCallback((idx: number) => idx === 0 || idx === 2, []);
  const contentOnLeft = useCallback((idx: number) => goesRight(idx), [goesRight]);

  // Initialize states
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(fgBgRef.current, { yPercent: 100, autoAlpha: 0 });
      contentRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { xPercent: contentOnLeft(i) ? -110 : 110, autoAlpha: 0 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [contentOnLeft]);

  // Hover behavior
  const hoverMaps = useMemo(
    () => ({
      0: [{}, { x: 24 }, { x: -18 }, { x: 104 }],
      1: [{ x: -26 }, {}, { x: 22 }, { x: 12 }],
      2: [{ x: -18 }, { x: -22 }, {}, { x: 26 }],
      3: [{ x: -14 }, { x: -18 }, { x: -26 }, {}],
    }),
    []
  );

  const onHoverIn = useCallback(
    (idx: number) => {
      if (openIdx !== null) return; // disable hover while open
      const others = bottleRefs.current.map((el, i) => ({ el, i })).filter(({ i }) => i !== idx);
      const hovered = bottleRefs.current[idx];
      if (!hovered) return;
      gsap.to(hovered, { scale: 1.12, rotate: goesRight(idx) ? 8 : -8, duration: 0.35, ease: "power2.out" });
      others.forEach(({ el, i }) => {
        if (!el) return;
        const map = (hoverMaps as any)[idx]?.[i] || {};
        gsap.to(el, { scale: 0.9, x: map.x || 0, y: map.y || 0, duration: 0.35, ease: "power2.out" });
      });
      if (baseBgRef.current) gsap.to(baseBgRef.current, { scale: 1.05, duration: 0.5, ease: "power2.out" });
    },
    [hoverMaps, goesRight, openIdx]
  );

  const onHoverOut = useCallback((idx: number) => {
    if (openIdx !== null) return; // disable hover while open
    const hovered = bottleRefs.current[idx];
    if (hovered) gsap.to(hovered, { scale: 1, rotate: 0, x: 0, y: 0, duration: 0.35, ease: "power2.out" });
    bottleRefs.current.forEach((el) => el && gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.35, ease: "power2.out" }));
    if (baseBgRef.current) gsap.to(baseBgRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  }, [openIdx]);

  // Build a per-index open timeline lazily
  const buildOpenTl = useCallback((idx: number) => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
    const moveRight = goesRight(idx);
    const clicked = bottleRefs.current[idx];
    const others = bottleRefs.current.filter((_, i) => i !== idx);
    const section = sectionRef.current;
    let targetX = 0;
    if (section && clicked) {
      const sec = section.getBoundingClientRect();
      const el = clicked.getBoundingClientRect();
      const centerX = el.left + el.width / 2;
      const padding = Math.max(24, Math.min(72, sec.width * 0.06));
      if (moveRight) {
        const rightCenter = sec.right - padding - el.width / 2;
        targetX = rightCenter - centerX;
      } else {
        const leftCenter = sec.left + padding + el.width / 2;
        targetX = leftCenter - centerX;
      }
    }
    tl.addLabel("start")
      .to(others, { yPercent: 120, autoAlpha: 0, stagger: 0.06, duration: 0.4 }, "start")
      // Move clicked bottle fully to computed side
      .to(clicked, { x: targetX, rotate: moveRight ? 12 : -12, scale: 1.18, duration: 0.5 }, "start")
      .to(fgBgRef.current, { yPercent: 0, autoAlpha: 1, duration: 0.45 }, "start+=0.05")
      .fromTo(
        contentRefs.current[idx],
        { xPercent: 0, x: (sectionRef.current?.getBoundingClientRect().width || 1000) * (contentOnLeft(idx) ? -1 : 1), autoAlpha: 0 },
        { xPercent: 0, x: 0, autoAlpha: 1, duration: 0.5 },
        "start+=0.15"
      );
    return tl;
  }, [goesRight, contentOnLeft]);

  const open = useCallback((idx: number) => {
    if (openIdx === idx) return;
    setOpenIdx(idx);
    if (!openTls.current[idx]) openTls.current[idx] = buildOpenTl(idx);
    openTls.current[idx]!.play(0);
  }, [buildOpenTl, openIdx]);

  const close = useCallback(() => {
    if (openIdx === null) return;
    const tl = openTls.current[openIdx];
    if (tl) tl.reverse();
    setOpenIdx(null);
  }, [openIdx]);

  // Close on ESC / outside
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const onClick = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      if (!sectionRef.current.contains(e.target as Node)) return;
      // If clicked directly on the foreground bg while open, close
      const fg = fgBgRef.current;
      if (fg && (e.target === fg || (e.target as Node).contains(fg))) {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [openIdx, close]);

  // Determine the foreground background image to display
  const foregroundBgUrl =
    openIdx !== null && items[openIdx]?.backgroundImage?.asset?.url
      ? items[openIdx].backgroundImage.asset.url
      : "";

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] overflow-hidden"
    >
      {/* Base background (kept) */}
      <div
        ref={baseBgRef}
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: `url("/bottle-backgroud.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      {/* Foreground background that rises from bottom */}
      <div
        ref={fgBgRef}
        data-elem="fg-bg"
        className="absolute inset-0 -z-0"
        style={{ backgroundImage: foregroundBgUrl ? `url(${foregroundBgUrl})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      {/* Bottles row/column */}
      <div className="relative h-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-4">
        {items.map((it, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            <BottleCard
              idx={idx}
              src={it.bottleImage?.asset?.url || ""}
              alt={it.product?.title || `Bottle ${idx + 1}`}
              onHoverIn={onHoverIn}
              onHoverOut={onHoverOut}
              onClick={open}
              isOpen={openIdx === idx}
              ref={(el) => {
                if (el) bottleRefs.current[idx] = el;
              }}
            />
          </div>
        ))}
      </div>

      {/* Content divs positioned absolutely relative to section */}
      {items.map((it, idx) => (
        <div
          key={idx}
          ref={(el) => { if (el) contentRefs.current[idx] = el; }}
          data-elem="content"
          className={`z-[1000] pointer-events-none w-[min(560px,92vw)] md:w-[520px] mt-4 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 text-foreground ${
            contentOnLeft(idx) ? "md:left-8" : "md:right-8"
          }`}
        >
          <h3 className="text-2xl md:text-4xl font-semibold drop-shadow-sm">{it.product?.title}</h3>
          <p className="mt-3 text-base md:text-lg opacity-90 leading-relaxed">{it.product?.description}</p>
        </div>
      ))}

      {/* Click anywhere overlay when open to reverse */}
      {openIdx !== null && (
        <button
          type="button"
          aria-label="Close details"
          className="absolute inset-0 z-10 bg-transparent"
          onClick={close}
        />
      )}
    </section>
  );
}

