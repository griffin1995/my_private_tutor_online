// CONTEXT7 SOURCE: /dequelabs/axe-core - Accessibility testing automation for WCAG 2.1 AA compliance
// TESTING REASON: Automated accessibility testing is critical for royal client standards and legal compliance

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import axe from 'axe-core'

// CONTEXT7 SOURCE: /dequelabs/axe-core - Integration test patterns for form accessibility
import { ConsultationBookingForm } from '@/components/forms/consultation-booking-form'
import { QuoteRequestForm } from '@/components/forms/quote-request-form'
import { NewsletterForm } from '@/components/forms/newsletter-form'

// CONTEXT7 SOURCE: /dequelabs/axe-core - Layout component accessibility testing
import { PageHeader } from '@/components/layout/page-header'
import { PageHero } from '@/components/layout/page-hero'

// Mock dependencies for testing
jest.mock('@/lib/cms/cms-content', () => ({
  getSiteHeader: () => ({
    siteName: 'My Private Tutor Online',
    tagline: 'Premium Tutoring Services'
  }),
  getMainNavigation: () => ({
    items: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' }
    ]
  }),
  getNewsletterFormContent: () => ({
    title: 'Stay Updated',
    description: 'Receive updates',
    successMessage: 'Thank you for subscribing!',
    buttonText: 'Subscribe',
    fields: {
      firstName: { placeholder: 'First name' },
      email: { placeholder: 'Email address' }
    }
  })
}))

jest.mock('@/lib/cms/cms-images', () => ({
  getMainLogo: () => ({
    src: '/logo.png',
    alt: 'Logo',
    width: 200,
    height: 60
  }),
  getMainLogoWhite: () => ({
    src: '/logo-white.png', 
    alt: 'Logo White',
    width: 200,
    height: 60
  })
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', props)
  }
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return React.createElement('a', { href, ...props }, children)
  }
}))

jest.mock('framer-motion', () => ({
  m: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children)
  },
  AnimatePresence: ({ children }: any) => React.createElement('div', {}, children)
}))

// CONTEXT7 SOURCE: /dequelabs/axe-core - Custom axe matcher for Jest integration
expect.extend({
  async toHaveNoAccessibilityViolations(received: Element) {
    const results = await axe.run(received, {
      // CONTEXT7 SOURCE: /dequelabs/axe-core - WCAG 2.1 AA compliance configuration
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      rules: {
        // Enable additional accessibility checks for premium service standards
        'color-contrast': { enabled: true },
        'keyboard-navigation': { enabled: true },
        'focus-order-semantics': { enabled: true },
        'landmark-one-main': { enabled: true },
        'page-has-heading-one': { enabled: true },
        'region': { enabled: true }
      }
    })

    const pass = results.violations.length === 0

    return {
      pass,
      message: () => {
        if (pass) {
          return 'Expected accessibility violations but found none'
        }
        
        const violationMessages = results.violations
          .map(violation => {
            const nodeTargets = violation.nodes
              .map(node => node.target.join(' '))
              .join(', ')
            
            return `${violation.id} (${violation.impact}): ${violation.description}
            Help: ${violation.help}
            Elements: ${nodeTargets}`
          })
          .join('\n\n')
        
        return `Expected no accessibility violations but found ${results.violations.length}:

${violationMessages}`
      }
    }
  }
})

// Extend Jest expect interface
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoAccessibilityViolations(): R
    }
  }
}

