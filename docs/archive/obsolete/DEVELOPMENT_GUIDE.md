# Git Worktrees with Agent Coordination - Quick Start Guide
## My Private Tutor Online Project

### Implementation Summary

This guide provides the essential steps to set up and use the advanced git worktrees workflow with specialized agent coordination for parallel development.

---

## Phase 1: Initial Setup (5 minutes)

### Step 1: Verify Setup
```bash
cd /home/jack/Documents/my_private_tutor_online

# Check that context infrastructure is ready
ls -la .claude/context/
ls -la .claude/scripts/

# Test the workflow
./.claude/scripts/worktree-status.sh
node ./.claude/scripts/update-context.js status
```

### Step 2: Create Worktree Directory
```bash
mkdir -p /home/jack/Documents/mpto-worktrees
```

---

## Phase 2: Create Your First Worktree (5 minutes)

### Recommended: CMS Enhancement
Perfect for testing the workflow - self-contained with clear deliverables.

```bash
# Create the worktree with agent assignment
./.claude/scripts/create-worktree.sh feature-cms-enhancement content-specialist "Improve CMS admin interface for non-technical users"

# Verify creation
./.claude/scripts/worktree-status.sh
```

### Navigate and Review
```bash
cd /home/jack/Documents/mpto-worktrees/feature-cms-enhancement

# Review agent briefing
cat .agent-briefing.md

# Check worktree context
cat .worktree-context
```

---

## Phase 3: Agent Coordination Pattern

### Context Manager Session
**Location**: `/home/jack/Documents/my_private_tutor_online` (main repo)

**Role**: 
- Monitor all worktrees
- Coordinate between agents
- Plan integration strategy
- Manage dependencies

```bash
# Monitor progress
./.claude/scripts/worktree-status.sh
node ./.claude/scripts/update-context.js status
```

### Specialized Agent Session
**Location**: `/home/jack/Documents/mpto-worktrees/[worktree-name]`

**Brief the agent**:
```markdown
I'm acting as the [agent-type] for the [worktree-name] worktree.

Please review the .agent-briefing.md file and begin working on the assigned task.

Key constraints:
- Follow all CLAUDE.md guidelines  
- Use Context7 MCP for library documentation
- Update CUSTOM_DOCS.md with proven patterns
- British English spelling throughout
- Production-ready solutions only
```

---

## Phase 4: Parallel Development

### Create Multiple Worktrees
```bash
# Performance optimization
./.claude/scripts/create-worktree.sh opt-performance performance-engineer "Optimize Core Web Vitals and loading times"

# Bug fix
./.claude/scripts/create-worktree.sh bugfix-safari-video frontend-developer "Fix Safari video playback issues"

# New feature
./.claude/scripts/create-worktree.sh feature-booking-system backend-developer "Implement online booking integration"
```

## Project Structure (Reference)

```
my-tutor-website/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── layout/         # Layout components (PageLayout, PageHero)
│   │   ├── marketing/      # Marketing components (BrandStatement, etc.)
│   │   ├── sections/       # Section components (ResultsSection, etc.)
│   │   ├── magicui/        # Magic UI components
│   │   └── ui/             # Shadcn/UI components
│   ├── content/            # CMS JSON files
│   ├── lib/                # Utilities and helpers
│   │   └── cms/            # CMS functions
│   └── styles/             # Global styles
├── public/                 # Static assets
│   ├── images/            # Image assets
│   └── videos/            # Video assets
├── docs/                   # Documentation
├── .claude/               # Claude Code configuration
└── tests/                 # Test files
```

### Agent Specialization Map
- **content-specialist** → CMS improvements, content modeling
- **performance-engineer** → Core Web Vitals, bundle optimization  
- **frontend-developer** → React components, UI implementation
- **backend-developer** → API development, integrations
- **ui-ux-designer** → Design system, accessibility
- **accessibility-specialist** → WCAG compliance, testing

---

## Phase 5: Integration Workflow

### Ready for Integration
```bash
# From worktree directory
cd /home/jack/Documents/mpto-worktrees/[worktree-name]

# Ensure everything is ready
npm run build
npm run test
npm run lint

# Sync with main
git fetch origin
git rebase origin/master

# Return to main repo for integration
cd /home/jack/Documents/my_private_tutor_online
git checkout master
git merge [worktree-name]

# Update context
node ./.claude/scripts/update-context.js update-status [worktree-name] completed "Feature merged to main"
```

