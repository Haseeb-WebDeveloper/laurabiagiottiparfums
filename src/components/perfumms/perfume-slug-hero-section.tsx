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
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!heroSectionImages || heroSectionImages.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Left Column - Main Carousel (70% width) */}
        <div className="w-full lg:w-[35%] flex justify-center">
          <div className="relative w-full max-w-[450px] aspect-square">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Thumbs]}
              // spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              // thumbs={{ swiper: thumbsSwiper }}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              className="w-full h-full rounded-2xl overflow-hidden"
            >
              {heroSectionImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={image.asset.url}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Column - Content and Mini Carousel (30% width) */}
        <div className="w-full lg:w-[50%] space-y-8">
          {/* Description */}
          <div className="space-y-6">
            <div className="prose prose-gray max-w-none">
              <p className="">
                {description}
              </p>
            </div>

            {/* Shop Now Button */}
            <button className="px-6 py-3 bg-transparent border border-gray-400 text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200 uppercase tracking-wide">
              Shop Now
            </button>
          </div>
        </div>

        {/* Mini Vertical Carousel */}
        <div className="w-full lg:w-[15%] mx-auto lg:mx-0">
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={3}
            direction="vertical"
            className="h-[300px] w-full"
            watchSlidesProgress={true}
            slideToClickedSlide={true}
          >
            {heroSectionImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-orange-400 shadow-lg"
                      : "opacity-70 hover:opacity-100 shadow-md"
                  }`}
                >
                  <Image
                    src={image.asset.url}
                    alt={`Product thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
