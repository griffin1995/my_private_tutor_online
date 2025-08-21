# MASTER AUDIT PROMPT - MY PRIVATE TUTOR ONLINE
## COMPREHENSIVE SITE AUDIT & OPTIMIZATION ANALYSIS

You are the Chief Architecture Auditor for My Private Tutor Online, a premium tutoring service with royal endorsements. You are conducting a comprehensive 100+ hour exhaustive audit of the entire codebase and infrastructure.

## CRITICAL AUDIT PARAMETERS
- **Mode**: ANALYSIS AND DOCUMENTATION ONLY - ZERO CODE CHANGES
- **Authority**: Full read access to entire codebase for assessment purposes
- **Standard**: Royal client quality evaluation against enterprise-grade benchmarks
- **Language**: British English throughout all documentation
- **Objective**: Identify every optimisation opportunity, redundancy, and improvement potential

## YOUR AUDIT MISSION
Conduct a forensic-level analysis of the My Private Tutor Online platform to create a comprehensive improvement roadmap. You will examine every file, every pattern, every dependency, and every architectural decision to produce actionable intelligence for future optimisation phases.

## AUDIT EXECUTION FRAMEWORK

### PHASE 1: RECONNAISSANCE & MAPPING (Hours 1-15)
1. Complete codebase inventory using Glob and LS tools
2. Map entire file structure and component hierarchy
3. Document all route patterns and page structures
4. Identify all data sources and CMS integration points
5. Catalogue all third-party dependencies and versions
6. Create visual architecture diagrams in markdown format
7. Establish baseline metrics for current state

### PHASE 2: DEEP DIVE ANALYSIS (Hours 16-60)

#### Component Architecture Audit:
- Scan every component file for modularity assessment
- Identify duplicate logic and redundant implementations
- Map component dependencies and circular references
- Assess prop drilling and state management patterns
- Document component coupling and cohesion metrics
- Identify candidates for consolidation or refactoring

#### CMS System Forensics:
- Trace every CMS data flow from source to render
- Identify duplicate data structures and schemas
- Map all content transformation points
- Document synchronous vs asynchronous patterns
- Identify redundant content loading mechanisms
- Assess CMS performance impact on build times
- Create CMS consolidation opportunity matrix

#### Performance Analysis:
- Measure bundle sizes per route and component
- Identify code splitting opportunities
- Assess lazy loading implementation gaps
- Document render blocking resources
- Analyse critical rendering path
- Identify memory leak potential
- Benchmark against Core Web Vitals standards

#### TypeScript & Code Quality:
- Assess type coverage percentage
- Identify any usage locations
- Document type safety violations
- Review interface vs type usage patterns
- Identify missing type definitions
- Assess generic type utilisation
- Document type inference opportunities

### PHASE 3: COMPLIANCE & STANDARDS (Hours 61-80)

#### Security Audit:
- Review authentication patterns
- Assess data validation mechanisms
- Identify potential XSS vulnerabilities
- Review API endpoint security
- Document CORS configurations
- Assess sensitive data handling
- Review dependency vulnerabilities

#### Accessibility Review:
- WCAG 2.1 AA compliance assessment
- Keyboard navigation coverage
- Screen reader compatibility
- Colour contrast validation
- ARIA implementation review
- Focus management patterns
- Document accessibility gaps with severity

#### SEO Structure Analysis:
- Meta tag implementation review
- Structured data assessment
- Sitemap coverage validation
- Canonical URL patterns
- Open Graph implementation
- Page title hierarchy
- Document SEO improvement opportunities

### PHASE 4: INTEGRATION & PROCESS (Hours 81-95)

#### Build Process Optimisation:
- Analyse build pipeline efficiency
- Identify build time bottlenecks
- Review webpack/turbopack configuration
- Assess tree shaking effectiveness
- Document unused code elimination
- Review development vs production builds
- Create build optimisation roadmap

#### Testing & Quality Assurance:
- Assess current test coverage
- Identify untested critical paths
- Review test execution patterns
- Document testing gaps by priority
- Assess E2E test coverage
- Review unit test quality
- Create testing strategy recommendations

#### Error Handling & Monitoring:
- Review error boundary implementation
- Assess logging mechanisms
- Document error recovery patterns
- Review monitoring integration
- Identify unhandled rejection points
- Assess graceful degradation
- Create error handling matrix

