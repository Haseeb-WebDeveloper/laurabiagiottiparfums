import { HomePageInterface } from "@/types/home-page";
import ThreeColumnScroll from "./three-column-scroll";
import Rotate from "./rotate";
import { ParallaxImage } from "../ui/ParallaxImage";
import NewsHorizontalScroll from "./horizontal-scroll";
import SocialMedia from "./social-media";
import HeroSlider from "./home-slider";
import NotesAnimation from "../ui/notes-animation";

export default function HomePage({
  homeData,
  locale,
}: {
  homeData: HomePageInterface;
  locale: string;
}) {

  return (
    <main className="">
      <div className="mb-[4rem] lg:mt-[190px] mt-[60px] lg:h-[calc(100vh-190px)] h-[calc(100vh-60px)]">
        <HeroSlider slides={homeData.perfumesCarousel} locale={locale} />
      </div>
      {/* Hero Section with Featured Perfumes */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] md:px-[28px] px-[18px]">
        <div className="max-w">
          <ThreeColumnScroll products={homeData.perfumes} />
        </div>
      </div>

      {/* Circular Ingredients Section */}
      <div className="bg-background 2xl:px-[34px] md:px-[38px] md:px-[28px] px-[18px]">
        <div className="max-w">
          <Rotate images={homeData.circularIngridientsImages} />
        </div>
      </div>


      <div className="lg:mt-[2rem]">
        <div className="overflow-hidden">
          <NotesAnimation notes={homeData.notes} locale={locale}/>
        </div>
      </div>

      {/* Text Image Section */}
      <section className="lg:mt-[6rem] bg-background 2xl:px-[34px] md:px-[38px] md:px-[28px] px-[18px]">
        <div className="max-w flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-[95%]">
            <div className="relative w-full h-[400px]">
              <ParallaxImage
                src={homeData.textImageSection.image.asset.url}
                alt={homeData.textImageSection.heading}
                className="object-cover rounded-[1rem] md:rounded-none w-full h-full"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-[500]">
              {homeData.textImageSection.heading}
            </h2>
            <p gsap-target="paragraph-1" className="text-[1rem]">
              {homeData.textImageSection.description}
            </p>
            <button
              // onClick={() => handleBuyNowClick(product)}
              className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <div className="mt-[10rem] bg-background 2xl:px-[34px] md:px-[38px] md:px-[28px] px-[18px]">
        <div className="max-w">
          <NewsHorizontalScroll cards={homeData.news} locale={locale} />
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-[8rem] bg-background 2xl:px-[34px] md:px-[38px] md:px-[28px] px-[18px]">
        <div className="max-w">
          <SocialMedia socialMediaImages={homeData.socialMediaImages} />
        </div>
      </div>
    </main>
  );
}
