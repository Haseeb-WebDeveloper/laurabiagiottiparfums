import { SanityImageAsset } from "./sanity";

  export interface NewsListItem {
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: string;
    featuredImage: {
      asset: SanityImageAsset;
    };
    content: string;
  }

  export interface NewsItem {
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: string;
    featuredImage: {
      asset: SanityImageAsset;
    };
    content: string;
  }