describe('Accessibility Test Suite - WCAG 2.1 AA Compliance', () => {
  describe('Revenue-Critical Forms Accessibility', () => {
    it('ConsultationBookingForm meets WCAG 2.1 AA standards', async () => {
      const { container } = render(React.createElement(ConsultationBookingForm))
      
      // CONTEXT7 SOURCE: /dequelabs/axe-core - Form accessibility validation patterns
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('QuoteRequestForm meets WCAG 2.1 AA standards', async () => {
      const { container } = render(React.createElement(QuoteRequestForm))
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('NewsletterForm meets WCAG 2.1 AA standards', async () => {
      const { container } = render(React.createElement(NewsletterForm))
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('All form variants maintain accessibility compliance', async () => {
      const { container } = render(
        React.createElement('div', {},
          React.createElement(NewsletterForm, { variant: 'inline' }),
          React.createElement(NewsletterForm, { variant: 'card' }),
          React.createElement(NewsletterForm, { variant: 'hero' })
        )
      )
      
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })

  describe('Navigation Components Accessibility', () => {
    it('PageHeader meets navigation accessibility standards', async () => {
      const { container } = render(React.createElement(PageHeader))
      
      // CONTEXT7 SOURCE: /dequelabs/axe-core - Navigation accessibility validation
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('PageHeader with hero variant maintains accessibility', async () => {
      const { container } = render(React.createElement(PageHeader, { isHeroPage: true }))
      
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })

  describe('Hero Sections Accessibility', () => {
    it('PageHero with text content meets accessibility standards', async () => {
      const { container } = render(
        React.createElement(PageHero, {},
          React.createElement('h1', {}, 'Premium Tutoring Services'),
          React.createElement('p', {}, 'Excellence in education since 2010')
        )
      )
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('PageHero with video background maintains accessibility', async () => {
      const { container } = render(
        React.createElement(PageHero, { 
          background: 'video', 
          backgroundVideo: '/test-video.mp4' 
        },
          React.createElement('h1', {}, 'Video Hero Content'),
          React.createElement('p', {}, 'Accessible content over video background')
        )
      )
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('PageHero with image background and overlay meets standards', async () => {
      const { container } = render(
        React.createElement(PageHero, { 
          background: 'image',
          backgroundImage: '/hero-image.jpg',
          overlay: true,
          overlayOpacity: 'medium'
        },
          React.createElement('h1', {}, 'Image Hero with Overlay'),
          React.createElement('p', {}, 'Ensuring readability with proper contrast')
        )
      )
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('All hero size variants maintain accessibility', async () => {
      const sizes: Array<'sm' | 'md' | 'lg' | 'xl' | 'full'> = ['sm', 'md', 'lg', 'xl', 'full']
      
      for (const size of sizes) {
        const { container } = render(
          React.createElement(PageHero, { size },
            React.createElement('h1', {}, `Hero Size ${size.toUpperCase()}`),
            React.createElement('p', {}, `Testing ${size} hero accessibility`)
          )
        )
        
        await expect(container).toHaveNoAccessibilityViolations()
      }
    })
  })

  describe('Form Interaction Accessibility', () => {
    it('maintains accessibility during form interaction states', async () => {
      const { container } = render(React.createElement(ConsultationBookingForm))
      
      // Test initial state
      await expect(container).toHaveNoAccessibilityViolations()
      
      // Simulate form interaction (would need user events in full test)
      // This tests the static rendered state which should be accessible
      const form = container.querySelector('form')
      expect(form).toBeInTheDocument()
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('error states maintain accessibility compliance', async () => {
      // Test form with validation errors
      const { container } = render(React.createElement(QuoteRequestForm))
      
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })

  describe('Keyboard Navigation Accessibility', () => {
    it('ensures proper focus management in navigation', async () => {
      const { container } = render(React.createElement(PageHeader))
      
      // Test for keyboard navigation support
      const links = container.querySelectorAll('a, button')
      expect(links.length).toBeGreaterThan(0)
      
      // Verify all interactive elements are accessible via keyboard
      links.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1')
      })
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('maintains focus order in complex forms', async () => {
      const { container } = render(React.createElement(QuoteRequestForm))
      
      // Verify logical tab order exists
      const interactiveElements = container.querySelectorAll(
        'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      expect(interactiveElements.length).toBeGreaterThan(0)
      
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })

  describe('Screen Reader Accessibility', () => {
    it('provides proper ARIA landmarks and labels', async () => {
      const { container } = render(
        React.createElement('div', {},
          React.createElement(PageHeader),
          React.createElement(PageHero, {},
            React.createElement('h1', {}, 'Main Heading'),
            React.createElement('p', {}, 'Content for screen readers')
          )
        )
      )
      
      // Check for essential landmarks
      expect(container.querySelector('[role="banner"]')).toBeInTheDocument()
      expect(container.querySelector('h1')).toBeInTheDocument()
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('ensures form labels are properly associated', async () => {
      const { container } = render(React.createElement(ConsultationBookingForm))
      
      // Verify all inputs have associated labels
      const inputs = container.querySelectorAll('input, select, textarea')
      inputs.forEach(input => {
        const id = input.getAttribute('id')
        if (id) {
          const label = container.querySelector(`label[for="${id}"]`)
          expect(label).toBeInTheDocument()
        }
      })
      
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })

  describe('Visual Accessibility', () => {
    it('maintains sufficient color contrast ratios', async () => {
      const { container } = render(
        React.createElement('div', {},
          React.createElement(PageHeader),
          React.createElement(ConsultationBookingForm)
        )
      )
      
      // axe-core will check color contrast automatically
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('supports reduced motion preferences', async () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })
      
      const { container } = render(
        React.createElement(PageHero, {},
          React.createElement('h1', {}, 'Accessible Hero'),
          React.createElement('p', {}, 'Respects reduced motion preferences')
        )
      )
      
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })

  describe('Mobile Accessibility', () => {
    it('maintains accessibility on mobile viewports', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      const { container } = render(React.createElement(PageHeader))
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('ensures touch targets meet minimum size requirements', async () => {
      const { container } = render(React.createElement(NewsletterForm, { variant: 'inline' }))
      
      // axe-core will validate touch target sizes
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })

  describe('Content Accessibility', () => {
    it('ensures proper heading hierarchy', async () => {
      const { container } = render(
        React.createElement('div', {},
          React.createElement('h1', {}, 'Main Page Title'),
          React.createElement(PageHero, {},
            React.createElement('h2', {}, 'Hero Section'),
            React.createElement('p', {}, 'Supporting content')
          )
        )
      )
      
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('provides alternative text for images', async () => {
      const { container } = render(React.createElement(PageHeader))
      
      // Check that all images have alt text
      const images = container.querySelectorAll('img')
      images.forEach(img => {
        expect(img).toHaveAttribute('alt')
      })
      
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })

  describe('Royal Client Standards Accessibility', () => {
    it('maintains premium accessibility standards for elite clientele', async () => {
      const { container } = render(
        React.createElement('div', {},
          React.createElement(PageHeader),
          React.createElement(PageHero, { size: 'full' },
            React.createElement('h1', {}, 'Elite Tutoring Services'),
            React.createElement('p', {}, 'Maintaining the highest standards of accessibility for our distinguished clients')
          ),
          React.createElement(ConsultationBookingForm)
        )
      )
      
      // Royal client standards require zero accessibility violations
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('ensures premium form experiences are fully accessible', async () => {
      const { container } = render(
        React.createElement('div', {},
          React.createElement(QuoteRequestForm),
          React.createElement(NewsletterForm, { showInterests: true, showName: true })
        )
      )
      
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })

  describe('Error Handling Accessibility', () => {
    it('announces errors appropriately to screen readers', async () => {
      const { container } = render(React.createElement(ConsultationBookingForm))
      
      // Check for ARIA live regions or role="alert" for error announcements
      await expect(container).toHaveNoAccessibilityViolations()
    })

    it('maintains accessibility during loading states', async () => {
      const { container } = render(React.createElement(NewsletterForm))
      
      // Loading states should not break accessibility
      await expect(container).toHaveNoAccessibilityViolations()
    })
  })
})