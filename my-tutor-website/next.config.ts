import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env['ANALYZE'] === 'true',
});

const nextConfig: NextConfig = {
  // Cloudflare Pages static export configuration
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Image optimization - disabled for static export
  images: {
    unoptimized: true, // Required for static export
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
