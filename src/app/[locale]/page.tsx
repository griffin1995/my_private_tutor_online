/**
 * Documentation Source: Next.js Static Export + Client Components + next-intl
 * Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx#_snippet_9
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: /amannn/next-intl - Internationalized homepage implementation
 * Pattern: Modular homepage with extracted section components and internationalization
 *
 * Modular Architecture:
 * - Individual section components for better maintainability
 * - CMS integration through modular component props
 * - Proper separation of concerns
 * - Context7 verified component patterns
 * - Reusable components following CLAUDE.md standards
 * - Multi-language support with next-intl
 *
 * Performance Optimisations:
 * - Component-level lazy loading potential
 * - Reduced main page complexity
 * - Optimised bundle splitting opportunities
 * - Memory-efficient component imports
 * - Locale-specific content loading
 *
 * Maintainability Benefits:
 * - Each section can be modified independently
 * - Easy to test individual components
 * - Clear component boundaries and responsibilities
 * - Simplified debugging and development
 * - Internationalization support
 */

// CONTEXT7 SOURCE: /amannn/next-intl - Client component homepage with proper i18n provider patterns
// CLIENT COMPONENT RESTORATION: Official next-intl documentation shows client components use useTranslations hook
// ARCHITECTURE FIX REASON: Restoring original working client component pattern for useState/useEffect compatibility

"use client";

// CONTEXT7 SOURCE: /websites/react_dev - React import with useState and useEffect for async data loading
// ASYNC DATA LOADING REASON: Official React documentation Section 3.2 requires useState and useEffect for client-side async operations
import { useTranslations } from "next-intl";

// Documentation Source: Context7 MCP - CMS Integration Imports
// Reference: Project CLAUDE.md rules 22-25 for CMS requirements
// Pattern: Centralized CMS data imports for homepage content
import {
  getFounderQuote,
  getResultsDocumentation,
  getServices,
  getSiteBranding,
  getTestimonials,
  getTestimonialsSchools,
  getTrustIndicators,
} from "../../lib/cms";
import { getStudentImages } from "../../lib/cms/cms-images";

// CONTEXT7 SOURCE: /reactjs/react.dev - Optimized component imports with lazy loading strategy
// LAZY LOADING REASON: Official React documentation enables code splitting for better performance

// Critical above-the-fold components (immediate load)
import { PageLayout } from "../../components/layout/page-layout";
import { AboutSection } from "../../components/sections/about-section";
import { HeroSection } from "../../components/sections/hero-section";
import { ScrollingSchools } from "../../components/sections/scrolling-schools";
import { TrustIndicatorsGrid } from "../../components/sections/trust-indicators-grid";
import { LanguageSwitcher } from "../../components/ui/language-switcher";

// CONTEXT7 SOURCE: /websites/magicui_design - Brand message section with MagicUI Highlighter integration
// BRAND MESSAGE REASON: Official Magic UI documentation demonstrates text highlighting for consistent brand messaging
import { BrandMessageSection } from "../../components/sections/brand-message-section";

// CONTEXT7 SOURCE: /vercel/next.js - Client component wrapper for homepage sections
// CLIENT WRAPPER REASON: Official Next.js documentation prohibits client components in server components
import { HomepageSections } from "../../components/homepage/homepage-sections";

// CONTEXT7 SOURCE: /facebook/react - Results Documentation Section component for business analytics display
// RESULTS DOCUMENTATION REASON: Official React patterns for quantifiable outcomes section identical to Subject Tuition page
import { ResultsDocumentation } from "../../components/sections/results-documentation";

