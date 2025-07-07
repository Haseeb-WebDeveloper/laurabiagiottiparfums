import Image from "next/image";
import { NewsListItem } from "@/types/news";
import { formatDate } from "@/utils/formet-data";
import RichEditor from "../rich-editor";
import Link from "next/link";
import { ParallaxImage } from "../ui/ParallaxImage";

export default function NewsList({ news }: { news: NewsListItem[] }) {
  console.log(news);

  return (
    <div className="max-w 2xl:mt-[17rem] lg:mt-[16.8rem] mt-[8.2rem] mb-[15rem]">
      <h1 className="2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem]">News</h1>
      <div className="2xl:mt-[3.8rem] lg:mt-[3.75rem] mt-[3rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 lg:gap-y-20">
        {news.map((item, index) => (
          <div key={index} className="space-y-[1.9rem]">
            <div className="aspect-[4/5] w-full relative">
              <ParallaxImage
                src={item.featuredImage?.asset.url || ""}
                alt={item.title}
                className="rounded-[1rem]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={index < 4} // Load first 4 images immediately
              />
            </div>
            <div className="space-y-[0.3rem]">
              <div
                // gsap-target="heading-1"
                className="uppercase tracking-[0.1em] text-[0.875rem] font-[700]"
              >
                {formatDate(item._createdAt)}
              </div>
              <h3 className="line-clamp-2">{item.title}</h3>
              <p
                className="pt-[0.8rem]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: "1.5em",
                  margin: 0,
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {item.description}
              </p>
              <div className="mt-[2.5rem]">
                <Link
                  href={`/news/${item.slug}`}
                  className="cursor-pointer uppercase px-[1.7rem] py-[0.7rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
