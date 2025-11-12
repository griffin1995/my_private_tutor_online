# DEVELOPMENT GUIDE - MY PRIVATE TUTOR ONLINE

**Last Updated**: November 10, 2025
**Purpose**: Technical implementation standards, coding patterns, and development workflows
**Audience**: Developers, architects, technical leads

---

## TABLE OF CONTENTS

1. [Quick Start Development](#quick-start-development)
2. [Critical Development Standards](#critical-development-standards)
3. [Synchronous CMS Architecture](#synchronous-cms-architecture-mandatory)
4. [Tailwind CSS @layer base Styling](#tailwind-css-layer-base-styling)
5. [Component Patterns](#component-patterns)
6. [TypeScript Standards](#typescript-standards)
7. [Testing & Debugging](#testing--debugging)
8. [Context7 MCP Usage](#context7-mcp-usage)
9. [Error Handling & Boundaries](#error-handling--boundaries)
10. [Performance Optimization](#performance-optimization)
11. [Security & Validation](#security--validation)
12. [Git Workflow](#git-workflow)

---

## QUICK START DEVELOPMENT

### Essential Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build (verify before deploy)
npm run lint         # ESLint code quality checks
npm run typecheck    # TypeScript compilation validation
npm run test         # Run test suite

# Deployment (Vercel CLI ONLY)
vercel --prod        # Deploy to production
vercel cache purge --type=cdn  # Clear CDN cache
```

### Pre-Development Checklist

**BEFORE starting any development task**:

1. ✅ Read CLAUDE.md for critical standards
2. ✅ Verify British English conventions
3. ✅ Check Context7 MCP for library documentation
4. ✅ Identify appropriate agent (Haiku/Sonnet/Opus)
5. ✅ Understand synchronous CMS architecture requirements
6. ✅ Review @layer base styling patterns

### First-Time Setup

```bash
# Clone repository
git clone <repository-url>
cd my_private_tutor_online

# Install dependencies
npm install

# Verify build works
npm run build

# Start development
npm run dev
```

---

## CRITICAL DEVELOPMENT STANDARDS

### Tier 0: Absolute Non-Negotiables (ZERO TOLERANCE VIOLATIONS)

**British English Mandatory**:
- All spelling: colour, organisation, programme, centre
- Date formats: DD/MM/YYYY (not MM/DD/YYYY)
- Currency: £ (GBP) not $ (USD)
- Terminology: tutoring (not tutoring), behaviour (not behavior)

**Premium Service Standard**:
- Royal client-worthy implementations exclusively
- NO SHORTCUTS or quick fixes
- Enterprise-grade, production-ready solutions only
- Zero AI attribution in any communications

**Architectural Mandates**:
- Synchronous CMS architecture (NO async patterns for static content)
- @layer base styling (NO hardcoded colors/manual class application)
- Context7 MCP for ALL library documentation (NO unofficial sources)

### Development Workflow Tiers

**Simple Tasks → Haiku Agent**:
- Content updates (text changes, copy edits)
- CSS tweaks (spacing, colours, minor adjustments)
- Simple component changes (prop updates, minor refactors)
- Documentation updates
- Bug fixes

**Complex Tasks → Sonnet Agent**:
- Component architecture (new features, complex interactions)
- API integrations (third-party services)
- Form implementations (validation, submission logic)
- State management (complex data flows)
- Testing suites (comprehensive test coverage)

**Strategic Tasks → Opus Agent**:
- System architecture (major structural changes)
- Performance optimization (build times, bundle sizes)
- Accessibility compliance (WCAG 2.1 AA)
- Security implementations (authentication, authorization)
- Complex business logic (booking systems, payment flows)

---

## SYNCHRONOUS CMS ARCHITECTURE (MANDATORY)

### Critical Background: August 2025 Homepage Failure

**ZERO TOLERANCE FOR ASYNC PATTERNS** - Homepage completely failed in August 2025 due to async CMS patterns. This must NEVER be repeated.

**Failure Symptoms**:
- Loading spinners that never resolved
- ".map is not a function" errors
- Missing homepage sections
- Complete loss of business-critical content

### Working Pattern (MANDATORY)

```typescript
// CONTEXT7 SOURCE: /typescript/handbook - Direct JSON imports for static content
import cmsContent from '../../content/cms-content.json';

export const getCMSContent = (): CMSContentType => {
  return cmsContent; // MANDATORY: Synchronous return
};

// Usage in component
const content = getCMSContent(); // Direct function call without loading states
```

### Forbidden Patterns (CAUSES HOMEPAGE FAILURE)

```typescript
// ❌ NEVER USE: Async function for static CMS content
export const loadCachedContent = async (): Promise<any> => {
  /* FORBIDDEN */
};

// ❌ NEVER USE: useState for static JSON content
const [content, setContent] = useState(null); // FORBIDDEN FOR STATIC DATA

// ❌ NEVER USE: useEffect for CMS data loading
useEffect(() => {
  loadContent();
}, []); // FORBIDDEN FOR CMS DATA

// ❌ NEVER USE: Dynamic imports for CMS content
const content = await import('./cms-content.json'); // FORBIDDEN
```

### CMS Architecture Rules

1. **Direct JSON imports only** - No dynamic loading
2. **Synchronous functions exclusively** - No Promise returns
3. **No loading states for static content** - Immediate availability required
4. **No useEffect for CMS data** - Direct function calls only
5. **Runtime violation detection** - Monitoring prevents regressions

### CMS File Structure

```
src/
├── lib/
│   └── cms/
│       ├── cms-content.ts          # Content retrieval functions (synchronous)
│       ├── cms-images.ts           # Image/video asset management (synchronous)
│       └── types.ts                # TypeScript interfaces
└── content/
    ├── site-header.json            # Navigation and header content
    ├── homepage.json               # Homepage sections
    ├── testimonials.json           # Client testimonials
    ├── services.json               # Service offerings
    └── settings.json               # Global site settings
```

### CMS Usage Examples

```typescript
// Import CMS functions
import {
  getHeroContent,
  getTestimonials,
  getServices,
  getSiteHeader,
} from '@/lib/cms/cms-content';

import {
  getHeroImage,
  getTestimonialVideos,
} from '@/lib/cms/cms-images';

// Retrieve content (synchronous - no await, no loading states)
const hero = getHeroContent();
const testimonials = getTestimonials();
const services = getServices();

// Use immediately in component
export function HeroSection() {
  const content = getHeroContent(); // Synchronous call

  return (
    <section>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </section>
  );
}
```

### Adding New CMS Content

**Step 1: Update JSON File**
```json
// src/content/homepage.json
{
  "hero": {
    "title": "Premium Private Tutoring",
    "subtitle": "Oxbridge & 11+ Specialists Since 2010"
  }
}
```

**Step 2: Add TypeScript Interface**
```typescript
// src/lib/cms/types.ts
export interface HeroContent {
  readonly title: string;
  readonly subtitle: string;
}
```

**Step 3: Create Synchronous Retrieval Function**
```typescript
// src/lib/cms/cms-content.ts
import homepageData from '@/content/homepage.json';

export function getHeroContent(): HeroContent {
  return homepageData.hero;
}
```

**Step 4: Use in Component (No Loading States)**
```typescript
// src/components/HeroSection.tsx
import { getHeroContent } from '@/lib/cms/cms-content';

export function HeroSection() {
  const hero = getHeroContent(); // Synchronous - immediate availability

  return (
    <section>
      <h1>{hero.title}</h1>
      <h2>{hero.subtitle}</h2>
    </section>
  );
}
```

---

## TAILWIND CSS @LAYER BASE STYLING

### Critical Pattern: Official Tailwind CSS Approach

**CONTEXT7 SOURCE**: `/tailwindlabs/tailwindcss.com` - Official "Adding Custom Styles" documentation

### Mandatory Startup File Reads

**BEFORE ANY STYLING WORK**, read these files:

1. `/home/jack/Documents/my_private_tutor_online/src/app/globals.css` (lines 593-758: @layer base)
2. `/home/jack/Documents/my_private_tutor_online/tailwind.config.ts` (single source of truth)

### Three-Tier Cascade Architecture

```css
/* Layer 1: Preflight (automatic) - Tailwind's CSS reset */
/* Layer 2: Custom base styles (globals.css) - brand defaults */
/* Layer 3: Utility classes (Tailwind) - component overrides */
```

### Semantic HTML Works Automatically

```tsx
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base for semantic defaults
// ✅ CORRECT: Write less code - styles are automatic
<h1>Premium Tutoring Service</h1>  // Automatically: navy color, bold, 3xl size
<p>Excellence in education since 2010.</p>  // Automatically: grey-800, relaxed line-height
<a href="/about">Learn More</a>  // Automatically: gold color with hover transition
```

### Utility Overrides When Needed

```tsx
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Utilities always override base layer
// ✅ CORRECT: Easy overrides with utility classes for exceptions
<h1 className="text-white">White Heading</h1>  // Utility override: white instead of navy
<a className="text-primary-700">Navy Link</a>  // Utility override: navy instead of gold
<p className="text-sm">Smaller text</p>  // Utility override: smaller size
```

### Implementation in globals.css (lines 593-758)

```css
@layer base {
  /* Headings - Primary brand colour (navy) from --color-primary-base */
  h1, h2, h3, h4, h5, h6 {
    color: var(--color-primary-base);
    font-family: var(--font-family-display);
    font-weight: var(--font-weight-bold);
  }

  /* Links - Accent colour (gold) from --color-accent with hover transitions */
  a {
    color: var(--color-accent);
    transition: color 200ms;
  }
  a:hover {
    color: var(--color-accent-dark);
    text-decoration-line: underline;
  }

  /* Body text - Neutral colour from --color-neutral-grey-800 */
  p {
    color: var(--color-neutral-grey-800);
    line-height: var(--font-line-height-relaxed);
  }

  /* Navigation exclusions - prevent link styling in nav/buttons */
  nav a,
  [data-navigation] a,
  button a,
  .btn {
    color: inherit;
  }
}
```

### Forbidden Styling Patterns

```tsx
// ❌ FORBIDDEN: Manual color application on every element
<h1 className="text-primary-700 text-3xl font-bold">Title</h1>  // DON'T DO THIS
<p className="text-neutral-grey-800 leading-relaxed">Text</p>  // DON'T DO THIS
<a className="text-accent-600 hover:text-accent-700">Link</a>  // DON'T DO THIS
```

### Correct Styling Strategy

```tsx
// ✅ CORRECT: Let @layer base handle defaults
<h1>Title</h1>  // @layer base provides navy color, bold, 3xl size
<p>Text content here.</p>  // @layer base provides grey-800, relaxed leading
<a href="/page">Link</a>  // @layer base provides gold with hover effect

// ✅ CORRECT: Use utilities only for exceptions
<h1 className="text-white">White Title on Dark Background</h1>
<p className="text-sm">Smaller paragraph for legal text</p>
<a className="text-primary-700">Navy link in specific context</a>
```

### Styling Workflow for All Agents

**STEP 1**: Read required files (globals.css lines 593-758, tailwind.config.ts)
**STEP 2**: Verify @layer base coverage for semantic HTML element
**STEP 3**: Apply styling strategy:
  - **Default Case**: Use semantic HTML without classes (`<h1>Title</h1>`)
  - **Override Case**: Add utility classes only for exceptions (`<h1 className="text-white">`)
  - **New Component**: Build with semantic HTML first, add utilities for variations

### Benefits of @layer base Approach

1. **Write Less Code**: `<h1>Title</h1>` instead of `<h1 className="text-3xl font-bold text-primary-700">Title</h1>`
2. **Automatic Consistency**: All pages inherit brand styling without manual class application
3. **Single Source of Truth**: CSS variables from :root → @layer base → all components
4. **Easy Overrides**: Utility classes always win (higher specificity by design)
5. **Zero Conflicts**: @layer ensures proper cascade order, no specificity battles

---

## COMPONENT PATTERNS

### Radix UI Button with Polymorphic Support

**CONTEXT7 SOURCE**: `/radix-ui/primitives` - Slot composition pattern

```typescript
import { Root as Slot, Slottable } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Button({
  asChild = false,
  loading = false,
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading}
      {...props}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin">
          <LoaderIcon />
        </span>
      )}
      {asChild ? (
        <Slottable>{children}</Slottable>
      ) : (
        children
      )}
    </Comp>
  );
}

// Usage
<Button variant="primary" size="lg">Click Me</Button>
<Button asChild><Link href="/about">Learn More</Link></Button>
```

### Error Boundary Pattern (Royal Client Quality)

**CONTEXT7 SOURCE**: `/facebook/react` - Error boundary implementation

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class HomepageErrorBoundary extends React.Component<
  { children: ReactNode; sectionName?: string },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Homepage section error (${this.props.sectionName}):`, error);

    // Analytics tracking for performance monitoring
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'homepage_section_error', {
        event_category: 'Error',
        event_label: this.props.sectionName || 'unknown'
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p>Something went wrong loading this section.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<HomepageErrorBoundary sectionName="hero">
  <HeroSection />
</HomepageErrorBoundary>
```

### Framer Motion with LazyMotion Optimization

**CONTEXT7 SOURCE**: `/framer/motion` - LazyMotion for bundle reduction

```typescript
import { LazyMotion, domAnimation, m } from 'framer-motion';

// Wrap application with LazyMotion (do once in layout)
<LazyMotion features={domAnimation} strict>
  {children}
</LazyMotion>

// Use 'm' instead of 'motion' for optimized animations
<m.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content here
</m.div>
```

### Next.js Image Optimization

**CONTEXT7 SOURCE**: `/vercel/next.js` - Image component best practices

```typescript
import Image from 'next/image';

// Responsive image with multiple sizes
<Image
  src="/images/hero.jpg"
  alt="Premium tutoring service hero image"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority // For above-the-fold images
  quality={90}
/>

// Responsive image with fill
<div className="relative w-full h-64">
  <Image
    src="/images/testimonial.jpg"
    alt="Client testimonial"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

---

## TYPESCRIPT STANDARDS

### Performance-Optimized Configuration

**CONTEXT7 SOURCE**: `/microsoft/typescript` - Performance compilation patterns

```json
// tsconfig.json - Optimized for build speed
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./.next/.tsbuildinfo",
    "target": "ES2020",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "removeComments": true,
    // Performance optimizations
    "disableSourceOfProjectReferenceRedirect": true,
    "importsNotUsedAsValues": "remove"
  }
}
```

### Type Export Pattern

```typescript
// CONTEXT7 SOURCE: /microsoft/typescript - Type export patterns
export type {
  BaseCMSContent,
  CMSResponse,
  NavigationItem,
  SiteHeader,
  HeroContent,
  TrustIndicator,
  TestimonialsSection,
  Service,
  ContactDetails,
  QuoteFormContent,
  ImageAsset,
  VideoAsset,
  ResponsiveImageSizes,
};
```

### Comprehensive Type Safety

```typescript
// All functions have explicit return types
export function getHeroContent(): HeroContent {
  return homepageData.hero;
}

// Readonly properties for immutability
export interface HeroContent {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
}

// Union types for specific literal types
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
```

---

## TESTING & DEBUGGING

### Test Suite Structure

```bash
src/
├── __tests__/
│   ├── components/        # Component unit tests
│   ├── lib/               # Utility function tests
│   └── integration/       # Integration tests
└── e2e/                   # End-to-end tests
```

### Component Testing Pattern

```typescript
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/HeroSection';

describe('HeroSection', () => {
  it('renders hero content correctly', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Premium Tutoring Service');
  });

  it('has accessible CTA button', () => {
    render(<HeroSection />);

    const button = screen.getByRole('button', { name: /request a quote/i });
    expect(button).toBeInTheDocument();
  });
});
```

### Debugging Tools

```typescript
// React DevTools - Component inspection
// Chrome DevTools - Network, Performance tabs
// Vercel Analytics - Real-time performance monitoring

// Debug logging for development
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

---

## CONTEXT7 MCP USAGE

### Mandatory Pattern for All Library Documentation

**NEVER use unofficial sources, tutorials, or community examples**

```typescript
// Step 1: Resolve library ID
mcp__context7__resolve-library-id({ libraryName: "next.js" })

// Step 2: Get official documentation
mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  topic: "image optimization"
})
```

### Supported Libraries (Context7 Verified)

- `/vercel/next.js` - Next.js framework
- `/facebook/react` - React library
- `/microsoft/typescript` - TypeScript language
- `/tailwindlabs/tailwindcss` - Tailwind CSS
- `/radix-ui/primitives` - Radix UI components
- `/framer/motion` - Framer Motion animations

### Example Usage in Development

```typescript
// CONTEXT7 SOURCE: /vercel/next.js - Dynamic routing patterns
// (Documentation retrieved via Context7 MCP)

import { notFound } from 'next/navigation';

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
```

---

## ERROR HANDLING & BOUNDARIES

### Error Boundary Hierarchy

```typescript
// Global error boundary (layout level)
<GlobalErrorBoundary>
  <Navigation />
  <main>
    {/* Page-level error boundaries */}
    <PageErrorBoundary>
      {/* Section-level error boundaries */}
      <SectionErrorBoundary sectionName="hero">
        <HeroSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="testimonials">
        <TestimonialsSection />
      </SectionErrorBoundary>
    </PageErrorBoundary>
  </main>
  <Footer />
</GlobalErrorBoundary>
```

### Input Validation with Zod

```typescript
import { z } from 'zod';

const QuoteFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^(\+44|0)[1-9]\d{8,9}$/), // UK phone format
  subject: z.enum(['oxbridge', '11-plus', 'gcse', 'a-level']),
  message: z.string().min(10).max(1000),
});

export function validateQuoteForm(data: unknown) {
  return QuoteFormSchema.parse(data);
}
```

---

## PERFORMANCE OPTIMIZATION

### Build Performance Targets

- Build Time: <11.0s (currently maintained)
- TypeScript Compilation: <5s (currently 4.956s)
- First Load JS: Targeting 380KB (current 607KB)
- All 91 routes optimized successfully

### Optimization Strategies

**1. LazyMotion for Framer Motion**:
```typescript
import { LazyMotion, domAnimation, m } from 'framer-motion';

<LazyMotion features={domAnimation} strict>
  <m.div>Optimized animations</m.div>
</LazyMotion>
```

**2. Dynamic Imports for Heavy Components**:
```typescript
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false,
});
```

**3. Image Optimization**:
```typescript
// Use Next.js Image with proper sizing
<Image
  src="/hero.jpg"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority
/>
```

---

## SECURITY & VALIDATION

### Input Sanitization

```typescript
import DOMPurify from 'isomorphic-dompurify';

export function getSanitizedContent(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
}
```

### GDPR Compliance

- Zod schemas for all forms
- Input validation on server-side
- No sensitive data in client-side code
- Cookie consent implementation
- Data protection practices

### Accessibility (WCAG 2.1 AA)

```typescript
// Semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/about">About Us</a></li>
  </ul>
</nav>

// ARIA attributes
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  aria-controls="modal-content"
>
  Close
</button>

// Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## GIT WORKFLOW

### Branch Strategy

```bash
main (or master)     # Production-ready code
├── feature/*        # New features
├── fix/*            # Bug fixes
├── refactor/*       # Code refactoring
└── docs/*           # Documentation updates
```

### Commit Standards

```bash
# Descriptive commit messages
git commit -m "feat: add responsive navigation for mobile devices"
git commit -m "fix: resolve CMS async pattern causing homepage failure"
git commit -m "refactor: migrate to @layer base styling architecture"
git commit -m "docs: update development guide with Context7 patterns"
```

### Deployment Workflow

```bash
# 1. Verify build locally
npm run build

# 2. Commit changes
git add .
git commit -m "feat: implement new testimonials section"

# 3. Push to repository
git push origin feature/new-testimonials

# 4. Deploy via Vercel CLI (NOT GitHub integration)
vercel --prod

# 5. Clear cache if needed
vercel cache purge --type=cdn
```

---

## TROUBLESHOOTING COMMON ISSUES

### Homepage Loading Failures

**Problem**: Homepage sections not loading, ".map is not a function" errors
**Solution**: Check for async CMS patterns, convert to synchronous functions

### Build Failures

**Problem**: Build fails with module not found
**Solution**: Verify import paths, check file extensions, ensure dependencies installed

### TypeScript Errors

**Problem**: Type errors preventing compilation
**Solution**: Ensure interfaces match JSON structure, add explicit return types

### Styling Issues

**Problem**: Hardcoded colors not matching design system
**Solution**: Use design tokens from tailwind.config.ts, leverage @layer base defaults

### Performance Degradation

**Problem**: Build times exceeding 11.0s target
**Solution**: Check for unnecessary dependencies, optimize images, use dynamic imports

---

## QUICK REFERENCE CHECKLIST

### Before Starting Development

- [ ] Read CLAUDE.md for critical standards
- [ ] Verify British English conventions
- [ ] Check Context7 MCP for library documentation
- [ ] Understand synchronous CMS architecture
- [ ] Review @layer base styling patterns

### Before Committing Code

- [ ] Run `npm run build` successfully
- [ ] Run `npm run lint` with zero errors
- [ ] Run `npm run typecheck` successfully
- [ ] Verify British English throughout
- [ ] Test in development server
- [ ] Ensure no async CMS patterns for static content
- [ ] Verify design tokens used (no hardcoded colors)

### Before Deploying to Production

- [ ] All 91 routes optimize successfully
- [ ] Build time under 11.0s
- [ ] CMS synchronous patterns verified
- [ ] Royal client quality standards met
- [ ] British English conventions maintained
- [ ] Deploy via Vercel CLI (not GitHub integration)

---

**Last Updated**: November 10, 2025
**Maintained By**: Development Team
**Contact**: See PROJECT_OVERVIEW.md for details

_Built for premium tutoring excellence with modern web standards and comprehensive enterprise-grade enhancements_
