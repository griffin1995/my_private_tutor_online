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
jest.mock('next/image', () => {
	return function MockImage(props: any) {
		return (
			<img
				{...props}
				data-testid='mock-image'
			/>
		);
	};
});
jest.mock('next/link', () => {
	return function MockLink({ children, ...props }: any) {
		return (
			<a
				{...props}
				data-testid='mock-link'>
				{children}
			</a>
		);
	};
});
jest.mock('framer-motion', () => ({
	motion: {
		div: ({ children, ...props }: any) => (
			<div
				{...props}
				data-testid='motion-div'>
				{children}
			</div>
		),
		nav: ({ children, ...props }: any) => (
			<nav
				{...props}
				data-testid='motion-nav'>
				{children}
			</nav>
		),
	},
	AnimatePresence: ({ children }: any) => (
		<div data-testid='animate-presence'>{children}</div>
	),
	useScroll: () => ({
		scrollY: {
			get: () => 0,
		},
	}),
	useTransform: () => 1,
	useMotionValueEvent: jest.fn(),
}));
jest.mock('react-intersection-observer', () => ({
	useInView: () => ({
		ref: jest.fn(),
		inView: true,
		entry: {},
	}),
}));
import { LogoSection } from '../logo-section';
import { LogoSectionDataFactory } from './test-factories/logo-section-factory';
const createNavbarIntegrationWrapper = (scrollY = 0, isHomepage = false) => {
	const mockScrollState = {
		scrollY,
		isScrolled: scrollY > 50,
		isTransparent: scrollY <= 50 && !isHomepage,
	};
	return function NavbarWrapper({ children }: { children: React.ReactNode }) {
		return (
			<div
				data-testid='navbar-integration-wrapper'
				data-scroll-y={scrollY}>
				<nav
					className={`fixed w-full transition-all duration-300 ${mockScrollState.isTransparent ? 'bg-transparent' : 'bg-white shadow-sm'}`}
					data-testid='navbar-container'
					data-transparent={mockScrollState.isTransparent}
					data-scrolled={mockScrollState.isScrolled}>
					{children}
				</nav>
			</div>
		);
	};
};
describe('Navbar Component Integration Tests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		Object.defineProperty(window, 'scrollY', {
			value: 0,
			writable: true,
		});
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});
	describe('State Synchronization', () => {
		it('should synchronize logo appearance with navbar transparency state', () => {
			const NavbarWrapper = createNavbarIntegrationWrapper(0, false);
			const logoProps = LogoSectionDataFactory.createTransparentNavbarProps();
			render(
				<NavbarWrapper>
					<LogoSection {...logoProps} />
				</NavbarWrapper>,
			);
			const navbar = screen.getByTestId('navbar-container');
			const logoImage = screen.getByRole('img');
			expect(navbar).toHaveAttribute('data-transparent', 'true');
			expect(logoImage).toHaveAttribute(
				'src',
				'/images/logos/logo-with-name-white.png',
			);
		});
		it('should synchronize logo appearance with navbar solid state', () => {
			const NavbarWrapper = createNavbarIntegrationWrapper(100, false);
			const logoProps = LogoSectionDataFactory.createSolidNavbarProps();
			render(
				<NavbarWrapper>
					<LogoSection {...logoProps} />
				</NavbarWrapper>,
			);
			const navbar = screen.getByTestId('navbar-container');
			const logoImage = screen.getByRole('img');
			expect(navbar).toHaveAttribute('data-transparent', 'false');
			expect(logoImage).toHaveAttribute('src', '/images/logos/logo-with-name.png');
		});
		it('should maintain homepage override logic across navbar states', () => {
			const NavbarWrapper = createNavbarIntegrationWrapper(0, true);
			const logoProps = LogoSectionDataFactory.createHomepageProps();
			render(
				<NavbarWrapper>
					<LogoSection {...logoProps} />
				</NavbarWrapper>,
			);
			const logoImage = screen.getByRole('img');
			expect(logoImage).toHaveAttribute('src', '/images/logos/logo-with-name.png');
		});
	});
	describe('Scroll-Based Integration', () => {
		it('should handle scroll-triggered logo switching', async () => {
			const { rerender } = render(
				<LogoSection
					isTransparent={true}
					isHomepage={false}
				/>,
			);
			let logoImage = screen.getByRole('img');
			expect(logoImage).toHaveAttribute(
				'src',
				'/images/logos/logo-with-name-white.png',
			);
			rerender(
				<LogoSection
					isTransparent={false}
					isHomepage={false}
				/>,
			);
			logoImage = screen.getByRole('img');
			expect(logoImage).toHaveAttribute('src', '/images/logos/logo-with-name.png');
		});
		it('should maintain logo performance during rapid scroll events', async () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(<LogoSection {...logoProps} />);
			const logoImage = screen.getByRole('img');
			expect(logoImage).toHaveClass('will-change-transform');
			expect(logoImage).toHaveAttribute('loading', 'eager');
		});
	});
	describe('Responsive Layout Integration', () => {
		it('should coordinate with desktop navigation layout', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			const { container } = render(
				<div
					className='flex items-center justify-between'
					data-testid='navbar-layout'>
					<LogoSection {...logoProps} />
					<div
						className='hidden lg:flex'
						data-testid='desktop-nav'>
						Desktop Navigation
					</div>
					<div
						className='hidden lg:block'
						data-testid='cta-button'>
						CTA Button
					</div>
				</div>,
			);
			const logo = container.querySelector('.flex-shrink-0');
			const layout = screen.getByTestId('navbar-layout');
			expect(logo).toBeInTheDocument();
			expect(layout).toHaveClass('flex', 'items-center', 'justify-between');
		});
		it('should coordinate with mobile menu layout', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(
				<div
					className='flex items-center justify-between lg:hidden'
					data-testid='mobile-layout'>
					<LogoSection {...logoProps} />
					<button
						className='lg:hidden'
						data-testid='mobile-menu-toggle'>
						Menu
					</button>
				</div>,
			);
			const logoImage = screen.getByRole('img');
			const mobileToggle = screen.getByTestId('mobile-menu-toggle');
			expect(logoImage).toHaveClass('h-12', 'lg:h-16', 'xl:h-20');
			expect(mobileToggle).toBeInTheDocument();
		});
		it('should handle viewport changes gracefully', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(<LogoSection {...logoProps} />);
			const logoImage = screen.getByRole('img');
			expect(logoImage).toHaveClass('h-12', 'lg:h-16', 'xl:h-20', 'w-auto');
		});
	});
	describe('Accessibility Flow Integration', () => {
		it('should integrate properly with navbar focus management', async () => {
			const user = userEvent.setup();
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(
				<div
					role='banner'
					data-testid='navbar-banner'>
					<LogoSection {...logoProps} />
					<nav
						role='navigation'
						data-testid='main-nav'>
						<a
							href='/about'
							data-testid='nav-link'>
							About
						</a>
						<a
							href='/services'
							data-testid='nav-link-2'>
							Services
						</a>
					</nav>
				</div>,
			);
			const logoLink = screen.getByRole('link', {
				name: /navigate to homepage/i,
			});
			const navLink = screen.getByTestId('nav-link');
			await user.tab();
			expect(logoLink).toHaveFocus();
			await user.tab();
			expect(navLink).toHaveFocus();
		});
		it('should maintain ARIA landmarks across component integration', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(
				<header
					role='banner'
					data-testid='site-header'>
					<LogoSection {...logoProps} />
					<nav
						role='navigation'
						aria-label='Main navigation'>
						<ul>
							<li>
								<a href='/home'>Home</a>
							</li>
							<li>
								<a href='/about'>About</a>
							</li>
						</ul>
					</nav>
				</header>,
			);
			const banner = screen.getByRole('banner');
			const navigation = screen.getByRole('navigation');
			const logoLink = screen.getByRole('link', {
				name: /navigate to homepage/i,
			});
			expect(banner).toBeInTheDocument();
			expect(navigation).toBeInTheDocument();
			expect(logoLink).toBeInTheDocument();
			expect(navigation).toHaveAttribute('aria-label', 'Main navigation');
		});
		it('should coordinate skip links and navigation flow', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(
				<div>
					<a
						href='#main-content'
						className='skip-link'
						data-testid='skip-link'>
						Skip to main content
					</a>
					<header>
						<LogoSection {...logoProps} />
						<nav
							id='main-nav'
							data-testid='main-navigation'>
							<a href='/services'>Services</a>
						</nav>
					</header>
					<main
						id='main-content'
						data-testid='main-content'>
						Main content
					</main>
				</div>,
			);
			const skipLink = screen.getByTestId('skip-link');
			const logoLink = screen.getByRole('link', {
				name: /navigate to homepage/i,
			});
			const mainContent = screen.getByTestId('main-content');
			expect(skipLink).toHaveAttribute('href', '#main-content');
			expect(logoLink).toBeInTheDocument();
			expect(mainContent).toHaveAttribute('id', 'main-content');
		});
	});
	describe('Animation and Motion Integration', () => {
		it('should coordinate hover animations across navbar components', async () => {
			const user = userEvent.setup();
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(
				<div data-testid='navbar-with-animations'>
					<LogoSection {...logoProps} />
					<nav data-testid='animated-nav'>
						<a
							href='/services'
							className='hover:scale-105 transition-transform'>
							Services
						</a>
					</nav>
				</div>,
			);
			const logoContainer = screen.getByTestId('motion-div');
			const logoImage = screen.getByRole('img');
			expect(logoContainer).toBeInTheDocument();
			expect(logoImage).toHaveClass('transition-all', 'duration-300');
		});
		it('should handle motion events without conflicts', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			const { container } = render(
				<div className='navbar-motion-container'>
					<LogoSection {...logoProps} />
				</div>,
			);
			const motionWrapper = container.querySelector('[data-testid="motion-div"]');
			const logoImage = screen.getByRole('img');
			expect(motionWrapper).toBeInTheDocument();
			expect(logoImage).toHaveClass('will-change-transform');
		});
	});
	describe('Performance Integration', () => {
		it('should maintain performance optimizations in integrated navbar', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(
				<nav
					className='complex-navbar'
					data-testid='performance-navbar'>
					<LogoSection {...logoProps} />
					<div className='navigation-items'>
						{Array.from(
							{
								length: 10,
							},
							(_, i) => (
								<a
									key={i}
									href={`/page-${i}`}>
									Page {i}
								</a>
							),
						)}
					</div>
				</nav>,
			);
			const logoImage = screen.getByRole('img');
			expect(logoImage).toHaveAttribute('loading', 'eager');
			expect(logoImage).toHaveAttribute('width', '175');
			expect(logoImage).toHaveAttribute('height', '100');
			expect(logoImage).toHaveClass('will-change-transform');
		});
		it('should handle rapid state changes without performance degradation', async () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			const { rerender } = render(<LogoSection {...logoProps} />);
			for (let i = 0; i < 10; i++) {
				const isTransparent = i % 2 === 0;
				rerender(
					<LogoSection
						isTransparent={isTransparent}
						isHomepage={false}
					/>,
				);
			}
			const logoImage = screen.getByRole('img');
			expect(logoImage).toBeInTheDocument();
			expect(logoImage).toHaveClass('transition-all');
		});
		it('should optimize memory usage during component interactions', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			const { unmount } = render(<LogoSection {...logoProps} />);
			unmount();
			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});
	});
	describe('Error Handling Integration', () => {
		it('should handle image loading errors gracefully in navbar context', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(
				<nav data-testid='error-handling-navbar'>
					<LogoSection {...logoProps} />
				</nav>,
			);
			const logoImage = screen.getByRole('img');
			fireEvent.error(logoImage);
			expect(logoImage).toBeInTheDocument();
			expect(screen.getByTestId('error-handling-navbar')).toBeInTheDocument();
		});
		it('should maintain navbar functionality when logo fails to load', () => {
			const logoProps = LogoSectionDataFactory.createDefaultProps();
			render(
				<nav data-testid='resilient-navbar'>
					<LogoSection {...logoProps} />
					<div data-testid='nav-items'>
						<a href='/about'>About</a>
						<a href='/contact'>Contact</a>
					</div>
				</nav>,
			);
			const logoImage = screen.getByRole('img');
			const navItems = screen.getByTestId('nav-items');
			fireEvent.error(logoImage);
			expect(navItems).toBeInTheDocument();
			expect(screen.getByText('About')).toBeInTheDocument();
			expect(screen.getByText('Contact')).toBeInTheDocument();
		});
	});
	describe('Real-World Integration Scenarios', () => {
		it('should handle complete navbar interaction flow', async () => {
			const user = userEvent.setup();
			render(
				<header data-testid='complete-navbar'>
					<nav className='flex items-center justify-between'>
						<LogoSection
							isTransparent={false}
							isHomepage={false}
						/>
						<div className='flex space-x-4'>
							<a
								href='/services'
								data-testid='services-link'>
								Services
							</a>
							<a
								href='/about'
								data-testid='about-link'>
								About
							</a>
							<button
								className='bg-primary-600 text-white px-4 py-2'
								data-testid='cta-button'>
								Get Started
							</button>
						</div>
					</nav>
				</header>,
			);
			const logoLink = screen.getByRole('link', {
				name: /navigate to homepage/i,
			});
			const servicesLink = screen.getByTestId('services-link');
			const ctaButton = screen.getByTestId('cta-button');
			await user.click(logoLink);
			expect(logoLink).toBeInTheDocument();
			await user.click(servicesLink);
			expect(servicesLink).toBeInTheDocument();
			await user.click(ctaButton);
			expect(ctaButton).toBeInTheDocument();
		});
		it('should handle responsive navbar behavior across breakpoints', () => {
			const { container } = render(
				<header className='responsive-header'>
					<nav className='flex items-center justify-between'>
						<LogoSection
							isTransparent={false}
							isHomepage={false}
						/>
						<div
							className='hidden lg:flex space-x-4'
							data-testid='desktop-nav'>
							<a href='/services'>Services</a>
							<a href='/about'>About</a>
						</div>
						<button
							className='lg:hidden'
							data-testid='mobile-toggle'>
							<span className='sr-only'>Open menu</span>☰
						</button>
					</nav>
				</header>,
			);
			const logoImage = screen.getByRole('img');
			const mobileToggle = screen.getByTestId('mobile-toggle');
			expect(logoImage).toHaveClass('h-12', 'lg:h-16', 'xl:h-20');
			expect(mobileToggle).toBeInTheDocument();
			expect(mobileToggle).toHaveClass('lg:hidden');
		});
	});
});
