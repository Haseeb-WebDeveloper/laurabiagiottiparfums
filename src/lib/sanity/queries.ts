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

// SEO
// Main Perfume slugs for static generation
export const getMainPerfumeSlugsQuery = () => `
  *[_type == "mainPerfume" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Collection slugs for static generation
export const getCollectionSlugsQuery = () => `
  *[_type == "collections" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Sub Category
export const getAllSubCategoriesQuery = (locale: string) => `
  *[_type == "sub-category"] {
    "name": name.${locale},
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
  },
  "collections": *[_type == "collections"] {
    _id,
    title,
    "description": description.${locale},
    "slug": slug.current,
    category,
    "subCategory": subCategory->name.${locale},
    featuredImage {
      asset-> {
        url
      }
    },
  },
  "mainPerfumes": *[_type == "mainPerfume"] {
    _id,
    title,
    "description": description.${locale},
    "slug": slug.current,
    category,
    featuredImage {
      asset-> {
        url
      }
    },
  }
}`;

// Search Results
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
  }
}`;

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

// Perfumes  TODO uncomment collections
export const getMensPerfumesQuery = (locale: string) => `{
  "perfumes": *[_type == "perfume" && category == "mens"] {
    _id,
    _type,
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
  },
  "mainPerfumes": *[_type == "mainPerfume" && category == "mens"] {
    _id,
    _type,
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
    }
  },
  // "collections": *[_type == "collections" && category == "mens"] {
  //   _id,
  //   _type,
  //   title,
  //   "description": description.${locale},
  //   category,
  //   "subCategory": subCategory->name.${locale},
  //   "slug": slug.current,
  //   featuredImage {
  //     asset -> {
  //       _id,
  //       url
  //     }
  //   }
  // }
}`;

// Womens Perfumes
export const getWomensPerfumesQuery = (locale: string) => `
{
  "perfumes": *[_type == "perfume" && category == "womens"] {
    _id,
    _type,
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
  },
  "mainPerfumes": *[_type == "mainPerfume" && category == "womens"] {
    _id,
    _type,
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
    }
  },
  // "collections": *[_type == "collections" && category == "womens"] {
  //   _id,
  //   _type,
  //   title,
  //   "description": description.${locale},
  //   category,
  //   "subCategory": subCategory->name.${locale},
  //   "slug": slug.current,
  //   featuredImage {
  //     asset -> {
  //       _id,
  //       url
  //     }
  //   }
  // }
}
`;

// Main Perfumes List
export const getMainPerfumesListQuery = (locale: string) => `
  *[_type == "mainPerfume"] {
    title,
    "slug": slug.current,
    "description": description.${locale},
    featuredImage {
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

// Single Perfume by slug
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
    isPartOfCollection,
    ingredients[] {
      "ingredientName": ingredientName.${locale},
      image {
        asset -> {
          _id,
          url
        }
      },
      "description": description.${locale}
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
      "description": description.${locale},
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

// Single Main Perfume by slug
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
  subCategory-> {
    _id,
    title,
    "slug": slug.current
  },
  featuredImage {
    asset-> {
      url,
    }
  },
  heroSectionImages[] {
    title,
    image {
      asset-> {
        url,
      }
    }
  },
  "secondSectionQuoteText": secondSectionQuoteText.${locale},
  bgFile {
    asset-> {
      url,
      mimeType
    }
  },
  "bigHeading": bigHeading.${locale},
  fourthSectionTextImage {
    "title": title.${locale},
    "text": text.${locale},
    file {
      asset-> {
        url,
        mimeType
      }
    }
  },
  olfactoryNotes[] {
    image {
      asset-> {
        url,
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
  sixthSection {
    "heading": heading.${locale},
    files[] {
      asset-> {
        url,
        mimeType
      }
    },
    firstContent {
      "title": title.${locale},
      "description": description.${locale}
    },
    secondContent {
      "title": title.${locale},
      "description": description.${locale}
    }
  },
  seventhSection {
    "heading": heading.${locale},
    files[] {
      asset-> {
        url,
        mimeType
      }
    },
    content {
      "title": title.${locale},
      "description": description.${locale}
    }
  },
  heroProductImage {
    asset-> {
      url,
    }
  },
  buy {
    countries[] {
      countryName,
      websites[] {
        logo {
          asset-> {
            url
          }
        },
        url
      }
    }
  },
  "relatedProducts": relatedProducts[]->{
      _id,
      title,
      "description": description.${locale},
      "slug": slug.current,
      featuredImage {
        asset -> {
          _id,
          url
        }
      }
    }
}`;

// Single Collection by slug
export const getCollectionBySlugQuery = (
  slug: string,
  locale: string
) => `*[_type == "collections" && slug.current == "${slug}"][0] {
  _id,
  _type,
  title,
  "slug": slug.current,
  category,
  // "description": description.${locale},
  "subCategory": subCategory->name.${locale},
  featuredImage {
    asset-> {
      url,
    }
  },
  firstSection {
    "tagLine": tagLine.${locale},
    image {
      asset-> {
        url,
      }
    },
    // "description": description.${locale},
    bgMedia {
      asset-> {
        url,
        mimeType
      }
    }
  },
  productsCollection[]-> {
    _id,
    title,
    "slug": slug.current,
    "description": description.${locale},
    category,
    featuredImage {
      asset-> {
        url,
      }
    }
  },
  relatedProducts[]-> {
    _id,
    title,
    "slug": slug.current,
    "description": description.${locale},
    category,
    featuredImage {
      asset-> {
        url,
      }
    }
  }
}`;

// Single Product by slug
export const getProductBySlugQuery = (slug: string, locale: string) => `{
  "perfume": *[_type == "perfume" && slug.current == "${slug}"][0] {
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
      "description": description.${locale},
      "slug": slug.current,
      featuredImage {
        asset -> {
          _id,
          url
        }
      }
    }
  },
  "mainPerfume": *[_type == "mainPerfume" && slug.current == "${slug}"][0] {
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
  category,
  subCategory-> {
    _id,
    title,
    "slug": slug.current
  },
  featuredImage {
    asset-> {
      url,
    }
  },
  heroSectionImages[] {
    title,
    image {
      asset-> {
        url,
      }
    }
  },
  "secondSectionQuoteText": secondSectionQuoteText.${locale},
  bgFile {
    asset-> {
      url,
      mimeType
    }
  },
  "bigHeading": bigHeading.${locale},
  fourthSectionTextImage {
    "title": title.${locale},
    "text": text.${locale},
    file {
      asset-> {
        url,
        mimeType
      }
    }
  },
  olfactoryNotes[] {
    image {
      asset-> {
        url,
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
  sixthSection {
    "heading": heading.${locale},
    files[] {
      asset-> {
        url,
        mimeType
      }
    },
    firstContent {
      "title": title.${locale},
      "description": description.${locale}
    },
    secondContent {
      "title": title.${locale},
      "description": description.${locale}
    }
  },
  seventhSection {
    "heading": heading.${locale},
    files[] {
      asset-> {
        url,
        mimeType
      }
    },
    content {
      "title": title.${locale},
      "description": description.${locale}
    }
  },
  heroProductImage {
    asset-> {
      url,
    }
  },
  buy {
    countries[] {
      countryName,
      websites[] {
        logo {
          asset-> {
            url
          }
        },
        url
      }
    }
  },
  "relatedProducts": relatedProducts[]->{
      _id,
      title,
      "description": description.${locale},
      "slug": slug.current,
      featuredImage {
        asset -> {
          _id,
          url
        }
      }
    }
},
  "collection": *[_type == "collections" && slug.current == "${slug}"][0] {
  _id,
  _type,
  title,
  "description": description.${locale},
  "slug": slug.current,
  category,
  "subCategory": subCategory->name.${locale},
  featuredImage {
    asset-> {
      url,
    }
  },
  firstSection {
    "tagLine": tagLine.${locale},
    image {
      asset-> {
        url,
      }
    },
    "description": description.${locale},
    bgMedia {
      asset-> {
        url,
        mimeType
      }
    }
  },
  productsCollection[]-> {
    _id,
    title,
    "slug": slug.current,
    "description": description.${locale},
    category,
    heroSectionImages[] {
      asset -> {
        _id,
        url
      }
    },
    isPartOfCollection,
    ingredients[] {
      "ingredientName": ingredientName.${locale},
      image {
        asset -> {
          _id,
          url
        }
      },
      "description": description.${locale}
    },
  },
  "relatedProducts": relatedProducts[]->{
    _id,
    title,
    "description": description.${locale},
    "slug": slug.current,
    featuredImage {
      asset -> {
        _id,
        url
      }
    }
  }
}
}`;

// Home Page Query
export const getHomePageQuery = (locale: string) => `
  *[_type == "homePage"][0] {
    perfumesCarousel[] {
      perfume-> {
        title,
        "slug": slug.current,
        category,
      },
      title,
      image {
        asset-> {
          url
        }
      }
    },
    perfumes[]-> {
      _id,
      _type,
      title,
      "slug": slug.current,
      "description": description.${locale},
      category,
      featuredImage {
        asset-> {
          url
        }
      }
    },
    circularIngridientsImages[] {
      asset-> {
        url
      }
    },
    notes[]-> {
      title,
      image {
        asset-> {
          url,
        }
      },
      "perfumeNotes": perfumeNotes[]-> {
        title,
        "slug": slug.current,
        category,
      }
    },
    textImageSection {
      image {
        asset-> {
          url
        }
      },
      "heading": heading.${locale},
      "description": description.${locale}
    },
    news[]-> {
      _id,
      _updatedAt,
      _createdAt,
      "title": title.${locale},
      "description": description.${locale},
      "slug": slug.current,
      featuredImage {
        asset-> {
          url
        }
      }
    },
    socialMediaImages[] {
      image {
        asset-> {
          url
        }
      },
      url
    }
  }
`;




export const getNotesQuery = (locale: string) => `
  *[_type == "notes"] {
    "title": title.${locale},
    image {
      asset-> {
        url
      }
    },
    "perfumeNotes": perfumeNotes[]-> {
      "title": title.${locale},
      "slug": slug.current,
      category,
    }
  }
`;
