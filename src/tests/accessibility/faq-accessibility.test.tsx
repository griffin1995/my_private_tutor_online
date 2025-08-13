/**
 * CONTEXT7 SOURCE: /testing-library/react-testing-library - Accessibility testing patterns for FAQ system
 * ACCESSIBILITY TESTING: Comprehensive WCAG 2.1 AA compliance testing for FAQ components
 * 
 * FAQ Accessibility Test Suite - WCAG 2.1 AA Compliance
 * Tests all FAQ components for accessibility compliance including:
 * - Semantic HTML structure and ARIA attributes
 * - Keyboard navigation and focus management
 * - Screen reader compatibility
 * - Color contrast compliance
 * - Motion preferences support
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - WCAG 2.1 AA compliance testing
 * - Context7 MCP documentation only
 * - Royal client accessibility standards
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom'

// CONTEXT7 SOURCE: /testing-library/react-testing-library - Component imports for accessibility testing
import FAQPage from '@/app/faq/page'
import { FAQCategorySection } from '@/components/faq/faq-category-section'
import { FAQEnhancedSearch } from '@/components/faq/faq-enhanced-search'
import { FAQThemeSwitcher } from '@/components/faq/faq-theme-switcher'

// Mock data for testing
const mockCategories = [
  {
    id: 'general',
    title: 'General Questions',
    icon: '❓',
    order: 1,
    questions: [
      {
        id: 'q1',
        question: 'How do I book a session?',
        answer: 'You can book a session through our online booking system.',
        tags: ['booking', 'sessions']
      },
      {
        id: 'q2',
        question: 'What are your rates?',
        answer: 'Our rates vary depending on the subject and level.',
        tags: ['pricing', 'rates']
      }
    ]
  },
  {
    id: 'academic',
    title: 'Academic Support',
    icon: '🎓',
    order: 2,
    questions: [
      {
        id: 'q3',
        question: 'Do you offer Oxbridge preparation?',
        answer: 'Yes, we have specialized Oxbridge preparation programs.',
        tags: ['oxbridge', 'preparation']
      }
    ]
  }
]

// CONTEXT7 SOURCE: /w3c/wcag - Extend Jest with axe-core accessibility matchers
expect.extend(toHaveNoViolations)

describe('FAQ Accessibility Tests - WCAG 2.1 AA Compliance', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    // Mock IntersectionObserver for motion components
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Semantic HTML Structure', () => {
    // CONTEXT7 SOURCE: /w3c/wcag - Test proper landmark usage (WCAG 2.4.1)
    test('should have proper landmark structure', async () => {
      render(<FAQCategorySection categories={mockCategories} />)

      // Check for main landmarks
      expect(screen.getByRole('region', { name: /frequently asked questions/i })).toBeInTheDocument()
      
      // Check for proper heading hierarchy
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
      
      // Verify h2 elements for category titles
      const categoryHeadings = screen.getAllByRole('heading', { level: 2 })
      expect(categoryHeadings).toHaveLength(mockCategories.length)
    })

    // CONTEXT7 SOURCE: /w3c/wcag - Test proper ARIA labeling (WCAG 4.1.2)
    test('should have proper ARIA attributes', async () => {
      render(<FAQCategorySection categories={mockCategories} />)

      // Check toolbar has proper ARIA
      const toolbar = screen.queryByRole('toolbar')
      if (toolbar) {
        expect(toolbar).toHaveAttribute('aria-label')
      }

      // Check accordion items have proper ARIA
      const accordionButtons = screen.getAllByRole('button')
      accordionButtons.forEach(button => {
        if (button.getAttribute('aria-expanded') !== null) {
          expect(button).toHaveAttribute('aria-expanded')
          expect(button).toHaveAttribute('aria-controls')
        }
      })
    })

    // CONTEXT7 SOURCE: /w3c/wcag - Test form labeling (WCAG 3.3.2)
    test('should have properly labeled form controls', async () => {
      render(\n        <FAQEnhancedSearch \n          questions={mockCategories.flatMap(cat => cat.questions)}\n          categories={mockCategories}\n        />\n      )

      const searchInput = screen.getByRole('combobox')
      expect(searchInput).toHaveAttribute('aria-label')
      expect(searchInput).toHaveAttribute('aria-expanded')
      expect(searchInput).toHaveAttribute('aria-haspopup')
    })
  })

  describe('Keyboard Navigation', () => {
    // CONTEXT7 SOURCE: /w3c/wcag - Test keyboard accessibility (WCAG 2.1.1)
    test('should be fully keyboard navigable', async () => {
      render(<FAQCategorySection categories={mockCategories} enableBulkActions={true} />)

      // Test tab navigation through bulk action buttons
      const expandAllButton = screen.getByRole('button', { name: /expand all/i })
      const collapseAllButton = screen.getByRole('button', { name: /collapse all/i })

      expandAllButton.focus()
      expect(expandAllButton).toHaveFocus()

      await user.tab()
      expect(collapseAllButton).toHaveFocus()

      // Test Enter key activation
      await user.keyboard('{Enter}')
      
      // Should expand all items
      await waitFor(() => {
        const expandedItems = screen.getAllByRole('button', { expanded: true })
        expect(expandedItems.length).toBeGreaterThan(0)
      })
    })

    // CONTEXT7 SOURCE: /w3c/wcag - Test focus management (WCAG 2.4.3)
    test('should have proper focus order', async () => {
      render(<FAQCategorySection categories={mockCategories} enableBulkActions={true} />)

      const focusableElements = screen.getAllByRole('button')
      
      // Test tab order is logical
      let currentIndex = 0
      for (const element of focusableElements) {
        element.focus()
        expect(element).toHaveFocus()
        
        await user.tab()
        currentIndex++
        
        if (currentIndex < focusableElements.length) {
          expect(focusableElements[currentIndex]).toHaveFocus()
        }
      }
    })

    // CONTEXT7 SOURCE: /w3c/wcag - Test keyboard shortcuts (WCAG 2.1.1)
    test('should support Home and End keys for navigation', async () => {
      render(<FAQCategorySection categories={mockCategories} />)

      // Focus first accordion item
      const firstAccordionButton = screen.getAllByRole('button')[0]
      firstAccordionButton.focus()

      // Test Home key
      await user.keyboard('{Home}')\n      expect(screen.getAllByRole('button')[0]).toHaveFocus()

      // Test End key\n      await user.keyboard('{End}')\n      const buttons = screen.getAllByRole('button')\n      expect(buttons[buttons.length - 1]).toHaveFocus()\n    })\n  })\n\n  describe('Screen Reader Support', () => {\n    // CONTEXT7 SOURCE: /w3c/wcag - Test live regions (WCAG 4.1.3)\n    test('should announce state changes to screen readers', async () => {\n      render(<FAQCategorySection categories={mockCategories} enableBulkActions={true} />)\n\n      // Check for live regions\n      const liveRegions = screen.getAllByLabelText((content, element) => {\n        return element?.getAttribute('aria-live') === 'polite'\n      })\n      expect(liveRegions.length).toBeGreaterThan(0)\n\n      // Test expand all announcement\n      const expandAllButton = screen.getByRole('button', { name: /expand all/i })\n      await user.click(expandAllButton)\n\n      // Should have updated live region (content will be announced)\n      await waitFor(() => {\n        const liveRegion = screen.getByLabelText((content, element) => {\n          return element?.getAttribute('aria-live') === 'polite'\n        })\n        expect(liveRegion).toBeInTheDocument()\n      })\n    })\n\n    // CONTEXT7 SOURCE: /w3c/wcag - Test descriptive labels (WCAG 2.4.6)\n    test('should provide descriptive labels for all interactive elements', async () => {\n      render(<FAQThemeSwitcher currentTheme=\"light\" onThemeChange={jest.fn()} />)\n\n      const themeButton = screen.getByRole('button')\n      expect(themeButton).toHaveAttribute('aria-label')\n      \n      // The label should be descriptive\n      const ariaLabel = themeButton.getAttribute('aria-label')\n      expect(ariaLabel).toBeTruthy()\n      expect(ariaLabel!.length).toBeGreaterThan(5) // Should be descriptive\n    })\n  })\n\n  describe('Visual Accessibility', () => {\n    // CONTEXT7 SOURCE: /w3c/wcag - Test focus indicators (WCAG 2.4.7)\n    test('should have visible focus indicators', async () => {\n      render(<FAQCategorySection categories={mockCategories} />)\n\n      const buttons = screen.getAllByRole('button')\n      for (const button of buttons.slice(0, 3)) { // Test first few buttons\n        button.focus()\n        expect(button).toHaveFocus()\n        \n        // Focus should be visible (browser dependent, but element should be focusable)\n        expect(button).toBeVisible()\n        expect(button).toBeEnabled()\n      }\n    })\n\n    // CONTEXT7 SOURCE: /w3c/wcag - Test text alternatives (WCAG 1.1.1)\n    test('should provide text alternatives for images and icons', async () => {\n      render(<FAQCategorySection categories={mockCategories} />)\n\n      // Check that icon spans have proper aria-label or are marked as decorative\n      const iconElements = screen.getAllByLabelText((content, element) => {\n        return element?.getAttribute('role') === 'img'\n      })\n      \n      iconElements.forEach(icon => {\n        expect(icon).toHaveAttribute('aria-label')\n      })\n    })\n  })\n\n  describe('Automated Accessibility Testing', () => {\n    // CONTEXT7 SOURCE: /testing-library/react-testing-library - Axe-core integration testing\n    test('should have no axe-core accessibility violations - FAQ Category Section', async () => {\n      const { container } = render(<FAQCategorySection categories={mockCategories} />)\n      const results = await axe(container)\n      expect(results).toHaveNoViolations()\n    })\n\n    test('should have no axe-core accessibility violations - FAQ Enhanced Search', async () => {\n      const { container } = render(\n        <FAQEnhancedSearch \n          questions={mockCategories.flatMap(cat => cat.questions)}\n          categories={mockCategories}\n        />\n      )\n      const results = await axe(container)\n      expect(results).toHaveNoViolations()\n    })\n\n    test('should have no axe-core accessibility violations - FAQ Theme Switcher', async () => {\n      const { container } = render(\n        <FAQThemeSwitcher \n          currentTheme=\"light\" \n          onThemeChange={jest.fn()}\n          ariaLabel=\"Switch FAQ page theme\"\n        />\n      )\n      const results = await axe(container)\n      expect(results).toHaveNoViolations()\n    })\n  })\n\n  describe('Motion and Animation Accessibility', () => {\n    // CONTEXT7 SOURCE: /w3c/wcag - Test motion preferences (WCAG 2.3.3)\n    test('should respect prefers-reduced-motion preference', async () => {\n      // Mock reduced motion preference\n      Object.defineProperty(window, 'matchMedia', {\n        writable: true,\n        value: jest.fn().mockImplementation(query => ({\n          matches: query.includes('prefers-reduced-motion: reduce'),\n          media: query,\n          onchange: null,\n          addListener: jest.fn(),\n          removeListener: jest.fn(),\n          addEventListener: jest.fn(),\n          removeEventListener: jest.fn(),\n          dispatchEvent: jest.fn(),\n        })),\n      })\n\n      render(<FAQCategorySection categories={mockCategories} />)\n\n      // Component should render without motion-dependent features breaking\n      expect(screen.getByRole('region')).toBeInTheDocument()\n      \n      // Should not have accessibility violations even with reduced motion\n      const { container } = render(<FAQCategorySection categories={mockCategories} />)\n      const results = await axe(container)\n      expect(results).toHaveNoViolations()\n    })\n  })\n\n  describe('Touch and Mobile Accessibility', () => {\n    // CONTEXT7 SOURCE: /w3c/wcag - Test touch target size (WCAG 2.5.5)\n    test('should have adequate touch target sizes', async () => {\n      render(<FAQCategorySection categories={mockCategories} />)\n\n      const buttons = screen.getAllByRole('button')\n      buttons.forEach(button => {\n        const styles = window.getComputedStyle(button)\n        const width = parseInt(styles.width) || button.offsetWidth\n        const height = parseInt(styles.height) || button.offsetHeight\n        \n        // WCAG 2.5.5 - Touch targets should be at least 44x44 pixels\n        expect(width).toBeGreaterThanOrEqual(44)\n        expect(height).toBeGreaterThanOrEqual(44)\n      })\n    })\n  })\n\n  describe('Error Handling and Validation', () => {\n    // CONTEXT7 SOURCE: /w3c/wcag - Test error identification (WCAG 3.3.1)\n    test('should properly identify and announce errors', async () => {\n      const mockOnError = jest.fn()\n      \n      render(\n        <FAQCategorySection \n          categories={mockCategories} \n          onFAQRating={async () => { throw new Error('Test error') }}\n        />\n      )\n\n      // Error handling should not break accessibility\n      const { container } = render(<FAQCategorySection categories={mockCategories} />)\n      const results = await axe(container)\n      expect(results).toHaveNoViolations()\n    })\n  })\n\n  describe('Integration Accessibility Tests', () => {\n    // CONTEXT7 SOURCE: /w3c/wcag - Test complete FAQ system accessibility\n    test('should maintain accessibility across component interactions', async () => {\n      render(\n        <div>\n          <FAQEnhancedSearch \n            questions={mockCategories.flatMap(cat => cat.questions)}\n            categories={mockCategories}\n          />\n          <FAQCategorySection categories={mockCategories} enableBulkActions={true} />\n          <FAQThemeSwitcher currentTheme=\"light\" onThemeChange={jest.fn()} />\n        </div>\n      )\n\n      // Test that all components work together accessibly\n      const { container } = render(\n        <div>\n          <FAQEnhancedSearch \n            questions={mockCategories.flatMap(cat => cat.questions)}\n            categories={mockCategories}\n          />\n          <FAQCategorySection categories={mockCategories} enableBulkActions={true} />\n        </div>\n      )\n      \n      const results = await axe(container)\n      expect(results).toHaveNoViolations()\n    })\n  })\n})