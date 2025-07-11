"use client";

import { MainPerfume } from "@/types/main-perfume";
import { useEffect } from "react";
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

export default function MainPerfumeSlug({
  mainPerfume,
  locale,
}: {
  mainPerfume: MainPerfume;
  locale: string;
}) {
  const { setTheme, theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Store original theme
    const originalTheme = resolvedTheme;

    // Force dark theme
    setTheme("dark");

    return () => {
      // Restore original theme on unmount
      if (originalTheme) {
        setTheme(originalTheme);
      }
    };
  }, []);
  return (
    <section className="lg:mb-[15rem] mb-[8rem] lg:mt-[14.8rem] mt-[7rem]">
      {/* section 1 todo */}
      <div className="w-full h-[100vh]"></div>

      {/* 2nd section quote */}
      <div className="flex flex-col lg:gap-[4rem] gap-[3rem]">
        <div className="flex flex-col lg:gap-[1rem] gap-[1.5rem]">
          <div className="w-full flex justify-center">
            <Image src="/icons/quote.svg" alt="quote" width={50} height={50} />
          </div>
          <p className="lg:text-[2rem] text-[1.35rem] lg:max-w-[60%] max-w-full px-[1rem] lg:px-0 font-[500] font-primary text-center mx-auto">
            {mainPerfume.secondSectionQuoteText}
          </p>
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
          <button className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-ring hover:bg-ring transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </div>

      {/* 3rd section */}
      <div className="lg:mt-[3rem] -mt-[6rem]">
        <BigFileAnimation
          file={mainPerfume.bgFile}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full mt-[75vh] lg:mt-[90vh]">
        <BigHeading
          title={mainPerfume.bigHeading}
          textClass="text-animation-1"
        />
      </div>

      {/* 4th section */}
      <div className="mt-[5rem] lg:mt-[10rem] w-full flex flex-col lg:flex-row gap-[2rem]">
        <div className="w-full space-y-[1rem]">
          <h2 className="lg:text-[3rem] text-[2.2rem] font-[600]">
            {mainPerfume.fourthSectionTextImage.title}
          </h2>
          <p className="text-[1rem] font-[400] lg:max-w-[75%]">
            {mainPerfume.fourthSectionTextImage.text}
          </p>
          <button className="cursor-pointer mt-[2rem] w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-ring hover:bg-ring transition-colors duration-300">
            Shop Now
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

      {/* Olfactory Notes Section */}
      <div className="lg:mt-[15rem] mt-[10rem] max-w overflow-hidden">
        <NotesAnimation
          notes={mainPerfume?.olfactoryNotes || []}
          header="Olfactory Notes"
        />
      </div>

      {/* Olfactory Family */}
      <div className="lg:-mt-[6rem] -mt-[22rem] max-w">
        <OlfactoryFamily
          olfactoryFamily={mainPerfume.olfactoryFamily}
          nose={mainPerfume.nose}
          scentDescription={mainPerfume.scentDescription}
          locale={locale}
          buy={mainPerfume.buy}
        />
      </div>

      {/* Sixth Section */}
      <div className="mt-[9rem]">
        <SixthSection sixthSection={mainPerfume.sixthSection} />
      </div>

      {/* Seventh Section */}
      <div className="mt-[1rem]">
        <SeventhSection seventhSection={mainPerfume.seventhSection} />
      </div>

      <div className="lg:-mt-[6rem] -mt-[10rem]">
        <BigImageAnimation
          file={mainPerfume.heroProductImage}
          className="w-full h-full "
        />
      </div>

      {/* Related Products */}
      <div className="lg:mt-[115vh] mt-[90vh]">
        <RelatedPerfumes relatedPerfumes={mainPerfume.relatedProducts} />
      </div>
    </section>
  );
}
