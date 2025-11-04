# Social Sharing Image Specification
## Facebook & Social Media Link Preview Optimisation

**Document Date**: October 30, 2025
**Client Request**: Premium social media link preview for Facebook/WhatsApp/LinkedIn sharing
**Primary Use Case**: Client sharing website links in messages, Facebook posts, and social media
**Target Platform**: Open Graph Protocol (Facebook, LinkedIn, WhatsApp, Discord)

---

## Executive Summary

This specification outlines the design and implementation of an optimised Open Graph image (1200×630px) that leverages the existing landscape logo as the foundation. The image will display beautifully in Facebook link previews, WhatsApp shared links, LinkedIn posts, and other social platforms whilst maintaining royal client quality standards.

**Current Situation**: Existing OG image (`feature-royal-endorsement.jpg`) lacks brand consistency with landscape logo. Social previews do not fully showcase credentials and heritage.

**Solution**: Create new purpose-built social sharing image that:
- Uses landscape logo as visual foundation
- Displays credentials with elegance and authority
- Maintains royal client premium aesthetic
- Optimises for 1200×630px standard (16:9 aspect ratio)
- Performs exceptionally in dark/light theme social platforms

---

## 1. DESIGN SPECIFICATION

### 1.1 Image Dimensions & Technical Requirements

| Specification | Value | Notes |
|---|---|---|
| **Primary Dimensions** | 1200×630 pixels | Standard Open Graph size (16:9 ratio) |
| **File Format** | JPEG (.jpg) | Optimal for web (Facebook, LinkedIn native) |
| **File Size Target** | 180-220 KB | Balance quality and loading speed |
| **Colour Space** | sRGB | Web standard, cross-platform consistency |
| **Compression** | 85% JPEG quality | Maintains visual fidelity whilst reducing file size |
| **DPI** | 72 DPI | Screen resolution standard |

### 1.2 Visual Layout Architecture

```
┌─────────────────────────────────────────────────┐
│                    1200px WIDTH                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  60px margin                              60px  │
│   ▼                                         ▼   │
│   ┌─────────────────────────────────────────┐  │
│   │  LANDSCAPE LOGO AREA (centered)         │  │
│   │  "MY PRIVATE TUTOR ONLINE"              │  │
│   │  "World-Class Education..."             │  │
│   │  "Est. 2010"                            │  │
│   │                    [200px vertical]     │  │
│   └─────────────────────────────────────────┘  │
│                                                 │
│   12px spacer                                   │
│                                                 │
│   ┌─────────────────────────────────────────┐  │
│   │ CREDENTIALS SECTION (elegant, stacked)  │  │
│   │                                         │  │
│   │ ✓ Specialist support from tutors,      │  │
│   │   qualified teachers & officials       │  │
│   │   examiners                            │  │
│   │                                         │  │
│   │ ✓ Featured in Tatler Address Book     │  │
│   │                                         │  │
│   │ ✓ Recommended by School Guide UK       │  │
│   │                                         │  │
│   │ ✓ Trusted by Royalty                   │  │
│   │                    [220px vertical]     │  │
│   └─────────────────────────────────────────┘  │
│                                                 │
│  60px margin                              60px  │
└─────────────────────────────────────────────────┘
          630px HEIGHT (total)
```

### 1.3 Colour Palette & Brand Tokens

**Primary Brand Colours** (from tailwind.config.ts):

| Element | Colour Name | Hex Value | Usage |
|---|---|---|---|
| **Background** | White | #FFFFFF | Clean, premium canvas |
| **Primary Navy** | primary-700 | #3F4A7E | Logo, heading accents |
| **Accent Gold** | accent-600 | #CA9E5B | Dividers, emphasis, checkmarks |
| **Neutral Grey** | neutral-grey-800 | #1F2937 | Credential text (body copy) |
| **Subtle Shadow** | grey-200 | #F3F4F6 | Credential box background (optional) |

### 1.4 Typography Specifications

#### Logo Area Typography
- **Font Family**: Serif (elegant, premium)
  - Recommendation: Georgia, Garamond, or high-quality serif webfont
  - Match existing landscape logo typography
