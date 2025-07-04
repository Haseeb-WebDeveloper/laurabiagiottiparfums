import { Perfume } from '@/types/perfume';
import { fetchSanityData } from '../sanity/fetch';
import { getBrandPageQuery, getMensPerfumesQuery, getNavbarPerfumesQuery, getNewsBySlugQuery, getNewsListQuery, getPerfumeBySlugQuery, getWomensPerfumesQuery } from '../sanity/queries';
import { NewsListItem } from '@/types/news';

const IS_DEVELOPMENT = process.env.DEVELOPMENT;

// Perfumes
export async function getMensPerfumes(locale: string) {
  try {
    const data = await fetchSanityData(
      getMensPerfumesQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as Perfume[];
  } catch (error) {
    console.error('Error fetching men\'s perfumes:', error);
    return null;
  }
}

export async function getWomensPerfumes(locale: string) {
  try {
    const data = await fetchSanityData(
      getWomensPerfumesQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as Perfume[];
  } catch (error) {
    console.error('Error fetching women\'s perfumes:', error);
    return null;
  }
}

// News List
export async function getNewsPageContent(locale: string) {
  try {
    const data = await fetchSanityData(
      getNewsListQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as NewsListItem[];
  } catch (error) {
    console.error('Error fetching news page content:', error);
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
    console.error('Error fetching news by slug:', error);
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
    console.error('Error fetching brand page content:', error);
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
    console.error('Error fetching perfume by slug:', error);
    return null;
  }
}

// Navbar Perfumes
export async function getNavbarPerfumes(locale: string) {
  try {
    const data = await fetchSanityData(
      getNavbarPerfumesQuery(locale),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data as Perfume[];
  } catch (error) {
    console.error('Error fetching navbar perfumes:', error);
    return null;
  }
}
