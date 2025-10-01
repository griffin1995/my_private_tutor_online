# COMPREHENSIVE CLAUDE RESEARCH PROMPT
**ADVANCED VIDEO INTEGRATION TECHNICAL INVESTIGATION**

---

## 🎯 RESEARCH OBJECTIVE

You are tasked with conducting comprehensive technical research to solve a critical video integration failure affecting a £400,000+ revenue opportunity. This investigation requires deep analysis of React component architecture, TypeScript data flow patterns, and CMS integration systems.

## 🏗️ COMPLETE TECHNICAL CONTEXT

### **PROJECT SPECIFICATIONS**
- **Application**: My Private Tutor Online (Premium tutoring service)
- **Technology Stack**: Next.js 15.3.4 App Router, React 19, TypeScript 5.8+, Tailwind CSS 3.4.1
- **Deployment Environment**: Vercel with force-dynamic rendering
- **Component Library**: Magic UI HeroVideoDialog integration
- **CMS Architecture**: Synchronous data access patterns (CRITICAL for homepage stability)
- **Business Impact**: Lead generation system blockage, conversion funnel disruption

### **CRITICAL PROBLEM STATEMENT**

**TARGET FAILURE**: Two specific YouTube videos ("UCAS Summit 2024" and "Unlocking Academic Success") should render as interactive HeroVideoDialog players on the `/video-masterclasses` page but only display static "Watch." text instead of functional video players.

**EXPECTED BEHAVIOR**: Interactive video players with thumbnail previews and modal dialogs
**ACTUAL BEHAVIOR**: Non-functional static text elements with missing video integration
**BUSINESS CONSEQUENCE**: Complete lead generation system failure for free video content strategy

---

## 📊 COMPREHENSIVE INVESTIGATION HISTORY

### **PHASE 1: INITIAL DIAGNOSTIC ANALYSIS**

**CMS Data Verification Results:**
- ✅ Both target videos properly configured in `/src/lib/cms/COMPREHENSIVE_VIDEO_CMS.ts`
- ✅ YouTube embed URLs validated with tracking parameters
- ✅ Thumbnail images confirmed present in `/public/videos/` directory
- ✅ Component architecture mapping verified: VideoMasterclassSection → HeroVideoDialog

**Key Finding**: Data layer configuration appears correct, suggesting render-time integration failure.

### **PHASE 2: DEEP COMPONENT LOGIC ANALYSIS**

**Conditional Rendering Investigation:**
```typescript
// VideoMasterclassSection.tsx - Line 151-152
{videoUrl && videoUrl.trim() !== '' ? (
  <HeroVideoDialog 
    videoSrc={videoUrl}
    thumbnailSrc={thumbnailUrl}
    thumbnailAlt={`${video.title} Thumbnail`}
  />
) : null}
```

**Critical Discovery**: Property mismatch identified
- **CMS Provides**: `youtubeUrl` property
- **Component Expects**: `videoUrl` property
- **Context7 Validation**: React.dev patterns confirmed conditional logic as architecturally sound

### **PHASE 3: PROPERTY MAPPING IMPLEMENTATION ATTEMPT**

**Transformation Applied:**
```typescript
// Added to VideoMasterclassSection.tsx
videoUrl: videoData.youtubeUrl || ""
```

**Additional Updates:**
- Modified `cms-images.ts` transformation layers
- TypeScript compilation successful (no errors)
- Build process completed without issues

**Result**: Videos still non-functional (fix ineffective, suggesting deeper architectural issue)

### **PHASE 4: MULTI-AGENT DEEP INVESTIGATION**

**Component Architecture Agent Findings:**
- React lifecycle verification: ✅ Correct
- HeroVideoDialog integration patterns: ✅ Valid
- Component mounting and rendering: ✅ No issues detected

**Data Flow Agent Critical Discovery:**
- **MISSING EXPORT**: `MASTERCLASS_VIDEOS` not exported from `cms-images.ts`
- **Import Chain Failure**: `video-utils.ts` attempts import of non-existent export
- **Silent Runtime Error**: JavaScript undefined import causing cascade failure

