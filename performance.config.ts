// CONTEXT7 SOURCE: /vercel/next.js - Performance budget configuration for automated monitoring
// PERFORMANCE BUDGET REASON: Automated enforcement of royal client service performance standards
// CONTEXT7 SOURCE: /vercel/next.js - Performance testing and monitoring configuration
// IMPLEMENTATION: Comprehensive performance budget system for premium tutoring service

/**
 * Performance Budget Configuration for My Private Tutor Online
 * 
 * Royal Client Performance Standards:
 * - Loading: < 1.5s for premium experience
 * - Interactivity: < 100ms for responsive feel
 * - Stability: Perfect layout stability (CLS < 0.1)
 * - Bundle Size: Optimized for fast delivery
 * - Resource Counts: Minimal HTTP requests
 */

// Core Web Vitals Budgets (Royal Client Standards)
export const WEB_VITALS_BUDGETS = {
  // Loading Performance
  LCP: {
    good: 1500,        // Royal standard: <1.5s
    needsImprovement: 2500,
    poor: 4000,
  },
  
  // Interactivity Performance  
  FID: {
    good: 50,          // Royal standard: <50ms
    needsImprovement: 100,
    poor: 300,
  },
  
  INP: {
    good: 100,         // Royal standard: <100ms
    needsImprovement: 200,
    poor: 500,
  },
  
  // Visual Stability
  CLS: {
    good: 0.05,        // Royal standard: Perfect stability
    needsImprovement: 0.1,
    poor: 0.25,
  },
  
  // First Paint
  FCP: {
    good: 1000,        // Royal standard: <1s
    needsImprovement: 1800,
    poor: 3000,
  },
  
  // Server Response
  TTFB: {
    good: 400,         // Royal standard: <400ms
    needsImprovement: 600,
    poor: 1000,
  },
} as const;

// Resource Size Budgets (Bytes)
export const RESOURCE_BUDGETS = {
  // JavaScript Budget
  javascript: {
    initial: 150 * 1024,      // 150KB initial JS (critical path)
    total: 300 * 1024,        // 300KB total JS budget
    thirdParty: 100 * 1024,   // 100KB for third-party scripts
  },
  
  // CSS Budget
  css: {
    critical: 14 * 1024,      // 14KB critical CSS (above fold)
    total: 100 * 1024,        // 100KB total CSS budget
    unused: 20 * 1024,        // Max 20KB unused CSS allowed
  },
  
  // Image Budget
  images: {
    hero: 150 * 1024,         // 150KB for hero images
    totalPerPage: 500 * 1024, // 500KB total images per page
    webp: true,               // Require WebP format
    avif: true,               // Prefer AVIF when supported
  },
  
  // Font Budget
  fonts: {
    critical: 100 * 1024,     // 100KB for critical fonts
    total: 150 * 1024,        // 150KB total fonts
    woff2Required: true,      // Only WOFF2 format allowed
  },
  
  // Total Page Weight
  totalPageWeight: {
    homepage: 800 * 1024,     // 800KB homepage budget
    servicePage: 600 * 1024,  // 600KB service page budget
    aboutPage: 500 * 1024,    // 500KB about page budget
    contactPage: 400 * 1024,  // 400KB contact page budget
  },
} as const;

// Network Performance Budgets
export const NETWORK_BUDGETS = {
  // Request Count Limits
  httpRequests: {
    homepage: 25,             // Max 25 requests for homepage
    servicePage: 20,          // Max 20 requests for service pages
    other: 15,                // Max 15 requests for other pages
  },
  
  // Concurrent Request Limits
  concurrentRequests: 6,      // Max 6 concurrent requests
  
  // Third-Party Limits
  thirdPartyRequests: 5,      // Max 5 third-party requests
  
  // DNS Lookups
  dnsLookups: 4,              // Max 4 DNS lookups
  
  // CDN Requirements
  cdnUsage: {
    images: true,             // Images must use CDN
    fonts: true,              // Fonts must use CDN
    staticAssets: true,       // Static assets must use CDN
  },
} as const;

// Performance Testing Configuration
export const TESTING_CONFIG = {
  // Lighthouse Thresholds
  lighthouse: {
    performance: 95,          // Min 95 performance score
    accessibility: 100,       // Perfect accessibility score
    bestPractices: 95,        // Min 95 best practices score
    seo: 100,                 // Perfect SEO score
    pwa: 90,                  // Min 90 PWA score (if applicable)
  },
  
  // Device Testing Requirements
  devices: [
    'Desktop',
    'Mobile',
    'Tablet',
  ],
  
  // Network Conditions Testing
  networkConditions: [
    'Fast 3G',
    '4G',
    'Slow 3G',
    'Offline',                // For PWA testing
  ],
  
  // Browser Testing Requirements
  browsers: [
    'Chrome',
    'Firefox', 
    'Safari',
    'Edge',
  ],
} as const;

// Real User Monitoring Configuration
export const RUM_CONFIG = {
  // Sampling Rate
  samplingRate: {
    development: 1.0,         // 100% sampling in development
    staging: 1.0,             // 100% sampling in staging
    production: 0.1,          // 10% sampling in production
  },
  
  // Alert Thresholds
  alerting: {
    // P95 thresholds for alerting
    p95Thresholds: {
      LCP: 2000,              // Alert if P95 LCP > 2s
      INP: 150,               // Alert if P95 INP > 150ms
      CLS: 0.08,              // Alert if P95 CLS > 0.08
      FCP: 1500,              // Alert if P95 FCP > 1.5s
      TTFB: 500,              // Alert if P95 TTFB > 500ms
    },
    
    // Error Rate Thresholds
    errorRateThreshold: 0.01, // Alert if error rate > 1%
    
    // Performance Regression
    regressionThreshold: 0.2, // Alert if performance drops > 20%
  },
  
  // Data Retention
  dataRetention: {
    rawMetrics: 30,           // 30 days for raw metrics
    aggregated: 365,          // 1 year for aggregated data
    alerts: 90,               // 90 days for alert history
  },
} as const;

