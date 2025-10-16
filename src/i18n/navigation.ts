import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';
export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);
export const localeNames: Record<string, string> = {
	'en-GB': 'English (UK)',
	'fr-FR': 'Français',
	'es-ES': 'Español',
	'de-DE': 'Deutsch',
	'zh-CN': '简体中文',
};
export const localeFlags: Record<string, string> = {
	'en-GB': '🇬🇧',
	'fr-FR': '🇫🇷',
	'es-ES': '🇪🇸',
	'de-DE': '🇩🇪',
	'zh-CN': '🇨🇳',
};
export const isRTLLocale = (locale: string): boolean => {
	const languageCode = locale.split('-')[0];
	return ['ar', 'he'].includes(languageCode);
};
export const getLanguageCode = (locale: string): string => {
	return locale.split('-')[0];
};
