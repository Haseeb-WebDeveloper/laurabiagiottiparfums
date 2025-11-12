"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import BottleCard from "./bottle-card";
import type { BottlesSectionItem } from "@/types/collection";
import { useLocale } from "@/lib/i18n/context";
import BuyNowPopup from "../ui/buy-now-popup";

gsap.registerPlugin();

type Props = {
  items: BottlesSectionItem[];
  locale: string;
};

export default function BottlesSectionMobile({ items, locale }: Props) {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const baseBgRef = useRef<HTMLDivElement>(null);
  const fgBgRef = useRef<HTMLDivElement>(null);
  const bottleRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const openTls = useRef<(gsap.core.Timeline | null)[]>([]);
  const carouselTimerRef = useRef<number | null>(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const bottleOriginalPositions = useRef<
    { x: number; y: number; scale: number; rotate: number }[]
  >([]);

  // Initial positions for mobile bottles (staggered vertically and horizontally)
  const initialBottlePositionsMobile = useMemo(
    () => [
      { x: -80, y: 80 }, // 1st bottle
      { x: 80, y: -30 }, // 2nd bottle 
      { x: -80, y: -30 }, // 3rd bottle
      { x: 80, y: -80 }, // 4th bottle 
    ],
    []
  );

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<BottlesSectionItem | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBuyNowClick = useCallback((item: BottlesSectionItem) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  }, []);

  // 1st & 3rd move to RIGHT, 2nd & 4th move to LEFT
  const goesRight = useCallback((idx: number) => idx === 0 || idx === 2, []);
  const contentOnLeft = useCallback(
    (idx: number) => goesRight(idx),
    [goesRight]
  );

  // Initialize states
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(fgBgRef.current, { yPercent: 100, autoAlpha: 0 });
      contentRefs.current.forEach((el) => {
        if (!el) return;
        // Mobile: start from top
        gsap.set(el, { y: -100, autoAlpha: 0 });
        
      });
      // Set initial positions for bottles (staggered vertically and horizontally)
      bottleRefs.current.forEach((el, i) => {
        if (el && initialBottlePositionsMobile[i]) {
          gsap.set(el, {
            x: initialBottlePositionsMobile[i].x || 0,
            y: initialBottlePositionsMobile[i].y || 0,
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [initialBottlePositionsMobile]);

  // Hover behavior (simplified for mobile - can be disabled if needed)
  const onHoverIn = useCallback(
    (idx: number) => {
      if (openIdx !== null) return;
      const hovered = bottleRefs.current[idx];
      if (!hovered) return;
      
      // Kill any ongoing animations for smooth transitions
      gsap.killTweensOf([hovered, baseBgRef.current]);
      
      gsap.to(hovered, {
        scale: 1.1,
        duration: 0.6,
        ease: "power1.out",
      });
      if (baseBgRef.current)
        gsap.to(baseBgRef.current, {
          scale: 1.05,
          duration: 0.7,
          ease: "power1.out",
        });
    },
    [openIdx]
  );

  const onHoverOut = useCallback(
    (idx: number) => {
      if (openIdx !== null) return;
      const hovered = bottleRefs.current[idx];
      
      // Kill any ongoing animations for smooth transitions
      gsap.killTweensOf([hovered, baseBgRef.current]);
      
      if (hovered) {
        const initialX = initialBottlePositionsMobile[idx]?.x || 0;
        const initialY = initialBottlePositionsMobile[idx]?.y || 0;
        gsap.to(hovered, {
          scale: 1,
          x: initialX,
          y: initialY,
          duration: 0.6,
          ease: "power1.out",
        });
      }
      if (baseBgRef.current)
        gsap.to(baseBgRef.current, {
          scale: 1,
          duration: 0.7,
          ease: "power1.out",
        });
    },
    [openIdx, initialBottlePositionsMobile]
  );

  // Build open timeline for mobile with proper corner positioning
  const buildOpenTl = useCallback(
    (idx: number) => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power1.out" },
      });
      const moveRight = goesRight(idx);
      const clicked = bottleRefs.current[idx];
      const others = bottleRefs.current.filter((_, i) => i !== idx);
      const section = sectionRef.current;

      if (!section || !clicked) return tl;

      const sec = section.getBoundingClientRect();
      const el = clicked.getBoundingClientRect();
      
      // Calculate target position for bottom corner
      const scale = 1.5;
      const rotate = moveRight ? 12 : -12;

      // Get the element's natural position (without any GSAP transforms)
      // We'll calculate transforms relative to the current rendered position
      const currentLeft = el.left;
      const currentTop = el.top;
      const currentRight = el.right;
      const currentBottom = el.bottom;

      // Calculate target X position
      // We need to position the bottle so that after scaling, its edge aligns with section edge
      // getBoundingClientRect() already includes all current transforms
      let targetX = 0;
      let targetY = 0;
      if (moveRight) {
        // Right side: after scaling, right edge should be at sec.right
        const scaledWidth = el.width * scale;
        // Current right edge position
        const currentRightEdge = currentRight;
        // After scaling from center, right edge expands by: (scaledWidth - width) / 2
        const expansion = (scaledWidth - el.width) / 2;
        // To have right edge at sec.right after scaling, current right edge should be at:
        const targetRightEdgeBeforeScale = sec.right - expansion;
        // The X transform needed to move from current position to target
        const xOffset = targetRightEdgeBeforeScale - currentRightEdge;
        // Get current X transform (handle percentage values)
        const currentXValue = gsap.getProperty(clicked, "x");
        const currentX = typeof currentXValue === "number" ? currentXValue : 0;
        targetX = currentX + xOffset;
      } else {
        // Left side: after scaling, left edge should be at sec.left
        const scaledWidth = el.width * scale;
        const currentLeftEdge = currentLeft;
        // After scaling from center, left edge contracts by: (scaledWidth - width) / 2
        const expansion = (scaledWidth - el.width) / 2;
        // To have left edge at sec.left after scaling, current left edge should be at:
        const targetLeftEdgeBeforeScale = sec.left + expansion;
        const xOffset = targetLeftEdgeBeforeScale - currentLeftEdge;
        const currentXValue = gsap.getProperty(clicked, "x");
        const currentX = typeof currentXValue === "number" ? currentXValue : 0;
        targetX = currentX + xOffset;
      }

      // Calculate target Y position (bottom corner)
      // After scaling, bottom edge should be at sec.bottom
      const scaledHeight = el.height * scale;
      const currentBottomEdge = currentBottom;
      // After scaling from center, bottom edge expands down by: (scaledHeight - height) / 2
      const expansion = (scaledHeight - el.height) / 2;
      // To have bottom edge at sec.bottom after scaling, current bottom edge should be at:
      const targetBottomEdgeBeforeScale = sec.bottom - expansion;
      const yOffset = targetBottomEdgeBeforeScale - currentBottomEdge;
      const currentYValue = gsap.getProperty(clicked, "y");
      const currentY = typeof currentYValue === "number" ? currentYValue : 0;
      targetY = currentY + yOffset;

      // Store the target position
      bottleOriginalPositions.current[idx] = {
        x: targetX,
        y: targetY,
        scale: scale,
        rotate: rotate,
      };

      tl.addLabel("start")
        .to(
          others,
          { yPercent: 120, autoAlpha: 0, stagger: 0.08, duration: 0.6 },
          "start"
        )
        // Move clicked bottle to bottom corner
        .to(
          clicked,
          {
            x: targetX,
            y: targetY,
            rotate: rotate,
            scale: scale,
            duration: 0.7,
            ease: "power1.out",
          },
          "start"
        )
        .to(
          fgBgRef.current,
          { yPercent: 0, autoAlpha: 1, duration: 0.65, ease: "power1.out" },
          "start+=0.05"
        )
        // Content animation - slide from top
        .fromTo(
          contentRefs.current[idx],
          {
            y: -100,
            autoAlpha: 0,
          },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power1.out" },
          "start+=0.2"
        );

      return tl;
    },
    [goesRight]
  );

  const open = useCallback(
    (idx: number) => {
      if (openIdx === idx) return;
      setOpenIdx(idx);
      if (!openTls.current[idx]) openTls.current[idx] = buildOpenTl(idx);
      openTls.current[idx]!.play(0);

      // Schedule carousel reveal after 4s
      if (carouselTimerRef.current)
        window.clearTimeout(carouselTimerRef.current);
      setShowCarousel(false);
      carouselTimerRef.current = window.setTimeout(() => {
        // Animate bottle exit for carousel
        const bottle = bottleRefs.current[idx];
        if (bottle && items[idx]?.images?.length > 0) {
          const isRight = goesRight(idx);
          const exitX = isRight ? -350 : 350;
          const sectionRect = sectionRef.current?.getBoundingClientRect();
          if (sectionRect) {
            const currentX = (gsap.getProperty(bottle, "x") as number) || 0;
            const currentY = (gsap.getProperty(bottle, "y") as number) || 0;
            const currentRotate =
              (gsap.getProperty(bottle, "rotate") as number) || 0;
            const currentScale =
              (gsap.getProperty(bottle, "scale") as number) || 1;
            const currentRect = bottle.getBoundingClientRect();

            // Calculate corner position
            const cornerX = isRight
              ? sectionRect.right - currentRect.width
              : sectionRect.left;
            const cornerY = sectionRect.bottom - currentRect.height;

            const targetCornerX = cornerX - (currentRect.left - currentX);
            const targetCornerY = cornerY - (currentRect.top - currentY);

            gsap.set(bottle, {
              transformOrigin: isRight ? "100% 100%" : "0% 100%",
            });

            const tl = gsap.timeline({
              onComplete: () => {
                setShowCarousel(true);
              },
            });

            tl.to(bottle, {
              y: targetCornerY + currentRect.height,
              x: targetCornerX + exitX,
              rotate: currentRotate,
              scale: currentScale,
              opacity: 0,
              duration: 0.7,
              ease: "power1.in",
              force3D: true,
            });
          }
        }
      }, 4000);
    },
    [buildOpenTl, openIdx, items, goesRight]
  );

  const close = useCallback(() => {
    if (openIdx === null) return;
    const idx = openIdx;

    // Clear carousel timer
    if (carouselTimerRef.current) window.clearTimeout(carouselTimerRef.current);

    const bottle = bottleRefs.current[idx];
    const isRight = goesRight(idx);
    const enterX = isRight ? 350 : -350;
    const originalPos = bottleOriginalPositions.current[idx];

    if (showCarousel && bottle && originalPos) {
      // Carousel is showing - need to bring bottle back
      setShowCarousel(false);

      const sectionRect = sectionRef.current?.getBoundingClientRect();
      if (sectionRect) {
        const bottleRect = bottle.getBoundingClientRect();
        const cornerX = isRight
          ? sectionRect.right - bottleRect.width
          : sectionRect.left;
        const cornerY = sectionRect.bottom - bottleRect.height;

        const currentX = (gsap.getProperty(bottle, "x") as number) || 0;
        const currentY = (gsap.getProperty(bottle, "y") as number) || 0;

        const targetCornerX = cornerX - (bottleRect.left - currentX);
        const targetCornerY = cornerY - (bottleRect.top - currentY);

        gsap.set(bottle, {
          transformOrigin: isRight ? "100% 100%" : "0% 100%",
        });

        gsap.set(bottle, {
          x: targetCornerX + enterX,
          y: targetCornerY + bottleRect.height,
          opacity: 0,
          rotate: originalPos.rotate,
          scale: originalPos.scale,
          force3D: true,
        });

        const enterTl = gsap.timeline({
          onComplete: () => {
            const moveBackTl = gsap.timeline({
              onComplete: () => {
                const openTl = openTls.current[idx];
                if (openTl) {
                  openTl.reverse();
                  const duration = openTl.duration();
                  gsap.delayedCall(duration, () => {
                    const bottle = bottleRefs.current[idx];
                    const content = contentRefs.current[idx];
                    if (bottle) {
                      const initialX = initialBottlePositionsMobile[idx]?.x || 0;
                      const initialY = initialBottlePositionsMobile[idx]?.y || 0;
                      gsap.to(bottle, {
                        rotate: 0,
                        scale: 1,
                        x: initialX,
                        y: initialY,
                        duration: 0.5,
                        ease: "power1.out",
                      });
                    }
                    if (content) {
                      gsap.set(content, { y: -100, autoAlpha: 0 });
                    }
                  });
                }
                setOpenIdx(null);
              },
            });

            moveBackTl.to(bottle, {
              x: originalPos.x,
              y: originalPos.y,
              rotate: originalPos.rotate,
              scale: originalPos.scale,
              duration: 0.6,
              ease: "power1.out",
              force3D: true,
            });
          },
        });

        enterTl.to(bottle, {
          x: targetCornerX,
          y: targetCornerY,
          rotate: originalPos.rotate,
          scale: originalPos.scale,
          opacity: 1,
          duration: 0.7,
          ease: "power1.out",
          force3D: true,
        });
      }
    } else {
      // Carousel not showing yet - just reverse normally
      const openTl = openTls.current[idx];
      if (openTl) {
        openTl.reverse();
        const duration = openTl.duration();
        gsap.delayedCall(duration, () => {
          const bottle = bottleRefs.current[idx];
          const content = contentRefs.current[idx];
          if (bottle) {
            const initialX = initialBottlePositionsMobile[idx]?.x || 0;
            const initialY = initialBottlePositionsMobile[idx]?.y || 0;
            gsap.to(bottle, {
              rotate: 0,
              scale: 1,
              x: initialX,
              y: initialY,
              duration: 0.3,
              ease: "power2.out",
            });
          }
          if (content) {
            gsap.set(content, { y: -100, autoAlpha: 0 });
          }
        });
      }
      setOpenIdx(null);
    }
  }, [openIdx, showCarousel, goesRight, initialBottlePositionsMobile]);

  // Close on ESC / outside
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onClick = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      if (!sectionRef.current.contains(e.target as Node)) return;
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

  // Auto-close on scroll: close when user scrolls 50vh past section bottom or top
  useEffect(() => {
    if (openIdx === null) return;
    if (!sectionRef.current) return;

    let rafId: number | null = null;
    let hasClosed = false;

    const handleScroll = () => {
      if (hasClosed) return;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current || hasClosed) return;

        const sectionRect = sectionRef.current.getBoundingClientRect();
        const sectionTop = sectionRect.top + window.scrollY;
        const sectionBottom = sectionRect.bottom + window.scrollY;
        const fiftyVh = window.innerHeight * 0.5;
        const thresholdBottom = sectionBottom + fiftyVh;
        const thresholdTop = sectionTop - fiftyVh;
        const currentScrollY = window.scrollY;

        // Close if scrolled down 50vh past bottom OR scrolled up 50vh past top
        if (currentScrollY >= thresholdBottom || currentScrollY <= thresholdTop) {
          hasClosed = true;
          close();
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openIdx, close]);

  // Determine the foreground background image to display
  const foregroundBgUrl =
    openIdx !== null && items[openIdx]?.backgroundImage?.asset?.url
      ? items[openIdx].backgroundImage.asset.url
      : "";

  return (
    <section ref={sectionRef} className="relative h-[100vh] overflow-hidden">
      {/* Base background */}
      <div
        ref={baseBgRef}
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url("/mobile-bottle-backgroud.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Foreground background that rises from bottom */}
      <div
        ref={fgBgRef}
        data-elem="fg-bg"
        className="absolute inset-0 -z-0"
        style={{
          backgroundImage: foregroundBgUrl
            ? `url(${foregroundBgUrl})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Bottles column */}
      <div className="relative h-full flex flex-col items-center justify-center gap-6 px-4">
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
          ref={(el) => {
            if (el) contentRefs.current[idx] = el;
          }}
          data-elem="content"
          className="z-[1300] w-[min(560px,92vw)] absolute top-[5rem] left-1/2 -translate-x-1/2 px-[18px] text-foreground"
        >
          <div className="">
            <h3 className="text-[2.5rem] lg:text-[3.2rem] 2xl:text-[3.8rem] font-[700] font-times-new-roman">
              {it.product?.title}
            </h3>
            <p className="leading-relaxed 2xl:text-[1.4rem]">
              {it.productDescription || it.product?.description}
            </p>
          </div>
          <div className="lg:mt-[2rem] mt-[2rem] flex gap-4 items-center pointer-events-auto">
            {it.product?.buy && (
              <button
                onClick={() => handleBuyNowClick(it)}
                className="cursor-pointer w-fit flex items-center justify-center uppercase px-[0.9rem] py-[0.6rem] rounded-[7.127px] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
              >
                {t("shop")}
              </button>
            )}
            {it.product?.slug && it.product?.category && (
              <Link
                href={`/${locale}/${it.product.category}-perfume/${it.product.slug}`}
                className="cursor-pointer w-fit flex items-center justify-center uppercase py-[0.6rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400]"
              >
                {t("readMore") || "Read More"}
              </Link>
            )}
          </div>
        </div>
      ))}

      {/* Corner carousel shown 4s after open */}
      {openIdx !== null &&
        showCarousel &&
        items[openIdx]?.images?.length > 0 && (
          <CornerCarousel
            key={`cc-${openIdx}`}
            images={items[openIdx].images}
            isRightSide={goesRight(openIdx)}
          />
        )}

      {/* Click anywhere overlay when open to reverse */}
      {openIdx !== null && (
        <button
          type="button"
          aria-label="Close details"
          className="absolute inset-0 z-[1200] bg-transparent"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            const clickedButton = target.closest(
              'button:not([aria-label="Close details"])'
            );
            const clickedLink = target.closest("a");
            const contentElement = target.closest('[data-elem="content"]');

            if (
              (clickedButton && contentElement?.contains(clickedButton)) ||
              (clickedLink && contentElement?.contains(clickedLink))
            ) {
              e.stopPropagation();
              return;
            }

            close();
          }}
        />
      )}

      {/* Buy Now Popup */}
      {selectedItem?.product.buy && (
        <BuyNowPopup
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedItem(null);
          }}
          countries={selectedItem.product.buy.countries}
          locale={locale}
        />
      )}
    </section>
  );
}

// Corner carousel component
function CornerCarousel({
  images,
  isRightSide,
}: {
  images: { asset: { url: string } }[];
  isRightSide: boolean;
}) {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimatingRef = useRef(false);
  const firstImageAnimatedRef = useRef(false);
  const [idx, setIdx] = useState(0);

  const transition = useCallback(
    (from: number, to: number) => {
      if (isAnimatingRef.current) return;
      const curr = imageRefs.current[from];
      const next = imageRefs.current[to];
      if (!curr || !next) return;
      isAnimatingRef.current = true;

      const exitX = isRightSide ? -350 : 350;
      const enterX = isRightSide ? 350 : -350;
      const origin = isRightSide ? "100% 100%" : "0% 100%";

      imageRefs.current.forEach((el, i) => {
        if (el && i !== from && i !== to)
          gsap.set(el, { opacity: 0, zIndex: 0, pointerEvents: "none" });
      });

      gsap.set([curr, next], { transformOrigin: origin });
      gsap.set(curr, { zIndex: 1 });
      gsap.set(next, { zIndex: 2, y: "100%", x: enterX, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          imageRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.set(el, {
              opacity: i === to ? 1 : 0,
              zIndex: i === to ? 2 : 0,
              pointerEvents: i === to ? "auto" : "none",
            });
          });
          isAnimatingRef.current = false;
        },
      });

      tl.to(curr, {
        y: "100%",
        x: exitX,
        opacity: 0,
        duration: 0.7,
        ease: "power1.in",
        force3D: true,
      });
      tl.fromTo(
        next,
        { y: "100%", x: enterX, opacity: 0 },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power1.out",
          force3D: true,
        },
        "-=0.35"
      );
    },
    [isRightSide]
  );

  useEffect(() => {
    firstImageAnimatedRef.current = false;
    images.forEach((_, i) => {
      const el = imageRefs.current[i];
      if (!el) return;
      const enterX = isRightSide ? 350 : -350;
      gsap.set(el, {
        transformOrigin: isRightSide ? "100% 100%" : "0% 100%",
        y: "100%",
        x: enterX,
        opacity: 0,
        zIndex: i === 0 ? 2 : 0,
        pointerEvents: "none",
        force3D: true,
      });
    });

    const firstImg = imageRefs.current[0];
    if (firstImg) {
      gsap.to(firstImg, {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power1.out",
        force3D: true,
        onComplete: () => {
          gsap.set(firstImg, { pointerEvents: "auto" });
          firstImageAnimatedRef.current = true;
        },
      });
    }
  }, [images, isRightSide]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const startAutoPlay = () => {
      if (firstImageAnimatedRef.current) {
        intervalId = setInterval(() => {
          if (isAnimatingRef.current || images.length <= 1) return;
          setIdx((prev) => {
            const n = (prev + 1) % images.length;
            transition(prev, n);
            return n;
          });
        }, 3000);
      } else {
        timeoutId = setTimeout(startAutoPlay, 100);
      }
    };

    startAutoPlay();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [images.length, transition]);

  return (
    <div
      className="absolute z-[1100] h-[50vh] pointer-events-none"
      style={
        {
          bottom: 0,
          [isRightSide ? "right" : "left"]: 0,
          width: "100%",
          height: "100%",
        } as any
      }
    >
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
            imageRefs.current[i] = el;
          }}
          className="absolute opacity-0 w-fit h-full flex items-end justify-end"
          style={{ bottom: 0, [isRightSide ? "right" : "left"]: 0 } as any}
        >
          <Image
            src={img.asset.url}
            alt="carousel"
            width={1000}
            height={1000}
            className="block rounded-[1rem] object-contain max-w-[100vw]"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      ))}
    </div>
  );
}

