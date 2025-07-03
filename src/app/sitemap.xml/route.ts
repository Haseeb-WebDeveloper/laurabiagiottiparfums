import { NextResponse } from 'next/server';
import {
  getAllCaseStudiesSlugQuery,
  getAllDigitalProductsSolutionsSlugQuery,
  getAllBrandingSolutionsSlugQuery,
} from '@/lib/sanity/queries';
import { fetchSanityData } from '@/lib/sanity/fetch';
import { LOCALES } from '@/lib/i18n/constants';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://studio.figmenta.com';

export async function GET() {

  const caseStudies = await fetchSanityData(getAllCaseStudiesSlugQuery());
  const digitalProducts = await fetchSanityData(getAllDigitalProductsSolutionsSlugQuery());
  const brandingSolutions = await fetchSanityData(getAllBrandingSolutionsSlugQuery());

  const pages = [];

  // Static top-level pages
  for (const locale of LOCALES) {
    pages.push(
      { 
        url: `${BASE_URL}/${locale}`, 
        lastModified: new Date().toISOString(),
        priority: 1.0,
        changefreq: 'daily'
      },
      { 
        url: `${BASE_URL}/${locale}/digital-products`, 
        lastModified: new Date().toISOString(),
        priority: 0.9,
        changefreq: 'weekly'
      },
      { 
        url: `${BASE_URL}/${locale}/branding`, 
        lastModified: new Date().toISOString(),
        priority: 0.9,
        changefreq: 'weekly'
      }
    );
  }
  // Digital product slugs
  for (const product of digitalProducts as any[]) {
    for (const locale of LOCALES) {
      pages.push({
        url: `${BASE_URL}/${locale}/digital-products/${product.slug}`,
        lastModified: product._updatedAt,
        priority: 0.8,
        changefreq: 'weekly'
      });
    }
  }

  // Branding slugs
  for (const branding of brandingSolutions as any[]) {
    for (const locale of LOCALES) {
      pages.push({
        url: `${BASE_URL}/${locale}/branding/${branding.slug}`,
        lastModified: branding._updatedAt,
        priority: 0.8,
        changefreq: 'weekly'
      });
    }
  }

  // Case studies (correct path)
  for (const study of caseStudies as any[]) {
    for (const locale of LOCALES) {
      pages.push({
        url: `${BASE_URL}/${locale}/case-study/${study.slug}`,
        lastModified: study._updatedAt,
        priority: 0.8,
        changefreq: 'weekly'
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
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
