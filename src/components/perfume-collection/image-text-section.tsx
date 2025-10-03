"use client";

import { CollectionPerfume } from "@/types/collection";
import { ParallaxImage } from "../ui/ParallaxImage";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useLocale } from "@/lib/i18n/context";
import { useState } from "react";
import BuyNowPopup from "../ui/buy-now-popup";
import SplitText from "../ui/split-text";
import HtmlSplitText from "../ui/html-split-text";
export default function ImageTextSection({
  products,
  locale,
}: {
  products: CollectionPerfume[];
  locale: string;
}) {
  const { t } = useLocale();
  const [selectedPerfume, setSelectedPerfume] =
    useState<CollectionPerfume | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBuyNowClick = (perfume: CollectionPerfume) => {
    setSelectedPerfume(perfume);
    setIsPopupOpen(true);
  };

  console.log(products);

  return (
    <section className="max-w  pt-[6rem] flex flex-col lg:gap-[10rem] gap-[5rem]">
      {products.map((product, index) => (
        <div key={index} className="flex flex-col md:gap-[7rem] gap-[5rem]">
          {/* Right Left Section */}
          <div
            className={`flex items-center flex-col lg:flex-row justify-between gap-[3rem] ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            }`}
          >
            {/* Text Content Section */}
            <div className={`w-full lg:w-[50%] ${index % 2 === 0 ? "lg:pr-[4rem]" : "lg:pl-[4rem]"}`}>
              <div className="flex flex-col gap-[1rem]">
                <SplitText
                  className="text-[2.5rem] lg:text-[3rem] font-[500]"
                  text={product.title}
                />
                <p>{product.description}</p>

                {/* Buttons */}
                <div className="lg:mt-[1rem] mt-[1rem] flex gap-4 items-center">
                  <button
                    onClick={() => handleBuyNowClick(product)}
                    className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    {t("shop")}
                  </button>
                  <Link
                    href={`/${locale}/${product.category}-perfume/${product.slug}`}
                    className="cursor-pointer tracking-[1.1px] text-[14px] leading-[20px] font-[400]"
                  >
                    {t("learnMore")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Slider Section */}
            <div className="w-full lg:w-[50%] h-[420px]">
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                className="w-full h-full overflow-hidden"
                allowTouchMove={false}
                allowSlideNext={true}
                allowSlidePrev={true}
              >
                {product.collectionPageImages?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full overflow-hidden">
                      <ParallaxImage
                        src={image.asset.url}
                        alt={product.title}
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="rounded-[1rem] md:rounded-none"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="px-[0.5rem] w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-start lg:gap-[7rem] gap-[4rem]">
              {product.ingredients?.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex lg:items-start md:items-center flex-col md:flex-row lg:gap-[1.8rem] gap-[2rem]"
                >
                  <div className="lg:w-[90px] lg:h-[90px] md:w-[120px] md:h-[120px] w-[190px] h-[190px]">
                    <ParallaxImage
                      src={ingredient.image.asset.url}
                      alt={ingredient.ingredientName}
                      className="group-hover:shadow-[30px_30px_84px_rgba(180,133,94,0.45)] transition-all duration-300 aspect-square object-cover rounded-full flex-shrink-0"
                    />
                  </div>
                  <div className="flex flex-col gap-[0.7rem] ">
                    <SplitText
                      className="text-[1.2rem] lg:text-[1.7rem] font-[600] leading-[1.2]"
                      style={{
                        letterSpacing: "2px",
                      }}
                      text={ingredient.ingredientName}
                    />
                    <HtmlSplitText
                      className="text-[1rem] font-[400] w-full leading-[1.5]"
                      variant="paragraph"
                      style={{ display: "block" }}
                      htmlContent={ingredient.description}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

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
}
