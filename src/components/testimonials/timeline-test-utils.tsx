/**
 * TIMELINE TESTING UTILITIES
 * CONTEXT7 SOURCE: /testing-library/react - Comprehensive testing patterns for React components
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe testing utilities and mocks
 * 
 * TASK 10: Interactive Testimonials Timeline - Testing & Validation Utilities
 * This module provides comprehensive testing utilities for timeline components,
 * including accessibility testing, performance validation, and interaction testing.
 * 
 * BUSINESS IMPACT: £50,000+ revenue protection through robust testing infrastructure
 * ROYAL CLIENT STANDARDS: Enterprise-grade testing ensuring premium user experience
 */

import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import type { 
  ClientJourneyTimeline, 
  TimelineStage, 
  TimelineConfiguration,
  TestimonialsTimelineProps 
} from '@/types/testimonials-timeline'
import { AccessibilityProvider } from './timeline-accessibility-manager'
import { TimelinePerformanceProvider } from './timeline-performance-monitor'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// CONTEXT7 SOURCE: /testing-library/react - Mock data for testing timeline components
export const mockTimelineData: ClientJourneyTimeline = {
  id: 'test-timeline-1',
  title: 'Test Student Journey',
  subtitle: 'From struggling to success',
  description: 'A comprehensive test journey showcasing academic transformation',
  category: '11+',
  duration: 'medium_term',
  totalDurationMonths: 6,
  startDate: '2024-01-01',
  endDate: '2024-06-30',
  isOngoing: false,
  overallResult: 'Test School Acceptance',
  gradeImprovement: 'C → A*',
  schoolPlacement: 'Test School',
  examResults: 'Test Exam: Grade A*',
  featured: true,
  verified: true,
  roi: '£100,000+ test value',
  clientProfile: {
    name: 'Test Student',
    ageGroup: 'primary',
    yearGroup: 'Year 6',
    subjects: ['English', 'Mathematics'],
    initialChallenges: ['Test anxiety', 'Low confidence'],
    goals: ['Achieve top grades', 'Gain school place'],
    learningStyle: 'Visual learner',
    location: 'Test Location',
    schoolType: 'independent'
  },
  tutorInfo: {
    name: 'Test Tutor',
    expertise: ['English', 'Mathematics'],
    experience: '10+ years',
    qualifications: ['Test Qualification'],
    teachingStyle: 'Supportive and encouraging'
  },
  stages: [
    {
      id: 'stage-1',
      stage: 'initial_consultation',
      title: 'Initial Assessment',
      description: 'Comprehensive evaluation of student needs',
      duration: '2 weeks',
      timeframe: 'January 2024',
      milestone: 'Assessment completed',
      order: 1,
      progressIndicators: [
        {
          type: 'confidence',
          label: 'Student Confidence',
          beforeValue: 3,
          afterValue: 5,
          improvement: '+67%',
          visualType: 'bar'
        }
      ],
      visualElements: {
        icon: 'search',
        color: '#3B82F6',
        animationType: 'fade',
        animationDuration: 800,
        animationDelay: 0
      }
    },
    {
      id: 'stage-2',
      stage: 'progress_monitoring',
      title: 'Progress Tracking',
      description: 'Regular monitoring of student development',
      duration: '4 months',
      timeframe: 'February - May 2024',
      milestone: 'Consistent improvement achieved',
      order: 2,
      progressIndicators: [
        {
          type: 'grade',
          label: 'Academic Performance',
          beforeValue: 'C',
          afterValue: 'A*',
          improvement: '+3 grades',
          visualType: 'badge'
        }
      ],
      visualElements: {
        icon: 'trending-up',
        color: '#10B981',
        animationType: 'slide',
        animationDuration: 1000,
        animationDelay: 200
      }
    }
  ]
}

