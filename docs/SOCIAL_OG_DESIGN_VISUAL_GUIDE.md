# Social OG Image - Visual Design Guide
## Typography, Spacing & Visual Production Details

**Document Date**: October 30, 2025
**Purpose**: Detailed visual production guide for design team creating 1200×630px social sharing image
**Reference Document**: SOCIAL_SHARING_IMAGE_SPECIFICATION.md

---

## PART 1: TYPOGRAPHY SPECIFICATIONS

### Logo Area - Typography Hierarchy

#### Main Logo Text: "MY PRIVATE TUTOR ONLINE"

```
Font Family:    Serif (high-quality, premium)
Preferred:      Georgia, Garamond, Playfair Display, or equivalent
Weight:         Bold or Extra Bold (700-900)
Size:           62-72px (test at actual 1200px width)
Line Height:    1.2 (tight, professional)
Letter Spacing: 0.5px (slight expansion for elegance)

Colour Breakdown:
  "MY PRIVATE"  → #3F4A7E (primary navy)
  "TUTOR"       → #CA9E5B (accent gold)
  "ONLINE"      → #3F4A7E (primary navy)

Positioning:
  Horizontal:   Centered
  Vertical:     Positioned 80px from top
```

**Visual Rendering**:
```
┌─────────────────────────────────────────┐
│                                         │
│  80px from top                          │
│           ▼                             │
│    MY PRIVATE TUTOR ONLINE              │
│    ^^^^^^^^ ^^^^^^ ^^^^^^                │
│    #3F4A7E #CA9E5B #3F4A7E             │
│                                         │
└─────────────────────────────────────────┘
```

#### Tagline: "World-Class Education, At Your Fingertips"

```
Font Family:    Serif (same family as main logo)
Weight:         Regular (400) or Italic (400i)
Size:           28-32px
Style:          Italic (optional, adds elegance)
Line Height:    1.4
Letter Spacing: 0px (natural)
Colour:         #3F4A7E (primary navy)

Positioning:
  Horizontal:   Centred (below main logo text)
  Vertical:     6px below main logo text
  Width:        80% of image width (centred)
```

#### Heritage Mark: "Est. 2010"

```
Font Family:    Serif (same family)
Weight:         Regular (400)
Size:           16-18px
Style:          Normal
Colour:         #3F4A7E (primary navy)

Positioning:
  Horizontal:   Centred
  Vertical:     4px below tagline
```

**Complete Logo Area Spacing**:
```
┌────────────────────────────────────────────┐
│                                            │
│              Logo Icon (visual only)       │
│                                            │
│    MY PRIVATE TUTOR ONLINE                 │ 62-72px height
│                                            │
│   World-Class Education, At Your Fingertips│ 28-32px height
│                                            │
│             Est. 2010                      │ 16-18px height
│                                            │
│                  ↓ 12px spacer             │
├────────────────────────────────────────────┤
│                                            │
│       CREDENTIALS SECTION BEGINS           │
│                                            │
└────────────────────────────────────────────┘
```

---

### Credentials Section - Typography Specifications

#### Credential Line Structure

```
Each credential line follows this pattern:
[CHECKMARK] [TEXT]

Checkmark:
  Symbol:       ✓ (U+2713 CHECK MARK)
  Colour:       #CA9E5B (accent gold)
  Size:         Match credential text size (18-20px)
  Font:         Sans-serif, Weight: Bold
  Margin:       0px left, 10px right of text

Credential Text:
  Font Family:  Sans-serif (high legibility)
  Preferred:    Inter, Helvetica Neue, Open Sans, or system font
  Weight:       Regular (400)
  Size:         18-20px (scales to ~9-10px in Facebook preview)
  Colour:       #1F2937 (neutral grey-800)
  Line Height:  1.6 (generous spacing for luxury feel)
  Letter Spacing: 0px (natural)

Credential Line Full Width:
  Left margin:  20px (inside text box)
  Right margin: 20px (inside text box)
  Width:        ~1080px available (1200px - 120px margins)
```

