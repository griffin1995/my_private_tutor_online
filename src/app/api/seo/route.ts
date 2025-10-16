import { NextRequest, NextResponse } from 'next/server';
export const revalidate = 1800;
interface PageMetadata {
	path: string;
	title: string;
	description: string;
	keywords: string[];
	canonicalUrl?: string;
	openGraph: {
		title: string;
		description: string;
		image: string;
		type: string;
		url: string;
		siteName: string;
	};
	twitterCard: {
		card: 'summary' | 'summary_large_image' | 'app' | 'player';
		site: string;
		title: string;
		description: string;
		image: string;
	};
	structuredData: Array<Record<string, any>>;
	lastModified: string;
	priority: number;
	robots: {
		index: boolean;
		follow: boolean;
		noarchive?: boolean;
		nosnippet?: boolean;
		noimageindex?: boolean;
	};
}
interface SEOConfiguration {
	siteName: string;
	defaultTitle: string;
	titleTemplate: string;
	defaultDescription: string;
	defaultImage: string;
	defaultKeywords: string[];
	organizationSchema: Record<string, any>;
	localBusinessSchema: Record<string, any>;
}
const DEFAULT_SEO_CONFIG: SEOConfiguration = {
	siteName: 'My Private Tutor Online',
	defaultTitle: 'Premium Private Tutoring | My Private Tutor Online',
	titleTemplate: '%s | My Private Tutor Online',
	defaultDescription:
		'Elite private tutoring services with royal endorsements. Oxbridge preparation, 11+ support, and premium educational excellence for discerning families.',
	defaultImage:
		'https://myprivatetutoronline.com/images/hero/premium-tutoring-og.jpg',
	defaultKeywords: [
		'private tutoring',
		'premium education',
		'oxbridge preparation',
		'11 plus tutoring',
		'royal endorsed tutoring',
		'elite education',
		'tatler recommended',
	],
	organizationSchema: {
		'@context': 'https://schema.org',
		'@type': 'EducationalOrganization',
		name: 'My Private Tutor Online',
		alternateName: 'MPTO',
		url: 'https://myprivatetutoronline.com',
		logo: 'https://myprivatetutoronline.com/images/logos/logo-with-name.png',
		description:
			'Premium private tutoring services with royal endorsements, serving elite families since 2010.',
		foundingDate: '2010',
		founder: {
			'@type': 'Person',
			name: 'Elizabeth Burrows',
			image:
				'https://myprivatetutoronline.com/images/team/elizabeth-burrows-founder-main.jpg',
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+44-20-XXXX-XXXX',
			contactType: 'customer service',
			availableLanguage: 'English',
		},
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'GB',
			addressRegion: 'London',
		},
		sameAs: ['https://www.tatler.com/address-book'],
	},
	localBusinessSchema: {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'My Private Tutor Online',
		description: 'Premium private tutoring services with royal endorsements.',
		url: 'https://myprivatetutoronline.com',
		telephone: '+44-20-XXXX-XXXX',
		priceRange: '£££',
		openingHours: 'Mo-Fr 09:00-18:00, Sa 09:00-14:00',
		serviceArea: {
			'@type': 'Country',
			name: 'United Kingdom',
		},
	},
};
const PAGE_METADATA: Record<string, Partial<PageMetadata>> = {
	'/': {
		title:
			'Premium Private Tutoring with Royal Endorsements | My Private Tutor Online',
		description:
			'Elite private tutoring services featured in Tatler Address Book 2025. Oxbridge preparation, 11+ support, and premium educational excellence for discerning families.',
		keywords: [
			'premium private tutoring',
			'royal endorsed education',
			'tatler tutoring',
			'oxbridge preparation',
			'elite tutoring services',
		],
		priority: 1.0,
		structuredData: [
			DEFAULT_SEO_CONFIG.organizationSchema,
			DEFAULT_SEO_CONFIG.localBusinessSchema,
		],
	},
	'/about': {
		title:
			'About Our Royal Endorsed Tutoring Service | Premium Education Excellence',
		description:
			'Discover our 15-year heritage of premium tutoring excellence, royal endorsements, and Tatler recognition. Elite educational services for discerning families.',
		keywords: [
			'premium tutoring history',
			'royal endorsed education',
			'elizabeth burrows founder',
			'tatler address book',
			'elite tutoring heritage',
		],
		priority: 0.9,
	},
	'/subject-tuition': {
		title: 'Premium Subject Tutoring | Expert Educators for Academic Excellence',
		description:
			'Comprehensive subject tutoring from expert educators. Mathematics, English, Sciences, and Humanities taught to premium standards for academic excellence.',
		keywords: [
			'subject tutoring',
			'academic tutoring',
			'premium education',
			'expert tutors',
			'oxbridge preparation',
		],
		priority: 0.9,
	},
	'/11-plus-bootcamps': {
		title: '11+ Preparation Bootcamps | Elite Grammar School Entry Success',
		description:
			'Intensive 11+ preparation bootcamps with proven success rates. Expert coaching for grammar school entry with royal standard excellence.',
		keywords: [
			'11 plus preparation',
			'11+ tutoring',
			'grammar school entry',
			'selective school tutoring',
			'entrance exam preparation',
		],
		priority: 0.9,
	},
};
export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const path = searchParams.get('path');
		const type = searchParams.get('type');
		const format = searchParams.get('format') || 'json';
		if (path) {
			const metadata = await getPageMetadata(path);
			if (!metadata) {
				return NextResponse.json(
					{
						success: false,
						error: 'Page metadata not found',
						path,
					},
					{
						status: 404,
					},
				);
			}
			let response: any = metadata;
			if (type === 'metadata') {
				response = {
					title: metadata.title,
					description: metadata.description,
					keywords: metadata.keywords,
					robots: metadata.robots,
				};
			} else if (type === 'structured-data') {
				response = {
					path: metadata.path,
					structuredData: metadata.structuredData,
				};
			}
			return NextResponse.json({
				success: true,
				data: response,
				timestamp: new Date().toISOString(),
			});
		}
		const allMetadata = await getAllSEOMetadata();
		return NextResponse.json(
			{
				success: true,
				config: DEFAULT_SEO_CONFIG,
				pages: allMetadata,
				totalPages: Object.keys(allMetadata).length,
				timestamp: new Date().toISOString(),
			},
			{
				headers: {
					'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
				},
			},
		);
	} catch (error) {
		console.error('SEO API GET Error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to retrieve SEO data',
				timestamp: new Date().toISOString(),
			},
			{
				status: 500,
			},
		);
	}
}
export async function PUT(request: NextRequest): Promise<NextResponse> {
	try {
		const body = await request.json();
		const {
			path,
			title,
			description,
			keywords,
			openGraph,
			twitterCard,
			structuredData,
			robots,
		} = body;
		if (!path) {
			return NextResponse.json(
				{
					success: false,
					error: 'Path is required for metadata updates',
				},
				{
					status: 400,
				},
			);
		}
		if (title && title.length > 60) {
			return NextResponse.json(
				{
					success: false,
					error: 'Title should be 60 characters or less for optimal SEO',
					field: 'title',
				},
				{
					status: 400,
				},
			);
		}
		if (description && (description.length < 120 || description.length > 160)) {
			return NextResponse.json(
				{
					success: false,
					error: 'Description should be between 120-160 characters for optimal SEO',
					field: 'description',
				},
				{
					status: 400,
				},
			);
		}
		const { revalidatePath, revalidateTag } = await import('next/cache');
		const updatedMetadata: Partial<PageMetadata> = {
			path,
			lastModified: new Date().toISOString(),
			...(title && {
				title,
			}),
			...(description && {
				description,
			}),
			...(keywords && {
				keywords,
			}),
			...(openGraph && {
				openGraph,
			}),
			...(twitterCard && {
				twitterCard,
			}),
			...(structuredData && {
				structuredData,
			}),
			...(robots && {
				robots,
			}),
		};
		revalidatePath(path);
		revalidateTag('seo-metadata');
		return NextResponse.json(
			{
				success: true,
				message: 'SEO metadata updated successfully',
				path,
				metadata: updatedMetadata,
				timestamp: new Date().toISOString(),
			},
			{
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
				},
			},
		);
	} catch (error) {
		console.error('SEO API PUT Error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to update SEO metadata',
				timestamp: new Date().toISOString(),
			},
			{
				status: 500,
			},
		);
	}
}
export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body = await request.json();
		const { path, metadata, structuredDataSchema } = body;
		if (!path) {
			return NextResponse.json(
				{
					success: false,
					error: 'Path is required for creating new SEO entries',
				},
				{
					status: 400,
				},
			);
		}
		const existingMetadata = await getPageMetadata(path);
		if (existingMetadata) {
			return NextResponse.json(
				{
					success: false,
					error: 'SEO metadata already exists for this path. Use PUT to update.',
					path,
				},
				{
					status: 409,
				},
			);
		}
		const newMetadata: PageMetadata = {
			path,
			title: metadata?.title || `${DEFAULT_SEO_CONFIG.defaultTitle}`,
			description: metadata?.description || DEFAULT_SEO_CONFIG.defaultDescription,
			keywords: metadata?.keywords || DEFAULT_SEO_CONFIG.defaultKeywords,
			canonicalUrl: `https://myprivatetutoronline.com${path}`,
			openGraph: metadata?.openGraph || {
				title: metadata?.title || DEFAULT_SEO_CONFIG.defaultTitle,
				description: metadata?.description || DEFAULT_SEO_CONFIG.defaultDescription,
				image: DEFAULT_SEO_CONFIG.defaultImage,
				type: 'website',
				url: `https://myprivatetutoronline.com${path}`,
				siteName: DEFAULT_SEO_CONFIG.siteName,
			},
			twitterCard: metadata?.twitterCard || {
				card: 'summary_large_image',
				site: '@MyPrivateTutor',
				title: metadata?.title || DEFAULT_SEO_CONFIG.defaultTitle,
				description: metadata?.description || DEFAULT_SEO_CONFIG.defaultDescription,
				image: DEFAULT_SEO_CONFIG.defaultImage,
			},
			structuredData: structuredDataSchema ? [structuredDataSchema] : [],
			lastModified: new Date().toISOString(),
			priority: metadata?.priority || 0.7,
			robots: metadata?.robots || {
				index: true,
				follow: true,
			},
		};
		const { revalidatePath, revalidateTag } = await import('next/cache');
		revalidatePath('/sitemap.xml');
		revalidatePath(path);
		revalidateTag('seo-metadata');
		return NextResponse.json(
			{
				success: true,
				message: 'New SEO metadata created successfully',
				metadata: newMetadata,
				timestamp: new Date().toISOString(),
			},
			{
				status: 201,
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
				},
			},
		);
	} catch (error) {
		console.error('SEO API POST Error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to create new SEO metadata',
				timestamp: new Date().toISOString(),
			},
			{
				status: 500,
			},
		);
	}
}
export async function DELETE(request: NextRequest): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const path = searchParams.get('path');
		const type = searchParams.get('type');
		if (!path) {
			return NextResponse.json(
				{
					success: false,
					error: 'Path is required for deletion',
				},
				{
					status: 400,
				},
			);
		}
		const existingMetadata = await getPageMetadata(path);
		if (!existingMetadata) {
			return NextResponse.json(
				{
					success: false,
					error: 'SEO metadata not found for this path',
					path,
				},
				{
					status: 404,
				},
			);
		}
		let deletedElements: string[] = [];
		if (type === 'structured-data') {
			deletedElements = ['structuredData'];
		} else if (type === 'social') {
			deletedElements = ['openGraph', 'twitterCard'];
		} else {
			deletedElements = ['all'];
		}
		const { revalidatePath, revalidateTag } = await import('next/cache');
		revalidatePath(path);
		revalidatePath('/sitemap.xml');
		revalidateTag('seo-metadata');
		return NextResponse.json(
			{
				success: true,
				message: `SEO metadata deleted successfully`,
				path,
				deletedElements,
				timestamp: new Date().toISOString(),
			},
			{
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
				},
			},
		);
	} catch (error) {
		console.error('SEO API DELETE Error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to delete SEO metadata',
				timestamp: new Date().toISOString(),
			},
			{
				status: 500,
			},
		);
	}
}
async function getPageMetadata(path: string): Promise<PageMetadata | null> {
	const baseMetadata = PAGE_METADATA[path];
	if (!baseMetadata) return null;
	return {
		path,
		title: baseMetadata.title || DEFAULT_SEO_CONFIG.defaultTitle,
		description:
			baseMetadata.description || DEFAULT_SEO_CONFIG.defaultDescription,
		keywords: baseMetadata.keywords || DEFAULT_SEO_CONFIG.defaultKeywords,
		canonicalUrl: `https://myprivatetutoronline.com${path}`,
		openGraph: {
			title: baseMetadata.title || DEFAULT_SEO_CONFIG.defaultTitle,
			description:
				baseMetadata.description || DEFAULT_SEO_CONFIG.defaultDescription,
			image: DEFAULT_SEO_CONFIG.defaultImage,
			type: 'website',
			url: `https://myprivatetutoronline.com${path}`,
			siteName: DEFAULT_SEO_CONFIG.siteName,
		},
		twitterCard: {
			card: 'summary_large_image',
			site: '@MyPrivateTutor',
			title: baseMetadata.title || DEFAULT_SEO_CONFIG.defaultTitle,
			description:
				baseMetadata.description || DEFAULT_SEO_CONFIG.defaultDescription,
			image: DEFAULT_SEO_CONFIG.defaultImage,
		},
		structuredData: baseMetadata.structuredData || [],
		lastModified: new Date().toISOString(),
		priority: baseMetadata.priority || 0.7,
		robots: {
			index: true,
			follow: true,
		},
	};
}
async function getAllSEOMetadata(): Promise<Record<string, PageMetadata>> {
	const allMetadata: Record<string, PageMetadata> = {};
	for (const path of Object.keys(PAGE_METADATA)) {
		const metadata = await getPageMetadata(path);
		if (metadata) {
			allMetadata[path] = metadata;
		}
	}
	return allMetadata;
}
