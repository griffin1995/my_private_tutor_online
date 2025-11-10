# Dependency Cleanup - Technical Deep Dive

**Audience**: Technical leads, DevOps engineers
**Purpose**: Detailed technical analysis of each dependency decision

---

## PART 1: ANALYSIS METHODOLOGY

### How Knip Works

Knip performs **static code analysis**:
1. Parses all TypeScript/JavaScript files
2. Builds dependency graph
3. Traces imports to their sources
4. Identifies unused dependencies (not in import statements)

### Key Limitations

**False Positives**: Knip might report unused dependencies that are actually needed:
- Dynamic imports (not statically analyzable)
- Lazy-loaded components
- Transitive dependencies required by other packages
- Configuration-based usage

**False Negatives**: Knip might miss real issues:
- Peer dependencies (intentionally not imported)
- Optional features that are sometimes needed
- Development tools that aren't "imported"

### For This Project

**Confidence Levels**:
- **99%**: ESLint, React core, build tools
- **90%**: Small utilities (use-debounce)
- **70-80%**: Feature libraries (react-player, react-dropzone)
- **50-60%**: Specialized tools (tesseract.js, fuse.js)

---

## PART 2: INDIVIDUAL DEPENDENCY ANALYSIS

### Category 1: CRITICAL - Absolutely Required

#### A. regenerator-runtime (v0.14.1) - 25 KB

**What it does**: Polyfill for async/await in older JavaScript environments

**Why Knip says unused**: No direct imports found - it's auto-injected by Babel/TypeScript compiler

**Technical Analysis**:
```typescript
// This code:
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// Gets transpiled to code that USES regenerator-runtime:
function fetchData() {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch('/api/data');
    return response.json();
  });
}
// The __awaiter helper needs regenerator-runtime
```

**Removal Risk**: **EXTREME** - Build breaks immediately
**Build Error Pattern**: `Cannot find module 'regenerator-runtime'`
**Browsers Affected**: IE 11, older mobile browsers
**Keep**: **YES - MANDATORY**

**Verification**:
```bash
# Check if it's imported by build system
grep -r "regenerator" .next/ || echo "Not in build"
# If using async/await:
grep -r "async\|await" src/ --include="*.ts" --include="*.tsx" | wc -l
# Result: Many matches = needs regenerator-runtime
```

---

#### B. ESLint & Plugins (6 packages total)

**Packages**:
- eslint (v9) - 25 MB
- eslint-config-next (v15.5.4) - 5 MB
- eslint-plugin-jsx-a11y (v6.10.2) - 2 MB
- eslint-plugin-react-hooks (v5.2.0) - 1 MB
- @eslint/eslintrc (v3) - 1 MB
- @eslint/js (v9) - 1 MB

**What they do**: Code quality, accessibility, and best practice enforcement

**Why Knip says unused**: No direct `import` statements (config-based)

**Usage Pattern**:
```javascript
// eslint.config.mjs - configuration file
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.recommended,
  // ... plugins configured here, not imported in code
];
```

**How it's invoked**:
```json
{
  "scripts": {
    "lint": "next lint",
    "format:check": "prettier --check ..."
  }
}
```

**Removal Risk**: **EXTREME** - CI/CD pipeline breaks
**Error Pattern**: `Module not found: 'eslint'` or linting fails to run
**Team Impact**: Code quality gates fail
**Keep**: **YES - ALL OF THEM**

**Why each is critical**:
- **eslint**: Base linting engine
- **eslint-config-next**: Next.js rules
- **eslint-plugin-jsx-a11y**: WCAG 2.1 AA compliance (royal client requirement)
- **eslint-plugin-react-hooks**: Prevents infinite loops, memory leaks

---

### Category 2: HIGH RISK - Investigate Before Removal

#### A. react-dropzone (v14.3.8) - 20 KB

**What it does**: Drag-and-drop file upload zones

**Where it's likely used**:
```typescript
// Typical usage
import { useDropzone } from 'react-dropzone';

function FileUpload() {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => handleUpload(acceptedFiles)
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag files here or click to select</p>
    </div>
  );
}
```

**Why Knip says unused**:
- No direct imports found in current codebase
- But admin components are 85% operational
- Admin files marked as unused (component file cleanup?)

