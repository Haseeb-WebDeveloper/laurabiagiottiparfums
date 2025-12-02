"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MainSplitText from "../ui/main-split-text";
import SplitText from "../ui/split-text";
import HtmlSplitText from "../ui/html-split-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  videoUrl: string;
  firstTitle: string;
  firstDesc: string;
  secondTitle: string;
  secondDesc: string;
}

const CollectionSectionTwo: React.FC<Props> = ({
  videoUrl,
  firstTitle,
  firstDesc,
  secondTitle,
  secondDesc,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);
  const secondTextMobileRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pinRef.current || !frameRef.current) return;

      const ease = "power2.out";

      // Determine if mobile based on window width
      const isMobile = window.innerWidth < 1024;

      // Initial state
      gsap.set(frameRef.current, {
        // Desktop: start centered in viewport; slight below-center for gentle lift-in
        // Mobile: start near top of section (small offset so it doesn't fully touch)
        yPercent: isMobile ? 0 : -45,
        x: 0,
        width: "72vw",
        height: "auto",
        left: "50%",
        top: isMobile ? "1vw" : "50%",
        xPercent: -50,
        // On mobile, keep the top edge visually fixed and shrink from the bottom only
        transformOrigin: isMobile ? "top center" : "center center",
        borderRadius: "10px",
      });

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(firstTextRef.current, { opacity: 0, y: 40 });
      gsap.set(secondTextRef.current, { opacity: 0, x: 40 });
      gsap.set(secondTextMobileRef.current, { opacity: 0, y: 24 });
      gsap.set(sectionRef.current, { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // increase it if you want to delay the animation
          pin: true,
          scrub: 0.6,
          anticipatePin: 0.1,
        },
      });

      // Stage 1: subtle lift to perfectly centered (desktop),
      // keep the frame's top position more stable on mobile so it
      // visually shrinks from the bottom.
      tl.to(
        frameRef.current,
        isMobile
          ? {
              // On mobile, keep yPercent at 0 so the top stays fixed;
              // we only prepare for later width/height changes.
              yPercent: 0,
              scale: 1,
              duration: 0.35,
            }
          : {
              // Desktop: subtle lift to perfectly centered
              yPercent: -50,
              scale: 1,
              duration: 0.35,
            }
      );

      // Stage 2: overlay + first text
      tl.to(overlayRef.current, { opacity: 0.45, duration: 0.4 }, "<").to(
        firstTextRef.current,
        { opacity: 1, y: 0, duration: 0.5 },
        "<+0.1"
      );

      // Stage 3: morph video and introduce second text (responsive)
      tl.addLabel("morphStart");
      tl.to(firstTextRef.current, { opacity: 0, duration: 0.3 }, "morphStart");

      // Desktop ≥ 1024px
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          tl.to(
            frameRef.current,
            {
              // dock to left edge at final stage
              left: 0,
              xPercent: 0,
              x: 0,
              width: "50vw",
              height: "100vh",
              yPercent: -50,
              duration: 0.8,
              borderRadius: 0,
            },
            "morphStart"
          )
            .to(overlayRef.current, { opacity: 0.18, duration: 0.4 }, "<")
            .to(
              secondTextRef.current,
              { opacity: 1, x: 0, duration: 0.45 },
              ">-0.1"
            );
          return () => {};
        },
        // Mobile < 1024px
        "(max-width: 1023px)": () => {
          tl.to(
            frameRef.current,
            {
              x: 0,
              width: "100vw",
              height: "50vh",
              top: "1vw", // Keep top fixed slightly below section top
              yPercent: 0, // No vertical offset
              duration: 0.8,
              borderRadius: 0,
            },
            "morphStart"
          )
            .to(overlayRef.current, { opacity: 0.18, duration: 0.4 }, "<")
            .to(
              secondTextMobileRef.current,
              { opacity: 1, y: 0, duration: 0.45 },
              ">-0.1"
            );
          return () => {};
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef }
  );

  // Handle window resize to refresh ScrollTrigger and update initial state
  useEffect(() => {
    const handleResize = () => {
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      // Update initial frame state based on new screen size
      if (frameRef.current) {
        const isMobile = window.innerWidth < 1024;
        gsap.set(frameRef.current, {
          top: isMobile ? "1vw" : "50%", // Mobile: slight offset from very top, Desktop: centered
          width: isMobile ? "75vw" : "72vw",
          yPercent: isMobile ? 0 : -45, // Mobile: no vertical offset, Desktop: centered
          transformOrigin: isMobile ? "top center" : "center center",
        });
      }

      // NEW: dynamically set pin height on mobile: 50vh (video) + text content
      if (pinRef.current && secondTextMobileRef.current) {
        const isMobile = window.innerWidth < 1024;
        if (!isMobile) {
          // Desktop: keep full screen
          pinRef.current.style.height = "100vh";
        } else {
          const textRect = secondTextMobileRef.current.getBoundingClientRect();
          const textHeight = textRect.height || 0;
          const gapPx = 48; // ~3rem gap between video and text

          const videoHeightPx = window.innerHeight * 0.5; // 50vh
          const totalHeight = videoHeightPx + gapPx + textHeight;

          pinRef.current.style.height = `${totalHeight}px`;
        }
      }
    };

    // Run once on mount
    handleResize();

    // Debounce resize to avoid too many refreshes
    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative invisible">
      <div ref={pinRef} className="sticky top-0 lg:h-screen overflow-hidden">
        {/* Animated video frame */}
        <div
          ref={frameRef}
          className="absolute lg:aspect-video aspect-[9/16] will-change-transform overflow-hidden"
          style={{
            // start roughly centered; GSAP will manage precise transforms
            left: "50%",
            // top: "50%",
            // transform: "translate(-50%, -45%)",
            // Initial width - GSAP will update this, but we set a default
            width:
              typeof window !== "undefined" && window.innerWidth < 1024
                ? "75vw"
                : "72vw",
            height: "auto",
            maxWidth: "100vw",
            transformOrigin: "center center",
          }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black"
            style={{ opacity: 0 }}
            aria-hidden
          />

          {/* First text over video */}
          <div
            ref={firstTextRef}
            className="absolute inset-x-0 bottom-[6%] text-center px-6 opacity-0"
          >
            <SplitText
              element="h2"
              text={firstTitle}
              className="block w-full text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-background custom-text-shadow"
              textAlign="center"
            />
            <SplitText
              element="p"
              text={firstDesc}
              className="block w-full mt-[-1vw] text-[clamp(0.95rem,1.4vw,1.15rem)] text-background custom-text-shadow"
              textAlign="center"
            />
          </div>
        </div>

        {/* Second text desktop (right column) */}
        <div
          ref={secondTextRef}
          className="hidden lg:flex flex-col absolute right-[6vw] top-1/2 -translate-y-1/2 max-w-[35vw] opacity-0"
        >
          <MainSplitText
            tag="h2"
            text={secondTitle}
            className="text-[clamp(1.6rem,2.5vw,2.3rem)] font-semibold text-foreground"
            textAlign="right"
            splitType="words, chars"
            delay={15}
            duration={0.5}
          />
          <MainSplitText
            tag="p"
            text={secondDesc}
            className="mt-4 text-[clamp(0.95rem,1.2vw,1.1rem)] lg:max-w-[65%] text-right ml-auto text-foreground"
            textAlign="right"
            splitType="words, chars"
            delay={15}
            duration={0.5}
          />
        </div>

        {/* Second text mobile (below video) */}
        <div
          ref={secondTextMobileRef}
          className="lg:hidden absolute px-6 w-full  opacity-0 flex flex-col items-center justify-start"
          // Position the mobile text just below the 50vh video height,
          // so it never overlaps the video and the gap is consistent
          style={{
            top: "calc(50vh + 3rem)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <SplitText
            element="h2"
            text={secondTitle}
            className="text-[20px] font-semibold text-center"
            textAlign="center"
          />
          <SplitText
            element="p"
            text={secondDesc}
            className="mt-2 text-[16px] opacity-90 text-center"
            textAlign="center"
          />
        </div>
      </div>
    </section>
  );
};

export default CollectionSectionTwo;
