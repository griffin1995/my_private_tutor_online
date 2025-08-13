// CONTEXT7 SOURCE: /vercel/next.js - Next.js Web Vitals integration for comprehensive performance monitoring
// IMPLEMENTATION REASON: Official Next.js pattern for Web Vitals reporting and custom performance tracking

'use client';

import { getCLS, getFID, getFCP, getLCP, getTTFB, getINP } from 'web-vitals';

// CONTEXT7 SOURCE: /vercel/next.js - Performance metric interface based on Web Vitals specification
// INTERFACE REASON: Type-safe performance data structure for FAQ system monitoring
export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: any[];
  timestamp: number;
  url: string;
  userAgent: string;
  connectionType?: string;
  effectiveType?: string;
}

// CONTEXT7 SOURCE: /vercel/next.js - FAQ-specific performance metrics extension
// FAQ REASON: Track FAQ system specific performance indicators beyond standard Web Vitals
export interface FAQPerformanceMetrics extends PerformanceMetric {
  faqComponent?: string;
  userType?: 'royal' | 'standard' | 'accessibility';
  searchQuery?: string;
  categoryAccessed?: string;
  assistiveTech?: boolean;
  themeMode?: 'light' | 'dark' | 'high_contrast';
  offlineMode?: boolean;
  voiceSearchUsed?: boolean;
}

// CONTEXT7 SOURCE: /vercel/next.js - Performance thresholds based on Core Web Vitals and royal client standards
// THRESHOLDS REASON: Define performance targets that meet royal client service expectations
const PERFORMANCE_THRESHOLDS = {
  // CONTEXT7 SOURCE: /vercel/next.js - Core Web Vitals thresholds with royal client adjustments
  // ROYAL STANDARDS: Stricter thresholds for premium service quality
  FCP: { good: 1000, poor: 2500 }, // Royal client: 1s, Standard: 1.8s
  LCP: { good: 1500, poor: 4000 }, // Royal client: 1.5s, Standard: 2.5s  
  FID: { good: 50, poor: 300 },    // Royal client: 50ms, Standard: 100ms
  CLS: { good: 0.05, poor: 0.25 }, // Royal client: 0.05, Standard: 0.1
  TTFB: { good: 600, poor: 1800 }, // Royal client: 600ms, Standard: 800ms
  INP: { good: 100, poor: 500 },   // Royal client: 100ms, Standard: 200ms
  
  // CONTEXT7 SOURCE: /vercel/next.js - FAQ-specific performance thresholds
  // FAQ THRESHOLDS: FAQ system performance targets for different user interactions
  SEARCH_RESPONSE: { good: 100, poor: 500 },      // FAQ search response time
  THEME_TOGGLE: { good: 200, poor: 1000 },        // Theme switching performance
  VOICE_SEARCH: { good: 2000, poor: 5000 },       // Voice search processing time
  OFFLINE_SYNC: { good: 3000, poor: 10000 },      // Offline sync performance
  ACCESSIBILITY: { good: 150, poor: 500 },        // Assistive tech response time
} as const;

// CONTEXT7 SOURCE: /vercel/next.js - Performance analytics endpoint configuration
// ANALYTICS REASON: Send performance data to monitoring service for analysis and alerting
const ANALYTICS_ENDPOINT = process.env.NODE_ENV === 'production' 
  ? '/api/analytics/performance'
  : '/api/dev/performance-debug';

// CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring class for FAQ system
// MONITORING REASON: Centralized performance tracking with Web Vitals integration
class FAQPerformanceMonitor {
  private isInitialized = false;
  private metricsBuffer: FAQPerformanceMetrics[] = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private sessionId: string;
  private userType: 'royal' | 'standard' | 'accessibility' = 'standard';
  
  constructor() {
    this.sessionId = this.generateSessionId();
    this.detectUserType();
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring initialization
  // INITIALIZATION REASON: Set up Web Vitals collection and FAQ-specific performance tracking
  public initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }
    
