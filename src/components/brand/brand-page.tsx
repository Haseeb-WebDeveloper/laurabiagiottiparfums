"use client";

import { BrandPage } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { ParallaxImage } from "../ui/ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

export default function BrandPageComponent({
  brandPageData,
}: {
  brandPageData: BrandPage;
}) {
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={componentRef}
      className="max-w 2xl:mt-[17rem] lg:mt-[16.8rem] mt-[8.2rem] mb-[15rem]"
    >
      {/* First Section */}
      <div>
        <div className="flex justify-between gap-4">
          {/* left image 1 */}
          <div className="w-1/2">
            <div className="aspect-[4/5] w-full relative">
              <ParallaxImage
                className="rounded-[1rem]"
                src={
                  brandPageData.firstSection.images[0]?.image.asset.url || ""
                }
                alt={brandPageData.firstSection.images[0]?.alt || ""}
                fill={true}
              />
            </div>
          </div>
          {/* right content container */}
          <div className="w-1/2 space-y-[2rem]">
            <h1 className="2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem]">
              {brandPageData.firstSection.title}
            </h1>
            <p className="text-lg">{brandPageData.firstSection.description}</p>
            <div className="aspect-[4/5] w-full relative">
              <ParallaxImage
                className="rounded-[1rem]"
                src={
                  brandPageData.firstSection.images[1]?.image.asset.url || ""
                }
                alt={brandPageData.firstSection.images[1]?.alt || ""}
                fill={true}
              />
            </div>
          </div>
        </div>
        <h3 className="mt-8 text-xl">
          {brandPageData.firstSection.bottomText}
        </h3>
      </div>

      {/* Second Section */}
      <div className="flex justify-between gap-4 mt-[6rem] w-full">
        <div className="w-full">
          <h1 className="mb-8 text-3xl">{brandPageData.secondSection.title}</h1>
          <div className="h-[600px] w-full relative">
            <ParallaxImage
              className="rounded-[1rem]"
              src={brandPageData.secondSection.image.image.asset.url || ""}
              alt={brandPageData.secondSection.image.alt || ""}
              fill={true}
            />
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="flex justify-between gap-12 mt-[6rem] w-full">
        <div className="w-full grid grid-cols-2 gap-12">
          <div className="w-full h-full flex items-center">
            <p className="text-lg">{brandPageData.thirdSection.text}</p>
          </div>
          <div className="w-full min-h-[600px] relative">
            <ParallaxImage
              className="rounded-[1rem]"
              src={brandPageData.thirdSection.image.image.asset.url || ""}
              alt={brandPageData.thirdSection.image.alt || ""}
              fill={true}
            />
          </div>
        </div>
      </div>

      {/* Fourth Section */}
      <div className="flex justify-between gap-12 mt-[6rem] w-full">
        <div className="w-full grid grid-cols-2 gap-12">
          <div className="w-full min-h-[500px] relative">
            <ParallaxImage
              className="rounded-[1rem]"
              src={brandPageData.fourthSection.image.image.asset.url || ""}
              alt={brandPageData.fourthSection.image.alt || ""}
              fill={true}
            />
          </div>
          <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <h3 className="text-2xl">{brandPageData.fourthSection.title}</h3>
            <p className="text-lg text-center">
              {brandPageData.fourthSection.text}
            </p>
          </div>
        </div>
      </div>

      {/* Last Section */}
      <div className="flex justify-between gap-4 mt-[6rem] w-full">
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <p className="text-lg text-center">
            {brandPageData.lastSection.text}
          </p>
          <Link
            href={brandPageData.lastSection.url}
            className="cursor-pointer uppercase px-[1.7rem] py-[0.7rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Visit the official website
          </Link>
        </div>
      </div>
    </div>
  );
}
