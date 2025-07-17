import BrandPageComponent from "@/components/brand/brand-page";
import { LOCALES } from "@/lib/i18n/constants";
import {
  getBrandPageContent,
  getBrandPageForSEO,
} from "@/lib/i18n/getSanityContent";
import { BrandPage } from "@/types/brand";
import { SeoTagsInterface } from "@/types/news";
import { Metadata } from "next";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const brandPageData: BrandPage | null = (await getBrandPageContent(
    locale
  )) as BrandPage;

  return (
    <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
      <BrandPageComponent brandPageData={brandPageData} />
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
  const brandPage = (await getBrandPageForSEO(locale)) as SeoTagsInterface;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.laurabiagiottiparfums.com";

  const brandPageUrl = `${baseUrl}/${locale}/brand`;

  const metaTitle = "Brand | Laurabiagiotti";
  const metaDescription = "Discover the latest products from Laurabiagiotti.";
  const ogTitle = "Brand | Laurabiagiotti";
  const ogDescription = "Discover the latest products from Laurabiagiotti.";
  const twitterTitle = "Brand | Laurabiagiotti";
  const twitterDescription =
    "Discover the latest products from Laurabiagiotti.";

  const commonMetadata = {
    formatDetection: {
      telephone: false,
      date: false,
      email: false,
      address: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: brandPageUrl,
      languages: {
        en: `${baseUrl}/en/brand`,
        it: `${baseUrl}/it/brand`,
        de: `${baseUrl}/de/brand`,
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
    title: brandPage.metaTitle || metaTitle,
    description: brandPage.metaDescription || metaDescription,
    authors: [{ name: "Laurabiagiotti" }],
    creator: "Laurabiagiotti",
    publisher: "Laurabiagiotti",
    openGraph: {
      title: brandPage.ogTitle || ogTitle,
      description: brandPage.ogDescription || ogDescription,
      url: brandPageUrl,
      siteName: "Laurabiagiotti",
      locale: locale,
      type: "article",
      images: [
        {
          url: brandPage.ogImage?.asset?.url || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: brandPage.ogTitle || ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandPage.twitterTitle || twitterTitle,
      description: brandPage.twitterDescription || twitterDescription,
      creator: "@figmenta",
      images: [brandPage.ogImage?.asset?.url || `${baseUrl}/logo.webp`],
    },
  };

  return metadata as Metadata;
}
