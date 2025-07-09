import { NextResponse } from 'next/server';
import {
  getAllNewsSlugQuery,
  getAllPerfumesSlugQuery,
} from '@/lib/sanity/queries';
import { fetchSanityData } from '@/lib/sanity/fetch';
import { LOCALES } from '@/lib/i18n/constants';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://studio.figmenta.com';

export async function GET() {

  const news = await fetchSanityData(getAllNewsSlugQuery());
  const perfumes = await fetchSanityData(getAllPerfumesSlugQuery());

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
        url: `${BASE_URL}/${locale}/perfumes`, 
        lastModified: new Date().toISOString(),
        priority: 0.9,
        changefreq: 'weekly'
      },

    );
  }
  // // Digital product slugs
  // for (const product of perfumes as any[]) {
  //   for (const locale of LOCALES) {
  //     pages.push({
  //       url: `${BASE_URL}/${locale}/perfumes/${product.slug}`,
  //       lastModified: product._updatedAt,
  //       priority: 0.8,
  //       changefreq: 'weekly'
  //     });
  //   }
  // }

  // // News (correct path)
  // for (const study of news as any[]) {
  //   for (const locale of LOCALES) {
  //     pages.push({
  //       url: `${BASE_URL}/${locale}/news/${study.slug}`,
  //       lastModified: study._updatedAt,
  //       priority: 0.8,
  //       changefreq: 'weekly'
  //     });
  //   }
  // }

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
