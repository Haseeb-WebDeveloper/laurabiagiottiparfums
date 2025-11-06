// news For SITEMAP
export const getAllNewsSlugQuery = () => `
*[_type == "news"] {
  "en": slug.en.current,
  "it": slug.it.current,
  "de": slug.de.current,
  _updatedAt
}
`;

// perfumes For SITEMAP
export const getAllPerfumesSlugQuery = (category: string) => `
*[_type == "perfume" && category == "${category}"] {
  "slug": slug.current,
  _updatedAt
}
`;

export const getProductBySlugsForSitemapQuery = (category: string) => `
{
  "perfume": *[_type == "perfume" && category == "${category}"][0] {
    "slug": slug.current,
    _updatedAt
  },
  
  "mainPerfume": *[_type == "mainPerfume" && category == "${category}"][0] {
    "slug": slug.current,
    _updatedAt
  },

  "collection": *[_type == "collections" && category == "${category}"][0] {
    "slug": slug.current,
    _updatedAt
  }
}
`;

// SEO TAGS
// Get a single news
export const getNewsBySlugForSEOQuery = (slug: string, locale: string) => `
*[_type == "news" && (
      slug.en.current == "${slug}" ||
      slug.it.current == "${slug}" ||
      slug.de.current == "${slug}"
    )][0]{
  "metaTitle": metaTitle.${locale},
  "metaDescription": metaDescription.${locale},
  "ogTitle": ogTitle.${locale},
  "ogDescription": ogDescription.${locale},
  "twitterTitle": twitterTitle.${locale},
  "twitterDescription": twitterDescription.${locale},
  ogImage {
    asset->{
      url
    }
  }
}
`;

// News Page for SEO
export const getNewsPageForSEOQuery = (locale: string) => `
*[_type == "newsPage"][0]{
  "metaTitle": metaTitle.${locale},
  "metaDescription": metaDescription.${locale},
  "ogTitle": ogTitle.${locale},
  "ogDescription": ogDescription.${locale},
  "twitterTitle": twitterTitle.${locale},
  "twitterDescription": twitterDescription.${locale},
  ogImage {
    asset->{
      url
    }
  }
}
`;

// Brand Page for SEO
export const getBrandPageForSEOQuery = (locale: string) => `
*[_type == "brand"][0]{
  "metaTitle": metaTitle.${locale},
  "metaDescription": metaDescription.${locale},
  "ogTitle": ogTitle.${locale},
  "ogDescription": ogDescription.${locale},
  "twitterTitle": twitterTitle.${locale},
  "twitterDescription": twitterDescription.${locale},
  ogImage {
    asset->{
      url
    }
  }
}
`;

// Home Page for SEO
export const getHomePageForSEOQuery = (locale: string) => `
*[_type == "homePage"][0]{
  "metaTitle": metaTitle.${locale},
  "metaDescription": metaDescription.${locale},
  "ogTitle": ogTitle.${locale},
  "ogDescription": ogDescription.${locale},
  "twitterTitle": twitterTitle.${locale},
  "twitterDescription": twitterDescription.${locale},
  ogImage {
    asset->{
      url
    }
  }
}
`;

// Terms of Use for SEO
export const getTermsOfUseForSEOQuery = (locale: string) => `
*[_type == "termsOfUse"][0]{
  "metaTitle": metaTitle.${locale},
  "metaDescription": metaDescription.${locale},
  "ogTitle": ogTitle.${locale},
  "ogDescription": ogDescription.${locale},
  "twitterTitle": twitterTitle.${locale},
  "twitterDescription": twitterDescription.${locale},
  ogImage {
    asset->{
      url
    }
  }
}
`;

// Privacy Policy for SEO
export const getPrivacyPolicyForSEOQuery = (locale: string) => `
*[_type == "privacyPolicy"][0]{
  "metaTitle": metaTitle.${locale},
  "metaDescription": metaDescription.${locale},
  "ogTitle": ogTitle.${locale},
  "ogDescription": ogDescription.${locale},
  "twitterTitle": twitterTitle.${locale},
  "twitterDescription": twitterDescription.${locale},
  ogImage {
    asset->{
      url
    }
  }
}
`;

// Men's Perfume Page for SEO
export const getMensPerfumePageForSEOQuery = (locale: string) => `
*[_type == "mensPerfumePage"][0]{
  "metaTitle": metaTitle.${locale},
  "metaDescription": metaDescription.${locale},
  "ogTitle": ogTitle.${locale},
  "ogDescription": ogDescription.${locale},
  "twitterTitle": twitterTitle.${locale},
  "twitterDescription": twitterDescription.${locale},
  ogImage {
    asset->{
      url
    }
  }
}
`;

