import NewsList from "@/components/news/new-list";
import { LOCALES } from "@/lib/i18n/constants";
import { getNewsPageContent } from "@/lib/i18n/getSanityContent";
import { NewsListItem } from "@/types/news";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const newsPageData: NewsListItem[] | null = await getNewsPageContent(locale);

  return (
    <div className="bg-background">
      <NewsList news={newsPageData || []} />
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string; locale: string }>;
// }): Promise<Metadata> {
//   const { locale } = await params;

//   const baseUrl =
//     process.env.NEXT_PUBLIC_SITE_URL || "https://studio.figmenta.com";

//   const commonMetadata = {
//     formatDetection: {
//       telephone: false,
//       date: false,
//       email: false,
//       address: false,
//     },
//     metadataBase: new URL(baseUrl),
//     alternates: {
//       canonical: baseUrl,
//       languages: {
//         en: `${baseUrl}/en`,
//         it: `${baseUrl}/it`,
//         es: `${baseUrl}/es`,
//       },
//     },
//     robots: {
//       follow: true,
//       index: true,
//       nocache: true,
//       googleBot:
//         "noindex, follow, nocache, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
//     },
//     manifest: "/site.webmanifest",
//   };

//   const enMetadata = {
//     ...commonMetadata,
//     title: "Figmenta Studio: Where we design brands and digital properties",
//     description:
//       "Figmenta Studio helps you craft powerful brands and digital solutions that drive business success. Let's create something amazing together.",
//     authors: [{ name: "Figmenta Studio" }],
//     creator: "Figmenta Studio",
//     publisher: "Figmenta Studio",
//     openGraph: {
//       title: "Figmenta Studio | Creative & Digital Design Solutions",
//       description:
//         "Discover Figmenta Studio – your partner for creative branding, digital solutions, and innovative storytelling.",
//       url: baseUrl,
//       siteName: "Figmenta Studio",
//       locale: "en",
//       type: "website",
//       images: [
//         {
//           url: `${baseUrl}/logo.webp`,
//           width: 1200,
//           height: 630,
//           alt: "Figmenta Studio Branding Services",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Figmenta Studio | Creative & Digital Experts",
//       description:
//         "Transform your brand with Figmenta Studio's innovative design and digital services.",
//       creator: "@figmenta",
//       images: [`${baseUrl}/logo.webp`],
//     },
//   };

//   const itMetadata = {
//     ...commonMetadata,
//     title:
//       "Figmenta Studio: Dove progettiamo e realizziamo brand, siti web e digital properties",
//     description:
//       "Figmenta Studio ti aiuta a creare brand potenti e soluzioni digitali che favoriscono il successo aziendale. Creiamo qualcosa di straordinario insieme.",
//     authors: [{ name: "Figmenta Studio" }],
//     creator: "Figmenta Studio",
//     publisher: "Figmenta Studio",
//     openGraph: {
//       title: "Figmenta Studio | Soluzioni di Design Creativo e Digitale",
//       description:
//         "Scopri Figmenta Studio – il tuo partner per il branding creativo, soluzioni digitali e storytelling innovativo.",
//       url: baseUrl,
//       siteName: "Figmenta Studio",
//       locale: "it",
//       type: "website",
//       images: [
//         {
//           url: `${baseUrl}/logo.webp`,
//           width: 1200,
//           height: 630,
//           alt: "Servizi di Branding Figmenta Studio",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Figmenta Studio | Esperti in Creatività e Soluzioni Digitali",
//       description:
//         "Trasforma il tuo brand con i servizi innovativi di design e digitali di Figmenta Studio.",
//       creator: "@figmenta",
//       images: [`${baseUrl}/logo.webp`],
//     },
//   };

//   const esMetadata = {
//     ...commonMetadata,
//     title: "Figmenta Studio: Donde diseñamos marcas y propiedades digitales",
//     description:
//       "Figmenta Studio te ayuda a crear marcas poderosas y soluciones digitales que impulsan el éxito empresarial. Creemos algo increíble juntos.",
//     authors: [{ name: "Figmenta Studio" }],
//     creator: "Figmenta Studio",
//     publisher: "Figmenta Studio",
//     openGraph: {
//       title: "Figmenta Studio | Soluciones de Diseño Creativo y Digital",
//       description:
//         "Descubre Figmenta Studio – tu socio para branding creativo, soluciones digitales y narrativa innovadora.",
//       url: baseUrl,
//       siteName: "Figmenta Studio",
//       locale: "es",
//       type: "website",
//       images: [
//         {
//           url: `${baseUrl}/logo.webp`,
//           width: 1200,
//           height: 630,
//           alt: "Servicios de Branding Figmenta Studio",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Figmenta Studio | Expertos en Creatividad y Digital",
//       description:
//         "Transforma tu marca con los servicios innovadores de diseño y digitales de Figmenta Studio.",
//       creator: "@figmenta",
//       images: [`${baseUrl}/logo.webp`],
//     },
//   };

//   return locale === "en"
//     ? enMetadata
//     : locale === "it"
//       ? itMetadata
//       : esMetadata;
// }
