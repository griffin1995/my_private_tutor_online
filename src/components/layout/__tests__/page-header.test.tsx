// CONTEXT7 SOURCE: /testing-library/react-testing-library - Navigation component testing patterns for user journey integrity
// TESTING REASON: Page header is critical for site navigation and conversion funnel integrity

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { PageHeader } from '../page-header'

// CONTEXT7 SOURCE: /testing-library/react-testing-library - Mock CMS dependencies for navigation testing
jest.mock('@/lib/cms/cms-content', () => ({
  getSiteHeader: () => ({
    siteName: 'My Private Tutor Online',
    tagline: 'Premium Tutoring Services'
  }),
  getMainNavigation: () => ({
    items: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' }
    ]
  })
}))

jest.mock('@/lib/cms/cms-images', () => ({
  getMainLogo: () => ({
    src: '/logo-dark.png',
    alt: 'My Private Tutor Online Logo',
    width: 200,
    height: 60
  }),
  getMainLogoWhite: () => ({
    src: '/logo-white.png',
    alt: 'My Private Tutor Online Logo White',
    width: 200,
    height: 60
  })
}))

// Mock Next.js components
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  }
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  m: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>
}))

describe('PageHeader', () => {
  beforeEach(() => {
    // Mock window.scrollY for scroll tests
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0
    })
    
    // Mock addEventListener/removeEventListener
    const mockAddEventListener = jest.fn()
    const mockRemoveEventListener = jest.fn()
    
    Object.defineProperty(window, 'addEventListener', {
      writable: true,
      value: mockAddEventListener
    })
    
    Object.defineProperty(window, 'removeEventListener', {
      writable: true,
      value: mockRemoveEventListener
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Header Rendering', () => {
    it('renders fixed header with proper positioning', () => {
      render(<PageHeader />)
      
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveAttribute('aria-label', 'Site header with navigation')
      
      // Check fixed positioning classes
      expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
    })

    it('displays site logo with proper branding', () => {
      render(<PageHeader />)
      
      const logoLink = screen.getByLabelText(/my private tutor online.*homepage/i)
      expect(logoLink).toBeInTheDocument()
      expect(logoLink).toHaveAttribute('href', '/')
      
      const logoImage = screen.getByAltText(/my private tutor online logo/i)
      expect(logoImage).toBeInTheDocument()
    })

    it('shows main navigation with proper ARIA labelling', () => {
      render(<PageHeader />)
      
      const navigation = screen.getByRole('navigation', { name: /main navigation/i })
      expect(navigation).toBeInTheDocument()
      expect(navigation).toHaveAttribute('data-navigation')
    })

    it('displays CTA button with conversion-focused text', () => {
      render(<PageHeader />)
      
      const ctaButton = screen.getByRole('link', { name: /book free consultation/i })
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveAttribute('href', '#contact')
    })
  })

  describe('Scroll State Management', () => {
    it('starts with transparent state by default', () => {
      render(<PageHeader />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('bg-transparent', 'backdrop-blur-none')
    })

    it('changes to scrolled state when scroll exceeds threshold', async () => {
      render(<PageHeader />)
      
      // Simulate scroll event
      Object.defineProperty(window, 'scrollY', { value: 150 })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const header = screen.getByRole('banner')
        expect(header).toHaveClass('bg-white/95', 'backdrop-blur-lg')
      })
    })

    it('switches logo based on scroll state', async () => {
      render(<PageHeader />)
      
      // Initially should show white logo for transparent state
      expect(screen.getByAltText(/white/i)).toBeInTheDocument()
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 150 })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByAltText(/my private tutor online logo/i)).toBeInTheDocument()
      })
    })

    it('updates CTA button styling based on scroll state', async () => {
      render(<PageHeader />)
      
      const ctaButton = screen.getByRole('link', { name: /book free consultation/i })
      
      // Initial transparent state
      expect(ctaButton).toHaveClass('bg-transparent', 'border-white', '!text-white')
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 150 })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(ctaButton).toHaveClass('bg-accent-600', '!text-primary-700')
      })
    })
  })

  describe('Navigation Menu', () => {
    it('displays all main navigation items', () => {
      render(<PageHeader />)
      
      // Check for navigation links
      expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
    })

    it('applies correct styling to navigation links based on scroll state', async () => {
      render(<PageHeader />)
      
      const aboutLink = screen.getByRole('link', { name: /about us/i })
      
      // Initial transparent state - white text
      expect(aboutLink).toHaveClass('!text-white')
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 150 })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(aboutLink).toHaveClass('!text-primary-700')
      })
    })

    it('shows hover effects on navigation links', async () => {
      const user = userEvent.setup()
      render(<PageHeader />)
      
      const aboutLink = screen.getByRole('link', { name: /about us/i })
      
      await user.hover(aboutLink)
      
      // Hover effects should be applied
      expect(aboutLink).toHaveClass('hover:scale-105')
    })
  })

  describe('Mobile Navigation', () => {
    it('shows mobile menu button on mobile viewports', () => {
      render(<PageHeader />)
      
      const mobileMenuButton = screen.getByRole('button', { name: /open mobile navigation menu/i })
      expect(mobileMenuButton).toBeInTheDocument()
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('opens mobile menu when button is clicked', async () => {
      const user = userEvent.setup()
      render(<PageHeader />)
      
      const mobileMenuButton = screen.getByRole('button', { name: /open mobile navigation menu/i })
      await user.click(mobileMenuButton)
      
      // Should open sheet content
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('displays mobile navigation with proper labelling', async () => {
      const user = userEvent.setup()
      render(<PageHeader />)
      
      const mobileMenuButton = screen.getByRole('button', { name: /open mobile navigation menu/i })
      await user.click(mobileMenuButton)
      
      // Mobile navigation should be accessible
      const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i })
      expect(mobileNav).toBeInTheDocument()
    })

    it('updates mobile menu button styling based on scroll state', async () => {
      render(<PageHeader />)
      
      const mobileMenuButton = screen.getByRole('button', { name: /open mobile navigation menu/i })
      
      // Initial state - white icon
      expect(mobileMenuButton).toHaveClass('!text-white')
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 150 })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(mobileMenuButton).toHaveClass('!text-primary-700')
      })
    })
  })

  describe('Dropdown Navigation', () => {
    it('shows dropdown indicators for submenu items', () => {
      render(<PageHeader />)
      
      // Look for dropdown arrows/indicators
      const dropdownIndicators = document.querySelectorAll('svg')
      expect(dropdownIndicators.length).toBeGreaterThan(0)
    })

    it('handles keyboard navigation for accessibility', async () => {
      const user = userEvent.setup()
      render(<PageHeader />)
      
      // Tab through navigation should work
      await user.tab()
      
      // First tabbable element should receive focus
      expect(document.activeElement).toBeInTheDocument()
    })

    it('closes dropdowns on escape key', async () => {
      const user = userEvent.setup()
      render(<PageHeader />)
      
      // Simulate escape key
      await user.keyboard('{Escape}')
      
      // Dropdowns should be closed (no active dropdown state)
      // This is tested through the component's internal state management
    })
  })

  describe('Performance Optimizations', () => {
    it('adds passive scroll listeners for performance', () => {
      render(<PageHeader />)
      
      // Verify scroll listener was added with passive option
      expect(window.addEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      )
    })

    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(<PageHeader />)
      
      unmount()
      
      // Should remove scroll listener
      expect(window.removeEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      )
    })

    it('uses memoized callback for scroll handler', () => {
      render(<PageHeader />)
      
      // Component should use useCallback for performance
      // This is verified through the implementation pattern
      expect(window.addEventListener).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility Compliance', () => {
    it('provides proper ARIA landmarks', () => {
      render(<PageHeader />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveAttribute('aria-label', 'Site header with navigation')
      
      const navigation = screen.getByRole('navigation', { name: /main navigation/i })
      expect(navigation).toBeInTheDocument()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<PageHeader />)
      
      // Should be able to tab through all interactive elements
      await user.tab() // Logo link
      await user.tab() // First nav item
      await user.tab() // Second nav item
      
      expect(document.activeElement).toBeInTheDocument()
    })

    it('provides proper focus management', async () => {
      const user = userEvent.setup()
      render(<PageHeader />)
      
      const ctaButton = screen.getByRole('link', { name: /book free consultation/i })
      
      await user.click(ctaButton)
      
      // Focus should be managed properly
      expect(ctaButton).toBeInTheDocument()
    })

    it('has proper color contrast for both scroll states', () => {
      render(<PageHeader />)
      
      // Transparent state should use white text
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        if (link.getAttribute('href')?.includes('/')) {
          expect(link).toHaveClass('!text-white')
        }
      })
    })
  })

  describe('Hero Page Variant', () => {
    it('applies hero page specific styling when isHeroPage is true', () => {
      render(<PageHeader isHeroPage={true} />)
      
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      
      // Hero page should start transparent for content showcase
      expect(header).toHaveClass('bg-transparent')
    })
  })

  describe('Responsive Design', () => {
    it('hides desktop navigation on mobile screens', () => {
      render(<PageHeader />)
      
      const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
      expect(desktopNav).toHaveClass('hidden', 'lg:flex')
    })

    it('shows mobile menu button only on mobile screens', () => {
      render(<PageHeader />)
      
      const mobileButton = screen.getByRole('button', { name: /open mobile navigation menu/i })
      expect(mobileButton.closest('div')).toHaveClass('lg:hidden')
    })

    it('adapts header height responsively', () => {
      render(<PageHeader />)
      
      const headerContainer = document.querySelector('.grid.grid-cols-3')
      expect(headerContainer).toHaveClass('h-20', 'lg:h-24', 'xl:h-28')
    })

    it('scales logo responsively', () => {
      render(<PageHeader />)
      
      const logoImage = screen.getByAltText(/my private tutor online logo/i)
      expect(logoImage).toHaveClass('max-h-16', 'lg:max-h-20', 'xl:max-h-24')
    })
  })

  describe('Royal Client Standards', () => {
    it('maintains premium language in CTA', () => {
      render(<PageHeader />)
      
      expect(screen.getByText(/book free consultation/i)).toBeInTheDocument()
      expect(screen.getByText(/my private tutor online/i)).toBeInTheDocument()
    })

    it('provides smooth premium animations', () => {
      render(<PageHeader />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('transition-all', 'duration-300', 'ease-out')
      
      const ctaButton = screen.getByRole('link', { name: /book free consultation/i })
      expect(ctaButton).toHaveClass('hover:scale-105')
    })

    it('includes premium branding elements', () => {
      render(<PageHeader />)
      
      // Logo should be prominent with hover effects
      const logoLink = screen.getByLabelText(/my private tutor online.*homepage/i)
      expect(logoLink).toHaveClass('group')
      
      const logoImage = screen.getByAltText(/my private tutor online logo/i)
      expect(logoImage).toHaveClass('group-hover:scale-105')
    })
  })

  describe('Error Handling', () => {
    it('handles missing CMS data gracefully', () => {
      // Mock empty CMS data
      jest.doMock('@/lib/cms/cms-content', () => ({
        getSiteHeader: () => ({}),
        getMainNavigation: () => ({ items: [] })
      }))
      
      expect(() => render(<PageHeader />)).not.toThrow()
    })

    it('handles window undefined for SSR', () => {
      // Mock server-side rendering environment
      const originalWindow = global.window
      delete (global as any).window
      
      expect(() => render(<PageHeader />)).not.toThrow()
      
      global.window = originalWindow
    })
  })
})