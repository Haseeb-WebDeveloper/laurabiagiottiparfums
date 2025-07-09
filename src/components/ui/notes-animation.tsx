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

  console.log(notes);

  useEffect(() => {
    setInitialX(window.innerWidth + 300);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);

    // Calculate positions for each card based on notes length
    const positions =
      notes?.length === 4
        ? [
            { x: -450 }, // 4th card position
            { x: -150 }, // 3rd card position
            { x: 150 }, // 2nd card position
            { x: 450 }, // 1st card position
          ]
        : [
            { x: -340 }, // 3rd card position
            { x: 0 }, // 2nd card position
            { x: 340 }, // 1st card position
          ];

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
  }, []);

  return (
    <div className="w-full">
      <div ref={containerRef} className="h-[120vh] relative">
        <h2 className="mb-[6rem]">{header}</h2>
        <div className="sticky top-0  h-screen  flex items-start justify-center">
          {/* horixantal string */}
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
              <div className="group ">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
