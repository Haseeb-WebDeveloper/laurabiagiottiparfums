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

    // Cleanup function to revert splits
    return () => {
      Object.values(newSplitTypes).forEach((split) => {
        if (split && split.revert) {
          split.revert();
        }
      });
    };
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
        y: 0,
        x: 0,
        opacity: 1,
      });
    }

    if (buttonsElement) {
      gsap.set(buttonsElement, {
        y: 0,
        x: 0,
        opacity: 1,
      });
    }
  };

  const animateImageTransition = (fromIndex: number, toIndex: number) => {
    // Trigger Swiper slide change
    if (swiperRef.current?.el) {
      gsap.to(swiperRef.current.el, {
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(toIndex);
            gsap.to(swiperRef.current.el, {
              duration: 0.6,
              ease: "power2.inOut"
            });
          }
        }
      });
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
    const fromContent = document.querySelector(
      `#slide-content-${fromIndex}`
    ) as HTMLElement;
    const toContent = document.querySelector(
      `#slide-content-${toIndex}`
    ) as HTMLElement;

    // Create timeline for text transition
    const textTl = gsap.timeline({
      onStart: () => {
        // Make both slides visible at the start of animation
        if (fromContent) {
          fromContent.style.visibility = "visible";
          fromContent.style.opacity = "1";
        }
        if (toContent) {
          toContent.style.visibility = "visible";
          toContent.style.opacity = "1";
        }
      },
      onComplete: () => {
        // Hide the from slide after animation
        if (fromContent) {
          fromContent.style.visibility = "hidden";
          fromContent.style.opacity = "0";
        }
      }
    });

    // Set initial state for new content
    if (toTitle && splitTypes[toIndex]) {
      gsap.set(splitTypes[toIndex].words, {
        y: 40,
        x: -5,
        opacity: 0,
      });
    }
    if (toButtons) {
      gsap.set(toButtons, {
        y: 40,
        x: -5,
        opacity: 0,
      });
    }

    // Animate out current text
    if (fromTitle && splitTypes[fromIndex]) {
      textTl.to(
        splitTypes[fromIndex].words,
        {
          y: -40,
          x: -700,
          opacity: 0,
          duration: 1.2,
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
          y: -40,
          x: -700,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0.2  // This is the delay for the buttons to exit
      );
    }

    // Animate in new text
    if (toTitle && splitTypes[toIndex]) {
      textTl.to(
        splitTypes[toIndex].words,
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power2.out",
          stagger: {
            amount: 0.3,
            from: "start",
          },
        },
        1 // Increased delay to let exit animation complete more
      );
    }

    if (toButtons) {
      textTl.to(
        toButtons,
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power2.out",
        },
        1.2 // Slightly after text starts entering
      );
    }
  };

  const handleSlideTransition = (fromIndex: number, toIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Animate both image and text transitions
    animateImageTransition(fromIndex, toIndex);
    animateTextTransition(fromIndex, toIndex);

    // Reset transition state
    setTimeout(() => {
      setIsTransitioning(false);
      setActiveIndex(toIndex);
    }, 2500); // Increased to account for longer animation
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
      delay: 1.3  , // Increased delay to wait for slide transition
      onComplete: () => {
        setIsTransitioning(false);
        setActiveIndex(toIndex);
      },
    });

    // Prepare and animate title
    if (toTitle && splitTypes[toIndex]) {
      gsap.set(splitTypes[toIndex].words, {
        x: 0,
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
        x: 0,
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
    handleSlideTransition(activeIndex, newIndex);
    animateSlideIn(newIndex);
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

  const handleBuyNowClick = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsPopupOpen(true);
  };

  if (slides.length === 0) return null;

  return (
    <section className="h-full w-full overflow-hidden relative">
      {/* Background Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        speed={1500}
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
        cssMode={false}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
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
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fixed Content Layer */}
      <div className="absolute inset-0 z-50">
        <div className="2xl:px-[34px] md:px-[38px] px-[18px] h-full flex items-center">
          <div className="relative w-full max-w">
            {slides.map((slide, index) => (
              <div
                key={index}
                id={`slide-content-${index}`}
                className="absolute md:-bottom-20 md:top-auto top-32 left-0 right-0 w-full"
                style={{
                  pointerEvents: index === activeIndex ? "auto" : "none",
                  zIndex: index === activeIndex ? 2 : 1,
                  opacity: index === activeIndex ? 1 : 0,
                  visibility: index === activeIndex ? "visible" : "hidden",
                }}
              >
                {/* Title */}
                <h3
                  id={`slide-title-${index}`}
                  className="lg:w-[500px] w-full text-[2rem] md:text-[2rem] lg:text-[2.8rem] font-bold text-background leading-tight mb-6"
                >
                  {slide.title}
                </h3>

                {/* CTAs */}
                <div
                  id={`slide-buttons-${index}`}
                  className="max-w-[500px] flex flex-col md:flex-row md:items-center gap-4"
                >
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
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="2xl:px-[34px] md:px-[38px] px-[18px] absolute inset-0 z-[50] pointer-events-none">
        <div className="relative h-full max-w">
          {/* Custom Navigation Controls */}
          <div className="absolute md:bottom-[4rem] md:top-auto top-8 left-0 pointer-events-auto">
            <div className="flex items-center gap-8">
              {/* Slide Numbers with Progress Line */}
              <div className="relative w-[200px]">
                {/* Numbers */}
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`absolute text-background/90 text-light text-[1rem] leading-none pb-2 transition-all duration-300 disabled:cursor-not-allowed ${
                      index === activeIndex ? "opacity-100" : "opacity-50"
                    }`}
                    style={{
                      left: `${(100 / (slides.length - 1)) * index + 3}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    0{index + 1}
                  </button>
                ))}

                {/* Progress Line */}
                <div className="absolute -bottom-[1.7rem] left-0 right-0 h-[1px] bg-white/20"
                >
                  <div
                    className="h-full bg-white transition-all duration-500 ease-out"
                    style={{
                      width: `${(100 / (slides.length - 1)) * (activeIndex + 1)}%`,
                      transformOrigin: "left",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Controls */}
          <div className="flex items-center gap-2 absolute bottom-[1.5rem] h-fit right-0 lg:right-0 pointer-events-auto">
            <button
              onClick={goPrev}
              disabled={isTransitioning}
              className="w-12 h-12 flex items-center justify-center transition-colors duration-300"
              aria-label="Previous slide"
            >
              <Image
                src="/logo/left.svg"
                alt="Previous slide"
                width={24}
                height={24}
                className="hover:invert"
              />
            </button>

            <button
              onClick={goNext}
              disabled={isTransitioning}
              className="w-12 h-12 flex items-center justify-center transition-colors duration-300"
              aria-label="Next slide"
            >
              <Image
                src="/logo/right.svg"
                alt="Next slide"
                width={24}
                height={24}
                className="hover:invert"
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
