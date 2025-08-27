// CONTEXT7 SOURCE: /jestjs/jest - Test data factory patterns for consistent test data generation
// FACTORY_REASON: Official Jest documentation patterns for creating reusable test data factories

// CONTEXT7 SOURCE: /testing-library/react-testing-library - Component testing data patterns
// TEST_DATA_REASON: Official React Testing Library patterns for component prop factories

/**
 * LOGO SECTION TEST DATA FACTORY - NAVBAR PHASE 5 TESTING
 * Created: August 27, 2025
 * Purpose: Comprehensive test data factory for LogoSection component testing
 * 
 * Test Coverage:
 * - All logo switching state combinations
 * - Responsive breakpoint scenarios
 * - Accessibility state variations
 * - Performance test configurations
 * - Error boundary scenarios
 */

import type { LogoSectionProps } from '../logo-section'

// CONTEXT7 SOURCE: /jestjs/jest - Test data factory base patterns
// BASE_FACTORY_REASON: Official Jest documentation for creating consistent test data generators
export interface LogoSectionTestFactory {
  props: LogoSectionProps
  expectedLogo: string
  expectedAltText: string
  testDescription: string
  accessibilityContext: string
}

// CONTEXT7 SOURCE: /jestjs/jest - Factory method patterns for test data generation
// FACTORY_METHODS_REASON: Official Jest documentation for factory pattern implementation
export class LogoSectionDataFactory {
  // CONTEXT7 SOURCE: /testing-library/react-testing-library - Component prop generation patterns
  // DEFAULT_PROPS_REASON: Official React Testing Library patterns for default component states
  static createDefaultProps(): LogoSectionProps {
    return {
      isTransparent: false,
      isHomepage: false,
      className: ''
    }
  }

  // CONTEXT7 SOURCE: /jestjs/jest - Test scenario factory patterns
  // SCENARIO_GENERATION_REASON: Official Jest documentation for creating comprehensive test scenarios
  static createTransparentNavbarProps(): LogoSectionProps {
    return {
      isTransparent: true,
      isHomepage: false,
      className: 'test-transparent-navbar'
    }
  }

  static createHomepageProps(): LogoSectionProps {
    return {
      isTransparent: false,
      isHomepage: true,
      className: 'test-homepage'
    }
  }

  static createTransparentHomepageProps(): LogoSectionProps {
    return {
      isTransparent: true,
      isHomepage: true,
      className: 'test-transparent-homepage'
    }
  }

  static createSolidNavbarProps(): LogoSectionProps {
    return {
      isTransparent: false,
      isHomepage: false,
      className: 'test-solid-navbar'
    }
  }

  // CONTEXT7 SOURCE: /jestjs/jest - Comprehensive test scenario matrix generation
  // MATRIX_GENERATION_REASON: Official Jest documentation for creating exhaustive test coverage
  static createAllLogicCombinations(): LogoSectionTestFactory[] {
    return [
      {
        props: { isTransparent: false, isHomepage: false },
        expectedLogo: '/images/logos/logo-with-name.png',
        expectedAltText: 'My Private Tutor Online',
        testDescription: 'Solid navbar, non-homepage - standard logo',
        accessibilityContext: 'Standard navigation state'
      },
      {
        props: { isTransparent: true, isHomepage: false },
        expectedLogo: '/images/logos/logo-with-name-white.png',
        expectedAltText: 'My Private Tutor Online - White Logo',
        testDescription: 'Transparent navbar, non-homepage - white logo',
        accessibilityContext: 'Transparent overlay navigation'
      },
      {
        props: { isTransparent: false, isHomepage: true },
        expectedLogo: '/images/logos/logo-with-name.png',
        expectedAltText: 'My Private Tutor Online',
        testDescription: 'Solid navbar, homepage - standard logo (homepage override)',
        accessibilityContext: 'Homepage standard navigation'
      },
      {
        props: { isTransparent: true, isHomepage: true },
        expectedLogo: '/images/logos/logo-with-name.png',
        expectedAltText: 'My Private Tutor Online',
        testDescription: 'Transparent navbar, homepage - standard logo (homepage override)',
        accessibilityContext: 'Homepage with transparent navbar override'
      }
    ]
  }

  // CONTEXT7 SOURCE: /testing-library/react-testing-library - Accessibility testing data patterns
  // A11Y_FACTORY_REASON: Official React Testing Library patterns for accessibility test scenarios
  static createAccessibilityTestScenarios(): Array<{
    props: LogoSectionProps
    ariaLabel: string
    role: string
    focusable: boolean
    testName: string
  }> {
    return [
      {
        props: this.createDefaultProps(),
        ariaLabel: 'My Private Tutor Online - Navigate to homepage',
        role: 'link',
        focusable: true,
        testName: 'Default accessibility configuration'
      },
      {
        props: this.createTransparentNavbarProps(),
        ariaLabel: 'My Private Tutor Online - Navigate to homepage',
        role: 'link',
        focusable: true,
        testName: 'Transparent navbar accessibility'
      },
      {
        props: this.createHomepageProps(),
        ariaLabel: 'My Private Tutor Online - Navigate to homepage',
        role: 'link',
        focusable: true,
        testName: 'Homepage accessibility configuration'
      }
    ]
  }