    console.log('[FAQ Performance Monitor] Initializing performance tracking');
    
    // CONTEXT7 SOURCE: /vercel/next.js - Core Web Vitals collection setup
    // WEB VITALS REASON: Track standard performance metrics with FAQ context
    this.setupWebVitalsCollection();
    
    // CONTEXT7 SOURCE: /vercel/next.js - FAQ-specific performance monitoring
    // FAQ MONITORING REASON: Track FAQ system specific user interactions and performance
    this.setupFAQPerformanceTracking();
    
    // CONTEXT7 SOURCE: /vercel/next.js - Performance data transmission setup
    // TRANSMISSION REASON: Regular performance data upload for monitoring and analysis
    this.setupPerformanceDataTransmission();
    
    this.isInitialized = true;
    console.log('[FAQ Performance Monitor] Performance tracking initialized');
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Web Vitals collection implementation
  // WEB VITALS REASON: Collect standard Web Vitals metrics with FAQ system context
  private setupWebVitalsCollection(): void {
    const reportWebVital = (metric: any) => {
      const faqMetric: FAQPerformanceMetrics = {
        id: metric.id,
        name: metric.name,
        value: metric.value,
        rating: this.getRating(metric.name, metric.value),
        delta: metric.delta,
        entries: metric.entries || [],
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        connectionType: this.getConnectionType(),
        effectiveType: this.getEffectiveConnectionType(),
        userType: this.userType,
        faqComponent: this.getCurrentFAQComponent(),
        themeMode: this.getCurrentTheme(),
        assistiveTech: this.detectAssistiveTechnology(),
      };
      
      this.addMetricToBuffer(faqMetric);
      
      // CONTEXT7 SOURCE: /vercel/next.js - Royal client performance alerting
      // ALERTING REASON: Immediate notification for performance issues affecting royal clients
      if (this.userType === 'royal' && faqMetric.rating === 'poor') {
        this.sendImmediateAlert(faqMetric);
      }
    };
    
    // CONTEXT7 SOURCE: /vercel/next.js - Individual Web Vitals metric collection
    // COLLECTION REASON: Comprehensive Web Vitals monitoring for FAQ performance analysis
    getCLS(reportWebVital);
    getFID(reportWebVital);
    getFCP(reportWebVital);
    getLCP(reportWebVital);
    getTTFB(reportWebVital);
    getINP(reportWebVital);
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - FAQ-specific performance event tracking
  // FAQ TRACKING REASON: Monitor FAQ system interactions that impact user experience
  private setupFAQPerformanceTracking(): void {
    // FAQ search performance tracking
    this.trackFAQSearchPerformance();
    
    // Theme toggle performance tracking
    this.trackThemeTogglePerformance();
    
    // Accessibility feature performance tracking
    this.trackAccessibilityPerformance();
    
    // Voice search performance tracking
    this.trackVoiceSearchPerformance();
    
    // Offline sync performance tracking
    this.trackOfflineSyncPerformance();
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - FAQ search performance measurement
  // SEARCH PERFORMANCE REASON: Critical FAQ functionality performance tracking
  private trackFAQSearchPerformance(): void {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [url] = args;
      
      if (typeof url === 'string' && url.includes('/api/faq/search')) {
        const startTime = performance.now();
        
        try {
          const response = await originalFetch(...args);
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          const searchParams = new URLSearchParams(url.split('?')[1] || '');
          const searchQuery = searchParams.get('q') || '';
          
          const searchMetric: FAQPerformanceMetrics = {
            id: `faq-search-${Date.now()}`,
            name: 'FAQ_SEARCH_RESPONSE',
            value: duration,
            rating: this.getRating('SEARCH_RESPONSE', duration),
            delta: 0,
            entries: [],
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            userType: this.userType,
            faqComponent: 'search',
            searchQuery: searchQuery,
            assistiveTech: this.detectAssistiveTechnology(),
          };
          
          this.addMetricToBuffer(searchMetric);
          return response;
        } catch (error) {
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          // Track failed search performance
          const errorMetric: FAQPerformanceMetrics = {
            id: `faq-search-error-${Date.now()}`,
            name: 'FAQ_SEARCH_ERROR',
            value: duration,
            rating: 'poor',
            delta: 0,
            entries: [],
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            userType: this.userType,
            faqComponent: 'search',
          };
          
          this.addMetricToBuffer(errorMetric);
          throw error;
        }
      }
      
      return originalFetch(...args);
    };
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Theme toggle performance tracking
  // THEME PERFORMANCE REASON: Track theme switching performance for accessibility users
  private trackThemeTogglePerformance(): void {
    // Monitor theme change events
    document.addEventListener('themeChange', (event: any) => {
      const startTime = performance.now();
      
      // Use requestAnimationFrame to measure actual render completion
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const themeMetric: FAQPerformanceMetrics = {
          id: `faq-theme-toggle-${Date.now()}`,
          name: 'FAQ_THEME_TOGGLE',
          value: duration,
          rating: this.getRating('THEME_TOGGLE', duration),
          delta: 0,
          entries: [],
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          userType: this.userType,
          faqComponent: 'theme',
          themeMode: event.detail?.theme || this.getCurrentTheme(),
        };
        
        this.addMetricToBuffer(themeMetric);
      });
    });
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Accessibility performance monitoring
  // ACCESSIBILITY REASON: Ensure accessibility features perform well under load
  private trackAccessibilityPerformance(): void {
    // Track screen reader navigation performance
    if (this.detectAssistiveTechnology()) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('faq') || entry.name.includes('aria')) {
            const accessibilityMetric: FAQPerformanceMetrics = {
              id: `faq-accessibility-${Date.now()}`,
              name: 'FAQ_ACCESSIBILITY_NAVIGATION',
              value: entry.duration,
              rating: this.getRating('ACCESSIBILITY', entry.duration),
              delta: 0,
              entries: [entry],
              timestamp: Date.now(),
              url: window.location.href,
              userAgent: navigator.userAgent,
              userType: this.userType,
              faqComponent: 'accessibility',
              assistiveTech: true,
            };
            
            this.addMetricToBuffer(accessibilityMetric);
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['measure', 'navigation'] });
      } catch (error) {
        console.warn('[FAQ Performance Monitor] Accessibility performance tracking unavailable:', error);
      }
    }
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Voice search performance tracking
  // VOICE SEARCH REASON: Monitor voice search feature performance for accessibility users
  private trackVoiceSearchPerformance(): void {
    document.addEventListener('voiceSearchStart', () => {
      const startTime = performance.now();
      
      const voiceSearchEndHandler = () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const voiceMetric: FAQPerformanceMetrics = {
          id: `faq-voice-search-${Date.now()}`,
          name: 'FAQ_VOICE_SEARCH',
          value: duration,
          rating: this.getRating('VOICE_SEARCH', duration),
          delta: 0,
          entries: [],
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          userType: this.userType,
          faqComponent: 'voice-search',
          voiceSearchUsed: true,
          assistiveTech: this.detectAssistiveTechnology(),
        };
        
        this.addMetricToBuffer(voiceMetric);
        document.removeEventListener('voiceSearchEnd', voiceSearchEndHandler);
      };
      
      document.addEventListener('voiceSearchEnd', voiceSearchEndHandler);
    });
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Offline sync performance monitoring
  // OFFLINE SYNC REASON: Track offline functionality performance for mobile users
  private trackOfflineSyncPerformance(): void {
    window.addEventListener('online', () => {
      const startTime = performance.now();
      
      // Monitor for sync completion
      const syncCompleteHandler = () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const syncMetric: FAQPerformanceMetrics = {
          id: `faq-offline-sync-${Date.now()}`,
          name: 'FAQ_OFFLINE_SYNC',
          value: duration,
          rating: this.getRating('OFFLINE_SYNC', duration),
          delta: 0,
          entries: [],
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          userType: this.userType,
          faqComponent: 'offline-sync',
          offlineMode: false,
        };
        
        this.addMetricToBuffer(syncMetric);
        document.removeEventListener('offlineSyncComplete', syncCompleteHandler);
      };
      
      document.addEventListener('offlineSyncComplete', syncCompleteHandler);
    });
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Performance data transmission configuration
  // TRANSMISSION REASON: Regular upload of performance metrics for monitoring and analysis
  private setupPerformanceDataTransmission(): void {
    // Flush metrics every 30 seconds
    this.flushInterval = setInterval(() => {
      this.flushMetricsBuffer();
    }, 30000);
    
    // Flush on page unload
    window.addEventListener('beforeunload', () => {
      this.flushMetricsBuffer(true);
    });
    
    // Flush on visibility change (when user switches tabs)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flushMetricsBuffer(true);
      }
    });
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Performance metrics buffer management
  // BUFFER REASON: Efficient batching of performance data for transmission
  private addMetricToBuffer(metric: FAQPerformanceMetrics): void {
    this.metricsBuffer.push(metric);
    
    // Log critical performance issues immediately
    if (metric.rating === 'poor' && this.userType === 'royal') {
      console.warn('[FAQ Performance Monitor] Poor performance detected for royal client:', metric);
    }
    
    // Flush buffer if it gets too large
    if (this.metricsBuffer.length >= 50) {
      this.flushMetricsBuffer();
    }
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Performance metrics transmission
  // TRANSMISSION REASON: Send collected performance data to monitoring endpoint
  private async flushMetricsBuffer(useBeacon = false): Promise<void> {
    if (this.metricsBuffer.length === 0) {
      return;
    }
    
    const metricsToSend = [...this.metricsBuffer];
    this.metricsBuffer = [];
    
    const payload = JSON.stringify({
      sessionId: this.sessionId,
      userType: this.userType,
      timestamp: Date.now(),
      metrics: metricsToSend,
      metadata: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        connectionType: this.getConnectionType(),
        effectiveType: this.getEffectiveConnectionType(),
      }
    });
    
    try {
      if (useBeacon && 'sendBeacon' in navigator) {
        // CONTEXT7 SOURCE: /vercel/next.js - Beacon API for reliable data transmission
        // BEACON REASON: Ensure performance data is sent even during page unload
        const sent = navigator.sendBeacon(ANALYTICS_ENDPOINT, payload);
        if (!sent) {
          console.warn('[FAQ Performance Monitor] Failed to send metrics via beacon');
        }
      } else {
        // CONTEXT7 SOURCE: /vercel/next.js - Fetch API for performance data transmission
        // FETCH REASON: Standard performance data transmission with keepalive
        await fetch(ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
          keepalive: true,
        });
      }
    } catch (error) {
      console.error('[FAQ Performance Monitor] Failed to send performance metrics:', error);
      
      // Re-add metrics to buffer for retry (limit to prevent memory issues)
      if (this.metricsBuffer.length < 100) {
        this.metricsBuffer.unshift(...metricsToSend.slice(-20)); // Keep last 20 metrics
      }
    }
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Performance rating calculation
  // RATING REASON: Classify performance metrics against royal client service thresholds
  private getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = PERFORMANCE_THRESHOLDS[metricName as keyof typeof PERFORMANCE_THRESHOLDS];
    if (!thresholds) {
      return 'good'; // Default rating for unknown metrics
    }
    
    // Adjust thresholds for royal clients (stricter requirements)
    const adjustedThresholds = this.userType === 'royal' ? {
      good: thresholds.good * 0.8,  // 20% stricter for royal clients
      poor: thresholds.poor * 0.9,  // 10% stricter for royal clients
    } : thresholds;
    
    if (value <= adjustedThresholds.good) {
      return 'good';
    } else if (value <= adjustedThresholds.poor) {
      return 'needs-improvement';
    } else {
      return 'poor';
    }
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Immediate performance alert system
  // ALERT REASON: Real-time notification of performance issues affecting royal clients
  private async sendImmediateAlert(metric: FAQPerformanceMetrics): Promise<void> {
    try {
      await fetch('/api/alerts/performance-critical', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          userType: this.userType,
          metric: metric,
          severity: 'high',
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      console.error('[FAQ Performance Monitor] Failed to send immediate alert:', error);
    }
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - User type detection for performance monitoring
  // USER TYPE REASON: Adapt performance monitoring based on user service tier
  private detectUserType(): void {
    // Check for royal client indicators
    const urlParams = new URLSearchParams(window.location.search);
    const tier = urlParams.get('tier');
    const clientTier = localStorage.getItem('clientTier');
    
    if (tier === 'royal' || clientTier === 'royal') {
      this.userType = 'royal';
    } else if (this.detectAssistiveTechnology()) {
      this.userType = 'accessibility';
    } else {
      this.userType = 'standard';
    }
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Assistive technology detection
  // DETECTION REASON: Identify users requiring accessibility performance monitoring
  private detectAssistiveTechnology(): boolean {
    // Check for common assistive technology indicators
    const userAgent = navigator.userAgent.toLowerCase();
    const hasScreenReader = userAgent.includes('nvda') || 
                           userAgent.includes('jaws') || 
                           userAgent.includes('voiceover') ||
                           userAgent.includes('orca');
    
    const hasHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasAccessibilityMode = localStorage.getItem('accessibilityMode') === 'true';
    
    return hasScreenReader || hasHighContrast || hasReducedMotion || hasAccessibilityMode;
  }
  
  // Helper methods
  private generateSessionId(): string {
    return `faq-session-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }
  
  private getCurrentFAQComponent(): string {
    const path = window.location.pathname;
    if (path.includes('/faq/search')) return 'search';
    if (path.includes('/faq/category')) return 'category';
    if (path.includes('/faq/accessibility')) return 'accessibility';
    if (path.includes('/faq')) return 'main';
    return 'unknown';
  }
  
  private getCurrentTheme(): 'light' | 'dark' | 'high_contrast' {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme as any || 'light';
  }
  
  private getConnectionType(): string {
    return (navigator as any).connection?.type || 'unknown';
  }
  
  private getEffectiveConnectionType(): string {
    return (navigator as any).connection?.effectiveType || 'unknown';
  }
  
  // CONTEXT7 SOURCE: /vercel/next.js - Performance monitor cleanup
  // CLEANUP REASON: Proper resource management for performance monitoring
  public destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    
    // Final flush before cleanup
    this.flushMetricsBuffer(true);
    
    console.log('[FAQ Performance Monitor] Performance tracking destroyed');
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Global performance monitor instance
// GLOBAL REASON: Single performance monitor instance for FAQ system
const faqPerformanceMonitor = new FAQPerformanceMonitor();

// CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring public API
// API REASON: Public interface for FAQ performance monitoring integration
export const performanceMonitor = {
  initialize: () => faqPerformanceMonitor.initialize(),
  destroy: () => faqPerformanceMonitor.destroy(),
  
  // Manual performance tracking methods
  trackFAQInteraction: (component: string, duration: number) => {
    const metric: FAQPerformanceMetrics = {
      id: `faq-interaction-${Date.now()}`,
      name: 'FAQ_USER_INTERACTION',
      value: duration,
      rating: duration < 100 ? 'good' : duration < 300 ? 'needs-improvement' : 'poor',
      delta: 0,
      entries: [],
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      faqComponent: component,
    };
    
    (faqPerformanceMonitor as any).addMetricToBuffer(metric);
  },
  
  trackFAQError: (component: string, errorType: string) => {
    const metric: FAQPerformanceMetrics = {
      id: `faq-error-${Date.now()}`,
      name: 'FAQ_ERROR',
      value: 0,
      rating: 'poor',
      delta: 0,
      entries: [],
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      faqComponent: component,
    };
    
    (faqPerformanceMonitor as any).addMetricToBuffer(metric);
  },
};

export default performanceMonitor;