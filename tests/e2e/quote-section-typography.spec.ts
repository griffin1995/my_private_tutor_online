import { test, expect, Page } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// CONTEXT7 SOURCE: /playwright/test - Comprehensive typography testing patterns
// TEST PURPOSE: Verify QuoteSection typography consistency across all 7 pages

interface TypographyData {
  page: string;
  url: string;
  quoteSections: {
    selector: string;
    fontSize: string;
    fontFamily: string;
    fontStyle: string;
    fontWeight: string;
    lineHeight: string;
    textAlign: string;
    color: string;
    marginTop: string;
    marginBottom: string;
    paddingLeft: string;
    paddingRight: string;
    borderLeft: string;
    innerHTML: string;
    computedFontSize: number;
    viewport: string;
  }[];
  timestamp: string;
}

// Test configuration
const BASE_URL = 'https://myprivatetutoronline.vercel.app';
const PAGES_TO_TEST = [
  { name: 'Homepage', path: '/' },
  { name: 'Meet Our Tutors', path: '/meet-our-tutors' },
  { name: 'Subject Tuition', path: '/subject-tuition' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Video Masterclasses', path: '/video-masterclasses' },
  { name: '11+ Bootcamps', path: '/11-plus-bootcamps' }
];

const QUOTE_SELECTORS = [
  'blockquote',
  '.quote-section',
  '[data-testid="quote-section"]',
  '.text-xl.lg\\:text-2xl.font-serif.italic',
  '.font-serif.italic',
  'blockquote.text-xl',
  'blockquote p'
];

// Expected typography standards from project requirements
const EXPECTED_STANDARDS = {
  desktop: {
    fontSize: 24, // 24px for text-2xl
    fontFamily: 'serif',
    fontStyle: 'italic'
  },
  mobile: {
    fontSize: 20, // 20px for text-xl
    fontFamily: 'serif',
    fontStyle: 'italic'
  }
};

async function extractQuoteTypography(page: Page, viewport: string): Promise<TypographyData['quoteSections']> {
  const quoteSections: TypographyData['quoteSections'] = [];
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // Try each selector to find quote sections
  for (const selector of QUOTE_SELECTORS) {
    const elements = await page.locator(selector).all();
    
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      
      // Check if element is visible
      const isVisible = await element.isVisible();
      if (!isVisible) continue;
      
      try {
        // Extract computed styles
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            fontSize: computed.fontSize,
            fontFamily: computed.fontFamily,
            fontStyle: computed.fontStyle,
            fontWeight: computed.fontWeight,
            lineHeight: computed.lineHeight,
            textAlign: computed.textAlign,
            color: computed.color,
            marginTop: computed.marginTop,
            marginBottom: computed.marginBottom,
            paddingLeft: computed.paddingLeft,
            paddingRight: computed.paddingRight,
            borderLeft: computed.borderLeft
          };
        });
        
        const innerHTML = await element.innerHTML();
        const computedFontSize = parseFloat(styles.fontSize.replace('px', ''));
        
        quoteSections.push({
          selector: `${selector}[${i}]`,
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily,
          fontStyle: styles.fontStyle,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
          textAlign: styles.textAlign,
          color: styles.color,
          marginTop: styles.marginTop,
          marginBottom: styles.marginBottom,
          paddingLeft: styles.paddingLeft,
          paddingRight: styles.paddingRight,
          borderLeft: styles.borderLeft,
          innerHTML: innerHTML.slice(0, 200) + (innerHTML.length > 200 ? '...' : ''),
          computedFontSize,
          viewport
        });
      } catch (error) {
        console.log(`Error extracting styles for ${selector}[${i}]:`, error);
      }
    }
  }
  
  return quoteSections;
}

