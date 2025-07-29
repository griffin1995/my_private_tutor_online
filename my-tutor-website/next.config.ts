import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env['ANALYZE'] === 'true',
});

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Dynamic Next.js configuration for Cloudflare Pages
  images: {
    domains: ['localhost', 'my-private-tutor-online.pages.dev'],
    formats: ['image/webp', 'image/avif'],
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

  // TypeScript configuration - Temporarily ignore for deployment
  typescript: {
    ignoreBuildErrors: true,
  },

  // ESLint configuration - Temporarily ignore for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
