import { HomePageInterface } from "@/types/home-page";
import ThreeColumnScroll from "./three-column-scroll";
import Rotate from "./rotate";
import { ParallaxImage } from "../ui/ParallaxImage";
import NewsHorizontalScroll from "./horizontal-scroll";
import SocialMedia from "./social-media";
import HeroSlider from "./home-slider";

export default function HomePage({
  homeData,
  locale,
}: {
  homeData: HomePageInterface;
  locale: string;
}) {
  const data = [
    {
      title: "Discover the World of Perfume",
      description: "Explore our collection of the finest perfumes and colognes",
      image: "/test-1.webp",
    },
    {
      title: "Discover the World of Perfume",
      description: "Explore our collection of the finest perfumes and colognes",
      image: "/test-2.webp",
    },
    {
      title: "Discover the World of Perfume",
      description: "Explore our collection of the finest perfumes and colognes",
      image: "/test-3.webp",
    },
    {
      title: "Discover the World of Perfume",
      description: "Explore our collection of the finest perfumes and colognes",
      image: "/test-1.webp",
    },
    {
      title: "Discover the World of Perfume",
      description: "Explore our collection of the finest perfumes and colognes",
      image: "/test-1.webp",
    },
  ];

  return (
    <main className="max-w 2xl:mt-[17rem] lg:mt-[16.8rem] mt-[12.2rem] mb-[15rem] min-h-screen">
      <HeroSlider slides={data} />
      {/* Hero Section with Featured Perfumes */}
      <ThreeColumnScroll products={homeData.perfumes} />

      {/* Circular Ingredients Section */}
      <Rotate images={homeData.circularIngridientsImages} />

      {/* Text Image Section */}
      <section>
        <div className="flex flex-col md:flex-row gap-8 items-center">
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
      <div className="mt-[10rem]">
        <NewsHorizontalScroll cards={homeData.news} locale={locale} />
      </div>

      {/* Social Media Section */}
      <div className="mt-[8rem]">
        <SocialMedia socialMediaImages={homeData.socialMediaImages} />
      </div>
    </main>
  );
}
