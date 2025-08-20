# COMPREHENSIVE AUDIT AND PLANNING PROMPT

## SERVICE TUITION & TESTIMONIALS PAGE OVERHAUL AUDIT

You are conducting a comprehensive audit and planning phase for two major page overhauls at My Private Tutor Online - a premium tutoring service with royal endorsements. This is an AUDIT-ONLY phase with ZERO implementation. All findings must be analysed in exhaustive detail before any code changes are made.

### CRITICAL AUDIT PARAMETERS

**PROJECT CONTEXT:**
- Stack: Next.js 15+, React 19, TypeScript 5.3+, Tailwind CSS 4.x
- Quality Standards: Royal client-worthy, enterprise-grade implementations
- Documentation: Context7 MCP exclusive (mandatory for all analysis)
- Standards: British English throughout, WCAG 2.1 AA accessibility
- Current Branch: working-august-19th (production deployment active)

**AGENT COORDINATION PROTOCOL:**
1. **INITIATE WITH CONTEXT-MANAGER**: Use Task tool to activate context-manager for project coordination
2. **SPECIALIST AGENT ASSIGNMENT**: Context-manager must select optimal agents based on:
   - Frontend-developer: UI/UX analysis, component architecture, accessibility audit
   - Content-manager: CMS structure analysis, data architecture review
   - Performance-auditor: Load time analysis, bundle size impact assessment
   - Security-analyst: Form security review, GDPR compliance verification

**MANDATORY APPROVAL GATES:**
- User must type "continue" after each major audit section completion
- No progression to next phase without explicit approval
- Context-manager must coordinate all specialist agent handoffs

---

## PHASE 1: TESTIMONIALS PAGE COMPREHENSIVE AUDIT

### SECTION 1.1: CONTENT REMOVAL AUDIT
**Assigned Agent:** content-manager
**Context7 Documentation Required:** Pattern matching and content management best practices

**DETAILED ANALYSIS REQUIREMENTS:**

