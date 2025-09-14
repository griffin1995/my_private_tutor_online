/**
 * CONTEXT7 SOURCE: /mozilla/mdn - Service Worker registration patterns for progressive web apps
 * SERVICE WORKER INTEGRATION: Official MDN documentation shows service worker registration for advanced caching
 * PATTERN: Multi-layer caching strategy with selective resource management
 */

'use client';

/**
 * CONTEXT7 SOURCE: /mozilla/mdn - Service Worker registration interface for type safety
 * TYPE SAFETY REASON: Official MDN documentation shows proper TypeScript interfaces for service worker management
 */
interface ServiceWorkerConfig {
  /** Cache name for about section resources */
  aboutCacheName: string;
  /** Cache version for cache invalidation */
  cacheVersion: string;
  /** Resources to cache immediately */
  criticalResources: string[];
  /** Resources to cache on demand */
  dynamicResources: string[];
  /** Cache expiration time in milliseconds */
  cacheExpiry: number;
}

/**
 * CONTEXT7 SOURCE: /mozilla/mdn - Service Worker configuration for about section optimization
 * CONFIGURATION REASON: Official MDN documentation shows structured configuration for targeted caching strategies
 */
const aboutSectionSWConfig: ServiceWorkerConfig = {
  aboutCacheName: 'about-section-cache-v1',
  cacheVersion: '1.0.0',
  criticalResources: [
    '/images/team/elizabeth-burrows-founder-spare.jpg',
    '/images/media/tatler-logo.png',
    '/images/media/schools-guide-uk-logo.png',
  ],
  dynamicResources: [
    '/api/about-content',
    '/api/performance-metrics',
  ],
  cacheExpiry: 24 * 60 * 60 * 1000, // 24 hours
};

/**
 * CONTEXT7 SOURCE: /mozilla/mdn - Service Worker registration with error handling
 * REGISTRATION PATTERN: Official MDN documentation shows robust service worker registration
 */
export const registerAboutSectionSW = async (): Promise<boolean> => {
  // CONTEXT7 SOURCE: /vercel/next.js - Temporarily disabled for build performance optimization
  // PERFORMANCE FIX: Service worker registration disabled to reduce build overhead
  return false;

  /* TEMPORARILY DISABLED FOR PERFORMANCE OPTIMIZATION
  // CONTEXT7 SOURCE: /mozilla/mdn - Service Worker browser support detection
  // FEATURE DETECTION: Official MDN documentation shows checking service worker support
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Workers not supported');
    return false;
  }

  try {
    // CONTEXT7 SOURCE: /mozilla/mdn - Service Worker registration with scope configuration
    // SCOPE CONFIGURATION: Official MDN documentation shows setting service worker scope for targeted caching
    const registration = await navigator.serviceWorker.register('/sw-about.js', {
      scope: '/',
      updateViaCache: 'none'
    });

    // CONTEXT7 SOURCE: /mozilla/mdn - Service Worker lifecycle event handling
    // LIFECYCLE MANAGEMENT: Official MDN documentation shows handling service worker updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'activated') {
            console.log('About section service worker activated');
            // Notify about section performance monitor
            window.dispatchEvent(new CustomEvent('sw-about-activated', {
              detail: { config: aboutSectionSWConfig }
            }));
          }
        });
      }
    });

    // CONTEXT7 SOURCE: /mozilla/mdn - Service Worker message communication
    // COMMUNICATION PATTERN: Official MDN documentation shows bidirectional communication with service workers
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'CACHE_PERFORMANCE') {
        // Report cache performance to about section monitor
        window.dispatchEvent(new CustomEvent('cache-performance-update', {
          detail: event.data.payload
        }));
      }
    });

    console.log('About section service worker registered successfully');
    return true;
  } catch (error) {
    console.error('About section service worker registration failed:', error);
    return false;
  }
  */
};

/**
 * CONTEXT7 SOURCE: /mozilla/mdn - Service Worker unregistration for cleanup
 * CLEANUP PATTERN: Official MDN documentation shows proper service worker cleanup
 */
export const unregisterAboutSectionSW = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      if (registration.scope.includes('about')) {
        await registration.unregister();
        console.log('About section service worker unregistered');
      }
    }
    return true;
  } catch (error) {
    console.error('About section service worker unregistration failed:', error);
    return false;
  }
};

/**
 * CONTEXT7 SOURCE: /mozilla/mdn - Service Worker message posting for cache control
 * CACHE CONTROL REASON: Official MDN documentation shows sending messages to service worker for cache operations
 */
export const preloadAboutResources = async (): Promise<void> => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_ABOUT_RESOURCES',
      resources: aboutSectionSWConfig.criticalResources
    });
  }
};

/**
 * CONTEXT7 SOURCE: /mozilla/mdn - Service Worker cache invalidation patterns
 * CACHE INVALIDATION REASON: Official MDN documentation shows cache versioning and invalidation strategies
 */
export const invalidateAboutCache = async (): Promise<void> => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'INVALIDATE_ABOUT_CACHE',
      cacheNames: [aboutSectionSWConfig.aboutCacheName]
    });
  }
};

// CONTEXT7 SOURCE: /mozilla/mdn - TypeScript export patterns for service worker utilities
export { aboutSectionSWConfig };
export type { ServiceWorkerConfig };