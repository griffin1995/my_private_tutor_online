# AUTONOMOUS AUDIT MASTER - MY PRIVATE TUTOR ONLINE

## IMPLEMENTATION PROMPT

**Terminal Command**: `Read CLAUDE.md for all main rules, then read the master.md files in /autonomous-audit and /site_audit to prepare for audit execution.`

### CRITICAL EXECUTION INSTRUCTIONS

1. **READ CLAUDE.md FIRST** - Extract all project context, development rules, and standards
2. **ACTIVATE CONTEXT-MANAGER** - Use Task tool as specified in CLAUDE.md activation sequence
3. **EXECUTE AUTONOMOUS AUDIT** - Follow the comprehensive audit prompt below
4. **COMPLETE ALL PHASES** - No stopping, no questions, full autonomous execution
5. **GENERATE REPORTS** - Create all 15 audit phase markdown files
6. **PROVIDE FINAL SUMMARY** - Comprehensive report of all changes and findings

## AUTONOMOUS COMPREHENSIVE AUDIT EXECUTION

This audit runs FULLY AUTONOMOUS without user input. You are conducting a comprehensive technical audit of the My Private Tutor Online premium tutoring platform.

### PROJECT CONTEXT
- **Project**: My Private Tutor Online - Premium tutoring service with royal endorsements
- **Stack**: Next.js 15.4.6, React 19, TypeScript 5.8.3+, Tailwind CSS 4.x  
- **Standards**: Royal client quality, British English, enterprise-grade
- **Architecture**: SYNCHRONOUS CMS MANDATORY (no async patterns for static content)
- **Performance Target**: <1.5s load, 229kB JS, 91 routes, <25s build

### AUTONOMOUS EXECUTION RULES
1. **NEVER STOP FOR QUESTIONS** - Document uncertainties and continue
2. **NEVER WAIT FOR INPUT** - Make reasonable assumptions and proceed  
3. **NEVER PAUSE EXECUTION** - Complete all 18 phases without interruption
4. **DOCUMENT ALL QUESTIONS** - Save questions/uncertainties in markdown sections
5. **CONTINUE ON ERROR** - If a file fails to read, document and move forward
6. **ASSUME AND PROCEED** - When uncertain, make best judgment and note it

### AUDIT PHASES TO EXECUTE

#### Phase 1: Technical Infrastructure Audit
**File**: `01-technical-infrastructure-audit.md`
- Analyze package.json dependencies, build config, TypeScript config
- Review Next.js configuration and performance metrics
- Test build processes and identify optimization opportunities

#### Phase 2: Component Architecture Audit  
**File**: `02-component-architecture-audit.md`
- Map ALL components in /components and /app directories
- Identify reusability patterns and architectural consistency
- Analyze state management and composition patterns

#### Phase 3: Styling & Design System Audit
**File**: `03-styling-design-system-audit.md`
- Analyze Tailwind usage patterns and design token consistency
- Review responsive breakpoints and animation patterns
- Assess brand consistency across implementations

#### Phase 4: Data Management Audit
**File**: `04-data-management-audit.md`
- **CRITICAL**: Verify synchronous CMS patterns (cms-content.ts, cms-images.ts)
- Flag ANY async patterns in CMS as CRITICAL VIOLATIONS
- Check for useState/useEffect with static content (FORBIDDEN)

#### Phase 5: SEO & Metadata Audit
**File**: `05-seo-metadata-audit.md`
- Check metadata implementations, Open Graph tags
- Review structured data and sitemap generation
- Analyze SEO optimization opportunities

#### Phase 6: Performance Optimization Audit
**File**: `06-performance-optimization-audit.md`
- Measure Core Web Vitals and bundle sizes
- Analyze image optimization and code splitting
- Review lazy loading implementations

#### Phase 7: Accessibility Compliance Audit
**File**: `07-accessibility-compliance-audit.md`
- Check WCAG 2.1 AA compliance
- Test keyboard navigation and ARIA implementations
- Review color contrast and screen reader compatibility

