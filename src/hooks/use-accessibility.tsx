'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {
	prefersReducedMotion,
	watchMotionPreference,
	focusManager,
	screenReader,
	injectMotionCSSVariables,
} from '@/lib/accessibility';
export const useReducedMotion = () => {
	const [reducedMotion, setReducedMotion] = useState(() =>
		prefersReducedMotion(),
	);
	useEffect(() => {
		const unsubscribe = watchMotionPreference(setReducedMotion);
		return unsubscribe;
	}, []);
	return reducedMotion;
};
export const useFocusTrap = <T extends HTMLElement = HTMLElement>(
	isActive: boolean = true,
) => {
	const containerRef = useRef<T>(null);
	useEffect(() => {
		if (!isActive || !containerRef.current) return;
		const container = containerRef.current;
		const previouslyFocusedElement = document.activeElement as HTMLElement;
		const firstFocusable = focusManager.getFirstFocusableElement(container);
		firstFocusable?.focus();
		const handleKeyDown = (event: KeyboardEvent) => {
			focusManager.trapFocus(container, event);
		};
		container.addEventListener('keydown', handleKeyDown);
		return () => {
			container.removeEventListener('keydown', handleKeyDown);
			focusManager.restoreFocus(previouslyFocusedElement);
		};
	}, [isActive]);
	return containerRef;
};
export const useAnnouncement = () => {
	const announce = useCallback(
		(message: string, priority: 'polite' | 'assertive' = 'polite') => {
			screenReader.announce(message, priority);
		},
		[],
	);
	return announce;
};
export const useKeyboardNavigation = <T extends HTMLElement = HTMLElement>(
	items: T[],
	options: {
		orientation?: 'horizontal' | 'vertical' | 'grid';
		loop?: boolean;
		onSelect?: (item: T, index: number) => void;
	} = {},
) => {
	const { orientation = 'vertical', loop = true, onSelect } = options;
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			const { key } = event;
			let newIndex = focusedIndex;
			switch (key) {
				case 'ArrowUp':
					if (orientation !== 'horizontal') {
						event.preventDefault();
						newIndex =
							focusedIndex > 0 ? focusedIndex - 1
							: loop ? items.length - 1
							: 0;
					}
					break;
				case 'ArrowDown':
					if (orientation !== 'horizontal') {
						event.preventDefault();
						newIndex =
							focusedIndex < items.length - 1 ? focusedIndex + 1
							: loop ? 0
							: items.length - 1;
					}
					break;
				case 'ArrowLeft':
					if (orientation !== 'vertical') {
						event.preventDefault();
						newIndex =
							focusedIndex > 0 ? focusedIndex - 1
							: loop ? items.length - 1
							: 0;
					}
					break;
				case 'ArrowRight':
					if (orientation !== 'vertical') {
						event.preventDefault();
						newIndex =
							focusedIndex < items.length - 1 ? focusedIndex + 1
							: loop ? 0
							: items.length - 1;
					}
					break;
				case 'Home':
					event.preventDefault();
					newIndex = 0;
					break;
				case 'End':
					event.preventDefault();
					newIndex = items.length - 1;
					break;
				case 'Enter':
				case ' ':
					event.preventDefault();
					if (focusedIndex >= 0 && focusedIndex < items.length) {
						const item = items[focusedIndex];
						if (item) {
							onSelect?.(item, focusedIndex);
						}
					}
					break;
			}
			if (newIndex !== focusedIndex && newIndex >= 0 && newIndex < items.length) {
				setFocusedIndex(newIndex);
				items[newIndex]?.focus();
			}
		},
		[focusedIndex, items, orientation, loop, onSelect],
	);
	return {
		focusedIndex,
		setFocusedIndex,
		handleKeyDown,
	};
};
export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(() => {
		if (typeof window === 'undefined') return false;
		return window.matchMedia(query).matches;
	});
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const mediaQuery = window.matchMedia(query);
		const handler = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};
		mediaQuery.addEventListener('change', handler);
		setMatches(mediaQuery.matches);
		return () => {
			mediaQuery.removeEventListener('change', handler);
		};
	}, [query]);
	return matches;
};
export const useHighContrast = () => {
	return useMediaQuery('(prefers-contrast: high)');
};
export const useColorScheme = () => {
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
	return prefersDark ? 'dark' : 'light';
};
export const useAccessibilityInit = () => {
	useEffect(() => {
		injectMotionCSSVariables();
		const unsubscribe = watchMotionPreference(() => {
			injectMotionCSSVariables();
		});
		return unsubscribe;
	}, []);
};
