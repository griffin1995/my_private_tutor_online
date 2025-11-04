# Image Directory Cleanup Plan
**Generated**: 2025-11-04
**Current Status**: Analysis Complete - Ready for Implementation

## Executive Summary

- **Total Images**: 250 files
- **Used Images**: 152 files (60.8%)
- **Unused Images**: 98 files (39.2%)
- **Broken References**: 15 references pointing to non-existent files
- **Directories with 0% Usage**: 3 directories (thumbnails/, timeline/, screenshots/)
- **Potential Space Savings**: ~98 unused files to be deleted

---

## Phase 1: Directory Structure Analysis

### Current Directory Usage Statistics

| Directory | Total Files | Used | Unused | Usage % | Status |
|-----------|-------------|------|--------|---------|--------|
| testimonials | 14 | 14 | 0 | 100% | ✅ Keep as-is |
| video-placeholders | 3 | 3 | 0 | 100% | ✅ Keep as-is |
| media | 3 | 3 | 0 | 100% | ✅ Keep as-is |
| exam-papers | 1 | 1 | 0 | 100% | ✅ Keep as-is |
| students | 25 | 22 | 3 | 88% | 🟡 Minor cleanup |
| tutors | 26 | 20 | 6 | 76% | 🟡 Minor cleanup |
| video-thumbnails | 4 | 3 | 1 | 75% | 🟡 Minor cleanup |
| team | 10 | 7 | 3 | 70% | 🟡 Minor cleanup |
| graphics | 25 | 16 | 9 | 64% | 🟡 Cleanup + consolidate |
| logos | 46 | 29 | 17 | 63% | 🟡 Cleanup needed |
| programmes | 9 | 5 | 4 | 55% | 🟡 Cleanup needed |
| hero | 15 | 7 | 8 | 46% | 🔴 Significant cleanup |
| masterclass-thumbnails | 7 | 3 | 4 | 42% | 🔴 Consolidate |
| features | 19 | 6 | 13 | 31% | 🔴 Significant cleanup |
| about | 7 | 2 | 5 | 28% | 🔴 Significant cleanup |
| **thumbnails** | 9 | 0 | 9 | **0%** | ❌ **DELETE ENTIRE DIR** |
| **timeline** | 5 | 0 | 5 | **0%** | ❌ **DELETE ENTIRE DIR** |
| **screenshots** | 1 | 0 | 1 | **0%** | ❌ **DELETE ENTIRE DIR** |

### Root Directory Issues

