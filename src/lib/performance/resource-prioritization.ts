/**
 * CONTEXT7 SOURCE: /vercel/next.js - Resource prioritization and preloading strategies for optimal performance
 * RESOURCE PRIORITIZATION REASON: Official Next.js documentation shows strategic resource loading for performance
 * PATTERN: Critical resource identification and intelligent preloading system
 */

'use client';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Resource priority levels for loading optimization
 * PRIORITY SYSTEM REASON: Official Next.js documentation shows resource priority classification
 */
export type ResourcePriority = 'critical' | 'high' | 'medium' | 'low';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Resource type classification for optimal loading strategies
 * RESOURCE TYPES REASON: Official Next.js documentation shows categorizing resources for appropriate handling
 */
export type ResourceType = 'image' | 'font' | 'script' | 'style' | 'video' | 'prefetch' | 'preconnect';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Resource configuration interface for comprehensive resource management
 * RESOURCE CONFIG REASON: Official Next.js documentation shows structured resource configuration
 */
export interface ResourceConfig {
  /** Resource URL */
  url: string;
  /** Resource type for appropriate preloading strategy */
  type: ResourceType;
  /** Loading priority level */
  priority: ResourcePriority;
  /** Media query for conditional loading */
  media?: string;
  /** Cross-origin configuration */
  crossOrigin?: 'anonymous' | 'use-credentials';
  /** Resource importance hint */
  importance?: 'high' | 'low' | 'auto';
  /** Fetch priority hint */
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - About section critical resources configuration
 * CRITICAL RESOURCES REASON: Official Next.js documentation shows identifying above-the-fold resources
 */
export const ABOUT_SECTION_RESOURCES: ResourceConfig[] = [
  // CONTEXT7 SOURCE: /vercel/next.js - Critical image resources for immediate loading
  // IMAGE PRIORITIZATION: Founder image is above-the-fold critical content
  {
    url: '/images/team/elizabeth-burrows-founder-spare.jpg',
    type: 'image',
    priority: 'critical',
    fetchPriority: 'high',
    importance: 'high'
  },

  // CONTEXT7 SOURCE: /vercel/next.js - High priority credential images
  // CREDENTIAL IMAGES: Important for trust signals, loaded with high priority
  {
    url: '/images/media/tatler-logo.png',
    type: 'image',
    priority: 'high',
    fetchPriority: 'high'
  },
  {
    url: '/images/media/schools-guide-uk-logo.png',
    type: 'image',
    priority: 'high',
    fetchPriority: 'high'
  },

  // CONTEXT7 SOURCE: /vercel/next.js - Font preloading for text rendering optimization
  // FONT OPTIMIZATION: Prevent layout shift from font loading
  {
    url: '/fonts/inter-var.woff2',
    type: 'font',
    priority: 'high',
    crossOrigin: 'anonymous'
  },

  // CONTEXT7 SOURCE: /vercel/next.js - Video resource preloading for engagement content
  // VIDEO PRELOADING: Hero video for founder introduction
  {
    url: '/videos/founder-intro-thumbnail.jpg',
    type: 'image',
    priority: 'medium',
    fetchPriority: 'auto'
  },

  // CONTEXT7 SOURCE: /vercel/next.js - API preconnection for faster data fetching
  // API PRECONNECTION: Establish early connection to API endpoints
  {
    url: 'https://api.myprivatetutoronline.com',
    type: 'preconnect',
    priority: 'medium'
  }
];

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Resource preloader class for systematic resource management
 * PRELOADER CLASS REASON: Official Next.js documentation shows implementing resource preloading systems
 */
export class ResourcePreloader {
  private loadedResources: Set<string> = new Set();
  private loadingPromises: Map<string, Promise<void>> = new Map();

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Resource preloading with priority-based loading
   * PRIORITY LOADING REASON: Official Next.js documentation shows loading resources by priority
   */
  public async preloadResources(resources: ResourceConfig[]): Promise<void> {
    // CONTEXT7 SOURCE: /vercel/next.js - Priority-based resource sorting
    // SORTING LOGIC: Load critical resources first, then by priority level
    const sortedResources = resources.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // CONTEXT7 SOURCE: /vercel/next.js - Batch loading by priority groups
    // BATCH LOADING: Process resources in priority groups for optimal performance
    const priorityGroups = this.groupResourcesByPriority(sortedResources);

    for (const [priority, resourceGroup] of priorityGroups) {
      if (priority === 'critical') {
        // CONTEXT7 SOURCE: /vercel/next.js - Sequential loading for critical resources
        // CRITICAL SEQUENTIAL: Ensure critical resources load in order
        await this.loadResourcesSequentially(resourceGroup);
      } else {
        // CONTEXT7 SOURCE: /vercel/next.js - Parallel loading for non-critical resources
        // NON-CRITICAL PARALLEL: Load non-critical resources in parallel
        await this.loadResourcesParallel(resourceGroup);
      }
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Priority grouping for efficient resource loading
   * GROUPING LOGIC REASON: Official Next.js documentation shows organizing resources by priority
   */
  private groupResourcesByPriority(resources: ResourceConfig[]): Map<ResourcePriority, ResourceConfig[]> {
    const groups = new Map<ResourcePriority, ResourceConfig[]>();

    resources.forEach(resource => {
      const group = groups.get(resource.priority) || [];
      group.push(resource);
      groups.set(resource.priority, group);
    });

    return groups;
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Sequential resource loading for critical resources
   * SEQUENTIAL LOADING REASON: Official Next.js documentation shows ordered loading for critical paths
   */
  private async loadResourcesSequentially(resources: ResourceConfig[]): Promise<void> {
    for (const resource of resources) {
      try {
        await this.preloadSingleResource(resource);
      } catch (error) {
        console.warn(`Failed to load critical resource: ${resource.url}`, error);
        // Continue loading other critical resources even if one fails
      }
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Parallel resource loading for optimal performance
   * PARALLEL LOADING REASON: Official Next.js documentation shows concurrent loading for non-critical resources
   */
  private async loadResourcesParallel(resources: ResourceConfig[]): Promise<void> {
    const loadPromises = resources.map(resource =>
      this.preloadSingleResource(resource).catch(error => {
        console.warn(`Failed to load resource: ${resource.url}`, error);
        return null; // Don't fail the entire batch
      })
    );

    await Promise.allSettled(loadPromises);
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Individual resource preloading with type-specific handling
   * RESOURCE LOADING REASON: Official Next.js documentation shows type-specific preloading strategies
   */
  private async preloadSingleResource(resource: ResourceConfig): Promise<void> {
    // CONTEXT7 SOURCE: /vercel/next.js - Duplicate loading prevention
    // DEDUPLICATION: Prevent loading the same resource multiple times
    if (this.loadedResources.has(resource.url)) {
      return;
    }

    if (this.loadingPromises.has(resource.url)) {
      return this.loadingPromises.get(resource.url);
    }

    const loadPromise = this.executeResourceLoad(resource);
    this.loadingPromises.set(resource.url, loadPromise);

    try {
      await loadPromise;
      this.loadedResources.add(resource.url);
    } finally {
      this.loadingPromises.delete(resource.url);
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Resource loading execution with type-specific strategies
   * EXECUTION REASON: Official Next.js documentation shows implementing different loading strategies per resource type
   */
  private async executeResourceLoad(resource: ResourceConfig): Promise<void> {
    const startTime = performance.now();

    try {
      switch (resource.type) {
        case 'image':
          await this.preloadImage(resource);
          break;
        case 'font':
          await this.preloadFont(resource);
          break;
        case 'script':
          await this.preloadScript(resource);
          break;
        case 'style':
          await this.preloadStyle(resource);
          break;
        case 'video':
          await this.preloadVideo(resource);
          break;
        case 'prefetch':
          await this.prefetchResource(resource);
          break;
        case 'preconnect':
          this.preconnectResource(resource);
          break;
        default:
          await this.preloadGeneric(resource);
      }

      const loadTime = performance.now() - startTime;
      this.reportResourceLoad(resource, loadTime, true);
    } catch (error) {
      const loadTime = performance.now() - startTime;
      this.reportResourceLoad(resource, loadTime, false);
      throw error;
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Image preloading with performance optimization
   * IMAGE PRELOAD REASON: Official Next.js documentation shows optimal image preloading
   */
  private async preloadImage(resource: ResourceConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${resource.url}`));

      // CONTEXT7 SOURCE: /vercel/next.js - Image loading attributes for optimization
      // OPTIMIZATION ATTRIBUTES: Official Next.js documentation shows using fetchPriority and importance
      if (resource.fetchPriority) {
        (img as any).fetchPriority = resource.fetchPriority;
      }

      if (resource.crossOrigin) {
        img.crossOrigin = resource.crossOrigin;
      }

      img.src = resource.url;
    });
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Font preloading for text rendering optimization
   * FONT PRELOAD REASON: Official Next.js documentation shows preventing font loading delays
   */
  private async preloadFont(resource: ResourceConfig): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = resource.url;

    if (resource.crossOrigin) {
      link.crossOrigin = resource.crossOrigin;
    }

    document.head.appendChild(link);
    return Promise.resolve();
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Script preloading for JavaScript resources
   * SCRIPT PRELOAD REASON: Official Next.js documentation shows preloading scripts without execution
   */
  private async preloadScript(resource: ResourceConfig): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = resource.url;

    if (resource.crossOrigin) {
      link.crossOrigin = resource.crossOrigin;
    }

    document.head.appendChild(link);
    return Promise.resolve();
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Style preloading for CSS resources
   * STYLE PRELOAD REASON: Official Next.js documentation shows preloading stylesheets
   */
  private async preloadStyle(resource: ResourceConfig): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = resource.url;

    document.head.appendChild(link);
    return Promise.resolve();
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Video preloading for media content
   * VIDEO PRELOAD REASON: Official Next.js documentation shows preloading video content
   */
  private async preloadVideo(resource: ResourceConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');

      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error(`Failed to load video: ${resource.url}`));

      video.preload = 'metadata';
      video.src = resource.url;
    });
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Resource prefetching for future navigation
   * PREFETCH REASON: Official Next.js documentation shows prefetching resources for next page
   */
  private async prefetchResource(resource: ResourceConfig): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = resource.url;

    document.head.appendChild(link);
    return Promise.resolve();
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Connection preestablishment for faster requests
   * PRECONNECT REASON: Official Next.js documentation shows establishing early connections
   */
  private preconnectResource(resource: ResourceConfig): void {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = resource.url;

    if (resource.crossOrigin) {
      link.crossOrigin = resource.crossOrigin;
    }

    document.head.appendChild(link);
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Generic resource preloading fallback
   * GENERIC PRELOAD REASON: Official Next.js documentation shows fallback preloading strategy
   */
  private async preloadGeneric(resource: ResourceConfig): Promise<void> {
    try {
      await fetch(resource.url, { mode: 'no-cors' });
    } catch (error) {
      // Fetch might fail due to CORS, but resource might still be cached
      console.log(`Generic preload completed for: ${resource.url}`);
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Resource loading performance reporting
   * PERFORMANCE REPORTING REASON: Official Next.js documentation shows tracking resource loading performance
   */
  private reportResourceLoad(resource: ResourceConfig, loadTime: number, success: boolean): void {
    // CONTEXT7 SOURCE: /vercel/next.js - Performance measurement reporting
    // MEASUREMENT REPORTING: Official Next.js documentation shows sending performance data
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_load', {
        resource_url: resource.url,
        resource_type: resource.type,
        priority: resource.priority,
        load_time: Math.round(loadTime),
        success,
        event_category: 'performance'
      });
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      const status = success ? 'loaded' : 'failed';
      console.log(`Resource ${status}: ${resource.url} (${Math.round(loadTime)}ms) [${resource.priority}]`);
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Resource loading status checking
   * STATUS CHECKING REASON: Official Next.js documentation shows monitoring resource loading state
   */
  public isResourceLoaded(url: string): boolean {
    return this.loadedResources.has(url);
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Resource preloader cleanup for memory management
   * CLEANUP REASON: Official Next.js documentation shows proper resource management
   */
  public cleanup(): void {
    this.loadedResources.clear();
    this.loadingPromises.clear();
  }
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Singleton resource preloader for global access
 * SINGLETON PATTERN: Official Next.js documentation shows global resource management
 */
let preloaderInstance: ResourcePreloader | null = null;

export const getResourcePreloader = (): ResourcePreloader => {
  if (!preloaderInstance) {
    preloaderInstance = new ResourcePreloader();
  }
  return preloaderInstance;
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - React hook for resource preloading integration
 * HOOK INTEGRATION REASON: Official Next.js documentation shows React integration for resource loading
 */
export const useResourcePreloading = () => {
  if (typeof window === 'undefined') return null;

  const preloader = getResourcePreloader();

  return {
    preloader,
    preloadAboutResources: () => preloader.preloadResources(ABOUT_SECTION_RESOURCES),
    isResourceLoaded: (url: string) => preloader.isResourceLoaded(url)
  };
};

// CONTEXT7 SOURCE: /vercel/next.js - TypeScript export patterns for resource management utilities
export type { ResourceConfig, ResourcePriority, ResourceType };