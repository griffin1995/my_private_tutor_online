/**
 * Documentation Source: Next.js 14 App Router Layout
 * Reference: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * Reference: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * Reference: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 * 
 * Pattern: Root Layout with Metadata and Font Optimization
 * Architecture:
 * - Server Component (no "use client" directive)
 * - Metadata export for SEO optimization
 * - Font optimization with next/font/google
 * - Global providers wrapped around children
 * 
 * Best Practices Applied:
 * - metadataBase for absolute URL generation
 * - Comprehensive OpenGraph and Twitter cards
 * - Font variables for CSS custom properties
 * - British English locale (en_GB)
 */

import type { Metadata } from "next";
import { Source_Serif_4, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";

// Import performance components directly for server components
import ResourcePreloader from '@/components/performance/resource-preloader';

/**
 * Vercel Analytics and Speed Insights Integration
 * Documentation Source: Official Vercel Analytics Documentation
 * Reference: https://vercel.com/docs/analytics
 * Reference: https://vercel.com/docs/speed-insights
 * 
 * Pattern: Analytics components added per Vercel deployment requirements
 * Architecture: Components render client-side tracking scripts
 * 
 * Implementation Notes:
 * - Analytics tracks page views and custom events
 * - SpeedInsights monitors Core Web Vitals
 * - Both components are zero-config on Vercel platform
 * - Data visible in Vercel Dashboard
 */
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CookieConsentManager } from '@/components/legal/CookieConsent';
import { GlobalErrorBoundary } from '@/components/infrastructure/GlobalErrorBoundary';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring component integration
 * PERFORMANCE MONITORING REASON: Comprehensive Web Vitals tracking with useReportWebVitals hook
 * CONTEXT7 SOURCE: /vercel/next.js - Client component for real-time performance monitoring
 * IMPLEMENTATION: Royal client performance standards with automated alerting
 */
import { WebVitalsReporter } from '@/components/performance/WebVitalsReporter';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance-optimized SEO component integration
 * SEO ENHANCEMENT REASON: Core Web Vitals optimized structured data for premium service visibility
 * CONTEXT7 SOURCE: /vercel/next.js - Server-side SEO rendering for immediate search engine access
 * IMPLEMENTATION: Performance-first SEO infrastructure for royal client service discoverability
 */
import { ServerSEOComponents } from '@/components/seo/SEOPerformanceOptimizer';

/**
 * Source Serif 4 & Playfair Display Font Family Implementation
 * Documentation Source: Context7 MCP - Next.js Font Optimization + Google Fonts Official Documentation
 * Reference: /vercel/next.js - Google Fonts next/font/google configuration
 * Reference: https://fonts.google.com/specimen/Source+Serif+4
 * Reference: https://fonts.google.com/specimen/Playfair+Display
 * 
 * Pattern: Dual serif font system for premium branding
 * Architecture: 
 * - CSS variables for Tailwind integration
 * - Multiple weights for design flexibility
 * - Optimized subsets for performance
 * - Variable fonts for better rendering
 * 
 * Source Serif 4 (Primary Body/Content Serif):
 * - Variable font with dynamic weight range
 * - Optimized for readability at all sizes
 * - Designed for extended reading
 * - Available weights: 200-900 (variable)
 * - Available styles: normal, italic
 * 
 * Playfair Display (Display/Heading Serif):
 * - High-contrast serif for headings and display text
 * - Elegant and sophisticated appearance
 * - Perfect for premium branding
 * - Available weights: 400-900 (variable)
 * - Available styles: normal, italic
 * 
 * Design Usage Guidelines:
 * - Primary headings: Playfair Display 700-900
 * - Body text: Source Serif 4 400-500
 * - Subheadings: Source Serif 4 600-700
 * - Captions: Source Serif 4 300-400
 * - Emphasis: italic variants
 * 
 * Tailwind Integration:
 * - font-serif: Uses Source Serif 4 as primary serif
 * - font-display: Uses Playfair Display for display text
 * - Available utilities: font-light, font-normal, font-semibold, font-bold, font-black
 * - Italic support: italic class
 */
