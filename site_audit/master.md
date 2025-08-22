# SITE AUDIT MASTER - MY PRIVATE TUTOR ONLINE

## IMPLEMENTATION PROMPT

**Terminal Command**: `Read CLAUDE.md for all main rules, then read the master.md files in /autonomous-audit and /site_audit to prepare for audit execution.`

### CRITICAL EXECUTION INSTRUCTIONS

1. **READ CLAUDE.md FIRST** - Extract all project context, development rules, and standards
2. **ACTIVATE CONTEXT-MANAGER** - Use Task tool as specified in CLAUDE.md activation sequence
3. **EXECUTE COMPREHENSIVE SITE AUDIT** - Follow the forensic audit methodology below
4. **COMPLETE ALL PHASES** - 100+ hour equivalent exhaustive analysis
5. **GENERATE DETAILED REPORTS** - Create comprehensive markdown documentation
6. **PROVIDE EXECUTIVE SUMMARY** - Business-ready analysis with actionable recommendations

## COMPREHENSIVE SITE AUDIT & OPTIMIZATION ANALYSIS

You are the Chief Architecture Auditor conducting a forensic-level analysis of the entire My Private Tutor Online platform to create a comprehensive improvement roadmap.

### PROJECT CONTEXT
- **Project**: My Private Tutor Online - Premium tutoring service with royal endorsements
- **Standard**: Royal client quality evaluation against enterprise-grade benchmarks  
- **Language**: British English throughout all documentation
- **Mode**: ANALYSIS AND DOCUMENTATION ONLY - ZERO CODE CHANGES
- **Authority**: Full read access to entire codebase for assessment purposes

### AUDIT EXECUTION FRAMEWORK

#### PHASE 1: RECONNAISSANCE & MAPPING (Hours 1-15)
1. Complete codebase inventory using Glob and LS tools
2. Map entire file structure and component hierarchy  
3. Document all route patterns and page structures
4. Identify all data sources and CMS integration points
5. Catalogue all third-party dependencies and versions
6. Create visual architecture diagrams in markdown format
7. Establish baseline metrics for current state

**Deliverable**: `phase1_reconnaissance_report.md`

#### PHASE 2: DEEP DIVE TECHNICAL ANALYSIS (Hours 16-60)

**Component Architecture Audit:**
- Scan every component file for modularity assessment
- Identify duplicate logic and redundant implementations
- Map component dependencies and circular references
- Assess prop drilling and state management patterns
- Document component coupling and cohesion metrics

**CMS System Forensics:**
- Trace every CMS data flow from source to render
- Identify duplicate data structures and schemas
- Map all content transformation points
- Document synchronous vs asynchronous patterns
- **CRITICAL**: Flag any async patterns as violations
- Assess CMS performance impact on build times

**Performance Analysis:**  
- Measure bundle sizes per route and component
- Identify code splitting opportunities
- Assess lazy loading implementation gaps
- Analyse critical rendering path
- Benchmark against Core Web Vitals standards

**Deliverable**: `phase2_technical_analysis.md`

#### PHASE 3: COMPLIANCE & STANDARDS (Hours 61-80)

**Security Audit:**
- Review authentication patterns and data validation
- Identify potential XSS vulnerabilities
- Assess sensitive data handling and dependency vulnerabilities

**Accessibility Review:**
- WCAG 2.1 AA compliance assessment
- Keyboard navigation coverage and screen reader compatibility
- Colour contrast validation and ARIA implementation

**SEO Structure Analysis:**
- Meta tag implementation and structured data assessment
- Sitemap coverage and canonical URL patterns
- Document SEO improvement opportunities

**Deliverable**: `phase3_compliance_report.md`

#### PHASE 4: OPTIMIZATION OPPORTUNITIES (Hours 81-95)

**Build Process Optimisation:**
- Analyse build pipeline efficiency and identify bottlenecks
- Review webpack/turbopack configuration
- Assess tree shaking effectiveness and unused code

**Testing & Quality Assurance:**
- Assess current test coverage and identify gaps
- Review test execution patterns and E2E coverage
- Document testing strategy recommendations

**Error Handling & Monitoring:**
- Review error boundary implementation and logging
- Assess graceful degradation and monitoring integration
- Create error handling improvement matrix

**Deliverable**: `phase4_optimization_opportunities.md`

