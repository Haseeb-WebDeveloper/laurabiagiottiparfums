"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SanityImage } from "@/types/perfume";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Notes {
  image: {
    asset: SanityImage;
  };
  title: string;
  notes: { name: string }[];
}

export default function NotesAnimation({
  notes,
  header,
}: {
  notes: Notes[];
  header: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [initialX, setInitialX] = useState(2000); // Safe default value
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setInitialX(window.innerWidth + 300);
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);

    // Calculate positions for each card based on notes length and screen size
    let positions;

    if (isDesktop) {
      // Desktop: horizontal layout
      positions =
        notes?.length === 4
          ? [
              { x: -450, y: 0 }, 
              { x: -150, y: 0 }, 
              { x: 150, y: 0 }, 
              { x: 450, y: 0 }, 
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
              { x: 0, y: -300 }, 
              { x: 0, y: -100 }, 
              { x: 0, y: 100 }, 
              { x: 0, y: 300 }, 
            ]
          : [
              { x: 0, y: 0 }, 
              { x: 0, y: 300 }, 
              { x: 0, y: 600 }, 
            ];
    }

    // Timeline for initial animation (entering the screen)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 120%",
        end: "bottom center",
        scrub: 1,
      },
    });

    // First part: Cards come to their positions
    tl.to(cards, {
      x: (index) => positions[index].x,
      y: (index) => positions[index].y,
      stagger: {
        amount: 0.08,
        from: "start",
      },
      duration: 0.4,
      ease: "power2.out",
    })
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isDesktop, notes?.length]);

  return (
    <div className="w-full">
      <div ref={containerRef} className=" relative">
        <h2 className="lg:mb-[6rem] mb-[5rem]">{header}</h2>
        <div className="sticky top-0 lg:h-[40rem] h-[80rem] flex items-start justify-center">
          {/* horizontal string */}
          <div className="absolute top-[13%] left-0 w-full h-[1px] bg-foreground/10"></div>

          {notes?.map((note, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="absolute"
              style={{
                transform: `translate3d(${initialX}px, 0, ${index * 10}px)`,
                willChange: "transform",
              }}
            >
              <div className="group md:block">
                {/* Desktop layout: image and text stacked vertically */}
                <div className="hidden md:block">
                  <Image
                    src={note.image.asset.url}
                    alt={note.title}
                    width={500}
                    height={500}
                    className="group-hover:shadow-[30px_30px_84px_rgba(180,133,94,0.45)] transition-all duration-300 w-full h-full max-w-[200px] max-h-[200px] aspect-square object-cover rounded-full"
                  />
                  <h3 className="mt-[2rem]">{note.title}</h3>
                  <div className="mt-[1rem] flex flex-col gap-[0.5rem]">
                    {note.notes.map((note, key) => (
                      <p key={key}>{note.name}</p>
                    ))}
                  </div>
                </div>

                {/* Mobile/Tablet layout: image on left, text on right */}
                <div className="flex md:hidden gap-[1.5rem]">
                  <Image
                    src={note.image.asset.url}
                    alt={note.title}
                    width={500}
                    height={500}
                    className="group-hover:shadow-[30px_30px_84px_rgba(180,133,94,0.45)] transition-all duration-300 lg:w-[120px] lg:h-[120px] w-[90px] h-[90px] aspect-square object-cover rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="mb-[1rem]">{note.title}</h3>
                    <div className="flex flex-col gap-[0.5rem]">
                      {note.notes.map((note, key) => (
                        <p key={key}>{note.name}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
