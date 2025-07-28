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
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
// Performance monitoring disabled for now

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <LazyMotionProvider>
          {children}
        </LazyMotionProvider>
        {/* <PerformanceMonitor /> */}
      </body>
    </html>
  );
}
