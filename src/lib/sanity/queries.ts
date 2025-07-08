// news For SITEMAP
export const getAllNewsSlugQuery = () => `
*[_type == "news"] {
  "slug": slug.current,
  _updatedAt
}
`;

// perfumes For SITEMAP
export const getAllPerfumesSlugQuery = () => `
*[_type == "perfume"] {
  "slug": slug.current,
  _updatedAt
}
`;

// Sub Category
export const getAllSubCategoriesQuery = (locale: string) => `
  *[_type == "sub-category"] {
    "name": name.${locale},
  }
`;

// News Page
export const getNewsPageQuery = (locale: string) => `
  *[_type == "newsPage"][0] {
    "news": news[]->{
      "title": title.${locale},
      "slug": slug.current,
      _createdAt,
      _updatedAt,
      featuredImage {
        asset -> {
          _id,
          url
        },
      },
      "content": content.${locale},
    }
  }
`;

// News List
export const getNewsListQuery = (locale: string) => `
  *[_type == "news"] | order(_createdAt desc){
    "title": title.${locale},
    "slug": slug.current,
    _createdAt,
    _updatedAt,
    featuredImage {
      asset -> {
        _id,
        url
      },
    },

    "content": content.${locale},
  }
`;

// Individual News
export const getNewsBySlugQuery = (slug: string, locale: string) => `
  *[_type == "news" && slug.current == "${slug}"][0]{
    _createdAt,
    _updatedAt,
    "title": title.${locale},
    "slug": slug.current,
    featuredImage {
      asset -> {
        _id,
        url
      },
    },
    "description": description.${locale},
    "content": content.${locale}
  }
`;

export const getBrandPageQuery = (locale: string) => `
 *[_type == "brand"][0]{
    _createdAt,
    _updatedAt,
    firstSection {
      "title": title.${locale},
      "description": description.${locale},
      images[] {
        image {
          asset -> {
            _id,
            url
          }
        },
        alt
      },
      "bottomText": bottomText.${locale}
    },
    secondSection {
      "title": title.${locale},
      image {
        image {
          asset -> {
            _id,
            url
          }
        },
        alt
      }
    },
    thirdSection {
      "text": text.${locale},
      image {
        image {
          asset -> {
            _id,
            url
          }
        },
        alt
      }
    },
    fourthSection {
      "title": title.${locale},
      "text": text.${locale},
      image {
        image {
          asset -> {
            _id,
            url
          }
        },
        alt
      }
    },
    lastSection {
      "text": text.${locale},
      url
    }
  }
`;

// Perfumes
export const getMensPerfumesQuery = (locale: string) => `
  *[_type == "perfume" && category == "mens"] {
    _id,
    title,
    category,
    "subCategory": subCategory->name.${locale},
    "slug": slug.current,
    "description": description.${locale},
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    "olfactoryFamily": olfactoryFamily.${locale},
    nose,
    "scentDescription": scentDescription.${locale},
    heroProductImage {
      asset -> {
        _id,
        url
      }
    },
    buy {
      countries[] {
        countryName,
        websites[] {
          logo {
            asset -> {
              _id,
              url
            }
          },
          url
        }
      }
    }
  }
`;

// Womens Perfumes
export const getWomensPerfumesQuery = (locale: string) => `
  *[_type == "perfume" && category == "womens"] {
    _id,
    title,
    "slug": slug.current,
    "description": description.${locale},
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    "olfactoryFamily": olfactoryFamily.${locale},
    nose,
    "scentDescription": scentDescription.${locale},
    heroProductImage {
      asset -> {
        _id,
        url
      }
    },
    buy {
      countries[] {
        countryName,
        websites[] {
          logo {
            asset -> {
              _id,
              url
            }
          },
          url
        }
      }
    }
  }
`;

// Perfume by slug
export const getPerfumeBySlugQuery = (slug: string, locale: string) => `
  *[_type == "perfume" && slug.current == "${slug}"][0] {
    _id,
    title,
    category,
    "subCategory": subCategory->name.${locale},
    "slug": slug.current,
    "description": description.${locale},
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    heroSectionImages[] {
      asset -> {
        _id,
        url
      }
    },
    olfactoryNotes[] {
      image {
        asset -> {
          _id,
          url
        }
      },
      "title": title.${locale},
      notes[] {
        "name": ${locale}
      }
    },
    "olfactoryFamily": olfactoryFamily.${locale},
    nose,
    "scentDescription": scentDescription.${locale},
    bgFile {
      asset -> {
        _id,
        url
      }
    },
    productImagesSection {
      "title": title.${locale},
      "description": description.${locale},
      images[] {
        asset -> {
          _id,
          url
        }
      }
    },
    heroProductImage {
      asset -> {
        _id,
        url
      }
    },
    buy {
      countries[] {
        countryName,
        websites[] {
          logo {
            asset -> {
              _id,
              url
            }
          },
          url
        }
      }
    },
    "previousProduct": previousProduct->{
      title,
      "slug": slug.current,
      featuredImage {
        asset -> {
          _id,
          url
        }
      }
    },
    "nextProduct": nextProduct->{
      title,
      "slug": slug.current,
      featuredImage {
        asset -> {
          _id,
          url
        }
      }
    },
    "relatedProducts": relatedProducts[]->{
      _id,
      title,
      "slug": slug.current,
      featuredImage {
        asset -> {
          _id,
          url
        }
      }
    }
  }
`;

