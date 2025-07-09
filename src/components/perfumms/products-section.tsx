"use client";

import { ProductImagesSection } from "@/types/perfume";
import { ParallaxImage } from "../ui/ParallaxImage";
import { useState } from "react";
import BuyNowPopup from "../ui/buy-now-popup";

export default function ProductsSection({
  products,
  buy,
  locale,
}: {
  products: ProductImagesSection;
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className="pt-[6.5rem]">
      <div className="w-[100%] flex flex-col md:flex-row gap-[2rem]">
        {/* 1-2 images */}
        <div className="w-[28%] pt-[2.5rem] flex flex-col gap-[4rem]">
          {products.images.slice(0, 2).map((image, index) => (
            <div
              key={index}
              className={`h-full w-full object-cover  
                  ${index === 0 ? "max-w-[260px] max-h-[300px]" : "max-w-[300px] max-h-[380px]"}
            `}
            >
              <ParallaxImage
                src={image.asset.url}
                alt={`${products.title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* 3 - 4 image */}
        <div className="w-[44%] flex flex-col gap-[7rem]">
          {/* 3 image */}
          <div
            className={`w-full flex justify-end pr-[3.6rem] h-[380px] min-w-[300px] `}
          >
            <div className="w-full  h-[380px] max-w-[300px] ">
              <ParallaxImage
                src={products.images[2].asset.url}
                alt={`${products.title} - Image 3`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full h-full flex  flex-col items-center justify-center">
            <h2 className="text-center mb-[1rem]">{products.title}</h2>
            <p className="text-center mb-[1.5rem]">{products.description}</p>
            <button 
              onClick={() => setIsPopupOpen(true)}
              className="cursor-pointer flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Shop Now
            </button>
          </div>

          {/* 4 image */}
          <div className={`w-fullflex pl-[3.7rem] h-[310px] min-w-[260px] `}>
            <div className="w-full  h-[310px] max-w-[260px] ">
              <ParallaxImage
                src={products.images[3].asset.url}
                alt={`${products.title} - Image 3`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 5-6 images */}
        <div className="w-[28%] flex flex-col justify-center items-end gap-[8rem]">
          {products.images.slice(4, 6).map((image, index) => (
            <div
              key={index}
              className={`h-full w-full object-cover  
                  ${index === 0 ? "max-w-[260px] max-h-[300px]" : "max-w-[310px] max-h-[385px]"}
            `}
            >
              <ParallaxImage
                src={image.asset.url}
                alt={`${products.title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
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
    </section>
  );
}
