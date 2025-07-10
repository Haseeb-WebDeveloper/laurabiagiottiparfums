import PerfumesList from "@/components/perfumms/perfumes-list";
import { LOCALES } from "@/lib/i18n/constants";
import {
  getAllSubCategories,
  getMensPerfumes,
} from "@/lib/i18n/getSanityContent";

export default async function MensPerfumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const perfumes = await getMensPerfumes(locale);
  const subCategories = await getAllSubCategories(locale);

  if (!subCategories) {
    return <div>No sub categories found</div>;
  }

  if (!perfumes) {
    return <div>No perfumes found</div>;
  }

  return (
    <div className="bg-background 2xl:px-[34px] lg:px-[38px] md:px-[28px] px-[18px]">
      <PerfumesList
        perfumes={perfumes}
        locale={locale}
        slugPrefix="mens-perfume"
        title="Men's Perfume"
        subCategories={subCategories}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
