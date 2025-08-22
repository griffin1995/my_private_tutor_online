// CONTEXT7 SOURCE: /websites/nextjs - useReportWebVitals hook for Core Web Vitals
// CONTEXT7 SOURCE: /websites/developer_chrome - Performance API and Web Vitals tracking  
// IMPLEMENTATION REASON: Phase 6 performance optimization - corrected Web Vitals API usage

import { Metric, onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

// Performance thresholds based on royal client standards
const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals - Royal Client Standards
  LCP: { good: 1500, needsImprovement: 2500, poor: 4000 },
  FID: { good: 80, needsImprovement: 200, poor: 300 },
  CLS: { good: 0.08, needsImprovement: 0.15, poor: 0.25 },
  INP: { good: 150, needsImprovement: 300, poor: 500 },
  // Supporting Metrics
  FCP: { good: 1200, needsImprovement: 3000, poor: 4000 },
  TTFB: { good: 500, needsImprovement: 1500, poor: 2500 },
};

interface PerformanceAlert {
  id: string;
  timestamp: number;
  metric: string;
  value: number;
  threshold: number;
  severity: 'good' | 'needs-improvement' | 'poor';
  attribution?: any;
  context: {
    userAgent: string;
    connection?: any;
    pageUrl: string;
    userId?: string;
    sessionId: string;
  };
}

interface BusinessMetrics {
  revenue_opportunity: number;
  conversion_events: Array<{
    type: 'form_submit' | 'call_click' | 'email_click' | 'booking_start';
    timestamp: number;
    value?: number;
    metadata?: any;
  }>;
  royal_client_indicators: {
    premium_interactions: number;
    elite_page_visits: number;
    high_value_actions: number;
  };
}

class PerformanceMonitoringSystem {
  private alerts: PerformanceAlert[] = [];
  private businessMetrics: BusinessMetrics = {
    revenue_opportunity: 0,
    conversion_events: [],
    royal_client_indicators: {
      premium_interactions: 0,
      elite_page_visits: 0,
      high_value_actions: 0
    }
  };
  private sessionId: string;
  private isInitialized = false;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // CONTEXT7 SOURCE: /websites/nextjs - Web Vitals measurement patterns
  public initializePerformanceMonitoring(): void {
    if (this.isInitialized || typeof window === 'undefined') return;
    
    this.isInitialized = true;
    
    // Core Web Vitals monitoring with correct API (FID deprecated in favor of INP)
    onCLS(this.handleMetric.bind(this));
    onFCP(this.handleMetric.bind(this));
    onLCP(this.handleMetric.bind(this));
    onTTFB(this.handleMetric.bind(this));
    onINP(this.handleMetric.bind(this));

    // Custom performance markers
    this.initializeCustomMetrics();
    
    // Business event tracking
    this.initializeBusinessTracking();

    console.log('🚀 Royal Client Performance Monitoring Initialized', {
      sessionId: this.sessionId,
      thresholds: PERFORMANCE_THRESHOLDS
    });
  }

  // CONTEXT7 SOURCE: /websites/developer_chrome - Performance mark and measure API
  private initializeCustomMetrics(): void {
    // Track premium page load performance
    performance.mark('premium-experience-start');
    
    // Monitor critical royal client interactions
    this.setupInteractionTracking();
    
    // Track form completion times
    this.setupFormPerformanceTracking();
  }

  private setupInteractionTracking(): void {
    const royalInteractionSelectors = [
      '[data-premium="true"]',
      '.royal-client-action',
      '[data-high-value="true"]',
      'button[aria-label*="Premium"]',
      'a[href*="contact"]',
      'a[href*="booking"]'
    ];

    royalInteractionSelectors.forEach(selector => {
      document.addEventListener('click', (event) => {
        if ((event.target as Element)?.matches?.(selector)) {
          this.trackBusinessEvent('premium_interaction', {
            element: selector,
            timestamp: performance.now()
          });
        }
      });
    });
  }

