# Social Sharing Image Project - Documentation Index

**Project**: Facebook & Social Media Link Preview Optimisation
**Client**: My Private Tutor Online
**Status**: Complete - Ready for Team Distribution
**Date**: October 30, 2025

---

## Documentation Files

All documentation is located in the `/docs/` directory of the project repository.

### Quick Reference (Start Here)
```
docs/OG_IMAGE_QUICK_REFERENCE.md
├─ 300 lines | 3-5 minute read
├─ At-a-glance project overview
├─ Quick checklists for designers and developers
├─ Common mistakes to avoid
└─ Perfect for busy team members
```

### Design Production Guide (For Designers)
```
docs/SOCIAL_OG_DESIGN_VISUAL_GUIDE.md
├─ 1,200 lines | 20-30 minute read
├─ Precise typography specifications
├─ Detailed spacing and layout grid
├─ Colour swatches and contrast ratios
├─ Font recommendations by design tool
├─ Production quality checklist
├─ Design tool templates (Adobe, Canva, Figma, GIMP)
└─ Troubleshooting guide for common design issues
```

### Developer Implementation Guide (For Developers)
```
docs/IMPLEMENTATION_GUIDE_OG_IMAGE.md
├─ 1,000 lines | 15-25 minute read
├─ Step-by-step 5-phase implementation
├─ File placement and git tracking
├─ Next.js metadata updates (copy-paste ready code)
├─ Local testing procedures
├─ Social platform validation (Facebook, Twitter, LinkedIn)
├─ Performance validation and Core Web Vitals
├─ Deployment procedures
├─ Comprehensive troubleshooting guide
└─ Rollback procedures
```

### Complete Specification (For Project Leads)
```
docs/SOCIAL_SHARING_IMAGE_SPECIFICATION.md
├─ 1,800 lines | 30-40 minute read
├─ Executive summary and business context
├─ Complete design specifications
├─ Design implementation approaches
├─ Metadata and schema markup strategy
├─ Testing and validation procedures
├─ Accessibility compliance (WCAG 2.1 AA)
├─ Brand compliance verification
├─ Implementation checklist
└─ Stakeholder communication templates
```

### Project Overview & Navigation (For Coordinators)
```
docs/SOCIAL_SHARING_IMAGE_README.md
├─ 400 lines | 5-10 minute read
├─ Project overview and timeline
├─ Quick start paths by role
├─ File specifications summary
├─ Social platform compatibility matrix
├─ Implementation timeline breakdown
├─ Team responsibilities
└─ Future updates and iteration strategy
```

### Delivery Summary (For Overview)
```
../SOCIAL_SHARING_IMAGE_DELIVERY_SUMMARY.txt
├─ 400 lines | 5-10 minute read
├─ Complete project overview
├─ Key specifications summary
├─ Metadata integration code
├─ Implementation timeline
├─ Team responsibilities
├─ Testing and validation procedures
├─ Success criteria
└─ Next steps and contact information
```

---

## Reading Recommendations by Role

### For Graphic Designers
1. **Start Here**: `OG_IMAGE_QUICK_REFERENCE.md` (3-5 mins)
2. **Main Reference**: `SOCIAL_OG_DESIGN_VISUAL_GUIDE.md` (20-30 mins)
3. **Context**: `SOCIAL_SHARING_IMAGE_SPECIFICATION.md` Sections 1-3 (10 mins)

**Total Time**: 35-45 minutes

**Deliverable**: `og-image-social-sharing.jpg` (1200×630px JPEG, 180-220 KB)

### For Frontend/Full-Stack Developers
1. **Start Here**: `OG_IMAGE_QUICK_REFERENCE.md` (3-5 mins)
2. **Main Reference**: `IMPLEMENTATION_GUIDE_OG_IMAGE.md` (15-25 mins)
3. **Context**: `SOCIAL_SHARING_IMAGE_SPECIFICATION.md` Section 4 (5 mins)

**Total Time**: 25-35 minutes

**Actions**: File setup, code changes, testing, deployment

