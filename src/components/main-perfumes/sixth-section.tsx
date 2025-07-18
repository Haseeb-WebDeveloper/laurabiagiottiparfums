"use client";

import { SixthSectionInterface } from "@/types/main-perfume";
import { ParallaxImage } from "../ui/ParallaxImage";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { useLocale } from "@/lib/i18n/context";
export default function SixthSection({
  sixthSection,
}: {
  sixthSection: SixthSectionInterface;
}) {
  const { t } = useLocale();
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  useGSAP(() => {
    // Create horizontal scroll animation
    gsap.to(".horizontal-image-animation", {
      x: "-100%", // Move text completely off screen to the left
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-image-animation",
        start: isMobile ? "top 150%" : "top bottom",
        end: isMobile ? "bottom 50%" : "bottom center",
        scrub: 1, // Smooth scrolling animation
      },
    });
  });

  return (
    <div className="w-full flex flex-col gap-[2rem]">
      <h3 className="lg:text-[2.9rem] text-[2.3rem] lg:text-center font-[600] tracking-[110%]">
        {sixthSection.heading}
      </h3>

      {/* 2 main columns */}
      <div className="hidden lg:flex mt-[4rem] w-full md:flex flex-col lg:flex-row gap-[3rem]">
        {/* Left Column */}
        <div className="w-full flex flex-col gap-[4rem]">
          {/* top row */}
          <div className="w-full flex gap-[2rem]">
            <div className="h-[200px] w-[200px]">
              <ParallaxImage
                src={sixthSection.files[0].asset.url}
                alt={sixthSection.firstContent.title}
                className="w-full h-full object-cover rounded-full aspect-square"
              />
            </div>
            <div className="space-y-[1rem]">
              <h3 className="text-[2rem] font-[600]">
                {sixthSection.firstContent.title}
              </h3>
              <p className="text-[1rem] max-w-[70%] font-[400]">
                {sixthSection.firstContent.description}
              </p>
            </div>
          </div>
          {/* bottom row */}
          <div className="w-full h-full min-h-[400px]">
            <ParallaxImage
              src={sixthSection.files[1].asset.url}
              alt={sixthSection.firstContent.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex flex-col gap-[2rem] justify-between items-end ">
          {/* top row */}
          <div className="max-w-[80%]">
            <ParallaxImage
              src={sixthSection.files[2].asset.url}
              alt={sixthSection.firstContent.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* bottom row */}
          <div className="max-w-[80%]">
            <div className="space-y-[1rem]">
              <h3 className="text-[2rem] font-[600]">
                {sixthSection.firstContent.title}
              </h3>
              <p className=" lg:pr-[4rem] text-[1rem] font-[400]">
                {sixthSection.firstContent.description}
              </p>
              <button className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-ring hover:bg-ring transition-colors duration-300">
                {t("shop")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:hidden">
        <div className="w-full md:space-y-[2rem] space-y-[3rem]">
          {/* Image */}
          <div className="flex justify-center">
            <div className="h-[200px] w-[200px]">
              <ParallaxImage
                src={sixthSection.files[0].asset.url}
                alt={sixthSection.firstContent.title}
                className="w-full h-full object-cover rounded-full aspect-square"
              />
            </div>
          </div>

          {/* 1st Text */}
          <div className="space-y-[1rem]">
            <h3 className="text-[2rem] font-[600]">
              {sixthSection.firstContent.title}
            </h3>
            <p className="text-[1rem] max-w-[70%] font-[400]">
              {sixthSection.firstContent.description}
            </p>
          </div>

          {/* Media */}
          <div className="">
            <ParallaxImage
              src={sixthSection.files[2].asset.url}
              alt={sixthSection.firstContent.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2nd Text */}
          <div className="space-y-[1rem]">
            <h3 className="text-[2rem] font-[600]">
              {sixthSection.firstContent.title}
            </h3>
            <p className="text-[1rem] font-[400]">
              {sixthSection.firstContent.description}
            </p>
          </div>

          {/* Media */}
          <div className="h-[430px]">
            <ParallaxImage
              src={sixthSection.files[1].asset.url}
              alt={sixthSection.firstContent.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Horizantal scroled image */}
      <div className="hidden lg:flex w-full justify-end mt-[1.5rem]">
        <div className="w-[300px] h-[200px] horizontal-image-animation">
          <ParallaxImage
            src={sixthSection.files[3].asset.url}
            alt={sixthSection.firstContent.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
