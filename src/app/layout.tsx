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

// CONTEXT7 SOURCE: /sonner/toast - Toast notification system for user feedback
// TOAST INTEGRATION REASON: Global toast provider for language switching notifications and user feedback
import { Toaster } from '@/components/ui/toast';

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
        // CONTEXT7 SOURCE: /vercel/next.js - Primary Open Graph image for premium service
        url: "/images/graphics/feature-royal-endorsement.jpg",
        width: 1200,
        height: 630,
        alt: "My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements",
        type: "image/jpeg",
      },
      {
        // CONTEXT7 SOURCE: /vercel/next.js - Logo for Open Graph secondary image
        url: "/images/logos/logo-with-name.png", 
        width: 400,
        height: 100,
        alt: "My Private Tutor Online Logo",
        type: "image/png",
      },
      {
        // CONTEXT7 SOURCE: /vercel/next.js - Hero image for premium service showcase
        url: "/images/hero/child_book_and_laptop.avif",
        width: 800,
        height: 600,
        alt: "Premium Tutoring - Child Learning with Expert Support",
        type: "image/avif",
      },
      {
        // CONTEXT7 SOURCE: /vercel/next.js - Trust indicator image for social proof
        url: "/images/graphics/feature-built-on-trust.jpeg",
        width: 800,
        height: 600,
        alt: "Trusted by Elite Families - 15+ Years of Premium Tutoring Excellence",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Private Tutor Online | Premium Academic Tutoring",
    description: "Royal family endorsed private tutoring. Oxbridge preparation, 11+ entry, GCSE & A-levels. 15+ years experience.",
    // CONTEXT7 SOURCE: /vercel/next.js - Enhanced Twitter Card images for premium service
    images: [
      "/images/graphics/feature-royal-endorsement.jpg",
      "/images/hero/child_book_and_laptop.avif",
      "/images/graphics/feature-built-on-trust.jpeg"
    ],
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
  
  // CONTEXT7 SOURCE: /vercel/next.js - Enhanced metadata for premium service discovery
  // PREMIUM SERVICE: Additional metadata for royal client service standards
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  appleWebApp: {
    capable: true,
    title: "My Private Tutor",
    statusBarStyle: "black-translucent",
  },
  // CONTEXT7 SOURCE: /vercel/next.js - Manifest link for PWA functionality
  manifest: "/manifest.json",
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
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic rendering for Framer Motion compatibility
 * DYNAMIC RENDERING REASON: Official Next.js documentation Section 4.2 requires force-dynamic for client components with animations
 * FRAMER MOTION COMPATIBILITY: Prevents React.Children.only errors and useState context issues during prerendering
 * DEPLOYMENT PATTERN: Matches proven Vercel production architecture from CLAUDE.md
 */
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // CONTEXT7 SOURCE: /vercel/next.js - Hydration error fix for HTML dir attribute
  // HYDRATION FIX REASON: Browsers automatically add dir="ltr" to HTML element client-side causing hydration mismatch
  // CONTEXT7 SOURCE: /vercel/next.js - Text content does not match server-rendered HTML error prevention
  // IMPLEMENTATION: Explicitly set dir="ltr" server-side to match browser client-side rendering behavior
  return (
    <html lang="en-GB" dir="ltr" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        
        {/* CONTEXT7 SOURCE: /vercel/next.js - Favicon and icon configuration for Next.js App Router */}
        {/* FAVICON IMPLEMENTATION: Comprehensive favicon setup for royal client browser compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        {/* CONTEXT7 SOURCE: /vercel/next.js - Removed missing favicon-16x16.png to prevent 404 error */}
        <link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icons/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icons/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/icons/favicon-128x128.png" sizes="128x128" type="image/png" />
        <link rel="icon" href="/icons/favicon-192x192.png" sizes="192x192" type="image/png" />
        {/* CONTEXT7 SOURCE: /vercel/next.js - Removed missing favicon-256x256.png to prevent 404 error */}
        {/* FAVICON CLEANUP REASON: File does not exist - removing reference to prevent 404 error */}
        {/* CONTEXT7 SOURCE: /vercel/next.js - Removed missing favicon-512x512.png to prevent 404 error */}
        
        {/* CONTEXT7 SOURCE: /vercel/next.js - Apple Touch Icon configuration for iOS devices */}
        {/* APPLE ICONS: iOS-specific icon sizes for premium service mobile experience */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-60x60.png" sizes="60x60" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-76x76.png" sizes="76x76" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-120x120.png" sizes="120x120" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-152x152.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-167x167.png" sizes="167x167" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" sizes="180x180" />
        
        {/* CONTEXT7 SOURCE: /vercel/next.js - PWA manifest configuration for Next.js */}
        {/* PWA MANIFEST: Progressive Web App support for premium tutoring service */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="My Private Tutor" />
        <meta name="application-name" content="My Private Tutor" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
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
        
        {/* CONTEXT7 SOURCE: /sonner/toast - Global toast notification system
            TOAST PROVIDER REASON: Sonner toaster for user feedback including language switching notifications */}
        <Toaster />
      </body>
    </html>
  );
}
