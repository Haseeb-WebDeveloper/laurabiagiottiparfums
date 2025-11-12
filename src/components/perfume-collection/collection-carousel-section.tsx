"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// We will use video rendering (posterless) for mp4, image for any image/* type from asset.mimeType
type CarouselAsset = {
  _type: "file";
  asset: {
    mimeType: string;
    url: string;
  };
};

export default function CollectionCarouselSection({
  assets,
}: {
  assets: CarouselAsset[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const desktopThumbSwiperRef = useRef<SwiperType | null>(null);
  const mobileThumbSwiperRef = useRef<SwiperType | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const thumbGroupSize = 3; // Show 3 thumbnails at a time

  console.log("assets", assets);

  // Swiper slide transition speed in ms
  const SWIPER_TRANSITION_SPEED = 1000;

  if (!assets || assets.length === 0) {
    return null;
  }

  // Only those with a mimeType starting with image/
  const imageAssets = assets.filter(
    (asset) =>
      asset &&
      typeof asset.asset?.mimeType === "string" &&
      asset.asset.mimeType.startsWith("image/") &&
      typeof asset.asset.url === "string"
  );

  if (imageAssets.length === 0) {
    // If there are no images, do not render carousel
    return null;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplayEnabled && mainSwiperRef.current && imageAssets.length > 0) {
        const nextIndex = (currentIndex + 1) % imageAssets.length;
        setCurrentIndex(nextIndex);
        mainSwiperRef.current.slideTo(nextIndex, SWIPER_TRANSITION_SPEED);

        // Sync thumbnail swipers
        const groupIndex =
          Math.floor(nextIndex / thumbGroupSize) * thumbGroupSize;
        if (desktopThumbSwiperRef.current) {
          desktopThumbSwiperRef.current.slideTo(
            groupIndex,
            SWIPER_TRANSITION_SPEED
          );
        }
        if (mobileThumbSwiperRef.current) {
          mobileThumbSwiperRef.current.slideTo(
            groupIndex,
            SWIPER_TRANSITION_SPEED
          );
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, imageAssets.length, autoplayEnabled, thumbGroupSize]);

  const handleMainSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;
    setCurrentIndex(newIndex);

    // Update thumbnail swiper position to show correct group
    const groupIndex = Math.floor(newIndex / thumbGroupSize) * thumbGroupSize;
    if (desktopThumbSwiperRef.current) {
      desktopThumbSwiperRef.current.slideTo(
        groupIndex,
        SWIPER_TRANSITION_SPEED
      );
    }
    if (mobileThumbSwiperRef.current) {
      mobileThumbSwiperRef.current.slideTo(groupIndex, SWIPER_TRANSITION_SPEED);
    }
  };

  const handleThumbClick = (index: number) => {
    setCurrentIndex(index);
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index, SWIPER_TRANSITION_SPEED);
    }
    // Update thumbnail swiper position
    const groupIndex = Math.floor(index / thumbGroupSize) * thumbGroupSize;
    if (desktopThumbSwiperRef.current) {
      desktopThumbSwiperRef.current.slideTo(
        groupIndex,
        SWIPER_TRANSITION_SPEED
      );
    }
    if (mobileThumbSwiperRef.current) {
      mobileThumbSwiperRef.current.slideTo(groupIndex, SWIPER_TRANSITION_SPEED);
    }
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 8000);
  };

  const handleMainTouchStart = () => {
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 8000);
  };

  return (
    <div className="w-full max-w 2xl:px-[34px] md:px-[38px] px-[18px] overflow-hidden">
      <div className="w-full lg:max-w-[83%] mx-auto">
        {/* Mobile Layout */}
        <div className="block lg:hidden w-full">
          <div className="flex items-start gap-4 w-full overflow-hidden">
            {/* Main Carousel */}
            <div className="flex-1 min-w-0">
              <div className="relative w-full h-[208px] max-h-[208px]">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  slidesPerView={1}
                  speed={SWIPER_TRANSITION_SPEED}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    prevEl: ".swiper-button-prev-custom-mobile",
                    nextEl: ".swiper-button-next-custom-mobile",
                  }}
                  pagination={false}
                  onSwiper={(swiper) => {
                    mainSwiperRef.current = swiper;
                  }}
                  onSlideChange={handleMainSlideChange}
                  onTouchStart={handleMainTouchStart}
                  className="w-full h-full overflow-hidden rounded-[1rem]"
                  allowTouchMove={true}
                >
                  {imageAssets.map((asset, index) => (
                    <SwiperSlide key={asset.asset.url}>
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={asset.asset.url}
                          alt={`Carousel image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 65vw"
                          className="object-cover "
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                          quality={90}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Custom Arrow Pagination - Bottom Left */}
                <div className="flex items-center gap-2 absolute bottom-2 left-4 z-10">
                  <div className="flex items-center gap-2">
                    {imageAssets.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (mainSwiperRef.current) {
                            mainSwiperRef.current.slideTo(idx, SWIPER_TRANSITION_SPEED);
                          }
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                          currentIndex === idx
                            ? "bg-background scale-120 shadow"
                            : "bg-background/60 hover:bg-background/80 hover:scale-120"
                        }`}
                        style={{ border: "none", padding: 0, margin: 0, outline: "none" }}
                        tabIndex={0}
                        type="button"
                      />
                    ))}
                  </div>
                </div>
                {/* Custom Navigation Arrows - Bottom Right */}
                <div className="flex gap-2 absolute bottom-2 right-4 z-10">
                  <div className="swiper-button-prev-custom-mobile flex items-center justify-center cursor-pointer ">
                    <Image
                      src="/logo/left.svg"
                      alt="Previous"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className="swiper-button-next-custom-mobile flex items-center justify-center cursor-pointer">
                    <Image
                      src="/logo/right.svg"
                      alt="Next"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnails - Scrollable Swiper */}
            <div className="w-[4rem] flex-shrink-0">
              <Swiper
                spaceBetween={8}
                slidesPerView={Math.min(3, imageAssets.length)}
                slidesPerGroup={Math.min(3, imageAssets.length)}
                direction="vertical"
                speed={SWIPER_TRANSITION_SPEED}
                className="h-[208px] w-[4rem]"
                onSwiper={(swiper) => {
                  mobileThumbSwiperRef.current = swiper;
                }}
                allowTouchMove={imageAssets.length > 3}
                modules={[]}
                watchSlidesProgress={true}
                centeredSlides={false}
              >
                {imageAssets.map((asset, index) => {
                  let opacity = 0.5;
                  const currentGroup = Math.floor(
                    currentIndex / thumbGroupSize
                  );
                  const imageGroup = Math.floor(index / thumbGroupSize);

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
                      key={asset.asset.url}
                      className="!h-[4rem] !w-[4rem] "
                    >
                      <div
                        className="relative w-[4rem] h-[4rem] rounded-[1rem] overflow-hidden  cursor-pointer "
                        style={{ opacity }}
                        onClick={() => handleThumbClick(index)}
                      >
                        <Image
                          src={asset.asset.url}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-all duration-700"
                          sizes="4rem"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex items-start gap-6 max-w-[1600px] mx-auto">
            {/* Main Carousel */}
            <div className="flex-1 min-w-0">
              <div className="relative w-full h-[572px] max-h-[572px]">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  slidesPerView={1}
                  speed={SWIPER_TRANSITION_SPEED}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    prevEl: ".swiper-button-prev-custom-desktop",
                    nextEl: ".swiper-button-next-custom-desktop",
                  }}
                  pagination={{
                    type: "bullets",
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet-custom",
                    bulletActiveClass: "swiper-pagination-bullet-active-custom",
                    el: ".swiper-pagination-custom-desktop",
                    horizontalClass: "swiper-pagination-horizontal",
                    renderBullet: function (index: number, className: string) {
                      return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
                    },
                  }}
                  onSwiper={(swiper) => {
                    mainSwiperRef.current = swiper;
                  }}
                  onSlideChange={handleMainSlideChange}
                  onTouchStart={handleMainTouchStart}
                  className="w-full h-full overflow-hidden rounded-[1rem]"
                  allowTouchMove={true}
                >
                  {imageAssets.map((asset, index) => (
                    <SwiperSlide key={asset.asset.url}>
                      <div className="relative w-full h-full  overflow-hidden">
                        <Image
                          src={asset.asset.url}
                          alt={`Carousel image ${index + 1}`}
                          fill
                          sizes="(max-width: 1200px) 80vw, (max-width: 1600px) 70vw, 1120px"
                          className="object-cover "
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                          quality={90}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Custom Arrow Pagination - Bottom Left */}
                {/* Custom Dot Pagination - Circular UI */}
                <div className="flex items-center gap-4 absolute bottom-4 left-6 z-10">
                  {imageAssets.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (mainSwiperRef.current) {
                          mainSwiperRef.current.slideTo(idx, SWIPER_TRANSITION_SPEED);
                        }
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`cursor-pointer w-3 h-3 rounded-full shadow  transition-all duration-300 flex items-center justify-center focus:outline-none ${
                        currentIndex === idx
                          ? "bg-background scale-130"
                          : "bg-background/60 hover:bg-background/80 hover:scale-120"
                      }`}
                      style={{
                        padding: 0,
                        margin: 0,
                        outline: "none",
                      }}
                      tabIndex={0}
                      type="button"
                    />
                  ))}
                </div>
                <div className="flex gap-4 absolute bottom-4 right-6 z-10">
                  <div className="swiper-button-prev-custom-desktop flex items-center justify-center cursor-pointer">
                    <Image
                      src="/logo/left.svg"
                      alt="Previous"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="swiper-button-next-custom-desktop flex items-center justify-center cursor-pointer">
                    <Image
                      src="/logo/right.svg"
                      alt="Next"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnails - Scrollable Swiper */}
            <div className="w-[180px] flex-shrink-0">
              <Swiper
                spaceBetween={16}
                slidesPerView={Math.min(3, imageAssets.length)}
                slidesPerGroup={Math.min(3, imageAssets.length)}
                direction="vertical"
                speed={SWIPER_TRANSITION_SPEED}
                className="h-[572px] w-[180px]"
                onSwiper={(swiper) => {
                  desktopThumbSwiperRef.current = swiper;
                }}
                allowTouchMove={imageAssets.length > 3}
                modules={[]}
                watchSlidesProgress={true}
                centeredSlides={false}
              >
                {imageAssets.map((asset, index) => {
                  let opacity = 0.5;
                  const currentGroup = Math.floor(
                    currentIndex / thumbGroupSize
                  );
                  const imageGroup = Math.floor(index / thumbGroupSize);

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
                      key={asset.asset.url}
                      className="!h-[180px] !w-[180px] rounded-[1rem]"
                    >
                      <div
                        className="relative w-[180px] h-[180px] rounded-[1rem] overflow-hidden  cursor-pointer "
                        style={{ opacity }}
                        onClick={() => handleThumbClick(index)}
                      >
                        <Image
                          src={asset.asset.url}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-all duration-700"
                          sizes="180px"
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

    </div>
  );
}