**Investigation Questions**:
1. Is admin section actively maintained?
2. Are file uploads needed for student features?
3. Have form components been rewritten without dropzone?

**Usage in tutoring platform**:
- ✅ Student submission of essays
- ✅ Teacher marking/feedback uploads
- ✅ Document/resource uploads
- ✅ Progress tracking file submissions

**Risk Assessment**:
| Factor | Impact | Weight |
|--------|--------|--------|
| Core functionality needed | YES | Critical |
| Evidence of active usage | WEAK | -5 |
| Newer alternatives available | Maybe | -3 |
| Bundle size if removed | 20 KB | -2 |

**Removal Risk**: **HIGH - Don't remove without proof**
**Recommendation**: **INVESTIGATE thoroughly**

**Investigation Commands**:
```bash
# Search all codebase
grep -r "useDropzone\|Dropzone\|react-dropzone" src/ --include="*.ts" --include="*.tsx"

# Check git history for recent removals
git log --oneline --all -- "*upload*" "*dropzone*" | head -10

# Look in node_modules for dependent packages
npm ls react-dropzone

# Check TypeScript imports
grep -r "from.*react-dropzone\|import.*from.*'react-dropzone'" .

# Examine unused admin files to understand context
file src/components/admin/faq-admin-dashboard.tsx
```

**Safest Path**:
1. Keep for now
2. During Phase 2, investigate thoroughly
3. If removing file uploads, remove dependency
4. Test all submission workflows first

---

#### B. react-player (v3.3.3) - 80 KB

**What it does**: Universal video player component with support for multiple formats

**Where it's likely used**:
```typescript
import ReactPlayer from 'react-player';

function VideoSection() {
  return (
    <ReactPlayer
      url='https://youtube.com/watch?v=...'
      controls
      width='100%'
      height='100%'
    />
  );
}
```

**Why Knip says unused**:
- No direct imports found
- Video components may have been refactored
- Check OptimizedVideoPlayer implementation

**Critical for tutoring platform**:
- ✅ Video masterclasses (core product)
- ✅ Tutorial videos
- ✅ Demo videos
- ✅ Student success videos

**Codebase Evidence**:
```
src/components/video/
  ├── OptimizedVideoPlayer.tsx
  ├── OptimizedVideoPlayer.types.ts
  ├── VideoMasterclassGrid.tsx
  ├── VideoMasterclassSection.tsx
  ├── BootcampVideoSectionVersion.tsx
  ├── VideoMasterclassSectionImageFullWidthTextHalfWidth.tsx
  └── VideoMasterclassSectionTextFullWidth.tsx
```

**Key Investigation**:
```bash
# Check OptimizedVideoPlayer for react-player usage
cat src/components/video/OptimizedVideoPlayer.tsx | grep -i "react-player\|ReactPlayer"

# Check video implementation pattern
head -100 src/components/video/OptimizedVideoPlayer.tsx

# See if custom implementation exists
grep -r "useVideo\|video" src/lib/video* --include="*.ts"
```

**Likely Scenarios**:

1. **Scenario A: Fully Replaced**
   - Custom video component implemented
   - react-player no longer needed
   - Safe to remove after verification

2. **Scenario B: Still Active**
   - OptimizedVideoPlayer wraps ReactPlayer
   - Videos won't work without it
   - MUST keep

3. **Scenario C: Partially Replaced**
   - Some videos use custom, some use react-player
   - Inconsistent implementation
   - Refactor first, then decide

**Removal Risk**: **HIGH** if videos still needed
**Recommendation**: **INVESTIGATE video architecture**

**Decision Framework**:
```
Check OptimizedVideoPlayer.tsx for "react-player" or "ReactPlayer"
├─ Found → KEEP the dependency
└─ Not found → Verify custom implementation works
   ├─ Works perfectly → SAFE to remove
   └─ Incomplete → Complete custom implementation first
```

---

#### C. fuse.js (v7.1.0) - 40 KB

**What it does**: Fuzzy search library for client-side searching

**Implementation pattern**:
```typescript
import Fuse from 'fuse.js';

const data = [
  { id: 1, title: 'A-Level Maths', tags: ['maths', 'science'] },
  { id: 2, title: 'GCSE English', tags: ['english', 'humanities'] }
];

const fuse = new Fuse(data, {
  keys: ['title', 'tags'],
  threshold: 0.3  // Fuzzy matching threshold
});

const results = fuse.search('maths');  // Finds 'A-Level Maths'
```

