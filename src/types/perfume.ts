interface SanityImage {
  _id: string;
  url: string;
}

export interface OlfactoryNote {
  image: {
    asset: SanityImage;
  };
  title: string;
  notes: { name: string }[];
}

interface Website {
  logo: {
    asset: SanityImage;
  };
  url: string;
}

export interface Country {
  countryName: string;
  websites: Website[];
}

interface ProductImagesSection {
  title: string;
  description: string;
  images: {
    asset: SanityImage;
  }[];
}

interface RelatedProduct {
  _id: string;
  title: string;
  slug: string;
  featuredImage: {
    asset: SanityImage;
  };
}

export interface Perfume {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: 'mens' | 'womens';
  subCategory: string;
  featuredImage: {
    asset: {
      url: string;
    };
  };
  heroSectionImages?: {
    asset: SanityImage;
  }[];
  olfactoryNotes?: OlfactoryNote[];
  olfactoryFamily: string;
  nose: string;
  scentDescription: string;
  bgFile?: {
    asset: SanityImage;
  };
  productImagesSection?: ProductImagesSection;
  heroProductImage?: {
    asset: SanityImage;
  };
  buy?: {
    countries: Country[];
  };
  previousProduct?: RelatedProduct;
  nextProduct?: RelatedProduct;
  relatedProducts?: RelatedProduct[];
  localized?: {
    value: {
      title: string;
    };
  };
}

export interface NavbarPerfumes {
  perfumes: Perfume[];
  collections: Perfume[];
  mainPerfumes: Perfume[];
}

export interface CombinedPerfume extends Perfume {
  type: 'collection' | 'mainPerfume' | 'perfume';
} 



export interface SubCategory {
  name: string;
} 