async function captureQuoteSectionScreenshots(page: Page, pageName: string, viewport: string) {
  // Create screenshots directory
  const screenshotDir = join(process.cwd(), 'test-results', 'quote-section-screenshots');
  try {
    mkdirSync(screenshotDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  // Take full page screenshot
  await page.screenshot({
    path: join(screenshotDir, `${pageName.toLowerCase().replace(/\s+/g, '-')}-${viewport}-full-page.png`),
    fullPage: true
  });
  
  // Take screenshots of individual quote sections
  for (const selector of QUOTE_SELECTORS) {
    const elements = await page.locator(selector).all();
    
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const isVisible = await element.isVisible();
      
      if (isVisible) {
        try {
          await element.screenshot({
            path: join(screenshotDir, `${pageName.toLowerCase().replace(/\s+/g, '-')}-${viewport}-quote-${selector.replace(/[^a-zA-Z0-9]/g, '-')}-${i}.png`)
          });
        } catch (error) {
          console.log(`Could not capture screenshot for ${selector}[${i}]:`, error);
        }
      }
    }
  }
}

test.describe('QuoteSection Typography Consistency Testing', () => {
  let typographyResults: TypographyData[] = [];
  
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for production site
    test.setTimeout(60000);
    
    // Navigate with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
        break;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        await page.waitForTimeout(2000);
      }
    }
  });

  // Test desktop viewport (1440px)
  test.describe('Desktop Viewport (1440x900)', () => {
    test.use({ viewport: { width: 1440, height: 900 } });
    
    for (const pageConfig of PAGES_TO_TEST) {
      test(`Check QuoteSection typography on ${pageConfig.name}`, async ({ page }) => {
        const fullUrl = BASE_URL + pageConfig.path;
        
        // Navigate to the specific page
        await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
        
        // Wait for any animations or dynamic content
        await page.waitForTimeout(3000);
        
        // Extract typography data
        const quoteSections = await extractQuoteTypography(page, 'desktop');
        
        // Capture screenshots
        await captureQuoteSectionScreenshots(page, pageConfig.name, 'desktop');
        
        // Store results
        const pageData: TypographyData = {
          page: pageConfig.name,
          url: fullUrl,
          quoteSections,
          timestamp: new Date().toISOString()
        };
        
        typographyResults.push(pageData);
        
        // Basic assertions
        if (quoteSections.length > 0) {
          for (const quote of quoteSections) {
            // Check if font size is within expected range for desktop
            expect(quote.computedFontSize).toBeGreaterThanOrEqual(20);
            expect(quote.computedFontSize).toBeLessThanOrEqual(28);
            
            // Check font style includes italic
            expect(quote.fontStyle).toContain('italic');
            
            // Check font family includes serif
            expect(quote.fontFamily.toLowerCase()).toMatch(/serif|times|georgia/);
          }
          
          console.log(`✅ ${pageConfig.name} (Desktop): Found ${quoteSections.length} quote section(s)`);
        } else {
          console.log(`⚠️  ${pageConfig.name} (Desktop): No quote sections found`);
        }
      });
    }
  });

  // Test mobile viewport (375px)
  test.describe('Mobile Viewport (375x667)', () => {
    test.use({ viewport: { width: 375, height: 667 } });
    
    for (const pageConfig of PAGES_TO_TEST) {
      test(`Check QuoteSection typography on ${pageConfig.name} mobile`, async ({ page }) => {
        const fullUrl = BASE_URL + pageConfig.path;
        
        // Navigate to the specific page
        await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
        
        // Wait for any animations or dynamic content
        await page.waitForTimeout(3000);
        
        // Extract typography data
        const quoteSections = await extractQuoteTypography(page, 'mobile');
        
        // Capture screenshots
        await captureQuoteSectionScreenshots(page, pageConfig.name, 'mobile');
        
        // Store results
        const pageData: TypographyData = {
          page: pageConfig.name + ' (Mobile)',
          url: fullUrl,
          quoteSections,
          timestamp: new Date().toISOString()
        };
        
        typographyResults.push(pageData);
        
        // Basic assertions
        if (quoteSections.length > 0) {
          for (const quote of quoteSections) {
            // Check if font size is within expected range for mobile
            expect(quote.computedFontSize).toBeGreaterThanOrEqual(18);
            expect(quote.computedFontSize).toBeLessThanOrEqual(24);
            
            // Check font style includes italic
            expect(quote.fontStyle).toContain('italic');
            
            // Check font family includes serif
            expect(quote.fontFamily.toLowerCase()).toMatch(/serif|times|georgia/);
          }
          
          console.log(`✅ ${pageConfig.name} (Mobile): Found ${quoteSections.length} quote section(s)`);
        } else {
          console.log(`⚠️  ${pageConfig.name} (Mobile): No quote sections found`);
        }
      });
    }
  });

  // Generate comprehensive report after all tests
  test.afterAll(async () => {
    // Create results directory
    const resultsDir = join(process.cwd(), 'test-results');
    try {
      mkdirSync(resultsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
    
    // Generate detailed JSON report
    const reportPath = join(resultsDir, 'quote-section-typography-report.json');
    writeFileSync(reportPath, JSON.stringify(typographyResults, null, 2));
    
    // Generate summary report
    const summary = generateTypographySummary(typographyResults);
    const summaryPath = join(resultsDir, 'quote-section-typography-summary.md');
    writeFileSync(summaryPath, summary);
    
    console.log('\n📊 TYPOGRAPHY TESTING COMPLETE');
    console.log(`📁 Detailed report: ${reportPath}`);
    console.log(`📋 Summary report: ${summaryPath}`);
    console.log(`🖼️  Screenshots: ${join(resultsDir, 'quote-section-screenshots')}`);
  });
});

