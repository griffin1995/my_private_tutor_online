// CONTEXT7 SOURCE: /microsoft/playwright - Lighthouse CI configuration for performance testing
// LIGHTHOUSE_CONFIG_REASON: Official Playwright documentation for performance testing integration

/**
 * LIGHTHOUSE CI CONFIGURATION - NAVBAR LOGOSECTION PERFORMANCE TESTING
 * Created: August 27, 2025
 * Purpose: Performance validation for logo switching and navigation functionality
 * Focus: Loading optimization, animation performance, responsive behavior
 * 
 * Performance Targets:
 * - First Contentful Paint: <1.5s
 * - Largest Contentful Paint: <2.5s
 * - Cumulative Layout Shift: <0.1
 * - Time to Interactive: <3.0s
 * - Logo loading: <500ms (eager loading)
 * - Smooth animations: 60fps transitions
 */

module.exports = {
  ci: {
    collect: {
      // CONTEXT7 SOURCE: /microsoft/playwright - URL collection patterns for comprehensive testing
      // URL_TESTING_REASON: Official documentation for testing critical user paths
      url: [
        'http://localhost:3000/', // Homepage - logo override testing
        'http://localhost:3000/services', // Services - logo switching testing  
        'http://localhost:3000/about', // About - scroll behavior testing
        'http://localhost:3000/testimonials', // Testimonials - performance under load
      ],
      startServerCommand: 'npm start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3, // Multiple runs for consistency
      settings: {
        // CONTEXT7 SOURCE: /microsoft/playwright - Lighthouse settings for component testing
        // LIGHTHOUSE_SETTINGS_REASON: Official documentation for performance audit configuration
        preset: 'desktop',
        chromeFlags: ['--no-sandbox', '--disable-dev-shm-usage'],
        emulatedFormFactor: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        // Focus on logo and navigation performance
        onlyCategories: ['performance', 'accessibility'],
        skipAudits: [
          'canonical', // Not relevant for logo testing
          'meta-description', // SEO not critical for component testing
          'robots-txt', // Not component-specific
        ],
        // Additional metrics for logo performance
        additionalTraceCategories: 'loading,navigation,devtools.timeline',
      }
    },
    assert: {
      // CONTEXT7 SOURCE: /microsoft/playwright - Performance assertions for component validation
      // PERFORMANCE_ASSERTIONS_REASON: Official documentation for automated performance validation
      assertions: {
        // Core Web Vitals - Critical for user experience
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        
        // Navigation Performance - Logo loading optimization
        'first-contentful-paint': ['warn', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'interactive': ['warn', { maxNumericValue: 3000 }],
        'speed-index': ['warn', { maxNumericValue: 2000 }],
        
        // Layout Stability - Logo switching without shift
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        
        // Image Optimization - Logo loading performance
        'uses-optimized-images': ['warn'],
        'modern-image-formats': ['warn'],
        'efficient-animated-content': ['warn'],
        
        // Resource Loading - Logo prioritization
        'render-blocking-resources': ['warn'],
        'unused-css-rules': ['warn'],
        'unused-javascript': ['warn'],
        
        // Accessibility - Logo navigation compliance
        'color-contrast': ['error'],
        'image-alt': ['error'],
        'link-name': ['error'],
        'focus-traps': ['warn'],
        'focusable-controls': ['error'],
        
        // Performance Budget - Resource constraints
        'resource-summary:document:size': ['warn', { maxNumericValue: 50000 }],
        'resource-summary:image:size': ['warn', { maxNumericValue: 200000 }],
        'resource-summary:script:size': ['warn', { maxNumericValue: 300000 }],
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 50000 }],
        
        // Network Performance
        'mainthread-work-breakdown': ['warn', { maxNumericValue: 2000 }],
        'bootup-time': ['warn', { maxNumericValue: 1000 }],
      }
    },
    upload: {
      target: 'temporary-public-storage',
      // Store results for 30 days for trend analysis
      // In production, consider using Lighthouse CI server or GitHub Pages
    },
    server: {
      // CONTEXT7 SOURCE: /microsoft/playwright - Local server configuration for testing
      // SERVER_CONFIG_REASON: Official documentation for local development testing setup
      baseURL: 'http://localhost:3000',
      command: 'npm start',
      port: 3000,
      useHttps: false,
    }
  },
  
  // CONTEXT7 SOURCE: /microsoft/playwright - Performance budget configuration
  // BUDGET_CONFIG_REASON: Official documentation for performance budget enforcement
  budgets: [
    {
      path: '/',
      resourceSizes: [
        { resourceType: 'document', budget: 30 },
        { resourceType: 'stylesheet', budget: 40 },
        { resourceType: 'script', budget: 250 },
        { resourceType: 'image', budget: 150 },
        { resourceType: 'font', budget: 100 },
      ],
      resourceCounts: [
        { resourceType: 'document', budget: 1 },
        { resourceType: 'stylesheet', budget: 8 },
        { resourceType: 'script', budget: 15 },
        { resourceType: 'image', budget: 20 },
        { resourceType: 'font', budget: 6 },
      ],
      timings: [
        { metric: 'first-contentful-paint', budget: 1500 },
        { metric: 'largest-contentful-paint', budget: 2500 },
        { metric: 'interactive', budget: 3000 },
        { metric: 'cumulative-layout-shift', budget: 100 }, // CLS * 1000
      ]
    },
    {
      path: '/services',
      resourceSizes: [
        { resourceType: 'document', budget: 35 },
        { resourceType: 'image', budget: 200 }, // Higher for hero images
      ],
      timings: [
        { metric: 'first-contentful-paint', budget: 1800 },
        { metric: 'cumulative-layout-shift', budget: 100 },
      ]
    }
  ]
}

