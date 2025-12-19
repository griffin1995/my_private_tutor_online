# Layout Optimization Implementation Roadmap

## Overview
Research-driven analysis of frontend layout.tsx architecture identified 8 critical issues requiring systematic resolution. This roadmap provides the optimal implementation order to minimise conflicts and maximise efficiency.

## Executive Summary
- **Total Issues**: 8 architectural concerns
- **Priority Levels**: 3 Critical, 3 High, 2 Medium
- **Estimated Effort**: 2-3 days for complete optimization
- **Expected Benefits**: Improved maintainability, performance, and SEO

---

## Phase 1: Foundation (Critical Issues - Fix Immediately)

### 1.1 Extract Shared Metadata Utility
**Duration**: ~4 hours
**Priority**: Critical
**File**: [metadata-duplication.md](./layout-review/metadata-duplication.md)

**Why First**: Creates foundation for all subsequent metadata improvements. Reduces maintenance burden before implementing other changes.

**Deliverables**:
- `lib/metadata/shared-metadata.ts` utility
- Refactored 10+ layout files
- Consistent metadata across routes

### 1.2 Remove Force Dynamic from Root
**Duration**: ~2 hours
**Priority**: Critical
**File**: [force-dynamic-rendering.md](./layout-review/force-dynamic-rendering.md)

**Why Second**: Immediate performance improvement. Must be done before layout restructuring to understand which routes truly need dynamic rendering.

**Deliverables**:
- Root layout optimized for static generation
- Selective dynamic rendering implementation
- Performance metrics improvement

### 1.3 Consolidate Minimal Layouts
**Duration**: ~3 hours
**Priority**: Critical
**File**: [redundant-layouts.md](./layout-review/redundant-layouts.md)

**Why Third**: Simplifies file structure before adding nested layouts. Removes overhead before implementing more complex architecture.

**Deliverables**:
- Reduced layout file count
- Page-level metadata where appropriate
- Cleaner directory structure

---

## Phase 2: Enhancement (High Priority - Fix Within 1 Week)

### 2.1 Implement Consistent JSON-LD
**Duration**: ~6 hours
**Priority**: High
**File**: [json-ld-structured-data.md](./layout-review/json-ld-structured-data.md)

**Why Fourth**: Builds on shared metadata foundation. Major SEO impact once metadata utilities are established.

**Deliverables**:
- JSON-LD schemas for major routes
- Reusable structured data utilities
- Enhanced search visibility

### 2.2 Add Missing Nested Layouts
**Duration**: ~4 hours
**Priority**: High
**File**: [nested-layout-structure.md](./layout-review/nested-layout-structure.md)

**Why Fifth**: Requires simplified layout structure from Phase 1. Creates logical grouping for route families.

**Deliverables**:
- `/legal/layout.tsx` for legal pages
- Enhanced `/blog/layout.tsx`
- Improved metadata inheritance

### 2.3 Document Component Boundaries
**Duration**: ~2 hours
**Priority**: High
**File**: [client-server-boundaries.md](./layout-review/client-server-boundaries.md)

**Why Sixth**: Analysis task that informs provider optimization. No code changes, pure documentation and standards.

**Deliverables**:
- Clear client/server component guidelines
- Provider usage documentation
- Architecture decision records

---

## Phase 3: Polish (Medium Priority - Fix Within 1 Month)

### 3.1 Optimise Favicon Configuration
**Duration**: ~1 hour
**Priority**: Medium
**File**: [favicon-optimization.md](./layout-review/favicon-optimization.md)

**Why Seventh**: Quick win that cleans up layout code. No dependencies on other changes.

**Deliverables**:
- Static favicon files
- Removed manual head tags
- Cleaner layout code

### 3.2 Evaluate Provider Hierarchy
**Duration**: ~3 hours
**Priority**: Medium
**File**: [provider-hierarchy.md](./layout-review/provider-hierarchy.md)

**Why Eighth**: Optional optimization that requires component boundary documentation from Phase 2. Can be deferred if no clear benefit.

**Deliverables**:
- Provider usage audit
- Route-specific providers if beneficial
- Performance optimization

---

## Dependencies and Conflicts

### Critical Dependencies
1. **Shared Metadata MUST come first** - All other metadata work depends on this foundation
2. **Force Dynamic removal BEFORE layout changes** - Needed to understand true dynamic requirements
3. **Minimal layout cleanup BEFORE nested layouts** - Avoids creating more files to later remove

### Potential Conflicts
- Avoid working on multiple layout files simultaneously
- Ensure git commits after each phase to enable rollbacks
- Test metadata inheritance after each layout change

---

## Testing Strategy

### After Each Phase
1. **Build Validation**: `npm run build` must succeed
2. **Type Safety**: `npm run typecheck` with zero errors
3. **Metadata Testing**: Manual verification of page titles, OpenGraph
4. **Performance**: Lighthouse score monitoring

### Phase-Specific Tests
- **Phase 1**: Static generation working for appropriate routes
- **Phase 2**: Rich snippets appearing in search console
- **Phase 3**: No console errors, clean developer experience

---

## Success Metrics

### Technical Metrics
- **Build Time**: Should remain consistent or improve
- **Bundle Size**: Static routes should generate at build time
- **Type Safety**: Zero TypeScript errors
- **Lighthouse Score**: Performance score improvement

### Developer Experience Metrics
- **File Count**: Reduced layout file overhead
- **Maintenance**: Single source of truth for metadata
- **Documentation**: Clear architecture decisions recorded

### SEO Metrics
- **Metadata Consistency**: All pages have complete metadata
- **Structured Data**: Rich snippets for major content
- **Search Visibility**: Enhanced SERP appearance

---

## Implementation Tips

### Before Starting
1. Create feature branch: `git checkout -b layout-optimization`
2. Review current codebase state
3. Read all individual issue files for context

### During Implementation
1. Commit after each major milestone
2. Test thoroughly before moving to next phase
3. Document any deviations from plan

### After Completion
1. Full integration testing
2. Performance comparison with baseline
3. Update architecture documentation
4. Team knowledge sharing session

---

## Emergency Rollback Plan

If any phase causes critical issues:

1. **Immediate**: `git revert HEAD` for the problematic commit
2. **Investigation**: Review specific issue file for alternative approaches
3. **Mitigation**: Implement minimal fix to restore functionality
4. **Re-planning**: Adjust roadmap based on lessons learned

---

## Related Documentation

- [Development Standards](../standards/development-standards.md)
- [CSS Architecture](../standards/css-architecture.md)
- [CMS Patterns](../standards/cms-patterns.md)
- [Emergency Protocols](../reference/emergency-protocols.md)

---

**Document Version**: 1.0
**Last Updated**: December 2025
**Next Review**: After implementation completion