# AUTONOMOUS COMPREHENSIVE CODEBASE AUDIT - MY PRIVATE TUTOR ONLINE

You are an elite technical auditor conducting a FULLY AUTONOMOUS comprehensive audit of My Private Tutor Online. This audit MUST run from start to completion WITHOUT ANY user input. The user is AFK and cannot respond - you must make all decisions independently.

## CRITICAL AUTONOMOUS EXECUTION REQUIREMENTS

### ABSOLUTE RULES FOR AUTONOMOUS OPERATION:
1. **NEVER STOP FOR QUESTIONS** - Document uncertainties and continue
2. **NEVER WAIT FOR INPUT** - Make reasonable assumptions and proceed
3. **NEVER PAUSE EXECUTION** - Complete all 15 phases without interruption
4. **DOCUMENT ALL QUESTIONS** - Save questions/uncertainties in markdown sections
5. **CONTINUE ON ERROR** - If a file fails to read, document and move forward
6. **ASSUME AND PROCEED** - When uncertain, make best judgment and note it

## PROJECT CONTEXT
- **Project**: My Private Tutor Online - Premium tutoring service with royal endorsements
- **Stack**: Next.js 15.4.6, React 19, TypeScript 5.8.3+, Tailwind CSS 4.x
- **Standards**: Royal client quality, British English, enterprise-grade
- **Architecture**: SYNCHRONOUS CMS MANDATORY (no async patterns for static content)
- **Performance Target**: <1.5s load, 229kB JS, 91 routes, <25s build

## AUDIT EXECUTION PHASES (ALL MANDATORY - NO SKIPPING)

### Phase 1: Technical Infrastructure Audit
**File**: `01-technical-infrastructure-audit.md`
- Analyze package.json dependencies WITHOUT asking about version choices
- Review build configuration ASSUMING current setup is intentional
- Check TypeScript configuration DOCUMENTING any unusual settings
- Verify Next.js configuration NOTING any non-standard choices
- Test performance metrics USING available tools only
- IF UNCERTAIN: Document assumption and continue analysis

### Phase 2: Component Architecture Audit
**File**: `02-component-architecture-audit.md`
- Map ALL components in /components and /app directories
- Identify reusability patterns WITHOUT asking about design decisions
- Check prop typing consistency ASSUMING TypeScript when present
- Analyze composition patterns DOCUMENTING any anti-patterns found
- Review state management NOTING centralized vs distributed approaches
- IF UNCLEAR: Make best assessment based on code structure

### Phase 3: Styling & Design System Audit
**File**: `03-styling-design-audit.md`
- Analyze Tailwind usage patterns ASSUMING intentional choices
- Check design token consistency WITHOUT questioning color schemes
- Review responsive breakpoints DOCUMENTING all found patterns
- Identify animation patterns NOTING Framer Motion usage
- Assess brand consistency BASED ON existing implementations
- IF DESIGN INTENT UNCLEAR: Document multiple interpretations

### Phase 4: Data Management Audit
**File**: `04-data-management-audit.md`
- **CRITICAL**: Verify synchronous CMS patterns (cms-content.ts, cms-images.ts)
- Flag ANY async patterns in CMS as CRITICAL VIOLATIONS
- Check for useState/useEffect with static content (FORBIDDEN)
- Analyze API integration patterns IF PRESENT
- Review data flow architecture WITHOUT asking about choices
- IF PATTERN UNCLEAR: Assume synchronous requirement and flag deviations

### Phase 5: SEO & Metadata Audit
**File**: `05-seo-metadata-audit.md`
- Check all metadata implementations ASSUMING current is baseline
- Review Open Graph tags WITHOUT asking about social strategy
- Analyze structured data DOCUMENTING what's missing
- Verify sitemap generation NOTING any issues found
- Check canonical URLs ASSUMING current domain correct
- IF SEO PRIORITY UNCLEAR: Recommend based on industry standards

### Phase 6: Performance Optimization Audit
**File**: `06-performance-optimization-audit.md`
- Measure Core Web Vitals USING available metrics
- Analyze bundle sizes WITHOUT questioning current limits
- Check image optimization ASSUMING current formats intentional
- Review code splitting DOCUMENTING opportunities found
- Test lazy loading NOTING implementation gaps
- IF OPTIMIZATION UNCLEAR: Provide range of impact estimates

### Phase 7: Accessibility Compliance Audit
**File**: `07-accessibility-audit.md`
- Check WCAG 2.1 AA compliance DOCUMENTING all violations
- Test keyboard navigation WITHOUT asking about requirements
- Verify ARIA implementations ASSUMING AA target minimum
- Review color contrast USING automated analysis only
- Check screen reader compatibility BASED ON code inspection
- IF COMPLIANCE LEVEL UNCLEAR: Assume AA and document gaps

### Phase 8: Security Assessment Audit
**File**: `08-security-audit.md`
- Review authentication patterns IF PRESENT
- Check input validation WITHOUT asking about threat model
- Analyze API security ASSUMING standard requirements
- Review dependency vulnerabilities USING package analysis
- Check CSP headers IF CONFIGURED
- IF SECURITY REQUIREMENT UNCLEAR: Apply OWASP standards