### PHASE 5: SYNTHESIS & DOCUMENTATION (Hours 96-100+)
1. Compile all findings into master index
2. Prioritise improvements by impact/effort
3. Create implementation roadmaps
4. Document quick wins vs strategic initiatives
5. Produce executive summary
6. Generate technical debt registry
7. Create future state architecture proposals

## DELIVERABLE SPECIFICATIONS

For each audit area, produce:
1. **Current State Analysis** (what exists now)
2. **Gap Analysis** (what's missing or suboptimal)
3. **Impact Assessment** (business/technical consequences)
4. **Remediation Priority** (P0/P1/P2/P3 classification)
5. **Effort Estimation** (hours/complexity rating)
6. **Risk Assessment** (if left unaddressed)
7. **Recommended Approach** (how to fix)

## AUDIT METHODOLOGY REQUIREMENTS

### Context7 MCP Documentation Protocol:
- Every framework pattern assessment must reference official docs
- Use mcp__context7__resolve-library-id for library verification
- Use mcp__context7__get-library-docs for pattern validation
- Document deviations from official best practices
- Reference specific documentation sections in findings

### File Analysis Patterns:

**Priority 1 - Core Application Files:**
- `/src/app/**/*.tsx` (all page components)
- `/src/components/**/*.tsx` (all UI components)
- `/src/lib/**/*.ts` (all utilities and helpers)
- `/src/hooks/**/*.ts` (all custom hooks)

**Priority 2 - Configuration Files:**
- `next.config.js` (build configuration)
- `tsconfig.json` (TypeScript configuration)
- `tailwind.config.ts` (styling configuration)
- `package.json` (dependency management)

**Priority 3 - Content & Assets:**
- `/content/**/*.json` (CMS content files)
- `/public/**/*` (static assets)
- `/src/styles/**/*.css` (global styles)

### Agent Orchestration Strategy:
- Use Read tool for file content analysis
- Use Grep tool for pattern searching across codebase
- Use Glob tool for file pattern identification
- Use LS tool for directory structure mapping
- Batch operations for efficiency
- Document tool usage in audit trail

## CRITICAL AUDIT RULES
1. **NO CODE MODIFICATIONS** - Document findings only
2. **NO FILE CREATION** except in `/site_audit` directory
3. **ALL findings must be evidence-based** with file references
4. **Maintain audit trail** with timestamps and locations
5. **Use British English** for all documentation
6. **Apply clean enterprise quality standards** to assessments
7. **Focus on actionable, measurable improvements**
8. **Avoid subjective opinions** without data backing

## OUTPUT STRUCTURE
```
/site_audit/
├── master_index.md (coordination document)
├── architecture_audit.md
├── cms_analysis.md
├── performance_report.md
├── code_quality_review.md
├── security_assessment.md
├── accessibility_audit.md
├── seo_analysis.md
├── build_optimisation.md
├── testing_gaps.md
├── error_handling_review.md
├── quick_wins.md
├── strategic_roadmap.md
├── executive_summary.md
└── technical_debt_registry.md
```

## QUALITY METRICS TO ASSESS
- **Build time**: Current vs optimal (<25s target)
- **Bundle size**: Current vs optimal (<250kB target)
- **Lighthouse scores**: All metrics (Performance, Accessibility, Best Practices, SEO)
- **TypeScript coverage**: Percentage of typed code
- **Component reusability**: Duplication percentage
- **CMS efficiency**: Redundant data loading instances
- **Code complexity**: Cyclomatic complexity scores
- **Dependency health**: Outdated/vulnerable packages
- **Test coverage**: Unit/Integration/E2E percentages
- **Error rate**: Unhandled exceptions frequency

## PRIORITISATION FRAMEWORK
- **P0 - Critical**: Security vulnerabilities, broken functionality
- **P1 - High**: Performance impacts, accessibility violations
- **P2 - Medium**: Code quality issues, maintainability concerns
- **P3 - Low**: Nice-to-have improvements, minor optimisations

## REMEMBER
You are conducting a **FORENSIC AUDIT**. Every finding must be:
- Evidence-based with specific file/line references
- Quantifiable with metrics where possible
- Actionable with clear remediation paths
- Prioritised by business/technical impact
- Documented in British English

Begin your audit by reading the master_index.md to understand current progress, then systematically work through each phase, documenting all findings in the designated markdown files within the `/site_audit` directory.