/**
 * Sitemap Generation Script
 * Runs after build to generate sitemap.xml
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define sitemap routes directly here to avoid TypeScript issues
const SITE_URL = 'https://www.ariagroups.xyz';
const SITEMAP_ROUTES = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/ai-receptionist', priority: 0.95, changefreq: 'weekly' },
  { url: '/ai-call-answering', priority: 0.9, changefreq: 'weekly' },
  { url: '/industries/real-estate', priority: 0.8, changefreq: 'monthly' },
  { url: '/industries/healthcare', priority: 0.8, changefreq: 'monthly' },
  { url: '/industries/hvac', priority: 0.8, changefreq: 'monthly' },
  { url: '/industries/law-firms', priority: 0.8, changefreq: 'monthly' },
  { url: '/blog/ai-receptionist-vs-human', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/missed-calls-cost', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/small-business-ai-receptionist', priority: 0.7, changefreq: 'monthly' },
  { url: '/legal', priority: 0.5, changefreq: 'yearly' },
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ROUTES.map(
  ({ url, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
).join('\n')}
</urlset>`;

  return sitemap;
}

// Generate sitemap XML
const sitemapXml = generateSitemap();

// Write to public/sitemap.xml so it gets deployed
const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(publicSitemapPath, sitemapXml);

// Also write to dist for local testing
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  const distSitemapPath = path.join(distPath, 'sitemap.xml');
  fs.writeFileSync(distSitemapPath, sitemapXml);
}

console.log('✅ Sitemap generated at public/sitemap.xml');

