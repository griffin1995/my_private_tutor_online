# Social Media Link Preview Debugging Report

**Status**: CRITICAL ISSUES IDENTIFIED - Root causes found, solutions provided
**Date**: 30 October 2025
**Issue**: Logo not displaying in Facebook, Twitter, LinkedIn social media previews

---

## EXECUTIVE SUMMARY

Found THREE critical issues preventing the logo from displaying in social media previews:

1. **PRIMARY ISSUE**: og-image.png returns HTTP 404 on production (file exists locally but not deployed)
2. **SECONDARY ISSUE**: Logo dimensions mismatch (declared 400x100 vs actual 2918x1667)
3. **TERTIARY ISSUE**: Logo not included in Twitter card image array

---

## ROOT CAUSE ANALYSIS

### Issue 1: Primary og-image.png Returns 404 (CRITICAL)

**Evidence:**
```
Local:
✓ File exists: /home/jack/Documents/my_private_tutor_online/public/images/og-image.png
✓ File size: 77K
✓ Status: Readable

Production:
✗ https://www.myprivatetutoronline.com/images/og-image.png → HTTP 404
```

**Why This Matters:**
- The metadata declares og-image.png as the PRIMARY (1st) image in the openGraph.images array
- Social media platforms try to fetch this image FIRST
- When it returns 404, they fall back to alternative methods
- Next.js auto-generates a fallback: `https://myprivatetutoronline.com/opengraph-image?f0235a789355d625`
- The auto-generated endpoint wins, logo never gets a chance

**Current Metadata Setup (layout.tsx, lines 78-114):**
```typescript
openGraph: {
  images: [
    {
      url: '/images/og-image.png',      // ← RETURNS 404 on production
      width: 1200,
      height: 630,
      alt: '...',
      type: 'image/png',
    },
    {
      url: '/images/graphics/feature-royal-endorsement.jpg',
      width: 1200,
      height: 630,
      alt: '...',
      type: 'image/jpeg',
    },
    {
      url: '/images/logos/logo-with-name.png',  // ← 3rd in priority
      width: 400,
      height: 100,  // ← DIMENSION MISMATCH
      alt: 'My Private Tutor Online Logo',
      type: 'image/png',
    },
    // ... more images
  ],
}
```

**Actual HTML Rendered:**
```html
<meta property="og:image"
      content="https://myprivatetutoronline.com/opengraph-image?f0235a789355d625"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
```

Next.js auto-generation is overriding the metadata array because the primary image fails.

---

### Issue 2: Logo Dimension Mismatch

**Evidence:**
```
Declared in metadata:
  width: 400px
  height: 100px
  Aspect ratio: 4:1 (extremely wide)

Actual file dimensions:
  width: 2918px
  height: 1667px
  Aspect ratio: 1.75:1 (wide landscape)

File verification:
$ file logo-with-name.png
PNG image data, 2918 x 1667, 8-bit/color RGBA
```

**Social Media Platform Requirements:**
- **Facebook**: Minimum 1200x630 pixels (1.91:1 ratio)
- **Twitter**: Minimum 1200x675 pixels (1.78:1 ratio)
- **LinkedIn**: Minimum 1200x627 pixels (1.91:1 ratio)

**Why This Is A Problem:**
1. Declared size (400x100) is TOO SMALL - below all platform minimums
2. Logo aspect ratio (1.75:1) doesn't match declared ratio (4:1)
3. Social platforms calculate aspect ratios from declared metadata
4. If aspect ratio is wrong, image won't display correctly or at all
5. Platforms may refuse to cache/display images below size minimums

**Logo Status:**
```
✓ File accessible: https://www.myprivatetutoronline.com/images/logos/logo-with-name.png (HTTP 200)
✓ Actual dimensions: 2918x1667 pixels
✗ Declared dimensions: 400x100 pixels
✗ Actual aspect ratio: 1.75:1
✗ Declared aspect ratio: 4:1
```

---

### Issue 3: Logo Not In Twitter Card Array

