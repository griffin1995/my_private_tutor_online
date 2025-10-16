import { NextRequest, NextResponse } from 'next/server';
import type { MetadataRoute } from 'next';
export const revalidate = 3600;
interface SitemapEntry {
	url: string;
	lastModified: Date;
	changeFrequency:
		| 'always'
		| 'hourly'
		| 'daily'
		| 'weekly'
		| 'monthly'
		| 'yearly'
		| 'never';
	priority: number;
	tags?: string[];
}
interface SitemapConfiguration {
	baseUrl: string;
	defaultPriority: number;
	defaultChangeFrequency: string;
	pages: SitemapPageConfig[];
}
interface SitemapPageConfig {
	path: string;
	priority: number;
	changeFrequency: string;
	lastModified?: string;
	tags?: string[];
	enabled: boolean;
}
const DEFAULT_SITEMAP_CONFIG: SitemapConfiguration = {
	baseUrl: 'https://myprivatetutoronline.com',
	defaultPriority: 0.7,
	defaultChangeFrequency: 'monthly',
	pages: [
		{
			path: '/',
			priority: 1.0,
			changeFrequency: 'weekly',
			tags: ['homepage', 'critical'],
			enabled: true,
		},
		{
			path: '/about',
			priority: 0.9,
			changeFrequency: 'monthly',
			tags: ['services', 'credibility'],
			enabled: true,
		},
		{
			path: '/services',
			priority: 0.9,
			changeFrequency: 'monthly',
			tags: ['services', 'offerings'],
			enabled: true,
		},
		{
			path: '/subject-tuition',
			priority: 0.9,
			changeFrequency: 'monthly',
			tags: ['services', 'subjects'],
			enabled: true,
		},
		{
			path: '/11-plus-bootcamps',
			priority: 0.9,
			changeFrequency: 'monthly',
			tags: ['services', '11-plus'],
			enabled: true,
		},
		{
			path: '/testimonials',
			priority: 0.8,
			changeFrequency: 'weekly',
			tags: ['social-proof', 'testimonials'],
			enabled: true,
		},
		{
			path: '/expert-educators',
			priority: 0.8,
			changeFrequency: 'monthly',
			tags: ['educators', 'expertise'],
			enabled: true,
		},
		{
			path: '/video-masterclasses',
			priority: 0.8,
			changeFrequency: 'weekly',
			tags: ['resources', 'videos'],
			enabled: true,
		},
		{
			path: '/exam-papers',
			priority: 0.7,
			changeFrequency: 'weekly',
			tags: ['resources', 'exams'],
			enabled: true,
		},
		{
			path: '/homeschooling',
			priority: 0.8,
			changeFrequency: 'monthly',
			tags: ['services', 'homeschooling'],
			enabled: true,
		},
		{
			path: '/how-it-works',
			priority: 0.8,
			changeFrequency: 'monthly',
			tags: ['process', 'guidance'],
			enabled: true,
		},
		{
			path: '/faq',
			priority: 0.6,
			changeFrequency: 'monthly',
			tags: ['support', 'faq'],
			enabled: true,
		},
		{
			path: '/legal/privacy-policy',
			priority: 0.3,
			changeFrequency: 'yearly',
			tags: ['legal', 'privacy'],
			enabled: true,
		},
		{
			path: '/legal/terms-of-service',
			priority: 0.3,
			changeFrequency: 'yearly',
			tags: ['legal', 'terms'],
			enabled: true,
		},
		{
			path: '/legal/cookie-policy',
			priority: 0.3,
			changeFrequency: 'yearly',
			tags: ['legal', 'cookies'],
			enabled: true,
		},
	],
};
export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const format = searchParams.get('format') || 'json';
		const tag = searchParams.get('tag');
		const enabled = searchParams.get('enabled') !== 'false';
		let sitemap = DEFAULT_SITEMAP_CONFIG;
		if (tag) {
			sitemap = {
				...sitemap,
				pages: sitemap.pages.filter((page) => page.tags?.includes(tag)),
			};
		}
		if (enabled) {
			sitemap = {
				...sitemap,
				pages: sitemap.pages.filter((page) => page.enabled),
			};
		}
		const sitemapEntries: MetadataRoute.Sitemap = sitemap.pages.map((page) => ({
			url: `${sitemap.baseUrl}${page.path}`,
			lastModified: page.lastModified ? new Date(page.lastModified) : new Date(),
			changeFrequency: page.changeFrequency as any,
			priority: page.priority,
		}));
		if (format === 'xml') {
			const xmlSitemap = generateXMLSitemap(sitemapEntries);
			return new NextResponse(xmlSitemap, {
				headers: {
					'Content-Type': 'application/xml',
					'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
				},
			});
		}
		return NextResponse.json(
			{
				success: true,
				sitemap: {
					baseUrl: sitemap.baseUrl,
					generatedAt: new Date().toISOString(),
					totalPages: sitemapEntries.length,
					entries: sitemapEntries,
				},
			},
			{
				headers: {
					'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
				},
			},
		);
	} catch (error) {
		console.error('Sitemap API Error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to generate sitemap',
				timestamp: new Date().toISOString(),
			},
			{
				status: 500,
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
				},
			},
		);
	}
}
export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body = await request.json();
		const { path, priority, changeFrequency, tags, enabled } = body;
		if (!path) {
			return NextResponse.json(
				{
					success: false,
					error: 'Path is required',
				},
				{
					status: 400,
				},
			);
		}
		if (priority && (priority < 0 || priority > 1)) {
			return NextResponse.json(
				{
					success: false,
					error: 'Priority must be between 0 and 1',
				},
				{
					status: 400,
				},
			);
		}
		const { revalidatePath } = await import('next/cache');
		const updatedPage: SitemapPageConfig = {
			path,
			priority: priority || 0.7,
			changeFrequency: changeFrequency || 'monthly',
			tags: tags || [],
			enabled: enabled !== false,
			lastModified: new Date().toISOString(),
		};
		revalidatePath('/sitemap.xml');
		revalidatePath(path);
		return NextResponse.json(
			{
				success: true,
				message: 'Page configuration updated',
				page: updatedPage,
				timestamp: new Date().toISOString(),
			},
			{
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
				},
			},
		);
	} catch (error) {
		console.error('Sitemap Update Error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to update page configuration',
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
		const { pages, baseUrl, defaultPriority, defaultChangeFrequency } = body;
		if (!Array.isArray(pages)) {
			return NextResponse.json(
				{
					success: false,
					error: 'Pages array is required for bulk updates',
				},
				{
					status: 400,
				},
			);
		}
		for (const page of pages) {
			if (!page.path) {
				return NextResponse.json(
					{
						success: false,
						error: 'All pages must have a path',
					},
					{
						status: 400,
					},
				);
			}
			if (page.priority && (page.priority < 0 || page.priority > 1)) {
				return NextResponse.json(
					{
						success: false,
						error: `Invalid priority for ${page.path}: must be between 0 and 1`,
					},
					{
						status: 400,
					},
				);
			}
		}
		const { revalidatePath } = await import('next/cache');
		const updatedConfig: SitemapConfiguration = {
			baseUrl: baseUrl || DEFAULT_SITEMAP_CONFIG.baseUrl,
			defaultPriority: defaultPriority || DEFAULT_SITEMAP_CONFIG.defaultPriority,
			defaultChangeFrequency:
				defaultChangeFrequency || DEFAULT_SITEMAP_CONFIG.defaultChangeFrequency,
			pages: pages.map((page: any) => ({
				...page,
				lastModified: new Date().toISOString(),
				enabled: page.enabled !== false,
			})),
		};
		revalidatePath('/sitemap.xml');
		pages.forEach((page: any) => {
			revalidatePath(page.path);
		});
		return NextResponse.json(
			{
				success: true,
				message: `Updated ${pages.length} page configurations`,
				config: updatedConfig,
				timestamp: new Date().toISOString(),
			},
			{
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
				},
			},
		);
	} catch (error) {
		console.error('Bulk Sitemap Update Error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to perform bulk update',
				timestamp: new Date().toISOString(),
			},
			{
				status: 500,
			},
		);
	}
}
function generateXMLSitemap(entries: MetadataRoute.Sitemap): string {
	const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
	const urlsetOpen =
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
	const urlsetClose = '</urlset>';
	const urls = entries
		.map(
			(entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
		)
		.join('');
	return `${xmlHeader}\n${urlsetOpen}${urls}\n${urlsetClose}`;
}
