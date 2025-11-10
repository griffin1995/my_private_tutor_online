# Dependency Cleanup - Quick Reference Card

**For**: Development team, DevOps, project managers
**Use**: Print this or bookmark for quick lookups

---

## THE ESSENTIALS - AT A GLANCE

### DO NOT REMOVE (CRITICAL)
```
✅ regenerator-runtime       (Build system needs it)
✅ eslint + all eslint-*     (Code quality pipeline)
✅ All @radix-ui packages    (UI components)
✅ react + react-dom         (Framework core)
```

### PROBABLY KEEP (INVESTIGATE FIRST)
```
⚠️ react-dropzone           (File uploads - audit admin)
⚠️ react-player             (Videos - verify implementation)
⚠️ fuse.js                  (Search - check FAQ system)
⚠️ react-speech-recognition (Voice - confirm deprecated)
```

### SAFE TO REMOVE (LOW RISK)
```
🗑️ use-debounce             (Easy to replace with custom hook)
🗑️ rough-notation           (If not in design system)
🗑️ tesseract.js             (200 KB savings - check OCR usage)
```

---

## QUICK COMMANDS

### Check What's Broken
```bash
npm run quality:fast
```

### Find Dependency Usage
```bash
grep -r "[package-name]" src/ --include="*.ts" --include="*.tsx"
```

### Remove a Package
```bash
npm uninstall [package]
npm run build    # Verify it still works
```

### Restore Everything
```bash
git checkout package.json package-lock.json
npm install
```

---

## THE NUMBERS

| Category | Count | Action |
|----------|-------|--------|
| Unused Dependencies | 8 | Investigate |
| Unused Dev Dependencies | 6 | Keep most |
| Unused Files | 114 | Low priority |
| Unused Exports | 323 | Future cleanup |

**Bundle Impact**: ~50-100 KB potential savings (realistic)

---

## PHASE BREAKDOWN

### Week 1: Fix Critical Issues
```
npm install --save-dev @eslint/js tsx @lhci/cli@latest
npm install --save-dev imagemin imagemin-webp imagemin-mozjpeg imagemin-pngquant
```

### Week 2: Investigate
- Search for actual usage of each package
- Verify components that use them
- Document findings

### Week 3: Remove Safe Packages
```
npm uninstall use-debounce
```

### Week 4: Conditional Removal
- Only remove after investigation confirms safe
- Test extensively in staging first

---

## RISK LEVELS

🔴 **CRITICAL**: Remove = Instant break
- regenerator-runtime
- eslint
- React/React-DOM

🟠 **HIGH**: Remove = Possible break
- react-dropzone
- react-player
- fuse.js

🟡 **MEDIUM**: Remove = Unlikely to break
- react-speech-recognition
- rough-notation
- tesseract.js

🟢 **SAFE**: Remove = No risk
- use-debounce

---

## BEFORE YOU REMOVE ANYTHING

**Checklist**:
- [ ] Searched codebase for imports
- [ ] Verified no indirect usage
- [ ] Ran `npm run build` successfully
- [ ] Ran `npm run lint` successfully
- [ ] Tested related features manually
- [ ] Code review approved

---

## IF SOMETHING BREAKS

**Immediate fix**:
```bash
git checkout .
npm install
git push  # If already pushed
```

**Then investigate** why removal broke it

---

## KEY FILES

📄 **Full Analysis**: DEPENDENCY_CLEANUP_ANALYSIS.md
📋 **Action Plan**: DEPENDENCY_CLEANUP_ACTION_PLAN.md
📍 **This File**: DEPENDENCY_CLEANUP_QUICK_REFERENCE.md

---

## DECISION MATRIX

```
Found in code?
├─ YES  → Can it be removed? → Only with approval + staging test
├─ NO   → Is it build-critical? → YES: Keep it → NO: Can remove
└─ UNCLEAR → Investigate more
```

---

## ESTIMATED EFFORT

| Phase | Hours | Difficulty |
|-------|-------|------------|
| Fix Critical Issues | 5-7 | Medium |
| Investigate Usage | 4-6 | High |
| Remove Safe Packages | 2-3 | Low |
| Conditional Removal | 2-3 | Medium |
| **Total** | **16-24** | |

---

## BUNDLE SIZE IMPACT

Realistic savings (after removing false positives):
- **Without investigation**: ~50-100 KB
- **With full cleanup**: ~150-200 KB
- **Impact on build time**: +0.5-1.0s faster

Largest wins:
- tesseract.js: 200+ KB (if unused)
- react-player: 25 KB (if unused)
- fuse.js: 15 KB (if unused)

---

## REMEMBER

❌ **Don't Remove**:
- Anything used in code
- Build/quality tools
- Infrastructure dependencies

✅ **Safe to Remove**:
- Confirmed unused in code
- Low bundle impact
- Easy to restore if needed

⚠️ **Always**:
- Test before production
- Keep git history
- Document decisions

---

**Questions?** Check the full analysis documents
**Need help?** See DEPENDENCY_CLEANUP_ACTION_PLAN.md for detailed steps
