import { NextResponse } from "next/server";
import {
  getAllNewsSlugQuery,
  getProductBySlugsForSitemapQuery,
} from "@/lib/sanity/queries";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { LOCALES } from "@/lib/i18n/constants";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://studio.figmenta.com";

interface PerfumeData {
  perfume?: { slug: string; _updatedAt: string };
  mainPerfume?: { slug: string; _updatedAt: string };
  collection?: { slug: string; _updatedAt: string };
}

interface NewsItem {
  slug: string;
  _updatedAt: string;
}

export async function GET() {
  const news = await fetchSanityData<NewsItem[]>(getAllNewsSlugQuery());
  const mensPerfumesData = await fetchSanityData<PerfumeData>(
    getProductBySlugsForSitemapQuery("mens")
  );
  const womensPerfumesData = await fetchSanityData<PerfumeData>(
    getProductBySlugsForSitemapQuery("womens")
  );

  const mensPerfumes = [mensPerfumesData.perfume, mensPerfumesData.mainPerfume, mensPerfumesData.collection].filter(Boolean);
  const womensPerfumes = [womensPerfumesData.perfume, womensPerfumesData.mainPerfume, womensPerfumesData.collection].filter(Boolean);

  const pages = [];

  // Static top-level pages
  for (const locale of LOCALES) {
    pages.push(
      {
        url: `${BASE_URL}/${locale}`,
        lastModified: new Date().toISOString(),
        priority: 1.0,
        changefreq: "daily",
      },
      {
        url: `${BASE_URL}/${locale}/womens-perfume`,
        lastModified: new Date().toISOString(),
        priority: 0.9,
        changefreq: "weekly",
      },
      {
        url: `${BASE_URL}/${locale}/mens-perfume`,
        lastModified: new Date().toISOString(),
        priority: 0.9,
        changefreq: "weekly",
      },
      {
        url: `${BASE_URL}/${locale}/brand`,
        lastModified: new Date().toISOString(),
        priority: 0.9,
        changefreq: "weekly",
      },
      {
        url: `${BASE_URL}/${locale}/news`,
        lastModified: new Date().toISOString(),
        priority: 0.9,
        changefreq: "weekly",
      }
    );
  }

  // Mens Perfumes
  for (const product of mensPerfumes) {
    if (!product) continue;
    for (const locale of LOCALES) {
      pages.push({
        url: `${BASE_URL}/${locale}/mens-perfume/${product.slug}`,
        lastModified: product._updatedAt,
        priority: 0.8,
        changefreq: "weekly",
      });
    }
  }

  // Womens Perfumes
  for (const product of womensPerfumes) {
    if (!product) continue;
    for (const locale of LOCALES) {
      pages.push({
        url: `${BASE_URL}/${locale}/womens-perfume/${product.slug}`,
        lastModified: product._updatedAt,
        priority: 0.8,
        changefreq: 'weekly'
      });
    }
  }

  // News 
  for (const newsItem of news) {
    for (const locale of LOCALES) {
      pages.push({
        url: `${BASE_URL}/${locale}/news/${newsItem.slug}`,
        lastModified: newsItem._updatedAt,
        priority: 0.8,
        changefreq: "weekly",
      });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `<url>
  <loc>${page.url}</loc>
  <lastmod>${new Date(page.lastModified).toISOString()}</lastmod>
  <priority>${page.priority}</priority>
  <changefreq>${page.changefreq}</changefreq>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
