/**
 * Sitemap Generator Script for AI Transcriber
 * 
 * This script can be run manually to generate updated sitemap files.
 * Usage: node src/assets/sitemap-generator.js
 */

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://transcriber.vishwasladweb.site';
const currentDate = new Date().toISOString().split('T')[0];

const urls = [
  {
    loc: baseUrl + '/',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '1.0',
    description: 'Home page with authentication'
  },
  {
    loc: baseUrl + '/login',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8',
    description: 'Login page with Google OAuth'
  },
  {
    loc: baseUrl + '/transcribe',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9',
    description: 'Transcription workspace (protected)'
  }
];

// Generate XML sitemap
function generateXmlSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${urls.map(url => `  <!-- ${url.description} -->
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n\n')}

</urlset>`;

  return xml;
}

// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Allow: /login
Disallow: /transcribe

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Rate limiting
Crawl-delay: 1

# Additional information
# This is an AI-powered transcription service
# The /transcribe route requires authentication
# Only authenticated users can access transcription features

# Generated on: ${new Date().toISOString()}`;
}

// Write files
function generateSitemapFiles() {
  const srcDir = path.join(__dirname, '..');
  
  try {
    // Write XML sitemap
    fs.writeFileSync(
      path.join(srcDir, 'sitemap.xml'),
      generateXmlSitemap(),
      'utf8'
    );
    console.log('✅ sitemap.xml generated successfully');

    // Write robots.txt
    fs.writeFileSync(
      path.join(srcDir, 'robots.txt'),
      generateRobotsTxt(),
      'utf8'
    );
    console.log('✅ robots.txt generated successfully');

    console.log('🌐 Sitemaps are ready for deployment!');
    console.log(`📊 Total URLs: ${urls.length}`);
    console.log(`📅 Last updated: ${currentDate}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap files:', error);
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemapFiles();
}

module.exports = {
  generateXmlSitemap,
  generateRobotsTxt,
  generateSitemapFiles,
  urls
};