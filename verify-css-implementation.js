// CONTEXT7 SOURCE: /mdn/content - CSS validation and verification utilities
// CSS_VERIFICATION_REASON: Official Web APIs documentation for CSS feature detection and validation

const fs = require('fs').promises;
const path = require('path');

class CSSImplementationVerifier {
    constructor() {
        this.results = {
            timestamp: new Date().toISOString(),
            files: {},
            patterns: {},
            compliance: {},
            issues: []
        };
    }

    async verifyImplementation() {
        console.log('🔍 Verifying CSS implementation for viewport solutions...');

        // Check global CSS file
        await this.verifyGlobalCSS();

        // Check component implementations
        await this.verifyComponentImplementations();

        // Check constants file
        await this.verifyConstants();

        // Generate verification report
        await this.generateVerificationReport();

        return this.results;
    }

    async verifyGlobalCSS() {
        console.log('📄 Checking globals.css implementation...');

        try {
            const cssPath = '/home/jack/Documents/my_private_tutor_online/src/app/globals.css';
            const cssContent = await fs.readFile(cssPath, 'utf8');

            // Check for scrollbar-gutter implementation
            const hasScrollbarGutter = cssContent.includes('scrollbar-gutter: stable');
            const hasScrollbarFallback = cssContent.includes('@supports not (scrollbar-gutter: stable)');
            const hasOverflowHidden = cssContent.includes('overflow-x: hidden');

            // Check for DVH-related comments and patterns
            const hasDVHComments = cssContent.includes('Dynamic Viewport') || cssContent.includes('dvh');
            const hasContext7Attribution = cssContent.includes('CONTEXT7 SOURCE:');

            this.results.files['globals.css'] = {
                path: cssPath,
                exists: true,
                scrollbarGutter: hasScrollbarGutter,
                scrollbarFallback: hasScrollbarFallback,
                overflowHidden: hasOverflowHidden,
                dvhComments: hasDVHComments,
                context7Attribution: hasContext7Attribution,
                size: cssContent.length
            };

            console.log(`  ✅ Scrollbar-gutter: ${hasScrollbarGutter ? 'Implemented' : 'Missing'}`);
            console.log(`  ✅ Fallback support: ${hasScrollbarFallback ? 'Implemented' : 'Missing'}`);
            console.log(`  ✅ Overflow control: ${hasOverflowHidden ? 'Implemented' : 'Missing'}`);

            if (!hasScrollbarGutter) {
                this.results.issues.push('Missing scrollbar-gutter: stable in globals.css');
            }

        } catch (error) {
            console.error('❌ Error reading globals.css:', error.message);
            this.results.files['globals.css'] = { exists: false, error: error.message };
            this.results.issues.push('Cannot access globals.css file');
        }
    }

    async verifyComponentImplementations() {
        console.log('🧩 Checking component implementations...');

        const componentsToCheck = [
            '/home/jack/Documents/my_private_tutor_online/src/components/layout/page-hero.tsx',
            '/home/jack/Documents/my_private_tutor_online/src/app/[locale]/page.tsx',
            '/home/jack/Documents/my_private_tutor_online/src/lib/constants/navbar-heights.ts'
        ];

        for (const componentPath of componentsToCheck) {
            await this.verifyComponentFile(componentPath);
        }
    }

    async verifyComponentFile(filePath) {
        const fileName = path.basename(filePath);
        console.log(`  📝 Checking ${fileName}...`);

        try {
            const content = await fs.readFile(filePath, 'utf8');

            // Check for DVH usage
            const hasDVHUsage = content.includes('dvh') || content.includes('Dynamic Viewport');
            const hasCalculateRemainingViewport = content.includes('calculateRemainingViewport');
            const hasSupportsDynamicViewport = content.includes('supportsDynamicViewport');
            const hasNavbarHeightImports = content.includes('navbar-heights');

            // Check for Context7 attribution
            const hasContext7Attribution = content.includes('CONTEXT7 SOURCE:');

            // Check for specific patterns
            const hasGetHeroSectionClasses = content.includes('getHeroSectionClasses');
            const hasNavbarSpacerHeight = content.includes('getNavbarSpacerHeight');

            this.results.files[fileName] = {
                path: filePath,
                exists: true,
                dvhUsage: hasDVHUsage,
                calculateRemainingViewport: hasCalculateRemainingViewport,
                supportsDynamicViewport: hasSupportsDynamicViewport,
                navbarHeightImports: hasNavbarHeightImports,
                context7Attribution: hasContext7Attribution,
                getHeroSectionClasses: hasGetHeroSectionClasses,
                navbarSpacerHeight: hasNavbarSpacerHeight,
                size: content.length
            };

            console.log(`    ✅ DVH implementation: ${hasDVHUsage ? 'Found' : 'Not found'}`);
            console.log(`    ✅ Navbar height utilities: ${hasNavbarHeightImports ? 'Imported' : 'Not imported'}`);

        } catch (error) {
            console.error(`    ❌ Error reading ${fileName}:`, error.message);
            this.results.files[fileName] = { exists: false, error: error.message };
            this.results.issues.push(`Cannot access ${fileName}`);
        }
    }

