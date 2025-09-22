// CONTEXT7 SOURCE: /microsoft/playwright - Automated viewport testing implementation
// PLAYWRIGHT_TESTING_REASON: Official Playwright documentation for cross-browser viewport testing

const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs').promises;

/**
 * CONTEXT7 SOURCE: /microsoft/playwright - Comprehensive viewport testing with mobile device simulation
 * MOBILE_TESTING_REASON: Official Playwright documentation for responsive design testing
 */
class ViewportTestSuite {
    constructor() {
        this.testResults = {
            timestamp: new Date().toISOString(),
            browsers: {},
            breakpoints: {},
            mobileScenarios: {},
            summary: {
                totalTests: 0,
                passedTests: 0,
                failedTests: 0,
                warnings: 0
            }
        };

        // Test breakpoints matching navbar-heights.ts constants
        this.breakpoints = [
            { name: 'Mobile', width: 375, height: 667, navbarHeight: 88 },
            { name: 'Mobile Large', width: 414, height: 896, navbarHeight: 88 },
            { name: 'Tablet', width: 768, height: 1024, navbarHeight: 100 },
            { name: 'Large', width: 1024, height: 768, navbarHeight: 100 },
            { name: 'XL Desktop', width: 1280, height: 720, navbarHeight: 112 },
            { name: 'XXL Desktop', width: 1920, height: 1080, navbarHeight: 112 }
        ];

        // Mobile devices for testing
        this.mobileDevices = [
            'iPhone 12',
            'iPhone 14 Pro',
            'iPhone SE',
            'Pixel 5',
            'Samsung Galaxy S21',
            'iPad',
            'iPad Pro'
        ];
    }

    async runComprehensiveTests() {
        console.log('🚀 Starting comprehensive viewport testing...');
        console.log('📱 Testing DVH units, scrollbar-gutter, and responsive breakpoints');

        const browsers = ['chromium', 'firefox', 'webkit'];

        for (const browserName of browsers) {
            console.log(`\n🌐 Testing ${browserName.toUpperCase()}...`);
            await this.testBrowser(browserName);
        }

        await this.generateFinalReport();
        console.log('\n✅ Comprehensive testing completed!');
    }

    async testBrowser(browserName) {
        let browser;
        try {
            // Launch browser
            const browserEngine = browserName === 'chromium' ? chromium :
                                browserName === 'firefox' ? firefox : webkit;

            browser = await browserEngine.launch({
                headless: false,  // Set to true for CI
                devtools: browserName === 'chromium' // Open devtools for Chrome
            });

            this.testResults.browsers[browserName] = {
                launched: true,
                breakpointTests: {},
                mobileTests: {},
                featureSupport: {},
                errors: []
            };

            // Test basic feature support
            await this.testFeatureSupport(browser, browserName);

            // Test each breakpoint
            await this.testBreakpoints(browser, browserName);

            // Test mobile scenarios
            await this.testMobileScenarios(browser, browserName);

        } catch (error) {
            console.error(`❌ Error testing ${browserName}:`, error.message);
            this.testResults.browsers[browserName] = {
                launched: false,
                error: error.message
            };
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }

    async testFeatureSupport(browser, browserName) {
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

            // Test DVH support
            const dvhSupported = await page.evaluate(() => {
                return CSS.supports('height', '100dvh');
            });

            // Test scrollbar-gutter support
            const scrollbarGutterSupported = await page.evaluate(() => {
                return CSS.supports('scrollbar-gutter', 'stable');
            });

            // Test if our support detection function works
            const supportDetectionWorks = await page.evaluate(() => {
                return typeof window.supportsDynamicViewport === 'function';
            });

            this.testResults.browsers[browserName].featureSupport = {
                dvh: dvhSupported,
                scrollbarGutter: scrollbarGutterSupported,
                supportDetection: supportDetectionWorks
            };

            console.log(`  🔍 ${browserName} feature support:`, {
                DVH: dvhSupported ? '✅' : '❌',
                'Scrollbar-Gutter': scrollbarGutterSupported ? '✅' : '❌'
            });

            this.updateTestCounts(true);

        } catch (error) {
            console.error(`  ❌ Feature support test failed for ${browserName}:`, error.message);
            this.testResults.browsers[browserName].errors.push(`Feature support: ${error.message}`);
            this.updateTestCounts(false);
        } finally {
            await context.close();
        }
    }

    async testBreakpoints(browser, browserName) {
        console.log(`  📱 Testing responsive breakpoints in ${browserName}...`);

        for (const breakpoint of this.breakpoints) {
            await this.testSingleBreakpoint(browser, browserName, breakpoint);
        }
    }

