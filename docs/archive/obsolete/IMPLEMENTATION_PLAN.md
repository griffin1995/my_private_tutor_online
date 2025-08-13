# IMPLEMENTATION PLAN - My Private Tutor Online Website Refresh

**Documentation Source**: Context7 MCP - Next.js Static Assets Best Practices  
**Reference**: /vercel/next.js - Public Folder & Video Element Documentation  
**Date**: August 2025  
**Status**: AWAITING CLIENT APPROVAL

---

## 🎯 EXECUTIVE SUMMARY

Based on client feedback from Beth (feedback.md dated July 30th, 2025), this plan outlines the comprehensive website refresh covering:

1. **Video Asset Management** - 4 new video files requiring replacement/organization
2. **Content Structure Overhaul** - New 9-page sitemap with updated copy
3. **Brand Alignment** - Updated colors, fonts, and messaging
4. **Technical Enhancements** - Booking integration and video embedding

**CRITICAL**: This is a PLANNING document only. No implementation will occur without explicit client approval.

---

## 📹 PHASE 1: VIDEO ASSET CONSOLIDATION (HIGH PRIORITY)

### Current Video Mapping Analysis
**Context7 MCP Reference**: Next.js Public Folder Static Asset Management

#### Existing Videos (in /public/videos/):
1. `beth-introduction-2025.mp4` (327MB) - July 2025 introduction
2. `elizabeth-introduction.mp4` (22MB) - Shorter introduction 
3. `background-video-2025.mp4` (252MB) - Silent background video
4. `testimonials-parents.mp4` (28MB) - Parent testimonials
5. `testimonials-students.mp4` (27MB) - Student testimonials

#### New Videos (in root directory):
1. `Parents testimonials MPTO updated.mp4` → **REPLACES** `testimonials-parents.mp4`
2. `Students testimonials MPTO updated.mp4` → **REPLACES** `testimonials-students.mp4`
3. `Sound updated.mp4` → **REPLACES** `beth-introduction-2025.mp4`
4. `Updated Silent.mp4` → **REPLACES** `background-video-2025.mp4`

### Proposed Video Organization:
```
/public/videos/
├── beth-introduction-2025.mp4 (UPDATED VERSION)
├── elizabeth-introduction.mp4 (KEEP)
├── background-video-2025.mp4 (UPDATED VERSION) 
├── testimonials-parents-2025.mp4 (UPDATED VERSION)
└── testimonials-students-2025.mp4 (UPDATED VERSION)
```

### Video Implementation Requirements:
- **Silent Background Video**: Homepage hero section (no text overlay per feedback)
- **Beth Introduction**: "Meet Elizabeth" section positioning
- **Testimonials**: Homepage and dedicated testimonials page
- **Context7 MCP Compliance**: All video elements following Next.js video best practices

---

## 🎨 PHASE 2: BRAND & DESIGN UPDATES (MEDIUM PRIORITY)

