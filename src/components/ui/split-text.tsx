"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: React.ReactNode;
  className?: string;
  variant?: "paragraph" | "heading";
  element?: "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  textAlign?: React.CSSProperties["textAlign"];
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
}

const SplitText: React.FC<SplitTextProps & React.HTMLAttributes<HTMLElement>> = ({
  text,
  className = "",
  variant = "paragraph",
  textAlign = "left",
  element = "div",
  style,
  onAnimationComplete,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | HTMLParagraphElement | null>(null);
  const animationCompletedRef = useRef(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || !text) return;

    const el = ref.current;

    animationCompletedRef.current = false;

    // Configuration based on variant
    const config =
      variant === "paragraph"
        ? {
            splitType: "lines" as const,
            from: {
              opacity: 0,
              y: "2rem",
            },
            to: {
              opacity: 1,
              y: 0,
            },
            stagger: 0.1,
            ease: "power3.out",
          }
        : {
            splitType: "words" as const,
            from: {
              opacity: 0,
              y: "2rem",
            },
            to: {
              opacity: 1,
              y: "0",
            },
            stagger: 0.1,
            ease: "power3.out",
          };

    const absoluteLines = config.splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    let splitter: GSAPSplitText;
    try {
      splitter = new GSAPSplitText(el, {
        type: config.splitType,
        absolute: absoluteLines,
        linesClass: "split-line",
      });
    } catch (error) {
      console.error("Failed to create SplitText:", error);
      return;
    }

    let targets: Element[];
    switch (config.splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      default:
        targets = splitter.chars;
    }

    if (!targets || targets.length === 0) {
      console.warn("No targets found for SplitText animation");
      splitter.revert();
      return;
    }

    targets.forEach((t) => {
      (t as HTMLElement).style.willChange = "transform, opacity";
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "restart none none reverse",
        markers: false,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          scrollTriggerRef.current = self;
        },
        onEnter: () => {
          el.style.visibility = "visible";
        },
        onLeaveBack: () => {
          // Hide when scrolling above trigger so the text doesn't flash
          el.style.visibility = "hidden";
        },
        onRefreshInit: (self) => {
          // Before refresh, default to hidden to avoid flash
          el.style.visibility = "hidden";
        },
        onRefresh: (self) => {
          // After refresh, if the trigger is active (already in range), show it
          if (self && (self as ScrollTrigger).isActive) {
            el.style.visibility = "visible";
          }
        },
      },
      smoothChildTiming: true,
      onComplete: () => {
        animationCompletedRef.current = true;
        gsap.set(targets, {
          ...config.to,
          clearProps: "willChange",
          immediateRender: true,
        });
        onAnimationComplete?.();
      },
    });

    // If already in view on mount, ensure visible and start animation immediately
    const st = tl.scrollTrigger as ScrollTrigger | null;
    const isActiveOnMount = !!(st && st.isActive);
    if (isActiveOnMount) {
      el.style.visibility = "visible";
    }

    // Set initial values for targets; keep container hidden until ScrollTrigger onEnter
    if (!isActiveOnMount) {
      el.style.visibility = "hidden";
    }
    tl.set(targets, { ...config.from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...config.to,
      ease: config.ease,
      stagger: config.stagger,
      force3D: true,
    });

    // If active on mount (already within range), play the animation immediately
    if (isActiveOnMount) {
      tl.restart(true, false);
    }

    return () => {
      tl.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      gsap.killTweensOf(targets);
      if (splitter) {
        splitter.revert();
      }
    };
  }, [text, variant, onAnimationComplete]);

  const Component = element;

  // Ensure no initial flash: default to hidden unless user overrides visibility
  const mergedStyle: React.CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    ...style,
  };
  if (mergedStyle.visibility === undefined) {
    mergedStyle.visibility = "hidden";
  }

  return (
    <Component
      ref={ref}
      className={`split-parent ${className}`}
      style={mergedStyle}
      {...rest}
    >
      {text}
    </Component>
  );
};

export default SplitText;
