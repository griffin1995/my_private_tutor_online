import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PageHero } from '../page-hero';
describe('PageHero', () => {
	describe('Basic Rendering', () => {
		it('renders hero section with default configuration', () => {
			render(
				<PageHero>
					<h1>Test Hero Content</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toBeInTheDocument();
			expect(heroSection).toHaveAttribute('aria-label', 'Page hero section');
			expect(screen.getByText('Test Hero Content')).toBeInTheDocument();
		});
		it('applies default props correctly', () => {
			render(
				<PageHero>
					<h1>Default Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass(
				'bg-gradient-to-br',
				'from-white',
				'via-primary-50',
				'to-accent-50',
			);
			expect(heroSection).toHaveClass('min-h-[600px]', 'py-24');
			expect(heroSection).toHaveClass('justify-center', 'items-center');
		});
		it('renders children content correctly', () => {
			render(
				<PageHero>
					<div data-testid='hero-content'>
						<h1>Hero Title</h1>
						<p>Hero description</p>
						<button>CTA Button</button>
					</div>
				</PageHero>,
			);
			const heroContent = screen.getByTestId('hero-content');
			expect(heroContent).toBeInTheDocument();
			expect(screen.getByText('Hero Title')).toBeInTheDocument();
			expect(screen.getByText('Hero description')).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: /cta button/i,
				}),
			).toBeInTheDocument();
		});
	});
	describe('Background Variants', () => {
		it('renders white background variant', () => {
			render(
				<PageHero background='white'>
					<h1>White Background Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('bg-white');
		});
		it('renders gradient background variant', () => {
			render(
				<PageHero background='gradient'>
					<h1>Gradient Background Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass(
				'bg-gradient-to-br',
				'from-white',
				'via-primary-50',
				'to-accent-50',
			);
		});
		it('renders image background variant with provided image', () => {
			render(
				<PageHero
					background='image'
					backgroundImage='/test-hero-image.jpg'>
					<h1>Image Background Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('bg-cover', 'bg-center', 'bg-no-repeat');
			expect(heroSection).toHaveStyle(
				'background-image: url(/test-hero-image.jpg)',
			);
		});
		it('renders video background variant with HTML5 video', () => {
			render(
				<PageHero
					background='video'
					backgroundVideo='/test-hero-video.mp4'>
					<h1>Video Background Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('relative', 'overflow-hidden');
			const video = screen.getByLabelText(/background video/i);
			expect(video).toBeInTheDocument();
			expect(video).toHaveAttribute('autoplay');
			expect(video).toHaveAttribute('muted');
			expect(video).toHaveAttribute('loop');
			expect(video).toHaveAttribute('playsInline');
			expect(video).toHaveAttribute('preload', 'metadata');
			expect(video).toHaveAttribute('disablePictureInPicture');
		});
		it('includes video fallback sources and error message', () => {
			render(
				<PageHero
					background='video'
					backgroundVideo='/test-video.mp4'>
					<h1>Video Hero</h1>
				</PageHero>,
			);
			const video = screen.getByLabelText(/background video/i);
			const sources = video.querySelectorAll('source');
			expect(sources).toHaveLength(2);
			expect(sources[0]).toHaveAttribute('src', '/test-video.mp4');
			expect(sources[0]).toHaveAttribute('type', 'video/mp4');
			expect(sources[1]).toHaveAttribute('src', '/test-video.webm');
			expect(sources[1]).toHaveAttribute('type', 'video/webm');
			expect(video).toHaveTextContent(
				'Your browser does not support the video tag.',
			);
		});
		it('includes static fallback background for video', () => {
			render(
				<PageHero
					background='video'
					backgroundVideo='/test-video.mp4'>
					<h1>Video Hero</h1>
				</PageHero>,
			);
			const fallbackBg = document.querySelector(
				'.bg-gradient-to-br.from-primary-900',
			);
			expect(fallbackBg).toBeInTheDocument();
			expect(fallbackBg).toHaveClass('-z-10');
		});
	});
	describe('Size Variants', () => {
		it('renders small size variant', () => {
			render(
				<PageHero size='sm'>
					<h1>Small Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('min-h-[400px]', 'py-16');
		});
		it('renders medium size variant', () => {
			render(
				<PageHero size='md'>
					<h1>Medium Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('min-h-[500px]', 'py-20');
		});
		it('renders large size variant', () => {
			render(
				<PageHero size='lg'>
					<h1>Large Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('min-h-[600px]', 'py-24');
		});
		it('renders extra large size variant', () => {
			render(
				<PageHero size='xl'>
					<h1>Extra Large Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('min-h-[700px]', 'py-32');
		});
		it('renders full screen variant with proper layout breaking', () => {
			render(
				<PageHero size='full'>
					<h1>Full Screen Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('h-screen', 'w-full', 'overflow-hidden');
			expect(heroSection).toHaveClass(
				'-mx-4',
				'sm:-mx-6',
				'lg:-mx-8',
				'w-[calc(100%+2rem)]',
				'sm:w-[calc(100%+3rem)]',
				'lg:w-[calc(100%+4rem)]',
			);
		});
	});
	describe('Alignment Options', () => {
		it('renders with left text alignment', () => {
			render(
				<PageHero alignment='left'>
					<h1>Left Aligned Hero</h1>
				</PageHero>,
			);
			const contentContainer = document.querySelector('.text-left');
			expect(contentContainer).toBeInTheDocument();
		});
		it('renders with center text alignment', () => {
			render(
				<PageHero alignment='center'>
					<h1>Center Aligned Hero</h1>
				</PageHero>,
			);
			const contentContainer = document.querySelector('.text-center');
			expect(contentContainer).toBeInTheDocument();
		});
		it('renders with right text alignment', () => {
			render(
				<PageHero alignment='right'>
					<h1>Right Aligned Hero</h1>
				</PageHero>,
			);
			const contentContainer = document.querySelector('.text-right');
			expect(contentContainer).toBeInTheDocument();
		});
		it('renders with top vertical alignment', () => {
			render(
				<PageHero verticalAlignment='top'>
					<h1>Top Aligned Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('justify-start', 'items-start');
		});
		it('renders with center vertical alignment', () => {
			render(
				<PageHero verticalAlignment='center'>
					<h1>Center Aligned Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('justify-center', 'items-center');
		});
		it('renders with bottom vertical alignment', () => {
			render(
				<PageHero verticalAlignment='bottom'>
					<h1>Bottom Aligned Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('justify-end', 'items-end');
		});
	});
	describe('Overlay Features', () => {
		it('renders without overlay by default', () => {
			render(
				<PageHero
					background='image'
					backgroundImage='/test.jpg'>
					<h1>No Overlay Hero</h1>
				</PageHero>,
			);
			const overlay = document.querySelector('.bg-black\\/40');
			expect(overlay).not.toBeInTheDocument();
		});
		it('renders with light overlay when enabled', () => {
			render(
				<PageHero
					background='image'
					backgroundImage='/test.jpg'
					overlay={true}
					overlayOpacity='light'>
					<h1>Light Overlay Hero</h1>
				</PageHero>,
			);
			const overlay = document.querySelector('.bg-black\\/20');
			expect(overlay).toBeInTheDocument();
			expect(overlay).toHaveClass('absolute', 'inset-0', 'z-10');
			expect(overlay).toHaveAttribute('aria-hidden', 'true');
		});
		it('renders with medium overlay when enabled', () => {
			render(
				<PageHero
					background='image'
					backgroundImage='/test.jpg'
					overlay={true}
					overlayOpacity='medium'>
					<h1>Medium Overlay Hero</h1>
				</PageHero>,
			);
			const overlay = document.querySelector('.bg-black\\/40');
			expect(overlay).toBeInTheDocument();
		});
		it('renders with dark overlay when enabled', () => {
			render(
				<PageHero
					background='image'
					backgroundImage='/test.jpg'
					overlay={true}
					overlayOpacity='dark'>
					<h1>Dark Overlay Hero</h1>
				</PageHero>,
			);
			const overlay = document.querySelector('.bg-black\\/60');
			expect(overlay).toBeInTheDocument();
		});
	});
	describe('Content Layout', () => {
		it('provides proper content container structure', () => {
			render(
				<PageHero>
					<h1>Content Structure Test</h1>
				</PageHero>,
			);
			const contentContainer = document.querySelector('.relative.z-20');
			expect(contentContainer).toBeInTheDocument();
			const innerContainer = document.querySelector('.container.mx-auto');
			expect(innerContainer).toBeInTheDocument();
			expect(innerContainer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
		});
		it('applies correct max-width for different sizes', () => {
			const { rerender } = render(
				<PageHero size='lg'>
					<h1>Regular Size Hero</h1>
				</PageHero>,
			);
			let maxWidthContainer = document.querySelector('.max-w-4xl');
			expect(maxWidthContainer).toBeInTheDocument();
			rerender(
				<PageHero size='full'>
					<h1>Full Size Hero</h1>
				</PageHero>,
			);
			maxWidthContainer = document.querySelector('.max-w-7xl');
			expect(maxWidthContainer).toBeInTheDocument();
		});
		it('maintains proper content visibility above backgrounds', () => {
			render(
				<PageHero
					background='video'
					backgroundVideo='/test.mp4'>
					<h1>Content Visibility Test</h1>
				</PageHero>,
			);
			const video = screen.getByLabelText(/background video/i);
			expect(video).toHaveClass('z-0');
			const contentContainer = document.querySelector('.relative.z-20');
			expect(contentContainer).toBeInTheDocument();
			expect(screen.getByText('Content Visibility Test')).toBeInTheDocument();
		});
	});
	describe('Accessibility Features', () => {
		it('provides proper ARIA landmarks', () => {
			render(
				<PageHero>
					<h1>Accessible Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveAttribute('aria-label', 'Page hero section');
		});
		it('hides decorative elements from screen readers', () => {
			render(
				<PageHero
					background='video'
					backgroundVideo='/test.mp4'
					overlay={true}>
					<h1>Accessibility Test</h1>
				</PageHero>,
			);
			const video = screen.getByLabelText(/background video/i);
			expect(video).toHaveAttribute('aria-label', 'Background video');
			const overlay = document.querySelector('.bg-black\\/40');
			expect(overlay).toHaveAttribute('aria-hidden', 'true');
			const fallbackBg = document.querySelector('.bg-gradient-to-br.-z-10');
			expect(fallbackBg).toHaveAttribute('aria-hidden', 'true');
		});
		it('provides fallback content for video backgrounds', () => {
			render(
				<PageHero
					background='video'
					backgroundVideo='/test.mp4'>
					<h1>Video Accessibility</h1>
				</PageHero>,
			);
			const video = screen.getByLabelText(/background video/i);
			expect(video).toHaveTextContent(
				'Your browser does not support the video tag.',
			);
		});
	});
	describe('Performance Optimizations', () => {
		it('uses optimized video loading attributes', () => {
			render(
				<PageHero
					background='video'
					backgroundVideo='/test.mp4'>
					<h1>Performance Test</h1>
				</PageHero>,
			);
			const video = screen.getByLabelText(/background video/i);
			expect(video).toHaveAttribute('preload', 'metadata');
			expect(video).toHaveAttribute('disablePictureInPicture');
			expect(video).toHaveAttribute('playsInline');
		});
		it('includes video optimization styles', () => {
			render(
				<PageHero
					background='video'
					backgroundVideo='/test.mp4'>
					<h1>Video Optimization</h1>
				</PageHero>,
			);
			const video = screen.getByLabelText(/background video/i);
			expect(video).toHaveClass(
				'absolute',
				'inset-0',
				'w-full',
				'h-full',
				'object-cover',
			);
			const computedStyle = window.getComputedStyle(video);
			expect(video).toHaveStyle(
				'filter: brightness(0.75) contrast(1.1) saturate(1.1)',
			);
		});
	});
	describe('Custom Styling', () => {
		it('accepts and applies custom className', () => {
			render(
				<PageHero className='custom-hero-class'>
					<h1>Custom Styled Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('custom-hero-class');
		});
		it('combines custom classes with default classes', () => {
			render(
				<PageHero
					className='custom-class'
					size='sm'
					background='white'>
					<h1>Combined Classes</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('custom-class', 'bg-white', 'min-h-[400px]');
		});
	});
	describe('Edge Cases', () => {
		it('handles missing backgroundImage gracefully', () => {
			render(
				<PageHero background='image'>
					<h1>Missing Image Background</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('bg-cover', 'bg-center', 'bg-no-repeat');
			expect(heroSection).not.toHaveAttribute('style');
		});
		it('handles missing backgroundVideo gracefully', () => {
			render(
				<PageHero background='video'>
					<h1>Missing Video Background</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('relative', 'overflow-hidden');
			const video = screen.queryByLabelText(/background video/i);
			expect(video).not.toBeInTheDocument();
		});
		it('handles empty children gracefully', () => {
			render(<PageHero />);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toBeInTheDocument();
		});
	});
	describe('Responsive Design', () => {
		it('applies responsive container padding', () => {
			render(
				<PageHero>
					<h1>Responsive Test</h1>
				</PageHero>,
			);
			const container = document.querySelector('.container.mx-auto');
			expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
		});
		it('uses responsive negative margins for full-size heroes', () => {
			render(
				<PageHero size='full'>
					<h1>Full Responsive Hero</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass(
				'-mx-4',
				'sm:-mx-6',
				'lg:-mx-8',
				'w-[calc(100%+2rem)]',
				'sm:w-[calc(100%+3rem)]',
				'lg:w-[calc(100%+4rem)]',
			);
		});
	});
	describe('Integration with Fixed Header', () => {
		it('uses proper full-screen sizing for fixed header overlay', () => {
			render(
				<PageHero size='full'>
					<h1>Fixed Header Integration</h1>
				</PageHero>,
			);
			const heroSection = screen.getByRole('banner');
			expect(heroSection).toHaveClass('h-screen', 'w-full');
			expect(heroSection).not.toHaveClass('mt-', 'pt-');
			expect(heroSection).toHaveClass('overflow-hidden');
		});
	});
});