### Brand Color Specification:
**Client Reference**: https://www.schemecolor.com/luxury-gold-blue.php
- **Primary**: Navy/Blue tones
- **Accent**: Luxury Gold 
- **Current Tailwind Config**: Already implements similar palette (primary-900: #0f172a, accent-500: #eab308)

### Typography Updates:
**Client Specification**:
- **Headers**: Playfair Display (currently configured)
- **Body**: Source Serif 4 (REQUIRES CHANGE from current Lato)

### Logo & Assets:
- Replace placeholder logos with final versions (shared via Swiss Transfer)
- Add Tatler and School Guide UK brand logos
- Add crown icon for "Royal clientele"

---

## 📄 PHASE 3: SITEMAP & CONTENT RESTRUCTURE (MEDIUM PRIORITY)

### New 9-Page Structure:
1. **HOMEPAGE** - Comprehensive updates (see detailed changes below)
2. **HOW IT WORKS** - Pricing table, tutor profiles, consultation booking
3. **ABOUT US** - New founder's story, ethos restructure
4. **SUBJECT TUITION** - 7 subcategories (Primary, Secondary, University, etc.)
5. **11+ BOOTCAMPS** - Seasonal page (hide/show functionality needed)
6. **VIDEO MASTERCLASSES** - British Culture + UCAS series
7. **EXAM PAPERS** - New section
8. **FAQ** - Include pricing table
9. **BLOG** - Migrate existing (exclude Personal Statement article)

### Pages to REMOVE:
- Contact page (enquiry form in footer sufficient)
- Shop (unless needed for masterclasses)
- Free Essential Guide (replace with Elizabeth's Top 10 Tips PDF)

---

## 🏠 PHASE 4: HOMEPAGE SPECIFIC CHANGES (HIGH PRIORITY)

### Content Hierarchy Changes:
1. **New Primary Heading**: "World-Class Education, At Your Fingertips"
2. **Silent Video**: Hero section without text overlay
3. **Remove Current Copy**: "For over fifteen years..." above video
4. **School Shields**: Reverse order - text above scrolling shields
5. **Meet Elizabeth Section**: Move video lower, rename "Watch Introduction" to "Meet Elizabeth"
6. **Royal Endorsement**: Change to "Fit For a King" with specific testimonial
7. **Results Section**: Move higher up page, update statistics
8. **Remove How It Works**: Section (exists on dedicated page)

### New Statistics (Client Provided):
- 500+ families guided to academic excellence
- 95% of 11+ candidates receive offers from top choices
- Some students score in top 2% of test takers
- 94% of GCSE students improve by 2+ grades
- Elizabeth accepts <10% of tutor applicants

---

## 🔧 PHASE 5: TECHNICAL INTEGRATIONS (LOW PRIORITY)

### Booking System:
- **Calendly Integration**: 15-minute consultation with Elizabeth
- **Location**: "Book consultation" buttons throughout site

### Video Embedding:
**Context7 MCP Reference**: Next.js HTML Video Element Best Practices
- Unlocking Academic Success Seminar (Founder's Story page)
- Podcast episode embed (Private Tuition page)
- Pay-to-view masterclass integration

### SEO Enhancements:
**Client Provided Keywords**:
- Maths physics tutor, Best tutors, GCSE tutor
- Tutoring agencies London, Top tutoring company UK
- Online tutoring 11+, London education consultants

---

## 📋 SPECIFIC CONTENT CHANGES

### About Us Page - New Founder's Story:
**Full Text Provided**: 2,000+ word comprehensive founder biography
**Key Sections**:
- Meet Elizabeth, A Different Kind of Educator
- Going Against the Grain (Cambridge offer story)
- First Lesson to Seventh Continent
- Global View of Education
- Results That Matter

### How It Works Page Updates:
- New consultation copy
- Updated tutor matching description
- Revised pricing (£45/hour, not £45)
- 3-tier tutor profile examples needed

---

## ⚠️ CRITICAL CONSIDERATIONS

### Content Requirements:
- **Remove Oxford References**: Client specifically requests removal
- **Update Experience**: "Over 15 years" (not "over a decade")
- **Remove "100% Oxbridge Tutors"**: Not accurate per client

### Technical Constraints:
- **Current Architecture**: Client Components with force-dynamic
- **Video File Sizes**: New videos may be large (need optimization)
- **Mobile Optimization**: Ensure all changes work on mobile-first design

---

## 📊 IMPLEMENTATION PRIORITY MATRIX

| Phase | Priority | Effort | Client Impact | Dependencies |
|-------|----------|---------|---------------|--------------|
| Video Assets | HIGH | Medium | High | File sizes, Context7 optimization |
| Homepage Changes | HIGH | High | Very High | Video assets, content approval |
| Brand Updates | MEDIUM | Low | Medium | Font licensing, logo assets |
| Sitemap Restructure | MEDIUM | High | High | Content completion, URL strategy |
| Technical Integrations | LOW | Medium | Medium | Third-party services |

---

## 🚨 BLOCKING QUESTIONS FOR CLIENT

1. **Video File Sizes**: New videos may be very large - do you need compression/optimization?
2. **Source Serif 4 Font**: Do you have a license, or should we use Google Fonts version?
3. **Seasonal 11+ Page**: What's the hide/show mechanism - admin toggle or date-based?
4. **Masterclass Payment**: Do you need e-commerce for paid video series?
5. **Swiss Transfer Assets**: Can you provide direct access to logo/image files?

---

## 🎯 NEXT STEPS

**AWAITING CLIENT APPROVAL**:

1. **Approve Overall Plan**: Confirm phases and priorities
2. **Provide Missing Assets**: Logos, images, video files
3. **Content Sign-off**: Finalize copy for all pages
4. **Technical Decisions**: Booking system, payment integration
5. **Implementation Timeline**: Agree on delivery milestones

**NO IMPLEMENTATION WILL BEGIN WITHOUT EXPLICIT CLIENT APPROVAL OF THIS PLAN**

---

*Documentation Source: Context7 MCP /vercel/next.js - Static Assets, Video Elements, Public Folder Best Practices*  
*Generated: August 2025 | Status: Planning Phase*