/**
 * Static Export Compatible Open Graph Image Generation
 * Documentation Source: Next.js Static Export Configuration
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 * Reference: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 * 
 * Pattern: Static export compatible image generation with force-static configuration
 * Architecture: Static generation with dynamic = 'force-static' for compatibility
 * 
 * Static Export Requirements Applied:
 * - export const dynamic = 'force-static' for static generation compatibility
 * - Compatible with Next.js static export mode (output: 'export')
 * - Generates at build time for consistent social sharing
 * 
 * Best Practices Applied:
 * - Correct dimensions (1200x630) for social platforms
 * - Brand colours and typography
 * - Clear, readable text at preview sizes
 */

import { ImageResponse } from 'next/og'

/**
 * Dynamic Rendering Configuration for Open Graph Image
 * Documentation Source: Context7 Next.js Dynamic Rendering Configuration
 * Reference: https://github.com/vercel/next.js/blob/canary/errors/app-static-to-dynamic-error.mdx#_snippet_0
 * 
 * Pattern: Remove static export directive to enable dynamic rendering
 * Purpose: Allow server-side features and eliminate React.Children.only errors
 * Migration: Static export directive removed to enable Vercel dynamic deployment
 * 
 * Note: Open Graph images work efficiently with dynamic rendering in Vercel
 */

export const alt = 'My Private Tutor Online - Premium Academic Tutoring'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#0f172a', // Brand navy
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25% 25%, #1e293b 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e293b 0%, transparent 50%)',
            opacity: 0.5,
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#f59e0b', // Brand gold
              letterSpacing: -2,
            }}
          >
            My Private Tutor Online
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#e2e8f0', // Light text
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Premium Academic Tutoring Excellence
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#cbd5e1', // Muted text
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Oxbridge Preparation • 11+ Entry • GCSE & A-Levels
          </div>
          
          {/* Trust indicators */}
          <div
            style={{
              display: 'flex',
              gap: 40,
              marginTop: 40,
              fontSize: 20,
              color: '#94a3b8',
            }}
          >
            <div>Featured in Tatler 2025</div>
            <div>•</div>
            <div>Trusted by Families</div>
            <div>•</div>
            <div>15+ Years Excellence</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}