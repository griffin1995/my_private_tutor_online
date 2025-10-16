import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const locale =
		hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
	try {
		const messages = (await import(`../messages/${locale}.json`)).default;
		return {
			locale,
			messages,
			timeZone: 'Europe/London',
			defaultTranslationValues: {
				direction: ['ar', 'he'].includes(locale.split('-')[0]) ? 'rtl' : 'ltr',
				brandName: 'My Private Tutor Online',
				supportEmail: 'support@myprivatetutoronline.co.uk',
				phoneNumber: '+44 7513 550278',
			},
		};
	} catch (error) {
		console.warn(
			`Messages for locale "${locale}" could not be loaded. Falling back to default locale.`,
		);
		const fallbackMessages = (
			await import(`../messages/${routing.defaultLocale}.json`)
		).default;
		return {
			locale: routing.defaultLocale,
			messages: fallbackMessages,
			timeZone: 'Europe/London',
			defaultTranslationValues: {
				direction: 'ltr',
				brandName: 'My Private Tutor Online',
				supportEmail: 'support@myprivatetutoronline.co.uk',
				phoneNumber: '+44 7513 550278',
			},
		};
	}
});
