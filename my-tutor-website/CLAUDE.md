# CRITICAL DEVELOPMENT RULES - READ FIRST

## ABSOLUTELY CRITICAL RULES - NEVER VIOLATE THESE - APPLIES TO ALL CONTEXT WINDOWS
1. **MANDATORY CODE DOCUMENTATION VERIFICATION** - ALL CODE, EVERY SINGLE PIECE OF CODE, MUST ALWAYS BE CHECKED AGAINST LOCAL DOCUMENTATION BEFORE IMPLEMENTATION. NEVER CREATE CODE WITHOUT VERIFYING IT FOLLOWS DOCUMENTATION BEST PRACTICES. THIS RULE APPLIES TO EVERY SINGLE LINE OF CODE WRITTEN.
   - **EXISTING IMPLEMENTATION CHECK**: Before adding any CSS, JavaScript, or component functionality, ALWAYS verify if it already exists in globals.css, existing components, or utility files
   - **CSS-JS DUPLICATION PREVENTION**: If functionality can be achieved with existing CSS (e.g. @media queries, Tailwind classes), NEVER implement equivalent JavaScript logic
   - **FILE SYSTEM INSPECTION MANDATORY**: Use Read, Grep, and Glob tools to inspect existing implementations before writing new code
2. **COMPONENT-FIRST DEVELOPMENT MANDATE** - ALWAYS CHECK EXISTING COMPONENTS FIRST. Before creating ANY new component, MUST verify existing components in /src/components/ui/, /src/components/magicui/, and /src/components/shared/. NEVER duplicate functionality that already exists. ALWAYS reuse and compose existing components.
3. **MODULAR ARCHITECTURE REQUIREMENT** - ALL components must be maximally reusable, composable, and follow single responsibility principle. Create atomic components that can be combined rather than monolithic solutions.
4. **NEVER add attribution to any AI tools** in code comments, commit messages, or documentation
5. **NEVER mention AI assistance** in any form throughout the codebase
6. **ALWAYS use British English** spelling and terminology throughout all code, documentation, and user-facing content
7. **NEVER take shortcuts or create minimal versions** - Always implement the most optimal, production-ready, industry-standard solutions
8. **MANDATORY DOCUMENTATION REQUIREMENT** - If documentation for any language/framework/library is not available in docs/ directory, IMMEDIATELY STOP and explicitly ask the user to provide the relevant documentation before proceeding with any code implementation

## Core Development Principles
9. **REMEMBER the complete tech stack** even if parts aren't implemented yet - we follow a proper roadmap and architecture
10. **ALWAYS commit logical changes** at important steps with industry-standard commit messages following conventional commit format
11. **ALWAYS implement comprehensive, production-ready solutions** that meet enterprise standards for security, performance, and maintainability

## File Management Rules
12. **Do what has been asked; nothing more, nothing less**
13. **NEVER create files unless they're absolutely necessary for achieving your goal**
14. **ALWAYS prefer editing an existing file to creating a new one**
15. **NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User**

## Component Development Strategy
16. **COMPONENT INVENTORY CHECK** - Before any UI development, ALWAYS check /docs/CUSTOM_DOCUMENTATION.md for complete component inventory
17. **REUSE BEFORE CREATE** - If similar functionality exists in any component library (Shadcn, Magic UI, custom), ALWAYS extend/compose rather than recreate
18. **ATOMIC DESIGN PRINCIPLES** - Build components as atoms → molecules → organisms → templates → pages
19. **SINGLE RESPONSIBILITY** - Each component should do one thing extremely well and be maximally reusable
20. **COMPOSITION OVER INHERITANCE** - Use component composition patterns, render props, and compound components

