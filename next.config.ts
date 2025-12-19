import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
import { withPayload } from '@payloadcms/next/withPayload';
import path from 'path';

// Modern 2025 debugging: React DevTools profiler enabled below
// Removed why-did-you-render in favour of built-in React debugging tools

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env['ANALYZE'] === 'true',
});

const nextConfig: NextConfig = {
	// Core Performance & Security Settings
	compress: true,
	poweredByHeader: false,
	reactStrictMode: true,

	// Modern 2025 Debugging & Profiling (React DevTools Integration)
	// Fixed: Use reactProductionProfiling instead of experimental.profiler
	reactProductionProfiling: process.env.NODE_ENV === 'development',

	// Modern Turbopack Configuration (Single Unified Instance)
	turbopack: {
		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
		moduleIds: 'deterministic',
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
			'framer-motion',
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
		serverSourceMaps: false,
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

	// Simplified Webpack Configuration (Essential Only)
	webpack: (config, { isServer, dev }) => {
		// CMS Architecture Validation (Optional)
		if (!isServer && !dev && process.env.ENABLE_BUILD_PLUGINS === 'true') {
			console.log('🔍 CMS Architecture Validation: Available but disabled for build performance');
		}

		// Development Optimization
		if (dev) {
			config.optimization = {
				...config.optimization,
				removeAvailableModules: false,
				removeEmptyChunks: false,
				splitChunks: false,
			};

			config.resolve = {
				...config.resolve,
				symlinks: false, // Faster resolution
			};
		}

		// Production Optimization (Simplified)
		if (!isServer && !dev) {
			config.optimization = {
				...config.optimization,
				splitChunks: {
					chunks: 'all',
					minSize: 20000,
					maxSize: 250000,
					maxInitialRequests: 25,
					maxAsyncRequests: 30,
					cacheGroups: {
						defaultVendors: {
							test: /[\\/]node_modules[\\/]/,
							priority: -10,
							reuseExistingChunk: true,
							name(module: any) {
								const packageName = module.context.match(
									/[\\/]node_modules[\\/](.*?)([\\/]|$)/,
								)?.[1];
								return `npm.${packageName?.replace('@', '')}`;
							},
						},
						default: {
							minChunks: 2,
							priority: -20,
							reuseExistingChunk: true,
						},
					},
				},
				runtimeChunk: 'single',
				moduleIds: 'deterministic',
			};
		}

		// Path alias resolution
		config.resolve = {
			...config.resolve,
			alias: {
				...config.resolve?.alias,
				'@': path.resolve(process.cwd(), './src'),
			},
		};

		return config;
	},

	// TypeScript Configuration
	typescript: {
		ignoreBuildErrors: process.env.NODE_ENV === 'production',
		tsconfigPath:
			process.env.NODE_ENV === 'production' ?
				'./tsconfig.production.json'
			:	'./tsconfig.json',
	},

	// ESLint Configuration
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default withPayload(withBundleAnalyzer(nextConfig));