# Social Sharing Image - Implementation Guide for Developers
## Step-by-Step Integration into Next.js Application

**Document Date**: October 30, 2025
**Target Audience**: Frontend/Full-stack developers
**Time Estimate**: 30-45 minutes total
**Status**: Ready for implementation

---

## Quick Start Checklist

```
Phase 1: Preparation (5 mins)
  [ ] Receive design files from design team
  [ ] Verify image: 1200×630px JPEG
  [ ] Check file size: 180-220 KB

Phase 2: File Setup (5 mins)
  [ ] Copy image to /public/images/graphics/
  [ ] Verify file permissions (readable by web server)
  [ ] Commit to git (tracked in repository)

Phase 3: Code Update (15 mins)
  [ ] Update src/app/layout.tsx metadata
  [ ] Verify TypeScript compilation
  [ ] Test locally

Phase 4: Validation (15 mins)
  [ ] Test with social platform debuggers
  [ ] Verify all meta tags present in HTML
  [ ] Measure page load performance

Phase 5: Deployment (5 mins)
  [ ] Push to production
  [ ] Monitor social sharing
  [ ] Track engagement metrics
```

---

## PHASE 1: PREPARATION

### 1.1 Receiving Design Files

**Expected Deliverables from Design Team**:
1. Main image file: `og-image-social-sharing.jpg` (1200×630px)
2. Design source file (PSD/XD/Figma link) for future edits
3. Design specifications document (already created)
4. Approved colour palette and font list

### 1.2 Pre-Integration Verification

**Checklist** (verify before proceeding):

```bash
# Verify image dimensions
identify /path/to/og-image-social-sharing.jpg
# Expected output: ...1200x630...

# Verify file size
ls -lh /path/to/og-image-social-sharing.jpg
# Expected output: 180-220 KB

# Verify file is valid JPEG
file /path/to/og-image-social-sharing.jpg
# Expected output: JPEG image data...

# Verify no corruption
jpeginfo /path/to/og-image-social-sharing.jpg
# Expected output: OK (if jpeginfo installed)
```

---

## PHASE 2: FILE SETUP

### 2.1 File Placement

**Destination Directory**: `/public/images/graphics/`

**Commands**:
```bash
# Copy design file to correct location
cp ~/Downloads/og-image-social-sharing.jpg \
   /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg

# Verify file exists and is readable
ls -l /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg
# Output should show: -rw-r--r-- jack jack 200K ...
```

### 2.2 File Permissions

**Ensure Proper Permissions**:
```bash
# Make file readable by all (required for web server)
chmod 644 /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg

# Verify permissions (should show rw-r--r--)
ls -l /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg
```

### 2.3 Git Tracking

**Commit File to Repository**:

```bash
# Navigate to project root
cd /home/jack/Documents/my_private_tutor_online

# Add image to staging
git add public/images/graphics/og-image-social-sharing.jpg

# Verify file is staged
git status
# Output should show: "new file: public/images/graphics/og-image-social-sharing.jpg"

# Commit with descriptive message
git commit -m "feat: add optimised social sharing image for Facebook/LinkedIn/Twitter previews

- New 1200x630px Open Graph image with landscape logo and credentials
- Displays: specialists, Tatler featured, School Guide recommended, Royal endorsement
- Optimised for social media link previews across all major platforms
- JPEG 85% quality, ~200KB file size
- Maintains royal client quality and brand aesthetic"
```

---

## PHASE 3: CODE UPDATE

### 3.1 Update layout.tsx Metadata

**File to Update**: `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx`

**Current Implementation** (lines 70-108):

```typescript
openGraph: {
	type: 'website',
	locale: 'en_GB',
	url: 'https://myprivatetutoronline.com',
	siteName: 'My Private Tutor Online',
	title: 'My Private Tutor Online | Premium Academic Tutoring Services',
	description:
		'Premium private tutoring with royal endorsements. 15+ years experience in Oxbridge prep, 11+ entry, GCSE & A-levels. Featured in Tatler Address Book.',
	images: [
		{
			url: '/images/graphics/feature-royal-endorsement.jpg',  // OLD PRIMARY
			width: 1200,
			height: 630,
			alt: 'My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements',
			type: 'image/jpeg',
		},
		// ... rest of images
	],
},
```

**Required Changes**:

1. **Move new image to first position** (primary OG image)
2. **Update first image URL** from `feature-royal-endorsement.jpg` to `og-image-social-sharing.jpg`
3. **Update alt text** with full credential description