**Browser Runtime Agent Analysis:**
- **TypeError Occurrence**: Undefined import preventing data population
- **Component Mounting**: Successfully mounts but receives empty data
- **Conditional Logic**: Evaluates to false due to missing data, renders fallback content

---

## 🔧 COMPLETE FILE STRUCTURE ANALYSIS

### **CRITICAL FILE MAPPING**

1. **`/src/lib/cms/COMPREHENSIVE_VIDEO_CMS.ts`**
   - **Role**: Source video data repository (6 videos total)
   - **Status**: ✅ Contains correct configuration for both target videos
   - **Key Data**: YouTube URLs, thumbnails, payment status, titles

2. **`/src/lib/cms/cms-images.ts`**
   - **Role**: Central CMS data aggregation and export layer
   - **Status**: ❌ Contains COMPREHENSIVE_VIDEO_CMS data but MISSING EXPORT
   - **Critical Issue**: No `export { MASTERCLASS_VIDEOS }` statement

3. **`/src/lib/video/video-utils.ts`**
   - **Role**: Video utility functions and data access layer
   - **Status**: ❌ Attempts import of non-existent `MASTERCLASS_VIDEOS`
   - **Import Statement**: `import { MASTERCLASS_VIDEOS } from '../cms/cms-images';`

4. **`/src/components/video/VideoMasterclassSection.tsx`**
   - **Role**: Individual video component renderer
   - **Status**: ⚠️ Correct logic but receives undefined data
   - **Dependency**: Relies on video-utils.ts for data access

5. **`/src/components/video/VideoMasterclassGrid.tsx`**
   - **Role**: Batch video renderer and grid layout
   - **Status**: ⚠️ Calls VideoMasterclassSection with empty data
   - **Rendering**: Successfully renders grid but with no video content

6. **`/src/app/video-masterclasses/page.tsx`**
   - **Role**: Main page component utilizing video components
   - **Status**: ✅ Correct component integration
   - **Rendering**: Page loads but videos don't display

### **DATA FLOW PIPELINE (BROKEN)**

```
COMPREHENSIVE_VIDEO_CMS.ts (✅ data exists)
    ↓
cms-images.ts (❌ contains data but NO EXPORT)
    ↓
video-utils.ts (❌ import fails - undefined)
    ↓
VideoMasterclassGrid (⚠️ receives undefined)
    ↓
VideoMasterclassSection (⚠️ conditional evaluates false)
    ↓
HeroVideoDialog (❌ never instantiated)
```

---

## 📋 SPECIFIC TECHNICAL CONFIGURATION

### **VIDEO DATA STRUCTURE**
```typescript
// Target video configuration in COMPREHENSIVE_VIDEO_CMS.ts
{
  id: "ucasSummit2024",
  title: "UCAS Summit 2024",
  youtubeUrl: "https://www.youtube.com/embed/IfF9zSzuceY?si=7_tmYovUVVfqLX0D",
  thumbnailImage: "/videos/ucas-summit-2024-thumbnail.png",
  isPaid: false // FREE video requiring HeroVideoDialog
},
{
  id: "unlockingAcademicSuccess",
  title: "Unlocking Academic Success",
  youtubeUrl: "https://www.youtube.com/embed/another-youtube-id",
  thumbnailImage: "/videos/unlocking-academic-success-thumbnail.png",
  isPaid: false // FREE video requiring HeroVideoDialog
}
```

### **CONDITIONAL RENDERING LOGIC**
```typescript
// VideoMasterclassSection.tsx critical evaluation
const videoUrl = videoData.youtubeUrl || "";
const shouldShowDialog = videoUrl && videoUrl.trim() !== '';

return shouldShowDialog ? (
  <HeroVideoDialog 
    videoSrc={videoUrl}
    thumbnailSrc={thumbnailUrl}
    thumbnailAlt={`${video.title} Thumbnail`}
  />
) : (
  <span>Watch.</span> // FALLBACK currently rendering
);
```

