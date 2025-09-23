"use client";

import { HomePageInterface } from "@/types/home-page";
import ThreeColumnScroll from "./three-column-scroll";
import Rotate from "./rotate";
import { ParallaxImage } from "../ui/ParallaxImage";
import NewsHorizontalScrollNew from "./news-horizontal-scroll-new";
import SocialMedia from "./social-media";
import HeroSlider from "./home-slider";
import NotesAnimation from "../ui/notes-animation";
import { useLocale } from "@/lib/i18n/context";
import SplitText from "../ui/split-text";
import WearYourPerfume from "../wear-your-perfume";
import Link from "next/link";
import Footer from "../layout/footer";
import NewsSectionHome, { sampleNews } from "@/test/test-1";

export default function HomePage({
  homeData,
  locale,
}: {
  homeData: HomePageInterface;
  locale: string;
}) {
  const { t } = useLocale();

  return (
    <main className="">
      <div className="mb-[4rem] lg:mt-[190px] mt-[65px] lg:h-[calc(100vh-190px)] h-[calc(100vh-65px)]">
        <HeroSlider slides={homeData.perfumesCarousel} locale={locale} />
      </div>
      {/* Hero Section with Featured Perfumes */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w">
          <ThreeColumnScroll products={homeData.perfumes} locale={locale} />
        </div>
      </div>

      {/* Circular Ingredients Section */}
      <div className="lg:mt-[6rem] bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w">
          <Rotate images={homeData.circularIngridientsImages} />
        </div>
      </div>

      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w">
          <div className="flex flex-col items-center justify-center w-full">
            <SplitText
              text={t("playWithOurNotes")}
              variant="heading"
              className="md:text-[2.9rem] text-[2.4rem] font-[700] tracking-tight"
            />
            <div className="mt-[0.5rem] text-[1rem] text-foreground">
              <SplitText
                text={t("playWithOurNotesDiscription")}
                className="mt-[0.5rem] text-[1rem] text-foreground"
                style={{
                  wordSpacing: "0em",
                }}
              />
            </div>
            <WearYourPerfume
              customTrigger={
                <button className="mt-[2rem] cursor-pointer w-fit flex items-center justify-center uppercase px-[1.5rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300">
                  {t("startQuiz")}
                </button>
              }
            />
          </div>
        </div>
      </div>

      <div className="lg:mt-[2rem] ">
        <div className="overflow-hidden">
          <NotesAnimation notes={homeData.notes} locale={locale} />
        </div>
      </div>

      {/* Text Image Section */}
      <section className="-mt-[14rem] lg:-mt-[12rem]  bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w flex flex-col md:flex-row md:gap-28 gap-10 items-center">
          <div className="md:w-[60%] w-full">
            <div className=" w-full h-[500px]">
              <ParallaxImage
                src={homeData.textImageSection.image.asset.url}
                alt={homeData.textImageSection.heading}
                className="object-cover rounded-[1rem] md:rounded-none w-fit h-[400px]"
              />
            </div>
          </div>
          <div className="md:w-[40%] w-full md:space-y-6 space-y-4">
            <SplitText
              text={homeData.textImageSection.heading}
              variant="heading"
              className="md:text-5xl text-[2.3rem] font-[500] leading-[120%] lg:max-w-[60%]"
            />
            <SplitText
              text={homeData.textImageSection.description}
              variant="paragraph"
              element="p"
              className="text-[1rem]"
            />
            <Link
              href={`/${locale}/brand`}
              className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              {t("textImageSectionButton")}
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <div className="lg:mt-[10rem] mt-[4rem] bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w">
          <NewsHorizontalScrollNew cards={homeData.news} locale={locale} />
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-[8rem] mb-[14rem] bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w">
          <SocialMedia />
        </div>
      </div>
    </main>
  );
}
