// CONTEXT7 SOURCE: /microsoft/typescript - Object literal type definitions with const assertion
// CONFIGURATION REASON: TypeScript const assertions ensure type safety and immutability for brand configuration
// CONTEXT7 SOURCE: /vercel/next.js - Configuration patterns for Next.js applications
// BRAND CONFIG REASON: Centralized brand configuration following Next.js best practices for constants

// Brand configuration for My Private Tutor Online
// This file contains business information that can be managed through CMS

export const brandConfig = {
  // Business Identity
  businessName: "My Private Tutor Online",
  tagline: "Premium Academic Tutoring Excellence",
  foundedYear: 2010, // 15+ years as mentioned
  
  // Contact Information (CMS manageable)
  contact: {
    email: "hello@myprivatetutoronline.com",
    phone: "+44 7513 550278", // Updated with correct number
    address: {
      line1: "London, United Kingdom",
      postcode: "",
    },
  },

  // Business Credentials & Trust Indicators
  credentials: {
    tatlersListing: {
      title: "Featured in Tatler Address Book 2025",
      description: "Recognised amongst the UK's most prestigious service providers",
      year: 2025,
    },
    royalEndorsement: {
      title: "Royal Family Testimonials",
      description: "Trusted by royal families for academic excellence",
      verified: true,
    },
    experience: {
      yearsEstablished: 15,
      description: "15+ years of proven academic success",
    },
  },

  // Academic Specialities
  specialities: [
    {
      category: "Oxbridge Preparation",
      description: "Cambridge & Oxford University entrance preparation",
      levels: ["A-Level", "University Preparation"],
      subjects: ["All subjects", "Interview preparation", "Entrance exams"],
    },
    {
      category: "11+ Preparation", 
      description: "Grammar school entrance preparation",
      levels: ["Year 5", "Year 6"],
      subjects: ["English", "Mathematics", "Verbal Reasoning", "Non-Verbal Reasoning"],
    },
    {
      category: "GCSE Excellence",
      description: "GCSE preparation and grade improvement",
      levels: ["Years 9-11"],
      subjects: ["All GCSE subjects", "Science trilogy", "Humanities"],
    },
    {
      category: "A-Level Mastery",
      description: "A-Level preparation including Cambridge International",
      levels: ["Years 12-13"],
      subjects: ["Computer Science", "Mathematics", "Sciences", "Humanities"],
    },
  ],

  // Target Client Segments (from your demo sites)
  clientSegments: [
    {
      name: "Oxbridge Preparation",
      description: "Affluent families seeking prestigious university entry",
      needs: ["Rigorous preparation", "Interview coaching", "Subject mastery"],
    },
    {
      name: "11+ Parents",
      description: "Stressed parents needing reassurance for grammar school entry", 
      needs: ["Confidence building", "Exam technique", "Progress tracking"],
    },
    {
      name: "GCSE & A-Level Students",
      description: "Students needing practical solutions quickly",
      needs: ["Grade improvement", "Exam preparation", "Subject support"],
    },
    {
      name: "Comparison Shoppers",
      description: "Logic-driven families comparing multiple services",
      needs: ["Clear pricing", "Proven results", "Transparent process"],
    },
    {
      name: "Elite Corporate Families",
      description: "Ultra-wealthy requiring discretion and bespoke service",
      needs: ["Exclusivity", "Flexibility", "Premium service"],
    },
  ],

  // Seasonal Content Areas (for CMS management)
  seasonalContent: {
    academic: {
      autumnTerm: "September preparation and new academic year readiness",
      springTerm: "January intensive revision and mock exam preparation", 
      summerTerm: "Final exam preparation and results support",
      summerHolidays: "Summer intensive courses and preparation for next academic year",
    },
    examPeriods: {
      elevenPlus: "September - January (main season)",
      gcse: "May - June examination period",
      aLevel: "May - June examination period", 
      oxbridge: "October - December application season",
    },
  },

  // Brand Values
  values: [
    {
      title: "Excellence",
      description: "Uncompromising commitment to academic achievement",
    },
    {
      title: "Discretion", 
      description: "Confidential, professional service for discerning families",
    },
    {
      title: "Heritage",
      description: "15+ years of proven success with elite clientele",
    },
    {
      title: "Personalisation",
      description: "Bespoke tutoring tailored to individual student needs",
    },
  ],
} as const;

// Premium Brand Colours (reflecting prestige and trust)
export const brandColours = {
  // Primary colours - sophisticated navy and gold
  primary: {
    navy: {
      50: "#f8fafc",
      100: "#f1f5f9", 
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b", 
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a", // Main navy
      950: "#020617",
    },
    gold: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a", 
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b", // Main gold
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03",
    },
  },
  
  // Semantic colours
  semantic: {
    success: "#059669", // For achievements, results
    warning: "#d97706", // For urgent actions
    error: "#dc2626", // For issues, alerts
    info: "#0284c7", // For information
  },

  // Background colours
  background: {
    primary: "#ffffff", // Pure white for premium feel
    secondary: "#f8fafc", // Very light navy
    accent: "#fef3c7", // Very light gold
    dark: "#0f172a", // Navy for contrast sections
  },
} as const;

// Typography scale for premium branding
export const brandTypography = {
  fonts: {
    sans: "var(--font-geist-sans)", // Modern, clean for body text
    serif: "'Crimson Text', Georgia, serif", // Elegant for headings
    mono: "var(--font-geist-mono)", // Technical content
  },
  
  scale: {
    xs: "0.75rem",     // 12px - Small annotations
    sm: "0.875rem",    // 14px - Captions, metadata  
    base: "1rem",      // 16px - Body text
    lg: "1.125rem",    // 18px - Large body text
    xl: "1.25rem",     // 20px - Subheadings
    "2xl": "1.5rem",   // 24px - Small headings
    "3xl": "1.875rem", // 30px - Medium headings
    "4xl": "2.25rem",  // 36px - Large headings
    "5xl": "3rem",     // 48px - Hero headings
    "6xl": "3.75rem",  // 60px - Display headings
  },
} as const;

// CONTEXT7 SOURCE: /microsoft/typescript - Type inference from const values using typeof
// TYPE EXPORT REASON: TypeScript handbook recommends typeof for deriving types from runtime values
// Export types for TypeScript
export type BrandConfig = typeof brandConfig;
export type BrandColours = typeof brandColours;
export type BrandTypography = typeof brandTypography;