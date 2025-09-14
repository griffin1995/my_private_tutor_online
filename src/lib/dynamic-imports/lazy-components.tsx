/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic import patterns for bundle splitting and lazy loading
 * LAZY LOADING REASON: Official Next.js documentation shows dynamic imports for code splitting optimization
 * PATTERN: Component-level code splitting with performance monitoring integration
 */

'use client';

import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Loading component interface for consistent loading states
 * LOADING INTERFACE REASON: Official Next.js documentation shows standardized loading component patterns
 */
interface LoadingComponentProps {
  /** Loading message to display */
  message?: string;
  /** Show skeleton loading animation */
  showSkeleton?: boolean;
  /** Custom className for styling */
  className?: string;
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Optimized loading component for dynamic imports
 * LOADING COMPONENT REASON: Official Next.js documentation shows custom loading states during code splitting
 */
const LoadingComponent: React.FC<LoadingComponentProps> = ({
  message = 'Loading...',
  showSkeleton = true,
  className = ''
}) => {
  if (showSkeleton) {
    return (
      <div className={`animate-pulse space-y-4 ${className}`} role="status" aria-label={message}>
        <div className="h-8 bg-primary-200 rounded-md w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-primary-200 rounded w-full"></div>
          <div className="h-4 bg-primary-200 rounded w-5/6"></div>
          <div className="h-4 bg-primary-200 rounded w-4/6"></div>
        </div>
        <div className="h-32 bg-primary-200 rounded-md"></div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`} role="status" aria-label={message}>
      <div className="text-primary-600">{message}</div>
    </div>
  );
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Error boundary component for dynamic import failures
 * ERROR HANDLING REASON: Official Next.js documentation shows handling dynamic import errors gracefully
 */
const ErrorComponent: React.FC<{ error?: Error; retry?: () => void }> = ({
  error,
  retry
}) => {
  return (
    <div className="border border-red-200 rounded-lg p-6 bg-red-50" role="alert">
      <div className="text-red-800 font-medium mb-2">
        Component loading failed
      </div>
      <div className="text-red-600 text-sm mb-4">
        {error?.message || 'An unexpected error occurred while loading this component.'}
      </div>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry Loading
        </button>
      )}
    </div>
  );
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic import configuration for about section components
 * DYNAMIC IMPORT CONFIG: Official Next.js documentation shows optimized dynamic import settings
 */
const dynamicImportOptions = {
  loading: () => <LoadingComponent showSkeleton={true} />,
  ssr: false, // Disable SSR for non-critical components to reduce initial bundle size
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Lazy loaded About section components with bundle splitting
 * COMPONENT SPLITTING REASON: Official Next.js documentation shows splitting components for performance
 */

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for AboutContent component
// ABOUT CONTENT SPLITTING: Separate bundle for content component to reduce initial load
export const LazyAboutContent = dynamic(
  () => import('@/components/sections/about/about-content').then(mod => ({ default: mod.AboutContent })),
  {
    ...dynamicImportOptions,
    loading: () => <LoadingComponent message="Loading content..." showSkeleton={true} className="space-y-6" />
  }
);

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for AboutImage component
// ABOUT IMAGE SPLITTING: Separate bundle for image component with credentials
export const LazyAboutImage = dynamic(
  () => import('@/components/sections/about/about-image').then(mod => ({ default: mod.AboutImage })),
  {
    ...dynamicImportOptions,
    loading: () => <LoadingComponent message="Loading images..." showSkeleton={true} className="space-y-4" />
  }
);

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Advanced dynamic import with retry logic
 * RETRY MECHANISM REASON: Official Next.js documentation shows implementing retry for failed imports
 */
export const createRetryableDynamicComponent = <T extends ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>,
  maxRetries: number = 3,
  retryDelay: number = 1000
) => {
  let retryCount = 0;

  const retryableImport = async (): Promise<{ default: T }> => {
    try {
      return await importFunction();
    } catch (error) {
      if (retryCount < maxRetries) {
        retryCount++;
        console.warn(`Dynamic import failed, retrying (${retryCount}/${maxRetries}):`, error);

        // CONTEXT7 SOURCE: /vercel/next.js - Exponential backoff for retry attempts
        // BACKOFF STRATEGY: Official Next.js documentation shows exponential backoff for network retries
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, retryCount - 1)));

        return retryableImport();
      }
      throw error;
    }
  };

  return dynamic(retryableImport, {
    ...dynamicImportOptions,
    loading: () => <LoadingComponent message="Loading component..." />,
    // CONTEXT7 SOURCE: /vercel/next.js - Error handling for dynamic imports
    // ERROR HANDLING: Official Next.js documentation shows handling import failures
    onError: (error) => {
      console.error('Dynamic component failed to load:', error);
    }
  });
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Bundle splitting analytics for performance monitoring
 * ANALYTICS INTEGRATION: Official Next.js documentation shows tracking code splitting performance
 */
export const trackComponentLoad = (componentName: string, loadTime: number) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // CONTEXT7 SOURCE: /vercel/next.js - Performance mark for component loading
    // PERFORMANCE TRACKING: Official Next.js documentation shows marking component load events
    performance.mark(`component-loaded-${componentName}`);

    // Report to analytics if available
    if ('gtag' in window) {
      (window as any).gtag('event', 'component_load', {
        component_name: componentName,
        load_time: Math.round(loadTime),
        event_category: 'performance'
      });
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Component ${componentName} loaded in ${Math.round(loadTime)}ms`);
    }
  }
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Preload utility for critical dynamic components
 * PRELOAD UTILITY REASON: Official Next.js documentation shows preloading dynamic components
 */
export const preloadComponent = (importFunction: () => Promise<any>) => {
  // CONTEXT7 SOURCE: /vercel/next.js - Component preloading on user interaction
  // PRELOAD STRATEGY: Official Next.js documentation shows preloading on hover or focus
  if (typeof window !== 'undefined') {
    const startTime = performance.now();

    importFunction().then(() => {
      const loadTime = performance.now() - startTime;
      console.log(`Component preloaded in ${Math.round(loadTime)}ms`);
    }).catch(error => {
      console.warn('Component preload failed:', error);
    });
  }
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Intersection Observer for lazy loading optimization
 * INTERSECTION OBSERVER REASON: Official Next.js documentation shows using observers for performance
 */
export const useLazyLoadTrigger = (threshold: number = 0.1) => {
  if (typeof window === 'undefined') return null;

  // CONTEXT7 SOURCE: /mozilla/mdn - Intersection Observer API for visibility detection
  // VISIBILITY DETECTION: Official MDN documentation shows detecting element visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger lazy loading when element becomes visible
          entry.target.dispatchEvent(new CustomEvent('lazy-load-trigger'));
        }
      });
    },
    {
      threshold,
      rootMargin: '50px' // Start loading 50px before element becomes visible
    }
  );

  return observer;
};

// CONTEXT7 SOURCE: /vercel/next.js - TypeScript export patterns for lazy loading utilities
export { LoadingComponent, ErrorComponent };
export type { LoadingComponentProps };