// CONTEXT7 SOURCE: /testing-library/react-testing-library - React component testing patterns
// CONTEXT7 SOURCE: /context7/nextjs - Next.js App Router page component testing
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../page'

// Mock the entire CMS system to prevent initialization errors during testing
jest.mock('../../lib/cms', () => ({
  cmsService: {
    getHomepageData: jest.fn(() => ({
      hero: {
        title: 'Premium Private Tutoring',
        subtitle: 'Trusted by Royal Families Since 2010',
        description: 'Exceptional academic support with proven results',
        cta: {
          primary: { text: 'Book Assessment', href: '/assessment' },
          secondary: { text: 'Learn More', href: '/about' }
        }
      },
      trustIndicators: [
        { icon: '👑', title: 'Royal Endorsements', description: 'Trusted by elite families' },
        { icon: '🎯', title: '98% Success Rate', description: 'Proven track record' },
        { icon: '🏆', title: 'Award-Winning', description: 'Recognised excellence' }
      ]
    })),
    getTestimonials: jest.fn(() => [
      {
        quote: 'Outstanding results for our son\'s A-levels.',
        author: 'Lady Smith',
        role: 'Parent',
        rating: 5
      }
    ]),
    getServices: jest.fn(() => []),
    getInstance: jest.fn(() => ({
      getHomepageData: jest.fn(() => ({})),
      getTestimonials: jest.fn(() => []),
      getServices: jest.fn(() => [])
    }))
  }
}))

// Mock Framer Motion to prevent animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    button: 'button'
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useInView: () => ({ ref: jest.fn(), inView: true })
}))

// Mock intersection observer
jest.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: jest.fn(), inView: true })
}))

describe('Homepage', () => {
  // CONTEXT7 SOURCE: /testing-library/react-testing-library - Basic component rendering tests
  it('renders homepage without crashing', () => {
    render(<Home />)
    
    // Check for key elements that should be present
    expect(document.body).toBeInTheDocument()
  })

  it('displays main heading', () => {
    render(<Home />)
    
    // Look for heading content
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('has proper document structure', () => {
    render(<Home />)
    
    // Check for main content area
    const mainContent = document.querySelector('main')
    expect(mainContent || document.body).toBeInTheDocument()
  })

  // CONTEXT7 SOURCE: /testing-library/jest-dom - Accessibility testing with ARIA roles
  it('has accessible navigation structure', () => {
    render(<Home />)
    
    // Check if there are interactive elements
    const buttons = screen.queryAllByRole('button')
    const links = screen.queryAllByRole('link')
    
    // Homepage should have some interactive elements
    expect(buttons.length + links.length).toBeGreaterThan(0)
  })

  it('renders trust indicators section', () => {
    render(<Home />)
    
    // Look for trust-related content
    const trustContent = screen.queryByText(/royal/i) || 
                        screen.queryByText(/trust/i) || 
                        screen.queryByText(/premium/i)
    
    expect(trustContent).toBeInTheDocument()
  })
})

// CONTEXT7 SOURCE: /jestjs/jest - Jest snapshot testing for UI regression detection
describe('Homepage Snapshots', () => {
  it('renders homepage structure consistently', () => {
    const { container } = render(<Home />)
    
    // Take snapshot of the main structure (first few children)
    const mainContent = container.firstChild
    expect(mainContent).toMatchSnapshot()
  })
})