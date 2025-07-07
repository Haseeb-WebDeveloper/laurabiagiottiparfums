import { SanityImageAsset } from "./sanity";

export interface NewsPage {
  news: NewsListItem[];
}

  export interface NewsListItem {
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: string;
    featuredImage: {
      asset: SanityImageAsset;
    };
    description: string;
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
    description: string;
    content: string;
  }