## CSS-JavaScript Integration Rules
21. **CSS-FIRST IMPLEMENTATION PRINCIPLE** - Always implement functionality in CSS when possible before considering JavaScript alternatives
22. **MANDATORY CSS INSPECTION** - Before implementing any client-side logic, ALWAYS check globals.css, component styles, and Tailwind configuration for existing solutions
23. **MEDIA QUERY PRECEDENCE** - User preferences like `prefers-reduced-motion`, `prefers-color-scheme` MUST be handled via CSS @media queries, never JavaScript when possible
24. **NO DUPLICATE IMPLEMENTATIONS** - If CSS can handle responsive behaviour, animations, or user preferences, NEVER create JavaScript equivalents
25. **ACCESSIBILITY CSS INTEGRATION** - All WCAG 2.1 AA compliance features should leverage existing CSS infrastructure before adding JavaScript complexity

## Documentation Strategy
26. **ALWAYS use documentation from the local docs/ directory** - all required documentation is provided locally
27. **NEVER fetch external documentation** - all necessary references are maintained in the docs/ directory
28. **MANDATORY DOCUMENTATION CHECK** - Before writing ANY code, ALWAYS verify the implementation against the relevant documentation in docs/ directory
29. **STOP AND ASK POLICY** - If documentation for any technology is missing from docs/ directory, IMMEDIATELY STOP all code implementation and explicitly request the user to provide the documentation
30. **ZERO TOLERANCE FOR UNDOCUMENTED CODE** - Never write code based on assumptions or general knowledge - ALL code must be verified against official documentation patterns
31. **OFFICIAL DOCUMENTATION ONLY** - NEVER use unofficial tutorials, blogs, or community examples - ONLY use official library documentation provided by the maintainers
32. **CUSTOM DOCUMENTATION MAINTENANCE** - Maintain /docs/CUSTOM_DOCUMENTATION.md file for proven patterns and component implementations for faster lookup

---

# Project: My Private Tutor Online - Website Redesign

## Project Overview
Modern 2025 redesign of the tutoring website focusing on:
- Mobile-first responsive design
- Enhanced performance and loading times
- Better user interaction and navigation
- Accessibility compliance

## Status
✅ **Premium Implementation Complete** - Royal endorsement branding implemented for 2025

## Key Business Details
- **Service**: Private tutoring (KS1-3, GCSEs, A-Level, IB, entrance exams)
- **Clientele**: Premium families, including royal family testimonials
- **Heritage**: 15 years established (since 2010)
- **Staff**: 100% Oxford/Cambridge graduate tutors, official exam board examiners
- **Recognition**: Featured in Tatler Address Book 2025

## Target Audiences
1. **Oxbridge Preparation**: Affluent families seeking prestigious university entry
2. **11+ Parents**: Stressed parents needing reassurance for grammar school entry
3. **GCSE & A-Level Students**: Need practical solutions quickly
4. **Comparison Shoppers**: Logic-driven, comparing multiple services
5. **Elite Corporate Families**: Ultra-wealthy requiring discretion and bespoke service

## Technical Requirements
- **Performance**: <1.5 second loading times
- **Mobile**: Mobile-first responsive design
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Schema markup, local SEO optimization
- **Features**: Online booking system, progress tracking, payment integration

---

# COMPONENT LIBRARY ARCHITECTURE

## Available Component Libraries (USE THESE FIRST)

### Shadcn UI Components (/src/components/ui/)
✅ **AVAILABLE COMPONENTS** - Always check these first:
- **accordion.tsx** - Collapsible content sections
- **aspect-ratio.tsx** - Proper aspect ratio containers
- **button.tsx** - Base button variants
- **calendar.tsx** - Interactive date picker for bookings
- **card.tsx** - Container components
- **form.tsx** - React Hook Form + Zod integration
- **input.tsx** - Form input components
- **label.tsx** - Form labels
- **select.tsx** - Dropdown selectors
- **separator.tsx** - Visual content dividers
- **skeleton.tsx** - Loading placeholders
- **textarea.tsx** - Multi-line text inputs
- **toast.tsx** - Notification system (Sonner)

### Magic UI Components (/src/components/magicui/)
✅ **AVAILABLE COMPONENTS** - Premium animations:
- **hero-video-dialog.tsx** - Full-screen video modals
- **icon-cloud.tsx** - 3D rotating icon displays
- **interactive-hover-button.tsx** - Sophisticated hover animations
- **animated-subscribe-button.tsx** - State-based form buttons
- **shiny-button.tsx** - Premium shimmer effect buttons
- **video-text.tsx** - Animated text reveals

