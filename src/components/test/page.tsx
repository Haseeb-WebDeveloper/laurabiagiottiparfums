import ScrollRing from "@/components/test/3d";
import ThreeColumnScroll from "@/components/home/three-column-scroll";
import { LOCALES } from "@/lib/i18n/constants";
import { Metadata } from "next";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // const HomePageData: HomePageData = await getHomePageData(locale);

  // Prepare the heading data to pass to client component
  const headingData = {
    locale,
    enHeading: {
      text: "Brands, products and everything in between",
      pacificoWord: "between",
    },
    itHeading: {
      text: "Progettazione di Brand e prodotti Digitali",
      pacificoWord: "prodotti",
    },
    esHeading: {
      text: "Marcas, productos y todo lo demás",
      pacificoWord: "demás",
    },
  };

  const dummyProducts = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
      title: "Premium Wireless Headphones",
      description:
        "Experience crystal-clear audio with our premium wireless headphones featuring noise cancellation and 30-hour battery life.",
      meta: {
        price: "$299.99",
        category: "Electronics",
        rating: 5,
      },
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      title: "Minimalist Desk Setup",
      description:
        "Transform your workspace with our sleek, minimalist desk setup that combines functionality with modern aesthetics.",
      meta: {
        price: "$599.99",
        category: "Furniture",
        rating: 4,
      },
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
      title: "Luxury Timepiece",
      description:
        "Crafted with precision and elegance, this luxury timepiece features Swiss movement and premium materials.",
      meta: {
        price: "$1,299.99",
        category: "Accessories",
        rating: 5,
      },
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
      title: "Athletic Running Shoes",
      description:
        "Engineered for performance and comfort, these running shoes feature advanced cushioning and breathable materials.",
      meta: {
        price: "$179.99",
        category: "Sports",
        rating: 4,
      },
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=400&fit=crop",
      title: "Vintage Leather Jacket",
      description:
        "Timeless style meets modern craftsmanship in this vintage-inspired leather jacket made from premium cowhide.",
      meta: {
        price: "$399.99",
        category: "Fashion",
        rating: 5,
      },
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop",
      title: "Gourmet Coffee Blend",
      description:
        "Discover the perfect balance of rich flavors in our signature gourmet coffee blend, sourced from premium beans.",
      meta: {
        price: "$24.99",
        category: "Food & Drink",
        rating: 4,
      },
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
      title: "Smart Home Device",
      description:
        "Control your entire home with voice commands using our advanced smart home device with AI integration.",
      meta: {
        price: "$149.99",
        category: "Smart Home",
        rating: 5,
      },
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=400&fit=crop",
      title: "Organic Skincare Set",
      description:
        "Nourish your skin with our complete organic skincare set, formulated with natural ingredients and essential oils.",
      meta: {
        price: "$89.99",
        category: "Beauty",
        rating: 4,
      },
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      title: "Professional Camera",
      description:
        "Capture life's moments with stunning clarity using our professional-grade camera with advanced autofocus.",
      meta: {
        price: "$899.99",
        category: "Photography",
        rating: 5,
      },
    },
  ];

  const ringImages = [
    '/3d-test.webp', // Abstract art 1
    '/3d-test.webp', // Abstract art 2
    '/3d-test.webp', // Abstract art 3
    '/3d-test.webp', // Abstract art 4
    '/3d-test.webp', // Abstract art 5
    '/3d-test.webp', // Abstract art 6
  ];

  return (
    <>
      {/* <ThreeColumnScroll products={dummyProducts} /> */}
      <ScrollRing images={ringImages} />
    </>
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
