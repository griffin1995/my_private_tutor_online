// CONTEXT7 SOURCE: /microsoft/typescript - Service contract patterns for architectural boundaries
// IMPLEMENTATION REASON: Official TypeScript documentation demonstrates interface segregation principles for service layer architecture

import { ReactNode } from 'react';

// Core data interfaces
export interface FooterContent {
  companyName: string;
  description: string;
  logo: {
    main: string;
    alt: string;
    width: number;
    height: number;
  };
  footerSections: Array<{
    title: string;
    links: Array<{
      href: string;
      label: string;
    }>;
  }>;
}

export interface ContactInfo {
  phone: string;
  email: string;
}

export interface FooterViewModel {
  content: FooterContent;
  contact: ContactInfo;
  copyright: string;
  computedProperties: FooterComputedProperties;
}

export interface FooterComputedProperties {
  currentYear: number;
  hasNewsletter: boolean;
  socialLinksCount: number;
  linkSectionsCount: number;
  complianceStatus: ComplianceStatus;
  performanceMetrics: PerformanceMetrics;
}

// Service contract interfaces
export interface FooterContentService {
  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Synchronous data access patterns
   * SYNCHRONOUS REQUIREMENT: Must return data immediately without Promise
   */
  getFooterContent(): FooterContent;
  
  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Data validation patterns
   * VALIDATION REASON: Type-safe content validation with proper error handling
   */
  validateContent(content: FooterContent): ValidationResult;
  
  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - React.cache integration patterns
   * CACHING REASON: Performance optimization through React's built-in caching
   */
  getCachedContent(): FooterContent;
  
  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Facade pattern for data aggregation
   * AGGREGATION REASON: Single access point for all footer-related data
   */
  getFooterViewModel(): FooterViewModel;
}

export interface FooterComplianceService {
  /**
   * CONTEXT7 SOURCE: /wcag/guidelines - Accessibility validation patterns
   * ACCESSIBILITY REASON: WCAG 2.1 AA compliance validation for components
   */
  validateAccessibility(component: ReactNode): AccessibilityResult;
  
  /**
   * CONTEXT7 SOURCE: /gdpr/regulations - GDPR compliance patterns
   * PRIVACY REASON: Data protection compliance for newsletter and contact forms
   */
  enforceGDPR(formData: FormData): GDPRResult;
  
  /**
   * CONTEXT7 SOURCE: /web.dev/security - Security audit patterns
   * SECURITY REASON: Comprehensive compliance audit for footer components
   */
  auditCompliance(): ComplianceReport;
  
  /**
   * CONTEXT7 SOURCE: /uk-legislation/consumer-protection - Legal compliance
   * LEGAL REASON: UK business regulatory compliance validation
   */
  validateLegalCompliance(): LegalComplianceResult;
}

export interface FooterPerformanceService {
  /**
   * CONTEXT7 SOURCE: /web.dev/vitals - Web Vitals measurement patterns
   * PERFORMANCE REASON: Track Core Web Vitals specifically for footer components
   */
  trackMetrics(): WebVitalsMetrics;
  
  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Bundle optimization patterns
   * BUNDLE REASON: Monitor and enforce bundle size budgets for footer
   */
  validateBudget(bundle: BundleInfo): BudgetResult;
  
  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - Render optimization patterns
   * RENDER REASON: Optimize component rendering performance
   */
  optimizeRendering(component: ReactNode): OptimizedComponent;
  
  /**
   * CONTEXT7 SOURCE: /web.dev/performance - Performance monitoring
   * MONITORING REASON: Real-time performance tracking and alerting
   */
  startMonitoring(): PerformanceMonitor;
}

// Result and status interfaces
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  metadata: Record<string, any>;
}

export interface AccessibilityResult {
  wcagLevel: 'A' | 'AA' | 'AAA';
  violations: AccessibilityViolation[];
  passedChecks: string[];
  recommendations: string[];
}

export interface AccessibilityViolation {
  rule: string;
  severity: 'error' | 'warning' | 'info';
  element: string;
  description: string;
  remediation: string;
}

export interface GDPRResult {
  compliant: boolean;
  consentRequired: boolean;
  dataCategories: string[];
  retentionPeriod: number;
  lawfulBasis: 'consent' | 'legitimate-interest' | 'contract' | 'legal-obligation';
  auditTrail: GDPRAuditEntry[];
}

