// Accessibility testing utilities using axe-core
// CLAUDE.md rule 34: Comprehensive testing with axe-core

import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Test page for WCAG 2.1 AA compliance using axe-core
 */
export async function testAccessibility(
	page: Page,
	options?: {
		tags?: string[];
		rules?: string[];
		excludeSelectors?: string[];
	},
) {
	const axeBuilder = new AxeBuilder({ page });

	// Configure axe rules for WCAG 2.1 AA compliance
	if (options?.tags) {
		axeBuilder.withTags(options.tags);
	} else {
		axeBuilder.withTags(['wcag2a', 'wcag2aa', 'wcag21aa']);
	}

	// Include/exclude specific rules
	if (options?.rules) {
		axeBuilder.include(options.rules);
	}

	if (options?.excludeSelectors) {
		options.excludeSelectors.forEach((selector) => {
			axeBuilder.exclude(selector);
		});
	}

	const results = await axeBuilder.analyze();

	return results;
}

/**
 * Assert no accessibility violations
 */
export function expectNoAccessibilityViolations(results: any) {
	if (results.violations.length > 0) {
		const violationMessages = results.violations
			.map(
				(violation: any) =>
					`${violation.id}: ${violation.description}\n` +
					`  Impact: ${violation.impact}\n` +
					`  Help: ${violation.help}\n` +
					`  Nodes: ${violation.nodes.length}\n` +
					violation.nodes
						.map(
							(node: any) => `    - ${node.target.join(', ')}: ${node.failureSummary}`,
						)
						.join('\n'),
			)
			.join('\n\n');

		throw new Error(`Accessibility violations found:\n\n${violationMessages}`);
	}
}

/**
 * Test keyboard navigation on a page
 */
export async function testKeyboardNavigation(
	page: Page,
	options?: {
		startSelector?: string;
		expectedFocusableElements?: string[];
	},
) {
	// Test Tab navigation
	const focusableElements: string[] = [];

	// Start from beginning or specified element
	if (options?.startSelector) {
		await page.focus(options.startSelector);
	} else {
		await page.keyboard.press('Tab');
	}

	// Navigate through all focusable elements
	for (let i = 0; i < 20; i++) {
		// Prevent infinite loop
		const focusedElement = await page.evaluate(() => {
			const element = document.activeElement;
			if (!element) return null;

			const tagName = element.tagName.toLowerCase();
			const id = element.id ? `#${element.id}` : '';
			const className =
				element.className ? `.${element.className.split(' ').join('.')}` : '';

			return `${tagName}${id}${className}`;
		});

		if (focusedElement && !focusableElements.includes(focusedElement)) {
			focusableElements.push(focusedElement);
		}

		await page.keyboard.press('Tab');

		// Check if we've cycled back to the beginning
		const currentFocused = await page.evaluate(() => {
			const element = document.activeElement;
			if (!element) return null;

			const tagName = element.tagName.toLowerCase();
			const id = element.id ? `#${element.id}` : '';
			const className =
				element.className ? `.${element.className.split(' ').join('.')}` : '';

			return `${tagName}${id}${className}`;
		});

		if (currentFocused === focusableElements[0] && focusableElements.length > 1) {
			break;
		}
	}

	return focusableElements;
}

/**
 * Test screen reader announcements
 */
export async function testScreenReaderAnnouncements(page: Page) {
	// Listen for aria-live region updates
	const announcements: string[] = [];

	await page.evaluateOnNewDocument(() => {
		// Override MutationObserver to capture aria-live updates
		const originalMutationObserver = window.MutationObserver;
		window.MutationObserver = class extends originalMutationObserver {
			constructor(callback: MutationCallback) {
				super((mutations) => {
					mutations.forEach((mutation) => {
						if (mutation.type === 'childList' && mutation.target) {
							const target = mutation.target as Element;
							const ariaLive = target.getAttribute('aria-live');
							if (ariaLive && target.textContent) {
								(window as any).__screenReaderAnnouncements = (
									(window as any).__screenReaderAnnouncements || []
								).concat([target.textContent.trim()]);
							}
						}
					});
					callback(mutations, this);
				});
			}
		};
	});

	return {
		getAnnouncements: async () => {
			return await page.evaluate(
				() => (window as any).__screenReaderAnnouncements || [],
			);
		},
	};
}

