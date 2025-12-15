# Tech Stack Specifications

## Core Technologies

### Framework and Runtime
- **Next.js**: 15.3.4 App Router
- **React**: 19
- **TypeScript**: 5.8+
- **Node.js**: Latest LTS

### Styling and UI
- **Tailwind CSS**: 3.4.1
- **CSS Architecture**: @layer base with CSS custom properties
- **Design System**: Design tokens in tailwind.config.ts
- **Component Library**: Custom components with Tailwind utilities

### Build and Performance
- **Build Target**: 11.0s build time
- **Routes**: 91 optimized routes
- **Monitoring**: Real-time performance tracking
- **Bundle Optimisation**: Tree shaking, code splitting

## Architecture Requirements

### CMS Architecture
- **Pattern**: Synchronous CMS with direct JSON imports
- **Files**: `cms-content.ts`, `cms-images.ts`
- **Data Access**: Direct function calls, no async patterns
- **Monitoring**: Runtime violation detection

### Client-Side Architecture
- **Rendering**: "use client" directive for Framer Motion compatibility
- **State Management**: Local state with React hooks
- **Data Flow**: Synchronous data access from JSON imports
- **Component Pattern**: Modular sections with single responsibility

### Server-Side Architecture
- **Rendering**: Vercel dynamic rendering
- **Layout**: `export const dynamic = 'force-dynamic'` in layout.tsx only
- **API Routes**: RESTful patterns with TypeScript
- **Error Handling**: React error boundaries (removed for stability)

## Performance Specifications

### Build Performance
- **Target**: 11.0s maximum build time
- **Optimisation**: Route optimisation (91 routes)
- **Bundle Size**: Minimised through tree shaking
- **TypeScript**: Strict mode enabled

### Runtime Performance
- **Monitoring**: Real-time performance tracking
- **Metrics**: Core Web Vitals compliance
- **Caching**: Static asset optimisation
- **Loading**: No loading states for static content

### Quality Assurance
- **Accessibility**: WCAG 2.1 AA compliance
- **Testing**: Build verification required
- **Linting**: ESLint with TypeScript rules
- **Type Safety**: Strict TypeScript configuration

## Development Environment

### Required Tools
- **Node.js**: Latest LTS version
- **Package Manager**: npm (default)
- **Vercel CLI**: For deployment
- **TypeScript**: Strict configuration
- **ESLint**: TypeScript-compatible rules

### File Structure Requirements
```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout with force-dynamic
│   ├── page.tsx               # Pages following App Router
│   └── globals.css            # @layer base + CSS variables
├── components/                 # Modular React components
├── lib/                       # Utility functions and CMS access
│   ├── cms-content.ts         # Synchronous content access
│   └── cms-images.ts          # Synchronous image access
├── content/                   # Static JSON content
└── styles/                    # Additional styling (minimal)
```

### Configuration Files
- **tailwind.config.ts**: Design system tokens (676 lines)
- **tsconfig.json**: Strict TypeScript configuration
- **next.config.js**: Next.js optimisation settings
- **package.json**: Dependencies and scripts

## Dependencies Management

### Core Dependencies
```json
{
  "next": "15.3.4",
  "react": "19",
  "typescript": "^5.8.0",
  "tailwindcss": "^3.4.1",
  "@types/react": "latest",
  "@types/node": "latest"
}
```

### Development Dependencies
- **ESLint**: TypeScript-compatible configuration
- **Prettier**: Code formatting (optional)
- **PostCSS**: For Tailwind CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Forbidden Dependencies
- **CSS-in-JS libraries**: Use Tailwind CSS only
- **State management libraries**: Use React state only
- **Async data libraries**: Use synchronous patterns only
- **Component libraries**: Build custom components

## Version Control Requirements

### Repository Structure
- **Main Branch**: `master`
- **Working Branch**: Current development
- **Deployment**: Manual via Vercel CLI
- **Commit Pattern**: Conventional commits preferred

### File Management
- **Git**: Version control for all source files
- **Documentation**: Modular files in `docs/`
- **Configuration**: Tracked in version control
- **Dependencies**: Lock files committed

## Monitoring and Quality

### Performance Monitoring
- **Real-time tracking**: Performance metrics
- **Build monitoring**: Automated build verification
- **CMS violation detection**: Runtime monitoring
- **Security compliance**: Enterprise-grade patterns

### Quality Gates
- **Build success**: All TypeScript compilation
- **CSS validation**: @layer base compliance
- **CMS verification**: Synchronous patterns only
- **Performance targets**: Build time under 11.0s

### Continuous Verification
- **Pre-commit**: Lint and type checks
- **Build verification**: Local builds required
- **Architecture compliance**: CMS pattern validation
- **Performance validation**: Monitoring dashboards

## Related Documentation

- [Development Standards](../standards/development-standards.md)
- [CSS Architecture](../standards/css-architecture.md)
- [CMS Patterns (Critical)](../standards/cms-patterns.md)
- [Deployment Procedures](deployment.md)