export interface GDPRAuditEntry {
  timestamp: string;
  activity: string;
  dataSubject: string;
  purpose: string;
  lawfulBasis: string;
}

export interface ComplianceReport {
  accessibility: AccessibilityResult;
  privacy: GDPRResult;
  security: SecurityResult;
  legal: LegalComplianceResult;
  overall: ComplianceStatus;
}

export interface SecurityResult {
  cspCompliant: boolean;
  inputSanitized: boolean;
  rateLimitingActive: boolean;
  encryptionStatus: 'encrypted' | 'partial' | 'none';
  vulnerabilities: SecurityVulnerability[];
}

export interface SecurityVulnerability {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  remediation: string;
}

export interface LegalComplianceResult {
  equalityActCompliant: boolean;
  consumerProtectionCompliant: boolean;
  dataProtectionCompliant: boolean;
  accessibilityRegulationsCompliant: boolean;
  risks: LegalRisk[];
}

export interface LegalRisk {
  regulation: string;
  riskLevel: 'high' | 'medium' | 'low';
  description: string;
  potentialFine: number;
  remediation: string;
}

export interface ComplianceStatus {
  level: 'compliant' | 'partial' | 'non-compliant';
  score: number; // 0-100
  criticalIssues: number;
  warningIssues: number;
  lastAudit: string;
}

export interface WebVitalsMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  footerSpecific: FooterMetrics;
}

export interface FooterMetrics {
  renderTime: number;
  bundleSize: number;
  interactionReady: number;
  accessibilityScore: number;
  complianceScore: number;
}

export interface BundleInfo {
  totalSize: number;
  footerSize: number;
  dependencies: DependencyInfo[];
  optimizationOpportunities: string[];
}

export interface DependencyInfo {
  name: string;
  size: number;
  used: boolean;
  treeshakeable: boolean;
}

export interface BudgetResult {
  withinBudget: boolean;
  budget: number;
  actual: number;
  overage: number;
  recommendations: string[];
}

export interface OptimizedComponent {
  component: ReactNode;
  optimizations: string[];
  performanceGain: number;
  bundleSavings: number;
}

export interface PerformanceMetrics {
  renderTime: number;
  bundleSize: number;
  memoryUsage: number;
  interactionLatency: number;
  lastMeasured: string;
}

export interface PerformanceMonitor {
  start(): void;
  stop(): void;
  getMetrics(): WebVitalsMetrics;
  isRunning(): boolean;
}

// Configuration interfaces
export interface FooterConfig {
  variant: FooterVariant;
  features: FooterFeatures;
  compliance: ComplianceConfig;
  performance: PerformanceConfig;
}

export interface FooterVariant {
  type: 'default' | 'minimal' | 'premium';
  theme: 'light' | 'dark' | 'auto';
  layout: 'standard' | 'centered' | 'split';
}

export interface FooterFeatures {
  showNewsletter: boolean;
  showContactForm: boolean;
  showBackToTop: boolean;
  showSocialLinks: boolean;
  enableAnalytics: boolean;
}

export interface ComplianceConfig {
  wcagLevel: 'A' | 'AA' | 'AAA';
  gdprMode: 'strict' | 'balanced' | 'minimal';
  securityLevel: 'high' | 'medium' | 'low';
  auditFrequency: 'daily' | 'weekly' | 'monthly';
}

export interface PerformanceConfig {
  budgetLimits: {
    totalBundle: number;
    footerBundle: number;
    renderTime: number;
    memoryUsage: number;
  };
  monitoring: {
    enabled: boolean;
    interval: number;
    alertThresholds: Record<string, number>;
  };
}

// Error types for service contracts
export class FooterServiceError extends Error {
  constructor(
    message: string,
    public service: string,
    public operation: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'FooterServiceError';
  }
}

export class FooterValidationError extends FooterServiceError {
  constructor(message: string, public violations: string[]) {
    super(message, 'validation', 'validate');
    this.name = 'FooterValidationError';
  }
}

export class FooterComplianceError extends FooterServiceError {
  constructor(message: string, public complianceType: string) {
    super(message, 'compliance', 'audit');
    this.name = 'FooterComplianceError';
  }
}

export class FooterPerformanceError extends FooterServiceError {
  constructor(message: string, public metric: string, public threshold: number, public actual: number) {
    super(message, 'performance', 'monitor');
    this.name = 'FooterPerformanceError';
  }
}