  // CONTEXT7 SOURCE: /jestjs/jest - Performance test data factory patterns
  // PERFORMANCE_FACTORY_REASON: Official Jest documentation for performance testing data generation
  static createPerformanceTestConfigs(): Array<{
    props: LogoSectionProps
    expectedImageAttributes: {
      priority: boolean
      loading: 'eager' | 'lazy'
      width: number
      height: number
    }
    testName: string
  }> {
    return [
      {
        props: this.createDefaultProps(),
        expectedImageAttributes: {
          priority: true,
          loading: 'eager',
          width: 175,
          height: 100
        },
        testName: 'Default performance configuration'
      },
      {
        props: this.createHomepageProps(),
        expectedImageAttributes: {
          priority: true,
          loading: 'eager',
          width: 175,
          height: 100
        },
        testName: 'Homepage performance optimization'
      }
    ]
  }

  // CONTEXT7 SOURCE: /jestjs/jest - Error boundary test data patterns
  // ERROR_BOUNDARY_REASON: Official Jest documentation for error condition testing
  static createErrorScenarios(): Array<{
    props: Partial<LogoSectionProps>
    expectedError?: string
    testName: string
  }> {
    return [
      {
        props: {},
        expectedError: undefined, // Should handle undefined props gracefully
        testName: 'Missing required props handling'
      },
      {
        props: { isTransparent: true },
        expectedError: undefined, // Should handle partial props
        testName: 'Partial props configuration'
      }
    ]
  }

  // CONTEXT7 SOURCE: /jestjs/jest - CSS class assertion factory patterns
  // CSS_TESTING_REASON: Official Jest documentation for CSS class testing utilities
  static createCSSTestScenarios(): Array<{
    props: LogoSectionProps
    expectedClasses: string[]
    hoverClasses: string[]
    testName: string
  }> {
    return [
      {
        props: this.createDefaultProps(),
        expectedClasses: [
          'h-12', 'lg:h-16', 'xl:h-20', 'w-auto', 'object-contain',
          'transition-all', 'duration-300', 'ease-in-out',
          'will-change-transform', 'hover:brightness-110'
        ],
        hoverClasses: [
          'hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.2)]'
        ],
        testName: 'Standard logo CSS classes'
      },
      {
        props: this.createTransparentNavbarProps(),
        expectedClasses: [
          'h-12', 'lg:h-16', 'xl:h-20', 'w-auto', 'object-contain',
          'transition-all', 'duration-300', 'ease-in-out',
          'will-change-transform', 'hover:brightness-110'
        ],
        hoverClasses: [
          'hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
        ],
        testName: 'Transparent navbar white glow CSS classes'
      }
    ]
  }
}

// CONTEXT7 SOURCE: /jestjs/jest - Mock data generation utilities
// MOCK_GENERATION_REASON: Official Jest documentation for mock data creation patterns
export const createMockImageProps = () => ({
  src: '/images/logos/logo-with-name.png',
  alt: 'My Private Tutor Online',
  width: 175,
  height: 100,
  priority: true,
  loading: 'eager' as const,
  className: expect.any(String)
})

export const createMockLinkProps = () => ({
  href: '/',
  className: expect.stringContaining('focus:outline-none'),
  'aria-label': 'My Private Tutor Online - Navigate to homepage'
})

// CONTEXT7 SOURCE: /jestjs/jest - Test assertion helper factory patterns
// ASSERTION_HELPERS_REASON: Official Jest documentation for reusable assertion utilities
export const LogoSectionTestHelpers = {
  // CONTEXT7 SOURCE: /testing-library/react-testing-library - DOM query assertion patterns
  // DOM_ASSERTIONS_REASON: Official React Testing Library patterns for DOM element assertions
  assertLogoImage: (container: HTMLElement, expectedSrc: string, expectedAlt: string) => {
    const logoImage = container.querySelector('img')
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('src', expectedSrc)
    expect(logoImage).toHaveAttribute('alt', expectedAlt)
    expect(logoImage).toHaveAttribute('width', '175')
    expect(logoImage).toHaveAttribute('height', '100')
  },

  assertLinkElement: (container: HTMLElement) => {
    const linkElement = container.querySelector('a[href="/"]')
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('aria-label', 'My Private Tutor Online - Navigate to homepage')
    expect(linkElement).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2')
  },

  assertResponsiveClasses: (container: HTMLElement) => {
    const logoImage = container.querySelector('img')
    expect(logoImage).toHaveClass('h-12', 'lg:h-16', 'xl:h-20', 'w-auto', 'object-contain')
  },

  assertPerformanceOptimizations: (container: HTMLElement) => {
    const logoImage = container.querySelector('img')
    expect(logoImage).toHaveAttribute('loading', 'eager')
    expect(logoImage).toHaveClass('will-change-transform')
  }
}