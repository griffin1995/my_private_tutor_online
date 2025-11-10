/**
 * Jest Global Setup
 * Initialises test environment with required globals and utilities
 */

import '@testing-library/jest-dom';

// Suppress expected console errors in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
	console.error = (...args: any[]) => {
		if (
			typeof args[0] === 'string' &&
			(args[0].includes('Warning: ReactDOM.render') ||
				args[0].includes('Not implemented: HTMLFormElement.prototype.submit') ||
				args[0].includes('Warning: useLayoutEffect does nothing on the server'))
		) {
			return;
		}
		originalError.call(console, ...args);
	};

	console.warn = (...args: any[]) => {
		if (
			typeof args[0] === 'string' &&
			(args[0].includes('Warning: ReactDOM.render') ||
				args[0].includes('findDOMNode is deprecated'))
		) {
			return;
		}
		originalWarn.call(console, ...args);
	};
});

afterAll(() => {
	console.error = originalError;
	console.warn = originalWarn;
});

// Mock next/navigation for client components
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		refresh: jest.fn(),
	}),
	usePathname: () => '/',
	useSearchParams: () => new URLSearchParams(),
	useParams: () => ({}),
}));

// Mock next/image for Image components
jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => {
		// eslint-disable-next-line @next/next/no-img-element
		return <img {...props} />;
	},
}));

// Global test utilities
global.matchMedia = global.matchMedia || (() => ({
	matches: false,
	addListener: jest.fn(),
	removeListener: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

// Reset all mocks before each test
beforeEach(() => {
	jest.clearAllMocks();
});