### **IMPORT/EXPORT CHAIN FAILURE**
```typescript
// video-utils.ts (FAILING)
import { MASTERCLASS_VIDEOS } from '../cms/cms-images';
// ❌ MASTERCLASS_VIDEOS is undefined - export doesn't exist

// cms-images.ts (MISSING EXPORT)
import { COMPREHENSIVE_VIDEO_CMS } from './COMPREHENSIVE_VIDEO_CMS';
// ✅ Data imported successfully
// ❌ MISSING: export { COMPREHENSIVE_VIDEO_CMS as MASTERCLASS_VIDEOS };
```

---

## 🎯 BUSINESS LOGIC REQUIREMENTS

### **VIDEO CLASSIFICATION SYSTEM**
- **Free Videos (isPaid: false)**: Must display as interactive HeroVideoDialog players
  - Purpose: Lead generation and engagement
  - Functionality: Modal overlay, play controls, tracking
  - Current Status: ❌ Broken (showing static text)

- **Paid Videos (isPaid: true)**: Display as static images with Stripe payment links
  - Purpose: Revenue generation
  - Functionality: Payment integration, access control
  - Current Status: ✅ Working correctly

- **Bootcamp Videos**: Static images with Stripe subscription links
  - Purpose: Premium tier conversion
  - Functionality: Subscription integration
  - Current Status: ✅ Working correctly

### **SPECIFIC TARGET REQUIREMENTS**
Only the 2 free YouTube videos need fixing:
1. "UCAS Summit 2024" 
2. "Unlocking Academic Success"

All other video types are functioning correctly.

---

## 🔬 ENVIRONMENT SPECIFICATIONS

### **TECHNICAL STACK DETAILS**
- **Next.js**: 15.3.4 App Router with force-dynamic rendering in layout.tsx
- **React**: 19.0 with client-side components ("use client" directive)
- **TypeScript**: 5.8+ with strict mode enabled
- **Component Library**: Magic UI HeroVideoDialog with modal functionality
- **Build System**: Vercel deployment generating 91 optimized routes
- **Performance Targets**: <1.5s load times, <25s build time

### **CMS ARCHITECTURE CONSTRAINTS**
- **CRITICAL**: Synchronous data access only (async patterns cause homepage failures)
- **Pattern**: Direct JSON imports, no Promise-based functions
- **History**: August 2025 async CMS implementation caused complete homepage failure
- **Requirement**: All CMS functions must return data immediately without loading states

### **DEPLOYMENT CONTEXT**
- **Environment**: Vercel production deployment
- **URL**: https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app
- **Rendering**: Dynamic with React.Children.only compatibility
- **Build Verification**: Local `npm run build` required before deployment

---

## 🔍 RESEARCH REQUIREMENTS

### **PRIMARY RESEARCH OBJECTIVES**

1. **Export Syntax Investigation**
   - Research correct TypeScript export patterns for cms-images.ts
   - Identify best practices for re-exporting imported CMS data
   - Investigate named export vs default export implications

2. **Magic UI HeroVideoDialog Integration**
   - Document correct props and configuration patterns
   - Research modal dialog best practices with YouTube embeds
   - Investigate thumbnail preview and overlay functionality

3. **React 19 Component Architecture**
   - Research latest patterns for conditional component rendering
   - Investigate data flow optimization in Next.js 15.3.4
   - Document client-side component integration with CMS data

4. **TypeScript Import/Export Chain Optimization**
   - Research module resolution patterns for complex data pipelines
   - Investigate TypeScript type safety in CMS data transformations
   - Document best practices for utility function data access

### **SPECIFIC TECHNICAL RESEARCH AREAS**

