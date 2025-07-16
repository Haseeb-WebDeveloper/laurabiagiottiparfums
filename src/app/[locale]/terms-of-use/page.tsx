import { LOCALES } from "@/lib/i18n/constants";
import {
  getTermsOfUse,
  getTermsOfUseForSEO,
} from "@/lib/i18n/getSanityContent";
import { Metadata } from "next";
import { SeoTagsInterface } from "@/types/news";
import TermsOfUsePage from "@/components/terms-of-use/terms-of-use-page";

export default async function TermsOfUse({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const termsOfUseData = await getTermsOfUse(locale);

  return (
    <div className="bg-background 2xl:px-[34px] lg:px-[38px] md:px-[28px] px-[18px]">
      {termsOfUseData && <TermsOfUsePage termsOfUseData={termsOfUseData} />}
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
  const termsOfUseData = (await getTermsOfUseForSEO(locale)) as SeoTagsInterface;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.laurabiagiottiparfums.com";

  const termsOfUseUrl = `${baseUrl}/${locale}`;

  const metaTitle = "Home | Laurabiagiotti";
  const metaDescription = "Discover the latest products from Laurabiagiotti.";
  const ogTitle = "Home | Laurabiagiotti";
  const ogDescription = "Discover the latest products from Laurabiagiotti.";
  const twitterTitle = "Home | Laurabiagiotti";
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
      canonical: termsOfUseUrl,
      languages: {
        en: `${baseUrl}/en`,
        it: `${baseUrl}/it`,
        de: `${baseUrl}/de`,
      },
    },
    robots: {
      follow: false,
      index: false,
      nocache: false,
      // googleBot:
      //   "index, follow, nocache, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    manifest: "/site.webmanifest",
  };

  const metadata = {
    ...commonMetadata,
    title: termsOfUseData.metaTitle || metaTitle,
    description: termsOfUseData.metaDescription || metaDescription,
    authors: [{ name: "Laurabiagiotti" }],
    creator: "Laurabiagiotti",
    publisher: "Laurabiagiotti",
    openGraph: {
      title: termsOfUseData.ogTitle || ogTitle,
      description: termsOfUseData.ogDescription || ogDescription,
      url: termsOfUseUrl,
      siteName: "Laurabiagiotti",
      locale: locale,
      type: "article",
      images: [
        {
          url: termsOfUseData.ogImage?.asset?.url || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: termsOfUseData.ogTitle || ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: termsOfUseData.twitterTitle || twitterTitle,
      description: termsOfUseData.twitterDescription || twitterDescription,
      creator: "@figmenta",
      images: [termsOfUseData.ogImage?.asset?.url || `${baseUrl}/logo.webp`],
    },
  };

  return metadata as Metadata;
}
