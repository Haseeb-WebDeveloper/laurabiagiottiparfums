import NewsList from "@/components/news/new-list";
import { LOCALES } from "@/lib/i18n/constants";
import {
  getNewsPageContent,
  getNewsPageForSEO,
} from "@/lib/i18n/getSanityContent";
import { NewsPage, SeoTagsInterface } from "@/types/news";
import { Metadata } from "next";

export default async function News({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const newsPageData = (await getNewsPageContent(locale)) as NewsPage | null;

  return (
    <div className="bg-background 2xl:px-[34px] md:px-[38px] md:px-[28px] px-[18px]">
      <NewsList news={newsPageData?.news || []} />
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
  const news = (await getNewsPageForSEO(locale)) as SeoTagsInterface;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.laurabiagiottiparfums.com";

  const newsUrl = `${baseUrl}/${locale}/news`;

  const metaTitle = "News | Laurabiagiotti";
  const metaDescription =
    "Discover the latest news and updates from Laurabiagiotti.";
  const ogTitle = "News | Laurabiagiotti";
  const ogDescription =
    "Discover the latest news and updates from Laurabiagiotti.";
  const twitterTitle = "News | Laurabiagiotti";
  const twitterDescription =
    "Discover the latest news and updates from Laurabiagiotti.";

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
        en: `${baseUrl}/en/news`,
        it: `${baseUrl}/it/news`,
        de: `${baseUrl}/de/news`,
      },
    },
    robots: {
      follow: false,
      index: false,
      nocache: false,
      // googleBot:
      //   "index, follow, nocache, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
  };

  const metadata = {
    ...commonMetadata,
    title: news.metaTitle || metaTitle,
    description: news.metaDescription || metaDescription,
    authors: [{ name: "Laurabiagiotti" }],
    creator: "Laurabiagiotti",
    publisher: "Laurabiagiotti",
    openGraph: {
      title: news.ogTitle || ogTitle,
      description: news.ogDescription || ogDescription,
      url: newsUrl,
      siteName: "Laurabiagiotti",
      locale: locale,
      type: "article",
      images: [
        {
          url: news.ogImage?.asset?.url || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: news.ogTitle || ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.twitterTitle || twitterTitle,
      description: news.twitterDescription || twitterDescription,
      creator: "@figmenta",
      images: [news.ogImage?.asset?.url || `${baseUrl}/logo.webp`],
    },
  };

  return metadata as Metadata;
}
