"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { gsap } from "gsap";
import SplitType from "split-type";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { HeroSectionImage, MainPerfume } from "@/types/main-perfume";
import { useLocale } from "@/lib/i18n/context";
import BuyNowPopup from "../ui/buy-now-popup";

interface MainPerfumeSliderProps {
  slides: HeroSectionImage[];
  locale: string;
  mainPerfume: MainPerfume;
}

export const MainPerfumeSlider: React.FC<MainPerfumeSliderProps> = ({
  slides,
  locale,
  mainPerfume,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [splitTypes, setSplitTypes] = useState<{ [key: number]: SplitType }>(
    {}
  );
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLocale();
  const totalSlides = slides.length;
  const [selectedPerfume, setSelectedPerfume] = useState<MainPerfume | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBuyNowClick = (perfume: MainPerfume) => {
    setSelectedPerfume(perfume);
    setIsPopupOpen(true);
  };
  // Autoplay functionality
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }

      autoplayTimerRef.current = setInterval(() => {
        if (!isTransitioning) {
          const nextIndex = (activeIndex + 1) % totalSlides;
          handleSlideTransition(activeIndex, nextIndex);
        }
      }, 5000); // Change slide every 5 seconds
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [activeIndex, isTransitioning, totalSlides]);

  useEffect(() => {
    // Initialize split text for all slides
    const newSplitTypes: { [key: number]: SplitType } = {};
    slides.forEach((_, index) => {
      const titleElement = document.querySelector(
        `#slide-title-${index}`
      ) as HTMLElement;
      if (titleElement) {
        const splitTitle = new SplitType(titleElement, { types: "words" });
        newSplitTypes[index] = splitTitle;
      }
    });
    setSplitTypes(newSplitTypes);

    // Initialize the first slide
    initializeSlide(0);
  }, [slides]);

  const initializeSlide = (index: number) => {
    const titleElement = document.querySelector(
      `#slide-title-${index}`
    ) as HTMLElement;
    const buttonsElement = document.querySelector(
      `#slide-buttons-${index}`
    ) as HTMLElement;

    if (titleElement && splitTypes[index]) {
      gsap.set(splitTypes[index].words, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      });
    }
    if (buttonsElement) {
      gsap.set(buttonsElement, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      });
    }
  };

  const animateImageTransition = (fromIndex: number, toIndex: number) => {
    const fromImage = document.querySelector(
      `#slide-image-${fromIndex}`
    ) as HTMLElement;
    const toImage = document.querySelector(
      `#slide-image-${toIndex}`
    ) as HTMLElement;

    if (fromImage && toImage) {
      // Set initial state for new image (from right, scaled down)
      gsap.set(toImage, {
        x: "100%",
        scale: 0,
        zIndex: 10,
      });

      // Create timeline for image transition
      const imageTl = gsap.timeline();

      // Animate new image in
      imageTl.to(toImage, {
        x: "0%",
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });

      // Animate old image out (optional - you can remove this if you want it to stay)
      imageTl.to(
        fromImage,
        {
          duration: 0.3,
          ease: "power2.out",
        },
        0.3
      );

      // Reset z-index after animation
      imageTl.set(fromImage, {
        zIndex: 1,
      });

      // Update content visibility
      const fromContent = document.querySelector(
        `#slide-content-${fromIndex}`
      ) as HTMLElement;
      const toContent = document.querySelector(
        `#slide-content-${toIndex}`
      ) as HTMLElement;
      if (fromContent) fromContent.style.opacity = "0";
      if (toContent) toContent.style.opacity = "1";
    }
  };

  const animateTextTransition = (fromIndex: number, toIndex: number) => {
    const fromTitle = document.querySelector(
      `#slide-title-${fromIndex}`
    ) as HTMLElement;
    const fromButtons = document.querySelector(
      `#slide-buttons-${fromIndex}`
    ) as HTMLElement;
    const toTitle = document.querySelector(
      `#slide-title-${toIndex}`
    ) as HTMLElement;
    const toButtons = document.querySelector(
      `#slide-buttons-${toIndex}`
    ) as HTMLElement;

    // Create timeline for text transition
    const textTl = gsap.timeline();

    // Animate out current text
    if (fromTitle && splitTypes[fromIndex]) {
      textTl.to(
        splitTypes[fromIndex].words,
        {
          y: -40,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: {
            amount: 0.2,
            from: "start",
          },
        },
        0
      );
    }

    if (fromButtons) {
      textTl.to(
        fromButtons,
        {
          y: -30,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0
      );
    }

    // Animate in new text
    if (toTitle && splitTypes[toIndex]) {
      gsap.set(splitTypes[toIndex].words, {
        y: 30,
        opacity: 0,
      });

      textTl.to(
        splitTypes[toIndex].words,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: {
            amount: 0.4,
            from: "start",
          },
        },
        0.3
      );
    }

    if (toButtons) {
      gsap.set(toButtons, {
        y: 30,
        opacity: 0,
      });

      textTl.to(
        toButtons,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.5
      );
    }
  };

  const handleSlideTransition = (fromIndex: number, toIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Reset autoplay timer
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    // Animate both image and text transitions
    animateImageTransition(fromIndex, toIndex);
    animateTextTransition(fromIndex, toIndex);

    // Reset transition state
    setTimeout(() => {
      setIsTransitioning(false);
      setActiveIndex(toIndex);
    }, 1500);
  };

  const goToSlide = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    handleSlideTransition(activeIndex, index);
  };

  const goNext = () => {
    if (isTransitioning) return;
    const nextIndex = activeIndex + 1 >= totalSlides ? 0 : activeIndex + 1;
    handleSlideTransition(activeIndex, nextIndex);
  };

  const goPrev = () => {
    if (isTransitioning) return;
    const prevIndex = activeIndex - 1 < 0 ? totalSlides - 1 : activeIndex - 1;
    handleSlideTransition(activeIndex, prevIndex);
  };

  if (slides.length === 0) return null;

  return (
    <section className="h-full w-full overflow-x-hidden text-background">
      {/* Background Images - All slides rendered but hidden */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            id={`slide-image-${index}`}
            className="absolute inset-0"
            style={{
              //   opacity: index === activeIndex ? 1 : 0,
              zIndex: index === activeIndex ? 2 : 1,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <img
              src={slide.image.asset.url}
              alt={slide.title}
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Fixed Text Content Container */}
      <div className="absolute inset-0 z-50">
        <div className="2xl:px-[34px] md:px-[38px] px-[18px] h-full flex items-center">
          <div className="relative">
            {/* All slide content rendered but hidden */}
            {slides.map((slide, index) => (
              <div
                key={index}
                id={`slide-content-${index}`}
                className="absolute top-0 left-0 transition-opacity duration-500"
                style={{
                  //   opacity: index === activeIndex ? 1 : 0,
                  pointerEvents: index === activeIndex ? "auto" : "none",
                }}
              >
                {/* Title */}
                <h3
                  id={`slide-title-${index}`}
                  className="z-50 w-[400px] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-bold text-foreground leading-tight mb-6"
                >
                  {slide.title}
                </h3>

                {/* CTAs */}
                <div
                  id={`slide-buttons-${index}`}
                  className="max-w-[500px] flex items-center gap-4"
                >
                  {/* Primary CTA */}
                  <button
                    onClick={() => handleBuyNowClick(mainPerfume)}
                    className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-ring text-foreground hover:bg-ring hover:text-background transition-colors duration-300"
                  >
                    {t("shop")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="2xl:px-[34px] md:px-[38px] px-[18px] absolute inset-0 z-[100] pointer-events-none">
        <div className="relative max-w h-full">
          {/* Custom Navigation Controls */}
          <div className="absolute bottom-8 left-0 lg:left-0 pointer-events-auto">
            <div className="flex items-center gap-8">
              {/* Slide Numbers with Progress Line */}
              <div className="flex items-end gap-1 relative">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`text-foreground/90 text-light text-[1.2rem] leading-none pb-2 px-2 transition-all duration-300 disabled:cursor-not-allowed relative ${
                      index === activeIndex ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                {/* Progress Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20">
                  <div
                    className="h-full bg-white transition-all duration-500 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / totalSlides) * 100}%`,
                      transformOrigin: "left",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Controls */}
          <div className="flex items-center gap-4 absolute bottom-8 right-0 lg:right-0 pointer-events-auto">
            <button
              onClick={goPrev}
              disabled={isTransitioning}
              className="w-12 h-12 flex items-center justify-center transition-colors duration-300 hover:scale-110 disabled:opacity-50"
              aria-label="Previous slide"
            >
              <Image
                src="/icons/arrow-right.svg"
                alt="Previous slide"
                width={24}
                height={24}
                className="rotate-180"
              />
            </button>

            <button
              onClick={goNext}
              disabled={isTransitioning}
              className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <Image
                src="/icons/arrow-right.svg"
                alt="Next slide"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>

      {selectedPerfume?.buy && (
        <BuyNowPopup
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedPerfume(null);
          }}
          countries={selectedPerfume.buy.countries}
          locale={locale}
        />
      )}
    </section>
  );
};
