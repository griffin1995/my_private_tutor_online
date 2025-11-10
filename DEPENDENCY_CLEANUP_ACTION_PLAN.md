# My Private Tutor Online - Dependency Cleanup Action Plan

**Version**: 1.0
**Date**: 11 November 2025
**Status**: Ready for Implementation
**Estimated Effort**: 16-24 hours across 4 weeks

---

## PHASE 1: CRITICAL FIXES (Week 1) - HIGH PRIORITY

### Action 1.1: Install Missing Binaries and Dependencies

**Why**: Build system depends on these - missing them causes CI/CD failures

**Status**: BLOCKING - Must complete before any testing

**Command**:
```bash
# Install missing binary dependencies
npm install --save-dev @eslint/js tsx @lhci/cli@latest

# Install image optimization tools (used by scripts)
npm install --save-dev imagemin imagemin-webp imagemin-mozjpeg imagemin-pngquant
```

**Verification**:
```bash
# Verify installations
npm ls @eslint/js tsx @lhci/cli imagemin
npm run lint  # Should work without errors
npm run build  # Should complete successfully
```

**Expected Outcome**:
- ESLint configuration loads properly
- Build system has all required binaries
- No "MODULE_NOT_FOUND" errors

**Rollback** (if issues occur):
```bash
npm uninstall @eslint/js tsx @lhci/cli@latest imagemin imagemin-webp imagemin-mozjpeg imagemin-pngquant
npm install  # Restore original state
```

---

### Action 1.2: Fix Unresolved Import in business-analytics.ts

**Why**: Import path doesn't resolve - causes TypeScript errors

**Location**: `/home/jack/Documents/my_private_tutor_online/src/lib/analytics/business-analytics.ts:2:41`

**Current Code**:
```typescript
import ../../performance.config  // Line 2 - BROKEN
```

**Option A: Create Missing File** (if this is legitimate)

Create `/home/jack/Documents/my_private_tutor_online/src/lib/optimization/performance.config.ts`:

```typescript
/**
 * Performance Configuration
 *
 * Centralized performance metrics and thresholds
 * for analytics and monitoring purposes
 */

export const performanceConfig = {
  // Web Vitals thresholds (milliseconds)
  vitals: {
    fcp: 1800,  // First Contentful Paint
    lcp: 2500,  // Largest Contentful Paint
    cls: 0.1,   // Cumulative Layout Shift
    ttfb: 600,  // Time to First Byte
  },

  // Performance budgets
  budgets: {
    bundle: 100,      // KB - JavaScript bundle size
    images: 200,      // KB - Image assets
    css: 30,          // KB - CSS bundle size
  },

  // Caching strategies
  caching: {
    static: 31536000,    // 1 year
    html: 0,             // Never cache HTML
    api: 300,            // 5 minutes
  },
};

export default performanceConfig;
```

**Option B: Remove Unused Import** (if this is deprecated)

Edit `/home/jack/Documents/my_private_tutor_online/src/lib/analytics/business-analytics.ts`:

```typescript
// REMOVE THIS LINE:
// import ../../performance.config

// Keep rest of file as-is
```

**Recommendation**: Option A (create file) is safer - keeps configuration centralised
**Verification**:
```bash
npm run typecheck  # Should pass without errors
npm run build      # Should complete successfully
```

---

### Action 1.3: Fix Husky Configuration

**Why**: Pre-commit hooks may not be running - affects code quality gates

**Status**: MEDIUM priority - Fix if team uses pre-commit checks

**Check Current State**:
```bash
# Check if .husky directory exists
ls -la .husky/

# Check husky configuration
cat .husky/.gitignore
cat .husky/pre-commit

# Test hooks
npm run prepare
```

**If Hooks Don't Exist - Create Them**:

```bash
# Install husky properly
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npm run lint-staged"

# Create pre-push hook (optional)
npx husky add .husky/pre-push "npm run quality:fast"
```

**If Hooks Exist - Verify They Work**:

```bash
# Test by creating a dummy commit
touch dummy.txt
git add dummy.txt
git commit -m "test commit"  # Should trigger husky hooks

# Clean up
git reset --soft HEAD~1
rm dummy.txt
```

**Update lint-staged Configuration**

Create/Update `/home/jack/Documents/my_private_tutor_online/.lintstagedrc.json`:

```json
{
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"],
  "*.css": ["stylelint --fix"]
}
```

