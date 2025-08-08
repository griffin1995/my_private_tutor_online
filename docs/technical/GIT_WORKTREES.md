# Git Worktrees with Agent Coordination Workflow
## My Private Tutor Online Project

### Table of Contents
1. [Overview](#overview)
2. [Git Worktree Architecture](#git-worktree-architecture)
3. [Central Context Manager Role](#central-context-manager-role)
4. [Agent Coordination Strategy](#agent-coordination-strategy)
5. [Implementation Guide](#implementation-guide)
6. [Workflow Examples](#workflow-examples)
7. [Best Practices](#best-practices)
8. [Monitoring & Progress Tracking](#monitoring--progress-tracking)

---

## Overview

This document outlines an advanced development workflow using git worktrees with coordinated agent specialization for the My Private Tutor Online project. The workflow enables parallel development streams while maintaining project coherence through a central context management system.

### Key Benefits
- **Parallel Development**: Multiple features developed simultaneously without branch switching
- **Agent Specialization**: Each worktree can have dedicated specialized agents
- **Context Preservation**: Central manager maintains project-wide context
- **Reduced Conflicts**: Isolated development environments minimize merge conflicts
- **Faster Iteration**: No need to stash/commit when switching between features

---

## Git Worktree Architecture

### Recommended Worktree Structure

```
/home/jack/Documents/
├── my_private_tutor_online/              # Main repository (production branch)
├── mpto-worktrees/                       # Worktree container directory
│   ├── feature-cms-enhancement/          # CMS improvements worktree
│   ├── feature-performance-optimization/ # Performance tuning worktree
│   ├── feature-accessibility-audit/     # Accessibility improvements
│   ├── feature-mobile-experience/       # Mobile UX enhancements
│   ├── bugfix-safari-compatibility/     # Browser-specific fixes
│   └── experimental-ai-features/        # Experimental features
```

### Worktree Categories

#### 1. **Feature Development Worktrees**
- `feature-cms-enhancement`: Content management system improvements
- `feature-booking-system`: Online booking integration
- `feature-student-dashboard`: Student progress tracking
- `feature-payment-integration`: Payment system implementation

#### 2. **Optimization Worktrees**
- `performance-optimization`: Core Web Vitals improvements
- `seo-enhancement`: Search engine optimization
- `bundle-optimization`: JavaScript bundle size reduction

#### 3. **Maintenance Worktrees**
- `bugfix-*`: Isolated bug fixes
- `security-patches`: Security updates
- `dependency-updates`: Package updates

#### 4. **Experimental Worktrees**
- `experimental-*`: New technology trials
- `prototype-*`: Feature prototypes

---

## Central Context Manager Role

### Core Responsibilities

#### 1. **Project Architecture Guardian**
- Maintains overall system architecture vision
- Ensures consistency across all worktrees
- Reviews architectural decisions before implementation
- Manages technical debt tracking

#### 2. **Context Preservation**
- Maintains `.claude/project-context.json` with current state
- Updates `CUSTOM_DOCS.md` with proven patterns
- Tracks dependencies between worktrees
- Documents key decisions and rationale

#### 3. **Work Distribution**
- Analyzes incoming requirements
- Delegates to appropriate specialized agents
- Coordinates multi-worktree features
- Manages priority and scheduling

#### 4. **Integration Oversight**
- Plans merge strategies
- Identifies potential conflicts early
- Coordinates testing across features
- Manages deployment pipeline

### Context Manager Configuration

```json
{
  "role": "context-manager",
  "responsibilities": [
    "project-architecture",
    "context-preservation",
    "work-delegation",
    "integration-planning"
  ],
  "access": {
    "worktrees": "all",
    "documentation": "read-write",
    "deployment": "review-only"
  },
  "tools": [
    "git-worktree",
    "context-aggregator",
    "dependency-analyzer",
    "progress-tracker"
  ]
}
```

---

## Agent Coordination Strategy

### Agent Specialization Map

```yaml
agents:
  frontend-developer:
    worktrees:
      - feature-student-dashboard
      - feature-mobile-experience
    expertise:
      - React/Next.js components
      - State management
      - API integration
    
  ui-ux-designer:
    worktrees:
      - feature-mobile-experience
      - experimental-ai-features
    expertise:
      - Component design
      - User flow optimization
      - Accessibility compliance
    
  backend-developer:
    worktrees:
      - feature-booking-system
      - feature-payment-integration
    expertise:
      - API development
      - Database design
      - Authentication
    
  performance-engineer:
    worktrees:
      - performance-optimization
      - bundle-optimization
    expertise:
      - Core Web Vitals
      - Bundle analysis
      - Caching strategies
    
  content-specialist:
    worktrees:
      - feature-cms-enhancement
      - seo-enhancement
    expertise:
      - CMS configuration
      - Content structure
      - SEO optimization
```

### Communication Patterns

#### 1. **Context Handoff Protocol**
```markdown
## Context Handoff Template
**From**: context-manager
**To**: frontend-developer
**Worktree**: feature-student-dashboard
**Context**:
- Current state: [Description]
- Dependencies: [List]
- Constraints: [List]
- Expected outcome: [Description]
- Integration points: [List]
```

#### 2. **Progress Update Format**
```markdown
## Progress Update
**Agent**: frontend-developer
**Worktree**: feature-student-dashboard
**Status**: in-progress
**Completed**:
- [x] Component structure
- [x] API integration
**Pending**:
- [ ] State management
- [ ] Testing
**Blockers**: None
**Context changes**: Updated component patterns in CUSTOM_DOCS.md
```

#### 3. **Integration Request**
```markdown
## Integration Request
**Requesting worktree**: feature-booking-system
**Target worktree**: main
**Changes summary**: [Description]
**Testing status**: [Pass/Fail]
**Migration notes**: [Any special considerations]
```

---

## Implementation Guide

### Step 1: Initial Setup

```bash
# 1. Create worktree container directory
cd /home/jack/Documents
mkdir mpto-worktrees

# 2. Create context preservation directory
cd my_private_tutor_online
mkdir -p .claude/context
touch .claude/context/project-state.json
touch .claude/context/worktree-map.json
touch .claude/context/agent-assignments.json
```

### Step 2: Create First Worktree

```bash
# From main repository
cd /home/jack/Documents/my_private_tutor_online

# Create feature branch and worktree
git branch feature-cms-enhancement
git worktree add ../mpto-worktrees/feature-cms-enhancement feature-cms-enhancement

# Initialize worktree context
cd ../mpto-worktrees/feature-cms-enhancement
echo "WORKTREE: feature-cms-enhancement" > .worktree-context
```

### Step 3: Context Manager Initialization

```bash
# In main repository
cat > .claude/context/project-state.json << 'EOF'
{
  "version": "1.0.0",
  "lastUpdated": "2025-08-05",
  "activeWorktrees": [
    {
      "name": "feature-cms-enhancement",
      "branch": "feature-cms-enhancement",
      "agent": "content-specialist",
      "status": "active",
      "dependencies": []
    }
  ],
  "globalContext": {
    "techStack": {
      "frontend": ["Next.js 15", "React 19", "TypeScript 5.3+"],
      "styling": ["Tailwind CSS 4.x", "Framer Motion"],
      "state": ["Zustand"],
      "validation": ["Zod", "React Hook Form"]
    },
    "constraints": {
      "performance": "LCP <2.5s, FID <100ms, CLS <0.1",
      "accessibility": "WCAG 2.1 AA",
      "browser": "Chrome, Firefox, Safari, Edge"
    }
  }
}
EOF
```

### Step 4: Agent Assignment

```bash
# Create agent assignment configuration
cat > .claude/context/agent-assignments.json << 'EOF'
{
  "assignments": [
    {
      "worktree": "feature-cms-enhancement",
      "primaryAgent": "content-specialist",
      "supportAgents": ["frontend-developer"],
      "scope": "Enhance CMS with better content organization and admin UX"
    }
  ],
  "agentCapabilities": {
    "content-specialist": {
      "skills": ["CMS design", "Content modeling", "JSON schemas"],
      "access": ["cms-content.ts", "cms-images.ts", "content/*.json"]
    },
    "frontend-developer": {
      "skills": ["React components", "TypeScript", "API integration"],
      "access": ["src/components", "src/app", "src/lib"]
    }
  }
}
EOF
```

### Step 5: Workflow Automation Scripts

```bash
# Create workflow helper scripts
mkdir -p .claude/scripts

# Worktree creation script
cat > .claude/scripts/create-worktree.sh << 'EOF'
#!/bin/bash
# Usage: ./create-worktree.sh <worktree-name> <agent-type>

WORKTREE_NAME=$1
AGENT_TYPE=$2
WORKTREE_DIR="../mpto-worktrees/$WORKTREE_NAME"

# Create branch and worktree
git branch $WORKTREE_NAME
git worktree add $WORKTREE_DIR $WORKTREE_NAME

# Initialize worktree context
echo "WORKTREE: $WORKTREE_NAME" > $WORKTREE_DIR/.worktree-context
echo "AGENT: $AGENT_TYPE" >> $WORKTREE_DIR/.worktree-context

# Update project state
node .claude/scripts/update-context.js add-worktree $WORKTREE_NAME $AGENT_TYPE

echo "Worktree $WORKTREE_NAME created and assigned to $AGENT_TYPE"
EOF

chmod +x .claude/scripts/create-worktree.sh
```

---

## Workflow Examples

### Example 1: CMS Enhancement Feature

#### Context Manager Initiates
```markdown
## Task Analysis
**Requirement**: Improve CMS admin interface for non-technical users
**Complexity**: Medium
**Dependencies**: None
**Recommended approach**: Dedicated worktree with content-specialist lead

## Delegation
1. Create worktree: `feature-cms-enhancement`
2. Assign primary: `content-specialist`
3. Assign support: `frontend-developer`
```

#### Content Specialist Execution
```bash
# In feature-cms-enhancement worktree
cd /home/jack/Documents/mpto-worktrees/feature-cms-enhancement

# Work on CMS improvements
# - Enhanced admin UI components
# - Better content validation
# - Improved image management
# - User-friendly error messages
```

#### Integration Flow
```markdown
## Integration Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CUSTOM_DOCS.md patterns documented
- [ ] No conflicts with main
- [ ] Context manager review complete
```

### Example 2: Parallel Performance Optimization

#### Context Manager Coordinates
```markdown
## Multi-Worktree Coordination
**Goal**: Improve Core Web Vitals across the site
**Strategy**: Parallel optimization efforts

### Worktree Distribution
1. `performance-optimization`: Overall performance audit
2. `bundle-optimization`: JavaScript bundle reduction
3. `feature-mobile-experience`: Mobile-specific optimizations

### Coordination Points
- Shared performance budget
- Unified testing methodology
- Coordinated deployment
```

### Example 3: Emergency Bug Fix

#### Rapid Response Protocol
```bash
# Context manager creates hotfix worktree
./claude/scripts/create-worktree.sh bugfix-safari-video urgent

# Assigns specialized agent
echo "PRIORITY: HIGH" >> ../mpto-worktrees/bugfix-safari-video/.worktree-context

# Fast-track process
# 1. Isolate issue
# 2. Implement fix
# 3. Test in isolation
# 4. Merge to main
# 5. Cherry-pick to active feature branches
```

---

## Best Practices

### 1. **Worktree Hygiene**
- Keep worktrees focused on single features/fixes
- Clean up completed worktrees promptly
- Regular sync with main branch
- Document worktree purpose clearly

### 2. **Context Management**
- Update context files after significant changes
- Use structured formats for context sharing
- Maintain clear dependency tracking
- Regular context synchronization meetings

### 3. **Agent Coordination**
- Clear handoff protocols
- Regular progress updates
- Documented decision rationale
- Shared pattern library (CUSTOM_DOCS.md)

### 4. **Integration Strategy**
- Feature flags for gradual rollout
- Comprehensive testing before merge
- Staged integration for complex features
- Rollback plans for all changes

### 5. **Documentation Standards**
- Context7 MCP for all library docs
- In-code documentation for decisions
- Updated CUSTOM_DOCS.md with patterns
- Clear commit messages

---

## Monitoring & Progress Tracking

### Dashboard Structure

```markdown
## Project Status Dashboard
**Last Updated**: [Timestamp]

### Active Worktrees
| Worktree | Agent | Status | Progress | Next Milestone |
|----------|-------|--------|----------|----------------|
| feature-cms | content-specialist | Active | 60% | Admin UI complete |
| performance | performance-engineer | Active | 40% | LCP <2.5s |
| bugfix-safari | frontend-developer | Testing | 90% | Deploy ready |

### Dependencies
- feature-cms → performance (shared components)
- bugfix-safari → main (critical fix)

### Upcoming Integrations
1. bugfix-safari → main (Today)
2. performance → main (This week)
3. feature-cms → main (Next week)
```

### Progress Tracking Tools

#### 1. **Git Worktree Status Script**
```bash
cat > .claude/scripts/worktree-status.sh << 'EOF'
#!/bin/bash
echo "=== Worktree Status ==="
git worktree list --porcelain | while read line; do
    if [[ $line == worktree* ]]; then
        path=$(echo $line | cut -d' ' -f2)
        echo -n "$(basename $path): "
        cd $path
        branch=$(git branch --show-current)
        ahead=$(git rev-list --count origin/main..HEAD)
        behind=$(git rev-list --count HEAD..origin/main)
        echo "$branch (ahead: $ahead, behind: $behind)"
    fi
done
EOF
```

#### 2. **Context Sync Verification**
```javascript
// .claude/scripts/verify-context.js
const fs = require('fs');
const path = require('path');

function verifyContextSync() {
  const projectState = JSON.parse(
    fs.readFileSync('.claude/context/project-state.json', 'utf8')
  );
  
  const worktrees = projectState.activeWorktrees;
  const issues = [];
  
  worktrees.forEach(wt => {
    const wtPath = `../mpto-worktrees/${wt.name}`;
    if (!fs.existsSync(wtPath)) {
      issues.push(`Missing worktree: ${wt.name}`);
    }
    
    // Check for context file
    const contextFile = `${wtPath}/.worktree-context`;
    if (!fs.existsSync(contextFile)) {
      issues.push(`Missing context file: ${wt.name}`);
    }
  });
  
  return issues;
}
```

### Integration Checklist Template

```markdown
## Pre-Integration Checklist
**Worktree**: [Name]
**Target Branch**: main
**Agent**: [Agent name]

### Code Quality
- [ ] All tests passing
- [ ] Linting clean
- [ ] Type checking passes
- [ ] Bundle size within limits

### Documentation
- [ ] Code comments updated
- [ ] CUSTOM_DOCS.md patterns added
- [ ] API changes documented
- [ ] Migration guide (if needed)

### Context Updates
- [ ] Project state updated
- [ ] Dependencies documented
- [ ] Breaking changes noted
- [ ] Agent handoff complete

### Testing
- [ ] Unit tests coverage >80%
- [ ] E2E tests passing
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met

### Approval
- [ ] Context manager review
- [ ] Technical review
- [ ] Business stakeholder approval
```

---

## Quick Reference Commands

```bash
# Create new worktree
git worktree add ../mpto-worktrees/[name] [branch-name]

# List all worktrees
git worktree list

# Remove worktree
git worktree remove ../mpto-worktrees/[name]

# Sync worktree with main
cd ../mpto-worktrees/[name]
git fetch origin
git rebase origin/main

# Check worktree status
./.claude/scripts/worktree-status.sh

# Create worktree with agent
./.claude/scripts/create-worktree.sh [name] [agent-type]

# Update context
node .claude/scripts/update-context.js [action] [params]
```

---

## Conclusion

This workflow enables sophisticated parallel development while maintaining project coherence through centralized context management. The combination of git worktrees and specialized agents allows for faster iteration, reduced conflicts, and better code quality.

Key success factors:
1. Disciplined context management
2. Clear agent responsibilities
3. Regular synchronization
4. Comprehensive documentation
5. Automated tooling support

Start with a single feature worktree to validate the workflow, then expand as the team becomes comfortable with the process.