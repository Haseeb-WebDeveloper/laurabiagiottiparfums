import PerfumesList from "@/components/perfumms/perfumes-list";
import { LOCALES } from "@/lib/i18n/constants";
import { getMensPerfumes } from "@/lib/i18n/getSanityContent";

export default async function MensPerfumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const perfumes = await getMensPerfumes(locale);

  if (!perfumes) {
    return <div>No perfumes found</div>;
  }

  return (
    <PerfumesList
      perfumes={perfumes}
      locale={locale}
      slugPrefix="mens-perfume"
      title="Men's Perfumes"
    />
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
