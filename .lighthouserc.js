// CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Lighthouse CI configuration for automated performance testing
// CONTEXT7 SOURCE: /vercel/vercel - Vercel deployment performance monitoring configuration  
// CONFIGURATION REASON: Lighthouse CI configuration for royal client performance standards
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 5,
      startServerCommand: 'npm start',
      startServerReadyPattern: 'Ready on',
      startServerReadyTimeout: 30000,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/about',
        'http://localhost:3000/subject-tuition',
        'http://localhost:3000/testimonials',
        'http://localhost:3000/how-it-works',
        'http://localhost:3000/faq' // CONTEXT7 SOURCE: /vercel/next.js - FAQ page performance monitoring
      ],
      settings: {
        preset: 'desktop',
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        },
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        skipAudits: [
          'canonical',
          'uses-http2',
          'redirects-http'
        ],
        budgetPath: './performance-budget.json',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage'
      }
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Royal client performance standards
        'first-contentful-paint': ['error', { maxNumericValue: 2000, aggregationMethod: 'optimistic' }],
        'interactive': ['error', { maxNumericValue: 5000, aggregationMethod: 'optimistic' }],
        'largest-contentful-paint': ['error', { maxNumericValue: 4000, aggregationMethod: 'optimistic' }],
        'speed-index': ['error', { maxNumericValue: 3500, aggregationMethod: 'optimistic' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'pessimistic' }],
        'total-blocking-time': ['error', { maxNumericValue: 500, aggregationMethod: 'optimistic' }],
        
        // Category scores for premium service
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Resource budgets
        'resource-summary:script:size': ['error', { maxNumericValue: 153600 }], // 150KB
        'resource-summary:total:size': ['error', { maxNumericValue: 512000 }], // 500KB
        'resource-summary:image:size': ['error', { maxNumericValue: 204800 }], // 200KB
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 51200 }], // 50KB
        'resource-summary:font:size': ['error', { maxNumericValue: 102400 }], // 100KB
        'resource-summary:document:size': ['error', { maxNumericValue: 51200 }], // 50KB
        
        // Resource counts
        'resource-summary:script:count': ['error', { maxNumericValue: 10 }],
        'resource-summary:total:count': ['error', { maxNumericValue: 30 }],
        'resource-summary:image:count': ['error', { maxNumericValue: 15 }],
        'resource-summary:stylesheet:count': ['error', { maxNumericValue: 5 }],
        'resource-summary:font:count': ['error', { maxNumericValue: 3 }],
        'resource-summary:third-party:count': ['error', { maxNumericValue: 5 }],
        
        // Performance budget audit
        'performance-budget': 'error',
        
        // Disable audits that may fail in CI environment
        'uses-rel-preload': 'off',
        'uses-rel-preconnect': 'off',
        'offscreen-images': 'off',
        'uses-webp-images': 'off',
        'color-contrast': 'warn'
      }
    },
    upload: {
      target: 'temporary-public-storage',
      githubToken: process.env.LHCI_GITHUB_APP_TOKEN,
      githubApiHost: 'https://api.github.com',
      githubStatusContextSuffix: '/royal-standards'
    }
  }
};