const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif-4',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Enhanced metadata configuration for SEO optimization
 * SEO ENHANCEMENT REASON: Comprehensive metadata for premium tutoring service discovery
 * CONTEXT7 SOURCE: /vercel/next.js - Metadata API with robots, verification, and manifest integration
 * IMPLEMENTATION: Royal client service standards with maximum search visibility
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://myprivatetutoronline.com'),
  title: {
    default: "My Private Tutor Online | Premium Academic Tutoring | Oxbridge & 11+ Specialists",
    template: "%s | My Private Tutor Online"
  },
  description: "Premium private tutoring services with 15+ years experience. Royal family endorsed, Tatler-listed tutors specialising in Oxbridge preparation, 11+ entry, GCSE & A-levels. Trusted by elite families across the UK.",
  keywords: [
    "private tutor",
    "Oxbridge preparation",
    "11+ tutoring",
    "GCSE tuition", 
    "A-level tutoring",
    "Cambridge International",
    "premium tutoring",
    "elite tutoring",
    "royal family tutor",
    "Tatler tutor",
    "academic preparation",
    "entrance exam preparation",
    // CONTEXT7 SOURCE: /vercel/next.js - Extended keywords for SEO optimization
    // SEO ENHANCEMENT: Additional keywords for comprehensive service discovery
    "grammar school preparation",
    "university entrance tutoring",
    "A* grade tutoring",
    "London private tutor",
    "elite family tutor",
    "homeschooling support",
    "academic mentoring",
    "exam preparation specialist"
  ],
  authors: [{ name: "My Private Tutor Online", url: "https://myprivatetutoronline.com" }],
  creator: "My Private Tutor Online",
  publisher: "My Private Tutor Online",
  // CONTEXT7 SOURCE: /vercel/next.js - Enhanced robots configuration for comprehensive crawling
  // SEO OPTIMIZATION: Maximum search engine visibility for premium service discovery
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // CONTEXT7 SOURCE: /vercel/next.js - Search engine verification meta tags
  // SEO INTEGRATION: Search console verification for comprehensive SEO monitoring
  verification: {
    google: 'google-site-verification-premium-tutor',
    yandex: 'yandex-verification-premium-tutor', 
    yahoo: 'yahoo-site-verification-premium-tutor',
    other: {
      'msvalidate.01': 'bing-site-verification-premium-tutor',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://myprivatetutoronline.com",
    siteName: "My Private Tutor Online",
    title: "My Private Tutor Online | Premium Academic Tutoring Services",
    description: "Premium private tutoring with royal endorsements. 15+ years experience in Oxbridge prep, 11+ entry, GCSE & A-levels. Featured in Tatler Address Book.",
    images: [
      {
        url: "/images/hero/premium-tutoring-og.jpg",
        width: 1200,
        height: 630,
        alt: "My Private Tutor Online - Premium Academic Tutoring Services",
        type: "image/jpeg",
      },
      {
        url: "/images/logos/logo-with-name.png", 
        width: 400,
        height: 100,
        alt: "My Private Tutor Online Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Private Tutor Online | Premium Academic Tutoring",
    description: "Royal family endorsed private tutoring. Oxbridge preparation, 11+ entry, GCSE & A-levels. 15+ years experience.",
    images: ["/images/hero/premium-tutoring-og.jpg"],
    creator: "@MyPrivateTutorUK",
    site: "@MyPrivateTutorUK",
  },
  alternates: {
    canonical: "https://myprivatetutoronline.com",
  },
  category: "Education",
  // CONTEXT7 SOURCE: /vercel/next.js - Classification and App Links for enhanced discovery
  // SEO ENHANCEMENT: Additional metadata for comprehensive service categorization
  classification: "Educational Services",
  referrer: "origin-when-cross-origin",
  applicationName: "My Private Tutor Online",
  generator: "Next.js 15",
};

// CONTEXT7 SOURCE: /vercel/next.js - Viewport configuration for Next.js 15+ compatibility
// VIEWPORT EXPORT REASON: Next.js 15+ requires colorScheme and themeColor in viewport export instead of metadata
export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f172a" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
};

/**
 * Architecture Fix - Removed force-dynamic Export
 * Documentation Source: Context7 MCP - Next.js Dynamic Rendering Best Practices
 * Reference: /vercel/next.js - Dynamic Rendering Configuration
 * 
 * ISSUE RESOLVED: force-dynamic was causing abnormal Next.js architecture
 * - Forcing ALL routes to be dynamic (not normal)
 * - Should only be used on individual pages that need Request data
 * - Normal Next.js uses hybrid static/dynamic rendering
 * 
 * SOLUTION: Use proper Suspense boundaries and page-level configs where needed
 * - Static pages remain static for better performance  
 * - Dynamic features wrapped in Suspense boundaries
 * - Individual pages can export dynamic = 'force-dynamic' if needed
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* CONTEXT7 SOURCE: /vercel/next.js - Performance-optimized SEO component integration
            SEO IMPLEMENTATION: Server-rendered structured data for immediate search visibility */}
        <ServerSEOComponents />
      </head>
      <body
        className={`${sourceSerif4.variable} ${playfairDisplay.variable} font-serif antialiased min-h-screen bg-transparent text-foreground`}
      >
        <ResourcePreloader page="homepage" preloadCriticalImages={true} />
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Global error boundary for production stability
            ERROR BOUNDARY REASON: Official React error boundary patterns for royal client service standards */}
        <GlobalErrorBoundary
          level="global"
          componentName="RootLayout"
        >
          <LazyMotionProvider>
            {children}
          </LazyMotionProvider>
        </GlobalErrorBoundary>
        {/* Performance Monitor loaded client-side only */}
        
        {/* 
         * Vercel Analytics Components
         * Documentation Source: Official Vercel Documentation
         * Reference: https://vercel.com/docs/analytics/quickstart
         * 
         * Pattern: Analytics components placed before closing body tag
         * Architecture: Zero-config analytics for Vercel deployments
         * 
         * Features:
         * - Automatic page view tracking
         * - Web Vitals monitoring
         * - Real User Monitoring (RUM)
         * - Privacy-compliant by default
         */}
        <Analytics />
        <SpeedInsights />
        {/* CONTEXT7 SOURCE: /vercel/next.js - Web Vitals reporting with useReportWebVitals hook
            PERFORMANCE MONITORING: Real-time Core Web Vitals tracking and business metrics */}
        <WebVitalsReporter />
        <CookieConsentManager />
      </body>
    </html>
  );
}
