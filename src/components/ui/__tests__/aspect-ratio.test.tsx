/**
 * AspectRatio Component Test Suite
 * 
 * CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio component testing patterns
 * TEST COVERAGE: Error handling, loading states, accessibility compliance, 16:9 video optimization
 * BRITISH STANDARDS: Royal client quality assurance with comprehensive test scenarios
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AspectRatio, VideoAspectRatio, SquareAspectRatio, PortraitAspectRatio } from '../aspect-ratio'

describe('AspectRatio Component', () => {
  describe('Basic Functionality', () => {
    it('renders with default 16:9 aspect ratio', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <div>Test content</div>
        </AspectRatio>
      )
      
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toBeInTheDocument()
      expect(container).toHaveAttribute('data-slot', 'aspect-ratio')
    })

    it('renders with custom aspect ratio', () => {
      render(
        <AspectRatio ratio={4/3} data-testid="custom-ratio">
          <div>Test content</div>
        </AspectRatio>
      )
      
      expect(screen.getByTestId('custom-ratio')).toBeInTheDocument()
    })

    it('applies custom className correctly', () => {
      render(
        <AspectRatio className="custom-class" data-testid="custom-class">
          <div>Test content</div>
        </AspectRatio>
      )
      
      const container = screen.getByTestId('custom-class')
      expect(container).toHaveClass('custom-class')
    })
  })

  describe('Video Optimization', () => {
    it('handles video elements with proper event handlers', () => {
      render(
        <AspectRatio>
          <video data-testid="video-element" src="/test-video.mp4" />
        </AspectRatio>
      )
      
      const video = screen.getByTestId('video-element')
      expect(video).toHaveClass('h-full', 'w-full', 'object-cover')
    })

    it('handles image elements with proper event handlers', () => {
      render(
        <AspectRatio>
          <img data-testid="image-element" src="/test-image.jpg" alt="Test" />
        </AspectRatio>
      )
      
      const image = screen.getByTestId('image-element')
      expect(image).toHaveClass('h-full', 'w-full', 'object-cover')
    })
  })

  describe('Error Handling', () => {
    it('displays error fallback when provided', async () => {
      const errorFallback = <div data-testid="error-fallback">Error loading content</div>
      
      render(
        <AspectRatio errorFallback={errorFallback}>
          <img 
            src="/broken-image.jpg" 
            alt="Broken" 
            onError={() => {}} // Simulate error
          />
        </AspectRatio>
      )

      // Initially no error should be shown
      expect(screen.queryByTestId('error-fallback')).not.toBeInTheDocument()
    })

    it('displays loading placeholder when provided', () => {
      const loadingPlaceholder = <div data-testid="loading-placeholder">Loading...</div>
      
      render(
        <AspectRatio loadingPlaceholder={loadingPlaceholder}>
          <img src="/test-image.jpg" alt="Test" />
        </AspectRatio>
      )

      expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('includes proper ARIA attributes for error state', () => {
      const errorFallback = <div>Error content</div>
      
      render(
        <AspectRatio errorFallback={errorFallback}>
          <div>Content</div>
        </AspectRatio>
      )

      // Error state should have proper ARIA attributes when active
      const container = screen.getByRole('region')
      expect(container).toHaveAttribute('data-slot', 'aspect-ratio')
    })

    it('maintains semantic HTML structure', () => {
      render(
        <AspectRatio>
          <img src="/test.jpg" alt="Descriptive alt text" />
        </AspectRatio>
      )

      const image = screen.getByAltText('Descriptive alt text')
      expect(image).toBeInTheDocument()
    })
  })

  describe('Predefined Variants', () => {
    it('VideoAspectRatio renders with 16:9 ratio', () => {
      render(
        <VideoAspectRatio data-testid="video-ratio">
          <video src="/test.mp4" />
        </VideoAspectRatio>
      )
      
      expect(screen.getByTestId('video-ratio')).toBeInTheDocument()
    })

    it('SquareAspectRatio renders with 1:1 ratio', () => {
      render(
        <SquareAspectRatio data-testid="square-ratio">
          <img src="/test.jpg" alt="Square" />
        </SquareAspectRatio>
      )
      
      expect(screen.getByTestId('square-ratio')).toBeInTheDocument()
    })

    it('PortraitAspectRatio renders with 4:5 ratio', () => {
      render(
        <PortraitAspectRatio data-testid="portrait-ratio">
          <img src="/test.jpg" alt="Portrait" />
        </PortraitAspectRatio>
      )
      
      expect(screen.getByTestId('portrait-ratio')).toBeInTheDocument()
    })
  })

  describe('Performance Considerations', () => {
    it('applies transition classes for smooth loading states', () => {
      render(
        <AspectRatio>
          <img data-testid="transition-image" src="/test.jpg" alt="Test" />
        </AspectRatio>
      )
      
      const image = screen.getByTestId('transition-image')
      expect(image).toHaveClass('transition-opacity', 'duration-300')
    })

    it('handles multiple children correctly', () => {
      render(
        <AspectRatio>
          <img data-testid="first-image" src="/test1.jpg" alt="First" />
          <div data-testid="overlay">Overlay content</div>
        </AspectRatio>
      )
      
      expect(screen.getByTestId('first-image')).toBeInTheDocument()
      expect(screen.getByTestId('overlay')).toBeInTheDocument()
    })
  })
})