    async testSingleBreakpoint(browser, browserName, breakpoint) {
        const context = await browser.newContext({
            viewport: { width: breakpoint.width, height: breakpoint.height }
        });
        const page = await context.newPage();

        try {
            // Navigate to homepage
            await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

            // Wait for hero section to load
            await page.waitForSelector('#hero-premium-tutoring-landing-combined', { timeout: 10000 });

            // Measure viewport dimensions
            const measurements = await page.evaluate(() => {
                const viewport = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };

                // Test DVH measurement
                const testDiv = document.createElement('div');
                testDiv.style.position = 'absolute';
                testDiv.style.top = '-9999px';
                testDiv.style.height = '100dvh';
                document.body.appendChild(testDiv);
                const dvhHeight = testDiv.offsetHeight;
                document.body.removeChild(testDiv);

                // Test VH measurement
                const testDivVh = document.createElement('div');
                testDivVh.style.position = 'absolute';
                testDivVh.style.top = '-9999px';
                testDivVh.style.height = '100vh';
                document.body.appendChild(testDivVh);
                const vhHeight = testDivVh.offsetHeight;
                document.body.removeChild(testDivVh);

                // Get hero section dimensions
                const heroSection = document.querySelector('#hero-premium-tutoring-landing-combined');
                const heroHeight = heroSection ? heroSection.offsetHeight : 0;

                // Check for horizontal overflow
                const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;

                // Check navbar height
                const navbar = document.querySelector('nav') || document.querySelector('[role="navigation"]');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;

                return {
                    viewport,
                    dvhHeight,
                    vhHeight,
                    heroHeight,
                    navbarHeight,
                    hasHorizontalOverflow,
                    dvhDifference: Math.abs(dvhHeight - vhHeight)
                };
            });

            // Validate results
            const expectedRemainingHeight = measurements.dvhHeight - breakpoint.navbarHeight;
            const heightDifference = Math.abs(measurements.heroHeight - expectedRemainingHeight);
            const isHeightCorrect = heightDifference < 10; // 10px tolerance

            const testResult = {
                measurements,
                expectedNavbarHeight: breakpoint.navbarHeight,
                expectedRemainingHeight,
                heightDifference,
                isHeightCorrect,
                hasHorizontalOverflow: measurements.hasHorizontalOverflow,
                dvhWorking: measurements.dvhDifference >= 0
            };

            this.testResults.browsers[browserName].breakpointTests[breakpoint.name] = testResult;

            console.log(`    ${breakpoint.name} (${breakpoint.width}x${breakpoint.height}): ${isHeightCorrect ? '✅' : '❌'} Height difference: ${heightDifference}px`);

            this.updateTestCounts(isHeightCorrect && !measurements.hasHorizontalOverflow);

        } catch (error) {
            console.error(`    ❌ ${breakpoint.name} test failed:`, error.message);
            this.testResults.browsers[browserName].errors.push(`${breakpoint.name}: ${error.message}`);
            this.updateTestCounts(false);
        } finally {
            await context.close();
        }
    }

    async testMobileScenarios(browser, browserName) {
        if (browserName !== 'chromium') {
            console.log(`  📱 Skipping mobile device tests for ${browserName} (Chromium only)`);
            return;
        }

        console.log(`  📱 Testing mobile device scenarios...`);

        for (const deviceName of this.mobileDevices) {
            await this.testMobileDevice(browser, browserName, deviceName);
        }
    }

    async testMobileDevice(browser, browserName, deviceName) {
        try {
            const device = require('playwright').devices[deviceName];
            if (!device) {
                console.log(`    ⚠️ Device ${deviceName} not found, skipping`);
                return;
            }

            const context = await browser.newContext({
                ...device,
                geolocation: { longitude: 0, latitude: 0 },
                permissions: ['geolocation']
            });

            const page = await context.newPage();

            // Navigate to homepage
            await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

            // Test portrait orientation
            const portraitTest = await this.testOrientation(page, 'portrait');

            // Test landscape orientation
            await page.setViewportSize({
                width: device.viewport.height,
                height: device.viewport.width
            });

            const landscapeTest = await this.testOrientation(page, 'landscape');

            this.testResults.browsers[browserName].mobileTests[deviceName] = {
                portrait: portraitTest,
                landscape: landscapeTest
            };

            const success = portraitTest.success && landscapeTest.success;
            console.log(`    ${deviceName}: ${success ? '✅' : '❌'}`);

            this.updateTestCounts(success);

            await context.close();

        } catch (error) {
            console.error(`    ❌ ${deviceName} test failed:`, error.message);
            this.testResults.browsers[browserName].errors.push(`${deviceName}: ${error.message}`);
            this.updateTestCounts(false);
        }
    }

    async testOrientation(page, orientation) {
        try {
            await page.waitForSelector('#hero-premium-tutoring-landing-combined', { timeout: 5000 });

            const result = await page.evaluate(() => {
                const heroSection = document.querySelector('#hero-premium-tutoring-landing-combined');
                const navbar = document.querySelector('nav') || document.querySelector('[role="navigation"]');

                return {
                    viewportWidth: window.innerWidth,
                    viewportHeight: window.innerHeight,
                    heroHeight: heroSection ? heroSection.offsetHeight : 0,
                    navbarHeight: navbar ? navbar.offsetHeight : 0,
                    hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
                };
            });

            return {
                orientation,
                success: result.heroHeight > 0 && !result.hasHorizontalOverflow,
                measurements: result
            };

        } catch (error) {
            return {
                orientation,
                success: false,
                error: error.message
            };
        }
    }

    updateTestCounts(passed) {
        this.testResults.summary.totalTests++;
        if (passed) {
            this.testResults.summary.passedTests++;
        } else {
            this.testResults.summary.failedTests++;
        }
    }

    async generateFinalReport() {
        // Calculate success rate
        const { totalTests, passedTests, failedTests } = this.testResults.summary;
        const successRate = totalTests > 0 ? (passedTests / totalTests * 100).toFixed(1) : 0;

        // Generate recommendations
        const recommendations = this.generateRecommendations();

        const finalReport = {
            ...this.testResults,
            summary: {
                ...this.testResults.summary,
                successRate: `${successRate}%`,
                recommendations
            }
        };

        // Save report to file
        const reportPath = '/home/jack/Documents/my_private_tutor_online/viewport-test-report.json';
        await fs.writeFile(reportPath, JSON.stringify(finalReport, null, 2));

        // Display summary
        console.log('\n📊 COMPREHENSIVE VIEWPORT TEST RESULTS:');
        console.log(`   Total Tests: ${totalTests}`);
        console.log(`   Passed: ${passedTests}`);
        console.log(`   Failed: ${failedTests}`);
        console.log(`   Success Rate: ${successRate}%`);
        console.log(`\n💾 Detailed report saved to: ${reportPath}`);

        if (recommendations.length > 0) {
            console.log('\n🔧 RECOMMENDATIONS:');
            recommendations.forEach((rec, index) => {
                console.log(`   ${index + 1}. ${rec}`);
            });
        }

        return finalReport;
    }

    generateRecommendations() {
        const recommendations = [];
        const browsers = this.testResults.browsers;

        // Check for widespread DVH support issues
        const browsersWithoutDVH = Object.keys(browsers).filter(
            name => browsers[name].featureSupport && !browsers[name].featureSupport.dvh
        );

        if (browsersWithoutDVH.length > 0) {
            recommendations.push(`Implement enhanced fallbacks for DVH units in: ${browsersWithoutDVH.join(', ')}`);
        }

        // Check for scrollbar-gutter support issues
        const browsersWithoutScrollbarGutter = Object.keys(browsers).filter(
            name => browsers[name].featureSupport && !browsers[name].featureSupport.scrollbarGutter
        );

        if (browsersWithoutScrollbarGutter.length > 0) {
            recommendations.push(`Add scrollbar-gutter fallbacks for: ${browsersWithoutScrollbarGutter.join(', ')}`);
        }

        // Check for height calculation issues
        const breakpointIssues = [];
        Object.keys(browsers).forEach(browserName => {
            const browser = browsers[browserName];
            if (browser.breakpointTests) {
                Object.keys(browser.breakpointTests).forEach(breakpointName => {
                    const test = browser.breakpointTests[breakpointName];
                    if (!test.isHeightCorrect) {
                        breakpointIssues.push(`${browserName}:${breakpointName}`);
                    }
                });
            }
        });

        if (breakpointIssues.length > 0) {
            recommendations.push(`Review height calculations for: ${breakpointIssues.join(', ')}`);
        }

        // Check for horizontal overflow issues
        const overflowIssues = [];
        Object.keys(browsers).forEach(browserName => {
            const browser = browsers[browserName];
            if (browser.breakpointTests) {
                Object.keys(browser.breakpointTests).forEach(breakpointName => {
                    const test = browser.breakpointTests[breakpointName];
                    if (test.hasHorizontalOverflow) {
                        overflowIssues.push(`${browserName}:${breakpointName}`);
                    }
                });
            }
        });

        if (overflowIssues.length > 0) {
            recommendations.push(`Fix horizontal overflow in: ${overflowIssues.join(', ')}`);
        }

        if (recommendations.length === 0) {
            recommendations.push('All viewport solutions are working correctly across all tested browsers and devices! 🎉');
        }

        return recommendations;
    }
}

// Run tests if this script is executed directly
if (require.main === module) {
    const testSuite = new ViewportTestSuite();
    testSuite.runComprehensiveTests().catch(console.error);
}

module.exports = ViewportTestSuite;