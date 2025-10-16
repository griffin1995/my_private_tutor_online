import '@testing-library/jest-dom';
import { setupWebAPIMocks } from './tests/setup/test-utils';

// Set up all Web API mocks
setupWebAPIMocks();

// Mock Next.js router
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		refresh: jest.fn(),
	}),
	useSearchParams: () => ({
		get: jest.fn(),
	}),
	usePathname: () => '/mock-pathname',
}));

// CONTEXT7 SOURCE: /websites/motion_dev - Framer Motion Jest testing setup
// TESTING REASON: Enhanced framer-motion mocking is handled via moduleNameMapper for better compatibility
// Mock additional motion utilities not covered in main mock
jest.mock('framer-motion/dist/es/motion', () =>
	require('./__mocks__/framer-motion.js'),
);

// Mock react-intersection-observer
jest.mock('react-intersection-observer', () => ({
	useInView: () => ({
		ref: jest.fn(),
		inView: true,
		entry: {},
	}),
}));

// Mock next/image
jest.mock('next/image', () => ({
	__esModule: true,
	default: (props) => {
		// eslint-disable-next-line @next/next/no-img-element
		return <img {...props} />;
	},
}));

// Suppress console warnings in tests
const originalConsoleError = console.error;
console.error = (...args) => {
	if (
		typeof args[0] === 'string' &&
		args[0].includes('Warning: ReactDOM.render is no longer supported')
	) {
		return;
	}
	originalConsoleError(...args);
};
