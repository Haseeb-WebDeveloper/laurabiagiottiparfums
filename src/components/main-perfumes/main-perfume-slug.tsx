"use client";

import { MainPerfume } from "@/types/main-perfume";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import BigFileAnimation from "../perfumms/big-file-animation";
import BigHeading from "../layout/big-heading";
import { ParallaxImage } from "../ui/ParallaxImage";
import NotesAnimation from "../ui/notes-animation";
import OlfactoryFamily from "../perfumms/olfactory-family";
import RelatedPerfumes from "../perfumms/related-perfumes";
import SixthSection from "./sixth-section";
import SeventhSection from "./sevemth-section";
import BigImageAnimation from "./big-image-animation";
import { MainPerfumeSlider } from "./main-perfume-slider";
import { useLocale } from "@/lib/i18n/context";
import BuyNowPopup from "../ui/buy-now-popup";
import SplitText from "../ui/split-text";
import { useThemeStore } from "@/store/theme-store";
import HtmlSplitText from "../ui/html-split-text";

export default function MainPerfumeSlug({
  mainPerfume,
  locale,
}: {
  mainPerfume: MainPerfume;
  locale: string;
}) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const { t } = useLocale();
  const [selectedPerfume, setSelectedPerfume] = useState<MainPerfume | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const { 
    forceTheme, 
    restoreOriginalTheme, 
    setOriginalTheme 
  } = useThemeStore();

  const handleBuyNowClick = (perfume: MainPerfume) => {
    setSelectedPerfume(perfume);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    // Store the current theme as original if it exists and we haven't stored it yet
    if (resolvedTheme && resolvedTheme !== 'dark') {
      setOriginalTheme(resolvedTheme);
    }

    // Force dark theme for this page
    forceTheme("dark", "main-perfume");
    setTheme("dark");

    return () => {
      // Restore original theme on unmount
      restoreOriginalTheme();
      // Apply the original theme immediately
      const state = useThemeStore.getState();
      if (state.originalTheme && state.originalTheme !== 'dark') {
        setTheme(state.originalTheme);
      }
    };
  }, [forceTheme, restoreOriginalTheme, setOriginalTheme, resolvedTheme, setTheme]);

  return (
    <section className="mb-[15rem]">
      {/* section 1 todo */}
      <div className="mb-[4rem] lg:mt-[190px] mt-[65px] lg:h-[calc(100vh-190px)] h-[calc(100vh-65px)] ">
        <MainPerfumeSlider
          slides={mainPerfume.heroSectionImages}
          locale={locale}
          mainPerfume={mainPerfume}
        />
      </div>

      {/* 2nd section quote */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="flex flex-col lg:gap-[4rem] gap-[3rem] max-w">
          <div className="flex flex-col lg:gap-[1rem] gap-[1.5rem]">
            <div className="w-full flex justify-center">
              <Image
                src="/icons/quote.svg"
                alt="quote"
                width={50}
                height={50}
              />
            </div>
            <SplitText
              className="lg:text-[2rem] text-[1.35rem] lg:max-w-[60%] max-w-full px-[1rem] lg:px-0 font-[500] font-primary text-center mx-auto"
              textAlign="center"
              text={mainPerfume.secondSectionQuoteText}
            />
            <div className="mt-[0.5rem] w-full flex justify-center">
              <Image
                src="/icons/quote.svg"
                alt="quote"
                width={50}
                height={50}
                className="rotate-180"
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={() => handleBuyNowClick(mainPerfume)}
              className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-ring hover:bg-ring transition-colors duration-300"
            >
              {t("shop")}
            </button>
          </div>
        </div>
      </div>

      {/* 3rd section */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="mxa-w lg:mt-[3rem] -mt-[6rem]">
          <BigFileAnimation
            file={mainPerfume.bgFile}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w w-full mt-[75vh] lg:mt-[90vh]">
          <BigHeading
            title={mainPerfume.bigHeading}
            textClass="text-animation-1"
          />
        </div>
      </div>

      {/* 4th section */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w mt-[5rem] lg:mt-[10rem] w-full flex flex-col lg:flex-row gap-[2rem]">
          <div className="w-full space-y-[1rem]">
            <SplitText
              className="lg:text-[3rem] text-[2.2rem] font-[600]"
              variant="heading"
              element="h2"
              text={mainPerfume.fourthSectionTextImage.title}
            />

            <HtmlSplitText
              className="text-[1rem] font-[400] lg:max-w-[75%]"
              variant="paragraph"
              htmlContent={mainPerfume.fourthSectionTextImage.text}
            />
            <button
              onClick={() => handleBuyNowClick(mainPerfume)}
              className="cursor-pointer mt-[2rem] w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-ring hover:bg-ring transition-colors duration-300"
            >
              {t("shop")}
            </button>
          </div>
          <div className="w-full">
            <ParallaxImage
              className="w-full mx-auto"
              src={mainPerfume.fourthSectionTextImage.file.asset.url || ""}
              alt={mainPerfume.fourthSectionTextImage.title || ""}
              fill={true}
            />
          </div>
        </div>
      </div>

      {/* Olfactory Notes Section */}
      <div className="">
        <div className="lg:mt-[15rem] mt-[10rem] max-w overflow-hidden">
          <NotesAnimation
            notes={mainPerfume?.olfactoryNotes || []}
            header={t("olfactoryNotes")}
          />
        </div>
      </div>

      {/* Olfactory Family */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w lg:-mt-[6rem] -mt-[22rem]">
          <OlfactoryFamily
            olfactoryFamily={mainPerfume.olfactoryFamily}
            nose={mainPerfume.nose}
            scentDescription={mainPerfume.scentDescription}
            locale={locale}
            buy={mainPerfume.buy}
            isMainPerfume={true}
          />
        </div>
      </div>

      {/* Sixth Section */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="mt-[9rem] max-w">
          <SixthSection
            sixthSection={mainPerfume.sixthSection}
            mainPerfume={mainPerfume}
            locale={locale}
          />
        </div>
      </div>

      {/* Seventh Section */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="mt-[1rem] max-w">
          <SeventhSection
            seventhSection={mainPerfume.seventhSection}
            mainPerfume={mainPerfume}
            locale={locale}
          />
        </div>
      </div>

      <div className="lg:-mt-[6rem] -mt-[10rem]">
        <BigImageAnimation
          file={mainPerfume.heroProductImage}
          className="w-full h-full "
          locale={locale}
          mainPerfume={mainPerfume}
        />
      </div>

      {/* Related Products */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w lg:mt-[115vh] mt-[90vh]">
          <RelatedPerfumes relatedPerfumes={mainPerfume.relatedProducts} />
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
}
