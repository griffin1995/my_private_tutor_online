import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
export const dynamic = 'force-static';
export const revalidate = 86400;
export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://myprivatetutoronline.com';
	const localeEntries = routing.locales.flatMap((locale) => [
		{
			url: `${baseUrl}/${locale === routing.defaultLocale ? '' : locale}`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 1.0,
			alternates: {
				languages: Object.fromEntries(
					routing.locales.map((loc) => [
						loc,
						`${baseUrl}/${loc === routing.defaultLocale ? '' : loc}`,
					]),
				),
			},
		},
		{
			url: `${baseUrl}/${locale === routing.defaultLocale ? '' : `${locale}/`}${getFAQPath(locale)}`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.9,
			alternates: {
				languages: Object.fromEntries(
					routing.locales.map((loc) => [
						loc,
						`${baseUrl}/${loc === routing.defaultLocale ? '' : `${loc}/`}${getFAQPath(loc)}`,
					]),
				),
			},
		},
		{
			url: `${baseUrl}/${locale === routing.defaultLocale ? '' : `${locale}/`}${getAboutPath(locale)}`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
			alternates: {
				languages: Object.fromEntries(
					routing.locales.map((loc) => [
						loc,
						`${baseUrl}/${loc === routing.defaultLocale ? '' : `${loc}/`}${getAboutPath(loc)}`,
					]),
				),
			},
		},
		{
			url: `${baseUrl}/${locale === routing.defaultLocale ? '' : `${locale}/`}${getContactPath(locale)}`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.7,
			alternates: {
				languages: Object.fromEntries(
					routing.locales.map((loc) => [
						loc,
						`${baseUrl}/${loc === routing.defaultLocale ? '' : `${loc}/`}${getContactPath(loc)}`,
					]),
				),
			},
		},
		{
			url: `${baseUrl}/${locale === routing.defaultLocale ? '' : `${locale}/`}${getServicesPath(locale)}`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
			alternates: {
				languages: Object.fromEntries(
					routing.locales.map((loc) => [
						loc,
						`${baseUrl}/${loc === routing.defaultLocale ? '' : `${loc}/`}${getServicesPath(loc)}`,
					]),
				),
			},
		},
	]);
	return localeEntries;
}
function getFAQPath(locale: string): string {
	const paths: Record<string, string> = {
		'en-GB': 'faq',
		'fr-FR': 'aide',
		'es-ES': 'preguntas-frecuentes',
		'de-DE': 'haeufig-gestellte-fragen',
		'zh-CN': '常见问题',
	};
	return paths[locale] || 'faq';
}
function getAboutPath(locale: string): string {
	const paths: Record<string, string> = {
		'en-GB': 'about',
		'fr-FR': 'a-propos',
		'es-ES': 'acerca-de',
		'de-DE': 'ueber-uns',
		'zh-CN': '关于我们',
	};
	return paths[locale] || 'about';
}
function getContactPath(locale: string): string {
	const paths: Record<string, string> = {
		'en-GB': 'contact',
		'fr-FR': 'contact',
		'es-ES': 'contacto',
		'de-DE': 'kontakt',
		'zh-CN': '联系我们',
	};
	return paths[locale] || 'contact';
}
function getServicesPath(locale: string): string {
	const paths: Record<string, string> = {
		'en-GB': 'services',
		'fr-FR': 'services',
		'es-ES': 'servicios',
		'de-DE': 'dienstleistungen',
		'zh-CN': '服务',
	};
	return paths[locale] || 'services';
}
