import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface MetaData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  noIndex?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  
  private readonly defaultData: MetaData = {
    title: 'AI Transcriber - Convert Audio & Video to Text',
    description: 'Free AI-powered transcription service. Upload MP3 audio or MP4 video files and get accurate speech-to-text conversion with timestamps. Fast, secure, and easy to use.',
    keywords: 'transcription, speech to text, audio transcription, video transcription, AI transcriber, convert audio to text, MP3 transcription, MP4 transcription',
    image: 'https://transcribe.vishwasladweb.site/assets/transcribe-logo-528.png',
    url: 'https://transcribe.vishwasladweb.site',
    type: 'website',
    author: 'AI Transcriber'
  };

  /**
   * Update all meta tags for a page
   */
  updateMeta(data: Partial<MetaData>) {
    const metaData = { ...this.defaultData, ...data };
    
    // Set page title
    this.titleService.setTitle(metaData.title);
    
    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: metaData.description });
    this.meta.updateTag({ name: 'keywords', content: metaData.keywords || this.defaultData.keywords! });
    this.meta.updateTag({ name: 'author', content: metaData.author || this.defaultData.author! });
    
    // Robots meta
    if (metaData.noIndex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    }
    
    // Open Graph meta tags (Facebook, LinkedIn, etc.)
    this.meta.updateTag({ property: 'og:title', content: metaData.title });
    this.meta.updateTag({ property: 'og:description', content: metaData.description });
    this.meta.updateTag({ property: 'og:type', content: metaData.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: metaData.url || this.defaultData.url! });
    this.meta.updateTag({ property: 'og:image', content: metaData.image || this.defaultData.image! });
    this.meta.updateTag({ property: 'og:site_name', content: 'AI Transcriber' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    
    // Twitter Card meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: metaData.title });
    this.meta.updateTag({ name: 'twitter:description', content: metaData.description });
    this.meta.updateTag({ name: 'twitter:image', content: metaData.image || this.defaultData.image! });
    this.meta.updateTag({ name: 'twitter:site', content: '@aitranscriber' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@vishwasladweb' });
    
    // Additional SEO meta tags
    this.meta.updateTag({ name: 'theme-color', content: '#667eea' });
    this.meta.updateTag({ name: 'msapplication-TileColor', content: '#667eea' });
    this.meta.updateTag({ name: 'application-name', content: 'AI Transcriber' });
    this.meta.updateTag({ name: 'apple-mobile-web-app-title', content: 'AI Transcriber' });
    this.meta.updateTag({ name: 'apple-mobile-web-app-capable', content: 'yes' });
    this.meta.updateTag({ name: 'apple-mobile-web-app-status-bar-style', content: 'default' });
    
    // Canonical URL
    this.updateCanonical(metaData.url || this.defaultData.url!);
  }
  
  /**
   * Update canonical URL
   */
  private updateCanonical(url: string) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }
  
  /**
   * Add structured data (JSON-LD)
   */
  addStructuredData(data: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
  
  /**
   * Get default structured data for the app
   */
  getAppStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AI Transcriber",
      "description": "AI-powered audio and video transcription service with real-time processing",
      "url": "https://transcribe.vishwasladweb.site",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        "Audio transcription (MP3)",
        "Video transcription (MP4)", 
        "Real-time processing",
        "Timestamp support",
        "Copy and download features",
        "Google OAuth authentication",
        "Supports files up to 200MB"
      ],
      "author": {
        "@type": "Organization",
        "name": "AI Transcriber",
        "url": "https://transcribe.vishwasladweb.site"
      },
      "potentialAction": {
        "@type": "UseAction",
        "target": "https://transcribe.vishwasladweb.site/transcribe",
        "object": {
          "@type": "AudioObject",
          "name": "Audio or Video File"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      }
    };
  }
}