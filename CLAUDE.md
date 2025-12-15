# My Private Tutor Online - Claude Code Project Configuration

## Project Overview

**Project**: Premium tutoring service website with royal endorsements
**Tech Stack**: Next.js 15.3.4, React 19, TypeScript 5.8+, Tailwind CSS 3.4.1
**Standards**: Enterprise-grade quality, British English, royal client standards
**Deployment**: Vercel via manual CLI deployment only

## Quick Navigation

### Essential Documentation
- **Start Here**: [Development Standards](docs/standards/development-standards.md) - Core rules and workflows
- **CSS Architecture**: [CSS Architecture](docs/standards/css-architecture.md) - Styling patterns and @layer base system
- **CMS Patterns**: [CMS Patterns](docs/standards/cms-patterns.md) - Critical synchronous architecture rules
- **Emergency Protocols**: [Emergency Protocols](docs/reference/emergency-protocols.md) - Recovery procedures

### Technical Specifications
- **Tech Stack**: [Technical Stack](docs/technical/tech-stack.md) - Framework versions and configuration
- **Deployment**: [Deployment Guide](docs/technical/deployment.md) - Vercel CLI patterns
- **Navigation**: [Navigation Patterns](docs/technical/navigation-patterns.md) - Navigation architecture (October 2025)

### Quick Reference
- **Verification**: [Verification Checklists](docs/reference/verification-checklists.md) - Quality gates

## Critical Non-Negotiables

### Zero Tolerance Rules
1. **Synchronous CMS Only** - No async patterns for static content (see [CMS Patterns](docs/standards/cms-patterns.md))
2. **British English** - All code, comments, and documentation
3. **@layer base Architecture** - CSS cascade compliance (see [CSS Architecture](docs/standards/css-architecture.md))
4. **Edit-First Policy** - Modify existing files before creating new ones

### Immediate Task Termination Triggers
- Any `async` functions in CMS code
- `useState`/`useEffect` for static JSON content
- Dynamic imports for CMS data
- Hardcoded colours in navigation components

## Development Workflow

### Common Commands
```bash
# Development
npm run dev           # Local development server
npm run build        # Production build (required before deployment)
npm run typecheck    # TypeScript validation

# Deployment (Vercel CLI only)
vercel deploy        # Preview deployment
vercel --prod        # Production deployment
```

### File Patterns
```typescript
// ✅ Correct CMS pattern (synchronous)
import cmsContent from '../content/cms-content.json';
export const getCMSContent = (): CMSContentType => cmsContent;

// ❌ Forbidden CMS pattern (async)
export const loadContent = async (): Promise<CMSContentType> => { /* FORBIDDEN */ }
```

## Project Architecture

### Directory Structure
```
src/
├── app/                    # Next.js 15 App Router pages
├── components/             # React components
│   ├── navigation/         # Navigation components (design token compliance required)
│   ├── layout/             # Layout components
│   └── sections/           # Page sections
├── content/                # Static JSON content (CMS data)
├── lib/                    # Utilities and services
├── styles/                 # CSS files (@layer base architecture)
└── types/                  # TypeScript definitions
```

### CMS Architecture (Critical)
- **Content**: Direct JSON imports from `src/content/` directory
- **Images**: Centralised through `src/lib/cms/cms-images.ts`
- **Pattern**: Synchronous functions only, no loading states for static content
- **Violation Detection**: Runtime monitoring prevents async patterns

### Styling System
- **Framework**: Tailwind CSS 3.4.1 with @layer base architecture
- **Design Tokens**: Defined in `tailwind.config.ts`
- **Navigation**: Must use design tokens (`text-primary-700`, `text-accent-600`)
- **Responsive**: Mobile-first with 5 breakpoints (sm, md, lg, xl, 2xl)

## Deployment Standards

### Vercel CLI Deployment Only
```bash
# Required workflow
npm run build                    # Local validation
vercel deploy                    # Preview deployment
vercel --prod                    # Production deployment
```

### Key Configuration
- **Dynamic Rendering**: `export const dynamic = 'force-dynamic'` in layout.tsx
- **Client Components**: All pages use "use client" directive
- **Build Target**: 11.0s build time maintained
- **Cache Management**: `vercel cache purge --type=cdn` for issues

## Navigation Requirements (October 2025)

### Design System Compliance
- **Navy Text**: `text-primary-700` (never hardcoded #3F4A7E)
- **Gold Accents**: `text-accent-600` (never hardcoded #CA9E5B)
- **Responsive Breakpoint**: Desktop navigation at 1400px+ (`2xl`)
- **Typography**: Navigation items larger than button text at each breakpoint

### Layout Architecture
```typescript
// Navigation container patterns
<nav className="hidden 2xl:flex items-center flex-1 justify-center space-x-8">
  {/* Navigation items */}
</nav>

<div className="hidden 2xl:flex min-w-48 justify-end">
  {/* CTA button */}
</div>

<button className="2xl:hidden">
  {/* Mobile hamburger */}
</button>
```

## Quality Standards

### Code Quality Requirements
- **TypeScript**: Strict mode with proper type definitions
- **Testing**: Jest + Testing Library for components
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Core Web Vitals optimization
- **Security**: Input validation and XSS prevention

### British English Standards
```typescript
// ✅ Correct spelling
colour, realise, optimise, centre, behaviour

// ❌ American spelling
color, realize, optimize, center, behavior
```

## Emergency Recovery

### Homepage Loading Failures
1. Check for `async` keywords in CMS functions
2. Verify no `useState`/`useEffect` for static content
3. Confirm direct JSON imports pattern
4. See [Emergency Protocols](docs/reference/emergency-protocols.md) for full recovery procedures

### Build Failures
1. Run `npm run typecheck` for TypeScript errors
2. Check import paths and file extensions
3. Verify Tailwind CSS class validity
4. Confirm no hardcoded colours in navigation

## Development Session Guidelines

### Before Starting
1. Read relevant documentation files from `docs/` directory
2. Understand current codebase state via git status
3. Review emergency protocols if making architectural changes

### During Development
1. Follow edit-first policy for file modifications
2. Maintain synchronous CMS patterns throughout
3. Use design tokens for all navigation styling
4. Validate British English in all content

### Before Committing
1. Run `npm run build` locally
2. Verify no TypeScript errors
3. Check CSS architecture compliance
4. Confirm no forbidden async patterns introduced

## Related Configuration

### Git Integration
- **Attribution**: Commits include "🤖 Generated with Claude Code"
- **Branch Strategy**: Feature branches with descriptive names
- **Commit Standards**: Conventional commits with British English

### MCP Servers
- **Context7**: Library documentation and best practices
- **Git**: Version control operations
- **Stocky**: Stock image integration

## Documentation Maintenance

This file references modular documentation in the `docs/` directory. When project requirements change:

1. Update relevant files in `docs/standards/` for rule changes
2. Update `docs/technical/` for technical specification changes
3. Update `docs/reference/` for workflow changes
4. Keep this CLAUDE.md file as navigation hub only

## Version Information

- **Framework**: Next.js 15.3.4 App Router
- **React**: 19.x
- **TypeScript**: 5.8+
- **Tailwind**: 3.4.1
- **Node.js**: Latest LTS
- **Documentation Version**: 2025.1 (Modular Standards)

---

**Last Updated**: December 2025
**Documentation Standard**: Modular technical organisation with developer-focused content