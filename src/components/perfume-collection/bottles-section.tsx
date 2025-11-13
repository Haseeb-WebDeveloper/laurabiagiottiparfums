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
// import { useGSAP } from "@gsap/react";
import BottleCard from "./bottle-card";
import type { BottlesSectionItem, Collection } from "@/types/collection";
import { useLocale } from "@/lib/i18n/context";
import BuyNowPopup from "../ui/buy-now-popup";
import BottlesSectionMobile from "./bottles-section-mobile";

gsap.registerPlugin();

type Props = {
  items: BottlesSectionItem[];
  locale: string;
};

export default function BottlesSection({ items, locale }: Props) {
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  // Detect mobile and render mobile component
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  // Desktop hooks - must be called unconditionally
  const { t } = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const baseBgRef = useRef<HTMLDivElement>(null);
  const fgBgRef = useRef<HTMLDivElement>(null);
  const bottleRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const openTls = useRef<(gsap.core.Timeline | null)[]>([]);
  const carouselTimerRef = useRef<number | null>(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const bottleImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottleOriginalPositions = useRef<
    { x: number; y: number; scale: number; rotate: number }[]
  >([]);

  
  // Custom initial positions for each bottle (staggered vertically and horizontally)
  // Desktop positions
  const initialBottlePositionsDesktop = useMemo(
    () => [
      { x: -30, y: 30 }, // 1st bottle
      { x: 0, y: 130 }, // 2nd bottle
      { x: 30, y: 35 }, // 3rd bottle
      { x: 60, y: 130 }, // 4th bottle
    ],
    []
  );

  // Mobile positions (optimized for vertical layout)
  const initialBottlePositionsMobile = useMemo(
    () => [
      { x: "-20%", y: "2%" }, // 1st bottle
      { x: "20%", y: "-2%" }, // 2nd bottle
      { x: "-20%", y: "-2%" }, // 3rd bottle
      { x: "20%", y: "-2%" }, // 4th bottle
    ],
    []
  );

  // Helper function to get positions based on screen size
  const getInitialBottlePositions = useCallback(() => {
    if (typeof window === "undefined") return initialBottlePositionsDesktop;
    return window.innerWidth < 768
      ? initialBottlePositionsMobile
      : initialBottlePositionsDesktop;
  }, [initialBottlePositionsDesktop, initialBottlePositionsMobile]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<BottlesSectionItem | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Track hover animation states
  const hoverInAnimatingRef = useRef<boolean>(false);
  const hoverOutAnimatingRef = useRef<boolean>(false);
  const hoverOutQueuedRef = useRef<number | null>(null); // Store the idx that needs hover out
  const currentHoveredIdxRef = useRef<number | null>(null); // Track which bottle is currently hovered (animated state)
  const cursorOverBottleRef = useRef<number | null>(null); // Track which bottle cursor is physically over
  const pendingHoverIdxRef = useRef<number | null>(null); // Track pending hover to execute after animation
  const onHoverInRef = useRef<((idx: number) => void) | null>(null); // Ref to onHoverIn function for circular dependency
  
  // Check if any animation is currently running
  const isAnyAnimationRunning = useCallback(() => {
    return hoverInAnimatingRef.current || hoverOutAnimatingRef.current;
  }, []);

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

  // Handle resize to detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize states - must be called before conditional return
  useLayoutEffect(() => {
    if (isMobile) {
      setIsInitialized(true);
      return; // Skip desktop initialization on mobile
    }
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      gsap.set(fgBgRef.current, { yPercent: 100, autoAlpha: 0 });
      contentRefs.current.forEach((el, i) => {
        if (!el) return;
        if (isMobile) {
          // Mobile: start from top
          gsap.set(el, { y: -100, autoAlpha: 0 });
        } else {
          // Desktop: start from side
          gsap.set(el, {
            xPercent: contentOnLeft(i) ? -110 : 110,
            autoAlpha: 0,
          });
        }
      });
      // Set initial positions for bottles (staggered vertically and horizontally)
      const positions = isMobile
        ? initialBottlePositionsMobile
        : initialBottlePositionsDesktop;
      bottleRefs.current.forEach((el, i) => {
        if (el && positions[i]) {
          gsap.set(el, {
            x: positions[i].x || 0,
            y: positions[i].y || 0,
          });
        }
      });
      // Mark as initialized after GSAP setup
      setIsInitialized(true);
    }, sectionRef);
    return () => ctx.revert();
  }, [
    isMobile,
    contentOnLeft,
    initialBottlePositionsMobile,
    initialBottlePositionsDesktop,
  ]);

  // Hover behavior
  const hoverMaps = useMemo(
    () => ({
      0: [{}, { x: 80 }, { x: 30 }, { x: 10 }],
      1: [{ x: -60 }, {}, { x: 80 }, { x: 40 }],
      2: [{ x: -50 }, { x: -80 }, {}, { x: 80 }],
      3: [{ x: -40 }, { x: -50 }, { x: -90 }, {}],
    }),
    []
  );


  // Helper function to execute hover out animation
  const executeHoverOut = useCallback((idx: number) => {
    const positions = getInitialBottlePositions();
    const hovered = bottleRefs.current[idx];
    
    if (!hovered) {
      hoverOutAnimatingRef.current = false;
      currentHoveredIdxRef.current = null;
      return;
    }
    
    // Set hover out animation flag
    hoverOutAnimatingRef.current = true;
    
    // Kill any ongoing animations for smooth transitions
    gsap.killTweensOf([hovered, ...bottleRefs.current.filter(Boolean), baseBgRef.current]);
    
    // Create timeline to track when hover out completes
    const tl = gsap.timeline({
      onComplete: () => {
        hoverOutAnimatingRef.current = false;
        currentHoveredIdxRef.current = null;
        
        // Check if there's a pending hover to execute
        if (pendingHoverIdxRef.current !== null) {
          const pendingIdx = pendingHoverIdxRef.current;
          // Check if cursor is still over that bottle
          if (cursorOverBottleRef.current === pendingIdx) {
            pendingHoverIdxRef.current = null;
            // Execute the pending hover using ref
            onHoverInRef.current?.(pendingIdx);
          } else {
            // Cursor moved away, clear pending
            pendingHoverIdxRef.current = null;
          }
        }
      },
    });
    
    const initialX = positions[idx]?.x || 0;
    const initialY = positions[idx]?.y || 0;
    tl.to(hovered, {
      scale: 1,
      rotate: 0,
      x: initialX,
      y: initialY,
      duration: 0.6,
      ease: "power1.out",
      force3D: true,
    });
    
    bottleRefs.current.forEach((el, i) => {
      if (el) {
        const initialX = positions[i]?.x || 0;
        const initialY = positions[i]?.y || 0;
        tl.to(el, {
          scale: 1,
          x: initialX,
          y: initialY,
          duration: 0.6,
          ease: "power1.out",
          force3D: true,
        }, 0); // Start at same time
      }
    });
    
    if (baseBgRef.current)
      tl.to(baseBgRef.current, {
        scale: 1,
        duration: 0.7,
        ease: "power1.out",
        force3D: true,
      }, 0); // Start at same time
  }, [getInitialBottlePositions]);

  const onHoverIn = useCallback(
    (idx: number) => {
      if (openIdx !== null) return; // disable hover while open
      
      // Update cursor tracking
      cursorOverBottleRef.current = idx;
      
      // If any animation is running, store as pending and return
      if (isAnyAnimationRunning()) {
        pendingHoverIdxRef.current = idx;
        return;
      }
      
      // If already hovering this bottle, skip
      if (currentHoveredIdxRef.current === idx) return;
      
      // Clear any queued hover out for this bottle (user hovered back in)
      if (hoverOutQueuedRef.current === idx) {
        hoverOutQueuedRef.current = null;
      }
      
      // Clear pending since we're executing now
      pendingHoverIdxRef.current = null;
      
      const others = bottleRefs.current
        .map((el, i) => ({ el, i }))
        .filter(({ i }) => i !== idx);
      const hovered = bottleRefs.current[idx];
      if (!hovered) return;
      
      // Set hover in animation flag and current hovered index
      hoverInAnimatingRef.current = true;
      currentHoveredIdxRef.current = idx;
      
      // Kill any ongoing animations for smooth transitions
      gsap.killTweensOf([hovered, ...others.map(({ el }) => el).filter(Boolean), baseBgRef.current]);
      
      const positions = getInitialBottlePositions();
      
      // Create timeline to track when animation completes
      const tl = gsap.timeline({
        onComplete: () => {
          hoverInAnimatingRef.current = false;
          
          // If hover out was queued while hover in was animating, execute it now
          if (hoverOutQueuedRef.current === idx) {
            const queuedIdx = hoverOutQueuedRef.current;
            hoverOutQueuedRef.current = null;
            executeHoverOut(queuedIdx);
          } else if (pendingHoverIdxRef.current !== null) {
            // Check if there's a pending hover to execute
            const pendingIdx = pendingHoverIdxRef.current;
            // Check if cursor is still over that bottle
            if (cursorOverBottleRef.current === pendingIdx) {
              pendingHoverIdxRef.current = null;
              // Execute the pending hover using ref
              onHoverInRef.current?.(pendingIdx);
            } else {
              // Cursor moved away, clear pending
              pendingHoverIdxRef.current = null;
            }
          }
        },
      });
      
      tl.to(hovered, {
        scale: 1.12,
        rotate: goesRight(idx) ? 8 : -8,
        duration: 0.5,
        ease: "power1.out",
        force3D: true,
      });
      
      others.forEach(({ el, i }) => {
        if (!el) return;
        const map = (hoverMaps as any)[idx]?.[i] || {};
        const initialX = positions[i]?.x || 0;
        const initialY = positions[i]?.y || 0;
        tl.to(el, {
          scale: 0.6,
          x: map.x !== undefined ? map.x : initialX, // Preserve initial X if not specified
          y: map.y !== undefined ? map.y : initialY, // Preserve initial Y if not specified
          duration: 0.5,
          ease: "power1.out",
          force3D: true,
        }, 0); // Start at same time
      });
      
      if (baseBgRef.current)
        tl.to(baseBgRef.current, {
          scale: 1.13,
          duration: 0.7,
          ease: "power1.out",
          force3D: true,
        }, 0); // Start at same time
    },
    [hoverMaps, goesRight, openIdx, getInitialBottlePositions, executeHoverOut, isAnyAnimationRunning]
  );

  // Update ref whenever onHoverIn changes
  useEffect(() => {
    onHoverInRef.current = onHoverIn;
  }, [onHoverIn]);

  const onHoverOut = useCallback(
    (idx: number) => {
      if (openIdx !== null) return; // disable hover while open
      
      // Clear cursor tracking for this bottle
      if (cursorOverBottleRef.current === idx) {
        cursorOverBottleRef.current = null;
      }
      
      // Clear pending hover if it's for this bottle
      if (pendingHoverIdxRef.current === idx) {
        pendingHoverIdxRef.current = null;
      }
      
      // Only process hover out if this is the currently hovered bottle
      if (currentHoveredIdxRef.current !== idx) return;
      
      // If hover in animation is still in progress, queue the hover out
      if (hoverInAnimatingRef.current) {
        hoverOutQueuedRef.current = idx;
        return; // Wait for hover in to complete
      }
      
      // If hover out is already animating, skip (shouldn't happen, but safety check)
      if (hoverOutAnimatingRef.current) {
        return;
      }
      
      // Execute hover out
      executeHoverOut(idx);
    },
    [openIdx, executeHoverOut]
  );

  // Build a per-index open timeline lazily
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
      const isMobile = window.innerWidth < 768;
      let targetX = 0;
      let targetY = 0;
      if (section && clicked) {
        const sec = section.getBoundingClientRect();
        const el = clicked.getBoundingClientRect();
        const centerX = el.left + el.width / 2;
        const padding = Math.max(24, Math.min(72, sec.width * 0.06));

        // Calculate X position (side)
        if (moveRight) {
          const rightCenter = sec.right - padding - el.width / 2;
          targetX = rightCenter - centerX;
        } else {
          const leftCenter = sec.left + padding + el.width / 2;
          targetX = leftCenter - centerX;
        }

        // Calculate Y position (move to bottom corner)
        const currentY = (gsap.getProperty(clicked, "y") as number) || 0;
        const elBottom = el.bottom;
        const secBottom = sec.bottom;
        // Move to bottom: calculate how much to move down
        targetY = (secBottom - elBottom + currentY) - 10;
      }
      tl.addLabel("start")
        .to(
          others,
          { yPercent: 120, autoAlpha: 0, stagger: 0.08, duration: 0.6 },
          "start"
        )
        // Move clicked bottle to bottom corner (side + bottom)
        .to(
          clicked,
          {
            x: targetX,
            y: targetY,
            rotate: moveRight ? 12 : -12,
            scale: 1.18,
            duration: 0.7,
            ease: "power1.out",
            force3D: true,
          },
          "start"
        )
        .fromTo(
          fgBgRef.current,
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "power1.out" },
          "start+=0.05"
        );

      // Content animation - different for mobile vs desktop
      if (isMobile) {
        // Mobile: slide from top
        tl.fromTo(
          contentRefs.current[idx],
          {
            y: -100,
            autoAlpha: 0,
          },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power1.out" },
          "start+=0.2"
        );
      } else {
        // Desktop: slide from side
        tl.fromTo(
          contentRefs.current[idx],
          {
            xPercent: 0,
            x:
              (sectionRef.current?.getBoundingClientRect().width || 1000) *
              (contentOnLeft(idx) ? -1 : 1),
            autoAlpha: 0,
          },
          { xPercent: 0, x: 0, autoAlpha: 1, duration: 0.7, ease: "power1.out" },
          "start+=0.2"
        );
      }
      return tl;
    },
    [goesRight, contentOnLeft]
  );

  const open = useCallback(
    (idx: number) => {
      if (openIdx === idx) return;
      setOpenIdx(idx);
      if (!openTls.current[idx]) openTls.current[idx] = buildOpenTl(idx);
      openTls.current[idx]!.play(0);

      // Store bottle's target position (will be set after animation completes)
      const moveRight = goesRight(idx);
      // Get the target position from the timeline
      const padding = sectionRef.current
        ? Math.max(
            24,
            Math.min(
              72,
              sectionRef.current.getBoundingClientRect().width * 0.06
            )
          )
        : 60;
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      const clicked = bottleRefs.current[idx];
      if (sectionRect && clicked) {
        const rect = clicked.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        let targetX = 0;
        if (moveRight) {
          const rightCenter = sectionRect.right - padding - rect.width / 2;
          targetX = rightCenter - centerX;
        } else {
          const leftCenter = sectionRect.left + padding + rect.width / 2;
          targetX = leftCenter - centerX;
        }
        // Calculate target Y (bottom corner position)
        const currentY = (gsap.getProperty(clicked, "y") as number) || 0;
        const elBottom = rect.bottom;
        const secBottom = sectionRect.bottom;
        const targetY = (secBottom - elBottom + currentY) - 15;

        bottleOriginalPositions.current[idx] = {
          x: targetX,
          y: targetY, // Bottom corner Y position
          scale: 1.18,
          rotate: moveRight ? 12 : -12,
        };
      }

      // schedule carousel reveal after 4s
      if (carouselTimerRef.current)
        window.clearTimeout(carouselTimerRef.current);
      setShowCarousel(false);
      carouselTimerRef.current = window.setTimeout(() => {
        // Animate bottle to corner, then down (carousel exit)
        const bottle = bottleRefs.current[idx];
        if (bottle && items[idx]?.images?.length > 0) {
          const isRight = goesRight(idx);
          const exitX = isRight ? -350 : 350;
          const sectionRect = sectionRef.current?.getBoundingClientRect();
          if (sectionRect) {
            // Get current bottle position, rotation, and scale (PRESERVE THESE)
            const currentX = (gsap.getProperty(bottle, "x") as number) || 0;
            const currentY = (gsap.getProperty(bottle, "y") as number) || 0;
            const currentRotate =
              (gsap.getProperty(bottle, "rotate") as number) || 0;
            const currentScale =
              (gsap.getProperty(bottle, "scale") as number) || 1;
            const currentRect = bottle.getBoundingClientRect();

            // Calculate corner position (absolute)
            const cornerX = isRight
              ? sectionRect.right - currentRect.width
              : sectionRect.left;
            const cornerY = sectionRect.bottom - currentRect.height;

            // Calculate target x position relative to bottle's current transform
            const targetCornerX = cornerX - (currentRect.left - currentX);
            const targetCornerY = cornerY - (currentRect.top - currentY);

            // Set transform origin for corner animation
            gsap.set(bottle, {
              transformOrigin: isRight ? "100% 100%" : "0% 100%",
            });

            // Timeline: exit directly down (bottle is already at corner from open animation)
            const tl = gsap.timeline({
              onComplete: () => {
                // Show carousel after bottle exits
                setShowCarousel(true);
              },
            });
            // Directly animate to exit position without moving to corner first
            // (bottle is already positioned at corner from open animation)
            tl.to(bottle, {
              y: targetCornerY + currentRect.height,
              x: targetCornerX + exitX,
              rotate: currentRotate, // KEEP rotation during exit
              scale: currentScale, // KEEP scale during exit
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
      // Step 1: Hide carousel instantly
      setShowCarousel(false);

      // Step 2: Show bottle at corner instantly (like carousel enter)
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      if (sectionRect) {
        const bottleRect = bottle.getBoundingClientRect();
        const cornerX = isRight
          ? sectionRect.right - bottleRect.width
          : sectionRect.left;
        const cornerY = sectionRect.bottom - bottleRect.height;

        // Get current transform values
        const currentX = (gsap.getProperty(bottle, "x") as number) || 0;
        const currentY = (gsap.getProperty(bottle, "y") as number) || 0;

        // Calculate corner position relative to current transform
        const targetCornerX = cornerX - (bottleRect.left - currentX);
        const targetCornerY = cornerY - (bottleRect.top - currentY);

        // Set transform origin
        gsap.set(bottle, {
          transformOrigin: isRight ? "100% 100%" : "0% 100%",
        });

        // Set bottle at corner position (from bottom with X, like carousel enter)
        // Use original rotate and scale values (PRESERVE THEM)
        gsap.set(bottle, {
          x: targetCornerX + enterX,
          y: targetCornerY + bottleRect.height,
          opacity: 0,
          rotate: originalPos.rotate, // KEEP original rotation
          scale: originalPos.scale, // KEEP original scale
          force3D: true,
        });

        // Step 3: Animate bottle entering from bottom (like carousel)
        const enterTl = gsap.timeline({
          onComplete: () => {
            // Step 4: Move bottle back to side position
            const moveBackTl = gsap.timeline({
              onComplete: () => {
                // Step 5: Now reverse the open timeline
                const openTl = openTls.current[idx];
                const isMobile = window.innerWidth < 768;
                if (openTl) {
                  openTl.reverse();
                  // Reset rotation and scale after reverse completes
                  const duration = openTl.duration();
                  gsap.delayedCall(duration, () => {
                    const positions = getInitialBottlePositions();
                    // Reset ALL bottles to original scale and positions
                    bottleRefs.current.forEach((bottle, i) => {
                      if (bottle) {
                        const initialX = positions[i]?.x || 0;
                        const initialY = positions[i]?.y || 0;
                        gsap.to(bottle, {
                          rotate: 0,
                          scale: 1,
                          x: initialX, // Reset to initial X position
                          y: initialY, // Reset to initial Y position
                          duration: 0.7,
                          ease: "power1.out",
                          force3D: true,
                        });
                      }
                    });
                    // Reset content to initial state
                    const content = contentRefs.current[idx];
                    if (content) {
                      if (isMobile) {
                        gsap.set(content, { y: 100, autoAlpha: 0 });
                      } else {
                        gsap.set(content, {
                          xPercent: contentOnLeft(idx) ? -110 : 110,
                          autoAlpha: 0,
                        });
                      }
                    }
                    // Clear openIdx AFTER all animations complete so background image stays visible
                    setOpenIdx(null);
                  });
                }
              },
            });

            moveBackTl.to(bottle, {
              x: originalPos.x,
              y: originalPos.y,
              rotate: originalPos.rotate, // KEEP rotation
              scale: originalPos.scale, // KEEP scale
              duration: 1.0,
              ease: "power1.out",
              force3D: true,
            });
          },
        });

        enterTl.to(bottle, {
          x: targetCornerX,
          y: targetCornerY,
          rotate: originalPos.rotate, // KEEP rotation during enter
          scale: originalPos.scale, // KEEP scale during enter
          opacity: 1,
          duration: 0.8,
          ease: "power1.out",
          force3D: true,
        });
      }
    } else {
      // Carousel not showing yet - just reverse normally
      const openTl = openTls.current[idx];
      const isMobile = window.innerWidth < 768;
      if (openTl) {
        openTl.reverse();
        // Reset rotation and scale after reverse completes
        const duration = openTl.duration();
        gsap.delayedCall(duration, () => {
          const positions = getInitialBottlePositions();
          // Reset ALL bottles to original scale and positions
          bottleRefs.current.forEach((bottle, i) => {
            if (bottle) {
              const initialX = positions[i]?.x || 0;
              const initialY = positions[i]?.y || 0;
              gsap.to(bottle, {
                rotate: 0,
                scale: 1,
                x: initialX, // Reset to initial X position
                y: initialY, // Reset to initial Y position
                duration: 0.5,
                ease: "power1.out",
                force3D: true,
              });
            }
          });
          // Reset content to initial state
          const content = contentRefs.current[idx];
          if (content) {
            if (isMobile) {
              gsap.set(content, { y: -100, autoAlpha: 0 });
            } else {
              gsap.set(content, {
                xPercent: contentOnLeft(idx) ? -110 : 110,
                autoAlpha: 0,
              });
            }
          }
          // Clear openIdx AFTER all animations complete so background image stays visible
          setOpenIdx(null);
        });
      }
    }
  }, [
    openIdx,
    showCarousel,
    goesRight,
    getInitialBottlePositions,
    contentOnLeft,
  ]);

  // Close on ESC / outside
  useEffect(() => {
    if (isMobile) return; // Skip desktop-only effects on mobile
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
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
  }, [isMobile, openIdx, close]);

  // Auto-close on scroll: close when user scrolls 50vh past section bottom or top
  useEffect(() => {
    if (isMobile) return; // Skip desktop-only effects on mobile
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
  }, [isMobile, openIdx, close]);

  // Render mobile component on mobile devices - AFTER all hooks
  if (isMobile) {
    return <BottlesSectionMobile items={items} locale={locale} />;
  }

  // Determine the foreground background image to display
  const foregroundBgUrl =
    openIdx !== null && items[openIdx]?.backgroundImage?.asset?.url
      ? items[openIdx].backgroundImage.asset.url
      : "";

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[100vh] overflow-hidden"
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Base background (kept) - Optimized for performance */}
      <div
        ref={baseBgRef}
        className="absolute inset-0 -z-10"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          contain: "layout style paint",
          isolation: "isolate",
        }}
      >
        <Image
          src="/bottle-backgroud-3.webp"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover"
          style={{
            imageRendering: "auto",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
          sizes="100vw"
        />
      </div>

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
      {items.map((it, idx) => {
        const isLeft = contentOnLeft(idx);
        return (
          <div
            key={idx}
            ref={(el) => {
              if (el) contentRefs.current[idx] = el;
            }}
            data-elem="content"
            className={`z-[1300] select-none pointer-events-none w-[min(560px,92vw)] md:w-[40vw] absolute top-[5rem] left-1/2 -translate-x-1/2 px-[18px] md:mt-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:px-0 text-foreground ${
              isLeft
                ? "md:left-8 md:right-auto 2xl:pl-[6vw] xl:pl-[3vw]"
                : "md:right-8 md:left-auto 2xl:pr-[6vw] xl:pr-[3vw]"
            }`}
            style={
              !isInitialized
                ? {
                    opacity: 0,
                    visibility: "hidden" as const,
                  }
                : undefined
            }
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
                className="cursor-pointer w-fit flex items-center justify-center uppercase px-[0.9rem] py-[0.6rem] rounded-[7.127px] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground bg-foreground text-background hover:bg-foreground/90  transition-colors duration-300"
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
        );
      })}

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
            // Don't close if clicking on interactive elements within content
            const target = e.target as HTMLElement;
            
            // Check if click is on a button or link within content area
            const clickedButton = target.closest('button:not([aria-label="Close details"])');
            const clickedLink = target.closest('a');
            const contentElement = target.closest('[data-elem="content"]');
            
            // Only prevent closing if clicking on buttons/links that are inside content
            // Allow closing on carousel, empty areas, and content text
            if (
              (clickedButton && contentElement?.contains(clickedButton)) ||
              (clickedLink && contentElement?.contains(clickedLink))
            ) {
              e.stopPropagation();
              return;
            }
            
            // Close on all other clicks (carousel, empty areas, etc.)
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

// Minimal corner carousel reused from collection-left-right
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
      // Initialize all images as hidden (including first one)
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

    // Animate first image in from bottom (same animation as others)
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

    // Wait for first image animation to complete before starting auto-play
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
      className="absolute z-[1100] lg:h-[100vh] h-[50vh] pointer-events-none "
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
          className="absolute opacity-0 w-fit  h-full flex items-end justify-end"
          style={{ bottom: 0, [isRightSide ? "right" : "left"]: 0 } as any}
        >
          <Image
            src={img.asset.url}
            alt="carousel"
            width={1000}
            height={1000}
            className="block rounded-[1rem] object-contain max-h-[50vh] lg:max-h-[80vh] "
            style={{
              width: "100%",
              height: "auto",
              // maxWidth: "50vw",
            }}
          />
        </div>
      ))}
    </div>
  );
}
