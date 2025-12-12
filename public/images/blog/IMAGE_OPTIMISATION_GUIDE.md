# Blog Image Optimisation Guide

## Overview

This guide documents the professional image optimisation workflow for My Private Tutor Online blog system. All blog images are web-optimised, category-branded, and maintain premium quality standards.

## Image Specifications

### Technical Requirements
- **Dimensions**: 1200x675px (16:9 aspect ratio)
- **Format**: JPEG with progressive encoding
- **File Size**: <200KB per image (target: ~105KB achieved)
- **Quality**: 82% JPEG quality (reduced to 75% if exceeds 200KB)
- **Colour Space**: sRGB

### Current Implementation
- **Total Images**: 11 blog images
- **Average File Size**: 105-106KB per image
- **Total Directory Size**: 2.7MB
- **Performance**: Optimised for fast web delivery on all devices

## Image Inventory

### 1. education-insights-header.jpg (105KB)
- **Category**: General header/fallback
- **Usage**: Default header for blog system
- **Overlay**: None (original image, optimised)

### 2. selective-schools-admissions.jpg (105KB)
- **Category**: School Applications
- **Overlay**: Navy (#3F4A7E) at 15% opacity
- **Usage**: School admissions and applications content

### 3. study-routine-without-burnout.jpg (105KB)
- **Category**: Exam Preparation
- **Overlay**: Gold (#CA9E5B) at 12% opacity
- **Usage**: Study routines and exam preparation content

### 4. navigating-entry-points.jpg (105KB)
- **Category**: School Applications
- **Overlay**: Navy (#3F4A7E) at 18% opacity
- **Usage**: School entry points and transitions

### 5. personalised-tutoring-cognitive-science.jpg (105KB)
- **Category**: Exam Preparation
- **Overlay**: Gold (#CA9E5B) at 15% opacity
- **Usage**: Tutoring methodology and cognitive science

### 6. independent-school-interviews.jpg (105KB)
- **Category**: School Applications
- **Overlay**: Navy (#3F4A7E) at 20% opacity
- **Usage**: Interview preparation and school selection

### 7. high-achievers-sen-support.jpg (105KB)
- **Category**: Child Wellbeing
- **Overlay**: Light Blue (#8B9DC3) at 12% opacity
- **Usage**: SEN support and wellbeing content

### 8. motivating-child-without-pressure.jpg (105KB)
- **Category**: Child Wellbeing
- **Overlay**: Light Blue (#8B9DC3) at 15% opacity
- **Usage**: Motivation and child psychology

### 9. gcse-a-level-success-year-7.jpg (105KB)
- **Category**: Exam Preparation
- **Overlay**: Gold (#CA9E5B) at 18% opacity
- **Usage**: Long-term exam preparation strategies

### 10. revision-techniques-research.jpg (105KB)
- **Category**: Exam Preparation
- **Overlay**: Gold (#CA9E5B) at 10% opacity
- **Usage**: Research-based revision techniques

### 11. homeschooling-excellence.jpg (105KB)
- **Category**: Home Schooling
- **Overlay**: Slate Blue (#6B7AA1) at 15% opacity
- **Usage**: Home education content

## Category Colour Coding

The overlay colour system provides subtle visual distinction between blog categories while maintaining professional consistency:

| Category | Colour | Hex Code | Opacity Range |
|----------|--------|----------|---------------|
| School Applications | Navy | #3F4A7E | 15-20% |
| Exam Preparation | Gold | #CA9E5B | 10-18% |
| Child Wellbeing | Light Blue | #8B9DC3 | 12-15% |
| Home Schooling | Slate Blue | #6B7AA1 | 15% |

These colours align with the My Private Tutor Online design system (primary navy #3F4A7E, accent gold #CA9E5B).

## Optimisation Workflow

### Automated Script
The optimisation workflow is automated via `/scripts/optimise-blog-images.sh`:

```bash
bash /home/jack/Documents/my_private_tutor_online_old_dec/scripts/optimise-blog-images.sh
```

### Manual Process (ImageMagick)
For individual image optimisation:

```bash
# Basic optimisation (resize + quality)
convert source.jpg \
  -resize 1200x675^ \
  -gravity center \
  -extent 1200x675 \
  -quality 82 \
  -strip \
  output.jpg

# With category overlay (e.g., School Applications - Navy)
convert source.jpg \
  -resize 1200x675^ \
  -gravity center \
  -extent 1200x675 \
  -fill "#3F4A7E" \
  -colorize 0.15 \
  -modulate 102,105,100 \
  -quality 82 \
  -strip \
  output.jpg
```

### ImageMagick Parameters Explained
- `-resize 1200x675^` - Resize to 1200x675px minimum (^ = fill)
- `-gravity center` - Center the crop point
- `-extent 1200x675` - Crop to exact dimensions
- `-fill "#COLOUR"` - Overlay colour
- `-colorize 0.15` - Apply overlay at 15% opacity
- `-modulate 102,105,100` - Brightness 102%, saturation 105%, hue 100%
- `-quality 82` - JPEG quality (reduced to 75 if >200KB)
- `-strip` - Remove metadata to reduce file size

## Performance Benefits

### Before Optimisation
- Original header: 1.5MB (5630x3366px)
- Total estimated: ~15MB for 10 images

### After Optimisation
- All images: 105-106KB each (1200x675px)
- Total directory: 2.7MB
- **Performance gain**: 82% reduction in file size

### Web Performance Impact
- Faster page loads on all devices
- Reduced bandwidth consumption
- Improved mobile experience
- Better SEO (Core Web Vitals)

## Adding New Blog Images

### Option 1: Use Automated Script
1. Place new source image in `/public/images/blog/`
2. Update `IMAGES` array in `/scripts/optimise-blog-images.sh`
3. Run optimisation script: `bash /scripts/optimise-blog-images.sh`

### Option 2: Manual ImageMagick
1. Identify category and select appropriate overlay colour
2. Run ImageMagick command with category-specific parameters
3. Verify file size <200KB
4. Place optimised image in `/public/images/blog/`

## Quality Standards

All blog images must meet these premium tutoring service standards:

- **Professional Aesthetic**: Educational theme consistent with brand
- **Visual Consistency**: Subtle overlays, not jarring colour shifts
- **Web Performance**: Fast loading on mobile, tablet, desktop
- **Accessibility**: Sufficient contrast for text overlays
- **Royal Client Quality**: Enterprise-grade image processing

## Maintenance

### Regular Tasks
- Monitor file sizes when adding new images
- Verify category colour coding remains consistent
- Test image loading performance on various devices
- Backup original source images before optimisation

### Troubleshooting
- **Image >200KB**: Reduce quality to 75% or lower
- **Colour inconsistency**: Verify overlay hex codes match design system
- **Aspect ratio issues**: Ensure 1200x675px (16:9) dimensions maintained
- **Loading performance**: Verify progressive JPEG encoding enabled

## Technical Notes

### ImageMagick Version
- Version: ImageMagick 6.9.12-98 Q16 x86_64
- Required for optimisation script

### File Backup
Original header image backed up as `education-insights-header.jpg.backup` before optimisation.

### Browser Compatibility
Progressive JPEG format ensures:
- Incremental loading on slow connections
- Universal browser support
- Optimal compression-to-quality ratio

---

**Last Updated**: December 2025
**Optimisation Script**: `/scripts/optimise-blog-images.sh`
**Contact**: Technical documentation for My Private Tutor Online development team
