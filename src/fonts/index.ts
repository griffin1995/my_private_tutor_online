import { Playfair_Display, Source_Serif_4 } from 'next/font/google';
import localFont from 'next/font/local';
export const playfairDisplay = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-playfair-display',
	display: 'swap',
	weight: ['400', '500', '600', '700'],
	preload: true,
	fallback: ['Didot', 'Bodoni MT', 'Georgia', 'serif'],
	adjustFontFallback: true,
});
export const sourceSerif4 = Source_Serif_4({
	subsets: ['latin'],
	variable: '--font-source-serif-4',
	display: 'swap',
	weight: ['400', '500', '600'],
	preload: true,
	fallback: ['Charter', 'Georgia', 'Times New Roman', 'serif'],
	adjustFontFallback: true,
});
import { JetBrains_Mono } from 'next/font/google';
export const jetBrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains-mono',
	display: 'swap',
	weight: ['400', '500'],
	preload: false,
	fallback: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
	adjustFontFallback: true,
});
export const fontVariables = {
	heading: playfairDisplay.variable,
	body: sourceSerif4.variable,
	technical: jetBrainsMono.variable,
} as const;
export const fontClassNames = `${playfairDisplay.variable} ${sourceSerif4.variable} ${jetBrainsMono.variable}`;
export const fontFamilies = {
	heading: 'var(--font-playfair-display)',
	body: 'var(--font-source-serif-4)',
	technical: 'var(--font-jetbrains-mono)',
} as const;
export const typographyScale = {
	h1: {
		fontFamily: fontFamilies.heading,
		fontSize: 'clamp(2rem, 4vw, 3rem)',
		fontWeight: '700',
		lineHeight: '1.2',
		letterSpacing: '-0.02em',
	},
	h2: {
		fontFamily: fontFamilies.heading,
		fontSize: 'clamp(1.5rem, 3vw, 2rem)',
		fontWeight: '600',
		lineHeight: '1.3',
		letterSpacing: '-0.015em',
	},
	h3: {
		fontFamily: fontFamilies.heading,
		fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
		fontWeight: '600',
		lineHeight: '1.4',
		letterSpacing: '-0.01em',
	},
	h4: {
		fontFamily: fontFamilies.heading,
		fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
		fontWeight: '500',
		lineHeight: '1.4',
		letterSpacing: '0',
	},
	bodyLarge: {
		fontFamily: fontFamilies.body,
		fontSize: '1.125rem',
		fontWeight: '400',
		lineHeight: '1.6',
		letterSpacing: '0',
	},
	body: {
		fontFamily: fontFamilies.body,
		fontSize: '1rem',
		fontWeight: '400',
		lineHeight: '1.5',
		letterSpacing: '0',
	},
	bodySmall: {
		fontFamily: fontFamilies.body,
		fontSize: '0.875rem',
		fontWeight: '400',
		lineHeight: '1.5',
		letterSpacing: '0.01em',
	},
	price: {
		fontFamily: fontFamilies.technical,
		fontSize: 'clamp(1.5rem, 3vw, 2rem)',
		fontWeight: '500',
		lineHeight: '1.2',
		letterSpacing: '0',
	},
	code: {
		fontFamily: fontFamilies.technical,
		fontSize: '0.875rem',
		fontWeight: '400',
		lineHeight: '1.5',
		letterSpacing: '0',
	},
	data: {
		fontFamily: fontFamilies.technical,
		fontSize: '1rem',
		fontWeight: '400',
		lineHeight: '1.4',
		letterSpacing: '0',
	},
} as const;
export const getFontMetrics = () => {
	if (typeof window === 'undefined') return null;
	const metrics = {
		playfairDisplay: {
			loaded: document.fonts.check('12px var(--font-playfair-display)'),
			status: 'checking',
		},
		sourceSerif4: {
			loaded: document.fonts.check('12px var(--font-source-serif-4)'),
			status: 'checking',
		},
		jetBrainsMono: {
			loaded: document.fonts.check('12px var(--font-jetbrains-mono)'),
			status: 'checking',
		},
	};
	document.fonts.ready.then(() => {
		metrics.playfairDisplay.status =
			metrics.playfairDisplay.loaded ? 'loaded' : 'failed';
		metrics.sourceSerif4.status =
			metrics.sourceSerif4.loaded ? 'loaded' : 'failed';
		metrics.jetBrainsMono.status =
			metrics.jetBrainsMono.loaded ? 'loaded' : 'failed';
	});
	return metrics;
};
export const fontConfig = {
	families: fontFamilies,
	variables: fontVariables,
	classNames: fontClassNames,
	scale: typographyScale,
	metrics: getFontMetrics,
} as const;
export default fontConfig;
