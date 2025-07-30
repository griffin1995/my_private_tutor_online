# My Private Tutor Online - Premium Tutoring Website

Modern, high-performance tutoring website serving elite families since 2010. Featured in Tatler Address Book with royal endorsements.

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

## 📋 Essential Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Check code quality
npm run typecheck    # TypeScript validation
npm run test         # Run tests
npm run quality      # Run all quality checks
```

## 🛠️ Tech Stack

- **Next.js 15** with App Router + **React 19**
- **TypeScript 5.3+** with strict mode
- **Tailwind CSS 4** with design tokens
- **Radix UI** (Shadcn/UI) + **Magic UI** animations
- **Framer Motion** with LazyMotion (87% bundle reduction)
- **Cloudflare Pages** deployment

## 📚 Documentation

- **[Complete Guide](docs/CONSOLIDATED_DOCUMENTATION.md)** - Comprehensive development reference
- **[Development Rules](CLAUDE.md)** - Critical standards and requirements
- **[Component Library](docs/CUSTOM_DOCUMENTATION.md)** - UI components and patterns

## 🎯 Performance Targets

- **Loading**: <1.5s first load
- **Core Web Vitals**: LCP <2.5s, INP <200ms, CLS <0.1
- **Bundle Size**: <150kB gzipped
- **Accessibility**: WCAG 2.1 AA compliant

## 🏗️ Architecture

```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── ui/             # Shadcn/UI components (22)
│   ├── magicui/        # Premium animations (6)
│   ├── layout/         # Page structure (5)
│   └── marketing/      # Business components (8)
├── lib/
│   ├── cms/           # Content management
│   └── utils.ts       # Utilities
└── styles/            # Global styles
```

## 🔧 Development Standards

- **Component-First**: Check existing components before creating new ones
- **British English**: All user-facing content uses British spelling
- **Documentation**: All code verified against official docs
- **CMS Integration**: Zero hardcoded content, centralised management
- **Type Safety**: Strict TypeScript with comprehensive interfaces

## 🚀 Deployment

**Cloudflare Pages** (Production)
- Build: `npm install --legacy-peer-deps && npm run build`
- Output: `out` directory
- Static export optimised for performance

## 🆘 Support

1. **Check Documentation**: [Consolidated Guide](docs/CONSOLIDATED_DOCUMENTATION.md)
2. **Component Issues**: Review [Component Library](docs/CUSTOM_DOCUMENTATION.md)
3. **Build Problems**: Verify [Development Rules](CLAUDE.md)

---

**Status**: Production Ready | **Compliance**: 95/100 | **Last Updated**: July 2025
