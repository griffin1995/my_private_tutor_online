import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // Cache API routes with NetworkFirst strategy
    {
      urlPattern: /^\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 86400, // 24 hours
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Cache FAQ content with StaleWhileRevalidate
    {
      urlPattern: /^\/faq.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "faq-cache",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 604800, // 7 days
        },
      },
    },
    // Cache static assets with CacheFirst
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-image-cache",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 2592000, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Cache fonts with CacheFirst
    {
      urlPattern: /\.(?:woff|woff2|eot|ttf|otf)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "font-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 31536000, // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Cache Google Fonts
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-cache",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 31536000, // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Cache Google Fonts webfonts
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: {
          maxEntries: 8,
          maxAgeSeconds: 31536000, // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

// Background Sync for offline data
serwist.addEventListeners();

// Handle offline page fallback
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          const cache = await caches.open('serwist-precache-v1');
          const offlineResponse = await cache.match('/offline');
          return offlineResponse || Response.error();
        }
      })()
    );
  }
});

// Handle sync events for background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'faq-sync') {
    event.waitUntil(syncFAQData());
  }
});

async function syncFAQData() {
  try {
    // Get queued data from IndexedDB or localStorage
    const queuedData = localStorage.getItem('offline_sync_queue');
    if (queuedData) {
      const queue = JSON.parse(queuedData);

      for (const item of queue) {
        try {
          await fetch(item.url, {
            method: item.method,
            body: item.data,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.warn('Background sync failed for item:', item);
        }
      }

      // Clear synced data
      localStorage.removeItem('offline_sync_queue');
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}