# 🚀 CODEBASE ANALYSIS MASTER PLAN - MY PRIVATE TUTOR ONLINE

## 📋 EXECUTION PROTOCOL

### 🎯 ACTIVATION SEQUENCE
**When user says: "read and execute CODEBASE_ANALYSIS_MASTER_PLAN.md sequentially"**

1. **Context-Manager Activation**: Automatically activate context-manager for project leadership
2. **Sequential Task Execution**: Each task executed exhaustively by appropriate specialist agents
3. **Result Propagation**: Results from each task inform subsequent analyses
4. **Full Task Completion**: No task begins until previous is 100% complete
5. **Comprehensive Final Report**: Aggregate all findings with actionable roadmap

### 🛠️ CRITICAL EXECUTION RULES
- **EXHAUSTIVE MODE**: Each task requires deep, thorough analysis (15-30 minutes per task)
- **CONTEXT7 MCP MANDATORY**: All implementations require official documentation backing
- **RESULT DEPENDENCIES**: Later tasks MUST use outputs from previous tasks
- **SPECIALIST AGENTS**: Context-manager selects optimal agents based on task complexity
- **ZERO TOLERANCE**: No shortcuts or quick fixes - enterprise-grade solutions only

---

## 🔄 TASK SEQUENCE (OPTIMIZED ORDER)

### ⚡ TASK 1: COMPREHENSIVE CODEBASE SCANNER
**Priority**: Foundation Layer | **Agent**: `typescript-pro` | **Duration**: 15-20 minutes

**Objective**: Create advanced scanAll.js script for deep code analysis across entire codebase

**Dependencies**: None (foundation task)

**Output Files**: 
- `scanAll.js` (scanner script)
- `scanResults.json` (comprehensive analysis data)

**Exhaustive Requirements**:
- Recursively scan ALL directories (exclude node_modules, .next, dist, build)
- Include: .tsx, .ts, .jsx, .js, .css, .scss files with exact line numbers
- AST parsing with @babel/parser for surgical accuracy
- Parallel processing for large codebases
- Progress indicators with real-time feedback

**Critical Analysis Areas**:
1. **Component Detection**: 
   - Magic UI buttons (@/components/magicui)
   - Headless UI buttons (@headlessui/react)
   - Radix UI buttons (@radix-ui)
   - Native HTML buttons (<button>)
   - Custom Button components
   - Link components styled as buttons
   - Capture: variant, size, className, onClick, disabled, type, text content, aria-labels

2. **AspectRatio & Video Detection**:
   - AspectRatio usage (@radix-ui/react-aspect-ratio)
   - ALL video elements (<video>, Video components, iframe embeds)
   - Videos wrapped in AspectRatio with ratio={16/9}
   - Flag videos WITHOUT proper aspect ratio wrapping
   - Capture: sources, poster images, autoplay settings

3. **Typography Analysis**:
   - ALL heading tags (h1-h6) with font families
   - Text elements with font specifications
   - Playfair Display vs other fonts in headers
   - Source Serif 4 vs other fonts in body text
   - className, style props, CSS-in-JS styling

4. **Color Usage Tracking**:
   - ALL color definitions (hex, rgb, hsl, color names)
   - #3F4A7E (Metallic Blue) and #CA9E5B (Aztec Gold) usage
   - Non-brand colors identification
   - Context capture: background-color, color, border-color

5. **Modular Component Inventory**:
   - ALL custom components in /components directory
   - Component imports and usage tracking
   - Prop patterns and default props
   - Duplicate/similar implementations
   - Export patterns (default vs named)

6. **Styling Analysis**:
   - ALL Tailwind classes extraction
   - Inline styles (style prop)
   - Styled-components/emotion styling
   - CSS modules usage
   - Global CSS definitions

7. **Import Dependency Mapping**:
   - ALL import statements
   - Component library usage tracking
   - Relative vs absolute imports
   - Unused imports detection

**Script Features**:
- Production-ready with comprehensive error handling
- Caching for faster subsequent scans
- --verbose flag for detailed logging
- Incremental scanning support
- Performance optimization for large Next.js codebases

**Success Validation**:
- scanResults.json contains complete data structure
- All file types scanned with line number precision
- Zero parsing errors or missed files
- Performance metrics logged (files/second)

