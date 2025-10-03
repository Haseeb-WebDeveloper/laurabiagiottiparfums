import { LOCALES } from "@/lib/i18n/constants";
import {
  getCookiesPolicy,
  getCookiesPolicyForSEO,
} from "@/lib/i18n/getSanityContent";   
import { Metadata } from "next";
import { SeoTagsInterface } from "@/types/news";
import CookiesPolicyPage from "@/components/cookies-policy/cookies-policy-page";

export default async function CookiesPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookiesPolicyData = await getCookiesPolicy(locale);

  return (
    <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
      {cookiesPolicyData && (
        <CookiesPolicyPage cookiesPolicyData={cookiesPolicyData} />
      )}
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
  const cookiesPolicyData = (await getCookiesPolicyForSEO(locale)) as SeoTagsInterface;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.laurabiagiottiparfums.com";

  const cookiesPolicyUrl = `${baseUrl}/${locale}`;

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
      canonical: cookiesPolicyUrl,
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
  };

  const metadata = {
    ...commonMetadata,
    title: cookiesPolicyData.metaTitle || metaTitle,
    description: cookiesPolicyData.metaDescription || metaDescription,
    authors: [{ name: "Laurabiagiotti" }],
    creator: "Laurabiagiotti",
    publisher: "Laurabiagiotti",
    openGraph: {
      title: cookiesPolicyData.ogTitle || ogTitle,
      description: cookiesPolicyData.ogDescription || ogDescription,
      url: cookiesPolicyUrl,
      siteName: "Laurabiagiotti",
      locale: locale,
      type: "article",
      images: [
        {
          url: cookiesPolicyData.ogImage?.asset?.url || `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cookiesPolicyData.twitterTitle || twitterTitle,
      description: cookiesPolicyData.twitterDescription || twitterDescription,
      creator: "@laurabiagiottiparfums",
      images: [cookiesPolicyData.ogImage?.asset?.url || `${baseUrl}/logo.webp`],
    },
  };

  return metadata as Metadata;
}
