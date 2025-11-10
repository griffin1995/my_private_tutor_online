# Next Session: Implementation Checklist
## Objective: Resolve Build Blocker - Move Error Pages to [locale] Directory
## Time Estimate: 1 hour
## Risk Level: LOW

---

## PRE-IMPLEMENTATION CHECKLIST

### 1. Read Documentation (5 minutes)
- [ ] Read `BUILD_BLOCKER_TECHNICAL_ANALYSIS.md` (root cause + solution)
- [ ] Review `PHASE5_BUILD_VERIFICATION_REPORT.md` (verification findings)
- [ ] Understand current architecture issue (error pages outside [locale])

### 2. Verify Current State (3 minutes)
- [ ] Confirm `/src/app/error.tsx` exists (root level)
- [ ] Confirm `/src/app/not-found.tsx` exists (root level)
- [ ] Confirm `/src/app/global-error.tsx` exists (root level - keep this)
- [ ] Confirm NO error pages in `/src/app/[locale]/` currently

---

## IMPLEMENTATION STEPS

### Step 1: Create Locale-Aware Error Page (15 minutes)

**File**: `/src/app/[locale]/error.tsx`

**Requirements**:
- ✅ Add "use client" directive
- ✅ Import `useTranslations` from 'next-intl'
- ✅ Import Link from 'next/link'
- ✅ Accept error and reset props (standard Next.js error boundary)
- ✅ Use translations for all text content (t('errors.somethingWentWrong'), etc.)
- ✅ Maintain royal client design standards (existing error.tsx styling)
- ✅ Include error digest display
- ✅ Provide "Try Again" button (onClick reset)
- ✅ Provide "Return Home" link

**Key Code Pattern**:
```typescript
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  return (
    // Copy existing design from /src/app/error.tsx
    // Replace hardcoded text with t('errors.keyName')
  );
}
```

### Step 2: Create Locale-Aware Not Found Page (15 minutes)

**File**: `/src/app/[locale]/not-found.tsx`

**Requirements**:
- ✅ Import `useTranslations` from 'next-intl'
- ✅ Import Link from 'next/link'
- ✅ Use translations for all text content
- ✅ Maintain royal client design standards
- ✅ Include helpful navigation links (Home, Subject Tuition, Contact)
- ✅ Display prominent 404 indicator
- ✅ Provide apologetic, premium-brand messaging

**Key Code Pattern**:
```typescript
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    // Copy existing design from /src/app/not-found.tsx
    // Replace hardcoded text with t('errors.notFound'), etc.
  );
}
```

### Step 3: Add Translation Keys (10 minutes)

**Files to Update**:
- [ ] `/src/messages/en.json` (English translations)
- [ ] `/src/messages/fr.json` (French translations)
- [ ] `/src/messages/ar.json` (Arabic translations)

**Required Translation Keys**:

```json
{
  "errors": {
    "somethingWentWrong": "Something Went Wrong",
    "errorMessage": "We apologise for the inconvenience. Our premium tutoring service has encountered a technical issue.",
    "tryAgain": "Try Again",
    "returnHome": "Return Home",
    "errorId": "Error ID",
    "unknown": "Unknown",
    "notFound": "Page Not Found",
    "notFoundMessage": "We apologise, but the page you are looking for could not be found. Our premium tutoring service continues to be available through our main navigation.",
    "browseSubjects": "Browse Subjects",
    "contactUs": "Contact Us",
    "supportMessage": "If you believe this is an error, please contact our support team.",
    "applicationError": "Application Error",
    "criticalErrorMessage": "We apologise for the inconvenience. Our premium tutoring service has encountered a critical error."
  }
}
```

**French Translations** (fr.json):
```json
{
  "errors": {
    "somethingWentWrong": "Quelque chose s'est mal passé",
    "errorMessage": "Nous nous excusons pour le dérangement. Notre service de tutorat premium a rencontré un problème technique.",
    "tryAgain": "Réessayer",
    "returnHome": "Retour à l'accueil",
    // ... (add remaining translations)
  }
}
```

