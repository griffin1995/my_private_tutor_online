# Social Sharing Image - Quick Reference Card
## At-a-Glance Project Overview

**Project**: Social Sharing Image for Facebook/LinkedIn/Twitter Link Previews
**Status**: Ready for Design Production
**Client**: My Private Tutor Online
**Timeline**: 3-5 days (design → implementation → launch)

---

## THE ASK (In Client's Words)

> "I'm linking to the website quite a lot in messages/Facebook posts at the moment, and it would be great to have something that looks better."

**Translation**: Create a premium Open Graph image that displays beautifully in social media link previews.

---

## WHAT WE'RE CREATING

**Type**: Open Graph (OG) Image - displays in Facebook, LinkedIn, Twitter, WhatsApp, Discord link previews
**Dimensions**: 1200×630 pixels (16:9 aspect ratio - standard for social sharing)
**Format**: JPEG (.jpg)
**File Size**: 180-220 KB (optimised)
**Foundation**: Existing landscape logo (logo-name-tagline.jpg)

---

## VISUAL LAYOUT (Simple)

```
┌──────────────────────────────────────────┐
│                                          │
│       [LANDSCAPE LOGO AREA]              │  ← Top 40%: Visual anchor
│       MY PRIVATE TUTOR ONLINE            │
│       World-Class Education,             │
│       At Your Fingertips                 │
│       Est. 2010                          │
│                                          │
├──────────────────────────────────────────┤  ← Spacer (12px)
│                                          │
│  ✓ Specialist support from tutors...    │  ← Bottom 40%: Credentials
│  ✓ Featured in Tatler Address Book      │
│  ✓ Recommended by School Guide UK       │
│  ✓ Trusted by Royalty                   │
│                                          │
└──────────────────────────────────────────┘
```

---

## COLOUR PALETTE

| Colour | Hex Value | Usage |
|---|---|---|
| Navy (Primary) | #3F4A7E | Logo text, headings |
| Gold (Accent) | #CA9E5B | "TUTOR" text, checkmarks |
| Grey-800 | #1F2937 | Credential text body |
| White (Background) | #FFFFFF | Canvas background |

---

## TYPOGRAPHY QUICK SPECS

### Logo Area
- **Font**: Serif (Garamond, Georgia, Playfair Display)
- **Text**: "MY PRIVATE TUTOR ONLINE" + Tagline + "Est. 2010"
- **Size**: 62-72px main logo text
- **Colours**: Navy + Gold (split per existing logo)