  private setupFormPerformanceTracking(): void {
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form, index) => {
      const formId = form.id || `form_${index}`;
      
      form.addEventListener('focusin', () => {
        performance.mark(`${formId}_interaction_start`);
      });

      form.addEventListener('submit', () => {
        performance.mark(`${formId}_interaction_end`);
        performance.measure(
          `${formId}_completion_time`,
          `${formId}_interaction_start`,
          `${formId}_interaction_end`
        );

        this.trackBusinessEvent('form_submit', {
          formId,
          completionTime: performance.getEntriesByName(`${formId}_completion_time`)[0]?.duration
        });
      });
    });
  }

  private initializeBusinessTracking(): void {
    // Track revenue-relevant actions
    this.trackPageValue();
    this.setupConversionTracking();
    this.initializeRoyalClientScoring();
  }

  private trackPageValue(): void {
    const currentUrl = window.location.pathname;
    const pageValues: Record<string, number> = {
      '/': 50000, // Homepage - premium landing
      '/contact': 75000, // Direct contact - high intent
      '/services/premium-tutoring': 100000, // Premium service page
      '/booking': 150000, // Booking flow - highest value
      '/services/oxbridge-preparation': 200000, // Elite service
    };

    const pageValue = pageValues[currentUrl] || 10000; // Base page value
    this.businessMetrics.revenue_opportunity += pageValue;

    // Track elite page visits
    if (pageValue >= 100000) {
      this.businessMetrics.royal_client_indicators.elite_page_visits++;
    }
  }

  private setupConversionTracking(): void {
    // Email clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('mailto:')) {
        this.trackBusinessEvent('email_click', { value: 25000 });
      }
      
      // Phone clicks
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('tel:')) {
        this.trackBusinessEvent('call_click', { value: 50000 });
      }
    });
  }

  private initializeRoyalClientScoring(): void {
    // Track premium interactions
    const premiumIndicators = [
      () => document.querySelectorAll('[data-premium="true"]').length > 0,
      () => window.innerWidth > 1440, // High-resolution displays
      () => 'connection' in navigator && (navigator as any).connection?.effectiveType === '4g',
      () => window.performance?.timing && 
            (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) < 2000
    ];

    const premiumScore = premiumIndicators.filter(indicator => indicator()).length;
    
    if (premiumScore >= 3) {
      this.businessMetrics.royal_client_indicators.premium_interactions++;
    }
  }

  // CONTEXT7 SOURCE: /websites/nextjs - Web Vitals metric handling
  private handleMetric(metric: Metric): void {
    const threshold = PERFORMANCE_THRESHOLDS[metric.name as keyof typeof PERFORMANCE_THRESHOLDS];
    if (!threshold) return;

    const severity = this.calculateSeverity(metric.value, threshold);
    
    const alert: PerformanceAlert = {
      id: `alert_${Date.now()}_${metric.id}`,
      timestamp: Date.now(),
      metric: metric.name,
      value: metric.value,
      threshold: threshold.good,
      severity,
      attribution: (metric as any).attribution,
      context: {
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection,
        pageUrl: window.location.href,
        sessionId: this.sessionId
      }
    };

    this.alerts.push(alert);

    // Send to analytics endpoint
    this.sendPerformanceData(metric, alert);

    // Trigger royal client alerts for poor performance
    if (severity === 'poor') {
      this.triggerRoyalClientAlert(alert);
    }
  }

  private calculateSeverity(
    value: number, 
    threshold: { good: number; needsImprovement: number; poor: number }
  ): 'good' | 'needs-improvement' | 'poor' {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  // CONTEXT7 SOURCE: /websites/nextjs - Analytics data transmission
  private async sendPerformanceData(metric: Metric, alert: PerformanceAlert): Promise<void> {
    const analyticsData = {
      ...metric,
      alert,
      businessMetrics: this.businessMetrics,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      royal_client_context: {
        premium_experience: true,
        service_tier: 'royal',
        performance_sla: 'elite'
      }
    };

    try {
      // Use sendBeacon for reliability, fallback to fetch
      const data = JSON.stringify(analyticsData);
      
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/performance', data);
      } else {
        await fetch('/api/analytics/performance', {
          method: 'POST',
          body: data,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true
        });
      }
    } catch (error) {
      console.error('Failed to send performance data:', error);
    }
  }

  private triggerRoyalClientAlert(alert: PerformanceAlert): void {
    console.warn('🚨 Royal Client Performance Alert', {
      metric: alert.metric,
      value: alert.value,
      threshold: alert.threshold,
      impact: 'Royal client experience degraded',
      action: 'Immediate investigation required'
    });

    // Send high-priority alert to monitoring system
    this.sendUrgentAlert(alert);
  }

  private async sendUrgentAlert(alert: PerformanceAlert): Promise<void> {
    try {
      await fetch('/api/monitoring/urgent-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alert,
          priority: 'URGENT',
          service: 'royal_client_performance',
          impact: 'revenue_risk'
        })
      });
    } catch (error) {
      console.error('Failed to send urgent alert:', error);
    }
  }

  private trackBusinessEvent(
    type: 'form_submit' | 'call_click' | 'email_click' | 'booking_start' | 'premium_interaction',
    metadata?: any
  ): void {
    this.businessMetrics.conversion_events.push({
      type,
      timestamp: Date.now(),
      value: metadata?.value,
      metadata
    });

    if (type === 'premium_interaction') {
      this.businessMetrics.royal_client_indicators.premium_interactions++;
    }

    // Track high-value actions
    const highValueTypes = ['call_click', 'booking_start'];
    if (highValueTypes.includes(type)) {
      this.businessMetrics.royal_client_indicators.high_value_actions++;
    }
  }

  // Public API methods
  public getCurrentPerformanceMetrics(): {
    alerts: PerformanceAlert[];
    businessMetrics: BusinessMetrics;
    sessionId: string;
    revenueOpportunity: number;
  } {
    return {
      alerts: this.alerts,
      businessMetrics: this.businessMetrics,
      sessionId: this.sessionId,
      revenueOpportunity: this.businessMetrics.revenue_opportunity
    };
  }

  public getPerformanceSummary(): {
    totalAlerts: number;
    criticalAlerts: number;
    averagePerformance: 'excellent' | 'good' | 'needs-improvement' | 'poor';
    revenueImpact: number;
  } {
    const criticalAlerts = this.alerts.filter(a => a.severity === 'poor').length;
    const goodPerformance = this.alerts.filter(a => a.severity === 'good').length;
    const totalAlerts = this.alerts.length;

    let averagePerformance: 'excellent' | 'good' | 'needs-improvement' | 'poor';
    if (criticalAlerts === 0 && goodPerformance === totalAlerts) {
      averagePerformance = 'excellent';
    } else if (criticalAlerts === 0 && goodPerformance > totalAlerts * 0.8) {
      averagePerformance = 'good';
    } else if (criticalAlerts < totalAlerts * 0.2) {
      averagePerformance = 'needs-improvement';
    } else {
      averagePerformance = 'poor';
    }

    return {
      totalAlerts,
      criticalAlerts,
      averagePerformance,
      revenueImpact: this.businessMetrics.revenue_opportunity
    };
  }

  // Manual tracking methods for component integration
  public trackCustomEvent(eventName: string, data?: any): void {
    performance.mark(`custom_${eventName}_${Date.now()}`);
    
    console.log(`📊 Custom Event Tracked: ${eventName}`, data);
  }

  public trackRevenueEvent(amount: number, type: string): void {
    this.businessMetrics.revenue_opportunity += amount;
    this.trackBusinessEvent('booking_start', { value: amount, type });
  }
}

// Singleton instance for global access
export const performanceMonitor = new PerformanceMonitoringSystem();

// React Hook for component integration
export function usePerformanceMonitoring() {
  return {
    trackEvent: performanceMonitor.trackCustomEvent.bind(performanceMonitor),
    trackRevenue: performanceMonitor.trackRevenueEvent.bind(performanceMonitor),
    getMetrics: performanceMonitor.getCurrentPerformanceMetrics.bind(performanceMonitor),
    getSummary: performanceMonitor.getPerformanceSummary.bind(performanceMonitor)
  };
}

// Initialize monitoring when module loads (client-side only)
if (typeof window !== 'undefined') {
  // Delay initialization to ensure page is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceMonitor.initializePerformanceMonitoring();
    });
  } else {
    performanceMonitor.initializePerformanceMonitoring();
  }
}