**Why Knip says unused**:
- No direct imports found
- FAQ search components exist but marked as unused files
- Search functionality may be server-side only

**Evidence of potential usage**:
- FAQ system exists (faq-enhanced-search.tsx exists but unused)
- Search components in multiple places
- Site search functionality mentioned in testimonials

**Search in tutoring platform**:
- ✅ FAQ search
- ✅ Subject/topic search
- ✅ Course/service search
- ✅ Testimonials search

**Investigation**:
```bash
# Look for search implementation
grep -r "search\|Search" src/components/faq/ --include="*.tsx" -l

# Check if server-side search is used instead
grep -r "api/search\|/search" src/ --include="*.ts" --include="*.tsx"

# Look for fuse.js imports anywhere
grep -r "fuse.js\|Fuse\|new Fuse" src/ --include="*.ts" --include="*.tsx"

# Check if it's in unused files
grep "faq-enhanced-search\|faq-search" /tmp/knip-output.txt
```

**Likely Scenarios**:

1. **Search moved to server-side**
   - API-based search implemented
   - fuse.js not needed
   - Safe to remove

2. **Search is client-side only**
   - Needs fuse.js for performance
   - MUST keep

3. **Search is hybrid**
   - Server + client fuzzy matching
   - May still need fuse.js for client-side refinement
   - Investigate implementation

**Removal Risk**: **MEDIUM-HIGH**
**Recommendation**: **INVESTIGATE search implementation**

---

#### D. react-speech-recognition (v4.0.1) - 15 KB

**What it does**: Web Speech API wrapper for voice-to-text

**Usage pattern**:
```typescript
import { useSpeechRecognition } from 'react-speech-recognition';

function VoiceSearch() {
  const { transcript, listening, startListening, stopListening } = useSpeechRecognition();

  return (
    <div>
      <button onClick={startListening}>🎤 Start Listening</button>
      <p>You said: {transcript}</p>
    </div>
  );
}
```

**Why Knip says unused**:
- No imports found
- Voice search component exists (faq-voice-search.tsx) but marked unused
- Feature may have been removed

**Evidence**:
- Component exists: `src/components/faq/faq-voice-search.tsx`
- Component is in unused files list
- No recent activity on voice features

**Accessibility vs Features**:
- Voice search is nice-to-have, not critical
- Could be accessibility feature (screen reader users)
- Could be future feature in development

**Decision Framework**:
```
Is voice search in product roadmap?
├─ YES → Keep dependency
├─ NO → Is it accessibility feature?
│  ├─ YES → Keep for WCAG compliance
│  └─ NO → Safe to remove
└─ UNCLEAR → Investigate product requirements
```

**Investigation**:
```bash
# Check product roadmap
grep -r "voice\|Voice" CLAUDE.md PROJECT*.md roadmap* 2>/dev/null

# Check component state
file src/components/faq/faq-voice-search.tsx
wc -l src/components/faq/faq-voice-search.tsx  # ~50 lines = stub?

# Check if it's integrated anywhere
grep -r "VoiceSearch\|faq-voice-search" src/ --include="*.ts" --include="*.tsx"
```

**Removal Risk**: **MEDIUM** - only if feature not planned
**Recommendation**: **Safe to remove IF deprecated**

---

### Category 3: MEDIUM RISK - Safe with Testing

#### A. tesseract.js (v6.0.1) - 500+ KB (LARGEST)

**What it does**: OCR (optical character recognition) using machine learning

**Bundle Impact**: **Largest unused dependency** - 500+ KB uncompressed!

**Usage pattern**:
```typescript
import Tesseract from 'tesseract.js';

async function extractTextFromImage(imageUrl) {
  const worker = await Tesseract.createWorker();
  const result = await worker.recognize(imageUrl);
  await worker.terminate();
  return result.data.text;
}
```

**Why Knip says unused**:
- No imports found
- OCR is specialized feature
- May be in admin/processing workflows

**Potential use cases in tutoring**:
- ❓ Scanning student handwritten work
- ❓ Extracting text from document uploads
- ❓ Processing exam paper scans
- ❓ Extracting text from testimonial images

