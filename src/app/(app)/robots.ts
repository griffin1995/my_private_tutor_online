import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: [
					'/',
					'/about/',
					'/services/',
					'/testimonials/',
					'/how-it-works/',
					'/expert-educators/',
					'/subject-tuition/',
					'/11-plus-bootcamps/',
					'/video/',
					'/exam-papers/',
					'/homeschooling/',
					'/faq/',
					'/faq/search/',
					'/faq/*/',
					'/legal/',
				],
				disallow: [
					'/student/',
					'/tutor/',
					'/private/',
					'/_next/',
					'/api/errors/',
				],
				crawlDelay: 1,
			},
			{
				userAgent: 'Googlebot',
				allow: '/',
				disallow: ['/student/', '/tutor/', '/private/'],
			},
			{
				userAgent: 'bingbot',
				allow: '/',
				disallow: ['/student/', '/tutor/', '/private/'],
			},
		],
		sitemap: 'https://myprivatetutoronline.com/sitemap.xml',
		host: 'https://myprivatetutoronline.com',
	};
}
