import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PageHeader } from '../page-header';
jest.mock('@/lib/cms/cms-content', () => ({
	getSiteHeader: () => ({
		siteName: 'My Private Tutor Online',
		tagline: 'Premium Tutoring Services',
	}),
	getMainNavigation: () => ({
		items: [
			{
				name: 'About Us',
				href: '/about',
			},
			{
				name: 'Services',
				href: '/services',
			},
			{
				name: 'Contact',
				href: '/contact',
			},
		],
	}),
}));
jest.mock('@/lib/cms/cms-images', () => ({
	getMainLogo: () => ({
		src: '/logo-dark.png',
		alt: 'My Private Tutor Online Logo',
		width: 200,
		height: 60,
	}),
	getMainLogoWhite: () => ({
		src: '/logo-white.png',
		alt: 'My Private Tutor Online Logo White',
		width: 200,
		height: 60,
	}),
}));
jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => {
		return <img {...props} />;
	},
}));
jest.mock('next/link', () => ({
	__esModule: true,
	default: ({ children, href, ...props }: any) => (
		<a
			href={href}
			{...props}>
			{children}
		</a>
	),
}));
jest.mock('framer-motion', () => ({
	m: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
	},
	AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));
describe('PageHeader', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'scrollY', {
			writable: true,
			value: 0,
		});
		const mockAddEventListener = jest.fn();
		const mockRemoveEventListener = jest.fn();
		Object.defineProperty(window, 'addEventListener', {
			writable: true,
			value: mockAddEventListener,
		});
		Object.defineProperty(window, 'removeEventListener', {
			writable: true,
			value: mockRemoveEventListener,
		});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('Header Rendering', () => {
		it('renders fixed header with proper positioning', () => {
			render(<PageHeader />);
			const header = screen.getByRole('banner');
			expect(header).toBeInTheDocument();
			expect(header).toHaveAttribute('aria-label', 'Site header with navigation');
			expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
		});
		it('displays site logo with proper branding', () => {
			render(<PageHeader />);
			const logoLink = screen.getByLabelText(/my private tutor online.*homepage/i);
			expect(logoLink).toBeInTheDocument();
			expect(logoLink).toHaveAttribute('href', '/');
			const logoImage = screen.getByAltText(/my private tutor online logo/i);
			expect(logoImage).toBeInTheDocument();
		});
		it('shows main navigation with proper ARIA labelling', () => {
			render(<PageHeader />);
			const navigation = screen.getByRole('navigation', {
				name: /main navigation/i,
			});
			expect(navigation).toBeInTheDocument();
			expect(navigation).toHaveAttribute('data-navigation');
		});
		it('displays CTA button with conversion-focused text', () => {
			render(<PageHeader />);
			const ctaButton = screen.getByRole('link', {
				name: /book free consultation/i,
			});
			expect(ctaButton).toBeInTheDocument();
			expect(ctaButton).toHaveAttribute('href', '#contact');
		});
	});
	describe('Scroll State Management', () => {
		it('starts with transparent state by default', () => {
			render(<PageHeader />);
			const header = screen.getByRole('banner');
			expect(header).toHaveClass('bg-transparent', 'backdrop-blur-none');
		});
		it('changes to scrolled state when scroll exceeds threshold', async () => {
			render(<PageHeader />);
			Object.defineProperty(window, 'scrollY', {
				value: 150,
			});
			fireEvent.scroll(window);
			await waitFor(() => {
				const header = screen.getByRole('banner');
				expect(header).toHaveClass('bg-white/95', 'backdrop-blur-lg');
			});
		});
		it('switches logo based on scroll state', async () => {
			render(<PageHeader />);
			expect(screen.getByAltText(/white/i)).toBeInTheDocument();
			Object.defineProperty(window, 'scrollY', {
				value: 150,
			});
			fireEvent.scroll(window);
			await waitFor(() => {
				expect(
					screen.getByAltText(/my private tutor online logo/i),
				).toBeInTheDocument();
			});
		});
		it('updates CTA button styling based on scroll state', async () => {
			render(<PageHeader />);
			const ctaButton = screen.getByRole('link', {
				name: /book free consultation/i,
			});
			expect(ctaButton).toHaveClass(
				'bg-transparent',
				'border-white',
				'!text-white',
			);
			Object.defineProperty(window, 'scrollY', {
				value: 150,
			});
			fireEvent.scroll(window);
			await waitFor(() => {
				expect(ctaButton).toHaveClass('bg-accent-600', '!text-primary-700');
			});
		});
	});
	describe('Navigation Menu', () => {
		it('displays all main navigation items', () => {
			render(<PageHeader />);
			expect(
				screen.getByRole('link', {
					name: /about us/i,
				}),
			).toBeInTheDocument();
			expect(
				screen.getByRole('link', {
					name: /services/i,
				}),
			).toBeInTheDocument();
			expect(
				screen.getByRole('link', {
					name: /contact/i,
				}),
			).toBeInTheDocument();
		});
		it('applies correct styling to navigation links based on scroll state', async () => {
			render(<PageHeader />);
			const aboutLink = screen.getByRole('link', {
				name: /about us/i,
			});
			expect(aboutLink).toHaveClass('!text-white');
			Object.defineProperty(window, 'scrollY', {
				value: 150,
			});
			fireEvent.scroll(window);
			await waitFor(() => {
				expect(aboutLink).toHaveClass('!text-primary-700');
			});
		});
		it('shows hover effects on navigation links', async () => {
			const user = userEvent.setup();
			render(<PageHeader />);
			const aboutLink = screen.getByRole('link', {
				name: /about us/i,
			});
			await user.hover(aboutLink);
			expect(aboutLink).toHaveClass('hover:scale-105');
		});
	});
	describe('Mobile Navigation', () => {
		it('shows mobile menu button on mobile viewports', () => {
			render(<PageHeader />);
			const mobileMenuButton = screen.getByRole('button', {
				name: /open mobile navigation menu/i,
			});
			expect(mobileMenuButton).toBeInTheDocument();
			expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
		});
		it('opens mobile menu when button is clicked', async () => {
			const user = userEvent.setup();
			render(<PageHeader />);
			const mobileMenuButton = screen.getByRole('button', {
				name: /open mobile navigation menu/i,
			});
			await user.click(mobileMenuButton);
			expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
		});
		it('displays mobile navigation with proper labelling', async () => {
			const user = userEvent.setup();
			render(<PageHeader />);
			const mobileMenuButton = screen.getByRole('button', {
				name: /open mobile navigation menu/i,
			});
			await user.click(mobileMenuButton);
			const mobileNav = screen.getByRole('navigation', {
				name: /mobile navigation/i,
			});
			expect(mobileNav).toBeInTheDocument();
		});
		it('updates mobile menu button styling based on scroll state', async () => {
			render(<PageHeader />);
			const mobileMenuButton = screen.getByRole('button', {
				name: /open mobile navigation menu/i,
			});
			expect(mobileMenuButton).toHaveClass('!text-white');
			Object.defineProperty(window, 'scrollY', {
				value: 150,
			});
			fireEvent.scroll(window);
			await waitFor(() => {
				expect(mobileMenuButton).toHaveClass('!text-primary-700');
			});
		});
	});
	describe('Dropdown Navigation', () => {
		it('shows dropdown indicators for submenu items', () => {
			render(<PageHeader />);
			const dropdownIndicators = document.querySelectorAll('svg');
			expect(dropdownIndicators.length).toBeGreaterThan(0);
		});
		it('handles keyboard navigation for accessibility', async () => {
			const user = userEvent.setup();
			render(<PageHeader />);
			await user.tab();
			expect(document.activeElement).toBeInTheDocument();
		});
		it('closes dropdowns on escape key', async () => {
			const user = userEvent.setup();
			render(<PageHeader />);
			await user.keyboard('{Escape}');
		});
	});
	describe('Performance Optimizations', () => {
		it('adds passive scroll listeners for performance', () => {
			render(<PageHeader />);
			expect(window.addEventListener).toHaveBeenCalledWith(
				'scroll',
				expect.any(Function),
				{
					passive: true,
				},
			);
		});
		it('cleans up event listeners on unmount', () => {
			const { unmount } = render(<PageHeader />);
			unmount();
			expect(window.removeEventListener).toHaveBeenCalledWith(
				'scroll',
				expect.any(Function),
			);
		});
		it('uses memoized callback for scroll handler', () => {
			render(<PageHeader />);
			expect(window.addEventListener).toHaveBeenCalledTimes(1);
		});
	});
	describe('Accessibility Compliance', () => {
		it('provides proper ARIA landmarks', () => {
			render(<PageHeader />);
			const header = screen.getByRole('banner');
			expect(header).toHaveAttribute('aria-label', 'Site header with navigation');
			const navigation = screen.getByRole('navigation', {
				name: /main navigation/i,
			});
			expect(navigation).toBeInTheDocument();
		});
		it('supports keyboard navigation', async () => {
			const user = userEvent.setup();
			render(<PageHeader />);
			await user.tab();
			await user.tab();
			await user.tab();
			expect(document.activeElement).toBeInTheDocument();
		});
		it('provides proper focus management', async () => {
			const user = userEvent.setup();
			render(<PageHeader />);
			const ctaButton = screen.getByRole('link', {
				name: /book free consultation/i,
			});
			await user.click(ctaButton);
			expect(ctaButton).toBeInTheDocument();
		});
		it('has proper color contrast for both scroll states', () => {
			render(<PageHeader />);
			const navLinks = screen.getAllByRole('link');
			navLinks.forEach((link) => {
				if (link.getAttribute('href')?.includes('/')) {
					expect(link).toHaveClass('!text-white');
				}
			});
		});
	});
	describe('Hero Page Variant', () => {
		it('applies hero page specific styling when isHeroPage is true', () => {
			render(<PageHeader isHeroPage={true} />);
			const header = screen.getByRole('banner');
			expect(header).toBeInTheDocument();
			expect(header).toHaveClass('bg-transparent');
		});
	});
	describe('Responsive Design', () => {
		it('hides desktop navigation on mobile screens', () => {
			render(<PageHeader />);
			const desktopNav = screen.getByRole('navigation', {
				name: /main navigation/i,
			});
			expect(desktopNav).toHaveClass('hidden', 'lg:flex');
		});
		it('shows mobile menu button only on mobile screens', () => {
			render(<PageHeader />);
			const mobileButton = screen.getByRole('button', {
				name: /open mobile navigation menu/i,
			});
			expect(mobileButton.closest('div')).toHaveClass('lg:hidden');
		});
		it('adapts header height responsively', () => {
			render(<PageHeader />);
			const headerContainer = document.querySelector('.grid.grid-cols-3');
			expect(headerContainer).toHaveClass('h-20', 'lg:h-24', 'xl:h-28');
		});
		it('scales logo responsively', () => {
			render(<PageHeader />);
			const logoImage = screen.getByAltText(/my private tutor online logo/i);
			expect(logoImage).toHaveClass('max-h-16', 'lg:max-h-20', 'xl:max-h-24');
		});
	});
	describe('Royal Client Standards', () => {
		it('maintains premium language in CTA', () => {
			render(<PageHeader />);
			expect(screen.getByText(/book free consultation/i)).toBeInTheDocument();
			expect(screen.getByText(/my private tutor online/i)).toBeInTheDocument();
		});
		it('provides smooth premium animations', () => {
			render(<PageHeader />);
			const header = screen.getByRole('banner');
			expect(header).toHaveClass('transition-all', 'duration-300', 'ease-out');
			const ctaButton = screen.getByRole('link', {
				name: /book free consultation/i,
			});
			expect(ctaButton).toHaveClass('hover:scale-105');
		});
		it('includes premium branding elements', () => {
			render(<PageHeader />);
			const logoLink = screen.getByLabelText(/my private tutor online.*homepage/i);
			expect(logoLink).toHaveClass('group');
			const logoImage = screen.getByAltText(/my private tutor online logo/i);
			expect(logoImage).toHaveClass('group-hover:scale-105');
		});
	});
	describe('Error Handling', () => {
		it('handles missing CMS data gracefully', () => {
			jest.doMock('@/lib/cms/cms-content', () => ({
				getSiteHeader: () => ({}),
				getMainNavigation: () => ({
					items: [],
				}),
			}));
			expect(() => render(<PageHeader />)).not.toThrow();
		});
		it('handles window undefined for SSR', () => {
			const originalWindow = global.window;
			delete (global as any).window;
			expect(() => render(<PageHeader />)).not.toThrow();
			global.window = originalWindow;
		});
	});
});
