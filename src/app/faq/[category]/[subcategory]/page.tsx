/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic nested route with redirect patterns
 * IMPLEMENTATION REASON: Official Next.js documentation for route redirection during architectural simplification
 * 
 * FAQ Subcategory Page - Redirect to Main FAQ
 * Simplified during architectural reset to prevent complexity issues
 */

import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

// CONTEXT7 SOURCE: /vercel/next.js - Nested dynamic route parameter handling
// ROUTE REDIRECT: Redirect all subcategory routes to main FAQ page
interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>
}

// CONTEXT7 SOURCE: /vercel/next.js - Metadata generation for redirected nested routes
// SEO HANDLING: Maintain SEO during architectural transition
export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  return {
    title: 'FAQ - My Private Tutor Online',
    description: 'Find answers to common questions about our premium tutoring services.',
    robots: 'noindex, follow' // Prevent indexing during transition
  }
}

/**
 * FAQ Subcategory Page - Redirect Implementation
 * CONTEXT7 SOURCE: /vercel/next.js - Server component redirect patterns for nested routes
 * ARCHITECTURAL RESET: Redirect to main FAQ page during simplification
 */
export default async function FAQSubcategoryPage({ params }: SubcategoryPageProps) {
  // CONTEXT7 SOURCE: /vercel/next.js - Next.js redirect function for nested route handling
  // REDIRECT LOGIC: All subcategory routes go to main FAQ page
  redirect('/faq')
}