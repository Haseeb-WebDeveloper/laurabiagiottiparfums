import { SanityImageAssetDocument } from "next-sanity";

export interface NewsPage {
  news: NewsListItem[];
}

export interface NewsListItem {
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    en: string;
    it: string;
    de: string;
  };
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
  slug: {
    en: string;
    it: string;
    de: string;
  };
  featuredImage: {
    asset: SanityImageAssetDocument;
  };
  description: string;
  content: string;
}

export interface SeoTagsInterface {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  ogImage: {
    asset: SanityImageAssetDocument;
  };
}

export interface PerfumeSeoTagsInterface {
  perfume?: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
    ogImage: {
      asset: SanityImageAssetDocument;
    };
  };
  mainPerfume?: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
    ogImage: {
      asset: SanityImageAssetDocument;
    };
  };
  collection?: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
    ogImage: {
      asset: SanityImageAssetDocument;
    };
  };
}