**Arabic Translations** (ar.json):
```json
{
  "errors": {
    "somethingWentWrong": "حدث خطأ ما",
    "errorMessage": "نعتذر عن الإزعاج. واجهت خدمة التدريس المتميزة لدينا مشكلة تقنية.",
    "tryAgain": "حاول مرة أخرى",
    "returnHome": "العودة إلى الصفحة الرئيسية",
    // ... (add remaining translations)
  }
}
```

### Step 4: Remove Root-Level Error Pages (2 minutes)

**Files to Remove**:
- [ ] Remove `/src/app/error.tsx` (now in [locale])
- [ ] Remove `/src/app/not-found.tsx` (now in [locale])
- [ ] **KEEP** `/src/app/global-error.tsx` (required for critical errors)

**Command**:
```bash
rm /home/jack/Documents/my_private_tutor_online/src/app/error.tsx
rm /home/jack/Documents/my_private_tutor_online/src/app/not-found.tsx
```

### Step 5: Verify Build (5 minutes)

**Commands**:
```bash
cd /home/jack/Documents/my_private_tutor_online
npm run build
```

**Expected Output**:
- ✅ Compilation successful
- ✅ All 48 pages generated successfully
- ✅ No Html import errors
- ✅ Build completes to 100%

**If Build Fails**:
- Check translation key spelling in error pages
- Verify useTranslations import is correct
- Confirm all locale JSON files have errors section
- Review error page syntax for TypeScript errors

---

## TESTING CHECKLIST

### Step 6: Test Error Pages Locally (10 minutes)

**Test Cases**:
- [ ] Navigate to `http://localhost:3000/en/non-existent-page` → Should show English 404
- [ ] Navigate to `http://localhost:3000/fr/non-existent-page` → Should show French 404
- [ ] Navigate to `http://localhost:3000/ar/non-existent-page` → Should show Arabic 404
- [ ] Trigger error boundary (add code to throw error temporarily) → Verify error page shows
- [ ] Click "Try Again" button → Verify reset functionality works
- [ ] Click "Return Home" link → Verify navigation to homepage works
- [ ] Check error page styling → Verify royal client standards maintained

### Step 7: Performance Validation (5 minutes)

**Metrics to Collect**:
- [ ] Total build time (record actual time)
- [ ] Number of routes generated (should be 48+)
- [ ] Build warnings (should be minimal)
- [ ] Bundle size (compare to previous builds if available)

**Command**:
```bash
npm run build 2>&1 | tee build-success-metrics.log
```

---

## POST-IMPLEMENTATION CHECKLIST

### Step 8: Document Results (5 minutes)

**Create**: `BUILD_FIX_RESULTS.md`

**Include**:
- [ ] Build success confirmation (timestamp, build time)
- [ ] Error page testing results (all locales verified)
- [ ] Performance metrics (build time, routes generated)
- [ ] Any issues encountered (and resolutions)
- [ ] Screenshots of error pages in different locales (optional)

### Step 9: Commit Changes (3 minutes)