**Updated Implementation**:

```typescript
openGraph: {
	type: 'website',
	locale: 'en_GB',
	url: 'https://myprivatetutoronline.com',
	siteName: 'My Private Tutor Online',
	title: 'My Private Tutor Online | Premium Academic Tutoring Services',
	description:
		'Premium private tutoring with royal endorsements. 15+ years experience in Oxbridge prep, 11+ entry, GCSE & A-levels. Featured in Tatler Address Book.',
	images: [
		{
			url: '/images/graphics/og-image-social-sharing.jpg',  // NEW PRIMARY
			width: 1200,
			height: 630,
			alt: 'My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements. Specialist support from tutors and officials examiners, featured in Tatler, recommended by School Guide UK, trusted by royalty.',
			type: 'image/jpeg',
		},
		{
			url: '/images/graphics/feature-royal-endorsement.jpg',  // MOVED TO SECONDARY
			width: 1200,
			height: 630,
			alt: 'My Private Tutor Online - Premium Academic Tutoring',
			type: 'image/jpeg',
		},
		{
			url: '/images/logos/logo-with-name.png',
			width: 400,
			height: 100,
			alt: 'My Private Tutor Online Logo',
			type: 'image/png',
		},
		{
			url: '/images/hero/child_book_and_laptop.avif',
			width: 800,
			height: 600,
			alt: 'Premium Tutoring - Child Learning with Expert Support',
			type: 'image/avif',
		},
		{
			url: '/images/graphics/feature-built-on-trust.jpeg',
			width: 800,
			height: 600,
			alt: 'Trusted by Elite Families - 15+ Years of Premium Tutoring Excellence',
			type: 'image/jpeg',
		},
	],
},
```

### 3.2 Update Twitter Card (Optional but Recommended)

**File to Update**: `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx` (lines 109-121)

**Current Implementation**:
```typescript
twitter: {
	card: 'summary_large_image',
	title: 'My Private Tutor Online | Premium Academic Tutoring',
	description:
		'Royal family endorsed private tutoring. Oxbridge preparation, 11+ entry, GCSE & A-levels. 15+ years experience.',
	images: [
		'/images/graphics/feature-royal-endorsement.jpg',  // OLD PRIMARY
		'/images/graphics/feature-built-on-trust.jpeg',
		'/images/hero/child_book_and_laptop.avif',
	],
	creator: '@MyPrivateTutorUK',
	site: '@MyPrivateTutorUK',
},
```

**Updated Implementation**:
```typescript
twitter: {
	card: 'summary_large_image',
	title: 'My Private Tutor Online | Premium Academic Tutoring',
	description:
		'Royal family endorsed private tutoring. Oxbridge preparation, 11+ entry, GCSE & A-levels. 15+ years experience.',
	images: [
		'/images/graphics/og-image-social-sharing.jpg',  // NEW PRIMARY
		'/images/graphics/feature-royal-endorsement.jpg',  // SECONDARY
		'/images/graphics/feature-built-on-trust.jpeg',
		'/images/hero/child_book_and_laptop.avif',
	],
	creator: '@MyPrivateTutorUK',
	site: '@MyPrivateTutorUK',
},
```

### 3.3 Complete Updated Code (Copy-Paste Ready)

**Full layout.tsx openGraph + twitter sections**:

```typescript
openGraph: {
	type: 'website',
	locale: 'en_GB',
	url: 'https://myprivatetutoronline.com',
	siteName: 'My Private Tutor Online',
	title: 'My Private Tutor Online | Premium Academic Tutoring Services',
	description:
		'Premium private tutoring with royal endorsements. 15+ years experience in Oxbridge prep, 11+ entry, GCSE & A-levels. Featured in Tatler Address Book.',
	images: [
		{
			url: '/images/graphics/og-image-social-sharing.jpg',
			width: 1200,
			height: 630,
			alt: 'My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements. Specialist support from tutors and officials examiners, featured in Tatler, recommended by School Guide UK, trusted by royalty.',
			type: 'image/jpeg',
		},
		{
			url: '/images/graphics/feature-royal-endorsement.jpg',
			width: 1200,
			height: 630,
			alt: 'My Private Tutor Online - Premium Academic Tutoring',
			type: 'image/jpeg',
		},
		{
			url: '/images/logos/logo-with-name.png',
			width: 400,
			height: 100,
			alt: 'My Private Tutor Online Logo',
			type: 'image/png',
		},
		{
			url: '/images/hero/child_book_and_laptop.avif',
			width: 800,
			height: 600,
			alt: 'Premium Tutoring - Child Learning with Expert Support',
			type: 'image/avif',
		},
		{
			url: '/images/graphics/feature-built-on-trust.jpeg',
			width: 800,
			height: 600,
			alt: 'Trusted by Elite Families - 15+ Years of Premium Tutoring Excellence',
			type: 'image/jpeg',
		},
	],
},
twitter: {
	card: 'summary_large_image',
	title: 'My Private Tutor Online | Premium Academic Tutoring',
	description:
		'Royal family endorsed private tutoring. Oxbridge preparation, 11+ entry, GCSE & A-levels. 15+ years experience.',
	images: [
		'/images/graphics/og-image-social-sharing.jpg',
		'/images/graphics/feature-royal-endorsement.jpg',
		'/images/graphics/feature-built-on-trust.jpeg',
		'/images/hero/child_book_and_laptop.avif',
	],
	creator: '@MyPrivateTutorUK',
	site: '@MyPrivateTutorUK',
},
```