### For Project Managers/Team Leads
1. **Start Here**: `OG_IMAGE_QUICK_REFERENCE.md` (3-5 mins)
2. **Coordination**: `SOCIAL_SHARING_IMAGE_README.md` (5-10 mins)
3. **Context**: `SOCIAL_SHARING_IMAGE_SPECIFICATION.md` Sections 1-2 (5 mins)

**Total Time**: 15-20 minutes

**Focus**: Timeline, responsibilities, handoff coordination

### For All Team Members (Mandatory)
**Must Read**: `OG_IMAGE_QUICK_REFERENCE.md` (3-5 minutes)

Provides:
- Project overview
- Role-specific responsibilities
- File specifications
- Common mistakes to avoid
- Success criteria

---

## Document Tree Structure

```
/home/jack/Documents/my_private_tutor_online/
├── docs/
│   ├── SOCIAL_SHARING_IMAGE_SPECIFICATION.md      [1,800 lines]
│   ├── SOCIAL_OG_DESIGN_VISUAL_GUIDE.md           [1,200 lines]
│   ├── IMPLEMENTATION_GUIDE_OG_IMAGE.md           [1,000 lines]
│   ├── SOCIAL_SHARING_IMAGE_README.md             [400 lines]
│   └── OG_IMAGE_QUICK_REFERENCE.md                [300 lines]
│
├── SOCIAL_SHARING_IMAGE_DELIVERY_SUMMARY.txt      [400 lines]
├── DOCUMENTATION_INDEX.md                          [This file]
│
├── public/images/
│   ├── logos/
│   │   ├── logo-name-tagline.jpg                  [Foundation image]
│   │   └── logo-icon-only.jpg                     [Reference]
│   └── graphics/
│       ├── feature-royal-endorsement.jpg          [Current OG]
│       └── og-image-social-sharing.jpg            [TO CREATE]
│
└── src/app/
    └── layout.tsx                                  [TO UPDATE: metadata]
```

---

## Key Files to Create/Update

### NEW FILE TO CREATE
```
Path: /public/images/graphics/og-image-social-sharing.jpg
Size: 1200×630 pixels
Format: JPEG
Compression: 85% quality
File Size: 180-220 KB
Deliverable: From design team
Timeline: Days 1-2
```

### FILE TO UPDATE
```
Path: /src/app/layout.tsx
Lines: 70-108 (openGraph and twitter sections)
Changes: Update image URLs and alt text
Time: 15 minutes
Verification: TypeScript compilation, build test, meta tag inspection
```

---

## Quick Facts Reference

| Item | Specification |
|---|---|
| **Image Dimensions** | 1200×630 pixels (16:9 aspect ratio) |
| **File Format** | JPEG (.jpg) |
| **Compression Quality** | 85% |
| **Target File Size** | 180-220 KB |
| **Storage Location** | `/public/images/graphics/` |
| **Design Foundation** | Landscape logo (`logo-name-tagline.jpg`) |
| **Primary Colours** | Navy #3F4A7E, Gold #CA9E5B, Grey #1F2937 |
| **Logo Font** | Serif (Garamond, Georgia, Playfair) |
| **Body Font** | Sans-serif (Inter, Helvetica, Open Sans) |
| **Credentials** | 4 lines with gold checkmarks |
| **Total Timeline** | 3-5 days |
| **Team Size** | 2 people (designer + developer) |

---

## Checklists at a Glance

### Design Pre-Export Checklist (11 items)
✓ Dimensions exactly 1200×630px
✓ Background pure white #FFFFFF
✓ All colours match hex codes
✓ Typography correct (sizes, weights, families)
✓ All 4 credentials visible
✓ Checkmarks in gold #CA9E5B
✓ Text readable at 300×157px preview
✓ No spelling errors (British English)
✓ File exported as JPEG, 85% quality
✓ File size 180-220 KB
✓ Client approval obtained

