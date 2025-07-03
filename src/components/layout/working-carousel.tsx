"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { gsap } from "gsap";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";

export const WorkingCarousel = ({
    media = [],
    className,
}: any) => {
    const [scrollSpeed, setScrollSpeed] = useState(2);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const [cursorVisible, setCursorVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


    // Check mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => window.innerWidth <= 768;
        setIsMobile(checkMobile());
        setScrollSpeed(checkMobile() ? 1 : 2);

        const handleResize = () => {
            const mobile = checkMobile();
            setIsMobile(mobile);
            setScrollSpeed(mobile ? 1 : 2);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const cursor = cursorRef.current;

        if (!container || !cursor) return;

        // Check if the device is mobile
        const checkMobile = () => window.innerWidth <= 768;
        setIsMobile(checkMobile());

        // Function to update cursor position
        const updateCursorPosition = () => {
            if (checkMobile() || !cursorVisible) return;

            const rect = container.getBoundingClientRect();
            const x = mousePosition.x - rect.left;
            const y = mousePosition.y - rect.top;

            // Only update if cursor is within container bounds
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                gsap.to(cursor, {
                    left: x,
                    top: y,
                    duration: 0.1,
                    ease: "power2.out"
                });
            }
        };

        // Cursor follower logic (only for desktop)
        const handleMouseMove = (e: MouseEvent) => {
            if (checkMobile()) return;
            
            // Update mouse position
            setMousePosition({ x: e.clientX, y: e.clientY });
            
            if (!cursorVisible) setCursorVisible(true);

            // Get container bounds
            const rect = container.getBoundingClientRect();

            // Calculate cursor position relative to the container
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Animate cursor to follow mouse with slight delay for smooth effect
            gsap.to(cursor, {
                left: x,
                top: y,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        const handleMouseEnter = () => {
            if (checkMobile()) return;
            
            setCursorVisible(true);

            // Fade in cursor
            gsap.to(cursor, {
                opacity: 1,
                scale: 1,
                duration: 0.1,
                ease: "power2.out",
                scrub: 0.1
            });
        };

        const handleMouseLeave = () => {
            if (checkMobile()) return;
            
            setCursorVisible(false);

            // Fade out cursor
            gsap.to(cursor, {
                opacity: 0,
                duration: 0.1,
                ease: "power2.in",
                scrub: 0.1,
                onComplete: () => {
                    if (cursor) cursor.style.opacity = "0";
                }
            });
        };

        const handleResize = () => {
            setIsMobile(checkMobile());
        };

        const handleScroll = () => {
            // Update cursor position during scroll
            updateCursorPosition();
        };

        // Add event listeners
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        // Check if we're in or out of viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && cursorVisible) {
                    setCursorVisible(false);
                    gsap.set(cursor, { opacity: 0, scale: 0 });
                }
            });
        }, { threshold: 0.1 });

        observer.observe(container);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, [cursorVisible, mousePosition]);

    return (
        <section ref={containerRef} className={`overflow-hidden relative cursor-none ${className || ''}`}>
            {/* Cursor follower - only show on desktop */}
            {!isMobile && (
                <div
                    ref={cursorRef}
                    className="pointer-events-none fixed bg-[#2112D4] -rotate-[30deg] p-[0.5vw] md:w-[7vw] w-[18vw] md:h-[7vw] h-[18vw] md:text-[1.2vw] text-[3.5vw] opacity-0 flex items-center justify-center text-white font-medium z-50"
                    style={{
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        position: 'absolute',
                        left: -100,
                        top: -100,
                        opacity: 0,
                    }}
                >
                    Explore
                </div>
            )}
            
            <div className="mx-auto flex flex-col items-center gap-10">
                
                <div className="w-full">
                    <div className="relative mx-auto flex items-center justify-center">
                        <Carousel
                            opts={{
                                loop: true,
                                align: "center",
                            }}
                            plugins={[
                                AutoScroll({
                                    playOnInit: true,
                                    speed: scrollSpeed,
                                    stopOnInteraction: false,
                                    stopOnMouseEnter: false,
                                    direction: "forward",
                                }),
                            ]}
                            className="w-full cursor-none"
                        >
                            <CarouselContent className="md:-ml-4">
                                {[...media, ...media].map((media, index) => (
                                    <CarouselItem
                                        key={`${media.enTitle}-${index}`}
                                        className="flex pl-4 md:pl-4 basis-auto cursor-none"
                                    >
                                        <div className="flex items-center justify-center">
                                            <img
                                                src={media.asset.url}
                                                alt={''}
                                                className={`${media.className || ''} select-none  w-auto object-contain`}
                                                style={{
                                                    height: isMobile? "60vw" : "33vw"
                                                }}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
};