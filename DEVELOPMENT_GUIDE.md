# Development Guide - My Private Tutor Online

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
my-tutor-website/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── layout/         # Layout components (PageLayout, PageHero)
│   │   ├── marketing/      # Marketing components (BrandStatement, etc.)
│   │   ├── sections/       # Section components (ResultsSection, etc.)
│   │   ├── magicui/        # Magic UI components
│   │   └── ui/             # Shadcn/UI components
│   ├── content/            # CMS JSON files
│   ├── lib/                # Utilities and helpers
│   │   └── cms/            # CMS functions
│   └── styles/             # Global styles
├── public/                 # Static assets
│   ├── images/            # Image assets
│   └── videos/            # Video assets
├── docs/                   # Documentation
├── .claude/               # Claude Code configuration
└── tests/                 # Test files
```

## Key Development Patterns

### 1. CMS Integration (MANDATORY)
All content must use the centralised CMS system:

```typescript
// CMS DATA SOURCE: Using getHeroContent for hero section
const heroContent = getHeroContent()

// NEVER hardcode content
// BAD: <h1>Welcome to My Private Tutor Online</h1>
// GOOD: <h1>{heroContent.title}</h1>
```

### 2. Component Architecture
Create modular, reusable components with flexible props:

```typescript
interface SectionProps {
  title?: string
  description?: string
  backgroundColor?: string
  className?: string
  showDescription?: boolean
}

export function SectionComponent({ 
  title = "Default Title",
  backgroundColor = "bg-white",
  className = "",
  ...props
}: SectionProps) {
  // Component implementation
}
```

### 3. Section Spacing Coordination
Prevent double spacing between adjacent sections:

```typescript
// Section with full spacing
<SectionA className="pt-16 lg:pt-24 pb-16 lg:pb-24" />

// Next section with no top padding
<SectionB className="pt-0 pb-16 lg:pb-24" />
```

### 4. Context-Aware Image Selection
Map content to appropriate images based on meaning:

```typescript
if (content.includes('discretion')) {
  imageKey = 'private-consultation'
} else if (content.includes('global')) {
  imageKey = 'online-connection'
}
```

## Technology Stack

- **Framework**: Next.js 15.3.4 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.8.3
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Shadcn/UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **Testing**: Vitest + Playwright

## Critical Rules

1. **ALWAYS use Context7 MCP** for documentation
2. **NEVER hardcode content** - use CMS
3. **ALWAYS use British English** spelling
4. **NEVER mention AI assistance** in code
5. **ALWAYS implement production-ready** solutions

## Common Tasks

### Adding a New Page
1. Create page in `src/app/[page-name]/page.tsx`
2. Use "use client" directive for interactive pages
3. Import and use PageLayout component
4. Add CMS content in `src/content/`

### Creating a Section Component
1. Create in `src/components/sections/`
2. Add flexible props interface
3. Include CMS integration
4. Export from sections index

### Updating Content
1. Edit JSON files in `src/content/`
2. Use appropriate CMS getter function
3. Add Context7 MCP documentation comments

## Deployment

### Vercel Deployment
```bash
# Deploy to production
vercel --prod

# Check deployment
vercel ls
```

### Configuration
- Dynamic rendering enabled globally
- All pages are Client Components
- Framer Motion compatibility maintained

## Troubleshooting

### React.Children.only Error
- Use Radix UI Slot pattern with Slottable
- Remove strict prop from LazyMotion
- Wrap multiple children properly

### Video 404 Errors
- Ensure videos in `/public/videos/`
- Update CMS paths to match
- Check file extensions

### Spacing Issues
- Review section padding classes
- Coordinate adjacent sections
- Use consistent spacing scale

## MCP Configuration

Context7 MCP is configured for official documentation retrieval:
- Resolve library IDs: `mcp__context7__resolve-library-id`
- Get documentation: `mcp__context7__get-library-docs`

## Testing Commands

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Git Workflow

```bash
# Feature branch
git checkout -b feature/your-feature

# Commit with conventional format
git commit -m "feat: add new component"

# Push and create PR
git push -u origin feature/your-feature
gh pr create
```

## Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle**: < 150kB gzipped

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support

## Need Help?

1. Check CLAUDE.md for rules
2. Review CUSTOM_DOCS.md for patterns
3. Use Context7 MCP for documentation
4. Report issues on GitHub

---

Last Updated: August 2025