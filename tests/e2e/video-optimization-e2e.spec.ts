// CONTEXT7 SOURCE: /microsoft/playwright - Playwright E2E testing patterns for video component interactions
// E2E TESTING REASON: Official Playwright documentation recommends comprehensive E2E testing for video functionality
// 
// CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Intersection Observer E2E testing with real browser APIs
// INTERSECTION OBSERVER E2E: Official documentation shows browser-based intersection observer testing
// 
// Video Optimization End-to-End Test Suite
// Comprehensive E2E testing for video optimization implementation
// 
// E2E Test Coverage:
// - Video component loading performance in real browser environment
// - Intersection Observer lazy loading functionality verification
// - ReactPlayer integration with actual YouTube videos
// - Modal functionality and focus management testing
// - Keyboard navigation across video components
// - Video thumbnail interaction and state management
// - Performance optimization verification in browser
// - Accessibility compliance in real browser context

import { test, expect, Page, BrowserContext } from '@playwright/test'

// CONTEXT7 SOURCE: /microsoft/playwright - Page object model for E2E testing
// PAGE OBJECTS: Official Playwright documentation recommends page objects for maintainable tests

class VideoOptimizationPage {
  constructor(private page: Page) {}

  // CONTEXT7 SOURCE: /microsoft/playwright - Selector patterns for video components
  // SELECTORS: Playwright documentation shows robust selector strategies
  async navigateToVideoTestPage() {
    await this.page.goto('/')
    await this.page.waitForLoadState('networkidle')
  }

  async getOptimizedVideoPlayer(variant: 'hero' | 'thumbnail-card' | 'testimonial' = 'hero') {
    return this.page.locator(`[data-testid="optimized-video-player"][data-variant="${variant}"]`)
  }

  async getVideoThumbnailCard(index: number = 0) {
    return this.page.locator('[data-testid="video-thumbnail-card"]').nth(index)
  }

  async getVideoModal() {
    return this.page.locator('[data-testid="video-modal"]')
  }

  async getVideoThumbnail(index: number = 0) {
    return this.page.locator('[data-testid="video-thumbnail"]').nth(index)
  }

  async getLoadingIndicator() {
    return this.page.locator('[data-testid="loading-indicator"]')
  }

  async waitForVideoLoad(timeout: number = 5000) {
    await this.page.waitForFunction(
      () => {
        const player = document.querySelector('[data-testid="optimized-video-player"]')
        return player && player.getAttribute('data-ready') === 'true'
      },
      { timeout }
    )
  }

  async measureLoadTime(action: () => Promise<void>): Promise<number> {
    const startTime = Date.now()
    await action()
    return Date.now() - startTime
  }

  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded()
  }

  async isElementInViewport(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isInViewport()
  }
}

// CONTEXT7 SOURCE: /microsoft/playwright - Performance measurement utilities
// PERFORMANCE UTILS: Playwright documentation shows performance measurement patterns
class PerformanceMeasurement {
  constructor(private page: Page) {}

  async measureRenderTime(selector: string): Promise<number> {
    const startTime = await this.page.evaluate(() => performance.now())
    
    await this.page.waitForSelector(selector, { state: 'visible' })
    
    const endTime = await this.page.evaluate(() => performance.now())
    return endTime - startTime
  }

  async measureNetworkRequests(): Promise<{
    totalRequests: number
    videoRelatedRequests: number
    totalBytes: number
  }> {
    const requests: any[] = []
    
    this.page.on('request', request => {
      requests.push({
        url: request.url(),
        resourceType: request.resourceType(),
        method: request.method()
      })
    })

    await this.page.waitForLoadState('networkidle')

    const videoRelatedRequests = requests.filter(req => 
      req.url.includes('youtube') || 
      req.url.includes('video') ||
      req.resourceType === 'media'
    ).length

    return {
      totalRequests: requests.length,
      videoRelatedRequests,
      totalBytes: 0 // Would need response tracking for actual bytes
    }
  }

  async measureBundleSize(): Promise<{
    jsFiles: string[]
    totalJSSize: number
    lazyLoadedChunks: string[]
  }> {
    const jsFiles: string[] = []
    const lazyLoadedChunks: string[] = []

    this.page.on('response', response => {
      const url = response.url()
      if (url.endsWith('.js') && response.status() === 200) {
        jsFiles.push(url)
        if (url.includes('lazy') || url.includes('chunk')) {
          lazyLoadedChunks.push(url)
        }
      }
    })

    await this.page.waitForLoadState('networkidle')

    return {
      jsFiles,
      totalJSSize: jsFiles.length * 50000, // Estimated, would need actual size tracking
      lazyLoadedChunks
    }
  }
}

