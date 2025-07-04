"use client"

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GSAPCardsAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [initialX, setInitialX] = useState(2000); // Safe default value

    useEffect(() => {
        setInitialX(window.innerWidth + 300);
    }, []);

    const cardsData = [
        {
            id: 1,
            icon: "⚡",
            title: "Performance",
            description: "Lightning-fast loading speeds and optimized performance for the best user experience."
        },
        {
            id: 2,
            icon: "🎨",
            title: "Design",
            description: "Beautiful, modern designs that captivate users and drive engagement."
        },
        {
            id: 3,
            icon: "🚀",
            title: "Innovation",
            description: "Cutting-edge solutions that push the boundaries of what's possible."
        },
        {
            id: 4,
            icon: "🔒",
            title: "Security",
            description: "Enterprise-grade security features ensuring your data stays protected at all times."
        }
    ];

    useEffect(() => {
        if (!containerRef.current) return;

        const cards = cardsRef.current.filter(Boolean);
        
        // Calculate positions for each card
        const positions = [
            { x: -450 },  // 4th card position
            { x: -150 },  // 3rd card position
            { x: 150 },   // 2nd card position
            { x: 450 }    // 1st card position
        ];

        // Timeline for initial animation (entering the screen)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
            }
        });

        // First part: Cards come to their positions
        tl.to(cards, {
            x: (index) => positions[index].x,
            stagger: {
                amount: 0.2,
                from: "start"
            },
            duration: 0.4,
            ease: "power2.out"
        })
        // Second part: Cards move off-screen to the left
        .to(cards, {
            x: -window.innerWidth - 300,
            stagger: {
                amount: 0.2,
                from: "start"
            },
            duration: 0.4,
            ease: "power2.in"
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="w-full">
            <div ref={containerRef} className="h-[200vh] relative">
                <div className="sticky top-0 h-screen bg-red-500 overflow-hidden flex items-center justify-center">
                    {cardsData.map((card, index) => (
                        <div
                            key={card.id}
                            ref={el => {
                                cardsRef.current[index] = el;
                            }}
                            className="absolute w-80 h-96 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col justify-between text-white"
                            style={{
                                transform: `translate3d(${initialX}px, 0, ${index * 10}px)`,
                                willChange: 'transform'
                            }}
                        >
                            <div className="text-5xl mb-4">{card.icon}</div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3 leading-tight">
                                    {card.title}
                                </h3>
                                <p className="text-sm leading-relaxed opacity-90">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GSAPCardsAnimation;