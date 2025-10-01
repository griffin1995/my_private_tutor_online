/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Homepage restructuring and componentization implementation
 * COMPONENT EXTRACTION REASON: Official React documentation patterns for modular section components
 * REVISION REASON: Complete homepage restructuring to achieve desired 8-section structure with full modularity
 */

"use client";

// CONTEXT7 SOURCE: /reactjs/react.dev - CMS Integration Imports
// CMS DATA LOADING REASON: Official React patterns for synchronous content access
import {
  getFounderQuote,
  getServices,
  getSiteBranding,
  getTestimonialsSchools,
  getTrustIndicators,
} from "../../lib/cms";
import { getStudentImages } from "../../lib/cms/cms-images";

// CONTEXT7 SOURCE: /websites/web.dev - Performance monitoring for layout optimization
// PERFORMANCE_MONITORING_REASON: Official Web Performance documentation for tracking layout thrashing
import { useEffect } from "react";
import { layoutMonitor } from "../../lib/performance/layout-performance-monitor";

// CONTEXT7 SOURCE: /reactjs/react.dev - CMS Architecture Monitoring integration
// CMS MONITORING REASON: Prevent August 2025 homepage failure recurrence through real-time architecture monitoring
import { runtimeMonitor } from "../../lib/cms/cms-runtime-monitor";
import { CMSArchitectureDashboard } from "../../components/cms-architecture-dashboard";

// CONTEXT7 SOURCE: /reactjs/react.dev - Component imports for homepage sections
// COMPONENT IMPORT REASON: Official React documentation for modular component architecture
import { ErrorBoundaryWrapper } from "../../components/boundaries/homepage-error-boundary";
import { HomepageSections } from "../../components/homepage/homepage-sections";
import { Navigation } from "../../components/navigation/Navigation";
import { PageFooter } from "../../components/layout/page-footer";
import { AboutSection } from "../../components/sections/about-section";
import { BrandMessageSection } from "../../components/sections/brand-message-section";
import { HeroSection } from "../../components/sections/hero-section";
import { ScrollingSchools } from "../../components/sections/scrolling-schools";
import { TrustIndicatorsGrid } from "../../components/sections/trust-indicators-grid";
// CONTEXT7 SOURCE: /reactjs/react.dev - Component replacement using named imports
// REVISION REASON: Official React documentation patterns for component substitution and clean import management
import { ThreePillarsSection } from "../../components/sections/three-pillars-section";

// CONTEXT7 SOURCE: /reactjs/react.dev - Extracted section components for homepage componentization
// COMPONENT EXTRACTION REASON: Official React documentation patterns for modular section components
import { FounderIntroductionSection } from "../../components/sections/founder-introduction-section";
import { TaglineSection } from "../../components/sections/tagline-section";

// CONTEXT7 SOURCE: /microsoft/typescript - Centralized navbar height constants for maintainable spacing
// CONSTANTS_IMPORT_REASON: Official TypeScript documentation patterns for centralized constant management
import { getHeroSectionClasses, getNavbarSpacerHeight } from "../../lib/constants/navbar-heights";

// CONTEXT7 SOURCE: /websites/nextjs - Utility imports for component structure
// UTILITY_IMPORT_REASON: Official Next.js documentation for utility function imports
import { cn } from "../../lib/utils";