---

## Essential Commands Reference

```bash
# Create worktree with agent
./.claude/scripts/create-worktree.sh <name> <agent> "<description>"

# Check all worktrees status
./.claude/scripts/worktree-status.sh

# Update project context
node ./.claude/scripts/update-context.js status

# Remove completed worktree
git worktree remove ../mpto-worktrees/<name>
node ./.claude/scripts/update-context.js remove-worktree <name>

# Sync worktree with main
cd ../mpto-worktrees/<name>
git fetch origin && git rebase origin/master
```

---

## Best Practices

### Context Manager Discipline
- Maintain project-wide view across all worktrees
- Regular status checks and conflict detection
- Coordinate integration timing
- Document architectural decisions

### Agent Focus
- Stay within assigned worktree and expertise
- Follow CLAUDE.md rules consistently  
- Use Context7 MCP for documentation
- Update CUSTOM_DOCS.md with patterns

### Worktree Hygiene
- One feature/fix per worktree
- Clean up completed worktrees promptly
- Regular sync with main branch
- Comprehensive testing before integration

---

## Recommended Worktrees for MPTO Project

Based on the current codebase, these worktrees would be most valuable:

1. **feature-cms-enhancement** (content-specialist)
   - Enhance admin interface usability
   - Improve content validation
   - Better image management

2. **opt-performance** (performance-engineer)
   - Meet Core Web Vitals targets
   - Optimize bundle size
   - Improve loading times

3. **feature-booking-system** (backend-developer)
   - Calendly integration
   - Consultation booking flow
   - Payment processing

4. **opt-accessibility** (accessibility-specialist)
   - WCAG 2.1 AA compliance audit
   - Screen reader optimization
   - Keyboard navigation

5. **bugfix-safari-compatibility** (frontend-developer)
   - Safari video playback issues
   - Cross-browser compatibility
   - Mobile Safari optimizations

---

## Key Development Patterns (for Agent Reference)

### 1. CMS Integration (MANDATORY)
All content must use the centralised CMS system:

```typescript
// CMS DATA SOURCE: Using getHeroContent for hero section
const heroContent = getHeroContent()

// NEVER hardcode content
// BAD: <h1>Welcome to My Private Tutor Online</h1>
// GOOD: <h1>{heroContent.title}</h1>
```

### 2. Component Architecture
Create modular, reusable components with flexible props:

```typescript
interface SectionProps {
  title?: string
  description?: string
  backgroundColor?: string
  className?: string
  showDescription?: boolean
}

export function SectionComponent({ 
  title = "Default Title",
  backgroundColor = "bg-white",
  className = "",
  ...props
}: SectionProps) {
  // Component implementation
}
```

---

## Technology Stack (Reference)

- **Framework**: Next.js 15.3.4 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.8.3
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Shadcn/UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **Testing**: Vitest + Playwright

## Critical Rules for All Agents

1. **ALWAYS use Context7 MCP** for documentation
2. **NEVER hardcode content** - use CMS
3. **ALWAYS use British English** spelling
4. **NEVER mention AI assistance** in code
5. **ALWAYS implement production-ready** solutions
6. **FOLLOW CLAUDE.md** guidelines consistently

## Success Metrics

Track these metrics to ensure the workflow is effective:

- **Parallel Development**: Multiple features progressing simultaneously
- **Reduced Conflicts**: Fewer merge conflicts due to isolation
- **Faster Iteration**: Quick feature switching without stashing/committing
- **Better Context**: Maintained project coherence across sessions
- **Agent Efficiency**: Specialized agents working in their expertise areas

## Quick Reference for Context Manager

```bash
# Monitor all worktrees
./.claude/scripts/worktree-status.sh

# Check project context
node ./.claude/scripts/update-context.js status

# Create new worktree
./.claude/scripts/create-worktree.sh <name> <agent> "<description>"

# Standard development commands
npm run dev      # Development server
npm run build    # Production build
npm run test     # Run tests
vercel --prod    # Deploy to production
```

---

**Start with the CMS enhancement worktree to validate the workflow, then expand to multiple parallel workstreams as you become comfortable with the coordination patterns.**

For complete details, see: [GIT_WORKTREES_AGENT_WORKFLOW.md](./GIT_WORKTREES_AGENT_WORKFLOW.md)

---

Last Updated: August 2025