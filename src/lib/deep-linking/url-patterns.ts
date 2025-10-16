export interface DeepLinkPattern {
	pattern: string;
	description: string;
	example: string;
	supports: ('ios' | 'android' | 'web' | 'pwa')[];
	priority: number;
}
export const FAQ_DEEP_LINK_PATTERNS: Record<string, DeepLinkPattern> = {
	faq_home: {
		pattern: '/faq',
		description: 'FAQ home page with all categories and search',
		example: 'https://myprivatetutoronline.com/faq',
		supports: ['ios', 'android', 'web', 'pwa'],
		priority: 1,
	},
	faq_category: {
		pattern: '/faq/category/:categoryId',
		description: 'Specific FAQ category with questions',
		example: 'https://myprivatetutoronline.com/faq/category/general',
		supports: ['ios', 'android', 'web', 'pwa'],
		priority: 2,
	},
	faq_question: {
		pattern: '/faq/question/:questionId',
		description: 'Direct link to specific FAQ question',
		example: 'https://myprivatetutoronline.com/faq/question/123',
		supports: ['ios', 'android', 'web', 'pwa'],
		priority: 3,
	},
	faq_search: {
		pattern: '/faq/search',
		description: 'FAQ search with query parameters',
		example:
			'https://myprivatetutoronline.com/faq/search?q=oxbridge&category=academic',
		supports: ['ios', 'android', 'web', 'pwa'],
		priority: 2,
	},
	faq_theme: {
		pattern: '/faq/theme/:theme',
		description: 'FAQ page with specific theme applied',
		example: 'https://myprivatetutoronline.com/faq/theme/dark',
		supports: ['ios', 'android', 'web', 'pwa'],
		priority: 4,
	},
	faq_contact: {
		pattern: '/faq#contact',
		description: 'FAQ page scrolled to contact section',
		example: 'https://myprivatetutoronline.com/faq#contact',
		supports: ['ios', 'android', 'web', 'pwa'],
		priority: 3,
	},
};
export interface FAQDeepLinkParams {
	categoryId?: string;
	questionId?: string;
	searchQuery?: string;
	theme?: string;
	source?: 'universal_link' | 'app_link' | 'pwa' | 'web' | 'share';
	timestamp?: number;
}
export function parseDeepLinkURL(url: string): {
	pattern: string | null;
	params: FAQDeepLinkParams;
	isValid: boolean;
} {
	try {
		const urlObj = new URL(url);
		const pathname = urlObj.pathname;
		const searchParams = urlObj.searchParams;
		const hash = urlObj.hash;
		for (const [key, pattern] of Object.entries(FAQ_DEEP_LINK_PATTERNS)) {
			if (matchesPattern(pathname + hash, pattern.pattern)) {
				const params = extractParams(pathname, hash, searchParams, pattern.pattern);
				return {
					pattern: key,
					params,
					isValid: true,
				};
			}
		}
		return {
			pattern: null,
			params: {},
			isValid: false,
		};
	} catch (error) {
		console.warn('Failed to parse deep link URL:', error);
		return {
			pattern: null,
			params: {},
			isValid: false,
		};
	}
}
function matchesPattern(url: string, pattern: string): boolean {
	const regexPattern = pattern
		.replace(/:[^/]+/g, '([^/]+)')
		.replace(/\//g, '\\/')
		.replace(/\*/g, '.*');
	const regex = new RegExp(`^${regexPattern}$`);
	return regex.test(url);
}
function extractParams(
	pathname: string,
	hash: string,
	searchParams: URLSearchParams,
	pattern: string,
): FAQDeepLinkParams {
	const params: FAQDeepLinkParams = {
		timestamp: Date.now(),
	};
	if (pattern.includes(':categoryId')) {
		const match = pathname.match(/\/category\/([^/]+)/);
		if (match) params.categoryId = match[1];
	}
	if (pattern.includes(':questionId')) {
		const match = pathname.match(/\/question\/([^/]+)/);
		if (match) params.questionId = match[1];
	}
	if (pattern.includes(':theme')) {
		const match = pathname.match(/\/theme\/([^/]+)/);
		if (match) params.theme = match[1];
	}
	if (searchParams.has('q')) {
		params.searchQuery = searchParams.get('q') || undefined;
	}
	if (searchParams.has('query')) {
		params.searchQuery = searchParams.get('query') || undefined;
	}
	if (searchParams.has('source')) {
		const source = searchParams.get('source');
		if (
			source &&
			['universal_link', 'app_link', 'pwa', 'web', 'share'].includes(source)
		) {
			params.source = source as FAQDeepLinkParams['source'];
		}
	}
	return params;
}
export function generateDeepLink(
	pattern: keyof typeof FAQ_DEEP_LINK_PATTERNS,
	params: Partial<FAQDeepLinkParams>,
	options: {
		baseUrl?: string;
		includeSource?: boolean;
		platform?: 'ios' | 'android' | 'web' | 'pwa';
	} = {},
): string {
	const {
		baseUrl = 'https://myprivatetutoronline.com',
		includeSource = true,
		platform = 'web',
	} = options;
	const linkPattern = FAQ_DEEP_LINK_PATTERNS[pattern];
	if (!linkPattern) {
		throw new Error(`Unknown deep link pattern: ${pattern}`);
	}
	let url = linkPattern.pattern;
	if (params.categoryId) {
		url = url.replace(':categoryId', params.categoryId);
	}
	if (params.questionId) {
		url = url.replace(':questionId', params.questionId);
	}
	if (params.theme) {
		url = url.replace(':theme', params.theme);
	}
	const searchParams = new URLSearchParams();
	if (params.searchQuery) {
		searchParams.set('q', params.searchQuery);
	}
	if (includeSource && platform) {
		searchParams.set(
			'source',
			platform === 'ios' ? 'universal_link'
			: platform === 'android' ? 'app_link'
			: platform,
		);
	}
	const queryString = searchParams.toString();
	const fullUrl = baseUrl + url + (queryString ? '?' + queryString : '');
	return fullUrl;
}
export function validateDeepLink(url: string): {
	isValid: boolean;
	errors: string[];
	suggestions?: string[];
} {
	const errors: string[] = [];
	const suggestions: string[] = [];
	try {
		const urlObj = new URL(url);
		if (!urlObj.hostname.includes('myprivatetutoronline.com')) {
			errors.push('Invalid domain - must be myprivatetutoronline.com');
		}
		if (!['https:', 'http:'].includes(urlObj.protocol)) {
			errors.push('Invalid protocol - must be http or https');
		}
		const parseResult = parseDeepLinkURL(url);
		if (!parseResult.isValid) {
			errors.push('URL does not match any supported deep link pattern');
			suggestions.push(
				'Try using /faq, /faq/category/[category], or /faq/search?q=[query]',
			);
		}
		return {
			isValid: errors.length === 0,
			errors,
			suggestions: suggestions.length > 0 ? suggestions : undefined,
		};
	} catch (error) {
		return {
			isValid: false,
			errors: ['Invalid URL format'],
			suggestions: ['Ensure URL includes protocol (https://) and valid domain'],
		};
	}
}
export function detectPlatform(): 'ios' | 'android' | 'web' | 'pwa' {
	if (typeof window === 'undefined') return 'web';
	const userAgent = window.navigator.userAgent;
	const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
	const isPWA = isStandalone || (window.navigator as any).standalone === true;
	if (isPWA) return 'pwa';
	if (/iPhone|iPad|iPod/.test(userAgent)) return 'ios';
	if (/Android/.test(userAgent)) return 'android';
	return 'web';
}
export interface DeepLinkAnalytics {
	pattern: string;
	params: FAQDeepLinkParams;
	platform: 'ios' | 'android' | 'web' | 'pwa';
	timestamp: number;
	userAgent?: string;
	referrer?: string;
	conversionGoal?: 'consultation' | 'contact' | 'phone' | 'enquiry';
}
export function trackDeepLinkUsage(
	pattern: string,
	params: FAQDeepLinkParams,
	options: {
		conversionGoal?: DeepLinkAnalytics['conversionGoal'];
		customProperties?: Record<string, any>;
	} = {},
): DeepLinkAnalytics {
	const analytics: DeepLinkAnalytics = {
		pattern,
		params,
		platform: detectPlatform(),
		timestamp: Date.now(),
		userAgent:
			typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
		referrer: typeof document !== 'undefined' ? document.referrer : undefined,
		conversionGoal: options.conversionGoal,
	};
	if (typeof window !== 'undefined' && (window as any).gtag) {
		(window as any).gtag('event', 'deep_link_accessed', {
			event_category: 'FAQ Deep Linking',
			event_label: pattern,
			custom_parameters: {
				deep_link_pattern: pattern,
				deep_link_platform: analytics.platform,
				deep_link_category: params.categoryId,
				deep_link_question: params.questionId,
				deep_link_search: params.searchQuery,
				deep_link_theme: params.theme,
				deep_link_source: params.source,
				conversion_goal: options.conversionGoal,
				revenue_opportunity: 150,
				...options.customProperties,
			},
		});
	}
	return analytics;
}
