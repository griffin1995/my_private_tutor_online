export const ISR_REVALIDATION = {
	STATIC_PAGES: 86400,
	TESTIMONIALS: 43200,
	BLOG_POSTS: 3600,
	FAQ_CONTENT: 7200,
	PRICING: 21600,
	SEARCH_RESULTS: 900,
	USER_CONTENT: 300,
	ANALYTICS: 60,
	IMMEDIATE: 1,
} as const;
export const CONTENT_CATEGORIES = {
	CRITICAL: {
		paths: ['/', '/how-it-works', '/subject-tuition'],
		revalidate: ISR_REVALIDATION.STATIC_PAGES,
		priority: 'high' as const,
		description: 'Critical landing pages for royal client experience',
	},
	MARKETING: {
		paths: ['/about', '/testimonials', '/expert-educators'],
		revalidate: ISR_REVALIDATION.TESTIMONIALS,
		priority: 'high' as const,
		description: 'Marketing pages for conversion optimization',
	},
	CONTENT: {
		paths: ['/blog', '/faq', '/resources'],
		revalidate: ISR_REVALIDATION.BLOG_POSTS,
		priority: 'medium' as const,
		description: 'Content pages for SEO and user engagement',
	},
	DYNAMIC: {
		paths: ['/search', '/contact', '/booking'],
		revalidate: ISR_REVALIDATION.USER_CONTENT,
		priority: 'medium' as const,
		description: 'Dynamic pages with user interactions',
	},
	ADMIN: {
		paths: ['/admin', '/dashboard'],
		revalidate: ISR_REVALIDATION.ANALYTICS,
		priority: 'low' as const,
		description: 'Admin pages with real-time data',
	},
} as const;
export const CACHE_TAGS = {
	CONTENT: 'content',
	TESTIMONIALS: 'testimonials',
	BLOG: 'blog',
	FAQ: 'faq',
	PRICING: 'pricing',
	USER_PROFILES: 'user-profiles',
	USER_PREFERENCES: 'user-preferences',
	ANALYTICS: 'analytics',
	PERFORMANCE: 'performance',
	SYSTEM: 'system',
	CMS: 'cms',
	API: 'api',
} as const;
export class ISRConfig {
	public static getRevalidationInterval(path: string): number {
		for (const [categoryName, category] of Object.entries(CONTENT_CATEGORIES)) {
			if (
				category.paths.some(
					(categoryPath) => path.startsWith(categoryPath) || path === categoryPath,
				)
			) {
				return category.revalidate;
			}
		}
		return ISR_REVALIDATION.BLOG_POSTS;
	}
	public static getContentPriority(path: string): 'high' | 'medium' | 'low' {
		for (const category of Object.values(CONTENT_CATEGORIES)) {
			if (
				category.paths.some(
					(categoryPath) => path.startsWith(categoryPath) || path === categoryPath,
				)
			) {
				return category.priority;
			}
		}
		return 'medium';
	}
	public static getCacheTags(contentType: string, id?: string): string[] {
		const baseTags = [CACHE_TAGS.CONTENT];
		switch (contentType) {
			case 'testimonial':
				baseTags.push(CACHE_TAGS.TESTIMONIALS);
				break;
			case 'blog':
				baseTags.push(CACHE_TAGS.BLOG);
				break;
			case 'faq':
				baseTags.push(CACHE_TAGS.FAQ);
				break;
			case 'pricing':
				baseTags.push(CACHE_TAGS.PRICING);
				break;
			case 'user':
				baseTags.push(CACHE_TAGS.USER_PROFILES);
				break;
			case 'cms':
				baseTags.push(CACHE_TAGS.CMS);
				break;
			default:
				baseTags.push(CACHE_TAGS.API);
		}
		if (id) {
			baseTags.push(`${contentType}:${id}`);
		}
		return baseTags;
	}
	public static async generateCriticalPaths(): Promise<
		Array<{
			params: any;
		}>
	> {
		try {
			const criticalPaths = [
				{
					params: {
						slug: [],
					},
				},
				{
					params: {
						slug: ['how-it-works'],
					},
				},
				{
					params: {
						slug: ['subject-tuition'],
					},
				},
				{
					params: {
						slug: ['about'],
					},
				},
				{
					params: {
						slug: ['subject-tuition', 'mathematics'],
					},
				},
				{
					params: {
						slug: ['subject-tuition', 'english'],
					},
				},
				{
					params: {
						slug: ['subject-tuition', 'science'],
					},
				},
				{
					params: {
						slug: ['11-plus-bootcamps'],
					},
				},
				{
					params: {
						slug: ['oxbridge-preparation'],
					},
				},
			];
			return criticalPaths;
		} catch (error) {
			console.error('🚨 Failed to generate critical paths:', error);
			return [];
		}
	}
	public static getFallbackStrategy(contentType: string): 'blocking' | boolean {
		if (contentType === 'critical' || contentType === 'marketing') {
			return 'blocking';
		}
		return true;
	}
	public static getDebugConfig(): Record<string, any> {
		const isProduction = process.env.NODE_ENV === 'production';
		const isDevelopment = process.env.NODE_ENV === 'development';
		return {
			enableDebugCache:
				isDevelopment || process.env.NEXT_PRIVATE_DEBUG_CACHE === '1',
			logCacheHits: isDevelopment,
			logRevalidation: true,
			cacheMetrics: true,
			isProduction,
			isDevelopment,
		};
	}
	public static async trackISRPerformance(
		path: string,
		isHit: boolean,
		regenerationTime?: number,
	): Promise<void> {
		try {
			const metrics = {
				path,
				isHit,
				regenerationTime,
				timestamp: new Date().toISOString(),
				priority: ISRConfig.getContentPriority(path),
				revalidateInterval: ISRConfig.getRevalidationInterval(path),
			};
			if (typeof window === 'undefined') {
				console.log('📊 ISR Performance:', metrics);
				await fetch('/api/monitoring/isr', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(metrics),
				}).catch(() => {});
			}
		} catch (error) {
			console.warn('⚠️ ISR performance tracking failed:', error);
		}
	}
}
export default ISRConfig;
export type ContentCategory = keyof typeof CONTENT_CATEGORIES;
export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];
