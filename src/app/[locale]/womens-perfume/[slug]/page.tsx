import CollectionSlug from "@/components/perfumms/collection-slug";
import MainPerfumeSlug from "@/components/perfumms/main-perfume-slug";
import PerfumeSlug from "@/components/perfumms/perfume-slug";
import { LOCALES } from "@/lib/i18n/constants";
import {
  getProductBySlug,
  getAllSubCategories,
} from "@/lib/i18n/getSanityContent";

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
      <div className="bg-background 2xl:px-[34px] lg:px-[38px] md:px-[28px] px-[18px] mt-[30rem]">
        <MainPerfumeSlug 
          mainPerfume={productData.mainPerfume} 
          locale={locale} 
        />
      </div>
    );
  }

  if (productData.collection) {
    return (
      <div className="bg-background 2xl:px-[34px] lg:px-[38px] md:px-[28px] px-[18px]">
        <CollectionSlug 
          collection={productData.collection} 
          locale={locale} 
        />
      </div>
    );
  }

  return <div>Content not found</div>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
