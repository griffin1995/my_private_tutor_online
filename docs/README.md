# Development Documentation

## Quick Start

This documentation provides technical specifications and development standards for the codebase. All files follow modular organisation principles for easy navigation and maintenance.

## Documentation Structure

```
docs/
├── README.md                           # This file - project overview
├── standards/                          # Development standards and rules
│   ├── development-standards.md        # Core development rules and workflows
│   ├── css-architecture.md            # Styling architecture and patterns
│   └── cms-patterns.md                # CMS synchronous patterns (critical)
├── technical/                          # Technical specifications
│   ├── tech-stack.md                  # Technology stack and versions
│   ├── deployment.md                  # Deployment patterns and procedures
│   └── navigation-patterns.md         # Navigation architecture requirements
└── reference/                          # Quick reference materials
    ├── agent-specialisation.md        # Agent workflow matrix
    ├── emergency-protocols.md         # Recovery procedures
    └── verification-checklists.md     # Quality gates and validation
```

## Tech Stack Overview

- **Framework**: Next.js 15.3.4 App Router
- **Language**: TypeScript 5.8+
- **Styling**: Tailwind CSS 3.4.1 with @layer base architecture
- **Deployment**: Vercel with manual CLI deployment
- **Architecture**: Synchronous CMS with direct JSON imports

## Critical Requirements

### Zero Tolerance Rules
1. **Synchronous CMS Only** - See [cms-patterns.md](standards/cms-patterns.md)
2. **British English** - All code and documentation
3. **@layer base Architecture** - See [css-architecture.md](standards/css-architecture.md)

### File Management Policy
- **Edit-first**: Modify existing files before creating new ones
- **Modular approach**: Keep concerns separated across documentation files
- **No business context**: Focus on technical implementation only

## Quick Navigation

- **Start here for standards**: [development-standards.md](standards/development-standards.md)
- **CSS architecture**: [css-architecture.md](standards/css-architecture.md)
- **Emergency protocols**: [emergency-protocols.md](reference/emergency-protocols.md)
- **Tech specifications**: [tech-stack.md](technical/tech-stack.md)

## File Conventions

- Use kebab-case for all documentation filenames
- Maintain consistent heading hierarchy (#, ##, ###)
- Include cross-references between related files
- Keep each file focused on single concern area

## Last Updated

This documentation follows 2025 best practices for modular technical documentation with developer-focused content organisation.