**Current Configuration (layout.tsx, lines 116-129):**
```typescript
twitter: {
  card: 'summary_large_image',
  title: '...',
  description: '...',
  images: [
    '/images/og-image.png',                      // ← Returns 404
    '/images/graphics/feature-royal-endorsement.jpg',
    '/images/hero/child_book_and_laptop.avif',
    '/images/graphics/feature-built-on-trust.jpeg',
    // ← LOGO NOT HERE
  ],
  creator: '@MyPrivateTutorUK',
  site: '@MyPrivateTutorUK',
}
```

**Why This Is A Problem:**
- Twitter doesn't use the openGraph.images array
- It ONLY uses twitter:image tags from the twitter object
- Logo is NOT in the twitter.images array
- Even if openGraph issues were fixed, logo still wouldn't show on Twitter
- Twitter crawler would fail on first image (og-image.png 404) and try others

---

## DEBUGGING METHODOLOGY

### Step 1: Metadata Verification
Used Next.js metadata API to confirm declared structure:
```typescript
// ✓ Verified in layout.tsx
metadataBase: 'https://www.myprivatetutoronline.com'
openGraph.images: [5 images in array]
twitter.images: [4 images in array]
```

### Step 2: HTTP Response Testing
```bash
# Primary og-image
curl -sI https://www.myprivatetutoronline.com/images/og-image.png
# Result: HTTP 404 ✗

# Logo file
curl -sI https://www.myprivatetutoronline.com/images/logos/logo-with-name.png
# Result: HTTP 200 ✓

# Auto-generated fallback
curl -sI https://www.myprivatetutoronline.com/opengraph-image?f0235a789355d625
# Result: HTTP 200 ✓
```

### Step 3: HTML Source Analysis
Inspected actual HTML meta tags rendered by Next.js:
```html
<!-- What metadata declares: -->
<!-- 5 images in openGraph.images array -->

<!-- What HTML actually renders: -->
<meta property="og:image"
      content="https://myprivatetutoronline.com/opengraph-image?f0235a789355d625"/>
```

**Finding**: Next.js is auto-generating og:image because primary declared image fails.

### Step 4: File Dimension Verification
```bash
$ file public/images/logos/logo-with-name.png
PNG image data, 2918 x 1667, 8-bit/color RGBA, non-interlaced
```

**Finding**: Actual dimensions (2918x1667) don't match declared dimensions (400x100).

### Step 5: Social Media Platform Cache Status
- Facebook and Twitter cache og-images for 24 hours
- Even after fixing issues, caches won't update immediately
- Must use debugger tools to force cache refresh

---

## SOCIAL MEDIA DEBUGGER TOOLS

### Facebook Sharing Debugger
**URL**: https://developers.facebook.com/tools/debug/sharing
**How to use**:
1. Enter: `https://www.myprivatetutoronline.com`
2. Click "Fetch new scrape information"
3. Check "Image URL"
4. Look for og:image properties

**Current Status**: Shows auto-generated opengraph-image endpoint

**After Fix**: Should show correct logo URL

### Twitter Card Validator
**URL**: https://cards-dev.twitter.com/validator
**How to use**:
1. Enter: `https://www.myprivatetutoronline.com`
2. Review "Card" section
3. Check "Image" field
4. Verify image displays correctly

**Current Status**: Likely shows auto-generated endpoint

### LinkedIn Post Inspector
**URL**: https://www.linkedin.com/post-inspector
**How to use**:
1. Enter: `https://www.myprivatetutoronline.com`
2. Review "Scraped Metadata"
3. Check image preview
4. Look for og:image properties

---

## SOLUTIONS (PRIORITY ORDER)

### SOLUTION 1: Verify og-image.png Is Deployed (CRITICAL - DO THIS FIRST)

**The Problem**: File exists locally but returns 404 on production.

**Root Cause**: Likely not deployed to Vercel or lost during build.

**Steps**:

1. **Verify file is in git:**
   ```bash
   git status public/images/og-image.png
   git ls-files | grep og-image
   ```

2. **Check if deployed:**
   - Visit https://www.myprivatetutoronline.com/images/og-image.png in browser
   - Should return actual image, not 404
   - If 404: File isn't deployed

3. **If not deployed:**
   ```bash
   # Ensure file is committed
   git add public/images/og-image.png
   git commit -m "fix: ensure og-image.png is deployed"
   git push

   # Deploy to Vercel manually (GitHub integration NOT used)
   # Option A: Vercel CLI deployment: vercel --prod
   # Option B: Manual redeploy from Vercel dashboard
   ```

