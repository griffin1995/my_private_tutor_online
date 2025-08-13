# Technical Architecture - My Private Tutor Online

**Documentation Source**: Context7 MCP - Next.js Architecture Patterns  
**Framework**: Next.js 15.3.4 with App Router  
**Status**: Production Ready  
**Last Updated**: August 2025

---

## 🏗️ Technology Stack

### Core Technologies
| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Framework** | Next.js | 15.3.4 | React framework with App Router |
| **Runtime** | React | 19.0.0 | UI component library |
| **Language** | TypeScript | 5.8.3 | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 4.0.0 | Utility-first CSS |
| **Components** | Radix UI | Latest | Accessible component primitives |
| **Animation** | Framer Motion | 11.15.0 | Production animations |
| **Icons** | Lucide React | 0.469.0 | Consistent icon system |
| **Deployment** | Vercel | - | Hosting platform |

### Supporting Libraries
- **State Management**: Zustand (lightweight client state)
- **Form Handling**: React Hook Form + Zod validation
- **Date Handling**: date-fns (tree-shakeable)
- **Class Management**: clsx + tailwind-merge
- **Typography**: @tailwindcss/typography
- **Analytics**: @vercel/analytics + @vercel/speed-insights

---

## 📁 Project Structure

```
my-private-tutor-online/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── (marketing)/         # Public pages group
│   │   ├── admin/               # Protected admin section
│   │   ├── api/                 # API routes
│   │   ├── layout.tsx           # Root layout with providers
│   │   └── globals.css          # Global styles
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # Radix UI base components
│   │   ├── magicui/             # Premium UI components
│   │   ├── layout/              # Layout components
│   │   ├── marketing/           # Marketing components
│   │   └── admin/               # Admin components
│   │
│   ├── lib/                     # Utility functions
│   │   ├── cms/                 # Content management
│   │   │   ├── cms-content.ts  # Content retrieval
│   │   │   └── cms-images.ts   # Image management
│   │   ├── auth/                # Authentication
│   │   ├── utils.ts             # Helper functions
│   │   └── constants.ts         # App constants
│   │
│   ├── content/                 # JSON content files
│   │   ├── site-header.json    # Navigation data
│   │   ├── homepage.json       # Homepage content
│   │   └── testimonials.json   # Client testimonials
│   │
│   └── types/                   # TypeScript definitions
│       ├── cms.ts               # CMS type definitions
│       └── components.ts        # Component types
│
├── public/                      # Static assets
│   ├── images/                  # Optimised images
│   ├── videos/                  # Video assets
│   └── fonts/                   # Custom fonts
│
├── docs/                        # Documentation
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── vercel.json                  # Vercel deployment config
```

---

## 🎨 Design System

### Colour Palette
```typescript
// tailwind.config.ts colours
const colours = {
  primary: {
    50: '#eff6ff',   // Lightest blue
    900: '#0f172a',  // Navy (primary)
  },
  accent: {
    500: '#eab308',  // Gold (secondary)
    600: '#d97706',  // Dark gold
  },
  neutral: {
    50: '#fafafa',   // Off-white
    900: '#171717',  // Near black
  }
}
```

### Typography System
```css
/* Font Stack */
--font-sans: 'Lato', system-ui, sans-serif;
--font-serif: 'Playfair Display', Georgia, serif;

/* Type Scale (rem) */
--text-xs: 0.75;    /* 12px */
--text-sm: 0.875;   /* 14px */
--text-base: 1;     /* 16px */
--text-lg: 1.125;   /* 18px */
--text-xl: 1.25;    /* 20px */
--text-2xl: 1.5;    /* 24px */
--text-3xl: 1.875;  /* 30px */
--text-4xl: 2.25;   /* 36px */
--text-5xl: 3;      /* 48px */
```

### Spacing System
```typescript
// Tailwind spacing scale (rem)
spacing: {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  4: '1rem',      // 16px
  8: '2rem',      // 32px
  16: '4rem',     // 64px
  32: '8rem',     // 128px
}
```

---

## 🏛️ Architecture Patterns

### Component Architecture
```typescript
// Component structure pattern
interface ComponentProps {
  className?: string
  children?: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function Component({ 
  className, 
  children, 
  variant = 'primary' 
}: ComponentProps) {
  return (
    <div className={cn(
      'base-styles',
      variants[variant],
      className
    )}>
      {children}
    </div>
  )
}
```

### Page Layout Pattern
```typescript
// Standard page structure
export default function Page() {
  return (
    <PageLayout>
      <PageHero 
        title="Page Title"
        description="Page description"
      />
      <Section>
        {/* Content */}
      </Section>
    </PageLayout>
  )
}
```

### Server Components vs Client Components
```typescript
// Server Component (default)
// src/app/page.tsx
export default async function Page() {
  const data = await fetchData()
  return <ServerComponent data={data} />
}

// Client Component (interactive)
// src/components/interactive.tsx
'use client'

export function InteractiveComponent() {
  const [state, setState] = useState()
  return <ClientComponent />
}
```

---

## 📊 Content Management System (CMS)

