import PerfumesList from "@/components/perfumms/perfumes-list";
import { LOCALES } from "@/lib/i18n/constants";
import { getWomensPerfumes } from "@/lib/i18n/getSanityContent";

export default async function WomensPerfumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const perfumes = await getWomensPerfumes(locale);

  if (!perfumes) {
    return <div>No perfumes found</div>;
  }

  return (
    <PerfumesList
      perfumes={perfumes}
      locale={locale}
      slugPrefix="womens-perfume"
      title="Women's Perfumes"
    />
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
