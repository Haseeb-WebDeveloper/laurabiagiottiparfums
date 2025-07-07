import { NewsItem } from "@/types/news";
import { formatDateOnly } from "@/utils/formet-data";
import Link from "next/link";
import { ParallaxImage } from "../ui/ParallaxImage";
import RichEditor from "../rich-editor";

export default function NewsSlug({ news }: { news: NewsItem }) {
  return (
    <div className="max-w 2xl:mt-[17rem] lg:mt-[16.8rem] mt-[10rem] mb-[13rem]">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Image */}
        <div className="w-full lg:max-w-[32.5%]">
          <div className="aspect-[4/5] w-full relative">
            <ParallaxImage
              className="rounded-[1rem]"
              src={news.featuredImage?.asset.url || ""}
              alt={news.title}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </div>
        {/* Content */}
        <div className="w-full lg:w-[50%] space-y-[1rem] lg:px-2">
          <h3 className="">{news.title}</h3>
          <div
            // gsap-target="heading-1"
            className="uppercase tracking-[0.1em] text-[0.875rem] font-[700]"
          >
            {formatDateOnly(news._createdAt)}
          </div>

          {/* Content */}
          <div className="lg:max-w-[84%] pr-2">
            <RichEditor content={news.content} />
          </div>

          {/* More News */}
          <div className="flex flex-col gap-[1rem]">
            <Link
              href="/news"
              className="inline-block w-fit cursor-pointer uppercase px-[1.7rem] py-[0.6rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              <span>Discover all news</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
