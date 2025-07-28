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
  
  // Content paths for Tailwind CSS 4.x
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{json,md,mdx}',
  ],
  
  theme: {
    extend: {
      // Design System Colors - CLAUDE.md rule 26
      colors: {
        // Primary brand colors
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a', // Navy/Slate-900
          950: '#020617',
        },
        // Gold accent color
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308', // Gold accent
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        // Royal theme colors
        royal: {
          50: '#f8f9ff',
          100: '#f0f2ff',
          200: '#e3e8ff',
          300: '#cdd5ff',
          400: '#a5b4ff',
          500: '#7c3aed', // Royal purple
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3c1361',
          950: '#2e0c57',
        }
      },
      
      // Typography - CLAUDE.md rule 27
      fontFamily: {
        sans: [
          'Inter',
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
        serif: [
          'Playfair Display',
          'Georgia',
          'Times New Roman',
          'serif',
        ],
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
  
  // Safelist for dynamic classes that might be purged
  safelist: [
    'animate-fade-in',
    'animate-fade-in-up',
    'animate-scale-in',
    'animate-slide-in-left',
    'animate-slide-in-right',
    'shadow-premium',
    'shadow-royal',
    'shadow-gold',
  ],
}

export default config