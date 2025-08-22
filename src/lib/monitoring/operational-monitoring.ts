// CONTEXT7 SOURCE: /websites/nextjs - System health monitoring patterns
// CONTEXT7 SOURCE: /datadog/browser-sdk - Operational monitoring and alerting
// IMPLEMENTATION REASON: Enterprise-grade operational intelligence for royal client SLA

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical' | 'down';
  uptime: number;
  lastCheck: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
  memory: {
    used: number;
    available: number;
    percentage: number;
  };
  cpu: {
    usage: number;
    cores: number;
  };
}

interface SecurityIncident {
  id: string;
  timestamp: number;
  type: 'data_breach' | 'unauthorized_access' | 'performance_anomaly' | 'royal_client_impact' | 'system_failure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: {
    userCount: number;
    revenueAtRisk: number;
    royalClientsAffected: number;
  };
  mitigation: string[];
  resolved: boolean;
  resolvedAt?: number;
}

interface UserExperienceMetrics {
  sessionId: string;
  timestamp: number;
  metrics: {
    pageLoadTime: number;
    interactionDelay: number;
    errorCount: number;
    satisfactionScore: number; // 0-100
    completionRate: number;
    bounceRate: number;
  };
  context: {
    userAgent: string;
    deviceType: 'mobile' | 'tablet' | 'desktop';
    connection: string;
    location?: string;
  };
  royalClientIndicators: {
    isPremiumUser: boolean;
    highValueSession: boolean;
    urgentSupport: boolean;
  };
}

interface OperationalAlert {
  id: string;
  timestamp: number;
  type: 'system' | 'performance' | 'security' | 'business' | 'royal_client';
  priority: 'low' | 'normal' | 'high' | 'urgent' | 'royal_emergency';
  title: string;
  description: string;
  metrics: any;
  actions: string[];
  escalation: {
    level: number;
    nextEscalation?: number;
    contacts: string[];
  };
  acknowledged: boolean;
  resolved: boolean;
}

class OperationalMonitoringSystem {
  private systemHealth: SystemHealth;
  private securityIncidents: SecurityIncident[] = [];
  private userExperienceMetrics: UserExperienceMetrics[] = [];
  private operationalAlerts: OperationalAlert[] = [];
  private monitoringInterval: NodeJS.Timeout | null = null;
  private isMonitoring = false;
  private startTime = Date.now();

  constructor() {
    this.systemHealth = this.initializeSystemHealth();
  }

  private initializeSystemHealth(): SystemHealth {
    return {
      status: 'healthy',
      uptime: 0,
      lastCheck: Date.now(),
      responseTime: 0,
      errorRate: 0,
      throughput: 0,
      memory: {
        used: 0,
        available: 0,
        percentage: 0
      },
      cpu: {
        usage: 0,
        cores: typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4
      }
    };
  }

  // CONTEXT7 SOURCE: /websites/nextjs - System monitoring initialization
  public startOperationalMonitoring(): void {
    if (this.isMonitoring || typeof window === 'undefined') return;
    
    this.isMonitoring = true;
    
    // Initialize system health checks
    this.initializeHealthChecks();
    
    // Setup security monitoring
    this.initializeSecurityMonitoring();
    
    // Setup user experience tracking
    this.initializeUXMonitoring();
    
    // Setup automated reporting
    this.initializeReporting();
    
    // Start continuous monitoring
    this.startContinuousMonitoring();

    console.log('🛡️ Royal Client Operational Monitoring Activated', {
      sla: '99.9% uptime guarantee',
      responseTime: '<1.5s royal client standard',
      securityLevel: 'Enterprise-grade'
    });
  }

  private initializeHealthChecks(): void {
    // Monitor page performance
    this.monitorPagePerformance();
    
    // Monitor API endpoints
    this.monitorAPIHealth();
    
    // Monitor critical user flows
    this.monitorCriticalFlows();
  }