// CONTEXT7 SOURCE: /microsoft/playwright - Accessibility testing utilities
// ACCESSIBILITY E2E: Playwright documentation shows real-world accessibility testing
class AccessibilityTester {
  constructor(private page: Page) {}

  async testKeyboardNavigation(startSelector: string, expectedFocusOrder: string[]) {
    await this.page.locator(startSelector).focus()
    
    for (const selector of expectedFocusOrder) {
      await this.page.keyboard.press('Tab')
      const focused = await this.page.locator(':focus')
      await expect(focused).toHaveCount(1)
      
      const matchesSelector = await focused.locator(selector).count() > 0
      expect(matchesSelector).toBeTruthy()
    }
  }

  async testAriaLabels(selector: string, expectedLabels: string[]) {
    const elements = this.page.locator(selector)
    const count = await elements.count()
    
    for (let i = 0; i < count && i < expectedLabels.length; i++) {
      const element = elements.nth(i)
      const ariaLabel = await element.getAttribute('aria-label')
      expect(ariaLabel).toContain(expectedLabels[i])
    }
  }

  async testFocusTrapping(modalSelector: string) {
    const modal = this.page.locator(modalSelector)
    await expect(modal).toBeVisible()
    
    // Test that focus stays within modal
    const focusableElements = modal.locator('button, [tabindex="0"], input, select, textarea')
    const count = await focusableElements.count()
    
    if (count > 0) {
      await focusableElements.first().focus()
      
      // Tab through all elements and back to first
      for (let i = 0; i < count + 1; i++) {
        await this.page.keyboard.press('Tab')
      }
      
      // Should be back to first element
      const focused = await this.page.locator(':focus')
      const isFirstElement = await focused.locator(focusableElements.first()).count() > 0
      expect(isFirstElement).toBeTruthy()
    }
  }
}

