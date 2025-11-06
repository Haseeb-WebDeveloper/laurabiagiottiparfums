"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { BottlesSectionItem } from "@/types/collection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/lib/i18n/context";
import BuyNowPopup from "../ui/buy-now-popup";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  items: BottlesSectionItem[];
  locale: string;
};

type ViewState = "showcase" | "detail";

export default function BottlesShowcase({ items, locale }: Props) {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const bottleRefs = useRef<HTMLDivElement[]>([]);
  const detailSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailBottleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailBgRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  bottleRefs.current = [];
  detailSectionRefs.current = [];
  detailBottleRefs.current = [];
  detailContentRefs.current = [];
  detailBgRefs.current = [];

  // State management
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [viewState, setViewState] = useState<ViewState>("showcase");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<BottlesSectionItem | null>(null);

  // Extract full item data (max 4)
  const processedItems = useMemo(
    () =>
      items
        ?.slice(0, 4)
        .map((item) => ({
          image: item?.images?.[0]?.asset?.url,
          backgroundImage: item?.backgroundImage?.asset?.url || "/bottle-backgroud.jpg",
          title: item?.product?.title || "",
          description: item?.product?.description || "",
          buy: item?.product?.buy,
          fullItem: item,
        }))
        .filter((item) => item.image) || [],
    [items]
  );

  // Extract images for backward compatibility with existing code
  const images = useMemo(
    () => processedItems.map((item) => item.image),
    [processedItems]
  );

  // Curated absolute positions for desktop showcase
  const positions = useMemo(
    () => [
      { top: "12%", left: "8%" },
      { bottom: "-4%", left: "28%" },
      { top: "15%", left: "54%" },
      { bottom: "-4%", left: "78%" },
    ],
    []
  );

  // Determine bottle and content layout based on index
  const getLayout = (index: number) => {
    const isRight = index % 2 === 0; // 0,2 = right | 1,3 = left
    return {
      bottlePosition: isRight ? "right" : "left",
      contentPosition: isRight ? "left" : "right",
    };
  };

  const addBottleRef = (el: HTMLDivElement | null) => {
    if (el && !bottleRefs.current.includes(el)) {
      bottleRefs.current.push(el);
    }
  };

  const addDetailSectionRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      detailSectionRefs.current[index] = el;
    }
  };

  const addDetailBottleRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      detailBottleRefs.current[index] = el;
    }
  };

  const addDetailContentRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      detailContentRefs.current[index] = el;
    }
  };

  const addDetailBgRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      detailBgRefs.current[index] = el;
    }
  };

  // Transition from showcase to detail view (CLICK ANIMATION)
  const transitionToDetail = useCallback((index: number, skipScroll = false) => {
    if (isTransitioning || viewState !== "showcase") return;
    setIsTransitioning(true);

    const layout = getLayout(index);
    const selectedBottle = bottleRefs.current[index];
    const otherBottles = bottleRefs.current.filter((_, i) => i !== index);
    const detailSection = detailSectionRefs.current[index];
    const detailBottle = detailBottleRefs.current[index];
    const detailContent = detailContentRefs.current[index];
    const detailBg = detailBgRefs.current[index];

    if (!selectedBottle || !detailSection || !detailBottle || !detailContent || !detailBg) {
      setIsTransitioning(false);
      return;
    }

    const isRight = layout.bottlePosition === "right";

    // Make detail section visible for positioning (but keep hidden visually)
    gsap.set(detailBg, { visibility: "visible", pointerEvents: "auto", opacity: 0 });
    gsap.set(detailBottle, { visibility: "visible", pointerEvents: "auto", opacity: 0 });
    gsap.set(detailContent, { visibility: "visible", pointerEvents: "auto", opacity: 0, x: isRight ? -80 : 80, y: 20 });

    // Get positions immediately (before any scroll)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Get current positions
        const bottleRect = selectedBottle.getBoundingClientRect();
        const detailBottleRect = detailBottle.getBoundingClientRect();
        
        if (detailBottleRect.width === 0 || detailBottleRect.height === 0) {
          setIsTransitioning(false);
          return;
        }
        
        // Calculate movement
        const startX = bottleRect.left + bottleRect.width / 2;
        const startY = bottleRect.top + bottleRect.height / 2;
        const endX = detailBottleRect.left + detailBottleRect.width / 2;
        const endY = detailBottleRect.top + detailBottleRect.height / 2;
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        // Set fixed position for showcase bottle BEFORE animation
        gsap.set(selectedBottle, {
          position: "fixed",
          left: bottleRect.left,
          top: bottleRect.top,
          width: bottleRect.width,
          height: bottleRect.height,
          margin: 0,
          zIndex: 9999,
          x: 0,
          y: 0,
          transformOrigin: "center center",
        });

        const tl = gsap.timeline({
          onComplete: () => {
            // Hide showcase bottle
            gsap.set(selectedBottle, {
              opacity: 0,
              visibility: "hidden",
              position: "absolute",
              left: "auto",
              top: "auto",
              x: 0,
              y: 0,
              scale: 1,
              clearProps: "left,top,width,height,position,margin,zIndex",
            });
            // Show detail bottle
            gsap.set(detailBottle, { opacity: 1, visibility: "visible", pointerEvents: "auto" });
            // Ensure content is visible
            gsap.set(detailContent, { visibility: "visible", pointerEvents: "auto", opacity: 1 });
            // Hide all other detail sections
            detailBgRefs.current.forEach((bg, i) => {
              if (bg && i !== index) {
                gsap.set(bg, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
              }
            });
            detailBottleRefs.current.forEach((bottle, i) => {
              if (bottle && i !== index) {
                gsap.set(bottle, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
              }
            });
            detailContentRefs.current.forEach((content, i) => {
              if (content && i !== index) {
                gsap.set(content, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
              }
            });
            
            setViewState("detail");
            setActiveSection(index);
            setIsTransitioning(false);

            // After animation, scroll to section if needed
            if (!skipScroll) {
              setTimeout(() => {
                detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 100);
            }
          },
        });

        // Fade out other bottles
        tl.to(
          otherBottles,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in",
          },
          0
        )
          // Move selected bottle to detail position
          .to(
            selectedBottle,
            {
              x: deltaX,
              y: deltaY,
              scale: 1.2,
              rotate: 0,
              duration: 0.8,
              ease: "power2.inOut",
            },
            0
          )
          // Fade out showcase background
          .to(
            bgRef.current,
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.2
          )
          // Fade in detail background
          .to(
            detailBg,
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.inOut",
            },
            0.3
          )
          // Show detail bottle
          .to(
            detailBottle,
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            0.4
          )
          // Fade in content from opposite side
          .to(
            detailContent,
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            0.6
          );
      });
    });
  }, [isTransitioning, viewState, processedItems.length]);

  // Transition between detail sections
  const transitionToSection = useCallback((fromIndex: number | null, toIndex: number) => {
    if (isTransitioning || toIndex < 0 || toIndex >= processedItems.length) return;
    setIsTransitioning(true);

    const fromSection = fromIndex !== null ? detailSectionRefs.current[fromIndex] : null;
    const toSection = detailSectionRefs.current[toIndex];
    const toBottle = detailBottleRefs.current[toIndex];
    const toContent = detailContentRefs.current[toIndex];
    const toBg = detailBgRefs.current[toIndex];

    if (!toSection || !toBottle || !toContent || !toBg) {
      setIsTransitioning(false);
      return;
    }

    const layout = getLayout(toIndex);
    const isRight = layout.bottlePosition === "right";

    // Make target section visible for animation
    gsap.set(toBg, { visibility: "visible", pointerEvents: "auto" });
    gsap.set(toBottle, { visibility: "visible", pointerEvents: "auto" });
    gsap.set(toContent, { visibility: "visible", pointerEvents: "auto" });

    const tl = gsap.timeline({
      onComplete: () => {
        // Hide all other sections
        detailBgRefs.current.forEach((bg, idx) => {
          if (bg && idx !== toIndex) {
            gsap.set(bg, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
          }
        });
        detailBottleRefs.current.forEach((bottle, idx) => {
          if (bottle && idx !== toIndex) {
            gsap.set(bottle, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
          }
        });
        detailContentRefs.current.forEach((content, idx) => {
          if (content && idx !== toIndex) {
            gsap.set(content, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
          }
        });
        
        setActiveSection(toIndex);
        setIsTransitioning(false);
      },
    });

    // If coming from another section, fade out old content
    if (fromIndex !== null && fromSection !== null) {
      const fromContent = detailContentRefs.current[fromIndex];
      const fromBottle = detailBottleRefs.current[fromIndex];
      const fromBg = detailBgRefs.current[fromIndex];

      if (fromContent && fromBottle && fromBg) {
        tl.to(
          [fromContent, fromBottle],
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          0
        ).to(
          fromBg,
          {
            opacity: 0,
            visibility: "hidden",
            pointerEvents: "none",
            duration: 0.4,
            ease: "power2.inOut",
          },
          0
        );
      }
    }

    // Fade in new section
    tl.to(
      toBg,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      fromIndex !== null ? 0.2 : 0
    )
      .to(
        toBottle,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        fromIndex !== null ? 0.3 : 0
      )
      .fromTo(
        toContent,
        {
          opacity: 0,
          x: isRight ? -80 : 80,
          y: 20,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        fromIndex !== null ? 0.4 : 0
      );
  }, [isTransitioning, processedItems.length]);

  // Handle bottle click
  const handleBottleClick = useCallback((index: number) => {
    if (viewState === "showcase" && !isTransitioning) {
      transitionToDetail(index);
    }
  }, [viewState, isTransitioning, transitionToDetail]);

  // Handle buy now click
  const handleBuyNowClick = useCallback((item: BottlesSectionItem) => {
    setSelectedPerfume(item);
    setIsPopupOpen(true);
  }, []);

  // Hover effects - only in showcase view
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !images?.length || viewState !== "showcase") return;

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
            scale: i === index ? 1.15 : 0.70,
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
  }, [images, viewState]);

  // Initialize GSAP states - ALL DETAIL SECTIONS HIDDEN BY DEFAULT
  useEffect(() => {
    if (!processedItems.length) return;

    const ctx = gsap.context(() => {
      // Set initial states for detail sections - all hidden
      detailBgRefs.current.forEach((bg) => {
        if (bg) {
          gsap.set(bg, { 
            opacity: 0, 
            visibility: "hidden", 
            pointerEvents: "none",
            force3D: true 
          });
        }
      });
      detailBottleRefs.current.forEach((bottle) => {
        if (bottle) {
          gsap.set(bottle, { 
            opacity: 0, 
            visibility: "hidden", 
            pointerEvents: "none",
            force3D: true 
          });
        }
      });
      detailContentRefs.current.forEach((content) => {
        if (content) {
          gsap.set(content, { 
            opacity: 0, 
            visibility: "hidden", 
            pointerEvents: "none",
            x: 0, 
            force3D: true 
          });
        }
      });
    });

    return () => ctx.revert();
  }, [processedItems.length]);

  // Reverse transition: from detail back to showcase
  const transitionToShowcase = useCallback((fromIndex: number) => {
    if (isTransitioning || viewState !== "detail") return;
    setIsTransitioning(true);

    const selectedBottle = bottleRefs.current[fromIndex];
    const detailBottle = detailBottleRefs.current[fromIndex];
    const detailContent = detailContentRefs.current[fromIndex];
    const detailBg = detailBgRefs.current[fromIndex];

    if (!selectedBottle || !detailBottle || !detailContent || !detailBg) {
      setIsTransitioning(false);
      return;
    }

    // Get positions
    const detailBottleRect = detailBottle.getBoundingClientRect();
    const bottleRect = selectedBottle.getBoundingClientRect();
    
    // Calculate reverse movement
    const startX = detailBottleRect.left + detailBottleRect.width / 2;
    const startY = detailBottleRect.top + detailBottleRect.height / 2;
    
    // Get original showcase position from stored positions
    const originalPos = positions[fromIndex];
    const showcaseContainer = containerRef.current;
    if (!showcaseContainer) {
      setIsTransitioning(false);
      return;
    }
    
    const containerRect = showcaseContainer.getBoundingClientRect();
    let endX: number, endY: number;
    
    if (originalPos.top) {
      endY = containerRect.top + (parseFloat(originalPos.top) / 100) * containerRect.height;
    } else {
      endY = containerRect.bottom - (parseFloat(originalPos.bottom || "0") / 100) * containerRect.height;
    }
    endX = containerRect.left + (parseFloat(originalPos.left) / 100) * containerRect.width;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Show showcase bottle and position it at detail location
    gsap.set(selectedBottle, {
      position: "fixed",
      left: detailBottleRect.left,
      top: detailBottleRect.top,
      width: detailBottleRect.width,
      height: detailBottleRect.height,
      margin: 0,
      zIndex: 9999,
      opacity: 1,
      visibility: "visible",
      x: 0,
      y: 0,
      scale: 1.2,
      transformOrigin: "center center",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Reset showcase bottle
        gsap.set(selectedBottle, {
          position: "absolute",
          left: "auto",
          top: "auto",
          x: 0,
          y: 0,
          scale: 1,
          clearProps: "left,top,width,height,position,margin,zIndex",
        });
        // Show all showcase bottles
        bottleRefs.current.forEach((bottle) => {
          gsap.set(bottle, { opacity: 1, visibility: "visible" });
        });
        // Hide all detail sections
        detailBgRefs.current.forEach((bg) => {
          if (bg) gsap.set(bg, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
        });
        detailBottleRefs.current.forEach((bottle) => {
          if (bottle) gsap.set(bottle, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
        });
        detailContentRefs.current.forEach((content) => {
          if (content) gsap.set(content, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
        });
        
        setViewState("showcase");
        setActiveSection(null);
        setIsTransitioning(false);
      },
    });

    // Move bottle back to showcase position
    tl.to(
      selectedBottle,
      {
        x: deltaX,
        y: deltaY,
        scale: 1,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    )
      // Fade out detail background
      .to(
        detailBg,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.2
      )
      // Fade out detail content
      .to(
        detailContent,
        {
          opacity: 0,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.in",
        },
        0
      )
      // Fade in showcase background
      .to(
        bgRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        0.3
      )
      // Show other bottles
      .to(
        bottleRefs.current.filter((_, i) => i !== fromIndex),
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.4
      );
  }, [isTransitioning, viewState, positions]);

  // ScrollTrigger setup for scroll-based navigation
  useEffect(() => {
    if (!processedItems.length) return;

    let triggers: ScrollTrigger[] = [];
    let hasAutoTransitioned = false;

    const setupTriggers = () => {
      // Kill existing triggers first
      triggers.forEach((t) => t.kill());
      triggers = [];

      // Wait for refs
      const allRefsReady = detailSectionRefs.current.every((ref, idx) => {
        if (idx >= processedItems.length) return true;
        return ref !== null && ref !== undefined;
      });

      if (!allRefsReady) {
        setTimeout(setupTriggers, 200);
        return;
      }

      // Create ScrollTrigger for first detail section (auto-transition from showcase if no click)
      const firstSection = detailSectionRefs.current[0];
      if (firstSection && showcaseRef.current) {
        const firstTrigger = ScrollTrigger.create({
          trigger: firstSection,
          start: "top 85%",
          end: "top 15%",
          onEnter: () => {
            if (hasAutoTransitioned || isTransitioning || viewState !== "showcase") return;
            hasAutoTransitioned = true;
            // Auto-transition without scroll (skipScroll = true)
            transitionToDetail(0, true);
          },
          onEnterBack: () => {
            if (isTransitioning || viewState !== "detail" || activeSection !== 0) return;
            hasAutoTransitioned = false;
            // Reverse animation back to showcase
            transitionToShowcase(0);
          },
        });
        triggers.push(firstTrigger);
      }

      // Create ScrollTrigger for section-to-section navigation
      processedItems.forEach((item, idx) => {
        if (idx === 0) return; // Already handled above
        
        const section = detailSectionRefs.current[idx];
        if (!section) return;

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          end: "top 15%",
          onEnter: () => {
            if (isTransitioning || activeSection === idx) return;
            transitionToSection(activeSection, idx);
          },
          onEnterBack: () => {
            if (isTransitioning || activeSection === idx - 1) return;
            transitionToSection(activeSection, idx - 1);
          },
        });

        triggers.push(trigger);
      });

      // Create trigger for returning to showcase from any section
      if (showcaseRef.current) {
        const showcaseTrigger = ScrollTrigger.create({
          trigger: showcaseRef.current,
          start: "top 80%",
          end: "top 20%",
          onEnterBack: () => {
            if (isTransitioning || viewState !== "detail" || activeSection === null) return;
            // Reverse animation from current section back to showcase
            transitionToShowcase(activeSection);
          },
        });
        triggers.push(showcaseTrigger);
      }
    };

    // Initial setup with delay
    const timeout = setTimeout(setupTriggers, 300);

    return () => {
      clearTimeout(timeout);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [processedItems.length, isTransitioning, viewState, activeSection, transitionToDetail, transitionToSection, transitionToShowcase]);

  if (!processedItems?.length) return null;

  return (
    <>
      {/* Showcase View */}
      <section
        ref={showcaseRef}
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
          {processedItems.map((item, idx) => (
            <div
              key={idx}
              ref={addBottleRef}
              onClick={() => handleBottleClick(idx)}
              className="absolute transform-gpu will-change-transform origin-center pointer-events-auto cursor-pointer"
              style={{ ...positions[idx] }}
              tabIndex={0}
            >
              <Image
                src={item.image}
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

        {/* Mobile vertical stack with click handlers */}
        <div className="md:hidden relative z-10 h-full w-full flex flex-col items-center justify-center gap-10 px-6">
          {processedItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleBottleClick(idx)}
              className="transform-gpu cursor-pointer"
            >
              <Image
                src={item.image}
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

      {/* Detail Sections */}
      {processedItems.map((item, idx) => {
        const layout = getLayout(idx);
        const isRight = layout.bottlePosition === "right";

        return (
          <section
            key={`detail-${idx}`}
            ref={(el) => addDetailSectionRef(el as HTMLDivElement | null, idx)}
            className="relative h-[100vh] w-full overflow-hidden"
            aria-label={`Bottle detail section ${idx + 1}`}
          >
            {/* Background image - hidden until transition */}
            <div
              ref={(el) => addDetailBgRef(el, idx)}
              className="absolute inset-0 will-change-transform pointer-events-none"
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden
            />

            {/* Desktop Layout */}
            <div className="hidden md:flex relative z-10 h-full w-full items-center">
              {/* Bottle - Desktop */}
              <div
                ref={(el) => addDetailBottleRef(el, idx)}
                className={`absolute top-1/2 -translate-y-1/2 transform-gpu will-change-transform ${
                  isRight ? "right-[8%]" : "left-[8%]"
                }`}
                style={{
                  width: "clamp(180px, 17vw, 220px)",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={520}
                  height={800}
                  sizes="(max-width: 1280px) 25vw, 20vw"
                  className="w-full h-auto select-none"
                />
              </div>

              {/* Content Panel - Desktop */}
              <div
                ref={(el) => addDetailContentRef(el, idx)}
                className={`absolute top-1/2 -translate-y-1/2 transform-gpu will-change-transform ${
                  isRight ? "left-[8%]" : "right-[8%]"
                } max-w-[40%]`}
              >
                <div className="flex flex-col gap-6">
                  <h2 className="text-4xl lg:text-5xl font-bold tracking-wide">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-base lg:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.buy?.countries && (
                    <button
                      onClick={() => handleBuyNowClick(item.fullItem)}
                      className="w-fit uppercase px-8 py-3 rounded-full tracking-wider text-sm font-medium border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors duration-300"
                    >
                      {t("shop")}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden relative z-10 h-full w-full flex flex-col items-center justify-center px-6">
              {/* Bottle - Mobile */}
              <div
                ref={(el) => addDetailBottleRef(el, idx)}
                className="transform-gpu will-change-transform mb-8"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={320}
                  height={500}
                  sizes="90vw"
                  className="w-[65vw] max-w-[320px] h-auto select-none"
                />
              </div>

              {/* Content Panel - Mobile */}
              <div
                ref={(el) => addDetailContentRef(el, idx)}
                className="transform-gpu will-change-transform w-full max-w-md text-center"
              >
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-bold tracking-wide">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-base leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.buy?.countries && (
                    <button
                      onClick={() => handleBuyNowClick(item.fullItem)}
                      className="w-fit mx-auto uppercase px-8 py-3 rounded-full tracking-wider text-sm font-medium border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors duration-300"
                    >
                      {t("shop")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* BuyNowPopup */}
      {selectedPerfume?.product?.buy?.countries && (
        <BuyNowPopup
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedPerfume(null);
          }}
          countries={selectedPerfume.product.buy.countries}
          locale={locale}
        />
      )}
    </>
  );
}

