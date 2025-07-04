import Image from "next/image";
import { NewsListItem } from "@/types/news";
import { formatDate } from "@/utils/formet-data";
import RichEditor from "../rich-editor";
import Link from "next/link";

export default function NewsList({ news }: { news: NewsListItem[] }) {
  console.log(news);
  return (
    <div className="px-[1.7rem] u-container">
      <h1>News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {news.map((item) => (
          <div key={item.slug}>
            <div className="image-container">
              <Image
                src={item.featuredImage?.asset.url || ""}
                alt={item.title}
                width={500}
                height={500}
                className="image-3"
              />
            </div>
            <p>{formatDate(item._createdAt)}</p>
            <p className="line-clamp-2">{item.title}</p>
            <p className="line-clamp-4">{item.content}</p>
            <Link
              href={`/news/${item.slug}`}
              className="cursor-pointer p-[0.555rem] leading-0 rounded-[0.45rem] text-[.75rem] font-[400] border hover:border-foreground border-transparent text-pretty capitalize transition-colors duration-300"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
