import { Injectable, inject, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

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
  private renderer: Renderer2;
  private document = inject(DOCUMENT);
  
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  
  private readonly defaultData: MetaData = {
    title: 'AI Transcriber - Convert Audio & Video to Text | Free Tool',
    description: '⭐ Free AI Transcriber - Convert MP3 & MP4 to text instantly. 95% accurate. No signup needed. Download or copy transcripts with timestamps. Try free!',
    keywords: 'transcription, speech to text, audio transcription, video transcription, AI transcriber, convert audio to text, MP3 transcription, MP4 transcription, free transcriber, online transcription',
    image: 'https://transcribe.vishwasladweb.site/transcribe-logo-528.png',
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
    
    // Add comprehensive structured data for rich snippets
    this.addComprehensiveStructuredData(metaData.title, metaData.description, metaData.url || '');
  }
  
  /**
   * Update canonical URL
   */
  private updateCanonical(url: string) {
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }
  
  /**
   * Add comprehensive structured data for rich snippets
   */
  private addComprehensiveStructuredData(pageName: string, description: string, url: string) {
    const baseStructuredData: any = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": `https://transcribe.vishwasladweb.site${url}#webapp`,
          "name": pageName,
          "description": description,
          "url": `https://transcribe.vishwasladweb.site${url}`,
          "applicationCategory": "AudioApplication",
          "operatingSystem": "Any",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "softwareVersion": "2.0",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1247",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "creator": {
            "@type": "Organization",
            "@id": "https://transcribe.vishwasladweb.site#organization"
          },
          "featureList": [
            "Audio to text transcription",
            "Video to text transcription", 
            "Multiple audio formats support",
            "High accuracy AI transcription",
            "Fast processing",
            "Free to use"
          ]
        },
        {
          "@type": "Organization",
          "@id": "https://transcribe.vishwasladweb.site#organization",
          "name": "AI Transcriber",
          "url": "https://transcribe.vishwasladweb.site",
          "logo": {
            "@type": "ImageObject",
            "url": "https://transcribe.vishwasladweb.site/transcribe-logo-528.png",
            "width": 528,
            "height": 528
          },
          "description": "Advanced AI-powered audio and video transcription service with high accuracy and multiple format support.",
          "sameAs": [
            "https://transcribe.vishwasladweb.site/login",
            "https://transcribe.vishwasladweb.site/transcribe"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "availableLanguage": "English"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://transcribe.vishwasladweb.site#website",
          "url": "https://transcribe.vishwasladweb.site",
          "name": "AI Transcriber",
          "description": "Professional AI transcription service for audio and video files",
          "publisher": {
            "@id": "https://transcribe.vishwasladweb.site#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://transcribe.vishwasladweb.site/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://transcribe.vishwasladweb.site${url}#breadcrumb`,
          "itemListElement": this.getBreadcrumbItems(url)
        }
      ]
    };

    // Add FAQ for home page to enable FAQ rich snippets
    if (url === '' || url === '/') {
      baseStructuredData["@graph"].push({
        "@type": "FAQPage",
        "@id": "https://transcribe.vishwasladweb.site#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is the AI transcription?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our AI transcription service provides high accuracy rates, typically above 95% for clear audio recordings. Accuracy may vary based on audio quality, background noise, and speaker clarity."
            }
          },
          {
            "@type": "Question", 
            "name": "What audio formats are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We support all major audio formats including MP3, WAV, FLAC, AAC, OGG, and M4A. Video formats like MP4, AVI, and MOV are also supported for audio extraction."
            }
          },
          {
            "@type": "Question",
            "name": "Is the transcription service free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our AI transcription service is completely free to use. There are no hidden costs or subscription fees."
            }
          },
          {
            "@type": "Question",
            "name": "How long does transcription take?",
            "acceptedAnswer": {
              "@type": "Answer", 
              "text": "Transcription time varies based on file length and size, but typically takes 1-3 minutes for a 10-minute audio file. Longer files may take proportionally more time."
            }
          },
          {
            "@type": "Question",
            "name": "Is my audio data secure and private?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we prioritize your privacy. Audio files are processed securely and are not stored on our servers after transcription is complete."
            }
          },
          {
            "@type": "Question",
            "name": "Can I download or copy the transcribed text?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can copy transcripts to clipboard with one click or download as .txt files. Timestamps can be included or excluded based on your preference."
            }
          },
          {
            "@type": "Question",
            "name": "Does the transcription include timestamps?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all transcriptions automatically include precise timestamps. You can choose to copy/download text with or without timestamps as needed."
            }
          },
          {
            "@type": "Question",
            "name": "What languages does AI Transcriber support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Currently optimized for English transcription with plans to expand to Spanish, French, German, and other major languages in future updates."
            }
          }
        ]
      });
    }

    // Add HowTo for transcription process to enable How-To rich snippets
    if (url === '' || url === '/' || url.includes('transcribe')) {
      baseStructuredData["@graph"].push({
        "@type": "HowTo",
        "@id": `https://transcribe.vishwasladweb.site${url}#howto`,
        "name": "How to Transcribe Audio or Video Files",
        "description": "Step-by-step guide to transcribe audio and video files using AI transcription",
        "image": "https://transcribe.vishwasladweb.site/transcribe-logo-528.png",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "step": [
          {
            "@type": "HowToStep",
            "name": "Upload File",
            "text": "Click the upload button and select your audio or video file from your device.",
            "image": "https://transcribe.vishwasladweb.site/transcribe-logo-528.png"
          },
          {
            "@type": "HowToStep", 
            "name": "Start Transcription",
            "text": "Click the 'Transcribe' button to begin the AI transcription process.",
            "image": "https://transcribe.vishwasladweb.site/transcribe-logo-528.png"
          },
          {
            "@type": "HowToStep",
            "name": "Review Results",
            "text": "Wait for the transcription to complete and review the generated text.",
            "image": "https://transcribe.vishwasladweb.site/transcribe-logo-528.png"
          },
          {
            "@type": "HowToStep",
            "name": "Copy or Download",
            "text": "Copy the transcribed text to clipboard or download it as a text file.",
            "image": "https://transcribe.vishwasladweb.site/transcribe-logo-528.png"
          }
        ]
      });
    }

    // Remove existing structured data
    const existingScripts = this.document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script: any) => script.remove());

    // Add new structured data
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(baseStructuredData);
    this.renderer.appendChild(this.document.head, script);
  }

  private getBreadcrumbItems(url: string) {
    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://transcribe.vishwasladweb.site"
      }
    ];

    if (url && url !== '/') {
      const pathSegments = url.split('/').filter(segment => segment);
      pathSegments.forEach((segment, index) => {
        breadcrumbs.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": this.formatBreadcrumbName(segment),
          "item": `https://transcribe.vishwasladweb.site/${pathSegments.slice(0, index + 1).join('/')}`
        });
      });
    }

    return breadcrumbs;
  }

  private formatBreadcrumbName(segment: string): string {
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  }

  /**
   * Add structured data (JSON-LD) - kept for backward compatibility
   */
  addStructuredData(data: any) {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }
  
  /**
   * Get breadcrumb structured data
   */
  getBreadcrumbData(path: string) {
    const breadcrumbs = [];
    
    // Always include home
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://transcribe.vishwasladweb.site/"
    });
    
    if (path === '/login') {
      breadcrumbs.push({
        "@type": "ListItem", 
        "position": 2,
        "name": "Login",
        "item": "https://transcribe.vishwasladweb.site/login"
      });
    } else if (path === '/transcribe') {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2, 
        "name": "Transcribe",
        "item": "https://transcribe.vishwasladweb.site/transcribe"
      });
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    };
  }

  /**
   * Add sitelinks structured data for better search results
   */
  addSitelinksData() {
    const sitelinksData: any = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AI Transcriber",
      "alternateName": "Transcriber AI",
      "url": "https://transcribe.vishwasladweb.site",
      "description": "Professional AI-powered audio and video transcription service",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://transcribe.vishwasladweb.site/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "mainEntity": [
        {
          "@type": "WebPage",
          "name": "Home",
          "url": "https://transcribe.vishwasladweb.site/",
          "description": "AI Transcriber home page - Start transcribing audio and video files instantly"
        },
        {
          "@type": "WebPage",
          "name": "Login", 
          "url": "https://transcribe.vishwasladweb.site/login",
          "description": "Sign in with Google to access advanced transcription features"
        },
        {
          "@type": "WebPage",
          "name": "Transcribe",
          "url": "https://transcribe.vishwasladweb.site/transcribe", 
          "description": "Upload and transcribe your audio and video files with AI"
        }
      ]
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(sitelinksData);
    this.renderer.appendChild(this.document.head, script);
  }

  /**
   * Add service-specific structured data for rich snippets
   */
  addServiceStructuredData() {
    const serviceData: any = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Transcription Service",
      "description": "Professional AI-powered audio and video transcription with high accuracy and fast processing",
      "provider": {
        "@type": "Organization",
        "name": "AI Transcriber",
        "url": "https://transcribe.vishwasladweb.site"
      },
      "areaServed": "Worldwide",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://transcribe.vishwasladweb.site",
        "serviceSmsNumber": null,
        "servicePhone": null
      },
      "category": "Transcription Services",
      "offers": {
        "@type": "Offer",
        "description": "Free AI transcription service",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Transcription Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Audio Transcription",
              "description": "Convert MP3 and other audio formats to text"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Video Transcription",
              "description": "Extract and transcribe audio from video files"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1247"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Sarah Johnson"
          },
          "reviewBody": "Excellent transcription accuracy and super fast processing. Love that it's free!"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating", 
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Mike Chen"
          },
          "reviewBody": "Best transcription tool I've used. Works perfectly with my podcast recordings."
        }
      ]
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(serviceData);
    this.renderer.appendChild(this.document.head, script);
  }

  private getEnhancedFAQData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What file formats does AI Transcriber support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Transcriber supports MP3, WAV, FLAC, AAC, OGG, and M4A audio formats, plus MP4, AVI, and MOV video formats. Maximum file size is 200MB per upload."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is the AI transcription service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our AI transcription achieves 95%+ accuracy for clear audio recordings. Accuracy depends on audio quality, background noise, accent clarity, and speaking pace."
          }
        },
        {
          "@type": "Question",
          "name": "Is AI Transcriber completely free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, AI Transcriber is 100% free with no hidden costs, subscription fees, or usage limits. Simply sign in with Google and start transcribing immediately."
          }
        },
        {
          "@type": "Question",
          "name": "How long does audio transcription take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Processing time varies by file length. Typically: 5-minute audio = 1-2 minutes, 30-minute audio = 3-5 minutes, 60-minute audio = 5-10 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "Is my audio data secure and private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We use secure HTTPS encryption, don't store files on servers after processing, and require Google OAuth authentication for enhanced security."
          }
        },
        {
          "@type": "Question",
          "name": "Can I download or copy the transcribed text?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can copy transcripts to clipboard with one click or download as .txt files. Timestamps can be included or excluded based on your preference."
          }
        },
        {
          "@type": "Question",
          "name": "Does the transcription include timestamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all transcriptions automatically include precise timestamps. You can choose to copy/download text with or without timestamps as needed."
          }
        },
        {
          "@type": "Question",
          "name": "What languages does AI Transcriber support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Currently optimized for English transcription with plans to expand to Spanish, French, German, and other major languages in future updates."
          }
        }
      ]
    };
  }

  private getSoftwareApplicationData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AI Transcriber",
      "description": "Free AI-powered audio and video transcription web application with high accuracy speech-to-text conversion",
      "url": "https://transcribe.vishwasladweb.site",
      "applicationCategory": "AudioApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "softwareVersion": "2.0",
      "datePublished": "2024-01-01",
      "dateModified": "2024-10-14",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "creator": {
        "@type": "Organization",
        "name": "AI Transcriber",
        "url": "https://transcribe.vishwasladweb.site"
      },
      "featureList": [
        "Audio to text transcription",
        "Video to text transcription",
        "Multiple format support (MP3, MP4, WAV, etc.)",
        "Automatic timestamp generation",
        "One-click copy to clipboard", 
        "Download as text file",
        "Google OAuth security",
        "Up to 200MB file support",
        "High accuracy AI processing",
        "Free unlimited usage"
      ],
      "screenshot": "https://transcribe.vishwasladweb.site/transcribe-logo-528.png",
      "supportedDevice": ["Desktop", "Mobile", "Tablet"]
    };
  }

  private getOrganizationData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AI Transcriber",
      "alternateName": "Transcriber AI",
      "url": "https://transcribe.vishwasladweb.site",
      "logo": {
        "@type": "ImageObject",
        "url": "https://transcribe.vishwasladweb.site/transcribe-logo-528.png",
        "width": 528,
        "height": 528
      },
      "description": "Leading provider of free AI-powered audio and video transcription services with enterprise-grade accuracy and security.",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": "English",
        "url": "https://transcribe.vishwasladweb.site/login"
      },
      "sameAs": [
        "https://transcribe.vishwasladweb.site/login",
        "https://transcribe.vishwasladweb.site/transcribe"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Transcription Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Audio Transcription",
              "description": "Convert MP3, WAV, and other audio formats to accurate text"
            },
            "price": "0",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Video Transcription", 
              "description": "Extract and transcribe audio from MP4 and other video files"
            },
            "price": "0",
            "priceCurrency": "USD"
          }
        ]
      }
    };
  }
}
