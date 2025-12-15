'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
interface AccessibilityConfig {
	enableSkipLinks?: boolean;
	enableFocusManagement?: boolean;
	enableAnnouncements?: boolean;
	enableKeyboardShortcuts?: boolean;
	announceDelay?: number;
}
interface AccessibilityState {
	isKeyboardUser: boolean;
	screenReaderActive: boolean;
	reducedMotion: boolean;
	highContrast: boolean;
	focusVisible: boolean;
}
export function useFooterAccessibility(config: AccessibilityConfig = {}) {
	const {
		enableSkipLinks = true,
		enableFocusManagement = true,
		enableAnnouncements = true,
		enableKeyboardShortcuts = true,
		announceDelay = 100,
	} = config;
	const [accessibilityState, setAccessibilityState] =
		useState<AccessibilityState>({
			isKeyboardUser: false,
			screenReaderActive: false,
			reducedMotion: false,
			highContrast: false,
			focusVisible: false,
		});
	const announcementRef = useRef<HTMLDivElement | null>(null);
	const skipLinkRef = useRef<HTMLAnchorElement | null>(null);
	const lastFocusedElement = useRef<HTMLElement | null>(null);
	const announce = useCallback(
		(message: string, priority: 'polite' | 'assertive' = 'polite') => {
			if (!enableAnnouncements || !announcementRef.current) return;
			announcementRef.current.textContent = '';
			setTimeout(() => {
				if (announcementRef.current) {
					announcementRef.current.setAttribute('aria-live', priority);
					announcementRef.current.textContent = message;
					setTimeout(() => {
						if (announcementRef.current) {
							announcementRef.current.textContent = '';
						}
					}, 3000);
				}
			}, announceDelay);
		},
		[enableAnnouncements, announceDelay],
	);
	const detectKeyboardUser = useCallback(() => {
		const handleFirstTab = (e: KeyboardEvent) => {
			if (e.key === 'Tab') {
				setAccessibilityState((prev) => ({
					...prev,
					isKeyboardUser: true,
				}));
				window.removeEventListener('keydown', handleFirstTab);
			}
		};
		const handleMouseDown = () => {
			setAccessibilityState((prev) => ({
				...prev,
				isKeyboardUser: false,
			}));
		};
		window.addEventListener('keydown', handleFirstTab);
		window.addEventListener('mousedown', handleMouseDown);
		return () => {
			window.removeEventListener('keydown', handleFirstTab);
			window.removeEventListener('mousedown', handleMouseDown);
		};
	}, []);
	const setupSkipLinks = useCallback(() => {
		if (!enableSkipLinks) return;
		const handleSkipToFooter = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
				e.preventDefault();
				const footer = document.querySelector('footer[role="contentinfo"]');
				if (footer instanceof HTMLElement) {
					footer.tabIndex = -1;
					footer.focus();
					announce('Navigated to footer');
				}
			}
		};
		document.addEventListener('keydown', handleSkipToFooter);
		return () => document.removeEventListener('keydown', handleSkipToFooter);
	}, [enableSkipLinks, announce]);
	const manageFocus = useCallback(
		(element: HTMLElement | null) => {
			if (!enableFocusManagement || !element) return;
			lastFocusedElement.current = document.activeElement as HTMLElement;
			element.tabIndex = -1;
			element.focus();
			const label = element.getAttribute('aria-label') || element.textContent;
			if (label) {
				announce(`Focus moved to ${label}`);
			}
		},
		[enableFocusManagement, announce],
	);
	const restoreFocus = useCallback(() => {
		if (lastFocusedElement.current && enableFocusManagement) {
			lastFocusedElement.current.focus();
			announce('Focus restored');
		}
	}, [enableFocusManagement, announce]);
	const detectUserPreferences = useCallback(() => {
		if (typeof window === 'undefined') return;
		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		);
		setAccessibilityState((prev) => ({
			...prev,
			reducedMotion: prefersReducedMotion.matches,
		}));
		const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
		setAccessibilityState((prev) => ({
			...prev,
			highContrast: prefersHighContrast.matches,
		}));
		const handleMotionChange = (e: MediaQueryListEvent) => {
			setAccessibilityState((prev) => ({
				...prev,
				reducedMotion: e.matches,
			}));
		};
		const handleContrastChange = (e: MediaQueryListEvent) => {
			setAccessibilityState((prev) => ({
				...prev,
				highContrast: e.matches,
			}));
		};
		prefersReducedMotion.addEventListener('change', handleMotionChange);
		prefersHighContrast.addEventListener('change', handleContrastChange);
		return () => {
			prefersReducedMotion.removeEventListener('change', handleMotionChange);
			prefersHighContrast.removeEventListener('change', handleContrastChange);
		};
	}, []);
	const setupKeyboardShortcuts = useCallback(() => {
		if (!enableKeyboardShortcuts) return;
		const shortcuts: Record<string, () => void> = {
			Escape: () => {
				const main = document.querySelector('main');
				if (
					main instanceof HTMLElement &&
					document.activeElement?.closest('footer')
				) {
					main.tabIndex = -1;
					main.focus();
					announce('Navigated to main content');
				}
			},
			'?': () => {
				announce(
					'Keyboard shortcuts: Ctrl+F for footer, Escape to exit footer, ? for help',
				);
			},
		};
		const handleKeyPress = (e: KeyboardEvent) => {
			const action = shortcuts[e.key];
			if (action && !e.ctrlKey && !e.metaKey && !e.altKey) {
				action();
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [enableKeyboardShortcuts, announce]);
	const createFocusTrap = useCallback((container: HTMLElement) => {
		const focusableElements = container.querySelectorAll<HTMLElement>(
			'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
		);
		const firstFocusable = focusableElements[0];
		const lastFocusable = focusableElements[focusableElements.length - 1];
		const trapFocus = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;
			if (e.shiftKey) {
				if (document.activeElement === firstFocusable) {
					e.preventDefault();
					lastFocusable?.focus();
				}
			} else {
				if (document.activeElement === lastFocusable) {
					e.preventDefault();
					firstFocusable?.focus();
				}
			}
		};
		container.addEventListener('keydown', trapFocus);
		return () => {
			container.removeEventListener('keydown', trapFocus);
		};
	}, []);
	useEffect(() => {
		const cleanups: (() => void)[] = [];
		cleanups.push(detectKeyboardUser());
		cleanups.push(setupSkipLinks());
		cleanups.push(detectUserPreferences());
		cleanups.push(setupKeyboardShortcuts());
		return () => {
			cleanups.forEach((cleanup) => cleanup?.());
		};
	}, [
		detectKeyboardUser,
		setupSkipLinks,
		detectUserPreferences,
		setupKeyboardShortcuts,
	]);
	return {
		...accessibilityState,
		announce,
		manageFocus,
		restoreFocus,
		createFocusTrap,
		announcementRef,
		skipLinkRef,
		isFooterFocused: () => document.activeElement?.closest('footer') !== null,
		focusFooter: () => {
			const footer = document.querySelector('footer[role="contentinfo"]');
			if (footer instanceof HTMLElement) {
				manageFocus(footer);
			}
		},
		getAriaLabel: (element: HTMLElement) => {
			return (
				element.getAttribute('aria-label') ||
				element.getAttribute('aria-labelledby') ||
				element.textContent?.trim() ||
				'Unlabeled element'
			);
		},
		setAriaExpanded: (element: HTMLElement, expanded: boolean) => {
			element.setAttribute('aria-expanded', expanded.toString());
			announce(
				`${element.getAttribute('aria-label')} ${expanded ? 'expanded' : 'collapsed'}`,
			);
		},
	};
}
export const footerSkipLinkConfig = {
	skipToFooter: (e: Event) => {
		e.preventDefault();
		const footer = document.querySelector('footer[role="contentinfo"]');
		if (footer instanceof HTMLElement) {
			footer.tabIndex = -1;
			footer.focus();
		}
	},
	className:
		'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-600 focus:text-white focus:rounded-lg focus:shadow-lg',
	text: 'Skip to footer',
};
