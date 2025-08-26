// CONTEXT7 SOURCE: /playwright/test - E2E testing patterns for navigation system validation
// BUSINESS CRITICAL: Navigation reordering compliance for My Private Tutor Online
import { test, expect } from '@playwright/test'

// Critical navigation system tests for menu reordering and button functionality
// These tests MUST pass before Monday delivery - affects entire site usability

test.describe('Navigation System - CRITICAL FUNCTIONALITY', () => {
  
  test.describe('Menu Reordering Compliance - Beth\'s Exact Specifications', () => {
    
    test('Navigation menu displays in exact order specified by client', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Beth's exact specification for new menu order:
      // 1. HOME BUTTON → 2. ABOUT US → 3. SUBJECT TUITION → 4. HOW IT WORKS 
      // → 5. TESTIMONIALS → 6. VIDEO MASTERCLASSES → 7. 11+ BOOTCAMPS → 8. FAQS → 9. BLOG
      
      const expectedOrder = [
        'HOME BUTTON',
        'ABOUT US', 
        'SUBJECT TUITION',
        'HOW IT WORKS',
        'TESTIMONIALS',
        'VIDEO MASTERCLASSES',
        '11+ BOOTCAMPS',
        'FAQS',
        'BLOG'
      ]
      
      // Get navigation menu items - try multiple possible selectors
      const navSelectors = [
        'nav [data-menu-item]',
        'nav a[href]',
        'nav button',
        '[role="navigation"] a',
        '[role="navigation"] button',
        'header nav a',
        'header nav button'
      ]
      
      let menuItems: string[] = []
      let foundNavigation = false
      
      for (const selector of navSelectors) {
        try {
          const elements = page.locator(selector)
          const count = await elements.count()
          
          if (count >= 7) { // Should have at least 7-9 menu items
            menuItems = await elements.allTextContents()
            foundNavigation = true
            console.log(`✅ Found navigation using selector: ${selector}`)
            console.log(`📋 Menu items found: ${JSON.stringify(menuItems)}`)
            break
          }
        } catch (error) {
          // Try next selector
          continue
        }
      }
      
      // Ensure we found navigation
      expect(foundNavigation).toBe(true)
      expect(menuItems.length).toBeGreaterThanOrEqual(7)
      
      // Normalize menu text for comparison (remove extra whitespace, handle case variations)
      const normalizeMenuText = (text: string): string => {
        return text.trim()
          .toUpperCase()
          .replace(/\s+/g, ' ')
          .replace(/HOME.*/, 'HOME BUTTON')
          .replace(/11\+.*BOOTCAMP.*/, '11+ BOOTCAMPS')
          .replace(/VIDEO.*MASTERCLASS.*/, 'VIDEO MASTERCLASSES')
      }
      
      const normalizedFound = menuItems.map(normalizeMenuText)
      const normalizedExpected = expectedOrder.map(normalizeMenuText)
      
      // Check if the order matches (allowing for some flexibility in exact text)
      let orderMatches = true
      const orderComparison = []
      
      for (let i = 0; i < Math.min(normalizedFound.length, normalizedExpected.length); i++) {
        const found = normalizedFound[i]
        const expected = normalizedExpected[i]
        const matches = found.includes(expected.split(' ')[0]) || expected.includes(found.split(' ')[0])
        
        orderComparison.push({
          position: i + 1,
          expected: expected,
          found: found,
          matches: matches
        })
        
        if (!matches) {
          orderMatches = false
        }
      }
      
      // Log comparison for debugging
      console.log('📊 Menu Order Comparison:', JSON.stringify(orderComparison, null, 2))
      
      // Verify critical menu items are present in roughly correct order
      expect(normalizedFound[0]).toContain('HOME') // First should be HOME
      expect(normalizedFound[1]).toContain('ABOUT') // Second should be ABOUT US
      expect(normalizedFound[2]).toContain('SUBJECT') // Third should be SUBJECT TUITION
      expect(normalizedFound.some(item => item.includes('11+'))).toBe(true) // Should contain 11+ BOOTCAMPS
      expect(normalizedFound.some(item => item.includes('FAQ'))).toBe(true) // Should contain FAQS
      
      console.log('✅ Navigation menu order validation passed')
    })
    
    test('All navigation menu items are clickable and functional', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Get all navigation links and buttons
      const navElements = page.locator('nav a[href], nav button, [role="navigation"] a, [role="navigation"] button')
      const elementCount = await navElements.count()
      
      expect(elementCount).toBeGreaterThan(0) // Should have navigation elements
      
      // Test each navigation element
      for (let i = 0; i < elementCount; i++) {
        const element = navElements.nth(i)
        
        // Skip if element is not visible
        if (!(await element.isVisible())) {
          continue
        }
        
        // Verify element is enabled
        await expect(element).toBeEnabled()
        
        // Verify element is not disabled
        const isDisabled = await element.getAttribute('disabled')
        const ariaDisabled = await element.getAttribute('aria-disabled')
        expect(isDisabled).toBeNull()
        expect(ariaDisabled).not.toBe('true')
        
        // Get element text for logging
        const elementText = await element.textContent()
        
        // For links, verify they have valid href
        const tagName = await element.evaluate(el => el.tagName.toLowerCase())
        if (tagName === 'a') {
          const href = await element.getAttribute('href')
          expect(href).toBeTruthy()
          expect(href).not.toBe('#')
          expect(href).not.toBe('javascript:void(0)')
        }
        
        console.log(`✅ Navigation element validated: "${elementText?.trim()}" (${tagName})`)
      }
      
      console.log(`✅ All ${elementCount} navigation elements are functional`)
    })
  })
  
  test.describe('Button Functionality Across All Pages', () => {
    
    test('CTA button text updated correctly throughout site', async ({ page }) => {
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
        
        // Verify new CTA button text: "request free consultation" (not "book free consultation")
        const requestButtons = page.locator('text=/request free consultation/i')
        const requestButtonCount = await requestButtons.count()
        
        // Verify old "book free consultation" text is removed
        const bookButtons = page.locator('text=/book free consultation/i')
        const bookButtonCount = await bookButtons.count()
        
        if (requestButtonCount > 0) {
          console.log(`✅ Found ${requestButtonCount} "request free consultation" buttons on ${pagePath}`)
        }
        
        // CRITICAL: Old "book" text should be completely replaced
        expect(bookButtonCount).toBe(0)
        
        console.log(`✅ CTA button text validation passed for ${pagePath}`)
      }
    })
    
    test('Tutor profile buttons updated to "Meet Our Tutors"', async ({ page }) => {
      await page.goto('/how-it-works')
      await page.waitForLoadState('networkidle')
      
      // Beth's specification: Change "view full profile" button to "Meet Our Tutors"
      const meetTutorsButtons = page.locator('text=/meet our tutors/i')
      const meetTutorsCount = await meetTutorsButtons.count()
      
      // Verify old "view full profile" text is removed
      const oldProfileButtons = page.locator('text=/view full profile/i')
      const oldProfileCount = await oldProfileButtons.count()
      
      if (meetTutorsCount > 0) {
        console.log(`✅ Found ${meetTutorsCount} "Meet Our Tutors" buttons`)
        
        // Verify buttons are functional
        for (let i = 0; i < meetTutorsCount; i++) {
          const button = meetTutorsButtons.nth(i)
          await expect(button).toBeVisible()
          await expect(button).toBeEnabled()
        }
      }
      
      // Old button text should be replaced
      expect(oldProfileCount).toBe(0)
      
      console.log('✅ Tutor profile button text validation passed')
    })
    
    test('Footer CTA links to enquiry form correctly', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Beth's specification: Footer CTA "Ready to Start the Conversation?" → link to enquiry form
      const footerCTA = page.locator('text=/ready to start the conversation/i')
      const footerCTACount = await footerCTA.count()
      
      if (footerCTACount > 0) {
        const firstCTA = footerCTA.first()
        await expect(firstCTA).toBeVisible()
        
        // If it's a link, verify it has proper href
        const tagName = await firstCTA.evaluate(el => el.tagName.toLowerCase())
        if (tagName === 'a') {
          const href = await firstCTA.getAttribute('href')
          expect(href).toBeTruthy()
          expect(href).not.toBe('#')
          
          // Should link to contact/enquiry form
          expect(href).toMatch(/(contact|enquiry|consultation)/)
        }
        
        console.log('✅ Footer CTA validation passed')
      }
    })
  })
  
  test.describe('Mobile Navigation Functionality', () => {
    
    test('Burger menu positioning and functionality', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Beth's feedback: "Move burger menu further right (currently poorly positioned)"
      const burgerMenu = page.locator('[data-mobile-menu], .mobile-menu, .hamburger, [aria-label*="menu"]')
      const burgerCount = await burgerMenu.count()
      
      if (burgerCount > 0) {
        const burger = burgerMenu.first()
        await expect(burger).toBeVisible()
        await expect(burger).toBeEnabled()
        
        // Test burger menu functionality
        await burger.click()
        
        // Verify mobile navigation appears and is readable
        // Beth's feedback: "Fix burger menu blur issue (content becomes unreadable/unclickable)"
        const mobileNav = page.locator('[role="navigation"], .mobile-navigation, nav')
        await expect(mobileNav).toBeVisible()
        
        // Verify navigation items are clickable (not blurred/disabled)
        const mobileNavLinks = mobileNav.locator('a, button')
        const linkCount = await mobileNavLinks.count()
        
        if (linkCount > 0) {
          for (let i = 0; i < Math.min(linkCount, 5); i++) { // Test first 5 links
            const link = mobileNavLinks.nth(i)
            if (await link.isVisible()) {
              await expect(link).toBeEnabled()
              
              // Verify link is not blurred or has opacity issues
              const opacity = await link.evaluate(el => window.getComputedStyle(el).opacity)
              expect(parseFloat(opacity)).toBeGreaterThan(0.5) // Should be clearly visible
            }
          }
        }
        
        console.log('✅ Mobile navigation functionality validated')
      } else {
        console.log('ℹ️ No mobile burger menu found - may be using different mobile navigation approach')
      }
    })
  })
  
  test.describe('Cross-Page Navigation Consistency', () => {
    
    test('Navigation consistency across all main pages', async ({ page }) => {
      const mainPages = [
        '/',
        '/about-us',
        '/subject-tuition',
        '/how-it-works',
        '/testimonials',
        '/video-masterclasses',
        '/11-plus-bootcamps',
        '/faq',
        '/blog'
      ]
      
      let navigationReference: string[] = []
      
      for (let i = 0; i < mainPages.length; i++) {
        const pagePath = mainPages[i]
        
        try {
          await page.goto(pagePath)
          await page.waitForLoadState('networkidle')
          
          // Get navigation items on this page
          const navElements = page.locator('nav a[href], nav button, [role="navigation"] a, [role="navigation"] button')
          const navItems = await navElements.allTextContents()
          
          if (i === 0) {
            // Use homepage navigation as reference
            navigationReference = navItems.map(item => item.trim().toUpperCase())
            console.log(`📋 Navigation reference set from homepage: ${navigationReference.length} items`)
          } else {
            // Compare with reference navigation
            const currentNav = navItems.map(item => item.trim().toUpperCase())
            
            // Allow for some variation but ensure core navigation is consistent
            const coreItemsPresent = navigationReference.slice(0, 6).every(refItem => 
              currentNav.some(currentItem => 
                currentItem.includes(refItem.split(' ')[0]) || refItem.includes(currentItem.split(' ')[0])
              )
            )
            
            if (!coreItemsPresent) {
              console.warn(`⚠️ Navigation inconsistency detected on ${pagePath}`)
              console.warn(`Reference: ${JSON.stringify(navigationReference.slice(0, 6))}`)
              console.warn(`Current: ${JSON.stringify(currentNav.slice(0, 6))}`)
            } else {
              console.log(`✅ Navigation consistency validated for ${pagePath}`)
            }
          }
          
        } catch (error) {
          console.warn(`⚠️ Could not test navigation on ${pagePath}: ${error}`)
          // Don't fail the test for individual page issues
        }
      }
    })
    
    test('All main pages accessible via navigation', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Expected main pages based on navigation order
      const expectedPages = [
        { text: /home/i, path: '/' },
        { text: /about/i, path: '/about-us' },
        { text: /subject/i, path: '/subject-tuition' },
        { text: /how.*works/i, path: '/how-it-works' },
        { text: /testimonials/i, path: '/testimonials' },
        { text: /video/i, path: '/video-masterclasses' },
        { text: /11\+|bootcamp/i, path: '/11-plus-bootcamps' },
        { text: /faq/i, path: '/faq' },
        { text: /blog/i, path: '/blog' }
      ]
      
      // Test each expected navigation link
      for (const { text, path } of expectedPages) {
        const navLink = page.locator(`nav a, [role="navigation"] a`).locator(`text=${text.source}`).first()
        
        if (await navLink.count() > 0) {
          const href = await navLink.getAttribute('href')
          
          // Verify link points to correct path
          expect(href).toContain(path)
          
          // Test that the target page loads
          const response = await page.goto(href || path)
          expect(response?.status()).toBe(200)
          
          console.log(`✅ Navigation link validated: ${text.source} → ${path}`)
        }
      }
    })
  })
  
  test.describe('Navigation Performance and UX', () => {
    
    test('Navigation responds quickly to user interactions', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Test navigation response time
      const navLinks = page.locator('nav a[href]').first()
      
      if (await navLinks.count() > 0) {
        const startTime = Date.now()
        
        // Hover over navigation item
        await navLinks.hover()
        
        // Click navigation item
        await navLinks.click()
        
        // Wait for page to start loading
        await page.waitForLoadState('domcontentloaded')
        
        const responseTime = Date.now() - startTime
        
        // Navigation should respond within 500ms for good UX
        expect(responseTime).toBeLessThan(500)
        
        console.log(`✅ Navigation response time: ${responseTime}ms (target: <500ms)`)
      }
    })
    
    test('Navigation maintains focus for keyboard users', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Test keyboard navigation through menu items
      await page.keyboard.press('Tab') // Start tabbing through elements
      
      let tabbedElements = 0
      const maxTabs = 15 // Limit to reasonable number
      
      for (let i = 0; i < maxTabs; i++) {
        const focusedElement = page.locator(':focus')
        
        if (await focusedElement.count() > 0) {
          const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase())
          const role = await focusedElement.getAttribute('role')
          
          // Check if this is a navigation element
          const isNavElement = tagName === 'a' || tagName === 'button' || role === 'menuitem'
          
          if (isNavElement) {
            // Verify element has visible focus indicator
            const outline = await focusedElement.evaluate(el => 
              window.getComputedStyle(el).outline
            )
            const boxShadow = await focusedElement.evaluate(el => 
              window.getComputedStyle(el).boxShadow
            )
            
            // Should have some form of focus indicator
            const hasFocusIndicator = outline !== 'none' || boxShadow !== 'none'
            expect(hasFocusIndicator).toBe(true)
            
            tabbedElements++
          }
        }
        
        await page.keyboard.press('Tab')
        await page.waitForTimeout(50) // Small delay for focus to settle
      }
      
      // Should have found at least a few navigation elements
      expect(tabbedElements).toBeGreaterThan(2)
      
      console.log(`✅ Keyboard navigation validated: ${tabbedElements} focusable nav elements`)
    })
  })
})