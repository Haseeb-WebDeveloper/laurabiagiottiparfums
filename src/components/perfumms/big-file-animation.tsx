"use client";

import { SanityImage } from "@/types/perfume";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

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
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoHover, setIsVideoHover] = useState(false);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isVideo =
    file.asset.url.endsWith(".mp4") || file.asset.url.endsWith(".webm");

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
    setIsMuted(!isMuted);
  };

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
    });

    gsap.set(mediaElement, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderTopLeftRadius: "1000px",
      borderTopRightRadius: "1000px",
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
    }).to(
      mediaElement,
      {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
      },
      "<"
    ); // The "<" makes this animation start at the same time as the container animation

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isVideo]);

  return (
    <div className="flex justify-center items-center absolute left-0 w-full h-full">
      <div
        ref={containerRef}
        className={`relative lg:max-h-[calc(100vh-190px)] max-h-[55vh] ${className}`}
      >
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={file.asset.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <button
              onClick={togglePlay}
              className={`absolute cursor-pointer lg:bottom-10 lg:right-10 bottom-6 right-6 rounded-full flex items-center justify-center bg-background hover:bg-foreground p-4 aspect-square `}
              onMouseEnter={() => setIsVideoHover(true)}
              onMouseLeave={() => setIsVideoHover(false)}
            >
              {isMuted ? (
                <Image
                  src={isVideoHover ? "/icons/light-play.svg" : "/icons/play.svg"}
                  alt="pause"
                  width={32}
                  height={32}
                />
              ) : (
                <Image
                  src={isVideoHover ? "/icons/light-pause.svg" : "/icons/pause.svg"}
                  alt="play"
                  width={32}
                  height={32}
                />
              )}
            </button>
          </>
        ) : (
          <Image
            ref={imageRef}
            src={file.asset.url}
            alt="Animation media"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
