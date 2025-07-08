"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function PerfumeSlugHeroSection({
  heroSectionImages,
  description,
}: {
  heroSectionImages: {
    asset: {
      url: string;
    };
  }[];
  description: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbSwiperRef = useRef<SwiperType | null>(null);

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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Left Column - Main Carousel (35% width) */}
        <div className="w-full lg:w-[32.5%] flex justify-center">
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
                  <div className="relative w-full rounded-[1rem] h-full">
                    <Image
                      src={image.asset.url}
                      alt={`Product image ${index + 1}`}
                      width={400}
                      height={500}
                      className="object-cover w-full h-full rounded-[1rem]"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Column - Content (40% width) */}
        <div className="w-full lg:w-full space-y-8">
          {/* Description */}
          <div className="space-y-6 max-w-[400px] mx-auto">
            <div className="prose prose-gray max-w-none">
              <p className="">{description}</p>
            </div>

            {/* Shop Now Button */}
            <button className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300">
              Shop Now
            </button>
          </div>
        </div>

        {/* Mini Vertical Carousel (25% width) */}
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
                // Calculate opacity based on current index and position
                let opacity = 0.5;
                const currentGroup = Math.floor(currentIndex / 3);
                const imageGroup = Math.floor(index / 3);

                // If this image is in the current group of 3
                if (currentGroup === imageGroup) {
                  // If this is the exact current image
                  if (index === currentIndex) {
                    opacity = 1;
                  } else {
                    opacity = 0.5;
                  }
                } else {
                  opacity = 0.3; // Images not in current group
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
  );
}
