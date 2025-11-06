"use client";

import { Collection } from "@/types/collection";
import RelatedPerfumes from "../perfumms/related-perfumes";
// import { useLocale } from "@/lib/i18n/context";
import CollectionSectionTwo from "./collection-section-two";
import BottlesSection from "./bottles-section";

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
      <section className="h-[100vh] relative overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={collection.firstSection.bgMedia.asset?.url || ""}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Overlay for better text contrast (optional, comment out if not needed) */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none z-10"></div>

        <div className="relative z-10 flex flex-col justify-end items-center h-full pb-[4rem]">
          <h1 className="text-background text-center 2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem] tracking-wide custom-text-shadow">
            {collection.title}
          </h1>
          <p className="w-full text-background text-center mt-[0.8rem] custom-text-shadow">
            {collection.firstSection.tagLine}
          </p>
        </div>
      </section>

      {/* 2nd animation section a video with  text animation */}
      <CollectionSectionTwo
        videoUrl={collection.firstSection.bgMedia.asset?.url || ""}
        firstTitle="Moment. Purity. Essence."
        firstDesc="A journey inspire by the eternal rhythem of Roma."
        secondTitle="Aqvè Romane is a tribute to the city of Rome — its fountains, its light, its artistry."
        secondDesc="our fragrances inspired by water and form, designed to reflect purity, strength, and timeless elegance."
      />

      {/* 2nd bottles animation section */}
      <div className="py-[6vw]">
        <BottlesSection
          items={collection.bottlesSection}
          firstSection={collection.firstSection}
        />
      </div>

      {/* Related Products */}
      <div className="mt-[2rem]">
        <div className="max-w">
          <RelatedPerfumes relatedPerfumes={collection.relatedProducts} />
        </div>
      </div>
    </div>
  );
}
