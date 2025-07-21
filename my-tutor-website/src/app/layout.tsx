import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PerformanceMonitor } from '@/components/ui/performance-monitor';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <PerformanceMonitor />
      </body>
    </html>
  );
}