**Verification**:
```bash
npm run lint-staged  # Should run without errors
git hooks list       # Should show active hooks
```

---

## PHASE 2: INVESTIGATION & AUDIT (Week 2) - HIGH PRIORITY

### Action 2.1: Audit React Component Dependencies

**Why**: Determine which runtime dependencies are actually needed

**Duration**: 4-6 hours

**Components to Audit**:

#### 2.1.1 react-dropzone Audit

```bash
# Search for usage
grep -r "react-dropzone" src/ --include="*.ts" --include="*.tsx"
grep -r "useDropzone\|Dropzone" src/ --include="*.ts" --include="*.tsx"

# Find file upload workflows
grep -r "upload\|file" src/app/dashboard* --include="*.ts" --include="*.tsx" -l
ls -la src/components/admin/

# Check admin functionality
grep -r "form\|Form" src/components/admin/ --include="*.tsx" -l
```

**Decision Matrix**:

| Finding | Decision |
|---------|----------|
| Found active imports | KEEP dependency |
| Only in deleted files | SAFE to remove |
| Found in comments only | SAFE to remove |
| Found in git history only | SAFE to remove |

**Report Template**:
```markdown
## react-dropzone Audit Results

**Found Imports**: [YES/NO]
**Locations**: [list files or "None"]
**Active Usage**: [YES/NO]
**Admin Components Using It**: [list or "None"]
**Recommendation**: [KEEP/REMOVE]
**Confidence**: [95%/85%/75%]
```

#### 2.1.2 react-player Audit

```bash
# Search for react-player usage
grep -r "react-player\|ReactPlayer" src/ --include="*.ts" --include="*.tsx"
grep -r "usePlayer\|Player" src/components/video/ --include="*.tsx" -l

# Check video component architecture
ls -la src/components/video/
cat src/components/video/OptimizedVideoPlayer.tsx | head -50

# Check for custom implementation
grep -r "video\|Video" src/lib/ --include="*.ts" -l
```

**Decision Matrix**: Same as above

#### 2.1.3 fuse.js Audit

```bash
# Search for fuse.js usage
grep -r "fuse.js\|fuse\|Fuse" src/ --include="*.ts" --include="*.tsx"
grep -r "search\|Search" src/components/faq/ --include="*.tsx" -l

# Check FAQ search implementation
ls -la src/lib/search/
cat src/lib/search/faq-search-engine.ts | head -50

# Verify faq-enhanced-search.tsx (marked as unused)
file src/components/faq/faq-enhanced-search.tsx
wc -l src/components/faq/faq-enhanced-search.tsx
```

**Report Template**:
```markdown
## fuse.js Audit Results

**Found Imports**: [YES/NO]
**Current Search Implementation**: [fuse.js/custom/other]
**FAQ Search Components**: [list files]
**Recommendation**: [KEEP/REMOVE]
**Confidence**: [95%/85%/75%]
```

#### 2.1.4 react-speech-recognition Audit

```bash
# Search for speech recognition
grep -r "react-speech-recognition\|speech\|SpeechRecognition" src/ --include="*.ts" --include="*.tsx"
grep -r "voice\|Voice" src/components/faq/ --include="*.tsx" -l

# Check if voice search is in product roadmap
grep -r "voice\|Voice" CLAUDE.md claude.md PROJECT*.md
```

**Decision Matrix**:
- If voice features deprecated → SAFE to remove
- If voice features planned → KEEP

---

### Action 2.2: Verify Video Component Architecture

**Duration**: 2-3 hours

**Investigation Steps**:

```bash
# Step 1: Check OptimizedVideoPlayer implementation
echo "=== OptimizedVideoPlayer.tsx ==="
head -100 src/components/video/OptimizedVideoPlayer.tsx

# Step 2: Check VideoMasterclass components
ls -la src/components/video/
grep -r "react-player\|ReactPlayer" src/components/video/ --include="*.tsx"

# Step 3: Check video loading patterns
grep -r "useEffect.*video\|playVideo\|video.*load" src/components/video/ --include="*.tsx" -l

# Step 4: Test video functionality in staging
echo "Deploy to staging and test:"
echo "1. Navigate to video masterclasses section"
echo "2. Attempt to play video"
echo "3. Check browser console for errors"
echo "4. Verify video loads without react-player"
```

