/**
 * CONTEXT7 SOURCE: /vercel/next.js - Advanced video loading optimization patterns
 * VIDEO PERFORMANCE REASON: Official Next.js documentation shows lazy loading and performance optimization patterns
 * PERFORMANCE ARCHITECTURE: Comprehensive video optimization system for royal client-worthy performance
 * 
 * CONTEXT7 SOURCE: /aidenybai/react-scan - Performance monitoring and optimization patterns
 * MONITORING REASON: Official React Scan documentation shows performance tracking for component optimization
 * METRICS SYSTEM: Advanced performance tracking for video showcase components
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ShowcasePerformanceMetrics, ShowcaseVariant } from '@/components/video-showcases/types';

// CONTEXT7 SOURCE: /vercel/next.js - Video preload strategies from Next.js video optimization guide
// VIDEO PRELOAD REASON: Official Next.js documentation recommends metadata preloading for performance
export type VideoPreloadStrategy = 'none' | 'metadata' | 'auto';

// CONTEXT7 SOURCE: /vercel/next.js - Intersection Observer API for lazy loading optimization
// LAZY LOADING REASON: Official Next.js documentation shows Intersection Observer patterns for performance
export interface VideoLazyLoadOptions {
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
}

// CONTEXT7 SOURCE: /aidenybai/react-scan - Performance metrics collection patterns
// PERFORMANCE TRACKING REASON: Official React Scan shows metric collection for component optimization
export interface VideoPerformanceConfig {
  enableMetrics?: boolean;
  trackVideoLoad?: boolean;
  trackInteractionLatency?: boolean;
  trackRenderTime?: boolean;
}

// CONTEXT7 SOURCE: /vercel/next.js - Bundle optimization strategies from Next.js performance guide
// BUNDLE OPTIMIZATION REASON: Official Next.js documentation shows dynamic import patterns for performance
export interface VideoBundleOptimization {
  lazyLoadThumbnails?: boolean;
  preloadCriticalVideos?: boolean;
  optimizeVideoFormats?: boolean;
  enableProgressiveLoading?: boolean;
}

// CONTEXT7 SOURCE: /vercel/next.js - Video optimization utility class based on Next.js performance patterns
// VIDEO UTILITY REASON: Official Next.js documentation recommends utility classes for performance optimization
export class VideoPerformanceOptimizer {
  private static instance: VideoPerformanceOptimizer;
  private metrics: Map<string, ShowcasePerformanceMetrics> = new Map();
  private intersectionObserver: IntersectionObserver | null = null;
  private videoElements: Map<string, HTMLVideoElement> = new Map();

  // CONTEXT7 SOURCE: /aidenybai/react-scan - Singleton pattern for performance monitoring
  // SINGLETON REASON: Official React Scan shows singleton patterns for centralized performance tracking
  static getInstance(): VideoPerformanceOptimizer {
    if (!VideoPerformanceOptimizer.instance) {
      VideoPerformanceOptimizer.instance = new VideoPerformanceOptimizer();
    }
    return VideoPerformanceOptimizer.instance;
  }

  private constructor() {
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side performance initialization
    // CLIENT INITIALIZATION REASON: Official Next.js documentation shows client-side optimization setup
    if (typeof window !== 'undefined') {
      this.initializeIntersectionObserver();
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Intersection Observer setup for lazy loading
  // LAZY LOADING SETUP REASON: Official Next.js documentation shows Intersection Observer for performance
  private initializeIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const videoId = entry.target.getAttribute('data-video-id');
              if (videoId) {
                this.handleVideoIntersection(videoId);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1
        }
      );
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Video element intersection handling for performance
  // VIDEO INTERSECTION REASON: Official Next.js documentation shows lazy video loading patterns
  private handleVideoIntersection(videoId: string) {
    const video = this.videoElements.get(videoId);
    if (video && video.getAttribute('data-lazy') === 'true') {
      const src = video.getAttribute('data-src');
      if (src) {
        video.src = src;
        video.removeAttribute('data-lazy');
        video.removeAttribute('data-src');
        this.trackVideoLoadStart(videoId);
      }
    }
  }

  // CONTEXT7 SOURCE: /aidenybai/react-scan - Performance metric tracking methods
  // METRIC TRACKING REASON: Official React Scan shows performance measurement patterns
  public trackVideoLoadStart(videoId: string): void {
    const startTime = performance.now();
    const existing = this.metrics.get(videoId) || {
      loadTime: 0,
      renderTime: 0,
      interactionLatency: 0
    };
    
    this.metrics.set(videoId, {
      ...existing,
      loadTime: startTime
    });
  }

  public trackVideoLoadComplete(videoId: string): void {
    const endTime = performance.now();
    const existing = this.metrics.get(videoId);
    if (existing && existing.loadTime > 0) {
      this.metrics.set(videoId, {
        ...existing,
        loadTime: endTime - existing.loadTime
      });
    }
  }

  public trackRenderTime(videoId: string, renderTime: number): void {
    const existing = this.metrics.get(videoId) || {
      loadTime: 0,
      renderTime: 0,
      interactionLatency: 0
    };
    
    this.metrics.set(videoId, {
      ...existing,
      renderTime
    });
  }

  public trackInteractionLatency(videoId: string, latency: number): void {
    const existing = this.metrics.get(videoId) || {
      loadTime: 0,
      renderTime: 0,
      interactionLatency: 0
    };
    
    this.metrics.set(videoId, {
      ...existing,
      interactionLatency: latency
    });
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Lazy loading registration for video elements
  // LAZY LOADING REASON: Official Next.js documentation shows element registration for lazy loading
  public registerVideoForLazyLoading(
    element: HTMLVideoElement | HTMLElement,
    videoId: string,
    videoSrc: string
  ): void {
    if (this.intersectionObserver && element) {
      element.setAttribute('data-video-id', videoId);
      element.setAttribute('data-src', videoSrc);
      element.setAttribute('data-lazy', 'true');
      
      if (element instanceof HTMLVideoElement) {
        this.videoElements.set(videoId, element);
      }
      
      this.intersectionObserver.observe(element);
    }
  }

  public unregisterVideo(videoId: string): void {
    this.videoElements.delete(videoId);
    this.metrics.delete(videoId);
  }

  // CONTEXT7 SOURCE: /aidenybai/react-scan - Performance metrics retrieval patterns
  // METRICS RETRIEVAL REASON: Official React Scan shows metric access patterns for optimization analysis
  public getMetrics(videoId?: string): ShowcasePerformanceMetrics | Map<string, ShowcasePerformanceMetrics> {
    if (videoId) {
      return this.metrics.get(videoId) || {
        loadTime: 0,
        renderTime: 0,
        interactionLatency: 0
      };
    }
    return new Map(this.metrics);
  }

  public getPerformanceReport(): {
    totalVideos: number;
    averageLoadTime: number;
    averageRenderTime: number;
    averageInteractionLatency: number;
  } {
    const metrics = Array.from(this.metrics.values());
    const totalVideos = metrics.length;
    
    if (totalVideos === 0) {
      return {
        totalVideos: 0,
        averageLoadTime: 0,
        averageRenderTime: 0,
        averageInteractionLatency: 0
      };
    }

    return {
      totalVideos,
      averageLoadTime: metrics.reduce((sum, m) => sum + m.loadTime, 0) / totalVideos,
      averageRenderTime: metrics.reduce((sum, m) => sum + m.renderTime, 0) / totalVideos,
      averageInteractionLatency: metrics.reduce((sum, m) => sum + m.interactionLatency, 0) / totalVideos
    };
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Custom hooks for video performance optimization
// HOOK PATTERNS REASON: Official Next.js documentation shows custom hook patterns for performance optimization
export function useVideoPerformanceOptimization(
  videoId: string,
  config: VideoPerformanceConfig = {}
) {
  const {
    enableMetrics = true,
    trackVideoLoad = true,
    trackInteractionLatency = true,
    trackRenderTime = true
  } = config;

  const optimizer = useRef<VideoPerformanceOptimizer>();
  const [metrics, setMetrics] = useState<ShowcasePerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    interactionLatency: 0
  });

  useEffect(() => {
    if (enableMetrics) {
      optimizer.current = VideoPerformanceOptimizer.getInstance();
    }
  }, [enableMetrics]);

  // CONTEXT7 SOURCE: /vercel/next.js - Video load tracking callback pattern
  // CALLBACK REASON: Official Next.js documentation shows callback patterns for performance tracking
  const handleVideoLoad = useCallback(() => {
    if (optimizer.current && trackVideoLoad) {
      optimizer.current.trackVideoLoadStart(videoId);
    }
  }, [videoId, trackVideoLoad]);

  const trackVideoComplete = useCallback(() => {
    if (optimizer.current && trackVideoLoad) {
      optimizer.current.trackVideoLoadComplete(videoId);
      const updatedMetrics = optimizer.current.getMetrics(videoId) as ShowcasePerformanceMetrics;
      setMetrics(updatedMetrics);
    }
  }, [videoId, trackVideoLoad]);

  const trackRender = useCallback((renderTime: number) => {
    if (optimizer.current && trackRenderTime) {
      optimizer.current.trackRenderTime(videoId, renderTime);
      const updatedMetrics = optimizer.current.getMetrics(videoId) as ShowcasePerformanceMetrics;
      setMetrics(updatedMetrics);
    }
  }, [videoId, trackRenderTime]);

  const trackInteraction = useCallback((startTime: number) => {
    if (optimizer.current && trackInteractionLatency) {
      const latency = performance.now() - startTime;
      optimizer.current.trackInteractionLatency(videoId, latency);
      const updatedMetrics = optimizer.current.getMetrics(videoId) as ShowcasePerformanceMetrics;
      setMetrics(updatedMetrics);
    }
  }, [videoId, trackInteractionLatency]);

  const registerForLazyLoading = useCallback((
    element: HTMLVideoElement | HTMLElement,
    videoSrc: string
  ) => {
    if (optimizer.current) {
      optimizer.current.registerVideoForLazyLoading(element, videoId, videoSrc);
    }
  }, [videoId]);

  useEffect(() => {
    return () => {
      if (optimizer.current) {
        optimizer.current.unregisterVideo(videoId);
      }
    };
  }, [videoId]);

  return {
    metrics,
    trackVideoLoad: handleVideoLoad,
    trackVideoComplete,
    trackRender,
    trackInteraction,
    registerForLazyLoading,
    getPerformanceReport: () => optimizer.current?.getPerformanceReport()
  };
}

// CONTEXT7 SOURCE: /vercel/next.js - Video lazy loading custom hook with Intersection Observer
// LAZY LOADING HOOK REASON: Official Next.js documentation shows Intersection Observer hooks for performance
export function useVideoLazyLoading(
  options: VideoLazyLoadOptions = {}
) {
  const {
    rootMargin = '50px 0px',
    threshold = 0.1,
    enabled = true
  } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || !elementRef.current || hasLoaded) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsInView(true);
          setHasLoaded(true);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, hasLoaded, rootMargin, threshold]);

  return {
    elementRef,
    isInView,
    hasLoaded,
    shouldLoad: isInView || hasLoaded
  };
}

// CONTEXT7 SOURCE: /vercel/next.js - Bundle optimization utilities for video components
// BUNDLE OPTIMIZATION REASON: Official Next.js documentation shows dynamic import patterns for performance
export const VideoBundleOptimizer = {
  // CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for video thumbnail components
  // DYNAMIC IMPORT REASON: Official Next.js documentation shows lazy component loading patterns
  loadVideoThumbnailComponent: async (showcaseVariant: ShowcaseVariant) => {
    const componentMap = {
      'cinematic': () => import('@/components/video-showcases/cinematic-hero-showcase'),
      'offset': () => import('@/components/video-showcases/offset-testimonial-showcase'),
      'spotlight': () => import('@/components/video-showcases/fullwidth-spotlight-showcase'),
      'intimate': () => import('@/components/video-showcases/intimate-story-showcase'),
      'elegant': () => import('@/components/video-showcases/elegant-offset-showcase'),
      'center-stage': () => import('@/components/video-showcases/center-stage-showcase')
    };

    const loader = componentMap[showcaseVariant];
    if (!loader) {
      throw new Error(`Unknown showcase variant: ${showcaseVariant}`);
    }

    return loader();
  },

  // CONTEXT7 SOURCE: /vercel/next.js - Video format optimization based on Next.js image optimization patterns
  // FORMAT OPTIMIZATION REASON: Official Next.js documentation shows format optimization for performance
  optimizeVideoSource: (videoUrl: string, quality: 'low' | 'medium' | 'high' = 'medium'): string => {
    if (!videoUrl) return videoUrl;

    const url = new URL(videoUrl);
    const qualityMap = {
      low: '480p',
      medium: '720p',
      high: '1080p'
    };

    // Add quality parameter for supported video services
    if (url.hostname.includes('vimeo') || url.hostname.includes('youtube')) {
      url.searchParams.set('quality', qualityMap[quality]);
    }

    return url.toString();
  },

  // CONTEXT7 SOURCE: /vercel/next.js - Progressive loading strategy for video content
  // PROGRESSIVE LOADING REASON: Official Next.js documentation shows progressive enhancement patterns
  createProgressiveVideoSource: (baseVideoUrl: string) => {
    return {
      poster: baseVideoUrl.replace(/\.(mp4|webm|ogg)$/, '-poster.jpg'),
      sources: [
        { src: baseVideoUrl.replace(/\.mp4$/, '.webm'), type: 'video/webm' },
        { src: baseVideoUrl, type: 'video/mp4' }
      ]
    };
  }
};

// CONTEXT7 SOURCE: /aidenybai/react-scan - Performance monitoring utilities
// MONITORING UTILITIES REASON: Official React Scan shows utility patterns for performance analysis
export const VideoPerformanceMonitor = {
  // CONTEXT7 SOURCE: /aidenybai/react-scan - Global performance metrics collection
  // GLOBAL METRICS REASON: Official React Scan shows global performance tracking patterns
  getGlobalVideoMetrics: (): {
    totalVideos: number;
    performanceReport: ReturnType<VideoPerformanceOptimizer['getPerformanceReport']>;
  } => {
    const optimizer = VideoPerformanceOptimizer.getInstance();
    return {
      totalVideos: (optimizer.getMetrics() as Map<string, ShowcasePerformanceMetrics>).size,
      performanceReport: optimizer.getPerformanceReport()
    };
  },

  // CONTEXT7 SOURCE: /aidenybai/react-scan - Performance threshold validation
  // THRESHOLD VALIDATION REASON: Official React Scan shows performance validation patterns
  validateVideoPerformance: (metrics: ShowcasePerformanceMetrics) => {
    const thresholds = {
      loadTime: 2000, // 2 seconds
      renderTime: 100, // 100ms
      interactionLatency: 50 // 50ms
    };

    return {
      loadTime: {
        value: metrics.loadTime,
        passed: metrics.loadTime <= thresholds.loadTime,
        threshold: thresholds.loadTime
      },
      renderTime: {
        value: metrics.renderTime,
        passed: metrics.renderTime <= thresholds.renderTime,
        threshold: thresholds.renderTime
      },
      interactionLatency: {
        value: metrics.interactionLatency,
        passed: metrics.interactionLatency <= thresholds.interactionLatency,
        threshold: thresholds.interactionLatency
      }
    };
  }
};