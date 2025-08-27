// CONTEXT7 SOURCE: /testing-library/react-testing-library - React component testing patterns
// TESTING_REASON: Official React Testing Library documentation for component testing best practices

// CONTEXT7 SOURCE: /jestjs/jest - Jest testing framework setup and mocking patterns
// JEST_SETUP_REASON: Official Jest documentation for test suite organization and mock configuration

/**
 * LOGO SECTION COMPONENT TEST SUITE - NAVBAR PHASE 5 TESTING
 * Created: August 27, 2025
 * Purpose: Comprehensive testing for LogoSection component functionality
 * Coverage: Unit tests, accessibility, performance, integration scenarios
 * 
 * Test Categories:
 * 1. Logo switching logic (transparent vs solid states)
 * 2. Homepage override functionality
 * 3. Responsive sizing and CSS classes
 * 4. Hover effects and animations
 * 5. Accessibility compliance (WCAG 2.1 AA)
 * 6. Performance optimizations
 * 7. Error boundary scenarios
 * 8. Integration with Framer Motion
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// CONTEXT7 SOURCE: /jestjs/jest - Mock configuration for external dependencies
// MOCKING_REASON: Official Jest documentation for module mocking patterns
jest.mock('next/image', () => {
  return function MockImage(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  }
})

jest.mock('next/link', () => {
  return function MockLink({ children, ...props }: any) {
    return <a {...props}>{children}</a>
  }
})

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}))

// Import component and test utilities
import { LogoSection } from '../logo-section'
import { 
  LogoSectionDataFactory, 
  LogoSectionTestHelpers,
  createMockImageProps,
  createMockLinkProps
} from './test-factories/logo-section-factory'

// CONTEXT7 SOURCE: /testing-library/react-testing-library - Test suite organization patterns
// SUITE_ORGANIZATION_REASON: Official React Testing Library documentation for test structure

describe('LogoSection Component', () => {
  // CONTEXT7 SOURCE: /jestjs/jest - Test setup and teardown patterns
  // SETUP_REASON: Official Jest documentation for beforeEach and afterEach usage
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  // CONTEXT7 SOURCE: /testing-library/react-testing-library - Basic rendering tests
  // RENDER_TESTS_REASON: Official React Testing Library patterns for component rendering verification
  describe('Basic Rendering', () => {
    it('should render without crashing with default props', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      const { container } = render(<LogoSection {...props} />)
      
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render logo image with correct attributes', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      expect(logoImage).toBeInTheDocument()
      expect(logoImage).toHaveAttribute('width', '175')
      expect(logoImage).toHaveAttribute('height', '100')
      expect(logoImage).toHaveAttribute('loading', 'eager')
    })

    it('should render navigation link with correct accessibility attributes', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const linkElement = screen.getByRole('link')
      expect(linkElement).toBeInTheDocument()
      expect(linkElement).toHaveAttribute('href', '/')
      expect(linkElement).toHaveAttribute('aria-label', 'My Private Tutor Online - Navigate to homepage')
    })
  })

  // CONTEXT7 SOURCE: /testing-library/react-testing-library - Conditional rendering test patterns
  // CONDITIONAL_TESTS_REASON: Official React Testing Library documentation for testing conditional component behavior
  describe('Logo Switching Logic', () => {
    it('should display standard logo for solid navbar on non-homepage', () => {
      const props = LogoSectionDataFactory.createSolidNavbarProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      expect(logoImage).toHaveAttribute('src', '/images/logos/logo-with-name.png')
      expect(logoImage).toHaveAttribute('alt', 'My Private Tutor Online')
    })

    it('should display white logo for transparent navbar on non-homepage', () => {
      const props = LogoSectionDataFactory.createTransparentNavbarProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      expect(logoImage).toHaveAttribute('src', '/images/logos/logo-with-name-white.png')
      expect(logoImage).toHaveAttribute('alt', 'My Private Tutor Online - White Logo')
    })

    it('should display standard logo on homepage regardless of navbar transparency (homepage override)', () => {
      const props = LogoSectionDataFactory.createTransparentHomepageProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      expect(logoImage).toHaveAttribute('src', '/images/logos/logo-with-name.png')
      expect(logoImage).toHaveAttribute('alt', 'My Private Tutor Online')
    })

    // CONTEXT7 SOURCE: /jestjs/jest - Parameterized test patterns using test.each
    // PARAMETERIZED_TESTS_REASON: Official Jest documentation for data-driven testing
    it.each(LogoSectionDataFactory.createAllLogicCombinations())(
      'should handle logo switching correctly: $testDescription',
      ({ props, expectedLogo, expectedAltText, accessibilityContext }) => {
        render(<LogoSection {...props} />)
        
        const logoImage = screen.getByRole('img')
        expect(logoImage).toHaveAttribute('src', expectedLogo)
        expect(logoImage).toHaveAttribute('alt', expectedAltText)
        
        // Verify accessibility context is maintained
        const linkElement = screen.getByRole('link')
        expect(linkElement).toHaveAttribute('aria-label', expect.stringContaining('My Private Tutor Online'))
      }
    )
  })

  // CONTEXT7 SOURCE: /testing-library/react-testing-library - CSS class testing patterns
  // CSS_TESTING_REASON: Official React Testing Library documentation for class and style assertions
  describe('Responsive Design and CSS Classes', () => {
    it('should apply correct responsive sizing classes', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      expect(logoImage).toHaveClass('h-12', 'lg:h-16', 'xl:h-20', 'w-auto', 'object-contain')
    })

    it('should apply performance optimization classes', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      expect(logoImage).toHaveClass(
        'transition-all', 
        'duration-300', 
        'ease-in-out',
        'will-change-transform'
      )
    })

    it('should apply correct hover effect classes for solid navbar', () => {
      const props = LogoSectionDataFactory.createSolidNavbarProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      expect(logoImage).toHaveClass('hover:brightness-110')
      expect(logoImage.className).toMatch(/hover:drop-shadow-\[0_0_8px_rgba\(37,99,235,0\.2\)\]/)
    })

    it('should apply correct hover effect classes for transparent navbar', () => {
      const props = LogoSectionDataFactory.createTransparentNavbarProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      expect(logoImage).toHaveClass('hover:brightness-110')
      expect(logoImage.className).toMatch(/hover:drop-shadow-\[0_0_8px_rgba\(255,255,255,0\.3\)\]/)
    })

    it('should include custom className when provided', () => {
      const customClassName = 'custom-logo-class'
      const props = { ...LogoSectionDataFactory.createDefaultProps(), className: customClassName }
      
      const { container } = render(<LogoSection {...props} />)
      
      const logoContainer = container.querySelector('.flex-shrink-0')
      expect(logoContainer).toHaveClass(customClassName)
    })
  })

  // CONTEXT7 SOURCE: /testing-library/react-testing-library - User interaction testing patterns
  // INTERACTION_TESTS_REASON: Official React Testing Library documentation for user event testing
  describe('User Interactions', () => {
    it('should be focusable and keyboard navigable', async () => {
      const user = userEvent.setup()
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const linkElement = screen.getByRole('link')
      
      await user.tab()
      expect(linkElement).toHaveFocus()
    })

    it('should handle click events', async () => {
      const user = userEvent.setup()
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const linkElement = screen.getByRole('link')
      
      // Should not throw when clicked
      await user.click(linkElement)
      expect(linkElement).toBeInTheDocument()
    })

    it('should handle keyboard activation (Enter key)', async () => {
      const user = userEvent.setup()
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const linkElement = screen.getByRole('link')
      linkElement.focus()
      
      // Should not throw when Enter is pressed
      await user.keyboard('{Enter}')
      expect(linkElement).toBeInTheDocument()
    })

    it('should handle keyboard activation (Space key)', async () => {
      const user = userEvent.setup()
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const linkElement = screen.getByRole('link')
      linkElement.focus()
      
      // Should not throw when Space is pressed
      await user.keyboard(' ')
      expect(linkElement).toBeInTheDocument()
    })
  })

  // CONTEXT7 SOURCE: /testing-library/react-testing-library - Accessibility testing patterns
  // A11Y_TESTING_REASON: Official React Testing Library documentation for accessibility compliance testing
  describe('Accessibility Compliance (WCAG 2.1 AA)', () => {
    it.each(LogoSectionDataFactory.createAccessibilityTestScenarios())(
      'should meet accessibility requirements: $testName',
      ({ props, ariaLabel, role, focusable }) => {
        render(<LogoSection {...props} />)
        
        const linkElement = screen.getByRole(role as any)
        expect(linkElement).toBeInTheDocument()
        expect(linkElement).toHaveAttribute('aria-label', ariaLabel)
        
        if (focusable) {
          // Links are focusable by default, check that it's not disabled
          expect(linkElement).not.toHaveAttribute('tabindex', '-1')
        }
      }
    )

    it('should provide proper focus indicators', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const linkElement = screen.getByRole('link')
      expect(linkElement).toHaveClass(
        'focus:outline-none',
        'focus:ring-2', 
        'focus:ring-offset-2',
        'focus:ring-primary-500'
      )
    })

    it('should have proper semantic structure', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      const { container } = render(<LogoSection {...props} />)
      
      // Should have proper link containing image structure
      const linkElement = container.querySelector('a')
      const imageElement = linkElement?.querySelector('img')
      
      expect(linkElement).toBeInTheDocument()
      expect(imageElement).toBeInTheDocument()
      expect(linkElement).toContainElement(imageElement!)
    })

    it('should hide decorative elements from screen readers', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      const { container } = render(<LogoSection {...props} />)
      
      const decorativeOverlay = container.querySelector('[aria-hidden="true"]')
      expect(decorativeOverlay).toBeInTheDocument()
    })
  })

  // CONTEXT7 SOURCE: /testing-library/react-testing-library - Performance testing patterns
  // PERFORMANCE_TESTS_REASON: Official React Testing Library documentation for performance-related testing
  describe('Performance Optimizations', () => {
    it.each(LogoSectionDataFactory.createPerformanceTestConfigs())(
      'should implement performance optimizations: $testName',
      ({ props, expectedImageAttributes }) => {
        render(<LogoSection {...props} />)
        
        const logoImage = screen.getByRole('img')
        
        expect(logoImage).toHaveAttribute('width', expectedImageAttributes.width.toString())
        expect(logoImage).toHaveAttribute('height', expectedImageAttributes.height.toString())
        expect(logoImage).toHaveAttribute('loading', expectedImageAttributes.loading)
        
        // Priority loading for above-the-fold content
        if (expectedImageAttributes.priority) {
          expect(logoImage).toHaveAttribute('loading', 'eager')
        }
      }
    )

    it('should prevent layout shift with fixed aspect ratio', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      
      // Fixed dimensions prevent layout shift
      expect(logoImage).toHaveAttribute('width', '175')
      expect(logoImage).toHaveAttribute('height', '100')
      
      // Check that style attribute is set (aspect ratio might be normalized)
      const style = logoImage.getAttribute('style')
      expect(style).toBeTruthy()
      expect(style).toMatch(/aspect-ratio|aspectRatio/)
    })

    it('should use optimized CSS properties for animations', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      expect(logoImage).toHaveClass('will-change-transform')
    })
  })

  // CONTEXT7 SOURCE: /jestjs/jest - Error handling test patterns
  // ERROR_HANDLING_REASON: Official Jest documentation for testing error scenarios
  describe('Error Handling and Edge Cases', () => {
    it('should handle missing props gracefully', () => {
      // @ts-ignore - Testing runtime behavior with missing props
      const { container } = render(<LogoSection />)
      
      // Should still render something and not crash
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle undefined className gracefully', () => {
      const props = { ...LogoSectionDataFactory.createDefaultProps(), className: undefined }
      
      const { container } = render(<LogoSection {...props} />)
      
      const logoContainer = container.querySelector('.flex-shrink-0')
      expect(logoContainer).toBeInTheDocument()
    })

    it('should handle boolean prop edge cases', () => {
      const props = {
        isTransparent: true,
        isHomepage: false,
        className: ''
      }
      
      render(<LogoSection {...props} />)
      
      // Should render appropriate logo for transparent state
      const logoImage = screen.getByRole('img')
      expect(logoImage).toHaveAttribute('src', '/images/logos/logo-with-name-white.png')
    })
  })

  // CONTEXT7 SOURCE: /testing-library/react-testing-library - Integration testing patterns
  // INTEGRATION_TESTS_REASON: Official React Testing Library documentation for component integration testing
  describe('Integration with External Dependencies', () => {
    it('should integrate correctly with Next.js Image component', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const logoImage = screen.getByRole('img')
      
      // Next.js Image component specific attributes
      expect(logoImage).toHaveAttribute('src', '/images/logos/logo-with-name.png')
      expect(logoImage).toHaveAttribute('loading', 'eager')
      expect(logoImage).toHaveAttribute('width', '175')
      expect(logoImage).toHaveAttribute('height', '100')
    })

    it('should integrate correctly with Next.js Link component', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      render(<LogoSection {...props} />)
      
      const linkElement = screen.getByRole('link')
      
      // Next.js Link component behavior
      expect(linkElement).toHaveAttribute('href', '/')
      expect(linkElement).toHaveClass('block')
    })

    it('should work with Framer Motion wrapper', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      const { container } = render(<LogoSection {...props} />)
      
      // Motion wrapper should be present (mocked as div)
      const motionWrapper = container.querySelector('div[class*="relative"]')
      expect(motionWrapper).toBeInTheDocument()
    })
  })

  // CONTEXT7 SOURCE: /jestjs/jest - Development environment testing patterns
  // DEV_TESTING_REASON: Official Jest documentation for environment-specific testing
  describe('Development Environment Features', () => {
    const originalEnv = process.env.NODE_ENV

    beforeEach(() => {
      process.env.NODE_ENV = 'development'
    })

    afterEach(() => {
      process.env.NODE_ENV = originalEnv
    })

    it('should display development status indicator in development mode', () => {
      const props = LogoSectionDataFactory.createTransparentNavbarProps()
      
      const { container } = render(<LogoSection {...props} />)
      
      const statusIndicator = container.querySelector('.absolute.top-full')
      expect(statusIndicator).toBeInTheDocument()
      expect(statusIndicator).toHaveTextContent('Logo: White')
      expect(statusIndicator).toHaveTextContent('Context: Page')
    })

    it('should show correct status for homepage context', () => {
      const props = LogoSectionDataFactory.createHomepageProps()
      
      const { container } = render(<LogoSection {...props} />)
      
      const statusIndicator = container.querySelector('.absolute.top-full')
      expect(statusIndicator).toHaveTextContent('Logo: Standard')
      expect(statusIndicator).toHaveTextContent('Context: Homepage')
    })
  })

  describe('Production Environment Features', () => {
    const originalEnv = process.env.NODE_ENV

    beforeEach(() => {
      process.env.NODE_ENV = 'production'
    })

    afterEach(() => {
      process.env.NODE_ENV = originalEnv
    })

    it('should not display development status indicator in production mode', () => {
      const props = LogoSectionDataFactory.createDefaultProps()
      
      const { container } = render(<LogoSection {...props} />)
      
      const statusIndicator = container.querySelector('.absolute.top-full')
      expect(statusIndicator).not.toBeInTheDocument()
    })
  })
})

// CONTEXT7 SOURCE: /jestjs/jest - Test suite organization and grouping patterns
// SUITE_ORGANIZATION_REASON: Official Jest documentation for logical test grouping and comprehensive coverage

/**
 * TEST COVERAGE SUMMARY:
 * 
 * ✅ Basic Rendering (3 tests)
 * ✅ Logo Switching Logic (4 tests + parameterized)
 * ✅ Responsive Design and CSS Classes (5 tests)
 * ✅ User Interactions (4 tests)
 * ✅ Accessibility Compliance (4 tests + parameterized)
 * ✅ Performance Optimizations (3 tests + parameterized)
 * ✅ Error Handling and Edge Cases (3 tests)
 * ✅ Integration with External Dependencies (3 tests)
 * ✅ Development Environment Features (2 tests)
 * ✅ Production Environment Features (1 test)
 * 
 * TOTAL: ~35 individual test cases covering all component functionality
 * PATTERNS: Arrange-Act-Assert, factory pattern, parameterized testing
 * COVERAGE: Unit tests, integration tests, accessibility tests, performance tests
 */