**Report Template**:
```markdown
## Video Component Architecture Audit

**Current Implementation**: [react-player/Custom/Hybrid]
**Video Components Found**: [list files]
**react-player Usage**: [YES - critical/NO - safe to remove/UNCLEAR]
**Recommendation**: [KEEP/REMOVE/INVESTIGATE FURTHER]
**Testing Notes**: [results from staging]
```

---

### Action 2.3: Admin Component Feature Audit

**Duration**: 3-4 hours

**Investigation Steps**:

```bash
# Step 1: List all admin components marked as unused
echo "=== Admin Components (Unused Files) ==="
grep "faq-version\|faq-admin\|admin/" /tmp/knip-output.txt

# Step 2: Check if admin is actually used
grep -r "admin" src/app/ --include="*.ts" --include="*.tsx" | grep -v "node_modules"

# Step 3: Check what's imported from admin components
grep -r "from.*admin\|import.*admin" src/ --include="*.ts" --include="*.tsx"

# Step 4: Check Next.js route configuration
ls -la src/app/admin* 2>/dev/null || echo "No /admin routes"
ls -la src/app/dashboard* 2>/dev/null || echo "No /dashboard routes"

# Step 5: Check build output
grep "admin\|Admin" build-output.txt || echo "No admin references in build"
```

**Report Template**:
```markdown
## Admin Component Feature Audit

**Status**: [Active/Inactive/Partially Active]
**Utilisation Rate**: [85% - per CLAUDE.md/Unknown]
**Dependencies Used**:
- react-dropzone: [YES/NO/UNCLEAR]
- [other deps]

**Recommendation**: [KEEP all deps/REMOVE safely/INVESTIGATE]
**Confidence**: [95%/85%/75%]
```

---

## PHASE 3: SAFE REMOVAL (Week 3) - MEDIUM PRIORITY

### Action 3.1: Remove use-debounce (LOWEST RISK)

**Why**: Safe utility with minimal impact, easy to replace

**Steps**:

```bash
# Step 1: Find usage
grep -r "use-debounce\|useDebounce" src/ --include="*.ts" --include="*.tsx"

# Step 2: If found in < 3 places, create custom hook
# If found, create src/hooks/useDebounce.ts:
```

**Custom Debounce Hook** (if needed):

Create `/home/jack/Documents/my_private_tutor_online/src/hooks/useDebounce.ts`:

```typescript
import { useState, useEffect } from 'react';

/**
 * Custom debounce hook to replace use-debounce package
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
```

**Removal Steps**:

```bash
# Step 1: Replace all imports
# OLD: import { useDebounce } from 'use-debounce';
# NEW: import { useDebounce } from '@/hooks/useDebounce';

# Step 2: Verify compilation
npm run typecheck

# Step 3: Test functionality
npm run build
npm run dev  # Manually test search/filter fields

# Step 4: Commit changes
git add src/hooks/useDebounce.ts
git commit -m "feat: Add custom useDebounce hook"

# Step 5: Remove package
npm uninstall use-debounce

# Step 6: Final verification
npm run build
npm run test
```

**Verification**:
```bash
# Ensure removed from package.json
grep "use-debounce" package.json || echo "Successfully removed"

# Test debounced functionality
npm run dev
# Test: Type in search field - should debounce properly
```

---

## PHASE 4: CONDITIONAL REMOVAL (Week 4) - AFTER INVESTIGATION

### Action 4.1: Remove tesseract.js (IF SAFE)

**Precondition**: Investigation confirms OCR not used

**Why**: Largest unused package (~200 KB savings)

**Steps**:

```bash
# Only proceed if audit confirms not used:
# "Found Imports: NO"
# "Active Usage: NO"

npm uninstall tesseract.js

# Verify removal
npm run build
npm run lint
npm run typecheck

# If errors occur - restore immediately
npm install tesseract.js
npm install
```

---

### Action 4.2: Remove react-speech-recognition (IF SAFE)

**Precondition**: Voice features confirmed as deprecated

**Steps**:

```bash
# Only proceed if:
# 1. Voice features marked as deprecated in roadmap
# 2. No voice search in product features
# 3. Investigation confirms no usage

# Remove component files first (already unused)
rm src/components/faq/faq-voice-search.tsx

# Remove package
npm uninstall react-speech-recognition

# Verify
npm run build
npm run lint
```

---

### Action 4.3: Conditional Removal Decision Tree

**After Complete Investigation**, use this decision tree:

