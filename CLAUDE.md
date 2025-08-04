# CRITICAL DEVELOPMENT RULES - READ FIRST

## ABSOLUTELY CRITICAL RULES - NEVER VIOLATE THESE - APPLIES TO ALL CONTEXT WINDOWS
1. **MANDATORY CODE DOCUMENTATION VERIFICATION** - ALL CODE, EVERY SINGLE PIECE OF CODE, MUST ALWAYS BE CHECKED AGAINST LOCAL DOCUMENTATION BEFORE IMPLEMENTATION. NEVER CREATE CODE WITHOUT VERIFYING IT FOLLOWS DOCUMENTATION BEST PRACTICES. THIS RULE APPLIES TO EVERY SINGLE LINE OF CODE WRITTEN.
2. **NEVER add attribution to any AI tools** in code comments, commit messages, or documentation
3. **NEVER mention AI assistance** in any form throughout the codebase
4. **ALWAYS use British English** spelling and terminology throughout all code, documentation, and user-facing content
5. **NEVER take shortcuts or create minimal versions** - Always implement the most optimal, production-ready, industry-standard solutions
6. **MANDATORY DOCUMENTATION REQUIREMENT** - If documentation for any language/framework/library is not available in docs/ directory, IMMEDIATELY STOP and explicitly ask the user to provide the relevant documentation before proceeding with any code implementation

## Core Development Principles
7. **REMEMBER the complete tech stack** even if parts aren't implemented yet - we follow a proper roadmap and architecture
8. **ALWAYS commit logical changes** at important steps with industry-standard commit messages following conventional commit format
9. **ALWAYS implement comprehensive, production-ready solutions** that meet enterprise standards for security, performance, and maintainability

## File Management Rules
10. **Do what has been asked; nothing more, nothing less**
11. **NEVER create files unless they're absolutely necessary for achieving your goal**
12. **ALWAYS prefer editing an existing file to creating a new one**
13. **NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User**

## Documentation Strategy
14. **ALWAYS use documentation from the local docs/ directory** - all required documentation is provided locally
15. **NEVER fetch external documentation** - all necessary references are maintained in the docs/ directory
16. **MANDATORY DOCUMENTATION CHECK** - Before writing ANY code, ALWAYS verify the implementation against the relevant documentation in docs/ directory
17. **STOP AND ASK POLICY** - If documentation for any technology is missing from docs/ directory, IMMEDIATELY STOP all code implementation and explicitly request the user to provide the documentation
18. **ZERO TOLERANCE FOR UNDOCUMENTED CODE** - Never write code based on assumptions or general knowledge - ALL code must be verified against official documentation patterns
19. **OFFICIAL DOCUMENTATION ONLY** - NEVER use unofficial tutorials, blogs, or community examples - ONLY use official library documentation provided by the maintainers
20. **CUSTOM DOCUMENTATION MAINTENANCE** - Maintain CUSTOM_DOCS.md file for proven patterns and component implementations for faster lookup

---

# Project: My Private Tutor Online - Website Redesign

## Project Overview
Modern 2025 redesign of the tutoring website focusing on:
- Mobile-first responsive design
- Enhanced performance and loading times
- Better user interaction and navigation
- Accessibility compliance

## Status
✅ **Production Ready** - Royal endorsement branding implemented for 2025
✅ **Vercel Deployment Complete** - Dynamic rendering successfully configured
✅ **React.Children.only Errors Resolved** - Radix UI Slot components fixed
✅ **Content Updates Complete** - Trust indicators updated with new copy and images
✅ **Video Path Issues Resolved** - All video assets properly configured in /public/videos/

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

# CONSOLIDATED DEVELOPMENT BEST PRACTICES

## Advanced Architecture Standards
19. **MODERN TECH STACK 2025** - Use Next.js 15+ with App Router, React 19, TypeScript 5.3+, Tailwind CSS 4.x
20. **COMPONENT ARCHITECTURE** - Implement React Server Components, Zustand for state, React Hook Form with Zod validation
21. **PERFORMANCE TARGETS** - Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1, bundle <150kB gzipped

## CMS and Content Management Excellence
22. **MANDATORY CMS INTEGRATION** - All content must use centralised CMS system with cms-content.ts and cms-images.ts
23. **ZERO HARDCODED CONTENT** - Never hardcode images paths, contact details, or parish information
24. **CMS COMMENT REQUIREMENT** - Every CMS usage must include `// CMS DATA SOURCE: Using [function] for [purpose]` comment
25. **STRUCTURED DATA MANAGEMENT** - Use settings.json for configuration, maintain image metadata and alt-text

