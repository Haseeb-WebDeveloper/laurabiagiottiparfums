"use client";

import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import BuyNowPopup from "../ui/buy-now-popup";
import { useLocale } from "@/lib/i18n/context";
import SplitText from "../ui/split-text";
gsap.registerPlugin(ScrollTrigger);

export default function MainProductImage({
  image,
  title,
  buy,
  locale,
}: {
  image: {
    asset: {
      url: string;
    };
  };
  title: string;
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
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set(".main-product-image", {
        opacity: 0,
        scale: 0,
      });

      gsap.to(".main-product-image", {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".main-product-image",
          start: "top 110%",
          end: "top center",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t } = useLocale();
  return (
    <div className="w-full lg:min-h-[80vh] pb-[5rem] flex flex-col items-center justify-center">
      <div className="h-full lg:max-w-[600px]">
        <Image
          src={image.asset.url}
          alt={`${title} - Image 1`}
          width={700}
          height={700}
          className="w-full h-full object-cover main-product-image"
          priority
        />
      </div>
      {/* Product Name and Price */}
      <div className="-mt-[4rem] flex flex-col justify-center items-center">
        <SplitText
          className="mb-[1.4rem] text-center lg:text-[2.85rem] text-[2.6rem] leading-[1.2]"
          style={{
            fontWeight: "500",
            wordSpacing: "0.1.5em",
            letterSpacing: "-0.02em",
          }}
          variant="heading"
          element="h2"
          text={title}
        />
        <button
          onClick={() => setIsPopupOpen(true)}
          className="cursor-pointer flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          {t("shop")}
        </button>
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
