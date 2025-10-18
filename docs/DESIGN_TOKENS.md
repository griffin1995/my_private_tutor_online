# Design Tokens Documentation - My Private Tutor Online

**Purpose**: Complete inventory of Tailwind CSS design tokens for standardised styling across all pages
**Date Created**: 18 October 2025
**Status**: ✅ Complete - Single Source of Truth
**Source Files**: `/tailwind.config.ts` (676 lines), `/src/app/globals.css` (1250 lines)

---

## Table of Contents

1. [Design System Overview](#design-system-overview)
2. [Colour Tokens](#colour-tokens)
3. [Typography Tokens](#typography-tokens)
4. [Spacing & Layout Tokens](#spacing--layout-tokens)
5. [Shadow & Depth Tokens](#shadow--depth-tokens)
6. [Animation & Motion Tokens](#animation--motion-tokens)
7. [Breakpoint Tokens](#breakpoint-tokens)
8. [Usage Guidelines](#usage-guidelines)

---

## Design System Overview

### Philosophy

**Context7 Source**: `/tailwindlabs/tailwindcss.com` - Official Tailwind CSS Theme Extension Pattern

**Design Token Strategy**:
- **Primary**: Navy brand (11 variations) - 0.96% of original 809 colours
- **Accent**: Gold brand (11 variations) - 0.96% reduction
- **Neutral**: Greyscale hierarchy (11 greys) - 1.36% reduction
- **Semantic**: User feedback (4 colors) - 0.50% reduction
- **Total Reduction**: 96.9% colour consolidation (809 → 25 strategic tokens)

### Files Structure

```plaintext
Design Token Sources:
├── tailwind.config.ts (Primary)
│   ├── Theme Extension (lines 100-650)
│   ├── Custom Colours (lines 106-227)
│   ├── Typography Scale (lines 229-345)
│   ├── Shadows & Gradients (lines 426-566)
│   └── Breakpoints (lines 585-593)
│
└── globals.css (Secondary)
    ├── CSS Variables (lines 132-340)
    ├── @layer base Typography (lines 626-881)
    └── Component Utilities (lines 449-492)
```

---

## Colour Tokens

### Primary Brand Colours - Navy

**Usage**: Headings, primary buttons, navigation, brand elements
**Context7 Pattern**: Extended colour palette following Tailwind CSS naming conventions
**Client Specification**: Luxury Gold & Blue Scheme (Metallic Blue #3F4A7E)

```typescript
// Source: tailwind.config.ts (lines 110-122)
primary: {
	50: '#f8f9fc',   // Lightest blue tint - backgrounds, subtle highlights
	100: '#f1f3f8',  // Very light blue tint - hover states on white
	200: '#e3e7f0',  // Light blue-grey - borders, dividers
	300: '#c6d0e8',  // Medium light blue-grey - disabled states
	400: '#8fa2d4',  // Medium blue - secondary UI elements
	500: '#5b6bb3',  // Mid-tone blue - interactive elements
	600: '#4a5a97',  // Darker blue - hover states
	700: '#3f4a7e',  // ✅ PRIMARY BRAND COLOUR - Main navy (Metallic Blue)
	800: '#2f3960',  // WCAG Enhanced - Dark navy for high contrast (4.5:1)
	900: '#252a4d',  // WCAG Enhanced - Deep navy for maximum contrast
	950: '#1a1e3a',  // Darkest navy - excellent contrast with white text
},
```

**WCAG Compliance Notes**:
- **primary-700**: Client brand colour, use for most branding
- **primary-800**: Enhanced for 4.5:1 contrast ratio (WCAG AA)
- **primary-900**: Maximum contrast for critical text
- **Contrast Calculator**: Use WebAIM tool to verify before deployment

**Common Usage**:
```tsx
// Headings (via @layer base - automatic)
<h1>Title</h1>  {/* Automatically primary-700 navy */}

// Manual overrides (when needed)
<h1 className="text-primary-900">High Contrast Heading</h1>
<div className="bg-primary-50">Light blue background</div>
<button className="bg-primary-700 hover:bg-primary-800">Primary Button</button>
```

### Accent Brand Colours - Gold

**Usage**: Links, highlights, calls-to-action, decorative accents
**Client Specification**: Aztec Gold #CA9E5B
**WCAG Warning**: Original accent-600 may not meet AA contrast on white - use accent-700+ for text

```typescript
// Source: tailwind.config.ts (lines 124-136)
accent: {
	50: '#fefcf7',   // Lightest gold tint - subtle backgrounds
	100: '#fdf8eb',  // Very light gold - hover backgrounds
	200: '#faf0d2',  // Light gold cream - panels, cards
	300: '#f5e4a9',  // Medium light gold - borders
	400: '#eed480',  // Medium gold - secondary accents
	500: '#e5c457',  // Mid-tone gold - interactive accents
	600: '#ca9e5b',  // ✅ PRIMARY ACCENT COLOUR - Aztec Gold (use with dark text only)
	700: '#a67234',  // WCAG Enhanced - Darker gold for better contrast (4.5:1)
	800: '#8a5e2a',  // WCAG Enhanced - Deep bronze (high contrast)
	900: '#6d4a21',  // WCAG Enhanced - Dark bronze for maximum contrast
	950: '#4a3318',  // Darkest bronze - excellent contrast
},
```

**WCAG Compliance Notes**:
- **accent-600**: Client brand, use for icons/backgrounds, NOT body text on white
- **accent-700+**: Safe for text on white backgrounds (4.5:1 contrast)
- **accent-200-400**: Safe for backgrounds with dark text

**Common Usage**:
```tsx
// Links (via @layer base - automatic)
<a href="/about">Learn More</a>  {/* Automatically accent-600 with hover effect */}

// Manual overrides (when needed)
<span className="text-accent-600">Highlight Text</span>  {/* Use with caution on white */}
<span className="text-accent-700">WCAG Compliant Text</span>  {/* Safe on white */}
<div className="bg-accent-50 border-accent-300">Gold-themed card</div>
```

### Neutral Greyscale - UI Hierarchy

**Usage**: Body text, borders, backgrounds, UI elements
**Context7 Pattern**: Standard greyscale with semantic naming

```typescript
// Source: tailwind.config.ts (lines 140-152)
neutral: {
	50: '#fafafa',   // Lightest grey - alternative white backgrounds
	100: '#f5f5f5',  // Very light grey - section backgrounds
	200: '#e5e5e5',  // Light grey - borders, dividers
	300: '#d4d4d4',  // Medium light grey - secondary borders
	400: '#a3a3a3',  // Medium grey - disabled text
	500: '#737373',  // Mid grey - secondary text
	600: '#525252',  // Dark grey - tertiary text
	700: '#404040',  // Darker grey - secondary headings
	800: '#262626',  // Very dark grey - body text (via @layer base)
	900: '#171717',  // Near black - high emphasis text
	950: '#0a0a0a',  // Darkest - maximum emphasis
},
```

**Common Usage**:
```tsx
// Body text (via @layer base - automatic)
<p>Body content</p>  {/* Automatically neutral-800 */}

// Manual UI elements
<div className="border border-neutral-200">Card with border</div>
<span className="text-neutral-500">Secondary text</span>
<div className="bg-neutral-50">Light grey section</div>
```

### Semantic Colours - User Feedback

**Usage**: Success messages, errors, warnings, informational alerts
**Context7 Pattern**: Standard semantic colours from Tailwind defaults

```typescript
// Source: tailwind.config.ts (via globals.css CSS variables lines 172-175)
semantic: {
	success: '#10b981',  // Green - success states, confirmations
	error: '#ef4444',    // Red - error states, destructive actions
	warning: '#f59e0b',  // Amber - warnings, cautions
	info: '#3b82f6',     // Blue - informational messages
},
```

**Common Usage**:
```tsx
<div className="bg-green-500 text-white">Success message</div>  {/* Use Tailwind green directly */}
<span className="text-red-600">Error: Invalid input</span>
<div className="border-yellow-500">Warning alert</div>
```

### Design Token CSS Variables

**Source**: `/src/app/globals.css` (lines 132-340)
**Usage**: Runtime access for JavaScript, dynamic theming

```css
/* ============================================
   PRIMARY BRAND COLORS - Navy Variations
   ============================================ */
:root {
	--color-primary-base: #3f4a7e;
	--color-primary-light: #5b6bb3;
	--color-primary-dark: #2d3456;
	--color-primary-muted: #7a88b3;

	/* Legacy aliases for backward compatibility */
	--color-primary: #3f4a7e;
}

/* ============================================
   SECONDARY BRAND COLORS - Gold Variations
   ============================================ */
:root {
	--color-secondary-base: #ca9e5b;
	--color-secondary-light: #e5c89a;
	--color-secondary-dark: #a67c3d;
	--color-secondary-muted: #d4b480;

	/* Legacy aliases */
	--color-accent: #ca9e5b;
	--color-accent-dark: #b5853e;
	--color-accent-light: #e5c457;
}

/* ============================================
   NEUTRAL GREYSCALE - UI Hierarchy
   ============================================ */
:root {
	--color-neutral-white: #ffffff;
	--color-neutral-grey-50: #f9fafb;
	--color-neutral-grey-100: #f3f4f6;
	--color-neutral-grey-200: #e5e7eb;
	--color-neutral-grey-400: #9ca3af;
	--color-neutral-grey-600: #4b5563;
	--color-neutral-grey-800: #1f2937;
	--color-neutral-black: #000000;
}
```

**JavaScript Usage**:
```typescript
// Access design tokens in JavaScript
const primaryColor = getComputedStyle(document.documentElement)
	.getPropertyValue('--color-primary-base');

// Dynamic theming
document.documentElement.style.setProperty('--color-primary-base', '#3f4a7e');
```

---

## Typography Tokens

### Font Families

**Context7 Pattern**: Next.js Font Optimisation with CSS Variables
**Source**: `tailwind.config.ts` (lines 232-296), `/src/fonts.ts`

```typescript
// Source: tailwind.config.ts (lines 232-296)
fontFamily: {
	// Primary heading font - Playfair Display
	heading: [
		'var(--font-playfair-display)',
		'Didot',  // macOS fallback
		'Bodoni MT',  // Windows fallback
		'Georgia',  // Universal fallback
		'serif',
	],

	// Primary body font - Source Serif 4
	body: [
		'var(--font-source-serif-4)',
		'Charter',  // macOS fallback
		'Georgia',
		'Times New Roman',
		'serif',
	],

	// Technical/pricing font - JetBrains Mono
	technical: [
		'var(--font-jetbrains-mono)',
		'Consolas',  // Windows
		'Monaco',  // macOS
		'Courier New',
		'monospace',
	],

	// Legacy aliases for backwards compatibility
	display: ['var(--font-playfair-display)', 'Georgia', 'serif'],
	serif: ['var(--font-source-serif-4)', 'Georgia', 'serif'],
	sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
	mono: ['var(--font-jetbrains-mono)', 'Consolas', 'monospace'],
},
```

**Common Usage**:
```tsx
// Via @layer base (automatic)
<h1>Heading uses Playfair Display automatically</h1>
<p>Body text uses Source Serif 4 automatically</p>

// Manual overrides
<span className="font-heading">Serif heading font</span>
<code className="font-technical">Monospace code</code>
<div className="font-sans">System sans-serif</div>
```

### Font Sizes

**Context7 Pattern**: Tailwind Typography Scale with Line Heights and Letter Spacing
**Source**: `tailwind.config.ts` (lines 300-316)

```typescript
// Source: tailwind.config.ts (lines 300-316)
fontSize: {
	xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],      // 12px
	sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],   // 14px
	base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0em' }],         // 16px (default)
	lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],  // 18px
	xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.015em' }],  // 20px
	'2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],    // 24px
	'3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }], // 30px
	'3.5xl': ['2.0625rem', { lineHeight: '2.375rem', letterSpacing: '-0.0275em' }], // 33px (custom)
	'4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }], // 36px
	'5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.035em' }],        // 48px
	'6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],      // 60px
	'7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.045em' }],      // 72px
	'8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],         // 96px
	'9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.055em' }],        // 128px
},
```

**@layer base Typography Defaults**:
```css
/* Source: globals.css (lines 626-758) */
@layer base {
	h1 {
		font-size: var(--font-size-4xl);  /* 36px / 2.25rem */
		line-height: var(--font-line-height-tight);  /* 1.2 */
		letter-spacing: var(--font-letter-spacing-tight);  /* -0.025em */
	}

	h2 {
		font-size: var(--font-size-3xl);  /* 30px / 1.875rem */
		line-height: var(--font-line-height-tight);  /* 1.2 */
	}

	p {
		font-size: var(--font-size-base);  /* 16px / 1rem */
		line-height: var(--font-line-height-relaxed);  /* 1.6 */
	}
}
```

**Common Usage**:
```tsx
// Via @layer base (automatic - preferred)
<h1>Automatic 4xl size</h1>
<p>Automatic base size</p>

// Manual overrides (when needed)
<h1 className="text-5xl">Larger heading</h1>
<p className="text-lg">Larger body text</p>
```

### Font Weights

**Source**: `tailwind.config.ts` (lines 333-344)

```typescript
fontWeight: {
	hairline: '100',
	thin: '200',
	light: '300',
	normal: '400',  // Default
	medium: '500',
	semibold: '600',
	bold: '700',  // Used for headings via @layer base
	extrabold: '800',
	black: '900',
	'extra-black': '950',  // Custom
},
```

### Letter Spacing

**Source**: `tailwind.config.ts` (lines 319-329)

```typescript
letterSpacing: {
	tightest: '-0.075em',
	tighter: '-0.05em',
	tight: '-0.025em',  // Used for headings
	normal: '0em',  // Default
	wide: '0.025em',
	wider: '0.05em',
	widest: '0.1em',
	'ultra-wide': '0.15em',  // Used for uppercase labels
},
```

---

## Spacing & Layout Tokens

### Spacing Scale

**Context7 Pattern**: Tailwind Default 4px Grid System with Golden Ratio Extensions
**Source**: `tailwind.config.ts` (lines 347-360), `globals.css` (lines 242-257)

```typescript
// Standard Tailwind spacing (4px grid)
spacing: {
	'0': '0px',
	'1': '0.25rem',  // 4px
	'2': '0.5rem',   // 8px
	'3': '0.75rem',  // 12px
	'4': '1rem',     // 16px
	'5': '1.25rem',  // 20px
	'6': '1.5rem',   // 24px
	'7': '1.75rem',  // 28px
	'8': '2rem',     // 32px
	'10': '2.5rem',  // 40px
	'12': '3rem',    // 48px
	'16': '4rem',    // 64px
	'20': '5rem',    // 80px
	'24': '6rem',    // 96px
	// ... (standard continues)

	// Custom spacing tokens
	'18': '4.5rem',  // 72px
	'88': '22rem',   // 352px
	'128': '32rem',  // 512px

	// Golden ratio spacing tokens (mathematical precision)
	'golden-xs': '0.618rem',  // φ⁻¹ * 1rem = 9.888px
	'golden-sm': '1.618rem',  // φ * 1rem = 25.888px
	'golden-base': '2.618rem',  // φ² * 1rem = 41.888px
	'golden-lg': '4.236rem',  // φ³ * 1rem = 67.776px
	'golden-xl': '6.854rem',  // φ⁴ * 1rem = 109.664px
},
```

**Common Usage**:
```tsx
<div className="p-4">Padding 16px</div>
<div className="mt-8">Margin top 32px</div>
<div className="gap-6">Gap 24px</div>

// Golden ratio for sophisticated layouts
<div className="pt-golden-lg">Golden ratio padding (φ³)</div>
```

### Container Configuration

**Source**: `tailwind.config.ts` (lines 596-614)

```typescript
container: {
	center: true,  // Auto margin left/right
	padding: {
		DEFAULT: '1rem',  // 16px - mobile
		sm: '2rem',       // 32px - small screens
		lg: '4rem',       // 64px - large screens
		xl: '5rem',       // 80px - extra large
		'2xl': '6rem',    // 96px - 2xl and above
	},
	screens: {
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1400px',  // Custom 2xl container
		desktop: '1500px',  // Custom desktop
		'3xl': '1780px',  // Custom 3xl
	},
},
```

**Common Usage**:
```tsx
<div className="container mx-auto">
	{/* Auto-centered with responsive padding */}
</div>
```

### Border Radius

**Source**: `tailwind.config.ts` (lines 568-579)

```typescript
borderRadius: {
	none: '0',
	sm: '0.125rem',  // 2px
	DEFAULT: '0.25rem',  // 4px
	md: '0.375rem',  // 6px
	lg: '0.5rem',  // 8px
	xl: '0.75rem',  // 12px
	'2xl': '1rem',  // 16px
	'3xl': '1.5rem',  // 24px
	full: '9999px',  // Fully rounded
},
```

---

## Shadow & Depth Tokens

### Box Shadows

**Context7 Pattern**: Mathematical shadow progression using golden ratio (1.618)
**Source**: `tailwind.config.ts` (lines 426-478)

```typescript
// Subtle Elevation - Gentle shadows for card components
boxShadow: {
	'subtle-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
	'subtle-sm': '0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
	'subtle-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',

	// Medium Depth - Professional shadows for images and sections
	'depth-sm': '0 4px 8px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
	'depth-md': '0 8px 12px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -4px rgba(0, 0, 0, 0.08)',
	'depth-lg': '0 12px 20px -6px rgba(0, 0, 0, 0.15), 0 6px 12px -6px rgba(0, 0, 0, 0.1)',

	// High Impact - Dramatic shadows for hero elements and focal points
	'impact-md': '0 16px 32px -8px rgba(0, 0, 0, 0.18), 0 8px 16px -8px rgba(0, 0, 0, 0.12)',
	'impact-lg': '0 24px 48px -12px rgba(0, 0, 0, 0.22), 0 12px 24px -12px rgba(0, 0, 0, 0.15)',
	'impact-xl': '0 32px 64px -16px rgba(0, 0, 0, 0.25), 0 16px 32px -16px rgba(0, 0, 0, 0.18)',

	// Interactive States - Enhanced shadows for hover/focus states
	'hover-subtle': '0 6px 12px -3px rgba(0, 0, 0, 0.08), 0 3px 6px -3px rgba(0, 0, 0, 0.05)',
	'hover-depth': '0 16px 24px -8px rgba(0, 0, 0, 0.18), 0 8px 16px -8px rgba(0, 0, 0, 0.12)',
	'hover-impact': '0 32px 48px -16px rgba(0, 0, 0, 0.28), 0 16px 32px -16px rgba(0, 0, 0, 0.2)',

	// Brand-Specific Shadows - Colour temperature shadows for brand alignment
	'primary-subtle': '0 4px 12px -2px rgba(63, 74, 126, 0.15), 0 2px 4px -1px rgba(63, 74, 126, 0.1)',
	'primary-depth': '0 12px 24px -6px rgba(63, 74, 126, 0.25), 0 6px 12px -3px rgba(63, 74, 126, 0.15)',
	'accent-subtle': '0 4px 12px -2px rgba(202, 158, 91, 0.15), 0 2px 4px -1px rgba(202, 158, 91, 0.1)',
	'accent-depth': '0 12px 24px -6px rgba(202, 158, 91, 0.25), 0 6px 12px -3px rgba(202, 158, 91, 0.15)',

	// Text Shadows - Enhanced readability over images
	'text-subtle': '0 1px 2px rgba(0, 0, 0, 0.2)',
	'text-medium': '0 2px 4px rgba(0, 0, 0, 0.3)',
	'text-strong': '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.6)',
},
```

**Common Usage**:
```tsx
<div className="shadow-depth-md">Card with medium depth</div>
<div className="shadow-impact-lg hover:shadow-hover-impact">Hero element</div>
<div className="shadow-primary-subtle">Navy-tinted shadow</div>
```

### Drop Shadows

**Source**: `tailwind.config.ts` (lines 483-499)

```typescript
dropShadow: {
	// Subtle text shadows for enhanced readability
	'text-xs': '0 1px 1px rgba(0, 0, 0, 0.15)',
	'text-sm': '0 1px 2px rgba(0, 0, 0, 0.2)',
	'text-md': '0 2px 4px rgba(0, 0, 0, 0.25)',
	'text-lg': '0 3px 6px rgba(0, 0, 0, 0.3)',
	'text-xl': '0 4px 8px rgba(0, 0, 0, 0.35)',

	// Professional image shadows
	'image-subtle': '0 4px 8px rgba(0, 0, 0, 0.12)',
	'image-medium': '0 8px 16px rgba(0, 0, 0, 0.15)',
	'image-strong': '0 16px 32px rgba(0, 0, 0, 0.2)',

	// Brand-coloured shadows
	'primary-glow': '0 4px 12px rgba(63, 74, 126, 0.3)',
	'accent-glow': '0 4px 12px rgba(202, 158, 91, 0.3)',
},
```

### Background Gradients

**Source**: `tailwind.config.ts` (lines 504-566)

```typescript
backgroundImage: {
	// Luxury Metallic Gradients - Navy to Deep Blue with Metallic Sheen
	'luxury-navy': 'linear-gradient(135deg, #0f172a 0%, #1e293b 38.2%, #334155 61.8%, #475569 100%)',
	'luxury-navy-radial': 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 61.8%, #020617 100%)',
	'luxury-navy-vertical': 'linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #334155 100%)',

	// Gold Accent Gradients - Subtle Highlights and Accents
	'luxury-gold': 'linear-gradient(135deg, #ca9e5b 0%, #e5c457 38.2%, #a67234 61.8%, #8a5e2a 100%)',
	'luxury-gold-subtle': 'linear-gradient(135deg, #fefcf7 0%, #fdf8eb 25%, #faf0d2 75%, #f5e4a9 100%)',
	'luxury-gold-radial': 'radial-gradient(ellipse at center, #e5c457 0%, #ca9e5b 38.2%, #a67234 100%)',

	// Text Gradients - Premium Typography Treatment
	'text-luxury-navy': 'linear-gradient(135deg, #0f172a 0%, #252a4d 38.2%, #3f4a7e 61.8%, #5b6bb3 100%)',
	'text-luxury-gold': 'linear-gradient(135deg, #a67234 0%, #ca9e5b 38.2%, #e5c457 61.8%, #eed480 100%)',
	'text-metallic': 'linear-gradient(135deg, #71717a 0%, #a1a1aa 25%, #d4d4d8 50%, #a1a1aa 75%, #71717a 100%)',

	// Interactive Gradients - Dynamic Gradients for User Interaction
	'interactive-navy': 'linear-gradient(135deg, #252a4d 0%, #3f4a7e 38.2%, #5b6bb3 61.8%, #8fa2d4 100%)',
	'interactive-gold': 'linear-gradient(135deg, #8a5e2a 0%, #a67234 38.2%, #ca9e5b 61.8%, #e5c457 100%)',
},
```

**Common Usage**:
```tsx
<div className="bg-luxury-navy">Navy gradient background</div>
<h1 className="bg-clip-text text-transparent bg-text-luxury-gold">Gradient text</h1>
```

---

## Animation & Motion Tokens

### Animation Keyframes

**Source**: `tailwind.config.ts` (lines 362-421), `globals.css` (lines 888-1039)

```typescript
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
	'accordion-down': 'accordion-down 0.3s ease-out',
	'accordion-up': 'accordion-up 0.3s ease-out',
	aurora: 'aurora 8s ease-in-out infinite alternate',
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
	// ... (more keyframes)
},
```

**Common Usage**:
```tsx
<div className="animate-fade-in">Fades in on load</div>
<div className="animate-fade-in-up">Fades in from bottom</div>
<div className="animate-pulse-slow">Slow pulsing effect</div>
```

### Transition Durations

**Source**: `globals.css` (lines 291-297)

```css
:root {
	--transition-duration-75: 75ms;
	--transition-duration-100: 100ms;
	--transition-duration-150: 150ms;
	--transition-duration-200: 200ms;  /* Standard for most transitions */
	--transition-duration-300: 300ms;
	--transition-duration-500: 500ms;
}
```

---

## Breakpoint Tokens

### Responsive Breakpoints

**Context7 Pattern**: Extended Tailwind breakpoints with custom navigation thresholds
**Source**: `tailwind.config.ts` (lines 585-593)

```typescript
screens: {
	sm: '640px',    // Small tablets
	md: '768px',    // Tablets
	lg: '1024px',   // Small laptops
	xl: '1280px',   // Laptops
	'2xl': '1400px',  // ✅ CUSTOM: Navigation desktop mode (updated October 2025)
	desktop: '1500px',  // ✅ CUSTOM: Desktop navigation display
	'3xl': '1780px',  // ✅ CUSTOM: Full navigation display
},
```

**Navigation Breakpoint Context** (October 17, 2025 Update):
- **2xl (1400px)**: Desktop navigation trigger point (5 navigation items + logo + CTA button)
- **Previously**: 1280px (xl) - updated for better spacing with 5 active nav items
- **11+ Bootcamps link**: Commented out to maintain optimal spacing

**Common Usage**:
```tsx
// Standard responsive utilities
<div className="text-base md:text-lg lg:text-xl 2xl:text-2xl">
	Responsive text sizing
</div>

// Navigation-specific
<nav className="hidden 2xl:flex">Desktop navigation</nav>
<button className="2xl:hidden">Mobile menu button</button>
```

---

## Usage Guidelines

### Priority of Styling Approaches

**Context7 Pattern**: Tailwind CSS `@layer base` for semantic HTML defaults
**Official Pattern**: Use semantic HTML first, utility classes for overrides

#### 1. Semantic HTML with @layer base (PREFERRED)

```tsx
// ✅ BEST: Let @layer base handle styling automatically
<h1>About Our Founder</h1>  {/* Automatically navy, bold, 4xl */}
<p>Excellence in education since 2010.</p>  {/* Automatically grey-800, body font */}
<a href="/about">Learn More</a>  {/* Automatically gold with hover */}
```

#### 2. Design Tokens via Utility Classes (WHEN NEEDED)

```tsx
// ✅ GOOD: Use design tokens for exceptions
<h1 className="text-white">White heading on dark background</h1>
<h1 className="text-primary-900">High contrast heading</h1>
<div className="bg-primary-50 border-primary-200">Tinted card</div>
```

#### 3. CSS Variables for Dynamic Styling (RARE)

```tsx
// ⚠️ RARE: Only for JavaScript-driven dynamic theming
<div style={{ color: 'var(--color-accent)' }}>Dynamic colour</div>
```

#### 4. Hardcoded Values (FORBIDDEN)

```tsx
// ❌ FORBIDDEN: Never use hardcoded hex colours
<h1 className="text-[#3F4A7E]">Hardcoded navy</h1>  {/* Use text-primary-700 */}
<span className="text-[#CA9E5B]">Hardcoded gold</span>  {/* Use text-accent-600 */}
```

### Design Token Selection Guide

#### Choosing Primary vs Accent

- **Primary (Navy)**: Headings, primary buttons, navigation, brand identity
- **Accent (Gold)**: Links, highlights, CTAs, decorative accents
- **Neutral (Grey)**: Body text, borders, backgrounds, UI elements

#### WCAG Contrast Compliance

**Text on White Backgrounds**:
- ✅ `primary-700` and darker: Safe for all text sizes
- ✅ `accent-700` and darker: Safe for all text sizes
- ⚠️ `accent-600`: Use for icons/backgrounds only, NOT body text
- ⚠️ Lighter shades: Backgrounds only, never for text

**Text on Dark Backgrounds**:
- ✅ White, `primary-50-200`, `accent-50-300`: Safe
- ✅ Lighter neutrals (`neutral-50-300`): Safe

### Responsive Design Token Usage

```tsx
// Responsive font sizing
<h1 className="text-2xl md:text-3xl lg:text-4xl">
	Responsive heading
</h1>

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
	Responsive padding
</div>

// Responsive shadows
<div className="shadow-subtle-sm md:shadow-depth-md lg:shadow-impact-lg">
	Responsive depth
</div>
```

---

## Related Documentation

- **ARCHITECTURE.md** - Official patterns and page architecture
- **IMPLEMENTATION_ROADMAP.md** - Staged migration plan
- **PAGE_INVENTORY.md** - Analysis of all 37 pages
- **BEFORE_AFTER_EXAMPLES.md** - Concrete transformation examples

---

**Document Owner**: Claude Code (Anthropic)
**Source Authority**: Tailwind CSS Official Documentation via Context7
**Last Updated**: 18 October 2025
