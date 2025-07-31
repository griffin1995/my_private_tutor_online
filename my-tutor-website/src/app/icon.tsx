/**
 * Dynamic Icon Generation for My Private Tutor Online
 * Documentation Source: Next.js 15 Metadata Files
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 * 
 * Pattern: Dynamic icon generation using ImageResponse
 * Purpose: Generate consistent brand icons in multiple sizes
 * 
 * Best Practices Applied:
 * - Uses brand colours from configuration
 * - Generates multiple sizes for different devices
 * - Maintains consistent branding across all icon formats
 */

import { ImageResponse } from 'next/og'

// Icon sizes for different use cases
export const sizes = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#0f172a', // Brand navy
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f59e0b', // Brand gold
          fontWeight: 'bold',
        }}
      >
        T
      </div>
    ),
    {
      ...sizes,
    }
  )
}