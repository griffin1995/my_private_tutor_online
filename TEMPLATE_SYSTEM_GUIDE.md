# St Saviour's Website - Template System & Color Guide

## 🎯 **FOUND THE GRAY BACKGROUND ISSUE!**

**Problem**: All pages (except homepage) show gray background instead of white
**Root Cause**: Pages use `/src/components/layout/PageLayout.tsx` which has gray background options
**Location**: Line 58 in `/src/components/layout/PageLayout.tsx`

### **Quick Fix for Gray Background**
If pages show gray background instead of white:
1. Check `/src/components/layout/PageLayout.tsx` lines 56-60
2. Ensure `backgroundClasses.white = 'bg-white'` 
3. Verify pages use `background="white"` prop in PageLayout

---

## 📐 **Template Architecture**

### **Homepage Structure (Unique)**
```
/src/pages/index.tsx
├── Navigation
├── HeroSection (custom)
├── WelcomeSection
├── NewsSection  
├── HistorySection
├── EventsSection
├── CTASection
└── Footer
```

### **All Other Pages Structure (Template-Based)**
```
/src/pages/[page].tsx
├── PageLayout (wrapper)
│   ├── Navigation
│   ├── main
│   │   ├── PageHero
│   │   ├── Section (repeatable)
│   │   │   ├── Container
│   │   │   ├── Grid/Flex
│   │   │   └── Content
│   │   └── [More Sections...]
│   └── Footer
```

---

## 🎨 **Color System**

### **Current Design System**
- **Primary**: Navy/Slate-900 (`#0f172a`) 
- **Secondary**: Gold-500/600 (`#f59e0b`, `#d97706`)
- **Background**: White (`#ffffff`)
- **Text**: Slate-900 for headings, Gray-600 for body

### **Template Components & Color Control**

#### **1. PageLayout.tsx** - Main page wrapper
```typescript
// Location: /src/components/layout/PageLayout.tsx
// Controls: Overall page background
// Key Props: background="white" | "gray" | "slate"

// Lines 56-60: Background classes
const backgroundClasses = {
  white: 'bg-white',    // ← Use this for white pages
  gray: 'bg-gray-50',   // ← This causes gray background!
  slate: 'bg-slate-900'
}
```

#### **2. PageHero.tsx** - Hero sections
```typescript
// Location: /src/components/layout/PageHero.tsx  
// Controls: Hero image, overlay, title styling
// Key Props: backgroundImage, overlay, height

// Line 118: Description text color
className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
```

#### **3. Section.tsx** - Content sections
```typescript
// Location: /src/components/ui/Container.tsx
// Controls: Individual section backgrounds
// Key Props: background="white" | "navy" | "slate"

// Lines 70-75: Section background options
background: {
  white: 'bg-white',
  navy: 'bg-navy-900 text-white',    // ← Navy sections
  'navy-light': 'bg-navy-50',
  slate: 'bg-slate-900',
  transparent: 'bg-transparent'
}
```

#### **4. Typography.tsx** - Text colors
```typescript
// Location: /src/components/ui/Typography.tsx
// Controls: Heading and text colors
// Default: slate-900 for headings

// Lines 21-26: Color variants
color: {
  default: 'text-slate-900',  // ← Main text color
  muted: 'text-gray-600',     // ← Secondary text
  gold: 'text-gold-600',      // ← Accent color
  white: 'text-white'
}
```

---

## 🔧 **How to Change Colors**

### **To Update Page Background Colors:**
1. **For ALL pages**: Modify `/src/components/layout/PageLayout.tsx` lines 56-60
2. **For specific pages**: Change `background` prop in PageLayout usage
3. **For sections**: Change `background` prop in Section components

### **To Update Accent Colors:**
1. **Individual components**: Update color classes in page files
2. **System-wide**: Update `/src/tailwind.config.js` color definitions
3. **Gradients**: Search for `from-navy-` and `to-navy-` patterns

### **To Update Text Colors:**
1. **Typography system**: Modify `/src/components/ui/Typography.tsx`
2. **Individual text**: Use color prop or className overrides

---

## 📋 **Page Color Audit Results**

### **✅ Updated to Navy Color Scheme:**
- All gradient colors changed from mixed colors to navy variants
- Card backgrounds use white (`bg-white`)
- Text uses slate-900 for consistency
- Accent elements use gold-500/600

### **🎯 Common Color Patterns Now Used:**
- `from-navy-400 to-navy-500` (light navy gradients)
- `from-navy-600 to-navy-700` (medium navy gradients)  
- `from-navy-800 to-navy-900` (dark navy gradients)
- `bg-navy-600`, `bg-navy-700`, `bg-navy-800` (solid navy backgrounds)
- `text-navy-600`, `text-navy-700` (navy text colors)

---

## 🚨 **Troubleshooting Gray Backgrounds**

### **Issue**: Pages show gray instead of white background
**Check these locations:**

1. **Primary suspect**: `/src/components/layout/PageLayout.tsx`
   - Line 46: `background = 'white'` (default prop)
   - Lines 56-60: `backgroundClasses` object
   - Line 163: Class application

2. **Secondary suspects**:
   - Page-level background props
   - Global CSS in `/src/styles/globals.css`
   - Section-level background overrides

3. **Debugging steps**:
   ```bash
   # Check for gray background classes
   grep -r "bg-gray" src/pages/
   grep -r "background.*gray" src/pages/
   
   # Verify PageLayout usage
   grep -r "PageLayout" src/pages/ | head -5
   ```

### **Quick Fix Commands:**
```bash
# Reset all page backgrounds to white
find src/pages -name "*.tsx" -exec sed -i 's/background="gray"/background="white"/g' {} \;

# Force PageLayout to default to white
sed -i 's/background = .gray./background = "white"/g' src/components/layout/PageLayout.tsx
```

---

## 📝 **Template Modification Examples**

### **Adding a New Page:**
```typescript
// Pattern: Copy existing page structure
import { PageLayout, PageHero } from '@/components/layout'
import { Section, Container, Heading, Text } from '@/components/ui'

export default function NewPage() {
  return (
    <PageLayout 
      title="Page Title"
      background="white"  // ← Ensures white background
    >
      <PageHero 
        title="Hero Title"
        backgroundImage="/images/hero/page-image.jpg"
      />
      
      <Section spacing="lg" background="white">
        <Container>
          <Heading level="h2">Section Title</Heading>
          <Text>Content here...</Text>
        </Container>
      </Section>
    </PageLayout>
  )
}
```

### **Creating Navy Accent Sections:**
```typescript
<Section spacing="lg" background="navy">
  <Container>
    <Heading level="h2" color="white">White Text on Navy</Heading>
    <Text color="white">Navy section content...</Text>
  </Container>
</Section>
```

---

## 🎯 **Summary**

**Template System**: ✅ Working correctly - all pages use consistent PageLayout → PageHero → Section structure
**Color System**: ✅ Updated to navy/gold scheme throughout  
**Gray Background Issue**: 🔍 Located in PageLayout component - easily fixable
**Documentation**: ✅ Complete guide for future modifications

**Next time you need to change colors**: Refer to this guide and modify the template components rather than individual pages!

---

*Last Updated: 2025-07-02*  
*Issue Status: Identified and documented*