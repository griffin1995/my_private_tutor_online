// CONTEXT7 SOURCE: /websites/nextjs - Business analytics and conversion tracking
// CONTEXT7 SOURCE: /websites/developer_chrome - User Timing API for business metrics
// IMPLEMENTATION REASON: Phase 4 revenue tracking and business intelligence for £400,000+ opportunity

interface LeadScore {
  id: string;
  score: number; // 0-100
  timestamp: number;
  factors: {
    pageValue: number;
    timeOnSite: number;
    engagementLevel: number;
    premiumActions: number;
    deviceQuality: number;
    geographicIndicator: number;
    behavioralSignals: number;
  };
  classification: 'bronze' | 'silver' | 'gold' | 'platinum' | 'royal';
  revenueProjection: number;
}

interface ConversionFunnel {
  stage: 'awareness' | 'interest' | 'consideration' | 'intent' | 'booking' | 'royal_client';
  timestamp: number;
  value: number;
  metadata: any;
  attribution: {
    source: string;
    medium: string;
    campaign?: string;
    page: string;
  };
}

interface RoyalClientMetrics {
  totalOpportunity: number;
  projectedRevenue: number;
  conversionRate: number;
  averageClientValue: number;
  premiumEngagement: {
    oxbridgeInteractions: number;
    privateSchoolEnquiries: number;
    executiveContacts: number;
    consultationRequests: number;
  };
  serviceMetrics: {
    oneToOneBookings: number;
    groupSessionInterest: number;
    intensiveCourseEnquiries: number;
    examPreparationRequests: number;
  };
}

interface BusinessIntelligence {
  hourlyRevenue: Record<string, number>; // Hour -> Revenue projection
  dailyMetrics: Record<string, RoyalClientMetrics>;
  conversionPaths: ConversionFunnel[];
  leadScoring: LeadScore[];
  performanceImpact: {
    revenueAtRisk: number;
    conversionLoss: number;
    premiumClientImpact: number;
  };
}

class RevenueIntelligenceSystem {
  private currentSession: LeadScore;
  private conversionFunnel: ConversionFunnel[] = [];
  private businessIntelligence: BusinessIntelligence;
  private royalClientMetrics: RoyalClientMetrics;
  private sessionStartTime: number;
  private isInitialized = false;

  constructor() {
    this.sessionStartTime = Date.now();
    this.currentSession = this.initializeLeadScore();
    this.businessIntelligence = this.initializeBI();
    this.royalClientMetrics = this.initializeRoyalMetrics();
  }

  private initializeLeadScore(): LeadScore {
    return {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      score: 0,
      timestamp: Date.now(),
      factors: {
        pageValue: 0,
        timeOnSite: 0,
        engagementLevel: 0,
        premiumActions: 0,
        deviceQuality: 0,
        geographicIndicator: 0,
        behavioralSignals: 0
      },
      classification: 'bronze',
      revenueProjection: 0
    };
  }

  private initializeBI(): BusinessIntelligence {
    return {
      hourlyRevenue: {},
      dailyMetrics: {},
      conversionPaths: [],
      leadScoring: [],
      performanceImpact: {
        revenueAtRisk: 0,
        conversionLoss: 0,
        premiumClientImpact: 0
      }
    };
  }

  private initializeRoyalMetrics(): RoyalClientMetrics {
    return {
      totalOpportunity: 0,
      projectedRevenue: 0,
      conversionRate: 0,
      averageClientValue: 15000, // Royal client average
      premiumEngagement: {
        oxbridgeInteractions: 0,
        privateSchoolEnquiries: 0,
        executiveContacts: 0,
        consultationRequests: 0
      },
      serviceMetrics: {
        oneToOneBookings: 0,
        groupSessionInterest: 0,
        intensiveCourseEnquiries: 0,
        examPreparationRequests: 0
      }
    };
  }

  // CONTEXT7 SOURCE: /websites/nextjs - Analytics initialization patterns
  public initializeRevenueTracking(): void {
    if (this.isInitialized || typeof window === 'undefined') return;
    
    this.isInitialized = true;
    
    // Initialize page value tracking
    this.calculateInitialPageValue();
    
    // Setup engagement tracking
    this.initializeEngagementTracking();
    
    // Setup conversion funnel tracking
    this.initializeConversionTracking();
    
    // Setup royal client identification
    this.initializeRoyalClientTracking();
    
    // Start real-time scoring
    this.startRealTimeScoring();

    console.log('💰 Royal Client Revenue Intelligence Activated', {
      leadId: this.currentSession.id,
      initialValue: this.royalClientMetrics.totalOpportunity,
      target: '£400,000+ revenue opportunity'
    });
  }

