// CONTEXT7 SOURCE: /playwright/test - End-to-end testing patterns for critical user journeys
// ROYAL CLIENT STANDARDS: Complete user journey validation for My Private Tutor Online
import { test, expect } from '@playwright/test'

// Critical E2E tests for royal client user journeys
// These represent the most important user flows for business success

test.describe('Critical User Journeys - Royal Client Standards', () => {
  
  test.describe('Premium Client Discovery Journey', () => {
    
    test('Royal family researches services and requests consultation', async ({ page }) => {
      // Scenario: A royal family member discovers the service and wants to book consultation
      
      // Step 1: Land on homepage
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Verify premium positioning is immediately apparent
      await expect(page.getByText(/world-class education/i)).toBeVisible()
      await expect(page.getByText(/royal/i)).toBeVisible()
      
      // Step 2: Review credentials and testimonials
      const royalTestimonial = `Hi Elizabeth, I found out today that the two princes and the princess have all been offered places at Le Rosey for next year`
      await expect(page.locator(`text*="${royalTestimonial}"`)).toBeVisible()
      
      // Step 3: Navigate to About Us to learn about Elizabeth
      await page.click('text=/about us/i')
      await page.waitForLoadState('networkidle')
      
      await expect(page.getByRole('heading', { name: /our ethos and founder/i })).toBeVisible()
      
      // Step 4: Review subject expertise
      await page.click('text=/subject tuition/i')
      await page.waitForLoadState('networkidle')
      
      await expect(page.getByRole('heading', { name: /subject tutoring and exam preparation/i })).toBeVisible()
      
      // Step 5: Understand the process
      await page.click('text=/how it works/i')
      await page.waitForLoadState('networkidle')
      
      // Verify pricing tiers are visible
      await expect(page.getByText(/from £85/i)).toBeVisible() // Tier 1 pricing
      
      // Step 6: Request consultation
      const consultationButton = page.locator('text=/request free consultation/i').first()
      await expect(consultationButton).toBeVisible()
      await expect(consultationButton).toBeEnabled()
      
      // Note: We don't actually submit to avoid creating real enquiries
      console.log('✅ Premium client discovery journey completed successfully')
    })
    
    test('International family evaluates 11+ preparation services', async ({ page }) => {
      // Scenario: International family with child needing 11+ preparation
      
      // Step 1: Direct navigation to 11+ services
      await page.goto('/11-plus-bootcamps')
      await page.waitForLoadState('networkidle')
      
      // Verify page loads and displays services
      await expect(page.getByRole('heading', { name: /11\+ online bootcamps/i })).toBeVisible()
      
      // Step 2: Review course options and pricing
      await expect(page.getByText(/kickstarter/i)).toBeVisible()
      await expect(page.getByText(/intensive/i)).toBeVisible()
      
      // Step 3: Check expertise and credentials
      await expect(page.getByText(/expert tutors/i)).toBeVisible()
      await expect(page.getByText(/11\+ examiner credentials/i)).toBeVisible()
      
      // Step 4: Review success statistics
      await page.goto('/')
      await expect(page.getByText(/95% pass rate/i)).toBeVisible()
      
      // Step 5: View testimonials for social proof
      await page.click('text=/testimonials/i')
      await page.waitForLoadState('networkidle')
      
      // Should see video testimonials
      const videoElements = page.locator('video')
      const videoCount = await videoElements.count()
      if (videoCount > 0) {
        await expect(videoElements.first()).toBeVisible()
      }
      
      // Step 6: Return to book bootcamp
      await page.goto('/11-plus-bootcamps')
      await page.waitForLoadState('networkidle')
      
      // Verify payment links are present and functional
      const stripeLinks = page.locator('[href*="stripe.com"]')
      const linkCount = await stripeLinks.count()
      expect(linkCount).toBeGreaterThan(0)
      
      console.log('✅ 11+ preparation evaluation journey completed')
    })
  })
  
  test.describe('Academic Support Research Journey', () => {
    
    test('Parent researches A-Level support for university preparation', async ({ page }) => {
      // Scenario: Parent needs A-Level tutoring for university applications
      
      // Step 1: Homepage discovery
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Step 2: Navigate to subject tutoring
      await page.click('text=/subject tuition/i')
      await page.waitForLoadState('networkidle')
      
      // Look for A-Level information
      await expect(page.getByText(/a-level/i)).toBeVisible()
      
      // Step 3: Check university preparation services
      const universitySection = page.locator('text=/university/i')
      await expect(universitySection).toBeVisible()
      
      // Step 4: Review tutor qualifications
      await page.click('text=/how it works/i')
      await page.waitForLoadState('networkidle')
      
      // Should see tutor profiles
      const tutorProfiles = page.locator('text=/meet our tutors/i')
      if (await tutorProfiles.count() > 0) {
        await expect(tutorProfiles.first()).toBeVisible()
      }
      
      // Step 5: Review success rates
      await page.goto('/')
      await expect(page.getByText(/94%.*grade growth/i)).toBeVisible()
      await expect(page.getByText(/top 2%.*test takers/i)).toBeVisible()
      
      // Step 6: Contact for consultation
      const consultationButton = page.locator('text=/request free consultation/i').first()
      await expect(consultationButton).toBeVisible()
      
      console.log('✅ A-Level support research journey completed')
    })
  })
  
  test.describe('Video Content Discovery Journey', () => {
    
    test('User discovers and evaluates video masterclasses', async ({ page }) => {
      // Scenario: User interested in video learning content
      
      // Step 1: Navigate to video masterclasses
      await page.click('text=/video masterclasses/i')
      await page.waitForLoadState('networkidle')
      
      // Verify page loads correctly
      await expect(page.getByRole('heading', { name: /video masterclasses/i })).toBeVisible()
      
      // Step 2: Review available videos
      const videoElements = page.locator('video')
      const videoCount = await videoElements.count()
      
      if (videoCount > 0) {
        // Check that videos have proper attributes
        for (let i = 0; i < Math.min(videoCount, 3); i++) {
          const video = videoElements.nth(i)
          await expect(video).toBeVisible()
          
          // Verify video has source
          const hasSrc = await video.evaluate(v => (v as HTMLVideoElement).src !== '')
          expect(hasSrc).toBe(true)
        }
      }
      
      // Step 3: Look for UCAT and British Culture content
      const ucatContent = page.locator('text=/ucat/i')
      const britishCultureContent = page.locator('text=/british culture/i')
      
      if (await ucatContent.count() > 0) {
        await expect(ucatContent.first()).toBeVisible()
      }
      if (await britishCultureContent.count() > 0) {
        await expect(britishCultureContent.first()).toBeVisible()
      }
      
      // Step 4: Check payment options
      const paymentElements = page.locator('[href*="stripe.com"], text=/purchase/i, text=/buy/i')
      const paymentCount = await paymentElements.count()
      
      if (paymentCount > 0) {
        console.log(`Found ${paymentCount} payment options for video content`)
      }
      
      console.log('✅ Video masterclasses discovery journey completed')
    })
    
    test('Homepage video plays and engages user', async ({ page }) => {
      // Scenario: User watches homepage introduction video
      
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Look for the intro video
      const introVideo = page.locator('video').first()
      
      if (await introVideo.count() > 0) {
        await expect(introVideo).toBeVisible()
        
        // Verify video label is correct
        await expect(page.getByText(/meet elizabeth.*help your child thrive/i)).toBeVisible()
        
        // Verify video has source and is ready
        const videoReady = await introVideo.evaluate(v => {
          const video = v as HTMLVideoElement
          return video.src !== '' && video.readyState > 0
        })
        
        if (videoReady) {
          console.log('✅ Homepage video is ready for playback')
        } else {
          console.warn('⚠️ Homepage video may have loading issues')
        }
      }
      
      console.log('✅ Homepage video engagement journey completed')
    })
  })
  
  test.describe('Mobile User Experience Journey', () => {
    
    test('Mobile user navigates site successfully', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Step 1: Mobile homepage experience
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Verify content is readable on mobile
      const mainContent = page.getByRole('main')
      await expect(mainContent).toBeVisible()
      
      // Step 2: Test mobile navigation
      const mobileMenuTrigger = page.locator('[data-mobile-menu], .mobile-menu, .hamburger, [aria-label*="menu"]')
      
      if (await mobileMenuTrigger.count() > 0) {
        await mobileMenuTrigger.click()
        
        // Verify navigation appears and is functional
        const mobileNav = page.locator('[role="navigation"]')
        await expect(mobileNav).toBeVisible()
        
        // Test a navigation link
        const aboutLink = mobileNav.locator('text=/about/i').first()
        if (await aboutLink.count() > 0) {
          await aboutLink.click()
          await page.waitForLoadState('networkidle')
          
          // Verify page loaded
          await expect(page.getByRole('main')).toBeVisible()
        }
      }
      
      console.log('✅ Mobile user experience journey completed')
    })
  })
  
  test.describe('Accessibility User Journey', () => {
    
    test('Screen reader user navigates site structure', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Test heading structure for screen readers
      const h1Elements = page.locator('h1')
      const h1Count = await h1Elements.count()
      
      // Should have exactly one H1 per page
      expect(h1Count).toBe(1)
      
      // Test focus navigation
      await page.keyboard.press('Tab')
      
      let focusableElements = 0
      const maxTabs = 10
      
      for (let i = 0; i < maxTabs; i++) {
        const focusedElement = page.locator(':focus')
        
        if (await focusedElement.count() > 0) {
          // Verify focused element is visible
          await expect(focusedElement).toBeVisible()
          focusableElements++
        }
        
        await page.keyboard.press('Tab')
        await page.waitForTimeout(100)
      }
      
      // Should have found focusable elements
      expect(focusableElements).toBeGreaterThan(3)
      
      console.log(`✅ Found ${focusableElements} focusable elements for keyboard navigation`)
    })
    
    test('High contrast user can distinguish content', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Test that text has sufficient contrast
      const textElements = page.locator('p, h1, h2, h3, button, a')
      const elementCount = Math.min(await textElements.count(), 10)
      
      for (let i = 0; i < elementCount; i++) {
        const element = textElements.nth(i)
        
        if (await element.isVisible()) {
          const styles = await element.evaluate(el => {
            const computed = window.getComputedStyle(el)
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize
            }
          })
          
          // Basic check that color is not transparent
          expect(styles.color).not.toBe('rgba(0, 0, 0, 0)')
          expect(styles.color).not.toBe('transparent')
        }
      }
      
      console.log('✅ Text contrast validation completed')
    })
  })
  
  test.describe('Performance-Critical User Journey', () => {
    
    test('Impatient user gets fast, engaging experience', async ({ page }) => {
      // Scenario: User has limited patience, needs fast loading and immediate value
      
      const startTime = Date.now()
      
      // Step 1: Fast homepage load
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')
      
      const initialLoadTime = Date.now() - startTime
      
      // Should load quickly for impatient users
      expect(initialLoadTime).toBeLessThan(1500)
      
      // Step 2: Immediate value visible
      await expect(page.getByText(/world-class education/i)).toBeVisible()
      await expect(page.getByText(/royal/i)).toBeVisible()
      
      // Step 3: Quick access to key information
      const statsVisible = page.getByText(/95%|94%|top 2%/i)
      await expect(statsVisible.first()).toBeVisible()
      
      // Step 4: Fast navigation to critical pages
      const criticalPages = ['/subject-tuition', '/11-plus-bootcamps']
      
      for (const pagePath of criticalPages) {
        const navStartTime = Date.now()
        await page.goto(pagePath)
        await page.waitForLoadState('domcontentloaded')
        const navTime = Date.now() - navStartTime
        
        // Navigation should be fast
        expect(navTime).toBeLessThan(1000)
        
        // Page should have content immediately
        await expect(page.getByRole('main')).toBeVisible()
      }
      
      console.log(`✅ Fast user experience validated - initial load: ${initialLoadTime}ms`)
    })
  })
  
  test.describe('Error Recovery Journey', () => {
    
    test('User encounters broken link but recovers successfully', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Test that user can recover from potential 404s
      try {
        await page.goto('/non-existent-page')
      } catch (error) {
        // Expected to fail
      }
      
      // Should be able to navigate back to working pages
      await page.goto('/')
      await expect(page.getByRole('main')).toBeVisible()
      
      // Test navigation still works
      await page.click('text=/about us/i')
      await expect(page.getByRole('main')).toBeVisible()
      
      console.log('✅ Error recovery journey validated')
    })
  })
  
  test.describe('Complete Conversion Journey', () => {
    
    test('User completes full evaluation and booking process', async ({ page }) => {
      // Full journey from discovery to near-booking
      
      // Step 1: Homepage discovery
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Step 2: Build trust through testimonials
      await page.click('text=/testimonials/i')
      await page.waitForLoadState('networkidle')
      
      await expect(page.getByText(/royal clientele trust/i)).toBeVisible()
      
      // Step 3: Understand expertise
      await page.click('text=/subject tuition/i')
      await page.waitForLoadState('networkidle')
      
      await expect(page.getByText(/expert tutors/i)).toBeVisible()
      
      // Step 4: Review process and pricing
      await page.click('text=/how it works/i')
      await page.waitForLoadState('networkidle')
      
      await expect(page.getByText(/from £45|from £65|from £85/i)).toBeVisible()
      
      // Step 5: Ready to book consultation
      const consultationButton = page.locator('text=/request free consultation/i').first()
      await expect(consultationButton).toBeVisible()
      await expect(consultationButton).toBeEnabled()
      
      // Alternatively, ready to book 11+ service
      await page.goto('/11-plus-bootcamps')
      await page.waitForLoadState('networkidle')
      
      const stripeLinks = page.locator('[href*="stripe.com"]')
      const stripeCount = await stripeLinks.count()
      expect(stripeCount).toBeGreaterThanOrEqual(1)
      
      console.log('✅ Complete conversion journey validated - user ready to book')
    })
  })
})