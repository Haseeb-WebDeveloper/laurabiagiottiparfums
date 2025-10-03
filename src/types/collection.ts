import { SanityAssetDocument } from "next-sanity";
import { Country, Ingredient, RelatedProduct, SanityImage, SubCategory } from "./perfume";

interface SanityFile {
  asset: SanityAssetDocument & {
    mimeType: string;
  };
}

// Referenced perfume type (for productsCollection and relatedProducts)
export interface CollectionPerfume {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: "mens" | "womens";
  heroSectionImages?: {
    asset: SanityImage;
  }[];
  isPartOfCollection?: boolean;
  collectionPageImages?: {
    asset: SanityImage;
  }[];
  descriptionForCollectionPage?: string;
  ingredients?: Ingredient[];
  buy?: {
    countries: Country[];
  };
}

// First section content type
interface FirstSection {
  tagLine: string;
  image: {
    asset: SanityImage;
  };
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
  featuredImage: {
    asset: SanityImage;
  };
  firstSection: FirstSection;
  productsCollection: CollectionPerfume[];
  relatedProducts: RelatedProduct[];
}

// Query function return type
export type CollectionQueryResult = Collection | null;
