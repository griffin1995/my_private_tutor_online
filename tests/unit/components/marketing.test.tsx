import { describe, test, expect, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RoyalTrustIndicators } from '@/components/marketing/royal-trust-indicators'
import { RoyalTestimonialCard } from '@/components/marketing/royal-testimonial-card'
import { PremiumServiceCard } from '@/components/marketing/premium-service-card'

// Mock CMS data
jest.mock('@/lib/cms', () => ({
  getTrustIndicators: jest.fn(() => [
    {
      icon: '👑',
      title: 'Royal Endorsement',
      description: 'Trusted by royal families'
    },
    {
      icon: '⭐',
      title: 'Tatler Listed',
      description: 'Featured in Tatler Address Book'
    },
    {
      icon: '📊',
      title: 'Proven Results',
      description: '94% grade improvement rate'
    }
  ]),
  getAvatarPlaceholder: jest.fn(() => ({
    src: '/placeholder-avatar.jpg',
    alt: 'Avatar placeholder'
  }))
}))

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockedImage(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  }
})

describe('Marketing Components', () => {
  describe('RoyalTrustIndicators', () => {
    test('renders trust indicators correctly', () => {
      render(<RoyalTrustIndicators />)
      
      expect(screen.getByText('Royal Endorsement')).toBeInTheDocument()
      expect(screen.getByText('Tatler Listed')).toBeInTheDocument()
      expect(screen.getByText('Proven Results')).toBeInTheDocument()
    })

    test('renders descriptions when showDescription is true', () => {
      render(<RoyalTrustIndicators showDescription={true} />)
      
      expect(screen.getByText('Trusted by royal families')).toBeInTheDocument()
      expect(screen.getByText('Featured in Tatler Address Book')).toBeInTheDocument()
      expect(screen.getByText('94% grade improvement rate')).toBeInTheDocument()
    })

    test('hides descriptions when showDescription is false', () => {
      render(<RoyalTrustIndicators showDescription={false} />)
      
      expect(screen.queryByText('Trusted by royal families')).not.toBeInTheDocument()
      expect(screen.queryByText('Featured in Tatler Address Book')).not.toBeInTheDocument()
    })

    test('applies premium variant styling', () => {
      render(<RoyalTrustIndicators variant="premium" />)
      
      const containers = screen.getAllByRole('article')
      expect(containers[0]).toHaveClass('bg-gradient-to-br')
      expect(containers[0]).toHaveClass('from-white')
      expect(containers[0]).toHaveClass('to-primary-50')
    })

    test('has proper accessibility attributes', () => {
      render(<RoyalTrustIndicators />)
      
      const region = screen.getByRole('region', { name: 'Trust indicators and credentials' })
      expect(region).toBeInTheDocument()

      const articles = screen.getAllByRole('article')
      expect(articles).toHaveLength(3)

      // Check ARIA labels
      articles.forEach((article, index) => {
        expect(article).toHaveAttribute('aria-labelledby')
        expect(article).toHaveAttribute('aria-describedby')
      })
    })
  })

  describe('RoyalTestimonialCard', () => {
    const mockTestimonial = {
      quote: 'Exceptional tutoring that transformed our daughter\'s academic performance.',
      author: 'Lady Catherine Wellington',
      role: 'Parent, Year 11 Student',
      avatar: '/testimonial-avatar.jpg',
      rating: 5
    }

    test('renders testimonial content correctly', () => {
      render(<RoyalTestimonialCard {...mockTestimonial} />)
      
      expect(screen.getByText(mockTestimonial.quote, { exact: false })).toBeInTheDocument()
      expect(screen.getByText(mockTestimonial.author)).toBeInTheDocument()
      expect(screen.getByText(mockTestimonial.role)).toBeInTheDocument()
    })

    test('renders correct number of stars', () => {
      render(<RoyalTestimonialCard {...mockTestimonial} rating={4} />)
      
      const stars = screen.getByText('4 out of 5 stars')
      expect(stars).toBeInTheDocument()
    })

    test('displays avatar image with proper alt text', () => {
      render(<RoyalTestimonialCard {...mockTestimonial} />)
      
      const avatar = screen.getByRole('img', { name: `${mockTestimonial.author} avatar` })
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveAttribute('src', mockTestimonial.avatar)
    })

    test('shows initials fallback when no avatar provided', () => {
      const { author, ...testimonialWithoutAvatar } = mockTestimonial
      render(<RoyalTestimonialCard {...testimonialWithoutAvatar} author="John Smith" />)
      
      expect(screen.getByText('JS')).toBeInTheDocument()
    })

    test('applies royal variant styling', () => {
      const { container } = render(<RoyalTestimonialCard {...mockTestimonial} variant="royal" />)
      
      const testimonialCard = container.firstChild as Element
      expect(testimonialCard).toHaveClass('bg-gradient-to-br')
      expect(testimonialCard).toHaveClass('from-white')
      expect(testimonialCard).toHaveClass('via-royal-50')
    })

    test('shows verification badge for royal variant', () => {
      render(<RoyalTestimonialCard {...mockTestimonial} variant="royal" />)
      
      const verificationBadge = screen.getByText('✓')
      expect(verificationBadge).toBeInTheDocument()
    })

    test('has proper accessibility structure', () => {
      render(<RoyalTestimonialCard {...mockTestimonial} />)
      
      const article = screen.getByRole('article', { name: `Testimonial from ${mockTestimonial.author}` })
      expect(article).toBeInTheDocument()

      const quote = screen.getByRole('blockquote')
      expect(quote).toBeInTheDocument()
      expect(quote).toHaveAttribute('cite', mockTestimonial.author)
    })
  })

  describe('PremiumServiceCard', () => {
    const mockService = {
      title: 'GCSE Excellence Programme',
      description: 'Comprehensive GCSE preparation with expert tutors',
      icon: '📚',
      features: [
        { feature: 'All subjects covered' },
        { feature: 'Expert tutors' },
        { feature: 'Progress tracking' }
      ],
      ctaText: 'Start Programme',
      ctaLink: '/gcse-programme'
    }

    test('renders service content correctly', () => {
      render(<PremiumServiceCard {...mockService} />)
      
      expect(screen.getByText(mockService.title)).toBeInTheDocument()
      expect(screen.getByText(mockService.description)).toBeInTheDocument()
      expect(screen.getByText(mockService.ctaText)).toBeInTheDocument()
    })

    test('renders all features with checkmarks', () => {
      render(<PremiumServiceCard {...mockService} />)
      
      mockService.features.forEach(feature => {
        expect(screen.getByText(feature.feature)).toBeInTheDocument()
      })

      // Should have checkmark icons for each feature
      const checkmarks = screen.getAllByTestId || screen.container.querySelectorAll('svg')
      expect(checkmarks.length).toBeGreaterThanOrEqual(mockService.features.length)
    })

    test('shows popular badge when popular prop is true', () => {
      render(<PremiumServiceCard {...mockService} popular={true} />)
      
      expect(screen.getByText('Most Popular')).toBeInTheDocument()
    })

    test('displays price range when provided', () => {
      render(<PremiumServiceCard {...mockService} priceRange="£50/hour" />)
      
      expect(screen.getByText('£50/hour')).toBeInTheDocument()
    })

    test('displays duration when provided', () => {
      render(<PremiumServiceCard {...mockService} duration="12 weeks" />)
      
      expect(screen.getByText('12 weeks')).toBeInTheDocument()
    })

    test('calls onCTAClick when CTA button is clicked', () => {
      const mockOnClick = jest.fn()
      render(<PremiumServiceCard {...mockService} onCTAClick={mockOnClick} />)
      
      const ctaButton = screen.getByRole('button', { name: `${mockService.ctaText} for ${mockService.title}` })
      fireEvent.click(ctaButton)
      
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    test('applies correct variant styling', () => {
      const { container } = render(<PremiumServiceCard {...mockService} variant="royal" />)
      
      const card = container.firstChild as Element
      expect(card).toHaveClass('bg-gradient-to-br')
      expect(card).toHaveClass('from-white')
      expect(card).toHaveClass('via-royal-50')
    })

    test('has proper accessibility structure', () => {
      render(<PremiumServiceCard {...mockService} />)
      
      const article = screen.getByRole('article')
      expect(article).toBeInTheDocument()

      const ctaButton = screen.getByRole('button')
      expect(ctaButton).toHaveAttribute('aria-label', `${mockService.ctaText} for ${mockService.title}`)
    })

    test('icon has proper accessibility attributes', () => {
      render(<PremiumServiceCard {...mockService} />)
      
      const icon = screen.getByRole('img', { name: `${mockService.title} service icon` })
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    test('trust indicators adapt to different screen sizes', () => {
      const { container } = render(<RoyalTrustIndicators variant="grid" />)
      
      const gridContainer = container.firstChild as Element
      expect(gridContainer).toHaveClass('grid')
      expect(gridContainer).toHaveClass('grid-cols-1')
      expect(gridContainer).toHaveClass('md:grid-cols-3')
    })

    test('service cards maintain proper spacing on mobile', () => {
      const { container } = render(<PremiumServiceCard {...mockService} />)
      
      const card = container.firstChild as Element
      expect(card).toHaveClass('rounded-2xl')
      expect(card).toHaveClass('overflow-hidden')
    })
  })
})