  private calculateInitialPageValue(): void {
    const currentPath = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    
    // Premium page values based on royal client conversion data
    const pageValues: Record<string, { base: number; premium_multiplier: number }> = {
      '/': { base: 5000, premium_multiplier: 2.5 }, // Homepage
      '/services': { base: 8000, premium_multiplier: 3.0 },
      '/services/oxbridge-preparation': { base: 25000, premium_multiplier: 4.0 }, // Elite service
      '/services/premium-tutoring': { base: 15000, premium_multiplier: 3.5 },
      '/services/private-school-preparation': { base: 12000, premium_multiplier: 3.2 },
      '/contact': { base: 10000, premium_multiplier: 2.8 }, // High intent
      '/booking': { base: 30000, premium_multiplier: 5.0 }, // Maximum intent
      '/about': { base: 3000, premium_multiplier: 1.8 },
      '/testimonials': { base: 4000, premium_multiplier: 2.2 },
      '/blog': { base: 1500, premium_multiplier: 1.5 }
    };

    const pageConfig = pageValues[currentPath] || { base: 2000, premium_multiplier: 1.5 };
    
    // Premium indicators that multiply base value
    const premiumIndicators = [
      searchParams.get('source') === 'tatler', // Tatler referral
      searchParams.get('utm_campaign')?.includes('royal'),
      searchParams.get('utm_medium') === 'premium',
      document.referrer.includes('tatler.com'),
      document.referrer.includes('harpersbazaar.com'),
      window.screen.width >= 1920, // High-end displays
      navigator.language.includes('GB') || navigator.language.includes('UK')
    ];

    const premiumMultiplier = premiumIndicators.filter(Boolean).length * 0.3 + 1;
    const finalValue = Math.round(pageConfig.base * premiumMultiplier * pageConfig.premium_multiplier);

    this.currentSession.factors.pageValue = finalValue;
    this.royalClientMetrics.totalOpportunity += finalValue;
    
    // Track funnel entry
    this.trackFunnelStage('awareness', finalValue, {
      page: currentPath,
      premiumIndicators: premiumIndicators.filter(Boolean).length
    });
  }