// Women's Perfume Page for SEO
export const getWomensPerfumePageForSEOQuery = (locale: string) => `
*[_type == "womensPerfumePage"][0]{
  "metaTitle": metaTitle.${locale},
  "metaDescription": metaDescription.${locale},
  "ogTitle": ogTitle.${locale},
  "ogDescription": ogDescription.${locale},
  "twitterTitle": twitterTitle.${locale},
  "twitterDescription": twitterDescription.${locale},
  ogImage {
    asset->{
      url
    }
  }
}
`;

// Cookies Policy for SEO
export const getCookiesPolicyForSEOQuery = (locale: string) => `
*[_type == "cookiesPolicy"][0]{
  "metaTitle": metaTitle.${locale},
  "metaDescription": metaDescription.${locale},
  "ogTitle": ogTitle.${locale},
  "ogDescription": ogDescription.${locale},
  "twitterTitle": twitterTitle.${locale},
  "twitterDescription": twitterDescription.${locale},
  ogImage {
    asset->{
      url
    }
  }
}
`;

// Product Page for SEO

export const getProductBySlugForSEOQuery = (slug: string, locale: string) => `
{
  "perfume": *[_type == "perfume" && slug.current == "${slug}"][0] {
    "metaTitle": metaTitle.${locale},
    "metaDescription": metaDescription.${locale},
    "ogTitle": ogTitle.${locale},
    "ogDescription": ogDescription.${locale},
    "twitterTitle": twitterTitle.${locale},
    "twitterDescription": twitterDescription.${locale},
    ogImage {
      asset->{
        url
      }
    }
  },
  
  "mainPerfume": *[_type == "mainPerfume" && slug.current == "${slug}"][0] {
    "metaTitle": metaTitle.${locale},
    "metaDescription": metaDescription.${locale},
    "ogTitle": ogTitle.${locale},
    "ogDescription": ogDescription.${locale},
    "twitterTitle": twitterTitle.${locale},
    "twitterDescription": twitterDescription.${locale},
    ogImage {
      asset->{
        url
      }
    }
  },

  "collection": *[_type == "collections" && slug.current == "${slug}"][0] {
    "metaTitle": metaTitle.${locale},
    "metaDescription": metaDescription.${locale},
    "ogTitle": ogTitle.${locale},
    "ogDescription": ogDescription.${locale},
    "twitterTitle": twitterTitle.${locale},
    "twitterDescription": twitterDescription.${locale},
    ogImage {
      asset->{
        url
      }
    }
  }
}
`;

// Static Generation
// News slugs for static generation
export const getAllNewsSlugsQuery = () => `
  *[_type == "news"] {
    "en": slug.en.current,
    "it": slug.it.current,
    "de": slug.de.current
  }
`;

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

// Navbar Perfumes from Schema
export const getNavbarPerfumesQuery = (locale: string) => `
  *[_type == "navbar"][0] {
    "mensPerfumes": mensPerfumes[]-> {
      _id,
      _type,
      title,
      "slug": slug.current,
      category,
      "subCategory": subCategory->name.${locale},
      "description": description.${locale},
      featuredImage {
        asset-> {
          url
        }
      },
    },
    "womensPerfumes": womensPerfumes[]-> {
      _id,
      _type,
      title,
      "slug": slug.current,
      category,
      "subCategory": subCategory->name.${locale},
      "description": description.${locale},
      featuredImage {
        asset-> {
          url
        }
      },
    }
  }
`;