  private monitorPagePerformance(): void {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          this.updateSystemHealth({
            responseTime: navEntry.loadEventEnd - navEntry.navigationStart,
            throughput: 1000 / (navEntry.loadEventEnd - navEntry.navigationStart)
          });
        }
      }
    });
    
    observer.observe({ entryTypes: ['navigation'] });
  }

  private async monitorAPIHealth(): Promise<void> {
    const healthEndpoints = [
      '/api/health',
      '/api/infrastructure/health',
      '/api/analytics/health'
    ];

    const checkHealth = async () => {
      for (const endpoint of healthEndpoints) {
        try {
          const startTime = performance.now();
          const response = await fetch(endpoint, { 
            method: 'HEAD',
            cache: 'no-cache'
          });
          const endTime = performance.now();
          
          const responseTime = endTime - startTime;
          
          if (!response.ok) {
            this.createAlert('system', 'high', 'API Health Check Failed', {
              endpoint,
              status: response.status,
              responseTime
            });
          } else if (responseTime > 2000) { // Royal client SLA: <1.5s preferred, >2s alert
            this.createAlert('performance', 'normal', 'API Response Time Warning', {
              endpoint,
              responseTime,
              sla_breach: responseTime > 1500
            });
          }
        } catch (error) {
          this.createAlert('system', 'urgent', 'API Endpoint Unreachable', {
            endpoint,
            error: error instanceof Error ? error.message : 'Unknown error',
            impact: 'Royal client services may be affected'
          });
        }
      }
    };

    // Check immediately and then every 5 minutes
    checkHealth();
    setInterval(checkHealth, 300000);
  }

  private monitorCriticalFlows(): void {
    // Monitor form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const formType = form.dataset.type || 'unknown';
      
      const startTime = performance.now();
      
      // Track form completion for royal client flows
      if (formType === 'contact' || formType === 'booking') {
        this.trackCriticalFlow('form_submission', {
          type: formType,
          startTime,
          royalClientFlow: true
        });
      }
    });

    // Monitor booking flow
    const bookingElements = document.querySelectorAll('[data-booking="true"]');
    bookingElements.forEach(element => {
      element.addEventListener('click', () => {
        this.trackCriticalFlow('booking_initiation', {
          element: element.tagName,
          royalClientFlow: true,
          revenueImpact: 'high'
        });
      });
    });

    // Monitor payment processes
    document.addEventListener('click', (event) => {
      const target = event.target as Element;
      if (target.matches('[data-payment="true"]')) {
        this.trackCriticalFlow('payment_initiation', {
          revenueImpact: 'critical',
          royalClientFlow: true
        });
      }
    });
  }

  private trackCriticalFlow(flowType: string, metadata: any): void {
    console.log(`🔍 Critical Flow Tracked: ${flowType}`, metadata);
    
    // Create performance mark for tracking
    performance.mark(`critical_flow_${flowType}_${Date.now()}`);
    
    // If it's a royal client flow, ensure high priority monitoring
    if (metadata.royalClientFlow) {
      this.createAlert('business', 'normal', `Royal Client Flow: ${flowType}`, {
        ...metadata,
        monitoring: 'enhanced',
        sla: 'royal_client_standard'
      });
    }
  }

  private initializeSecurityMonitoring(): void {
    // Monitor console errors (potential security issues)
    const originalConsoleError = console.error;
    console.error = (...args) => {
      this.checkSecurityImplications(args);
      originalConsoleError.apply(console, args);
    };

    // Monitor unauthorized access attempts
    document.addEventListener('contextmenu', (event) => {
      // Log potential data extraction attempts
      this.logSecurityEvent('context_menu_access', {
        element: (event.target as Element).tagName,
        timestamp: Date.now()
      });
    });

    // Monitor suspicious navigation patterns
    let rapidNavigation = 0;
    window.addEventListener('beforeunload', () => {
      rapidNavigation++;
      
      if (rapidNavigation > 5) { // Rapid page changes
        this.createSecurityIncident('performance_anomaly', 'medium', 
          'Rapid navigation detected - potential bot activity', {
            navigations: rapidNavigation,
            timeframe: '1 minute'
          });
      }
    });

    setTimeout(() => { rapidNavigation = 0; }, 60000); // Reset every minute
  }

  private checkSecurityImplications(errorArgs: any[]): void {
    const errorString = errorArgs.join(' ').toLowerCase();
    
    const securityKeywords = [
      'unauthorized', 'access denied', 'permission', 'csrf', 'xss', 
      'injection', 'malicious', 'breach', 'attack', 'hack'
    ];

    const hasSecurityImplication = securityKeywords.some(keyword => 
      errorString.includes(keyword)
    );

    if (hasSecurityImplication) {
      this.createSecurityIncident('unauthorized_access', 'high',
        'Potential security issue detected in console errors', {
          errorMessage: errorString,
          timestamp: Date.now()
        });
    }
  }

  private logSecurityEvent(eventType: string, metadata: any): void {
    console.log(`🔒 Security Event: ${eventType}`, metadata);
    // In production, this would send to security monitoring system
  }

  private initializeUXMonitoring(): void {
    // Track user satisfaction signals
    this.trackUserSatisfaction();
    
    // Monitor error rates
    this.trackUserErrors();
    
    // Monitor completion rates
    this.trackCompletionRates();
    
    // Royal client specific UX monitoring
    this.trackRoyalClientExperience();
  }

  private trackUserSatisfaction(): void {
    let satisfactionScore = 100; // Start optimistic

    // Reduce score for poor performance
    window.addEventListener('load', () => {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
      
      if (loadTime > 3000) satisfactionScore -= 20; // Slow load
      if (loadTime > 5000) satisfactionScore -= 30; // Very slow load
    });

    // Reduce score for errors
    window.addEventListener('error', () => {
      satisfactionScore -= 10;
    });

    // Periodic satisfaction assessment
    setInterval(() => {
      this.recordUserExperience({
        satisfactionScore,
        timestamp: Date.now()
      });
    }, 60000); // Every minute
  }

  private trackUserErrors(): void {
    let errorCount = 0;
    
    window.addEventListener('error', (event) => {
      errorCount++;
      
      // Alert on excessive errors (especially for royal clients)
      if (errorCount > 3) {
        this.createAlert('royal_client', 'high', 'Multiple User Errors Detected', {
          errorCount,
          lastError: event.message,
          impact: 'Royal client experience degraded'
        });
      }
    });
  }

  private trackCompletionRates(): void {
    // Track form completion rates
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
      let started = false;
      let completed = false;

      form.addEventListener('focusin', () => {
        if (!started) {
          started = true;
          performance.mark(`form_${index}_start`);
        }
      });

      form.addEventListener('submit', () => {
        completed = true;
        performance.mark(`form_${index}_complete`);
        performance.measure(`form_${index}_completion`, 
          `form_${index}_start`, `form_${index}_complete`);
        
        // High-value form completions
        if (form.dataset.type === 'contact' || form.dataset.type === 'booking') {
          this.createAlert('business', 'normal', 'High-Value Form Completed', {
            formType: form.dataset.type,
            completionTime: performance.getEntriesByName(`form_${index}_completion`)[0]?.duration,
            revenueImpact: 'positive'
          });
        }
      });
    });
  }

  private trackRoyalClientExperience(): void {
    // Enhanced monitoring for royal client indicators
    const royalIndicators = [
      () => window.location.pathname.includes('oxbridge'),
      () => window.location.pathname.includes('premium'),
      () => document.querySelector('[data-premium="true"]') !== null,
      () => window.screen.width >= 1920, // Premium devices
    ];

    const isRoyalClient = royalIndicators.filter(indicator => indicator()).length >= 2;

    if (isRoyalClient) {
      // Enhanced monitoring for royal clients
      setInterval(() => {
        const now = performance.now();
        
        // Stricter performance standards for royal clients
        if (this.systemHealth.responseTime > 1500) { // Royal client SLA
          this.createAlert('royal_client', 'urgent', 'Royal Client SLA Breach', {
            responseTime: this.systemHealth.responseTime,
            sla: '1.5 seconds',
            action: 'Immediate optimization required'
          });
        }
      }, 30000); // Check every 30 seconds for royal clients
    }
  }

  private recordUserExperience(metrics: Partial<UserExperienceMetrics['metrics']>): void {
    const uxMetrics: UserExperienceMetrics = {
      sessionId: `ux_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      metrics: {
        pageLoadTime: this.systemHealth.responseTime,
        interactionDelay: 0, // Would be calculated from user interactions
        errorCount: 0, // Would track session errors
        satisfactionScore: metrics.satisfactionScore || 85,
        completionRate: 0, // Would be calculated from completed actions
        bounceRate: 0, // Would be calculated from navigation patterns
        ...metrics
      },
      context: {
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server-side',
        deviceType: this.getDeviceType(),
        connection: typeof navigator !== 'undefined' ? ((navigator as any).connection?.effectiveType || 'unknown') : 'server'
      },
      royalClientIndicators: {
        isPremiumUser: this.detectPremiumUser(),
        highValueSession: this.detectHighValueSession(),
        urgentSupport: false // Would be set by support system
      }
    };

    this.userExperienceMetrics.push(uxMetrics);
    
    // Keep only last 100 entries
    if (this.userExperienceMetrics.length > 100) {
      this.userExperienceMetrics = this.userExperienceMetrics.slice(-100);
    }
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.screen.width;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private detectPremiumUser(): boolean {
    // Detect premium user indicators
    return window.screen.width >= 1920 || 
           window.location.search.includes('premium') ||
           document.querySelector('[data-premium="true"]') !== null;
  }

  private detectHighValueSession(): boolean {
    // Detect high-value session indicators
    const highValuePages = ['/booking', '/contact', '/services/oxbridge-preparation'];
    return highValuePages.some(page => window.location.pathname.includes(page));
  }

  private initializeReporting(): void {
    // Send operational reports every 5 minutes
    setInterval(() => {
      this.sendOperationalReport();
    }, 300000);

    // Send immediate alerts for critical issues
    this.setupImmediateAlerting();
  }

  private async sendOperationalReport(): Promise<void> {
    const report = {
      timestamp: Date.now(),
      systemHealth: this.systemHealth,
      alertsSummary: {
        total: this.operationalAlerts.length,
        urgent: this.operationalAlerts.filter(a => a.priority === 'urgent').length,
        royalEmergency: this.operationalAlerts.filter(a => a.priority === 'royal_emergency').length,
        unresolved: this.operationalAlerts.filter(a => !a.resolved).length
      },
      securityIncidents: this.securityIncidents.filter(i => !i.resolved),
      uxMetrics: this.getUXSummary(),
      uptime: ((Date.now() - this.startTime) / 1000) / 60 // minutes
    };

    try {
      await this.sendToMonitoringSystem('/api/monitoring/operational-report', report);
    } catch (error) {
      console.error('Failed to send operational report:', error);
    }
  }

  private setupImmediateAlerting(): void {
    // Royal client emergency procedures
    const royalClientEmergencyProcedure = (alert: OperationalAlert) => {
      console.error('🚨 ROYAL CLIENT EMERGENCY 🚨', alert);
      // In production: SMS, email, and phone notifications to on-call team
    };

    // Monitor for royal client emergencies
    const originalCreateAlert = this.createAlert.bind(this);
    this.createAlert = (type, priority, title, metadata) => {
      const alert = originalCreateAlert(type, priority, title, metadata);
      
      if (priority === 'royal_emergency') {
        royalClientEmergencyProcedure(alert);
      }
      
      return alert;
    };
  }

  private getUXSummary() {
    if (this.userExperienceMetrics.length === 0) return null;

    const latest = this.userExperienceMetrics[this.userExperienceMetrics.length - 1];
    const average = this.userExperienceMetrics.reduce((acc, curr) => ({
      satisfactionScore: acc.satisfactionScore + curr.metrics.satisfactionScore,
      pageLoadTime: acc.pageLoadTime + curr.metrics.pageLoadTime
    }), { satisfactionScore: 0, pageLoadTime: 0 });

    return {
      current: latest.metrics,
      average: {
        satisfactionScore: average.satisfactionScore / this.userExperienceMetrics.length,
        pageLoadTime: average.pageLoadTime / this.userExperienceMetrics.length
      },
      royalClientCount: this.userExperienceMetrics.filter(m => 
        m.royalClientIndicators.isPremiumUser).length
    };
  }

  private startContinuousMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.updateSystemHealth();
      this.checkThresholds();
    }, 30000); // Every 30 seconds
  }

  private updateSystemHealth(metrics?: Partial<SystemHealth>): void {
    const now = Date.now();
    this.systemHealth = {
      ...this.systemHealth,
      uptime: now - this.startTime,
      lastCheck: now,
      ...metrics
    };

    // Update memory information if available
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      this.systemHealth.memory = {
        used: memInfo.usedJSHeapSize,
        available: memInfo.totalJSHeapSize,
        percentage: (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize) * 100
      };
    }
  }

  private checkThresholds(): void {
    // Check response time thresholds
    if (this.systemHealth.responseTime > 3000) {
      this.createAlert('performance', 'high', 'Response Time Critical', {
        responseTime: this.systemHealth.responseTime,
        threshold: 3000
      });
    }

    // Check memory thresholds
    if (this.systemHealth.memory.percentage > 85) {
      this.createAlert('system', 'high', 'Memory Usage High', {
        usage: this.systemHealth.memory.percentage,
        threshold: 85
      });
    }

    // Check error rate thresholds
    if (this.systemHealth.errorRate > 5) {
      this.createAlert('system', 'urgent', 'Error Rate Critical', {
        errorRate: this.systemHealth.errorRate,
        threshold: 5,
        impact: 'Royal client experience at risk'
      });
    }
  }

  private createAlert(
    type: OperationalAlert['type'], 
    priority: OperationalAlert['priority'], 
    title: string, 
    metrics: any
  ): OperationalAlert {
    const alert: OperationalAlert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      type,
      priority,
      title,
      description: `${title} - ${JSON.stringify(metrics)}`,
      metrics,
      actions: this.getRecommendedActions(type, priority, metrics),
      escalation: {
        level: 1,
        nextEscalation: priority === 'urgent' || priority === 'royal_emergency' ? Date.now() + 300000 : undefined, // 5 min
        contacts: ['ops-team@myprivatetutoronline.co.uk']
      },
      acknowledged: false,
      resolved: false
    };

    this.operationalAlerts.push(alert);
    
    // Immediate notification for urgent alerts
    if (priority === 'urgent' || priority === 'royal_emergency') {
      this.sendImmediateAlert(alert);
    }

    return alert;
  }

  private getRecommendedActions(type: string, priority: string, metrics: any): string[] {
    const actions: string[] = [];

    if (type === 'performance') {
      actions.push('Check server resources');
      actions.push('Review recent deployments');
      if (priority === 'urgent') {
        actions.push('Contact hosting provider');
        actions.push('Implement emergency caching');
      }
    }

    if (type === 'royal_client') {
      actions.push('Immediate investigation required');
      actions.push('Notify senior management');
      actions.push('Prepare client communication');
    }

    return actions;
  }

  private async sendImmediateAlert(alert: OperationalAlert): Promise<void> {
    try {
      await this.sendToMonitoringSystem('/api/monitoring/urgent-alert', alert);
    } catch (error) {
      console.error('Failed to send urgent alert:', error);
    }
  }

  private createSecurityIncident(
    type: SecurityIncident['type'],
    severity: SecurityIncident['severity'],
    description: string,
    metadata: any
  ): void {
    const incident: SecurityIncident = {
      id: `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      type,
      severity,
      description,
      impact: {
        userCount: metadata.userCount || 0,
        revenueAtRisk: metadata.revenueAtRisk || 0,
        royalClientsAffected: metadata.royalClientsAffected || 0
      },
      mitigation: this.getSecurityMitigation(type, severity),
      resolved: false
    };

    this.securityIncidents.push(incident);

    // Create operational alert for security incidents
    this.createAlert('security', severity === 'critical' ? 'royal_emergency' : 'high',
      `Security Incident: ${type}`, incident);
  }

  private getSecurityMitigation(type: string, severity: string): string[] {
    const mitigation: string[] = [];

    if (type === 'unauthorized_access') {
      mitigation.push('Review access logs');
      mitigation.push('Check authentication systems');
      if (severity === 'critical') {
        mitigation.push('Consider temporary access restrictions');
      }
    }

    return mitigation;
  }

  private async sendToMonitoringSystem(endpoint: string, data: any): Promise<void> {
    const payload = JSON.stringify({
      ...data,
      source: 'operational_monitoring',
      service: 'royal_client_platform'
    });

    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, payload);
    } else {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      });
    }
  }

  // Public API Methods
  public getSystemHealth(): SystemHealth {
    return { ...this.systemHealth };
  }

  public getOperationalAlerts(): OperationalAlert[] {
    return [...this.operationalAlerts];
  }

  public getSecurityIncidents(): SecurityIncident[] {
    return [...this.securityIncidents];
  }

  public getUserExperienceMetrics(): UserExperienceMetrics[] {
    return [...this.userExperienceMetrics];
  }

  public acknowledgeAlert(alertId: string): boolean {
    const alert = this.operationalAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      return true;
    }
    return false;
  }

  public resolveAlert(alertId: string): boolean {
    const alert = this.operationalAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      return true;
    }
    return false;
  }

  public getMonitoringSummary() {
    return {
      systemHealth: this.systemHealth,
      totalAlerts: this.operationalAlerts.length,
      unresolvedAlerts: this.operationalAlerts.filter(a => !a.resolved).length,
      criticalAlerts: this.operationalAlerts.filter(a => 
        a.priority === 'urgent' || a.priority === 'royal_emergency').length,
      securityIncidents: this.securityIncidents.filter(i => !i.resolved).length,
      uptime: ((Date.now() - this.startTime) / 1000) / 60, // minutes
      uxScore: this.getUXSummary()?.current?.satisfactionScore || 0
    };
  }
}

// Singleton instance
export const operationalMonitor = new OperationalMonitoringSystem();

// React Hook for component integration
export function useOperationalMonitoring() {
  return {
    getSystemHealth: operationalMonitor.getSystemHealth.bind(operationalMonitor),
    getAlerts: operationalMonitor.getOperationalAlerts.bind(operationalMonitor),
    getSummary: operationalMonitor.getMonitoringSummary.bind(operationalMonitor),
    acknowledgeAlert: operationalMonitor.acknowledgeAlert.bind(operationalMonitor),
    resolveAlert: operationalMonitor.resolveAlert.bind(operationalMonitor)
  };
}

// Initialize operational monitoring when module loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      operationalMonitor.startOperationalMonitoring();
    });
  } else {
    operationalMonitor.startOperationalMonitoring();
  }
}