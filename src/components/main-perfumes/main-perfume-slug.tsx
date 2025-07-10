import { MainPerfume } from "@/types/main-perfume";

export default function MainPerfumeSlug({
  mainPerfume,
  locale,
}: {
  mainPerfume: MainPerfume;
  locale: string;
}) {


  return (
    <div className="container mx-auto px-4 pt-[15rem]">
      <p>Main Perfume Slug</p>
    </div>
  );
}
