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

import type { Config } from 'tailwindcss'

const config: Config = {
  // Enable dark mode via class
  darkMode: 'class',
  
  // Content paths for Tailwind CSS 3.x
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{json,md,mdx}',
  ],
  
  theme: {
    extend: {
      // Client Brand Colors - Luxury Gold & Blue Scheme
      // Documentation Source: Context7 MCP - Tailwind CSS Color Palette Configuration
      // Reference: /tailwindlabs/tailwindcss.com - Custom color definitions
      // Reference: https://www.schemecolor.com/luxury-gold-blue.php (CLIENT SPECIFICATION)
      colors: {
        // Luxury Gold & Blue Brand Palette (CLIENT REQUIRED)
        // Primary: Metallic Blue (#3F4A7E) - WCAG AA Enhanced for Accessibility
        // Documentation Source: WCAG 2.1 AA Contrast Requirements (4.5:1 normal text, 3:1 large text)
        primary: {
          50: '#f8f9fc',   // Lightest blue tint for backgrounds
          100: '#f1f3f8',   // Very light blue tint 
          200: '#e3e7f0',   // Light blue-grey
          300: '#c6d0e8',   // Medium light blue-grey
          400: '#8fa2d4',   // Medium blue
          500: '#5b6bb3',   // Mid-tone blue
          600: '#4a5a97',   // Darker blue
          700: '#3f4a7e',   // CLIENT BRAND: Metallic Blue (primary)
          800: '#2f3960',   // WCAG Enhanced: Darker for better contrast (calculated for 4.5:1)
          900: '#252a4d',   // WCAG Enhanced: Deep navy for maximum contrast
          950: '#1a1e3a',   // Darkest navy - excellent contrast with white text
        },
        // Accent: Aztec Gold (#CA9E5B) - WCAG AA Enhanced for Accessibility  
        // Note: Original Aztec Gold may not meet WCAG AA (4.5:1) on white backgrounds
        accent: {
          50: '#fefcf7',   // Lightest gold tint
          100: '#fdf8eb',   // Very light gold
          200: '#faf0d2',   // Light gold cream
          300: '#f5e4a9',   // Medium light gold
          400: '#eed480',   // Medium gold
          500: '#e5c457',   // Mid-tone gold
          600: '#ca9e5b',   // CLIENT BRAND: Aztec Gold (accent) - use with dark text only
          700: '#a67234',   // WCAG Enhanced: Darker gold for better contrast
          800: '#8a5e2a',   // WCAG Enhanced: Deep bronze for 4.5:1 contrast
          900: '#6d4a21',   // WCAG Enhanced: Dark bronze for maximum contrast
          950: '#4a3318',   // Darkest bronze - excellent contrast with white text
        },
        // Supporting Luxury Palette
        // Neutral greys for balance and sophistication
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Royal complementary colours (maintaining existing for gradual transition)
        royal: {
          50: '#f8f9ff',
          100: '#f0f2ff',
          200: '#e3e8ff',
          300: '#cdd5ff',
          400: '#a5b4ff',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3c1361',
          950: '#2e0c57',
        },
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standard blue color palette for navigation hover states
        // HOVER FIX REASON: Official Tailwind documentation requires blue colors in config for compilation
        // IMPLEMENTATION: Standard Tailwind blue palette to ensure hover:text-blue-400 compiles correctly
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',  // This is the blue-400 we need for hover states
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        }
      },
      
      // Premium Typography System - CLIENT BRAND REQUIREMENTS
      // Documentation Source: Context7 MCP - Next.js Font Optimization + Google Fonts
      // Reference: /vercel/next.js - Multiple Google Font Configuration with CSS Variables
      // CLIENT SPECIFICATION: Playfair Display (headers) + Source Serif 4 (body)
      fontFamily: {
        /**
         * Source Serif 4 - Primary Body Font (CLIENT REQUIREMENT)
         * Documentation Source: Context7 MCP - Google Fonts Variable Font Implementation
         * Reference: /vercel/next.js - CSS Variable Integration Pattern
         * Reference: https://fonts.google.com/specimen/Source+Serif+4
         * 
         * Font Characteristics:
         * - Variable serif font designed by Frank Grießhammer at Adobe
         * - Exceptional readability for extended reading sessions
         * - Contemporary interpretation of transitional serif design
         * - Variable weight range: 200-900 (dynamic weight scaling)
         * - Full italic support with optical corrections
         * - Optimized for both digital screens and print media
         * 
         * Brand Usage Guidelines (MY PRIVATE TUTOR ONLINE):
         * - PRIMARY font for all body text, paragraphs, and content
         * - Academic content, course descriptions, testimonials
         * - Professional correspondence and formal communications
         * - Maintains excellent legibility at 14px+ for web accessibility
         * - Conveys scholarly authority and educational excellence
         */
        serif: [
          'var(--font-source-serif-4)',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'serif',
        ],
        /**
         * Playfair Display - Premium Display Font (CLIENT REQUIREMENT)
         * Documentation Source: Context7 MCP - Next.js Google Font CSS Variables
         * Reference: /vercel/next.js - Font Display Strategy Configuration
         * Reference: https://fonts.google.com/specimen/Playfair+Display
         * 
         * Font Characteristics:
         * - High-contrast serif display font by Claus Eggers Sørensen
         * - Sophisticated, elegant aesthetic inspired by 18th-century typography
         * - Sharp serifs with dramatic thick/thin stroke contrast
         * - Variable weight range: 400-900 (Regular to Black)
         * - Distinctive italic variants with calligraphic elements
         * - Perfect for luxury branding and premium positioning
         * 
         * Brand Usage Guidelines (MY PRIVATE TUTOR ONLINE):
         * - EXCLUSIVE use for page headings (H1, H2, H3)
         * - Hero section titles and main call-to-action headers
         * - Service titles and premium feature highlights
         * - Brand taglines and marketing copy headers
         * - Creates strong visual hierarchy and luxury brand identity
         * - Reinforces royal endorsement and elite positioning
         */
        display: [
          'var(--font-playfair-display)',
          'Playfair Display',
          'Georgia',
          'Didot',
          'Times New Roman',
          'serif',
        ],
        /**
         * Sans-Serif Font Family (Fallback)
         * Used for UI elements and accessibility when serif isn't appropriate
         */
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
        /**
         * Monospace Font Family
         * Used for code blocks and technical content
         */
        mono: [
          'Fira Code',
          'Monaco',
          'Cascadia Code',
          'Segoe UI Mono',
          'Roboto Mono',
          'Oxygen Mono',
          'Ubuntu Monospace',
          'Source Code Pro',
          'Fira Mono',
          'Droid Sans Mono',
          'Courier New',
          'monospace',
        ],
      },
      
      // Enhanced typography scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      // Design tokens - CLAUDE.md rule 29
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Animation and motion - CLAUDE.md rule 31
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scroll': 'scroll 30s linear infinite',
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
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
          from: {
            backgroundPosition: '0 0'
          },
          to: {
            backgroundPosition: '-200% 0'
          }
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
      
      // Box shadows for premium feel
      boxShadow: {
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'royal': '0 25px 50px -12px rgba(124, 58, 237, 0.25)',
        'gold': '0 25px 50px -12px rgba(234, 179, 8, 0.25)',
      },
      
      // Border radius for consistent design
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      
      // Container sizes
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          'sm': '640px',
          'md': '768px', 
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1400px',
        },
      },
    },
  },
  
  plugins: [
    // Form styling
    require('@tailwindcss/forms')({
      strategy: 'class', // Only add styles when class is present
    }),
    
    // Typography plugin for rich text content
    require('@tailwindcss/typography'),
    
    // Container queries
    require('@tailwindcss/container-queries'),
    
    // Aspect ratio utilities
    require('@tailwindcss/aspect-ratio'),
  ],
  
  // Prefix for avoiding conflicts
  prefix: '',
  
  // Important configuration
  important: false,
}

export default config