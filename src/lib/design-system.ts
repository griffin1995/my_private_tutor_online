// Design System Tokens for My Private Tutor Online
// CLAUDE.md rule 29: Centralised design tokens for spacing, colours, typography

// Brand Colors - CLAUDE.md rule 26
export const colors = {
  // Primary navy/slate-900 (#0f172a)
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
    900: '#0f172a', // Primary brand navy
    950: '#020617'
  },
  
  // Gold accent (#eab308)
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
    950: '#422006'
  },
  
  // Royal theme for premium branding
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
    950: '#2e0c57'
  },
  
  // White backgrounds - CLAUDE.md rule 43
  white: '#ffffff',
  black: '#000000'
} as const

// Typography System - CLAUDE.md rule 27
export const typography = {
  fontFamilies: {
    serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'], // Headings
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'], // Body
    mono: ['Fira Code', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'monospace']
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem'     // 128px
  },
  
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375', 
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  }
} as const

// Spacing System - CLAUDE.md rule 29
export const spacing = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px  
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
  72: '18rem',    // 288px
  80: '20rem',    // 320px
  96: '24rem'     // 384px
} as const

// Border Radius System
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
} as const

// Box Shadows for Premium Feel
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  premium: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  royal: '0 25px 50px -12px rgba(124, 58, 237, 0.25)',
  gold: '0 25px 50px -12px rgba(234, 179, 8, 0.25)'
} as const

// Breakpoints for Responsive Design - CLAUDE.md rule 45
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px'
} as const

// Animation Durations and Easings - CLAUDE.md rule 31
export const animations = {
  durations: {
    fastest: '0.1s',
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    slowest: '1s'
  },
  
  easings: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)', 
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }
} as const

// Z-Index Scale
export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
} as const

// Design Token Utilities
export const getColor = (colorPath: string): string => {
  const keys = colorPath.split('.')
  let current: Record<string, unknown> = colors as Record<string, unknown>
  
  for (const key of keys) {
    if (current && typeof current[key] === 'object' && current[key] !== null) {
      current = current[key] as Record<string, unknown>
    } else if (current && typeof current[key] === 'string') {
      return current[key] as string
    } else {
      // Color lookup fallback applied
      return colors.primary[900] // Fallback to primary
    }
  }
  
  return typeof current === 'string' ? current : colors.primary[900]
}

export const getSpacing = (size: keyof typeof spacing) => {
  return spacing[size] || spacing[4] // Fallback to 1rem
}

export const getShadow = (shadowName: keyof typeof shadows) => {
  return shadows[shadowName] || shadows.base
}

// CSS Custom Properties Generator
export const generateCSSCustomProperties = () => {
  const properties: Record<string, string> = {}
  
  // Colors
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      properties[`--color-${colorName}`] = colorValue
    } else {
      Object.entries(colorValue).forEach(([shade, value]) => {
        properties[`--color-${colorName}-${shade}`] = value
      })
    }
  })
  
  // Spacing
  Object.entries(spacing).forEach(([size, value]) => {
    properties[`--spacing-${size}`] = value
  })
  
  // Typography
  properties['--font-serif'] = typography.fontFamilies.serif.join(', ')
  properties['--font-sans'] = typography.fontFamilies.sans.join(', ')
  properties['--font-mono'] = typography.fontFamilies.mono.join(', ')
  
  return properties
}

// Utility Classes Generator
export const generateUtilityClasses = () => {
  return {
    // Text colors
    textPrimary: `text-primary-900`,
    textAccent: `text-accent-500`,
    textRoyal: `text-royal-500`,
    textMuted: `text-primary-600`,
    textLight: `text-primary-400`,
    
    // Background colors  
    bgPrimary: `bg-primary-900`,
    bgAccent: `bg-accent-500`,
    bgRoyal: `bg-royal-500`,
    bgWhite: `bg-white`,
    
    // Premium styling
    shadowPremium: `shadow-premium`,
    shadowRoyal: `shadow-royal`,
    shadowGold: `shadow-gold`,
    
    // Typography
    headingSerif: `font-serif font-semibold`,
    bodyText: `font-sans font-normal`,
    
    // Animations with reduced motion support
    fadeIn: `animate-fade-in motion-reduce:animate-none`,
    fadeInUp: `animate-fade-in-up motion-reduce:animate-none`,
    scaleIn: `animate-scale-in motion-reduce:animate-none`
  }
}

// Component Variant Helpers - CLAUDE.md rule 28
export type VariantProps<T> = {
  variant?: keyof T
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'accent' | 'royal'
}

export const createVariants = <T extends Record<string, string>>(variants: T) => {
  return (props: VariantProps<T>) => {
    const variant = props.variant ? variants[props.variant] : Object.values(variants)[0]
    return variant || ''
  }
}

// Context7 MCP Documentation Source: /microsoft/typescript
// Reference: ESLint import/no-anonymous-default-export rule
// Purpose: Export named object instead of anonymous object for better debugging
const DesignSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  animations,
  zIndex,
  getColor,
  getSpacing,
  getShadow,
  generateCSSCustomProperties,
  generateUtilityClasses,
  createVariants
}

export default DesignSystem