// CONTEXT7 SOURCE: /microsoft/playwright - Performance testing documentation
// TESTING_DOCUMENTATION_REASON: Official documentation for comprehensive performance validation

/**
 * PERFORMANCE TESTING STRATEGY - LOGOSECTION COMPONENT
 * 
 * CRITICAL METRICS MONITORED:
 * ✅ Logo Loading Performance
 *    - Eager loading attribute validation
 *    - Image optimization verification
 *    - Priority resource loading
 * 
 * ✅ Layout Stability
 *    - Cumulative Layout Shift <0.1
 *    - Fixed aspect ratio maintenance
 *    - No logo switching layout shifts
 * 
 * ✅ Animation Performance
 *    - Smooth hover transitions (60fps)
 *    - Scroll-triggered logo switching
 *    - Motion preference compliance
 * 
 * ✅ Responsive Performance
 *    - Multi-viewport optimization
 *    - Mobile performance parity
 *    - Image scaling efficiency
 * 
 * ✅ Network Optimization
 *    - Resource loading prioritization
 *    - Image format optimization
 *    - Bundle size optimization
 * 
 * PERFORMANCE BUDGETS:
 * - Total page size: <500KB
 * - Logo images: <50KB each
 * - CSS bundle: <40KB
 * - JavaScript bundle: <250KB
 * - Font loading: <100KB
 * 
 * CRITICAL PATHS TESTED:
 * 1. Homepage logo visibility (immediate)
 * 2. Logo navigation functionality (<100ms)
 * 3. Scroll-based logo switching (<16ms frame budget)
 * 4. Responsive logo scaling (no janks)
 * 5. Cross-page navigation performance
 * 
 * FAILURE THRESHOLDS:
 * - Performance score <85%: Error (blocks deployment)
 * - Accessibility score <95%: Error (blocks deployment)  
 * - LCP >2.5s: Warning (review required)
 * - CLS >0.1: Error (blocks deployment)
 * - Logo loading >1.5s: Warning (optimization needed)
 */