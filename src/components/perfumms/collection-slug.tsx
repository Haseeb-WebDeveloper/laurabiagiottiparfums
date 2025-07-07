import PerfumeSlugHeroSection from "./perfume-slug-hero-section";

interface CollectionProps {
  collection: {
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

export default function CollectionSlug({ collection, locale }: CollectionProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <PerfumeSlugHeroSection
        heroSectionImages={collection.heroSectionImages}
        description={collection.localized?.value.description || collection.description}
      /> */}
      <p>Collection Slug</p>
    </div>
  );
}