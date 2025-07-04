import { NewsItem } from "@/types/news";
import { formatDate } from "@/utils/formet-data";
import Image from "next/image";
import Link from "next/link";

export default function NewsSlug({ news }: { news: NewsItem }) {
  return (
    <div className="px-[1.7rem] u-container">
      <div className="flex justify-between gap-4">
        {/* Image */}
        <div className="w-full">
          <Image
            src={news.featuredImage?.asset.url || ""}
            alt={news.title}
            width={500}
            height={500}
            className=""
          />
        </div>
        {/* Content */}
        <div className="w-full space-y-[1rem]">
          <h3 className="">{news.title}</h3>
          <p>{formatDate(news._createdAt)}</p>
          <p className="">{news.content}</p>

          {/* More News */}
          <div className="flex flex-col gap-[1rem]">
            <Link href="/news" className="w-fit h-fit cursor-pointer p-[0.555rem] leading-0 rounded-[0.45rem] text-[.75rem] font-[400] border hover:border-foreground border-transparent text-pretty capitalize transition-colors duration-300">
              <p>Discover all news</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
