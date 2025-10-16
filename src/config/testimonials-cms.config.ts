import type { PerformanceConfig } from '@/lib/cms/cms-performance';
import type { TestimonialsPageContent } from '@/lib/cms/testimonials-cms-manager';
export interface TestimonialsCMSConfig {
	readonly performance: PerformanceConfig;
	readonly validation: ValidationConfig;
	readonly analytics: AnalyticsConfig;
	readonly admin: AdminConfig;
	readonly content: ContentConfig;
}
export interface ValidationConfig {
	readonly strictMode: boolean;
	readonly autofix: boolean;
	readonly businessRulesEnabled: boolean;
	readonly minimumTestimonialLength: number;
	readonly maximumTestimonialLength: number;
	readonly requiredFields: readonly string[];
	readonly warningThresholds: {
		readonly lowRating: number;
		readonly shortQuote: number;
		readonly longQuote: number;
	};
}
export interface AnalyticsConfig {
	readonly trackingEnabled: boolean;
	readonly privacyMode: boolean;
	readonly dataRetentionDays: number;
	readonly batchSize: number;
	readonly flushInterval: number;
	readonly insightsEnabled: boolean;
	readonly revenueTracking: boolean;
	readonly performanceMonitoring: boolean;
}
export interface AdminConfig {
	readonly autoSave: boolean;
	readonly autoSaveInterval: number;
	readonly previewMode: boolean;
	readonly backupEnabled: boolean;
	readonly backupInterval: number;
	readonly accessControl: {
		readonly requireAuth: boolean;
		readonly allowedRoles: readonly string[];
	};
	readonly ui: {
		readonly theme: 'light' | 'dark' | 'auto';
		readonly compactMode: boolean;
		readonly showMetrics: boolean;
		readonly showInsights: boolean;
	};
}
export interface ContentConfig {
	readonly defaultValues: Partial<TestimonialsPageContent>;
	readonly contentSources: {
		readonly enabledSources: readonly string[];
		readonly fallbackBehavior: 'error' | 'default' | 'cache';
	};
	readonly optimization: {
		readonly imageCompression: boolean;
		readonly videoOptimization: boolean;
		readonly contentMinification: boolean;
	};
	readonly localization: {
		readonly defaultLocale: string;
		readonly supportedLocales: readonly string[];
		readonly fallbackLocale: string;
	};
}
export const DEFAULT_TESTIMONIALS_CMS_CONFIG: TestimonialsCMSConfig = {
	performance: {
		cacheExpiry: 15 * 60 * 1000,
		maxCacheSize: 5 * 1024 * 1024,
		preloadThreshold: 2000,
		lazyLoadThreshold: 500,
		compressionEnabled: true,
		metricsEnabled: true,
	},
	validation: {
		strictMode: true,
		autofix: false,
		businessRulesEnabled: true,
		minimumTestimonialLength: 50,
		maximumTestimonialLength: 500,
		requiredFields: ['quote', 'author', 'role', 'rating'],
		warningThresholds: {
			lowRating: 4,
			shortQuote: 50,
			longQuote: 500,
		},
	},
	analytics: {
		trackingEnabled: true,
		privacyMode: false,
		dataRetentionDays: 90,
		batchSize: 50,
		flushInterval: 30000,
		insightsEnabled: true,
		revenueTracking: true,
		performanceMonitoring: true,
	},
	admin: {
		autoSave: true,
		autoSaveInterval: 30000,
		previewMode: true,
		backupEnabled: true,
		backupInterval: 60 * 60 * 1000,
		accessControl: {
			requireAuth: true,
			allowedRoles: ['admin', 'content_manager', 'editor'],
		},
		ui: {
			theme: 'light',
			compactMode: false,
			showMetrics: true,
			showInsights: true,
		},
	},
	content: {
		defaultValues: {
			hero: {
				title: 'What Our Families Say',
				subtitle: 'Real experiences from our premium tutoring community',
				description:
					'Discover how My Private Tutor Online has transformed educational journeys for families across the UK',
				backgroundVariant: 'gradient',
				size: 'standard',
				showCredentials: true,
			},
			cta: {
				title: 'Ready to Join Our Success Stories?',
				description:
					'Experience the premium tutoring that creates these amazing testimonials',
				primaryButton: {
					text: 'Get Your Free Consultation',
					href: '/contact',
					variant: 'premium',
				},
				backgroundVariant: 'gradient',
			},
		},
		contentSources: {
			enabledSources: ['cms', 'api', 'static'],
			fallbackBehavior: 'cache',
		},
		optimization: {
			imageCompression: true,
			videoOptimization: true,
			contentMinification: false,
		},
		localization: {
			defaultLocale: 'en-GB',
			supportedLocales: ['en-GB', 'en-US'],
			fallbackLocale: 'en-GB',
		},
	},
};
export const DEVELOPMENT_TESTIMONIALS_CMS_CONFIG: TestimonialsCMSConfig = {
	...DEFAULT_TESTIMONIALS_CMS_CONFIG,
	performance: {
		...DEFAULT_TESTIMONIALS_CMS_CONFIG.performance,
		cacheExpiry: 5 * 60 * 1000,
		metricsEnabled: false,
	},
	validation: {
		...DEFAULT_TESTIMONIALS_CMS_CONFIG.validation,
		strictMode: false,
		autofix: true,
		businessRulesEnabled: false,
	},
	analytics: {
		...DEFAULT_TESTIMONIALS_CMS_CONFIG.analytics,
		trackingEnabled: false,
		privacyMode: true,
	},
	admin: {
		...DEFAULT_TESTIMONIALS_CMS_CONFIG.admin,
		accessControl: {
			requireAuth: false,
			allowedRoles: ['*'],
		},
		autoSaveInterval: 10000,
	},
};
export const TESTING_TESTIMONIALS_CMS_CONFIG: TestimonialsCMSConfig = {
	...DEFAULT_TESTIMONIALS_CMS_CONFIG,
	performance: {
		...DEFAULT_TESTIMONIALS_CMS_CONFIG.performance,
		cacheExpiry: 1000,
		maxCacheSize: 1024 * 1024,
		metricsEnabled: false,
	},
	validation: {
		...DEFAULT_TESTIMONIALS_CMS_CONFIG.validation,
		strictMode: true,
		businessRulesEnabled: true,
	},
	analytics: {
		...DEFAULT_TESTIMONIALS_CMS_CONFIG.analytics,
		trackingEnabled: false,
		dataRetentionDays: 1,
		batchSize: 10,
		flushInterval: 1000,
	},
	admin: {
		...DEFAULT_TESTIMONIALS_CMS_CONFIG.admin,
		autoSave: false,
		backupEnabled: false,
		accessControl: {
			requireAuth: false,
			allowedRoles: ['*'],
		},
	},
};
export function getTestimonialsCMSConfig(): TestimonialsCMSConfig {
	const environment = process.env.NODE_ENV;
	switch (environment) {
		case 'development':
			return DEVELOPMENT_TESTIMONIALS_CMS_CONFIG;
		case 'test':
			return TESTING_TESTIMONIALS_CMS_CONFIG;
		case 'production':
		default:
			return DEFAULT_TESTIMONIALS_CMS_CONFIG;
	}
}
export function validateCMSConfig(config: TestimonialsCMSConfig): {
	valid: boolean;
	errors: string[];
	warnings: string[];
} {
	const errors: string[] = [];
	const warnings: string[] = [];
	if (config.performance.cacheExpiry < 1000) {
		warnings.push('Cache expiry is very low, may impact performance');
	}
	if (config.performance.maxCacheSize > 10 * 1024 * 1024) {
		warnings.push('Cache size is very large, may impact memory usage');
	}
	if (config.validation.minimumTestimonialLength < 10) {
		errors.push('Minimum testimonial length too short for meaningful content');
	}
	if (config.validation.maximumTestimonialLength > 1000) {
		warnings.push('Maximum testimonial length may impact readability');
	}
	if (config.analytics.dataRetentionDays > 365) {
		warnings.push(
			'Data retention period is very long, consider privacy implications',
		);
	}
	if (config.analytics.batchSize > 1000) {
		warnings.push('Large batch size may impact performance');
	}
	if (config.admin.autoSaveInterval < 10000) {
		warnings.push('Auto-save interval is very frequent, may impact performance');
	}
	return {
		valid: errors.length === 0,
		errors,
		warnings,
	};
}
export const CMSConfigUtils = {
	mergeConfig(
		base: TestimonialsCMSConfig,
		override: Partial<TestimonialsCMSConfig>,
	): TestimonialsCMSConfig {
		return {
			performance: {
				...base.performance,
				...override.performance,
			},
			validation: {
				...base.validation,
				...override.validation,
			},
			analytics: {
				...base.analytics,
				...override.analytics,
			},
			admin: {
				...base.admin,
				...override.admin,
			},
			content: {
				...base.content,
				...override.content,
			},
		};
	},
	getFeatureConfig<K extends keyof TestimonialsCMSConfig>(
		config: TestimonialsCMSConfig,
		feature: K,
	): TestimonialsCMSConfig[K] {
		return config[feature];
	},
	isFeatureEnabled(config: TestimonialsCMSConfig, feature: string): boolean {
		switch (feature) {
			case 'analytics':
				return config.analytics.trackingEnabled;
			case 'validation':
				return config.validation.strictMode;
			case 'admin':
				return config.admin.accessControl.requireAuth;
			case 'performance':
				return config.performance.metricsEnabled;
			default:
				return false;
		}
	},
	getPerformanceBudget(config: TestimonialsCMSConfig): {
		loadTime: number;
		cacheSize: number;
		renderTime: number;
	} {
		return {
			loadTime: config.performance.preloadThreshold,
			cacheSize: config.performance.maxCacheSize,
			renderTime: 100,
		};
	},
};
export default DEFAULT_TESTIMONIALS_CMS_CONFIG;
