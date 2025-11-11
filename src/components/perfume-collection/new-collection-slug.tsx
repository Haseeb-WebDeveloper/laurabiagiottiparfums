"use client";

import { Collection } from "@/types/collection";
import RelatedPerfumes from "../perfumms/related-perfumes";
import CollectionSectionTwo from "./collection-section-two";
import BottlesSection from "./bottles-section";
import CollectionLeftRight from "./collection-left-right";

export default function NewCollectionSlug({
  collection,
  locale,
}: {
  collection: Collection;
  locale: string;
}) {
  return (
    <div className="mb-[15rem] ">
      {/* 1st hero section */}
      <section className="h-[100dvh] relative overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={collection.firstSection.video.asset?.url || ""}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Overlay for better text contrast (optional, comment out if not needed) */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none z-10"></div>

        <div className="relative z-10 flex flex-col justify-end items-center 2xl:gap-[1rem] h-full pb-[4rem]">
          <h1 className="text-background text-center 2xl:text-[4.5rem] lg:text-[3.85rem] text-[2.6rem] tracking-wide custom-text-shadow">
            {collection.firstSection.title}
          </h1>
          <p className="w-full text-background text-center mt-[0.8rem] custom-text-shadow 2xl:text-[1.85rem] text-[1rem]">
            {collection.firstSection.description}
          </p>
        </div>
      </section>

      {/* 2nd animation section a video with  text animation */}
      <CollectionSectionTwo
        videoUrl={collection.secondSection.video.asset?.url || ""}
        firstTitle={collection.secondSection.titleOnVideo}
        firstDesc={collection.secondSection.descriptionOnVideo}
        secondTitle={collection.secondSection.rightTitle}
        secondDesc={collection.secondSection.rightDescription}
      />

      {/* 2nd bottles animation section */}
      <div className="lg:pt-[6vw] pt-[8rem]">
        <BottlesSection items={collection.bottlesSection} locale={locale} />
      </div>

      <div className="">
        <CollectionLeftRight
          items={collection.bottlesSection}
          locale={locale}
        />
      </div>

      {/* Related Products */}
      <div className="mt-[2rem] lg:mt-[6rem]">
        <div className="max-w 2xl:px-[34px] md:px-[38px] px-[18px]">
          <RelatedPerfumes relatedPerfumes={collection.relatedProducts} />
        </div>
      </div>
    </div>
  );
}
