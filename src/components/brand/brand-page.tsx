"use client";

import { BrandPage } from "@/types/brand";
import Link from "next/link";
import { ParallaxImage } from "../ui/ParallaxImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

export default function BrandPageComponent({
  brandPageData,
}: {
  brandPageData: BrandPage;
}) {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  useGSAP(() => {
    // Create horizontal scroll animation
    gsap.to(".horizontal-text-animation", {
      x: "-100%", // Move text completely off screen to the left
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-text-animation",
        start: isMobile ? "top 150%" : "top bottom",
        end: isMobile ? "bottom 50%" : "bottom 20%",
        scrub: 1, // Smooth scrolling animation
      },
    });
  });

  console.log(brandPageData.secondSection);

  return (
    <div className=" max-w 2xl:mt-[13rem] lg:mt-[13.5rem] mt-[0.8rem] lg:mb-[15rem] mb-[8.5rem] overflow-hidden">
      {/* First Section */}
      <div className="min-h-[100vh]">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          {/* left image 1 */}
          <div className="absolute left-0 2xl:w-[47.5%] lg:w-[42%] w-full">
            <div className="lg:h-[70vh] h-[32vh] w-full relative">
              <ParallaxImage
                className=""
                src={
                  brandPageData.firstSection.images[0]?.image.asset.url || ""
                }
                alt={brandPageData.firstSection.images[0]?.alt || ""}
                fill={true}
              />
            </div>
            <p className="mt-[1rem] text-end text-[0.875rem] tracking-[0.1em] uppercase">
              {brandPageData.firstSection.images[0]?.alt}
            </p>
          </div>

          <div className="w-1/2">
            <p>h</p>
          </div>
          {/* right content container */}
          <div className="w-full lg:w-1/2  pt-[38vh] lg:pt-[3.4rem] 2xl:pt-[4rem] lg:px-2 px-0">
            <h1
              className="2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem] leading-[150%]"
              style={{
                letterSpacing: "0.01em",
                wordSpacing: "0.08em",
              }}
            >
              {brandPageData.firstSection.title}
            </h1>
            <p
              className="lg:max-w-[66%]w-full lg:pt-[3.8rem] pt-[1rem] lg:pb-[1rem] pb-[2 rem]"
              dangerouslySetInnerHTML={{
                __html: brandPageData.firstSection.description,
              }}
            />
            <div className="lg:h-[420px] h-[460px] mt-[2rem] w-full relative">
              <ParallaxImage
                className="max-w-[550px] rounded-[1rem] lg:rounded-none"
                src={
                  brandPageData.firstSection.images[1]?.image.asset.url || ""
                }
                alt={brandPageData.firstSection.images[1]?.alt || ""}
                fill={true}
              />
              <p className="mt-[0.8rem] text-start text-[0.875rem] tracking-[0.1em] uppercase">
                {brandPageData.firstSection.images[1]?.alt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:mt-[8rem] mt-[6rem] lg:mx-[2rem]  text-center lg:text-[2rem] text-[1.43rem] leading-[150%] font-Transcend">
        {brandPageData.firstSection.bottomText}
      </div>

      {/* Second Section */}
      <div className="flex justify-between gap-4 w-full">
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
          <div className="lg:h-[450px] h-[150px] w-full relative lg:mt-[6rem] mt-[4rem]">
            <ParallaxImage
              className="lg:max-w-[83%] w-full mx-auto rounded-[1rem] lg:rounded-none"
              src={brandPageData.secondSection.image.image.asset.url || ""}
              alt={brandPageData.secondSection.image.alt || ""}
              fill={true}
            />
            <p className="lg:max-w-[83%] w-full mx-auto mt-[0.8rem] text-[0.875rem] tracking-[0.1em] uppercase">
              {brandPageData.secondSection.image.alt}
            </p>
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:mt-[10rem] mt-[5rem] w-full">
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-12">
          <div className="w-full h-full flex items-center lg:max-w-[67%] max-w-full mx-auto">
            <p
              gsap-target="paragraph-1"
              className=""
              dangerouslySetInnerHTML={{
                __html: brandPageData.thirdSection.text,
              }}
            />
          </div>
          <div className="relative w-full h-full lg:min-h-[410px] min-h-[420px] max-w-[522px]">
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
      <div className="flex justify-between gap-12 lg:mt-[6rem] mt-[3.5rem] w-full">
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-12">
          {/* Image container - order changes between mobile and desktop */}
          <div className="w-full h-full flex justify-center relative lg:order-1 order-2">
            <ParallaxImage
              className="relative w-full h-full min-h-[350px] lg:min-h-auto lg:max-w-[415px] max-w-full rounded-[1rem] lg:rounded-none"
              src={brandPageData.fourthSection.image.image.asset.url || ""}
              alt={brandPageData.fourthSection.image.alt || ""}
              fill={true}
            />
          </div>
          {/* Text container - order changes between mobile and desktop */}
          <div className="w-full h-full flex flex-col gap-4 lg:order-2 order-1">
            <h2 className="lg:max-w-[75%] max-w-full">
              {brandPageData.fourthSection.title}
            </h2>
            <p
              className="lg:max-w-[80%] max-w-full"
              dangerouslySetInnerHTML={{
                __html: brandPageData.fourthSection.text,
              }}
            />
          </div>
        </div>
      </div>

      {/* Last Section */}
      <div className="flex justify-between gap-4 w-full">
        <div className="w-full h-full flex flex-col lg:gap-4 gap-8 justify-center items-center">
          <div
            className="lg:mt-[8rem] mt-[6rem] lg:mx-[2rem] text-center lg:text-[2rem] text-[1.4rem] leading-[150%] font-Transcend"
            dangerouslySetInnerHTML={{
              __html: brandPageData.lastSection.text,
            }}
          />
          <Link
            href={brandPageData.lastSection.url}
            className="cursor-pointer flex items-center justify-center uppercase px-[1.5rem] py-[0.5rem] rounded-[0.9rem] tracking-[1.1px] text-[14px]  font-[400] border-[1px] border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Visit the official website
          </Link>
        </div>
      </div>
    </div>
  );
}
