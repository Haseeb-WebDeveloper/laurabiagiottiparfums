"use client";

import { SeventhSectionInterface } from "@/types/main-perfume";
import { ParallaxImage } from "../ui/ParallaxImage";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import BigHeading from "../layout/big-heading";

export default function SeventhSection({
  seventhSection,
}: {
  seventhSection: SeventhSectionInterface;
}) {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  useGSAP(() => {
    // Create horizontal scroll animation
    gsap.to(".horizontal-image-animation-2", {
      x: "-50%", // Move text completely off screen to the left
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-image-animation-2",
        start: isMobile ? "top 150%" : "top bottom",
        end: isMobile ? "bottom 50%" : "bottom 60%",
        scrub: 1, // Smooth scrolling animation
      },
    });
  });

  return (
    <div className="w-full flex flex-col gap-[2rem]">
      <div className="w-full">
        <BigHeading
          title={seventhSection.heading}
          textClass="text-animation-2"
        />
      </div>
      {/* 3 main columns */}
      <div className="hidden lg:flex mt-[4rem] w-full flex-col lg:flex-row gap-[1rem]">
        {/* Left Column */}
        <div className="w-[30%] flex flex-col justify-end gap-[4rem]">
          {/* top row */}
          <div className="w-full h-[350px] pb-[3rem]">
            <ParallaxImage
              src={seventhSection.files[0].asset.url}
              alt={seventhSection.content.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Center Column */}
        <div className="w-[30%] flex flex-col gap-[3rem] justify-between items-end ">
          {/* top row */}
          <div className="space-y-[1rem]">
            <h3 className="text-[2rem] font-[600]">
              {seventhSection.content.title}
            </h3>
            <p className=" lg:pr-[4rem] text-[1rem] font-[400]">
              {seventhSection.content.description}
            </p>
          </div>

          {/* bottom row */}
          <div className="w-full h-full min-h-[280px] ">
            <ParallaxImage
              src={seventhSection.files[0].asset.url}
              alt={seventhSection.content.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[60%] flex flex-col gap-[2rem] justify-between items-end ">
          <div className="w-full flex flex-col justify-end items-end gap-[4rem]">
            {/* top row */}
            <div className="w-full h-full min-h-[400px] max-w-[90%]">
              <ParallaxImage
                src={seventhSection.files[1].asset.url}
                alt={seventhSection.content.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Horizantal scroled image */}
            <div className="w-full flex justify-end mt-[1.5rem]">
              <div className="w-[300px] h-[200px] horizontal-image-animation-2">
                <ParallaxImage
                  src={seventhSection.files[3].asset.url}
                  alt={seventhSection.content.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:hidden w-full flex-col gap-[2rem]">
        <div className="space-y-[1rem]">
          <h3 className="text-[2rem] font-[600]">
            {seventhSection.content.title}
          </h3>
          <p className=" lg:pr-[4rem] text-[1rem] font-[400]">
            {seventhSection.content.description}
          </p>
        </div>
        <div className="w-full h-[350px] pb-[3rem]">
          <ParallaxImage
            src={seventhSection.files[0].asset.url}
            alt={seventhSection.content.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
