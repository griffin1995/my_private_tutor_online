import { cache } from 'react';
import type {
	BaseCMSContent,
	CMSResponse,
	UnifiedContactData,
	SiteHeader,
	HeroContent,
	TrustIndicator,
	Testimonial,
	Service,
	Statistic,
	FooterContent,
	HowItWorksContent,
	FAQContent,
	AboutContent,
	TestimonialsContent,
	QuoteFormContent,
	FormContent,
	QuoteContent,
	CTASection,
	SiteConfig,
	ContactDetails,
	BusinessDetails,
	PricingInfo,
	NavigationItem,
	ImageAsset,
	VideoAsset,
	BackgroundVideoAsset,
	ResponsiveImageSizes,
	InstitutionLogo,
	TeamMemberImage,
	MediaLogo,
} from './cms-content';
import {
	getSiteHeader,
	getHeroContent,
	getTrustIndicators,
	getTestimonials,
	getServices,
	getResultsStatistics,
	getUnifiedContact,
	getFooterContent,
	getBusinessContent,
	getAboutContent,
	getMainNavigation,
	getSiteBranding,
	getHowItWorksContent,
	getFAQContent,
	getTestimonialsContent,
	getQuotes,
	getFounderQuote,
	getRoyalTestimonial,
	getQuoteFormContent,
	getCTAContent,
	getFormContent,
	getSiteConfig,
	getContactDetails,
	getBusinessDetails,
	getPricingInfo,
	validateContentStructure,
	formatBritishEnglish,
	getCopyrightText,
} from './cms-content';
import {
	getMainLogo,
	getMainLogoWhite,
	getFooterLogo,
	getInstitutionLogos,
	getScrollingSchoolLogos,
	getMediaImages,
	getTutorImages,
	getVideoContent,
	getTestimonialVideos,
	getMarketingAssets,
	getHeroImage,
	getIntroVideo,
	getTeamImages,
	getTestimonialImages,
	getVideoPlaceholders,
	getBackgroundVideo,
	getBackgroundVideos,
	getStudentImages,
	getFallbackImage,
	getAvatarPlaceholder,
	generateResponsiveSizes,
	generateSrcSet,
	getOptimizedImageProps,
	validateImageAccessibility,
	getCriticalImages,
} from './cms-images';
export interface CacheConfig {
	readonly ttl: number;
	readonly maxEntries: number;
	readonly enableDebug: boolean;
}
export interface CacheStats {
	readonly hits: number;
	readonly misses: number;
	readonly size: number;
	readonly hitRate: number;
}
export interface CMSServiceConfig {
	readonly cache: CacheConfig;
	readonly validation: {
		readonly enableValidation: boolean;
		readonly throwOnValidationError: boolean;
	};
	readonly development: {
		readonly enableDebugLogging: boolean;
		readonly logPerformanceMetrics: boolean;
	};
}
export interface ValidationResult<T> {
	readonly isValid: boolean;
	readonly data: T;
	readonly errors: readonly string[];
	readonly warnings: readonly string[];
}
export interface PerformanceMetrics {
	readonly functionName: string;
	readonly executionTime: number;
	readonly cacheHit: boolean;
	readonly timestamp: number;
}
export class CMSService {
	private static instance: CMSService;
	private cache: Map<
		string,
		{
			data: unknown;
			timestamp: number;
			ttl: number;
		}
	> = new Map();
	private cacheStats: {
		hits: number;
		misses: number;
	} = {
		hits: 0,
		misses: 0,
	};
	private performanceMetrics: PerformanceMetrics[] = [];
	private config: CMSServiceConfig = {
		cache: {
			ttl: 5 * 60 * 1000,
			maxEntries: 100,
			enableDebug: process.env.NODE_ENV === 'development',
		},
		validation: {
			enableValidation: true,
			throwOnValidationError: false,
		},
		development: {
			enableDebugLogging: process.env.NODE_ENV === 'development',
			logPerformanceMetrics: process.env.NODE_ENV === 'development',
		},
	};
	private constructor(config?: Partial<CMSServiceConfig>) {
		if (config) {
			this.config = {
				...this.config,
				...config,
			};
		}
		this.initializeService();
	}
	public static getInstance(config?: Partial<CMSServiceConfig>): CMSService {
		if (!CMSService.instance) {
			CMSService.instance = new CMSService(config);
		}
		return CMSService.instance;
	}
	private initializeService(): void {
		if (this.config.development.enableDebugLogging) {
			console.log('🚀 CMSService initialized with configuration:', {
				cacheEnabled: true,
				validationEnabled: this.config.validation.enableValidation,
				debugMode: this.config.development.enableDebugLogging,
			});
		}
		if (this.config.validation.enableValidation) {
			const isValid = validateContentStructure();
			if (!isValid && this.config.validation.throwOnValidationError) {
				throw new Error('CMS content structure validation failed');
			}
		}
	}
	private getCachedContent<T>(
		key: string,
		fetcher: () => T,
		ttl?: number,
	): ValidationResult<T> {
		const startTime = performance.now();
		let cacheHit = false;
		try {
			const cached = this.cache.get(key);
			const now = Date.now();
			if (cached && now - cached.timestamp < (ttl || cached.ttl)) {
				this.cacheStats.hits++;
				cacheHit = true;
				const result: ValidationResult<T> = {
					isValid: true,
					data: cached.data as T,
					errors: [],
					warnings: [],
				};
				this.recordPerformance(key, performance.now() - startTime, cacheHit);
				return result;
			}
			this.cacheStats.misses++;
			const data = fetcher();
			const validationResult = this.validateContent(data);
			this.cache.set(key, {
				data,
				timestamp: now,
				ttl: ttl || this.config.cache.ttl,
			});
			this.enforceMaxCacheSize();
			const result: ValidationResult<T> = {
				isValid: validationResult.isValid,
				data,
				errors: validationResult.errors,
				warnings: validationResult.warnings,
			};
			this.recordPerformance(key, performance.now() - startTime, cacheHit);
			return result;
		} catch (error) {
			this.recordPerformance(key, performance.now() - startTime, cacheHit);
			return {
				isValid: false,
				data: {} as T,
				errors: [`Failed to fetch content for key "${key}": ${error}`],
				warnings: [],
			};
		}
	}
	public getContent<T>(key: string, fetcher: () => T, fallback?: T): T {
		const result = this.getCachedContent(key, fetcher);
		if (!result.isValid) {
			if (this.config.development.enableDebugLogging) {
				console.warn(
					`CMS content validation failed for key "${key}":`,
					result.errors,
				);
			}
			if (fallback !== undefined) {
				return fallback;
			}
		}
		return result.data;
	}
	public getSiteHeader = cache((): SiteHeader => {
		return this.getContent('site-header', getSiteHeader, {
			siteName: 'My Private Tutor Online',
			logo: '/images/logos/logo-with-name.png',
			navigation: [],
		});
	});
	public getHeroContent = cache((): HeroContent => {
		return this.getContent('hero-content', getHeroContent, {
			title: 'Premium Private Tutoring',
			subtitle: 'Excellence in Education',
			description: 'Professional tutoring services',
			image: '/images/hero/child_book_and_laptop.avif',
			imageAlt: 'Student learning',
			ctaButtons: [],
		});
	});
	public getTrustIndicators = cache((): TrustIndicator[] => {
		return this.getContent('trust-indicators', getTrustIndicators, []);
	});
	public getTestimonials = cache((): Testimonial[] => {
		return this.getContent('testimonials', getTestimonials, []);
	});
	public getServices = cache((): readonly Service[] => {
		return this.getContent('services', getServices, []);
	});
	public getResultsStatistics = cache((): Statistic[] => {
		return this.getContent('results-statistics', getResultsStatistics, []);
	});
	public getUnifiedContact = cache((): UnifiedContactData => {
		return this.getContent('unified-contact', getUnifiedContact);
	});
	public getFooterContent = cache((): FooterContent => {
		return this.getContent('footer-content', getFooterContent, {
			companyName: 'My Private Tutor Online',
			description: 'Premium tutoring services',
			sections: [],
		});
	});
	public getBusinessContent = cache(() => {
		return this.getContent('business-content', getBusinessContent, {
			companyName: 'My Private Tutor Online',
			founded: '2010',
			heritage: '15 years of educational excellence',
		});
	});
	public getAboutContent = cache((): AboutContent => {
		return this.getContent('about-content', getAboutContent);
	});
	public getMainNavigation = cache((): NavigationItem[] => {
		return this.getContent('main-navigation', getMainNavigation, []);
	});
	public getSiteBranding = cache(() => {
		return this.getContent('site-branding', getSiteBranding, {
			siteName: 'My Private Tutor Online',
			logo: '/images/logos/logo-with-name.png',
			companyName: 'My Private Tutor Online',
			description: 'Premium tutoring services',
		});
	});
	public getHowItWorksContent = cache((): HowItWorksContent => {
		return this.getContent('how-it-works-content', getHowItWorksContent);
	});
	public getFAQContent = cache((): FAQContent => {
		return this.getContent('faq-content', getFAQContent);
	});
	public getTestimonialsContent = cache((): TestimonialsContent => {
		return this.getContent('testimonials-content', getTestimonialsContent);
	});
	public getQuotes = cache((): QuoteContent => {
		return this.getContent('quotes-content', getQuotes);
	});
	public getFounderQuote = cache(() => {
		return this.getContent('founder-quote', getFounderQuote);
	});
	public getRoyalTestimonial = cache(() => {
		return this.getContent('royal-testimonial', getRoyalTestimonial);
	});
	public getQuoteFormContent = cache((): QuoteFormContent => {
		return this.getContent('quote-form-content', getQuoteFormContent);
	});
	public getCTAContent = cache((): CTASection => {
		return this.getContent('cta-content', getCTAContent);
	});
	public getFormContent = cache((): FormContent => {
		return this.getContent('form-content', getFormContent);
	});
	public getSiteConfig = cache((): SiteConfig => {
		return this.getContent('site-config', getSiteConfig);
	});
	public getContactDetails = cache((): ContactDetails => {
		return this.getContent('contact-details', getContactDetails);
	});
	public getBusinessDetails = cache((): BusinessDetails => {
		return this.getContent('business-details', getBusinessDetails);
	});
	public getPricingInfo = cache((): PricingInfo => {
		return this.getContent('pricing-info', getPricingInfo);
	});
	public getMainLogo = cache((): ImageAsset => {
		return this.getContent('main-logo', getMainLogo, {
			src: '/images/logos/logo-with-name.png',
			alt: 'My Private Tutor Online',
			width: 200,
			height: 80,
			loading: 'eager' as const,
			priority: true,
		});
	});
	public getMainLogoWhite = cache((): ImageAsset => {
		return this.getContent('main-logo-white', getMainLogoWhite, {
			src: '/images/logos/logo-with-name-white.png',
			alt: 'My Private Tutor Online',
			width: 200,
			height: 80,
			loading: 'eager' as const,
			priority: true,
		});
	});
	public getFooterLogo = cache((): ImageAsset => {
		return this.getContent('footer-logo', getFooterLogo);
	});
	public getInstitutionLogos = cache(() => {
		return this.getContent('institution-logos', getInstitutionLogos, {});
	});
	public getScrollingSchoolLogos = cache(() => {
		return this.getContent('scrolling-school-logos', getScrollingSchoolLogos, {});
	});
	public getMediaImages = cache(() => {
		return this.getContent('media-images', getMediaImages, {});
	});
	public getTutorImages = cache(() => {
		return this.getContent('tutor-images', getTutorImages, {});
	});
	public getVideoContent = cache(() => {
		return this.getContent('video-content', getVideoContent, {});
	});
	public getTestimonialVideos = cache(() => {
		return this.getContent('testimonial-videos', getTestimonialVideos, []);
	});
	public getMarketingAssets = cache(() => {
		return this.getContent('marketing-assets', getMarketingAssets, {});
	});
	public getHeroImage = cache((): ImageAsset => {
		return this.getContent('hero-image', getHeroImage);
	});
	public getIntroVideo = cache((): ImageAsset => {
		return this.getContent('intro-video', getIntroVideo);
	});
	public getTeamImages = cache(() => {
		return this.getContent('team-images', getTeamImages, {});
	});
	public getTestimonialImages = cache(() => {
		return this.getContent('testimonial-images', getTestimonialImages, {});
	});
	public getVideoPlaceholders = cache(() => {
		return this.getContent('video-placeholders', getVideoPlaceholders, {});
	});
	public getBackgroundVideo = cache((videoKey: string): BackgroundVideoAsset => {
		return this.getContent(`background-video-${videoKey}`, () =>
			getBackgroundVideo(videoKey as any),
		);
	});
	public getBackgroundVideos = cache(() => {
		return this.getContent('background-videos', getBackgroundVideos, {});
	});
	public getStudentImages = cache(() => {
		return this.getContent('student-images', getStudentImages, {});
	});
	public getFallbackImage = cache((): ImageAsset => {
		return this.getContent('fallback-image', getFallbackImage, {
			src: '/images/placeholder.svg',
			alt: 'Placeholder image',
			width: 400,
			height: 300,
			loading: 'lazy' as const,
		});
	});
	public getAvatarPlaceholder = cache((): ImageAsset => {
		return this.getContent('avatar-placeholder', getAvatarPlaceholder);
	});
	public generateResponsiveSizes(baseWidth: number): ResponsiveImageSizes {
		return generateResponsiveSizes(baseWidth);
	}
	public generateSrcSet(src: string, sizes: Record<string, number>): string {
		return generateSrcSet(src, sizes);
	}
	public getOptimizedImageProps(image: ImageAsset, customSizes?: string) {
		return getOptimizedImageProps(image, customSizes);
	}
	public formatBritishEnglish(text: string): string {
		return formatBritishEnglish(text);
	}
	public getCopyrightText(): string {
		return getCopyrightText();
	}
	public getCriticalImages = cache((): readonly ImageAsset[] => {
		return this.getContent('critical-images', getCriticalImages, []);
	});
	public validateContent<T>(content: T): ValidationResult<T> {
		const errors: string[] = [];
		const warnings: string[] = [];
		try {
			if (!content) {
				errors.push('Content is null or undefined');
				return {
					isValid: false,
					data: content,
					errors,
					warnings,
				};
			}
			if (typeof content === 'object' && content !== null) {
				if (Object.keys(content).length === 0) {
					warnings.push('Content object is empty');
				}
				if ('src' in content && 'alt' in content) {
					const imageAsset = content as unknown as ImageAsset;
					if (!validateImageAccessibility(imageAsset)) {
						warnings.push('Image accessibility validation failed');
					}
				}
			}
			return {
				isValid: errors.length === 0,
				data: content,
				errors,
				warnings,
			};
		} catch (error) {
			errors.push(`Validation error: ${error}`);
			return {
				isValid: false,
				data: content,
				errors,
				warnings,
			};
		}
	}
	public validateContentStructure(): boolean {
		return validateContentStructure();
	}
	public validateImageAccessibility(image: ImageAsset): boolean {
		return validateImageAccessibility(image);
	}
	public clearCache(): void {
		this.cache.clear();
		this.cacheStats = {
			hits: 0,
			misses: 0,
		};
		if (this.config.development.enableDebugLogging) {
			console.log('🗑️  CMSService cache cleared');
		}
	}
	public clearCacheEntry(key: string): boolean {
		const deleted = this.cache.delete(key);
		if (this.config.development.enableDebugLogging && deleted) {
			console.log(`🗑️  Cache entry cleared: ${key}`);
		}
		return deleted;
	}
	public getCacheStats(): CacheStats {
		const totalRequests = this.cacheStats.hits + this.cacheStats.misses;
		const hitRate =
			totalRequests > 0 ? (this.cacheStats.hits / totalRequests) * 100 : 0;
		return {
			hits: this.cacheStats.hits,
			misses: this.cacheStats.misses,
			size: this.cache.size,
			hitRate: Math.round(hitRate * 100) / 100,
		};
	}
	public getPerformanceMetrics(): readonly PerformanceMetrics[] {
		return [...this.performanceMetrics];
	}
	public clearPerformanceMetrics(): void {
		this.performanceMetrics = [];
	}
	public setDebugLogging(enabled: boolean): void {
		this.config.development.enableDebugLogging = enabled;
	}
	public getConfig(): CMSServiceConfig {
		return {
			...this.config,
		};
	}
	public updateConfig(config: Partial<CMSServiceConfig>): void {
		this.config = {
			...this.config,
			...config,
		};
	}
	public getCacheDebugInfo(): {
		readonly entries: Array<{
			readonly key: string;
			readonly timestamp: number;
			readonly ttl: number;
			readonly age: number;
			readonly expired: boolean;
		}>;
		readonly stats: CacheStats;
	} {
		const now = Date.now();
		const entries = Array.from(this.cache.entries()).map(([key, value]) => ({
			key,
			timestamp: value.timestamp,
			ttl: value.ttl,
			age: now - value.timestamp,
			expired: now - value.timestamp > value.ttl,
		}));
		return {
			entries,
			stats: this.getCacheStats(),
		};
	}
	private recordPerformance(
		functionName: string,
		executionTime: number,
		cacheHit: boolean,
	): void {
		if (!this.config.development.logPerformanceMetrics) {
			return;
		}
		const metric: PerformanceMetrics = {
			functionName,
			executionTime,
			cacheHit,
			timestamp: Date.now(),
		};
		this.performanceMetrics.push(metric);
		if (this.performanceMetrics.length > 100) {
			this.performanceMetrics = this.performanceMetrics.slice(-100);
		}
		if (this.config.development.enableDebugLogging && executionTime > 10) {
			console.log(
				`⚡ CMS ${functionName}: ${executionTime.toFixed(2)}ms ${cacheHit ? '(cached)' : '(fresh)'}`,
			);
		}
	}
	private enforceMaxCacheSize(): void {
		if (this.cache.size <= this.config.cache.maxEntries) {
			return;
		}
		const entries = Array.from(this.cache.entries());
		entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
		const entriesToRemove = this.cache.size - this.config.cache.maxEntries;
		for (let i = 0; i < entriesToRemove; i++) {
			this.cache.delete(entries[i][0]);
		}
		if (this.config.development.enableDebugLogging) {
			console.log(
				`🧹 Cache size limit enforced: removed ${entriesToRemove} entries`,
			);
		}
	}
}
export const createCMSService = (
	config?: Partial<CMSServiceConfig>,
): CMSService => {
	return CMSService.getInstance(config);
};
export const cmsService = CMSService.getInstance();
export default CMSService;
