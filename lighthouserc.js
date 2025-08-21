// CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Lighthouse CI configuration for performance monitoring
// PERFORMANCE MONITORING REASON: Royal client performance standards with automated gates and budget enforcement

/**
 * Lighthouse CI Configuration - My Private Tutor Online
 * 
 * Royal Client Performance Standards:
 * - First Contentful Paint: < 2s
 * - Interactive: < 5s
 * - Largest Contentful Paint: < 4s
 * - Speed Index: < 3.5s
 * - Cumulative Layout Shift: < 0.1
 * - Total Blocking Time: < 500ms
 * - Performance Score: ≥ 90%
 * - Accessibility Score: ≥ 95%
 * - Best Practices Score: ≥ 90%
 * - SEO Score: ≥ 95%
 */

module.exports = {
  ci: {
    collect: {
      // CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Static site collection configuration
      staticDistDir: '.next',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/about',
        'http://localhost:3000/services/tuition',
        'http://localhost:3000/meet-our-tutors',
        'http://localhost:3000/testimonials',
        'http://localhost:3000/faq',
        'http://localhost:3000/contact',
      ],
      numberOfRuns: 3, // CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Multiple runs for accuracy
      startServerCommand: 'npm start',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
    },
    
    upload: {
      // CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - GitHub integration for PR comments
      target: 'lhci',
      serverBaseUrl: 'https://lhci.example.com', // Replace with actual LHCI server
      token: process.env.LHCI_BUILD_TOKEN,
    },
    
    assert: {
      // CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Royal client performance assertions
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.95}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.95}],
        'first-contentful-paint': ['error', {maxNumericValue: 2000}],
        'interactive': ['error', {maxNumericValue: 5000}],
        'largest-contentful-paint': ['error', {maxNumericValue: 4000}],
        'speed-index': ['error', {maxNumericValue: 3500}],
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
        'total-blocking-time': ['error', {maxNumericValue: 500}],
      },
    },
    
    // CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Budget enforcement configuration
    budgets: [
      {
        path: '/*',
        resourceSizes: [
          {
            resourceType: 'script',
            budget: 150000, // 150KB JavaScript budget
          },
          {
            resourceType: 'total',
            budget: 500000, // 500KB total budget
          },
          {
            resourceType: 'stylesheet',
            budget: 50000, // 50KB CSS budget
          },
          {
            resourceType: 'image',
            budget: 200000, // 200KB images budget
          },
        ],
        resourceCounts: [
          {
            resourceType: 'third-party',
            budget: 5, // Maximum 5 third-party resources
          },
        ],
      },
    ],
  },
};