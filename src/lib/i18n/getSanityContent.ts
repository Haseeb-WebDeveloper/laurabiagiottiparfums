import {
  Perfume,
  CombinedPerfume,
  NavbarPerfumes,
  SubCategory,
} from "@/types/perfume";
import { Collection } from "@/types/collection";
import { MainPerfume } from "@/types/main-perfume";
import { fetchSanityData } from "../sanity/fetch";
import {
  getBrandPageQuery,
  getMensPerfumesQuery,
  getNavbarPerfumesQuery,
  getNewsBySlugQuery,
  getNewsPageQuery,
  getPerfumeBySlugQuery,
  getWomensPerfumesQuery,
  getSearchResultsQuery,
  getMainPerfumeBySlugQuery,
  getCollectionBySlugQuery,
  getAllSubCategoriesQuery,
  getProductBySlugQuery,
  getHomePageQuery,
  getNotesQuery,
  getAllPerfumesForWearYourPerfumeQuery,
  getAllNewsSlugsQuery,
  getNewsBySlugForSEOQuery,
  getNewsPageForSEOQuery,
  getBrandPageForSEOQuery,
  getHomePageForSEOQuery,
  getProductBySlugForSEOQuery,
  getTermsOfUseQuery,
  getTermsOfUseForSEOQuery,
  getCookiesPolicyForSEOQuery,
  getCookiesPolicyQuery,
  getPrivacyPolicyQuery,
  getPrivacyPolicyForSEOQuery,
} from "../sanity/queries";
import { HomePageInterface } from "@/types/home-page";
import { Note } from "@/types/notes";
import { TermsOfUseInterface } from "@/types/terms-of-use";
import { CookiesPolicyInterface } from "@/types/cookies-policy";
import { PrivacyPolicyInterface } from "@/types/privacy-policy";


const IS_DEVELOPMENT = process.env.DEVELOPMENT;

export type StaticSlug = {
  slug: string;
};

type MensProductsResponse = {
  perfumes: Perfume[];
  mainPerfumes: MainPerfume[];
  // collections: Collection[];
};

type WomensProductsResponse = {
  perfumes: Perfume[];
  mainPerfumes: MainPerfume[];
  // collections: Collection[];
};

