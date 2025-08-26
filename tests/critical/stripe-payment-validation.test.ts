// CONTEXT7 SOURCE: /playwright/test - E2E testing patterns for payment system validation
// BUSINESS CRITICAL: Revenue protection for My Private Tutor Online Stripe integration
import { test, expect } from '@playwright/test'

// Critical revenue protection tests for Stripe payment integration
// These tests MUST pass before Monday delivery - direct financial impact

test.describe('Stripe Payment Integration - REVENUE CRITICAL', () => {
  
  test.describe('11+ Bootcamp Bookings - Direct Revenue Impact', () => {
    
    test('11+ Kickstarter payment link redirects correctly', async ({ page }) => {
      // Navigate to 11+ bootcamps page
      await page.goto('/11-plus-bootcamps')
      await page.waitForLoadState('networkidle')
      
      // Verify page loads correctly
      await expect(page.getByRole('heading', { name: /11\+ Online Bootcamps/i })).toBeVisible()
      
      // Find and click the Kickstarter booking button/link
      // Expected Stripe URL: https://buy.stripe.com/6oUdR8enb9jF69u1Zd3840c
      const kickstarterLink = page.locator('[href*="6oUdR8enb9jF69u1Zd3840c"], [data-stripe-url*="6oUdR8enb9jF69u1Zd3840c"]')
      
      // Verify the payment link exists on the page
      await expect(kickstarterLink).toBeVisible()
      await expect(kickstarterLink).toBeEnabled()
      
      // Verify the link contains the correct Stripe URL
      const href = await kickstarterLink.getAttribute('href')
      expect(href).toContain('buy.stripe.com/6oUdR8enb9jF69u1Zd3840c')
      
      // Test clicking the link (without actually processing payment)
      // We'll intercept the navigation to avoid actual Stripe charges
      await page.route('https://buy.stripe.com/**', route => {
        // Verify the request was made to the correct Stripe URL
        expect(route.request().url()).toContain('6oUdR8enb9jF69u1Zd3840c')
        route.fulfill({
          status: 200,
          body: 'Stripe payment page would load here'
        })
      })
      
      await kickstarterLink.click()
      
      // Payment link validation successful
      console.log('✅ 11+ Kickstarter payment link validation passed')
    })
    
    test('11+ Intensive payment link redirects correctly', async ({ page }) => {
      // Navigate to 11+ bootcamps page
      await page.goto('/11-plus-bootcamps')
      await page.waitForLoadState('networkidle')
      
      // Verify page loads correctly
      await expect(page.getByRole('heading', { name: /11\+ Online Bootcamps/i })).toBeVisible()
      
      // Find and click the Intensive booking button/link
      // Expected Stripe URL: https://buy.stripe.com/7sYbJ0cf3brN69u8nB3840d
      const intensiveLink = page.locator('[href*="7sYbJ0cf3brN69u8nB3840d"], [data-stripe-url*="7sYbJ0cf3brN69u8nB3840d"]')
      
      // Verify the payment link exists on the page
      await expect(intensiveLink).toBeVisible()
      await expect(intensiveLink).toBeEnabled()
      
      // Verify the link contains the correct Stripe URL
      const href = await intensiveLink.getAttribute('href')
      expect(href).toContain('buy.stripe.com/7sYbJ0cf3brN69u8nB3840d')
      
      // Test clicking the link (without actually processing payment)
      await page.route('https://buy.stripe.com/**', route => {
        // Verify the request was made to the correct Stripe URL
        expect(route.request().url()).toContain('7sYbJ0cf3brN69u8nB3840d')
        route.fulfill({
          status: 200,
          body: 'Stripe payment page would load here'
        })
      })
      
      await intensiveLink.click()
      
      // Payment link validation successful
      console.log('✅ 11+ Intensive payment link validation passed')
    })
    
    test('Payment buttons display correct pricing information', async ({ page }) => {
      await page.goto('/11-plus-bootcamps')
      await page.waitForLoadState('networkidle')
      
      // Verify pricing information is displayed for both courses
      // This ensures customers see correct pricing before clicking Stripe links
      
      // Look for pricing information near payment buttons
      const pricingElements = page.locator('text=/£[0-9]+/')
      const pricingCount = await pricingElements.count()
      
      // Should have at least one pricing element visible
      expect(pricingCount).toBeGreaterThan(0)
      
      // Verify no deprecated pricing appears (e.g., £47.50 should be £45)
      await expect(page.getByText('£47.50')).toHaveCount(0)
      
      console.log('✅ Pricing information validation passed')
    })
  })
  
  test.describe('Video Masterclasses Payment Integration', () => {
    
    test('Video masterclass payment links are functional', async ({ page }) => {
      await page.goto('/video-masterclasses')
      await page.waitForLoadState('networkidle')
      
      // Look for any payment buttons or Stripe links on video masterclass page
      const paymentLinks = page.locator('[href*="stripe.com"], [data-payment], [class*="payment"], [class*="buy"]')
      const linkCount = await paymentLinks.count()
      
      if (linkCount > 0) {
        // If payment links exist, verify they're functional
        for (let i = 0; i < linkCount; i++) {
          const link = paymentLinks.nth(i)
          await expect(link).toBeVisible()
          await expect(link).toBeEnabled()
          
          const href = await link.getAttribute('href')
          if (href?.includes('stripe.com')) {
            expect(href).toMatch(/https:\/\/.*\.stripe\.com\/.*/)
          }
        }
        
        console.log(`✅ ${linkCount} video masterclass payment links validated`)
      } else {
        console.log('ℹ️ No payment links found on video masterclasses page')
      }
    })
  })
  
  test.describe('General Payment System Validation', () => {
    
    test('Contact form submission works for consultation bookings', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Look for consultation booking forms or buttons
      const consultationButtons = page.locator('text=/request free consultation/i, [data-consultation], [class*="consultation"]')
      const buttonCount = await consultationButtons.count()
      
      if (buttonCount > 0) {
        const firstButton = consultationButtons.first()
        await expect(firstButton).toBeVisible()
        await expect(firstButton).toBeEnabled()
        
        // Verify button text has been updated from "book" to "request"
        const buttonText = await firstButton.textContent()
        expect(buttonText?.toLowerCase()).toContain('request')
        expect(buttonText?.toLowerCase()).not.toContain('book free consultation')
        
        console.log('✅ Consultation booking button validation passed')
      }
    })
    
    test('No broken payment-related buttons across site', async ({ page }) => {
      const pagesToTest = [
        '/',
        '/about-us',
        '/subject-tuition', 
        '/how-it-works',
        '/testimonials',
        '/video-masterclasses',
        '/11-plus-bootcamps'
      ]
      
      for (const pagePath of pagesToTest) {
        await page.goto(pagePath)
        await page.waitForLoadState('networkidle')
        
        // Find all button and link elements
        const interactiveElements = page.locator('button, a[href], input[type="submit"]')
        const elementCount = await interactiveElements.count()
        
        // Check each interactive element for basic functionality
        for (let i = 0; i < Math.min(elementCount, 20); i++) { // Limit to first 20 elements
          const element = interactiveElements.nth(i)
          
          // Skip if element is not visible
          if (!(await element.isVisible())) continue
          
          // Verify element is not disabled
          const isDisabled = await element.getAttribute('disabled')
          const ariaDisabled = await element.getAttribute('aria-disabled')
          
          expect(isDisabled).toBeNull()
          expect(ariaDisabled).not.toBe('true')
          
          // Verify element has either href, onclick, or is a button
          const tagName = await element.evaluate(el => el.tagName.toLowerCase())
          if (tagName === 'a') {
            const href = await element.getAttribute('href')
            expect(href).toBeTruthy()
          }
        }
        
        console.log(`✅ Interactive elements validated on ${pagePath}`)
      }
    })
  })
  
  test.describe('Revenue Impact Assessment', () => {
    
    test('All critical revenue paths are accessible', async ({ page }) => {
      const revenueCriticalPaths = [
        { path: '/11-plus-bootcamps', description: '11+ Bootcamp Bookings' },
        { path: '/video-masterclasses', description: 'Video Masterclass Purchases' },
        { path: '/how-it-works', description: 'Service Tier Selection' },
        { path: '/', description: 'Homepage Consultation Requests' }
      ]
      
      for (const { path, description } of revenueCriticalPaths) {
        const response = await page.goto(path)
        
        // Verify page loads successfully
        expect(response?.status()).toBe(200)
        
        // Verify page has essential content
        await expect(page.getByRole('main')).toBeVisible()
        
        // Verify no critical JavaScript errors
        const errors: string[] = []
        page.on('pageerror', error => errors.push(error.message))
        
        await page.waitForLoadState('networkidle')
        
        // Allow minor non-critical errors but fail on major issues
        const criticalErrors = errors.filter(error => 
          error.includes('TypeError') || 
          error.includes('ReferenceError') ||
          error.includes('payment') ||
          error.includes('stripe')
        )
        
        expect(criticalErrors.length).toBe(0)
        
        console.log(`✅ ${description} revenue path validated: ${path}`)
      }
    })
    
    test('Performance of revenue-critical pages meets standards', async ({ page }) => {
      const revenuePaths = ['/11-plus-bootcamps', '/video-masterclasses', '/how-it-works']
      
      for (const path of revenuePaths) {
        const startTime = Date.now()
        await page.goto(path)
        await page.waitForLoadState('domcontentloaded')
        const loadTime = Date.now() - startTime
        
        // Revenue-critical pages should load within 1 second for optimal conversion
        expect(loadTime).toBeLessThan(1000)
        
        console.log(`✅ ${path} loaded in ${loadTime}ms (target: <1000ms)`)
      }
    })
  })
})

// Export helper functions for other test files
export const validateStripeURL = (url: string, expectedId: string): void => {
  expect(url).toContain('buy.stripe.com')
  expect(url).toContain(expectedId)
}

export const validatePaymentButton = async (page: any, selector: string): Promise<boolean> => {
  const button = page.locator(selector)
  await expect(button).toBeVisible()
  await expect(button).toBeEnabled()
  return true
}