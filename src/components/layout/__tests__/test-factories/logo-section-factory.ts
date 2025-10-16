import type { LogoSectionProps } from '../logo-section';
export interface LogoSectionTestFactory {
	props: LogoSectionProps;
	expectedLogo: string;
	expectedAltText: string;
	testDescription: string;
	accessibilityContext: string;
}
export class LogoSectionDataFactory {
	static createDefaultProps(): LogoSectionProps {
		return {
			isTransparent: false,
			isHomepage: false,
			className: '',
		};
	}
	static createTransparentNavbarProps(): LogoSectionProps {
		return {
			isTransparent: true,
			isHomepage: false,
			className: 'test-transparent-navbar',
		};
	}
	static createHomepageProps(): LogoSectionProps {
		return {
			isTransparent: false,
			isHomepage: true,
			className: 'test-homepage',
		};
	}
	static createTransparentHomepageProps(): LogoSectionProps {
		return {
			isTransparent: true,
			isHomepage: true,
			className: 'test-transparent-homepage',
		};
	}
	static createSolidNavbarProps(): LogoSectionProps {
		return {
			isTransparent: false,
			isHomepage: false,
			className: 'test-solid-navbar',
		};
	}
	static createAllLogicCombinations(): LogoSectionTestFactory[] {
		return [
			{
				props: {
					isTransparent: false,
					isHomepage: false,
				},
				expectedLogo: '/images/logos/logo-with-name.png',
				expectedAltText: 'My Private Tutor Online',
				testDescription: 'Solid navbar, non-homepage - standard logo',
				accessibilityContext: 'Standard navigation state',
			},
			{
				props: {
					isTransparent: true,
					isHomepage: false,
				},
				expectedLogo: '/images/logos/logo-with-name-white.png',
				expectedAltText: 'My Private Tutor Online - White Logo',
				testDescription: 'Transparent navbar, non-homepage - white logo',
				accessibilityContext: 'Transparent overlay navigation',
			},
			{
				props: {
					isTransparent: false,
					isHomepage: true,
				},
				expectedLogo: '/images/logos/logo-with-name.png',
				expectedAltText: 'My Private Tutor Online',
				testDescription:
					'Solid navbar, homepage - standard logo (homepage override)',
				accessibilityContext: 'Homepage standard navigation',
			},
			{
				props: {
					isTransparent: true,
					isHomepage: true,
				},
				expectedLogo: '/images/logos/logo-with-name.png',
				expectedAltText: 'My Private Tutor Online',
				testDescription:
					'Transparent navbar, homepage - standard logo (homepage override)',
				accessibilityContext: 'Homepage with transparent navbar override',
			},
		];
	}
	static createAccessibilityTestScenarios(): Array<{
		props: LogoSectionProps;
		ariaLabel: string;
		role: string;
		focusable: boolean;
		testName: string;
	}> {
		return [
			{
				props: this.createDefaultProps(),
				ariaLabel: 'My Private Tutor Online - Navigate to homepage',
				role: 'link',
				focusable: true,
				testName: 'Default accessibility configuration',
			},
			{
				props: this.createTransparentNavbarProps(),
				ariaLabel: 'My Private Tutor Online - Navigate to homepage',
				role: 'link',
				focusable: true,
				testName: 'Transparent navbar accessibility',
			},
			{
				props: this.createHomepageProps(),
				ariaLabel: 'My Private Tutor Online - Navigate to homepage',
				role: 'link',
				focusable: true,
				testName: 'Homepage accessibility configuration',
			},
		];
	}
	static createPerformanceTestConfigs(): Array<{
		props: LogoSectionProps;
		expectedImageAttributes: {
			priority: boolean;
			loading: 'eager' | 'lazy';
			width: number;
			height: number;
		};
		testName: string;
	}> {
		return [
			{
				props: this.createDefaultProps(),
				expectedImageAttributes: {
					priority: true,
					loading: 'eager',
					width: 175,
					height: 100,
				},
				testName: 'Default performance configuration',
			},
			{
				props: this.createHomepageProps(),
				expectedImageAttributes: {
					priority: true,
					loading: 'eager',
					width: 175,
					height: 100,
				},
				testName: 'Homepage performance optimization',
			},
		];
	}
	static createErrorScenarios(): Array<{
		props: Partial<LogoSectionProps>;
		expectedError?: string;
		testName: string;
	}> {
		return [
			{
				props: {},
				expectedError: undefined,
				testName: 'Missing required props handling',
			},
			{
				props: {
					isTransparent: true,
				},
				expectedError: undefined,
				testName: 'Partial props configuration',
			},
		];
	}
	static createCSSTestScenarios(): Array<{
		props: LogoSectionProps;
		expectedClasses: string[];
		hoverClasses: string[];
		testName: string;
	}> {
		return [
			{
				props: this.createDefaultProps(),
				expectedClasses: [
					'h-12',
					'lg:h-16',
					'xl:h-20',
					'w-auto',
					'object-contain',
					'transition-all',
					'duration-300',
					'ease-in-out',
					'will-change-transform',
					'hover:brightness-110',
				],
				hoverClasses: ['hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.2)]'],
				testName: 'Standard logo CSS classes',
			},
			{
				props: this.createTransparentNavbarProps(),
				expectedClasses: [
					'h-12',
					'lg:h-16',
					'xl:h-20',
					'w-auto',
					'object-contain',
					'transition-all',
					'duration-300',
					'ease-in-out',
					'will-change-transform',
					'hover:brightness-110',
				],
				hoverClasses: ['hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'],
				testName: 'Transparent navbar white glow CSS classes',
			},
		];
	}
}
export const createMockImageProps = () => ({
	src: '/images/logos/logo-with-name.png',
	alt: 'My Private Tutor Online',
	width: 175,
	height: 100,
	priority: true,
	loading: 'eager' as const,
	className: expect.any(String),
});
export const createMockLinkProps = () => ({
	href: '/',
	className: expect.stringContaining('focus:outline-none'),
	'aria-label': 'My Private Tutor Online - Navigate to homepage',
});
export const LogoSectionTestHelpers = {
	assertLogoImage: (
		container: HTMLElement,
		expectedSrc: string,
		expectedAlt: string,
	) => {
		const logoImage = container.querySelector('img');
		expect(logoImage).toBeInTheDocument();
		expect(logoImage).toHaveAttribute('src', expectedSrc);
		expect(logoImage).toHaveAttribute('alt', expectedAlt);
		expect(logoImage).toHaveAttribute('width', '175');
		expect(logoImage).toHaveAttribute('height', '100');
	},
	assertLinkElement: (container: HTMLElement) => {
		const linkElement = container.querySelector('a[href="/"]');
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute(
			'aria-label',
			'My Private Tutor Online - Navigate to homepage',
		);
		expect(linkElement).toHaveClass(
			'focus:outline-none',
			'focus:ring-2',
			'focus:ring-offset-2',
		);
	},
	assertResponsiveClasses: (container: HTMLElement) => {
		const logoImage = container.querySelector('img');
		expect(logoImage).toHaveClass(
			'h-12',
			'lg:h-16',
			'xl:h-20',
			'w-auto',
			'object-contain',
		);
	},
	assertPerformanceOptimizations: (container: HTMLElement) => {
		const logoImage = container.querySelector('img');
		expect(logoImage).toHaveAttribute('loading', 'eager');
		expect(logoImage).toHaveClass('will-change-transform');
	},
};
