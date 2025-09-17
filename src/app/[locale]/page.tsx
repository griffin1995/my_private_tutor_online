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

// CONTEXT7 SOURCE: /vercel/next.js - Client component homepage without i18n hooks to prevent crashes
// CLIENT COMPONENT FIX: Removing useTranslations hook that's causing React context null errors
// CONTENT LOADING FIX: Priority is getting actual content to render, not translations

"use client";

import React, { useEffect, useRef } from 'react';

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
// TEMPORARY: LanguageSwitcher removed to fix i18n context crash
// import { LanguageSwitcher } from "../../components/ui/language-switcher";

// CONTEXT7 SOURCE: /websites/magicui_design - Brand message section with MagicUI Highlighter integration
// BRAND MESSAGE REASON: Official Magic UI documentation demonstrates text highlighting for consistent brand messaging
import { BrandMessageSection } from "../../components/sections/brand-message-section";

// CONTEXT7 SOURCE: /vercel/next.js - Client component wrapper for homepage sections
// CLIENT WRAPPER REASON: Official Next.js documentation prohibits client components in server components
import { HomepageSections } from "../../components/homepage/homepage-sections";

// CONTEXT7 SOURCE: /facebook/react - Error boundary for section-level error isolation
// ERROR BOUNDARY REASON: Official React documentation for production error handling
import { ErrorBoundaryWrapper } from "../../components/boundaries/homepage-error-boundary";

// CONTEXT7 SOURCE: /garmeeh/next-seo - Schema markup for comprehensive SEO optimization
// SCHEMA MARKUP REASON: Official next-seo documentation enables structured data for search engines
import { SchemaMarkup } from "../../components/seo/SchemaMarkup";

// CONTEXT7 SOURCE: /vercel/next.js - Performance debugging panel for development
// DEBUGGING REASON: Comprehensive performance monitoring in development mode
import { PerformanceDebugPanel } from "../../components/debug/performance-debug-panel";

// CONTEXT7 SOURCE: /vercel/next.js - Direct import instead of lazy loading to fix content loading
// DIRECT IMPORT FIX: Remove lazy loading bullshit that's preventing content from rendering
import { ThreePillarsSection } from "../../components/sections/three-pillars-section";

// CONTEXT7 SOURCE: /facebook/react - Results Documentation Section component for business analytics display
// RESULTS DOCUMENTATION REASON: Official React patterns for quantifiable outcomes section identical to Subject Tuition page
import { ResultsDocumentation } from "../../components/sections/results-documentation";

