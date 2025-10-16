'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
export type FAQThemeId =
	| 'light'
	| 'dark'
	| 'high-contrast'
	| 'christmas'
	| 'academic'
	| 'system';
export interface FAQThemeState {
	currentTheme: FAQThemeId;
	isSystemTheme: boolean;
	systemPreference: 'light' | 'dark';
	isLoading: boolean;
	isTransitioning: boolean;
}
export interface FAQThemeActions {
	setTheme: (themeId: FAQThemeId) => void;
	toggleTheme: () => void;
	resetToSystem: () => void;
	isThemeAvailable: (themeId: FAQThemeId) => boolean;
}
export interface FAQThemeOptions {
	enableSystemDetection?: boolean;
	enableSeasonalThemes?: boolean;
	storageKey?: string;
	transitionDuration?: number;
	debugMode?: boolean;
}
export interface FAQThemeHookReturn extends FAQThemeState, FAQThemeActions {
	options: Required<FAQThemeOptions>;
}
const DEFAULT_OPTIONS: Required<FAQThemeOptions> = {
	enableSystemDetection: true,
	enableSeasonalThemes: false,
	storageKey: 'faq-theme-preference',
	transitionDuration: 300,
	debugMode: process.env.NODE_ENV === 'development',
};
const AVAILABLE_THEMES: Record<FAQThemeId, boolean | (() => boolean)> = {
	light: true,
	dark: true,
	'high-contrast': true,
	system: true,
	christmas: () => {
		const now = new Date();
		const month = now.getMonth();
		const day = now.getDate();
		return month === 11 || (month === 0 && day <= 7);
	},
	academic: () => {
		const month = new Date().getMonth();
		return (month >= 8 && month <= 10) || (month >= 0 && month <= 4);
	},
};
export function useFAQTheme(options: FAQThemeOptions = {}): FAQThemeHookReturn {
	const mergedOptions = {
		...DEFAULT_OPTIONS,
		...options,
	};
	const [currentTheme, setCurrentTheme] = useState<FAQThemeId>('light');
	const [isSystemTheme, setIsSystemTheme] = useState(false);
	const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>(
		'light',
	);
	const [isLoading, setIsLoading] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const mediaQueryRef = useRef<MediaQueryList | null>(null);
	const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const debugLog = useCallback(
		(message: string, data?: any) => {
			if (mergedOptions.debugMode) {
				console.log(`[FAQ Theme] ${message}`, data || '');
			}
		},
		[mergedOptions.debugMode],
	);
	useEffect(() => {
		if (!mergedOptions.enableSystemDetection) return;
		debugLog('Setting up system preference detection');
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQueryRef.current = mediaQuery;
		const handlePreferenceChange = (e: MediaQueryListEvent) => {
			const newPreference = e.matches ? 'dark' : 'light';
			setSystemPreference(newPreference);
			debugLog('System preference changed', newPreference);
			if (isSystemTheme) {
				applyThemeToDOM(newPreference);
			}
		};
		const initialPreference = mediaQuery.matches ? 'dark' : 'light';
		setSystemPreference(initialPreference);
		debugLog('Initial system preference detected', initialPreference);
		mediaQuery.addEventListener('change', handlePreferenceChange);
		return () => {
			if (mediaQueryRef.current) {
				mediaQueryRef.current.removeEventListener('change', handlePreferenceChange);
			}
		};
	}, [mergedOptions.enableSystemDetection, isSystemTheme, debugLog]);
	const applyThemeToDOM = useCallback(
		(themeId: FAQThemeId) => {
			const htmlElement = document.documentElement;
			htmlElement.removeAttribute('data-faq-theme');
			if (themeId !== 'system') {
				htmlElement.setAttribute('data-faq-theme', themeId);
				debugLog('Applied theme to DOM', themeId);
			} else {
				htmlElement.setAttribute('data-faq-theme', systemPreference);
				debugLog('Applied system theme to DOM', systemPreference);
			}
			htmlElement.classList.add('faq-theme-transitioning');
			if (transitionTimeoutRef.current) {
				clearTimeout(transitionTimeoutRef.current);
			}
			transitionTimeoutRef.current = setTimeout(() => {
				htmlElement.classList.remove('faq-theme-transitioning');
				htmlElement.classList.add('faq-theme-loaded');
				setIsTransitioning(false);
				debugLog('Theme transition completed');
			}, mergedOptions.transitionDuration);
		},
		[systemPreference, mergedOptions.transitionDuration, debugLog],
	);
	const saveThemePreference = useCallback(
		(themeId: FAQThemeId) => {
			try {
				if (themeId === 'system') {
					localStorage.removeItem(mergedOptions.storageKey);
					debugLog('Removed theme preference (system default)');
				} else {
					localStorage.setItem(mergedOptions.storageKey, themeId);
					debugLog('Saved theme preference', themeId);
				}
			} catch (error) {
				debugLog('Failed to save theme preference', error);
			}
		},
		[mergedOptions.storageKey, debugLog],
	);
	const loadThemePreference = useCallback((): FAQThemeId | null => {
		try {
			const stored = localStorage.getItem(mergedOptions.storageKey);
			if (stored && isThemeAvailable(stored as FAQThemeId)) {
				debugLog('Loaded theme preference', stored);
				return stored as FAQThemeId;
			}
			debugLog('No valid theme preference found');
			return null;
		} catch (error) {
			debugLog('Failed to load theme preference', error);
			return null;
		}
	}, [mergedOptions.storageKey, debugLog]);
	const isThemeAvailable = useCallback(
		(themeId: FAQThemeId): boolean => {
			const availability = AVAILABLE_THEMES[themeId];
			if (typeof availability === 'boolean') {
				return availability;
			}
			if (typeof availability === 'function') {
				if (
					!mergedOptions.enableSeasonalThemes &&
					(themeId === 'christmas' || themeId === 'academic')
				) {
					return false;
				}
				return availability();
			}
			return false;
		},
		[mergedOptions.enableSeasonalThemes],
	);
	useEffect(() => {
		debugLog('Initializing FAQ theme system');
		const loadedTheme = loadThemePreference();
		if (loadedTheme && isThemeAvailable(loadedTheme)) {
			setCurrentTheme(loadedTheme);
			setIsSystemTheme(false);
			applyThemeToDOM(loadedTheme);
			debugLog('Initialized with stored theme', loadedTheme);
		} else {
			setCurrentTheme('system');
			setIsSystemTheme(true);
			applyThemeToDOM(systemPreference);
			debugLog('Initialized with system preference', systemPreference);
		}
		setIsLoading(false);
		return () => {
			if (transitionTimeoutRef.current) {
				clearTimeout(transitionTimeoutRef.current);
			}
		};
	}, [
		loadThemePreference,
		isThemeAvailable,
		applyThemeToDOM,
		systemPreference,
		debugLog,
	]);
	const setTheme = useCallback(
		(themeId: FAQThemeId) => {
			if (!isThemeAvailable(themeId)) {
				debugLog('Theme not available', themeId);
				return;
			}
			setIsTransitioning(true);
			debugLog('Setting theme', themeId);
			if (themeId === 'system') {
				setIsSystemTheme(true);
				setCurrentTheme('system');
				saveThemePreference('system');
				applyThemeToDOM(systemPreference);
			} else {
				setIsSystemTheme(false);
				setCurrentTheme(themeId);
				saveThemePreference(themeId);
				applyThemeToDOM(themeId);
			}
		},
		[
			isThemeAvailable,
			saveThemePreference,
			applyThemeToDOM,
			systemPreference,
			debugLog,
		],
	);
	const toggleTheme = useCallback(() => {
		const newTheme =
			currentTheme === 'light' || (isSystemTheme && systemPreference === 'light') ?
				'dark'
			:	'light';
		setTheme(newTheme);
		debugLog('Toggled theme', newTheme);
	}, [currentTheme, isSystemTheme, systemPreference, setTheme, debugLog]);
	const resetToSystem = useCallback(() => {
		setTheme('system');
		debugLog('Reset to system preference');
	}, [setTheme, debugLog]);
	useEffect(() => {
		return () => {
			if (transitionTimeoutRef.current) {
				clearTimeout(transitionTimeoutRef.current);
			}
		};
	}, []);
	return {
		currentTheme,
		isSystemTheme,
		systemPreference,
		isLoading,
		isTransitioning,
		setTheme,
		toggleTheme,
		resetToSystem,
		isThemeAvailable,
		options: mergedOptions,
	};
}
export function useFAQThemeProvider(options?: FAQThemeOptions) {
	const theme = useFAQTheme(options);
	const getCurrentEffectiveTheme = useCallback(():
		| 'light'
		| 'dark'
		| 'high-contrast'
		| 'christmas'
		| 'academic' => {
		if (theme.isSystemTheme) {
			return theme.systemPreference;
		}
		return theme.currentTheme as
			| 'light'
			| 'dark'
			| 'high-contrast'
			| 'christmas'
			| 'academic';
	}, [theme.currentTheme, theme.isSystemTheme, theme.systemPreference]);
	const getThemeClasses = useCallback((): string => {
		const effectiveTheme = getCurrentEffectiveTheme();
		return `faq-theme-${effectiveTheme} ${theme.isTransitioning ? 'faq-theme-transitioning' : 'faq-theme-loaded'}`;
	}, [getCurrentEffectiveTheme, theme.isTransitioning]);
	return {
		...theme,
		getCurrentEffectiveTheme,
		getThemeClasses,
	};
}
export default useFAQTheme;
