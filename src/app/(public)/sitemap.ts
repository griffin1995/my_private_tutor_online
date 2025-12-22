import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export const revalidate = 86400;
export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://myprivatetutoronline.com';
	const lastModified = new Date();
	return [
		{
			url: baseUrl,
			lastModified,
			changeFrequency: 'weekly',
			priority: 1.0,
		},
		{
			url: `${baseUrl}/about`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/how-it-works`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/testimonials`,
			lastModified,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/expert-educators`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/subject-tuition`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/11-plus-bootcamps`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/video-masterclasses`,
			lastModified,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/exam-papers`,
			lastModified,
			changeFrequency: 'weekly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/homeschooling`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/faq`,
			lastModified,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/faq/getting-started`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/faq/tutoring-services`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/faq/pricing-payments`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/faq/scheduling-booking`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/faq/academic-support`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/faq/technical-support`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/faq/search`,
			lastModified,
			changeFrequency: 'weekly',
			priority: 0.5,
		},
		{
			url: `${baseUrl}/legal/privacy-policy`,
			lastModified,
			changeFrequency: 'yearly',
			priority: 0.3,
		},
		{
			url: `${baseUrl}/legal/terms-of-service`,
			lastModified,
			changeFrequency: 'yearly',
			priority: 0.3,
		},
		{
			url: `${baseUrl}/legal/cookie-policy`,
			lastModified,
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	];
}
