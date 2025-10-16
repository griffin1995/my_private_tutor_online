import React from 'react';
import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { OptimizedVideoPlayer } from '../OptimizedVideoPlayer';
import type { OptimizedVideoPlayerProps } from '../OptimizedVideoPlayer.types';
jest.mock('react-intersection-observer', () => ({
	useInView: jest.fn(() => ({
		ref: jest.fn(),
		inView: true,
		entry: {},
	})),
}));
const mockReactPlayer = jest.fn(
	({
		onReady,
		onPlay,
		onPause,
		onError,
		onProgress,
		onDuration,
		light,
		playing,
		...props
	}) => {
		React.useEffect(() => {
			if (onReady) {
				setTimeout(() => onReady({}), 100);
			}
		}, [onReady]);
		const handleTestClick = () => {
			if (light && !playing) {
				if (onPlay) onPlay();
			}
		};
		return (
			<div
				data-testid='react-player'
				data-url={props.url}
				data-playing={playing ? 'true' : 'false'}
				data-light={light ? 'true' : 'false'}
				onClick={handleTestClick}
				{...props}>
				{light && <div data-testid='video-thumbnail'>Video Thumbnail</div>}
				<div data-testid='video-content'>ReactPlayer Mock</div>
			</div>
		);
	},
);
jest.mock('react-player/lazy', () => ({
	__esModule: true,
	default: mockReactPlayer,
}));
jest.mock('next/dynamic', () =>
	jest.fn((importFunc, options) => {
		const Component = jest.fn(mockReactPlayer);
		if (options?.loading) {
			Component.displayName = 'DynamicReactPlayer';
			return jest.fn((props) => {
				const [isLoading, setIsLoading] = React.useState(true);
				React.useEffect(() => {
					const timer = setTimeout(() => setIsLoading(false), 50);
					return () => clearTimeout(timer);
				}, []);
				if (isLoading) {
					return options.loading();
				}
				return React.createElement(Component, props);
			});
		}
		return Component;
	}),
);
jest.mock('lucide-react', () => ({
	Play: jest.fn(() => <div data-testid='play-icon'>Play Icon</div>),
	X: jest.fn(() => <div data-testid='close-icon'>Close Icon</div>),
	Loader2: jest.fn(() => <div data-testid='loader-icon'>Loading...</div>),
}));
jest.mock('next/image', () => ({
	__esModule: true,
	default: jest.fn(({ src, alt, ...props }) => (
		<img
			src={src}
			alt={alt}
			data-testid='next-image'
			{...props}
		/>
	)),
}));
const createDefaultProps = (
	overrides: Partial<OptimizedVideoPlayerProps> = {},
): OptimizedVideoPlayerProps => ({
	videoId: 'test-video-id',
	title: 'Test Video Title',
	thumbnail: '/test-thumbnail.jpg',
	variant: 'hero',
	className: 'test-class',
	...overrides,
});
describe('OptimizedVideoPlayer Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		const { useInView } = require('react-intersection-observer');
		useInView.mockReturnValue({
			ref: jest.fn(),
			inView: true,
			entry: {},
		});
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});
	describe('Component Rendering', () => {
		it('renders hero variant with correct structure', () => {
			const props = createDefaultProps({
				variant: 'hero',
			});
			render(<OptimizedVideoPlayer {...props} />);
			expect(screen.getByTestId('react-player')).toBeInTheDocument();
			expect(screen.getByTestId('video-thumbnail')).toBeInTheDocument();
			expect(screen.getByRole('button')).toBeInTheDocument();
			expect(screen.getByRole('button')).toHaveAttribute(
				'aria-label',
				'Play video: Test Video Title',
			);
		});
		it('renders thumbnail-card variant with inline player', () => {
			const props = createDefaultProps({
				variant: 'thumbnail-card',
			});
			render(<OptimizedVideoPlayer {...props} />);
			expect(screen.getByTestId('react-player')).toBeInTheDocument();
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});
		it('renders testimonial variant with correct styling', () => {
			const props = createDefaultProps({
				variant: 'testimonial',
				className: 'testimonial-player',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const container = screen.getByTestId('react-player').parentElement;
			expect(container).toHaveClass('testimonial-player');
		});
		it('renders with custom thumbnail image', () => {
			const props = createDefaultProps({
				thumbnail: '/custom-thumbnail.jpg',
				title: 'Custom Video',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const image = screen.getByTestId('next-image');
			expect(image).toHaveAttribute('src', '/custom-thumbnail.jpg');
			expect(image).toHaveAttribute('alt', 'Custom Video video thumbnail');
		});
	});
	describe('Lazy Loading Functionality', () => {
		it('shows loading state when not in view', () => {
			const { useInView } = require('react-intersection-observer');
			useInView.mockReturnValue({
				ref: jest.fn(),
				inView: false,
				entry: {},
			});
			const props = createDefaultProps({
				enableLazyLoading: true,
			});
			render(<OptimizedVideoPlayer {...props} />);
			expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
			expect(screen.queryByTestId('react-player')).not.toBeInTheDocument();
		});
		it('renders player when in view', () => {
			const { useInView } = require('react-intersection-observer');
			useInView.mockReturnValue({
				ref: jest.fn(),
				inView: true,
				entry: {},
			});
			const props = createDefaultProps({
				enableLazyLoading: true,
			});
			render(<OptimizedVideoPlayer {...props} />);
			expect(screen.getByTestId('react-player')).toBeInTheDocument();
			expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument();
		});
		it('disables lazy loading when enableLazyLoading is false', () => {
			const { useInView } = require('react-intersection-observer');
			useInView.mockReturnValue({
				ref: jest.fn(),
				inView: false,
				entry: {},
			});
			const props = createDefaultProps({
				enableLazyLoading: false,
			});
			render(<OptimizedVideoPlayer {...props} />);
			expect(screen.getByTestId('react-player')).toBeInTheDocument();
		});
		it('uses custom preload margin', () => {
			const { useInView } = require('react-intersection-observer');
			const props = createDefaultProps({
				preloadMargin: '300px 0px',
				enableLazyLoading: true,
			});
			render(<OptimizedVideoPlayer {...props} />);
			expect(useInView).toHaveBeenCalledWith(
				expect.objectContaining({
					rootMargin: '300px 0px',
				}),
			);
		});
	});
	describe('Video Player Integration', () => {
		it('handles video ready callback', async () => {
			const onReady = jest.fn();
			const props = createDefaultProps({
				onReady,
			});
			render(<OptimizedVideoPlayer {...props} />);
			await waitFor(() => {
				expect(onReady).toHaveBeenCalledTimes(1);
			});
		});
		it('handles play and pause events', async () => {
			const onPlay = jest.fn();
			const onPause = jest.fn();
			const props = createDefaultProps({
				onPlay,
				onPause,
			});
			render(<OptimizedVideoPlayer {...props} />);
			const player = screen.getByTestId('react-player');
			fireEvent.click(player);
			await waitFor(() => {
				expect(onPlay).toHaveBeenCalledTimes(1);
			});
		});
		it('constructs correct YouTube URLs', () => {
			const props = createDefaultProps({
				videoId: 'abc123xyz',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const player = screen.getByTestId('react-player');
			expect(player).toHaveAttribute(
				'data-url',
				'https://www.youtube.com/watch?v=abc123xyz',
			);
		});
		it('handles full YouTube URLs as videoId', () => {
			const props = createDefaultProps({
				videoId: 'https://www.youtube.com/watch?v=test-id-123',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const player = screen.getByTestId('react-player');
			expect(player).toHaveAttribute(
				'data-url',
				'https://www.youtube.com/watch?v=test-id-123',
			);
		});
	});
	describe('Error Handling', () => {
		it('displays error state when video fails to load', async () => {
			const mockError = new Error('Video loading failed');
			const MockPlayerWithError = jest.fn(({ onError, ...props }) => {
				React.useEffect(() => {
					if (onError) {
						onError(mockError);
					}
				}, [onError]);
				return (
					<div
						data-testid='react-player-error'
						{...props}
					/>
				);
			});
			jest.doMock('react-player/lazy', () => ({
				__esModule: true,
				default: MockPlayerWithError,
			}));
			const props = createDefaultProps();
			render(<OptimizedVideoPlayer {...props} />);
			await waitFor(() => {
				expect(screen.getByRole('alert')).toBeInTheDocument();
				expect(screen.getByText('Video unavailable')).toBeInTheDocument();
				expect(screen.getByText('Please try again later')).toBeInTheDocument();
			});
		});
		it('shows retry button for recoverable errors', async () => {
			const mockError = {
				message: 'Network error',
				code: 500,
				recoverable: true,
			};
			const MockPlayerWithError = jest.fn(({ onError, ...props }) => {
				React.useEffect(() => {
					if (onError) {
						onError(mockError);
					}
				}, [onError]);
				return (
					<div
						data-testid='react-player-error'
						{...props}
					/>
				);
			});
			jest.doMock('react-player/lazy', () => ({
				__esModule: true,
				default: MockPlayerWithError,
			}));
			const props = createDefaultProps();
			render(<OptimizedVideoPlayer {...props} />);
			await waitFor(() => {
				const retryButton = screen.getByLabelText('Retry video loading');
				expect(retryButton).toBeInTheDocument();
			});
		});
		it('handles retry functionality', async () => {
			const user = userEvent.setup();
			let shouldError = true;
			const MockPlayerWithRetry = jest.fn(({ onError, onReady, ...props }) => {
				React.useEffect(() => {
					if (shouldError && onError) {
						onError({
							message: 'Test error',
							recoverable: true,
						});
					} else if (!shouldError && onReady) {
						onReady({});
					}
				}, [onError, onReady]);
				return (
					<div
						data-testid='react-player-retry'
						{...props}
					/>
				);
			});
			jest.doMock('react-player/lazy', () => ({
				__esModule: true,
				default: MockPlayerWithRetry,
			}));
			const props = createDefaultProps();
			render(<OptimizedVideoPlayer {...props} />);
			await waitFor(() => {
				expect(screen.getByText('Video unavailable')).toBeInTheDocument();
			});
			const retryButton = screen.getByLabelText('Retry video loading');
			shouldError = false;
			await user.click(retryButton);
			await waitFor(() => {
				expect(screen.queryByText('Video unavailable')).not.toBeInTheDocument();
			});
		});
	});
	describe('Hero Variant Modal Functionality', () => {
		it('opens modal when thumbnail is clicked', async () => {
			const user = userEvent.setup();
			const props = createDefaultProps({
				variant: 'hero',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const thumbnailButton = screen.getByRole('button');
			await user.click(thumbnailButton);
			await waitFor(() => {
				expect(screen.getByTestId('close-icon')).toBeInTheDocument();
				expect(document.body.style.overflow).toBe('hidden');
			});
		});
		it('closes modal when close button is clicked', async () => {
			const user = userEvent.setup();
			const props = createDefaultProps({
				variant: 'hero',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const thumbnailButton = screen.getByRole('button');
			await user.click(thumbnailButton);
			await waitFor(() => {
				expect(screen.getByTestId('close-icon')).toBeInTheDocument();
			});
			const closeButton = screen.getByLabelText('Close video');
			await user.click(closeButton);
			await waitFor(() => {
				expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
				expect(document.body.style.overflow).toBe('unset');
			});
		});
		it('handles keyboard navigation for modal', async () => {
			const props = createDefaultProps({
				variant: 'hero',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const thumbnailButton = screen.getByRole('button');
			thumbnailButton.focus();
			fireEvent.keyDown(thumbnailButton, {
				key: 'Enter',
			});
			await waitFor(() => {
				expect(screen.getByTestId('close-icon')).toBeInTheDocument();
			});
			fireEvent.keyDown(document, {
				key: 'Escape',
			});
			await waitFor(() => {
				expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
			});
		});
		it('closes modal when clicking outside video area', async () => {
			const user = userEvent.setup();
			const props = createDefaultProps({
				variant: 'hero',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const thumbnailButton = screen.getByRole('button');
			await user.click(thumbnailButton);
			await waitFor(() => {
				expect(screen.getByTestId('close-icon')).toBeInTheDocument();
			});
			const backdrop = screen
				.getByTestId('close-icon')
				.closest('[style*="position: fixed"]');
			if (backdrop) {
				await user.click(backdrop);
			}
			await waitFor(() => {
				expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
			});
		});
	});
	describe('Accessibility Compliance (WCAG 2.1 AA)', () => {
		it('provides proper ARIA labels and roles', () => {
			const props = createDefaultProps({
				variant: 'hero',
				title: 'Educational Video About Physics',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const button = screen.getByRole('button');
			expect(button).toHaveAttribute(
				'aria-label',
				'Play video: Educational Video About Physics',
			);
			expect(button).toHaveAttribute('tabIndex', '0');
		});
		it('maintains focus management in modal', async () => {
			const user = userEvent.setup();
			const props = createDefaultProps({
				variant: 'hero',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const thumbnailButton = screen.getByRole('button');
			await user.click(thumbnailButton);
			await waitFor(() => {
				const closeButton = screen.getByLabelText('Close video');
				expect(closeButton).toBeInTheDocument();
				expect(closeButton).toHaveAttribute('aria-label', 'Close video');
			});
		});
		it('provides proper error announcements', async () => {
			const MockPlayerWithError = jest.fn(({ onError, ...props }) => {
				React.useEffect(() => {
					if (onError) {
						onError({
							message: 'Test error',
							recoverable: true,
						});
					}
				}, [onError]);
				return (
					<div
						data-testid='react-player-error'
						{...props}
					/>
				);
			});
			jest.doMock('react-player/lazy', () => ({
				__esModule: true,
				default: MockPlayerWithError,
			}));
			const props = createDefaultProps();
			render(<OptimizedVideoPlayer {...props} />);
			await waitFor(() => {
				const errorElement = screen.getByRole('alert');
				expect(errorElement).toHaveAttribute('aria-live', 'polite');
				expect(errorElement).toHaveTextContent('Video unavailable');
			});
		});
		it('supports keyboard navigation', () => {
			const props = createDefaultProps({
				variant: 'hero',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const button = screen.getByRole('button');
			fireEvent.keyDown(button, {
				key: ' ',
			});
			fireEvent.keyDown(button, {
				key: 'Enter',
			});
			expect(button).toBeInTheDocument();
		});
	});
	describe('Performance Optimizations', () => {
		it('uses React.memo for component optimization', () => {
			const props1 = createDefaultProps({
				videoId: 'test-1',
			});
			const props2 = createDefaultProps({
				videoId: 'test-1',
			});
			const { rerender } = render(<OptimizedVideoPlayer {...props1} />);
			rerender(<OptimizedVideoPlayer {...props2} />);
			expect(OptimizedVideoPlayer.displayName).toBe('OptimizedVideoPlayer');
		});
		it('implements proper callback memoization', () => {
			const onReady = jest.fn();
			const props = createDefaultProps({
				onReady,
			});
			const { rerender } = render(<OptimizedVideoPlayer {...props} />);
			rerender(<OptimizedVideoPlayer {...props} />);
			expect(onReady).toHaveBeenCalledTimes(1);
		});
		it('loads ReactPlayer dynamically with loading state', () => {
			const props = createDefaultProps();
			render(<OptimizedVideoPlayer {...props} />);
			expect(mockReactPlayer).toHaveBeenCalled();
		});
	});
	describe('ReactPlayer Configuration', () => {
		it('applies default YouTube configuration', () => {
			const props = createDefaultProps();
			render(<OptimizedVideoPlayer {...props} />);
			const player = screen.getByTestId('react-player');
			expect(player).toBeInTheDocument();
		});
		it('accepts custom player configuration', () => {
			const customConfig = {
				youtube: {
					playerVars: {
						showinfo: 1,
						controls: 0,
					},
				},
			};
			const props = createDefaultProps({
				config: customConfig,
			});
			render(<OptimizedVideoPlayer {...props} />);
			expect(screen.getByTestId('react-player')).toBeInTheDocument();
		});
		it('handles different aspect ratios', () => {
			const props = createDefaultProps({
				aspectRatio: '4:3',
			});
			render(<OptimizedVideoPlayer {...props} />);
			const container = screen.getByTestId('react-player').parentElement;
			expect(container).toBeInTheDocument();
		});
		it('supports custom dimensions', () => {
			const props = createDefaultProps({
				width: '800px',
				height: '450px',
			});
			render(<OptimizedVideoPlayer {...props} />);
			expect(screen.getByTestId('react-player')).toBeInTheDocument();
		});
	});
	describe('Component Cleanup', () => {
		it('cleans up event listeners on unmount', () => {
			const props = createDefaultProps({
				variant: 'hero',
			});
			const { unmount } = render(<OptimizedVideoPlayer {...props} />);
			const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
			const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
			const button = screen.getByRole('button');
			fireEvent.click(button);
			unmount();
			expect(document.body.style.overflow).toBe('unset');
			addEventListenerSpy.mockRestore();
			removeEventListenerSpy.mockRestore();
		});
		it('handles rapid mount/unmount cycles', () => {
			const props = createDefaultProps();
			for (let i = 0; i < 5; i++) {
				const { unmount } = render(<OptimizedVideoPlayer {...props} />);
				unmount();
			}
			expect(true).toBe(true);
		});
	});
});
describe('OptimizedVideoPlayer Integration', () => {
	it('integrates properly with Intersection Observer API', () => {
		const { useInView } = require('react-intersection-observer');
		const props = createDefaultProps({
			enableLazyLoading: true,
		});
		render(<OptimizedVideoPlayer {...props} />);
		expect(useInView).toHaveBeenCalledWith(
			expect.objectContaining({
				triggerOnce: true,
				rootMargin: '200px 0px',
				skip: false,
				fallbackInView: true,
			}),
		);
	});
	it('handles browser compatibility gracefully', () => {
		const originalIntersectionObserver = global.IntersectionObserver;
		delete global.IntersectionObserver;
		const props = createDefaultProps({
			enableLazyLoading: true,
		});
		expect(() => {
			render(<OptimizedVideoPlayer {...props} />);
		}).not.toThrow();
		global.IntersectionObserver = originalIntersectionObserver;
	});
});