/**
 * Test color contrast ratios
 */
export async function testColorContrast(page: Page, selectors?: string[]) {
	const contrastIssues = await page.evaluate((selectorsToTest) => {
		const issues: Array<{
			selector: string;
			foreground: string;
			background: string;
			ratio: number;
			wcagAA: boolean;
			wcagAAA: boolean;
		}> = [];

		// Get luminance from RGB values
		const getLuminance = (r: number, g: number, b: number): number => {
			const [rs, gs, bs] = [r, g, b].map((c) => {
				c = c / 255;
				return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
			});
			return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
		};

		// Calculate contrast ratio
		const getContrastRatio = (l1: number, l2: number): number => {
			const lighter = Math.max(l1, l2);
			const darker = Math.min(l1, l2);
			return (lighter + 0.05) / (darker + 0.05);
		};

		// Parse RGB color
		const parseRGB = (color: string): [number, number, number] | null => {
			const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
			return match ?
					[parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
				:	null;
		};

		const elementsToTest =
			selectorsToTest?.length ?
				selectorsToTest
					.map((selector) => document.querySelector(selector))
					.filter(Boolean)
			:	Array.from(document.querySelectorAll('*')).filter((el) => {
					const style = getComputedStyle(el);
					return style.color !== 'rgba(0, 0, 0, 0)' && el.textContent?.trim();
				});

		elementsToTest.forEach((element, index) => {
			if (!element) return;

			const style = getComputedStyle(element as Element);
			const foregroundColor = parseRGB(style.color);
			const backgroundColor = parseRGB(style.backgroundColor);

			if (foregroundColor && backgroundColor) {
				const fgLuminance = getLuminance(...foregroundColor);
				const bgLuminance = getLuminance(...backgroundColor);
				const ratio = getContrastRatio(fgLuminance, bgLuminance);

				const fontSize = parseFloat(style.fontSize);
				const isLargeText =
					fontSize >= 18 || (fontSize >= 14 && style.fontWeight === 'bold');

				const wcagAA = isLargeText ? ratio >= 3 : ratio >= 4.5;
				const wcagAAA = isLargeText ? ratio >= 4.5 : ratio >= 7;

				if (!wcagAA) {
					issues.push({
						selector: selectorsToTest?.[index] || `element-${index}`,
						foreground: style.color,
						background: style.backgroundColor,
						ratio: Math.round(ratio * 100) / 100,
						wcagAA,
						wcagAAA,
					});
				}
			}
		});

		return issues;
	}, selectors);

	return contrastIssues;
}

/**
 * Test focus visibility
 */
export async function testFocusVisibility(page: Page, selectors: string[]) {
	const focusIssues: Array<{ selector: string; issue: string }> = [];

	for (const selector of selectors) {
		try {
			await page.focus(selector);

			const focusStyles = await page.evaluate((sel) => {
				const element = document.querySelector(sel);
				if (!element) return null;

				const style = getComputedStyle(element);
				return {
					outline: style.outline,
					outlineColor: style.outlineColor,
					outlineWidth: style.outlineWidth,
					outlineStyle: style.outlineStyle,
					boxShadow: style.boxShadow,
					border: style.border,
				};
			}, selector);

			if (focusStyles) {
				const hasFocusIndicator =
					focusStyles.outline !== 'none' ||
					focusStyles.boxShadow !== 'none' ||
					focusStyles.outlineWidth !== '0px';

				if (!hasFocusIndicator) {
					focusIssues.push({
						selector,
						issue: 'No visible focus indicator',
					});
				}
			}
		} catch (error) {
			focusIssues.push({
				selector,
				issue: `Cannot focus element: ${error}`,
			});
		}
	}

	return focusIssues;
}

export default {
	testAccessibility,
	expectNoAccessibilityViolations,
	testKeyboardNavigation,
	testScreenReaderAnnouncements,
	testColorContrast,
	testFocusVisibility,
};
