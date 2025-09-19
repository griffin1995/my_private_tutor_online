/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Homepage restructuring and componentization implementation
 * COMPONENT EXTRACTION REASON: Official React documentation patterns for modular section components
 * REVISION REASON: Complete homepage restructuring to achieve desired 8-section structure with full modularity
 */

"use client";

import React from "react";

// CONTEXT7 SOURCE: /reactjs/react.dev - CMS Integration Imports
// CMS DATA LOADING REASON: Official React patterns for synchronous content access
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

// CONTEXT7 SOURCE: /reactjs/react.dev - Component imports for homepage sections
// COMPONENT IMPORT REASON: Official React documentation for modular component architecture
import { PageLayout } from "../../components/layout/page-layout";
import { AboutSection } from "../../components/sections/about-section";
import { HeroSection } from "../../components/sections/hero-section";
import { ScrollingSchools } from "../../components/sections/scrolling-schools";
import { TrustIndicatorsGrid } from "../../components/sections/trust-indicators-grid";
import { BrandMessageSection } from "../../components/sections/brand-message-section";
import { HomepageSections } from "../../components/homepage/homepage-sections";
import { ErrorBoundaryWrapper } from "../../components/boundaries/homepage-error-boundary";
import { ResultsDocumentation } from "../../components/sections/results-documentation";

// CONTEXT7 SOURCE: /reactjs/react.dev - Extracted section components for homepage componentization
// COMPONENT EXTRACTION REASON: Official React documentation patterns for modular section components
import { TaglineSection } from "../../components/sections/tagline-section";
import { OpeningStatementSection } from "../../components/sections/opening-statement-section";
import { FounderIntroductionSection } from "../../components/sections/founder-introduction-section";

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
  const resultsData = getResultsDocumentation();

  return (
    <>
      <PageLayout
        showHeader={true}
        showFooter={true}
        containerSize="full"
        verticalSpacing="none"
        headerProps={{ isHomepage: true }}
        footerProps={{ showContactForm: true }}
      >
        {/* SECTION 1: HERO - PREMIUM TUTORING LANDING */}
        <section id="hero-premium-tutoring-landing">
          <HeroSection showHeader={false} hasStaticNavbar={true} />
        </section>

        {/* SECTION 2: TAGLINE - TOP 10 UK SCHOOLS PLACEMENT */}
        <TaglineSection />

        {/* SECTION 2.2: SCROLLING SHIELDS - PRESTIGIOUS INSTITUTION SHOWCASE */}
        <section id="social-proof-scrolling-schools" className="mt-8">
          <ErrorBoundaryWrapper sectionName="Scrolling Schools">
            {testimonialsSchools.length > 0 && (
              <ScrollingSchools schools={[...testimonialsSchools]} />
            )}
          </ErrorBoundaryWrapper>
        </section>

        {/* SECTION 3: OPENING STATEMENT - EXCEPTIONAL TUITION */}
        <OpeningStatementSection />

        {/* SECTION 4.1: INTRODUCTION - COMPANY BACKGROUND */}
        <ErrorBoundaryWrapper sectionName="About Section">
          <AboutSection />
        </ErrorBoundaryWrapper>

        {/* SECTION 4.2: FOUNDER INTRODUCTION - MEET ELIZABETH VIDEO */}
        <FounderIntroductionSection />

        {/* SECTION 5: QUANTIFIABLE RESULTS - ACADEMIC OUTCOMES */}
        {resultsData && resultsData.length > 0 && (
          <section id="quantifiable-results-documentation">
            <ErrorBoundaryWrapper sectionName="Results Documentation">
              <ResultsDocumentation
                results={resultsData}
                layout="grid"
                maxItems={3}
                title="Results That Drive Decisions"
                description="Verifiable outcomes and competitive advantages that justify premium investment"
              />
            </ErrorBoundaryWrapper>
          </section>
        )}

        {/* SECTION 6: TRUST INDICATORS - CREDIBILITY AND SOCIAL PROOF */}
        <section id="trust-indicators-social-proof">
          <ErrorBoundaryWrapper sectionName="Trust Indicators">
            <TrustIndicatorsGrid trustIndicators={trustIndicators} />
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
      </PageLayout>
    </>
  );
}

// CONTEXT7 SOURCE: /vercel/next.js - Client component architecture for React 19 compatibility
// ARCHITECTURE REASON: Official Next.js documentation for client component patterns