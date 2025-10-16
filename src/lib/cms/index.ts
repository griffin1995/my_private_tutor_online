export {
	CMSService,
	cmsService,
	createCMSService,
	type CacheConfig,
	type CacheStats,
	type CMSServiceConfig,
	type ValidationResult,
	type PerformanceMetrics,
} from './cms-service';
export * from './testimonials-cms-manager';
export * from './cms-validation';
export * from './cms-performance';
export * from './cms-analytics';
export * from '../../config/testimonials-cms.config';
export * from '../../types/testimonials-cms.types';
export { testimonialsCMSManager } from './testimonials-cms-manager';
export { cmsPerformanceManager } from './cms-performance';
export { cmsAnalyticsManager } from './cms-analytics';
export { getTestimonialsCMSConfig } from '../../config/testimonials-cms.config';
import { testimonialsCMSManager } from './testimonials-cms-manager';
import { cmsPerformanceManager } from './cms-performance';
import { cmsAnalyticsManager } from './cms-analytics';
export * from './cms-content';
export * from './cms-images';
export { default as CMS } from './cms-content';
export { default as Images } from './cms-images';
import { cmsService } from './cms-service';
import { validateContentStructure } from './cms-content';
export const initializeCMS = () => {
	const serviceValid = cmsService.validateContentStructure();
	const legacyValid = validateContentStructure();
	const isValid = serviceValid && legacyValid;
	if (!isValid) {
		if (process.env.NODE_ENV === 'development') {
			console.warn('CMS validation failed - check content structure');
		}
	} else {
		if (process.env.NODE_ENV === 'development') {
			console.log('✅ CMS initialized successfully');
		}
	}
	return isValid;
};
export const getCMSHealth = () => {
	const stats = cmsService.getCacheStats();
	const config = cmsService.getConfig();
	return {
		initialized: true,
		cacheStats: stats,
		validationEnabled: config.validation.enableValidation,
		debugEnabled: config.development.enableDebugLogging,
		version: CMS_VERSION,
	};
};
export const CMS_VERSION = '2.1.0';
export { useTestimonialsCMS } from './testimonials-cms-manager';
export { useCMSPerformance } from './cms-performance';
export { useCMSAnalytics } from './cms-analytics';
export {
	validateCMSConfig,
	CMSConfigUtils,
} from '../../config/testimonials-cms.config';
export const TestimonialsManager = testimonialsCMSManager;
export const PerformanceManager = cmsPerformanceManager;
export const AnalyticsManager = cmsAnalyticsManager;
export { cmsService as default };