function generateTypographySummary(results: TypographyData[]): string {
  let summary = `# QuoteSection Typography Consistency Report\n\n`;
  summary += `**Generated**: ${new Date().toISOString()}\n`;
  summary += `**Total Pages Tested**: ${results.length}\n`;
  summary += `**Production URL**: ${BASE_URL}\n\n`;
  
  // Expected standards
  summary += `## Expected Typography Standards\n\n`;
  summary += `- **Desktop**: 24px font-size (text-2xl), serif font-family, italic style\n`;
  summary += `- **Mobile**: 20px font-size (text-xl), serif font-family, italic style\n`;
  summary += `- **Classes**: text-xl lg:text-2xl font-serif italic\n\n`;
  
  // Summary statistics
  const totalQuotes = results.reduce((sum, page) => sum + page.quoteSections.length, 0);
  const pagesWithQuotes = results.filter(page => page.quoteSections.length > 0).length;
  const pagesWithoutQuotes = results.length - pagesWithQuotes;
  
  summary += `## Summary Statistics\n\n`;
  summary += `- **Total Quote Sections Found**: ${totalQuotes}\n`;
  summary += `- **Pages with Quotes**: ${pagesWithQuotes}\n`;
  summary += `- **Pages without Quotes**: ${pagesWithoutQuotes}\n\n`;
  
  // Inconsistency analysis
  summary += `## Typography Consistency Analysis\n\n`;
  
  const fontSizes = results.flatMap(page => 
    page.quoteSections.map(quote => ({ page: page.page, fontSize: quote.computedFontSize, viewport: quote.viewport }))
  );
  
  // Group by viewport
  const desktopSizes = fontSizes.filter(f => f.viewport === 'desktop');
  const mobileSizes = fontSizes.filter(f => f.viewport === 'mobile');
  
  if (desktopSizes.length > 0) {
    const uniqueDesktopSizes = [...new Set(desktopSizes.map(f => f.fontSize))];
    summary += `### Desktop Font Sizes (Expected: 24px)\n`;
    summary += `- **Unique sizes found**: ${uniqueDesktopSizes.join(', ')}px\n`;
    summary += `- **Consistency**: ${uniqueDesktopSizes.length === 1 ? '✅ Consistent' : '❌ Inconsistent'}\n\n`;
  }
  
  if (mobileSizes.length > 0) {
    const uniqueMobileSizes = [...new Set(mobileSizes.map(f => f.fontSize))];
    summary += `### Mobile Font Sizes (Expected: 20px)\n`;
    summary += `- **Unique sizes found**: ${uniqueMobileSizes.join(', ')}px\n`;
    summary += `- **Consistency**: ${uniqueMobileSizes.length === 1 ? '✅ Consistent' : '❌ Inconsistent'}\n\n`;
  }
  
  // Page-by-page breakdown
  summary += `## Page-by-Page Breakdown\n\n`;
  
  results.forEach(page => {
    summary += `### ${page.page}\n`;
    summary += `**URL**: ${page.url}\n`;
    summary += `**Quote Sections**: ${page.quoteSections.length}\n\n`;
    
    if (page.quoteSections.length > 0) {
      page.quoteSections.forEach((quote, index) => {
        summary += `#### Quote Section ${index + 1}\n`;
        summary += `- **Selector**: ${quote.selector}\n`;
        summary += `- **Font Size**: ${quote.fontSize} (${quote.computedFontSize}px)\n`;
        summary += `- **Font Family**: ${quote.fontFamily}\n`;
        summary += `- **Font Style**: ${quote.fontStyle}\n`;
        summary += `- **Font Weight**: ${quote.fontWeight}\n`;
        summary += `- **Line Height**: ${quote.lineHeight}\n`;
        summary += `- **Viewport**: ${quote.viewport}\n`;
        summary += `- **Content Preview**: ${quote.innerHTML}\n\n`;
      });
    } else {
      summary += `*No quote sections found on this page.*\n\n`;
    }
  });
  
  // Recommendations
  summary += `## Recommendations\n\n`;
  
  if (totalQuotes === 0) {
    summary += `❌ **Critical Issue**: No quote sections found on any page. Verify selectors and component implementation.\n\n`;
  } else {
    // Check for consistency issues
    const desktopInconsistencies = desktopSizes.length > 0 && [...new Set(desktopSizes.map(f => f.fontSize))].length > 1;
    const mobileInconsistencies = mobileSizes.length > 0 && [...new Set(mobileSizes.map(f => f.fontSize))].length > 1;
    
    if (desktopInconsistencies || mobileInconsistencies) {
      summary += `❌ **Typography Inconsistencies Detected**\n\n`;
      if (desktopInconsistencies) {
        summary += `- Desktop font sizes vary across pages - ensure consistent use of \`text-2xl\` class\n`;
      }
      if (mobileInconsistencies) {
        summary += `- Mobile font sizes vary across pages - ensure consistent use of \`text-xl\` class\n`;
      }
      summary += `\n**Recommended Fix**: Apply consistent Tailwind classes \`text-xl lg:text-2xl font-serif italic\` to all QuoteSection components.\n\n`;
    } else {
      summary += `✅ **Typography is consistent** across all pages with quote sections.\n\n`;
    }
  }
  
  summary += `## Testing Methodology\n\n`;
  summary += `- **Playwright Version**: Latest\n`;
  summary += `- **Browsers Tested**: Chromium (Desktop & Mobile viewports)\n`;
  summary += `- **Desktop Viewport**: 1440x900\n`;
  summary += `- **Mobile Viewport**: 375x667\n`;
  summary += `- **Selectors Tested**: ${QUOTE_SELECTORS.join(', ')}\n`;
  summary += `- **Screenshots**: Captured for visual verification\n`;
  summary += `- **Network Conditions**: Waited for networkidle state\n\n`;
  
  summary += `---\n*Report generated by Playwright QuoteSection Typography Testing Suite*`;
  
  return summary;
}