---

## PHASE 3.4: LOCAL TESTING

### 3.4.1 TypeScript Compilation Check

**Verify no TypeScript errors**:
```bash
cd /home/jack/Documents/my_private_tutor_online

# Check TypeScript compilation
npm run type-check

# Expected output: "No errors found"
# If errors: review changes, ensure proper syntax
```

### 3.4.2 Build Verification

**Run production build locally**:
```bash
# Full production build
npm run build

# Expected output:
# ✓ compiled successfully
# ✓ built in X.XXs
# Routes optimized
# Build output preserved

# If build fails:
# 1. Check console error messages
# 2. Verify layout.tsx syntax (missing commas, brackets)
# 3. Verify image path correct in metadata
# 4. Revert and try again
```

### 3.4.3 Development Server Test

**Run local development server**:
```bash
# Start dev server
npm run dev

# Expected output: "Ready in X.XXs"
# Visit: http://localhost:3000
# Leave running for meta tag inspection
```

### 3.4.4 Meta Tag Verification

**In browser, verify meta tags are present**:

1. **Open browser DevTools**: Press F12 or Right-click > Inspect
2. **Go to Elements/Inspector tab**
3. **Find head section**: Press Ctrl+F, search for "og:image"
4. **Verify these meta tags are present**:

```html
<!-- Open Graph Image (Primary) -->
<meta property="og:image" content="https://myprivatetutoronline.com/images/graphics/og-image-social-sharing.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="My Private Tutor Online - Premium Academic Tutoring..." />

<!-- Open Graph (secondary fields) -->
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_GB" />
<meta property="og:url" content="https://myprivatetutoronline.com/" />
<meta property="og:site_name" content="My Private Tutor Online" />
<meta property="og:title" content="My Private Tutor Online | Premium Academic Tutoring Services" />
<meta property="og:description" content="Premium private tutoring with royal endorsements..." />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://myprivatetutoronline.com/images/graphics/og-image-social-sharing.jpg" />
<meta name="twitter:title" content="My Private Tutor Online | Premium Academic Tutoring" />
<meta name="twitter:description" content="Royal family endorsed private tutoring..." />
```

**Troubleshooting**:
- If meta tags missing: Hard refresh (Ctrl+Shift+R), clear browser cache
- If meta tags show old image: Restart dev server, clear cache again
- If TypeScript error: Check syntax in layout.tsx for commas, quotes

---

## PHASE 4: VALIDATION WITH SOCIAL PLATFORMS

### 4.1 Facebook Sharing Debugger

**Purpose**: Verify Open Graph image displays correctly in Facebook link previews

**Steps**:
1. Visit: https://developers.facebook.com/tools/debug/sharing/
2. Enter URL: `https://myprivatetutoronline.com`
3. Click "Debug" button
4. **Verify**:
   - Under "Open Graph Image", new social sharing image displays
   - Image dimensions show: 1200×630
   - Image preview shows clear, high-quality version
   - No corruption or distortion

**Expected Output**:
```
Fetched URL information

Open Graph Image
Image URL: https://myprivatetutoronline.com/images/graphics/og-image-social-sharing.jpg
Image Width: 1200
Image Height: 630
Image Type: image/jpeg

Preview shows logo + credentials clearly
```

**If Problems**:
- Old image cached: Click "Scrape Again" button
- Image URL wrong: Verify path in layout.tsx
- Image distorted: Verify 1200×630 dimensions exactly
- Image not loading: Check file exists in /public/images/graphics/

