import { LOCALES } from "@/lib/i18n/constants";
import { getHomePage, getHomePageForSEO } from "@/lib/i18n/getSanityContent";
import HomePage from "@/components/home/home-page";
import { Metadata } from "next";
import { SeoTagsInterface } from "@/types/news";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeData = await getHomePage(locale);

  return (
    <div className="">
      {homeData && <HomePage homeData={homeData} locale={locale} />}
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
  const homePage = (await getHomePageForSEO(locale)) as SeoTagsInterface;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.laurabiagiottiparfums.com";

  const homePageUrl = `${baseUrl}/${locale}`;

  const metaTitle = "Home | Laurabiagiotti";
  const metaDescription =
    "Discover the latest products from Laurabiagiotti.";
  const ogTitle = "Home | Laurabiagiotti";
  const ogDescription =
    "Discover the latest products from Laurabiagiotti.";
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
      canonical: homePageUrl,
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
    title: homePage.metaTitle || metaTitle,
    description: homePage.metaDescription || metaDescription,
    authors: [{ name: "Laurabiagiotti" }],
    creator: "Laurabiagiotti",
    publisher: "Laurabiagiotti",
    openGraph: {
      title: homePage.ogTitle || ogTitle,
      description: homePage.ogDescription || ogDescription,
      url: homePageUrl,
      siteName: "Laurabiagiotti",
      locale: locale,
      type: "article",
      images: [
        {
          url: homePage.ogImage?.asset?.url || `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: homePage.ogTitle || ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: homePage.twitterTitle || twitterTitle,
      description: homePage.twitterDescription || twitterDescription,
      creator: "@laurabiagiottiparfums",
      images: [homePage.ogImage?.asset?.url || `${baseUrl}/logo.webp`],
    },
  };

  return metadata as Metadata;
}
