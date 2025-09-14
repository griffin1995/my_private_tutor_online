// CONTEXT7 SOURCE: /vercel/next.js - Predictive prefetching for critical resources
// PERFORMANCE OPTIMIZATION REASON: Phase 3 intelligent resource loading for optimal Web Vitals

import { useEffect } from 'react';

interface PrefetchConfig {
  priority?: 'high' | 'low' | 'auto';
  threshold?: number;
  rootMargin?: string;
  enableQuicklink?: boolean;
}

// CONTEXT7 SOURCE: /vercel/next.js - Critical resource patterns for premium tutoring service
const CRITICAL_RESOURCES = {
  pages: [
    '/services',
    '/meet-our-tutors',
    '/how-it-works',
    '/contact',
  ],
  assets: [
    '/images/hero-background.jpg',
    '/images/tutors/featured-tutor.jpg',
  ],
  fonts: [
    '/fonts/inter-var.woff2',
    '/fonts/playfair-display.woff2',
  ],
};

class PredictivePrefetcher {
  private observer: IntersectionObserver | null = null;
  private prefetchedUrls = new Set<string>();
  private config: Required<PrefetchConfig>;

  constructor(config: PrefetchConfig = {}) {
    this.config = {
      priority: config.priority || 'auto',
      threshold: config.threshold || 0.25,
      rootMargin: config.rootMargin || '50px',
      enableQuicklink: config.enableQuicklink !== false,
    };
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Initialize predictive prefetching
  public init(): void {
    if (typeof window === 'undefined') return;

    // Check for required APIs
    if (!('IntersectionObserver' in window)) return;
    if (!('requestIdleCallback' in window)) return;

    // Prefetch critical resources immediately
    this.prefetchCritical();

    // Set up viewport-based prefetching
    this.setupViewportPrefetching();

    // Set up interaction-based prefetching
    this.setupInteractionPrefetching();

    // Set up connection-aware prefetching
    this.setupAdaptivePrefetching();
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Prefetch critical resources on load
  private prefetchCritical(): void {
    // Prefetch critical pages
    requestIdleCallback(() => {
      CRITICAL_RESOURCES.pages.forEach(url => {
        this.prefetchPage(url, 'high');
      });
    });

    // Preload critical assets
    CRITICAL_RESOURCES.assets.forEach(url => {
      this.preloadAsset(url, 'image');
    });

    // Preload fonts
    CRITICAL_RESOURCES.fonts.forEach(url => {
      this.preloadAsset(url, 'font');
    });
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Set up viewport-based prefetching
  private setupViewportPrefetching(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.href;

            if (this.shouldPrefetch(href)) {
              requestIdleCallback(() => {
                this.prefetchPage(href);
              });
            }
          }
        });
      },
      {
        threshold: this.config.threshold,
        rootMargin: this.config.rootMargin,
      }
    );

    // Observe all internal links
    this.observeLinks();
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Set up interaction-based prefetching
  private setupInteractionPrefetching(): void {
    document.addEventListener('mouseover', this.handleMouseOver.bind(this), {
      capture: true,
      passive: true,
    });

    document.addEventListener('touchstart', this.handleTouchStart.bind(this), {
      capture: true,
      passive: true,
    });
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Adaptive prefetching based on connection
  private setupAdaptivePrefetching(): void {
    if (!('connection' in navigator)) return;

    const connection = (navigator as any).connection;

    // Adjust prefetching based on connection quality
    if (connection) {
      const updateStrategy = () => {
        const effectiveType = connection.effectiveType;
        const saveData = connection.saveData;

        if (saveData) {
          // Disable prefetching on data saver mode
          this.config.priority = 'low';
          this.config.threshold = 0.75;
        } else if (effectiveType === '4g') {
          // Aggressive prefetching on 4G
          this.config.priority = 'high';
          this.config.threshold = 0.1;
        } else if (effectiveType === '3g') {
          // Conservative prefetching on 3G
          this.config.priority = 'auto';
          this.config.threshold = 0.5;
        } else {
          // Minimal prefetching on slow connections
          this.config.priority = 'low';
          this.config.threshold = 0.9;
        }
      };

      updateStrategy();
      connection.addEventListener('change', updateStrategy);
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Handle mouse hover for prefetching
  private handleMouseOver(event: MouseEvent): void {
    const link = (event.target as Element).closest('a');
    if (!link) return;

    const href = (link as HTMLAnchorElement).href;
    if (this.shouldPrefetch(href)) {
      // Delay slightly to avoid prefetching on accidental hovers
      setTimeout(() => {
        if (link.matches(':hover')) {
          this.prefetchPage(href, 'high');
        }
      }, 65);
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Handle touch start for mobile prefetching
  private handleTouchStart(event: TouchEvent): void {
    const link = (event.target as Element).closest('a');
    if (!link) return;

    const href = (link as HTMLAnchorElement).href;
    if (this.shouldPrefetch(href)) {
      this.prefetchPage(href, 'high');
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Check if URL should be prefetched
  private shouldPrefetch(url: string): boolean {
    try {
      const urlObj = new URL(url);

      // Only prefetch same-origin URLs
      if (urlObj.origin !== window.location.origin) return false;

      // Skip if already prefetched
      if (this.prefetchedUrls.has(url)) return false;

      // Skip current page
      if (urlObj.pathname === window.location.pathname) return false;

      // Skip admin routes
      if (urlObj.pathname.startsWith('/admin')) return false;

      // Skip API routes
      if (urlObj.pathname.startsWith('/api')) return false;

      return true;
    } catch {
      return false;
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Prefetch a page
  private prefetchPage(url: string, priority?: 'high' | 'low' | 'auto'): void {
    if (this.prefetchedUrls.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'document';

    if (priority === 'high') {
      link.setAttribute('importance', 'high');
    } else if (priority === 'low') {
      link.setAttribute('importance', 'low');
    }

    document.head.appendChild(link);
    this.prefetchedUrls.add(url);
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Preload critical assets
  private preloadAsset(url: string, type: 'image' | 'font' | 'script' | 'style'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;

    if (type === 'font') {
      link.setAttribute('crossorigin', 'anonymous');
    }

    document.head.appendChild(link);
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Observe internal links for viewport prefetching
  private observeLinks(): void {
    if (!this.observer) return;

    requestIdleCallback(() => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach(link => {
        this.observer!.observe(link);
      });
    });
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Clean up observer
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Export singleton instance
export const predictivePrefetcher = new PredictivePrefetcher();

// CONTEXT7 SOURCE: /vercel/next.js - React hook for component-level prefetching
export function usePredictivePrefetch(urls?: string[]): void {
  useEffect(() => {
    if (urls && urls.length > 0) {
      requestIdleCallback(() => {
        urls.forEach(url => {
          predictivePrefetcher['prefetchPage'](url);
        });
      });
    }
  }, [urls]);
}

export default predictivePrefetcher;