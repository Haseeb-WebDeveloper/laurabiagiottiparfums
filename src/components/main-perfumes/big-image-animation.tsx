"use client";

import { SanityImage } from "@/types/perfume";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

interface BigImageAnimationProps {
  file: {
    asset: SanityImage;
  };
  className?: string;
}

export default function BigImageAnimation({
  file,
  className = "",
}: BigImageAnimationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isVideo =
    file.asset.url.endsWith(".mp4") || file.asset.url.endsWith(".webm");

  useGSAP(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const mediaElement = isVideo ? videoRef.current : imageRef.current;
    const container = containerRef.current;

    if (!mediaElement || !container) return;

    // Set initial styles
    gsap.set(container, {
      width: "20%",
      height: "20vh",
      overflow: "hidden",
      borderTopLeftRadius: "1000px",
      borderTopRightRadius: "1000px",
    });

    gsap.set(mediaElement, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    });

    const end = isDesktop ? "bottom 110%" : "bottom 90%";

    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 130%",
        end: end,
        scrub: 1,
      },
    });

    tl.to(container, {
      width: "100%",
      height: "100vh",
      borderTopLeftRadius: "0px",
      borderTopRightRadius: "0px",
    }).to(mediaElement, {}, "<"); // The "<" makes this animation start at the same time as the container animation

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isVideo]);

  return (
    <div className="flex justify-center items-center absolute left-0 w-full h-full  z-10">
      <div
        ref={containerRef}
        className={`relative lg:h-[200vh] bg-[#252525] h-fit max-h-[55vh] lg:max-h-none ${className} flex justify-center items-center`}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={file.asset.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div>
            <Image
              ref={imageRef}
              src={file.asset.url}
              alt="Animation media"
              width={1000}
              height={1000}
              className="w-full h-full object-contain max-h-[480px]"
            />
            <div className="w-full flex justify-center">
              <button className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-ring hover:bg-ring transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