### Architecture Overview
The CMS is a file-based system using JSON for content storage and TypeScript for type-safe retrieval.

### Core Modules

#### cms-content.ts
```typescript
// Content retrieval with type safety
export function getHeroContent(): HeroContent {
  return loadContent('homepage.json').hero
}

export function getTestimonials(): Testimonial[] {
  return loadContent('testimonials.json').testimonials
}
```

#### cms-images.ts
```typescript
// Image management with responsive sizes
export function getHeroImage(): ResponsiveImage {
  return {
    src: '/images/hero-main.jpg',
    alt: 'Premium tutoring services',
    sizes: {
      mobile: '/images/hero-mobile.jpg',
      tablet: '/images/hero-tablet.jpg',
      desktop: '/images/hero-desktop.jpg'
    }
  }
}
```

### Content Structure
```json
{
  "hero": {
    "title": "Premium Tutoring",
    "subtitle": "Royal Standard Education",
    "ctaText": "Get Started",
    "ctaLink": "/contact"
  },
  "features": [...],
  "testimonials": [...]
}
```

---

## 🔐 Authentication Architecture

### JWT-Based System
```typescript
// Token structure
interface JWTPayload {
  username: string
  role: 'admin' | 'user'
  exp: number
  iat: number
}

// Middleware protection
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')
  
  if (!token) {
    return redirect('/admin/login')
  }
  
  const valid = await verifyJWT(token.value)
  if (!valid) {
    return redirect('/admin/login')
  }
  
  return NextResponse.next()
}
```

---

## ⚡ Performance Architecture

### Optimisation Strategy
1. **Code Splitting**: Automatic route-based splitting
2. **Tree Shaking**: Remove unused code
3. **Image Optimisation**: WebP/AVIF with responsive sizes
4. **Font Optimisation**: Next/font with preloading
5. **Bundle Analysis**: Regular monitoring

### Bundle Configuration
```javascript
// next.config.ts
{
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      '@radix-ui/react-icons',
      'lucide-react'
    ]
  }
}
```

### Performance Targets
- **First Load JS**: <250kB per route
- **LCP**: <2.5s
- **FID**: <100ms
- **CLS**: <0.1
- **Build Time**: <15s

---

## 🔄 State Management

### Client State (Zustand)
```typescript
// Store definition
interface AppStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}))
```

### Server State
- **Data Fetching**: Server Components with async/await
- **Caching**: Next.js built-in caching
- **Revalidation**: Time-based or on-demand

---

## 🚀 Deployment Architecture

### Environment Strategy
```
Development → Preview → Production
   Local      Vercel    Vercel
```

### Dynamic Rendering
```typescript
// Force dynamic for Framer Motion
export const dynamic = 'force-dynamic'
```

### Build Pipeline
1. Type checking (TypeScript)
2. Linting (ESLint)
3. Building (Next.js)
4. Optimisation (Vercel)
5. Deployment (Vercel Edge)

---

## 📡 API Architecture

### Route Handlers
```typescript
// src/app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  const validated = contactSchema.parse(body)
  
  // Process form submission
  await sendEmail(validated)
  
  return Response.json({ success: true })
}
```

### Error Handling
```typescript
// Centralised error handler
export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return Response.json(
      { error: 'Validation failed', details: error.errors },
      { status: 400 }
    )
  }
  
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
```

---

## 🧪 Testing Architecture

### Testing Stack
- **Unit Tests**: Vitest
- **Integration Tests**: Testing Library
- **E2E Tests**: Playwright
- **Accessibility**: axe-core

### Test Structure
```
tests/
├── unit/           # Component tests
├── integration/    # API tests
├── e2e/           # User journey tests
└── accessibility/ # WCAG compliance
```

---

## 📈 Monitoring & Analytics

### Analytics Integration
```typescript
// Layout integration
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Metrics Tracked
- Page views and user flows
- Core Web Vitals
- Error rates
- API performance
- User interactions

---

## 🔧 Development Workflow

### Git Strategy
```
main
  ├── develop
  │     ├── feature/new-feature
  │     ├── fix/bug-fix
  │     └── chore/maintenance
  └── hotfix/critical-fix
```

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **Commit Convention**: Conventional commits
- **PR Template**: Standardised reviews

---

## 🎯 Architecture Decisions

### Why Next.js App Router?
- Better performance with RSC
- Improved SEO capabilities
- Simplified data fetching
- Built-in optimisations

### Why Radix UI?
- Fully accessible components
- Unstyled for custom design
- Composable architecture
- Small bundle size

### Why Tailwind CSS?
- Rapid development
- Consistent design system
- Optimised production builds
- Excellent DX

### Why Vercel?
- Native Next.js support
- Edge network performance
- Automatic optimisations
- Simple deployment

---

## 📚 Architecture Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Radix UI Docs](https://radix-ui.com)
- [Tailwind CSS Docs](https://tailwindcss.com)

### Best Practices
- Context7 MCP patterns
- Next.js best practices
- React patterns
- TypeScript guidelines

---

**Maintained By**: Development Team  
**Architecture Review**: Quarterly  
**Documentation Standard**: Context7 MCP Compliant