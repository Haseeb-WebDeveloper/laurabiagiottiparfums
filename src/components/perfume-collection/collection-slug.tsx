import { Collection, CollectionPerfume } from "@/types/collection";
import { ParallaxImage } from "../ui/ParallaxImage";
import BigFileAnimation from "../perfumms/big-file-animation";
import ImageTextSection from "./image-text-section";
import RelatedPerfumes from "../perfumms/related-perfumes";

export default function CollectionSlug({
  collection,
  locale,
}: {
  collection: Collection;
  locale: string;
}) {
  return (
    <div className="mb-[15rem] lg:mt-[14.8rem] mt-[7rem]">
      {/* 1st hero section */}
      <section className="lg:mb-[100vh] mb-[75vh]">
        <h1 className="text-center 2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem] tracking-wide">
          {collection.title}
        </h1>
        <p className="w-full text-center mt-[0.8rem]">
          {collection.firstSection.tagLine}
        </p>
        <div className="w-full h-full">
          <div className="h-[255px] w-full">
            <ParallaxImage
              src={collection.firstSection.image.asset.url}
              alt={`${collection.title} - Image 1`}
              className="w-full h-[255px] rounded-[1rem]"
              objectFit="contain"
            />
          </div>

          {/* shop now button */}
          <div className="w-full flex justify-center -mt-[1.6rem]">
            <button className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300">
              Shop Now
            </button>
          </div>

          {/* description */}
          <p className="mt-[4.5rem] w-full text-center mx-auto lg:max-w-[45%]">
            {collection.firstSection.description}
          </p>

          {/* bg media */}
          <div className="">
            <div className="lg:mt-[3rem] max-w">
              <BigFileAnimation
                file={collection.firstSection.bgMedia}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <ImageTextSection
        products={collection.productsCollection}
        locale={locale}
      />

      {/* Related Products */}
      <div className="mt-[2rem]">
        <div className="max-w">
          <RelatedPerfumes relatedPerfumes={collection.relatedProducts} />
        </div>
      </div>
    </div>
  );
}