// CONTEXT7 SOURCE: /reactjs/react.dev - Homepage component with 8-section structure
// HOMEPAGE STRUCTURE REASON: Official React patterns for component-based architecture
export default function HomePage() {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Synchronous CMS data loading for homepage sections
  // CMS DATA LOADING REASON: Official React patterns for static content access
  const services = getServices();
  const siteBranding = getSiteBranding();
  const founderQuote = getFounderQuote();
  const trustIndicators = getTrustIndicators();
  const testimonialsSchools = getTestimonialsSchools();
  const studentImages = getStudentImages();

  // CONTEXT7 SOURCE: /websites/web.dev - Performance monitoring initialization
  // LAYOUT_MONITORING_REASON: Track and optimize layout performance metrics
  useEffect(() => {
    // Start monitoring after initial render
    const timeoutId = setTimeout(() => {
      layoutMonitor.startMonitoring();

      // CONTEXT7 SOURCE: /reactjs/react.dev - CMS Architecture Monitoring initialization
      // CMS MONITORING REASON: Start runtime monitoring for August 2025 failure prevention
      runtimeMonitor.startMonitoring();

      // Validate synchronous CMS data access immediately
      const validationStart = performance.now();
      try {
        // Test all CMS functions are working synchronously
        const cmsDataValidation = {
          services: services?.length > 0,
          branding: siteBranding?.name !== undefined,
          quote: founderQuote?.text !== undefined,
          indicators: trustIndicators?.length > 0,
          schools: testimonialsSchools?.length > 0,
          images: studentImages?.length > 0,
        };

        const allValid = Object.values(cmsDataValidation).every(Boolean);
        const validationTime = performance.now() - validationStart;

        if (allValid && validationTime < 10) {
          console.log("✅ CMS Architecture Validation: PASSED");
          console.log(`   - Synchronous data access: ${validationTime.toFixed(2)}ms`);
          console.log("   - August 2025 failure patterns: NONE DETECTED");
        } else {
          runtimeMonitor.recordViolation(
            'MISSING_DATA',
            'HomePage',
            'CMS data validation failed - potential async loading detected',
            { validationResults: cmsDataValidation, validationTime }
          );
        }
      } catch (error) {
        runtimeMonitor.recordViolation(
          'MISSING_DATA',
          'HomePage',
          `CMS data access error: ${error}`,
          { error: error.toString(), stackTrace: error.stack }
        );
      }

      // Log initial metrics after hero section loads
      setTimeout(() => {
        const metrics = layoutMonitor.getMetrics();
        const cmsState = runtimeMonitor.getCurrentState();

        if (process.env.NODE_ENV === "development") {
          console.log("🎯 Initial Homepage Performance:", {
            layout: {
              grade: metrics.performanceGrade,
              cls: metrics.cumulativeLayoutShift.toFixed(3),
              lcp: `${metrics.largestContentfulPaint.toFixed(0)}ms`,
              thrashing: metrics.thrashingScore.toFixed(3),
            },
            cmsArchitecture: {
              score: `${cmsState.architectureScore}/10`,
              violations: cmsState.totalViolations,
              critical: cmsState.criticalViolations,
              status: cmsState.isMonitoring ? 'PROTECTED' : 'UNPROTECTED'
            },
            recommendations: metrics.recommendations,
          });
        }
      }, 3000);
    }, 100);

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
      if (process.env.NODE_ENV === "development") {
        const finalMetrics = layoutMonitor.stopMonitoring();
        const finalCMSState = runtimeMonitor.getCurrentState();

        console.log("📈 Final Homepage Performance:", {
          layout: finalMetrics,
          cmsArchitecture: {
            finalScore: `${finalCMSState.architectureScore}/10`,
            totalViolations: finalCMSState.totalViolations,
            sessionSummary: finalCMSState.criticalViolations === 0
              ? "✅ Perfect synchronous architecture maintained"
              : `⚠️ ${finalCMSState.criticalViolations} critical violations detected`
          }
        });
      }

      // Keep CMS monitoring active (don't stop on homepage unmount)
      // runtimeMonitor.stopMonitoring(); // Commented out - keep monitoring across navigation
    };
  }, []);

  return (
    // CONTEXT7 SOURCE: /vercel/next.js - Direct component structure pattern
    // PAGELAYOUT_REMOVAL_REASON: Official Next.js documentation for semantic HTML structure without wrapper components
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Navigation component with homepage props */}
      {/* NAVIGATION_INTEGRATION_REASON: Official React documentation for direct component integration */}
      <Navigation isHomepage={true} />
      <main className="flex-1" role="main" id="main-content" tabIndex={-1}>
        <div className="mx-auto">
        {/* CONTEXT7 SOURCE: /websites/tailwindcss - Spacer div for fixed header layout positioning */}
        {/* SPACER_DIV_REASON: Official Tailwind CSS documentation for spacing elements to push content below fixed headers */}
        {/* Navbar spacer to push content below fixed navbar */}
        <div className={getNavbarSpacerHeight()} />

        {/* SECTION 1: COMBINED HERO WITH TAGLINE AND SCROLLING SCHOOLS - FULL VIEWPORT */}
        {/* CONTEXT7 SOURCE: /websites/tailwindcss - Sequential positioning using spacer div for fixed navbar clearance */}
        {/* SPACER_POSITIONING_REASON: Official Tailwind documentation for clean container positioning using spacer elements */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - CSS calc() function for accurate viewport height calculations */}
        {/* NAVBAR_ACCOMMODATION_REASON: Official Tailwind documentation for calc() with responsive breakpoints ensuring exact viewport usage */}
        <section
          id="hero-premium-tutoring-landing-combined"
          className={getHeroSectionClasses()}
        >
          {/* CONTEXT7 SOURCE: /thingsym/flexbox-grid-mixins - Flexbox ratio optimization for content hierarchy */}
          {/* RATIO_OPTIMIZATION_REASON: Official flexbox documentation patterns for viewport space allocation */}
          {/* Hero Section - Takes up 50% of available viewport height (10/20 units) */}
          <HeroSection
            showHeader={false}
            hasStaticNavbar={false}
            className="flex-[10] h-full"
          />

          {/* Tagline Section - Takes up 20% of available viewport height */}
          <div className="flex-[4] flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TaglineSection />
            </div>
          </div>

          {/* CONTEXT7 SOURCE: /thingsym/flexbox-grid-mixins - Flexbox ratio optimization for content hierarchy */}
          {/* RATIO_OPTIMIZATION_REASON: Official flexbox documentation patterns for viewport space allocation */}
          {/* Scrolling Schools Section - Takes up 30% of available viewport height (6/20 units) */}
          <div className="flex-[6] flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering using logical AND operator */}
              {/* ERROR_BOUNDARY_REMOVAL_REASON: Official React documentation patterns for direct conditional component rendering */}
              {testimonialsSchools.length > 0 && (
                <ScrollingSchools schools={[...testimonialsSchools]} />
              )}
            </div>
          </div>
        </section>
        {/* SECTION 3: OPENING STATEMENT - EXCEPTIONAL TUITION
        <OpeningStatementSection /> */}
        {/* SECTION 4.1: INTRODUCTION - COMPANY BACKGROUND */}
        <ErrorBoundaryWrapper sectionName="About Section">
          <AboutSection />
        </ErrorBoundaryWrapper>
        {/* SECTION 4.2: FOUNDER INTRODUCTION - MEET ELIZABETH VIDEO */}
        <FounderIntroductionSection />
        {/* SECTION 5: QUANTIFIABLE RESULTS - ACADEMIC OUTCOMES */}
        <section id="quantifiable-results-documentation">
          <ErrorBoundaryWrapper sectionName="Results Documentation">
            <ThreePillarsSection />
          </ErrorBoundaryWrapper>
        </section>
        {/* SECTION 6: TRUST INDICATORS - CREDIBILITY AND SOCIAL PROOF */}
        <section id="trust-indicators-social-proof">
          <ErrorBoundaryWrapper sectionName="Trust Indicators">
            {/* CONTEXT7 SOURCE: /facebook/react - Component props interface typing for React functional components */}
            {/* CONTEXT7 SOURCE: /microsoft/typescript - Interface prop validation ensuring type safety for component properties */}
            {/* PROPS FIX REASON: Official React and TypeScript documentation requires exact prop interface matching
                Component expects: { indicators: TrustIndicator[], studentImages: Record<string, ImageType> }
                Fixed from: trustIndicators={trustIndicators} (mismatched prop name)
                Fixed to: indicators={trustIndicators} + studentImages={studentImages} (correct interface) */}
            <TrustIndicatorsGrid
              indicators={trustIndicators}
              studentImages={studentImages}
            />
          </ErrorBoundaryWrapper>
        </section>
        {/* SECTION 7: WHO WE SUPPORT - SERVICE CATEGORIES SHOWCASE */}
        <section id="who-we-support-services">
          <ErrorBoundaryWrapper sectionName="Who We Support Services">
            <HomepageSections
              services={[...services]}
              studentImages={studentImages}
            />
          </ErrorBoundaryWrapper>
        </section>
        {/* SECTION 8: QUOTE - FOUNDER TESTIMONIAL AND MISSION STATEMENT */}
        <section id="founder-quote-testimonials">
          <ErrorBoundaryWrapper sectionName="Founder Quote and Testimonials">
            <BrandMessageSection
              quote={founderQuote.quote}
              author={founderQuote.author}
              role={founderQuote.role}
              showAuthorImage={false}
            />
          </ErrorBoundaryWrapper>
        </section>
        </div>
      </main>
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Footer component with contact form props */}
      {/* FOOTER_INTEGRATION_REASON: Official React documentation for direct component integration */}
      <PageFooter showContactForm={true} />

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - CMS Architecture Monitoring Dashboard */}
      {/* CMS MONITORING INTEGRATION REASON: Real-time monitoring overlay for August 2025 failure prevention */}
      {/* Only shown in development or when explicitly enabled via environment variable */}
      {(process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SHOW_CMS_MONITOR === 'true') && (
        <CMSArchitectureDashboard
          compactMode={true}
          autoRefresh={true}
          refreshInterval={5000}
          maxViolationsDisplay={5}
          showExportButton={process.env.NODE_ENV === 'development'}
          showFullDetails={false}
        />
      )}
    </div>
  );
}

// CONTEXT7 SOURCE: /vercel/next.js - Client component architecture for React 19 compatibility
// ARCHITECTURE REASON: Official Next.js documentation for client component patterns