**21 loose files in /public/images/** - Should be organized into subdirectories:

**Masterclass backgrounds** (move to masterclass-thumbnails/):
- british-classics-child-background.jpg ✅ USED
- british-etiquette-background.jpg ✅ USED
- ucas-part-1-mortar-board-background.jpg ✅ USED
- ucas-part-2-library-background.jpg ✅ USED
- unlocking-academic-success-background.jpg ✅ USED

**How It Works section images** (move to features/):
- expert-tutor-matching.jpg ✅ USED
- flexible-scheduling.jpg ✅ USED
- initial-consultation.jpg ✅ USED
- personalised-learning-plan.jpg (duplicate exists in root - investigate)
- progress-tracking.jpg ✅ USED

**Unused stock photos** (DELETE):
- pexels-gsn-travel-28448938.jpg ❌ UNUSED
- pexels-isabella-mendes-107313-11286592.jpg ❌ UNUSED
- pexels-kindelmedia-7579201.jpg ❌ UNUSED
- pexels-polina-tankilevitch-6929349.jpg ❌ UNUSED (duplicate in root)
- pexels-shkrabaanthony-5306492.jpg ❌ UNUSED
- pexels-this-and-no-internet-25-288559-29659893.jpg ❌ UNUSED

**Other loose files**:
- 11_intensive.avif ❌ UNUSED
- 11-kickstarter.avif ❌ UNUSED
- British literature 2.jpg ❌ UNUSED
- Graduation red ucas part 1.jpg ❌ UNUSED
- ucas-summit-background.jpg ❌ UNUSED

---

## Phase 2: Identified Overlapping Directories

### Issue 1: Three Thumbnail Directories ⚠️ HIGH PRIORITY

**Current State**:
- `thumbnails/` (9 files, 0% usage) - **COMPLETELY UNUSED**
- `masterclass-thumbnails/` (7 files, 42% usage) - Mixed usage
- `video-thumbnails/` (4 files, 75% usage) - Good usage

**Problem**: Confusing separation, thumbnails/ is completely dead

**Proposed Solution**:
1. **DELETE** entire `thumbnails/` directory (0% usage)
2. **KEEP** `masterclass-thumbnails/` for masterclass page thumbnails
3. **KEEP** `video-thumbnails/` for video player thumbnails
4. **CONSOLIDATE** root background images into `masterclass-thumbnails/backgrounds/`

### Issue 2: Tutors vs Team Directories 🟡 MODERATE PRIORITY

**Current State**:
- `tutors/` (26 files, 76% usage) - Individual tutor photos
- `team/` (10 files, 70% usage) - Founder and team photos

**Problem**: Conceptual overlap - team members are also tutors

**Analysis**:
- `tutors/` contains: Individual tutor headshots (alex.jpg, alma.jpg, emily.jpg, etc.)
- `team/` contains: Founder photos + katherine-mother-sebastian-headshot.avif
- **OLD_BACKUP SUBDIRECTORY**: `tutors/old_backup/` (8 files) - likely all unused

**Proposed Solution**:
- **KEEP SEPARATE** - They serve different purposes:
  - `tutors/` = Tutor profiles and matching pages
  - `team/` = About page and founder story sections
- **DELETE** `tutors/old_backup/` subdirectory entirely
- Clean up unused files in both directories

### Issue 3: Features vs Graphics Directories 🟡 MODERATE PRIORITY

**Current State**:
- `features/` (19 files, 31% usage) - Feature illustrations/photos
- `graphics/` (25 files, 64% usage) - Stats, badges, feature graphics

**Problem**: Overlapping purpose - both contain feature-related imagery

**Analysis**:
- `features/` mostly contains **unused** descriptive photos (13 unused out of 19)
- `graphics/` contains **statistics, badges, trust indicators** - better usage
- Some conceptual overlap but different visual styles

**Proposed Solution**:
- **KEEP SEPARATE** - Different visual purposes:
  - `graphics/` = Statistics, badges, icons, infographics
  - `features/` = Feature section photos and illustrations
- **DELETE** 13 unused files from `features/`
- **DELETE** 9 unused files from `graphics/`

---

## Phase 3: Broken Image References (15 Total)

### Missing Directory: /images/services/ ❌ CRITICAL

**Broken References** (4 files in business-content.json):
```
/images/services/a-level-tutoring.jpg
/images/services/eleven-plus.jpg
/images/services/gcse-tutoring.jpg
/images/services/oxbridge-prep.jpg
```

**Location**: `/home/jack/Documents/my_private_tutor_online/src/content/business-content.json:89`

**Issue**: Directory doesn't exist at all

**Solution Options**:
1. Create placeholder images in new `services/` directory
2. Find existing images that could be used (check students/ or features/)
3. Update references to use existing student category images

### Missing Placeholder: /images/placeholder.svg ❌ MEDIUM

**Broken References** (4 locations):
- `/home/jack/Documents/my_private_tutor_online/src/components/sections/trust-indicators-grid.tsx:148`
- `/home/jack/Documents/my_private_tutor_online/src/components/sections/trust-indicators-grid.tsx:198`
- `/home/jack/Documents/my_private_tutor_online/src/lib/cms/cms-service.ts:423`
- `/home/jack/Documents/my_private_tutor_online/src/lib/cms/cms-images.ts:1029`

**Solution**: Create a simple placeholder.svg in /public/images/

### Missing Team Members ❌ MEDIUM

**Broken References** (7 files):
```
/images/team/beth-founder.jpg
/images/team/emily-chen.jpg
/images/team/james-thompson.jpg
/images/team/sarah-mitchell.jpg
/images/team/founder-elizabeth-burrows-alternative.jpg
/images/testimonials/consultant-1.jpg
/images/testimonials/parent-1.jpg
/images/testimonials/parent-2.jpg
```

**Issue**: Referenced in code but files don't exist

**Solution Options**:
1. Map to existing similar images
2. Create placeholder images
3. Update code to remove these references

### Missing Hero Image ❌ LOW

**Broken Reference**: `/images/hero/premium-tutoring-hero.jpg`

**Solution**: Use existing hero image or create redirect to working hero image

---

## Phase 4: Complete File Deletion List (98 Files)

### Directories to Delete Entirely (15 files)

**thumbnails/** (9 files - 0% usage):
```
public/images/thumbnails/bridging-gaps-building-confidence-thumbnail.jpg
public/images/thumbnails/british-etiquette-thumbnail.jpg
public/images/thumbnails/british-literary-classics-thumbnail.jpg
public/images/thumbnails/masterclass-culture-default.jpg
public/images/thumbnails/masterclass-free-default.jpg
public/images/thumbnails/masterclass-premium-default.jpg
public/images/thumbnails/personal-statements-part-2-thumbnail.jpg
public/images/thumbnails/ucas-guide-part-1-thumbnail.jpg
public/images/thumbnails/unlocking-academic-success-thumbnail.jpg
```

**timeline/** (5 files - 0% usage):
```
public/images/timeline/timeline-step-1.jpg
public/images/timeline/timeline-step-2.jpg
public/images/timeline/timeline-step-3.jpg
public/images/timeline/timeline-step-4.jpg
public/images/timeline/timeline-step-5.jpg
```

**screenshots/** (1 file - 0% usage):
```
public/images/screenshots/faq-desktop-home.png
```

### Root Directory Cleanup (11 unused files)

```
public/images/11_intensive.avif
public/images/11-kickstarter.avif
public/images/British literature 2.jpg
public/images/Graduation red ucas part 1.jpg
public/images/pexels-gsn-travel-28448938.jpg
public/images/pexels-isabella-mendes-107313-11286592.jpg
public/images/pexels-kindelmedia-7579201.jpg
public/images/pexels-shkrabaanthony-5306492.jpg
public/images/pexels-this-and-no-internet-25-288559-29659893.jpg
public/images/ucas-summit-background.jpg
public/images/pexels-polina-tankilevitch-6929349.jpg (DUPLICATE - different copy used in students/)
```

### masterclass-thumbnails/ (4 unused files)

```
public/images/masterclass-thumbnails/gcse-summit-2024.png
public/images/masterclass-thumbnails/gcse-summit.png
public/images/masterclass-thumbnails/top-10-tips.png
public/images/masterclass-thumbnails/unlocking-success.png
```

### programmes/ (4 unused files)

```
public/images/programmes/programme-homeschooling-offer.webp
public/images/programmes/programme-eleven-plus-kickstarter.jpg
public/images/programmes/programme-eleven-plus-intensive.jpeg
public/images/programmes/programme-eleven-plus-intensive.webp
```

### hero/ (8 unused files)

```
public/images/hero/hero-testimonials-new.jpg
public/images/hero/hero-11-plus-bootcamp.webp
public/images/hero/hero-exam-papers-new.jpg
public/images/hero/hero-video-masterclasses.webp
public/images/hero/hero-subject-tuition-new.jpeg
public/images/hero/hero-video-masterclasses-new.jpg
public/images/hero/hero-exam-papers.jpg
public/images/hero/hero-how-it-works.webp
```

### about/ (5 unused files)

```
public/images/about/about-founder-story-old.jpg
public/images/about/about-company-ethos.png
public/images/about/going-against-grain-educational-philosophy.webp
public/images/about/about-company-ethos.webp
public/images/about/about-founder-story.webp
```

### video-thumbnails/ (1 unused file)

```
public/images/video-thumbnails/elizabeth-introduction-thumbnail.jpg
```

### students/ (3 unused files)

```
public/images/students/student-on-laptop-teacher-on-screen.webp
public/images/students/student-child.webp
public/images/students/student-teacher-inside-comfortable.webp
```

### logos/ (17 unused files)

```
public/images/logos/logo-icon-only.png
public/images/logos/st-pauls-school-logo.avif
public/images/logos/highgate-school-shield-new.jpg
public/images/logos/westminster-school-logo.avif
public/images/logos/school-highgate-shield.jpg
public/images/logos/eton-college-logo.avif
public/images/logos/imperial-college-logo-new.png
public/images/logos/ucl-university-logo-new.jpg
public/images/logos/eton-college-icon-new.png
public/images/logos/tagline-only.jpg
public/images/logos/logo-icon-only.jpg
public/images/logos/tagline-only.png
public/images/logos/logo-name-tagline.jpg
public/images/logos/university-of-oxford-logo.avif
public/images/logos/university-of-cambridge-logo.avif
public/images/logos/westminster-school-icon-new.png
public/images/logos/logo-with-name.jpg
```

### tutors/ (6 unused files + old_backup subdirectory)

```
public/images/tutors/michael.avif
public/images/tutors/alex-original.jpg
public/images/tutors/andreas.avif
public/images/tutors/alma.jpeg
public/images/tutors/amy.png
public/images/tutors/juliet-original.jpg
```

**ALSO DELETE**: `public/images/tutors/old_backup/` (entire subdirectory - 8 files)

### graphics/ (9 unused files)

```
public/images/graphics/feature-royal-endorsement.webp
public/images/graphics/enquiry-form-screenshot-footer.png
public/images/graphics/stat-families-served.webp
public/images/graphics/feature-built-on-trust.webp
public/images/graphics/stat-student-success.webp
public/images/graphics/feature-family-choice-approach.avif
public/images/graphics/feature-exam-insight.webp
public/images/graphics/stat-selective-tutors.webp
public/images/graphics/stat-top-performers-new.jpg
```

### features/ (13 unused files)

```
public/images/features/parent-guidance-school-selection.jpg
public/images/features/expert-tutor-matching.jpg
public/images/features/tailored-flexible-programmes.jpg
public/images/features/subject-specific-university-admissions-tests.jpg
public/images/features/confidence-building-lessons-early-learners.jpg
public/images/features/why-it-works.jpg
public/images/features/unique-pathway-global-gifted-learners.jpg
public/images/features/7-8-11-plus-specialists-track-record-top-school-offers.jpg
public/images/features/individual-learning-plans-expert-assessment.jpg
public/images/features/mock-exams-interview-practice.jpg
public/images/features/expert-sen-tutor-teams.jpg
public/images/features/how-we-work.jpg
public/images/features/deep-expertise-selective-schools.jpg
```

### team/ (3 unused files)

```
public/images/team/founder_headshot.avif
public/images/team/founder-elizabeth-burrows-professional-old-full-size.jpg
public/images/team/elizabeth-burrows-founder-alt.jpg
```

---

## Phase 5: Proposed New Directory Structure

```
public/images/
├── about/                    # About page images (2 files - keep only used ones)
│   ├── about-founder-story.jpg
│   └── cambridge-university.jpg
│
├── exam-papers/              # Exam resources (1 file - keep as-is)
│   └── exam-paper-preview.jpg
│
├── features/                 # Feature section photos (6 files after cleanup)
│   ├── aligned-with-every-major-exam-board.jpg
│   ├── individualised-learning.jpg
│   ├── personalised-plans-maximum-progress.jpg
│   ├── subjects-we-tutor.jpg
│   ├── tutoring-today-success-tomorrow.jpg
│   └── why-choose-homeschooling-with-us.jpg
│
├── graphics/                 # Stats, badges, icons (16 files after cleanup)
│   ├── bizstim-form-preview.png
│   ├── feature-british-heritage.jpeg
│   ├── feature-built-on-trust.jpeg
│   ├── feature-exam-insight.jpeg
│   ├── feature-oxbridge-success.jpg
│   ├── feature-royal-endorsement.jpg
│   ├── feature-why-families-choose-approach.jpg
│   ├── stat-eleven-plus-success.jpg
│   ├── stat-families-served.jpg
│   ├── stat-gcse-grade-improvement.svg
│   ├── stat-grade-improvement-new.jpg
│   ├── stat-pass-rate-new.jpg
│   ├── stat-school-offers.svg
│   ├── stat-selective-tutors.jpg
│   └── stat-student-success.jpg (if used)
│
├── hero/                     # Hero section images (7 files after cleanup)
│   ├── hero-11-plus-bootcamp.jpeg
│   ├── hero-exam-paper.jpg
│   ├── hero-how-it-works.jpeg
│   ├── hero-subject-tuition-primary.jpg
│   ├── hero-video-masterclasses.jpg
│   ├── testimonials-hero.jpg
│   └── [NEED TO ADD: premium-tutoring-hero.jpg]
│
├── how-it-works/             # NEW: Move loose root files here
│   ├── expert-tutor-matching.jpg
│   ├── flexible-scheduling.jpg
│   ├── initial-consultation.jpg
│   ├── personalised-learning-plan.jpg
│   └── progress-tracking.jpg
│
├── logos/                    # Brand and partner logos (29 files after cleanup)
│   └── [29 used logos - cleaned up]
│
├── masterclass-thumbnails/   # Masterclass page images (3 files + backgrounds)
│   ├── british-etiquette.jpg
│   ├── british-literary-classics.png
│   ├── ucas-guide.png
│   └── backgrounds/          # NEW: Consolidate background images
│       ├── british-classics-child-background.jpg
│       ├── british-etiquette-background.jpg
│       ├── ucas-part-1-mortar-board-background.jpg
│       ├── ucas-part-2-library-background.jpg
│       └── unlocking-academic-success-background.jpg
│
├── media/                    # Media section images (3 files - keep as-is)
│   ├── press-article-1.jpg
│   ├── press-article-2.jpg
│   └── press-article-3.jpg
│
├── programmes/               # Programme images (5 files after cleanup)
│   ├── eleven-plus-intensive-background-image.jpg
│   ├── eleven-plus-intensive-exam-preparation.jpg
│   ├── eleven-plus-kickstarter-background-image.jpg
│   ├── eleven-plus-kickstarter-online-tutoring.jpg
│   └── programme-homeschooling-offer.jpg
│
├── students/                 # Student photos (22 files after cleanup)
│   └── [Student photos - excellent usage]
│
├── team/                     # Founder and team photos (7 files after cleanup)
│   ├── elizabeth-burrows-founder-main.jpg
│   ├── elizabeth-burrows-founder-spare.jpg
│   ├── elizabeth-burrows-signature.png
│   ├── founder-elizabeth-burrows-portrait.jpg
│   ├── founder-elizabeth-burrows-professional.jpg
│   ├── founder-elizabeth-burrows-secondary.jpg
│   └── katherine-mother-sebastian-headshot.avif
│
├── testimonials/             # Testimonial photos (14 files - perfect, keep all)
│   └── [All testimonial images - 100% usage]
│
├── tutors/                   # Tutor headshots (20 files after cleanup)
│   └── [Individual tutor photos - good usage]
│
├── video-placeholders/       # Video placeholders (3 files - keep as-is)
│   ├── video-placeholder-1.jpg
│   ├── video-placeholder-2.jpg
│   └── video-placeholder-3.jpg
│
├── video-thumbnails/         # Video player thumbnails (3 files after cleanup)
│   ├── introduction-video-thumbnail-2025.png
│   ├── thumbnail-11-plus-expert-intro-video-mpto.png
│   └── top-10-tips-thumbnail.png
│
└── placeholder.svg           # NEW: Create universal placeholder

DELETED DIRECTORIES:
❌ thumbnails/               # 0% usage - completely unused
❌ timeline/                 # 0% usage - completely unused
❌ screenshots/              # 0% usage - completely unused
❌ tutors/old_backup/        # Old backup files
```

---

## Phase 6: Implementation Steps

### Step 1: Create Backup (CRITICAL)
```bash
cd /home/jack/Documents/my_private_tutor_online
cp -r public/images public/images-backup-2025-11-04
```

### Step 2: Create Missing Directories
```bash
mkdir -p public/images/how-it-works
mkdir -p public/images/masterclass-thumbnails/backgrounds
mkdir -p public/images/services
```

### Step 3: Move Root Files to Proper Locations

**Move How It Works images**:
```bash
mv public/images/expert-tutor-matching.jpg public/images/how-it-works/
mv public/images/flexible-scheduling.jpg public/images/how-it-works/
mv public/images/initial-consultation.jpg public/images/how-it-works/
mv public/images/personalised-learning-plan.jpg public/images/how-it-works/
mv public/images/progress-tracking.jpg public/images/how-it-works/
```

**Move Masterclass backgrounds**:
```bash
mv public/images/british-classics-child-background.jpg public/images/masterclass-thumbnails/backgrounds/
mv public/images/british-etiquette-background.jpg public/images/masterclass-thumbnails/backgrounds/
mv public/images/ucas-part-1-mortar-board-background.jpg public/images/masterclass-thumbnails/backgrounds/
mv public/images/ucas-part-2-library-background.jpg public/images/masterclass-thumbnails/backgrounds/
mv public/images/unlocking-academic-success-background.jpg public/images/masterclass-thumbnails/backgrounds/
```

### Step 4: Delete Entire Unused Directories
```bash
rm -rf public/images/thumbnails/
rm -rf public/images/timeline/
rm -rf public/images/screenshots/
rm -rf public/images/tutors/old_backup/
```

### Step 5: Delete Unused Individual Files
**(Execute deletion commands from complete list above)**

### Step 6: Create Placeholder SVG
```bash
# Create simple placeholder.svg
cat > public/images/placeholder.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#E5E7EB"/>
  <text x="50%" y="50%" text-anchor="middle" fill="#6B7280" font-family="Arial" font-size="18">
    Image Placeholder
  </text>
</svg>
EOF
```

### Step 7: Fix Broken References

**Create services directory images** (or update references to point to existing images)

**Update business-content.json** to fix services/ references

**Update team references** to point to existing team member images

---

## Phase 7: Validation & Testing

### Validation Checklist
- [ ] Run build: `npm run build` - ensure no broken image errors
- [ ] Test homepage: All images load correctly
- [ ] Test about page: Founder images load
- [ ] Test testimonials page: All testimonial images load
- [ ] Test video masterclasses: Thumbnails and backgrounds load
- [ ] Test subject tuition: All category images work
- [ ] Test how-it-works page: Process images load correctly
- [ ] Verify placeholder.svg is used where expected
- [ ] Check console for 404 image errors
- [ ] Visual regression testing on all pages

### Post-Cleanup Verification
```bash
# Verify no broken references
cd /home/jack/Documents/my_private_tutor_online
/tmp/find-broken-refs.sh

# Count remaining images
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.svg" -o -name "*.webp" -o -name "*.gif" -o -name "*.avif" \) | wc -l

# Expected result: ~152 images (down from 250)
```

---

## Expected Results

### Before Cleanup
- **Total Images**: 250 files
- **Directories**: 20 directories
- **Broken References**: 15
- **Unused Files**: 98 (39.2%)
- **0% Usage Directories**: 3
- **Root Files**: 21 loose files

### After Cleanup
- **Total Images**: ~152 files (**39.2% reduction**)
- **Directories**: ~16 directories (4 deleted)
- **Broken References**: 0 (**100% fixed**)
- **Unused Files**: 0 (**100% cleaned**)
- **0% Usage Directories**: 0 (**all removed**)
- **Root Files**: 1 (placeholder.svg only)
- **New Organized Directories**: 2 (how-it-works/, masterclass-thumbnails/backgrounds/)

### Benefits
1. **Cleaner codebase** - No dead/unused assets
2. **Faster builds** - Fewer files to process
3. **Better organization** - Logical directory structure
4. **No broken links** - All references valid
5. **Easier maintenance** - Clear purpose for each directory
6. **Smaller repository** - ~39% fewer image files
7. **Better developer experience** - Easy to find images

---

## Risk Assessment

### Low Risk ✅
- Deleting 0% usage directories (thumbnails/, timeline/, screenshots/)
- Deleting obviously unused stock photos (pexels-*.jpg)
- Creating placeholder.svg
- Moving root files to organized subdirectories

### Medium Risk 🟡
- Deleting unused variations (webp/avif alternatives)
- Consolidating thumbnail directories
- Deleting old_backup subdirectory

### High Risk 🔴
- Fixing broken team/testimonial references (need to verify correct replacements)
- Creating/updating services/ directory images
- Deleting files from features/ and graphics/ (verify truly unused)

### Mitigation Strategy
1. **Always create backup first** (Step 1)
2. **Test thoroughly after each phase**
3. **Keep backup for 30 days** before final deletion
4. **Run build and verify no errors**
5. **Manual visual testing** on all major pages

---

## Notes for Implementation

- This is a **ONE-WAY operation** - backup is critical
- Consider implementing **in stages** (test after each directory cleanup)
- **DO NOT delete backup** until production deployment is verified
- Some unused files might be **planned for future use** - verify with stakeholder
- The **tutors/old_backup/** directory is almost certainly safe to delete
- **WebP/AVIF alternatives** might be used by Next.js Image component - verify before deleting

---

**Status**: Ready for stakeholder review and approval
**Next Step**: Get approval to proceed with Phase 6 implementation