1. **CMS Data Export Patterns**
   ```typescript
   // Research: Correct export syntax for cms-images.ts
   export { COMPREHENSIVE_VIDEO_CMS as MASTERCLASS_VIDEOS } from './COMPREHENSIVE_VIDEO_CMS';
   // vs
   import { COMPREHENSIVE_VIDEO_CMS } from './COMPREHENSIVE_VIDEO_CMS';
   export const MASTERCLASS_VIDEOS = COMPREHENSIVE_VIDEO_CMS;
   ```

2. **Component Data Flow Optimization**
   - Investigation: Why property mapping failed in Phase 3
   - Research: Alternative data transformation approaches
   - Analysis: Component lifecycle and data availability timing

3. **Video Integration Architecture**
   - Research: Magic UI HeroVideoDialog YouTube embed patterns
   - Investigation: Modal dialog performance optimization
   - Analysis: Thumbnail loading and preview functionality

### **DEBUGGING METHODOLOGY REQUIREMENTS**

1. **Step-by-Step Data Flow Tracing**
   - Trace data from COMPREHENSIVE_VIDEO_CMS.ts through entire pipeline
   - Identify exact point of failure in import/export chain
   - Document data transformation at each pipeline stage

2. **Component Rendering Analysis**
   - Research conditional rendering evaluation in React 19
   - Investigate component mounting and data availability
   - Document fallback rendering behavior

3. **TypeScript Compilation Investigation**
   - Research module resolution in Next.js 15.3.4
   - Investigate import/export type checking
   - Document build-time vs runtime error patterns

---

## 🎯 EXPECTED RESEARCH DELIVERABLES

### **IMMEDIATE SOLUTION REQUIREMENTS**

1. **Exact Export Syntax**: Precise TypeScript code for cms-images.ts export statement
2. **Component Integration**: Verified HeroVideoDialog implementation pattern
3. **Data Flow Validation**: Complete pipeline verification methodology
4. **Testing Protocol**: Step-by-step validation approach for video functionality

### **COMPREHENSIVE ANALYSIS**

1. **Root Cause Documentation**: Complete technical explanation of import/export failure
2. **Implementation Guide**: Step-by-step fix implementation with Context7 source attribution
3. **Prevention Strategy**: Architectural patterns to prevent similar failures
4. **Performance Impact**: Analysis of fix implementation on build and runtime performance

### **CONTEXT7 COMPLIANCE**

All research must be conducted using Context7 MCP documentation exclusively:
- `mcp__context7__resolve-library-id` → `mcp__context7__get-library-docs`
- ZERO external sources (no blogs, Stack Overflow, community tutorials)
- Mandatory source attribution for all implementation patterns
- Official documentation backing for every code change

---

## 🚨 CRITICAL SUCCESS CRITERIA

### **FUNCTIONAL REQUIREMENTS**
1. ✅ Free videos render as interactive HeroVideoDialog players
2. ✅ Modal overlays function correctly with YouTube embeds
3. ✅ Thumbnail previews display and are clickable
4. ✅ Video playback controls work within modal dialogs
5. ✅ Static "Watch." fallback no longer appears for free videos

### **TECHNICAL REQUIREMENTS**
1. ✅ TypeScript compilation without errors
2. ✅ Build process completes successfully (<25s)
3. ✅ No runtime JavaScript errors in browser console
4. ✅ Synchronous CMS data access maintained
5. ✅ Component architecture follows React 19 best practices

### **BUSINESS REQUIREMENTS**
1. ✅ Lead generation system restored (£400,000+ revenue opportunity)
2. ✅ Free video strategy functional for user engagement
3. ✅ Conversion funnel operates correctly
4. ✅ Premium service standards maintained (royal client quality)

---

**RESEARCH PRIORITY**: URGENT - Business critical functionality affecting revenue generation and lead conversion systems.

**CONTEXT7 DOCUMENTATION MANDATORY**: All implementation patterns must be backed by official Context7 MCP documentation with source attribution.

**INVESTIGATION SCOPE**: Focus specifically on export/import chain resolution and HeroVideoDialog integration patterns for YouTube embed functionality.