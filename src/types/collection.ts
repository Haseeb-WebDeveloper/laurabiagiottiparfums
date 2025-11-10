import { SanityAssetDocument } from "next-sanity";
import {
  Country,
  Ingredient,
  RelatedProduct,
  SanityImage,
  SubCategory,
} from "./perfume";

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

// Bottles Section type for collection
export interface BottlesSectionItem {
  bottleImage: {
    asset: SanityImage;
  };
  images: {
    asset: SanityImage;
  }[];
  backgroundImage: {
    asset: SanityImage;
  };
  productDescription?: string;
  product: {
    // Only require the fields queried for in bottlesSection in the query
    title: string;
    description: string;
    slug?: string;
    category?: "mens" | "womens";
    buy?: {
      countries: Country[];
    };
  };
}

type BottlesSection = BottlesSectionItem[];

// First section content type
interface FirstSection {
  title: string;
  description: string;
  video: SanityFile;
}

// Second section content type
interface SecondSection {
  video: SanityFile;
  titleOnVideo: string;
  descriptionOnVideo: string;
  rightTitle: string;
  rightDescription: string;
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
  secondSection: SecondSection;
  bottlesSection: BottlesSection;
  relatedProducts: RelatedProduct[];
}

// Query function return type
export type CollectionQueryResult = Collection | null;