### Layout Components (/src/components/layout/)
✅ **AVAILABLE COMPONENTS** - Page structure:
- **page-layout.tsx** - Main page wrapper
- **page-header.tsx** - Navigation and branding
- **page-footer.tsx** - Site footer
- **page-hero.tsx** - Hero section template
- **section.tsx** - Content section wrapper

### Marketing Components (/src/components/marketing/)
✅ **AVAILABLE COMPONENTS** - Business-specific:
- **service-card.tsx** - Service display cards
- **trust-indicators.tsx** - Credibility elements
- **royal-testimonial-card.tsx** - Premium testimonials

## Component Development Workflow

### STEP 1: Component Inventory
```bash
# ALWAYS run this check before creating ANY component:
ls /src/components/ui/
ls /src/components/magicui/  
ls /src/components/marketing/
ls /src/components/layout/
```

### STEP 2: Composition Strategy
- **Atomic**: Use existing Shadcn UI atoms (Button, Input, etc.)
- **Molecular**: Combine atoms into functional units
- **Organism**: Business logic components using molecules
- **Template**: Page-level layouts using organisms

### STEP 3: Extension Pattern
```typescript
// ✅ CORRECT: Extend existing components
import { Button } from "@/components/ui/button"
import { ShinyButton } from "@/components/magicui/shiny-button"

// Compose new functionality
export function PremiumCTAButton({ children, ...props }) {
  return (
    <ShinyButton className="premium-styles" {...props}>
      {children}
    </ShinyButton>
  )
}

// ❌ INCORRECT: Creating duplicate functionality
export function CustomShinyButton() {
  // Don't recreate existing components!
}
```

### STEP 4: Documentation Update
Every new component MUST be documented in /docs/CUSTOM_DOCUMENTATION.md with:
- Import pattern
- Props API  
- Usage examples
- Integration notes

---

# CONSOLIDATED DEVELOPMENT BEST PRACTICES

## Modern Tech Stack 2025
28. **APPROVED STACK** - Next.js 15+ with App Router, React 19, TypeScript 5.3+, Tailwind CSS 4.x
29. **COMPONENT ARCHITECTURE** - React Server Components, Zustand for state, React Hook Form with Zod validation
30. **PERFORMANCE TARGETS** - Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1, bundle <150kB gzipped

## Design System Excellence
31. **CONSISTENT COLOR PALETTE** - Primary: Navy/Slate-900 (#0f172a), Gold accent (#eab308), white backgrounds
32. **TYPOGRAPHY HIERARCHY** - Font-serif for headings, font-sans for body, maintain consistent scale
33. **COMPONENT VARIANTS** - Use Class Variance Authority (CVA) for component variants and styling
34. **DESIGN TOKEN SYSTEM** - Maintain centralised design tokens for spacing, colours, typography

## Accessibility and User Experience
35. **WCAG 2.1 AA MANDATORY** - Full compliance required, not optional
36. **MOTION SENSITIVITY** - Always implement `prefers-reduced-motion` support for animations
37. **KEYBOARD NAVIGATION** - Ensure complete keyboard accessibility with focus management
38. **SEMANTIC HTML** - Use proper heading hierarchy, ARIA labels, and semantic elements

## Quality Assurance Standards
39. **COMPREHENSIVE TESTING** - Unit tests with Vitest, E2E with Playwright, accessibility with axe-core
40. **PERFORMANCE MONITORING** - Bundle analysis, Web Vitals tracking, real user monitoring
41. **SECURITY IMPLEMENTATION** - JWT authentication, HTTP-only cookies, input validation with Zod
42. **TROUBLESHOOTING PREPARATION** - Document common issues and solutions in codebase

---

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
COMPONENT-FIRST DEVELOPMENT: Always check existing components before creating new ones.
MODULAR ARCHITECTURE: Maximise reusability and composition over recreation.