import { Perfume } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";

export default function PerfumesList({
  perfumes,
  slugPrefix,
  title,
  locale,
}: {
  perfumes: Perfume[];
  slugPrefix: string;
  title: string;
  locale: string;
}) {
  return (
    <div className="container mx-auto px-4 py-8 mt-[6rem]">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {perfumes.map((perfume: Perfume) => (
          <Link
            href={`/${locale}/${slugPrefix}/${perfume.slug}`}
            key={perfume._id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="relative h-64">
                <Image
                  src={perfume.featuredImage.asset.url}
                  alt={perfume.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{perfume.title}</h2>
                <p className="text-gray-600 mb-2">{perfume.olfactoryFamily}</p>
                <p className="text-sm text-gray-500">By {perfume.nose}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
