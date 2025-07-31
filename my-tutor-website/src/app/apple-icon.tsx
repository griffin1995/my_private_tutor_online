/**
 * Apple Touch Icon Generation for My Private Tutor Online
 * Documentation Source: Next.js 15 Metadata Files
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 * 
 * Pattern: Apple-specific icon generation
 * Purpose: Generate Apple touch icons for iOS devices
 * 
 * Best Practices Applied:
 * - Larger size (180x180) for Retina displays
 * - Uses brand identity colours
 * - Clean, recognisable design at small sizes
 */

import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: '#0f172a', // Brand navy
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f59e0b', // Brand gold
          fontWeight: 'bold',
          borderRadius: 30, // Rounded corners for iOS
        }}
      >
        T
      </div>
    ),
    {
      ...size,
    }
  )
}