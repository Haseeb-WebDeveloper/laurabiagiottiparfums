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
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w">
          <ThreeColumnScroll products={homeData.perfumes} />
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
            <h4 className="text-[2.9rem] font-[700] tracking-tight">Play with our Notes</h4>
            <p
              className="mt-[0.5rem] text-[1rem] text-foreground"
              style={{
                wordSpacing: "0em",
              }}
            >
              Discover the fragrance that represents you. Take our quiz to find
              the perfect perfume for you.
            </p>
            <button className="mt-[2rem] cursor-pointer w-fit flex items-center justify-center uppercase px-[1.5rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300">
              Start the Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="lg:mt-[2rem]">
        <div className="overflow-hidden">
          <NotesAnimation notes={homeData.notes} locale={locale} />
        </div>
      </div>

      {/* Text Image Section */}
      <section className="-mt-[6rem] bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w flex flex-col md:flex-row gap-28 items-center">
          <div className="max-w-[750px] w-full">
            <div className="relative w-full h-[500px]">
              <ParallaxImage
                src={homeData.textImageSection.image.asset.url}
                alt={homeData.textImageSection.heading}
                className="object-cover rounded-[1rem] md:rounded-none w-fit h-[400px]"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-[500] max-w-sm leading-[120%]">
              {homeData.textImageSection.heading}
            </h2>
            <p gsap-target="paragraph-1" className="text-[1rem] lg:max-w-[95%]">
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
      <div className="mt-[10rem] bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w">
          <NewsHorizontalScroll cards={homeData.news} locale={locale} />
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-[8rem] mb-[14rem] bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <div className="max-w">
          <SocialMedia socialMediaImages={homeData.socialMediaImages} />
        </div>
      </div>
    </main>
  );
}
