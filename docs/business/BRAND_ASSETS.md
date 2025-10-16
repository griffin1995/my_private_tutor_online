# Brand Assets Organization Guide

**Documentation Source**: Context7 MCP - Asset Management Best Practices  
**Reference**: Digital asset organization for web development projects

## Directory Structure

### Logo Files - `/public/images/logos/`

**Production-ready logo assets for web use:**

- `My Private Tutor-01.png` - Main logo variant (PNG)
- `My Private Tutor-02.png` - Logo with tagline (PNG)
- `My Private Tutor-03.png` - Logo icon only (PNG)
- `My Private Tutor-04.png` - Alternative layout (PNG)
- `My Private Tutor-01.jpg` - Main logo variant (JPG)
- `My Private Tutor-02.jpg` - Logo with tagline (JPG)
- `My Private Tutor-03.jpg` - Logo icon only (JPG)
- `My Private Tutor-04.jpg` - Alternative layout (JPG)

**Usage**: Use these optimized files in React components via Next.js Image
component

### Font Files - `/public/fonts/`

- `PlayfairDisplay-Regular.ttf` - Playfair Display font file
- `playfair-display-regular.ttf` - Existing font file

**Usage**: Referenced in layout.tsx Google Fonts implementation

### High-Resolution Source Files - `/public/brand-assets/source-files/`

**Professional design files for print and high-resolution use:**

- `My Private Tutor.ai` - Adobe Illustrator source file
- `My Private Tutor.eps` - Encapsulated PostScript vector file
- `My Private Tutor.pdf` - PDF brand guidelines/logo sheet

**Usage**: For print materials, high-resolution exports, and design
modifications

## Implementation Notes

### Logo Usage in Components

```typescript
// Next.js Image component implementation
import Image from 'next/image'

<Image
  src="/images/logos/My Private Tutor-01.png"
  alt="My Private Tutor Online - Premium Educational Services"
  width={180}
  height={60}
  priority
/>
```

### Current Active Logo

The main logo referenced in `landing-page.json` is:

```json
{
	"logo": {
		"main": "/uploads/logo.png",
		"alt": "My Private Tutor Online - Premium Educational Services",
		"width": 180,
		"height": 60
	}
}
```

## Asset Optimization

### Recommended Usage

- **PNG files**: Use for logos with transparency requirements
- **JPG files**: Use for simple logos without transparency needs
- **Source files**: Keep for future design modifications and print materials

### Next.js Integration

All logo assets are automatically optimized by Next.js Image component when
properly implemented with width/height attributes.

---

**Asset Migration Completed**: 2025-08-04  
**Status**: All brand assets properly organized and accessible  
**Location**: Brand assets successfully moved from root "My Private Tutor - SF"
directory
