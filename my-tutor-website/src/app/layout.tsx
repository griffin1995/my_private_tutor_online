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
import { Lato } from "next/font/google";
import "./globals.css";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
// Performance monitoring disabled for now

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

/**
 * Lato Font Family Implementation
 * Documentation Source: Next.js Font Optimization + Google Fonts Official Documentation
 * Reference: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 * Reference: https://fonts.google.com/specimen/Lato
 * 
 * Pattern: Variable font with comprehensive weight range
 * Architecture: 
 * - CSS variables for Tailwind integration
 * - Multiple weights for design flexibility
 * - Optimized subsets for performance
 * 
 * Available Lato Font Weights and Styles:
 * - 100: Thin (Hairline)
 * - 300: Light
 * - 400: Regular (Normal)
 * - 700: Bold
 * - 900: Black (Ultra Bold)
 * 
 * Available Styles:
 * - normal: Standard upright characters
 * - italic: Slanted characters for emphasis
 * 
 * Design Usage Guidelines:
 * - Headings: font-weight 700 (Bold) or 900 (Black)
 * - Body text: font-weight 400 (Regular)
 * - Captions/Small text: font-weight 300 (Light)
 * - Emphasis: font-weight 700 (Bold) or italic
 * - Thin accents: font-weight 100 (Thin)
 * 
 * Tailwind Integration:
 * - font-sans: Uses Lato as primary sans-serif
 * - Available utilities: font-thin, font-light, font-normal, font-bold, font-black
 * - Italic support: italic class
 */
const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

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
    "entrance exam preparation"
  ],
  authors: [{ name: "My Private Tutor Online" }],
  creator: "My Private Tutor Online",
  publisher: "My Private Tutor Online",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
};

// Documentation Source: Context7 MCP - Next.js Dynamic Rendering Configuration
// Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/use-search-params.mdx#_snippet_5
// Pattern: Force dynamic rendering globally to prevent React.Children.only errors with Framer Motion
// Purpose: Enable server-side features and eliminate React.Children.only errors across all pages
// Context: Required for Framer Motion components which are incompatible with static prerendering
// Result: All routes marked as ƒ (Dynamic) server-rendered on demand
export const dynamic = 'force-dynamic'

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
      </head>
      <body
        className={`${lato.variable} font-sans antialiased min-h-screen bg-transparent text-foreground`}
      >
        <LazyMotionProvider>
          {children}
        </LazyMotionProvider>
        {/* <PerformanceMonitor /> */}
        
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
      </body>
    </html>
  );
}
