import { Perfume, SanityImage } from "./perfume";

export interface HomePagePerfume {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  featuredImage: {
    asset: SanityImage;
  };
}

export interface HomePageNews {
  _id: string;
  _updatedAt: string;
  _createdAt: string;
  title: string;
  description: string;
  slug: string;
  featuredImage: {
    asset: SanityImage;
  };
}

export interface TextImageSection {
  image: {
    asset: SanityImage;
  };
  heading: string;
  description: string;
}

export interface SocialMediaImage {
  image: {
    asset: SanityImage;
  };
  url: string;
}

export interface HomePageInterface {
  perfumes: Perfume[];
  circularIngridientsImages: {
    asset: SanityImage;
  }[];
  textImageSection: TextImageSection;
  news: HomePageNews[];
  socialMediaImages: SocialMediaImage[];
}