#### Phase 8: Security Assessment Audit
**File**: `08-security-assessment-audit.md`
- Review authentication patterns and input validation
- Check dependency vulnerabilities and API security
- Analyze CSP headers and security configurations

#### Phase 9: Testing Coverage Audit
**File**: `09-testing-coverage-audit.md`
- Analyze existing tests and identify coverage gaps
- Review test quality and E2E coverage
- Assess test maintainability patterns

#### Phase 10: Error Handling Audit
**File**: `10-error-handling-audit.md`
- Check error boundaries and API error handling
- Review fallback UI patterns and logging strategy
- Analyze user feedback mechanisms

#### Phase 11: Content Management Audit
**File**: `11-content-management-audit.md`
- **CRITICAL**: Verify synchronous JSON imports ONLY
- Map CMS content structures and validation
- Flag ANY async patterns as violations

#### Phase 12: Mobile Experience Audit
**File**: `12-mobile-experience-audit.md`
- Test responsive designs and touch interactions
- Review mobile performance and offline capabilities
- Analyze mobile-specific feature gaps

#### Phase 13: Deployment & DevOps Audit
**File**: `13-deployment-devops-audit.md`
- Review Vercel configuration and CI/CD pipelines
- Analyze build optimization and environment management
- Check monitoring and alerting setup

#### Phase 14: Business Logic Audit
**File**: `14-business-logic-audit.md`
- Analyze booking system and payment integration
- Review user journey flows and business rules
- Identify conversion optimization opportunities

#### Phase 15: Code Quality Audit
**File**: `15-code-quality-audit.md`
- Check code consistency and documentation
- Review complexity metrics and dead code
- Identify refactoring opportunities

#### Phase 16: Legal & Regulatory Compliance Audit
**File**: `16-legal-regulatory-compliance-audit.md`
- Review GDPR compliance and privacy policies
- Check educational safeguarding requirements
- Analyze data protection implementations

#### Phase 17: Educational Safeguarding Audit
**File**: `17-educational-safeguarding-audit.md`
- Review child protection protocols
- Check tutoring session security measures
- Analyze compliance with educational regulations

#### Phase 18: Financial & Payment Security Audit
**File**: `18-financial-payment-security-audit.md`
- Review payment processing security
- Check PCI compliance requirements
- Analyze financial data protection measures

### REQUIRED MARKDOWN SECTIONS FOR EACH FILE

```markdown
# [Audit Phase Name]

## Executive Summary
[Key findings and critical issues]

## Detailed Analysis  
[Comprehensive findings with file references]

## Critical Issues (Priority 1)
[Must-fix items with line numbers]

## Major Improvements (Priority 2)
[Should-fix items with impact assessment]

## Minor Enhancements (Priority 3)
[Nice-to-have items]

## Questions Encountered During Audit
- [Question 1: Context and assumption made]
- [Question 2: Context and assumption made]

## Assumptions Made
- [Assumption 1: Reasoning]
- [Assumption 2: Reasoning]

## Areas Requiring Clarification
- [Area 1: Why clarification needed]
- [Area 2: Why clarification needed]

## Recommendations
[Actionable next steps with priority]
```

### COMPLETION REQUIREMENTS

You MUST:
1. Complete ALL 18 phases without stopping
2. Generate ALL 18 markdown files in `/autonomous-audit/`
3. Include questions/assumptions in EVERY file
4. Continue through ANY errors or uncertainties
5. NEVER wait for user input or ask for clarification
6. Create final `COMPREHENSIVE-AUDIT-SUMMARY.md` with complete findings
7. Document ALL changes and provide comprehensive final report

### ERROR HANDLING

- If file cannot be read: Document and continue
- If pattern unclear: Analyze most likely scenario and document
- If component purpose unknown: Make educated guess and document
- If performance metric unavailable: Use alternatives and document

**BEGIN EXECUTION IMMEDIATELY** - The user expects complete autonomous audit execution with full documentation upon completion.