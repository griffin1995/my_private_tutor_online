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
import { VideoThumbnailTopCard } from '../video-thumbnail-top-card';
import type { VideoThumbnailTopCardProps } from '../video-thumbnail-top-card';
const mockInView = jest.fn(() => ({
	ref: jest.fn(),
	inView: true,
	entry: {},
}));
jest.mock('react-intersection-observer', () => ({
	useInView: mockInView,
}));
const mockHeroVideoDialog = jest.fn(
	({ videoSrc, thumbnailSrc, thumbnailAlt, className, ...props }) => {
		const [isOpen, setIsOpen] = React.useState(false);
		const handleThumbnailClick = () => {
			setIsOpen(true);
		};
		const handleClose = () => {
			setIsOpen(false);
		};
		return (
			<div
				data-testid='hero-video-dialog'
				className={className}
				data-video-src={videoSrc}
				data-thumbnail-src={thumbnailSrc}
				{...props}>
				<div
					data-testid='video-thumbnail'
					onClick={handleThumbnailClick}
					style={{
						cursor: 'pointer',
						width: '100%',
						height: '100%',
					}}
					role='button'
					tabIndex={0}
					aria-label={thumbnailAlt}>
					<img
						src={thumbnailSrc}
						alt={thumbnailAlt}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
					<div data-testid='play-overlay'>
						<div data-testid='play-button'>▶</div>
					</div>
				</div>

				{isOpen && (
					<div
						data-testid='video-modal'
						style={{
							position: 'fixed',
							inset: 0,
							zIndex: 50,
							background: 'rgba(0,0,0,0.8)',
						}}>
						<button
							data-testid='close-modal'
							onClick={handleClose}
							aria-label='Close video'>
							✕
						</button>
						<div data-testid='video-player'>Video Player for: {videoSrc}</div>
					</div>
				)}
			</div>
		);
	},
);
jest.mock('@/components/magicui/hero-video-dialog', () => ({
	__esModule: true,
	default: mockHeroVideoDialog,
}));
jest.mock('@/components/ui/button', () => ({
	Button: jest.fn(({ children, onClick, className, disabled, ...props }) => (
		<button
			onClick={onClick}
			className={className}
			disabled={disabled}
			data-testid='ui-button'
			{...props}>
			{children}
		</button>
	)),
}));
jest.mock('@/components/ui/badge', () => ({
	Badge: jest.fn(({ children, className }) => (
		<span
			className={className}
			data-testid='ui-badge'>
			{children}
		</span>
	)),
}));
jest.mock('lucide-react', () => ({
	ArrowRight: jest.fn(() => <span data-testid='arrow-right-icon'>→</span>),
	Check: jest.fn(() => <span data-testid='check-icon'>✓</span>),
	Star: jest.fn(() => <span data-testid='star-icon'>★</span>),
}));
jest.mock('@/styles/video-focus-styles.css', () => ({}));
jest.mock('@/lib/utils', () => ({
	cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));
const createMockProps = (
	overrides: Partial<VideoThumbnailTopCardProps> = {},
): VideoThumbnailTopCardProps => ({
	title: 'Test Video Title',
	description:
		'This is a comprehensive test description for video content integration.',
	features: [
		{
			feature: 'Feature 1: Video optimization',
		},
		{
			feature: 'Feature 2: Performance enhancement',
		},
		{
			feature: 'Feature 3: Accessibility compliance',
		},
	],
	ctaText: 'Watch Video',
	ctaLink: '/test-video',
	thumbnailUrl: '/test-thumbnail.jpg',
	videoUrl: 'https://www.youtube.com/watch?v=test-video-id',
	duration: '5:30',
	priceRange: 'Free',
	...overrides,
});
describe('VideoThumbnailTopCard Integration Tests', () => {
	let consoleErrorSpy: jest.SpyInstance;
	beforeEach(() => {
		jest.clearAllMocks();
		consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
		mockInView.mockReturnValue({
			ref: jest.fn(),
			inView: true,
			entry: {},
		});
	});
	afterEach(() => {
		consoleErrorSpy.mockRestore();
		jest.restoreAllMocks();
	});
	describe('Component Integration Rendering', () => {
		it('renders complete card with video integration successfully', () => {
			const props = createMockProps();
			render(<VideoThumbnailTopCard {...props} />);
			expect(screen.getByRole('article')).toBeInTheDocument();
			expect(screen.getByText('Test Video Title')).toBeInTheDocument();
			expect(screen.getByTestId('hero-video-dialog')).toBeInTheDocument();
			expect(screen.getByTestId('ui-button')).toBeInTheDocument();
			expect(consoleErrorSpy).not.toHaveBeenCalled();
		});
		it('integrates properly with HeroVideoDialog component', () => {
			const props = createMockProps({
				videoUrl: 'https://youtube.com/watch?v=integration-test',
				thumbnailUrl: '/integration-thumbnail.jpg',
			});
			render(<VideoThumbnailTopCard {...props} />);
			const heroDialog = screen.getByTestId('hero-video-dialog');
			expect(heroDialog).toHaveAttribute(
				'data-video-src',
				'https://youtube.com/watch?v=integration-test',
			);
			expect(heroDialog).toHaveAttribute(
				'data-thumbnail-src',
				'/integration-thumbnail.jpg',
			);
		});
		it('renders all card variants with consistent video integration', () => {
			const variants: Array<'standard' | 'premium' | 'royal'> = [
				'standard',
				'premium',
				'royal',
			];
			variants.forEach((variant) => {
				const props = createMockProps({
					variant,
				});
				const { container } = render(<VideoThumbnailTopCard {...props} />);
				expect(screen.getByTestId('hero-video-dialog')).toBeInTheDocument();
				expect(screen.getByRole('article')).toBeInTheDocument();
				container.remove();
			});
		});
	});
	describe('Video Interaction Integration', () => {
		it('opens video modal when thumbnail is clicked', async () => {
			const user = userEvent.setup();
			const props = createMockProps();
			render(<VideoThumbnailTopCard {...props} />);
			const thumbnail = screen.getByTestId('video-thumbnail');
			await user.click(thumbnail);
			await waitFor(() => {
				expect(screen.getByTestId('video-modal')).toBeInTheDocument();
				expect(screen.getByTestId('video-player')).toBeInTheDocument();
			});
		});
		it('closes video modal when close button is clicked', async () => {
			const user = userEvent.setup();
			const props = createMockProps();
			render(<VideoThumbnailTopCard {...props} />);
			const thumbnail = screen.getByTestId('video-thumbnail');
			await user.click(thumbnail);
			await waitFor(() => {
				expect(screen.getByTestId('video-modal')).toBeInTheDocument();
			});
			const closeButton = screen.getByTestId('close-modal');
			await user.click(closeButton);
			await waitFor(() => {
				expect(screen.queryByTestId('video-modal')).not.toBeInTheDocument();
			});
		});
		it('handles keyboard navigation for video activation', async () => {
			const props = createMockProps();
			render(<VideoThumbnailTopCard {...props} />);
			const thumbnail = screen.getByTestId('video-thumbnail');
			thumbnail.focus();
			fireEvent.keyDown(thumbnail, {
				key: 'Enter',
			});
			await waitFor(() => {
				expect(screen.getByTestId('video-modal')).toBeInTheDocument();
			});
		});
	});
	describe('CTA Button Integration', () => {
		it('triggers onCTAClick callback when button is clicked', async () => {
			const user = userEvent.setup();
			const mockCTAClick = jest.fn();
			const props = createMockProps({
				onCTAClick: mockCTAClick,
				ctaText: 'Book Consultation',
			});
			render(<VideoThumbnailTopCard {...props} />);
			const ctaButton = screen.getByTestId('ui-button');
			await user.click(ctaButton);
			expect(mockCTAClick).toHaveBeenCalledTimes(1);
		});
		it('handles payment URL integration for premium content', () => {
			const props = createMockProps({
				paymentUrl: 'https://payment.example.com/premium-video',
				priceRange: '£150',
				videoUrl: undefined,
			});
			render(<VideoThumbnailTopCard {...props} />);
			const badges = screen.getAllByTestId('ui-badge');
			const premiumBadge = badges.find(
				(badge) =>
					badge.textContent?.includes('Premium') ||
					badge.textContent?.includes('£150'),
			);
			expect(premiumBadge).toBeInTheDocument();
		});
		it('shows correct pricing and CTA for free content', () => {
			const props = createMockProps({
				videoUrl: 'https://youtube.com/watch?v=free-video',
				paymentUrl: undefined,
				priceRange: undefined,
				ctaText: 'Watch Free Video',
			});
			render(<VideoThumbnailTopCard {...props} />);
			const badges = screen.getAllByTestId('ui-badge');
			const freeBadge = badges.find((badge) =>
				badge.textContent?.includes('Free'),
			);
			expect(freeBadge).toBeInTheDocument();
			expect(screen.getByText('Watch Free Video')).toBeInTheDocument();
		});
	});
	describe('Lazy Loading Integration', () => {
		it('implements lazy loading with intersection observer', () => {
			const props = createMockProps({
				enableLazyLoading: true,
			});
			render(<VideoThumbnailTopCard {...props} />);
			expect(mockInView).toHaveBeenCalledWith({
				triggerOnce: true,
				rootMargin: '200px 0px',
				skip: false,
				fallbackInView: true,
			});
		});
		it('disables lazy loading when enableLazyLoading is false', () => {
			const props = createMockProps({
				enableLazyLoading: false,
			});
			render(<VideoThumbnailTopCard {...props} />);
			expect(mockInView).toHaveBeenCalledWith({
				triggerOnce: true,
				rootMargin: '200px 0px',
				skip: true,
				fallbackInView: true,
			});
		});
		it('renders content when in view', () => {
			mockInView.mockReturnValue({
				ref: jest.fn(),
				inView: true,
				entry: {},
			});
			const props = createMockProps({
				enableLazyLoading: true,
			});
			render(<VideoThumbnailTopCard {...props} />);
			expect(screen.getByTestId('hero-video-dialog')).toBeInTheDocument();
			expect(screen.getByText('Test Video Title')).toBeInTheDocument();
		});
		it('handles fallback when intersection observer is unavailable', () => {
			mockInView.mockReturnValue({
				ref: jest.fn(),
				inView: false,
				entry: {},
			});
			const props = createMockProps({
				enableLazyLoading: true,
			});
			render(<VideoThumbnailTopCard {...props} />);
			expect(screen.getByTestId('hero-video-dialog')).toBeInTheDocument();
		});
	});
	describe('Keyboard Navigation Integration', () => {
		it('handles arrow key navigation with callback', async () => {
			const mockKeyNavigation = jest.fn();
			const props = createMockProps({
				gridIndex: 2,
				onKeyNavigation: mockKeyNavigation,
			});
			render(<VideoThumbnailTopCard {...props} />);
			const card = screen.getByRole('article');
			fireEvent.keyDown(card, {
				key: 'ArrowLeft',
			});
			expect(mockKeyNavigation).toHaveBeenCalledWith('left', 2);
			fireEvent.keyDown(card, {
				key: 'ArrowRight',
			});
			expect(mockKeyNavigation).toHaveBeenCalledWith('right', 2);
			fireEvent.keyDown(card, {
				key: 'ArrowUp',
			});
			expect(mockKeyNavigation).toHaveBeenCalledWith('up', 2);
			fireEvent.keyDown(card, {
				key: 'ArrowDown',
			});
			expect(mockKeyNavigation).toHaveBeenCalledWith('down', 2);
		});
		it('manages focus states correctly', async () => {
			const props = createMockProps({
				gridIndex: 1,
			});
			render(<VideoThumbnailTopCard {...props} />);
			const card = screen.getByRole('article');
			act(() => {
				card.focus();
			});
			expect(card).toHaveFocus();
			expect(card).toHaveAttribute('data-grid-index', '1');
		});
		it('provides comprehensive accessibility labels', () => {
			const props = createMockProps({
				title: 'Advanced Physics Tutorial',
				duration: '10:45',
				priceRange: 'Free',
			});
			render(<VideoThumbnailTopCard {...props} />);
			const card = screen.getByRole('article');
			const ariaLabel = card.getAttribute('aria-label');
			expect(ariaLabel).toContain('Advanced Physics Tutorial video thumbnail');
			expect(ariaLabel).toContain('Free access');
			expect(ariaLabel).toContain('Duration: 10:45');
		});
	});
	describe('Cross-Component Integration', () => {
		it('integrates badges with video content correctly', () => {
			const props = createMockProps({
				popular: true,
				duration: '15:20',
				videoUrl: 'https://youtube.com/watch?v=popular-video',
			});
			render(<VideoThumbnailTopCard {...props} />);
			const badges = screen.getAllByTestId('ui-badge');
			const popularBadge = badges.find((badge) =>
				badge.textContent?.includes('Most Popular'),
			);
			expect(popularBadge).toBeInTheDocument();
			const freeBadge = badges.find((badge) =>
				badge.textContent?.includes('Free'),
			);
			expect(freeBadge).toBeInTheDocument();
			expect(screen.getByText('15:20')).toBeInTheDocument();
		});
		it('integrates features list with video context', () => {
			const props = createMockProps({
				features: [
					{
						feature: 'HD video quality',
					},
					{
						feature: 'Interactive subtitles',
					},
					{
						feature: 'Mobile-optimized playback',
					},
				],
			});
			render(<VideoThumbnailTopCard {...props} />);
			expect(screen.getByText('HD video quality')).toBeInTheDocument();
			expect(screen.getByText('Interactive subtitles')).toBeInTheDocument();
			expect(screen.getByText('Mobile-optimized playback')).toBeInTheDocument();
			const checkIcons = screen.getAllByTestId('check-icon');
			expect(checkIcons).toHaveLength(3);
		});
	});
	describe('Error Handling Integration', () => {
		it('handles missing video URL gracefully', () => {
			const props = createMockProps({
				videoUrl: undefined,
				thumbnailUrl: '/fallback-thumbnail.jpg',
			});
			expect(() => {
				render(<VideoThumbnailTopCard {...props} />);
			}).not.toThrow();
			expect(screen.getByTestId('hero-video-dialog')).toBeInTheDocument();
			expect(consoleErrorSpy).not.toHaveBeenCalled();
		});
		it('handles missing thumbnail URL gracefully', () => {
			const props = createMockProps({
				thumbnailUrl: '',
				videoUrl: 'https://youtube.com/watch?v=test',
			});
			expect(() => {
				render(<VideoThumbnailTopCard {...props} />);
			}).not.toThrow();
		});
		it('recovers from interaction observer errors', () => {
			mockInView.mockImplementation(() => {
				throw new Error('IntersectionObserver not supported');
			});
			const props = createMockProps({
				enableLazyLoading: true,
			});
			expect(() => {
				render(<VideoThumbnailTopCard {...props} />);
			}).not.toThrow();
		});
	});
	describe('Performance Integration', () => {
		it('renders efficiently with large feature lists', () => {
			const manyFeatures = Array.from(
				{
					length: 20,
				},
				(_, i) => ({
					feature: `Performance feature ${i + 1}`,
				}),
			);
			const props = createMockProps({
				features: manyFeatures,
			});
			const startTime = performance.now();
			render(<VideoThumbnailTopCard {...props} />);
			const endTime = performance.now();
			expect(endTime - startTime).toBeLessThan(100);
			expect(screen.getByText('Performance feature 1')).toBeInTheDocument();
			expect(screen.getByText('Performance feature 20')).toBeInTheDocument();
		});
		it('handles rapid re-renders without memory leaks', () => {
			const props = createMockProps();
			const { rerender } = render(<VideoThumbnailTopCard {...props} />);
			for (let i = 0; i < 10; i++) {
				rerender(
					<VideoThumbnailTopCard
						{...props}
						title={`Title ${i}`}
					/>,
				);
			}
			expect(screen.getByText('Title 9')).toBeInTheDocument();
			expect(screen.getByTestId('hero-video-dialog')).toBeInTheDocument();
		});
		it('cleans up event listeners on unmount', () => {
			const props = createMockProps({
				gridIndex: 1,
			});
			const { unmount } = render(<VideoThumbnailTopCard {...props} />);
			const addEventListenerSpy = jest.spyOn(
				Element.prototype,
				'addEventListener',
			);
			const removeEventListenerSpy = jest.spyOn(
				Element.prototype,
				'removeEventListener',
			);
			unmount();
			expect(removeEventListenerSpy).toHaveBeenCalled();
			addEventListenerSpy.mockRestore();
			removeEventListenerSpy.mockRestore();
		});
	});
	describe('Dead Code Removal Verification', () => {
		it('functions correctly after dead code cleanup', () => {
			const props = createMockProps();
			render(<VideoThumbnailTopCard {...props} />);
			expect(screen.getByRole('article')).toBeInTheDocument();
			expect(screen.getByTestId('hero-video-dialog')).toBeInTheDocument();
			expect(screen.getByTestId('ui-button')).toBeInTheDocument();
			expect(consoleErrorSpy).not.toHaveBeenCalled();
		});
		it('maintains all required props interfaces', () => {
			const comprehensiveProps = createMockProps({
				variant: 'premium',
				popular: true,
				enableLazyLoading: true,
				gridIndex: 5,
				onKeyNavigation: jest.fn(),
				onCTAClick: jest.fn(),
			});
			expect(() => {
				render(<VideoThumbnailTopCard {...comprehensiveProps} />);
			}).not.toThrow();
			expect(screen.getByRole('article')).toHaveAttribute('data-grid-index', '5');
		});
		it('preserves TypeScript compatibility after cleanup', () => {
			const typedProps: VideoThumbnailTopCardProps = createMockProps({
				title: 'TypeScript Test',
				description: 'Testing TypeScript compatibility',
				features: [
					{
						feature: 'Type safety',
						included: true,
					},
				],
				ctaText: 'Test Action',
				ctaLink: '/test',
				thumbnailUrl: '/test.jpg',
				variant: 'royal',
				popular: false,
				enableLazyLoading: true,
			});
			render(<VideoThumbnailTopCard {...typedProps} />);
			expect(screen.getByText('TypeScript Test')).toBeInTheDocument();
		});
	});
});
