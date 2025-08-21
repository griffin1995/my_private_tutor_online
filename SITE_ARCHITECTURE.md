# SITE ARCHITECTURE - MY PRIVATE TUTOR ONLINE
## Complete Visual and Technical Architecture
*Created: 21 August 2025*
*Status: Production Architecture Implemented*

---

# VISUAL ARCHITECTURE MAP

## Homepage Structure
```
HOMEPAGE
├── Navigation Header (sticky)
│   ├── Logo
│   ├── Main Menu (with dropdowns)
│   └── CTA Button (Book Consultation)
├── Hero Section
│   ├── Headline + Royal Endorsement
│   ├── Value Proposition
│   ├── Hero Video/Image
│   └── Primary CTA
├── Trust Indicators Bar
│   ├── Tatler Logo
│   ├── Years Established
│   └── Success Statistics
├── Quote Form Section
│   └── Multi-step Form Component
├── About Section
│   ├── Founder Introduction
│   └── Company Heritage
├── Services Overview
│   ├── Service Cards Grid
│   └── View All Services CTA
├── How It Works
│   ├── 3-Step Process
│   └── Tier 1 Spotlight Design
├── Testimonials Preview
│   ├── Featured Testimonials
│   └── Video Testimonials
├── Results Section
│   └── Success Metrics Grid
└── Footer
    ├── Newsletter Signup
    ├── Quick Links
    └── Legal/Contact Info
```

## Service Pages Architecture
```
SERVICE PAGES
├── Subject Tuition
│   ├── Hero with Breadcrumbs
│   ├── Subject Categories Grid
│   ├── Nested Dropdown Navigation
│   └── Enquiry Form
├── 11+ Bootcamps
│   ├── Programme Overview
│   ├── Success Stories
│   └── Booking System
├── Homeschooling
│   ├── Approach Section
│   ├── Curriculum Options
│   └── Parent Resources
└── Video Masterclasses
    ├── Video Grid Layout
    ├── Category Filters
    └── Preview Players
```

---

# TECHNICAL ARCHITECTURE

## Component Hierarchy
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with force-dynamic
│   ├── page.tsx           # Homepage
│   └── [routes]/          # Individual pages
├── components/
│   ├── layout/            # Header, Footer, Hero
│   ├── sections/          # Page sections
│   ├── forms/             # Form components
│   ├── ui/                # Reusable UI elements
│   └── testimonials/      # Testimonial components
├── lib/
│   ├── cms/               # CMS functions (SYNCHRONOUS)
│   ├── utils/             # Utility functions
│   └── analytics/         # Tracking functions
└── content/
    ├── cms-content.json   # Static content
    └── testimonials.json  # Testimonial data
```

## Data Flow Architecture
```
DATA FLOW (SYNCHRONOUS)
┌─────────────────┐
│   JSON Files    │
│  (Static Data)  │
└────────┬────────┘
         │ Direct Import
         ▼
┌─────────────────┐
│  CMS Functions  │
│  (Synchronous)  │
└────────┬────────┘
         │ Direct Return
         ▼
┌─────────────────┐
│   Components    │
│  (Immediate)    │
└─────────────────┘
```

---

# NAVIGATION ARCHITECTURE

## Primary Navigation Structure
```
MAIN MENU
├── Services [Dropdown]
│   ├── Subject Tuition [Nested]
│   │   ├── English
│   │   ├── Mathematics
│   │   ├── Sciences
│   │   └── Languages
│   ├── 11+ Preparation
│   ├── GCSE Support
│   ├── A-Level Tutoring
│   └── Oxbridge Preparation
├── About [Dropdown]
│   ├── Our Story
│   ├── Meet Our Tutors
│   └── Why Choose Us
├── How It Works
├── Testimonials
├── Video Masterclasses
└── Contact
```

## Mobile Navigation
- Hamburger menu with slide-out panel
- Touch-optimised with larger tap targets
- Accordion-style nested menus
- Sticky header with scroll hide/show

---

# PAGE TEMPLATES

## Standard Page Template
```typescript
// Standard page structure
export default function PageTemplate() {
  return (
    <>
      <PageHeader />
      <PageHero 
        title="Page Title"
        subtitle="Page Subtitle"
        backgroundImage="/path/to/image"
      />
      <main>
        {/* Page-specific sections */}
      </main>
      <CTASection />
      <PageFooter />
    </>
  );
}
```

## Form Integration Pattern
```typescript
// Synchronous form data loading
import formContent from '@/content/form-content.json';

export function FormSection() {
  const content = formContent; // Direct access, no loading state
  return <QuoteRequestForm {...content} />;
}
```

---

# RESPONSIVE BREAKPOINTS

## Design System Breakpoints
```css
/* Tailwind CSS Breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape / Small desktop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

## Layout Adaptations
- **Mobile**: Single column, stacked sections
- **Tablet**: Two column grids, side-by-side elements
- **Desktop**: Full multi-column layouts, hover interactions

---

# PERFORMANCE ARCHITECTURE

## Optimisation Strategy
1. **Code Splitting**: Route-based automatic splitting
2. **Image Optimisation**: Next.js Image with lazy loading
3. **Font Loading**: Preload critical fonts
4. **CSS**: Tailwind CSS with PurgeCSS
5. **Caching**: Static assets with long cache headers

## Critical Rendering Path
```
1. HTML Document
2. Critical CSS (inline)
3. Preloaded Fonts
4. Above-fold Images
5. JavaScript Bundle
6. Below-fold Content
```

---

# SEO ARCHITECTURE

## URL Structure
```
/                           # Homepage
/services                   # Services overview
/subject-tuition           # Subject tutoring
/about                     # About us
/testimonials              # Customer testimonials
/how-it-works              # Process explanation
/video-masterclasses       # Video content
/blog                      # Blog (under construction)
/contact                   # Contact page
```

## Meta Data Structure
- Unique title tags (50-60 characters)
- Meta descriptions (150-160 characters)
- Open Graph tags for social sharing
- Structured data (JSON-LD) for rich snippets
- XML sitemap generation

---

## Architecture Principles
1. **Simplicity**: Clear, intuitive navigation paths
2. **Performance**: Fast loading, optimised assets
3. **Scalability**: Modular components, extensible structure
4. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
5. **Maintainability**: Clear separation of concerns, documented patterns