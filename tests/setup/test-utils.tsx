// Test utilities and custom render functions for better testing experience

import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock providers that components might need
interface MockProvidersProps {
	children: ReactNode;
}

function MockProviders({ children }: MockProvidersProps) {
	return <div data-testid='test-providers'>{children}</div>;
}

// Custom render function that includes providers
const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(ui, { wrapper: MockProviders, ...options });

// Re-export everything from testing library
export * from '@testing-library/react';
export { customRender as render };

// Custom matchers and helpers
export const mockResizeObserver = () => {
	global.ResizeObserver = jest.fn().mockImplementation(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));
};

export const mockIntersectionObserver = () => {
	global.IntersectionObserver = jest.fn().mockImplementation(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));
};

// Mock window.matchMedia for responsive tests
export const mockMatchMedia = (matches = false) => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches,
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});
};

// Mock Next.js router
export const mockRouter = {
	push: jest.fn(),
	replace: jest.fn(),
	prefetch: jest.fn(),
	back: jest.fn(),
	forward: jest.fn(),
	refresh: jest.fn(),
	pathname: '/test',
	query: {},
};

// Helper to create mock CMS data
export const createMockCMSData = {
	trustIndicator: (overrides = {}) => ({
		icon: '👑',
		title: 'Test Trust Indicator',
		description: 'Test description for trust indicator',
		...overrides,
	}),

	testimonial: (overrides = {}) => ({
		quote: 'This is a test testimonial quote.',
		author: 'Test Author',
		role: 'Test Role',
		avatar: '/test-avatar.jpg',
		rating: 5,
		...overrides,
	}),

	service: (overrides = {}) => ({
		title: 'Test Service',
		description: 'This is a test service description.',
		icon: '📚',
		features: [{ feature: 'Test feature 1' }, { feature: 'Test feature 2' }],
		ctaText: 'Test CTA',
		ctaLink: '/test-link',
		...overrides,
	}),
};

// Accessibility testing helpers
export const axeMatchers = {
	toHaveNoViolations: (received: any) => {
		if (received.violations && received.violations.length > 0) {
			const violationMessages = received.violations
				.map((violation: any) => `${violation.id}: ${violation.description}`)
				.join('\n');

			return {
				message: () =>
					`Expected no accessibility violations but found:\n${violationMessages}`,
				pass: false,
			};
		}

		return {
			message: () => 'Expected accessibility violations but found none',
			pass: true,
		};
	},
};

// Add custom matchers to Jest
expect.extend(axeMatchers);

// Mock localStorage for tests
export const mockLocalStorage = () => {
	const store: { [key: string]: string } = {};

	Object.defineProperty(window, 'localStorage', {
		value: {
			getItem: jest.fn((key: string) => store[key] || null),
			setItem: jest.fn((key: string, value: string) => {
				store[key] = value;
			}),
			removeItem: jest.fn((key: string) => {
				delete store[key];
			}),
			clear: jest.fn(() => {
				Object.keys(store).forEach((key) => delete store[key]);
			}),
			length: Object.keys(store).length,
			key: jest.fn((index: number) => Object.keys(store)[index] || null),
		},
	});
};

// Performance testing helpers
export const measureRenderTime = async (renderFunction: () => void) => {
	const start = performance.now();
	renderFunction();
	const end = performance.now();
	return end - start;
};

// Mock Web APIs commonly needed in tests
export const setupWebAPIMocks = () => {
	mockResizeObserver();
	mockIntersectionObserver();
	mockMatchMedia();
	mockLocalStorage();

	// Mock scrollTo
	Object.defineProperty(window, 'scrollTo', {
		value: jest.fn(),
		writable: true,
	});

	// Mock getComputedStyle
	Object.defineProperty(window, 'getComputedStyle', {
		value: jest.fn(() => ({
			getPropertyValue: jest.fn(() => ''),
			display: 'block',
			visibility: 'visible',
			opacity: '1',
		})),
	});
};
