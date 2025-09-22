"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { Note } from "@/types/notes";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function NotesAnimation({
  notes,
  header,
  locale,
}: {
  notes: Note[];
  header?: string;
  locale?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Function to initialize the animation
  const initAnimation = () => {
    const container = containerRef.current;
    const trigger = triggerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!container || !trigger || !cards.length) return;

    // Check if it's desktop
    const isDesktop = window.innerWidth >= 768;
    setIsDesktop(isDesktop);

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.scrollTrigger?.kill();
      timelineRef.current.kill();
    }

    // Calculate positions for each card based on notes length and screen size
    let positions;
    if (isDesktop) {
      // Desktop: horizontal layout
      positions =
        notes?.length === 4
          ? [
              { x: -500, y: 0 },
              { x: -167, y: 0 },
              { x: 167, y: 0 },
              { x: 500, y: 0 },
            ]
          : [
              { x: -340, y: 0 },
              { x: 0, y: 0 },
              { x: 340, y: 0 },
            ];
    } else {
      // Mobile/Tablet: vertical layout
      positions =
        notes?.length === 4
          ? [
              { x: 10, y: -300 },
              { x: 10, y: -100 },
              { x: 10, y: 100 },
              { x: 10, y: 300 },
            ]
          : [
              { x: 10, y: 0 },
              { x: 10, y: 250 },
              { x: 10, y: 500 },
            ];
    }

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 120%",
        end: "bottom center",
        scrub: 1,
      },
    });

    // First part: Cards come to their positions
    tl.fromTo(
      cards,
      {
        x: (index) => window.innerWidth + 300,
        y: (index) => positions[index].y,
      },
      {
        x: (index) => positions[index].x,
        y: (index) => positions[index].y,
        stagger: {
          amount: 0.08,
          from: "start",
        },
        duration: 0.4,
        ease: "power2.out",
      }
    )
      // Second part: Cards move off-screen to the left
      .to(cards, {
        x: -window.innerWidth - 300,
        y: (index) => positions[index].y, // Maintain vertical position while moving left
        stagger: {
          amount: 0.08,
          from: "start",
        },
        duration: 0.4,
        ease: "power2.in",
      });

    // Store timeline reference
    timelineRef.current = tl;
  };

  useEffect(() => {
    // Handler for the columnHeightSet event
    const handleColumnHeightSet = () => {
      // Small delay to ensure DOM is settled
      setTimeout(() => {
        initAnimation();
        ScrollTrigger.refresh();
      }, 100);
    };

    // Listen for the columnHeightSet event
    window.addEventListener("columnHeightSet", handleColumnHeightSet);

    // Initialize animation immediately as well
    initAnimation();

    return () => {
      window.removeEventListener("columnHeightSet", handleColumnHeightSet);
      if (timelineRef.current) {
        timelineRef.current.scrollTrigger?.kill();
        timelineRef.current.kill();
      }
    };
  }, [notes?.length]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      initAnimation();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={triggerRef}
        className=" lg:h-[800px] md:h-[1000px] h-[1200px] flex flex-col "
      >
        <div className="2xl:px-[34px] md:px-[38px] px-[18px]">
          <h2 className="max-w w-full lg:mb-[6rem] mb-[5rem] text-[3rem] font-[700]">
            {header}
          </h2>
        </div>
        <div
          ref={containerRef}
          className={`sticky top-0 lg:h-[40rem] h-[80rem] flex items-start justify-center
            ${notes[0].perfumeNotes ? "mt-[15rem] lg:mt-0" : ""}
            `}
        >
          {/* horizontal string */}
          <div className="hidden md:block absolute lg:top-[16%] md:top-[15%] left-1/2 -translate-x-1/2 w-full h-[1px] max-w-[1344px] mx-auto  2xl:px-[34px] md:px-[38px] px-[18px]">
            <div className="w-full h-[1px] bg-foreground/10"></div>
          </div>

          {notes?.map((note, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="absolute"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="group md:block">
                {/* Desktop layout: image and text stacked vertically */}
                <div className="hidden md:block">
                  <Image
                    src={note.image.asset.url}
                    alt={note.title || note.name || ""}
                    width={500}
                    height={500}
                    className="group-hover:shadow-[30px_30px_84px_rgba(180,133,94,0.45)] opacity-80 group-hover:opacity-100 transition-all duration-300 w-full h-full xl:max-w-[200px] xl:max-h-[200px] max-w-[150px] max-h-[150px] aspect-square object-cover rounded-full"
                  />
                  {note.title && (
                    <h3 className="mt-[2rem] text-[2rem] font-[700] leading-[120%] tracking-wider">
                      {note.title.split(" ").length > 2 ? (
                        <>
                          {note.title.split(" ")[0]}
                          <br />
                          {note.title.split(" ").slice(1).join(" ")}
                        </>
                      ) : (
                        note.title
                      )}
                    </h3>
                  )}
                  {note.name && (
                    <h3 className="mt-[2rem] text-[2rem] font-[700]">
                      {note.name}
                    </h3>
                  )}
                  {note.notes && (
                    <div className="mt-[1rem] flex flex-col gap-[0.5rem]">
                      {note.notes?.map((note, key) => (
                        <p key={key}>{note.name}</p>
                      ))}
                    </div>
                  )}
                  {note.perfumeNotes && (
                    <div className="mt-[1.1rem] flex flex-col gap-[0.3rem]">
                      {note.perfumeNotes?.map((note, key) => (
                        <Link
                          className="text-[0.9rem] font-[400]"
                          href={`/${locale}/${note.category}-perfume/${note.slug}`}
                          key={key}
                        >
                          {note.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile/Tablet layout: image on left, text on right */}
                <div className="flex md:hidden gap-[1.5rem] w-[90vw]">
                  <Image
                    src={note.image.asset.url}
                    alt={note.title || note.name || ""}
                    width={500}
                    height={500}
                    className="group-hover:shadow-[30px_30px_84px_rgba(180,133,94,0.45)] opacity-80 group-hover:opacity-100 transition-all duration-300 lg:w-[100px] lg:h-[100px] md:w-[10px] md:h-[10px] w-[90px] h-[90px] aspect-square object-cover rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="mb-[1rem] text-[1.9rem] font-[700]">
                      {note.title || note.name || ""}
                    </h3>
                    <div className="flex flex-col gap-[0.5rem]">
                      {note.notes && (
                        <div className="flex flex-col gap-[0.5rem]">
                          {note.notes?.map((note, key) => (
                            <p key={key}>{note.name}</p>
                          ))}
                        </div>
                      )}

                      {note.perfumeNotes && (
                        <div className="flex flex-col gap-[0.5rem]">
                          {note.perfumeNotes?.map((note, key) => (
                            <Link
                              className="text-[0.9rem] font-[400]"
                              href={`/${locale}/${note.category}-perfume/${note.slug}`}
                              key={key}
                            >
                              {note.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
