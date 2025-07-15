import { Perfume, SanityImage } from "./perfume";
import { Note } from "./notes";

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


export interface HomePagePerfumeCarousel {
  perfume: Perfume;
  title: string;
  image: {
    asset: SanityImage;
  };
}

export interface HomePageInterface {
  perfumesCarousel: HomePagePerfumeCarousel[];
  perfumes: Perfume[];
  circularIngridientsImages: {
    asset: SanityImage;
  }[];
  notes: Note[];
  textImageSection: TextImageSection;
  news: HomePageNews[];
  socialMediaImages: SocialMediaImage[];
}