### 4.2 Twitter Card Validator

**Purpose**: Verify Twitter/X card displays correctly

**Steps**:
1. Visit: https://cards-dev.twitter.com/validator
2. Enter URL: `https://myprivatetutoronline.com`
3. **Verify**:
   - Card type: "summary_large_image"
   - Image displays in preview
   - Image aspect ratio looks correct (16:9)

**Expected Card Display**:
```
Card type: summary_large_image
Title: My Private Tutor Online | Premium Academic Tutoring
Description: Royal family endorsed private tutoring...
Image: [Shows OG image]
```

### 4.3 LinkedIn Article Inspector

**Purpose**: Verify LinkedIn sharing appearance

**Steps**:
1. Visit: https://www.linkedin.com/post-inspector/inspect/
2. Enter URL: `https://myprivatetutoronline.com`
3. **Verify**:
   - Image displays in preview
   - Title and description clear
   - No truncation or distortion

**Expected Output**:
```
Preview shows:
- Image (OG social sharing image)
- Title: My Private Tutor Online | Premium Academic Tutoring Services
- Description: Premium private tutoring with royal endorsements...
```

### 4.4 Manual Testing - Social Platforms

#### WhatsApp Link Sharing

**Test Steps**:
1. Open WhatsApp (desktop or mobile)
2. In chat, paste: `https://myprivatetutoronline.com`
3. Wait for link preview to load (~5 seconds)
4. **Verify**:
   - Thumbnail shows new OG image
   - Logo visible and clear
   - No obvious distortion
   - Preview loads reasonably fast

#### Discord Server Sharing

**Test Steps**:
1. In any Discord channel, paste: `https://myprivatetutoronline.com`
2. Wait for embed to generate
3. **Verify**:
   - Embed shows new OG image
   - Image appears in embed without cropping
   - Title and description match
   - Loads within reasonable time

#### Slack Channel Sharing

**Test Steps**:
1. In any Slack channel, paste: `https://myprivatetutoronline.com`
2. **Verify**:
   - Unfurl preview appears
   - Image displays correctly
   - No size/format issues

---

## PHASE 5: PERFORMANCE VALIDATION

### 5.1 Image Load Time Testing

**Local Testing**:
```bash
# Measure image download time
curl -w "@/tmp/curl-format.txt" -o /dev/null -s https://myprivatetutoronline.com/images/graphics/og-image-social-sharing.jpg

# Expected: Total time <1 second from CDN
```

**Online Tools** (after deployment):
- Visit: https://www.webpagetest.org/
- Enter: https://myprivatetutoronline.com
- Check image load times in waterfall chart
- Target: <1 second load time

### 5.2 Core Web Vitals Impact

**Measure with Google PageSpeed Insights**:
1. Visit: https://pagespeed.web.dev/
2. Enter: https://myprivatetutoronline.com
3. Check metrics:
   - Largest Contentful Paint (LCP): Should remain <2.5s
   - Cumulative Layout Shift (CLS): Should be <0.1
   - First Input Delay (FID): Should be <100ms
4. **Verify**: New image doesn't negatively impact metrics

### 5.3 File Size Verification

**Confirm Optimisation**:
```bash
# Check actual file size
ls -lh /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg

# Expected output:
# -rw-r--r-- 1 user user 195K ... og-image-social-sharing.jpg
# (Should be 180-220 KB range)

# If larger than 250 KB, optimise with:
jpegoptim --max=80 /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg
```

---

## PHASE 5: DEPLOYMENT

### 5.1 Pre-Deployment Checklist

```
Code Changes:
  [ ] layout.tsx updated with new image URL
  [ ] TypeScript compilation successful (npm run type-check)
  [ ] Production build successful (npm run build)
  [ ] Local development server tested (meta tags verified)

File Management:
  [ ] og-image-social-sharing.jpg placed in /public/images/graphics/
  [ ] File size 180-220 KB (optimised)
  [ ] File permissions correct (644)
  [ ] File committed to git

Validation:
  [ ] Facebook Sharing Debugger: Image displays correctly
  [ ] Twitter Card Validator: Card type and image verified
  [ ] LinkedIn Inspector: Preview renders properly
  [ ] Manual: WhatsApp, Discord, Slack sharing tested
  [ ] Performance: Page load time unaffected

Documentation:
  [ ] Commit message written with description
  [ ] Changes documented in team wiki/docs
  [ ] Design source files archived (for future updates)
```

