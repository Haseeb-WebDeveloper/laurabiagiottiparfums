import { SanityAssetDocument } from "next-sanity";
import { SanityImage, SubCategory } from "./perfume";

interface SanityFile {
  asset: SanityAssetDocument & {
    mimeType: string;
  };
}

// Referenced perfume type (for productsCollection and relatedProducts)
interface CollectionPerfume {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: "mens" | "womens";
  featuredImage: SanityImage;
}

// First section content type
interface FirstSection {
  tagLine: string;
  image: SanityImage;
  description: string;
  bgMedia: SanityFile;
}

// Main collection interface
export interface Collection {
  _id: string;
  _type: string;
  title: string;
  description: string;
  slug: string;
  category: "mens" | "womens";
  subCategory: SubCategory;
  featuredImage: SanityImage;
  firstSection: FirstSection;
  productsCollection: CollectionPerfume[];
  relatedProducts: CollectionPerfume[];
}

// Query function return type
export type CollectionQueryResult = Collection | null;
