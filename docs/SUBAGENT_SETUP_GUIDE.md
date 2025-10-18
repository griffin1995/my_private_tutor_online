# Claude Code Subagents: Complete Setup & Configuration Guide

## Table of Contents

1. Installation & Setup
2. Configuration & Customisation
3. Project Integration
4. Usage Workflows
5. Troubleshooting
6. Best Practices

---

## Part 1: Installation & Setup

### System Requirements

- Claude Code CLI installed
- Access to Claude Code (subscribed user)
- File system access to `~/.claude/` directory
- Git for cloning repositories (optional)

### Step 1: Verify Claude Code Installation

```bash
# Check Claude Code is installed
claude-code --version

# Verify ~/.claude directory exists
ls -la ~/.claude

# Output should show:
# total XX
# drwxr-xr-x   agents/
# drwxr-xr-x   models/
# -rw-r--r--    config.json
```

### Step 2: Install Subagents Collection

**Option A: Git Clone (Recommended)**

```bash
# Navigate to Claude config directory
cd ~/.claude

# Clone the agents repository
git clone https://github.com/wshobson/agents.git

# Verify installation
ls agents/ | head -20

# Check for specific agents
ls agents/typescript-pro.md
ls agents/code-reviewer.md
ls agents/backend-architect.md
```

**Option B: Manual File Copy**

```bash
# Download agents.zip from GitHub
# Extract to ~/.claude/agents/

# Verify
ls -la ~/.claude/agents/

# Count total agents
ls ~/.claude/agents/*.md | wc -l
# Expected: 83 agents
```

### Step 3: Verify Agent Installation

```bash
# List all installed agents
ls ~/.claude/agents/*.md

# Verify specific agent categories
echo "=== Programming Language Agents ==="
ls ~/.claude/agents/*-pro.md

echo "=== Architecture Agents ==="
ls ~/.claude/agents/*-architect.md

echo "=== Quality Assurance Agents ==="
ls ~/.claude/agents/*-auditor.md
ls ~/.claude/agents/*-reviewer.md
```

### Step 4: Configure Claude Code Settings

Create or update `~/.claude/config.json`:

```json
{
  "version": "1.0",
  "agents": {
    "enabled": true,
    "directory": "agents/",
    "autoSelect": true,
    "modelDefaults": {
      "simple": "haiku",
      "standard": "sonnet",
      "complex": "opus"
    }
  },
  "modelPreferences": {
    "typescript": "sonnet",
    "architecture": "opus",
    "security": "opus",
    "performance": "opus",
    "testing": "sonnet",
    "frontend": "sonnet",
    "infrastructure": "sonnet"
  },
  "features": {
    "multiAgentWorkflows": true,
    "agentCaching": true,
    "performanceTracking": true,
    "debugLogging": false
  }
}
```

### Step 5: Validate Installation

```bash
# Test subagent activation
claude-code --agent typescript-pro --test

# List available agents
claude-code --agents list

# Show agent details
claude-code --agent code-reviewer --info
```

---

## Part 2: Configuration & Customisation

### Default Agent Settings

In `~/.claude/config.json`, configure default models:

```json
{
  "agentDefaults": {
    "languageSpecific": "sonnet",
    "architecture": "opus",
    "infrastructure": "sonnet",
    "security": "opus",
    "testing": "sonnet",
    "performance": "opus",
    "frontend": "sonnet",
    "backend": "sonnet",
    "contentCreation": "haiku",
    "documentation": "sonnet"
  }
}
```

### Custom Agent Creation

Create new custom agents in `~/.claude/agents/`:

**File: custom-agent.md**