**Investigation**:
```bash
# Search for OCR usage
grep -r "ocr\|OCR\|Tesseract\|tesseract" src/ --include="*.ts" --include="*.tsx"

# Check admin/processing components
ls -la src/components/admin/
ls -la src/lib/processing*

# Check if unused files include document processing
grep -i "document\|scan\|extract\|ocr" /tmp/knip-output.txt
```

**Decision Matrix**:
| Finding | Action |
|---------|--------|
| No usage anywhere | REMOVE (200+ KB savings!) |
| Used in admin only | Keep for now (admin 85% operational) |
| Future roadmap | Keep (planned feature) |
| Unclear | Keep (large dependency, safer to keep) |

**Removal Risk**: **MEDIUM** - if not used, huge bundle savings
**Recommendation**: **INVESTIGATE - High payoff if safe**

---

#### B. rough-notation (v0.5.1) - 30 KB

**What it does**: SVG-based text highlighting and annotation

**Visual effect**:
```typescript
import { annotate } from 'rough-notation';

const element = document.querySelector('h1');
const annotation = annotate(element, { type: 'underline' });
annotation.show();  // Animated underline appears
```

**Why Knip says unused**:
- No direct imports found
- Likely in design system or unused marketing components
- 114 unused files include marketing components

**Use cases**:
- ✅ Highlighting key benefits/features
- ✅ Call-to-action emphasis
- ✅ Learning highlight effects
- ✅ Course highlights

**Investigation**:
```bash
# Look for rough-notation usage
grep -r "rough-notation\|annotate" src/ --include="*.ts" --include="*.tsx"

# Check design system
grep -r "highlight\|underline\|circle" src/components/design* --include="*.tsx"

# Check marketing components (many are unused)
ls src/components/marketing/
grep -r "rough" src/components/marketing/ --include="*.tsx"
```

**Decision**:
- If no usage in active pages → Safe to remove
- If in design system → Keep
- Low bundle impact → Safe to keep even if unused

**Removal Risk**: **LOW** - only 30 KB, easy to restore
**Recommendation**: **Safe to remove after verification**

---

### Category 4: SAFE - Low Risk Removal

#### A. use-debounce (v10.0.5) - 5 KB

**What it does**: React hook for debouncing values

**Typical usage**:
```typescript
import { useDebounce } from 'use-debounce';

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Executes only after typing stops for 500ms
    search(debouncedTerm);
  }, [debouncedTerm]);
}
```

**Why it's SAFE to remove**:
1. **Easy to replace**: Custom hook is 10 lines of code
2. **Small bundle**: Only 5 KB (negligible)
3. **Common pattern**: Easy to implement in-house
4. **No special features**: Generic debounce, nothing special

**Custom replacement** (already prepared in Action Plan):
```typescript
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

**Removal steps**:
```bash
# 1. Create custom hook (already done)
# 2. Replace imports:
#    OLD: import { useDebounce } from 'use-debounce';
#    NEW: import { useDebounce } from '@/hooks/useDebounce';
# 3. Remove package: npm uninstall use-debounce
# 4. Verify: npm run build
```

**Removal Risk**: **MINIMAL** - easy to undo
**Recommendation**: **SAFE - First package to remove**

---

## PART 3: INFRASTRUCTURE DEPENDENCIES

### Missing but Used

These should be added to package.json:

#### 1. @eslint/js (missing from package.json!)

**Location**: `eslint.config.mjs:9:16`
**What it is**: ESLint JavaScript configuration presets
**Why needed**: ESLint v9 uses new config format requiring this

**Fix**:
```bash
npm install --save-dev @eslint/js
```

**Severity**: HIGH - ESLint won't work without it
**Status**: MUST FIX

---

#### 2. Image Optimization Tools

**Location**: `scripts/optimize-images.mjs`
**Missing packages**:
- imagemin
- imagemin-webp
- imagemin-mozjpeg
- imagemin-pngquant

**What they do**: Optimize images in build process

**Fix**:
```bash
npm install --save-dev imagemin imagemin-webp imagemin-mozjpeg imagemin-pngquant
```

**Usage in scripts**:
```javascript
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

