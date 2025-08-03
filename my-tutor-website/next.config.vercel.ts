/**
 * Vercel Full-Feature Configuration
 * Documentation Source: Official Vercel Next.js Documentation
 * Reference: https://vercel.com/docs/frameworks/nextjs
 * Reference: https://nextjs.org/docs/app/api-reference/next-config-js
 * 
 * This configuration enables all Vercel platform features:
 * - Server-side rendering (SSR)
 * - Incremental Static Regeneration (ISR)
 * - Image Optimization API
 * - Edge Functions
 * - API Routes
 * 
 * To use this configuration:
 * 1. Rename current next.config.ts to next.config.static.ts
 * 2. Rename this file to next.config.ts
 * 3. Remove static export limitations from components
 */

import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env['ANALYZE'] === 'true',
});

const nextConfig: NextConfig = {
  // ✅ VERCEL OPTIMISED CONFIGURATION
  // Remove static export to enable full Next.js features
  // output: 'export', // REMOVED for Vercel
  // distDir: 'out', // REMOVED - use default .next
  // trailingSlash: true, // Optional for Vercel
  
  // Vercel Image Optimization
  // Documentation: https://vercel.com/docs/image-optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['myprivatetutoronline.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'date-fns'],
    // serverActions: true, // Enable if using Server Actions
    // ppr: true, // Partial Prerendering (experimental)
  },
  
  // Security headers handled by Vercel Edge
  // Documentation: https://vercel.com/docs/edge-network/headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  
  // Redirects for legacy URLs
  async redirects() {
    return [
      {
        source: '/tuition',
        destination: '/subject-tuition',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
    ];
  },
  
  // Rewrites for cleaner URLs
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
    ];
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Bundle optimization
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
    '@radix-ui/react-icons': {
      transform: '@radix-ui/react-icons/dist/{{member}}.js',
    },
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false, // Enable strict checking for production
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false, // Enable linting for production
  },
  
  // Webpack customisation (if needed)
  webpack: (config, { isServer }) => {
    // Custom webpack config
    return config;
  },
  
  // Environment variable validation
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://myprivatetutoronline.com',
  },
};

export default withBundleAnalyzer(nextConfig);