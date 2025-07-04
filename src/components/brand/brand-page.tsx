import { BrandPage } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";

export default function BrandPageComponent({
  brandPageData,
}: {
  brandPageData: BrandPage;
}) {
  return (
    <div className="px-[1.7rem] u-container">
      {/* First Section */}
      <div>
        <div className="flex justify-between gap-4">
          {/* left image 1 */}
          <div className="w-full">
            <Image
              src={brandPageData.firstSection.images[0].image.asset.url || ""}
              alt={brandPageData.firstSection.images[0]?.alt || ""}
              width={500}
              height={500}
            />
            <span>{brandPageData.firstSection.images[0]?.alt}</span>
          </div>
          {/* right content container */}
          <div className="w-full space-y-[1rem]">
            <h1>{brandPageData.firstSection.title}</h1>
            <p>{brandPageData.firstSection.description}</p>
            <Image
              src={brandPageData.firstSection.images[1]?.image.asset.url || ""}
              alt={brandPageData.firstSection.images[1]?.alt || ""}
              width={500}
              height={500}
            />
            <span>{brandPageData.firstSection.images[1]?.alt}</span>
          </div>
        </div>
        <h3>{brandPageData.firstSection.bottomText}</h3>
      </div>

      {/* Second Section */}
      <div className="flex justify-between gap-4 mt-[6rem] w-full">
        <div className="w-full">
          <h1>{brandPageData.secondSection.title}</h1>
          <Image
            src={brandPageData.secondSection.image.image.asset.url || ""}
            alt={brandPageData.secondSection.image.alt || ""}
            width={1400}
            height={1400}
            priority
            quality={100}
            className="w-full h-full object-cover object-center max-h-[600px]"
          />
          <span>{brandPageData.secondSection.image.alt}</span>
        </div>
      </div>

      {/* Third Section */}
      <div className="flex justify-between gap-4 mt-[6rem] w-full">
        <div className="w-full grid grid-cols-2 gap-12">
          <div className="w-full h-full flex items-center">
            <p>{brandPageData.thirdSection.text}</p>
          </div>
          <Image
            src={brandPageData.thirdSection.image.image.asset.url || ""}
            alt={brandPageData.thirdSection.image.alt || ""}
            width={600}
            height={600}
            className="w-full h-full object-cover object-center max-h-[450px]"
          />
        </div>
      </div>
      {/* Fourth Section */}
      <div className="flex justify-between gap-4 mt-[6rem] w-full">
        <div className="w-full grid grid-cols-2 gap-12">
          <Image
            src={brandPageData.fourthSection.image.image.asset.url || ""}
            alt={brandPageData.fourthSection.image.alt || ""}
            width={600}
            height={600}
            className="w-full h-full object-cover object-center max-h-[450px]"
          />
          <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <h3>{brandPageData.fourthSection.title}</h3>
            <p>{brandPageData.fourthSection.text}</p>
          </div>
        </div>
      </div>

      {/* Last Section */}
      <div className="flex justify-between gap-4 mt-[6rem] w-full">
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <p>{brandPageData.lastSection.text}</p>
          <Link
            href={brandPageData.lastSection.url}
            className="cursor-pointer p-[0.555rem] leading-0 rounded-[0.45rem] text-[.75rem] font-[400] border hover:border-foreground border-transparent text-pretty capitalize transition-colors duration-300"
          >
            Visit the official website
          </Link>
        </div>
      </div>
    </div>
  );
}