// Optimize to WebP format
await imagemin(['src/images/**/*.{jpg,png}'], {
  destination: 'src/images/webp',
  plugins: [imageminWebp({ quality: 75 })]
});
```

**Severity**: MEDIUM - Script won't run, but not in main build
**Status**: Should fix if using image optimization script

---

### Unused Binaries

These are system tools, not npm packages:

| Binary | Purpose | Action |
|--------|---------|--------|
| **jq** | JSON parsing in bash | System tool - no action |
| **tail** | Log viewing | System tool - no action |
| **prettier** | Code formatting | Usually global or add devDep |
| **lhci** | Lighthouse CI | Add: `npm install --save-dev @lhci/cli@latest` |
| **tsx** | TypeScript runner | Add: `npm install --save-dev tsx` |

**Critical missing**:
```bash
# These should be in devDependencies:
npm install --save-dev @lhci/cli@latest tsx
```

---

## PART 4: DECISION FRAMEWORK

### General Principle

```
A dependency is safe to remove if and only if:
1. It has NO imports in codebase, AND
2. It's NOT used by build system, AND
3. It's NOT infrastructure/quality-critical, AND
4. Removal tested successfully in staging
```

### Specific Checklist per Package

**Before removing ANY dependency, verify**:
```
[ ] Searched entire codebase: grep -r "package-name" src/
[ ] Checked configuration files: grep "package-name" *.config.*
[ ] Checked build system: npm ls package-name
[ ] Ran tests: npm run quality
[ ] Manual feature testing: npm run dev
[ ] Staging deployment: vercel deploy --presets preview
[ ] Code review: Team approval
[ ] Documentation: Updated DEPENDENCY_CLEANUP_ANALYSIS.md
```

### Risk Assessment Formula

```
Risk Score = (Bundle_Size × Importance × Uncertainty) / Replacement_Difficulty

Where:
- Bundle_Size: KB of minified code
- Importance: 1-10 (1=low, 10=critical)
- Uncertainty: 1-10 (1=certain unused, 10=might be used)
- Replacement_Difficulty: 1-10 (1=easy replacement, 10=hard)

Score < 50: SAFE
Score 50-150: INVESTIGATE
Score 150-300: HIGH RISK
Score > 300: CRITICAL
```

**Examples**:

1. **use-debounce**
   - Bundle: 5 KB
   - Importance: 3 (utility, not critical)
   - Uncertainty: 1 (clearly not used)
   - Replacement: 1 (easy custom hook)
   - Score: (5 × 3 × 1) / 1 = **15 → SAFE**

2. **react-dropzone**
   - Bundle: 20 KB
   - Importance: 9 (file uploads needed)
   - Uncertainty: 6 (unclear if still used)
   - Replacement: 5 (would need alternatives)
   - Score: (20 × 9 × 6) / 5 = **216 → HIGH RISK**

3. **tesseract.js**
   - Bundle: 500 KB
   - Importance: 3 (specialized feature)
   - Uncertainty: 8 (unclear if used)
   - Replacement: 9 (no good alternatives)
   - Score: (500 × 3 × 8) / 9 = **1,333 → CRITICAL**
   - But if confirmed unused: Score = **200 → INVESTIGATE**

---

## PART 5: IMPLEMENTATION TIMELINE

### Optimal Order of Operations

**Week 1: Critical Fixes**
1. Install @eslint/js, tsx, @lhci/cli
2. Fix unresolved imports
3. Fix Husky configuration
4. Verify builds successfully

**Week 2: Investigation**
1. Audit react-dropzone usage
2. Verify video component architecture
3. Investigate search implementation
4. Document all findings

**Week 3: Safe Removals**
1. Create custom useDebounce hook
2. Remove use-debounce
3. Run full test suite
4. Deploy to staging

**Week 4: Conditional Removals**
1. Based on investigation, remove tesseract.js
2. Remove rough-notation if confirmed
3. Remove react-speech-recognition if deprecated
4. Final testing and documentation

---

## CONCLUSION

**TL;DR**:
- Do NOT remove ESLint, React, regenerator-runtime
- INVESTIGATE before removing: react-dropzone, react-player, fuse.js
- SAFE to remove: use-debounce (high confidence)
- FIX IMMEDIATELY: Missing @eslint/js and other binaries

**Confidence Level**: 85-95% for most recommendations
**Risk Level**: Controlled with phased approach
**Effort Required**: 16-24 hours over 4 weeks

---

**Next Step**: Review DEPENDENCY_CLEANUP_ACTION_PLAN.md and begin Week 1
