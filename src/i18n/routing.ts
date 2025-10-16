import { defineRouting } from 'next-intl/routing';
export const routing = defineRouting({
	locales: ['en-GB', 'fr-FR', 'es-ES', 'de-DE', 'zh-CN'],
	defaultLocale: 'en-GB',
	localePrefix: 'always',
	pathnames: {
		'/': '/',
		'/faq': {
			'en-GB': '/faq',
			'fr-FR': '/aide',
			'es-ES': '/preguntas-frecuentes',
			'de-DE': '/haeufig-gestellte-fragen',
			'zh-CN': '/常见问题',
		},
		'/about': {
			'en-GB': '/about',
			'fr-FR': '/a-propos',
			'es-ES': '/acerca-de',
			'de-DE': '/ueber-uns',
			'zh-CN': '/关于我们',
		},
		'/contact': {
			'en-GB': '/contact',
			'fr-FR': '/contact',
			'es-ES': '/contacto',
			'de-DE': '/kontakt',
			'zh-CN': '/联系我们',
		},
		'/services': {
			'en-GB': '/services',
			'fr-FR': '/services',
			'es-ES': '/servicios',
			'de-DE': '/dienstleistungen',
			'zh-CN': '/服务',
		},
		'/testimonials': {
			'en-GB': '/testimonials',
			'fr-FR': '/temoignages',
			'es-ES': '/testimonios',
			'de-DE': '/erfahrungsberichte',
			'zh-CN': '/推荐信',
		},
	},
});
export type Locale = (typeof routing.locales)[number];