### 5.2 Git Commit & Push

**Commit changes**:
```bash
cd /home/jack/Documents/my_private_tutor_online

# Stage layout.tsx changes
git add src/app/layout.tsx

# Verify image already staged from earlier
git status
# Should show:
#   - public/images/graphics/og-image-social-sharing.jpg (new file)
#   - src/app/layout.tsx (modified)

# Create detailed commit
git commit -m "feat: implement optimised social sharing image

- Add 1200x630px Open Graph image (og-image-social-sharing.jpg)
- Features landscape logo with client credentials
- Displays: specialist tutors, Tatler featured, School Guide recommended, Royal endorsement
- Update layout.tsx metadata: set as primary OG image
- Update Twitter card to use new image
- JPEG 85% quality, ~200KB optimised file size
- Tested with Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Inspector
- Maintains royal client quality standards and brand aesthetic

Files changed:
- public/images/graphics/og-image-social-sharing.jpg (NEW)
- src/app/layout.tsx (openGraph.images, twitter.images updated)"

# Push to main branch
git push origin main

# Verify push successful
git log --oneline -5
# Should show new commit at top
```

### 5.3 Vercel Deployment

**Manual CLI Deployment** (GitHub integration NOT used):
- Push to main branch for version control only
- Deploy manually using Vercel CLI: `vercel --prod`
- GitHub commits do NOT trigger automatic Vercel deployments

**Monitor Deployment**:
1. Visit: https://vercel.com/dashboard
2. Select project: my-private-tutor-online
3. Watch for deployment status: "Building..." → "Ready"
4. Deployment typically completes in 2-5 minutes

**Verify Production**:
1. Visit production URL: https://myprivatetutoronline.com
2. Inspect page source (Ctrl+Shift+C, then Search "og:image")
3. Verify meta tags reference `/images/graphics/og-image-social-sharing.jpg`
4. Wait ~5 minutes for CDN cache to update
5. Test with Facebook Sharing Debugger again (should show new image)

---

## PHASE 6: POST-LAUNCH MONITORING

### 6.1 Social Engagement Tracking

**Monitor Metrics**:
- Facebook Page: Check "Engagement" analytics for link shares
- Twitter/X: Monitor URL metrics in Analytics
- LinkedIn: Check Page Analytics for link clicks
- Email/Marketing: Track click-through rates from social shares

**Compare Baseline**:
- Track engagement 1 week before launch vs 1 week after
- Measure click-through rate improvement from social shares
- Note any positive/negative changes in sharing activity

### 6.2 Client Satisfaction Feedback

**Questions to Ask Client**:
- Does the social preview look professional?
- Is the credentials text clear and compelling in previews?
- Any feedback on visual design or content?
- Noticed increased engagement from social shares?

### 6.3 Future Updates

**Process for Changes**:
1. Design new version in Adobe/Canva/Figma
2. Export as JPEG, 1200×630px, 85% quality
3. Name file: `og-image-social-sharing-v2.jpg` (version tracking)
4. Replace original file with new version (or update path in layout.tsx)
5. Test with platform debuggers
6. Deploy and verify
7. Archive previous version for reference

---

## TROUBLESHOOTING GUIDE

### Issue: Build Fails After Changes

**Symptoms**:
```
npm run build → Error: ...layout.tsx...
```

**Solutions**:
1. Check for TypeScript errors:
   ```bash
   npm run type-check
   ```
2. Verify syntax: Check for missing commas, brackets, quotes
3. Verify image path exists: `/public/images/graphics/og-image-social-sharing.jpg`
4. Check file permissions: `ls -l` shows `-rw-r--r--`
5. Revert changes and try again:
   ```bash
   git diff src/app/layout.tsx  # View changes
   git checkout src/app/layout.tsx  # Revert to last version
   ```

### Issue: Old Image Still Shows in Facebook Preview

**Symptoms**:
Facebook Sharing Debugger still shows old `feature-royal-endorsement.jpg`

**Solutions**:
1. Click "Scrape Again" in Facebook debugger
2. Check 5 minutes later (cache refresh time)
3. If still showing old image:
   - Verify image URL in layout.tsx is correct
   - Verify new image file exists in /public/images/graphics/
   - Hard refresh: Ctrl+Shift+R
   - Try another debugger (LinkedIn, Twitter) to confirm new image working

### Issue: Image Not Loading (404 Error)

**Symptoms**:
Facebook/Twitter preview shows broken image icon