---

### 📊 TASK 2: ANALYSIS & AUDIT SYSTEM
**Priority**: Analysis Layer | **Agent**: `code-reviewer` | **Duration**: 20-25 minutes

**Objective**: Create advanced analysis script (analysisAudit.js) processing scanResults.json for comprehensive code standardization auditing

**Dependencies**: REQUIRES scanResults.json from Task 1

**Output Files**:
- `analysisAudit.js` (analysis script)
- `analysis-report.json` (detailed findings)
- `fix-commands.json` (automated fix instructions)
- `migration-plan.md` (phased implementation strategy)

**Exhaustive Analysis Framework**:

**1. Brand Compliance Scoring System**:
- Calculate compliance percentage for brand colors (Metallic Blue #3F4A7E, Aztec Gold #CA9E5B)
- Score typography compliance (Playfair Display headers, Source Serif 4 body)
- Generate overall brand consistency score (0-100 with detailed breakdown)
- Track compliance trends with historical data comparison

**2. Critical Issue Categorization**:

**CRITICAL (P0) - IMMEDIATE ACTION REQUIRED**:
- Broken functionality (missing components, import errors)
- Accessibility violations (missing alt text, aria-labels)
- Security issues (exposed keys, unsafe rendering)
- Homepage loading failures (async CMS patterns)

**HIGH (P1) - WEEK 1 PRIORITY**:
- Wrong fonts in headers (not Playfair Display)
- Wrong fonts in body text (not Source Serif 4)
- Non-brand primary colors in CTAs and key UI elements
- Videos without 16:9 AspectRatio wrapping
- Inconsistent button component usage in same context

**MEDIUM (P2) - WEEK 2 PRIORITY**:
- Non-brand secondary colors
- Inconsistent spacing or sizing
- Mixed component libraries for same functionality
- Missing hover states or transitions

**LOW (P3) - ONGOING OPTIMIZATION**:
- Code style inconsistencies
- Unused imports
- Non-optimal import paths

**3. Component Standardization Analysis**:
- Identify component fragmentation (multiple components doing same thing)
- Find consolidation opportunities with effort estimates
- Detect prop drilling anti-patterns
- Suggest component composition improvements
- Calculate component reusability score with metrics

**4. Automated Fix Generation**:
For EVERY issue identified, generate:
```json
{
  "issueId": "unique-id",
  "severity": "CRITICAL|HIGH|MEDIUM|LOW",
  "type": "typography|color|component|video|button",
  "file": "exact/file/path.tsx",
  "line": lineNumber,
  "currentCode": "exact current code snippet",
  "fixedCode": "exact replacement code with Context7 backing",
  "explanation": "why this needs fixing + Context7 source",
  "automatable": boolean,
  "dependencies": ["required imports/packages"],
  "breakingChange": boolean,
  "estimatedEffort": "hours",
  "context7Source": "/library/project - specific pattern"
}
```

**5. Migration Strategy Generation**:
- Group related fixes into logical batches
- Order fixes by dependency chain (what must be fixed first)
- Estimate effort for each fix batch with resource allocation
- Generate step-by-step migration plan with timelines
- Identify quick wins vs long-term architectural improvements

**6. Design System Gap Analysis**:
- Identify missing design tokens with impact assessment
- Find hardcoded values that should be variables
- Detect inconsistent spacing scales
- Flag missing responsive breakpoints
- Suggest new component needs with priority ranking

**7. Performance Impact Analysis**:
- Calculate bundle size impact of component standardization
- Identify duplicate component implementations with size metrics
- Find code splitting opportunities
- Detect unnecessary re-renders from inconsistent props
- Generate performance optimization roadmap

**8. Multi-Pass Review System**:
- **Pass 1**: Structural analysis (components, imports)
- **Pass 2**: Visual analysis (colors, typography)
- **Pass 3**: Functional analysis (props, behavior)
- **Pass 4**: Performance analysis (bundle, rendering)
- **Pass 5**: Accessibility analysis (WCAG compliance)
- **Pass 6**: Cross-reference and validation
- **Pass 7**: Final recommendations and prioritization

**Success Validation**:
- All issues from scanResults.json analyzed and categorized
- Every issue has automated fix with Context7 backing
- Migration plan covers all priority levels
- Brand compliance score calculated with supporting data

---

### 🎨 TASK 3: DESIGN SYSTEM IMPLEMENTATION
**Priority**: Foundation Enhancement | **Agent**: `ui-ux-designer` | **Duration**: 25-30 minutes

**Objective**: Create comprehensive design system implementation centralizing all brand values with complete type safety

**Dependencies**: REQUIRES analysis-report.json from Task 2 (for gap analysis integration)

**Output Files**:
- `design-tokens.ts` (comprehensive token system)
- `globals.css` (CSS custom properties)
- `tailwind.config.ts` (updated configuration)
- `useDesignTokens.ts` (React hooks)
- `theme.ts` (CSS-in-JS theme)
- `design-system.scss` (SCSS mixins)
- `DESIGN-SYSTEM.md` (comprehensive documentation)
- `design-system-lint.js` (validation/enforcement)

**Exhaustive Implementation Requirements**:

**1. Core Design Tokens Structure** (Complete Type Safety):
```typescript
export const colors = {
  brand: {
    metallicBlue: '#3F4A7E',
    metallicBlueRGB: '63, 74, 126',
    metallicBlueHSL: '230, 33%, 37%',
    aztecGold: '#CA9E5B',
    aztecGoldRGB: '202, 158, 91', 
    aztecGoldHSL: '36, 50%, 57%',
  },
  semantic: {
    primary: 'var(--color-brand-metallic-blue)',
    secondary: 'var(--color-brand-aztec-gold)',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
      300: '#D1D5DB', 400: '#9CA3AF', 500: '#6B7280',
      600: '#4B5563', 700: '#374151', 800: '#1F2937', 900: '#111827',
    }
  },
  opacity: {
    5: '0.05', 10: '0.1', 20: '0.2', 30: '0.3', 40: '0.4',
    50: '0.5', 60: '0.6', 70: '0.7', 80: '0.8', 90: '0.9',
  }
} as const;

export const typography = {
  fontFamily: {
    heading: "'Playfair Display', serif",
    body: "'Source Serif 4', serif", 
    mono: "'Fira Code', monospace",
  },
  fontSize: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
    xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem',
    '5xl': '3rem', '6xl': '3.75rem', '7xl': '4.5rem',
  },
  // Complete font weights, line heights, letter spacing
} as const;
```

**2. CSS Custom Properties Generation**:
```css
:root {
  /* Brand Colors */
  --color-brand-metallic-blue: #3F4A7E;
  --color-brand-aztec-gold: #CA9E5B;
  
  /* Semantic Colors */
  --color-primary: var(--color-brand-metallic-blue);
  --color-secondary: var(--color-brand-aztec-gold);
  
  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Source Serif 4', serif;
  
  /* Complete shadow, animation, breakpoint definitions */
}
```

**3. Framework Integration**:
- **Tailwind Configuration**: Extended with brand tokens, custom colors, font families
- **Styled Components Theme**: Complete theme object for CSS-in-JS
- **SCSS Mixins**: Brand gradients, typography mixins, utility functions
- **React Hooks**: useDesignTokens for programmatic access

**4. Component Variants System**:
```typescript
export const buttonVariants = {
  primary: {
    background: colors.brand.metallicBlue,
    color: colors.neutral.white,
    hover: { background: `${colors.brand.metallicBlue}E6` }
  },
  secondary: {
    background: colors.brand.aztecGold,
    color: colors.neutral.white,
    hover: { background: `${colors.brand.aztecGold}E6` }
  },
  // Complete variant system
};
```

**5. Migration Utilities**:
```typescript
export const colorMigrationMap = {
  '#0000FF': 'brand.metallicBlue',
  'blue-600': 'brand-primary',
  '#FFD700': 'brand.aztecGold',
  'yellow-500': 'brand-secondary',
  // Complete mapping from analysis results
};
```

**6. Validation & Enforcement System**:
- ESLint rules preventing hardcoded colors
- Stylelint rules for CSS consistency  
- Pre-commit hooks for design compliance
- CI/CD checks for token usage validation

**7. Comprehensive Documentation**:
- Token reference table with usage examples
- Migration guide from hardcoded values
- Framework-specific implementation guides
- Best practices and accessibility guidelines
- Component composition patterns

**Success Validation**:
- All design tokens properly typed with IntelliSense support
- Framework integrations functional (Tailwind, Styled Components, SCSS)
- Migration utilities handle all patterns from analysis
- Linting rules prevent design system violations

---

### 🔧 TASK 4: AUTOMATED FIXES IMPLEMENTATION  
**Priority**: Implementation Layer | **Agent**: `legacy-modernizer` | **Duration**: 30-35 minutes

**Objective**: Implement automated fixes with surgical precision using analysis results, applying design system tokens

**Dependencies**: 
- REQUIRES fix-commands.json from Task 2
- REQUIRES design-tokens.ts from Task 3

**Output Files**:
- `implementFixes.js` (automated fix script)
- `fix-execution-log.json` (detailed change tracking)
- `rollback-script.js` (complete rollback capability)
- `validation-report.json` (post-fix validation results)

**Surgical Implementation Strategy**:

**1. Font Standardization Fixes** (Context7 MCP Backed):
```typescript
// HEADERS (h1-h6) - Must use Playfair Display
// BEFORE: <h1 className="text-4xl font-bold">Title</h1>
// AFTER: <h1 className="text-4xl font-bold font-playfair">Title</h1>

// BODY TEXT - Must use Source Serif 4  
// BEFORE: <p className="text-lg">Content</p>
// AFTER: <p className="text-lg font-source-serif">Content</p>
```

**2. Color Standardization Fixes**:
```typescript
// Brand colors: Metallic Blue #3F4A7E, Aztec Gold #CA9E5B
// BEFORE: <Button className="bg-blue-600 hover:bg-blue-700">
// AFTER: <Button className="bg-[#3F4A7E] hover:bg-[#3F4A7E]/90">

// BEFORE: style={{backgroundColor: '#1E40AF'}}  
// AFTER: style={{backgroundColor: '#3F4A7E'}}
```

**3. Video AspectRatio Fixes**:
```typescript
// ADD IMPORT if missing:
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

// WRAP VIDEO elements:
// BEFORE: <video src="video.mp4" controls />
// AFTER: 
<AspectRatio ratio={16/9}>
  <video src="video.mp4" controls className="w-full h-full object-cover" />
</AspectRatio>
```

**4. Button Component Standardization**:
```typescript
// Standardize to Magic UI Button:
// BEFORE: <button className="px-4 py-2 bg-blue-500">Click</button>
// AFTER:
import { Button } from '@/components/magicui/button';
<Button variant="default" size="default">Click</Button>
```

**5. Component Import Optimization**:
```typescript
// BEFORE:
import React from 'react';
import Button from '../../../components/Button';
import { useState } from 'react';

// AFTER:
import React, { useState } from 'react';  
import { Button } from '@/components/ui/button';
```

**6. Safe Implementation Protocol**:
1. **Backup Creation**: Create timestamped backup of every file before modification
2. **AST Parsing**: Parse file structure to understand context before changes
3. **Precise Targeting**: Apply fixes with exact line/column precision
4. **Syntax Validation**: Validate syntax after each change
5. **Type Checking**: Run TypeScript compilation validation
6. **Render Testing**: Verify components still render correctly
7. **Git Commit**: Commit changes with descriptive messages

**7. Batch Processing Order** (Dependency-Safe):
1. **Critical Accessibility Fixes** (P0)
2. **Import Optimizations** (prevent conflicts)  
3. **Typography Standardization** (design system integration)
4. **Color Standardization** (brand consistency)
5. **Component Standardization** (architectural improvements)
6. **Video/Media Fixes** (presentation enhancements)

**8. Comprehensive Validation**:
- ESLint/Prettier compliance
- TypeScript compilation success
- Runtime error prevention
- Visual regression testing
- Responsive behavior maintenance
- Accessibility standards compliance

**9. Error Handling & Recovery**:
- If fix breaks functionality: Skip and log detailed reason
- If import not found: Attempt installation or provide manual steps  
- If conflicting styles: Preserve functionality over aesthetics
- If ambiguous context: Flag for manual review with recommendations

**10. Rollback Capability**:
```typescript
// Generate complete rollback script:
export const rollbackChanges = {
  revertAll: () => { /* restore all backups */ },
  revertByCategory: (category) => { /* revert specific fix types */ },
  revertByFile: (filePath) => { /* restore individual file */ },
  validateRollback: () => { /* ensure clean restoration */ }
};
```

**Change Tracking Format**:
```json
{
  "fixApplied": {
    "file": "path/to/file.tsx",
    "line": 42,
    "type": "typography|color|component|video|button",
    "before": "exact code before",
    "after": "exact code after", 
    "success": true,
    "error": null,
    "context7Source": "/radix-ui/primitives - AspectRatio pattern",
    "timestamp": "2025-09-01T10:30:45Z",
    "backupPath": "backups/file-backup-timestamp.tsx"
  }
}
```

**Success Validation**:
- All P0/P1 issues from analysis-report.json successfully fixed
- Zero breaking changes introduced
- All fixes backed by Context7 MCP documentation
- Complete rollback capability verified
- Post-fix validation shows improvement in brand compliance scores

---

### ✅ TASK 5: COMPONENT STANDARDIZATION SYSTEM
**Priority**: Quality Assurance Layer | **Agent**: `architect-reviewer` | **Duration**: 25-30 minutes  

**Objective**: Create comprehensive component consistency validation and long-term standardization enforcement system

**Dependencies**: 
- REQUIRES fix-execution-log.json from Task 4
- INTEGRATES WITH design-tokens.ts from Task 3
- REFERENCES analysis-report.json from Task 2

**Output Files**:
- `componentChecker.js` (validation script)
- `component-registry.ts` (comprehensive registry)
- `validation-rules.ts` (enforcement rules)
- `migration-paths.ts` (standardization paths)
- `component-generator.ts` (template generator)
- `usage-analyzer.js` (usage tracking)
- `composition-patterns.ts` (pattern definitions)
- `component-standards-report.json` (final compliance report)

**Comprehensive Validation Framework**:

**1. Component Registry System**:
```typescript
export const componentRegistry = {
  // Atomic Components
  atoms: {
    Button: {
      path: '@/components/ui/button',
      props: ['variant', 'size', 'asChild', 'disabled'],
      variants: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      usage: 'All interactive buttons and CTAs',
      designTokens: ['colors.brand.metallicBlue', 'colors.brand.aztecGold']
    },
    Input: {
      path: '@/components/ui/input', 
      props: ['type', 'placeholder', 'required', 'pattern'],
      validation: true,
      usage: 'Form inputs and text fields'
    },
  },
  
  // Molecule Components  
  molecules: {
    Card: {
      path: '@/components/ui/card',
      subComponents: ['CardHeader', 'CardTitle', 'CardContent', 'CardFooter'],
      usage: 'Content containers with consistent padding/borders'
    },
    Modal: {
      path: '@/components/ui/modal',
      props: ['isOpen', 'onClose', 'title'],
      accessibility: ['role="dialog"', 'aria-modal="true"'],
      usage: 'Overlay dialogs and popups'
    },
  },
  
  // Organism Components
  organisms: {
    Navigation: {
      path: '@/components/layout/navigation',
      singleton: true,
      usage: 'Main site navigation - one instance only'
    },
    Hero: {
      path: '@/components/sections/hero', 
      props: ['title', 'subtitle', 'backgroundImage', 'cta'],
      usage: 'Page hero sections with consistent layout'
    },
  }
};
```

**2. Media Component Validation**:
```typescript
const mediaValidation = {
  image: {
    mustUse: "next/image",
    requiredProps: ["alt", "width", "height"],
    preferredProps: ["placeholder='blur'", "blurDataURL"],
    forbiddenPatterns: ["<img ", "background-image"],
    optimization: ["WebP/AVIF format", "lazy loading below fold"]
  },
  video: {
    mustWrap: "@radix-ui/react-aspect-ratio",
    aspectRatio: "16/9", 
    requiredProps: ["controls", "poster"],
    accessibility: ["aria-label", "title"],
    forbiddenPatterns: ["unwrapped <video>", "inline video styling"]
  }
};
```

**3. Button Standardization Mapping**:
```typescript
const buttonStandardization = {
  detectionPatterns: [
    '<button>' → 'Magic UI Button',
    '<a className="*btn*">' → 'Magic UI Button with asChild', 
    'Headless UI Button' → 'Magic UI Button',
    'Custom Button components' → 'Magic UI Button'
  ],
  
  propsMapping: {
    variant: {
      primary: "bg-brand-primary text-white",
      secondary: "bg-brand-secondary text-white", 
      outline: "border-2 border-brand-primary",
      ghost: "hover:bg-gray-100",
      link: "underline text-brand-primary"
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base", 
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl"
    }
  }
};
```

**4. Text Component Enforcement**:
```typescript
const textComponentPatterns = {
  highlighter: {
    detect: ["<Highlighter>", "className='highlight'"],
    enforce: "<Quote><Highlighter>{text}</Highlighter></Quote>",
    import: "import { Quote } from '@/components/ui/quote'"
  },
  testimonials: {
    detect: ["testimonial text", "review content"],
    enforce: "TestimonialCard component",
    import: "import { TestimonialCard } from '@/components/testimonials'"
  }
};
```

**5. Migration Path Generation**:
```typescript
export const migrationPaths = {
  '<button': {
    to: 'Button',
    import: "import { Button } from '@/components/ui/button'",
    transform: (props) => ({
      variant: detectVariant(props.className),
      size: detectSize(props.className), 
      children: props.children,
    })
  },
  
  '<img': {
    to: 'Image',
    import: "import Image from 'next/image'",
    transform: (props) => ({
      ...props,
      width: props.width || 500,
      height: props.height || 300,
      alt: props.alt || 'Image',
    })
  },
  
  '<video': {
    to: 'AspectRatio + video', 
    import: "import { AspectRatio } from '@radix-ui/react-aspect-ratio'",
    transform: (props) => `
      <AspectRatio ratio={16/9}>
        <video ${propsToString(props)} className="w-full h-full object-cover" />
      </AspectRatio>
    `
  }
};
```

**6. Validation Rules Framework**:
```typescript
export const validationRules = {
  accessibility: {
    Button: ['aria-label OR text content', 'keyboard accessible'],
    Image: ['alt text required', 'decorative images need alt=""'],
    Video: ['captions or transcript', 'keyboard controls'],
    Modal: ['focus trap', 'escape key closes', 'aria-describedby'],
  },
  
  performance: {
    Image: ['use next/image', 'specify dimensions', 'optimize format'],
    List: ['virtualize if >100 items', 'use keys properly'],  
    Animation: ['prefer CSS over JS', 'use will-change sparingly'],
  },
  
  consistency: {
    spacing: ['use design tokens', 'no arbitrary values'],
    colors: ['use brand colors', 'semantic color names'], 
    typography: ['Playfair for headings', 'Source Serif for body'],
  }
};
```

**7. Component Usage Analysis**:
```json
{
  "usageReport": {
    "Button": {
      "totalUsage": 45,
      "byVariant": {
        "primary": 20,
        "secondary": 15, 
        "outline": 10
      },
      "files": ["page1.tsx", "page2.tsx"],
      "inconsistencies": [
        {
          "file": "page3.tsx", 
          "line": 50,
          "issue": "Using native button instead of Button component",
          "suggestedFix": "Replace with Magic UI Button component"
        }
      ]
    }
  }
}
```

**8. Automated Component Generator**:
```typescript
export function generateStandardComponent(type: string, name: string) {
  const templates = {
    button: `
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ${name}Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function ${name}({ children, onClick, variant = 'primary', className }: ${name}Props) {
  return (
    <Button
      variant={variant}
      onClick={onClick} 
      className={cn('font-source-serif', className)}
    >
      {children}
    </Button>
  );
}`,
    // Additional component templates...
  };
  
  return templates[type] || null;
}
```

**9. Composition Pattern Enforcement**:
```typescript
export const compositionPatterns = {
  'form-field': {
    structure: ['Label', 'Input', 'ErrorMessage'],
    example: `
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
        <ErrorMessage>Please enter a valid email</ErrorMessage>
      </FormField>
    `
  },
  
  'media-card': {
    structure: ['AspectRatio', 'Image|Video', 'CardContent'],
    example: `
      <Card>
        <AspectRatio ratio={16/9}>
          <Image src={src} alt={alt} fill />
        </AspectRatio>
        <CardContent>...</CardContent>
      </Card>
    `
  }
};
```

**10. Long-term Enforcement System**:
- **Real-time VS Code Validation**: Extension config for development
- **Pre-commit Hooks**: Component standards validation
- **CI/CD Integration**: Automated component compliance checking
- **Migration Automation**: Complete migrate-components.js script
- **Rollback Protection**: Backup and restore capabilities

**Success Validation**:
- All components analyzed and scored for standards compliance
- Migration paths defined for every non-standard implementation
- Usage patterns documented with inconsistency tracking
- Enforcement system prevents future standard violations
- Final component-standards-report.json shows pathway to 100% compliance

---

## 🎯 FINAL SYNTHESIS & REPORTING

### 📊 COMPREHENSIVE AGGREGATION
**Agent**: `context-manager` | **Duration**: 10-15 minutes

**Objective**: Synthesize all task results into actionable master roadmap

**Final Outputs**:
- `MASTER_ANALYSIS_REPORT.json` (complete findings aggregation)
- `IMPLEMENTATION_ROADMAP.md` (prioritized action plan)  
- `QUICK_WINS_CHECKLIST.md` (immediate improvements)
- `LONG_TERM_STRATEGY.md` (architectural improvements)

**Synthesis Requirements**:
1. **Aggregate All Findings**: Combine results from all 5 tasks
2. **Priority Matrix**: CRITICAL → HIGH → MEDIUM → LOW with effort estimates
3. **Implementation Sequence**: Dependency-ordered execution plan
4. **Resource Allocation**: Time/effort estimates for each improvement
5. **Success Metrics**: Measurable compliance targets and KPIs  
6. **Risk Assessment**: Breaking change analysis and mitigation
7. **ROI Analysis**: Business value vs implementation cost

### 🚀 EXECUTION SUCCESS METRICS

**Task Completion Criteria**:
- ✅ All 5 tasks completed with exhaustive analysis
- ✅ Results successfully propagated between tasks  
- ✅ All outputs generated with complete data
- ✅ Context7 MCP documentation backing for all recommendations
- ✅ Zero breaking changes in automated implementations
- ✅ Comprehensive roadmap for 100% brand compliance
- ✅ Long-term enforcement system established

**Final Deliverables Quality Gates**:
- **Completeness**: 100% codebase coverage with no missed files
- **Accuracy**: All findings verified with Context7 MCP patterns  
- **Actionability**: Every issue has specific fix with clear steps
- **Traceability**: Full audit trail from detection → analysis → fix
- **Sustainability**: Enforcement system prevents regression

---

## 🛠️ AGENT ORCHESTRATION MATRIX

| Task | Primary Agent | Backup Agent | Complexity Level | 
|------|---------------|---------------|------------------|
| 1. Scanner | `typescript-pro` | `frontend-developer` | High |
| 2. Analysis | `code-reviewer` | `architect-reviewer` | Expert |  
| 3. Design System | `ui-ux-designer` | `frontend-developer` | Expert |
| 4. Auto Fixes | `legacy-modernizer` | `typescript-pro` | Expert |
| 5. Component Standards | `architect-reviewer` | `code-reviewer` | Expert |
| Final Synthesis | `context-manager` | `business-analyst` | Strategic |

### 🔄 CONTEXT-MANAGER COORDINATION PROTOCOL

1. **Task Assignment**: Select optimal agent based on capability matrix
2. **Context Preparation**: Provide agent with all dependency files  
3. **Progress Monitoring**: Track exhaustive analysis completion
4. **Quality Validation**: Ensure Context7 MCP compliance
5. **Result Integration**: Verify successful data propagation
6. **Final Orchestration**: Coordinate comprehensive synthesis

---

**🎯 TOTAL ESTIMATED DURATION: 2.5-3.5 hours**
**🎖️ FINAL OUTCOME: Complete codebase standardization roadmap with automated implementation capability**