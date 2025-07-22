# Modern Tech Stack & Architecture - 2025

## Technology Stack Overview

### Core Framework
- **Next.js 15.x**: Latest version with App Router (moving from Pages Router)
- **React 19**: Latest React features and concurrent rendering
- **TypeScript 5.3+**: Strict type checking with latest features
- **Node.js 20+**: LTS version for optimal performance

### Styling & Design System
- **Tailwind CSS 4.x**: Latest version with improved performance
- **Tailwind Typography**: For consistent prose styling
- **CSS Variables**: For dynamic theming support
- **Class Variance Authority (CVA)**: For component variants
- **Tailwind Merge**: For conditional class merging

### Component Architecture
- **React Server Components**: For better performance
- **Zustand**: Lightweight state management (replacing complex state)
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation
- **Framer Motion**: Advanced animations with better tree-shaking

### UI Component Library Foundation
- **Radix UI**: Unstyled, accessible primitives
- **Lucide React**: Consistent icon system
- **Next/Image**: Optimized image handling
- **Next/Font**: Optimized font loading

### Content Management
- **MDX**: Enhanced markdown for content
- **Gray Matter**: Front matter parsing
- **JSON**: Structured data storage
- **File System API**: For admin content updates

### Performance & SEO
- **Next.js App Router**: Better SEO and performance
- **Partial Prerendering**: Hybrid static/dynamic rendering
- **Bundle Analyzer**: Monitor bundle sizes
- **Web Vitals**: Performance monitoring
- **Structured Data**: Schema.org markup

### Development Tools
- **ESLint 9**: Latest linting with flat config
- **Prettier 3**: Code formatting
- **Husky**: Git hooks for quality assurance
- **Lint-staged**: Pre-commit linting
- **TypeScript strict mode**: Maximum type safety

## Architecture Principles

### Component Design
```typescript
// Modern component structure with CVA
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-gold-600 to-gold-500 text-white hover:from-gold-700 hover:to-gold-600',
        secondary: 'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### Design Token System
```typescript
// design-tokens.ts
export const designTokens = {
  colors: {
    primary: {
      50: '#f8fafc',
      900: '#0f172a', // slate-900
    },
    gold: {
      500: '#eab308',
      600: '#d97706',
    }
  },
  spacing: {
    section: {
      sm: '3rem', // py-12
      md: '4rem', // py-16  
      lg: '6rem', // py-24
    }
  },
  typography: {
    heading: {
      h1: 'text-4xl lg:text-6xl font-serif font-light',
      h2: 'text-3xl lg:text-4xl font-serif font-light',
    }
  }
} as const
```

### File Structure (App Router)
```
src/
├── app/                    # App Router pages
│   ├── (root)/            # Root layout group
│   ├── admin/             # Admin section
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # Base UI components
│   ├── church/            # Church-specific components
│   ├── forms/             # Form components
│   └── layout/            # Layout components
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── constants.ts       # App constants
│   ├── types.ts           # TypeScript types
│   └── validations.ts     # Zod schemas
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
└── styles/                # Additional styles
```

### Performance Optimizations

#### Bundle Splitting
```typescript
// Dynamic imports for heavy components
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

// Lazy load non-critical components
const NewsletterSignup = lazy(() => import('@/components/NewsletterSignup'))
```

#### Image Optimization
```typescript
// Modern image component with optimizations
import Image from 'next/image'

export function OptimizedImage({ src, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      {...props}
    />
  )
}
```

#### Server Components
```typescript
// Server component for data fetching
import { Suspense } from 'react'
import { getLatestNews } from '@/lib/content'

export default async function NewsSection() {
  const news = await getLatestNews()
  
  return (
    <section>
      <Suspense fallback={<NewsSkeleton />}>
        <NewsGrid news={news} />
      </Suspense>
    </section>
  )
}
```

### Accessibility Implementation

#### Component Accessibility
```typescript
// Accessible modal component
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function Modal({ children, trigger, title }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 max-w-md w-full">
          <Dialog.Title className="text-xl font-semibold mb-4">
            {title}
          </Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 p-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

### SEO & Metadata
```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: "St Saviour's Catholic Church, Lewisham",
    template: "%s | St Saviour's Catholic Church"
  },
  description: "A welcoming Catholic community in Lewisham, South East London",
  openGraph: {
    type: 'website',
    siteName: "St Saviour's Catholic Church",
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true
  }
}
```

## Build & Deployment

### Modern Build Pipeline
- **Vercel**: Optimized Next.js hosting
- **Edge Functions**: For dynamic content
- **ISR**: Incremental Static Regeneration
- **Image CDN**: Automatic image optimization
- **Analytics**: Built-in performance monitoring

### Quality Assurance
- **Unit Tests**: Vitest for fast testing
- **E2E Tests**: Playwright for critical paths
- **Visual Regression**: Chromatic for UI testing
- **Accessibility Testing**: axe-core integration

This modern stack will provide a solid foundation for the rebuilt St Saviour's website with 2025 standards.