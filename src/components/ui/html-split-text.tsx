"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface HtmlSplitTextProps {
  htmlContent: string;
  className?: string;
  variant?: "paragraph" | "heading";
  element?: "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  textAlign?: React.CSSProperties["textAlign"];
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
}

const HtmlSplitText: React.FC<HtmlSplitTextProps & React.HTMLAttributes<HTMLElement>> = ({
  htmlContent,
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
    if (typeof window === "undefined" || !ref.current || !htmlContent) return;

    const el = ref.current;
    
    // Add a small delay for footer elements to avoid ScrollTrigger conflicts
    const isFooterElement = el.closest('footer');
    const initDelay = isFooterElement ? 200 : 0;

    let tl: gsap.core.Timeline;
    let splitter: GSAPSplitText;
    let targets: Element[];

    const initializeAnimation = () => {
      animationCompletedRef.current = false;

      // Configuration based on variant
      const baseConfig = variant === "paragraph"
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

      const absoluteLines = baseConfig.splitType === "lines";
      if (absoluteLines) el.style.position = "relative";

      try {
        splitter = new GSAPSplitText(el, {
          type: baseConfig.splitType,
          absolute: absoluteLines,
          linesClass: "split-line",
        });
      } catch (error) {
        console.error("Failed to create SplitText:", error);
        return;
      }

      switch (baseConfig.splitType) {
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
        const target = t as HTMLElement;
        target.style.overflow = "hidden";
        target.style.display = "inline-block";
      });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            el.style.visibility = "visible";
          },
          onLeave: () => {
            if (!animationCompletedRef.current) {
              animationCompletedRef.current = true;
              onAnimationComplete?.();
            }
          },
          onEnterBack: () => {
            el.style.visibility = "visible";
          },
          onLeaveBack: () => {
            el.style.visibility = "hidden";
          },
        },
        onComplete: () => {
          if (!animationCompletedRef.current) {
            animationCompletedRef.current = true;
            onAnimationComplete?.();
          }
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
      tl.set(targets, { ...baseConfig.from, immediateRender: false, force3D: true });
      tl.to(targets, {
        ...baseConfig.to,
        ease: baseConfig.ease,
        stagger: baseConfig.stagger,
        force3D: true,
      });

      // If active on mount (already within range), play the animation immediately
      if (isActiveOnMount) {
        tl.restart(true, false);
      }
    };

    // Initialize with delay for footer elements to avoid conflicts
    const timeoutId = setTimeout(initializeAnimation, initDelay);

    return () => {
      clearTimeout(timeoutId);
      if (tl) {
        tl.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (targets) {
        gsap.killTweensOf(targets);
      }
      if (splitter) {
        splitter.revert();
      }
    };
  }, [htmlContent, variant, onAnimationComplete]);

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
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      {...rest}
    />
  );
};

export default HtmlSplitText;