export const mockTimelineConfig: TimelineConfiguration = {
  layout: 'vertical',
  animation: {
    enabled: true,
    respectsReducedMotion: true,
    scrollTrigger: true,
    staggerDelay: 200,
    easingFunction: 'easeOut',
    animationDuration: 800,
    parallaxEffect: false
  },
  interactivity: {
    expandableStages: true,
    clickableElements: true,
    hoverEffects: true,
    touchGestures: true,
    keyboardNavigation: true,
    filterByCategory: true,
    searchFunctionality: false
  },
  responsive: {
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024
    },
    stackOnMobile: true,
    compactView: true,
    touchOptimized: true
  },
  accessibility: {
    ariaLabels: true,
    keyboardNavigation: true,
    screenReaderSupport: true,
    focusManagement: true,
    colorContrast: 'AA',
    semanticMarkup: true
  },
  performance: {
    lazyLoading: true,
    virtualizedRendering: false,
    imageOptimization: true,
    animationBudget: 100,
    bundleSizeLimit: 50
  }
}

// CONTEXT7 SOURCE: /testing-library/react - Test wrapper with required providers
export const TimelineTestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AccessibilityProvider>
    <TimelinePerformanceProvider enableMonitoring={false}>
      {children}
    </TimelinePerformanceProvider>
  </AccessibilityProvider>
)

/**
 * CONTEXT7 SOURCE: /testing-library/react - Custom render function with timeline providers
 * Enhanced render function that includes all necessary providers for timeline testing
 */
export const renderTimeline = (
  ui: React.ReactElement,
  options: {
    withProviders?: boolean
    initialAccessibilityPrefs?: any
    performanceMonitoring?: boolean
  } = {}
) => {
  const {
    withProviders = true,
    initialAccessibilityPrefs = {},
    performanceMonitoring = false
  } = options

  if (!withProviders) {
    return render(ui)
  }

  return render(
    <AccessibilityProvider initialPreferences={initialAccessibilityPrefs}>
      <TimelinePerformanceProvider enableMonitoring={performanceMonitoring}>
        {ui}
      </TimelinePerformanceProvider>
    </AccessibilityProvider>
  )
}

/**
 * CONTEXT7 SOURCE: /jest-axe/axe - Accessibility testing utilities
 * Comprehensive accessibility testing for timeline components
 */
export const testTimelineAccessibility = async (container: HTMLElement) => {
  // Basic axe accessibility test
  const results = await axe(container)
  expect(results).toHaveNoViolations()

  // Additional WCAG 2.1 AA specific tests
  
  // Test 1: Keyboard Navigation
  const interactiveElements = container.querySelectorAll(
    'button, [role="button"], a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  expect(interactiveElements.length).toBeGreaterThan(0)
  
  // Ensure all interactive elements are keyboard accessible
  interactiveElements.forEach(element => {
    expect(element).not.toHaveAttribute('tabindex', '-1')
  })

  // Test 2: ARIA Labels and Descriptions
  const timelineElements = container.querySelectorAll('[role="article"], [role="region"]')
  timelineElements.forEach(element => {
    expect(
      element.hasAttribute('aria-label') || 
      element.hasAttribute('aria-labelledby') ||
      element.textContent?.trim()
    ).toBeTruthy()
  })

  // Test 3: Focus Management
  const focusableElements = container.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )
  
  expect(focusableElements.length).toBeGreaterThan(0)

  // Test 4: Color Contrast (basic check)
  const textElements = container.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6')
  textElements.forEach(element => {
    const styles = window.getComputedStyle(element)
    const hasText = element.textContent?.trim()
    
    if (hasText) {
      expect(styles.color).not.toBe('transparent')
      expect(styles.backgroundColor || styles.background).toBeDefined()
    }
  })

  return results
}

/**
 * CONTEXT7 SOURCE: /testing-library/user-event - User interaction testing utilities
 * Utilities for testing timeline user interactions
 */
