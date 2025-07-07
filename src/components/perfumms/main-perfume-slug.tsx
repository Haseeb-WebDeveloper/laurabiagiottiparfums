import PerfumeSlugHeroSection from "./perfume-slug-hero-section";

interface MainPerfumeProps {
  perfume: {
    title: string;
    description: string;
    heroSectionImages: {
      asset: {
        url: string;
      };
    }[];
    localized?: {
      value: {
        title: string;
        description: string;
      };
    };
  };
  locale: string;
}

export default function MainPerfumeSlug({ perfume, locale }: MainPerfumeProps) {
  return (
    <div className="container mx-auto px-4 pt-[15rem]">
      {/* <PerfumeSlugHeroSection
        heroSectionImages={perfume.heroSectionImages}
        description={perfume.localized?.value.description || perfume.description}
      /> */}
      <p>Main Perfume Slug</p>
    </div>
  );
}