// Get single perfume by slug
export const getMainPerfumeBySlugQuery = (
  slug: string,
  locale: string
) => `*[_type == "mainPerfume" && slug.current == "${slug}"][0] {
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
  category,
  featuredImage {
    asset-> {
      url
    }
  },
  heroSectionImages[] {
    asset-> {
      url
    }
  },
  "localized": *[_type == "translation.metadata" && references(^._id) && language == "${locale}"][0] {
    value {
      title,
      description
    }
  }
}`;

// Get all perfumes with basic info
export const getAllMainPerfumesQuery = (locale: string) => `
  *[_type == "mainPerfume"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    "slug": slug.current,
    "description": description.${locale},
    category,
    subCategory -> {
      _id,
      title,
      "slug": slug.current
    },
    "olfactoryFamily": olfactoryFamily.${locale},
    nose
  }
`;

// Get perfumes by category
export const getMainPerfumesByCategoryQuery = (
  category: string,
  locale: string
) => `
  *[_type == "mainPerfume" && category == "${category}"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    "slug": slug.current,
    "description": description.${locale},
    category,
    subCategory -> {
      _id,
      title,
      "slug": slug.current
    },
    "olfactoryFamily": olfactoryFamily.${locale},
    nose
  }
`;

// Get perfumes by subcategory
export const getMainPerfumesBySubCategoryQuery = (
  subCategoryId: string,
  locale: string
) => `
  *[_type == "mainPerfume" && subCategory._ref == "${subCategoryId}"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    "slug": slug.current,
    "description": description.${locale},
    category,
    subCategory -> {
      _id,
      title,
      "slug": slug.current
    },
    "olfactoryFamily": olfactoryFamily.${locale},
    nose
  }
`;

// Get featured/limited perfumes for homepage
export const getFeaturedMainPerfumesQuery = (
  locale: string,
  limit: number = 6
) => `
  *[_type == "mainPerfume"] | order(_createdAt desc) [0...${limit}] {
    _id,
    title,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    "slug": slug.current,
    "description": description.${locale},
    category,
    "olfactoryFamily": olfactoryFamily.${locale}
  }
`;

// Search perfumes by title or description
export const searchMainPerfumesQuery = (searchTerm: string, locale: string) => `
  *[_type == "mainPerfume" && (
    title match "${searchTerm}*" ||
    description.${locale} match "${searchTerm}*" ||
    olfactoryFamily.${locale} match "${searchTerm}*"
  )] | order(_createdAt desc) {
    _id,
    title,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    "slug": slug.current,
    "description": description.${locale},
    category,
    "olfactoryFamily": olfactoryFamily.${locale},
    nose
  }
`;

// Get perfume slugs for static generation
export const getMainPerfumeSlugsQuery = () => `
  *[_type == "mainPerfume" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Get single collection by slug
export const getCollectionBySlugQuery = (
  slug: string,
  locale: string
) => `*[_type == "collections" && slug.current == "${slug}"][0] {
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
  category,
  featuredImage {
    asset-> {
      url
    }
  },
  heroSectionImages[] {
    asset-> {
      url
    }
  },
  "localized": *[_type == "translation.metadata" && references(^._id) && language == "${locale}"][0] {
    value {
      title,
      description
    }
  }
}`;

// Get all collections with basic info
export const getAllCollectionsQuery = (locale: string) => `
  *[_type == "collections"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    category,
    firstSection {
      "tagLine": tagLine.${locale},
      "description": description.${locale}
    },
    "productsCount": count(productsCollection)
  }
`;

// Get collections by category
export const getCollectionsByCategoryQuery = (
  category: string,
  locale: string
) => `
  *[_type == "collections" && category == "${category}"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    category,
    firstSection {
      "tagLine": tagLine.${locale},
      "description": description.${locale}
    },
    "productsCount": count(productsCollection)
  }
