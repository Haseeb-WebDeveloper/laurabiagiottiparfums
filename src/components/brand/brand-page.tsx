"use client";

import { BrandPage } from "@/types/brand";
import Link from "next/link";
import { ParallaxImage } from "../ui/ParallaxImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { useLocale } from "@/lib/i18n/context";
import SplitText from "../ui/split-text";
import HtmlSplitText from "../ui/html-split-text";

export default function BrandPageComponent({
  brandPageData,
}: {
  brandPageData: BrandPage;
}) {
  const { t } = useLocale();
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  useGSAP(() => {
    // Create horizontal scroll animation
    gsap.to(".horizontal-text-animation", {
      x: "-105%", // Move text completely off screen to the left
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-text-animation",
        start: isMobile ? "top 110%" : "top bottom",
        end: isMobile ? "bottom 50%" : "bottom 20%",
        scrub: 1, // Smooth scrolling animation
      },
    });
  });

  return (
    <div className=" max-w 2xl:mt-[13rem] md:mt-[13.5rem] mt-[0.8rem] lg:mb-[15rem] mb-[8.5rem] ">
      {/* First Section */}
      <div className="min-h-[calc(100vh-10rem)] overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* left image 1 */}
          <div className="absolute left-0 2xl:w-[43.5%] md:w-[42%] w-full">
            <div className="md:h-[70vh] h-[32vh] w-full relative">
              <ParallaxImage
                className=""
                src={
                  brandPageData.firstSection.images[0]?.image.asset.url || ""
                }
                alt={brandPageData.firstSection.images[0]?.alt || ""}
                fill={true}
              />
            </div>
            <h6 className="hidden md:block mt-[1rem] text-end text-[0.875rem] tracking-[0em] text-foreground/90">
              {brandPageData.firstSection.images[0]?.alt}
            </h6>
          </div>

          <div className="w-1/2">
            <p></p>
          </div>
          {/* right content container */}
          <div className="w-full  md:w-1/2  pt-[38vh] md:pt-[3.4rem] 2xl:pt-[4rem] md:px-2 px-0">
            <SplitText
              className="2xl:text-[4rem] md:text-[3rem] lg:text-[3.85rem] text-[2.6rem] leading-[150%]"
              style={{
                letterSpacing: "0.002em",
                wordSpacing: "0.15em",
              }}
              text={brandPageData.firstSection.title}
              variant="heading"
              element="h1"
              customStagger={0.2}
              customDuration={1.2}
            />
            <HtmlSplitText
              className="md:max-w-[70%] leading-[125%] w-full md:pt-[3.5rem] pt-[1rem] md:pb-[1rem] pb-[2rem]"
              style={{
                wordSpacing: "0.07em",
              }}
              htmlContent={brandPageData.firstSection.description}
              variant="paragraph"
              element="div"
            />
            <div className="md:h-[300px] lg:h-[420px] h-[460px] mt-[2rem] w-full relative">
              <ParallaxImage
                className="max-w-[550px] rounded-[1rem] md:rounded-none"
                src={
                  brandPageData.firstSection.images[1]?.image.asset.url || ""
                }
                alt={brandPageData.firstSection.images[1]?.alt || ""}
                fill={true}
              />
            </div>
            <p className=" mt-[0.5rem] text-start text-[0.8rem] tracking-[0.1em] uppercase">
              {brandPageData.firstSection.images[1]?.alt}
            </p>
          </div>
        </div>
      </div>

      <div className="font-primary lg:mt-[8rem] md:mt-[2rem] mt-[6rem] lg:mx-[2rem]  text-center lg:text-[2rem] md:text-[2.5rem] text-[1.43rem] leading-[150%] font-primary">
        <SplitText
          variant="paragraph"
          element="p"
          textAlign="center"
          text={brandPageData.firstSection.bottomText}
        />
      </div>

      {/* Second Section */}
      <div className="flex justify-between gap-4 w-full ">
        <div className="w-full">
          <h1
            className="horizontal-text-animation lg:mt-[7rem] mt-[4rem] lg:text-[10rem] text-[8rem] text-nowrap whitespace-nowrap"
            style={{
              letterSpacing: "-0.04em",
              wordSpacing: "-0.02em",
              transform: "translateX(100%)", // Start from right side of screen
              width: "max-content", // Ensure the element takes only the width it needs
            }}
          >
            {brandPageData.secondSection.title}
          </h1>
          <div className="md:h-[400px] lg:h-[450px] h-[150px] w-full relative lg:mt-[6rem] mt-[4rem]">
            <ParallaxImage
              className="lg:max-w-[83%] w-full mx-auto rounded-[1rem] lg:rounded-none"
              src={brandPageData.secondSection.image.image.asset.url || ""}
              alt={brandPageData.secondSection.image.alt || ""}
              fill={true}
            />
            <h6
              gsap-target="heading-2"
              className="lg:max-w-[83%] w-full mx-auto mt-[0.8rem] text-[0.875rem] tracking-[0em] text-foreground/90"
            >
              {brandPageData.secondSection.image.alt}
            </h6>
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="lg:max-w-[85%] mx-auto flex flex-col lg:flex-row justify-between gap-12 md:mt-[8rem] lg:mt-[10rem] mt-[5rem] w-full">
        <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-12 items-start">
          <div className="w-full h-full flex md:items-center md:max-w-[67%] max-w-full">
            <HtmlSplitText
              style={{
                wordSpacing: "0.07em",
              }}
              htmlContent={brandPageData.thirdSection.text}
              variant="paragraph"
              element="p"
            />
          </div>
          <div className="relative w-full h-full md:min-h-[300px] lg:min-h-[410px] min-h-[400px] max-w-[522px]">
            <ParallaxImage
              className="rounded-[1rem] lg:rounded-none"
              src={brandPageData.thirdSection.image.image.asset.url || ""}
              alt={brandPageData.thirdSection.image.alt || ""}
              fill={true}
            />
          </div>
        </div>
      </div>

      {/* Fourth Section */}
      <div className="flex justify-between gap-12 lg:mt-[10rem] md:mt-[8rem] mt-[3.5rem] w-full">
        <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-12">
          {/* Image container - order changes between mobile and desktop */}
          <div className="w-full h-full flex justify-center relative md:order-1 order-2">
            <ParallaxImage
              className="relative w-full h-full min-h-[350px] md:min-h-auto md:max-w-[415px] max-w-full rounded-[1rem] lg:rounded-none"
              src={brandPageData.fourthSection.image.image.asset.url || ""}
              alt={brandPageData.fourthSection.image.alt || ""}
              fill={true}
            />
          </div>
          {/* Text container - order changes between mobile and desktop */}
          <div className="w-full h-full flex flex-col gap-4 lg:order-2 order-1">
            <SplitText
              className="lg:max-w-[75%] max-w-full md:text-[2.8rem] text-[2.2rem] font-[700] leading-[120%]"
              variant="heading"
              element="h2"
              text={brandPageData.fourthSection.title}
            />
            <HtmlSplitText
              className="lg:max-w-[80%] max-w-full"
              htmlContent={brandPageData.fourthSection.text}
              variant="paragraph"
              element="p"
            />
          </div>
        </div>
      </div>

      {/* Last Section */}
      <div className="flex justify-between gap-4 w-full">
        <div className="w-full h-full flex flex-col  gap-8 justify-center items-center">
          <HtmlSplitText
            className="lg:mt-[8rem] mt-[6rem] lg:mx-[2rem] text-center lg:text-[2rem] md:text-[2.5rem] text-[1.4rem] leading-[150%] font-primary"
            htmlContent={brandPageData.lastSection.text}
            variant="paragraph"
            element="p"
            textAlign="center"
          />
          <Link
            href={brandPageData.lastSection.url}
            className="cursor-pointer flex items-center justify-center uppercase px-[1.5rem] py-[0.5rem] rounded-[0.9rem] tracking-[1.1px] text-[14px]  font-[400] border-[1px] border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            {t("visitTheOfficialWebsite")}
          </Link>
        </div>
      </div>
    </div>
  );
}
