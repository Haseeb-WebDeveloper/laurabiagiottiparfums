"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MainSplitText from "../ui/main-split-text";

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
        // start centered in viewport; slight below-center for gentle lift-in
        yPercent: -45,
        x: 0,
        width: "72vw",
        height: "auto",
        left: "50%",
        top: isMobile ? "37%" : "50%",
        xPercent: -50,
        transformOrigin: "center center",
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
          end: "+=250%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 0.1,
        },
      });

      // Stage 1: subtle lift to perfectly centered
      tl.to(frameRef.current, { yPercent: -50, scale: 1, duration: 0.35 });

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
              height: "60vh",
              yPercent: -50,
              xPercent: -50, // keep centered horizontally until width reaches 100vw
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

  return (
    <section ref={sectionRef} className="relative invisible">
      <div ref={pinRef} className="sticky top-0 lg:h-screen h-[100dvh] overflow-hidden ">
        {/* Animated video frame */}
        <div
          ref={frameRef}
          className="absolute lg:aspect-video aspect-[9/16] will-change-transform overflow-hidden"
          style={{
            // start roughly centered; GSAP will manage precise transforms
            left: "50%",
            // top: "50%",
            // transform: "translate(-50%, -45%)",
            width: window.innerWidth < 1024 ? "75vw" : "72vw",
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
            <MainSplitText
              tag="h2"
              text={firstTitle}
              className="block w-full text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-background custom-text-shadow"
              splitType="words"
              delay={30}
              duration={0.5}
              textAlign="center"
            />
            <MainSplitText
              tag="p"
              text={firstDesc}
              className="block w-full mt-[-1vw] text-[clamp(0.95rem,1.4vw,1.15rem)] text-background custom-text-shadow"
              splitType="words"
              delay={15}
              duration={0.45}
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
            splitType="words, chars"
            delay={22}
            duration={0.5}
            textAlign="right"
          />
          <MainSplitText
            tag="p"
            text={secondDesc}
            className="mt-4 text-[clamp(0.95rem,1.2vw,1.1rem)] lg:max-w-[65%] text-right ml-auto text-foreground"
            splitType="words, chars"
            delay={12}
            duration={0.45}
            textAlign="right"
          />
        </div>

        {/* Second text mobile (bottom) */}
        <div
          ref={secondTextMobileRef}
          className="lg:hidden absolute left-0 right-0 bottom-6 px-6 opacity-0"
        >
          <MainSplitText
            tag="h2"
            text={secondTitle}
            className="text-[clamp(1.2rem,6vw,1.6rem)] font-semibold text-center"
            splitType="words, chars"
            delay={20}
            duration={0.5}
            textAlign="center"
          />
          <MainSplitText
            tag="p"
            text={secondDesc}
            className="mt-2 text-[clamp(0.9rem,3.6vw,1rem)] opacity-90 text-center"
            splitType="words, chars"
            delay={10}
            duration={0.45}
            textAlign="center"
          />
        </div>
      </div>
    </section>
  );
};

export default CollectionSectionTwo;
