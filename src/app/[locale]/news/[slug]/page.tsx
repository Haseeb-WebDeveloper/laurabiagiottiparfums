import NewsSlug from "@/components/news/news-slug";
import { LOCALES } from "@/lib/i18n/constants";
import { getNewsBySlug } from "@/lib/i18n/getSanityContent";
import { NewsItem } from "@/types/news";
import { Metadata } from "next";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  const news = (await getNewsBySlug(slug, locale)) as NewsItem;

  return (
    <div className="bg-background 2xl:px-[34px] lg:px-[38px] md:px-[28px] px-[18px]">
      <NewsSlug news={news} />
    </div>
  );
}

// export async function generateStaticParams() {
//   const allCaseStudies = await getAllCaseStudiesSlugs();

//   const paths: { locale: string; slug: string }[] = [];

//   LOCALES.forEach((locale) => {
//     allCaseStudies?.forEach((study: any) => {
//       paths.push({
//         locale,
//         slug: study.slug,
//       });
//     });
//   });

//   return paths;
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string; locale: string }>;
// }): Promise<Metadata> {
//   const { slug, locale } = await params;
//   const caseStudy = await getCaseStudyBySlugForSEO(slug);

//   const baseUrl =
//     process.env.NEXT_PUBLIC_SITE_URL || "https://studio.figmenta.com";
//   const caseStudyUrl = `${baseUrl}/${locale}/case-study/${slug}`;

//   const defaultEnTitle = "Case Study | Figmenta Studio";
//   const defaultEnDescription =
//     "Discover how Figmenta Studio helped a client achieve their goals through our innovative solutions.";
//   const defaultItTitle = "Case Study | Figmenta Studio";
//   const defaultItDescription =
//     "Scopri come Figmenta Studio ha aiutato un cliente a raggiungere i suoi obiettivi attraverso le nostre soluzioni innovative.";
//   const defaultEsTitle = "Estudio de Caso | Figmenta Studio";
//   const defaultEsDescription =
//     "Descubre cómo Figmenta Studio ayudó a un cliente a alcanzar sus objetivos a través de nuestras soluciones innovadoras.";

//   const commonMetadata = {
//     formatDetection: {
//       telephone: false,
//       date: false,
//       email: false,
//       address: false,
//     },
//     metadataBase: new URL(baseUrl),
//     alternates: {
//       canonical: caseStudyUrl,
//       languages: {
//         en: `${baseUrl}/en/case-study/${slug}`,
//         it: `${baseUrl}/it/case-study/${slug}`,
//         es: `${baseUrl}/es/case-study/${slug}`,
//       },
//     },
//     robots: {
//       follow: true,
//       index: true,
//       nocache: true,
//       googleBot:
//         "index, follow, nocache, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
//     },
//     manifest: "/site.webmanifest",
//   };

//   const enMetadata = {
//     ...commonMetadata,
//     title: caseStudy.metaTitle.en || defaultEnTitle,
//     description: caseStudy.metaDescription.en || defaultEnDescription,
//     authors: [{ name: "Figmenta Studio" }],
//     creator: "Figmenta Studio",
//     publisher: "Figmenta Studio",
//     openGraph: {
//       title: caseStudy.ogTitle.en || defaultEnTitle,
//       description: caseStudy.ogDescription.en || defaultEnDescription,
//       url: caseStudyUrl,
//       siteName: "Figmenta Studio",
//       locale: "en",
//       type: "article",
//       images: [
//         {
//           url: caseStudy.ogImage.asset.url || `${baseUrl}/og-image.jpg`,
//           width: 1200,
//           height: 630,
//           alt: caseStudy.ogTitle.en || defaultEnTitle,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: caseStudy.twitterTitle.en || defaultEnTitle,
//       description: caseStudy.twitterDescription.en || defaultEnDescription,
//       creator: "@figmenta",
//       images: [caseStudy.ogImage.asset.url || `${baseUrl}/logo.webp`],
//     },
//   };

//   const itMetadata = {
//     ...commonMetadata,
//     title: caseStudy.ogTitle.it || defaultItTitle,
//     description: caseStudy.ogDescription.it || defaultItDescription,
//     authors: [{ name: "Figmenta Studio" }],
//     creator: "Figmenta Studio",
//     publisher: "Figmenta Studio",
//     openGraph: {
//       title: caseStudy.ogTitle.it || defaultItTitle,
//       description: caseStudy.ogDescription.it || defaultItDescription,
//       url: caseStudyUrl,
//       siteName: "Figmenta Studio",
//       locale: "it",
//       type: "article",
//       images: [
//         {
//           url: caseStudy.ogImage.asset.url || `${baseUrl}/og-image.jpg`,
//           width: 1200,
//           height: 630,
//           alt: caseStudy.ogTitle.it || defaultItTitle,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: caseStudy.twitterTitle.it || defaultItTitle,
//       description: caseStudy.twitterDescription.it || defaultItDescription,
//       creator: "@figmenta",
//       images: [caseStudy.ogImage.asset.url || `${baseUrl}/logo.webp`],
//     },
//   };

//   const esMetadata = {
//     ...commonMetadata,
//     title: caseStudy.ogTitle.es || defaultEsTitle,
//     description: caseStudy.ogDescription.es || defaultEsDescription,
//     authors: [{ name: "Figmenta Studio" }],
//     creator: "Figmenta Studio",
//     publisher: "Figmenta Studio",
//     openGraph: {
//       title: caseStudy.ogTitle.es || defaultEsTitle,
//       description: caseStudy.ogDescription.es || defaultEsDescription,
//       url: caseStudyUrl,
//       siteName: "Figmenta Studio",
//       locale: "es",
//       type: "article",
//       images: [
//         {
//           url: caseStudy.ogImage.asset.url || `${baseUrl}/og-image.jpg`,
//           width: 1200,
//           height: 630,
//           alt: caseStudy.ogTitle.es || defaultEsTitle,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: caseStudy.twitterTitle.es || defaultEsTitle,
//       description: caseStudy.twitterDescription.es || defaultEsDescription,
//       creator: "@figmenta",
//       images: [caseStudy.ogImage.asset.url || `${baseUrl}/logo.webp`],
//     },
//   };

//   return locale === "en"
//     ? enMetadata
//     : locale === "it"
//       ? itMetadata
//       : esMetadata;
// }
