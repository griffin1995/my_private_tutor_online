/**
 * Documentation Source: Tailwind CSS v3 Configuration
 * Reference: https://tailwindcss.com/docs/configuration
 * Reference: https://tailwindcss.com/docs/theme
 * Reference: https://tailwindcss.com/docs/plugins
 *
 * Pattern: Extended Theme Configuration with Design Tokens
 * Architecture:
 * - TypeScript configuration for type safety
 * - Custom color palette following brand guidelines
 * - Extended typography scale
 * - Custom animations for UI components
 *
 * Design System Integration:
 * - Primary: Navy/Slate-900 (#0f172a)
 * - Accent: Gold (#eab308)
 * - Semantic color tokens
 * - Consistent spacing scale
 *
 * Performance:
 * - JIT mode enabled by default in v3
 * - Purged unused styles in production
 */

import type { Config } from 'tailwindcss';
/**
 * FLUID TYPOGRAPHY IMPLEMENTATION - NATIVE TAILWIND CSS
 * Source: CONTEXT7 - /tailwindlabs/tailwindcss.com arbitrary values documentation
 *
 * Native CSS clamp() implementation replaces tailwind-clamp plugin
 * Benefits: Zero external dependencies, smaller bundle, no v3/v4 hybrid conflict
 */

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design Token Integration Pattern
 * PHASE 2 IMPLEMENTATION: Integrating strategic 25-color palette with Tailwind CSS theme extension
 * DESIGN SYSTEM CONSOLIDATION: Reducing 809 legacy colors to 25 strategic tokens (96.9% reduction)
 *
 * Design Token Strategy:
 * - Primary: Navy brand (4 variations)
 * - Secondary: Gold accent (4 variations)
 * - Neutral: Greyscale hierarchy (8 greys)
 * - Semantic: User feedback (4 colors)
 * - UI: Interactive states (5 utilities)
 * - Typography: 3 font families, complete scale
 * - Spacing: 4px grid system
 */

const config: Config = {
	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Content configuration for JIT engine
	// Content paths for Tailwind CSS 3.x - scanned for class names
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/lib/**/*.{js,ts,jsx,tsx,mdx}',
		'./content/**/*.{json,md,mdx}',
	],

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dark mode configuration
	// 'class' enables manual dark mode via class name, 'media' uses system preference
	darkMode: 'class',

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Safelist configuration
	// Force generation of specific classes that might not be detected in content files
	// Useful for dynamically generated class names from CMS or databases
	safelist: [
		// Add patterns here if needed for dynamic classes
		// Example: { pattern: /bg-(red|green|blue)-(100|200|300)/ }
	],

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Blocklist configuration
	// Prevent specific classes from being generated (rarely needed)
	// blocklist: [],

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Presets configuration
	// Base configuration to extend from - useful for sharing configs across projects
	// presets: [require('./tailwind-preset.js')],

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Prefix configuration
	// Add custom prefix to all Tailwind utility classes (e.g., 'tw-' → 'tw-flex')
	// Currently set to empty string for standard class names
	prefix: '',

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Important configuration
	// Make all Tailwind utilities !important or target specific selector
	// Set to false for standard CSS specificity, or '#app' to scope importance
	important: false,

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Separator configuration
	// Character used to separate variant modifiers from utility names
	// Default ':' allows 'hover:bg-blue-500', change to '_' for 'hover_bg-blue-500'
	separator: ':',

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Core plugins configuration
	// Selectively disable specific Tailwind core plugins to reduce bundle size
	// Uncomment and add plugins to disable (e.g., { float: false, objectFit: false })
	// corePlugins: {
	//   // Example: Disable unused utilities
	//   // float: false,
	//   // clear: false,
	//   // skew: false,
	// },

	/**
	 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Tailwind CSS v4 Simplified Configuration
	 * CSS-FIRST MIGRATION: Theme configuration now handled by @theme directive in globals.css
	 * PERFORMANCE: Reduced JavaScript bundle size by moving theme to CSS-first approach
	 * COMPATIBILITY: Maintains critical configuration while leveraging CSS theme system
	 */
	theme: {
		extend: {
			// Essential animations that can't be easily represented in CSS @theme
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'fade-in-up': 'fadeInUp 0.5s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				'slide-in-left': 'slideInLeft 0.4s ease-out',
				'slide-in-right': 'slideInRight 0.4s ease-out',
				'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				shimmer: 'shimmer 2s linear infinite',
				scroll: 'scroll 30s linear infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},

			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				slideInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				slideInRight: {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				bounceGentle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				shimmer: {
					from: { backgroundPosition: '0 0' },
					to: { backgroundPosition: '-200% 0' },
				},
				scroll: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},

			// Custom breakpoints for responsive design
			screens: {
				desktop: '1500px', // Custom breakpoint for navbar desktop display
				'3xl': '1780px', // Custom breakpoint for full navigation display
			},

			// ARIA attribute variant shortcuts for accessibility
			aria: {
				checked: 'checked',
				disabled: 'disabled',
				expanded: 'expanded',
				hidden: 'hidden',
				pressed: 'pressed',
				readonly: 'readonly',
				required: 'required',
				selected: 'selected',
			},

			// Data attribute variant shortcuts for state-based styling
			data: {
				active: 'active~="true"',
				inactive: 'active~="false"',
				open: 'state~="open"',
				closed: 'state~="closed"',
				loading: 'loading~="true"',
				error: 'error~="true"',
			},

			// @supports variant shortcuts for feature detection
			supports: {
				grid: 'display: grid',
				flex: 'display: flex',
				'backdrop-blur': 'backdrop-filter: blur(0px)',
			},
		},
	},

	/**
	 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Tailwind CSS v4 Plugin Migration
	 * V4 PLUGIN SYSTEM: Plugins are now imported via CSS @plugin directives in globals.css
	 * MIGRATION: Moved @tailwindcss/forms, @tailwindcss/typography, @tailwindcss/container-queries,
	 * @tailwindcss/aspect-ratio to CSS-based configuration for v4 compatibility
	 *
	 * Note: tailwindcss-animate requires v4-compatible version or replacement
	 */
	plugins: [
		// Plugins migrated to CSS @plugin directives in globals.css for v4 compatibility
	],
};

export default config;