`;

// Get featured collections for homepage
export const getFeaturedCollectionsQuery = (
  locale: string,
  limit: number = 4
) => `
  *[_type == "collections"] | order(_createdAt desc) [0...${limit}] {
    _id,
    title,
    "slug": slug.current,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    category,
    firstSection {
      "tagLine": tagLine.${locale},
      "description": description.${locale}
    },
    "productsCount": count(productsCollection)
  }
`;

// Get collection slugs for static generation
export const getCollectionSlugsQuery = () => `
  *[_type == "collections" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Get collections with specific products (detailed view)
export const getCollectionsWithProductsQuery = (locale: string) => `
  *[_type == "collections"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    category,
    firstSection {
      "tagLine": tagLine.${locale},
      "description": description.${locale}
    },
    productsCollection[] -> {
      _id,
      title,
      category,
      "description": description.${locale},
      heroSectionImages[] {
        asset -> {
          _id,
          url
        }
      },
      "slug": slug.current,
      buy {
        countries[] {
          countryName,
          websites[] {
            logo {
              asset -> {
                _id,
                url
              }
            },
            url
          }
        }
      }
    }
  }
`;

// Search collections
export const searchCollectionsQuery = (searchTerm: string, locale: string) => `
  *[_type == "collections" && (
    title match "${searchTerm}*" ||
    firstSection.tagLine.${locale} match "${searchTerm}*" ||
    firstSection.description.${locale} match "${searchTerm}*"
  )] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    category,
    firstSection {
      "tagLine": tagLine.${locale},
      "description": description.${locale}
    },
    "productsCount": count(productsCollection)
  }
`;

// Get collections that contain a specific product
export const getCollectionsByProductQuery = (
  productId: string,
  locale: string
) => `
  *[_type == "collections" && references("${productId}")] {
    _id,
    title,
    "slug": slug.current,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    category,
    firstSection {
      "tagLine": tagLine.${locale},
      "description": description.${locale}
    }
  }
`;

// Navbar Perfumes
export const getNavbarPerfumesQuery = (locale: string) => `{
  "perfumes": *[_type == "perfume"] {
    _id,
    title,
    "slug": slug.current,
    category,
    featuredImage {
      asset-> {
        url
      }
    },
    "localized": *[_type == "translation.metadata" && references(^._id) && language == "${locale}"][0] {
      value {
        title
      }
    }
  },
  "collections": *[_type == "collections"] {
    _id,
    title,
    "slug": slug.current,
    category,
    featuredImage {
      asset-> {
        url
      }
    },
    "localized": *[_type == "translation.metadata" && references(^._id) && language == "${locale}"][0] {
      value {
        title
      }
    }
  },
  "mainPerfumes": *[_type == "mainPerfume"] {
    _id,
    title,
    "slug": slug.current,
    category,
    featuredImage {
      asset-> {
        url
      }
    },
    "localized": *[_type == "translation.metadata" && references(^._id) && language == "${locale}"][0] {
      value {
        title
      }
    }
  }
}`;

export const getSearchResultsQuery = (searchTerm: string, locale: string) => `{
  "perfumes": *[
    _type in ["perfume", "mainPerfume"] &&
    (
      title match "*${searchTerm}*" ||
      description match "*${searchTerm}*" ||
      coalesce(
        *[_type == "translation.metadata" && references(^._id) && language == "${locale}"].value.title match "*${searchTerm}*",
        false
      )
    )
  ] {
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    category,
    featuredImage {
      asset-> {
        url
      }
    },
    "localized": *[_type == "translation.metadata" && references(^._id) && language == "${locale}"][0] {
      value {
        title,
        description
      }
    }
  },
  "collections": *[
    _type == "collections" &&
    (
      title match "*${searchTerm}*" ||
      description match "*${searchTerm}*" ||
      coalesce(
        *[_type == "translation.metadata" && references(^._id) && language == "${locale}"].value.title match "*${searchTerm}*",
        false
      )
    )
  ] {
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    category,
    featuredImage {
      asset-> {
        url
      }
    },
    "localized": *[_type == "translation.metadata" && references(^._id) && language == "${locale}"][0] {
      value {
        title,
        description
      }
    }
  },
  "news": *[
    _type == "news" &&
    (
      title match "*${searchTerm}*" ||
      description match "*${searchTerm}*" ||
      coalesce(
        *[_type == "translation.metadata" && references(^._id) && language == "${locale}"].value.title match "*${searchTerm}*",
        false
      )
    )
  ] {
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    featuredImage {
      asset-> {
        url
      }
    },
    "localized": *[_type == "translation.metadata" && references(^._id) && language == "${locale}"][0] {
      value {
        title,
        description
      }
    }
  }
}`;