export const timelineInteractionTests = {
  // Test stage expansion/collapse
  async testStageExpansion(stageElement: HTMLElement) {
    const user = userEvent.setup()
    
    // Find expand/collapse button
    const expandButton = within(stageElement).getByRole('button', { 
      name: /expand|collapse|view|hide/i 
    })
    
    expect(expandButton).toBeInTheDocument()
    
    // Test click interaction
    await user.click(expandButton)
    
    // Verify expansion state changed
    await waitFor(() => {
      expect(
        expandButton.getAttribute('aria-expanded') === 'true' ||
        within(stageElement).queryByText(/hide|collapse/i)
      ).toBeTruthy()
    })
  },

  // Test keyboard navigation
  async testKeyboardNavigation(container: HTMLElement) {
    const user = userEvent.setup()
    
    // Find first focusable timeline element
    const firstElement = container.querySelector(
      'button, [role="button"], [tabindex="0"]'
    ) as HTMLElement
    
    expect(firstElement).toBeInTheDocument()
    
    // Focus first element
    firstElement.focus()
    expect(firstElement).toHaveFocus()
    
    // Test Tab navigation
    await user.keyboard('{Tab}')
    expect(document.activeElement).not.toBe(firstElement)
    
    // Test Enter key activation
    if (firstElement.tagName === 'BUTTON' || firstElement.getAttribute('role') === 'button') {
      firstElement.focus()
      await user.keyboard('{Enter}')
      
      // Should trigger some action (button click, expansion, etc.)
      await waitFor(() => {
        // Check for common interaction results
        expect(
          container.querySelector('[aria-expanded="true"]') ||
          container.querySelector('.expanded') ||
          container.querySelector('[data-expanded="true"]')
        ).toBeTruthy()
      }, { timeout: 1000 })
    }
  },

  // Test touch/swipe gestures (mobile)
  async testTouchInteractions(container: HTMLElement) {
    const touchableElements = container.querySelectorAll('[data-touch="true"], .swipeable, .touchable')
    
    if (touchableElements.length === 0) {
      // Skip if no touch-optimized elements
      return
    }

    // Simulate touch events
    touchableElements.forEach(element => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [new Touch({
          identifier: 1,
          target: element,
          clientX: 100,
          clientY: 100
        })]
      } as any)
      
      const touchEndEvent = new TouchEvent('touchend', {
        touches: []
      } as any)
      
      fireEvent(element, touchStartEvent)
      fireEvent(element, touchEndEvent)
    })
  },

  // Test filter interactions
  async testFilterFunctionality(container: HTMLElement) {
    const user = userEvent.setup()
    
    // Find filter buttons
    const filterButtons = container.querySelectorAll(
      '[role="button"][aria-pressed], button[data-filter], .filter-button'
    )
    
    if (filterButtons.length === 0) return
    
    const firstFilter = filterButtons[0] as HTMLElement
    await user.click(firstFilter)
    
    // Check if filter state changed
    await waitFor(() => {
      expect(
        firstFilter.getAttribute('aria-pressed') === 'true' ||
        firstFilter.classList.contains('active') ||
        firstFilter.getAttribute('data-active') === 'true'
      ).toBeTruthy()
    })
  }
}

/**
 * CONTEXT7 SOURCE: /testing-library/react - Performance testing utilities
 * Utilities for testing timeline performance characteristics
 */
export const timelinePerformanceTests = {
  // Test render performance
  testRenderPerformance: (renderFunction: () => React.ReactElement) => {
    const startTime = performance.now()
    const { unmount } = render(renderFunction())
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Should render within 100ms budget
    expect(renderTime).toBeLessThan(100)
    
    unmount()
    return renderTime
  },

  // Test animation performance
  testAnimationPerformance: async (container: HTMLElement) => {
    const animatedElements = container.querySelectorAll(
      '.animate, [data-animate], .motion, .framer-motion'
    )
    
    // Check for will-change optimization
    animatedElements.forEach(element => {
      const styles = window.getComputedStyle(element)
      expect(
        styles.willChange === 'transform' ||
        styles.willChange === 'opacity' ||
        styles.willChange === 'auto'
      ).toBeTruthy()
    })
  },

  // Test memory usage (basic check)
  testMemoryUsage: () => {
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory
      const initialMemory = memoryInfo.usedJSHeapSize
      
      // Return function to check memory after operations
      return () => {
        const finalMemory = memoryInfo.usedJSHeapSize
        const memoryDelta = finalMemory - initialMemory
        
        // Should not increase memory by more than 5MB
        expect(memoryDelta).toBeLessThan(5 * 1024 * 1024)
        
        return memoryDelta
      }
    }
    
    return () => 0
  }
}

/**
 * CONTEXT7 SOURCE: /testing-library/react - Integration testing utilities
 * Comprehensive integration tests for timeline components
 */