**Solutions**:
1. Verify file exists:
   ```bash
   ls -l /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg
   ```
2. Verify permissions:
   ```bash
   chmod 644 /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg
   ```
3. Check path in layout.tsx: Should be `/images/graphics/og-image-social-sharing.jpg` (not full path)
4. Verify image was deployed: Check file on Vercel server
5. Clear browser cache and try again

### Issue: Image Appears Distorted in Preview

**Symptoms**:
Image looks stretched, compressed, or cropped incorrectly in social preview

**Solutions**:
1. Verify image dimensions exactly 1200×630px:
   ```bash
   identify /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg
   ```
2. Re-export image from design tool if dimensions incorrect
3. For cropping issues: Different platforms crop differently (acceptable)
4. Test on multiple platforms to confirm (Facebook, Twitter, LinkedIn)

### Issue: Meta Tags Not Updating

**Symptoms**:
HTML source still shows old meta tags after deployment

**Solutions**:
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache completely
3. Open in incognito/private window (no cache)
4. Verify deployment completed (check Vercel dashboard)
5. Try different debugger (Facebook, Twitter, LinkedIn)

### Issue: File Size Too Large (>400 KB)

**Symptoms**:
Image loads slowly in social previews, impacts Core Web Vitals

**Solutions**:
1. Optimize with jpegoptim:
   ```bash
   jpegoptim --max=80 /home/jack/Documents/my_private_tutor_online/public/images/graphics/og-image-social-sharing.jpg
   ```
2. Re-export from design tool at lower quality (80% instead of 85%)
3. Simplify design if possible (fewer colours, less detail)
4. Use ImageMagick to re-compress:
   ```bash
   convert input.jpg -quality 80 output.jpg
   ```
5. Target 180-220 KB; acceptable range up to 300 KB

---

## ROLLBACK PLAN

**If Anything Goes Wrong**:

```bash
# Option 1: Revert metadata changes only
git checkout src/app/layout.tsx
npm run build
npm run dev
# This reverts to old OG image (feature-royal-endorsement.jpg)

# Option 2: Complete rollback
git revert HEAD~1  # Undo last commit
git push origin main
# Then manually deploy: vercel --prod

# Option 3: Keep changes but disable new image
# Edit layout.tsx: Move og-image-social-sharing.jpg to secondary position
# Move feature-royal-endorsement.jpg back to first position
git add src/app/layout.tsx
git commit -m "fix: revert primary OG image to feature-royal-endorsement.jpg"
git push origin main
```

---

## SUCCESS CRITERIA

✓ Implementation successful when:

```
[ ] Image file exists: /public/images/graphics/og-image-social-sharing.jpg
[ ] File size: 180-220 KB (optimised)
[ ] layout.tsx: openGraph.images[0].url = '/images/graphics/og-image-social-sharing.jpg'
[ ] layout.tsx: twitter.images[0] = '/images/graphics/og-image-social-sharing.jpg'
[ ] npm run build: Succeeds without errors
[ ] npm run type-check: "No errors found"
[ ] Meta tags: og:image, og:image:width, og:image:height, og:image:alt all present
[ ] Facebook Debugger: Shows new image in preview
[ ] Twitter Validator: Shows summary_large_image card with new image
[ ] LinkedIn Inspector: Shows new image in preview
[ ] Manual WhatsApp test: Thumbnail displays new image
[ ] Manual Discord test: Embed shows new image
[ ] Page load time: No degradation in Core Web Vitals
[ ] Vercel deployment: Production site shows new image
[ ] Client approval: Confirms appearance meets expectations
```

---

## Quick Reference Commands

**One-line test sequence** (after changes):

```bash
# Navigate to project
cd /home/jack/Documents/my_private_tutor_online

# Verify TypeScript
npm run type-check && echo "✓ TypeScript OK"

# Build for production
npm run build && echo "✓ Build OK"

# Start dev server
npm run dev
# (Keep running, open http://localhost:3000 in browser)

# In another terminal, verify image file
ls -lh public/images/graphics/og-image-social-sharing.jpg && echo "✓ Image exists"

# Verify deployment (after pushing to main)
# Visit https://myprivatetutoronline.com and inspect source
# Search for og:image to verify meta tags
```

---

**Document Status**: Ready for Implementation
**Last Updated**: October 30, 2025
**Questions**: Refer to SOCIAL_SHARING_IMAGE_SPECIFICATION.md or SOCIAL_OG_DESIGN_VISUAL_GUIDE.md