1. **Crown Icon & Royal Reference Discovery:**
   - Search patterns: "crown", "royal", "elite", "👑", "Crown", "Royal", "Elite"
   - File types: *.tsx, *.ts, *.css, *.json, *.md
   - Target directories: /src/components/sections/testimonials*, /src/lib/cms*, /src/app/testimonials/*
   - **Critical Questions to Answer:**
     - How many instances exist across the entire codebase?
     - Which files contain hardcoded vs dynamic references?
     - Are there any brand identity implications for removal?
     - What alternative terminology aligns with premium positioning?
     - Are there any dependencies between removed content and other components?

2. **Impact Assessment Analysis:**
   - **UI/UX Impact:** How does removal affect visual hierarchy and brand perception?
   - **Content Flow Impact:** Does removal create content gaps or awkward transitions?
   - **Component Dependencies:** Which components rely on royal/elite terminology?
   - **Brand Consistency:** What replacement terms maintain premium positioning?

3. **Replacement Strategy Planning:**
   - Map each "royal" → "premium/distinguished" replacement
   - Map each "elite" → "exceptional/outstanding" replacement  
   - Icon replacement strategy: crown → star/checkmark/diamond alternatives
   - Ensure consistent replacement patterns across all instances

**EXPECTED AUDIT DELIVERABLES:**
- Complete inventory of all crown/royal/elite references with exact file paths and line numbers
- Detailed impact analysis for each removal
- Comprehensive replacement strategy with terminology mapping
- Risk assessment for brand consistency implications

**USER APPROVAL CHECKPOINT:** Type "continue" to proceed to CMS Structure Audit

---

### SECTION 1.2: CMS DATA ARCHITECTURE AUDIT
**Assigned Agent:** frontend-developer + content-manager collaboration
**Context7 Documentation Required:** TypeScript interface patterns, data structure best practices

**DETAILED ANALYSIS REQUIREMENTS:**

1. **Current CMS Structure Analysis:**
   - Read and analyse /src/lib/cms-content.ts
   - Read and analyse /src/lib/cms-images.ts
   - Read and analyse /src/content/testimonials.json (if exists)
   - **Critical Questions to Answer:**
     - What is the current testimonial data structure?
     - How are testimonials currently categorised and filtered?
     - Are there inconsistencies in data formatting?
     - How is video testimonial data currently handled?
     - What are the performance implications of current structure?

2. **Data Unification Requirements Analysis:**
   - **Single Source of Truth Assessment:** Can all testimonial data be centralised?
   - **Backward Compatibility Review:** What existing components depend on current structure?
   - **Video Integration Complexity:** How should video testimonials integrate with existing data?
   - **Category System Analysis:** How should testimonials be categorised (academic/entrance-exam/general)?
   - **Performance Implications:** What are bundle size and load time impacts?

3. **Proposed Interface Structure Validation:**
   ```typescript
   // ANALYSIS TARGET: Validate this proposed structure against current implementation
   interface Testimonial {
     id: string;
     name: string;
     role: string;
     content: string;
     rating: number;
     image?: string;
     school?: string;
     hasVideo: boolean;
     videoUrl?: string;
     videoThumbnail?: string;
     category: 'academic' | 'entrance-exam' | 'general';
   }
   ```
   - **Compatibility Analysis:** Does this structure support all current use cases?
   - **Migration Complexity:** What data transformation is required?
   - **Component Impact:** Which components need updates for new structure?

**EXPECTED AUDIT DELIVERABLES:**
- Current CMS architecture documentation with data flow diagrams
- Gap analysis between current and proposed testimonial structure
- Migration complexity assessment with risk factors
- Component dependency mapping for CMS changes
- Performance impact analysis for unified data structure

**USER APPROVAL CHECKPOINT:** Type "continue" to proceed to Video Integration Audit

---

### SECTION 1.3: VIDEO TESTIMONIALS INTEGRATION AUDIT
**Assigned Agent:** frontend-developer
**Context7 Documentation Required:** Video component patterns, accessibility standards, Next.js Image optimization

**DETAILED ANALYSIS REQUIREMENTS:**

1. **Video Asset Inventory:**
   - Scan /public/videos/ directory for existing testimonial videos
   - Scan /public/images/testimonials/ for video thumbnails
   - **Critical Questions to Answer:**
     - What video formats are available (.mp4, .webm, .mov)?
     - What are the video file sizes and performance implications?
     - Do thumbnail images exist for all videos?
     - What are the aspect ratios and resolution standards?
     - Are there any accessibility issues with current video content?

2. **Current VideoTestimonials Component Analysis:**
   - Read /src/components/testimonials/video-testimonials.tsx
   - **Assessment Points:**
     - How is the component currently structured?
     - What video player functionality exists?
     - Are there accessibility controls (captions, keyboard navigation)?
     - How are loading states and errors handled?
     - What is the current thumbnail implementation?

3. **Technical Integration Requirements:**
   - **Player Requirements:** Modal vs inline player analysis
   - **Accessibility Standards:** ARIA labels, keyboard controls, screen reader support
   - **Performance Considerations:** Lazy loading, thumbnail optimization
   - **Mobile Experience:** Touch controls, responsive video sizing
   - **Error Handling:** Network failures, unsupported formats

4. **User Experience Flow Analysis:**
   - **Discovery:** How do users find video testimonials?
   - **Interaction:** Click-to-play experience design
   - **Navigation:** Video carousel or grid interaction patterns
   - **Engagement:** Play/pause, seeking, volume controls
   - **Completion:** Next video suggestions or return to browsing

**EXPECTED AUDIT DELIVERABLES:**
- Complete video asset inventory with technical specifications
- Current VideoTestimonials component architecture analysis
- Accessibility compliance gap analysis
- Performance impact assessment for video integration
- User experience flow documentation with interaction patterns

**USER APPROVAL CHECKPOINT:** Type "continue" to proceed to UI Component Enhancement Audit

---

### SECTION 1.4: UI COMPONENT ENHANCEMENT AUDIT
**Assigned Agent:** frontend-developer
**Context7 Documentation Required:** Conditional rendering patterns, component prop design

**DETAILED ANALYSIS REQUIREMENTS:**

1. **EliteSchoolsCarousel Hover Statistics Analysis:**
   - Read /src/components/testimonials/elite-schools-carousel.tsx
   - **Critical Assessment Points:**
     - How are hover statistics currently implemented?
     - What statistics are displayed on hover?
     - Is the feature configurable or hardcoded?
     - What are the performance implications of hover effects?
     - How does the feature work on mobile devices?

2. **Component Cleanup Requirements:**
   - **WaveSeparator Usage Audit:**
     - Search for all WaveSeparator imports and usage
     - Identify which components depend on wave separators
     - Assess visual impact of removal
     - Plan alternative section transitions
   - **CTA Section Analysis:**
     - Locate CTA sections in testimonials page footer
     - Analyse content and conversion tracking implications
     - Assess impact on user journey and lead generation

3. **Component Boundary Analysis:**
   - **Separation of Concerns:** Are components properly isolated?
   - **Reusability:** Can components be used across different pages?
   - **Dependencies:** What external dependencies exist between components?
   - **State Management:** How is component state managed and shared?

4. **Responsive Design Audit:**
   - **Breakpoint Analysis:** How do components behave across screen sizes?
   - **Touch Interactions:** Are hover effects accessible on mobile?
   - **Performance on Mobile:** Are animations and effects optimized?
   - **Accessibility:** Do responsive changes affect screen reader navigation?

**EXPECTED AUDIT DELIVERABLES:**
- EliteSchoolsCarousel hover functionality detailed analysis
- WaveSeparator usage inventory with removal impact assessment
- CTA section audit with business impact analysis
- Component boundary and dependency mapping
- Responsive design compliance report

**USER APPROVAL CHECKPOINT:** Type "continue" to proceed to Verification Requirements Audit

---

### SECTION 1.5: VERIFICATION & TESTING STRATEGY AUDIT
**Assigned Agent:** performance-auditor + frontend-developer collaboration
**Context7 Documentation Required:** Testing patterns, accessibility standards, performance metrics

**DETAILED ANALYSIS REQUIREMENTS:**

1. **Testing Strategy Framework:**
   - **Unit Testing:** Which components require isolated testing?
   - **Integration Testing:** How do CMS changes affect component integration?
   - **Accessibility Testing:** What automated and manual tests are needed?
   - **Performance Testing:** Load time and bundle size impact measurements
   - **Cross-browser Testing:** Compatibility requirements across browsers

2. **Accessibility Compliance Verification:**
   - **WCAG 2.1 AA Standards:** Complete audit checklist
   - **Video Controls:** Keyboard accessibility for video players
   - **Focus Management:** Tab navigation through testimonials
   - **Screen Reader Support:** ARIA labels and descriptions
   - **Colour Contrast:** Text readability after royal/elite content removal

3. **Performance Impact Assessment:**
   - **Bundle Size Analysis:** Impact of video components and CMS changes
   - **Load Time Metrics:** Page speed implications
   - **Memory Usage:** Video loading and thumbnail optimization
   - **Network Requests:** CMS restructuring efficiency gains

4. **Quality Assurance Checklist Development:**
   - **Visual Regression Testing:** Before/after comparison points
   - **Functional Testing:** All interactive elements verification
   - **Content Accuracy:** Testimonial data integrity checks
   - **Error Handling:** Edge cases and failure scenarios

**EXPECTED AUDIT DELIVERABLES:**
- Comprehensive testing strategy document
- WCAG 2.1 AA compliance audit checklist
- Performance benchmarking methodology
- Quality assurance verification protocols

**USER APPROVAL CHECKPOINT:** Type "continue" to proceed to Service Tuition Page Audit

---

## PHASE 2: SERVICE TUITION PAGE ENHANCEMENT AUDIT

### SECTION 2.1: TYPOGRAPHY ISSUE DIAGNOSTIC AUDIT
**Assigned Agent:** frontend-developer
**Context7 Documentation Required:** CSS-in-JS patterns, typography best practices

**DETAILED ANALYSIS REQUIREMENTS:**

1. **Current Typography Implementation Analysis:**
   - Read /src/app/subject-tuition/page.tsx
   - **Critical Assessment Points:**
     - How are gold quotation marks (#eab308) currently implemented?
     - What CSS positioning methods are used?
     - Are quotation marks semantic (UTF-8) or decorative elements?
     - What responsive breakpoints affect quotation mark rendering?

2. **Rendering Issue Root Cause Analysis:**
   - **Line Wrapping Problems:** Why are closing quotes appearing on wrong lines?
   - **CSS Layout Conflicts:** What layout properties cause positioning issues?
   - **Font Rendering:** Do font metrics affect quotation mark placement?
   - **Browser Inconsistencies:** Are there cross-browser rendering differences?

3. **Technical Solution Assessment:**
   - **Positioning Strategies:** Absolute vs relative vs pseudo-element approaches
   - **Responsive Considerations:** How to maintain consistency across breakpoints?
   - **Performance Impact:** CSS complexity vs rendering performance
   - **Maintainability:** Long-term sustainability of solution

4. **Testing Requirements:**
   - **Cross-browser Testing:** Chrome, Firefox, Safari, Edge compatibility
   - **Device Testing:** Mobile, tablet, desktop rendering verification
   - **Screen Reader Impact:** Ensure typography fixes don't affect accessibility
   - **Print Styling:** PDF generation and print layout considerations

**EXPECTED AUDIT DELIVERABLES:**
- Root cause analysis of quotation mark positioning issues
- Technical solution evaluation with pros/cons
- Cross-browser compatibility assessment
- Implementation complexity and risk analysis

**USER APPROVAL CHECKPOINT:** Type "continue" to proceed to Video Integration Audit

---

### SECTION 2.2: UCAS MASTERCLASS VIDEO INTEGRATION AUDIT
**Assigned Agent:** frontend-developer + content-manager collaboration
**Context7 Documentation Required:** Next.js Image optimization, navigation patterns

**DETAILED ANALYSIS REQUIREMENTS:**

1. **Current "University and Beyond" Section Analysis:**
   - Locate UCAS masterclass reference in subject-tuition page
   - **Critical Assessment Points:**
     - Where exactly should video thumbnail be placed?
     - What is the current section layout and content flow?
     - How does video integration affect existing content hierarchy?
     - What navigation patterns exist for internal page linking?

2. **Video Asset Requirements Analysis:**
   - **Thumbnail Asset Inventory:**
     - Does UCAS masterclass thumbnail exist in /public/videos/?
     - What are the image specifications (resolution, format, file size)?
     - Is the thumbnail optimized for various screen sizes?
     - Are there alternative images available?

3. **Navigation Integration Assessment:**
   - **Target Page Analysis:** How is /masterclasses#ucas-section structured?
   - **User Journey Mapping:** Current path vs proposed thumbnail navigation
   - **Analytics Impact:** How will click-through tracking be implemented?
   - **SEO Considerations:** Internal linking and anchor navigation effects

4. **Technical Implementation Evaluation:**
   - **Component Architecture:** Modal player vs navigation approach
   - **Loading States:** Thumbnail optimization and lazy loading requirements
   - **Error Handling:** Missing thumbnail or navigation failure scenarios
   - **Mobile Experience:** Touch interaction and responsive sizing

**EXPECTED AUDIT DELIVERABLES:**
- Current section layout analysis with integration points
- Video asset specifications and optimization requirements  
- Navigation flow mapping with user journey analysis
- Technical implementation strategy with complexity assessment

**USER APPROVAL CHECKPOINT:** Type "continue" to proceed to Lead Generation Form Audit

---

### SECTION 2.3: LEAD GENERATION FORM STRATEGIC AUDIT
**Assigned Agent:** frontend-developer + security-analyst collaboration
**Context7 Documentation Required:** React Hook Form patterns, GDPR compliance, form security

**DETAILED ANALYSIS REQUIREMENTS:**

1. **Strategic Placement Analysis:**
   - **Current Page Structure:** Map subject-tuition page section hierarchy
   - **Conversion Optimization:** Where does form placement maximize lead capture?
   - **User Journey Analysis:** At what point are users ready to engage?
   - **Content Flow Impact:** How does form insertion affect reading experience?

2. **Form Architecture Assessment:**
   ```typescript
   // ANALYSIS TARGET: Validate this proposed structure
   interface LeadFormData {
     email: string;
     firstName: string;
     consentToMarketing: boolean;
     acceptPrivacyPolicy: boolean;
   }
   ```
   - **Field Requirements Validation:** Are all necessary fields included?
   - **Validation Complexity:** React Hook Form + Zod integration analysis
   - **User Experience:** Form completion friction and abandonment risks
   - **Data Collection Efficiency:** Minimum viable data vs comprehensive profiling

3. **GDPR Compliance Deep Analysis:**
   - **Legal Requirements Audit:**
     - Explicit consent vs legitimate interest assessment
     - Data retention policy implementation requirements
     - Right to erasure and data portability considerations
     - Cookie consent integration with marketing consent
   - **Privacy Policy Integration:**
     - Current privacy policy analysis for form compatibility
     - Terms of service updates required for lead generation
     - Data processing lawful basis documentation

4. **Technical Security Assessment:**
   - **Form Security Measures:**
     - CSRF protection implementation requirements
     - Input validation and sanitization strategies
     - Rate limiting for spam prevention
     - Honeypot fields for bot detection
   - **Data Handling Security:**
     - API endpoint security analysis
     - Database storage encryption requirements
     - Third-party integration security (email marketing tools)
     - Data transmission security (HTTPS, encryption)

5. **Integration Complexity Analysis:**
   - **API Endpoint Requirements:** /api/lead-generation implementation scope
   - **Email Marketing Integration:** CRM system connection complexity
   - **PDF Delivery Mechanism:** Automated delivery system requirements
   - **Analytics Integration:** Conversion tracking and success metrics

6. **Business Impact Assessment:**
   - **Lead Quality Analysis:** Form design impact on lead qualification
   - **Conversion Rate Projections:** Expected form completion rates
   - **Resource Requirements:** Support and follow-up process implications
   - **ROI Analysis:** Development cost vs lead generation value

**EXPECTED AUDIT DELIVERABLES:**
- Strategic placement recommendation with conversion optimization analysis
- Complete GDPR compliance checklist with implementation requirements
- Technical security assessment with vulnerability mitigation strategies
- Integration complexity mapping with development effort estimates
- Business impact analysis with ROI projections

**USER APPROVAL CHECKPOINT:** Type "continue" to proceed to Implementation Coordination Audit

---

### SECTION 2.4: IMPLEMENTATION COORDINATION & QUALITY AUDIT
**Assigned Agent:** context-manager + performance-auditor collaboration
**Context7 Documentation Required:** Project management patterns, quality assurance standards

**DETAILED ANALYSIS REQUIREMENTS:**

1. **Task Interdependency Analysis:**
   - **Sequential Dependencies:** Which tasks must be completed in specific order?
   - **Parallel Execution Opportunities:** Which tasks can be done simultaneously?
   - **Risk Dependencies:** What failures could block other tasks?
   - **Resource Conflicts:** Are there competing demands on the same files/components?

2. **Quality Assurance Framework:**
   - **Code Quality Standards:**
     - Context7 MCP documentation compliance verification
     - British English spelling and terminology consistency
     - TypeScript strict mode compliance across all changes
     - Component accessibility standards (WCAG 2.1 AA)
   - **Testing Requirements:**
     - Unit testing coverage for new components
     - Integration testing for CMS changes
     - End-to-end testing for form submission flows
     - Performance regression testing for all page changes

3. **Risk Assessment Matrix:**
   - **Technical Risks:**
     - CMS restructuring breaking existing components
     - Video integration performance impact
     - Form security vulnerabilities
     - Typography fixes causing layout shifts
   - **Business Risks:**
     - Lead generation form GDPR non-compliance
     - Video content accessibility issues
     - Performance degradation affecting user experience
     - Brand consistency issues from content removal

4. **Success Metrics Definition:**
   - **Performance Benchmarks:**
     - Page load time targets (<1.5s)
     - Bundle size impact limits
     - Accessibility score maintenance (100% WCAG 2.1 AA)
   - **Functionality Verification:**
     - Form submission success rates
     - Video playback reliability
     - Typography rendering consistency
     - CMS data integrity

5. **Rollback Strategy Planning:**
   - **Change Isolation:** How to revert individual components if issues arise?
   - **Data Migration Safety:** CMS restructuring rollback procedures
   - **Performance Monitoring:** Real-time alerts for degradation
   - **User Impact Mitigation:** Graceful degradation strategies

**EXPECTED AUDIT DELIVERABLES:**
- Complete task interdependency mapping with critical path analysis
- Comprehensive quality assurance checklist with automated testing requirements
- Risk assessment matrix with mitigation strategies
- Success metrics definition with monitoring protocols
- Rollback strategy documentation with emergency procedures

**FINAL APPROVAL CHECKPOINT:** Type "continue" to receive implementation readiness summary

---

## AUDIT COMPLETION SUMMARY

**Once all audit sections are approved, provide:**

1. **Implementation Readiness Assessment:**
   - Green light criteria: All audit requirements met, risks acceptable
   - Yellow flag criteria: Moderate risks requiring careful monitoring  
   - Red flag criteria: High risks requiring additional planning before implementation

2. **Agent Assignment Matrix:**
   - Detailed breakdown of which specialist agents should handle each implementation task
   - Context7 documentation requirements for each agent
   - Quality checkpoints and approval gates throughout implementation

3. **Critical Success Factors:**
   - Must-have requirements for each page overhaul
   - Performance and accessibility non-negotiables
   - Business impact measurement criteria

4. **Next Steps Authorization:**
   - Implementation phase authorization requirements
   - Continuous monitoring protocols during implementation
   - Success verification and sign-off procedures

---

## CRITICAL AUDIT RULES

**ZERO IMPLEMENTATION TOLERANCE:**
- This prompt is AUDIT-ONLY - no code changes permitted
- All findings must be documented in exhaustive detail
- Questions must be answered with specific technical analysis
- User must approve each section before progression

**CONTEXT7 MCP COMPLIANCE:**
- All technical analysis must reference official documentation patterns
- No assumptions or "best practices" without documented backing
- Source attribution required for all architectural decisions

**AGENT COORDINATION MANDATORY:**
- Context-manager must orchestrate all specialist agent involvement
- Each agent must provide detailed analysis within their expertise domain
- Cross-functional collaboration required for complex integration points

**QUALITY STANDARDS:**
- Royal client quality standards apply to audit thoroughness
- British English throughout all documentation
- Enterprise-grade analysis depth required
- Production-ready implementation planning mandatory