import {
	describe,
	test,
	expect,
	beforeEach,
	afterEach,
	jest,
} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
	focusManager,
	screenReader,
	handleKeyboardNavigation,
	getContrastRatio,
	meetsWCAGContrast,
	prefersReducedMotion,
	isExternalLink,
	getExternalLinkProps,
	validateImageAlt,
} from '@/lib/accessibility';

// Mock window.matchMedia for testing
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: mockMatchMedia,
});

describe('Accessibility Utilities', () => {
	beforeEach(() => {
		// Reset DOM
		document.body.innerHTML = '';

		// Mock matchMedia to return false by default
		mockMatchMedia.mockImplementation(() => ({
			matches: false,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		}));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('Focus Management', () => {
		test('getFocusableElements returns focusable elements', () => {
			document.body.innerHTML = `
        <div id="container">
          <button>Button 1</button>
          <a href="/test">Link</a>
          <input type="text" />
          <button disabled>Disabled Button</button>
          <div tabindex="0">Focusable Div</div>
          <div tabindex="-1">Non-focusable Div</div>
        </div>
      `;

			const container = document.getElementById('container')!;
			const focusableElements = focusManager.getFocusableElements(container);

			expect(focusableElements).toHaveLength(4); // button, a, input, div with tabindex=0
		});

		test('getFirstFocusableElement returns first focusable element', () => {
			document.body.innerHTML = `
        <div id="container">
          <a href="/test">First Link</a>
          <button>Button</button>
        </div>
      `;

			const container = document.getElementById('container')!;
			const firstElement = focusManager.getFirstFocusableElement(container);

			expect(firstElement?.tagName.toLowerCase()).toBe('a');
			expect(firstElement?.textContent).toBe('First Link');
		});

		test('getLastFocusableElement returns last focusable element', () => {
			document.body.innerHTML = `
        <div id="container">
          <a href="/test">Link</a>
          <button>Last Button</button>
        </div>
      `;

			const container = document.getElementById('container')!;
			const lastElement = focusManager.getLastFocusableElement(container);

			expect(lastElement?.tagName.toLowerCase()).toBe('button');
			expect(lastElement?.textContent).toBe('Last Button');
		});
	});

	describe('Keyboard Navigation', () => {
		test('handleKeyboardNavigation calls correct callbacks', () => {
			const callbacks = {
				onEnter: jest.fn(),
				onSpace: jest.fn(),
				onEscape: jest.fn(),
				onArrowUp: jest.fn(),
			};

			// Test Enter key
			const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
			handleKeyboardNavigation(enterEvent, callbacks);
			expect(callbacks.onEnter).toHaveBeenCalled();

			// Test Space key
			const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
			jest.spyOn(spaceEvent, 'preventDefault');
			handleKeyboardNavigation(spaceEvent, callbacks);
			expect(callbacks.onSpace).toHaveBeenCalled();
			expect(spaceEvent.preventDefault).toHaveBeenCalled();

			// Test Escape key
			const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
			handleKeyboardNavigation(escapeEvent, callbacks);
			expect(callbacks.onEscape).toHaveBeenCalled();

			// Test Arrow Up
			const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
			jest.spyOn(arrowUpEvent, 'preventDefault');
			handleKeyboardNavigation(arrowUpEvent, callbacks);
			expect(callbacks.onArrowUp).toHaveBeenCalled();
			expect(arrowUpEvent.preventDefault).toHaveBeenCalled();
		});
	});

	describe('Color Contrast', () => {
		test('getContrastRatio calculates contrast correctly', () => {
			// Black text on white background should have high contrast
			const highContrast = getContrastRatio('rgb(0, 0, 0)', 'rgb(255, 255, 255)');
			expect(highContrast).toBeCloseTo(21, 0); // Perfect contrast ratio is 21:1

			// Same colors should have contrast ratio of 1
			const sameColors = getContrastRatio(
				'rgb(128, 128, 128)',
				'rgb(128, 128, 128)',
			);
			expect(sameColors).toBeCloseTo(1, 1);
		});

		test('meetsWCAGContrast correctly evaluates WCAG compliance', () => {
			// Black on white should meet AA standards
			expect(meetsWCAGContrast('rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'AA')).toBe(
				true,
			);

			// Light grey on white should not meet AA standards
			expect(
				meetsWCAGContrast('rgb(200, 200, 200)', 'rgb(255, 255, 255)', 'AA'),
			).toBe(false);

			// Large text has lower contrast requirements
			expect(
				meetsWCAGContrast(
					'rgb(150, 150, 150)',
					'rgb(255, 255, 255)',
					'AA',
					'large',
				),
			).toBe(true);
		});
	});

	describe('Reduced Motion Detection', () => {
		test('prefersReducedMotion returns correct value', () => {
			// Mock reduced motion preference
			mockMatchMedia.mockImplementation((query) => {
				if (query === '(prefers-reduced-motion: reduce)') {
					return { matches: true };
				}
				return { matches: false };
			});

			expect(prefersReducedMotion()).toBe(true);

			// Mock normal motion preference
			mockMatchMedia.mockImplementation(() => ({ matches: false }));
			expect(prefersReducedMotion()).toBe(false);
		});
	});

	describe('Link Utilities', () => {
		test('isExternalLink correctly identifies external links', () => {
			// Mock current location
			Object.defineProperty(window, 'location', {
				value: {
					hostname: 'example.com',
					href: 'https://example.com/current-page',
				},
			});

			expect(isExternalLink('https://external.com')).toBe(true);
			expect(isExternalLink('https://example.com/page')).toBe(false);
			expect(isExternalLink('/relative/path')).toBe(false);
			expect(isExternalLink('#anchor')).toBe(false);
		});

		test('getExternalLinkProps returns correct props for external links', () => {
			Object.defineProperty(window, 'location', {
				value: {
					hostname: 'example.com',
					href: 'https://example.com/current-page',
				},
			});

			const externalProps = getExternalLinkProps('https://external.com');
			expect(externalProps.target).toBe('_blank');
			expect(externalProps.rel).toBe('noopener noreferrer');
			expect(externalProps['aria-label']).toBe('Opens in new window');

			const internalProps = getExternalLinkProps('/internal/page');
			expect(Object.keys(internalProps)).toHaveLength(0);
		});
	});

	describe('Image Accessibility', () => {
		test('validateImageAlt correctly validates alt text', () => {
			// Valid alt text
			expect(
				validateImageAlt(
					'Students studying together in a bright classroom',
					'/images/students.jpg',
				),
			).toBe(true);

			// Empty alt text
			expect(validateImageAlt('', '/images/test.jpg')).toBe(false);

			// Alt text containing filename
			expect(validateImageAlt('students.jpg', '/images/students.jpg')).toBe(false);

			// Generic alt text
			expect(validateImageAlt('image', '/images/test.jpg')).toBe(false);
			expect(validateImageAlt('picture', '/images/test.jpg')).toBe(false);

			// Alt text with file extension
			expect(validateImageAlt('Test image.png', '/images/test.png')).toBe(false);
		});
	});

	describe('Screen Reader Announcements', () => {
		test('screenReader.announce creates live region', () => {
			screenReader.announce('Test announcement');

			const liveRegion = document.querySelector('[aria-live="polite"]');
			expect(liveRegion).toBeInTheDocument();
			expect(liveRegion).toHaveTextContent('Test announcement');
		});

		test('screenReader.announce supports different priorities', () => {
			screenReader.announce('Urgent message', 'assertive');

			const liveRegion = document.querySelector('[aria-live="assertive"]');
			expect(liveRegion).toBeInTheDocument();
			expect(liveRegion).toHaveTextContent('Urgent message');
		});
	});
});