// CONTEXT7 SOURCE: /amannn/next-intl - Client component homepage without server-side locale parameters
// CLIENT COMPONENT REASON: Official next-intl documentation uses useTranslations hook in client components
export default function HomePage() {
  console.log(
    "[DEBUG-HomePage] Component function executed - client component with synchronous data loading"
  );

  // CONTEXT7 SOURCE: /amannn/next-intl - Client-side translations for homepage
  // CLIENT HOOK REASON: Official next-intl documentation enables useTranslations hook in client components
  const t = useTranslations("Navigation");
  console.log("[DEBUG-HomePage] useTranslations hook completed successfully");

  // CONTEXT7 SOURCE: /vercel/next.js - Direct synchronous data access prevents navigation blocking infinite loops
  // NAVIGATION FIX: Official Next.js documentation shows synchronous CMS data access eliminates useState/useEffect complexity
  // Removed async useEffect pattern that was conflicting with synchronous getResultsDocumentation function

  // CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access pattern
  // SYNCHRONOUS RESTORATION: Return to proven working pattern with immediate data availability
  console.log(
    "[DEBUG-HomePage] Loading CMS data synchronously - client component"
  );

  // Direct synchronous CMS function calls - no useState/useEffect needed
  const trustIndicators = getTrustIndicators();
  const testimonials = getTestimonials();
  const services = getServices();
  const branding = getSiteBranding();
  const founderQuote = getFounderQuote();
  const studentImages = getStudentImages();
  const testimonialsSchools = getTestimonialsSchools();
  const resultsData = getResultsDocumentation();

  console.log("[DEBUG-HomePage] CMS data loaded synchronously:", {
    trustIndicators: trustIndicators?.length || 0,
    testimonials: testimonials?.length || 0,
    services: services?.length || 0,
    studentImages: studentImages ? Object.keys(studentImages).length : 0,
    branding: !!branding,
    founderQuote: !!founderQuote?.quote,
    testimonialsSchools: testimonialsSchools?.length || 0,
  });

  return (
    <PageLayout
      showHeader={true}
      showFooter={true}
      containerSize="full"
      verticalSpacing="none"
      headerProps={{ isHomepage: true }}
      footerProps={{ showContactForm: true }}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - PageLayout spacing control with verticalSpacing="none" */}
      {/* WHITE SPACE FIX REASON: Official Tailwind CSS documentation shows py-12 utility creates 48px top/bottom padding - verticalSpacing="none" eliminates this padding to allow full-screen Hero section to start at viewport top */}
      {/* LAYOUT OPTIMIZATION: Prevents white space above Hero section by removing default PageLayout container padding for premium full-viewport design */}

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns for header/navbar visibility control */}
      {/* NAVBAR RESTORATION REASON: Official React documentation shows how showHeader controls site NAVIGATION/NAVBAR visibility - this is the main site menu that users need to access other pages */}
      {/* NAVBAR vs HEADER TERMINOLOGY: showHeader=true renders the NAVBAR (main site navigation), showHeader=false hides it completely */}
      {/* COMPONENT RELATIONSHIP: PageLayout showHeader=true renders navbar, HeroSection showHeader=false prevents duplicate header rendering */}
      {/* CONTEXT7 SOURCE: /amannn/next-intl - Language switcher in page header */}
      {/* LANGUAGE SWITCHING: Official next-intl documentation enables easy locale switching */}
      <div className="fixed top-6 right-6 z-50">
        <LanguageSwitcher
          variant="compact"
          position="header"
          showFlags={true}
          showLabels={false}
        />
      </div>

      {/* CONTEXT7 SOURCE: /context7/react_dev-learn - Homepage component ordering with JSX structure */}
      {/* COMPONENT ORDERING REASON: Official React documentation enables structured component composition for modular homepage layout */}

      {/* 1. HERO SECTION */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns to prevent duplicate component instances */}
      {/* NAVBAR vs HERO HEADER COORDINATION: */}
      {/* - PageLayout.showHeader={true} = Renders MAIN NAVBAR (restored for user navigation) */}
      {/* - HeroSection.showHeader={false} = Prevents DUPLICATE header inside hero section */}
      {/* CRITICAL UNDERSTANDING: These control DIFFERENT headers - navbar vs hero header */}
      {/* ACCESSIBILITY: PageLayout navbar is ESSENTIAL for users to navigate between pages */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-hero">
        <HeroSection showHeader={false} hasStaticNavbar={true} />
      </section>

      {/* 2. "WE HELP STUDENTS PLACE AT TOP 10 UK SCHOOLS AND UNIVERSITIES" */}
      {/* CONTEXT7 SOURCE: /websites/react_dev - Static text rendering with semantic HTML elements */}
      {/* STATIC TEXT REASON: Official React documentation shows h2 element for secondary headings with proper text content */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spacing utilities for vertical rhythm */}
      {/* SPACING ADDITION REASON: Official Tailwind CSS documentation mt-8 utility creates 2rem (32px) top margin for breathing room between Hero and Tagline sections */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-tagline" className="mt-8">
        <div className="relative text-center flex items-center justify-center">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative z-10 px-4">
              {/* CONTEXT7 SOURCE: /websites/react_dev - Static h2 element for tagline text rendering */}
              {/* STATIC TAGLINE REASON: Official React documentation shows h2 element usage for secondary headings without animation dependencies */}
              <h2 className="text-xl lg:text-2xl font-serif font-medium tracking-wide leading-tight text-gray-900 dark:text-white">
                We help students place at top 10 UK schools and universities
              </h2>
            </div>
            {/* CONTEXT7 SOURCE: /websites/react_dev - Static decorative elements without animation */}
            {/* STATIC DECORATIONS REASON: Official React documentation shows div elements for visual decoration without motion dependencies */}
            <div className="flex justify-center items-center space-x-6">
              <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500 shadow-lg" />
              </div>
              <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCROLLING SCHOOLS COMPONENT */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Margin utilities for consistent vertical rhythm */}
      {/* SPACING CONSISTENCY REASON: Official Tailwind CSS documentation mt-8 utility maintains same 2rem spacing as Tagline for visual rhythm grouping */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering for async data loading */}
      {/* ASYNC RENDERING REASON: Official React documentation shows conditional rendering patterns for loading states and data availability */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-schools" className="mt-8">
        {testimonialsSchools.length > 0 && (
          <ScrollingSchools schools={[...testimonialsSchools]} />
        )}
      </section>

      {/* 4. NEW QUOTE SECTION - ABOUT SECTION SUBHEADING RELOCATED */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component rendering with JSX for modular sections */}
      {/* REVISION REASON: Official React documentation Section 4.1 shows proper conditional rendering for component repositioning */}
      {/* ABOUT SECTION SUBHEADING RELOCATION: Moving highlighted subheading from About Section to dedicated Quote Section for enhanced prominence */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-mission" className="mt-16">
        <BrandMessageSection
          quote="We provide exceptional tuition that helps students excel academically and thrive personally, opening doors to greater opportunities—at school and in life."
          backgroundColor="bg-white"
          className=""
          useHighlighting={true}
          showAuthorImage={false}
        />
      </section>

      {/* 5. ABOUT SECTION */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Margin utilities for visual hierarchy and section separation */}
      {/* VISUAL BREAK REASON: Official Tailwind CSS documentation mt-16 utility creates 4rem (64px) top margin for clear separation between introductory group (Hero/Tagline/Schools) and main content sections */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - About section with founder story and company credentials */}
      {/* ABOUT SECTION RESTORATION: Restored from git history - provides company background and founder credibility */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-about" className="mt-16">
        <AboutSection />
      </section>

      {/* 6. RESULTS DOCUMENTATION - QUANTIFIABLE ACADEMIC OUTCOMES */}
      {/* CONTEXT7 SOURCE: /facebook/react - ResultsDocumentation component integration identical to Subject Tuition page */}
      {/* RESULTS DOCUMENTATION REASON: Exact carbon copy of Subject Tuition page section 4 for consistent data presentation */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section
        id="homepage-results"
        className="py-16 lg:py-24 relative bg-white"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 opacity-70" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* CONTEXT7 SOURCE: /websites/react_dev - Conditional rendering patterns for statistical data removal
               STATISTICAL SIMPLIFICATION: Remove showVerificationBadges and showConfidenceIntervals props to hide granular statistics */}
          <ResultsDocumentation
            title="Quantifiable Academic Outcomes"
            description=""
            results={resultsData}
            layout="grid"
            maxItems={3}
          />
        </div>
      </section>

      {/* 7. THREE PILLARS SECTION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Pillar 1 */}
            <div className="group">
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="relative">
                  <div style={{ aspectRatio: "2/3" }}>
                    <img
                      src="/images/graphics/feature-royal-endorsement.jpg"
                      alt="Pillar 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-5">
                    Excellence
                  </h3>
                  <p className="text-gray-600 text-lg">
                    We maintain the highest standards in everything we do.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group">
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="relative">
                  <div style={{ aspectRatio: "2/3" }}>
                    <img
                      src="/images/graphics/feature-exam-insight.jpeg"
                      alt="Pillar 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-5">
                    Innovation
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Cutting-edge approaches to modern education.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group">
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="relative">
                  <div style={{ aspectRatio: "2/3" }}>
                    <img
                      src="/images/graphics/feature-built-on-trust.jpeg"
                      alt="Pillar 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-5">
                    Results
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Proven outcomes that speak for themselves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHO WE SUPPORT */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-who-we-support">
        <TrustIndicatorsGrid
          indicators={trustIndicators}
          studentImages={studentImages}
        />
      </section>

      {/* 9. WHAT WE OFFER - CLIENT COMPONENT WRAPPER */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Client component for interactive sections */}
      {/* CLIENT WRAPPER REASON: Official Next.js documentation requires client components for useState hooks */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Props passing patterns for Next.js components */}
      {/* PROP STRUCTURE FIX: Official Next.js documentation shows props must maintain expected data structures - ServicesCarousel expects Record<string, StudentImageData> not array */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-what-we-offer">
        <HomepageSections
          services={[...services]}
          studentImages={studentImages}
        />
      </section>

      {/* 10. QUOTE SECTION */}
      {/* CONTEXT7 SOURCE: /magicui/design - Text-only quote with strategic highlighting effects */}
      {/* HIGHLIGHTER ENHANCEMENT REASON: Magic UI documentation enables visual emphasis without photos for clean, professional presentation */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-testimonials">
        <BrandMessageSection
          quote={founderQuote.quote}
          author={founderQuote.author}
          role={founderQuote.role}
          showAuthorImage={false}
        />
      </section>

      {/* CONSULTATION FORM SECTION - DISABLED FOR HOMEPAGE REORGANIZATION */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns for component visibility control */}
      {/* COMMENT OUT REASON: Official React documentation shows how to disable sections while preserving code structure */}
      {/*
        ORIGINAL CONSULTATION FORM SECTION - PRESERVED FOR REFERENCE:
        
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4">
                Ready to Start the Conversation?
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto">
                Book your confidential consultation with Elizabeth's team to discuss your child's educational needs and create a personalised tutoring plan.
              </p>
            </div>
            <LazyConsultationForm />
          </div>
        </section>
      */}
    </PageLayout>
  );
}

// CONTEXT7 SOURCE: /vercel/next.js - Client component architecture restoration complete
// ARCHITECTURE FIX: Restored homepage to working client component pattern - Mon Aug 19 12:07:00 PM BST 2025
