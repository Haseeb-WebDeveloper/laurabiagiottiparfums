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
    }
  }
`;

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

// Navbar Perfumes
export const getNavbarPerfumesQuery = (locale: string) => `
  *[_type == "perfume"] {
    _id,
    title,
    category,
    "slug": slug.current,
    featuredImage {
      asset -> {
        _id,
        url
      }
    }
  }
`;

