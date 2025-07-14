import { SanityImageAssetDocument } from "next-sanity";

export interface NewsPage {
  news: NewsListItem[];
}

  export interface NewsListItem {
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: string;
    featuredImage: {
      asset: SanityImageAssetDocument;
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
      asset: SanityImageAssetDocument;
    };
    description: string;
    content: string;
  }