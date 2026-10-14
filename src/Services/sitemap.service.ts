import { Injectable } from '@angular/core';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private readonly baseUrl = 'https://transcribe-git-master-vishwas-project-432f63d2.vercel.app';
  
  private urls: SitemapUrl[] = [
    {
      loc: this.baseUrl + '/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 1.0
    },
    {
      loc: this.baseUrl + '/login',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: this.baseUrl + '/transcribe',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.9
    }
  ];

  /**
   * Get all sitemap URLs
   */
  getUrls(): SitemapUrl[] {
    return [...this.urls];
  }

  /**
   * Generate XML sitemap string
   */
  generateXmlSitemap(): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${this.urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n\n')}

</urlset>`;
    
    return xml;
  }

  /**
   * Update lastmod for a specific URL
   */
  updateLastModified(path: string): void {
    const url = this.urls.find(u => u.loc.endsWith(path));
    if (url) {
      url.lastmod = new Date().toISOString().split('T')[0];
    }
  }

  /**
   * Get structured data for JSON-LD
   */
  getStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AI Transcriber",
      "description": "AI-powered audio and video transcription service with real-time processing",
      "url": this.baseUrl,
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Audio transcription (MP3)",
        "Video transcription (MP4)",
        "Real-time processing",
        "Timestamp support",
        "Copy and download features",
        "Google OAuth authentication"
      ],
      "author": {
        "@type": "Organization",
        "name": "Vishwas Transcriber"
      },
      "potentialAction": {
        "@type": "UseAction",
        "target": this.baseUrl + "/transcribe",
        "object": {
          "@type": "AudioObject"
        }
      }
    };
  }
}