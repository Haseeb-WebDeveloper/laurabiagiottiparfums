import { fetchSanityData } from '../sanity/fetch';
import {
  getAllLocales,
  getContactPageQuery,
  getCaseStudyBySlugQuery,
  getBrandingPageQuery, getBrandingSolutionBySlugQuery, getDigitalProductSolutionBySlugQuery, getAllCaseStudiesSlugQuery, getAllBrandingSolutionsSlugQuery, getAllDigitalProductsSolutionsSlugQuery, getHomePageQuery, getDigitalProductsPageQuery, getCaseStudyBySlugForSEOQuery, getBrandingSolutionBySlugForSEOQuery, getDigitalProductSolutionBySlugForSEOQuery, getCaseStudyContentBySlugQuery,
  getMultiStepCalculatorsQuery
} from '../sanity/queries';


const IS_DEVELOPMENT = process.env.DEVELOPMENT;

export async function getAllLocalizedContent() {
  return fetchSanityData<{ en: string; it: string }>(
    getAllLocales(),
    {},
    { revalidate: IS_DEVELOPMENT ? 10 : 60 }
  );
}


export async function getContactPageContent(locale: string) {
  try {
    const data = await fetchSanityData(
      getContactPageQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching contact page content:', error);
    return null;
  }
}

// home page data
export async function getHomePageData(locale: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getHomePageQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return null;
  }
}


// Get a single case study
export async function getCaseStudyContentBySlug(slug: string, locale: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getCaseStudyContentBySlugQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}



// get branding page data
export async function getBrandingPageData(locale: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getBrandingPageQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching branding page data:', error);
    return null;
  }
}


// get digital products page data
export async function getDigitalProductsPageData(locale: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getDigitalProductsPageQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching digital products page data:', error);
    return null;
  }
}


// Get a single case study
export async function getCaseStudyBySlug(slug: string, locale: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getCaseStudyBySlugQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}



export async function getBrandingSolutionBySlug(slug: string, locale: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getBrandingSolutionBySlugQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching branding solution:', error);
    return null;
  }
}


// Digital Products
export async function getDigitalProductSolutionBySlug(slug: string, locale: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getDigitalProductSolutionBySlugQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching digital product solution:', error);
    return null;
  }
}



// Get all case studies slugs
export async function getAllCaseStudiesSlugs(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getAllCaseStudiesSlugQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching all case studies slugs:', error);
    return null;
  }
}


// Get all branding solutions slugs
export async function getAllBrandingSolutionsSlugs(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getAllBrandingSolutionsSlugQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching all branding solutions slugs:', error);
    return null;
  }
}


// Get all digital products solutions slugs
export async function getAllDigitalProductsSolutionsSlugs(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getAllDigitalProductsSolutionsSlugQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching all digital products solutions slugs:', error);
    return null;
  }
}




// SEO Fetching Case Study
export async function getCaseStudyBySlugForSEO(slug: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getCaseStudyBySlugForSEOQuery(slug),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}


// SEO Fetching Branding Solution
export async function getBrandingSolutionBySlugForSEO(slug: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getBrandingSolutionBySlugForSEOQuery(slug),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching branding solution:', error);
    return null;
  }
}


// SEO Fetching Digital Product Solution
export async function getDigitalProductSolutionBySlugForSEO(slug: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getDigitalProductSolutionBySlugForSEOQuery(slug),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching digital product solution:', error);
    return null;
  }
}




export async function getMultiStepCalculators(locale: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getMultiStepCalculatorsQuery({ locale }),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error('Error fetching multi step calculators:', error);
    return null;
  }
}