### Developer Pre-Deployment Checklist (12 items)
✓ Image file placed in `/public/images/graphics/`
✓ File permissions correct (644)
✓ File committed to git
✓ `layout.tsx` metadata updated
✓ TypeScript compilation successful
✓ Production build successful
✓ Meta tags verified in HTML source
✓ Facebook Debugger test passed
✓ Twitter Card Validator test passed
✓ LinkedIn Inspector test passed
✓ Manual platform tests (WhatsApp, Discord)
✓ Performance validated

---

## Success Criteria

**Design Success**:
- 1200×630px JPEG image delivered
- File size 180-220 KB
- All specifications met
- Client approval obtained

**Implementation Success**:
- Image integrated into codebase
- Metadata updated in layout.tsx
- Build compiles without errors
- Meta tags present in HTML

**Testing Success**:
- All social debuggers verify image
- Manual platform tests pass
- File size confirmed
- Performance unaffected

**Launch Success**:
- Deployment completed
- Production shows new image
- Client satisfied
- Metrics tracked

---

## Common Questions & Answers

**Q: Where should I store the image?**
A: `/public/images/graphics/og-image-social-sharing.jpg`

**Q: What dimensions do I need?**
A: Exactly 1200×630 pixels (16:9 ratio)

**Q: What file format?**
A: JPEG (.jpg) with 85% quality compression

**Q: How large should the file be?**
A: Target 180-220 KB (acceptable up to 300 KB)

**Q: Which fonts should I use?**
A: Serif for logo (Garamond, Georgia), Sans-serif for credentials (Inter, Helvetica)

**Q: What are the brand colours?**
A: Navy #3F4A7E, Gold #CA9E5B, Grey #1F2937

**Q: What credentials should I include?**
A: Specialists, Tatler featured, School Guide recommended, Trusted by Royalty

**Q: How do I test the integration?**
A: Use Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Inspector

**Q: What if the old image still shows?**
A: Click "Scrape Again" in debuggers, wait 5-10 minutes for CDN cache refresh

**Q: Where do I find the landscape logo?**
A: `/public/images/logos/logo-name-tagline.jpg` or `.png` version

---

## Timeline Overview

**Day 1-2**: Design Production
- Design team creates 1200×630px JPEG
- Client reviews and approves

**Day 2-3**: Development Integration
- Developer receives image
- Updates metadata in layout.tsx
- Tests locally

**Day 3-4**: Testing & Validation
- Social platform validation
- Manual testing
- Performance checks

**Day 4-5**: Deployment & Launch
- Push to main branch (version control only)
- Manual Vercel CLI deployment (`vercel --prod`)
- Monitor engagement

---

## Support & Help

For specific questions, refer to the appropriate document:

**Design Questions**: `SOCIAL_OG_DESIGN_VISUAL_GUIDE.md`
**Implementation Questions**: `IMPLEMENTATION_GUIDE_OG_IMAGE.md`
**Project Overview**: `SOCIAL_SHARING_IMAGE_README.md`
**Quick Reference**: `OG_IMAGE_QUICK_REFERENCE.md`
**Complete Specs**: `SOCIAL_SHARING_IMAGE_SPECIFICATION.md`

---

## Version Control

All documentation is tracked in git at:
```
/home/jack/Documents/my_private_tutor_online/docs/
```

Files are committed with clear, descriptive messages for audit trail and team collaboration.

---

## Next Steps

1. **Distribute this index** to all team members
2. **Designers**: Read `OG_IMAGE_QUICK_REFERENCE.md` + `SOCIAL_OG_DESIGN_VISUAL_GUIDE.md`
3. **Developers**: Read `OG_IMAGE_QUICK_REFERENCE.md` + `IMPLEMENTATION_GUIDE_OG_IMAGE.md`
4. **Project Manager**: Coordinate handoff between design and development
5. **Monitor**: Track timeline and success criteria

---

**Project Status**: COMPLETE - Ready for Immediate Execution

All specifications documented. Team has clear guidance for design production, implementation, testing, and launch.

Expected Outcome: Premium social sharing image that improves Facebook/LinkedIn/Twitter link preview appearance, driving increased engagement from social media shares.

---

**Last Updated**: October 30, 2025
**Document Version**: 1.0 Final
**Status**: Ready for Distribution
