import { HomePageNews } from "@/types/home-page";
import Link from "next/link";
import { ParallaxImage } from "../ui/ParallaxImage";

export default function News({ news, locale }: { news: HomePageNews[]; locale: string }) {
  return (
    <section className="">
      <h2 className="text-3xl font-semibold text-center mb-12">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((newsItem) => (
          <Link
            href={`/${locale}/news/${newsItem.slug}`}
            key={newsItem._id}
            className="group"
          >
            <div className="aspect-[16/9] relative rounded-lg overflow-hidden mb-4">
              <ParallaxImage
                src={newsItem.featuredImage.asset.url}
                alt={newsItem.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {newsItem.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