    async verifyConstants() {
        console.log('📐 Checking navbar-heights constants...');

        try {
            const constantsPath = '/home/jack/Documents/my_private_tutor_online/src/lib/constants/navbar-heights.ts';
            const content = await fs.readFile(constantsPath, 'utf8');

            // Check for required constants
            const hasNavbarHeights = content.includes('NAVBAR_HEIGHTS');
            const hasMobileHeight = content.includes('5.5rem');
            const hasTabletHeight = content.includes('6.25rem');
            const hasDesktopHeight = content.includes('7rem');

            // Check for utility functions
            const hasCalculateRemainingViewport = content.includes('calculateRemainingViewport');
            const hasSupportsDynamicViewport = content.includes('supportsDynamicViewport');
            const hasGetHeroSectionClasses = content.includes('getHeroSectionClasses');

            this.results.patterns.constants = {
                navbarHeights: hasNavbarHeights,
                mobileHeight: hasMobileHeight,
                tabletHeight: hasTabletHeight,
                desktopHeight: hasDesktopHeight,
                calculateRemainingViewport: hasCalculateRemainingViewport,
                supportsDynamicViewport: hasSupportsDynamicViewport,
                getHeroSectionClasses: hasGetHeroSectionClasses
            };

            console.log(`  ✅ NAVBAR_HEIGHTS constant: ${hasNavbarHeights ? 'Defined' : 'Missing'}`);
            console.log(`  ✅ Responsive heights: Mobile(${hasMobileHeight}), Tablet(${hasTabletHeight}), Desktop(${hasDesktopHeight})`);
            console.log(`  ✅ Utility functions: ${hasCalculateRemainingViewport ? 'Complete' : 'Incomplete'}`);

            const allConstantsPresent = hasNavbarHeights && hasMobileHeight && hasTabletHeight && hasDesktopHeight;
            const allUtilitiesPresent = hasCalculateRemainingViewport && hasSupportsDynamicViewport && hasGetHeroSectionClasses;

            if (!allConstantsPresent) {
                this.results.issues.push('Missing required navbar height constants');
            }

            if (!allUtilitiesPresent) {
                this.results.issues.push('Missing required utility functions in navbar-heights.ts');
            }

        } catch (error) {
            console.error('❌ Error reading navbar-heights.ts:', error.message);
            this.results.issues.push('Cannot access navbar-heights.ts file');
        }
    }

    async generateVerificationReport() {
        console.log('\n📊 Generating verification report...');

        // Calculate compliance score
        const totalFiles = Object.keys(this.results.files).length;
        const workingFiles = Object.values(this.results.files).filter(file => file.exists).length;
        const complianceScore = totalFiles > 0 ? (workingFiles / totalFiles * 100).toFixed(1) : 0;

        // Determine overall status
        const hasScrollbarGutter = this.results.files['globals.css']?.scrollbarGutter || false;
        const hasDVHImplementation = Object.values(this.results.files).some(file => file.dvhUsage);
        const hasConstants = this.results.patterns.constants?.navbarHeights || false;

        this.results.compliance = {
            score: `${complianceScore}%`,
            scrollbarGutter: hasScrollbarGutter,
            dvhImplementation: hasDVHImplementation,
            constants: hasConstants,
            issuesCount: this.results.issues.length,
            status: this.results.issues.length === 0 ? 'PASS' : 'ISSUES_FOUND'
        };

        // Save report
        const reportPath = '/home/jack/Documents/my_private_tutor_online/css-verification-report.json';
        await fs.writeFile(reportPath, JSON.stringify(this.results, null, 2));

        console.log(`\n✅ Verification complete!`);
        console.log(`   Compliance Score: ${complianceScore}%`);
        console.log(`   Status: ${this.results.compliance.status}`);
        console.log(`   Issues Found: ${this.results.issues.length}`);

        if (this.results.issues.length > 0) {
            console.log(`\n🔧 Issues to address:`);
            this.results.issues.forEach((issue, index) => {
                console.log(`   ${index + 1}. ${issue}`);
            });
        }

        console.log(`\n💾 Detailed report saved to: ${reportPath}`);

        return this.results;
    }
}

// Run verification if script is executed directly
if (require.main === module) {
    const verifier = new CSSImplementationVerifier();
    verifier.verifyImplementation().catch(console.error);
}

module.exports = CSSImplementationVerifier;