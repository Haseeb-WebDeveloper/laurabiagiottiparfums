"use client";

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

interface HeroSlide {
  title: string;
  description: string;
  image: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ 
  slides, 
  autoPlayInterval = 4000 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;

  // Auto-play functionality
  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      goToNextSlide();
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Navigation functions
  const goToNextSlide = () => {
    if (isAnimating) return;
    const nextIndex = (currentIndex + 1) % totalSlides;
    goToSlide(nextIndex);
  };

  const goToPreviousSlide = () => {
    if (isAnimating) return;
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
  };

  const goToSlide = (targetIndex: number) => {
    if (targetIndex === currentIndex || isAnimating) return;
    
    setIsAnimating(true);
    
    const container = containerRef.current;
    if (!container) return;

    const currentSlide = container.querySelector(`[data-slide="${currentIndex}"]`) as HTMLElement;
    const targetSlide = container.querySelector(`[data-slide="${targetIndex}"]`) as HTMLElement;
    
    if (!currentSlide || !targetSlide) return;

    const isNext = targetIndex > currentIndex || (currentIndex === totalSlides - 1 && targetIndex === 0);
    
    // Set initial positions
    gsap.set(targetSlide, { 
      display: 'block',
      x: isNext ? '100%' : '-100%' 
    });

    // Create timeline for smooth animation
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentSlide, { display: 'none', x: '0%' });
        setCurrentIndex(targetIndex);
        setIsAnimating(false);
      }
    });

    // Animate slides
    tl.to(currentSlide, {
      x: isNext ? '-100%' : '100%',
      duration: 1.2,
      ease: "power3.inOut"
    }, 0)
    .to(targetSlide, {
      x: '0%',
      duration: 1.2,
      ease: "power3.inOut"
    }, 0);

    // Animate text content
    const currentTitle = currentSlide.querySelector('.slide-title');
    const currentContent = currentSlide.querySelector('.slide-content');
    const targetTitle = targetSlide.querySelector('.slide-title');
    const targetContent = targetSlide.querySelector('.slide-content');

    if (currentTitle && currentContent) {
      tl.to([currentTitle, currentContent], {
        y: isNext ? -50 : 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        stagger: 0.1
      }, 0);
    }

    if (targetTitle && targetContent) {
      gsap.set([targetTitle, targetContent], { 
        y: isNext ? 50 : -50, 
        opacity: 0 
      });
      
      tl.to([targetTitle, targetContent], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1
      }, 0.4);
    }
  };

  // Initialize component
  useEffect(() => {
    if (!containerRef.current || slides.length === 0) return;

    const container = containerRef.current;
    
    // Set initial state for all slides
    const allSlides = container.querySelectorAll('[data-slide]') as NodeListOf<HTMLElement>;
    allSlides.forEach((slide, index) => {
      if (index === 0) {
        gsap.set(slide, { display: 'block', x: '0%' });
        const title = slide.querySelector('.slide-title');
        const content = slide.querySelector('.slide-content');
        if (title && content) {
          gsap.set([title, content], { y: 0, opacity: 1 });
        }
      } else {
        gsap.set(slide, { display: 'none', x: '100%' });
        const title = slide.querySelector('.slide-title');
        const content = slide.querySelector('.slide-content');
        if (title && content) {
          gsap.set([title, content], { y: 50, opacity: 0 });
        }
      }
    });

    startAutoPlay();

    return () => {
      stopAutoPlay();
    };
  }, [slides.length]);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [currentIndex]);

  if (slides.length === 0) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slides Container */}
      <div ref={containerRef} className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            data-slide={index}
            className="absolute inset-0 h-full w-full"
            style={{ display: index === 0 ? 'block' : 'none' }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="max-w-2xl">
                  {/* Title */}
                  <h1 className="slide-title text-4xl font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="slide-content text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div className="slide-content flex flex-col sm:flex-row gap-4">
                    {/* Primary CTA */}
                    <button
                      onClick={() => console.log('Buy clicked for:', slide.title)}
                      className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
                    >
                      Buy Now
                    </button>

                    {/* Secondary CTA */}
                    <button
                      onClick={() => console.log('Read more clicked for:', slide.title)}
                      className="group px-8 py-4 text-white font-semibold flex items-center gap-2 hover:gap-4 transition-all duration-300"
                    >
                      <span>Read More</span>
                      <div className="w-8 h-[2px] bg-white transition-all duration-300 group-hover:w-12" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-6 lg:left-8 z-20">
        <div className="flex items-center gap-8">
          {/* Arrow Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                stopAutoPlay();
                goToPreviousSlide();
                startAutoPlay();
              }}
              className="w-12 h-12 flex items-center justify-center text-white hover:text-white/70 transition-colors duration-300"
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="rotate-0">
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                stopAutoPlay();
                goToNextSlide();
                startAutoPlay();
              }}
              className="w-12 h-12 flex items-center justify-center text-white hover:text-white/70 transition-colors duration-300"
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Progress and Counter */}
          <div className="flex items-center gap-6">
            {/* Progress Bar */}
            <div className="w-24 h-[2px] bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500 ease-out rounded-full"
                style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>

            {/* Slide Counter */}
            <div className="text-white font-semibold text-sm">
              <span className="text-xl">
                {(currentIndex + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-white/60 mx-1">/</span>
              <span className="text-white/60">
                {totalSlides.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-6 lg:right-8 z-20">
        <div className="flex flex-col gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                stopAutoPlay();
                goToSlide(index);
                startAutoPlay();
              }}
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;