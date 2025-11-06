import { LOCALES } from "@/lib/i18n/constants";
import {
  getPrivacyPolicy,
  getPrivacyPolicyForSEO,
} from "@/lib/i18n/getSanityContent";
import { Metadata } from "next";
import { SeoTagsInterface } from "@/types/news";
import PrivacyPolicyPage from "@/components/privacy-policy/privacy-policy-page";
import Navbar from "@/components/layout/navbar";
export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const privacyPolicyData = await getPrivacyPolicy(locale);

  return (
    <>
      <Navbar />
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        {privacyPolicyData && (
          <PrivacyPolicyPage privacyPolicyData={privacyPolicyData} />
        )}
      </div>
    </>
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
  const privacyPolicyData = (await getPrivacyPolicyForSEO(
    locale
  )) as SeoTagsInterface;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.laurabiagiottiparfums.com";

  const privacyPolicyUrl = `${baseUrl}/${locale}`;

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
      canonical: privacyPolicyUrl,
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
    title: privacyPolicyData.metaTitle || metaTitle,
    description: privacyPolicyData.metaDescription || metaDescription,
    authors: [{ name: "Laurabiagiotti" }],
    creator: "Laurabiagiotti",
    publisher: "Laurabiagiotti",
    openGraph: {
      title: privacyPolicyData.ogTitle || ogTitle,
      description: privacyPolicyData.ogDescription || ogDescription,
      url: privacyPolicyUrl,
      siteName: "Laurabiagiotti",
      locale: locale,
      type: "article",
      images: [
        {
          url:
            privacyPolicyData.ogImage?.asset?.url || `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: privacyPolicyData.twitterTitle || twitterTitle,
      description: privacyPolicyData.twitterDescription || twitterDescription,
      creator: "@laurabiagiottiparfums",
      images: [privacyPolicyData.ogImage?.asset?.url || `${baseUrl}/logo.png`],
    },
  };

  return metadata as Metadata;
}
