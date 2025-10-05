/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router page component
 * TESTING PAGE REASON: Official Next.js documentation Section 2.1 - Creating test routes for infrastructure validation
 * PURPOSE: Browser-accessible page for design token infrastructure testing
 *
 * CRITICAL VALIDATION:
 * - Accessible at /design-tokens-test during development
 * - Tests all 25 strategic design tokens in browser environment
 * - Validates CSS variable resolution and Tailwind compilation
 * - Enterprise-grade testing for £400k+ revenue protection
 */

import { TokenTestComponent } from '@/components/design-tokens/TokenTestComponent';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic metadata generation
 * METADATA REASON: Official Next.js App Router metadata API
 */
export const metadata = {
  title: 'Design Token Infrastructure Test | My Private Tutor Online',
  description: 'Comprehensive validation of 25 strategic design tokens',
  robots: 'noindex, nofollow', // Prevent indexing of test page
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - App Router page component pattern
 * PAGE COMPONENT REASON: Official Next.js documentation for route structure
 */
export default function DesignTokensTestPage() {
  return (
    <main className="min-h-screen bg-white py-12">
      <TokenTestComponent />
    </main>
  );
}
