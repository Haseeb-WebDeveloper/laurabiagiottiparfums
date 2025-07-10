import { Collection } from "@/types/collection";

export default function CollectionSlug({
  collection,
  locale,
}: {
  collection: Collection;
  locale: string;
}) {
  return (
    <div className="container mx-auto px-4 py-8 mt-[30rem]">
      <p>Collection Slug</p>
    </div>
  );
}
