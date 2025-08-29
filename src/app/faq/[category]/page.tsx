/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic route with redirect patterns
 * IMPLEMENTATION REASON: Official Next.js documentation for route redirection during architectural simplification
 * 
 * FAQ Category Page - Redirect to Main FAQ
 * Simplified during architectural reset to prevent complexity issues
 */

import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic route parameter handling
// ROUTE REDIRECT: Redirect all category routes to main FAQ page
interface CategoryPageProps {
  params: Promise<{ category: string }>
}

// CONTEXT7 SOURCE: /vercel/next.js - Metadata generation for redirected routes
// SEO HANDLING: Maintain SEO during architectural transition
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  return {
    title: 'FAQ - My Private Tutor Online',
    description: 'Find answers to common questions about our premium tutoring services.',
    robots: 'noindex, follow' // Prevent indexing during transition
  }
}

/**
 * FAQ Category Page - Redirect Implementation
 * CONTEXT7 SOURCE: /vercel/next.js - Server component redirect patterns
 * ARCHITECTURAL RESET: Redirect to main FAQ page during simplification
 */
export default async function FAQCategoryPage({ params }: CategoryPageProps) {
  // CONTEXT7 SOURCE: /vercel/next.js - Next.js redirect function for route handling
  // REDIRECT LOGIC: All category routes go to main FAQ page
  redirect('/faq')
}