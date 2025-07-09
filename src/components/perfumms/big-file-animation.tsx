"use client";

import { SanityImage } from "@/types/perfume";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BigFileAnimationProps {
  file: {
    asset: SanityImage;
  };
  className?: string;
}

export default function BigFileAnimation({
  file,
  className = "",
}: BigFileAnimationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Set initial styles
    gsap.set(container, {
      width: "20%",
      height: "20vh",
      overflow: "hidden",
    });

    gsap.set(video, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "1000px",
    });

    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 130%",
        end: "bottom 110%",
        scrub: 1,
      },
    });

    tl.to(container, {
      width: "100%",
      height: "100vh",
    }).to(
      video,
      {
        borderRadius: "0px",
      },
      "<"
    ); // The "<" makes this animation start at the same time as the container animation

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="flex justify-center items-center absolute left-0 w-full h-full">
      <div ref={containerRef} className={`relative max-h-[75vh] ${className}`}>
        <video
          ref={videoRef}
          src={file.asset.url}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
