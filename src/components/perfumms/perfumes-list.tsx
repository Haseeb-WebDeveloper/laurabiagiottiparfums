"use client";

import { Perfume, SubCategory } from "@/types/perfume";
import Link from "next/link";
import { ParallaxImage } from "../ui/ParallaxImage";
import { useState } from "react";
import BuyNowPopup from "../ui/buy-now-popup";

export default function PerfumesList({
  perfumes,
  slugPrefix,
  title,
  locale,
  subCategories,
}: {
  perfumes: Perfume[];
  slugPrefix: string;
  title?: string;
  locale: string;
  subCategories: SubCategory[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const filteredPerfumes = selectedCategory
    ? perfumes.filter((perfume) => perfume.subCategory === selectedCategory)
    : perfumes;

  const handleBuyNowClick = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsPopupOpen(true);
  };

  return (
    <div className="max-w 2xl:mt-[17rem] lg:mt-[16.6rem] mt-[8.2rem] mb-[15rem]">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center py-[0.3rem]">
        <h1 className="2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem] leading-[150%] tracking-[0.008em]">
          {title}
        </h1>
        <div className="flex gap-4 lg:pt-[0.3rem] pt-0 h-full">
          {subCategories.map((subCategory, index: number) => (
            <div
              key={index}
              className={`cursor-pointer flex items-center justify-center uppercase lg:px-[1.94rem] lg:py-[0.24rem] px-[2.6rem] py-[0.3rem] rounded-[0.5rem] text-[0.75rem] font-[400] border-[1px] border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === subCategory.name
                    ? null
                    : subCategory.name
                )
              }
            >
              {subCategory.name}
            </div>
          ))}
        </div>
      </div>
      <div className="2xl:mt-[3.8rem] lg:mt-[3.5rem] mt-[1.5rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-24 lg:gap-y-[7.5rem]">
        {filteredPerfumes.map((perfume: Perfume) => (
          <div key={perfume._id} className="group">
            <div className="space-y-[2.29rem]">
              <div className="lg:h-[19.1rem] h-[22rem] w-full relative">
                <ParallaxImage
                  src={perfume.featuredImage?.asset.url || ""}
                  alt={perfume.title}
                  className="rounded-[1rem] border-[1px] border-transparent hover:border-foreground transition-colors duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div>
                <div className="uppercase tracking-[0.1em] text-[0.875rem] font-[800]">
                  {perfume.subCategory}
                </div>
                <h3 className="line-clamp-1  text-[1.25rem]  md:text-[2rem] font-[700] tracking-wider leading-[120%] ">{perfume.title}</h3>
                <p
                  className="lg:pt-[0.9rem] pt-[0.8rem]"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: "1.5em",
                    margin: 0,
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {perfume.description}
                </p>
                <div className="lg:mt-[2.5rem] mt-[2rem] flex flex-col lg:flex-row gap-4 lg:items-center">
                  <button
                    onClick={() => handleBuyNowClick(perfume)}
                    className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    Shop Now
                  </button>
                  <Link
                    href={`/${locale}/${slugPrefix}/${perfume.slug}`}
                    className="cursor-pointer tracking-[1.1px] text-[14px] leading-[20px] font-[400]"
                  >
                    Scopri
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
}
