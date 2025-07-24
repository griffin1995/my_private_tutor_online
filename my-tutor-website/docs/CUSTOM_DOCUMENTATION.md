# Custom Project Documentation

This file contains official documentation for all the technologies and patterns we actually use in our My Private Tutor Online website codebase. This is our first reference point - only search external docs if the solution isn't found here.

**CRITICAL: COMPONENT-FIRST DEVELOPMENT - Always check the Component Inventory below before creating ANY new component.**

## Table of Contents

0. [COMPONENT INVENTORY](#component-inventory) - ✅ **CHECK THIS FIRST - ALWAYS**
1. [Framer Motion](#framer-motion) - ✅ LazyMotion Enterprise Implementation
2. [React Spring](#react-spring)
3. [Next.js](#nextjs)
4. [TypeScript](#typescript)
5. [Tailwind CSS](#tailwind-css)
6. [Chart.js](#chartjs)
7. [Embla Carousel](#embla-carousel) - ✅ Carousel Implementation
8. [Accessibility](#accessibility)
9. [Performance](#performance)
10. [Magic UI Components](#magic-ui-components) - ✅ All Magic UI Components
11. [Shadcn UI Components](#shadcn-ui-components) - ✅ All Shadcn Components
12. [Component Development Guidelines](#component-development-guidelines) - ✅ Mandatory Reading
13. [Enterprise Consolidation](#enterprise-consolidation) - ✅ Current Phase

---

## COMPONENT INVENTORY

### 🚨 MANDATORY CHECK - READ BEFORE ANY COMPONENT DEVELOPMENT

**RULE: Before creating ANY new component, you MUST check this inventory first. If similar functionality exists, ALWAYS extend/compose rather than recreate.**

### UI Foundation Components (/src/components/ui/)

#### Form Components - ✅ AVAILABLE
- **button.tsx** - Base button with variants (default, destructive, outline, secondary, ghost, link)
- **input.tsx** - Text input with validation support
- **textarea.tsx** - Multi-line text input
- **label.tsx** - Form labels with accessibility
- **form.tsx** - React Hook Form + Zod integration
- **select.tsx** - Dropdown selectors

#### Layout & Structure - ✅ AVAILABLE  
- **card.tsx** - Container components with header/content/footer
- **separator.tsx** - Horizontal/vertical dividers
- **aspect-ratio.tsx** - Maintains aspect ratios for media
- **sheet.tsx** - Side panels and drawers
- **tabs.tsx** - Tabbed content sections

#### Interactive Components - ✅ AVAILABLE
- **accordion.tsx** - Collapsible content sections
- **calendar.tsx** - Date picker for booking systems
- **navigation-menu.tsx** - Complex navigation structures

#### Feedback Components - ✅ AVAILABLE
- **toast.tsx** - Notifications using Sonner
- **skeleton.tsx** - Loading placeholders
- **badge.tsx** - Status indicators

#### Accessibility Components - ✅ AVAILABLE
- **accessible-button.tsx** - Enhanced button with full a11y
- **focus-trap.tsx** - Focus management
- **screen-reader-only.tsx** - SR-only content

### Magic UI Premium Components (/src/components/magicui/)

#### Button Animations - ✅ AVAILABLE
- **shiny-button.tsx** - Premium shimmer effect button
- **interactive-hover-button.tsx** - Sophisticated hover animations with arrow
- **animated-subscribe-button.tsx** - State-based button with icon transitions

#### Media Components - ✅ AVAILABLE  
- **hero-video-dialog.tsx** - Full-screen video modal with 8 animation styles
- **icon-cloud.tsx** - 3D rotating technology icon display
- **video-text.tsx** - Animated text reveals with staggered letters

### Layout System (/src/components/layout/)

#### Page Structure - ✅ AVAILABLE
- **page-layout.tsx** - Main page wrapper with SEO
- **page-header.tsx** - Navigation with transparent/scroll states
- **page-footer.tsx** - Site footer
- **page-hero.tsx** - Hero section template
- **section.tsx** - Content section wrapper

### Marketing Components (/src/components/marketing/)

#### Business Components - ✅ AVAILABLE
- **service-card.tsx** - Service display cards
- **trust-indicators.tsx** - Credibility badges
- **royal-testimonial-card.tsx** - Premium testimonial display
- **premium-service-card.tsx** - Enhanced service cards
- **premium-hero-section.tsx** - Premium hero variants

### Form Components (/src/components/forms/)

#### Specialised Forms - ✅ AVAILABLE
- **consultation-booking-form.tsx** - Booking system integration

### Utility Components

#### Hooks (/src/hooks/)
- **use-toast.ts** - Toast notification hook
- **use-accessibility.tsx** - Accessibility utilities

#### Performance (/src/lib/performance/)
- **web-vitals.ts** - Performance monitoring
- **index.ts** - Performance utilities

---

## Component Development Guidelines

### 🔥 CRITICAL RULES - NEVER VIOLATE

#### 1. Component Reuse Hierarchy
```typescript
// ✅ CORRECT: Check existing components first
import { Button } from "@/components/ui/button"
import { ShinyButton } from "@/components/magicui/shiny-button"

// Extend existing functionality
export function BookingButton({ children, ...props }) {
  return (
    <ShinyButton className="booking-specific-styles" {...props}>
      {children}
    </ShinyButton>
  )
}

// ❌ INCORRECT: Creating duplicate functionality
export function NewShinyButton() {
  // This duplicates existing ShinyButton - DON'T DO THIS!
}
```

#### 2. Composition Patterns
```typescript
// ✅ CORRECT: Compound component pattern
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ServiceCard({ service }) {
  return (
    <Card>
      <CardHeader>
        <Badge variant="secondary">{service.category}</Badge>
        <h3>{service.title}</h3>
      </CardHeader>
      <CardContent>
        {service.description}
      </CardContent>
    </Card>
  )
}
```

#### 3. Extension vs Recreation Decision Matrix
- **Extend existing**: If 70%+ functionality overlaps
- **Compose multiple**: If combining 2-3 existing components
- **Create new**: Only if completely unique functionality

#### 4. Documentation Requirements
Every component MUST include:
- Import statement
- Props interface
- Usage examples  
- Integration notes
- Accessibility considerations

### Component Architecture Patterns

#### Atomic Design Implementation
- **Atoms**: Shadcn UI components (Button, Input, etc.)
- **Molecules**: Compositions like ServiceCard, ContactForm
- **Organisms**: Page sections like Hero, NavBar
- **Templates**: Layout components
- **Pages**: Route components

#### Variant System
```typescript
// Use CVA for component variants
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        primary: "primary-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        lg: "large-classes",
      }
    }
  }
)
```

---

## Magic UI Components

**NOTE: All Magic UI components use OFFICIAL DOCUMENTATION implementations only.**

### Hero Video Dialog - ✅ IMPLEMENTED
- **File**: `/src/components/magicui/hero-video-dialog.tsx`
- **Usage**: Full-screen video modals with 8 animation styles
- **Documentation Source**: Official Magic UI docs
- **Implementation**: ✅ Verified against official patterns

### Icon Cloud - ✅ IMPLEMENTED  
- **File**: `/src/components/magicui/icon-cloud.tsx`
- **Usage**: 3D rotating technology icon displays
- **Documentation Source**: Official Magic UI docs
- **Implementation**: ✅ Verified against official patterns

### Interactive Button Components - ✅ IMPLEMENTED
- **Files**: 
  - `/src/components/magicui/shiny-button.tsx`
  - `/src/components/magicui/interactive-hover-button.tsx`  
  - `/src/components/magicui/animated-subscribe-button.tsx`
- **Usage**: Premium animated buttons for CTAs
- **Documentation Source**: Official Magic UI docs
- **Implementation**: ✅ Verified against official patterns

### Video Text - ✅ IMPLEMENTED
- **File**: `/src/components/magicui/video-text.tsx`
- **Usage**: Animated text reveals with staggered animations
- **Documentation Source**: Official Magic UI docs
- **Implementation**: ✅ Verified against official patterns

---

## Shadcn UI Components Integration

**NOTE: All Shadcn UI components use OFFICIAL DOCUMENTATION implementations only.**

### Core Components - ✅ IMPLEMENTED
All components follow official Shadcn UI patterns from https://ui.shadcn.com/docs/components

#### Form System
- **Components**: Button, Input, Label, Textarea, Form, Select
- **Integration**: React Hook Form + Zod validation
- **Status**: ✅ Production ready

#### Layout System  
- **Components**: Card, Separator, AspectRatio, Sheet, Tabs
- **Integration**: Responsive design system
- **Status**: ✅ Production ready

#### Interactive Components
- **Components**: Accordion, Calendar, Navigation Menu
- **Integration**: Keyboard navigation and accessibility
- **Status**: ✅ Production ready

#### Feedback System
- **Components**: Toast (Sonner), Skeleton, Badge
- **Integration**: User feedback and loading states
- **Status**: ✅ Production ready

---

## Framer Motion

### Current Version: 10.16.0

### Import Patterns (Used in our codebase)

#### Standard Import (for standalone components)
```typescript
import { motion } from 'framer-motion'
```

#### LazyMotion Optimized Import (REQUIRED for app-wide use)
```typescript
import { m } from 'framer-motion'
// OR for components needing both
import { motion, m } from 'framer-motion'
```

### LazyMotion Implementation (Enterprise Bundle Optimization)

#### App-Level Provider (Implemented in _app.tsx)
```typescript
import { LazyMotion, domAnimation } from 'framer-motion'

<LazyMotion features={domAnimation} strict>
  {children}
</LazyMotion>
```

#### Component Usage Within LazyMotion Context
```typescript
// ✅ CORRECT - Use m components
import { m } from 'framer-motion'

<m.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</m.div>

// ❌ INCORRECT - motion components break tree shaking
import { motion } from 'framer-motion'
<motion.div>Content</motion.div>
```

#### Bundle Optimization Achieved
- **Before**: 34kb framer-motion bundle
- **After**: 4.6kb initial load (87% reduction)
- **App-level domAnimation**: 21kb loaded once globally

### Basic Animation Patterns We Use

#### 1. Fade In Up Animation
```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

#### 2. Reverent Reveal (Church Theme)
```typescript
const reverentReveal = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.8, ease: 'easeOut' }
}
```

#### 3. Stagger Children Animation
```typescript
const staggerChildren = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}
```

#### 4. Hover Animations
```typescript
<motion.div
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
>
  Content
</motion.div>
```

#### 5. Reduced Motion Support
```typescript
const reducedMotion = prefersReducedMotion()

<motion.div
  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
  whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
  transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
>
  Content
</motion.div>
```

#### 6. Gold Accent Animations (Our Brand)
```typescript
// Growing accent underline
<motion.div
  className="h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
  initial={{ scaleX: 0 }}
  whileInView={{ scaleX: 1 }}
  transition={{ duration: 1, delay: 0.3 }}
  style={{ width: '140px' }}
/>
```

### LazyMotion Patterns (Bundle Size Optimization)

**Enterprise Hybrid Implementation**: Based on official research achieving 87% bundle reduction (34kb to 4.6kb initial + 21kb domAnimation)

#### Import Pattern for LazyMotion
```typescript
import { LazyMotion, domAnimation, m } from 'framer-motion'
```

#### App-Level LazyMotion Provider (Recommended)
```typescript
// _app.tsx - Load domAnimation features once globally
import { LazyMotionProvider } from '@/components/providers/LazyMotionProvider'

export default function App({ Component, pageProps }) {
  return (
    <LazyMotionProvider>
      <Component {...pageProps} />
    </LazyMotionProvider>
  )
}
```

#### LazyMotion Provider Implementation
```typescript
// components/providers/LazyMotionProvider.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

export function LazyMotionProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const shouldReduceMotion = prefersReducedMotion();
    setReduceMotion(shouldReduceMotion);
    setIsHydrated(true);
  }, []);

  // During SSR or before hydration, render without motion
  if (!isHydrated) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  // If user prefers reduced motion, render without LazyMotion
  if (reduceMotion) {
    return <>{children}</>;
  }

  // Enterprise hybrid approach: app-level domAnimation features (21kb)
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
```

#### Feature Packages Available
- **domAnimation**: +21kb - Provides animations, variants, exit animations, tap/hover/focus gestures
- **domMax**: +31kb - All domAnimation features plus pan/drag gestures and layout animations

#### Strict Mode (Enforced for Bundle Size)
```typescript
// All LazyMotion providers use strict mode - throws error if motion.div is used
<LazyMotion features={domAnimation} strict>
  <m.div animate={{ opacity: 1 }} />
</LazyMotion>
```

#### Component Usage in LazyMotion Context
```typescript
// Inside app-level LazyMotion context - use 'm' components
<m.div animate={{ opacity: 1 }} />
<m.div whileHover={{ scale: 1.05 }} />
<m.button whileTap={{ scale: 0.95 }} />

// ❌ NEVER use motion.div inside LazyMotion context
<motion.div animate={{ opacity: 1 }} /> // Will throw error in strict mode
```

#### Accessibility Integration
```typescript
// Always check reduced motion preference
const reducedMotion = prefersReducedMotion()

<m.div
  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
  whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
  transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
>
  Content
</m.div>
```

#### Performance Benefits
- **Bundle Size**: 87% reduction from 34kb to 4.6kb initial + 21kb domAnimation
- **Tree Shaking**: 40-60% reduction in unused code overhead
- **App-Level Loading**: Features loaded once, available everywhere
- **Strict Mode**: Prevents accidental bundle bloat

### Common Patterns to Avoid
- ❌ `import { motion } from 'motion/react'` - Wrong import, use framer-motion
- ❌ `Motion.div` - Wrong component name, use `motion.div`
- ❌ Multiple motion imports in same file
- ❌ Using motion without reduced motion support
- ❌ Using `motion.div` inside LazyMotion - use `m.div` instead
- ❌ Mixing `m` and `motion` components in same LazyMotion context

---

## React Spring

### Current Version: 10.0.1

### Import Pattern
```typescript
import { useSpring, animated, config } from '@react-spring/web'
```

### Basic Patterns We Use

#### 1. Simple Spring Animation
```typescript
const springProps = useSpring({
  opacity: 1,
  transform: 'translateY(0px)',
  from: { opacity: 0, transform: 'translateY(30px)' },
  config: ui.reducedMotion ? config.default : config.gentle
})

<animated.div style={springProps}>
  Content
</animated.div>
```

#### 2. Conditional Spring
```typescript
const analyticsSpring = useSpring({
  opacity: analyticsInView ? 1 : 0,
  transform: analyticsInView ? 'translateY(0px)' : 'translateY(50px)',
  config: ui.reducedMotion ? config.default : config.gentle,
  delay: 300
})
```

---

## Next.js

### Current Version: 14.2.30

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/images/example.jpg"
  alt="Description"
  width={800}
  height={600}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority // for above-the-fold images
/>
```

### Page Layout Pattern
```typescript
import { PageLayout, PageHero } from '@/components/layout'

export default function MyPage() {
  return (
    <PageLayout
      title="Page Title"
      description="SEO description"
      keywords="keyword1, keyword2"
    >
      <PageHero
        title="Hero Title"
        subtitle="Hero Subtitle"
        description="Hero description"
        backgroundImage="/images/hero.jpg"
        height="large"
        overlay="medium"
      />
      {/* Page content */}
    </PageLayout>
  )
}
```

---

## TypeScript

### Interface Patterns We Use

#### 1. Component Props Interface
```typescript
interface ComponentProps {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
  reducedMotion?: boolean
}
```

#### 2. Event Handler Patterns
```typescript
const handleClick = useCallback((event: React.MouseEvent) => {
  // handle click
}, [])

const handleSubmit = useCallback((data: FormData) => {
  // handle form submission
}, [])
```

---

## Tailwind CSS

### Our Design System Classes

#### 1. Backgrounds
```css
/* All sections use slate-900 background */
.bg-slate-900

/* White container backgrounds */
.bg-white

/* Gold accents */
.bg-gold-700
.bg-gold-600
.bg-gradient-to-r from-gold-700 to-gold-600
```

#### 2. Typography Scale
```typescript
// Import our typography scale
import { typographyScale } from '@/lib/fonts'

// Usage
<h1 className={typographyScale.h1}>Heading</h1>
<p className={typographyScale.body}>Body text</p>
```

#### 3. Color System
```css
/* Text colors */
.text-white        /* Main headings on dark backgrounds */
.text-gray-100     /* Primary text on dark backgrounds */
.text-gray-200     /* Secondary text on dark backgrounds */
.text-gray-300     /* Subtle text on dark backgrounds */
.text-slate-900    /* Dark text on light backgrounds */

/* Button colors */
.bg-white.text-slate-900.hover:bg-gray-100  /* Primary buttons */
.border-white/30.text-white.hover:bg-white/10  /* Secondary buttons */
```

---

## Chart.js

### Current Version: 4.5.0

### Registration Pattern
```typescript
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)
```

### Data Structure Pattern
```typescript
const chartData = {
  labels: ['Label 1', 'Label 2', 'Label 3'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30],
      backgroundColor: 'rgba(212, 175, 55, 0.6)',
      borderColor: '#d4af37',
      borderWidth: 1
    }
  ]
}
```

### Chart Initialization (React with useRef)
```typescript
// OFFICIAL PATTERN: Chart.js docs "Registering Chart.js Components for Tree-Shaking" + "Create Chart.js Instance"
import { useEffect, useRef, useState } from 'react'

const chartRef = useRef<HTMLCanvasElement>(null)
const [chartInstance, setChartInstance] = useState<any>(null)

useEffect(() => {
  if (!chartRef.current) return

  const initChart = async () => {
    // Dynamic import for tree shaking - OFFICIAL PATTERN: Chart.js docs "Registering Chart.js Components for Tree-Shaking"
    const { Chart, registerables } = await import('chart.js')
    Chart.register(...registerables)

    // Cleanup existing chart - OFFICIAL PATTERN: Chart.js API destroy() method
    if (chartInstance) {
      chartInstance.destroy()
    }

    // Get canvas context - OFFICIAL PATTERN: Chart.js docs "Create Basic Chart.js Bar Chart in HTML"
    const ctx = chartRef.current!.getContext('2d')
    
    // Create chart instance - OFFICIAL PATTERN: Chart.js docs "Create Chart.js Instance"
    const newChart = new Chart(ctx!, {
      type: 'line',
      data: chartData,
      options: chartOptions
    })

    setChartInstance(newChart)
  }

  initChart()

  // Cleanup on unmount - OFFICIAL PATTERN: Chart.js API destroy() method
  return () => {
    if (chartInstance) {
      chartInstance.destroy()
    }
  }
}, [/* dependencies */])

// JSX - OFFICIAL PATTERN: Chart.js docs "Define HTML Canvas for Chart.js Rendering"
<canvas ref={chartRef} className="w-full h-full" />
```

### Chart Configuration Options (Dark Theme)
```typescript
// OFFICIAL PATTERN: Chart.js docs "Chart.js Configuration Options for Responsiveness" + "Chart.js Tooltip Configuration Options Reference"
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff',
        font: {
          size: 14,
          family: 'Inter, sans-serif'
        }
      }
    },
    title: {
      display: true,
      text: 'Chart Title',
      color: '#ffffff',
      font: {
        size: 18,
        weight: 'bold' as const
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#d4af37',
      borderWidth: 1,
      cornerRadius: 8
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  animation: {
    duration: 2000,
    easing: 'easeInOutQuart' as const
  }
}
```

### Doughnut Chart Options
```typescript
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#ffffff'
      }
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((context.parsed / total) * 100).toFixed(1)
          return `${context.label}: ${context.parsed} (${percentage}%)`
        }
      }
    }
  },
  cutout: '60%' // For doughnut charts
}
```

### Chart Data Updates
```typescript
// OFFICIAL PATTERN: Chart.js docs "Add or Remove Data in Chart.js"
// Add data to chart
function addData(chart: any, label: string, newData: number) {
  chart.data.labels.push(label)
  chart.data.datasets.forEach((dataset: any) => {
    dataset.data.push(newData)
  })
  chart.update()
}

// Remove data from chart
function removeData(chart: any) {
  chart.data.labels.pop()
  chart.data.datasets.forEach((dataset: any) => {
    dataset.data.pop()
  })
  chart.update()
}
```

### Chart Types We Use
```typescript
// OFFICIAL PATTERN: Chart.js docs "Define Chart.js Configuration Object Structure"
// Line Chart
{
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Dataset',
      data: [10, 20, 30],
      borderColor: '#d4af37',
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }
}

// Bar Chart
{
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3],
      borderWidth: 1
    }]
  }
}

// Doughnut Chart
{
  type: 'doughnut',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      label: 'Colors',
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  }
}
```

---

## Embla Carousel

### Current Version: 8.6.0

### Dependencies Used
```json
{
  "embla-carousel-react": "^8.6.0",
  "embla-carousel-autoplay": "^8.6.0", 
  "embla-carousel-fade": "^8.6.0"
}
```

### OFFICIAL PATTERNS USED

#### Basic Setup (From Official Embla Documentation)
```typescript
// OFFICIAL PATTERN: Embla React Hook - embla-carousel.com/get-started/react/
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'

const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)
```

#### Plugin Integration (From Official Embla Documentation)
```typescript
// OFFICIAL PATTERN: Autoplay Plugin - embla-carousel.com/plugins/autoplay/
import Autoplay from 'embla-carousel-autoplay'

// OFFICIAL PATTERN: Fade Plugin - embla-carousel.com/plugins/fade/  
import Fade from 'embla-carousel-fade'

const autoplayPlugin = Autoplay({
  delay: 5000,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  playOnInit: true
})

const [emblaRef, emblaApi] = useEmblaCarousel(
  { loop: true, duration: 30 },
  [autoplayPlugin, Fade()]
)
```

#### Required CSS (From Official Embla Documentation)
```css
/* OFFICIAL PATTERN: Basic Embla CSS - embla-carousel.com/get-started/react/ */
.embla {
  overflow: hidden;
}

.embla__container {
  display: flex;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}
```

#### Navigation Controls (From Official Embla Documentation)
```typescript
// OFFICIAL PATTERN: Navigation - embla-carousel.com/guides/prev-next-buttons/
const scrollPrev = useCallback(() => {
  if (emblaApi) emblaApi.scrollPrev()
}, [emblaApi])

const scrollNext = useCallback(() => {
  if (emblaApi) emblaApi.scrollNext()
}, [emblaApi])

const scrollTo = useCallback((index: number) => {
  if (emblaApi) emblaApi.scrollTo(index)
}, [emblaApi])
```

#### Event Listeners (From Official Embla Documentation)
```typescript
// OFFICIAL PATTERN: Event Handling - embla-carousel.com/api/events/
const onSelect = useCallback(() => {
  if (!emblaApi) return
  const index = emblaApi.selectedScrollSnap()
  setCurrentIndex(index)
}, [emblaApi])

useEffect(() => {
  if (!emblaApi) return
  
  emblaApi.on('select', onSelect)
  emblaApi.on('reInit', onSelect)
  onSelect()

  return () => {
    emblaApi.off('select', onSelect)
    emblaApi.off('reInit', onSelect)
  }
}, [emblaApi, onSelect])
```

#### Plugin Control (From Official Embla Documentation)
```typescript
// OFFICIAL PATTERN: Plugin Control - embla-carousel.com/plugins/autoplay/#methods
const toggleAutoplay = useCallback(() => {
  const autoplayInstance = emblaApi?.plugins()?.autoplay
  if (!autoplayInstance) return

  if (isPlaying) {
    autoplayInstance.stop()
  } else {
    autoplayInstance.play()
  }
  setIsPlaying(!isPlaying)
}, [emblaApi, isPlaying])
```

### Our Implementation (EmblaHeroCarousel.tsx)
- Location: `/src/components/enhanced/EmblaHeroCarousel.tsx`
- Follows all official patterns above
- Includes reduced motion support 
- Autoplay with fade transitions
- Image preloading with loading states
- Navigation controls and dot indicators

---

## Accessibility

### Patterns We Use

#### 1. Reduced Motion Support
```typescript
import { prefersReducedMotion } from '@/lib/utils'

const reducedMotion = prefersReducedMotion()

// Use in animations
transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
```

#### 2. ARIA Labels
```typescript
<button aria-label="Close modal">
  <X className="h-4 w-4" />
</button>
```

#### 3. Keyboard Navigation
```typescript
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick()
  }
}}
```

---

## Performance

### Lazy Loading Pattern
```typescript
import { useInView } from 'react-intersection-observer'

const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: '-50px 0px'
})

// Only render when in view
{inView && <ExpensiveComponent />}
```

### Bundle Optimization
```typescript
// Use dynamic imports for large components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
})
```

---

## Documentation Maintenance

### Adding New Documentation
When implementing new features:

1. ✅ First check this file for existing patterns
2. ✅ If not found, research official documentation
3. ✅ Implement the official solution
4. ✅ Add the working pattern to this file
5. ✅ Update the Table of Contents if needed

### Documentation Standards
- Include working code examples
- Show import statements
- Include error patterns to avoid
- Add version numbers for dependencies
- Focus only on patterns we actually use

---

## Magic UI Hero Video Dialog

### Current Version: Latest (Magic UI)

### Import Pattern
```typescript
import { HeroVideoDialog } from "@/components/magicui/hero-video-dialog";
```

### Installation
```bash
# CLI Installation
npm install magicui

# Manual Installation
# Copy component files directly from Magic UI repository
```

### Basic Usage Pattern
```typescript
<HeroVideoDialog
  className="block dark:hidden"
  animationStyle="from-center"
  videoSrc="https://www.example.com/video.mp4"
  thumbnailSrc="https://www.example.com/thumbnail.png"
  thumbnailAlt="Video thumbnail description"
/>
```

### Component Props API Reference

#### Required Props
```typescript
interface HeroVideoDialogProps {
  videoSrc: string;           // Video URL (use embed URL for YouTube)
  thumbnailSrc: string;       // Thumbnail image URL
}
```

#### Optional Props
```typescript
interface HeroVideoDialogProps {
  className?: string;         // Additional CSS classes
  thumbnailAlt?: string;      // Alt text for thumbnail (default: "Video thumbnail")
  animationStyle?: AnimationStyle;  // Dialog animation style (default: "from-center")
}
```

#### Animation Styles Available
```typescript
type AnimationStyle = 
  | "from-bottom"      // Dialog enters from bottom, exits to bottom
  | "from-center"      // Dialog scales up from center, scales down to center  
  | "from-top"         // Dialog enters from top, exits to top
  | "from-left"        // Dialog enters from left, exits to left
  | "from-right"       // Dialog enters from right, exits to right
  | "fade"             // Dialog fades in and out
  | "top-in-bottom-out"    // Dialog enters from top, exits to bottom
  | "left-in-right-out";   // Dialog enters from left, exits to right
```

### Implementation Examples

#### 1. Basic Full-Screen Video Modal
```typescript
export function VideoHeroSection() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="/videos/intro-video.mp4"
        thumbnailSrc="/images/video-thumbnail.jpg"
        thumbnailAlt="Introduction video thumbnail"
        className="max-w-2xl mx-auto"
      />
    </div>
  );
}
```

#### 2. YouTube Video Integration
```typescript
<HeroVideoDialog
  animationStyle="fade"
  videoSrc="https://www.youtube.com/embed/VIDEO_ID"
  thumbnailSrc="/images/youtube-thumbnail.jpg"
  thumbnailAlt="Watch our story on YouTube"
/>
```

#### 3. Responsive Hero Video
```typescript
<HeroVideoDialog
  animationStyle="top-in-bottom-out"
  videoSrc="/videos/hero-video.mp4"
  thumbnailSrc="/images/hero-video-thumb.jpg"
  thumbnailAlt="Company introduction video"
  className="w-full max-w-4xl mx-auto aspect-video"
/>
```

### Accessibility Features
- ✅ Proper ARIA labels for video controls
- ✅ Keyboard navigation support (Enter/Space to play)
- ✅ Screen reader friendly with thumbnailAlt text
- ✅ Focus management when modal opens/closes
- ✅ ESC key to close modal

### Usage Notes
- **YouTube Videos**: Always use embed URLs (e.g., `https://www.youtube.com/embed/VIDEO_ID`)
- **Video Formats**: Supports MP4, WebM, and other standard web video formats
- **Thumbnail Images**: Ensure thumbnail matches video aspect ratio for best UX
- **Performance**: Component lazy-loads video content until user interaction

### Integration with Our Design System
```typescript
// Using with our navy/gold theme
<HeroVideoDialog
  animationStyle="from-center"
  videoSrc="/videos/tutoring-intro.mp4"
  thumbnailSrc="/images/tutoring-hero-thumb.jpg"
  thumbnailAlt="Discover our tutoring approach"
  className="rounded-2xl shadow-2xl border border-navy-200"
/>
```

### Common Patterns to Avoid
- ❌ Using direct YouTube URLs instead of embed URLs
- ❌ Missing thumbnailAlt text for accessibility
- ❌ Not providing appropriate thumbnail images
- ❌ Using overly large video files without compression
- ❌ Forgetting to test keyboard navigation

---

## Enterprise Consolidation

### Current Status: Phase 1 Completed ✅

#### Phase 1: Bug Audit & Resolution - COMPLETED
- **Issue Resolved**: 22 files missing `m` import from framer-motion  
- **LazyMotion Fixed**: EventCard component converted from `motion` to `m` components
- **Build Status**: ✅ Clean - All TypeScript compilation errors resolved
- **Bundle Optimization**: ✅ 87% reduction achieved (34kb → 4.6kb initial load)

#### Phase 2: Component Consolidation - IN PROGRESS 🔄
- **Target**: Extract duplicate patterns from 50+ enhanced components
- **Goal**: Create reusable shared component library
- **Location**: `/src/components/shared/` ✅ **CREATED**
- **Pattern**: Identify common code in enhanced components and extract to shared utilities

##### ✅ **VERIFIED: Analytics Components Using Official Chart.js Patterns**
- **Created**: `/src/components/shared/analytics/` directory
- **Components**: AnalyticsDashboard, ChartOptionsProvider, QuickStatsGrid
- **Verification**: ✅ All patterns match official Chart.js documentation provided
- **Status**: ✅ VALID - All Chart.js APIs verified against official docs
- **Documentation**: All Chart.js patterns added to custom documentation above
- **Impact**: 1,400+ lines of duplicated Chart.js code consolidated
- **Usage**: `import { AnalyticsDashboard } from '@/components/shared/analytics'`
- **Example**: MassStatisticsRefactored.tsx - 74% code reduction (380→100 lines)

#### Key Patterns to Extract:
1. **Motion Animation Utilities** - Common fade/slide/reveal patterns
2. **Scripture Card Components** - Used across multiple pages
3. **Analytics Dashboard Patterns** - Chart.js implementations  
4. **Form Components** - Contact, newsletter, registration patterns
5. **Image Gallery Patterns** - PhotoSwipe implementations
6. **Modal/Overlay Patterns** - Lightbox and dialog components

#### Component Extraction Workflow:
1. Identify duplicate code patterns using grep/search
2. Extract to `/src/components/shared/`
3. Update import statements across affected files
4. Test build and functionality
5. Update this documentation with new shared patterns

#### Benefits Expected:
- Reduced bundle size through code deduplication
- Easier maintenance with centralized components
- Consistent behavior across pages
- Faster development for new features

---

## NEW PAGES IMPLEMENTATION - 2025 WEBSITE REFRESH

### Overview
Following the client's comprehensive sitemap and content brief, we have implemented a complete website refresh with new page structure and content. All pages use existing components following CLAUDE.md component-first development principles.

### Site Navigation Update
Updated navbar structure from `/src/app/page.tsx`:
```typescript
{[
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Subject Tuition', href: '/subject-tuition' },
  { name: 'Masterclasses', href: '/video-masterclasses' },
  { name: 'About Us', href: '/about-us' },
  { name: 'FAQ', href: '/faq' }
].map((item) => (
  // Navigation items
))}
```

### Completed Pages ✅

#### 1. How It Works (`/src/app/how-it-works/page.tsx`)
- **Content**: 4-step process explanation with tiered tutoring system
- **Components Used**: 
  - `VideoText` for animated hero title
  - `ShinyButton` and `InteractiveHoverButton` for CTAs
  - `Card`, `CardContent`, `CardHeader` for step displays
  - `CheckCircle` icons for feature lists
  - `Badge` for tier highlighting
- **Sections**: Hero, Process Steps, Tiered System, Benefits, CTA
- **Status**: ✅ Complete and building successfully

#### 2. FAQ (`/src/app/faq/page.tsx`)
- **Content**: Comprehensive FAQ from client brief with 5 categories
- **Components Used**:
  - `VideoText` for hero animation
  - `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`
  - `Card` for category containers
  - `ShinyButton` for CTAs
- **Categories**: About Service, Tutors & Teaching, Subjects, Progress, Pricing
- **Status**: ✅ Complete and building successfully

#### 3. Video Masterclasses (`/src/app/video-masterclasses/page.tsx`)
- **Content**: Elizabeth's 5 masterclasses with pricing and descriptions
- **Components Used**:
  - `VideoText` for animated titles
  - `ShinyButton` and `InteractiveHoverButton` for purchase CTAs
  - `Card`, `Badge` for masterclass cards
  - `Play`, `Clock`, `Users`, `BookOpen`, `Star` icons
- **Masterclasses**: Academic Success (Free), UCAS Guide, Personal Statements, British Classics, British Etiquette
- **Status**: ✅ Complete and building successfully

### Pending Pages 🔄

#### 4. Subject Tuition (`/subject-tuition/`) - TO CREATE
- **Planned Structure**: Main page with subpages for each subject area
- **Subpages Needed**:
  - Entrance Exams
  - Primary and Secondary Subjects  
  - University and Beyond
  - Specialist Tutoring
  - In Person Tutoring

#### 5. About Us (`/about-us/`) - TO CREATE
- **Content**: Our Founder's Story, Our Ethos and Mission
- **Focus**: Elizabeth's background and company values

#### 6. Online Homeschooling (`/online-homeschooling/`) - TO CREATE
- **Content**: Dedicated homeschooling services page

### Components Integration Success ✅

All new pages successfully use existing components from our established libraries:

**Magic UI Components Used:**
- `VideoText` - Animated hero titles across all pages
- `ShinyButton` - Primary CTAs
- `InteractiveHoverButton` - Secondary actions
- `HeroVideoDialog` - Video integration (ready for use)
- `IconCloud` - Updated with school/university icons

**Shadcn UI Components Used:**
- `Accordion` suite - FAQ functionality
- `Card` suite - Content containers
- `Badge` - Status and pricing indicators
- `Separator` - Visual content division

**Design System Compliance:**
- Navy/Gold colour scheme maintained
- British English throughout
- Font-serif for headings, font-sans for body
- Consistent spacing and responsive breakpoints
- WCAG 2.1 AA accessibility features

### SEO Keywords Integration ✅

Client's SEO research keywords have been integrated into page content:
- "Best tutors", "GCSE tutor", "Online tutoring"
- "London education consultants"
- "Tutoring agencies companies london"
- "Best online tutoring sites"

### Build Status: ✅ SUCCESSFUL
- All new pages compile without errors
- TypeScript validation passing
- Only minor linting warnings (existing codebase issues)
- Performance targets maintained

### Next Steps for Complete Implementation
1. Create remaining 3 pages (Subject Tuition, About Us, Online Homeschooling)  
2. Update homepage content with new client copy
3. Add actual school/university SVG logos to replace text in IconCloud
4. Test all navigation links and internal routing
5. SEO optimization with meta tags and structured data

---

## Magic UI Icon Cloud

### Current Version: Latest (Magic UI)

### Import Pattern
```typescript
import { IconCloud } from "@/components/magicui/icon-cloud";
```

### Installation
```bash
# CLI Installation
npm install magicui

# Manual Installation
# Copy component files directly from Magic UI repository
```

### Basic Usage Pattern
```typescript
<IconCloud iconSlugs={slugs} />
```

### Component Props API Reference

#### Required Props
```typescript
interface IconCloudProps {
  iconSlugs: string[];           // Array of icon slugs (e.g., ["typescript", "javascript", "react"])
}
```

#### Optional Props
```typescript
interface IconCloudProps {
  className?: string;            // Additional CSS classes
}
```

### Icon Slug Reference
Common technology icon slugs available:
```typescript
const techIconSlugs = [
  "typescript",
  "javascript", 
  "react",
  "nextdotjs",
  "tailwindcss",
  "framermotion",
  "nodejs",
  "html5",
  "css3",
  "git",
  "github",
  "vercel",
  "figma",
  "adobe",
  "mongodb",
  "postgresql",
  "redis",
  "docker",
  "kubernetes",
  "aws",
  "googlecloud",
  "stripe",
  "openai"
];
```

### Implementation Examples

#### 1. Technology Stack Display
```typescript
export function TechStackCloud() {
  const iconSlugs = [
    "typescript",
    "react", 
    "nextdotjs",
    "tailwindcss",
    "framermotion",
    "nodejs"
  ];

  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
      <IconCloud iconSlugs={iconSlugs} />
    </div>
  );
}
```

#### 2. Educational Skills Cloud
```typescript
export function EducationalSkillsCloud() {
  const educationIconSlugs = [
    "javascript",
    "python", 
    "java",
    "cplusplus",
    "html5",
    "css3",
    "react",
    "nodejs",
    "git",
    "github",
    "figma",
    "adobe"
  ];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <IconCloud iconSlugs={educationIconSlugs} />
    </div>
  );
}
```

#### 3. Responsive Icon Cloud
```typescript
<div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
  <IconCloud iconSlugs={iconSlugs} />
</div>
```

### Styling and Customization
```typescript
// With custom container styling
<div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-navy-50 px-8 py-8">
  <IconCloud 
    iconSlugs={techSlugs}
    className="text-navy-700"
  />
</div>
```

### Integration with Our Design System
```typescript
// Using with our navy/gold theme
export function TutoringSkillsCloud() {
  const tutoringSkills = [
    "javascript",
    "python",
    "react",
    "typescript",
    "html5",
    "css3",
    "nodejs",
    "git",
    "figma"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-navy-900 text-center mb-12">
          Technologies We Teach
        </h2>
        <div className="flex justify-center">
          <div className="relative flex h-80 w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl bg-navy-50 px-8 py-8">
            <IconCloud iconSlugs={tutoringSkills} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Performance Considerations
- Icons are rendered using 3D canvas/WebGL
- Component handles responsive sizing automatically  
- Smooth rotation and floating animations included
- Optimized for mobile devices

### Usage Notes
- **Icon Availability**: Check Simple Icons directory for available slug names
- **Responsive**: Component automatically adjusts to container size
- **Performance**: Uses hardware acceleration for smooth animations
- **Accessibility**: Includes proper ARIA labels for screen readers

### Common Patterns to Avoid
- ❌ Using non-existent icon slugs (will not render)
- ❌ Too many icons (>20) can impact performance
- ❌ Not providing adequate container height/width
- ❌ Missing container overflow:hidden styling

---

## Magic UI Interactive Button Components

### Current Version: Latest (Magic UI)

### Import Patterns
```typescript
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
```

### Interactive Hover Button

#### Basic Usage
```typescript
<InteractiveHoverButton text="Hover me" />
```

#### Props API
```typescript
interface InteractiveHoverButtonProps {
  text: string;                    // Button text
  className?: string;              // Additional CSS classes
}
```

#### Implementation Examples
```typescript
// Primary CTA Button
<InteractiveHoverButton 
  text="Book Free Consultation"
  className="bg-gold-600 text-white px-8 py-3"
/>

// Secondary Button
<InteractiveHoverButton 
  text="Learn More"
  className="border border-navy-200 text-navy-900 px-6 py-2"
/>
```

### Animated Subscribe Button

#### Basic Usage
```typescript
<AnimatedSubscribeButton 
  buttonColor="#3b82f6"
  buttonTextColor="#ffffff"
  subscribeStatus={false}
  initialText="Subscribe"
  changeText="Subscribed"
/>
```

#### Props API
```typescript
interface AnimatedSubscribeButtonProps {
  buttonColor: string;             // Background color
  buttonTextColor: string;         // Text color
  subscribeStatus: boolean;        // Current subscription status
  initialText: string;             // Initial button text
  changeText: string;              // Text after action
  onToggle?: () => void;          // Optional toggle handler
}
```

#### Implementation Examples
```typescript
// Newsletter Subscription
<AnimatedSubscribeButton
  buttonColor="#eab308"
  buttonTextColor="#ffffff"
  subscribeStatus={isSubscribed}
  initialText="Subscribe to Updates"
  changeText="Subscribed!"
  onToggle={handleSubscribe}
/>

// Contact Form Submit
<AnimatedSubscribeButton
  buttonColor="#0f172a"
  buttonTextColor="#ffffff"
  subscribeStatus={isSubmitted}
  initialText="Send Message"
  changeText="Message Sent!"
  onToggle={handleSubmit}
/>
```

### Shiny Button

#### Basic Usage
```typescript
<ShinyButton text="Click me" />
```

#### Props API
```typescript
interface ShinyButtonProps {
  text: string;                    // Button text
  className?: string;              // Additional CSS classes
}
```

#### Implementation Examples
```typescript
// Premium CTA Button
<ShinyButton 
  text="Start Premium Tutoring"
  className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 text-lg"
/>

// Attention-grabbing Action
<ShinyButton 
  text="Get Started Today"
  className="bg-navy-900 text-white px-6 py-3"
/>
```

### Usage in Our Design System

#### Primary Buttons (Main CTAs)
```typescript
// Use ShinyButton for primary actions
<ShinyButton 
  text="Book Free Consultation"
  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-lg shadow-lg"
/>
```

#### Secondary Buttons (Supporting Actions)
```typescript
// Use InteractiveHoverButton for secondary actions
<InteractiveHoverButton 
  text="Learn More"
  className="border-2 border-navy-200 text-navy-900 hover:bg-navy-50 px-6 py-3 rounded-lg transition-all duration-300"
/>
```

#### Form Submissions
```typescript
// Use AnimatedSubscribeButton for forms
<AnimatedSubscribeButton
  buttonColor="#eab308"
  buttonTextColor="#ffffff"
  subscribeStatus={formSubmitted}
  initialText="Send Enquiry"
  changeText="Enquiry Sent!"
  onToggle={handleFormSubmit}
/>
```

### Integration Notes
- All buttons follow our navy/gold colour scheme
- Maintain consistent padding and border radius
- Include proper hover states and transitions
- Ensure accessibility with proper contrast ratios

---

## Magic UI Video Text Component

### Current Version: Latest (Magic UI)

### Import Pattern
```typescript
import { VideoText } from "@/components/magicui/video-text";
```

### Basic Usage
```typescript
<VideoText 
  text="Your text here"
  duration={2000}
  framerProps={{
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }}
  className="text-4xl font-bold"
/>
```

### Props API
```typescript
interface VideoTextProps {
  text: string;                    // Text to animate
  duration?: number;               // Animation duration in ms
  framerProps?: any;              // Framer Motion animation props
  className?: string;              // Additional CSS classes
}
```

### Implementation Examples

#### Hero Section Video Text
```typescript
<VideoText 
  text="Expert Private Tutoring"
  duration={3000}
  framerProps={{
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.05,
        duration: 0.8
      }
    },
  }}
  className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
/>
```

#### Section Headings
```typescript
<VideoText 
  text="Results That Matter"
  duration={2000}
  className="text-3xl lg:text-4xl font-serif font-bold text-navy-900 text-center mb-12"
/>
```

### Usage in Our Design System
- Use for impactful hero headings
- Apply to section titles for engaging reveals
- Maintain typography hierarchy with proper font sizes
- Combine with our navy/gold colour scheme

---

## Shadcn UI Components Integration

### Current Version: Latest (Shadcn UI)

### Core Components Documentation

#### Aspect Ratio
```typescript
import { AspectRatio } from "@/components/ui/aspect-ratio"

// Video containers
<AspectRatio ratio={16 / 9} className="bg-muted">
  <Image src="/placeholder.jpg" alt="Image" className="rounded-md object-cover" fill />
</AspectRatio>

// Image galleries  
<AspectRatio ratio={4 / 3} className="bg-muted">
  <Image src="/gallery-image.jpg" alt="Gallery" className="object-cover" fill />
</AspectRatio>
```

#### Accordion
```typescript
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ Section
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>What subjects do you teach?</AccordionTrigger>
    <AccordionContent>
      We provide expert tutoring across all key subjects including Mathematics, English, Sciences, and more.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Calendar
```typescript
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

// Booking System
function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}
```

#### Form Components
```typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

// Contact Form
function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about your tutoring needs..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send Message</Button>
      </form>
    </Form>
  )
}
```

#### Skeleton
```typescript
import { Skeleton } from "@/components/ui/skeleton"

// Loading States
function ImageSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

#### Separator
```typescript
import { Separator } from "@/components/ui/separator"

// Content Dividers
<div>
  <div className="space-y-1">
    <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
    <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
    <Separator orientation="vertical" />
    <div>Source</div>
  </div>
</div>
```

#### Toast
```typescript
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"

// Notification System
function ToastDemo() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
          action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
        })
      }}
    >
      Send Message
    </Button>
  )
}
```

### Integration with Our Design System
- All components follow navy/gold colour scheme
- Maintain consistent typography using our font-serif/font-sans classes
- Apply proper spacing with our container patterns
- Ensure accessibility compliance with WCAG 2.1 AA standards

---

*Last Updated: 2025-07-23*
*This documentation is specific to the My Private Tutor Online website codebase and contains only the official patterns we use in production.*