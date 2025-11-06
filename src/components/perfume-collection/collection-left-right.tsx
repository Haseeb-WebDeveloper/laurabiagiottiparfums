"use client";

import { BottlesSectionItem } from "@/types/collection";
import { useLocale } from "@/lib/i18n/context";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import BuyNowPopup from "../ui/buy-now-popup";
import Image from "next/image";
import gsap from "gsap";

type Props = {
  items: BottlesSectionItem[];
  locale: string;
};

// Custom Carousel Component with GSAP animations
function CustomCarousel({
  images,
  alt,
  isRightSide,
}: {
  images: { asset: { url: string } }[];
  alt: string;
  isRightSide: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const animateTransition = useCallback(
    (fromIndex: number, toIndex: number) => {
      // Prevent multiple animations from running simultaneously
      if (isAnimatingRef.current) return;
      
      const currentImg = imageRefs.current[fromIndex];
      const nextImg = imageRefs.current[toIndex];

      if (!currentImg || !nextImg) return;

      // Set animation flag
      isAnimatingRef.current = true;

      // Determine X direction based on side
      // Right side: exit goes -x (left), enter comes from +x (right)
      // Left side: exit goes +x (right), enter comes from -x (left)
      const exitX = isRightSide ? -350 : 350;
      const enterX = isRightSide ? 350 : -350;

      // CRITICAL: Hide ALL images first to prevent any overlap
      imageRefs.current.forEach((img, idx) => {
        if (img && idx !== fromIndex && idx !== toIndex) {
          gsap.set(img, {
            opacity: 0,
            zIndex: 0,
            pointerEvents: "none",
          });
        }
      });

      // Layering to avoid overlap flashes
      gsap.set(currentImg, { zIndex: 1 });
      gsap.set(nextImg, { zIndex: 2 });

      // Ensure scale originates from the active corner
      const origin = isRightSide ? "100% 100%" : "0% 100%"; // bottom-right or bottom-left
      gsap.set([currentImg, nextImg], { transformOrigin: origin });

      // Create timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // CRITICAL: After animation completes, ensure only the active image is visible
          imageRefs.current.forEach((img, idx) => {
            if (img) {
              if (idx === toIndex) {
                // Active image - ensure it's visible
                gsap.set(img, {
                  opacity: 1,
                  zIndex: 2,
                  pointerEvents: "auto",
                });
              } else {
                // All others - ensure they're hidden
                gsap.set(img, {
                  opacity: 0,
                  zIndex: idx < toIndex ? 0 : 1,
                  pointerEvents: "none",
                });
              }
            }
          });
          // Reset animation flag
          isAnimatingRef.current = false;
        },
      });

      // Exit animation: current image goes down with scale decrease and X movement
      tl.to(currentImg, {
        y: "100%",
        x: exitX,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        force3D: true,
      });

      // Enter animation: next image comes from bottom with scale 80% to 100% and X movement
      gsap.set(nextImg, {
        y: "100%",
        x: enterX,
        opacity: 0,
        force3D: true,
      });

      tl.fromTo(
        nextImg,
        {
          y: "100%",
          x: enterX,
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
        },
        "-=0.3"
      );

      // After animation, reset the old slide beneath for next cycle
      tl.set(currentImg, {
        y: "100%",
        x: exitX,
        opacity: 0,
        zIndex: 1,
        pointerEvents: "none",
      });

      // Ensure next image is on top and visible
      tl.set(nextImg, {
        zIndex: 2,
        pointerEvents: "auto",
      });
    },
    [isRightSide]
  );

  // Auto-advance carousel
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      // Skip if already animating
      if (isAnimatingRef.current) return;
      
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length;
        animateTransition(prev, next);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, animateTransition]);

  // Initialize images - first visible, others hidden
  useLayoutEffect(() => {
    images.forEach((_, index) => {
      const img = imageRefs.current[index];
      if (!img) return;

      // Set transform origin based on side once
      gsap.set(img, { transformOrigin: isRightSide ? "100% 100%" : "0% 100%" });

      if (index === 0) {
        gsap.set(img, {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          force3D: true,
          zIndex: 2,
          pointerEvents: "auto",
        });
      } else {
        gsap.set(img, {
          y: "100%",
          x: isRightSide ? 20 : -20,
          scale: 0.8,
          opacity: 0,
          force3D: true,
          zIndex: 0,
          pointerEvents: "none",
        });
      }
    });
  }, [images, isRightSide]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] "
      style={{ contain: "layout paint" }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className="absolute opacity-0 w-fit"
          style={{
            [isRightSide ? "right" : "left"]: 0,
            bottom: 0,
            width: "fit-content",
            height: "fit-content",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src={image.asset.url}
            alt={alt}
            width={1000}
            height={1000}
            // sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-[1rem] md:rounded-none block"
            style={{
              width: "auto",
              height: "auto",
              //   maxWidth: "min(560px, 50vw)",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function CollectionLeftRight({ items, locale }: Props) {
  const { t } = useLocale();
  const [selectedItem, setSelectedItem] = useState<BottlesSectionItem | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBuyNowClick = (item: BottlesSectionItem) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  return (
    <section className="flex flex-col ">
      {items.map((item, index) => (
        <div
          key={index}
          className={`min-h-[100dvh] flex items-center flex-col lg:flex-row justify-between gap-[2rem] ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
          //   background image
          style={{
            backgroundImage: `url(${item.backgroundImage.asset.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Text (left) */}
          <div
            className={`w-full lg:w-[40%] ${index % 2 === 0 ? "2xl:pl-[34px] md:pl-[38px] pl-[18px]" : "2xl:pr-[34px] md:pr-[38px] pr-[18px]"}`}
          >
            <div className="flex flex-col gap-[1rem]">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-[700] font-times-new-roman">
                {item.product.title}
              </h2>
              <p className="text-[1.2rem] font-[400] font-roboto-condensed">{item.product.description}</p>

              <div className="lg:mt-[1rem] mt-[1rem] flex gap-4 items-center">
                {item.product.buy && (
                  <button
                    onClick={() => handleBuyNowClick(item)}
                    className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    {t("shop")}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Images carousel */}
          <div className="w-full lg:w-[60%] self-end">
            {item.images && item.images.length > 0 && (
              <CustomCarousel
                images={item.images}
                alt={item.product.title}
                isRightSide={index % 2 === 0}
              />
            )}
          </div>
        </div>
      ))}

      {selectedItem?.product.buy && (
        <BuyNowPopup
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedItem(null);
          }}
          countries={selectedItem.product.buy.countries}
          locale={locale}
        />
      )}
    </section>
  );
}