#### PHASE 5: SYNTHESIS & RECOMMENDATIONS (Hours 96-100+)
1. Compile all findings into comprehensive analysis
2. Prioritise improvements by impact/effort matrix
3. Create implementation roadmaps with timelines
4. Document quick wins vs strategic initiatives
5. Produce executive summary for stakeholders
6. Generate technical debt registry
7. Create future state architecture proposals

**Deliverable**: `phase5_executive_summary.md`

### AUDIT METHODOLOGY REQUIREMENTS

#### Context7 MCP Documentation Protocol:
- Every framework pattern assessment must reference official docs
- Use mcp__context7__resolve-library-id for library verification
- Use mcp__context7__get-library-docs for pattern validation
- Document deviations from official best practices

#### File Analysis Priority:
**Priority 1 - Core Application:**
- `/src/app/**/*.tsx` (all page components)
- `/src/components/**/*.tsx` (all UI components)  
- `/src/lib/**/*.ts` (all utilities and helpers)
- `/src/hooks/**/*.ts` (all custom hooks)

**Priority 2 - Configuration:**
- `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `package.json`

**Priority 3 - Content & Assets:**
- `/content/**/*.json`, `/public/**/*`, `/src/styles/**/*.css`

### DELIVERABLE SPECIFICATIONS

For each audit area, produce:
1. **Current State Analysis** (what exists now with file references)
2. **Gap Analysis** (what's missing or suboptimal with line numbers)
3. **Impact Assessment** (business/technical consequences)
4. **Remediation Priority** (P0/P1/P2/P3 classification)
5. **Effort Estimation** (hours/complexity rating)
6. **Risk Assessment** (if left unaddressed)
7. **Recommended Approach** (how to fix with implementation details)

### CRITICAL AUDIT RULES
1. **NO CODE MODIFICATIONS** - Document findings only
2. **NO FILE CREATION** except in `/site_audit/` directory
3. **ALL findings must be evidence-based** with specific file/line references
4. **Maintain audit trail** with timestamps and file locations
5. **Use British English** for all documentation
6. **Apply royal client quality standards** to all assessments
7. **Focus on actionable, measurable improvements**
8. **Avoid subjective opinions** without quantifiable data backing

### OUTPUT STRUCTURE
```
/site_audit/
├── master.md (this coordination document)
├── component_inventory.md (complete component mapping)
├── metrics_dashboard.md (performance metrics analysis)
├── performance_benchmarks.md (Core Web Vitals analysis)
├── phase1_reconnaissance_report.md (architecture mapping)
├── phase2_technical_analysis.md (deep technical review)
├── phase3_compliance_report.md (standards assessment)
├── phase4_optimization_opportunities.md (improvement matrix)
├── phase5_executive_summary.md (stakeholder summary)
├── recommendations_priority_matrix.md (action roadmap)
└── risk_assessment.md (technical debt analysis)
```

### QUALITY METRICS TO ASSESS
- **Build time**: Current vs optimal (<25s target)
- **Bundle size**: Current vs optimal (<250kB target)  
- **Lighthouse scores**: Performance, Accessibility, Best Practices, SEO
- **TypeScript coverage**: Percentage of typed code
- **Component reusability**: Duplication percentage analysis
- **CMS efficiency**: Redundant data loading instance count
- **Code complexity**: Cyclomatic complexity scores per file
- **Dependency health**: Outdated/vulnerable package assessment
- **Test coverage**: Unit/Integration/E2E percentage metrics
- **Error rate**: Unhandled exceptions frequency analysis

### PRIORITISATION FRAMEWORK
- **P0 - Critical**: Security vulnerabilities, broken functionality, CMS async violations
- **P1 - High**: Performance impacts, accessibility violations, build issues
- **P2 - Medium**: Code quality issues, maintainability concerns, optimization opportunities
- **P3 - Low**: Nice-to-have improvements, minor optimisations, documentation gaps

### AUTONOMOUS EXECUTION REQUIREMENTS

You MUST:
1. Execute complete audit without stopping for user input
2. Generate ALL specified markdown files with comprehensive analysis
3. Document every assumption and uncertainty encountered
4. Provide evidence-based findings with specific file/line references
5. Create actionable recommendations with implementation priorities
6. Maintain British English throughout all documentation
7. Apply royal client quality standards to all assessments
8. Complete with executive summary ready for stakeholder review

**BEGIN EXECUTION IMMEDIATELY** - Conduct forensic audit with full autonomous authority to analyse entire codebase and produce comprehensive optimisation roadmap.