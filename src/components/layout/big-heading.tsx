"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

export default function BigHeading({ title, textClass }: { title: string, textClass?: string }) {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const textElement = `.${textClass}`

  useGSAP(() => {
    // Create horizontal scroll animation
    gsap.to(textElement, {
      x: "-100%", // Move text completely off screen to the left
      ease: "none",
      scrollTrigger: {
        trigger: textElement,
        start: isMobile ? "top bottom" : "top bottom",
        end: isMobile ? "bottom 50%" : "bottom 20%",
        scrub: 1, // Smooth scrolling animation
      },
    });
  });

  return (
    <div className="overflow-hidden">
      <h1
        className={`lg:mt-[7rem] mt-[4rem] lg:text-[10rem] text-[8rem] text-nowrap whitespace-nowrap ${textClass}`}
        style={{
          transform: "translateX(100%)", // Start from right side of screen
          width: "max-content", // Ensure the element takes only the width it needs
        }}
      >
        {title}
      </h1>
    </div>
  );
}