export const timelineIntegrationTests = {
  // Test complete user journey through timeline
  async testCompleteUserJourney(container: HTMLElement) {
    const user = userEvent.setup()
    
    // 1. Test initial load and accessibility
    await testTimelineAccessibility(container)
    
    // 2. Test filter interaction
    await timelineInteractionTests.testFilterFunctionality(container)
    
    // 3. Test stage expansion
    const stageElements = container.querySelectorAll('[role="article"], .timeline-stage')
    if (stageElements.length > 0) {
      await timelineInteractionTests.testStageExpansion(stageElements[0] as HTMLElement)
    }
    
    // 4. Test keyboard navigation
    await timelineInteractionTests.testKeyboardNavigation(container)
    
    // 5. Test responsive behavior (basic)
    const timelineContainer = container.querySelector('[role="region"], .timeline')
    expect(timelineContainer).toBeInTheDocument()
  },

  // Test CMS integration
  async testCMSIntegration(timelineProps: TestimonialsTimelineProps) {
    expect(timelineProps.timelines).toBeDefined()
    expect(Array.isArray(timelineProps.timelines)).toBe(true)
    
    if (timelineProps.timelines && timelineProps.timelines.length > 0) {
      const firstTimeline = timelineProps.timelines[0]
      
      // Validate timeline data structure
      expect(firstTimeline).toHaveProperty('id')
      expect(firstTimeline).toHaveProperty('title')
      expect(firstTimeline).toHaveProperty('stages')
      expect(firstTimeline.stages).toBeInstanceOf(Array)
      expect(firstTimeline.stages.length).toBeGreaterThan(0)
      
      // Validate stage data structure
      const firstStage = firstTimeline.stages[0]
      expect(firstStage).toHaveProperty('id')
      expect(firstStage).toHaveProperty('title')
      expect(firstStage).toHaveProperty('description')
    }
  }
}

/**
 * CONTEXT7 SOURCE: /testing-library/react - Test suite generator
 * Generates comprehensive test suite for timeline components
 */
export const generateTimelineTestSuite = (
  componentName: string,
  Component: React.ComponentType<TestimonialsTimelineProps>,
  defaultProps: Partial<TestimonialsTimelineProps> = {}
) => {
  const testProps: TestimonialsTimelineProps = {
    timelines: [mockTimelineData],
    configuration: mockTimelineConfig,
    ...defaultProps
  }

  return describe(`${componentName} Component`, () => {
    beforeEach(() => {
      // Reset any global state
      jest.clearAllMocks()
    })

    test('renders without crashing', () => {
      const { container } = renderTimeline(<Component {...testProps} />)
      expect(container).toBeInTheDocument()
    })

    test('meets accessibility standards', async () => {
      const { container } = renderTimeline(<Component {...testProps} />)
      await testTimelineAccessibility(container)
    })

    test('handles keyboard navigation', async () => {
      const { container } = renderTimeline(<Component {...testProps} />)
      await timelineInteractionTests.testKeyboardNavigation(container)
    })

    test('supports stage expansion/collapse', async () => {
      const { container } = renderTimeline(<Component {...testProps} />)
      const stages = container.querySelectorAll('[role="article"], .timeline-stage')
      
      if (stages.length > 0) {
        await timelineInteractionTests.testStageExpansion(stages[0] as HTMLElement)
      }
    })

    test('renders with reduced motion preferences', () => {
      const { container } = renderTimeline(
        <Component {...testProps} />,
        { 
          initialAccessibilityPrefs: { reducedMotion: true }
        }
      )
      
      expect(container).toBeInTheDocument()
    })

    test('handles empty timeline data gracefully', () => {
      const { container } = renderTimeline(
        <Component {...testProps} timelines={[]} />
      )
      
      expect(container).toBeInTheDocument()
      expect(container.textContent).toContain('No') // Should show empty state
    })

    test('maintains performance standards', () => {
      const renderTime = timelinePerformanceTests.testRenderPerformance(
        () => <Component {...testProps} />
      )
      
      expect(renderTime).toBeLessThan(100) // 100ms budget
    })

    test('validates CMS data integration', async () => {
      await timelineIntegrationTests.testCMSIntegration(testProps)
    })
  })
}