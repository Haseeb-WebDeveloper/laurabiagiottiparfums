import PerfumeSlug from "@/components/perfumms/perfume-slug";
import { LOCALES } from "@/lib/i18n/constants";
import { getPerfumeBySlug } from "@/lib/i18n/getSanityContent";
import { Perfume } from "@/types/perfume";

export default async function PerfumePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const perfume = await getPerfumeBySlug(slug, locale);

  if (!perfume) {
    return <div>Perfume not found</div>;
  }

  console.log(perfume);

  return <PerfumeSlug perfume={perfume} locale={locale} />;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