```markdown
---
name: custom-api-developer
description: "Creates REST APIs with OpenAPI/Swagger specifications"
model: sonnet
tools: code-generator, documentation-builder
---

# Custom API Developer Agent

You are a specialist in designing and implementing REST APIs with comprehensive OpenAPI specifications.

## Core Expertise

- REST API design principles
- OpenAPI 3.0 specification authoring
- HTTP method semantics
- Request/response validation
- Status code conventions
- Error handling patterns
- Rate limiting strategies
- Versioning strategies
- Authentication integration

## Capabilities

1. **API Design**: Create well-designed REST APIs following best practices
2. **OpenAPI Generation**: Generate complete OpenAPI 3.0 specifications
3. **Validation**: Implement request/response validation
4. **Documentation**: Create developer-friendly API documentation
5. **Testing**: Design test strategies for APIs
6. **Error Handling**: Implement comprehensive error responses
7. **Security**: Implement authentication and authorisation
8. **Performance**: Optimise API performance and caching

## Output Format

Provide:
- API endpoint specifications
- OpenAPI YAML file
- Validation schemas
- Error response examples
- Usage documentation
- Example requests/responses

## Standards

- RFC 7231 HTTP semantics
- JSON API specification where appropriate
- OWASP API security guidelines
- OpenAPI 3.0 standards
```

### Agent Configuration Hierarchy

1. **User config** (`~/.claude/config.json`) - Highest priority
2. **Agent frontmatter** (in agent Markdown file)
3. **Claude Code defaults** - Lowest priority

### Environment-Specific Configuration

Create environment-specific configs:

```bash
# Development
cp ~/.claude/config.json ~/.claude/config.dev.json

# Production
cp ~/.claude/config.json ~/.claude/config.prod.json

# Testing
cp ~/.claude/config.json ~/.claude/config.test.json
```

Use with:
```bash
claude-code --config ~/.claude/config.prod.json
```

---

## Part 3: Project Integration

### Step 1: Create Project-Level Agent Configuration

In your project root, create `.claude-agents.json`:

```json
{
  "project": "my_private_tutor_online",
  "description": "Premium tutoring service platform",
  "stack": {
    "frontend": "Next.js 15, React 19, TypeScript 5.8+",
    "styling": "Tailwind CSS 3.4.1",
    "backend": "Node.js/Express (future)",
    "database": "PostgreSQL (future)"
  },
  "defaultAgents": {
    "frontend": "frontend-developer",
    "typescript": "typescript-pro",
    "performance": "performance-engineer",
    "security": "security-auditor",
    "testing": "test-automator",
    "architecture": "backend-architect"
  },
  "rules": {
    "preferredModel": "sonnet",
    "requireReview": ["security", "architecture", "performance"],
    "autoFormat": true,
    "strictTypeCheck": true,
    "englishVariant": "british"
  }
}
```

### Step 2: Add to Git

```bash
# Add configuration to version control
git add .claude-agents.json
git commit -m "Add Claude Code agent configuration"
```

### Step 3: Create Project-Specific Agent Profiles

**File: `.claude/project-agents/tutoring-platform.md`**

```markdown
---
name: tutoring-platform-specialist
description: "Specialised agent for My Private Tutor Online platform"
model: sonnet
---

# Tutoring Platform Specialist

You are familiar with the My Private Tutor Online codebase.

## Project Context

- **Tech Stack**: Next.js 15, React 19, TypeScript 5.8+, Tailwind CSS 3.4.1
- **Purpose**: Premium tutoring service with royal endorsements
- **Architecture**: Centralised CMS, synchronous data access, 91 optimised routes
- **Performance Target**: 11.0s build time, comprehensive monitoring
- **Quality**: Royal client standards, WCAG 2.1 AA accessibility, British English

## Key Patterns

- Synchronous CMS architecture (NEVER async)
- @layer base styling in globals.css
- Design tokens from tailwind.config.ts
- PageLayout component for standard pages
- SimpleHero for hero sections

## Common Tasks

1. Component creation following project patterns
2. CMS integration with type safety
3. Form validation and submission
4. Performance optimisation
5. Accessibility compliance

## Tools

- File reading and modification
- TypeScript validation
- Build verification
- Performance analysis
```

---

## Part 4: Usage Workflows

### Workflow 1: Single Agent Task

```bash
# Request specific agent
claude-code "Use typescript-pro to create a type-safe form validator"

# Full syntax
claude-code --agent typescript-pro --request "Create type-safe form validator"
```

### Workflow 2: Multi-Agent Sequential