// Home Page
export async function getHomePage(locale: string) {
  try {
    const data = await fetchSanityData(
      getHomePageQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as HomePageInterface;
  } catch (error) {
    console.error("Error fetching home page:", error);
    return null;
  }
}

// Perfumes
export async function getMensPerfumes(locale: string) {
  try {
    const data = (await fetchSanityData(
      getMensPerfumesQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    )) as MensProductsResponse;

    // Convert mainPerfumes and collections to Perfume type format
    const mainPerfumesAsPerfumes = data.mainPerfumes.map((mp) => ({
      ...mp,
      _type: "perfume" as const,
      buy: undefined, // Since main perfumes don't have buy info
    }));

    // const collectionsAsPerfumes = data.collections.map(c => ({
    //   ...c,
    //   _type: "perfume" as const,
    //   buy: undefined // Since collections don't have buy info
    // }));

    // Combine all products   TODO add  ...collectionsAsPerfumes
    return [...data.perfumes, ...mainPerfumesAsPerfumes] as Perfume[];
  } catch (error) {
    console.error("Error fetching men's perfumes:", error);
    return null;
  }
}

export async function getWomensPerfumes(locale: string) {
  try {
    const data = (await fetchSanityData(
      getWomensPerfumesQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    )) as WomensProductsResponse;

    // Convert mainPerfumes and collections to Perfume type format
    const mainPerfumesAsPerfumes = data.mainPerfumes.map((mp) => ({
      ...mp,
      _type: "perfume" as const,
      buy: undefined, // Since main perfumes don't have buy info
    }));

    // const collectionsAsPerfumes = data.collections.map(c => ({
    //   ...c,
    //   _type: "perfume" as const,
    //   buy: undefined // Since collections don't have buy info
    // }));

    // Combine all products   TODO add  ...collectionsAsPerfumes
    return [...data.perfumes, ...mainPerfumesAsPerfumes] as Perfume[];
  } catch (error) {
    console.error("Error fetching women's perfumes:", error);
    return null;
  }
}

// Sub Categories
export async function getAllSubCategories(locale: string) {
  try {
    const data = await fetchSanityData(
      getAllSubCategoriesQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as SubCategory[];
  } catch (error) {
    console.error("Error fetching sub categories:", error);
    return null;
  }
}

// News List
export async function getNewsPageContent(locale: string) {
  try {
    const data = await fetchSanityData(
      getNewsPageQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching news page content:", error);
    return null;
  }
}

// News By Slug
export async function getNewsBySlug(slug: string, locale: string) {
  try {
    const data = await fetchSanityData(
      getNewsBySlugQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    return null;
  }
}

// Brand
export async function getBrandPageContent(locale: string) {
  try {
    const data = await fetchSanityData(
      getBrandPageQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching brand page content:", error);
    return null;
  }
}

// Perfume by slug
export async function getPerfumeBySlug(slug: string, locale: string) {
  try {
    const data = await fetchSanityData(
      getPerfumeBySlugQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as Perfume;
  } catch (error) {
    console.error("Error fetching perfume by slug:", error);
    return null;
  }
}

// Navbar Perfumes
export async function getNavbarPerfumes(locale: string) {
  try {
    const data = (await fetchSanityData(
      getNavbarPerfumesQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    )) as NavbarPerfumes;
    if (!data) return null;

    const { collections, mainPerfumes, perfumes } = data;

    // Function to combine and sort perfumes by category
    const combinePerfumesByCategory = (category: "mens" | "womens") => {
      const categoryCollections = collections
        .filter((item) => item.category === category)
        .map((item) => ({ ...item, type: "collection" as const }));

      const categoryMainPerfumes = mainPerfumes
        .filter((item) => item.category === category)
        .map((item) => ({ ...item, type: "mainPerfume" as const }));

      const categoryPerfumes = perfumes
        .filter((item) => item.category === category)
        .map((item) => ({ ...item, type: "perfume" as const }));

      // Combine in the specified order: collections -> mainPerfumes -> perfumes
      return [
        ...categoryCollections,
        ...categoryMainPerfumes,
        ...categoryPerfumes,
      ] as CombinedPerfume[];
    };

    // Create combined arrays for both categories
    const mensPerfumes = combinePerfumesByCategory("mens");
    const womensPerfumes = combinePerfumesByCategory("womens");

    return {
      mens: mensPerfumes,
      womens: womensPerfumes,
    };
  } catch (error) {
    console.error("Error fetching navbar perfumes:", error);
    return null;
  }
}

// Search Results
export async function getSearchResults(searchTerm: string, locale: string) {
  try {
    const data = (await fetchSanityData(
      getSearchResultsQuery(searchTerm, locale),
      {},
      { revalidate: 0 } // No cache for search results
    )) as {
      perfumes?: any[];
      collections?: any[];
      news?: any[];
    };

    if (!data) return null;

    return {
      perfumes: [...(data.perfumes || []), ...(data.collections || [])].sort(
        (a, b) => {
          // Sort by type: mainPerfume first, then perfume, then collections
          const typeOrder = { mainPerfume: 0, perfume: 1, collections: 2 };
          return (
            typeOrder[a._type as keyof typeof typeOrder] -
            typeOrder[b._type as keyof typeof typeOrder]
          );
        }
      ),
      news: data.news || [],
    };
  } catch (error) {
    console.error("Error fetching search results:", error);
    return null;
  }
}

// Get Main Perfume by slug
export async function getMainPerfumeBySlug(
  slug: string,
  locale: string
): Promise<MainPerfume | null> {
  try {
    const data = await fetchSanityData(
      getMainPerfumeBySlugQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as MainPerfume;
  } catch (error) {
    console.error("Error fetching main perfume by slug:", error);
    return null;
  }
}

// Get Collection by slug
export async function getCollectionBySlug(
  slug: string,
  locale: string
): Promise<Collection | null> {
  try {
    const data = await fetchSanityData(
      getCollectionBySlugQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as Collection;
  } catch (error) {
    console.error("Error fetching collection by slug:", error);
    return null;
  }
}

type ProductResponse = {
  perfume: Perfume | null;
  mainPerfume: MainPerfume | null;
  collection: Collection | null;
};

export async function getProductBySlug(
  slug: string,
  locale: string
): Promise<ProductResponse> {
  try {
    const data = await fetchSanityData(
      getProductBySlugQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as ProductResponse;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return {
      perfume: null,
      mainPerfume: null,
      collection: null,
    };
  }
}

export async function getNotes(locale: string): Promise<Note[]> {
  try {
    const data = await fetchSanityData(
      getNotesQuery({ locale }),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as Note[];
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

// Wear Your Perfume - Get all perfumes with minimal data (perfume, mainPerfume, collections merged)
export async function getAllPerfumesForWearYourPerfume(): Promise<Perfume[]> {
  try {
    const data = await fetchSanityData(
      getAllPerfumesForWearYourPerfumeQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    ) as {
      perfumes: Perfume[];
      mainPerfumes: Perfume[];
      collections: Perfume[];
    };

    // Merge all three arrays into one, treating them all as perfumes
    const allPerfumes = [
      ...data.perfumes,
      ...data.mainPerfumes,
      ...data.collections
    ];

    return allPerfumes;
  } catch (error) {
    console.error("Error fetching perfumes for wear your perfume:", error);
    return [];
  }
}


// Terms of Use
export async function getTermsOfUse(locale: string): Promise<TermsOfUseInterface | null> {
  try {
    const data = await fetchSanityData(
      getTermsOfUseQuery({ locale }),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as TermsOfUseInterface;
  } catch (error) {
    console.error("Error fetching terms of use:", error);
    return null;
  }
}


// Cookies Policy
export async function getCookiesPolicy(locale: string): Promise<CookiesPolicyInterface | null> {
  try {
    const data = await fetchSanityData(
      getCookiesPolicyQuery({ locale }),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as CookiesPolicyInterface;
  } catch (error) {
    console.error("Error fetching cookies policy:", error);
    return null;
  }
}

// Privacy Policy
export async function getPrivacyPolicy(locale: string): Promise<PrivacyPolicyInterface | null> {
  try {
    const data = await fetchSanityData(
      getPrivacyPolicyQuery({ locale }),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as PrivacyPolicyInterface;
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return null;
  }
}

// Static Generation
export async function getAllNewsSlugs(): Promise<StaticSlug[]> {
  try {
    const data = await fetchSanityData(
      getAllNewsSlugsQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as StaticSlug[];
  } catch (error) {
    console.error("Error fetching news slugs:", error);
    return [];
  }
}


// SEO
export async function getNewsBySlugForSEO(slug: string, locale: string) {
  try {
    const data = await fetchSanityData(
      getNewsBySlugForSEOQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching news by slug for SEO:", error);
    return null;
  }
}

export async function getNewsPageForSEO(locale: string) {
  try {
    const data = await fetchSanityData(
      getNewsPageForSEOQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching news page for SEO:", error);
    return null;
  }
}

export async function getBrandPageForSEO(locale: string) {
  try {
    const data = await fetchSanityData(
      getBrandPageForSEOQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching news page for SEO:", error);
    return null;
  }
}

export async function getHomePageForSEO(locale: string) {
  try {
    const data = await fetchSanityData(
      getHomePageForSEOQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching news page for SEO:", error);
    return null;
  }
}

// Product Page for SEO
export async function getProductBySlugForSEO(slug: string, locale: string) {
  try {
    const data = await fetchSanityData(
      getProductBySlugForSEOQuery(slug, locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching product by slug for SEO:", error);
    return null;
  }
}



export async function getTermsOfUseForSEO(locale: string) {
  try {
    const data = await fetchSanityData(
      getTermsOfUseForSEOQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching terms of use for SEO:", error);
    return null;
  }
}

export async function getCookiesPolicyForSEO(locale: string) {
  try {
    const data = await fetchSanityData(
      getCookiesPolicyForSEOQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching cookies policy for SEO:", error);
    return null;
  }
}

export async function getPrivacyPolicyForSEO(locale: string) {
  try {
    const data = await fetchSanityData(
      getPrivacyPolicyForSEOQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching privacy policy for SEO:", error);
    return null;
  }
}