/**
 * CONTEXT7 SOURCE: /mozilla/mdn - Service Worker implementation for advanced multi-layer caching
 * MULTI-LAYER CACHING: Official MDN documentation shows implementing sophisticated caching strategies
 * PATTERN: About section specific service worker with performance optimization
 */

// CONTEXT7 SOURCE: /mozilla/mdn - Service Worker cache configuration
// CACHE STRATEGY: Official MDN documentation shows multiple cache layers for different resource types
const CACHE_CONFIG = {
  ABOUT_CACHE: 'about-section-cache-v1',
  IMAGES_CACHE: 'about-images-cache-v1',
  API_CACHE: 'about-api-cache-v1',
  VERSION: '1.0.0'
};

// CONTEXT7 SOURCE: /mozilla/mdn - Critical resource pre-caching list
// PRECACHE STRATEGY: Official MDN documentation shows pre-caching critical resources for instant loading
const CRITICAL_RESOURCES = [
  '/images/team/elizabeth-burrows-founder-spare.jpg',
  '/images/media/tatler-logo.png',
  '/images/media/schools-guide-uk-logo.png'
];

// CONTEXT7 SOURCE: /mozilla/mdn - Service Worker install event for initial caching
// INSTALL PHASE: Official MDN documentation shows setting up cache during service worker installation
self.addEventListener('install', (event) => {
  console.log('About section service worker installing...');

  event.waitUntil(
    Promise.all([
      // CONTEXT7 SOURCE: /mozilla/mdn - Cache critical resources during installation
      // CRITICAL CACHING: Official MDN documentation shows pre-caching essential resources
      caches.open(CACHE_CONFIG.IMAGES_CACHE).then((cache) => {
        return cache.addAll(CRITICAL_RESOURCES);
      }),

      // CONTEXT7 SOURCE: /mozilla/mdn - Skip waiting for immediate activation
      // ACTIVATION STRATEGY: Official MDN documentation shows immediate service worker activation
      self.skipWaiting()
    ])
  );
});

// CONTEXT7 SOURCE: /mozilla/mdn - Service Worker activate event for cache cleanup
// ACTIVATION PHASE: Official MDN documentation shows cleaning up old caches during activation
self.addEventListener('activate', (event) => {
  console.log('About section service worker activating...');

  event.waitUntil(
    Promise.all([
      // CONTEXT7 SOURCE: /mozilla/mdn - Old cache cleanup during activation
      // CACHE CLEANUP: Official MDN documentation shows removing outdated caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.includes('about-') &&
                !Object.values(CACHE_CONFIG).includes(cacheName)) {
              console.log('Deleting old about cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),

      // CONTEXT7 SOURCE: /mozilla/mdn - Claim clients for immediate control
      // CLIENT CONTROL: Official MDN documentation shows taking control of all clients
      self.clients.claim()
    ])
  );
});

// CONTEXT7 SOURCE: /mozilla/mdn - Service Worker fetch event for request interception
// FETCH INTERCEPTION: Official MDN documentation shows intelligent request handling with caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // CONTEXT7 SOURCE: /mozilla/mdn - Request filtering for about section resources
  // REQUEST FILTERING: Official MDN documentation shows filtering requests by URL patterns
  if (!isAboutSectionResource(url)) {
    return; // Let other requests pass through
  }

  event.respondWith(handleAboutSectionRequest(request));
});

// CONTEXT7 SOURCE: /mozilla/mdn - Resource classification for targeted caching
// CLASSIFICATION LOGIC: Official MDN documentation shows categorizing resources for appropriate caching strategies
function isAboutSectionResource(url) {
  return (
    url.pathname.includes('/about') ||
    url.pathname.includes('/images/team/') ||
    url.pathname.includes('/images/media/') ||
    url.pathname.includes('/api/about') ||
    url.pathname.includes('/api/performance')
  );
}

// CONTEXT7 SOURCE: /mozilla/mdn - Multi-strategy request handling for optimal performance
// REQUEST HANDLING: Official MDN documentation shows implementing different caching strategies per resource type
async function handleAboutSectionRequest(request) {
  const url = new URL(request.url);

  // CONTEXT7 SOURCE: /mozilla/mdn - Image resource caching with cache-first strategy
  // IMAGE CACHING: Official MDN documentation shows cache-first strategy for static images
  if (isImageRequest(url)) {
    return handleImageRequest(request);
  }

  // CONTEXT7 SOURCE: /mozilla/mdn - API resource caching with network-first strategy
  // API CACHING: Official MDN documentation shows network-first strategy for dynamic content
  if (isApiRequest(url)) {
    return handleApiRequest(request);
  }

  // CONTEXT7 SOURCE: /mozilla/mdn - Default caching strategy for other resources
  // DEFAULT STRATEGY: Official MDN documentation shows stale-while-revalidate for general resources
  return handleGeneralRequest(request);
}

// CONTEXT7 SOURCE: /mozilla/mdn - Image request identification
// IMAGE DETECTION: Official MDN documentation shows detecting image requests by file extension
function isImageRequest(url) {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(url.pathname);
}

// CONTEXT7 SOURCE: /mozilla/mdn - API request identification
// API DETECTION: Official MDN documentation shows detecting API requests by path pattern
function isApiRequest(url) {
  return url.pathname.startsWith('/api/');
}

