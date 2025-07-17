import PerfumesList from "@/components/perfumms/perfumes-list";
import { LOCALES } from "@/lib/i18n/constants";
import {
  getAllSubCategories,
  getWomensPerfumes,
} from "@/lib/i18n/getSanityContent";
import { Metadata } from "next";

export default async function WomensPerfumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [perfumes, subCategories] = await Promise.all([
    getWomensPerfumes(locale),
    getAllSubCategories(locale),
  ]);

  if (!perfumes) {
    return <div>No perfumes found</div>;
  }

  if (!subCategories) {
    return <div>No sub categories found</div>;
  }

  return (
    <div className="bg-background 2xl:px-[34px] md:px-[38px] md:px-[28px] px-[18px]">
      <PerfumesList
        perfumes={perfumes}
        locale={locale}
        slugPrefix="womens-perfume"
        title="Women's Perfumes"
        subCategories={subCategories}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // const news = (await getBrandPageForSEO(locale)) as SeoTagsInterface;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.laurabiagiottiparfums.com";

  const newsUrl = `${baseUrl}/${locale}/womens-perfume`;

  const commonMetadata = {
    formatDetection: {
      telephone: false,
      date: false,
      email: false,
      address: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: newsUrl,
      languages: {
        en: `${baseUrl}/en/womens-perfume`,
        it: `${baseUrl}/it/womens-perfume`,
        de: `${baseUrl}/de/womens-perfume`,
      },
    },
    robots: {
      follow: true,
      index: true,
      nocache: true,
      // googleBot:
      //   "index, follow, nocache, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
  };

  const metadata = {
    ...commonMetadata,
    title: "Womens Perfume | Laurabiagiotti",
    description: "Discover the latest news and updates from Laurabiagiotti.",
    authors: [{ name: "Laurabiagiotti" }],
    creator: "Laurabiagiotti",
    publisher: "Laurabiagiotti",
    openGraph: {
      title: "Womens Perfume | Laurabiagiotti",
      description: "Discover the latest news and updates from Laurabiagiotti.",
      url: newsUrl,
      siteName: "Laurabiagiotti",
      locale: locale,
      type: "article",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Womens Perfume | Laurabiagiotti",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Womens Perfume | Laurabiagiotti",
      description: "Discover the latest news and updates from Laurabiagiotti.",
      creator: "@figmenta",
      images: [`${baseUrl}/logo.webp`],
    },
  };

  return metadata as Metadata;
}
