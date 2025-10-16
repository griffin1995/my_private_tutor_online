import { Metadata } from 'next';
export const ROBOTS_CONFIG = {
	PREMIUM: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	STANDARD: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			'max-snippet': 200,
			'max-image-preview': 'standard',
		},
	},
	RESTRICTED: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: false,
			follow: false,
			noimageindex: true,
		},
	},
	LANDING: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
} as const;
export const OPENGRAPH_TEMPLATES = {
	HOMEPAGE: {
		type: 'website',
		siteName: 'My Private Tutor Online',
		locale: 'en_GB',
		countryName: 'United Kingdom',
		images: [
			{
				url: '/images/og/homepage-og.webp',
				width: 1200,
				height: 630,
				alt: 'My Private Tutor Online - Premium Tutoring with Royal Endorsements',
				type: 'image/webp',
			},
			{
				url: '/images/og/homepage-og-square.webp',
				width: 1200,
				height: 1200,
				alt: 'My Private Tutor Online - Elite Education Services',
				type: 'image/webp',
			},
		],
	},
	SERVICE: {
		type: 'website',
		siteName: 'My Private Tutor Online',
		locale: 'en_GB',
		images: [
			{
				width: 1200,
				height: 630,
				type: 'image/webp',
			},
		],
	},
	ARTICLE: {
		type: 'article',
		siteName: 'My Private Tutor Online',
		locale: 'en_GB',
		authors: ['My Private Tutor Online Editorial Team'],
		section: 'Education',
		tags: ['tutoring', 'education', 'oxbridge', 'premium'],
	},
	COURSE: {
		type: 'website',
		siteName: 'My Private Tutor Online',
		locale: 'en_GB',
		images: [
			{
				width: 1200,
				height: 630,
				type: 'image/webp',
			},
		],
	},
} as const;
export class CanonicalUrlManager {
	private static readonly BASE_URL = 'https://myprivatetutoronline.co.uk';
	public static generateCanonical(path: string): string {
		const cleanPath = path.startsWith('/') ? path.slice(1) : path;
		const normalizedPath =
			cleanPath.endsWith('/') && cleanPath !== '' ?
				cleanPath.slice(0, -1)
			:	cleanPath;
		return normalizedPath ? `${this.BASE_URL}/${normalizedPath}` : this.BASE_URL;
	}
	public static generateAlternates(path: string): Record<string, string> {
		const canonical = this.generateCanonical(path);
		return {
			canonical,
			languages: {
				'en-GB': canonical,
				en: canonical,
				'x-default': canonical,
			},
		};
	}
	public static generateSitemapUrls(): string[] {
		const baseUrls = [
			'',
			'about',
			'how-it-works',
			'subject-tuition',
			'expert-educators',
			'testimonials',
			'contact',
			'faq',
			'blog',
		];
		return baseUrls.map((url) => this.generateCanonical(url));
	}
}
export class MetadataGenerator {
	public static generatePageMetadata(config: {
		title: string;
		description: string;
		path: string;
		type?: 'homepage' | 'service' | 'article' | 'course';
		keywords?: string[];
		images?: Array<{
			url: string;
			alt: string;
			width?: number;
			height?: number;
		}>;
		publishedTime?: string;
		modifiedTime?: string;
		authors?: string[];
	}): Metadata {
		const {
			title,
			description,
			path,
			type = 'service',
			keywords = [],
			images = [],
			publishedTime,
			modifiedTime,
			authors,
		} = config;
		const canonical = CanonicalUrlManager.generateCanonical(path);
		const alternates = CanonicalUrlManager.generateAlternates(path);
		let ogTemplate = OPENGRAPH_TEMPLATES.SERVICE;
		let robotsConfig = ROBOTS_CONFIG.STANDARD;
		switch (type) {
			case 'homepage':
				ogTemplate = OPENGRAPH_TEMPLATES.HOMEPAGE;
				robotsConfig = ROBOTS_CONFIG.PREMIUM;
				break;
			case 'article':
				ogTemplate = OPENGRAPH_TEMPLATES.ARTICLE;
				robotsConfig = ROBOTS_CONFIG.STANDARD;
				break;
			case 'course':
				ogTemplate = OPENGRAPH_TEMPLATES.COURSE;
				robotsConfig = ROBOTS_CONFIG.LANDING;
				break;
			default:
				ogTemplate = OPENGRAPH_TEMPLATES.SERVICE;
				robotsConfig = ROBOTS_CONFIG.STANDARD;
		}
		const processedImages =
			images.length > 0 ?
				images.map((img) => ({
					url: img.url,
					width: img.width || 1200,
					height: img.height || 630,
					alt: img.alt,
					type: 'image/webp',
				}))
			:	ogTemplate.images;
		const metadata: Metadata = {
			title,
			description,
			keywords: [
				'premium tutoring',
				'royal endorsed education',
				'oxbridge preparation',
				'elite tutoring UK',
				'private tuition',
				...keywords,
			],
			authors:
				authors ?
					authors.map((name) => ({
						name,
					}))
				:	undefined,
			creator: 'My Private Tutor Online',
			publisher: 'My Private Tutor Online Ltd',
			robots: robotsConfig,
			openGraph: {
				...ogTemplate,
				title,
				description,
				url: canonical,
				images: processedImages,
				publishedTime,
				modifiedTime,
				...(authors &&
					type === 'article' && {
						authors,
					}),
			},
			twitter: {
				card: 'summary_large_image',
				title,
				description,
				images: processedImages.map((img) => img.url),
				creator: '@myprivatetutoronline',
				site: '@myprivatetutoronline',
			},
			alternates,
			category: 'Education',
			classification: 'Education Services',
			referrer: 'origin-when-cross-origin',
			formatDetection: {
				email: true,
				address: true,
				telephone: true,
			},
			verification: {
				google: process.env.GOOGLE_SITE_VERIFICATION,
				yandex: process.env.YANDEX_VERIFICATION,
				other: {
					'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
					'facebook-domain-verification':
						process.env.FACEBOOK_DOMAIN_VERIFICATION || '',
				},
			},
		};
		return metadata;
	}
	public static generateSubjectMetadata(
		subject: string,
		subjectData: any,
	): Metadata {
		const subjectTitle = `${subjectData.displayName} Tutoring | Expert ${subjectData.displayName} Tuition | My Private Tutor Online`;
		const subjectDescription = `Expert ${subjectData.displayName} tutoring with royal endorsements. 15+ years experience, Oxbridge specialists, proven results. ${subjectData.description}`;
		return this.generatePageMetadata({
			title: subjectTitle,
			description: subjectDescription,
			path: `subject-tuition/${subject}`,
			type: 'course',
			keywords: [
				`${subjectData.displayName.toLowerCase()} tutoring`,
				`${subjectData.displayName.toLowerCase()} tuition`,
				`private ${subjectData.displayName.toLowerCase()} tutor`,
				'royal endorsed tutoring',
				'oxbridge preparation',
				...subjectData.keywords,
			],
			images: [
				{
					url: `/images/subjects/${subject}-tutoring.webp`,
					alt: `${subjectData.displayName} Tutoring Services`,
					width: 1200,
					height: 630,
				},
			],
		});
	}
	public static generateBlogMetadata(post: {
		title: string;
		excerpt: string;
		slug: string;
		publishedAt: string;
		updatedAt?: string;
		author: string;
		tags: string[];
		featuredImage?: string;
	}): Metadata {
		return this.generatePageMetadata({
			title: `${post.title} | My Private Tutor Online Blog`,
			description: post.excerpt,
			path: `blog/${post.slug}`,
			type: 'article',
			keywords: post.tags,
			publishedTime: post.publishedAt,
			modifiedTime: post.updatedAt || post.publishedAt,
			authors: [post.author],
			images:
				post.featuredImage ?
					[
						{
							url: post.featuredImage,
							alt: post.title,
							width: 1200,
							height: 630,
						},
					]
				:	undefined,
		});
	}
}
export class TechnicalSEOOptimizer {
	public static generatePreloadLinks(): Array<{
		rel: string;
		href: string;
		as: string;
		type?: string;
		crossOrigin?: string;
	}> {
		return [
			{
				rel: 'preload',
				href: '/fonts/inter-var.woff2',
				as: 'font',
				type: 'font/woff2',
				crossOrigin: 'anonymous',
			},
			{
				rel: 'preload',
				href: '/css/critical.css',
				as: 'style',
			},
			{
				rel: 'preload',
				href: '/images/hero/hero-main.webp',
				as: 'image',
				type: 'image/webp',
			},
		];
	}
	public static generateDNSPrefetch(): string[] {
		return [
			'https://fonts.googleapis.com',
			'https://fonts.gstatic.com',
			'https://www.google-analytics.com',
			'https://www.googletagmanager.com',
			'https://connect.facebook.net',
			'https://www.linkedin.com',
		];
	}
	public static generateBreadcrumbStructuredData(
		breadcrumbs: Array<{
			name: string;
			url: string;
		}>,
	): Record<string, any> {
		return {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((crumb, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: crumb.name,
				item: {
					'@type': 'WebPage',
					'@id': crumb.url,
				},
			})),
		};
	}
	public static generateFAQStructuredData(
		faqs: Array<{
			question: string;
			answer: string;
		}>,
	): Record<string, any> {
		return {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer,
				},
			})),
		};
	}
}
export default {
	MetadataGenerator,
	CanonicalUrlManager,
	TechnicalSEOOptimizer,
	ROBOTS_CONFIG,
	OPENGRAPH_TEMPLATES,
};
