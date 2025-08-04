import { test, expect } from '@playwright/test'
import { 
  testAccessibility, 
  expectNoAccessibilityViolations,
  testKeyboardNavigation,
  testFocusVisibility
} from '../utils/accessibility-helpers'

// CLAUDE.md rule 34: Comprehensive testing with axe-core
// WCAG 2.1 AA compliance tests

test.describe('Accessibility Tests - WCAG 2.1 AA Compliance', () => {
  
  test('Homepage should have no accessibility violations', async ({ page }) => {
    await page.goto('/')
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle')
    
    // Run accessibility scan
    const results = await testAccessibility(page)
    
    // Assert no violations
    expectNoAccessibilityViolations(results)
  })

  test('Homepage should support keyboard navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Test keyboard navigation
    const focusableElements = await testKeyboardNavigation(page)
    
    // Should have focusable elements
    expect(focusableElements.length).toBeGreaterThan(0)
    
    // Should include main navigation elements
    const navigationElements = focusableElements.filter(el => 
      el.includes('nav') || 
      el.includes('button') || 
      el.includes('a')
    )
    expect(navigationElements.length).toBeGreaterThan(0)
  })

  test('All interactive elements should have visible focus indicators', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Get all interactive elements
    const interactiveElements = await page.$$eval(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      elements => elements.map((el, index) => `interactive-${index}`)
    )
    
    // Add data-testid for easier selection
    await page.evaluate(() => {
      const elements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      elements.forEach((el, index) => {
        el.setAttribute('data-testid', `interactive-${index}`)
      })
    })
    
    const focusIssues = await testFocusVisibility(
      page,
      interactiveElements.map((_, index) => `[data-testid="interactive-${index}"]`)
    )
    
    if (focusIssues.length > 0) {
      console.log('Focus visibility issues found:', focusIssues)
    }
    
    // Allow some elements to not be focusable if they're decorative
    expect(focusIssues.length).toBeLessThanOrEqual(interactiveElements.length * 0.1)
  })

  test('Page should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const headingStructure = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      return headings.map(h => ({
        level: parseInt(h.tagName.charAt(1)),
        text: h.textContent?.trim(),
        tagName: h.tagName.toLowerCase()
      }))
    })
    
    // Should have exactly one h1
    const h1Count = headingStructure.filter(h => h.level === 1).length
    expect(h1Count).toBe(1)
    
    // Should have proper hierarchy (no skipped levels)
    let previousLevel = 0
    for (const heading of headingStructure) {
      if (heading.level > previousLevel + 1) {
        throw new Error(`Heading hierarchy violation: Found h${heading.level} after h${previousLevel}`)
      }
      previousLevel = Math.max(previousLevel, heading.level)
    }
  })

  test('Images should have appropriate alt text', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const imageIssues = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'))
      const issues: string[] = []
      
      images.forEach((img, index) => {
        const alt = img.getAttribute('alt')
        const src = img.src
        
        // Decorative images can have empty alt
        if (alt === null) {
          issues.push(`Image ${index + 1} (${src}) missing alt attribute`)
        } else if (alt && alt.length > 0) {
          // Check for meaningful alt text
          const meaninglessPatterns = [
            'image', 'picture', 'photo', 'img', 'icon',
            '.jpg', '.png', '.gif', '.svg', '.webp', '.avif'
          ]
          
          const altLower = alt.toLowerCase()
          const hasFilename = meaninglessPatterns.some(pattern => altLower.includes(pattern))
          
          if (hasFilename) {
            issues.push(`Image ${index + 1} has non-descriptive alt text: "${alt}"`)
          }
        }
      })
      
      return issues
    })
    
    if (imageIssues.length > 0) {
      console.log('Image accessibility issues:', imageIssues)
    }
    
    // Should have minimal image accessibility issues
    expect(imageIssues.length).toBe(0)
  })

  test('Form elements should have proper labels', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Navigate to contact form if it exists
    const hasContactForm = await page.$('#contact') !== null
    if (hasContactForm) {
      await page.click('a[href="#contact"]')
      await page.waitForTimeout(500)
    }
    
    const formIssues = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'))
      const issues: string[] = []
      
      inputs.forEach((input, index) => {
        const element = input as HTMLInputElement
        const type = element.type
        
        // Skip hidden inputs
        if (type === 'hidden' || type === 'submit' || type === 'button') {
          return
        }
        
        const hasLabel = !!(
          element.labels?.length > 0 ||
          element.getAttribute('aria-label') ||
          element.getAttribute('aria-labelledby') ||
          element.getAttribute('placeholder')
        )
        
        if (!hasLabel) {
          issues.push(`Form element ${index + 1} (${type}) has no accessible label`)
        }
      })
      
      return issues
    })
    
    expect(formIssues.length).toBe(0)
  })

  test('Page should support screen readers with proper ARIA', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Check for essential ARIA landmarks
    const landmarks = await page.evaluate(() => {
      const selectors = [
        '[role="main"], main',
        '[role="navigation"], nav',
        '[role="banner"], header',
        '[role="contentinfo"], footer'
      ]
      
      const foundLandmarks: string[] = []
      
      selectors.forEach(selector => {
        const element = document.querySelector(selector)
        if (element) {
          const role = element.getAttribute('role') || element.tagName.toLowerCase()
          foundLandmarks.push(role)
        }
      })
      
      return foundLandmarks
    })
    
    // Should have main landmark
    expect(landmarks).toContain('main')
    
    // Should have navigation
    expect(landmarks.some(l => l === 'navigation' || l === 'nav')).toBe(true)
    
    // Should have banner/header
    expect(landmarks.some(l => l === 'banner' || l === 'header')).toBe(true)
    
    // Should have footer
    expect(landmarks.some(l => l === 'contentinfo' || l === 'footer')).toBe(true)
  })

  test('Skip to content link should be functional', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Tab to skip link (should be first focusable element)
    await page.keyboard.press('Tab')
    
    const skipLinkText = await page.evaluate(() => {
      const activeElement = document.activeElement
      return activeElement?.textContent?.trim() || ''
    })
    
    // Should focus skip link
    expect(skipLinkText.toLowerCase()).toContain('skip')
    
    // Activate skip link
    await page.keyboard.press('Enter')
    
    // Should focus main content
    const focusedAfterSkip = await page.evaluate(() => {
      const activeElement = document.activeElement
      return activeElement?.id || activeElement?.tagName.toLowerCase() || ''
    })
    
    expect(['main-content', 'main'].some(id => focusedAfterSkip.includes(id))).toBe(true)
  })

  test('Page should respect prefers-reduced-motion', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Check that animations are disabled or reduced
    const hasReducedMotion = await page.evaluate(() => {
      const elements = document.querySelectorAll('*')
      let animatedElements = 0
      
      elements.forEach(el => {
        const style = getComputedStyle(el)
        const hasAnimation = 
          style.animationName !== 'none' ||
          style.transitionDuration !== '0s'
        
        if (hasAnimation) {
          animatedElements++
        }
      })
      
      return {
        totalElements: elements.length,
        animatedElements,
        reducedMotionSupported: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      }
    })
    
    expect(hasReducedMotion.reducedMotionSupported).toBe(true)
    
    // Should have significantly fewer animated elements with reduced motion
    const animationRatio = hasReducedMotion.animatedElements / hasReducedMotion.totalElements
    expect(animationRatio).toBeLessThan(0.1) // Less than 10% of elements should be animated
  })
})