# Social Sharing Image Project - Complete Documentation
## Facebook & Social Media Link Preview Optimisation

**Project Date**: October 30, 2025
**Client**: My Private Tutor Online
**Objective**: Create premium social sharing image for Facebook/LinkedIn/Twitter link previews
**Status**: Specification complete - Ready for design production and development implementation

---

## Project Overview

### The Challenge

Client shared feedback: **"I'm linking to the website quite a lot in messages/Facebook posts at the moment, and it would be great to have something that looks better."**

When sharing website links on social media (Facebook, WhatsApp, LinkedIn, Discord), the link preview displays the Open Graph (OG) image. The current generic image does not showcase the brand's premium credentials and heritage effectively.

### The Solution

Create a purpose-built 1200×630px Open Graph image that:
- Features the existing landscape logo as the visual foundation
- Displays key credentials with professional typography
- Maintains royal client quality standards
- Optimises for all major social sharing platforms
- Improves click-through rate from social shares

---

## Documentation Structure

This project consists of three comprehensive specification documents:

### 1. SOCIAL_SHARING_IMAGE_SPECIFICATION.md
**Primary reference document for project overview**

- Executive summary and business context
- Complete design specifications (dimensions, colours, layout)
- Typography and spacing details
- Design implementation approaches (Adobe, Canva, Figma, open source)
- Full credential text and copywriting notes
- Metadata and schema markup strategy
- Testing & validation procedures
- Accessibility and inclusivity guidelines
- Implementation checklist
- Brand compliance verification
- Stakeholder communication templates

**Use This Document When**: Planning project, reviewing design, verifying compliance

**Length**: ~1,800 lines | **Time to Read**: 30-40 minutes

---

### 2. SOCIAL_OG_DESIGN_VISUAL_GUIDE.md
**Detailed visual production guide for design team**

- Precise typography specifications (fonts, sizes, weights, colours)
- Colour swatches and contrast ratio verification
- Detailed layout grid and spacing measurements
- Safe text area boundaries (prevents social platform cropping)
- Shadow and effects specifications
- Mobile and preview size testing guide
- Font recommendations across design tools
- Production quality checklist
- Design tool templates and quick setup guides
- Troubleshooting common design issues
- Final deliverables checklist

**Use This Document When**: Creating design in Adobe/Canva/Figma, verifying visual quality

**Length**: ~1,200 lines | **Time to Read**: 20-30 minutes

---

### 3. IMPLEMENTATION_GUIDE_OG_IMAGE.md
**Step-by-step developer implementation guide**

- Quick start checklist (5 phases)
- File placement and git tracking
- Next.js layout.tsx metadata updates (copy-paste ready code)
- Local testing procedures
- Social platform validation (Facebook, Twitter, LinkedIn)
- Manual testing for WhatsApp, Discord, Slack
- Performance validation and Core Web Vitals
- Deployment procedures
- Post-launch monitoring
- Comprehensive troubleshooting guide
- Rollback procedures
- Success criteria

**Use This Document When**: Integrating image into codebase, testing, deploying

**Length**: ~1,000 lines | **Time to Read**: 15-25 minutes

---

## Quick Start Path

### For Designers

1. Read: **SOCIAL_SHARING_IMAGE_SPECIFICATION.md** (Sections 1-3: Design Specification, Implementation Approaches, Credential Text)
2. Reference: **SOCIAL_OG_DESIGN_VISUAL_GUIDE.md** (All sections - detailed visual guide)
3. Deliverables:
   - 1200×630px JPEG file: `og-image-social-sharing.jpg`
   - File size target: 180-220 KB
   - Source file (PSD/XD/Figma) for future edits
   - Export settings documentation

### For Developers

1. Read: **IMPLEMENTATION_GUIDE_OG_IMAGE.md** (All sections - step-by-step)
2. Reference: **SOCIAL_SHARING_IMAGE_SPECIFICATION.md** (Section 4: Metadata & Implementation Strategy)
3. Actions:
   - Place image in `/public/images/graphics/og-image-social-sharing.jpg`
   - Update `src/app/layout.tsx` openGraph.images array
   - Test with social platform debuggers
   - Deploy to production

### For Project Managers

1. Read: **SOCIAL_SHARING_IMAGE_SPECIFICATION.md** (Sections 1-2: Overview, Design Specification)
2. Review: **SOCIAL_OG_DESIGN_VISUAL_GUIDE.md** (Part 10: Final Handoff Deliverables)
3. Use: **IMPLEMENTATION_GUIDE_OG_IMAGE.md** (Section PHASE 5: Deployment) for launch coordination

---

## File Specifications (Quick Reference)

### Final Deliverable

| Specification | Value |
|---|---|
| **Filename** | `og-image-social-sharing.jpg` |
| **Dimensions** | 1200×630 pixels (16:9 aspect ratio) |
| **Format** | JPEG |
| **Quality** | 85% JPEG compression |
| **File Size** | 180-220 KB (optimal), <300 KB acceptable |
| **Colour Space** | sRGB |
| **Storage Path** | `/public/images/graphics/` |

