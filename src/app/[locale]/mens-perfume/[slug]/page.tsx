import CollectionSlug from "@/components/perfume-collection/collection-slug";
import MainPerfumeSlug from "@/components/main-perfumes/main-perfume-slug";
import PerfumeSlug from "@/components/perfumms/perfume-slug";
import { LOCALES } from "@/lib/i18n/constants";
import {
  getProductBySlug,
  getAllSubCategories,
  getProductBySlugForSEO,
} from "@/lib/i18n/getSanityContent";
import { Metadata } from "next";
import { PerfumeSeoTagsInterface } from "@/types/news";
import { getAllPerfumesSlugQuery, getProductBySlugsForSitemapQuery } from "@/lib/sanity/queries";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { PerfumeData } from "@/app/sitemap.xml/route";

export default async function PerfumePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  // Fetch sub categories and product data in parallel
  const [subCategories, productData] = await Promise.all([
    getAllSubCategories(locale),
    getProductBySlug(slug, locale),
  ]);

  // Render based on which type of product was found
  if (productData.perfume) {
    return (
      <div className="bg-background overflow-hidden">
        <PerfumeSlug
          perfume={productData.perfume}
          locale={locale}
          subCategories={subCategories || []}
        />
      </div>
    );
  }

  if (productData.mainPerfume) {
    return (
      <div className="">
        <MainPerfumeSlug
          mainPerfume={productData.mainPerfume}
          locale={locale}
        />
      </div>
    );
  }

  if (productData.collection) {
    return (
      <div className="bg-background 2xl:px-[34px] md:px-[38px] px-[18px]">
        <CollectionSlug collection={productData.collection} locale={locale} />
      </div>
    );
  }

  return <div>Content not found</div>;
}

export async function generateStaticParams() {
  try {
    const perfumesData = await fetchSanityData<PerfumeData>(
      getProductBySlugsForSitemapQuery("mens"),
      { revalidate: 3600 } // Cache for 1 hour
    );

    if (!perfumesData) {
      console.warn('No perfumes data returned from Sanity');
      return [];
    }

    const perfumes = [
      perfumesData.perfume, 
      perfumesData.mainPerfume, 
      perfumesData.collection
    ].filter(Boolean);

    if (!perfumes.length) {
      console.warn('No valid perfumes found in data');
      return [];
    }

    const paths: { locale: string; slug: string }[] = [];

    LOCALES.forEach((locale) => {
      perfumes.forEach((perfume: any) => {
        if (perfume?.slug) {
          paths.push({
            locale,
            slug: perfume.slug,
          });
        }
      });
    });

    return paths;
  } catch (error) {
    // Log the error but don't fail the build
    console.error('Error generating static params for mens perfume:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const perfumeData = (await getProductBySlugForSEO(
    slug,
    locale
  )) as PerfumeSeoTagsInterface;

  // Find the first non-null product data
  const perfume =
    perfumeData.perfume || perfumeData.mainPerfume || perfumeData.collection;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.laurabiagiottiparfums.com";

  const perfumeUrl = `${baseUrl}/${locale}/mens-perfume/${slug}`;

  const metaTitle = "Mens Perfume | Laurabiagiotti";
  const metaDescription =
    "Discover the latest mens perfume from Laurabiagiotti.";
  const ogTitle = "Mens Perfume | Laurabiagiotti";
  const ogDescription = "Discover the latest mens perfume from Laurabiagiotti.";
  const twitterTitle = "Mens Perfume | Laurabiagiotti";
  const twitterDescription =
    "Discover the latest mens perfume from Laurabiagiotti.";

  const commonMetadata = {
    formatDetection: {
      telephone: false,
      date: false,
      email: false,
      address: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: perfumeUrl,
      languages: {
        en: `${baseUrl}/en/mens-perfume/${slug}`,
        it: `${baseUrl}/it/mens-perfume/${slug}`,
        de: `${baseUrl}/de/mens-perfume/${slug}`,
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
    title: perfume?.metaTitle || metaTitle,
    description: perfume?.metaDescription || metaDescription,
    authors: [{ name: "Laurabiagiotti" }],
    creator: "Laurabiagiotti",
    publisher: "Laurabiagiotti",
    openGraph: {
      title: perfume?.ogTitle || ogTitle,
      description: perfume?.ogDescription || ogDescription,
      url: perfumeUrl,
      siteName: "Laurabiagiotti",
      locale: locale,
      type: "article",
      images: [
        {
          url: perfume?.ogImage?.asset?.url || `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: perfume?.ogTitle || ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: perfume?.twitterTitle || twitterTitle,
      description: perfume?.twitterDescription || twitterDescription,
      creator: "@laurabiagiottiparfums",
      images: [perfume?.ogImage?.asset?.url || `${baseUrl}/logo.webp`],
    },
  };

  return metadata as Metadata;
}
