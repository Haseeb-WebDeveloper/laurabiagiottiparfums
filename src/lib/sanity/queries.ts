// branding solutions
export const getAllBrandingSolutionsSlugQuery = () => `
*[_type == "studioBrandingSolutions"] {
  "slug": slug.current,
  _updatedAt
}
`;

// digital products solutions
export const getAllDigitalProductsSolutionsSlugQuery = () => `
*[_type == "studioDigitalProductsSolutions"] {
  "slug": slug.current,
  _updatedAt
}
`;
// Content
export const contentQuery = (locale: string) => `
  content.${locale}[] {
    ...,
    _type == "mediaBlock" => {
      width,
      height,
      gap,
      justifyContent,
      files[] {
        file {
          asset->{
            url
          }
        },
        rounded,
        autoplay,
        loop,
        muted
      }
    },
    _type == "howItWorks" => {
      title,
      paragraph,
      steps[] {
        title,
        description,
        points[]
      }
    },
    _type == "titleBlock" => {
      layout,
      text {
        content,
        tag
      }
    },
    _type == "fileBlock" => {
      file {
        asset->{
          url
        }
      },
      height,
      autoplay,
      loop,
      muted
    },
    _type == "centerTextBlock" => {
      text,
      isItalic
    },
    _type == "textImageBlock" => {
      layout,
      height,
      text[] {
        content,
        tag
      },
      image {
        asset->{
          url
        }
      }
    },
    _type == "image" => {
      asset->{
        url
      }
    },
    _type == "imageCarouselBlock" => {
      media[] {
        ...,
        _type == "image" => {
          asset->{
            url
          }
        },
        _type == "file" => {
          asset->{
            url
          }
        }
      }
    }
  }
`;




export const getAllLocales = () => `
  *[_type == "figmentaStudioHomePage"] {
    en,
    it
  }[0]
`;


// FAQ
export const getFaqQuery = () => `
  *[_type == "faq"] {
    title,
    faqs
  }[0]
`;


export const getContactPageQuery = (locale: string) => `
*[_type == "contact" && website == "Studio"][0] {
  "heading": heading.${locale},
  locations[] {
    locationName,
    email,
    image {
      asset->{
        _id,
        url
      }
    }
  },
  faq->{
    title,
    faqs[] {
      "question": question.${locale},
      "answer": answer.${locale}
    }
  },
  logos[] {
    image {
      asset->{
        _id,
        url
      }
    },
    alt
  }
}
`;

// Get a single case study
export const getCaseStudyBySlugQuery = (slug: string, locale: string) => `
*[_type == "caseStudy" && slug.current == "${slug}"][0]{
  name,
  "slug": slug.current,
  featuredImage {
    asset->{
      url
    }
  },
  logo {
    asset->{
      url
    }
  },
  clientName,
  location,
  categories[]->{
    name,
    image {
      asset->{
        url
      }
    }
  },
  "content": content.${locale}[] {
    ...,
    _type == "mediaBlock" => {
      width,
      height,
      gap,
      justifyContent,
      files[] {
        file {
          asset->{
            url
          }
        },
        rounded,
        autoplay,
        loop,
        muted
      }
    },
    _type == "howItWorks" => {
        title,
        paragraph,
        steps[] {
          title,
          description,
          points[]
        },
    },
    _type == "titleBlock" => {
      layout,
      text {
        content,
        tag
      }
    },
    _type == "fileBlock" => {
      file {
        asset->{
          url
        }
      },
      height,
      autoplay,
      loop,
      muted
    },
    _type == "centerTextBlock" => {
      text,
      isItalic
    },
    _type == "textImageBlock" => {
      layout,
      height,
      text[] {
        content,
        tag
      }, 
      image {
        asset->{
          url
        }
      }
    },
    _type == "image" => {
      asset->{
        url
      }
    },
    _type == "imageCarouselBlock" => {
      media[] {
        ...,
        _type == "image" => {
          asset->{
            url
          }
        },
        _type == "file" => {
          asset->{
            url
          }
        }
      }
    }
  },
}
`;


// SEO
// Get a single case study
export const getCaseStudyBySlugForSEOQuery = (slug: string) => `
*[_type == "caseStudy" && slug.current == "${slug}"][0]{
  metaTitle,
  metaDescription,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  ogImage {
    asset->{
      url
    }
  }
}
`;

