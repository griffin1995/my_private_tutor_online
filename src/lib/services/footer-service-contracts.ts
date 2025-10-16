import { ReactNode } from 'react';
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
export interface FooterContentService {
	getFooterContent(): FooterContent;
	validateContent(content: FooterContent): ValidationResult;
	getCachedContent(): FooterContent;
	getFooterViewModel(): FooterViewModel;
}
export interface FooterComplianceService {
	validateAccessibility(component: ReactNode): AccessibilityResult;
	enforceGDPR(formData: FormData): GDPRResult;
	auditCompliance(): ComplianceReport;
	validateLegalCompliance(): LegalComplianceResult;
}
export interface FooterPerformanceService {
	trackMetrics(): WebVitalsMetrics;
	validateBudget(bundle: BundleInfo): BudgetResult;
	optimizeRendering(component: ReactNode): OptimizedComponent;
	startMonitoring(): PerformanceMonitor;
}
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
	lawfulBasis:
		| 'consent'
		| 'legitimate-interest'
		| 'contract'
		| 'legal-obligation';
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
	score: number;
	criticalIssues: number;
	warningIssues: number;
	lastAudit: string;
}
export interface WebVitalsMetrics {
	lcp: number;
	fid: number;
	cls: number;
	fcp: number;
	ttfb: number;
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
export class FooterServiceError extends Error {
	constructor(
		message: string,
		public service: string,
		public operation: string,
		public details?: Record<string, any>,
	) {
		super(message);
		this.name = 'FooterServiceError';
	}
}
export class FooterValidationError extends FooterServiceError {
	constructor(
		message: string,
		public violations: string[],
	) {
		super(message, 'validation', 'validate');
		this.name = 'FooterValidationError';
	}
}
export class FooterComplianceError extends FooterServiceError {
	constructor(
		message: string,
		public complianceType: string,
	) {
		super(message, 'compliance', 'audit');
		this.name = 'FooterComplianceError';
	}
}
export class FooterPerformanceError extends FooterServiceError {
	constructor(
		message: string,
		public metric: string,
		public threshold: number,
		public actual: number,
	) {
		super(message, 'performance', 'monitor');
		this.name = 'FooterPerformanceError';
	}
}