// Search Results
export const getSearchResultsQuery = (searchTerm: string, locale: string) => `{
  "perfumes": *[
    _type in ["perfume", "mainPerfume"] &&
    (
      title match "*${searchTerm}*" ||
      description.${locale} match "*${searchTerm}*" ||
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
    "description": description.${locale},
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
      firstSection.tagLine.${locale} match "*${searchTerm}*" ||
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
    "description": firstSection.description.${locale},
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
      title.${locale} match "*${searchTerm}*" ||
      description.${locale} match "*${searchTerm}*" ||
      coalesce(
        *[_type == "translation.metadata" && references(^._id) && language == "${locale}"].value.title match "*${searchTerm}*",
        false
      )
    )
  ] {
    _id,
    _type,
    "title": title.${locale},
    "slug": slug.current,
    "description": description.${locale},
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
      "description": description.${locale},
      "slug": slug.${locale}.current,
      _createdAt,
      _updatedAt,
      updatedAt,
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
    "slug": slug.${locale}.current,
    _createdAt,
    _updatedAt,
    updatedAt,
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
// This query finds the news post by matching the slug in any language, then returns the content in the requested locale.
// It first finds the news document where any of the localized slugs matches the provided slug.
export const getNewsBySlugQuery = (slug: string, locale: string) => `
  *[
    _type == "news" && (
      slug.en.current == "${slug}" ||
      slug.it.current == "${slug}" ||
      slug.de.current == "${slug}"
    )
  ][0]{
    _createdAt,
    _updatedAt,
    updatedAt,
    "title": title.${locale},
    "slug": slug.${locale}.current,
    updatedAt,
    featuredImage {
      asset -> {
        _id,
        url
      },
    },
    "description": description.${locale},
    "content": content.${locale}[]{
      ...,
      asset->{
        _id,
        url
      },
      _type == "fileBlock" => {
        isYoutubeVideo,
        videoUrl,
        image {
          asset->{
            url
          }
        },
        aspectRatio
      },
    }
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
        "alt": alt.${locale}
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

// Men's Perfumes from Page Schema
export const getMensPerfumesQuery = (locale: string) => `
  *[_type == "mensPerfumePage"][0] {
    perfumes[]-> {
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
    }
  }
`;

// Women's Perfumes from Page Schema
export const getWomensPerfumesQuery = (locale: string) => `
  *[_type == "womensPerfumePage"][0] {
    perfumes[]-> {
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
    }
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
      category,
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
      category,
      "subCategory": subCategory->name.${locale},
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
      category,
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
      category,
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
      category,
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
      category,
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
      category,
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
      category,
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
      "description": descriptionForCollectionPage.${locale},
      category,
      collectionPageImages[] {
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
    },
    bottlesSection[] {
      images[] {
        asset-> {
          url
        }
      },
      backgroundImage {
        asset-> {
          url
        }
      },
      product->{
        title,
        "description": description.${locale},
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
        }
      }
    },
    "relatedProducts": relatedProducts[]->{
      _id,
      title,
      "description": description.${locale},
      "slug": slug.current,
      category,
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
      },
      "title": title.${locale},
      image {
        asset-> {
          url
        }
      },
    },
    perfumes[]-> {
      _id,
      _type,
      title,
      "slug": slug.current,
      "description": description.${locale},
      category,
      "subCategory": subCategory->name.${locale},
      featuredImage {
        asset-> {
          url
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
    },
    circularIngridientsImages[] {
      asset-> {
        url
      }
    },
    notes[]-> {
      "title": title.${locale},
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
      updatedAt,
      _createdAt,
      "title": title.${locale},
      "description": description.${locale},
      "slug": slug.${locale}.current,
      featuredImage {
        asset-> {
          url
        }
      }
    }
  }
`;

export const getTermsOfUseQuery = ({ locale }: { locale: string }) => `
  *[_type == "termsOfUse"][0] {
    "name": name.${locale},
    "content": content.${locale}[] {
      ...,
    }
  }
`;

// Cookies Policy Query
export const getCookiesPolicyQuery = ({ locale }: { locale: string }) => `
  *[_type == "cookiesPolicy"][0] {
    "name": name.${locale},
    "content": content.${locale}[] {
      ...,
    }
  }
`;

// Privacy Policy Query
export const getPrivacyPolicyQuery = ({ locale }: { locale: string }) => `
  *[_type == "privacyPolicy"][0] {
    "name": name.${locale},
    "content": content.${locale}[] {
      ...,
      _type == "tableBlock" => {
        "tableTitle": tableTitle.${locale},
        images[] {
          asset-> {
            url
          }
        },
        "content": content.${locale}[]
      },
      _type == "twoColumnTable" => {
        "tableTitle": tableTitle.${locale},
        "firstColumnTitle": firstColumnTitle.${locale},
        "secondColumnTitle": secondColumnTitle.${locale},
        tableRows[] {
          _key,
          icon {
            asset-> {
              url
            }
          },
          "firstColumnContent": firstColumnContent.${locale},
          "secondColumnContent": secondColumnContent.${locale}
        }
      }
    }
  }
`;

export const getNotesQuery = ({ locale }: { locale: string }) => `
  *[_type == "notes"] {
    "title": title.${locale},
    image {
      asset-> {
        url
      }
    },
    "perfumeNotes": perfumeNotes[]-> {
      title,
      "slug": slug.current,
      category,
      "description": description.${locale},
      featuredImage {
        asset -> {
          url
        }
      },
      sharpness
    }
  }
`;

// Wear Your Perfume - Get all perfumes with minimal data (perfume, mainPerfume, collections)
export const getAllPerfumesForWearYourPerfumeQuery = () => `
{
  "perfumes": *[_type == "perfume"] {
    _id,
    _type,
    title,
    "slug": slug.current,
    category,
    sharpness,
    featuredImage {
      asset -> {
        url
      }
    }
  },
  "mainPerfumes": *[_type == "mainPerfume"] {
    _id,
    _type,
    title,
    "slug": slug.current,
    category,
    sharpness,
    featuredImage {
      asset -> {
        url
      }
    }
  },
  "collections": *[_type == "collections"] {
    _id,
    _type,
    title,
    "slug": slug.current,
    category,
    sharpness,
    featuredImage {
      asset -> {
        url
      }
    }
  }
}`;
