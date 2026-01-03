/**
 * Sitemap Generator
 * Generates sitemap.xml for SEO crawling
 * This should be called during build to generate a static sitemap
 */

import { SITEMAP_ROUTES, getSiteUrl } from '../seo.config';

export function generateSitemap(): string {
  const siteUrl = getSiteUrl();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ROUTES.map(
  ({ url, priority, changefreq }) => `  <url>
    <loc>${siteUrl}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
).join('\n')}
</urlset>`;

  return sitemap;
}

export default generateSitemap;
