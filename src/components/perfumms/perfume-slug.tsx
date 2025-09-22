  "use client";
  import PerfumeSlugHeroSection from "./perfume-slug-hero-section";
  import { Country, Perfume, SubCategory } from "@/types/perfume";
  import NotesAnimation from "../ui/notes-animation";
  import OlfactoryFamily from "./olfactory-family";
  import BigFileAnimation from "./big-file-animation";
  import ProductsSection from "./products-section";
  import MainProductImage from "./main-product-image";
  import RelatedPerfumes from "./related-perfumes";
  import { useState } from "react";
  import NextPrePerfume from "./next-pre-perfume";
  import { useLocale } from "@/lib/i18n/context";
  import AnimatedUnderline from "../ui/animated-underline";

  export default function PerfumeSlug({
    perfume,
    locale,
    subCategories,
  }: {
    perfume: Perfume;
    locale: string;
    subCategories: SubCategory[];
  }) {
    const [selectedCountry, setSelectedCountry] = useState<Country[] | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { t } = useLocale();
    const handleBuyNowClick = (country: Country[]) => {
      setSelectedCountry(country);
      setIsPopupOpen(true);
    };

    return (
      <div className=" mb-[15rem] lg:mt-[9.4rem] mt-[1rem]">
        {/* header title category and sub category 1st Section*/}
        <div className="2xl:px-[34px] md:px-[38px] px-[18px]">
          <div className="max-w">
            <div className="min-h-[100vh] overflow-hidden flex flex-col justify-center">
              <div className="flex flex-col lg:flex-row gap-4 justify-between xl:items-end">
                <h1 className="2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem] leading-[150%] ">
                  {perfume.title}
                </h1>
                <div className="flex items-center gap-2.5 h-fit lg:pb-2">
                  <div
                    className="relative cursor-pointer h-fit w-fit text-[0.9rem] font-[400]"
                    onMouseEnter={() => setHoveredCategory("category")}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {perfume.category === "mens"
                      ? "men's Perfume"
                      : "women's Perfume"}
                    <AnimatedUnderline
                      isActive={hoveredCategory === "category"}
                    />
                  </div>
                  <div className="h-[1px] w-[17px] bg-foreground/10"></div>
                  <div
                    className="relative cursor-pointer h-fit w-fit text-[0.9rem] font-[400]"
                    onMouseEnter={() => setHoveredCategory("subCategory")}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {perfume.subCategory}
                    <AnimatedUnderline
                      isActive={hoveredCategory === "subCategory"}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:mt-[2.3rem] mt-[1.5rem]">
                <PerfumeSlugHeroSection
                  heroSectionImages={perfume.heroSectionImages || []}
                  description={perfume.description}
                  locale={locale}
                  buy={perfume.buy}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Olfactory Notes Section */}
        <div className="2xl:px-[34px] md:px-[38px] px-[18px]">
          <div className="mt-[3rem]">
            <NotesAnimation
              notes={perfume?.olfactoryNotes || []}
              header={t("olfactoryNotes")}
            />
          </div>
        </div>

        {/* Olfactory Family */}
        <div className="2xl:px-[34px] md:px-[38px] px-[18px]">
          <div className="lg:-mt-[4rem] -mt-[18rem] max-w">
            <OlfactoryFamily
              olfactoryFamily={perfume.olfactoryFamily}
              nose={perfume.nose}
              scentDescription={perfume.scentDescription}
              locale={locale}
              buy={perfume.buy}
            />
          </div>
        </div>

        {/* Media Files Section */}
        <div className="2xl:px-[34px] md:px-[38px] px-[18px]">
          <div className="lg:mt-[3rem] -mt-[6rem] max-w">
            <BigFileAnimation
              file={perfume.bgFile}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Images Section */}
        <div className="2xl:px-[34px] md:px-[38px] px-[18px]">
          <div className="lg:mt-[100vh] mt-[90vh] max-w">
            <ProductsSection
              products={perfume.productImagesSection}
              locale={locale}
              buy={perfume.buy}
            />
          </div>
        </div>
        {/* Main Products Pics Section */}
        <div className="2xl:px-[34px] md:px-[38px] px-[18px] border-b-[1px] md:border-none border-foreground">
          <div className="max-w">
            <MainProductImage
              image={perfume.heroProductImage}
              title={perfume.title}
              locale={locale}
              buy={perfume.buy}
            />
          </div>
        </div>

        {/* Navigation Section */}
        <div className="my-[8rem] overflow-x-hidden hidden md:block  ">
          <NextPrePerfume
            previous={perfume.previousProduct}
            next={perfume.nextProduct}
          />
        </div>

        {/* Related Products */}
        <div className="2xl:px-[34px] md:px-[38px] px-[18px]">
          <div className="max-w">
            <RelatedPerfumes relatedPerfumes={perfume.relatedProducts} />
          </div>
        </div>
      </div>
    );
  }