// Business Metrics Configuration
export const BUSINESS_METRICS_CONFIG = {
  // Conversion Tracking
  conversions: {
    // Form Submissions
    inquiryForm: {
      timeoutMs: 30000,       // 30s timeout for form submission
      successEvents: ['form_submit_success'],
      failureEvents: ['form_submit_error'],
    },
    
    // Bootcamp Registration
    bootcampRegistration: {
      timeoutMs: 60000,       // 60s timeout for registration
      successEvents: ['bootcamp_register_success'],
      failureEvents: ['bootcamp_register_error'],
    },
    
    // Service Tier Selection
    serviceTierInteraction: {
      timeoutMs: 10000,       // 10s timeout for tier interaction
      engagementEvents: ['tier_view', 'tier_click', 'tier_compare'],
    },
  },
  
  // User Journey Tracking
  userJourney: {
    // Key Pages for Funnel Analysis
    funnelPages: [
      '/',                    // Homepage
      '/services',            // Services page
      '/about',               // About page
      '/contact',             // Contact page
      '/bootcamps',           // Bootcamps page
    ],
    
    // Session Metrics
    sessionMetrics: {
      maxDuration: 30 * 60 * 1000,  // 30 minutes max session
      minEngagement: 10 * 1000,      // 10 seconds min engagement
      bounceThreshold: 15 * 1000,    // 15 seconds bounce threshold
    },
  },
} as const;

// Environment-Specific Configuration
export const ENVIRONMENT_CONFIG = {
  development: {
    monitoring: {
      enabled: true,
      verbose: true,
      console: true,
      alerts: false,
    },
    budgets: {
      enforceStrict: false,
      allowExceeding: true,
      warningsOnly: true,
    },
  },
  
  staging: {
    monitoring: {
      enabled: true,
      verbose: false,
      console: false,
      alerts: true,
    },
    budgets: {
      enforceStrict: true,
      allowExceeding: false,
      warningsOnly: false,
    },
  },
  
  production: {
    monitoring: {
      enabled: true,
      verbose: false,
      console: false,
      alerts: true,
    },
    budgets: {
      enforceStrict: true,
      allowExceeding: false,
      warningsOnly: false,
    },
  },
} as const;

// Performance Monitoring Integration
export const MONITORING_INTEGRATIONS = {
  // Vercel Analytics
  vercel: {
    enabled: true,
    trackCustomEvents: true,
    trackWebVitals: true,
  },
  
  // Google Analytics 4
  ga4: {
    enabled: true,
    measurementId: process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'],
    trackPerformance: true,
    trackErrors: true,
  },
  
  // Sentry Performance Monitoring
  sentry: {
    enabled: true,
    tracesSampleRate: 0.1,    // 10% transaction sampling
    trackWebVitals: true,
    trackLongTasks: true,
  },
  
  // Custom Monitoring Webhook
  webhook: {
    enabled: !!process.env['PERFORMANCE_WEBHOOK_URL'],
    url: process.env['PERFORMANCE_WEBHOOK_URL'],
    batchSize: 10,
    flushInterval: 30000,     // 30 seconds
  },
} as const;

// Automated Testing Configuration
export const AUTOMATED_TESTING = {
  // CI/CD Performance Tests
  cicd: {
    lighthouse: {
      urls: ['/', '/services', '/about', '/contact'],
      thresholds: TESTING_CONFIG.lighthouse,
      budget: 'performance.budget.json',
    },
    
    webVitals: {
      urls: ['/', '/services', '/about', '/contact'],
      thresholds: WEB_VITALS_BUDGETS,
      samples: 5,               // 5 samples per URL
    },
  },
  
  // Synthetic Monitoring
  synthetic: {
    frequency: '5m',            // Every 5 minutes
    locations: ['us-east', 'eu-west', 'ap-south'],
    browsers: ['chrome', 'firefox'],
    devices: ['desktop', 'mobile'],
  },
} as const;

// Export complete configuration
export const PERFORMANCE_CONFIG = {
  webVitals: WEB_VITALS_BUDGETS,
  resources: RESOURCE_BUDGETS,
  network: NETWORK_BUDGETS,
  testing: TESTING_CONFIG,
  rum: RUM_CONFIG,
  businessMetrics: BUSINESS_METRICS_CONFIG,
  environment: ENVIRONMENT_CONFIG,
  integrations: MONITORING_INTEGRATIONS,
  automation: AUTOMATED_TESTING,
} as const;

// Type exports for TypeScript usage
export type WebVitalsBudgets = typeof WEB_VITALS_BUDGETS;
export type ResourceBudgets = typeof RESOURCE_BUDGETS;
export type NetworkBudgets = typeof NETWORK_BUDGETS;
export type TestingConfig = typeof TESTING_CONFIG;
export type RUMConfig = typeof RUM_CONFIG;
export type BusinessMetricsConfig = typeof BUSINESS_METRICS_CONFIG;
export type PerformanceConfig = typeof PERFORMANCE_CONFIG;

export default PERFORMANCE_CONFIG;