"use client"

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxCard = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !imageRef.current || !cardRef.current) return;

        // Create parallax effect for the image
        gsap.to(imageRef.current, {
            y: "30%", // Image will move 30% of its height
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5, // Smooth scrubbing effect
            }
        });

        // Optional: Add a subtle rotate effect to the card
        gsap.to(cardRef.current, {
            rotateX: 5, // Slight rotation for depth
            rotateY: -5,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center py-20">
            <div 
                ref={cardRef}
                className="relative w-[400px] h-[600px] rounded-2xl bg-white/10 backdrop-blur-md overflow-hidden shadow-2xl border border-white/20"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Image container with parallax effect */}
                <div 
                    ref={imageRef}
                    className="absolute inset-0 w-full h-[120%] -top-[10%]" // Extra height for parallax movement
                    style={{
                        backgroundImage: "url('/3d-test.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        willChange: "transform"
                    }}
                />

                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h2 className="text-3xl font-bold mb-4">Parallax Effect</h2>
                        <p className="text-lg opacity-90">
                            Scroll to see the magical parallax effect in action. 
                            The image moves at a different speed than the card.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParallaxCard; 