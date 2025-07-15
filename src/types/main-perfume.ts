import { SanityAssetDocument } from "next-sanity";
import { Country, OlfactoryNote, RelatedProduct, SanityImage } from "./perfume";

interface SanityFile {
  asset: SanityAssetDocument & {
    mimeType: string;
  };
}

// Sub-category reference type
interface SubCategory {
  _id: string;
  title: string;
  slug: string;
}

// Hero section image type
export interface HeroSectionImage {
  title: string;
  image: {
    asset: SanityImage;
  };
}

// Fourth section content type
interface FourthSectionTextImage {
  title: string;
  text: string;
  file: SanityFile;
}


// Sixth section content types
interface SectionContent {
  title: string;
  description: string;
}

export interface SixthSectionInterface {
  heading: string;
  files: SanityFile[];
  firstContent: SectionContent;
  secondContent: SectionContent;
}

// Seventh section content type
export interface SeventhSectionInterface {
  heading: string;
  files: SanityFile[];
  content: SectionContent;
}


// Main perfume interface
export interface MainPerfume {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  description: string;
  category: "mens" | "womens";
  subCategory: SubCategory;
  featuredImage: SanityImage;
  heroSectionImages: HeroSectionImage[];
  secondSectionQuoteText: string;
  bgFile: SanityFile;
  bigHeading: string;
  fourthSectionTextImage: FourthSectionTextImage;
  olfactoryNotes: OlfactoryNote[];
  olfactoryFamily: string;
  nose: string;
  scentDescription: string;
  sixthSection: SixthSectionInterface;
  seventhSection: SeventhSectionInterface;
  heroProductImage: {
    asset: SanityImage;
  };
  buy?: {
    countries: Country[];
  };
  relatedProducts: RelatedProduct[];
}

// Query function return type
export type MainPerfumeQueryResult = MainPerfume | null;