4. **After deploying, verify:**
   ```bash
   curl -sI https://www.myprivatetutoronline.com/images/og-image.png
   # Should return HTTP 200
   ```

**Expected Result**: og-image.png returns HTTP 200 and displays correctly

---

### SOLUTION 2: Fix Logo Dimension Metadata (CRITICAL)

**The Problem**: Declared dimensions (400x100) don't match actual dimensions (2918x1667).

**Options**:

#### Option A: Update Metadata to Correct Dimensions (RECOMMENDED)

**File**: `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx`

**Current (lines 93-99)**:
```typescript
{
  url: '/images/logos/logo-with-name.png',
  width: 400,    // ← WRONG
  height: 100,   // ← WRONG
  alt: 'My Private Tutor Online Logo',
  type: 'image/png',
}
```

**Change to**:
```typescript
{
  url: '/images/logos/logo-with-name.png',
  width: 2918,   // ← CORRECT
  height: 1667,  // ← CORRECT
  alt: 'My Private Tutor Online Logo',
  type: 'image/png',
}
```

**Why This Works**: Social platforms will calculate correct aspect ratio and cache properly.

#### Option B: Create Properly-Sized Logo Image

Create a new image file: `logo-og-image.png` with exact dimensions 1200x630 or 1200x1200.

Then update metadata:
```typescript
{
  url: '/images/logos/logo-og-image.png',
  width: 1200,
  height: 630,
  alt: 'My Private Tutor Online Logo',
  type: 'image/png',
}
```

**Recommendation**: Use Option A (fix metadata) as it's faster. Logo is already correct size, just metadata is wrong.

---

### SOLUTION 3: Add Logo to Twitter Card Array (HIGH PRIORITY)

**The Problem**: Logo not in twitter.images array, only in openGraph.images array.

**File**: `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx`

**Current (lines 121-126)**:
```typescript
twitter: {
  card: 'summary_large_image',
  // ... other config
  images: [
    '/images/og-image.png',
    '/images/graphics/feature-royal-endorsement.jpg',
    '/images/hero/child_book_and_laptop.avif',
    '/images/graphics/feature-built-on-trust.jpeg',
    // ← LOGO MISSING
  ],
}
```

**Change to**:
```typescript
twitter: {
  card: 'summary_large_image',
  // ... other config
  images: [
    '/images/og-image.png',
    '/images/logos/logo-with-name.png',  // ← ADD HERE
    '/images/graphics/feature-royal-endorsement.jpg',
    '/images/hero/child_book_and_laptop.avif',
    '/images/graphics/feature-built-on-trust.jpeg',
  ],
}
```

**Why This Works**: Twitter crawler will now find logo in its specific image array.

---

### SOLUTION 4: Force Metadata Array (OPTIONAL - Advanced)

**The Problem**: Next.js auto-generates opengraph-image endpoint, overriding metadata array.

**Why It Happens**:
- Next.js has a special opengraph-image.tsx convention
- If found, it auto-generates og:image
- This can override manual metadata declarations

**Fix**: Check if opengraph-image.tsx exists and consider removing or updating it.

**Check**:
```bash
find src -name "*opengraph*" -o -name "*og-image*"
# If files found, may need adjustment
```

**Current Status**: No opengraph-image.tsx found in src directory (verified earlier).

**Why It's Still Overriding**: Likely because the primary og-image.png fails (404), so Next.js falls back to auto-generation.

**Solution**: Fix Solution 1 (deploy og-image.png) and this should resolve itself.

---

## IMPLEMENTATION CHECKLIST

### Immediate Actions (Do Now)

- [ ] **CRITICAL**: Verify og-image.png is deployed to production
  ```bash
  curl -sI https://www.myprivatetutoronline.com/images/og-image.png
  # Must return HTTP 200, not 404
  ```

- [ ] **CRITICAL**: Fix logo dimension metadata in layout.tsx
  - Change width from 400 to 2918
  - Change height from 100 to 1667

- [ ] **HIGH**: Add logo to twitter.images array in layout.tsx
  - Insert `/images/logos/logo-with-name.png` as 2nd item

### After Implementation

