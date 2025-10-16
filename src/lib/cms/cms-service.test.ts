import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CMSService, cmsService, createCMSService } from './cms-service';
import type {
	SiteHeader,
	HeroContent,
	ImageAsset,
	ValidationResult,
	CacheStats,
	PerformanceMetrics,
} from './cms-content';
describe('CMSService', () => {
	let service: CMSService;
	beforeEach(() => {
		cmsService.clearCache();
		cmsService.clearPerformanceMetrics();
		service = cmsService;
	});
	describe('Singleton Pattern', () => {
		it('should return the same instance for multiple getInstance calls', () => {
			const instance1 = CMSService.getInstance();
			const instance2 = CMSService.getInstance();
			expect(instance1).toBe(instance2);
			expect(instance1).toBe(cmsService);
		});
		it('should allow configuration on first initialization', () => {
			const config = {
				cache: {
					ttl: 10000,
					maxEntries: 50,
					enableDebug: true,
				},
				development: {
					enableDebugLogging: true,
					logPerformanceMetrics: true,
				},
			};
			const customService = createCMSService(config);
			const retrievedConfig = customService.getConfig();
			expect(retrievedConfig.cache.ttl).toBe(10000);
			expect(retrievedConfig.development.enableDebugLogging).toBe(true);
		});
	});
	describe('Content Retrieval', () => {
		it('should retrieve site header content with proper typing', () => {
			const header: SiteHeader = service.getSiteHeader();
			expect(header).toBeDefined();
			expect(typeof header.siteName).toBe('string');
			expect(typeof header.logo).toBe('string');
			expect(Array.isArray(header.navigation)).toBe(true);
		});
		it('should retrieve hero content with fallback values', () => {
			const hero: HeroContent = service.getHeroContent();
			expect(hero).toBeDefined();
			expect(typeof hero.title).toBe('string');
			expect(typeof hero.subtitle).toBe('string');
			expect(typeof hero.description).toBe('string');
			expect(typeof hero.image).toBe('string');
			expect(typeof hero.imageAlt).toBe('string');
			expect(Array.isArray(hero.ctaButtons)).toBe(true);
		});
		it('should retrieve testimonials as an array', () => {
			const testimonials = service.getTestimonials();
			expect(Array.isArray(testimonials)).toBe(true);
			if (testimonials.length > 0) {
				const testimonial = testimonials[0];
				expect(typeof testimonial.quote).toBe('string');
				expect(typeof testimonial.author).toBe('string');
				expect(typeof testimonial.role).toBe('string');
			}
		});
		it('should retrieve services with proper structure', () => {
			const services = service.getServices();
			expect(Array.isArray(services)).toBe(true);
			if (services.length > 0) {
				const service = services[0];
				expect(typeof service.title).toBe('string');
				expect(typeof service.description).toBe('string');
				expect(typeof service.icon).toBe('string');
				expect(Array.isArray(service.features)).toBe(true);
			}
		});
		it('should retrieve unified contact data', () => {
			const contact = service.getUnifiedContact();
			expect(contact).toBeDefined();
			expect(contact.primary).toBeDefined();
			expect(contact.landing).toBeDefined();
			expect(contact.landingInfo).toBeDefined();
			expect(contact.faq).toBeDefined();
			expect(contact.quoteForm).toBeDefined();
		});
	});
	describe('Image Asset Retrieval', () => {
		it('should retrieve main logo with proper ImageAsset structure', () => {
			const logo: ImageAsset = service.getMainLogo();
			expect(logo).toBeDefined();
			expect(typeof logo.src).toBe('string');
			expect(typeof logo.alt).toBe('string');
			expect(typeof logo.width).toBe('number');
			expect(typeof logo.height).toBe('number');
			expect(logo.loading).toBe('eager');
			expect(logo.priority).toBe(true);
		});
		it('should retrieve white logo variant', () => {
			const logoWhite: ImageAsset = service.getMainLogoWhite();
			expect(logoWhite).toBeDefined();
			expect(logoWhite.src).toContain('white');
			expect(typeof logoWhite.alt).toBe('string');
		});
		it('should retrieve hero image with proper metadata', () => {
			const heroImage: ImageAsset = service.getHeroImage();
			expect(heroImage).toBeDefined();
			expect(typeof heroImage.src).toBe('string');
			expect(typeof heroImage.alt).toBe('string');
			expect(heroImage.alt.length).toBeGreaterThan(0);
		});
		it('should retrieve fallback image when needed', () => {
			const fallback: ImageAsset = service.getFallbackImage();
			expect(fallback).toBeDefined();
			expect(fallback.src).toContain('placeholder');
			expect(typeof fallback.alt).toBe('string');
		});
		it('should retrieve institution logos as object', () => {
			const institutions = service.getInstitutionLogos();
			expect(typeof institutions).toBe('object');
			expect(institutions).not.toBeNull();
		});
		it('should retrieve scrolling school logos for carousel', () => {
			const schoolLogos = service.getScrollingSchoolLogos();
			expect(typeof schoolLogos).toBe('object');
			expect(schoolLogos).not.toBeNull();
		});
	});
	describe('Caching Behavior', () => {
		it('should cache content retrieval calls', () => {
			service.clearCache();
			const header1 = service.getSiteHeader();
			const stats1 = service.getCacheStats();
			const header2 = service.getSiteHeader();
			const stats2 = service.getCacheStats();
			expect(header1).toEqual(header2);
			expect(stats2.hits).toBeGreaterThan(stats1.hits);
		});
		it('should provide accurate cache statistics', () => {
			service.clearCache();
			service.getSiteHeader();
			service.getHeroContent();
			service.getMainLogo();
			const stats: CacheStats = service.getCacheStats();
			expect(typeof stats.hits).toBe('number');
			expect(typeof stats.misses).toBe('number');
			expect(typeof stats.size).toBe('number');
			expect(typeof stats.hitRate).toBe('number');
			expect(stats.size).toBeGreaterThan(0);
		});
		it('should clear cache when requested', () => {
			service.getSiteHeader();
			service.getHeroContent();
			let stats = service.getCacheStats();
			expect(stats.size).toBeGreaterThan(0);
			service.clearCache();
			stats = service.getCacheStats();
			expect(stats.size).toBe(0);
			expect(stats.hits).toBe(0);
			expect(stats.misses).toBe(0);
		});
		it('should clear specific cache entries', () => {
			service.getSiteHeader();
			service.getHeroContent();
			const statsBeforeClear = service.getCacheStats();
			const cleared = service.clearCacheEntry('site-header');
			const statsAfterClear = service.getCacheStats();
			expect(cleared).toBe(true);
			expect(statsAfterClear.size).toBe(statsBeforeClear.size - 1);
		});
		it('should provide detailed cache debug information', () => {
			service.getSiteHeader();
			service.getHeroContent();
			const debugInfo = service.getCacheDebugInfo();
			expect(debugInfo).toBeDefined();
			expect(Array.isArray(debugInfo.entries)).toBe(true);
			expect(debugInfo.stats).toBeDefined();
			expect(debugInfo.entries.length).toBeGreaterThan(0);
			if (debugInfo.entries.length > 0) {
				const entry = debugInfo.entries[0];
				expect(typeof entry.key).toBe('string');
				expect(typeof entry.timestamp).toBe('number');
				expect(typeof entry.ttl).toBe('number');
				expect(typeof entry.age).toBe('number');
				expect(typeof entry.expired).toBe('boolean');
			}
		});
	});
	describe('Validation and Error Handling', () => {
		it('should validate content structure', () => {
			const isValid = service.validateContentStructure();
			expect(typeof isValid).toBe('boolean');
		});
		it('should validate image accessibility', () => {
			const logo = service.getMainLogo();
			const isValid = service.validateImageAccessibility(logo);
			expect(typeof isValid).toBe('boolean');
		});
		it('should provide validation results for content', () => {
			const testContent = {
				title: 'Test',
				description: 'Test description',
			};
			const validation: ValidationResult<typeof testContent> =
				service.validateContent(testContent);
			expect(validation).toBeDefined();
			expect(typeof validation.isValid).toBe('boolean');
			expect(validation.data).toEqual(testContent);
			expect(Array.isArray(validation.errors)).toBe(true);
			expect(Array.isArray(validation.warnings)).toBe(true);
		});
		it('should handle validation errors gracefully', () => {
			const invalidContent = null;
			const validation = service.validateContent(invalidContent);
			expect(validation.isValid).toBe(false);
			expect(validation.errors.length).toBeGreaterThan(0);
		});
		it('should detect empty content objects', () => {
			const emptyContent = {};
			const validation = service.validateContent(emptyContent);
			expect(validation.isValid).toBe(true);
			expect(validation.warnings.length).toBeGreaterThan(0);
		});
	});
	describe('Performance Monitoring', () => {
		it('should record performance metrics when enabled', () => {
			service.updateConfig({
				development: {
					enableDebugLogging: true,
					logPerformanceMetrics: true,
				},
			});
			service.clearPerformanceMetrics();
			service.getSiteHeader();
			service.getHeroContent();
			const metrics: readonly PerformanceMetrics[] =
				service.getPerformanceMetrics();
			expect(Array.isArray(metrics)).toBe(true);
		});
		it('should clear performance metrics', () => {
			service.getSiteHeader();
			service.clearPerformanceMetrics();
			const metrics = service.getPerformanceMetrics();
			expect(metrics.length).toBe(0);
		});
	});
	describe('Utility Methods', () => {
		it('should generate responsive image sizes', () => {
			const sizes = service.generateResponsiveSizes(800);
			expect(sizes).toBeDefined();
			expect(typeof sizes.mobile).toBe('number');
			expect(typeof sizes.tablet).toBe('number');
			expect(typeof sizes.desktop).toBe('number');
			expect(typeof sizes.xl).toBe('number');
			expect(sizes.mobile).toBe(400);
			expect(sizes.tablet).toBe(600);
			expect(sizes.desktop).toBe(800);
			expect(sizes.xl).toBe(1000);
		});
		it('should generate srcset for responsive images', () => {
			const srcSet = service.generateSrcSet('/image.jpg', {
				small: 400,
				large: 800,
			});
			expect(typeof srcSet).toBe('string');
			expect(srcSet).toContain('/image.jpg?w=400 400w');
			expect(srcSet).toContain('/image.jpg?w=800 800w');
		});
		it('should get optimized image props', () => {
			const testImage: ImageAsset = {
				src: '/test.jpg',
				alt: 'Test image',
				width: 400,
				height: 300,
				loading: 'lazy',
			};
			const props = service.getOptimizedImageProps(testImage);
			expect(props.src).toBe('/test.jpg');
			expect(props.alt).toBe('Test image');
			expect(props.width).toBe(400);
			expect(props.height).toBe(300);
			expect(props.loading).toBe('lazy');
			expect(typeof props.sizes).toBe('string');
		});
		it('should format British English text', () => {
			const americanText = 'organize color center favorite license';
			const britishText = service.formatBritishEnglish(americanText);
			expect(britishText).toBe('organise colour centre favourite licence');
		});
		it('should get copyright text with consistent year', () => {
			const copyright = service.getCopyrightText();
			expect(typeof copyright).toBe('string');
			expect(copyright).toContain('2025');
			expect(copyright).toContain('My Private Tutor Online');
		});
		it('should get critical images for preloading', () => {
			const criticalImages = service.getCriticalImages();
			expect(Array.isArray(criticalImages)).toBe(true);
			if (criticalImages.length > 0) {
				const image = criticalImages[0];
				expect(image.priority).toBe(true);
			}
		});
	});
	describe('Development Tools', () => {
		it('should allow debug logging configuration', () => {
			service.setDebugLogging(true);
			let config = service.getConfig();
			expect(config.development.enableDebugLogging).toBe(true);
			service.setDebugLogging(false);
			config = service.getConfig();
			expect(config.development.enableDebugLogging).toBe(false);
		});
		it('should allow configuration updates', () => {
			const newConfig = {
				cache: {
					ttl: 30000,
					maxEntries: 200,
					enableDebug: false,
				},
				validation: {
					enableValidation: false,
					throwOnValidationError: false,
				},
			};
			service.updateConfig(newConfig);
			const config = service.getConfig();
			expect(config.cache.ttl).toBe(30000);
			expect(config.cache.maxEntries).toBe(200);
			expect(config.validation.enableValidation).toBe(false);
		});
		it('should return configuration object', () => {
			const config = service.getConfig();
			expect(config).toBeDefined();
			expect(config.cache).toBeDefined();
			expect(config.validation).toBeDefined();
			expect(config.development).toBeDefined();
			expect(typeof config.cache.ttl).toBe('number');
			expect(typeof config.cache.maxEntries).toBe('number');
			expect(typeof config.cache.enableDebug).toBe('boolean');
		});
	});
	describe('Background Video Support', () => {
		it('should retrieve background video for video-text effects', () => {
			const video = service.getBackgroundVideo('brandStatement');
			expect(video).toBeDefined();
			expect(typeof video.src).toBe('string');
			expect(typeof video.fallback).toBe('string');
			expect(typeof video.poster).toBe('string');
			expect(typeof video.alt).toBe('string');
			expect(typeof video.title).toBe('string');
			expect(typeof video.description).toBe('string');
		});
		it('should retrieve all background videos', () => {
			const videos = service.getBackgroundVideos();
			expect(typeof videos).toBe('object');
			expect(videos).not.toBeNull();
		});
	});
	describe('Content Integration', () => {
		it('should retrieve all major content sections', () => {
			expect(() => service.getSiteHeader()).not.toThrow();
			expect(() => service.getHeroContent()).not.toThrow();
			expect(() => service.getTrustIndicators()).not.toThrow();
			expect(() => service.getTestimonials()).not.toThrow();
			expect(() => service.getServices()).not.toThrow();
			expect(() => service.getResultsStatistics()).not.toThrow();
			expect(() => service.getFooterContent()).not.toThrow();
			expect(() => service.getAboutContent()).not.toThrow();
			expect(() => service.getHowItWorksContent()).not.toThrow();
			expect(() => service.getFAQContent()).not.toThrow();
		});
		it('should retrieve all major image assets', () => {
			expect(() => service.getMainLogo()).not.toThrow();
			expect(() => service.getMainLogoWhite()).not.toThrow();
			expect(() => service.getFooterLogo()).not.toThrow();
			expect(() => service.getHeroImage()).not.toThrow();
			expect(() => service.getIntroVideo()).not.toThrow();
			expect(() => service.getFallbackImage()).not.toThrow();
			expect(() => service.getAvatarPlaceholder()).not.toThrow();
		});
	});
});
describe('CMSService Integration', () => {
	it('should integrate properly with existing CMS system', () => {
		const service = cmsService;
		const header = service.getSiteHeader();
		const hero = service.getHeroContent();
		const logo = service.getMainLogo();
		expect(header.siteName).toBeTruthy();
		expect(hero.title).toBeTruthy();
		expect(logo.src).toBeTruthy();
	});
	it('should maintain backward compatibility with legacy functions', () => {
		const {
			getSiteHeader,
			getHeroContent,
			getMainLogo,
		} = require('./cms-content');
		const legacyImportImages = require('./cms-images');
		expect(typeof getSiteHeader).toBe('function');
		expect(typeof getHeroContent).toBe('function');
		expect(typeof legacyImportImages.getMainLogo).toBe('function');
	});
});