**Git Workflow**:
```bash
git status
git add src/app/[locale]/error.tsx
git add src/app/[locale]/not-found.tsx
git add src/messages/en.json
git add src/messages/fr.json
git add src/messages/ar.json
git add BUILD_FIX_RESULTS.md
git commit -m "fix: move error pages to [locale] directory for i18n compatibility

- Create locale-aware error.tsx in [locale] directory
- Create locale-aware not-found.tsx in [locale] directory
- Add error message translations for en, fr, ar locales
- Remove root-level error pages (except global-error.tsx)
- Resolves Next.js Html import build error
- Aligns with Next.js i18n best practices
- Improves international error UX with localized messages

Build Status: ✅ SUCCESS - All 48 pages generated
Build Time: [ACTUAL_TIME]s

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 10: Deploy to Production (5 minutes)

**Vercel CLI Deployment**:
```bash
vercel deploy --prod
```

**Post-Deployment Verification**:
- [ ] Test error pages in production environment
- [ ] Verify all locales work correctly
- [ ] Check CDN caching
- [ ] Confirm monitoring systems operational
- [ ] Validate error tracking (Sentry integration)

---

## SUCCESS CRITERIA

### Build Success:
- ✅ Build completes without errors
- ✅ All pages generate successfully (48+)
- ✅ No Html import error
- ✅ Build time recorded and compared to target

### Error Page Functionality:
- ✅ Error pages display in all locales (en, fr, ar)
- ✅ Translations show correctly for each language
- ✅ Navigation links work properly
- ✅ Reset functionality operates as expected
- ✅ Royal client design standards maintained

### Production Deployment:
- ✅ Deployment succeeds via Vercel CLI
- ✅ Error pages work in production
- ✅ No regressions in existing functionality
- ✅ Monitoring systems report healthy status

---

## ROLLBACK PLAN (If Issues Occur)

### Quick Rollback Steps:

1. **Restore Root-Level Error Pages**:
```bash
git checkout HEAD~1 -- src/app/error.tsx src/app/not-found.tsx
```

2. **Remove Locale Error Pages**:
```bash
rm src/app/[locale]/error.tsx
rm src/app/[locale]/not-found.tsx
```

3. **Revert Translations**:
```bash
git checkout HEAD~1 -- src/messages/en.json src/messages/fr.json src/messages/ar.json
```

4. **Test Build**:
```bash
npm run build
```

5. **Document Rollback**:
- Note what went wrong
- Identify what needs adjustment
- Plan revised approach

---

## ESTIMATED TIME BREAKDOWN

| Step | Activity | Time | Cumulative |
|------|----------|------|------------|
| 1 | Create locale error.tsx | 15 min | 15 min |
| 2 | Create locale not-found.tsx | 15 min | 30 min |
| 3 | Add translations (3 locales) | 10 min | 40 min |
| 4 | Remove root-level files | 2 min | 42 min |
| 5 | Verify build | 5 min | 47 min |
| 6 | Test error pages | 10 min | 57 min |
| 7 | Performance validation | 5 min | 62 min |
| 8 | Document results | 5 min | 67 min |
| 9 | Commit changes | 3 min | 70 min |
| 10 | Deploy production | 5 min | 75 min |

**Total Estimate**: 75 minutes (1.25 hours)
**Buffer Time**: 15 minutes for unexpected issues
**Total with Buffer**: 90 minutes (1.5 hours)

---

## TOOLS & COMMANDS REFERENCE

### Quick Build Check:
```bash
npm run build 2>&1 | tee build-output.log
```

### Quick Test (Development):
```bash
npm run dev
# Test error pages manually
```

### Check Translation Files:
```bash
cat src/messages/en.json | grep -A 20 '"errors"'
```

### Verify File Structure:
```bash
ls -la src/app/[locale]/*.tsx
ls -la src/app/*.tsx
```

### Git Status:
```bash
git status
git diff src/messages/en.json
```

---

## NOTES FOR IMPLEMENTATION

### Design Consistency:
- Copy existing error page designs from root-level files
- Maintain gradient backgrounds (slate-50 to slate-100)
- Keep rounded card design (rounded-2xl shadow-xl)
- Preserve button styling (blue-600 primary, slate-200 secondary)
- Ensure responsive design (sm:flex-row for buttons)

### Translation Quality:
- Use apologetic, premium-brand tone
- Maintain formality appropriate for royal client standards
- Ensure Arabic translations are grammatically correct (RTL aware)
- French translations should use formal "vous" form
- All messaging should reflect tutoring service context

### Testing Priority:
1. Build completion (critical)
2. English locale (primary market)
3. French locale (secondary market)
4. Arabic locale (international market)
5. Error boundary triggering (functional test)
6. Navigation from error pages (UX test)

---

## QUICK START COMMAND

**To begin implementation immediately**:

```bash
cd /home/jack/Documents/my_private_tutor_online
# Read this checklist
# Open BUILD_BLOCKER_TECHNICAL_ANALYSIS.md for reference
# Begin with Step 1: Create /src/app/[locale]/error.tsx
```

---

**Checklist Created**: 2025-11-04
**Project**: My Private Tutor Online - Enterprise Integration
**Objective**: Resolve build blocker by implementing i18n-compatible error pages
**Priority**: IMMEDIATE (blocks £400,000+ deployment)
**Risk Level**: LOW (straightforward implementation following Next.js best practices)
