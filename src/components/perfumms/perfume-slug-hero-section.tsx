"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import BuyNowPopup from "../ui/buy-now-popup";

export default function PerfumeSlugHeroSection({
  heroSectionImages,
  description,
  buy,
  locale,
}: {
  heroSectionImages: {
    asset: {
      url: string;
    };
  }[];
  description: string;
  buy?: {
    countries: {
      countryName: string;
      websites: {
        logo: {
          asset: {
            url: string;
          };
        };
        url: string;
      }[];
    }[];
  };
  locale: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbSwiperRef = useRef<SwiperType | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mainSwiperRef.current && thumbSwiperRef.current) {
        const nextIndex = (currentIndex + 1) % heroSectionImages.length;
        setCurrentIndex(nextIndex);

        // Sync both swipers
        mainSwiperRef.current.slideTo(nextIndex);

        // For vertical slider, calculate which group of 3 should be visible
        const groupIndex = Math.floor(nextIndex / 3) * 3;
        thumbSwiperRef.current.slideTo(groupIndex);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, heroSectionImages.length]);

  if (!heroSectionImages || heroSectionImages.length === 0) {
    return null;
  }

  const handleMainSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;
    setCurrentIndex(newIndex);

    // Update vertical slider position
    if (thumbSwiperRef.current) {
      const groupIndex = Math.floor(newIndex / 3) * 3;
      thumbSwiperRef.current.slideTo(groupIndex);
    }
  };

  return (
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="space-y-12">
          {/* Main Carousel and Mini Vertical Carousel Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Main Carousel */}
            <div className="flex-1 max-w-[65%]">
              <div className="relative w-full aspect-square">
                <Swiper
                  modules={[Autoplay]}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  onSwiper={(swiper) => {
                    mainSwiperRef.current = swiper;
                  }}
                  onSlideChange={handleMainSlideChange}
                  className="w-full h-full overflow-hidden"
                  allowTouchMove={false}
                  allowSlideNext={true}
                  allowSlidePrev={true}
                >
                  {heroSectionImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full rounded-[1rem] overflow-hidden">
                        <div className="aspect-square w-full h-full">
                          <Image
                            src={image.asset.url}
                            alt={`Product image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 70vw"
                            className="object-cover rounded-[1rem]"
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            quality={90}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Mini Vertical Carousel */}
            <div className="w-[4rem]">
              <Swiper
                spaceBetween={16}
                slidesPerView={3}
                direction="vertical"
                className="h-[15rem] w-[4rem]"
                onSwiper={(swiper) => {
                  thumbSwiperRef.current = swiper;
                }}
                allowTouchMove={false}
                modules={[]}
              >
                {heroSectionImages.map((image, index) => {
                  let opacity = 0.5;
                  const currentGroup = Math.floor(currentIndex / 3);
                  const imageGroup = Math.floor(index / 3);

                  if (currentGroup === imageGroup) {
                    if (index === currentIndex) {
                      opacity = 1;
                    } else {
                      opacity = 0.5;
                    }
                  } else {
                    opacity = 0.3;
                  }

                  return (
                    <SwiperSlide
                      key={index}
                      className="!h-[4rem] !w-[4rem] rounded-[1rem]"
                    >
                      <div
                        className="relative w-[4rem] h-[4rem] rounded-lg overflow-hidden transition-all duration-500"
                        style={{ opacity }}
                      >
                        <Image
                          src={image.asset.url}
                          alt={`Product thumbnail ${index + 1}`}
                          fill
                          className="object-cover rounded-[1rem]"
                          sizes="4rem"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          {/* Content Row */}
          <div className="space-y-10">
            <div className="prose prose-gray max-w-none">
              <p className="">{description}</p>
            </div>

            <button
              onClick={() => setIsPopupOpen(true)}
              className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-8 items-start">
          {/* Left Column - Main Carousel and Mini Vertical Carousel */}
          <div className="space-y-4 pr-[3rem]">
            {/* Main Carousel */}
            <div className="relative w-full aspect-square">
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                  mainSwiperRef.current = swiper;
                }}
                onSlideChange={handleMainSlideChange}
                className="w-full h-full overflow-hidden"
                allowTouchMove={false}
                allowSlideNext={true}
                allowSlidePrev={true}
              >
                {heroSectionImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full rounded-[1rem] overflow-hidden">
                      <div className="aspect-square w-full h-full">
                        <Image
                          src={image.asset.url}
                          alt={`Product image ${index + 1}`}
                          fill
                          sizes="(max-width: 1024px) 50vw"
                          className="object-cover rounded-[1rem]"
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                          quality={90}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Mini Horizontal Carousel */}
            <div className="flex justify-center">
              <div className="w-full">
                <Swiper
                  spaceBetween={16}
                  slidesPerView={5}
                  direction="horizontal"
                  className="h-[45px] w-full"
                  onSwiper={(swiper) => {
                    thumbSwiperRef.current = swiper;
                  }}
                  allowTouchMove={false}
                  modules={[]}
                >
                  {heroSectionImages.map((image, index) => {
                    let opacity = 0.5;
                    const currentGroup = Math.floor(currentIndex / 3);
                    const imageGroup = Math.floor(index / 3);

                    if (currentGroup === imageGroup) {
                      if (index === currentIndex) {
                        opacity = 1;
                      } else {
                        opacity = 0.5;
                      }
                    } else {
                      opacity = 0.3;
                    }

                    return (
                      <SwiperSlide
                        key={index}
                        className="!h-[45px] !w-[45px] rounded-[1rem]"
                      >
                        <div
                          className="relative w-[45px] h-[45px] rounded-lg overflow-hidden transition-all duration-500"
                          style={{ opacity }}
                        >
                          <Image
                            src={image.asset.url}
                            alt={`Product thumbnail ${index + 1}`}
                            fill
                            className="object-cover rounded-[1rem]"
                            sizes="45px"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8 flex flex-col justify-center min-h-full">
            <div className="space-y-6  max-w-[70%]">
              <div className="prose prose-gray max-w-none">
                <p className="">{description}</p>
              </div>

              <button
                onClick={() => setIsPopupOpen(true)}
                className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Main Carousel */}
          <div className="w-full max-w-[32.5%] flex justify-center">
            <div className="relative w-full max-w-[450px] aspect-square">
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                  mainSwiperRef.current = swiper;
                }}
                onSlideChange={handleMainSlideChange}
                className="w-full h-full overflow-hidden"
                allowTouchMove={false}
                allowSlideNext={true}
                allowSlidePrev={true}
              >
                {heroSectionImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full rounded-[1rem] overflow-hidden">
                      <div className="aspect-square w-full h-full">
                        <Image
                          src={image.asset.url}
                          alt={`Product image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                          className="object-cover rounded-[1rem]"
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                          quality={90}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-full space-y-8">
            <div className="space-y-6 max-w-[400px] mx-auto">
              <div className="prose prose-gray max-w-none">
                <p className="">{description}</p>
              </div>

              <button
                onClick={() => setIsPopupOpen(true)}
                className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Mini Vertical Carousel */}
          <div className="w-full lg:w-[15%] mx-auto lg:mx-0 flex justify-end">
            <div className="w-[90px]">
              <Swiper
                spaceBetween={16}
                slidesPerView={3}
                direction="vertical"
                className="h-[320px] w-[90px]"
                onSwiper={(swiper) => {
                  thumbSwiperRef.current = swiper;
                }}
                allowTouchMove={false}
                modules={[]}
              >
                {heroSectionImages.map((image, index) => {
                  let opacity = 0.5;
                  const currentGroup = Math.floor(currentIndex / 3);
                  const imageGroup = Math.floor(index / 3);

                  if (currentGroup === imageGroup) {
                    if (index === currentIndex) {
                      opacity = 1;
                    } else {
                      opacity = 0.5;
                    }
                  } else {
                    opacity = 0.3;
                  }

                  return (
                    <SwiperSlide
                      key={index}
                      className="!h-[90px] !w-[90px] rounded-[1rem]"
                    >
                      <div
                        className="relative w-[90px] h-[90px] rounded-lg overflow-hidden transition-all duration-500"
                        style={{ opacity }}
                      >
                        <Image
                          src={image.asset.url}
                          alt={`Product thumbnail ${index + 1}`}
                          fill
                          className="object-cover rounded-[1rem]"
                          sizes="100px"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {buy && (
        <BuyNowPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          countries={buy.countries}
          locale={locale}
        />
      )}
    </div>
  );
}