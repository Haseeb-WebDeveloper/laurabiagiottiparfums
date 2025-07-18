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
import { HomePagePerfumeCarousel } from "@/types/home-page";
import { useLocale } from "@/lib/i18n/context";
import BuyNowPopup from "../ui/buy-now-popup";
import { Perfume } from "@/types/perfume";

interface HeroSliderProps {
  slides: HomePagePerfumeCarousel[];
  locale: string;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, locale }) => {
  const { t } = useLocale();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [splitTypes, setSplitTypes] = useState<{ [key: number]: SplitType }>(
    {}
  );
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const totalSlides = slides.length;

  useEffect(() => {
    // Initialize split text for all slides
    const newSplitTypes: { [key: number]: SplitType } = {};
    slides.forEach((_, index) => {
      const slide = document.querySelector(`[data-slide-index="${index}"]`);
      if (slide) {
        const title = slide.querySelector(".slide-title") as HTMLElement;
        if (title) {
          const splitTitle = new SplitType(title, { types: "words" });
          newSplitTypes[index] = splitTitle;
        }
      }
    });
    setSplitTypes(newSplitTypes);

    // Initialize the first slide
    initializeSlide(0);
  }, [slides]);

  const initializeSlide = (index: number) => {
    const slide = document.querySelector(`[data-slide-index="${index}"]`);
    if (!slide) return;

    const title = slide.querySelector(".slide-title") as HTMLElement;
    const buttons = slide.querySelector(".slide-buttons") as HTMLElement;

    if (title && splitTypes[index]) {
      gsap.set(splitTypes[index].words, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      });
    }
    if (buttons) {
      gsap.set(buttons, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      });
    }
  };

  const animateSlideTransition = (fromIndex: number, toIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Create a timeline for exit animations
    const exitTl = gsap.timeline({
      onComplete: () => {
        // Only trigger slide change after exit animations
        if (swiperRef.current) {
          swiperRef.current.slideToLoop(toIndex);
        }
      },
    });

    // Animate out current slide text simultaneously
    const fromSlide = document.querySelector(
      `[data-slide-index="${fromIndex}"]`
    );
    if (fromSlide) {
      // Ensure the current slide stays visible during animation
      gsap.set(fromSlide, {
        zIndex: 20,
      });

      const fromTitle = fromSlide.querySelector(".slide-title") as HTMLElement;
      const fromButtons = fromSlide.querySelector(
        ".slide-buttons"
      ) as HTMLElement;

      // Animate out current slide text (word by word for title)
      if (fromTitle && splitTypes[fromIndex]) {
        exitTl.to(
          splitTypes[fromIndex].words,
          {
            x: 300,
            y: -40,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            stagger: {
              amount: 0.3,
              from: "start",
            },
          },
          0
        );
      }

      // Animate out current slide buttons
      if (fromButtons) {
        exitTl.to(
          fromButtons,
          {
            x: 300,
            y: -40,
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut",
          },
          0
        );
      }

      // Reset z-index after animation
      exitTl.set(fromSlide, {
        zIndex: 1,
      });
    }
  };

  const animateSlideIn = (toIndex: number) => {
    const toSlide = document.querySelector(`[data-slide-index="${toIndex}"]`);
    if (!toSlide) {
      setIsTransitioning(false);
      return;
    }

    const toTitle = toSlide.querySelector(".slide-title") as HTMLElement;
    const toButtons = toSlide.querySelector(".slide-buttons") as HTMLElement;

    // Create a timeline for entrance animations
    const enterTl = gsap.timeline({
      delay: 0.8, // Increased delay to wait for slide transition
      onComplete: () => {
        setIsTransitioning(false);
        setActiveIndex(toIndex);
      },
    });

    // Prepare and animate title
    if (toTitle && splitTypes[toIndex]) {
      gsap.set(splitTypes[toIndex].words, {
        x: -6,
        y: 40,
        opacity: 0,
      });

      enterTl.to(splitTypes[toIndex].words, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        stagger: {
          amount: 0.6,
          from: "start",
        },
      });
    }

    // Prepare and animate buttons
    if (toButtons) {
      gsap.set(toButtons, {
        x: -5,
        y: 30,
        opacity: 0,
      });

      enterTl.to(
        toButtons,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        ">-1"
      );
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex;
    // Start enter animations immediately when slide changes
    animateSlideTransition(activeIndex, newIndex);
    animateSlideIn(newIndex);
  };

  const goToSlide = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    animateSlideTransition(activeIndex, index);
  };

  const goNext = () => {
    if (isTransitioning) return;
    const nextIndex = activeIndex + 1 >= totalSlides ? 0 : activeIndex + 1;
    animateSlideTransition(activeIndex, nextIndex);
  };

  const goPrev = () => {
    if (isTransitioning) return;
    const prevIndex = activeIndex - 1 < 0 ? totalSlides - 1 : activeIndex - 1;
    animateSlideTransition(activeIndex, prevIndex);
  };

  const handleBuyNowClick = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsPopupOpen(true);
  };

  if (slides.length === 0) return null;

  return (
    <section className="h-full w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        speed={2000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        allowTouchMove={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChangeTransitionStart={handleSlideChange}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative"
            data-slide-index={index}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image.asset.url}
                alt={slide.title}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Content */}
            <div className="max-w h-full flex items-center">
              <div className="2xl:px-[34px] md:px-[38px] px-[18px] z-50 flex items-center relative h-full w-full">
                <div className="relative z-50 h-full w-full flex items-center">
                  <div className="relative z-50">
                    {/* Title */}
                    <h3 className="max-w-[500px] slide-title text-[1.5rem] md:text-[2rem] lg:text-[2.8rem] font-bold text-background leading-tight mb-6">
                      {slide.title}
                    </h3>

                    {/* CTAs */}
                    <div className="max-w-[500px] slide-buttons flex items-center gap-4">
                      {/* Primary CTA */}
                      <button
                        onClick={() => handleBuyNowClick(slide.perfume)}
                        className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-background text-background hover:bg-background hover:text-foreground transition-colors duration-300"
                      >
                        {t("shop")}
                      </button>

                      {/* Secondary CTA */}
                      <Link
                        href={`/${locale}/${slide.perfume.category}-perfume/${slide.perfume.slug}`}
                        className="cursor-pointer text-background tracking-[1.1px] text-[14px] leading-[20px] font-[400]"
                      >
                        {t("learnMore")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="relative max-w">
          {/* Custom Navigation Controls */}
          <div className="absolute bottom-8 left-0 lg:left-0 z-[100]">
            <div className="flex items-center gap-8">
              {/* Slide Numbers with Progress Line */}
              <div className="flex items-end gap-1 relative z-[100]">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`text-background/90 text-light text-[1.2rem] leading-none pb-2 px-2 transition-all duration-300 disabled:cursor-not-allowed relative z-[100] ${
                      index === activeIndex ? "" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                {/* Progress Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 z-[100]">
                  <div
                    className="h-full bg-white transition-all duration-500 ease-out relative z-[100]"
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
          <div className="flex items-center gap-4 absolute bottom-8 right-0 lg:right-0 z-[100]">
            <button
              onClick={goPrev}
              disabled={isTransitioning}
              className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed relative z-[100]"
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
              className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed relative z-[100]"
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

export default HeroSlider;