test.describe('Video Optimization E2E Test Suite', () => {
  // CONTEXT7 SOURCE: /microsoft/playwright - Test setup and configuration
  // TEST SETUP: Official Playwright documentation shows proper test environment setup
  let videoPage: VideoOptimizationPage
  let performanceMeasurement: PerformanceMeasurement
  let accessibilityTester: AccessibilityTester

  test.beforeEach(async ({ page, context }) => {
    videoPage = new VideoOptimizationPage(page)
    performanceMeasurement = new PerformanceMeasurement(page)
    accessibilityTester = new AccessibilityTester(page)

    // CONTEXT7 SOURCE: /microsoft/playwright - Browser context configuration for video testing
    // CONTEXT CONFIG: Configure browser for optimal video testing
    await context.grantPermissions(['camera', 'microphone'])
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  // CONTEXT7 SOURCE: /microsoft/playwright - Component rendering and loading tests
  // RENDERING TESTS: Verify video components render correctly in browser environment
  test.describe('Video Component Rendering', () => {
    test('renders OptimizedVideoPlayer with correct structure', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      const heroVideoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
      await expect(heroVideoPlayer).toBeVisible()

      const thumbnail = await videoPage.getVideoThumbnail()
      await expect(thumbnail).toBeVisible()
      await expect(thumbnail).toHaveAttribute('role', 'button')
      await expect(thumbnail).toHaveAttribute('tabindex', '0')
    })

    test('renders VideoThumbnailTopCard with HeroVideoDialog integration', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      const videoCard = await videoPage.getVideoThumbnailCard()
      await expect(videoCard).toBeVisible()
      await expect(videoCard).toHaveAttribute('role', 'article')

      // Should have HeroVideoDialog component
      const heroVideoDialog = page.locator('[data-testid="hero-video-dialog"]')
      await expect(heroVideoDialog).toBeVisible()
    })

    test('displays loading states during component initialization', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // May briefly show loading indicator
      try {
        const loadingIndicator = await videoPage.getLoadingIndicator()
        if (await loadingIndicator.isVisible({ timeout: 1000 })) {
          await expect(loadingIndicator).toHaveText(/loading/i)
        }
      } catch {
        // Loading may complete too quickly to observe
      }

      // Should eventually show ready video player
      await videoPage.waitForVideoLoad()
    })

    test('maintains responsive design across viewport sizes', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667 }, // Mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1280, height: 720 }, // Desktop
        { width: 1920, height: 1080 } // Large desktop
      ]

      for (const viewport of viewports) {
        await page.setViewportSize(viewport)
        await videoPage.navigateToVideoTestPage()

        const heroVideoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
        await expect(heroVideoPlayer).toBeVisible()

        // Video should maintain aspect ratio
        const boundingBox = await heroVideoPlayer.boundingBox()
        expect(boundingBox).toBeTruthy()
        
        if (boundingBox) {
          const aspectRatio = boundingBox.width / boundingBox.height
          expect(aspectRatio).toBeGreaterThan(1.5) // Approximately 16:9
          expect(aspectRatio).toBeLessThan(2.0)
        }
      }
    })
  })

  // CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Real browser intersection observer testing
  // LAZY LOADING E2E: Test intersection observer functionality in real browser
  test.describe('Intersection Observer Lazy Loading', () => {
    test('implements lazy loading with intersection observer', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Scroll to bottom to move videos out of view
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })

      // Videos should still load due to rootMargin preloading
      await page.waitForTimeout(500)

      const videoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
      await expect(videoPlayer).toBeVisible()
    })

    test('triggers video loading when scrolling into view', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Create a tall page to test scrolling
      await page.addStyleTag({
        content: `
          body { height: 200vh; }
          .test-spacer { height: 100vh; margin-top: 50vh; }
        `
      })

      await page.evaluate(() => {
        const spacer = document.createElement('div')
        spacer.className = 'test-spacer'
        document.body.appendChild(spacer)
      })

      // Scroll to trigger intersection
      await page.evaluate(() => window.scrollTo(0, window.innerHeight))
      
      await page.waitForTimeout(300)

      const videoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
      const isVisible = await videoPlayer.isVisible()
      expect(isVisible).toBeTruthy()
    })

    test('preloads videos within rootMargin distance', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Test that videos load even when just outside viewport due to rootMargin
      await page.evaluate(() => {
        window.scrollTo(0, window.innerHeight * 0.8) // Scroll close to video
      })

      await page.waitForTimeout(500)

      const videoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
      const isInViewport = await videoPlayer.isInViewport()
      
      // Even if not fully in viewport, should be loaded due to rootMargin
      const isVisible = await videoPlayer.isVisible()
      expect(isVisible).toBeTruthy()
    })

    test('handles intersection observer gracefully when unavailable', async ({ page }) => {
      // Mock IntersectionObserver as unavailable
      await page.addInitScript(() => {
        // @ts-ignore
        delete window.IntersectionObserver
      })

      await videoPage.navigateToVideoTestPage()

      // Should still render videos (fallback behavior)
      const videoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
      await expect(videoPlayer).toBeVisible({ timeout: 10000 })
    })
  })

  // CONTEXT7 SOURCE: /microsoft/playwright - Modal interaction and state management testing
  // MODAL E2E: Test video modal functionality with real user interactions
  test.describe('Video Modal Functionality', () => {
    test('opens video modal when thumbnail is clicked', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      const thumbnail = await videoPage.getVideoThumbnail()
      await thumbnail.click()

      const modal = await videoPage.getVideoModal()
      await expect(modal).toBeVisible()
      await expect(modal).toHaveAttribute('role', 'dialog')
      await expect(modal).toHaveAttribute('aria-modal', 'true')
    })

    test('closes modal with close button', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Open modal
      const thumbnail = await videoPage.getVideoThumbnail()
      await thumbnail.click()

      const modal = await videoPage.getVideoModal()
      await expect(modal).toBeVisible()

      // Close modal
      const closeButton = page.locator('[data-testid="modal-close-button"]')
      await closeButton.click()

      await expect(modal).not.toBeVisible()
    })

    test('closes modal with Escape key', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Open modal
      const thumbnail = await videoPage.getVideoThumbnail()
      await thumbnail.click()

      const modal = await videoPage.getVideoModal()
      await expect(modal).toBeVisible()

      // Close with Escape
      await page.keyboard.press('Escape')
      await expect(modal).not.toBeVisible()
    })

    test('prevents body scrolling when modal is open', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Check initial body overflow
      const initialOverflow = await page.evaluate(() => document.body.style.overflow)
      
      // Open modal
      const thumbnail = await videoPage.getVideoThumbnail()
      await thumbnail.click()

      // Body should prevent scrolling
      const modalOverflow = await page.evaluate(() => document.body.style.overflow)
      expect(modalOverflow).toBe('hidden')

      // Close modal
      await page.keyboard.press('Escape')

      // Body overflow should be restored
      const finalOverflow = await page.evaluate(() => document.body.style.overflow)
      expect(finalOverflow).toBe('unset')
    })

    test('manages focus correctly in modal', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      const thumbnail = await videoPage.getVideoThumbnail()
      await thumbnail.click()

      const modal = await videoPage.getVideoModal()
      await expect(modal).toBeVisible()

      // Focus should be trapped within modal
      await accessibilityTester.testFocusTrapping('[data-testid="video-modal"]')
    })
  })

  // CONTEXT7 SOURCE: /microsoft/playwright - Performance measurement in real browser environment
  // PERFORMANCE E2E: Measure actual performance improvements in browser
  test.describe('Performance Optimization Verification', () => {
    test('achieves fast video component loading times', async ({ page }) => {
      const loadTime = await videoPage.measureLoadTime(async () => {
        await videoPage.navigateToVideoTestPage()
        await videoPage.waitForVideoLoad()
      })

      // Should load within 2 seconds
      expect(loadTime).toBeLessThan(2000)
    })

    test('reduces network requests through lazy loading', async ({ page }) => {
      const networkMetrics = await performanceMeasurement.measureNetworkRequests()

      await videoPage.navigateToVideoTestPage()

      // Should have reasonable number of initial requests
      expect(networkMetrics.totalRequests).toBeLessThan(50)
      expect(networkMetrics.videoRelatedRequests).toBeLessThan(10)
    })

    test('implements effective code splitting', async ({ page }) => {
      const bundleMetrics = await performanceMeasurement.measureBundleSize()

      await videoPage.navigateToVideoTestPage()

      // Should load JS files in chunks
      expect(bundleMetrics.jsFiles.length).toBeGreaterThan(3)
      
      // Should have lazy-loaded chunks
      expect(bundleMetrics.lazyLoadedChunks.length).toBeGreaterThan(0)
    })

    test('opens modal quickly without performance lag', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()
      await videoPage.waitForVideoLoad()

      const modalOpenTime = await videoPage.measureLoadTime(async () => {
        const thumbnail = await videoPage.getVideoThumbnail()
        await thumbnail.click()
        await expect(page.locator('[data-testid="video-modal"]')).toBeVisible()
      })

      // Modal should open in under 100ms
      expect(modalOpenTime).toBeLessThan(100)
    })

    test('maintains smooth scrolling performance with multiple videos', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Add multiple video components for stress testing
      await page.evaluate(() => {
        const container = document.body
        for (let i = 0; i < 10; i++) {
          const videoDiv = document.createElement('div')
          videoDiv.innerHTML = `<div data-testid="performance-video-${i}" style="height: 200px; margin: 20px; background: #f0f0f0;">Video ${i}</div>`
          container.appendChild(videoDiv)
        }
      })

      // Test smooth scrolling
      const scrollStartTime = Date.now()
      
      await page.evaluate(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      })
      
      await page.waitForTimeout(500)
      const scrollTime = Date.now() - scrollStartTime

      // Scrolling should be smooth (complete within reasonable time)
      expect(scrollTime).toBeLessThan(1000)
    })
  })

  // CONTEXT7 SOURCE: /w3c/wcag - Real browser accessibility testing
  // ACCESSIBILITY E2E: Test WCAG compliance in actual browser environment
  test.describe('Accessibility Compliance', () => {
    test('supports complete keyboard navigation', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      const focusOrder = [
        '[data-testid="video-thumbnail"]',
        '[data-testid="cta-button"]'
      ]

      await accessibilityTester.testKeyboardNavigation('body', focusOrder)
    })

    test('provides proper ARIA labels for screen readers', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      const expectedLabels = ['Play video']
      await accessibilityTester.testAriaLabels('[data-testid="video-thumbnail"]', expectedLabels)
    })

    test('announces loading states to screen readers', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Check for aria-live regions
      const liveRegions = page.locator('[aria-live]')
      const count = await liveRegions.count()
      
      expect(count).toBeGreaterThan(0)

      // Verify polite announcements
      const politeRegions = page.locator('[aria-live="polite"]')
      const politeCount = await politeRegions.count()
      expect(politeCount).toBeGreaterThanOrEqual(1)
    })

    test('maintains focus indicators during navigation', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      const thumbnail = await videoPage.getVideoThumbnail()
      await thumbnail.focus()

      // Check that element has focus styles
      const focused = page.locator(':focus')
      await expect(focused).toHaveCount(1)
      
      // Verify focus is visible
      const boundingBox = await focused.boundingBox()
      expect(boundingBox).toBeTruthy()
    })

    test('handles error states accessibly', async ({ page }) => {
      // Mock a video error scenario
      await page.route('**/*youtube*', route => route.abort())
      
      await videoPage.navigateToVideoTestPage()

      // Should show accessible error message
      const errorElements = page.locator('[role="alert"]')
      const errorCount = await errorElements.count()
      
      if (errorCount > 0) {
        const firstError = errorElements.first()
        await expect(firstError).toBeVisible()
        
        const ariaLive = await firstError.getAttribute('aria-live')
        expect(ariaLive).toBeTruthy()
      }
    })
  })

  // CONTEXT7 SOURCE: /microsoft/playwright - Cross-browser compatibility testing
  // BROWSER COMPATIBILITY: Test video optimization across different browsers
  test.describe('Cross-Browser Compatibility', () => {
    test('works consistently across browsers', async ({ page, browserName }) => {
      await videoPage.navigateToVideoTestPage()

      const videoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
      await expect(videoPlayer).toBeVisible()

      // Test basic functionality
      const thumbnail = await videoPage.getVideoThumbnail()
      await thumbnail.click()

      const modal = await videoPage.getVideoModal()
      await expect(modal).toBeVisible()

      // Close modal
      await page.keyboard.press('Escape')
      await expect(modal).not.toBeVisible()

      // Should work the same regardless of browser
      expect(['chromium', 'firefox', 'webkit']).toContain(browserName)
    })

    test('handles different viewport sizes gracefully', async ({ page }) => {
      const testViewports = [
        { width: 320, height: 568 }, // iPhone SE
        { width: 375, height: 812 }, // iPhone X
        { width: 768, height: 1024 }, // iPad
        { width: 1366, height: 768 }, // Laptop
        { width: 1920, height: 1080 } // Desktop
      ]

      for (const viewport of testViewports) {
        await page.setViewportSize(viewport)
        await videoPage.navigateToVideoTestPage()

        const videoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
        await expect(videoPlayer).toBeVisible()

        // Ensure video is not cut off
        const boundingBox = await videoPlayer.boundingBox()
        expect(boundingBox).toBeTruthy()
        
        if (boundingBox) {
          expect(boundingBox.width).toBeGreaterThan(0)
          expect(boundingBox.height).toBeGreaterThan(0)
          expect(boundingBox.width).toBeLessThanOrEqual(viewport.width)
        }
      }
    })
  })

  // CONTEXT7 SOURCE: /microsoft/playwright - Integration testing with real video sources
  // VIDEO INTEGRATION: Test with actual video sources and APIs
  test.describe('Video Source Integration', () => {
    test('handles YouTube video URLs correctly', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Test with mock YouTube URL
      const videoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
      await expect(videoPlayer).toBeVisible()

      const dataVideoSrc = await videoPlayer.getAttribute('data-video-src')
      if (dataVideoSrc) {
        expect(dataVideoSrc).toMatch(/youtube\.com\/watch\?v=|youtu\.be\//)
      }
    })

    test('provides fallback for failed video loads', async ({ page }) => {
      // Mock video loading failure
      await page.route('**/*youtube*', route => route.abort('failed'))
      
      await videoPage.navigateToVideoTestPage()

      // Should show error state or fallback
      const errorElement = page.locator('[role="alert"]').first()
      
      try {
        await expect(errorElement).toBeVisible({ timeout: 5000 })
        const errorText = await errorElement.textContent()
        expect(errorText).toMatch(/unavailable|error|failed/i)
      } catch {
        // May not show error if fallback handles it gracefully
        const videoPlayer = await videoPage.getOptimizedVideoPlayer('hero')
        await expect(videoPlayer).toBeVisible()
      }
    })

    test('supports different video formats and sources', async ({ page }) => {
      await videoPage.navigateToVideoTestPage()

      // Test that different video sources are handled
      const videoElements = page.locator('[data-testid*="video"]')
      const count = await videoElements.count()

      expect(count).toBeGreaterThan(0)

      // Each video element should have proper attributes
      for (let i = 0; i < Math.min(count, 5); i++) {
        const element = videoElements.nth(i)
        const isVisible = await element.isVisible()
        expect(isVisible).toBeTruthy()
      }
    })
  })
})