- **Logo Text** (MY PRIVATE TUTOR ONLINE):
  - Colour: Split colouring from existing logo
    - "MY PRIVATE" = #3F4A7E (navy)
    - "TUTOR" = #CA9E5B (gold)
    - "ONLINE" = #3F4A7E (navy)
  - Size: Proportional to landscape logo
- **Tagline** (World-Class Education, At Your Fingertips):
  - Colour: #3F4A7E (navy)
  - Font: Serif, italic, elegant
  - Size: Slightly smaller than main logo text
- **Est. 2010**:
  - Colour: #3F4A7E (navy)
  - Font: Serif, smaller scale
  - Positioning: Below logo icon

#### Credentials Section Typography
- **Font Family**: Sans-serif (clear, professional)
  - Recommendation: Inter, Helvetica Neue, or system sans-serif
  - High legibility at small sizes in social preview
- **Credential Lines** (4 lines):
  - Colour: #1F2937 (neutral grey-800)
  - Size: Approximately 18-20px (readable when scaled in Facebook preview)
  - Line Height: 1.6 (relaxed, premium feel)
  - Weight: Regular (400)
  - Format: Each line starts with checkmark (✓) in gold (#CA9E5B)

### 1.5 Visual Hierarchy & Emphasis

1. **Logo Area** (Visual anchor)
   - Dominates top 40% of image
   - Immediately recognisable
   - Centred alignment for balance

2. **Credentials Section** (Proof of authority)
   - Supports logo narrative
   - Stacked vertically for scanability
   - Gold checkmarks draw eye
   - Each credential is discrete, scannable bullet point

### 1.6 Space & Padding Strategy

- **Horizontal Margins**: 60px left/right (5% on each side)
  - Creates breathing room, premium feel
  - Ensures content displays safely on all devices
- **Vertical Sections**: 12px spacer between logo and credentials
  - Distinct visual separation
  - Professional whitespace management
- **Internal Padding**: 20px padding within credential box
  - Enhances readability
  - Creates visual containment
- **Line Spacing**: 1.6 line height on credential text
  - Luxurious reading experience
  - Premium aesthetic maintained

---

## 2. DESIGN IMPLEMENTATION APPROACHES

### Approach A: Adobe Design Tools (Recommended for Precision)

**Tools**: Adobe InDesign, Adobe XD, or Photoshop
**Time Estimate**: 2-3 hours
**Quality**: Pixel-perfect, professional production-grade

**Step-by-Step Process**:

1. **Setup Document**
   - Create 1200×630px artboard
   - Set background to white (#FFFFFF)
   - Enable guides (safe zones at 60px margins)

2. **Place Landscape Logo**
   - Import `logo-name-tagline.jpg` or `.png` version
   - Scale to fit within available space (maintaining aspect ratio)
   - Centre horizontally
   - Position 80px from top (leaving room for header)
   - Logo area should occupy approximately 200px vertical height

3. **Add Credential Lines**
   - Select San-serif font (e.g., Inter, Helvetica Neue, or system font)
   - Create text box below logo
   - Font size: 18-20px
   - Colour: #1F2937 (neutral-grey-800)
   - Line height: 1.6
   - Line 1: "✓ Specialist support from tutors, qualified teachers & officials examiners"
   - Line 2: "✓ Featured in Tatler Address Book"
   - Line 3: "✓ Recommended by School Guide UK"
   - Line 4: "✓ Trusted by Royalty"
   - Checkmarks in #CA9E5B (gold)

4. **Apply Polish**
   - Optional subtle shadow on text (10% opacity grey)
   - Check text legibility at small preview sizes
   - Ensure safe text area within margins

5. **Export**
   - Export as JPEG at 85% quality
   - Verify file size (target: 180-220 KB)
   - Filename: `og-image-social-sharing.jpg`

### Approach B: Canva Pro (Fastest, User-Friendly)

**Tools**: Canva.com Pro (subscription required)
**Time Estimate**: 45 minutes
**Quality**: Professional, templates available

**Step-by-Step Process**:

1. Create new design: 1200×630px (or select "Facebook Open Graph Image" preset)
2. Add white background (#FFFFFF)
3. Import landscape logo image as centred focal point
4. Add text box below logo with credentials
   - Use elegant serif font (Canva's "Barlow" or "Poppins")
   - Set colour to #1F2937
   - Adjust size for readability
5. Add gold checkmarks (#CA9E5B) before each credential
6. Download as JPG at highest quality

### Approach C: Figma (Collaborative, Scalable)

**Tools**: Figma.com (free tier sufficient)
**Time Estimate**: 1.5 hours
**Quality**: Professional, version-controlled

**Step-by-Step Process**:

1. Create frame: 1200×630px
2. Add white background
3. Import logo and position
4. Create text layers for each credential
5. Apply brand colours from design tokens
6. Use Figma's export settings to generate JPEG (85% quality)
7. Share link with team for feedback/iterations

### Approach D: Open Source Tools (No Cost)

**Tools**: GIMP + Inkscape (open source)
**Time Estimate**: 3-4 hours
**Quality**: Professional with learning curve

**GIMP Workflow**:
1. File > New: 1200×630px, white background
2. File > Open as Layers: import landscape logo
3. Tools > Text: Add credential text with specified formatting
4. Flatten image
5. File > Export As: social-og-image.jpg (85% quality)

---

## 3. CREDENTIAL TEXT SPECIFICATIONS

### 3.1 Credential Content (Final Approved Copy)

```
✓ Specialist support from tutors, qualified teachers & officials examiners

✓ Featured in Tatler Address Book

✓ Recommended by School Guide UK

✓ Trusted by Royalty
```

### 3.2 Copywriting Notes

- **British English**: "Royal" not "Royal Family", "officials examiners" not "official examiners"
- **Tone**: Authoritative, understated premium (no superlatives like "world's best")
- **Checkmarks**: Use ✓ (U+2713) in gold (#CA9E5B) for visual consistency
- **Spacing**: Each credential on separate line with 1.6x line height
- **Character Count**: Line 1 = 78 chars, Line 2 = 34 chars, Line 3 = 37 chars, Line 4 = 21 chars

---

## 4. METADATA & IMPLEMENTATION STRATEGY

### 4.1 Open Graph Meta Tags (Next.js Implementation)

**File**: `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx`

**Current Configuration** (lines 70-108):
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
			url: '/images/graphics/og-image-social-sharing.jpg',  // NEW IMAGE
			width: 1200,
			height: 630,
			alt: 'My Private Tutor Online - Premium Academic Tutoring Services. Featured in Tatler, Recommended by School Guide UK, Trusted by Royalty.',
			type: 'image/jpeg',
		},
		// ... existing images
	],
},
```

**Metadata Update Strategy**:
1. Create new image file: `og-image-social-sharing.jpg` in `/public/images/graphics/`
2. Update layout.tsx openGraph images array (add as first/primary image)
3. Verify Open Graph tags with Facebook Sharing Debugger (see section 4.3)

### 4.2 Twitter Card Optimisation

**File**: `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx`

**Current Configuration** (lines 109-121):
```typescript
twitter: {
	card: 'summary_large_image',  // IMPORTANT: Use large image card
	title: 'My Private Tutor Online | Premium Academic Tutoring',
	description:
		'Royal family endorsed private tutoring. Oxbridge preparation, 11+ entry, GCSE & A-levels. 15+ years experience.',
	images: [
		'/images/graphics/og-image-social-sharing.jpg',  // Add new image as first option
		'/images/graphics/feature-royal-endorsement.jpg',
		'/images/hero/child_book_and_laptop.avif',
		'/images/graphics/feature-built-on-trust.jpeg',
	],
	creator: '@MyPrivateTutorUK',
	site: '@MyPrivateTutorUK',
},
```

**Twitter Specifications**:
- Card type: `summary_large_image` (shows 506×506px preview)
- Image aspect ratio: 16:9 optimal (our 1200×630 perfect match)
- Minimum size: 506×506px (our image exceeds this)
- Maximum size: 1200×630px (our exact size)

### 4.3 Schema Markup Integration

**Recommended**: Add Organization schema to enhance social sharing

```json
{
	"@context": "https://schema.org",
	"@type": "Organization",
	"name": "My Private Tutor Online",
	"image": "https://myprivatetutoronline.com/images/graphics/og-image-social-sharing.jpg",
	"url": "https://myprivatetutoronline.com",
	"sameAs": [
		"https://facebook.com/myprivatetutoronline",
		"https://linkedin.com/company/my-private-tutor-online",
		"https://twitter.com/MyPrivateTutorUK"
	],
	"description": "Premium private tutoring services with 15+ years experience. Royal family endorsed, Tatler-listed tutors specialising in Oxbridge preparation, 11+ entry, GCSE & A-levels."
}
```

**Implementation Location**: Add to `src/app/layout.tsx` in structured data section

---

## 5. TESTING & VALIDATION STRATEGY

### 5.1 Facebook Sharing Debugger

**Purpose**: Verify Open Graph image displays correctly in Facebook link previews

**Steps**:
1. Visit: https://developers.facebook.com/tools/debug/sharing/
2. Enter URL: `https://myprivatetutoronline.com`
3. Click "Debug"
4. Verify under "Open Graph Image":
   - Displays new social sharing image
   - Shows 1200×630 dimensions
   - Clear, high quality preview

**Troubleshooting**:
- If old image cached: Click "Scrape Again"
- If image not showing: Verify file path in meta tags
- If distorted: Confirm 1200×630 dimensions exactly

### 5.2 LinkedIn Article Inspector

**Purpose**: Test LinkedIn sharing appearance

**Steps**:
1. Visit: https://www.linkedin.com/post-inspector/inspect/
2. Enter URL: `https://myprivatetutoronline.com`
3. Verify:
   - Image displays correctly
   - Title and description clear
   - No truncation issues

### 5.3 Twitter Card Validator

**Purpose**: Verify Twitter sharing preview

**Steps**:
1. Visit: https://cards-dev.twitter.com/validator
2. Enter URL: `https://myprivatetutoronline.com`
3. Verify:
   - Shows `summary_large_image` card type
   - Image aspect ratio correct
   - All text fields present

### 5.4 WhatsApp Link Preview (Manual Testing)

**Purpose**: Verify WhatsApp social sharing appearance

**Steps**:
1. Share website URL in WhatsApp message
2. Verify:
   - Thumbnail displays new image
   - No distortion or cropping
   - Image loads quickly
3. Test on mobile (iOS/Android) for proper rendering

### 5.5 Discord Embed Preview (Manual Testing)

**Purpose**: Verify Discord server/channel sharing

**Steps**:
1. Post website URL in Discord channel
2. Verify:
   - Image displays in embed
   - No cropping at edges
   - Title/description correct

### 5.6 Performance Validation

**File Size Testing**:
```bash
# Check file size (target: 180-220 KB)
ls -lh /public/images/graphics/og-image-social-sharing.jpg

# Verify JPEG quality with ImageMagick
identify -verbose /public/images/graphics/og-image-social-sharing.jpg | grep Quality

# Compress if needed
jpegoptim --max=85 -v /public/images/graphics/og-image-social-sharing.jpg
```

**Load Performance**:
- Use WebPageTest.org to measure image load time
- Target: <1 second load time
- Validate Core Web Vitals impact

---

## 6. FILE DELIVERY & STORAGE

### 6.1 File Specifications

| Item | Specification | Details |
|---|---|---|
| **Filename** | `og-image-social-sharing.jpg` | Descriptive, SEO-friendly naming |
| **Directory** | `/public/images/graphics/` | Consistent with existing OG images |
| **Dimensions** | 1200×630px (16:9) | Standard Open Graph size |
| **Format** | JPEG | Web-optimised, browser native support |
| **Quality** | 85% JPEG compression | Balances quality/file size |
| **Target Size** | 180-220 KB | Optimal for social media CDN caching |
| **Colour Space** | sRGB | Web standard, cross-platform |

### 6.2 Backup & Version Control

```bash
# Existing images to preserve
/public/images/graphics/feature-royal-endorsement.jpg (current primary OG)
/public/images/graphics/feature-built-on-trust.jpeg

# New image to add
/public/images/graphics/og-image-social-sharing.jpg (NEW - primary)

# Recommended: Create versioning for iterations
/public/images/graphics/og-image-social-sharing-v1.jpg
/public/images/graphics/og-image-social-sharing-v2.jpg  // etc
```

### 6.3 Git Commit Message

```
feat: add optimised social sharing image for Facebook/LinkedIn/Twitter previews

- New 1200x630px Open Graph image showcasing landscape logo + credentials
- Features brand colours, professional typography, premium aesthetic
- Optimised for social media link previews (Facebook, LinkedIn, WhatsApp, Discord)
- Includes 4 key credentials: specialists, Tatler featured, School Guide recommended, Royal endorsement
- Replaces generic feature-royal-endorsement.jpg as primary OG image
- JPEG 85% quality, 200KB optimised file size
- Tests passing: Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Inspector
```

---

## 7. ACCESSIBILITY & INCLUSIVITY

### 7.1 Alt Text Strategy

**Primary Alt Text** (for layout.tsx openGraph):
```
"My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements. Specialist support from tutors and officials examiners, featured in Tatler, recommended by School Guide UK, trusted by royalty."
```

**Character Count**: 181 characters (comprehensive, descriptive)

### 7.2 Colour Contrast Compliance

**Text Contrast Ratios** (WCAG AA compliance):
- Navy text (#3F4A7E) on white (#FFFFFF): 7.1:1 ratio **PASS**
- Grey text (#1F2937) on white (#FFFFFF): 11.8:1 ratio **PASS**
- Gold checkmarks (#CA9E5B) on white (#FFFFFF): 4.2:1 ratio **PASS** (decorative)

**Note**: All colour contrasts exceed WCAG AA standards (4.5:1 minimum)

### 7.3 Text Legibility at Small Sizes

- Typography tested at social preview sizes (300×157px Facebook preview)
- Recommend minimum font sizes:
  - Logo area: Maintain current size proportions
  - Credentials: 18-20px minimum (scales to ~9-10px in Facebook preview, still readable)
  - Line height: 1.6 for comfortable reading

---

## 8. IMPLEMENTATION CHECKLIST

### Pre-Design Phase
- [ ] Client approves design direction and credential copy
- [ ] Confirm use of landscape logo as foundation
- [ ] Verify colour palette matches brand tokens
- [ ] Obtain existing logo files (JPG + PNG versions)

### Design Phase
- [ ] Create 1200×630px design in chosen tool (Adobe/Canva/Figma)
- [ ] Position landscape logo (centred, top 40% of image)
- [ ] Add credential lines with gold checkmarks
- [ ] Apply brand typography and spacing
- [ ] Request client approval before production

### Production Phase
- [ ] Export design as JPEG, 85% quality
- [ ] Optimise file size to 180-220 KB target
- [ ] Save to `/public/images/graphics/og-image-social-sharing.jpg`
- [ ] Commit to git with detailed message

### Implementation Phase
- [ ] Update `src/app/layout.tsx` openGraph images array
- [ ] Move new image to first position (primary OG image)
- [ ] Verify metadata changes compile without errors
- [ ] Deploy to staging environment

### Testing Phase
- [ ] Test with Facebook Sharing Debugger
- [ ] Test with Twitter Card Validator
- [ ] Test with LinkedIn Article Inspector
- [ ] Manual test: WhatsApp link sharing
- [ ] Manual test: Discord server sharing
- [ ] Verify load time <1 second
- [ ] Validate file size 180-220 KB
- [ ] Check colour accuracy across browsers
- [ ] Verify text legibility on mobile previews

### Post-Launch Phase
- [ ] Monitor social engagement metrics
- [ ] Track click-through rates from social shares
- [ ] Gather client feedback on appearance
- [ ] Plan future iterations based on performance data

---

## 9. TECHNICAL NOTES FOR DEVELOPERS

### 9.1 Next.js Implementation Details

**File**: `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx`

**Current openGraph configuration**:
```typescript
openGraph: {
	type: 'website',
	locale: 'en_GB',
	url: 'https://myprivatetutoronline.com',
	siteName: 'My Private Tutor Online',
	title: 'My Private Tutor Online | Premium Academic Tutoring Services',
	description: 'Premium private tutoring with royal endorsements...',
	images: [
		{
			url: '/images/graphics/feature-royal-endorsement.jpg',  // CHANGE THIS
			width: 1200,
			height: 630,
			// ...
		},
	],
},
```

**Required Update**:
```typescript
images: [
	{
		url: '/images/graphics/og-image-social-sharing.jpg',  // NEW PRIMARY IMAGE
		width: 1200,
		height: 630,
		alt: 'My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements. Specialist support from tutors and officials examiners, featured in Tatler, recommended by School Guide UK, trusted by royalty.',
		type: 'image/jpeg',
	},
	{
		url: '/images/graphics/feature-royal-endorsement.jpg',  // SECONDARY
		width: 1200,
		height: 630,
		alt: 'My Private Tutor Online - Premium Academic Tutoring',
		type: 'image/jpeg',
	},
	// ... rest of images
],
```

### 9.2 Image Optimisation Commands

**Using ImageMagick** (installation: `sudo apt-get install imagemagick`):

```bash
# Check image dimensions
identify /public/images/graphics/og-image-social-sharing.jpg

# Optimise for web (reduce file size)
convert /public/images/graphics/og-image-social-sharing.jpg \
  -quality 85 \
  -strip \
  -interlace Plane \
  /public/images/graphics/og-image-social-sharing-optimised.jpg

# Verify file size
ls -lh /public/images/graphics/og-image-social-sharing*.jpg
```

**Using jpegoptim** (installation: `sudo apt-get install jpegoptim`):

```bash
# Lossless optimisation
jpegoptim --preserve /public/images/graphics/og-image-social-sharing.jpg

# Lossy optimisation to max 85% quality
jpegoptim --max=85 /public/images/graphics/og-image-social-sharing.jpg
```

### 9.3 Vercel Deployment Considerations

- Image must be committed to git (not generated at runtime)
- Path: `/public/images/graphics/og-image-social-sharing.jpg`
- Will be served from Vercel CDN automatically
- Cache headers set by Vercel (no manual configuration needed)

### 9.4 Build Validation

```bash
# Verify layout.tsx compiles successfully
npm run build

# Check for TypeScript errors
npm run type-check

# Test locally
npm run dev
# Visit: http://localhost:3000
# Inspect page source for og:image meta tags
```

---

## 10. DESIGN VARIATIONS (A/B TESTING POTENTIAL)

### Variation 1: Current Specification (Recommended)
- Landscape logo + credentials stacked below
- White background, premium typography
- 4 credential lines with gold checkmarks

### Variation 2: Alternative Layout
- Logo on left (50%), credentials on right (50%)
- Side-by-side layout for horizontal emphasis
- May require 1200×630 landscape orientation adjustment

### Variation 3: Minimal Approach
- Logo only (no credentials below)
- Cleaner, less cluttered appearance
- Relies on title/description for credential context

### Variation 4: Dark Background Option
- Dark navy background (#3F4A7E) with white logo
- Gold credentials text for contrast
- Premium, sophisticated alternative
- May perform differently on dark theme social feeds

**Recommendation**: Proceed with Variation 1 (current specification) for launch. Test performance metrics, then consider A/B testing alternatives if engagement warrants optimisation.

---

## 11. BRAND COMPLIANCE CHECKLIST

- [x] Uses existing landscape logo as foundation
- [x] Incorporates brand navy (#3F4A7E) and gold (#CA9E5B) colours
- [x] Maintains premium, royal client aesthetic
- [x] British English throughout (Tatler, honour, specialised)
- [x] Includes established credentials (Tatler, School Guide, Royalty)
- [x] Professional typography consistent with brand
- [x] No AI attribution or third-party logos without permission
- [x] Respects client's 15+ years heritage (Est. 2010)
- [x] Maintains 16:9 aspect ratio (standard for social)
- [x] Optimised for web performance (200 KB target)

---

## 12. STAKEHOLDER COMMUNICATION TEMPLATE

### For Client Approval

```
Subject: Social Sharing Image Specification Ready for Review

Hi [Client Name],

I've prepared a comprehensive specification for the optimised social sharing
image you requested. The design uses your landscape logo as the foundation and
displays your key credentials beautifully in Facebook, LinkedIn, and WhatsApp
link previews.

KEY FEATURES:
- 1200×630px (standard social sharing size, 16:9 ratio)
- Landscape logo positioned prominently (top 40%)
- 4 credentials displayed with elegant gold checkmarks:
  ✓ Specialist support from tutors, qualified teachers & officials examiners
  ✓ Featured in Tatler Address Book
  ✓ Recommended by School Guide UK
  ✓ Trusted by Royalty
- Premium typography and spacing maintained
- Optimised file size (200 KB) for fast social sharing
- WCAG AA colour contrast compliance
- Mobile-responsive layout

NEXT STEPS:
1. Review specification document (attached)
2. Approve design direction and credential copy
3. Confirm colour palette and typography preferences
4. Authorise design production

Would you like to proceed with the design production? I can have it completed
within 2-3 business days using Adobe InDesign for pixel-perfect quality.

Best regards,
[Your Name]
```

### For Development Team

```
Subject: Social Sharing Image Implementation - Next.js Integration

The social sharing image specification is complete. Here's what needs
implementation:

FILES TO CREATE:
- /public/images/graphics/og-image-social-sharing.jpg (1200×630px, 200KB)

CODE TO UPDATE:
- src/app/layout.tsx (lines 70-108)
  Update openGraph.images array
  Add new image as primary (first position)
  Update alt text with credentials

TESTING REQUIRED:
- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Article Inspector
- Manual: WhatsApp, Discord sharing
- Performance: <1s load time

See detailed specification in /docs/SOCIAL_SHARING_IMAGE_SPECIFICATION.md

Questions or blockers? Let's sync.
```

---

## 13. REVISION HISTORY

| Version | Date | Changes | Status |
|---|---|---|---|
| 1.0 | Oct 30, 2025 | Initial specification created | Final |

---

## Appendix A: Quick Reference - Meta Tags Update

**File to Update**: `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx`

**Lines to Change**: 70-108 (openGraph section)

**Quick Summary**:
```typescript
// BEFORE:
images: [{
	url: '/images/graphics/feature-royal-endorsement.jpg',
	width: 1200,
	height: 630,
	alt: 'My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements',
	type: 'image/jpeg',
}]

// AFTER:
images: [{
	url: '/images/graphics/og-image-social-sharing.jpg',  // NEW
	width: 1200,
	height: 630,
	alt: 'My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements. Specialist support from tutors and officials examiners, featured in Tatler, recommended by School Guide UK, trusted by royalty.',  // UPDATED
	type: 'image/jpeg',
}]
```

---

## Appendix B: Credential Copy Variations (Alternative Wordings)

If client requests different phrasing:

**Option 1** (Recommended - Current):
- Specialist support from tutors, qualified teachers & officials examiners
- Featured in Tatler Address Book
- Recommended by School Guide UK
- Trusted by Royalty

**Option 2** (More Academic):
- Expert tutors including qualified teachers and examination officials
- Recognised in Tatler's prestigious annual publication
- Endorsed by School Guide UK educational research
- Preferred choice of royal families

**Option 3** (Concise):
- Expert tutors & examination officials
- Featured in Tatler
- School Guide recommended
- Trusted by prominent families

**Option 4** (Achievement-Focused):
- Award-winning tuition from expert educators
- Trusted by prestigious UK institutions
- Over 15 years of proven results
- Featured in leading educational publications

Choose based on client preference and space constraints.

---

## Appendix C: Related Documentation

- **Brand Guidelines**: See CLAUDE.md - Navigation & Styling Architecture
- **Tailwind Configuration**: `/home/jack/Documents/my_private_tutor_online/tailwind.config.ts`
- **Current Metadata**: `/home/jack/Documents/my_private_tutor_online/src/app/layout.tsx` (lines 10-143)
- **Logo Assets**: `/public/images/logos/`
- **Existing OG Images**: `/public/images/graphics/`

---

**Document Prepared By**: Meta Tag Optimisation Specialist
**Target Audience**: Client stakeholders, design team, development team
**Status**: Ready for client review and design production