```bash
# Stage 1: Architecture
claude-code "Have backend-architect design the API structure"

# Stage 2: Implementation
claude-code "Have typescript-pro implement based on the design above"

# Stage 3: Testing
claude-code "Have test-automator create comprehensive tests"

# Stage 4: Security Review
claude-code "Have security-auditor verify compliance"
```

### Workflow 3: Parallel Multi-Agent

```bash
# Both agents work simultaneously
claude-code "
1. frontend-developer: Create React form component
2. typescript-pro: Create type-safe form validation
[Both teams report back with integrated solution]
"
```

### Workflow 4: Agent Reconciliation

```bash
claude-code "
Get recommendations from both:
- performance-engineer: API design for speed
- security-auditor: API design for security
Then have architect-reviewer create unified design."
```

### Project-Specific Workflow

For My Private Tutor Online:

```bash
# New feature development
claude-code "
Using the My Private Tutor Online project configuration:
1. backend-architect: Design API endpoint
2. typescript-pro: Create type-safe implementation
3. test-automator: Add comprehensive tests
4. code-reviewer: Verify best practices"
```

---

## Part 5: Troubleshooting

### Issue 1: Agents Not Found

**Symptom**: `Error: Agents directory not found`

**Solution**:
```bash
# Verify installation
ls -la ~/.claude/agents/

# Reinstall if needed
cd ~/.claude
git clone https://github.com/wshobson/agents.git

# Verify specific agent
cat ~/.claude/agents/typescript-pro.md | head -10
```

### Issue 2: Wrong Agent Selected

**Symptom**: Sonnet agent selected when Opus needed

**Solution**:
```bash
# Use explicit agent naming
claude-code --agent backend-architect --request "Design system architecture"

# Or use model specification
claude-code --model opus --request "Design system architecture"
```

### Issue 3: Agent Not Responding

**Symptom**: Agent takes too long or produces incomplete output

**Solution**:
```bash
# Provide more context
claude-code "Using Next.js 15 App Router and React 19,
have typescript-pro create a type-safe component with:
[specific requirements]"

# Use a specific model
claude-code --agent typescript-pro --model sonnet
```

### Issue 4: Conflicting Agent Recommendations

**Symptom**: Different agents suggest different approaches

**Solution**:
```bash
# Use architect-reviewer to reconcile
claude-code "
Agent A recommends approach X
Agent B recommends approach Y
Have architect-reviewer create unified recommendation"
```

### Issue 5: Configuration Not Applied

**Symptom**: Custom configuration not taking effect

**Solution**:
```bash
# Verify configuration
cat ~/.claude/config.json | grep -A10 "agentDefaults"

# Clear any caches
rm -rf ~/.claude/.cache

# Restart Claude Code
claude-code --restart
```

### Debugging Checklist

```bash
# 1. Verify installation
ls ~/.claude/agents/ | wc -l  # Should be 83

# 2. Check configuration
cat ~/.claude/config.json

# 3. Test specific agent
claude-code --agent typescript-pro --test

# 4. Check model availability
claude-code --models available

# 5. View agent details
claude-code --agent backend-architect --info

# 6. Enable debug logging
cat ~/.claude/config.json | grep -A5 "features"
```

---

## Part 6: Best Practices

### 1. Agent Selection Best Practices

**DO:**
- Use explicit agent names for critical tasks
- Provide full project context
- Specify quality standards
- Request review from multiple agents

**DON'T:**
- Rely on auto-selection for critical work
- Use generic requests
- Assume agent knowledge of your project
- Skip verification steps

### 2. Configuration Best Practices

**DO:**
- Version control agent configuration
- Document customisations
- Create environment-specific configs
- Use project-level configurations

**DON'T:**
- Modify agent files directly
- Keep sensitive data in config
- Use hardcoded model selections
- Ignore configuration updates

### 3. Workflow Best Practices

**DO:**
- Start with architecture agents
- Use sequential workflows for critical code
- Verify each stage before proceeding
- Document decisions

**DON'T:**
- Jump straight to implementation
- Use parallel workflows for interdependent tasks
- Ignore agent recommendations
- Skip testing stages