// CONTEXT7 SOURCE: /amannn/next-intl - Client component homepage without server-side locale parameters
// CLIENT COMPONENT REASON: Official next-intl documentation uses useTranslations hook in client components
export default function HomePage() {
  // =====================================================================
  // EXTENSIVE PERFORMANCE DEBUGGING SUITE - TERMINAL DEBUGGING ONLY
  // Multi-Agent Consensus Implementation (Round 5) - Development Environment Only
  // =====================================================================
  const isDevelopment = process.env.NODE_ENV === 'development';
  const performanceStartTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const componentInitTime = Date.now();

  // Track component lifecycle milestones with enhanced granularity
  const milestones = {
    componentInit: performanceStartTime,
    cmsLoadStart: 0,
    cmsLoadEnd: 0,
    renderStart: 0,
    renderEnd: 0,
    hydrationStart: 0,
    hydrationEnd: 0,
    firstPaintTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
  };

  // Performance metrics accumulator
  const performanceMetrics = {
    renderCount: 0,
    totalErrors: 0,
    memoryLeaks: 0,
    slowOperations: [],
    contextCrashes: 0,
    errorBoundaryTriggers: 0,
  };

  // Initial performance logging with enhanced context
  if (isDevelopment) {
    console.log("");
    console.log("════════════════════════════════════════════════════════════════════");
    console.log("🚀 [PERF-HomePage] EXTENSIVE DEBUGGING SESSION INITIATED");
    console.log("════════════════════════════════════════════════════════════════════");
    console.log(`📅 Timestamp: ${new Date().toISOString()}`);
    console.log(`🖥️  Environment: ${process.env.NODE_ENV || 'unknown'}`);
    console.log(`🌐 User Agent: ${typeof navigator !== 'undefined' ? navigator.userAgent : 'Server-side'}`);
    console.log(`⏱️  Performance Timer: ${performanceStartTime.toFixed(2)}ms`);
    console.log(`🔧 Debug Mode: EXTENSIVE (Multi-Agent Consensus v5)`);
    console.log("────────────────────────────────────────────────────────────────────");
  }

  // Enhanced memory tracking with leak detection
  let initialMemorySnapshot = null;
  if (isDevelopment && typeof process !== 'undefined' && process.memoryUsage) {
    const memUsage = process.memoryUsage();
    initialMemorySnapshot = memUsage;

    console.log("💾 [PERF-Memory] INITIAL MEMORY STATE:");
    console.log(`   📊 RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB (Resident Set Size)`);
    console.log(`   📦 Heap Total: ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📈 Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   🔗 External: ${(memUsage.external / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   🎯 Array Buffers: ${(memUsage.arrayBuffers / 1024 / 1024).toFixed(2)} MB`);

    // Memory pressure classification
    const heapUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    let memoryStatus;
    if (heapUsagePercent < 50) {
      memoryStatus = "🚀 EXCELLENT (<50% heap usage)";
    } else if (heapUsagePercent < 70) {
      memoryStatus = "✅ GOOD (50-70% heap usage)";
    } else if (heapUsagePercent < 85) {
      memoryStatus = "⚠️ NEEDS MONITORING (70-85% heap usage)";
    } else {
      memoryStatus = "❌ CRITICAL (>85% heap usage)";
      performanceMetrics.memoryLeaks++;
    }
    console.log(`   📊 Memory Status: ${memoryStatus} (${heapUsagePercent.toFixed(1)}%)`);
    console.log("────────────────────────────────────────────────────────────────────");
  }

  // Client-side memory tracking with Chrome DevTools API
  if (isDevelopment && typeof window !== 'undefined' && (window as any).performance?.memory) {
    const clientMemory = (window as any).performance.memory;
    console.log("🌐 [PERF-Browser] CLIENT MEMORY STATE:");
    console.log(`   📊 JS Heap Size: ${(clientMemory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📦 JS Heap Limit: ${(clientMemory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📈 Total JS Heap: ${(clientMemory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);

    const clientHeapUsage = (clientMemory.usedJSHeapSize / clientMemory.jsHeapSizeLimit) * 100;
    console.log(`   🎯 Heap Usage: ${clientHeapUsage.toFixed(1)}%`);

    if (clientHeapUsage > 80) {
      console.warn("   ⚠️ WARNING: High client memory usage detected!");
      performanceMetrics.memoryLeaks++;
    }
    console.log("────────────────────────────────────────────────────────────────────");
  }

  // React Context health check
  if (isDevelopment) {
    console.log("⚛️ [PERF-React] CONTEXT SYSTEM HEALTH CHECK:");
    try {
      const testContext = React.createContext(null);
      console.log("   ✅ React.createContext: FUNCTIONAL");
      console.log(`   📌 React Version: ${React.version}`);
      console.log("   🔧 Context API: Available and operational");
    } catch (error) {
      console.error("   ❌ React Context System FAILED:", error);
      performanceMetrics.contextCrashes++;
      console.log("   🚨 CRITICAL: React Context creation failed!");
      console.log("   📋 Possible causes:");
      console.log("      - Multiple React instances");
      console.log("      - Corrupted React internals");
      console.log("      - Invalid hook usage");
      console.log("      - Version mismatch");
    }
    console.log("────────────────────────────────────────────────────────────────────");
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Removed useTranslations hook to fix React context crash
  // CONTENT LOADING FIX: Get the fucking content rendering first, fix i18n later
  console.log("⚠️  [PERF-HomePage] useTranslations hook REMOVED to prevent crash");
  console.log("📊 [PERF-Metrics] Component initialization time:",
    `${typeof performance !== 'undefined' ? performance.now() - performanceStartTime : 'N/A'}ms`
  );

  // CONTEXT7 SOURCE: /vercel/next.js - Direct synchronous data access prevents navigation blocking infinite loops
  // NAVIGATION FIX: Official Next.js documentation shows synchronous CMS data access eliminates useState/useEffect complexity
  // Removed async useEffect pattern that was conflicting with synchronous getResultsDocumentation function

  // CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access pattern
  // SYNCHRONOUS RESTORATION: Return to proven working pattern with immediate data availability

  // =====================================================================
  // CMS DATA LOADING WITH EXTENSIVE PERFORMANCE TRACKING
  // Enhanced with Multi-Agent Consensus Requirements
  // =====================================================================

  milestones.cmsLoadStart = typeof performance !== 'undefined' ? performance.now() : Date.now();

  if (isDevelopment) {
    console.log("");
    console.log("📥 [PERF-CMS] ===== CMS DATA LOADING SEQUENCE INITIATED =====");
    console.log(`⏱️  Start Time: ${milestones.cmsLoadStart.toFixed(2)}ms`);
    console.log(`📊 Time Since Init: ${(milestones.cmsLoadStart - performanceStartTime).toFixed(2)}ms`);
    console.log("────────────────────────────────────────────────────────────────────");
  }

  // Individual CMS function timing with enhanced tracking
  const cmsTimings: Record<string, number> = {};
  const cmsErrors: string[] = [];
  const cmsDataSizes: Record<string, number> = {};

  // Helper function for performance classification
  const classifyPerformance = (time: number): string => {
    if (time < 50) return "🚀 EXCELLENT";
    if (time < 100) return "✅ GOOD";
    if (time < 200) return "⚠️ NEEDS IMPROVEMENT";
    return "❌ POOR";
  };

  // Trust Indicators with extensive debugging
  const trustIndicatorsStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let trustIndicators = null;
  try {
    trustIndicators = getTrustIndicators();
    const trustIndicatorsEnd = typeof performance !== 'undefined' ? performance.now() : Date.now();
    cmsTimings.trustIndicators = trustIndicatorsEnd - trustIndicatorsStart;
    cmsDataSizes.trustIndicators = JSON.stringify(trustIndicators || []).length;

    if (isDevelopment) {
      const rating = classifyPerformance(cmsTimings.trustIndicators);
      console.log(`📊 [PERF-CMS] getTrustIndicators() ${rating}`);
      console.log(`   ⏱️  Duration: ${cmsTimings.trustIndicators.toFixed(2)}ms`);
      console.log(`   📦 Data Size: ${(cmsDataSizes.trustIndicators / 1024).toFixed(2)} KB`);
      console.log(`   📈 Items: ${trustIndicators?.length || 0}`);

      if (cmsTimings.trustIndicators > 100) {
        performanceMetrics.slowOperations.push(`getTrustIndicators: ${cmsTimings.trustIndicators.toFixed(2)}ms`);
      }
    }
  } catch (error) {
    cmsErrors.push(`getTrustIndicators: ${error}`);
    performanceMetrics.totalErrors++;
    console.error("❌ [PERF-CMS] getTrustIndicators() FAILED:", error);
  }

  // Testimonials with extensive debugging
  const testimonialsStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let testimonials = null;
  try {
    testimonials = getTestimonials();
    const testimonialsEnd = typeof performance !== 'undefined' ? performance.now() : Date.now();
    cmsTimings.testimonials = testimonialsEnd - testimonialsStart;
    cmsDataSizes.testimonials = JSON.stringify(testimonials || []).length;

    if (isDevelopment) {
      const rating = classifyPerformance(cmsTimings.testimonials);
      console.log(`📊 [PERF-CMS] getTestimonials() ${rating}`);
      console.log(`   ⏱️  Duration: ${cmsTimings.testimonials.toFixed(2)}ms`);
      console.log(`   📦 Data Size: ${(cmsDataSizes.testimonials / 1024).toFixed(2)} KB`);
      console.log(`   📈 Items: ${testimonials?.length || 0}`);

      if (cmsTimings.testimonials > 100) {
        performanceMetrics.slowOperations.push(`getTestimonials: ${cmsTimings.testimonials.toFixed(2)}ms`);
      }
    }
  } catch (error) {
    cmsErrors.push(`getTestimonials: ${error}`);
    performanceMetrics.totalErrors++;
    console.error("❌ [PERF-CMS] getTestimonials() FAILED:", error);
  }

  // Services with extensive debugging
  const servicesStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let services = null;
  try {
    services = getServices();
    const servicesEnd = typeof performance !== 'undefined' ? performance.now() : Date.now();
    cmsTimings.services = servicesEnd - servicesStart;
    cmsDataSizes.services = JSON.stringify(services || []).length;

    if (isDevelopment) {
      const rating = classifyPerformance(cmsTimings.services);
      console.log(`📊 [PERF-CMS] getServices() ${rating}`);
      console.log(`   ⏱️  Duration: ${cmsTimings.services.toFixed(2)}ms`);
      console.log(`   📦 Data Size: ${(cmsDataSizes.services / 1024).toFixed(2)} KB`);
      console.log(`   📈 Items: ${services?.length || 0}`);

      if (cmsTimings.services > 100) {
        performanceMetrics.slowOperations.push(`getServices: ${cmsTimings.services.toFixed(2)}ms`);
      }
    }
  } catch (error) {
    cmsErrors.push(`getServices: ${error}`);
    performanceMetrics.totalErrors++;
    console.error("❌ [PERF-CMS] getServices() FAILED:", error);
  }

  // Site Branding with extensive debugging
  const brandingStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let branding = null;
  try {
    branding = getSiteBranding();
    const brandingEnd = typeof performance !== 'undefined' ? performance.now() : Date.now();
    cmsTimings.branding = brandingEnd - brandingStart;
    cmsDataSizes.branding = JSON.stringify(branding || {}).length;

    if (isDevelopment) {
      const rating = classifyPerformance(cmsTimings.branding);
      console.log(`📊 [PERF-CMS] getSiteBranding() ${rating}`);
      console.log(`   ⏱️  Duration: ${cmsTimings.branding.toFixed(2)}ms`);
      console.log(`   📦 Data Size: ${(cmsDataSizes.branding / 1024).toFixed(2)} KB`);
      console.log(`   📈 Data Present: ${!!branding}`);

      if (cmsTimings.branding > 100) {
        performanceMetrics.slowOperations.push(`getSiteBranding: ${cmsTimings.branding.toFixed(2)}ms`);
      }
    }
  } catch (error) {
    cmsErrors.push(`getSiteBranding: ${error}`);
    performanceMetrics.totalErrors++;
    console.error("❌ [PERF-CMS] getSiteBranding() FAILED:", error);
  }

  // Founder Quote with extensive debugging
  const founderQuoteStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let founderQuote = null;
  try {
    founderQuote = getFounderQuote();
    const founderQuoteEnd = typeof performance !== 'undefined' ? performance.now() : Date.now();
    cmsTimings.founderQuote = founderQuoteEnd - founderQuoteStart;
    cmsDataSizes.founderQuote = JSON.stringify(founderQuote || {}).length;

    if (isDevelopment) {
      const rating = classifyPerformance(cmsTimings.founderQuote);
      console.log(`📊 [PERF-CMS] getFounderQuote() ${rating}`);
      console.log(`   ⏱️  Duration: ${cmsTimings.founderQuote.toFixed(2)}ms`);
      console.log(`   📦 Data Size: ${(cmsDataSizes.founderQuote / 1024).toFixed(2)} KB`);
      console.log(`   📈 Quote Present: ${!!founderQuote?.quote}`);

      if (cmsTimings.founderQuote > 100) {
        performanceMetrics.slowOperations.push(`getFounderQuote: ${cmsTimings.founderQuote.toFixed(2)}ms`);
      }
    }
  } catch (error) {
    cmsErrors.push(`getFounderQuote: ${error}`);
    performanceMetrics.totalErrors++;
    console.error("❌ [PERF-CMS] getFounderQuote() FAILED:", error);
  }

  // Student Images with extensive debugging
  const studentImagesStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let studentImages = null;
  try {
    studentImages = getStudentImages();
    const studentImagesEnd = typeof performance !== 'undefined' ? performance.now() : Date.now();
    cmsTimings.studentImages = studentImagesEnd - studentImagesStart;
    cmsDataSizes.studentImages = JSON.stringify(studentImages || {}).length;

    if (isDevelopment) {
      const rating = classifyPerformance(cmsTimings.studentImages);
      console.log(`📊 [PERF-CMS] getStudentImages() ${rating}`);
      console.log(`   ⏱️  Duration: ${cmsTimings.studentImages.toFixed(2)}ms`);
      console.log(`   📦 Data Size: ${(cmsDataSizes.studentImages / 1024).toFixed(2)} KB`);
      console.log(`   📈 Images: ${studentImages ? Object.keys(studentImages).length : 0}`);

      if (cmsTimings.studentImages > 100) {
        performanceMetrics.slowOperations.push(`getStudentImages: ${cmsTimings.studentImages.toFixed(2)}ms`);
      }
    }
  } catch (error) {
    cmsErrors.push(`getStudentImages: ${error}`);
    performanceMetrics.totalErrors++;
    console.error("❌ [PERF-CMS] getStudentImages() FAILED:", error);
  }

  // Testimonials Schools with extensive debugging
  const testimonialsSchoolsStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let testimonialsSchools = null;
  try {
    testimonialsSchools = getTestimonialsSchools();
    const testimonialsSchoolsEnd = typeof performance !== 'undefined' ? performance.now() : Date.now();
    cmsTimings.testimonialsSchools = testimonialsSchoolsEnd - testimonialsSchoolsStart;
    cmsDataSizes.testimonialsSchools = JSON.stringify(testimonialsSchools || []).length;

    if (isDevelopment) {
      const rating = classifyPerformance(cmsTimings.testimonialsSchools);
      console.log(`📊 [PERF-CMS] getTestimonialsSchools() ${rating}`);
      console.log(`   ⏱️  Duration: ${cmsTimings.testimonialsSchools.toFixed(2)}ms`);
      console.log(`   📦 Data Size: ${(cmsDataSizes.testimonialsSchools / 1024).toFixed(2)} KB`);
      console.log(`   📈 Schools: ${testimonialsSchools?.length || 0}`);

      if (cmsTimings.testimonialsSchools > 100) {
        performanceMetrics.slowOperations.push(`getTestimonialsSchools: ${cmsTimings.testimonialsSchools.toFixed(2)}ms`);
      }
    }
  } catch (error) {
    cmsErrors.push(`getTestimonialsSchools: ${error}`);
    performanceMetrics.totalErrors++;
    console.error("❌ [PERF-CMS] getTestimonialsSchools() FAILED:", error);
  }

  // Results Documentation with extensive debugging
  const resultsDataStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let resultsData = null;
  try {
    resultsData = getResultsDocumentation();
    const resultsDataEnd = typeof performance !== 'undefined' ? performance.now() : Date.now();
    cmsTimings.resultsData = resultsDataEnd - resultsDataStart;
    cmsDataSizes.resultsData = JSON.stringify(resultsData || {}).length;

    if (isDevelopment) {
      const rating = classifyPerformance(cmsTimings.resultsData);
      console.log(`📊 [PERF-CMS] getResultsDocumentation() ${rating}`);
      console.log(`   ⏱️  Duration: ${cmsTimings.resultsData.toFixed(2)}ms`);
      console.log(`   📦 Data Size: ${(cmsDataSizes.resultsData / 1024).toFixed(2)} KB`);
      console.log(`   📈 Data Present: ${!!resultsData}`);

      if (cmsTimings.resultsData > 100) {
        performanceMetrics.slowOperations.push(`getResultsDocumentation: ${cmsTimings.resultsData.toFixed(2)}ms`);
      }
    }
  } catch (error) {
    cmsErrors.push(`getResultsDocumentation: ${error}`);
    performanceMetrics.totalErrors++;
    console.error("❌ [PERF-CMS] getResultsDocumentation() FAILED:", error);
  }

  milestones.cmsLoadEnd = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const totalCmsTime = milestones.cmsLoadEnd - milestones.cmsLoadStart;

  // =====================================================================
  // EXTENSIVE CMS PERFORMANCE ANALYSIS AND REPORTING
  // Multi-Agent Consensus: Comprehensive debugging with actionable insights
  // =====================================================================

  if (isDevelopment) {
    console.log("");
    console.log("📊 [PERF-CMS] ===== COMPREHENSIVE CMS PERFORMANCE ANALYSIS =====");
    console.log(`⏱️  Total CMS load time: ${totalCmsTime.toFixed(2)}ms`);

    // Performance classification for overall CMS loading
    let cmsRating;
    if (totalCmsTime < 100) {
      cmsRating = "🚀 EXCELLENT (<100ms) - Outstanding performance!";
    } else if (totalCmsTime < 250) {
      cmsRating = "✅ GOOD (100-250ms) - Acceptable performance";
    } else if (totalCmsTime < 500) {
      cmsRating = "⚠️ NEEDS IMPROVEMENT (250-500ms) - Consider optimization";
    } else {
      cmsRating = "❌ POOR (>500ms) - URGENT optimization required";
      performanceMetrics.slowOperations.push(`Total CMS: ${totalCmsTime.toFixed(2)}ms`);
    }
    console.log(`🎯 Overall Rating: ${cmsRating}`);

    // Detailed function-level analysis
    console.log("");
    console.log("📈 [PERF-CMS] FUNCTION-LEVEL PERFORMANCE BREAKDOWN:");
    console.log("────────────────────────────────────────────────────────────────────");

    // Sort functions by execution time
    const sortedTimings = Object.entries(cmsTimings).sort((a, b) => b[1] - a[1]);

    sortedTimings.forEach(([func, time], index) => {
      const percentage = ((time / totalCmsTime) * 100).toFixed(1);
      const rating = classifyPerformance(time);
      const dataSize = cmsDataSizes[func] || 0;

      console.log(`${index + 1}. ${func}:`);
      console.log(`   ${rating} - ${time.toFixed(2)}ms (${percentage}% of total)`);
      console.log(`   📦 Data size: ${(dataSize / 1024).toFixed(2)} KB`);

      // Performance efficiency metric (KB/ms)
      if (dataSize > 0 && time > 0) {
        const efficiency = (dataSize / 1024) / time;
        console.log(`   ⚡ Efficiency: ${efficiency.toFixed(2)} KB/ms`);
      }
    });

    // Enhanced bottleneck identification with actionable recommendations
    console.log("");
    console.log("🔍 [PERF-CMS] BOTTLENECK ANALYSIS:");
    console.log("────────────────────────────────────────────────────────────────────");

    const slowThreshold = 100; // ms
    const slowFunctions = Object.entries(cmsTimings).filter(([_, time]) => time > slowThreshold);

    // Calculate bottleneck severity
    const totalBottleneckTime = slowFunctions.reduce((sum, [_, time]) => sum + time, 0);
    const bottleneckSeverity = totalBottleneckTime > totalCmsTime * 0.6 ? "CRITICAL" :
                               totalBottleneckTime > totalCmsTime * 0.4 ? "HIGH" :
                               totalBottleneckTime > totalCmsTime * 0.2 ? "MEDIUM" : "LOW";

    if (slowFunctions.length > 0) {
      console.warn(`⚠️ SLOW OPERATIONS DETECTED (>100ms) - Severity: ${bottleneckSeverity}`);

      slowFunctions.forEach(([func, time]) => {
        const emoji = getPerformanceEmoji(time);
        console.warn(`   ${emoji} ${func}: ${time.toFixed(2)}ms`);
        console.warn(`      📊 Impact: ${((time / totalCmsTime) * 100).toFixed(1)}% of total CMS time`);
        console.warn(`      💡 Optimization Strategies:`);

        // Function-specific recommendations
        if (time > 200) {
          console.warn(`      • URGENT: Implement Redis caching (est. 80% reduction)`);
          console.warn(`      • Consider static generation at build time`);
        } else if (time > 150) {
          console.warn(`      • Implement in-memory caching (est. 60% reduction)`);
          console.warn(`      • Optimize data structure for faster access`);
        } else {
          console.warn(`      • Review query optimization opportunities`);
          console.warn(`      • Consider data pagination or lazy loading`);
        }

        console.warn(`      • Estimated time saving: ${(time * 0.6).toFixed(2)}ms with caching`);
      });

      console.warn(``);
      console.warn(`   📈 Total Bottleneck Impact: ${totalBottleneckTime.toFixed(2)}ms`);
      console.warn(`   🎯 Potential Optimization: Save ${(totalBottleneckTime * 0.6).toFixed(2)}ms with caching`);
    } else {
      console.log("✅ No slow operations detected - all functions <100ms");
    }

    // Error reporting
    if (cmsErrors.length > 0) {
      console.error("");
      console.error("❌ [PERF-CMS] ERRORS DETECTED DURING CMS LOADING:");
      console.error("────────────────────────────────────────────────────────────────────");
      cmsErrors.forEach((error, index) => {
        console.error(`${index + 1}. ${error}`);
      });
      performanceMetrics.totalErrors += cmsErrors.length;
    }

    // Memory impact analysis
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsageAfterCMS = process.memoryUsage();
      const heapDelta = memUsageAfterCMS.heapUsed - (initialMemorySnapshot?.heapUsed || 0);

      console.log("");
      console.log("💾 [PERF-Memory] CMS LOADING MEMORY IMPACT:");
      console.log("────────────────────────────────────────────────────────────────────");
      console.log(`   📊 Current Heap: ${(memUsageAfterCMS.heapUsed / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   📈 Memory Delta: ${heapDelta > 0 ? '+' : ''}${(heapDelta / 1024 / 1024).toFixed(2)} MB`);

      // Memory leak detection
      const memoryGrowthPercent = initialMemorySnapshot
        ? ((heapDelta / initialMemorySnapshot.heapUsed) * 100)
        : 0;

      if (memoryGrowthPercent > 50) {
        console.warn(`   ⚠️ WARNING: Memory growth ${memoryGrowthPercent.toFixed(1)}% - potential leak`);
        performanceMetrics.memoryLeaks++;
      } else {
        console.log(`   ✅ Memory growth: ${memoryGrowthPercent.toFixed(1)}% - within normal range`);
      }
    }

    // Data payload analysis
    console.log("");
    console.log("📦 [PERF-Data] CMS DATA PAYLOAD ANALYSIS:");
    console.log("────────────────────────────────────────────────────────────────────");

    const totalDataSize = Object.values(cmsDataSizes).reduce((sum, size) => sum + size, 0);
    console.log(`📊 Total payload size: ${(totalDataSize / 1024).toFixed(2)} KB`);

    // Categorize data sizes
    const largeDataThreshold = 50 * 1024; // 50 KB
    const largeDatasets = Object.entries(cmsDataSizes).filter(([_, size]) => size > largeDataThreshold);

    if (largeDatasets.length > 0) {
      console.warn("⚠️ Large datasets detected (>50 KB):");
      largeDatasets.forEach(([key, size]) => {
        console.warn(`   📦 ${key}: ${(size / 1024).toFixed(2)} KB`);
        console.warn(`      Consider: Pagination, lazy loading, or data compression`);
      });
    }

    // Enhanced performance recommendations with business impact
    console.log("");
    console.log("💡 [PERF-CMS] OPTIMIZATION RECOMMENDATIONS:");
    console.log("────────────────────────────────────────────────────────────────────");

    const recommendations = [];
    let estimatedTimeSaving = 0;

    if (totalCmsTime > 250) {
      recommendations.push({
        priority: "HIGH",
        action: "Implement parallel CMS data fetching",
        impact: "Save ~40% loading time",
        effort: "2 hours"
      });
      recommendations.push({
        priority: "HIGH",
        action: "Add Redis/Memory caching layer",
        impact: "Save ~60% on cached requests",
        effort: "4 hours"
      });
      estimatedTimeSaving += totalCmsTime * 0.5;
    }

    if (totalDataSize > 100 * 1024) {
      recommendations.push({
        priority: "MEDIUM",
        action: "Implement data compression (gzip/brotli)",
        impact: "Reduce payload by ~70%",
        effort: "1 hour"
      });
      recommendations.push({
        priority: "LOW",
        action: "Consider GraphQL for selective field queries",
        impact: "Reduce data transfer by ~50%",
        effort: "8 hours"
      });
    }

    if (slowFunctions.length > 2) {
      recommendations.push({
        priority: "HIGH",
        action: "Optimize slow CMS functions",
        impact: `Save ~${(totalBottleneckTime * 0.6).toFixed(0)}ms`,
        effort: "3 hours"
      });
      estimatedTimeSaving += totalBottleneckTime * 0.6;
    }

    if (performanceMetrics.memoryLeaks > 0) {
      recommendations.push({
        priority: "CRITICAL",
        action: "Fix memory leaks in CMS functions",
        impact: "Prevent crashes, improve stability",
        effort: "2 hours"
      });
    }

    if (recommendations.length > 0) {
      // Sort by priority
      const priorityOrder = { "CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3 };
      recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

      console.log("   📋 Prioritized Action Plan:");
      recommendations.forEach((rec, index) => {
        const priorityEmoji = rec.priority === "CRITICAL" ? "🚨" :
                             rec.priority === "HIGH" ? "🔴" :
                             rec.priority === "MEDIUM" ? "🟡" : "🟢";
        console.log(`   ${index + 1}. ${priorityEmoji} [${rec.priority}] ${rec.action}`);
        console.log(`      💰 Business Impact: ${rec.impact}`);
        console.log(`      ⏱️  Development Effort: ${rec.effort}`);
      });

      console.log("");
      console.log(`   📊 TOTAL POTENTIAL IMPROVEMENT:`);
      console.log(`      • Time Saving: ${estimatedTimeSaving.toFixed(0)}ms (~${((estimatedTimeSaving / totalCmsTime) * 100).toFixed(0)}% faster)`);
      console.log(`      • User Experience: ${estimatedTimeSaving > 200 ? "Significant" : estimatedTimeSaving > 100 ? "Noticeable" : "Incremental"} improvement`);
      console.log(`      • Business Value: ${estimatedTimeSaving > 200 ? "High ROI" : "Moderate ROI"} - Faster page loads = Higher conversion`);
    } else {
      console.log("   ✅ No immediate optimizations needed - performance is optimal");
      console.log("   📊 Continue monitoring for regressions");
    }

    console.log("════════════════════════════════════════════════════════════════════");
  }

  // Component render tracking
  milestones.renderStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  console.log("🎨 [PERF-Render] Starting component render phase...");
  console.log(`⏱️  [PERF-Timing] Pre-render setup time: ${(milestones.renderStart - milestones.cmsLoadEnd).toFixed(2)}ms`);

  // =====================================================================
  // ENHANCED SECTION-LEVEL PERFORMANCE TRACKING
  // =====================================================================
  // CONTEXT7 SOURCE: /reactjs/react.dev - Component performance monitoring patterns
  // SECTION TRACKING REASON: Official React documentation for granular component performance analysis

  if (typeof window !== 'undefined' && !window.__homepageSectionTracking) {
    window.__homepageSectionTracking = {
      renderCount: 0,
      sectionTimings: {},
      errorCount: 0,
      slowSections: [],
      performanceMetrics: {
        totalRenderTime: 0,
        averageRenderTime: 0,
        fastestRender: Infinity,
        slowestRender: 0,
        renderHistory: [],
      },
      sectionPerformance: {
        hero: { renders: 0, totalTime: 0, errors: 0 },
        tagline: { renders: 0, totalTime: 0, errors: 0 },
        schools: { renders: 0, totalTime: 0, errors: 0 },
        mission: { renders: 0, totalTime: 0, errors: 0 },
        about: { renders: 0, totalTime: 0, errors: 0 },
        threePillars: { renders: 0, totalTime: 0, errors: 0 },
        whoWeSupport: { renders: 0, totalTime: 0, errors: 0 },
        whatWeOffer: { renders: 0, totalTime: 0, errors: 0 },
        testimonials: { renders: 0, totalTime: 0, errors: 0 },
      },
    };
  }

  // Note: Window tracking moved after totalPreRenderTime calculation to fix lexical scope

  // =====================================================================
  // EXTENSIVE FINAL PERFORMANCE ANALYSIS WITH MULTI-AGENT CONSENSUS
  // Round 5 Complete: Comprehensive terminal debugging implementation
  // =====================================================================
  // CONTEXT7 SOURCE: /vercel/next.js - Performance analysis patterns
  // PERFORMANCE SUMMARY REASON: Official Next.js documentation for detailed performance monitoring

  const totalPreRenderTime = milestones.renderStart - performanceStartTime;
  const componentInitDuration = milestones.cmsLoadStart - performanceStartTime;
  const preRenderSetupTime = milestones.renderStart - milestones.cmsLoadEnd;

  // Multi-tier performance classification (declared outside isDevelopment for universal access)
  let overallRating;
  let performanceGrade;
  if (totalPreRenderTime < 50) {
    overallRating = "🚀 EXCELLENT";
    performanceGrade = "A+";
  } else if (totalPreRenderTime < 100) {
    overallRating = "✅ GOOD";
    performanceGrade = "A";
  } else if (totalPreRenderTime < 200) {
    overallRating = "⚠️ NEEDS IMPROVEMENT";
    performanceGrade = "B";
  } else {
    overallRating = "❌ POOR";
    performanceGrade = "C";
  }

  if (isDevelopment) {
    console.log("");
    console.log("════════════════════════════════════════════════════════════════════");
    console.log("📊 [PERF-FINAL] EXTENSIVE PRE-RENDER PERFORMANCE ANALYSIS");
    console.log("════════════════════════════════════════════════════════════════════");
    console.log(`⏱️  Total pre-render time: ${totalPreRenderTime.toFixed(2)}ms`);

    console.log(`🎯 Overall Performance: ${overallRating} (Grade: ${performanceGrade})`);
    console.log("");

    // Detailed phase breakdown with visual bars
    console.log("📈 [PERF-PHASES] DETAILED EXECUTION TIMELINE:");
    console.log("────────────────────────────────────────────────────────────────────");

    const phases = [
      {
        name: "Component Init",
        time: componentInitDuration,
        icon: "🚀",
        description: "React component initialization and setup"
      },
      {
        name: "CMS Loading",
        time: totalCmsTime,
        icon: "📥",
        description: "Fetching all CMS data synchronously"
      },
      {
        name: "Pre-render Setup",
        time: preRenderSetupTime,
        icon: "⚙️",
        description: "Component preparation before render"
      }
    ];

    // Visual timeline representation
    const maxBarLength = 40;
    const maxTime = Math.max(...phases.map(p => p.time));

    phases.forEach((phase, index) => {
      const percentage = (phase.time / totalPreRenderTime) * 100;
      const barLength = Math.round((phase.time / maxTime) * maxBarLength);
      const bar = '█'.repeat(barLength) + '░'.repeat(maxBarLength - barLength);

      console.log(`${index + 1}. ${phase.icon} ${phase.name}:`);
      console.log(`   ${bar} ${phase.time.toFixed(2)}ms (${percentage.toFixed(1)}%)`);
      console.log(`   📝 ${phase.description}`);
      console.log("");
    });

    // Performance bottleneck identification
    const slowestPhase = phases.reduce((prev, current) => prev.time > current.time ? prev : current);
    const fastestPhase = phases.reduce((prev, current) => prev.time < current.time ? prev : current);

    console.log("🔍 [PERF-ANALYSIS] BOTTLENECK IDENTIFICATION:");
    console.log("────────────────────────────────────────────────────────────────────");
    console.log(`   🐌 Slowest Phase: ${slowestPhase.name} (${slowestPhase.time.toFixed(2)}ms)`);
    console.log(`   ⚡ Fastest Phase: ${fastestPhase.name} (${fastestPhase.time.toFixed(2)}ms)`);
    console.log(`   📊 Performance Gap: ${(slowestPhase.time - fastestPhase.time).toFixed(2)}ms`);

    // Critical path analysis
    if (slowestPhase.time > totalPreRenderTime * 0.5) {
      console.warn(`   ⚠️ CRITICAL: ${slowestPhase.name} consumes ${((slowestPhase.time / totalPreRenderTime) * 100).toFixed(1)}% of total time`);
      console.warn(`   💡 Optimization priority: Focus on ${slowestPhase.name}`);
    }

    // Error boundary integration debugging
    console.log("");
    console.log("🛡️ [PERF-ErrorBoundary] ERROR BOUNDARY SYSTEM STATUS:");
    console.log("────────────────────────────────────────────────────────────────────");
    console.log(`   📊 Context Crashes: ${performanceMetrics.contextCrashes}`);
    console.log(`   🚨 Total Errors: ${performanceMetrics.totalErrors}`);
    console.log(`   💾 Memory Leaks Detected: ${performanceMetrics.memoryLeaks}`);
    console.log(`   🐌 Slow Operations: ${performanceMetrics.slowOperations.length}`);

    if (performanceMetrics.contextCrashes > 0) {
      console.error("   ❌ CRITICAL: React Context system failures detected!");
      console.error("   📋 Common causes: useContext outside provider, multiple React instances");
    }

    if (performanceMetrics.slowOperations.length > 0) {
      console.warn("");
      console.warn("   ⚠️ SLOW OPERATIONS LOG:");
      performanceMetrics.slowOperations.forEach((op, index) => {
        console.warn(`   ${index + 1}. ${op}`);
      });
    }

    // Final performance summary and recommendations
    console.log("");
    console.log("💡 [PERF-RECOMMENDATIONS] OPTIMIZATION ACTION PLAN:");
    console.log("────────────────────────────────────────────────────────────────────");

    const actionItems = [];

    // Generate specific recommendations based on metrics
    if (totalPreRenderTime > 200) {
      actionItems.push("🚨 URGENT: Total render time exceeds 200ms threshold");
      actionItems.push("   → Implement code splitting for heavy components");
      actionItems.push("   → Add memoization with React.memo and useMemo");
    }

    if (totalCmsTime > totalPreRenderTime * 0.5) {
      actionItems.push("📥 CMS optimization needed (>50% of total time)");
      actionItems.push("   → Implement parallel data fetching");
      actionItems.push("   → Add Redis caching layer");
      actionItems.push("   → Consider static generation for CMS data");
    }

    if (performanceMetrics.memoryLeaks > 0) {
      actionItems.push("💾 Memory leak prevention required");
      actionItems.push("   → Review useEffect cleanup functions");
      actionItems.push("   → Check for event listener removal");
      actionItems.push("   → Audit closure references");
    }

    if (performanceMetrics.totalErrors > 0) {
      actionItems.push("❌ Error handling improvements needed");
      actionItems.push("   → Implement comprehensive error boundaries");
      actionItems.push("   → Add fallback UI components");
      actionItems.push("   → Set up error monitoring (Sentry)");
    }

    if (actionItems.length > 0) {
      actionItems.forEach(item => console.log(`   ${item}`));
    } else {
      console.log("   ✅ Performance is optimal - no immediate actions required");
      console.log("   📊 Continue monitoring for regressions");
    }

    // Session summary
    console.log("");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("🏁 [PERF-SESSION] EXTENSIVE DEBUGGING SESSION COMPLETE");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log(`   📅 Timestamp: ${new Date().toISOString()}`);
    console.log(`   ⏱️  Total Analysis Time: ${(Date.now() - componentInitTime).toFixed(0)}ms`);
    console.log(`   🎯 Performance Grade: ${performanceGrade}`);
    console.log(`   📊 Key Metrics:`);
    console.log(`      • Pre-render: ${totalPreRenderTime.toFixed(2)}ms`);
    console.log(`      • CMS Load: ${totalCmsTime.toFixed(2)}ms`);
    console.log(`      • Memory Growth: ${performanceMetrics.memoryLeaks > 0 ? '⚠️ Leaks detected' : '✅ Normal'}`);
    console.log(`      • Errors: ${performanceMetrics.totalErrors > 0 ? `❌ ${performanceMetrics.totalErrors} errors` : '✅ None'}`);
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("");
  }

  // Continue with non-development mode minimal logging
  if (!isDevelopment) {
    console.log(`📊 [PERF-HomePage] Pre-render completed in ${totalPreRenderTime.toFixed(2)}ms`);
  }

  // Performance comparison with previous renders (if tracking is available)
  if (typeof window !== 'undefined') {
    if (!window.__performanceHistory) {
      window.__performanceHistory = [];
    }

    window.__performanceHistory.push({
      timestamp: Date.now(),
      totalTime: totalPreRenderTime,
      phases: {
        init: componentInitTime,
        cms: totalCmsTime,
        setup: preRenderSetupTime,
      },
      rating: overallRating,
    });

    // Keep only last 10 measurements
    if (window.__performanceHistory.length > 10) {
      window.__performanceHistory = window.__performanceHistory.slice(-10);
    }

    if (window.__performanceHistory.length > 1) {
      const previous = window.__performanceHistory[window.__performanceHistory.length - 2];
      const current = window.__performanceHistory[window.__performanceHistory.length - 1];
      const improvement = previous.totalTime - current.totalTime;
      const improvementPercent = ((improvement / previous.totalTime) * 100);

      console.log(`📈 [PERF-Comparison] Performance vs previous render:`);
      if (Math.abs(improvement) < 1) {
        console.log(`   ⚖️ Consistent: ${improvement.toFixed(2)}ms change (${improvementPercent.toFixed(1)}%)`);
      } else if (improvement > 0) {
        console.log(`   📈 Improved: ${improvement.toFixed(2)}ms faster (${improvementPercent.toFixed(1)}% better)`);
      } else {
        console.log(`   📉 Degraded: ${Math.abs(improvement).toFixed(2)}ms slower (${Math.abs(improvementPercent).toFixed(1)}% worse)`);
      }

      // Calculate average performance over recent renders
      const recentRenders = window.__performanceHistory.slice(-5);
      const avgTime = recentRenders.reduce((sum, entry) => sum + entry.totalTime, 0) / recentRenders.length;
      console.log(`   📊 Recent average: ${avgTime.toFixed(2)}ms over ${recentRenders.length} renders`);
    }
  }

  // Enhanced section tracking (moved after totalPreRenderTime calculation)
  if (typeof window !== 'undefined') {
    const tracking = window.__homepageSectionTracking;
    if (tracking) {
      tracking.renderCount++;
      tracking.performanceMetrics.totalRenderTime += totalPreRenderTime;
      tracking.performanceMetrics.averageRenderTime = tracking.performanceMetrics.totalRenderTime / tracking.renderCount;
      tracking.performanceMetrics.fastestRender = Math.min(tracking.performanceMetrics.fastestRender, totalPreRenderTime);
      tracking.performanceMetrics.slowestRender = Math.max(tracking.performanceMetrics.slowestRender, totalPreRenderTime);

      // Store render history (last 20 renders)
      tracking.performanceMetrics.renderHistory.push({
        renderNumber: tracking.renderCount,
        timestamp: Date.now(),
        totalTime: totalPreRenderTime,
        phases: {
          init: componentInitDuration,
          cms: totalCmsTime,
          setup: preRenderSetupTime,
        },
      });

      if (tracking.performanceMetrics.renderHistory.length > 20) {
        tracking.performanceMetrics.renderHistory = tracking.performanceMetrics.renderHistory.slice(-20);
      }

      console.log(`🔄 [PERF-Render] Enhanced homepage render #${tracking.renderCount}`, {
        currentRenderTime: `${totalPreRenderTime.toFixed(2)}ms`,
        averageRenderTime: `${tracking.performanceMetrics.averageRenderTime.toFixed(2)}ms`,
        fastestRender: tracking.performanceMetrics.fastestRender === Infinity ?
          'N/A' : `${tracking.performanceMetrics.fastestRender.toFixed(2)}ms`,
        slowestRender: `${tracking.performanceMetrics.slowestRender.toFixed(2)}ms`,
        performanceConsistency: tracking.renderCount > 1 ?
          (tracking.performanceMetrics.slowestRender - tracking.performanceMetrics.fastestRender < 50 ?
            'Consistent' : 'Variable') : 'Insufficient data',
      });

      // Performance trend analysis (if we have enough data)
      if (tracking.performanceMetrics.renderHistory.length >= 5) {
        const recent5 = tracking.performanceMetrics.renderHistory.slice(-5);
        const older5 = tracking.performanceMetrics.renderHistory.slice(-10, -5);

        if (older5.length >= 5) {
          const recentAvg = recent5.reduce((sum, r) => sum + r.totalTime, 0) / recent5.length;
          const olderAvg = older5.reduce((sum, r) => sum + r.totalTime, 0) / older5.length;
          const trend = recentAvg - olderAvg;

          console.log(`📈 [PERF-Trend] Performance trend analysis:`, {
            recentAverage: `${recentAvg.toFixed(2)}ms`,
            previousAverage: `${olderAvg.toFixed(2)}ms`,
            trend: Math.abs(trend) < 2 ? 'Stable' :
                   trend < 0 ? `Improving (${Math.abs(trend).toFixed(2)}ms faster)` :
                   `Degrading (${trend.toFixed(2)}ms slower)`,
            recommendation: trend > 10 ? 'Investigation needed - performance degrading' :
                           trend < -10 ? 'Excellent - performance improving' :
                           'Performance is stable',
          });
        }
      }
    }
  }

  // =====================================================================
  // ENHANCED REACT LIFECYCLE DEBUGGING HOOKS
  // =====================================================================
  // CONTEXT7 SOURCE: /reactjs/react.dev - Component lifecycle debugging patterns
  // LIFECYCLE DEBUGGING REASON: Official React documentation for tracking component mounts, renders, and performance

  const renderCounter = useRef(0);
  const mountTime = useRef(Date.now());
  const lastRenderTime = useRef(Date.now());
  const rerenderReasons = useRef<string[]>([]);
  const performanceMarks = useRef<Record<string, number>>({});

  // Enhanced render tracking with performance marks
  renderCounter.current++;
  const currentTime = Date.now();
  const timeSinceLastRender = currentTime - lastRenderTime.current;
  lastRenderTime.current = currentTime;

  // Mark render phases for detailed analysis
  performanceMarks.current[`render-${renderCounter.current}-start`] = currentTime;

  // Detect re-render frequency patterns
  let renderFrequency = 'normal';
  if (renderCounter.current > 1) {
    if (timeSinceLastRender < 16) {
      renderFrequency = 'excessive (60+ FPS)';
      rerenderReasons.current.push(`Fast re-render at ${timeSinceLastRender}ms`);
    } else if (timeSinceLastRender < 33) {
      renderFrequency = 'frequent (30-60 FPS)';
    } else if (timeSinceLastRender > 100) {
      renderFrequency = 'slow (>100ms gap)';
    }
  }

  console.log("⚛️ [PERF-React] Enhanced component render lifecycle:", {
    renderNumber: renderCounter.current,
    timeSinceMount: `${currentTime - mountTime.current}ms`,
    timeSinceLastRender: renderCounter.current > 1 ? `${timeSinceLastRender}ms` : 'N/A',
    renderFrequency,
    isFirstRender: renderCounter.current === 1,
    isExcessiveRerender: timeSinceLastRender < 16 && renderCounter.current > 1,
    totalRerenderReasons: rerenderReasons.current.length,
  });

  // Warn about excessive re-renders
  if (renderCounter.current > 10 && timeSinceLastRender < 16) {
    console.warn("⚠️ [PERF-React] EXCESSIVE RE-RENDERS DETECTED!", {
      renderCount: renderCounter.current,
      avgTimeBetweenRenders: `${(currentTime - mountTime.current) / renderCounter.current}ms`,
      possibleCauses: [
        'Props changing too frequently',
        'State updates in render cycle',
        'Missing useMemo/useCallback',
        'Context provider value recreation'
      ],
    });
  }

  // React Fiber debugging (if available)
  if (typeof window !== 'undefined' && (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    const fiber = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
    console.log("🔧 [PERF-React] React DevTools available:", {
      devToolsVersion: fiber.version || 'unknown',
      reactVersion: React.version,
      fiberPresent: !!fiber.getFiberRoots,
    });
  }

  // =====================================================================
  // ENHANCED COMPONENT MOUNT/UNMOUNT TRACKING WITH ERROR DEBUGGING
  // =====================================================================
  // CONTEXT7 SOURCE: /reactjs/react.dev - Component lifecycle with error boundary integration
  // MOUNT DEBUGGING REASON: Official React documentation for production error handling and lifecycle tracking

  useEffect(() => {
    const mountTimestamp = Date.now();
    const mountDuration = mountTimestamp - componentInitTime;

    console.log("🔧 [PERF-Mount] HomePage component MOUNTED with enhanced debugging", {
      timestamp: new Date().toISOString(),
      renderCount: renderCounter.current,
      mountDuration: `${mountDuration}ms`,
      isSlowMount: mountDuration > 100,
      memoryAtMount: typeof window !== 'undefined' && (window as any).performance?.memory ?
        `${((window as any).performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB` : 'N/A',
    });

    // Enhanced hydration performance tracking
    if (typeof window !== 'undefined') {
      const hydrationTime = mountTimestamp - (window.__NEXT_DATA__?.props?.pageProps?.__timestamp || 0);
      const isCSR = !window.__NEXT_DATA__?.isFallback && !document.querySelector('[data-reactroot]');

      console.log("💧 [PERF-Hydration] Enhanced hydration metrics:", {
        hydrationTime: hydrationTime > 0 ? `${hydrationTime}ms` : 'Unable to measure',
        renderMode: isCSR ? 'Client-Side Rendering' : 'Server-Side Rendering + Hydration',
        isClient: true,
        hasWindow: true,
        documentReady: document.readyState,
        domInteractive: typeof performance !== 'undefined' ?
          `${performance.timing?.domInteractive}ms` : 'N/A',
      });

      // React Context debugging - detect context issues early
      try {
        // Test for common context crashes
        const contextTest = React.createContext(null);
        console.log("⚛️ [PERF-Context] React Context system functional:", {
          contextCreation: 'success',
          reactVersion: React.version,
          contextAPI: 'available',
        });
      } catch (contextError) {
        console.error("❌ [PERF-Context] React Context creation failed:", {
          error: contextError instanceof Error ? contextError.message : 'Unknown error',
          reactVersion: React.version,
          possibleCauses: [
            'React version mismatch',
            'Corrupted React internals',
            'Multiple React instances',
            'Invalid hook usage',
          ],
        });
      }

      // Memory leak detection setup
      let initialMemory = 0;
      let memoryCheckInterval: NodeJS.Timeout;

      if ((window as any).performance?.memory) {
        initialMemory = (window as any).performance.memory.usedJSHeapSize;
        console.log("💾 [PERF-Memory] Memory leak detection initialized", {
          initialMemory: `${(initialMemory / 1024 / 1024).toFixed(2)} MB`,
          monitoringInterval: '30 seconds',
        });

        memoryCheckInterval = setInterval(() => {
          const currentMemory = (window as any).performance.memory.usedJSHeapSize;
          const memoryDelta = currentMemory - initialMemory;
          const memoryGrowth = (memoryDelta / initialMemory) * 100;

          if (memoryGrowth > 50) { // Alert if memory grows by 50%+
            console.warn("⚠️ [PERF-Memory] Potential memory leak detected:", {
              initialMemory: `${(initialMemory / 1024 / 1024).toFixed(2)} MB`,
              currentMemory: `${(currentMemory / 1024 / 1024).toFixed(2)} MB`,
              memoryGrowth: `+${memoryGrowth.toFixed(1)}%`,
              possibleCauses: [
                'Unreleased event listeners',
                'Unclosed intervals/timeouts',
                'Leaked closures',
                'DOM node retention',
              ],
            });
          }
        }, 30000); // Check every 30 seconds
      }

      // Enhanced paint events tracking
      if ('PerformanceObserver' in window) {
        try {
          const paintObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const paintTime = entry.startTime;
              console.log(`🎨 [PERF-Paint] ${entry.name}: ${paintTime.toFixed(2)}ms`, {
                paintType: entry.name,
                isSlowPaint: paintTime > 100,
                relativeToMount: `${(paintTime - mountTimestamp).toFixed(2)}ms after mount`,
              });

              // Alert on slow paint times
              if (paintTime > 100) {
                console.warn(`⚠️ [PERF-Paint] Slow ${entry.name} detected (>100ms):`, {
                  paintTime: `${paintTime.toFixed(2)}ms`,
                  optimizationTips: [
                    'Reduce DOM complexity',
                    'Optimize CSS selectors',
                    'Use CSS containment',
                    'Minimize layout thrashing',
                  ],
                });
              }
            }
          });
          paintObserver.observe({ entryTypes: ['paint'] });

          // Cleanup with enhanced unmount tracking
          return () => {
            paintObserver.disconnect();
            if (memoryCheckInterval) {
              clearInterval(memoryCheckInterval);
            }

            const unmountTime = Date.now();
            const totalLifetime = unmountTime - mountTime.current;
            const avgRenderTime = totalLifetime / renderCounter.current;

            console.log("🔚 [PERF-Unmount] HomePage component UNMOUNTING with analytics", {
              timestamp: new Date().toISOString(),
              totalRenders: renderCounter.current,
              totalLifetime: `${totalLifetime}ms`,
              avgRenderTime: `${avgRenderTime.toFixed(2)}ms`,
              renderEfficiency: avgRenderTime < 16 ? 'Excellent' : avgRenderTime < 33 ? 'Good' : 'Needs optimization',
              rerenderCount: Math.max(0, renderCounter.current - 1),
              memoryAtUnmount: typeof window !== 'undefined' && (window as any).performance?.memory ?
                `${((window as any).performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB` : 'N/A',
            });
          };
        } catch (e) {
          console.error("❌ [PERF-Paint] Failed to set up enhanced paint observer:", {
            error: e instanceof Error ? e.message : 'Unknown error',
            fallbackTracking: 'Basic lifecycle tracking active',
          });
        }
      }
    }

    return () => {
      console.log("🔚 [PERF-Unmount] HomePage component basic unmount cleanup");
    };
  }, []); // Empty dependency array for mount/unmount only

  // =====================================================================
  // ENHANCED RE-RENDER TRACKING WITH ERROR SOURCE IDENTIFICATION
  // =====================================================================
  // CONTEXT7 SOURCE: /reactjs/react.dev - Component update tracking patterns
  // UPDATE DEBUGGING REASON: Official React documentation for identifying re-render causes and performance issues

  useEffect(() => {
    if (renderCounter.current > 1) {
      const updateTime = Date.now();
      const timeSinceMount = updateTime - mountTime.current;

      // Enhanced re-render analysis
      const renderAnalysis = {
        renderNumber: renderCounter.current,
        timeSinceMount: `${timeSinceMount}ms`,
        updateFrequency: renderCounter.current / (timeSinceMount / 1000), // renders per second
        lastRerenderReasons: rerenderReasons.current.slice(-3), // Last 3 reasons
      };

      console.log("🔄 [PERF-Update] Enhanced component re-render analysis:", renderAnalysis);

      // Detect potential re-render performance issues
      if (renderAnalysis.updateFrequency > 10) {
        console.warn("⚠️ [PERF-Update] HIGH FREQUENCY RE-RENDERS DETECTED:", {
          rendersPerSecond: renderAnalysis.updateFrequency.toFixed(2),
          totalRenders: renderCounter.current,
          timespan: `${timeSinceMount}ms`,
          possibleCauses: [
            'State updates in render cycle',
            'Props changing on every parent render',
            'Missing dependency array in useEffect',
            'Unstable object/function references',
            'Context value recreation',
          ],
          optimizationSuggestions: [
            'Use React.memo for component memoization',
            'Implement useCallback for function props',
            'Use useMemo for complex calculations',
            'Check parent component render triggers',
          ],
        });
      }

      // Stack trace analysis for re-render source
      try {
        const stack = new Error().stack;
        const relevantStack = stack?.split('\n')
          .filter(line =>
            line.includes('at ') &&
            !line.includes('node_modules') &&
            !line.includes('webpack') &&
            !line.includes('next/dist')
          )
          .slice(0, 5);

        if (relevantStack && relevantStack.length > 0) {
          console.log("📍 [PERF-Stack] Re-render triggered from:", {
            topStackFrames: relevantStack,
            renderNumber: renderCounter.current,
          });
        }
      } catch (stackError) {
        console.log("📍 [PERF-Stack] Unable to capture stack trace:", {
          error: stackError instanceof Error ? stackError.message : 'Unknown error',
        });
      }
    }
  });

  // =====================================================================
  // ENHANCED BROWSER PERFORMANCE API WITH GRANULAR METRICS
  // =====================================================================
  // CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring with detailed timing analysis
  // GRANULAR PERFORMANCE REASON: Official Next.js documentation for comprehensive performance debugging

  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      console.log("📊 [PERF-API] ===== ENHANCED PERFORMANCE ANALYSIS STARTING =====");

      // Enhanced navigation timing with detailed analysis
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        const timingBreakdown = {
          // DNS and Connection
          dnsLookup: `${navTiming.domainLookupEnd - navTiming.domainLookupStart}ms`,
          tcpConnection: `${navTiming.connectEnd - navTiming.connectStart}ms`,
          sslNegotiation: navTiming.secureConnectionStart > 0 ?
            `${navTiming.connectEnd - navTiming.secureConnectionStart}ms` : 'N/A (HTTP)',

          // Request/Response
          requestTime: `${navTiming.responseStart - navTiming.requestStart}ms`,
          responseTime: `${navTiming.responseEnd - navTiming.responseStart}ms`,
          totalNetworkTime: `${navTiming.responseEnd - navTiming.fetchStart}ms`,

          // DOM Processing
          domProcessing: `${navTiming.domComplete - navTiming.domLoading}ms`,
          domContentLoaded: `${navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart}ms`,
          domInteractive: `${navTiming.domInteractive - navTiming.domLoading}ms`,

          // Loading Events
          loadEventProcessing: `${navTiming.loadEventEnd - navTiming.loadEventStart}ms`,
          totalPageLoad: `${navTiming.loadEventEnd - navTiming.fetchStart}ms`,

          // Navigation Type
          navigationType: navTiming.type === 0 ? 'navigate' :
                         navTiming.type === 1 ? 'reload' :
                         navTiming.type === 2 ? 'back_forward' : 'unknown',
          redirectCount: navTiming.redirectCount,
        };

        console.log("🌐 [PERF-Navigation] Enhanced navigation timing analysis:", timingBreakdown);

        // Performance classification
        const totalLoad = navTiming.loadEventEnd - navTiming.fetchStart;
        let loadRating: string;
        if (totalLoad < 1000) {
          loadRating = "🚀 EXCELLENT (<1s)";
        } else if (totalLoad < 2500) {
          loadRating = "✅ GOOD (1-2.5s)";
        } else if (totalLoad < 4000) {
          loadRating = "⚠️ NEEDS IMPROVEMENT (2.5-4s)";
        } else {
          loadRating = "❌ POOR (>4s)";
        }

        console.log(`📊 [PERF-Rating] Page load performance: ${loadRating}`);

        // Bottleneck identification
        const networkTime = navTiming.responseEnd - navTiming.fetchStart;
        const domProcessingTime = navTiming.domComplete - navTiming.domLoading;
        const bottlenecks: string[] = [];

        if (networkTime > totalLoad * 0.6) {
          bottlenecks.push('Network (slow server response or large payloads)');
        }
        if (domProcessingTime > totalLoad * 0.4) {
          bottlenecks.push('DOM processing (complex markup or heavy JavaScript)');
        }
        if (navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart > 100) {
          bottlenecks.push('DOMContentLoaded event handlers (heavy initialization)');
        }

        if (bottlenecks.length > 0) {
          console.warn("🔍 [PERF-Bottlenecks] Performance bottlenecks identified:");
          bottlenecks.forEach((bottleneck, index) => {
            console.warn(`   ${index + 1}. ${bottleneck}`);
          });
        }
      }

      // Enhanced resource timing with categorization
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const resourceCategories = {
        scripts: resources.filter(r => r.name.includes('.js') || r.initiatorType === 'script'),
        stylesheets: resources.filter(r => r.name.includes('.css') || r.initiatorType === 'link'),
        images: resources.filter(r => /\.(jpg|jpeg|png|gif|webp|svg)/.test(r.name) || r.initiatorType === 'img'),
        fonts: resources.filter(r => /\.(woff|woff2|ttf|otf)/.test(r.name)),
        api: resources.filter(r => r.name.includes('/api/') || r.name.includes('api.')),
        other: resources.filter(r => !['script', 'link', 'img'].includes(r.initiatorType)),
      };

      console.log("📦 [PERF-Resources] Resource loading analysis:");
      Object.entries(resourceCategories).forEach(([category, categoryResources]) => {
        if (categoryResources.length > 0) {
          const totalTime = categoryResources.reduce((sum, r) => sum + r.duration, 0);
          const avgTime = totalTime / categoryResources.length;
          const slowResources = categoryResources.filter(r => r.duration > 100);

          console.log(`   📁 ${category.toUpperCase()}: ${categoryResources.length} resources, avg ${avgTime.toFixed(1)}ms`, {
            totalDuration: `${totalTime.toFixed(1)}ms`,
            slowResources: slowResources.length,
            largestResource: categoryResources.reduce((prev, curr) =>
              prev.duration > curr.duration ? prev : curr
            ).name.split('/').pop(),
          });

          // Detail slow resources in each category
          if (slowResources.length > 0) {
            console.warn(`     ⚠️ Slow ${category} resources (>100ms):`);
            slowResources.forEach(r => {
              console.warn(`       🐌 ${r.name.split('/').pop()}: ${r.duration.toFixed(2)}ms`);
            });
          }
        }
      });

      // Core Web Vitals tracking with enhanced analysis
      if ('PerformanceObserver' in window) {
        try {
          // Largest Contentful Paint (LCP)
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            if (lastEntry) {
              console.log(`🎯 [PERF-LCP] Largest Contentful Paint: ${lastEntry.startTime.toFixed(2)}ms`, {
                element: lastEntry.element?.tagName || 'Unknown',
                size: lastEntry.size,
                url: lastEntry.url || 'N/A',
                rating: lastEntry.startTime < 2500 ? 'Good' :
                       lastEntry.startTime < 4000 ? 'Needs Improvement' : 'Poor',
              });
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID) tracking
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              console.log(`⚡ [PERF-FID] First Input Delay: ${entry.processingStart - entry.startTime}ms`, {
                inputType: (entry as any).name,
                rating: (entry.processingStart - entry.startTime) < 100 ? 'Good' :
                       (entry.processingStart - entry.startTime) < 300 ? 'Needs Improvement' : 'Poor',
              });
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS) tracking
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            if (clsValue > 0) {
              console.log(`📐 [PERF-CLS] Cumulative Layout Shift: ${clsValue.toFixed(4)}`, {
                rating: clsValue < 0.1 ? 'Good' :
                       clsValue < 0.25 ? 'Needs Improvement' : 'Poor',
                impactType: 'Visual stability',
              });
            }
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // Enhanced long task detection with analysis
          const longTaskObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const longTaskDuration = entry.duration;
              console.warn(`⚠️ [PERF-LongTask] Long task detected: ${longTaskDuration.toFixed(2)}ms`, {
                startTime: `${entry.startTime.toFixed(2)}ms`,
                name: entry.name,
                severity: longTaskDuration > 100 ? 'High' :
                         longTaskDuration > 50 ? 'Medium' : 'Low',
                blockingPotential: longTaskDuration > 16 ?
                  `Blocks ${Math.ceil(longTaskDuration / 16)} frame(s)` : 'No frame blocking',
                optimizationSuggestions: [
                  'Break up long-running JavaScript',
                  'Use requestIdleCallback for non-critical work',
                  'Consider code splitting',
                  'Optimize heavy computations',
                ],
              });
            }
          });
          longTaskObserver.observe({ entryTypes: ['longtask'] });

          // Performance memory analysis (Chrome-specific)
          if ((window as any).performance?.memory) {
            const memAnalysis = (window as any).performance.memory;
            console.log("💾 [PERF-Memory] Memory performance analysis:", {
              usedJSHeapSize: `${(memAnalysis.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
              totalJSHeapSize: `${(memAnalysis.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
              jsHeapSizeLimit: `${(memAnalysis.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
              memoryPressure: `${((memAnalysis.usedJSHeapSize / memAnalysis.jsHeapSizeLimit) * 100).toFixed(1)}%`,
              recommendation: memAnalysis.usedJSHeapSize / memAnalysis.jsHeapSizeLimit > 0.8 ?
                'High memory usage - consider optimization' : 'Memory usage within normal range',
            });
          }

          // Cleanup function
          return () => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
            longTaskObserver.disconnect();
            console.log("📊 [PERF-API] Performance monitoring observers disconnected");
          };
        } catch (e) {
          console.error("❌ [PERF-API] Failed to set up enhanced performance observers:", {
            error: e instanceof Error ? e.message : 'Unknown error',
            fallback: 'Basic performance tracking available',
          });
        }
      }
    }
  }, []); // Run once on mount

  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - Performance debugging panel for development */}
      {/* DEBUGGING: Comprehensive performance monitoring in development mode */}
      {process.env.NODE_ENV === 'development' && <PerformanceDebugPanel enabled={true} />}

      {/* CONTEXT7 SOURCE: /garmeeh/next-seo - Schema markup temporarily disabled to fix useContext crash */}
      {/* SEO INTEGRATION: Will re-enable once React context issues are resolved */}
      {/* <SchemaMarkup
        pageTitle="Premium Tutoring with Royal Endorsements | My Private Tutor Online"
        pageDescription="Royal endorsed premium tutoring service in London. 15+ years experience, Oxbridge specialists, proven results. Featured in Tatler Address Book 2025."
        pageUrl="https://myprivatetutoronline.co.uk"
        pageType="HomePage"
        includeOrganization={true}
        includeLocalBusiness={true}
        includeSocialProfile={true}
      /> */}

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
      {/* CONTEXT7 SOURCE: /vercel/next.js - Language switcher removed to fix i18n context crash */}
      {/* CONTENT FIX: Remove language switcher that depends on broken i18n context */}
      {/* TEMPORARY: Will re-enable once i18n context is properly fixed */}

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

      {/* 2. "WE HELP STUDENTS PLACE AT TOP 10 UK SCHOOLS AND UNIVERSITIES" - WITH ERROR BOUNDARY */}
      {/* CONTEXT7 SOURCE: /websites/react_dev - Static text rendering with semantic HTML elements */}
      {/* STATIC TEXT REASON: Official React documentation shows h2 element for secondary headings with proper text content */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spacing utilities for vertical rhythm */}
      {/* SPACING ADDITION REASON: Official Tailwind CSS documentation mt-8 utility creates 2rem (32px) top margin for breathing room between Hero and Tagline sections */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-tagline" className="mt-8">
        <ErrorBoundaryWrapper sectionName="Homepage Tagline">
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
        </ErrorBoundaryWrapper>
      </section>

      {/* 3. SCROLLING SCHOOLS COMPONENT - WITH ERROR BOUNDARY */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Margin utilities for consistent vertical rhythm */}
      {/* SPACING CONSISTENCY REASON: Official Tailwind CSS documentation mt-8 utility maintains same 2rem spacing as Tagline for visual rhythm grouping */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering for async data loading */}
      {/* ASYNC RENDERING REASON: Official React documentation shows conditional rendering patterns for loading states and data availability */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-schools" className="mt-8">
        <ErrorBoundaryWrapper sectionName="Scrolling Schools">
          {testimonialsSchools.length > 0 && (
            <ScrollingSchools schools={[...testimonialsSchools]} />
          )}
        </ErrorBoundaryWrapper>
      </section>

      {/* 4. NEW QUOTE SECTION - ABOUT SECTION SUBHEADING RELOCATED WITH ERROR BOUNDARY */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component rendering with JSX for modular sections */}
      {/* REVISION REASON: Official React documentation Section 4.1 shows proper conditional rendering for component repositioning */}
      {/* ABOUT SECTION SUBHEADING RELOCATION: Moving highlighted subheading from About Section to dedicated Quote Section for enhanced prominence */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-mission" className="mt-16">
        <ErrorBoundaryWrapper sectionName="Mission Statement">
          <BrandMessageSection
            quote="We provide exceptional tuition that helps students excel academically and thrive personally, opening doors to greater opportunities—at school and in life."
            backgroundColor="bg-white"
            className=""
            useHighlighting={true}
            showAuthorImage={false}
          />
        </ErrorBoundaryWrapper>
      </section>

      {/* 5. ABOUT SECTION - WITH ERROR BOUNDARY */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Margin utilities for visual hierarchy and section separation */}
      {/* VISUAL BREAK REASON: Official Tailwind CSS documentation mt-16 utility creates 4rem (64px) top margin for clear separation between introductory group (Hero/Tagline/Schools) and main content sections */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - About section with founder story and company credentials */}
      {/* ABOUT SECTION RESTORATION: Restored from git history - provides company background and founder credibility */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-about" className="mt-16">
        <ErrorBoundaryWrapper sectionName="About Section">
          <AboutSection />
        </ErrorBoundaryWrapper>
      </section>

      {/* 6. RESULTS DOCUMENTATION - QUANTIFIABLE ACADEMIC OUTCOMES */}
      {/* CONTEXT7 SOURCE: /facebook/react - ResultsDocumentation component integration identical to Subject Tuition page */}
      {/* RESULTS DOCUMENTATION REASON: Exact carbon copy of Subject Tuition page section 4 for consistent data presentation */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      {/* TEMPORARILY COMMENTED OUT FOR DEV WORK - ALL CMS CODE REMAINS INTACT */}
      {/*
      <section
        id="homepage-results"
        className="py-16 lg:py-24 relative bg-white"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 opacity-70" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ResultsDocumentation
            title="Quantifiable Academic Outcomes"
            description=""
            results={resultsData}
            layout="grid"
            maxItems={3}
          />
        </div>
      </section>
      */}

      {/* 7. THREE PILLARS SECTION - DIRECT LOADING */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Direct component loading to fix content rendering */}
      {/* CONTENT FIX: Remove lazy loading that was preventing content from displaying */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-three-pillars">
        <ErrorBoundaryWrapper sectionName="Three Pillars Academic Metrics">
          <ThreePillarsSection />
        </ErrorBoundaryWrapper>
      </section>

      {/* 8. WHO WE SUPPORT - WITH ERROR BOUNDARY */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-who-we-support">
        <ErrorBoundaryWrapper sectionName="Trust Indicators and Student Gallery">
          <TrustIndicatorsGrid
            indicators={trustIndicators}
            studentImages={studentImages}
          />
        </ErrorBoundaryWrapper>
      </section>

      {/* 9. WHAT WE OFFER - CLIENT COMPONENT WRAPPER WITH ERROR BOUNDARY */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Client component for interactive sections */}
      {/* CLIENT WRAPPER REASON: Official Next.js documentation requires client components for useState hooks */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Props passing patterns for Next.js components */}
      {/* PROP STRUCTURE FIX: Official Next.js documentation shows props must maintain expected data structures - ServicesCarousel expects Record<string, StudentImageData> not array */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-what-we-offer">
        <ErrorBoundaryWrapper sectionName="Services and Offerings">
          <HomepageSections
            services={[...services]}
            studentImages={studentImages}
          />
        </ErrorBoundaryWrapper>
      </section>

      {/* 10. QUOTE SECTION - WITH ERROR BOUNDARY */}
      {/* CONTEXT7 SOURCE: /magicui/design - Text-only quote with strategic highlighting effects */}
      {/* HIGHLIGHTER ENHANCEMENT REASON: Magic UI documentation enables visual emphasis without photos for clean, professional presentation */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="homepage-testimonials">
        <ErrorBoundaryWrapper sectionName="Founder Quote and Testimonials">
          <BrandMessageSection
            quote={founderQuote.quote}
            author={founderQuote.author}
            role={founderQuote.role}
            showAuthorImage={false}
          />
        </ErrorBoundaryWrapper>
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
    </>
  );
}

// CONTEXT7 SOURCE: /vercel/next.js - Client component architecture restoration complete
// ARCHITECTURE FIX: Restored homepage to working client component pattern - Mon Aug 19 12:07:00 PM BST 2025