```
Is dependency used?
├─ YES (Found in code)
│  └─ Is removal approved?
│     ├─ YES → Remove after staging test
│     └─ NO → Keep it
├─ NO (Not found in code)
│  └─ Is it infrastructure/build-critical?
│     ├─ YES (ESLint, regenerator-runtime) → KEEP
│     ├─ NO → Is it large (>50 KB)?
│     │  ├─ YES → Remove after staging test
│     │  └─ NO (use-debounce) → Remove safely
│     └─ UNCLEAR → Investigate further
```

---

## TESTING & VERIFICATION PROCEDURES

### Test Suite Before Each Removal

**Run this before removing ANY dependency**:

```bash
# Complete test suite
npm run quality  # typecheck + lint + format + test

# Individual checks
npm run typecheck    # Catch type errors
npm run lint         # Check code style
npm run build        # Ensure bundle works
npm run dev          # Manual testing

# Specific feature testing
npm run test:health      # Health checks
npm run test:performance # Performance tests
```

---

## ROLLBACK CHECKLIST

**If anything breaks after removal**:

```bash
# Step 1: Identify the issue
npm run typecheck   # Check for TypeScript errors
npm run lint        # Check for lint errors
npm run build       # Check build errors

# Step 2: Restore immediately
git checkout .      # Undo all changes
npm install         # Restore dependencies

# Step 3: Document the issue
echo "Removal of [package] caused [issue]" >> DEPENDENCY_CLEANUP_ANALYSIS.md

# Step 4: Try again with more investigation
# Before removal, verify:
# - All imports are identified
# - All test cases pass
# - Staging deployment successful
```

---

## SIGN-OFF CRITERIA

### Phase 1 Complete When:
- [ ] All missing binaries installed
- [ ] Unresolved imports fixed
- [ ] Husky hooks configured
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`

### Phase 2 Complete When:
- [ ] react-dropzone audit complete
- [ ] react-player audit complete
- [ ] fuse.js audit complete
- [ ] react-speech-recognition audit complete
- [ ] Admin component analysis complete
- [ ] Video component architecture verified
- [ ] All findings documented

### Phase 3 Complete When:
- [ ] use-debounce removed
- [ ] Custom useDebounce hook tested
- [ ] Build passes without errors
- [ ] All tests pass
- [ ] Git committed with clear message

### Phase 4 Complete When:
- [ ] tesseract.js removed (if approved)
- [ ] react-speech-recognition removed (if approved)
- [ ] All staging tests passed
- [ ] Code review approved
- [ ] Production deployment tested

---

## COMMAND REFERENCE

### Quick Verification
```bash
# Check what's broken
npm run quality:fast

# Check dependencies
npm ls  # Tree view of all dependencies
npx knip  # Regenerate unused analysis
```

### Dependency Management
```bash
# Install missing
npm install --save-dev [package]

# Remove unused
npm uninstall [package]

# Verify removal
npm ls [package]

# Update lock file
npm ci  # Clean install
```

### Testing
```bash
# Full quality check
npm run quality

# Quick check
npm run quality:fast

# Specific areas
npm run typecheck       # TypeScript
npm run lint           # ESLint
npm run build          # Next.js build
npm run test           # Playwright tests
```

---

## SUPPORT & ESCALATION

### If Investigation Reveals Complexity

**Escalate to**:
1. Project technical lead
2. Team lead
3. Document findings in DEPENDENCY_CLEANUP_ANALYSIS.md
4. Create follow-up issue for later phase

### If Removal Breaks Production

**Immediate Recovery**:
```bash
# Option 1: Git rollback
git revert [commit-hash]
git push

# Option 2: Manual restore
npm install [package]
npm ci
# Redeploy
```

### Contact Information

- **DevOps/CI Issues**: DevOps team
- **Build Issues**: Build system maintainer
- **Code Quality**: Tech lead
- **Component Issues**: Component owner

---

## TIMELINE SUMMARY

| Week | Phase | Duration | Effort |
|------|-------|----------|--------|
| 1 | Critical Fixes | 5-7 hours | High |
| 2 | Investigation | 4-6 hours | Medium |
| 3 | Safe Removal | 2-3 hours | Low |
| 4 | Conditional Removal | 2-3 hours | Medium |
| **Total** | | **16-24 hours** | |

---

**Status**: Ready for implementation
**Last Updated**: 11 November 2025
**Next Review**: After Phase 1 completion
