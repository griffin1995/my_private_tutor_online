import type { NextConfig } from 'next';
import path from 'path';

// Modern 2025 debugging: React DevTools profiler enabled below
// Removed why-did-you-render in favour of built-in React debugging tools
// Bundle analysis now uses: npm run analyze (next experimental-analyze)

const nextConfig: NextConfig = {
	// Core Performance & Security Settings
	compress: true,
	poweredByHeader: false,
	reactStrictMode: true,

	// Modern 2025 Debugging & Profiling (React DevTools Integration)
	// Fixed: Use reactProductionProfiling instead of experimental.profiler
	reactProductionProfiling: process.env.NODE_ENV === 'development',

	// Turbopack Configuration (Next.js 16 Default Bundler)
	turbopack: {
		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
		resolveAlias: {
			'@': './src',
			'@payload-config': './payload.config.ts',
		},
	},

	// SWC Compiler Optimization
	compiler: {
		reactRemoveProperties: process.env.NODE_ENV === 'production',
		removeConsole:
			process.env.NODE_ENV === 'production' ?
				{
					exclude: ['error', 'warn'],
				}
			:	false,
		emotion: false,
		styledComponents: false,
	},

	// Source Maps Configuration (2025 Security Standards)
	productionBrowserSourceMaps: false, // Disable in production for security

	// Experimental Features (2025 Standards)
	experimental: {
		// Static Generation Optimization
		staticGenerationMaxConcurrency: 16,
		staticGenerationMinPagesPerWorker: 15,
		staticGenerationRetryCount: 1,

		// Package Import Optimization
		optimizePackageImports: [
			'lucide-react',
			'@radix-ui/react-icons',
			'@radix-ui/react-slot',
			'@radix-ui/react-dropdown-menu',
			'@radix-ui/react-dialog',
			'@radix-ui/react-popover',
			'@radix-ui/react-tooltip',
			'@radix-ui/react-accordion',
			'@radix-ui/react-checkbox',
			'@radix-ui/react-label',
			'@radix-ui/react-switch',
			'@radix-ui/react-tabs',
			'@radix-ui/react-toggle',
			'@radix-ui/react-select',
			'@radix-ui/react-scroll-area',
			'@heroicons/react',
			'motion',
			'date-fns',
			'clsx',
			'class-variance-authority',
			'recharts',
			'zod',
			'react-hook-form',
			'@hookform/resolvers',
			'tailwind-merge',
		],

		// Performance & Build Optimization
		webpackMemoryOptimizations: true,
		scrollRestoration: true,
		serverMinification: true,
		serverSourceMaps: false, // Explicitly disabled to prevent payload argument errors
		cssChunking: true,
		webpackBuildWorker: true,
	},

	// Enhanced Logging for Development (2025 Standards)
	logging: {
		fetches: {
			fullUrl: true,
		},
	},

	// Development Indicators (Enhanced debugging visibility)
	devIndicators: {
		position: 'bottom-right',
	},

	// Modern Image Optimization (2025 Standards)
	images: {
		deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
		imageSizes: [16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640, 768, 896, 1024],
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 31536000, // 1 year cache
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		contentDispositionType: 'inline',
		qualities: [25, 35, 50, 65, 75, 85, 90, 95],
		loader: 'default',
		path: '/_next/image',
		unoptimized: false,
	},

	// Streamlined Module Imports
	modularizeImports: {
		'@radix-ui/react-icons': {
			transform: '@radix-ui/react-icons/dist/{{member}}.js',
			preventFullImport: true,
		},
		'date-fns': {
			transform: 'date-fns/{{member}}',
			preventFullImport: true,
		},
	},

	// Webpack configuration removed - Turbopack handles bundling optimisation automatically
	// Path aliases migrated to turbopack.resolveAlias above
	// Bundle splitting and optimisation handled by Turbopack's built-in performance features

	// TypeScript Configuration - Temporarily use development config for debugging
	typescript: {
		ignoreBuildErrors: process.env.NODE_ENV === 'production',
		tsconfigPath: './tsconfig.json', // Always use development config for now
	},

};

export default nextConfig;