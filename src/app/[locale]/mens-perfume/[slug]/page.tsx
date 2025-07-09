import CollectionSlug from "@/components/perfumms/collection-slug";
import MainPerfumeSlug from "@/components/perfumms/main-perfume-slug";
import PerfumeSlug from "@/components/perfumms/perfume-slug";
import { LOCALES } from "@/lib/i18n/constants";
import {
  getCollectionBySlug,
  getMainPerfumeBySlug,
  getPerfumeBySlug,
  getAllSubCategories,
} from "@/lib/i18n/getSanityContent";

export default async function PerfumePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  // Sub category
  const subCategories = await getAllSubCategories(locale);

  // Try to fetch from each source in order
  const perfume = await getPerfumeBySlug(slug, locale);
  if (perfume) {
    return (
      <div className="bg-background overflow-hidden">
        <PerfumeSlug perfume={perfume} locale={locale} subCategories={subCategories || []} />
      </div>
    );
  }

  // const mainPerfume = await getMainPerfumeBySlug(slug, locale);
  // if (mainPerfume) {
  //   return (
  //     <div className="bg-background 2xl:px-[34px] lg:px-[38px] px-[18px]">
  //       <MainPerfumeSlug perfume={mainPerfume} locale={locale} />
  //     </div>
  //   );
  // }

  // const collection = await getCollectionBySlug(slug, locale);
  // if (collection) {
  //   return (
  //     <div className="bg-background 2xl:px-[34px] lg:px-[38px] px-[18px]">
  //       <CollectionSlug collection={collection} locale={locale} />
  //     </div>
  //   );
  // }

  return <div>Content not found</div>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