#### Individual Credential Lines

**Line 1: Specialists**
```
Text:           "Specialist support from tutors, qualified teachers & officials examiners"
Character Count: 78 characters
Rendering:      Breaks naturally on "from" or "teachers" depending on layout
```

**Line 2: Tatler**
```
Text:           "Featured in Tatler Address Book"
Character Count: 34 characters
Rendering:      Single line, ~250px width
```

**Line 3: School Guide**
```
Text:           "Recommended by School Guide UK"
Character Count: 37 characters
Rendering:      Single line, ~280px width
```

**Line 4: Royalty**
```
Text:           "Trusted by Royalty"
Character Count: 21 characters
Rendering:      Single line, ~200px width
```

#### Credential Container Spacing

```
┌─────────────────────────────────────────┐
│ 20px padding left                   20px│
│                                    right│
│  ✓ Specialist support from tutors...   │ 20px height + 1.6x line-height
│                                        │ 12px bottom margin
│  ✓ Featured in Tatler Address Book    │ 20px height + 1.6x line-height
│                                        │ 12px bottom margin
│  ✓ Recommended by School Guide UK     │ 20px height + 1.6x line-height
│                                        │ 12px bottom margin
│  ✓ Trusted by Royalty                 │ 20px height (last item, no margin)
│                                        │
│ 20px padding bottom                    │
└─────────────────────────────────────────┘
```

**Total Credential Section Height**:
- 4 lines × (20px text + 16px line-height) = 144px
- 3 × 12px spacing between lines = 36px
- Top/bottom padding = 40px
- **Total: ~220px**

---

## PART 2: COLOUR SPECIFICATIONS & SWATCHES

### Brand Colour Palette

```
PRIMARY NAVY
  Hex:       #3F4A7E
  RGB:       63, 74, 126
  HSL:       230°, 33%, 37%
  Usage:     Logo text, main headings, body text emphasis
  Examples:  "MY PRIVATE" text, "ONLINE" text, tagline, "Est. 2010"

ACCENT GOLD
  Hex:       #CA9E5B
  RGB:       202, 158, 91
  HSL:       37°, 56%, 57%
  Usage:     "TUTOR" logo text, checkmarks, visual accents
  Examples:  Checkmark bullets, gold divider (optional)

NEUTRAL GREY-800
  Hex:       #1F2937
  RGB:       31, 41, 55
  HSL:       209°, 28%, 17%
  Usage:     Body text (credentials), supporting text
  Examples:  All credential lines

BACKGROUND WHITE
  Hex:       #FFFFFF
  RGB:       255, 255, 255
  HSL:       0°, 0%, 100%
  Usage:     Canvas background
  Examples:  Main image background

SUBTLE SHADOW (Optional)
  Hex:       #F3F4F6
  RGB:       243, 244, 246
  HSL:       213°, 33%, 95%
  Usage:     Credential box background (subtle enhancement)
  Opacity:   Only if desired - 4-6px drop shadow on text for legibility
```

### Colour Swatches (for design tools)

**Figma/Adobe/Canva**: Create colour palette library:

```
BRAND PALETTE
├─ Primary Navy: #3F4A7E
├─ Accent Gold: #CA9E5B
├─ Neutral Grey-800: #1F2937
├─ Background White: #FFFFFF
└─ Subtle Shadow: #F3F4F6
```

### Contrast Ratios (WCAG Compliance)

