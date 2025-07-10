import PerfumesList from "@/components/perfumms/perfumes-list";
import { LOCALES } from "@/lib/i18n/constants";
import {
  getAllSubCategories,
  getWomensPerfumes,
} from "@/lib/i18n/getSanityContent";

export default async function WomensPerfumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const perfumes = await getWomensPerfumes(locale);
  const subCategories = await getAllSubCategories(locale);

  if (!perfumes) {
    return <div>No perfumes found</div>;
  }

  if (!subCategories) {
    return <div>No sub categories found</div>;
  }

  return (
    <div className="bg-background 2xl:px-[34px] lg:px-[38px] md:px-[28px] px-[18px]">
      <PerfumesList
        perfumes={perfumes}
        locale={locale}
        slugPrefix="womens-perfume"
        title="Women's Perfumes"
        subCategories={subCategories}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