### 4. Quality Assurance

**DO:**
- Always use code-reviewer for production code
- Have security-auditor review sensitive features
- Use test-automator for test coverage
- Verify performance with performance-engineer

**DON'T:**
- Deploy without review
- Skip security checks
- Assume test coverage
- Ignore performance implications

### 5. Documentation

**DO:**
- Document agent selection decisions
- Keep configuration versioned
- Record successful workflows
- Update project-specific agent config

**DON'T:**
- Lose track of agent recommendations
- Leave configuration undocumented
- Delete successful workflow notes
- Forget to update documentation

---

## Part 7: Performance Optimisation

### Agent Response Time Targets

| Model | Target Response | Best For |
|-------|-----------------|----------|
| Haiku | < 1 second | Quick tasks |
| Sonnet | 2-5 seconds | Standard work |
| Opus | 5-15 seconds | Complex work |

### Optimisation Strategies

1. **Cache Agent Responses**
   ```bash
   # Enable in config.json
   "features": { "agentCaching": true }
   ```

2. **Batch Similar Tasks**
   ```bash
   # Process multiple similar tasks with same agent
   # More efficient than sequential different agents
   ```

3. **Use Appropriate Models**
   ```bash
   # Don't use Opus for simple CSS fixes
   # Don't use Haiku for architecture decisions
   ```

4. **Provide Clear Context**
   ```bash
   # More context → Faster, better answers
   # Vague requests → Slower, need clarification
   ```

---

## Quick Reference Commands

```bash
# List all agents
claude-code --agents list

# Show agent info
claude-code --agent typescript-pro --info

# Test agent
claude-code --agent typescript-pro --test

# Use specific model
claude-code --model opus --request "..."

# Show available models
claude-code --models available

# Check configuration
cat ~/.claude/config.json

# Verify installation
ls ~/.claude/agents/*.md | wc -l

# Create backup
cp -r ~/.claude/agents ~/.claude/agents.backup
```

---

## Integration with Git Workflow

### Pre-Commit Hook

**File: `.git/hooks/pre-commit`**

```bash
#!/bin/bash

# Run code-reviewer before commit
echo "Running code quality check..."
claude-code --agent code-reviewer --audit src/

if [ $? -eq 0 ]; then
  echo "✅ Code review passed"
  exit 0
else
  echo "❌ Code review failed"
  exit 1
fi
```

### GitHub Actions Integration

**File: `.github/workflows/agent-review.yml`**

```yaml
name: Agent Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Security Audit
        run: claude-code --agent security-auditor --audit src/

      - name: Code Review
        run: claude-code --agent code-reviewer --audit src/

      - name: Performance Check
        run: claude-code --agent performance-engineer --profile src/
```

---

## Support & Resources

### Documentation Files Created

1. `CLAUDE_CODE_SUBAGENTS_GUIDE.md` - Comprehensive overview
2. `TYPESCRIPT_PRO_QUICK_REFERENCE.md` - TypeScript-Pro specialisation
3. `SUBAGENT_SETUP_GUIDE.md` - This file

### External Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Subagents Repository](https://github.com/wshobson/agents)
- [Official Agents Collection](https://github.com/wshobson/agents)

### Getting Help

```bash
# Check agent documentation
cat ~/.claude/agents/[agent-name].md

# List all capabilities
claude-code --agent [agent-name] --info

# Get examples
claude-code --agent [agent-name] --examples
```

---

## Checklist: Complete Setup

- [ ] Claude Code CLI installed and verified
- [ ] Subagents repository cloned to `~/.claude/agents/`
- [ ] 83 agents verified (ls command)
- [ ] Configuration file created in `~/.claude/config.json`
- [ ] Project-level configuration created (`.claude-agents.json`)
- [ ] Custom agents created (if needed)
- [ ] Test agent selected and verified
- [ ] Multi-agent workflow tested
- [ ] Git integration configured (optional)
- [ ] Documentation reviewed
- [ ] Best practices checklist completed

---

**Last Updated**: October 2025
**Version**: 2.0
**Status**: Production Ready
