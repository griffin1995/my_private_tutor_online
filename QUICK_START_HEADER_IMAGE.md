# Quick Start: Header Image Replacement

## 5-Minute Guide

### 1. Get the Image
Download from Google Drive → Save as `education-insights-header.jpg`

### 2. Place the File
```bash
# Copy to this location:
/public/images/blog/education-insights-header.jpg
```

### 3. Update Code
**File**: `/src/app/blog/page.tsx`
**Line**: 153

**Change this**:
```tsx
backgroundImage='/images/pexels-polina-tankilevitch-6929349.jpg'
```

**To this**:
```tsx
backgroundImage='/images/blog/education-insights-header.jpg'
```

### 4. Test & Deploy
```bash
npm run dev          # Test at http://localhost:3000/blog
npm run build        # Verify build succeeds
vercel --prod        # Deploy to production
```

---

## Image Requirements
- Width: 1920px minimum
- Format: WebP or JPEG
- Size: Under 500KB
- Ratio: 16:9 landscape

## Optimise Image (if needed)
https://squoosh.app/ → WebP → 85% quality → Download

---

## Verification
✅ Image displays correctly
✅ Sharp on desktop
✅ Scales on mobile
✅ No console errors
✅ Build succeeds
✅ Live site updated

---

**Questions?** See `/CLIENT_ACTION_REQUIRED.md` for detailed instructions