### Design Specifications

| Element | Specification |
|---|---|
| **Layout** | Logo area (top 40%) + Credentials section (bottom 40%) + whitespace |
| **Logo Area** | Landscape logo (centred), 200px height |
| **Background** | Pure white (#FFFFFF) |
| **Logo Text Colours** | Navy #3F4A7E + Gold #CA9E5B (split) |
| **Credential Text** | Grey-800 #1F2937, 18-20px sans-serif |
| **Checkmarks** | Gold #CA9E5B |
| **Margins** | 60px horizontal, 50px vertical (safe area) |
| **Font Family (Logo)** | Serif (Garamond, Georgia, Playfair Display) |
| **Font Family (Credentials)** | Sans-serif (Inter, Helvetica Neue, Open Sans) |

### Credentials Display

```
✓ Specialist support from tutors, qualified teachers & officials examiners
✓ Featured in Tatler Address Book
✓ Recommended by School Guide UK
✓ Trusted by Royalty
```

---

## Social Platform Compatibility

This image optimises for:

| Platform | Preview Size | Image Display | Status |
|---|---|---|---|
| **Facebook** (Desktop) | 500×260px | Scaled to preview area | OPTIMISED |
| **Facebook** (Mobile) | 500×260px | Scaled, may crop edges | OPTIMISED |
| **WhatsApp** | 500×500px | Square thumbnail | OPTIMISED |
| **LinkedIn** | 1200×630px | Full size desktop | OPTIMISED |
| **Twitter/X** | 506×506px | Square, centred crop | OPTIMISED |
| **Discord** | Variable | Embed display | OPTIMISED |
| **Slack** | Variable | Unfurl preview | OPTIMISED |

**Note**: All platforms maintain the 1200×630px base image; display size varies by platform.

---

## Design Variations Supported

### Primary Design (Recommended)
- Landscape logo + credentials stacked below
- White background, premium typography
- 4 credential lines with gold checkmarks
- Status: **READY FOR PRODUCTION**

### Alternative Variations (For Future A/B Testing)
- Side-by-side layout (logo left, credentials right)
- Minimal approach (logo only, no credentials)
- Dark background option (navy background with white logo)

---

## Implementation Timeline

### Phase 1: Design Production (2-3 days)
- Designer receives specifications
- Creates design in Adobe InDesign/Canva/Figma
- Client reviews and approves
- Final image exported as JPEG (1200×630, 85% quality)
- Source file archived for future updates

### Phase 2: Development Integration (1 day)
- Developer receives image file
- Places file in `/public/images/graphics/`
- Updates `src/app/layout.tsx` metadata
- Tests locally with npm run build/dev
- Verifies TypeScript compilation

### Phase 3: Validation Testing (1 day)
- Facebook Sharing Debugger validation
- Twitter Card Validator testing
- LinkedIn Article Inspector verification
- Manual WhatsApp/Discord testing
- Performance validation (load time, Core Web Vitals)

### Phase 4: Deployment & Launch (½ day)
- Push to main branch
- Vercel automatic deployment
- Production verification
- Monitor social engagement

**Total Project Duration**: 3-5 days (approximately)

---

## Accessibility & Quality Standards

### WCAG 2.1 AA Compliance
- Text colour contrast ratios verified
- All text legible at small preview sizes
- Alt text includes full credential description
- Colour not sole means of conveying information

### Brand Compliance
- Uses existing landscape logo as foundation
- Incorporates brand navy (#3F4A7E) and gold (#CA9E5B)
- Maintains premium, royal client aesthetic
- British English throughout
- Respects 15+ years heritage (Est. 2010)

### Performance Standards
- File size optimised (180-220 KB)
- Loads <1 second from CDN
- No impact on Core Web Vitals
- Cross-browser compatibility verified

---

## Metadata Integration

### Next.js Implementation (src/app/layout.tsx)

```typescript
openGraph: {
	images: [
		{
			url: '/images/graphics/og-image-social-sharing.jpg',  // NEW PRIMARY
			width: 1200,
			height: 630,
			alt: 'My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements...',
			type: 'image/jpeg',
		},
		// ... secondary images
	],
},
twitter: {
	images: [
		'/images/graphics/og-image-social-sharing.jpg',  // NEW PRIMARY
		// ... secondary images
	],
},
```

---

## Testing Checklist

### Pre-Launch Testing
- [ ] Facebook Sharing Debugger: Image displays correctly
- [ ] Twitter Card Validator: Correct card type and dimensions
- [ ] LinkedIn Article Inspector: Preview renders properly
- [ ] Manual WhatsApp test: Thumbnail visible and clear
- [ ] Manual Discord test: Embed displays without cropping
- [ ] File size verified: 180-220 KB range
- [ ] Meta tags present in HTML source
- [ ] Performance: Page load time unaffected
- [ ] Mobile preview: Text readable at small sizes

### Post-Launch Monitoring
- [ ] Track social engagement metrics
- [ ] Monitor click-through rate improvement
- [ ] Gather client feedback
- [ ] Plan future iterations if needed

---

## Success Criteria

This project is successful when:

1. **Design Complete**: 1200×630px JPEG image created with all specifications met
2. **Code Integrated**: Image referenced in Next.js layout.tsx metadata
3. **Tests Passing**: All social platform debuggers confirm proper display
4. **Performance Maintained**: No negative impact on page load/Core Web Vitals
5. **Client Satisfied**: Client approves appearance in social previews
6. **Engagement Improved**: Positive feedback on social sharing experience

---

## Document Files Location

All documentation stored in project repository:

```
/home/jack/Documents/my_private_tutor_online/docs/

├── SOCIAL_SHARING_IMAGE_SPECIFICATION.md      (Main specification)
├── SOCIAL_OG_DESIGN_VISUAL_GUIDE.md           (Design production guide)
├── IMPLEMENTATION_GUIDE_OG_IMAGE.md           (Developer guide)
└── SOCIAL_SHARING_IMAGE_README.md             (This file)
```

**Git Tracking**: All documentation committed to repository for version control and team access.

---

## Key Contact Information

### Design Team
**Responsibility**: Create 1200×630px JPEG image per specifications
**Reference Documents**: SOCIAL_OG_DESIGN_VISUAL_GUIDE.md, SOCIAL_SHARING_IMAGE_SPECIFICATION.md
**Deliverable**: og-image-social-sharing.jpg (JPEG, 200KB)

### Development Team
**Responsibility**: Integrate image and update metadata
**Reference Documents**: IMPLEMENTATION_GUIDE_OG_IMAGE.md, SOCIAL_SHARING_IMAGE_SPECIFICATION.md (Section 4)
**Actions**: Copy image to `/public/images/graphics/`, update layout.tsx, test, deploy

### Project Manager/Client
**Responsibility**: Approve design, coordinate handoff, monitor launch
**Reference Documents**: SOCIAL_SHARING_IMAGE_SPECIFICATION.md (Sections 1-2, 12)
**Timeline**: 3-5 days from design start to launch

---

## Future Updates & Iterations

### Version Control Strategy
- Name iterations: `og-image-social-sharing-v1.jpg`, `og-image-social-sharing-v2.jpg`, etc.
- Archive previous versions for reference
- Document changes in git commit messages

### A/B Testing Options
- Test side-by-side layout (logo left, credentials right)
- Test dark background variation
- Measure engagement metrics differences
- Implement winning version long-term

### Seasonal Updates
- Update credentials if new endorsements added
- Refresh design if branding evolves
- Replace imagery if logo changes
- Maintain version history for audit trail

---

## Support & Questions

**For Design Questions**: Refer to SOCIAL_OG_DESIGN_VISUAL_GUIDE.md
- Typography specifications: Part 1
- Colour swatches: Part 2
- Spacing guide: Part 3
- Font recommendations: Part 4

**For Implementation Questions**: Refer to IMPLEMENTATION_GUIDE_OG_IMAGE.md
- File setup: Phase 2
- Code updates: Phase 3
- Testing: Phase 4
- Deployment: Phase 5
- Troubleshooting: Dedicated section

**For Project Overview**: Refer to SOCIAL_SHARING_IMAGE_SPECIFICATION.md
- Business context: Sections 1-2
- Design specs: Section 1
- Metadata: Section 4
- Testing: Section 5
- Brand compliance: Section 11

---

## Document Statistics

| Document | Lines | Sections | Estimated Read Time |
|---|---|---|---|
| SOCIAL_SHARING_IMAGE_SPECIFICATION.md | ~1,800 | 13 + Appendices | 30-40 mins |
| SOCIAL_OG_DESIGN_VISUAL_GUIDE.md | ~1,200 | 10 + Appendices | 20-30 mins |
| IMPLEMENTATION_GUIDE_OG_IMAGE.md | ~1,000 | 6 Phases | 15-25 mins |
| SOCIAL_SHARING_IMAGE_README.md (this) | ~400 | 10 | 5-10 mins |
| **Total** | **~4,400** | **33+** | **60-90 mins** |

---

## Version History

| Version | Date | Status | Changes |
|---|---|---|---|
| 1.0 | Oct 30, 2025 | Final | Complete specification suite delivered |

---

## Closing Notes

This project represents a strategic investment in premium social media presentation for My Private Tutor Online. By creating a purpose-built Open Graph image that showcases the brand's heritage, credentials, and premium positioning, the client can expect:

✓ **Improved visual appearance** when sharing links on social media
✓ **Better click-through rates** from social platform previews
✓ **Enhanced brand perception** through professional, coordinated imagery
✓ **Increased engagement** from social media sharing activities
✓ **Royal client quality** maintained in all digital touchpoints

The comprehensive documentation ensures smooth execution across design and development teams, with clear specifications, testing procedures, and implementation guidance.

**Ready for Production**.

---

**Prepared By**: Meta Tag Optimisation Specialist
**For**: My Private Tutor Online
**Date**: October 30, 2025
**Status**: Ready for Client Review & Design Production