  private initializeEngagementTracking(): void {
    // Time on page tracking
    setInterval(() => {
      const timeOnSite = (Date.now() - this.sessionStartTime) / 1000;
      this.currentSession.factors.timeOnSite = timeOnSite;
      
      // Update engagement score based on time thresholds
      if (timeOnSite > 300) { // 5+ minutes = serious interest
        this.currentSession.factors.engagementLevel = Math.min(100, timeOnSite / 10);
      }
    }, 30000); // Update every 30 seconds

    // Scroll depth tracking
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Deep engagement scoring
        if (scrollDepth > 50) {
          this.trackFunnelStage('interest', 2000, { scrollDepth });
        }
        if (scrollDepth > 80) {
          this.trackFunnelStage('consideration', 5000, { deepEngagement: true });
        }
      }
    });

    // Premium interaction tracking
    this.trackPremiumInteractions();
  }

  private trackPremiumInteractions(): void {
    // High-value elements that indicate serious interest
    const premiumSelectors = [
      'a[href*="oxbridge"]', // Oxbridge services
      'a[href*="private-school"]', // Private school prep
      'button[data-service="premium"]', // Premium service buttons
      'a[href*="contact"]', // Contact attempts
      'a[href*="booking"]', // Booking attempts
      '.price-card[data-tier="platinum"]', // Premium pricing
      'a[href^="tel:"]', // Phone calls
      'a[href^="mailto:"]' // Email contacts
    ];

    premiumSelectors.forEach(selector => {
      document.addEventListener('click', (event) => {
        if ((event.target as Element)?.matches?.(selector)) {
          this.currentSession.factors.premiumActions += 10;
          this.trackPremiumAction(selector, event.target as Element);
        }
      });
    });

    // Form interactions
    document.addEventListener('focus', (event) => {
      if ((event.target as Element).tagName === 'INPUT' || (event.target as Element).tagName === 'TEXTAREA') {
        this.currentSession.factors.engagementLevel += 5;
        this.trackFunnelStage('intent', 8000, { formInteraction: true });
      }
    });
  }

  private trackPremiumAction(selector: string, element: Element): void {
    const actionValues: Record<string, number> = {
      'oxbridge': 15000,
      'private-school': 8000,
      'premium': 10000,
      'contact': 12000,
      'booking': 25000,
      'platinum': 20000,
      'tel:': 18000,
      'mailto:': 8000
    };

    const matchedAction = Object.keys(actionValues).find(key => selector.includes(key));
    const value = matchedAction ? actionValues[matchedAction] : 5000;

    // Update specific royal client metrics
    if (selector.includes('oxbridge')) {
      this.royalClientMetrics.premiumEngagement.oxbridgeInteractions++;
    } else if (selector.includes('private-school')) {
      this.royalClientMetrics.premiumEngagement.privateSchoolEnquiries++;
    } else if (selector.includes('tel:')) {
      this.royalClientMetrics.premiumEngagement.executiveContacts++;
    } else if (selector.includes('booking')) {
      this.royalClientMetrics.serviceMetrics.oneToOneBookings++;
      this.trackFunnelStage('booking', value, { highIntent: true });
    }

    this.royalClientMetrics.totalOpportunity += value;
    
    console.log('💎 Premium Action Tracked', {
      action: selector,
      value,
      totalOpportunity: this.royalClientMetrics.totalOpportunity
    });
  }

  private initializeConversionTracking(): void {
    // Form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const formType = form.dataset.type || 'contact';
      
      if (formType === 'contact') {
        this.trackFunnelStage('royal_client', 40000, {
          formSubmission: true,
          formType,
          highValueLead: true
        });
        this.royalClientMetrics.premiumEngagement.consultationRequests++;
      }
    });

    // Download tracking (brochures, guides)
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.includes('.pdf')) {
        this.trackFunnelStage('consideration', 3000, {
          resourceDownload: true,
          resource: target.getAttribute('href')
        });
      }
    });
  }

  private initializeRoyalClientTracking(): void {
    // Device quality assessment (royal clients typically use premium devices)
    const deviceQualityScore = this.calculateDeviceQuality();
    this.currentSession.factors.deviceQuality = deviceQualityScore;

    // Geographic indicators
    const geographicScore = this.calculateGeographicIndicators();
    this.currentSession.factors.geographicIndicator = geographicScore;

    // Behavioral signals
    this.trackBehavioralSignals();
  }

  private calculateDeviceQuality(): number {
    let score = 0;
    
    // High-resolution displays
    if (window.screen.width >= 1920) score += 20;
    if (window.devicePixelRatio >= 2) score += 15;
    
    // Premium browser features
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn.effectiveType === '4g') score += 15;
      if (conn.downlink >= 10) score += 10;
    }
    
    // Modern browser capabilities
    if ('serviceWorker' in navigator) score += 5;
    if ('IntersectionObserver' in window) score += 5;
    
    return Math.min(score, 70);
  }

  private calculateGeographicIndicators(): number {
    let score = 0;
    
    // Language indicators
    if (navigator.language.includes('GB') || navigator.language.includes('UK')) {
      score += 25;
    }
    
    // Timezone indicators (London)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('London') || timezone.includes('Europe')) {
      score += 15;
    }
    
    return score;
  }

  private trackBehavioralSignals(): void {
    // Mouse movement patterns (premium users tend to be more deliberate)
    let mouseMovements = 0;
    document.addEventListener('mousemove', () => {
      mouseMovements++;
      if (mouseMovements % 50 === 0) { // Every 50 movements
        this.currentSession.factors.behavioralSignals += 1;
      }
    });

    // Page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.currentSession.factors.behavioralSignals += 5; // Return to tab
      }
    });
  }

  private startRealTimeScoring(): void {
    setInterval(() => {
      this.updateLeadScore();
      this.updateRevenueProjections();
    }, 60000); // Update every minute
  }

  private updateLeadScore(): void {
    const factors = this.currentSession.factors;
    
    // Weighted scoring algorithm
    const score = Math.min(100, Math.round(
      (factors.pageValue / 500) * 0.2 +
      (factors.timeOnSite / 10) * 0.15 +
      factors.engagementLevel * 0.25 +
      (factors.premiumActions * 2) * 0.2 +
      factors.deviceQuality * 0.1 +
      factors.geographicIndicator * 0.05 +
      factors.behavioralSignals * 0.05
    ));

    this.currentSession.score = score;

    // Update classification
    if (score >= 90) this.currentSession.classification = 'royal';
    else if (score >= 75) this.currentSession.classification = 'platinum';
    else if (score >= 60) this.currentSession.classification = 'gold';
    else if (score >= 40) this.currentSession.classification = 'silver';
    else this.currentSession.classification = 'bronze';

    // Update revenue projection
    const baseRevenue = this.royalClientMetrics.averageClientValue;
    const multiplier = this.getRevenueMultiplier(this.currentSession.classification);
    this.currentSession.revenueProjection = Math.round(baseRevenue * multiplier * (score / 100));
  }

  private getRevenueMultiplier(classification: string): number {
    const multipliers = {
      royal: 5.0,
      platinum: 3.5,
      gold: 2.5,
      silver: 1.8,
      bronze: 1.0
    };
    return multipliers[classification as keyof typeof multipliers] || 1.0;
  }

  private updateRevenueProjections(): void {
    const currentHour = new Date().getHours().toString();
    const hourlyValue = this.royalClientMetrics.totalOpportunity;
    
    if (!this.businessIntelligence.hourlyRevenue[currentHour]) {
      this.businessIntelligence.hourlyRevenue[currentHour] = 0;
    }
    this.businessIntelligence.hourlyRevenue[currentHour] += hourlyValue;

    // Update conversion rate
    const totalFunnelEvents = this.conversionFunnel.length;
    const bookingEvents = this.conversionFunnel.filter(f => f.stage === 'booking').length;
    
    if (totalFunnelEvents > 0) {
      this.royalClientMetrics.conversionRate = (bookingEvents / totalFunnelEvents) * 100;
    }
  }

  private trackFunnelStage(
    stage: ConversionFunnel['stage'],
    value: number,
    metadata: any = {}
  ): void {
    const funnelEvent: ConversionFunnel = {
      stage,
      timestamp: Date.now(),
      value,
      metadata,
      attribution: {
        source: this.getAttributionSource(),
        medium: this.getAttributionMedium(),
        page: window.location.pathname
      }
    };

    this.conversionFunnel.push(funnelEvent);
    this.businessIntelligence.conversionPaths.push(funnelEvent);
    
    // Send to analytics
    this.sendRevenueData('funnel_stage', funnelEvent);
  }

  private getAttributionSource(): string {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('utm_source') || 
           urlParams.get('source') || 
           document.referrer || 
           'direct';
  }

  private getAttributionMedium(): string {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('utm_medium') || 
           urlParams.get('medium') || 
           'organic';
  }

  // CONTEXT7 SOURCE: /websites/nextjs - Analytics data transmission patterns
  private async sendRevenueData(type: string, data: any): Promise<void> {
    const analyticsPayload = {
      type,
      data,
      leadScore: this.currentSession,
      royalMetrics: this.royalClientMetrics,
      timestamp: Date.now(),
      revenueOpportunity: this.royalClientMetrics.totalOpportunity
    };

    try {
      const payload = JSON.stringify(analyticsPayload);
      
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/revenue', payload);
      } else {
        await fetch('/api/analytics/revenue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        });
      }
    } catch (error) {
      console.error('Failed to send revenue data:', error);
    }
  }

  // Public API Methods
  public getCurrentLeadScore(): LeadScore {
    return { ...this.currentSession };
  }

  public getRoyalClientMetrics(): RoyalClientMetrics {
    return { ...this.royalClientMetrics };
  }

  public getBusinessIntelligence(): BusinessIntelligence {
    return { ...this.businessIntelligence };
  }

  public getRevenueProjection(): {
    immediate: number;
    monthly: number;
    annual: number;
    confidence: number;
  } {
    const baseProjection = this.currentSession.revenueProjection;
    const confidence = Math.min(95, this.currentSession.score * 1.2);
    
    return {
      immediate: baseProjection,
      monthly: baseProjection * 12, // Assuming one client per month from this lead
      annual: baseProjection * 15, // Account for referrals
      confidence
    };
  }

  public getFunnelAnalysis(): {
    stages: Record<string, number>;
    conversionRates: Record<string, number>;
    dropoffPoints: string[];
    optimizationOpportunities: string[];
  } {
    const stages: Record<string, number> = {};
    this.conversionFunnel.forEach(f => {
      stages[f.stage] = (stages[f.stage] || 0) + 1;
    });

    const conversionRates: Record<string, number> = {};
    const stageOrder = ['awareness', 'interest', 'consideration', 'intent', 'booking', 'royal_client'];
    
    for (let i = 0; i < stageOrder.length - 1; i++) {
      const current = stages[stageOrder[i]] || 0;
      const next = stages[stageOrder[i + 1]] || 0;
      conversionRates[`${stageOrder[i]}_to_${stageOrder[i + 1]}`] = current > 0 ? (next / current) * 100 : 0;
    }

    return {
      stages,
      conversionRates,
      dropoffPoints: [], // Would be calculated based on historical data
      optimizationOpportunities: [] // Would be calculated based on performance data
    };
  }
}

// Singleton instance
export const revenueIntelligence = new RevenueIntelligenceSystem();

// React Hook for component integration
export function useRevenueIntelligence() {
  return {
    getCurrentLead: revenueIntelligence.getCurrentLeadScore.bind(revenueIntelligence),
    getRoyalMetrics: revenueIntelligence.getRoyalClientMetrics.bind(revenueIntelligence),
    getProjection: revenueIntelligence.getRevenueProjection.bind(revenueIntelligence),
    getFunnelData: revenueIntelligence.getFunnelAnalysis.bind(revenueIntelligence),
    getBusinessIntel: revenueIntelligence.getBusinessIntelligence.bind(revenueIntelligence)
  };
}

// Initialize revenue tracking when module loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      revenueIntelligence.initializeRevenueTracking();
    });
  } else {
    revenueIntelligence.initializeRevenueTracking();
  }
}