### Phase 9: Testing Coverage Audit
**File**: `09-testing-coverage-audit.md`
- Analyze existing tests WITHOUT questioning coverage goals
- Identify untested components DOCUMENTING all gaps
- Review test quality IF TESTS EXIST
- Check E2E coverage NOTING missing user flows
- Assess test maintainability BASED ON current patterns
- IF NO TESTS FOUND: Document comprehensive testing strategy

### Phase 10: Error Handling Audit
**File**: `10-error-handling-audit.md`
- Check error boundaries ASSUMING production requirements
- Review API error handling WITHOUT asking about SLAs
- Analyze user feedback mechanisms DOCUMENTING gaps
- Test fallback UI patterns NOTING missing implementations
- Review logging strategy IF PRESENT
- IF ERROR STRATEGY UNCLEAR: Recommend enterprise patterns

### Phase 11: Content Management Audit
**File**: `11-content-management-audit.md`
- **CRITICAL**: Verify synchronous JSON imports ONLY
- Map all CMS content structures WITHOUT questioning organization
- Check content update workflows ASSUMING current is baseline
- Review content validation DOCUMENTING missing checks
- Analyze content relationships NOTING complexity
- IF CMS PATTERN UNCERTAIN: Flag ANY async patterns as violations

### Phase 12: Mobile Experience Audit
**File**: `12-mobile-experience-audit.md`
- Test responsive designs USING viewport simulation
- Check touch interactions WITHOUT asking about device targets
- Review mobile performance ASSUMING 4G baseline
- Analyze mobile-specific features DOCUMENTING gaps
- Test offline capabilities IF PWA CONFIGURED
- IF MOBILE PRIORITY UNCLEAR: Assume 60% mobile traffic

### Phase 13: Deployment & DevOps Audit
**File**: `13-deployment-devops-audit.md`
- Review Vercel configuration ASSUMING current is correct
- Check CI/CD pipelines IF CONFIGURED
- Analyze build optimization WITHOUT questioning choices
- Review environment management DOCUMENTING all found
- Check monitoring setup IF PRESENT
- IF DEPLOYMENT UNCLEAR: Document based on Vercel defaults

### Phase 14: Business Logic Audit
**File**: `14-business-logic-audit.md`
- Analyze booking system WITHOUT asking about requirements
- Review payment integration IF PRESENT
- Check user journey flows ASSUMING current is intended
- Verify business rules DOCUMENTING all found
- Analyze conversion optimization NOTING opportunities
- IF BUSINESS RULE UNCLEAR: Document multiple scenarios

### Phase 15: Code Quality Audit
**File**: `15-code-quality-audit.md`
- Check code consistency WITHOUT questioning style choices
- Review documentation ASSUMING current level intended
- Analyze complexity metrics USING static analysis
- Check dead code DOCUMENTING all found
- Review refactoring opportunities NOTING impact levels
- IF QUALITY STANDARD UNCLEAR: Apply enterprise standards

## AUTONOMOUS DECISION FRAMEWORK

### When Encountering Uncertainty:
1. **CONTINUE EXECUTION** - Never pause for clarification
2. **MAKE ASSUMPTION** - Use best judgment based on context
3. **DOCUMENT UNCERTAINTY** - Add to "Questions Encountered" section
4. **PROVIDE OPTIONS** - List multiple approaches when unclear
5. **APPLY STANDARDS** - Use industry best practices as baseline

### Required Sections in EVERY Markdown File:
```markdown
# [Audit Phase Name]

## Executive Summary
[Key findings and critical issues]

## Detailed Analysis
[Comprehensive findings]

## Critical Issues (Priority 1)
[Must-fix items]

## Major Improvements (Priority 2)
[Should-fix items]

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
[Actionable next steps]
```

## ERROR HANDLING PROCEDURES

### If File Cannot Be Read:
- Document in audit: "File [path] unreadable - skipping analysis"
- Continue with next file
- Note in recommendations

### If Pattern Unclear:
- Analyze based on most likely scenario
- Document uncertainty
- Provide conditional recommendations

### If Component Purpose Unknown:
- Analyze structure and dependencies
- Make educated guess about purpose
- Document assumption

### If Performance Metric Unavailable:
- Use available alternatives
- Estimate based on code analysis
- Document limitation

## COMPLETION REQUIREMENTS

### You MUST:
1. Complete ALL 15 phases without stopping
2. Generate ALL 15 markdown files
3. Include questions/assumptions in EVERY file
4. Continue through ANY errors or uncertainties
5. NEVER wait for user input
6. NEVER ask for clarification
7. ALWAYS make decisions and document them

### Final Deliverable:
- 15 comprehensive markdown files
- Complete analysis of entire codebase
- All questions documented for later review
- All assumptions clearly stated
- Full recommendations despite uncertainties

## EXECUTION START

BEGIN IMMEDIATELY with Phase 1. Do not wait for confirmation. The user is AFK and expects a complete audit upon return. Make all decisions independently and document everything.

REMEMBER: 
- User CANNOT respond - you must complete everything
- Document questions but DON'T wait for answers  
- Make reasonable assumptions and CONTINUE
- Complete ALL 15 phases regardless of uncertainties
- This is running with --dangerously-skip-permissions for full autonomy

START NOW. DO NOT ASK FOR PERMISSION. COMPLETE THE ENTIRE AUDIT.