- [ ] Deploy changes to production
  ```bash
  git add src/app/layout.tsx
  git commit -m "fix: correct og-image deployment and logo metadata dimensions"
  git push
  ```

- [ ] Wait for Vercel deployment to complete (usually 2-3 minutes)

- [ ] Clear social media caches (24 hours naturally, or use debugger tools)

- [ ] Test with debugger tools:
  - [ ] Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/sharing
  - [ ] Twitter Card Validator: https://cards-dev.twitter.com/validator
  - [ ] LinkedIn Post Inspector: https://www.linkedin.com/post-inspector

- [ ] Verify actual social media posts:
  - [ ] Share link on Facebook, check preview
  - [ ] Share link on Twitter/X, check preview
  - [ ] Share link on LinkedIn, check preview

---

## TESTING VERIFICATION

### Test 1: HTTP Status Codes
```bash
# After fix, all should return HTTP 200
curl -sI https://www.myprivatetutoronline.com/images/og-image.png
curl -sI https://www.myprivatetutoronline.com/images/logos/logo-with-name.png
curl -sI https://www.myprivatetutoronline.com/images/graphics/feature-royal-endorsement.jpg
```

### Test 2: Metadata Verification
```bash
curl -s https://www.myprivatetutoronline.com | grep -A 5 "og:image"
# Should show corrected width and height values
```

### Test 3: Social Media Debuggers
- Facebook: Shows logo with correct dimensions
- Twitter: Shows logo in card preview
- LinkedIn: Shows logo in post preview

### Test 4: Live Social Posts
1. Post link to Facebook
   - Wait 5-10 seconds
   - Logo should appear in preview

2. Post link to Twitter
   - Tweet the URL
   - Card should show with logo

3. Post link to LinkedIn
   - Share article
   - Preview should include logo

---

## ROOT CAUSE SUMMARY

| Issue | Root Cause | Impact | Fix |
|-------|-----------|--------|-----|
| og-image.png 404 | File not deployed to Vercel | Primary image fails, Next.js auto-generates fallback | Verify deployment, redeploy if needed |
| Logo dimensions wrong | Metadata declares 400x100 but file is 2918x1667 | Social platforms calculate wrong aspect ratio | Update metadata to 2918x1667 |
| Logo missing from Twitter | Not in twitter.images array | Twitter won't find logo in its specific array | Add `/images/logos/logo-with-name.png` to twitter.images |
| Auto-generated endpoint shows | Primary og-image fails, triggering fallback | Social platforms use fallback instead of logo | Fix og-image.png deployment |

---

## PREVENTION RECOMMENDATIONS

1. **Add image validation to build process**
   - Verify all og:image URLs return HTTP 200
   - Check image dimensions match metadata
   - Validate minimum size requirements (1200x630)

2. **Document image specifications**
   - Create `IMAGES_SPEC.md` with platform requirements
   - List all OG images with correct dimensions
   - Include aspect ratio requirements

3. **Automated social media testing**
   - Add e2e test checking og:image HTTP status
   - Validate metadata dimensions match actual file dimensions
   - Test with social media debugger APIs

4. **Deploy verification checklist**
   - Confirm all static images deployed to production
   - Run social media debuggers before going live
   - Cache-bust social media caches after deploy

5. **Caching strategy**
   - Social platforms cache OG images for 24+ hours
   - Use debuggers to force refresh when testing
   - Document cache-busting procedures for team

---

## FILES AFFECTED

**Primary Configuration File**:
- `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx`
  - Lines 78-114: openGraph.images array
  - Lines 116-129: twitter.images array

**Static Image Files**:
- `/home/jack/Documents/my_private_tutor_online/public/images/og-image.png` (77K)
- `/home/jack/Documents/my_private_tutor_online/public/images/logos/logo-with-name.png` (2918x1667)

**Deployment Verification**:
- Vercel dashboard: Check deployment logs
- Production URL: https://www.myprivatetutoronline.com

---

## NEXT STEPS

1. **Right now**: Verify og-image.png deployment status
2. **Next**: Fix metadata dimensions in layout.tsx
3. **Then**: Add logo to twitter.images array
4. **After deploy**: Test with social media debuggers
5. **Finally**: Verify with live social media posts

All fixes are low-risk, configuration-only changes. No code logic changes needed.