## Design System Excellence
26. **CONSISTENT COLOR PALETTE** - Primary: Navy/Slate-900 (#0f172a), Gold accent (#eab308), white backgrounds
27. **TYPOGRAPHY HIERARCHY** - Font-serif for headings, font-sans for body, maintain consistent scale
28. **COMPONENT VARIANTS** - Use Class Variance Authority (CVA) for component variants and styling
29. **DESIGN TOKEN SYSTEM** - Maintain centralised design tokens for spacing, colours, typography

## Accessibility and User Experience
30. **WCAG 2.1 AA MANDATORY** - Full compliance required, not optional
31. **MOTION SENSITIVITY** - Always implement `prefers-reduced-motion` support for animations
32. **KEYBOARD NAVIGATION** - Ensure complete keyboard accessibility with focus management
33. **SEMANTIC HTML** - Use proper heading hierarchy, ARIA labels, and semantic elements

## Quality Assurance Standards
34. **COMPREHENSIVE TESTING** - Unit tests with Vitest, E2E with Playwright, accessibility with axe-core
35. **PERFORMANCE MONITORING** - Bundle analysis, Web Vitals tracking, real user monitoring
36. **SECURITY IMPLEMENTATION** - JWT authentication, HTTP-only cookies, input validation with Zod
37. **TROUBLESHOOTING PREPARATION** - Document common issues and solutions in codebase

## Administrative and Content Management
38. **USER-FRIENDLY CMS** - Design admin interfaces for non-technical users with clear documentation
39. **FILE-BASED STORAGE** - Use JSON-based content storage for simplicity and version control
40. **MAINTENANCE MODE** - Implement site-wide maintenance capabilities while preserving admin access
41. **ADMIN GUIDE REQUIREMENT** - Create comprehensive user guides for content management

## Template and Component Standards
42. **TEMPLATE ARCHITECTURE** - Use consistent PageLayout → PageHero → Section structure
43. **BACKGROUND COLOUR CONTROL** - Always specify background='white' explicitly in PageLayout
44. **REUSABLE COMPONENTS** - Create church-specific components (GroupCard, NewsCard, ContactForm, etc.)
45. **RESPONSIVE DESIGN** - Mobile-first approach with proper breakpoint strategy

## Component Library Standards
46. **APPROVED COMPONENT LIBRARIES** - Prefer Radix UI + Tailwind (Shadcn/UI pattern), Mantine, Chakra UI, Material UI based on project needs
47. **ACCESSIBILITY-FIRST COMPONENTS** - Always choose libraries with built-in WCAG compliance (Radix UI, React Aria, Mantine)
48. **OFFICIAL DOCUMENTATION MANDATE** - ONLY use official library documentation, never community tutorials or blog posts
49. **COMPONENT PATTERN DOCUMENTATION** - Document all proven component patterns in CUSTOM_DOCS.md for future reference

## Development Workflow Excellence
50. **VERSION CONTROL STRATEGY** - Use main/develop/feature branch model with conventional commits
51. **DOCUMENTATION REQUIREMENTS** - Maintain technical documentation, admin guides, and troubleshooting guides
52. **LEGAL COMPLIANCE** - Include GDPR, safeguarding, accessibility statements for UK church websites
53. **PRODUCTION READINESS** - Complete deployment checklist with security review and staff training

---

# CRITICAL DEPLOYMENT RESOLUTION - AUGUST 2025

## Context7 MCP Integration Success
54. **CONTEXT7 MCP MANDATORY** - ALL library documentation must be retrieved exclusively via Context7 MCP
55. **NO EXTERNAL DOCUMENTATION** - Never use unofficial sources, blogs, or community tutorials
56. **OFFICIAL DOCS ONLY** - Use `mcp__context7__resolve-library-id` followed by `mcp__context7__get-library-docs`
57. **DOCUMENTATION COMMENTS** - All implementations must include Context7 MCP documentation source comments

## Vercel Dynamic Rendering Solution
58. **DYNAMIC RENDERING ARCHITECTURE** - All pages are Client Components using "use client" directive
59. **GLOBAL FORCE-DYNAMIC** - layout.tsx maintains `export const dynamic = 'force-dynamic'` for Framer Motion compatibility
60. **NO PAGE-LEVEL FORCE-DYNAMIC** - Client Components are automatically dynamic, avoid redundant force-dynamic exports
61. **STATIC EXPORT ELIMINATION** - Remove all static export configurations from next.config.ts

## React.Children.only Error Resolution Pattern
62. **RADIX UI SLOT PATTERN** - Use `import { Root as Slot, Slottable } from "@radix-ui/react-slot"`
63. **MULTIPLE CHILDREN HANDLING** - Wrap children with `<Slottable>` when asChild=true and multiple children exist
64. **LAZY MOTION STRICT MODE** - Remove `strict` prop from LazyMotion to prevent React.Children.only errors
65. **SLOT COMPOSITION VERIFICATION** - Always verify Slot components handle multiple children correctly

## Production Deployment Standards
66. **VERCEL PROJECT RECREATION** - If deployment cache issues persist, delete and recreate Vercel project
67. **BUILD VERIFICATION** - Always run `npm run build` locally before deployment
68. **PRODUCTION URL** - https://my-tutor-website-6aipxnfeh-jacks-projects-cf5effed.vercel.app
69. **DEPLOYMENT COMMAND** - Use `vercel --prod` for production deployments

## Technical Architecture Validation
70. **CLIENT COMPONENTS STRATEGY** - Unusual but valid architecture with all pages as Client Components
71. **FRAMER MOTION COMPATIBILITY** - Global force-dynamic required for LazyMotionProvider in layout.tsx
72. **PERFORMANCE METRICS** - First Load JS ~229kB for homepage, build time <15 seconds
73. **ROUTING VALIDATION** - All routes marked as ƒ (Dynamic) server-rendered on demand

## Recent Implementation Patterns - August 2025
74. **MODULAR SECTION EXTRACTION** - Extract homepage sections into reusable components (e.g., ResultsSection, HomepageHowItWorks)
75. **CONTEXT-AWARE IMAGE MAPPING** - Map trust indicators to appropriate images based on content meaning
76. **SECTION SPACING COORDINATION** - Use consistent padding to prevent double spacing between sections
77. **CMS-DRIVEN VIDEO PATHS** - All video assets served from /public/videos/ with CMS integration

## Component Best Practices
78. **PROPS INTERFACE DESIGN** - All section components should have flexible props for title, description, backgroundColor, className
79. **DEFAULT PROP VALUES** - Always provide sensible defaults for optional props in component definitions
80. **DOCUMENTATION COMMENTS** - Every component must include Context7 MCP documentation references
81. **SEMANTIC IMAGE SELECTION** - Choose images based on content context rather than arbitrary rotation