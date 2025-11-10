# COMPREHENSIVE AUTOMATION PROMPT FOR MY PRIVATE TUTOR ONLINE

You are Claude Code tasked with performing FULLY AUTOMATED cleanup of TypeScript and ESLint errors for the My Private Tutor Online project. Execute all fixes WITHOUT requesting permissions, confirmations, or asking questions.

## IMMEDIATE EXECUTION SEQUENCE

### PHASE 1: PROJECT CONTEXT EXTRACTION (5 minutes)
1. Read /home/jack/Documents/my_private_tutor_online/CLAUDE.md for complete project context
2. Read /home/jack/Documents/my_private_tutor_online/all-problems-report.txt to understand all errors
3. Extract and categorize all error types: TypeScript compilation errors, ESLint violations, unused imports
4. Create mental priority matrix: Build-blocking errors → Type safety → Code quality → Style

### PHASE 2: CRITICAL ARCHITECTURE VALIDATION (2 minutes)
Verify these MANDATORY patterns are preserved:
- SYNCHRONOUS CMS: No async/await, no Promise returns, no useState/useEffect for static JSON
- @LAYER BASE STYLING: Semantic HTML defaults in globals.css, utility overrides only
- BRITISH ENGLISH: All comments, strings, and documentation
- ROYAL CLIENT STANDARDS: Enterprise-grade quality throughout

### PHASE 3: TYPESCRIPT COMPILATION FIXES (45 minutes)
Execute fixes in this EXACT order for maximum efficiency:

1. **TS6133 - Unused Variables/Parameters** (15 minutes)
   - Remove unused imports systematically
   - Delete unused function parameters
   - Clean up unused variables
   - Prefix intentionally unused params with underscore (_param)

2. **TS1484/TS2375 - Import/Export Issues** (10 minutes)
   - Convert namespace imports to named imports
   - Fix circular dependencies
   - Resolve module resolution errors
   - Correct import paths

3. **TS6192 - Unused Imports** (10 minutes)
   - Remove all unused import statements
   - Consolidate duplicate imports
   - Clean up type-only imports

4. **TS7006 - Implicit Any** (10 minutes)
   - Add explicit type annotations
   - Define proper interfaces for objects
   - Type function parameters and returns
   - Use generics where appropriate

### PHASE 4: ESLINT VIOLATION CLEANUP (60 minutes)
Systematic resolution by category:

1. **React Hook Violations** (15 minutes)
   - Fix exhaustive-deps warnings
   - Correct hook call order
   - Resolve conditional hook usage

2. **Unused Code Elimination** (20 minutes)
   - Remove unused variables (no-unused-vars)
   - Delete commented code blocks
   - Clean up unreachable code
   - Remove empty functions

3. **Import Organization** (10 minutes)
   - Order imports: React → Next → External → Internal → Types
   - Remove duplicate imports
   - Fix import/no-duplicates violations

4. **Type Safety Enhancement** (15 minutes)
   - Replace any with specific types
   - Add missing return types
   - Define proper prop types
   - Create interfaces for complex objects

### PHASE 5: BUILD VERIFICATION (15 minutes)
1. Run `npm run build` to verify all compilation errors resolved
2. If errors remain, iterate through specific files
3. Document any unresolvable issues in FIX_REPORT.md
4. Verify no regression in critical paths

## AUTOMATION RULES - EXECUTE WITHOUT PERMISSION

### FILE MODIFICATION PROTOCOL
- Edit files directly using Edit tool
- Make multiple edits per file in single operation
- Group related changes to minimize file operations
- Never ask for permission to modify files

### ERROR RESOLUTION STRATEGY
For each error type:
1. Identify pattern across codebase
2. Create systematic fix approach
3. Apply fix to all instances
4. Verify no side effects

### PRIORITY MATRIX
1. **CRITICAL** (Fix immediately): Build-blocking TypeScript errors
2. **HIGH** (Fix second): Type safety violations, missing types
3. **MEDIUM** (Fix third): ESLint errors affecting functionality
4. **LOW** (Fix last): Style issues, formatting, unused code

## SPECIFIC FIX PATTERNS

### For TS6133 (Unused declarations):
```typescript
// BEFORE:
import { unusedFunc, usedFunc } from './utils';
const unused = 'value';

// AFTER:
import { usedFunc } from './utils';
// Remove unused const entirely
```

### For TS7006 (Implicit any):
```typescript
// BEFORE:
const handleClick = (event) => { }

// AFTER:
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { }
```

### For React Hooks deps:
```typescript
// BEFORE:
useEffect(() => {
  doSomething(value);
}, []); // Missing dependency

// AFTER:
useEffect(() => {
  doSomething(value);
}, [value]); // Dependency added
```

## CRITICAL CONSTRAINTS - NEVER VIOLATE

1. **SYNCHRONOUS CMS MANDATORY**
   - Never add async/await to CMS functions
   - Never use Promise returns for static content
   - Keep all JSON imports direct and synchronous

2. **PRESERVE @LAYER BASE**
   - Don't add utility classes to semantic HTML with base styles
   - Maintain CSS variable usage
   - Keep globals.css @layer structure intact

3. **MAINTAIN ARCHITECTURE**
   - Don't break working homepage
   - Preserve all gradient effects
   - Keep navigation at 2xl breakpoint
   - Maintain video masterclasses functionality

## OUTPUT REQUIREMENTS

Create a FIX_REPORT.md with:
- Total errors fixed by category
- Files modified count
- Build status after fixes
- Any unresolvable issues with explanations
- Time taken for each phase

## EXECUTION MINDSET

You are performing SURGERY on a production codebase:
- Be systematic and thorough
- Fix root causes, not symptoms
- Maintain all working functionality
- Group related changes efficiently
- Work silently without interruption
- Complete the entire task autonomously

## SUCCESS CRITERIA

✅ Build completes with 0 TypeScript errors
✅ ESLint errors reduced by 90%+
✅ All critical architecture patterns preserved
✅ Homepage and key features remain functional
✅ No async CMS patterns introduced
✅ British English maintained throughout
✅ Royal client quality standards upheld

BEGIN EXECUTION IMMEDIATELY. No confirmations needed. Work autonomously until complete.