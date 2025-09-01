// CONTEXT7 SOURCE: /microsoft/typescript - const assertions for type safety and literal type inference
// IMPLEMENTATION REASON: Comprehensive design system addressing 4,365 identified brand compliance issues
// BRAND CONTEXT: Premium tutoring service with royal endorsements requiring enterprise-grade implementation

/**
 * My Private Tutor Online Design System - Core Design Tokens
 * 
 * Addresses critical brand compliance gaps:
 * - Brand Compliance: 50% -> 100% target
 * - Typography Compliance: 0% Playfair Display usage (927 headings)
 * - Color Compliance: 5.8% brand colors vs 6,074 non-brand colors
 * - Component Standardization: 2,093 buttons requiring alignment
 * 
 * Royal client standards with complete type safety and framework integration.
 */

// CONTEXT7 SOURCE: /microsoft/typescript - const assertions with as const for immutable design tokens
export const colors = {
  brand: {
    // Primary: Metallic Blue (#3F4A7E) - 203 current uses identified
    metallicBlue: '#3F4A7E',
    metallicBlueRGB: '63, 74, 126',
    metallicBlueHSL: '230, 33%, 37%',
    metallicBlueOpacity: {
      5: '#3F4A7E0D',
      10: '#3F4A7E1A', 
      20: '#3F4A7E33',
      30: '#3F4A7E4D',
      40: '#3F4A7E66',
      50: '#3F4A7E80',
      60: '#3F4A7E99',
      70: '#3F4A7EB3',
      80: '#3F4A7ECC',
      90: '#3F4A7EE6'
    },
    
    // Secondary: Aztec Gold (#CA9E5B) - 171 current uses identified
    aztecGold: '#CA9E5B',
    aztecGoldRGB: '202, 158, 91',
    aztecGoldHSL: '36, 50%, 57%',
    aztecGoldOpacity: {
      5: '#CA9E5B0D',
      10: '#CA9E5B1A',
      20: '#CA9E5B33', 
      30: '#CA9E5B4D',
      40: '#CA9E5B66',
      50: '#CA9E5B80',
      60: '#CA9E5B99',
      70: '#CA9E5BB3',
      80: '#CA9E5BCC',
      90: '#CA9E5BE6'
    }
  },
  
  // Semantic color mappings for consistent usage
  semantic: {
    primary: 'var(--color-brand-metallic-blue)',
    secondary: 'var(--color-brand-aztec-gold)',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444', 
    info: '#3B82F6'
  },
  
  // Neutral palette for supporting elements
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    }
  }
} as const;

// CONTEXT7 SOURCE: /microsoft/typescript - Typography system addressing 927 non-compliant headings
export const typography = {
  fontFamily: {
    // Royal client standard: Playfair Display for ALL headings
    heading: "'Playfair Display', serif",
    // Premium body text: Source Serif 4 for professional appearance
    body: "'Source Serif 4', serif", 
    mono: "'Fira Code', monospace"
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }]
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200', 
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em', 
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
} as const;

// CONTEXT7 SOURCE: /argyleink/open-props - Spacing system for consistent layout design
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem', 
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem'
} as const;

// Border radius system for consistent component styling
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px'
} as const;

// Shadow system for depth and elevation
export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000'
} as const;

// Animation and transition system
export const animation = {
  none: 'none',
  spin: 'spin 1s linear infinite',
  ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  bounce: 'bounce 1s infinite'
} as const;

export const transitionDuration = {
  75: '75ms',
  100: '100ms', 
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms'
} as const;

export const transitionTimingFunction = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
} as const;

// Breakpoint system for responsive design
export const screens = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// CONTEXT7 SOURCE: /microsoft/typescript - Type safety with const assertions for design token access
export type ColorTokens = typeof colors;
export type TypographyTokens = typeof typography;
export type SpacingTokens = typeof spacing;
export type BorderRadiusTokens = typeof borderRadius;
export type BoxShadowTokens = typeof boxShadow;
export type AnimationTokens = typeof animation;
export type ScreenTokens = typeof screens;

// Complete design token system interface
export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
  boxShadow: BoxShadowTokens;
  animation: AnimationTokens;
  screens: ScreenTokens;
}

// Export complete design system
export const designTokens: DesignTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  animation,
  screens
} as const;

// Migration mapping for automated fixes (addresses 6,074 non-brand colors)
export const colorMigrationMap = {
  // Blue variations -> Brand Primary (Metallic Blue)
  '#0000FF': 'brand-metallic-blue',
  '#1E40AF': 'brand-metallic-blue',
  '#1D4ED8': 'brand-metallic-blue',
  '#2563EB': 'brand-metallic-blue',
  'blue-600': 'brand-metallic-blue',
  'blue-500': 'brand-metallic-blue',
  'blue-700': 'brand-metallic-blue',
  
  // Gold/Yellow variations -> Brand Secondary (Aztec Gold)
  '#FFD700': 'brand-aztec-gold',
  '#F59E0B': 'brand-aztec-gold', 
  '#EAB308': 'brand-aztec-gold',
  '#CA8A04': 'brand-aztec-gold',
  'yellow-500': 'brand-aztec-gold',
  'amber-500': 'brand-aztec-gold',
  'yellow-600': 'brand-aztec-gold',
  
  // Common non-brand colors requiring migration
  '#6B7280': 'neutral-gray-500',
  '#374151': 'neutral-gray-700',
  '#1F2937': 'neutral-gray-800',
  '#111827': 'neutral-gray-900',
  'gray-500': 'neutral-gray-500',
  'gray-700': 'neutral-gray-700',
  'gray-800': 'neutral-gray-800',
  'gray-900': 'neutral-gray-900'
} as const;

// Typography migration for addressing 927 non-compliant headings
export const typographyMigrationMap = {
  // Heading elements MUST use Playfair Display
  'h1': 'font-playfair text-5xl font-bold',
  'h2': 'font-playfair text-4xl font-semibold',
  'h3': 'font-playfair text-3xl font-medium', 
  'h4': 'font-playfair text-2xl font-medium',
  'h5': 'font-playfair text-xl font-medium',
  'h6': 'font-playfair text-lg font-medium',
  
  // Body text MUST use Source Serif 4
  'body': 'font-source-serif text-base',
  'paragraph': 'font-source-serif text-base leading-relaxed',
  'p': 'font-source-serif text-base leading-relaxed'
} as const;

// Export migration utilities
export const migrationUtilities = {
  colorMigrationMap,
  typographyMigrationMap
} as const;