| Foreground | Background | Ratio | WCAG AA | WCAG AAA |
|---|---|---|---|---|
| Navy (#3F4A7E) | White (#FFFFFF) | 7.1:1 | PASS | PASS |
| Grey-800 (#1F2937) | White (#FFFFFF) | 11.8:1 | PASS | PASS |
| Gold (#CA9E5B) | White (#FFFFFF) | 4.2:1 | PASS | FAIL (decorative) |
| Navy (#3F4A7E) | Gold (#CA9E5B) | 2.1:1 | FAIL | N/A |
| Grey-800 (#1F2937) | Gold (#CA9E5B) | 6.2:1 | PASS | PASS |

**Recommendation**: Use grey-800 or navy for text over gold backgrounds (avoid contrasting navy + gold)

---

## PART 3: SPACING & LAYOUT GRID

### Canvas Grid System (8px base)

```
Tailwind/Bootstrap follows 4px grid; we'll use 8px for larger spacing:

Key Measurements:
  Horizontal margins:     60px (7.5 × 8px grid)
  Vertical section gap:   12px
  Logo area height:       ~200px
  Credentials height:     ~220px
  Total content height:   ~432px (used space)
  Available height:       630px total
  Padding top/bottom:     ~100px total (vertical centering)
```

### Detailed Layout Breakdown

```
VERTICAL LAYOUT (630px total height):
┌─────────────────────────────────────────────────┐
│                                                 │
│  50px top margin (breathing room)               │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │        LOGO AREA                        │   │
│  │  Logo Icon + Text                       │   │
│  │  (MY PRIVATE TUTOR ONLINE + Tagline)   │   │
│  │        ~200px height                    │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  12px spacer                                   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  CREDENTIALS SECTION                    │   │
│  │  ✓ Specialists...                      │   │
│  │  ✓ Featured in Tatler...               │   │
│  │  ✓ Recommended by School Guide...      │   │
│  │  ✓ Trusted by Royalty                  │   │
│  │        ~220px height                    │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  50px bottom margin (breathing room)            │
│                                                 │
└─────────────────────────────────────────────────┘
630px = 50 + 200 + 12 + 220 + 50 (approximately)

HORIZONTAL LAYOUT (1200px total width):
┌──────────────────────────────────────────────────────┐
│ ◄─60px─► ◄─1080px available width─► ◄─60px─►        │
│          (includes 40px padding inside)              │
│                                                      │
│          Content centered within 1080px area        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Safe Text Area

```
SAFE ZONE (avoids cropping on various platforms):
  Left margin:      60px
  Right margin:     60px
  Top margin:       50px
  Bottom margin:    50px
  Content width:    1080px
  Content height:   530px

All text must fit within this safe zone to prevent
truncation on Facebook preview (300×157px), Twitter,
LinkedIn, and WhatsApp previews.
```

---

## PART 4: FONT RECOMMENDATIONS BY TOOL

### Adobe InDesign / Photoshop

**Recommended Font Combinations**:

**Option A: Elegant Serif (Recommended)**
- Logo area: Garamond Premier Pro Bold (or substitute: Georgia Bold)
- Credentials: Adobe's Source Sans Pro or equivalent
- Contrast: Serif for premium logo + sans-serif for clarity in credentials

**Option B: Modern Serif**
- Logo area: Adobe Caslon Pro Bold
- Credentials: Myriad Pro Regular
- Effect: Contemporary premium feel

**Option C: High-Fashion**
- Logo area: Playfair Display Bold (Google Font - free alternative)
- Credentials: Inter Regular (Google Font - free alternative)
- Effect: Fashion magazine aesthetic

### Canva Pro

**Built-in Font Selection**:
- Logo area: Canva's "Barlow" (premium serif) or "Poppins Bold"
- Credentials: "Lato" or "Open Sans" (high legibility)
- Custom: Upload custom fonts if needed

### Figma

**Recommended Typeface Stack**:

```
Logo Area:
  Family: Georgia, "Playfair Display", "EB Garamond"
  Weight: Bold (700+)
  Size: 64px (adjustable based on content)

Credentials:
  Family: Inter, "Helvetica Neue", -apple-system, sans-serif
  Weight: Regular (400)
  Size: 20px at 1200px width
```

### Open Source (GIMP + Inkscape)

**System Fonts** (cross-platform compatibility):
- Logo: DejaVu Serif Bold (preinstalled on Linux)
- Credentials: Liberation Sans or DejaVu Sans

**Google Fonts** (free, high quality):
- Logo: Playfair Display (serif, premium)
- Credentials: Inter or Roboto (sans-serif, legible)

---

## PART 5: SHADOW & EFFECTS SPECIFICATIONS

### Optional Text Shadow (for legibility enhancement)

```
Text Shadow on Credentials (optional):
  Direction:      Right 1px, Down 1px
  Blur:           2px
  Colour:         #000000 (black)
  Opacity:        8% (subtle enhancement)
  Effect:         Increases contrast without obvious shadow

Application: Apply to credential text only if logo area background is busy
or if testing shows legibility issues in preview sizes.
```

**When to Use**:
- If logo background at bottom 40% of image is busy/textured
- If white background feels flat on social media preview
- For additional premium effect (subtle sophistication)

**When NOT to Use**:
- If white background is clean and sharp (preferred)
- If shadow reduces elegance or appears heavy
- To keep minimalist, premium aesthetic

### Optional Divider Line (Gold)

```
Divider Line Specification (optional enhancement):
  Position:       Between logo area and credentials
  Style:          Thin horizontal line
  Colour:         #CA9E5B (accent gold)
  Width:          60% of image width (centred)
  Height:         2px
  Opacity:        1.0 (fully opaque)
  Top margin:     8px from logo
  Bottom margin:  8px above credentials

Visual Effect:
  ✓ Separates logo from credentials visually
  ✗ May reduce negative space elegance
  → Use only if layout feels disconnected
```

---

## PART 6: MOBILE & PREVIEW SIZE TESTING

### Social Media Preview Dimensions

#### Facebook Desktop Link Preview
```
Display Size:     1200×628px → scales to 500×260px on desktop
Mobile Preview:   500×260px (shown in news feed, stories)
Crop Behavior:    Maintains aspect ratio, may crop edges if text extends

Testing Checklist:
  ✓ At 500×260px: Logo visible and recognisable?
  ✓ At 500×260px: Credentials readable (even if small)?
  ✓ Text doesn't extend beyond 60px margins
  ✓ Logo icon clearly distinguishable
```

#### Twitter/X Card Preview
```
Display Size:     Summary Large Image = 506×506px (square crop)
Aspect Ratio:     16:9 becomes ~1:1 depending on display
Crop Behavior:    Center crop if different ratio

Testing Checklist:
  ✓ Logo visible in ~506×506px centre area
  ✓ Top credentials line visible (within vertical crop)
  ✓ No critical content in edges (potential 10% crop)
```

#### LinkedIn Article Preview
```
Display Size:     1200×630px (full size on desktop)
Mobile Preview:   Variable (responsive)
Crop Behavior:    Maintains full aspect ratio

Testing Checklist:
  ✓ All content legible at LinkedIn's preview size
  ✓ Text contrast sufficient for both light/dark themes
  ✓ Logo recognisable at any preview size
```

#### WhatsApp Link Preview
```
Display Size:     ~500×500px (mobile thumbnail)
Aspect Ratio:     Square crop likely
Crop Behavior:    Crops to centre area

Testing Checklist:
  ✓ Logo visible in centre square
  ✓ Critical credentials text fits in centre area
  ✓ Image doesn't look distorted when cropped
```

### Test at These Breakpoints

Create test mockups at these sizes to verify legibility:

```
1. 1200×630px (full size, desktop browser)
   └─ Verify all elements visible and proportioned correctly

2. 500×260px (Facebook mobile news feed)
   └─ Verify logo + first credential line readable

3. 506×506px (Twitter card crop)
   └─ Verify logo visible in centre square

4. 300×157px (Facebook mobile extreme crop)
   └─ Verify at least logo icon distinguishable

5. 600×314px (LinkedIn mobile)
   └─ Verify credentials text somewhat readable
```

---

## PART 7: PRODUCTION QUALITY CHECKLIST

### Pre-Export Verification

- [ ] Canvas dimensions exactly 1200×630px (no rounding)
- [ ] Background is pure white (#FFFFFF), not off-white
- [ ] All colours use specified hex codes (no approximations)
- [ ] Logo text colours match brand (navy #3F4A7E, gold #CA9E5B)
- [ ] Credential text colour is grey-800 (#1F2937)
- [ ] Font sizes and weights correct for each section
- [ ] Checkmarks are gold (#CA9E5B) and visible at small sizes
- [ ] Line heights set to 1.6 for credentials
- [ ] Spacing matches specification (60px margins, 12px divider)
- [ ] Text is crisp and not blurry (rasterisation at 100%)
- [ ] No overlapping text or crowding
- [ ] Logo aspect ratio maintained (not stretched)
- [ ] All credential text present, spelled correctly (British English)

### Export Settings (JPEG)

```
Format:              JPEG (.jpg)
Colour Profile:      sRGB IEC 61966-2.1
Quality Setting:     85% (or Quality: 8/10 in some tools)
Interlacing:         Progressive JPEG (optional, improves perceived load time)
Metadata:            Strip EXIF data for file size reduction
Format:              Baseline JPEG (ensure wide compatibility)
Width:               1200 pixels (exactly)
Height:              630 pixels (exactly)
```

### File Size Verification

```
Target:              180-220 KB
Acceptable Range:    150-250 KB
Maximum Limit:       400 KB (risks slow social media loading)

If file size exceeds target:
  1. Reduce JPEG quality to 80% (if appearance acceptable)
  2. Use jpegoptim or ImageMagick to compress
  3. Remove unnecessary metadata
  4. Ensure no high-frequency patterns (difficult to compress)
```

### Filename Convention

```
Format:        og-image-social-sharing.jpg
Alternatives:
  - og-image-credentials.jpg
  - social-share-og.jpg
  - mpto-og-image-1200x630.jpg

Avoid:
  - og-image-v1.jpg (hard to track)
  - feature_OG.jpg (inconsistent naming)
  - openGraphImage (camelCase in file path)

Final Path:
  /public/images/graphics/og-image-social-sharing.jpg
```

---

## PART 8: DESIGN TOOL TEMPLATES & RECIPES

### Adobe InDesign Quick Setup

```
1. File → New → Document
   Width: 1200 px
   Height: 630 px
   Colour Space: RGB
   Transparency Grid: Off

2. View → Show Reference Point at center
   (Helps with centring elements)

3. Window → Workspace → Web
   (Optimises interface for digital design)

4. Edit → Preferences → Units & Increments
   Set to 1px (or 1mm for European preference)

5. Type → Create Outlines (after finalising text)
   Prevents font substitution issues
```

### Canva Pro Quick Setup

```
1. Start → Custom Size
   Width: 1200
   Height: 630

2. Upload background or set to white

3. Insert → Logo/Image → Upload logo-name-tagline.jpg

4. Insert → Text → Add credentials
   Font: Barlow (or built-in premium serif)
   Size: 44-48px (Canva will scale appropriately)

5. Position checkmarks using bullet or custom character

6. Download → JPG → Highest quality
```

### Figma Quick Setup

```
1. New File
2. Frame: 1200×630
3. Fill: #FFFFFF
4. Assets → Create library with brand colours
5. Components → Create text styles for:
   - Logo heading (62px serif)
   - Credential line (20px sans-serif)
6. Prototype → Export as JPG (JPEG 85%)
```

---

## PART 9: TROUBLESHOOTING COMMON ISSUES

### Issue: Text Appears Blurry in Preview

**Cause**: Text rendered at non-integer pixel coordinates
**Solution**:
- Ensure all text is positioned at whole pixel coordinates (e.g., 100px, not 100.5px)
- Use "Snap to Pixels" or "Pixel Grid" in design tool
- Disable anti-aliasing if available (design tool dependent)
- Export at 100% (not scaled)

### Issue: Gold Checkmarks Invisible in Small Preview

**Cause**: Checkmarks too small or insufficient contrast
**Solution**:
- Ensure checkmarks are 18-20px minimum size
- Use bold weight (#CA9E5B at 85%+ opacity)
- Add subtle shadow behind checkmark (+1px, 2px blur, 10% black opacity)
- Test visibility at 300×157px Facebook preview size

### Issue: Credential Text Truncated in Social Preview

**Cause**: Text extends beyond 60px safe margins
**Solution**:
- Keep max line width to 1080px
- Test credential lines at max width
- Shorten lines if necessary (especially Line 1)
- Use hyphenation sparingly (e.g., "examiners" vs "exam-iners")

### Issue: Aspect Ratio Wrong in Social Preview

**Cause**: Design not exactly 1200×630px
**Solution**:
- Double-check canvas dimensions (not 1200×629 or similar)
- Verify export maintains aspect ratio
- Use "Fix aspect ratio" in design tool if scaling
- Re-export if dimensions changed

### Issue: Colours Look Different in Preview

**Cause**: Colour space mismatch (CMYK vs RGB)
**Solution**:
- Verify design file colour space is RGB (not CMYK)
- Set sRGB as export colour profile
- Use colour picker to verify hex values match (#3F4A7E, #CA9E5B, etc.)
- Check on different monitors (colours vary by display calibration)

### Issue: File Size Too Large (>300 KB)

**Cause**: High-frequency patterns, excessive detail
**Solution**:
- Reduce JPEG quality to 80% (from 85%)
- Use jpegoptim command: `jpegoptim --max=80 file.jpg`
- Simplify logo background if possible
- Remove unnecessary design layers

---

## PART 10: FINAL HANDOFF DELIVERABLES

### Designer Deliverables Checklist

- [ ] 1200×630px JPEG file created and exported
- [ ] File named: `og-image-social-sharing.jpg`
- [ ] File size: 180-220 KB (verified)
- [ ] Colours verified to match brand hex codes
- [ ] All text proofread (British English, no typos)
- [ ] Logo positioned and proportioned correctly
- [ ] Credentials readable at 300×157px (Facebook small preview)
- [ ] Tested in: Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Inspector
- [ ] Design source file provided (PSD, XD, Figma link, etc.)
- [ ] Export settings documented for future updates
- [ ] Client approval obtained on final design

### Developer Implementation Checklist

- [ ] Image file placed in `/public/images/graphics/og-image-social-sharing.jpg`
- [ ] File committed to git repository
- [ ] Updated `src/app/layout.tsx` openGraph.images array
- [ ] New image placed as first/primary OG image
- [ ] Alt text updated with full credentials description
- [ ] Build command runs without errors: `npm run build`
- [ ] TypeScript validation passes: `npm run type-check`
- [ ] Tested locally: `npm run dev`
- [ ] Verified meta tags in HTML source (page source inspection)
- [ ] Deployed to staging environment
- [ ] Tested all social platforms (Facebook, Twitter, LinkedIn, WhatsApp, Discord)
- [ ] Performance validated (<1s load time)

---

## Appendix: Font Family Recommendations

### Premium Serif Options (Logo Area)

| Font | Availability | Cost | Characteristics |
|---|---|---|---|
| Garamond | Adobe, Google Fonts | Free (Google) | Classic, elegant, editorial |
| Playfair Display | Google Fonts | Free | High-fashion, contemporary serif |
| Georgia | System fonts | Free | Professional, proven web font |
| Cormorant Garamond | Google Fonts | Free | Luxury, decorative serif |
| EB Garamond | Google Fonts | Free | Academic, scholarly serif |

### Professional Sans-Serif Options (Credentials)

| Font | Availability | Cost | Characteristics |
|---|---|---|---|
| Inter | Google Fonts | Free | Geometric, modern, highly legible |
| Roboto | Google Fonts | Free | Versatile, clean, accessible |
| Open Sans | Google Fonts | Free | Friendly, readable, safe choice |
| Helvetica/Helvetica Neue | System fonts | Free | Classic, professional, universal |
| Lato | Google Fonts | Free | Warm, geometric, approachable |

**Recommendation**: Use Google Fonts for free, open-source alternatives ensuring legal compliance and cross-platform availability.

---

**Document Version**: 1.0
**Last Updated**: October 30, 2025
**Status**: Ready for Design Production
