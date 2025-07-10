import { SanityAssetDocument } from "next-sanity";
import { Country, SanityImage } from "./perfume";

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
interface HeroSectionImage {
  title: string;
  image: SanityImage;
}

// Fourth section content type
interface FourthSectionTextImage {
  title: string;
  text: string;
  file: SanityFile;
}

// Olfactory notes types
interface OlfactoryNote {
  [locale: string]: string; // The note text in the current locale
}

interface OlfactoryNoteCategory {
  image: SanityImage;
  title: string;
  notes: OlfactoryNote[];
}

// Sixth section content types
interface SectionContent {
  title: string;
  description: string;
}

interface SixthSection {
  heading: string;
  files: SanityFile[];
  firstContent: SectionContent;
  secondContent: SectionContent;
}

// Seventh section content type
interface SeventhSection {
  heading: string;
  files: SanityFile[];
  content: SectionContent;
}

// Related product type
interface RelatedProduct {
  _id: string;
  title: string;
  slug: string;
  featuredImage: SanityImage;
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
  olfactoryNotes: OlfactoryNoteCategory[];
  olfactoryFamily: string;
  nose: string;
  scentDescription: string;
  sixthSection: SixthSection;
  seventhSection: SeventhSection;
  heroProductImage: SanityImage;
  buy?: {
    countries: Country[];
  };
  relatedProducts: RelatedProduct[];
}

// Query function return type
export type MainPerfumeQueryResult = MainPerfume | null;