// CONTEXT7 SOURCE: /mozilla/mdn - Cache-first strategy for image resources
// CACHE-FIRST IMPLEMENTATION: Official MDN documentation shows cache-first pattern for static assets
async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_CONFIG.IMAGES_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // CONTEXT7 SOURCE: /mozilla/mdn - Performance measurement for cache hits
    // PERFORMANCE TRACKING: Official MDN documentation shows measuring cache performance
    reportCachePerformance('image-cache-hit', request.url);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // CONTEXT7 SOURCE: /mozilla/mdn - Cache storage for future requests
      // CACHE STORAGE: Official MDN documentation shows storing successful responses
      cache.put(request, networkResponse.clone());
      reportCachePerformance('image-network-success', request.url);
    }
    return networkResponse;
  } catch (error) {
    console.error('Image fetch failed:', error);
    reportCachePerformance('image-network-error', request.url);
    // Return a fallback if available
    return new Response('Image unavailable', { status: 404 });
  }
}

// CONTEXT7 SOURCE: /mozilla/mdn - Network-first strategy for API resources
// NETWORK-FIRST IMPLEMENTATION: Official MDN documentation shows network-first pattern for dynamic content
async function handleApiRequest(request) {
  const cache = await caches.open(CACHE_CONFIG.API_CACHE);

  try {
    // CONTEXT7 SOURCE: /mozilla/mdn - Network request with timeout handling
    // NETWORK PRIORITY: Official MDN documentation shows attempting network first with fallback
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // CONTEXT7 SOURCE: /mozilla/mdn - API response caching with expiration
      // API CACHING: Official MDN documentation shows caching API responses with headers
      const responseWithHeaders = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-cached': new Date().toISOString(),
          'cache-control': 'max-age=300' // 5 minutes
        }
      });

      cache.put(request, responseWithHeaders.clone());
      reportCachePerformance('api-network-success', request.url);
      return responseWithHeaders;
    }
  } catch (error) {
    console.log('Network failed, trying cache:', error);
  }

  // CONTEXT7 SOURCE: /mozilla/mdn - Fallback to cache for API failures
  // CACHE FALLBACK: Official MDN documentation shows using cached responses when network fails
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    reportCachePerformance('api-cache-fallback', request.url);
    return cachedResponse;
  }

  reportCachePerformance('api-total-failure', request.url);
  return new Response('API unavailable', { status: 503 });
}

// CONTEXT7 SOURCE: /mozilla/mdn - Stale-while-revalidate strategy for general resources
// STALE-WHILE-REVALIDATE: Official MDN documentation shows background updates with immediate cache serving
async function handleGeneralRequest(request) {
  const cache = await caches.open(CACHE_CONFIG.ABOUT_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // CONTEXT7 SOURCE: /mozilla/mdn - Background revalidation pattern
    // BACKGROUND UPDATE: Official MDN documentation shows updating cache in background
    fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
    }).catch((error) => {
      console.log('Background revalidation failed:', error);
    });

    reportCachePerformance('general-cache-hit', request.url);
    return cachedResponse;
  }

  // CONTEXT7 SOURCE: /mozilla/mdn - Network fallback for cache misses
  // NETWORK FALLBACK: Official MDN documentation shows fetching from network when cache misses
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      reportCachePerformance('general-network-success', request.url);
    }
    return networkResponse;
  } catch (error) {
    console.error('General request failed:', error);
    reportCachePerformance('general-network-error', request.url);
    return new Response('Resource unavailable', { status: 503 });
  }
}

// CONTEXT7 SOURCE: /mozilla/mdn - Performance reporting to main thread
// PERFORMANCE COMMUNICATION: Official MDN documentation shows communicating performance data to main thread
function reportCachePerformance(event, url) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'CACHE_PERFORMANCE',
        payload: {
          event,
          url,
          timestamp: Date.now(),
          cacheVersion: CACHE_CONFIG.VERSION
        }
      });
    });
  });
}

// CONTEXT7 SOURCE: /mozilla/mdn - Message handling for cache control operations
// MESSAGE HANDLING: Official MDN documentation shows handling messages from main thread
self.addEventListener('message', (event) => {
  const { type, resources, cacheNames } = event.data;

  switch (type) {
    case 'PRELOAD_ABOUT_RESOURCES':
      // CONTEXT7 SOURCE: /mozilla/mdn - Resource preloading on demand
      // PRELOAD HANDLING: Official MDN documentation shows preloading resources on command
      preloadResources(resources).then(() => {
        event.ports[0]?.postMessage({ success: true });
      });
      break;

    case 'INVALIDATE_ABOUT_CACHE':
      // CONTEXT7 SOURCE: /mozilla/mdn - Cache invalidation on demand
      // CACHE INVALIDATION: Official MDN documentation shows clearing specific caches
      invalidateCaches(cacheNames).then(() => {
        event.ports[0]?.postMessage({ success: true });
      });
      break;
  }
});

// CONTEXT7 SOURCE: /mozilla/mdn - Resource preloading implementation
// PRELOAD IMPLEMENTATION: Official MDN documentation shows fetching and caching resources proactively
async function preloadResources(resources) {
  const cache = await caches.open(CACHE_CONFIG.IMAGES_CACHE);

  const preloadPromises = resources.map(async (resource) => {
    try {
      const response = await fetch(resource);
      if (response.ok) {
        await cache.put(resource, response);
        console.log('Preloaded:', resource);
      }
    } catch (error) {
      console.error('Preload failed:', resource, error);
    }
  });

  await Promise.all(preloadPromises);
}

// CONTEXT7 SOURCE: /mozilla/mdn - Cache invalidation implementation
// INVALIDATION IMPLEMENTATION: Official MDN documentation shows deleting specific cache entries
async function invalidateCaches(cacheNames) {
  const deletionPromises = cacheNames.map(async (cacheName) => {
    const deleted = await caches.delete(cacheName);
    if (deleted) {
      console.log('Invalidated cache:', cacheName);
    }
    return deleted;
  });

  await Promise.all(deletionPromises);
}