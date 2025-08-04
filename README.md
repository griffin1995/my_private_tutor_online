# My Private Tutor Online - Premium Tutoring Website

**Documentation Source**: Context7 MCP - Next.js 15 Best Practices  
**Reference**: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/02-project-structure.mdx

Modern, enterprise-grade tutoring website serving elite families since 2010. Featured in Tatler Address Book 2025 with royal endorsements.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

**Production URL**: https://my-tutor-website-6aipxnfeh-jacks-projects-cf5effed.vercel.app

## 📋 Essential Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Code quality checks
npm run typecheck    # TypeScript validation
npm run test         # Run test suite
```

## 🛠️ Tech Stack

**Documentation Source**: Context7 MCP - Modern Web Stack  
- **Framework**: Next.js 15.3.4 with App Router
- **React**: React 19 with Client Components architecture
- **TypeScript**: TypeScript 5.8.3 with strict mode
- **Styling**: Tailwind CSS 4.x with premium design system
- **Components**: Radix UI (Context7 verified patterns)
- **Animation**: Framer Motion with LazyMotion optimization
- **Icons**: Lucide React + Heroicons
- **Deployment**: Vercel production with dynamic rendering

## 📚 Documentation

- **[Development Guide](docs/DEVELOPMENT.md)** - Complete development standards and Context7 integration
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment and troubleshooting
- **[Architecture](docs/ARCHITECTURE.md)** - Technical decisions and patterns
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🎯 Performance Metrics

- **Build Time**: <15 seconds
- **First Load JS**: ~229kB (optimized)
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Accessibility**: WCAG 2.1 AA compliant

## 🏗️ Architecture

```
src/
├── app/                 # Next.js 15 App Router pages
├── components/
│   ├── ui/             # Radix UI components (Context7 patterns)
│   ├── magicui/        # Premium animations
│   ├── layout/         # Page structure components
│   └── marketing/      # Business-specific components
├── lib/
│   ├── cms/           # Content management system
│   └── utils.ts       # Utility functions
└── content/           # JSON-based content storage
```

## 🔧 Development Standards

**Documentation Source**: Context7 MCP Integration Standards

1. **Context7 MCP Mandatory**: ALL library documentation via Context7 exclusively
2. **British English**: All user-facing content uses British spelling
3. **Component-First**: Check existing components before creating new ones
4. **Zero Hardcoded Content**: All content managed via CMS system
5. **Type Safety**: Strict TypeScript with comprehensive interfaces

## 🚀 Deployment

**Platform**: Vercel (Production)
- Dynamic rendering architecture
- Client Components strategy
- Force-dynamic in root layout for Framer Motion
- Optimized bundle with LazyMotion

## 🎓 Business Features

### Target Audiences
1. **Oxbridge Preparation**: Elite university entry preparation
2. **11+ Parents**: Grammar school entrance exam support
3. **GCSE & A-Level Students**: Exam preparation and tutoring
4. **Elite Corporate Families**: Bespoke educational services

### Premium Positioning
- **Heritage**: 15 years established (since 2010)
- **Staff**: 100% Oxford/Cambridge graduate tutors
- **Recognition**: Featured in Tatler Address Book 2025
- **Royal Endorsements**: Premium family testimonials

## 🔒 Security & Compliance

- **Input Validation**: Zod schemas for all forms
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Continuous monitoring via Vercel Analytics
- **Data Protection**: GDPR compliant practices

## 🆘 Support

1. Check [Development Guide](docs/DEVELOPMENT.md) for coding standards
2. Review [Troubleshooting](docs/TROUBLESHOOTING.md) for common issues
3. Verify Context7 MCP patterns for library usage

---

**Status**: ✅ Production Ready | **Architecture**: Enterprise-grade Next.js 15  
**Documentation**: Context7 MCP verified | **Last Updated**: August 2025

*Built for premium tutoring excellence with modern web standards*