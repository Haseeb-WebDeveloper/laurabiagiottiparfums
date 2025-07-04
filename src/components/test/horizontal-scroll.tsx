"use client"

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const cards = [
        {
            id: 1,
            title: "Digital Innovation",
            description: "Transforming ideas into digital reality with cutting-edge technology and innovative solutions.",
            image: "/3d-test.webp",
            category: "Technology"
        },
        {
            id: 2,
            title: "Creative Design",
            description: "Crafting beautiful and functional designs that captivate and engage users across platforms.",
            image: "/3d-test-2.webp",
            category: "Design"
        },
        {
            id: 3,
            title: "User Experience",
            description: "Creating seamless and intuitive experiences that delight users and drive engagement.",
            image: "/note.webp",
            category: "UX"
        },
        {
            id: 4,
            title: "Development",
            description: "Building robust and scalable solutions with modern technologies and best practices.",
            image: "/3d-test.webp",
            category: "Development"
        },
        {
            id: 5,
            title: "Strategy",
            description: "Developing comprehensive digital strategies that drive growth and innovation.",
            image: "/3d-test-2.webp",
            category: "Strategy"
        }
    ];

    useEffect(() => {
        const container = containerRef.current;
        const trigger = triggerRef.current;
        if (!container || !trigger) return;

        // Calculate the scroll width once
        const totalWidth = container.scrollWidth;
        const windowWidth = window.innerWidth;
        const distance = totalWidth - windowWidth;

        // Create timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top top",
                end: () => `+=${distance * 0.7}`, // Adjust multiplier to control speed
                pin: true,
                scrub: true, // Smooth scrubbing, defaults to 1
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: false
            }
        });

        // Add animation to timeline
        tl.to(container, {
            x: -distance,
            ease: "none",
            duration: 1
        });

        return () => {
            tl.scrollTrigger?.kill();
        };
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="relative bg-black text-white overflow-hidden"
        >
            {/* Trigger element */}
            <div ref={triggerRef} className="relative h-screen">
                {/* Container that moves horizontally */}
                <div 
                    ref={containerRef}
                    className="absolute top-0 left-0 h-screen flex items-center gap-4 p-8"
                    style={{ 
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitTransform: 'translateZ(0)'
                    }}
                >
                    {cards.map((card, index) => (
                        <div
                            key={card.id}
                            className="relative flex-shrink-0 w-[450px] h-[600px] rounded-2xl overflow-hidden group"
                            style={{
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            {/* Background Image */}
                            <div 
                                className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    backgroundImage: `url(${card.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    willChange: 'transform',
                                    transform: 'translateZ(0)'
                                }}
                            />
                            
                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                    <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full">
                                        {card.category}
                                    </span>
                                    <h3 className="text-3xl font-bold mb-4">
                                        {card.title}
                                    </h3>
                                    <p className="text-lg opacity-90 line-clamp-3">
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HorizontalScroll; 