### Credentials Section
- **Font**: Sans-serif (Inter, Helvetica Neue, Open Sans)
- **Text**: 4 lines with gold checkmarks
- **Size**: 18-20px
- **Colour**: Grey-800 (#1F2937)

---

## THE 4 CREDENTIALS (Exact Copy)

```
✓ Specialist support from tutors, qualified teachers & officials examiners
✓ Featured in Tatler Address Book
✓ Recommended by School Guide UK
✓ Trusted by Royalty
```

**Note**: British English - "examiners" not "examiners", "Tatler" not "Tateler"

---

## DESIGN TOOLS SUPPORTED

✓ Adobe InDesign (recommended for pixel-perfect)
✓ Adobe Photoshop
✓ Canva Pro (fastest, user-friendly)
✓ Figma (collaborative, scalable)
✓ GIMP + Inkscape (open source, free)

**Recommendation**: Canva Pro for speed, Adobe InDesign for precision

---

## PHASE 1: DESIGN PRODUCTION (Design Team)

**Responsibilities**:
1. Receive spec documents (3 files provided)
2. Create 1200×630px JPEG design
3. Position landscape logo (top 40%)
4. Add credentials text (bottom 40%)
5. Export JPEG, 85% quality, ~200KB
6. Request client approval
7. Deliver file + source file (for edits)

**Reference Document**: SOCIAL_OG_DESIGN_VISUAL_GUIDE.md

**Deliverable**: `og-image-social-sharing.jpg` (1200×630, 180-220 KB)

**Timeline**: 2-3 days

---

## PHASE 2: DEVELOPMENT INTEGRATION (Developer Team)

**Responsibilities**:
1. Receive image file from design team
2. Place in: `/public/images/graphics/og-image-social-sharing.jpg`
3. Update: `src/app/layout.tsx` (openGraph.images array)
   - Change URL to: `/images/graphics/og-image-social-sharing.jpg`
   - Move to position 0 (first/primary image)
   - Update alt text with credentials
4. Test locally: `npm run build` + `npm run dev`
5. Verify meta tags in HTML source
6. Deploy to production

**Reference Document**: IMPLEMENTATION_GUIDE_OG_IMAGE.md

**Code Changes**: ~10 lines in layout.tsx

**Timeline**: 1 day

---

## PHASE 3: VALIDATION & TESTING

**Test Platforms**:
- Facebook Sharing Debugger (verify image displays)
- Twitter Card Validator (verify card type & image)
- LinkedIn Article Inspector (verify preview render)
- Manual: WhatsApp, Discord, Slack link sharing

**Success Criteria**:
✓ Image displays in all social preview tools
✓ Logo and credentials visible and readable
✓ File size 180-220 KB
✓ Page load time unchanged (Core Web Vitals)
✓ Client approves appearance

**Timeline**: 1 day

---

## PHASE 4: DEPLOYMENT & LAUNCH

**Actions**:
1. Push changes to main branch
2. Vercel automatically deploys
3. Verify production site shows new image
4. Monitor social engagement metrics

**Timeline**: ½ day

---

## QUICK IMPLEMENTATION CODE

**For Developers** - Update this in `src/app/layout.tsx`:

```typescript
// In openGraph section, change:
images: [
	{
		url: '/images/graphics/og-image-social-sharing.jpg',  // NEW
		width: 1200,
		height: 630,
		alt: 'My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements. Specialist support from tutors and officials examiners, featured in Tatler, recommended by School Guide UK, trusted by royalty.',  // UPDATED
		type: 'image/jpeg',
	},
	// ... rest of images
]

// In twitter section, change:
images: [
	'/images/graphics/og-image-social-sharing.jpg',  // NEW
	// ... rest of images
]
```

---

## DESIGN CHECKLIST FOR DESIGNER

Before exporting:
- [ ] Canvas exactly 1200×630px (not 1199 or 1201)
- [ ] Background pure white (#FFFFFF)
- [ ] Logo centred, proportional to original
- [ ] Credentials text in grey-800 (#1F2937)
- [ ] Checkmarks in gold (#CA9E5B)
- [ ] All 4 credential lines visible
- [ ] Text readable at 300×157px (Facebook small preview)
- [ ] Line height 1.6 (relaxed, premium feel)
- [ ] No text extending beyond 60px margins
- [ ] File exported as JPEG, 85% quality
- [ ] File size 180-220 KB
- [ ] Spelling checked (British English)
- [ ] Client approval obtained

---

## TESTING CHECKLIST FOR DEVELOPER

After integration:
- [ ] File placed: `/public/images/graphics/og-image-social-sharing.jpg`
- [ ] Build succeeds: `npm run build` (no errors)
- [ ] TypeScript passes: `npm run type-check`
- [ ] Local server runs: `npm run dev`
- [ ] Meta tags present: Inspect page source for og:image
- [ ] Facebook Debugger: Image displays correctly
- [ ] Twitter Validator: Card type verified
- [ ] LinkedIn Inspector: Preview renders
- [ ] File size verified: 180-220 KB
- [ ] Deployment successful: Production site updated
- [ ] Client approves: Feedback positive

---

## KEY ASSET FILES

### Existing Assets (Reference)
- Landscape logo: `/public/images/logos/logo-name-tagline.jpg` (foundation)
- Square logo: `/public/images/logos/logo-icon-only.jpg` (for favicon updates)
- Current OG image: `/public/images/graphics/feature-royal-endorsement.jpg` (being replaced)

### New Asset (To Create)
- Social sharing image: `/public/images/graphics/og-image-social-sharing.jpg` (NEW - create this)

---

## DOCUMENT REFERENCE MAP

| Question | Reference Document |
|---|---|
| "What's the overall project?" | SOCIAL_SHARING_IMAGE_README.md |
| "I'm designing, what are the specs?" | SOCIAL_OG_DESIGN_VISUAL_GUIDE.md |
| "I'm developing, how do I integrate?" | IMPLEMENTATION_GUIDE_OG_IMAGE.md |
| "What are brand/compliance rules?" | SOCIAL_SHARING_IMAGE_SPECIFICATION.md (Section 11) |
| "How do I test the meta tags?" | IMPLEMENTATION_GUIDE_OG_IMAGE.md (Phase 4) |
| "What if something breaks?" | IMPLEMENTATION_GUIDE_OG_IMAGE.md (Troubleshooting) |

---

## COMMON MISTAKES TO AVOID

**Designers**:
- ✗ Wrong dimensions (not exactly 1200×630)
- ✗ File too large (>300 KB)
- ✗ Text extends beyond margins (gets cropped in preview)
- ✗ Logo stretched or distorted
- ✗ American English ("examiners" vs "examiners")

**Developers**:
- ✗ Forget to update metadata in layout.tsx
- ✗ Wrong file path (public/images vs /public/images)
- ✗ Forget to commit image file to git
- ✗ Don't test with social debuggers
- ✗ Don't verify meta tags in HTML source

---

## SUCCESS LOOKS LIKE THIS

### In Facebook Link Preview
```
[1200×630 image showing logo + credentials]
My Private Tutor Online | Premium Academic Tutoring
Premium private tutoring with royal endorsements...
```

### In Twitter Card
```
Summary Large Image Card
[Social sharing image displays]
Title: My Private Tutor Online | Premium Academic Tutoring
Description: Royal family endorsed private tutoring...
```

### In WhatsApp
```
Link preview thumbnail
[Shows new OG image clearly]
myprivatetutoronline.com
My Private Tutor Online - Premium Academic Tutoring...
```

---

## QUICK STATS

| Metric | Value |
|---|---|
| Image Dimensions | 1200×630px |
| File Format | JPEG |
| File Size Target | 200 KB |
| Design Time | 2-3 days |
| Dev Time | 1 day |
| Test Time | 1 day |
| Total Timeline | 3-5 days |
| Team Size | 2 people (designer + developer) |
| Platforms Supported | Facebook, Twitter, LinkedIn, WhatsApp, Discord, Slack |

---

## CONTACT QUICK LINKS

**For Client Approval**: Use SOCIAL_SHARING_IMAGE_SPECIFICATION.md (Section 12)
**For Design Team Guidance**: Use SOCIAL_OG_DESIGN_VISUAL_GUIDE.md
**For Dev Team Guidance**: Use IMPLEMENTATION_GUIDE_OG_IMAGE.md
**For Project Overview**: Use SOCIAL_SHARING_IMAGE_README.md

---

## GO/NO-GO CHECKLIST

**Before Design Starts**:
- [ ] Client request understood (improve social link preview appearance)
- [ ] Logo assets received (logo-name-tagline.jpg)
- [ ] Specification approved (all 3 documents reviewed)
- [ ] Timeline agreed (3-5 days)

**Before Implementation Starts**:
- [ ] Design complete and approved
- [ ] Image file received (og-image-social-sharing.jpg)
- [ ] Image verified (1200×630, 200KB, JPEG)
- [ ] All specs reviewed

**Before Deployment**:
- [ ] Code changes implemented (layout.tsx updated)
- [ ] Build passes (npm run build succeeds)
- [ ] Tests pass (all social debuggers verify)
- [ ] Client approves final appearance

**Go/No-Go Decision**: Proceed only if ALL items checked

---

## FINAL REMINDERS

✓ Use existing landscape logo as foundation
✓ Include all 4 credentials (specialists, Tatler, School Guide, Royalty)
✓ Maintain premium, royal client aesthetic
✓ British English throughout
✓ Test with social platform debuggers before launch
✓ File size must be 180-220 KB (optimised)
✓ Meta tags must be updated in Next.js
✓ All team members have specification documents

---

**Last Updated**: October 30, 2025
**Status**: Ready for Handoff to Design Team
**Questions**: Refer to full specification documents in /docs/
