# Claude Code Subagents: Complete Implementation Guide

## Overview

Claude Code subagents are specialized AI agents designed to handle specific domains and technical tasks. This guide provides complete documentation on setting up and using subagents effectively.

## What Are Subagents?

Subagents are pre-configured Claude instances with:
- **Domain-specific expertise**: Deep knowledge in particular technical areas
- **Specialized capabilities**: 8-12 capability areas per agent
- **Production-ready patterns**: Current industry best practices (2024/2025)
- **Optimised model selection**: Based on task complexity

## Subagent Structure

Each subagent is defined as a Markdown file with YAML frontmatter:

```markdown
---
name: subagent-name
description: Activation criteria and specialisation focus
model: haiku|sonnet|opus  # Optional: Model selection (default: auto-select)
tools: tool1, tool2       # Optional: Tool restrictions for security
---

# Subagent System Prompt

Complete system prompt defining expertise, capabilities, and behaviour patterns.
```

## Model Selection Strategy

Claude Code uses three model tiers optimised for different task types:

### Haiku Model (Fast, Efficient)
- **Use cases**: Simple updates, CSS tweaks, content modifications, quick fixes
- **Agent count**: 11 agents
- **Key agents**: `context-manager`, `reference-builder`, `search-specialist`, all SEO optimisation agents
- **Characteristics**: Minimal computational overhead, rapid response times
- **Cost-effective**: Best for straightforward tasks

### Sonnet Model (Balanced, Complex)
- **Use cases**: Standard development, component architecture, API integration, state management, testing
- **Agent count**: 50 agents
- **Key agents**: All language-specific developers (`typescript-pro`, `python-pro`, etc.), frontend specialists, infrastructure engineers
- **Characteristics**: Excellent reasoning capability, handles complexity well
- **Versatility**: Most general-purpose agent tasks use Sonnet

### Opus Model (Advanced, Strategic)
- **Use cases**: Architecture design, performance optimisation, accessibility compliance, security implementations
- **Agent count**: 22 agents
- **Key agents**: `backend-architect`, `code-reviewer`, `security-auditor`, `performance-engineer`
- **Characteristics**: Deep reasoning, comprehensive analysis
- **When needed**: Complex architectural decisions, critical security reviews

## Installation Setup

### Step 1: Locate Claude Configuration Directory

```bash
# Navigate to Claude configuration directory
cd ~/.claude

# Verify agents directory exists
ls -la
```

### Step 2: Clone or Copy Subagents

```bash
# Clone the agents repository
git clone https://github.com/wshobson/agents.git

# Or manually copy agent files
cp -r agents/ ~/.claude/

# Verify installation
ls ~/.claude/agents/ | head -20
```

### Step 3: Verify Installation

```bash
# Check that subagents are available
ls ~/.claude/agents/ | grep -E "\.md$"

# Verify specific agents
ls ~/.claude/agents/typescript-pro.md
ls ~/.claude/agents/code-reviewer.md
ls ~/.claude/agents/backend-architect.md
```

## Key Subagent Categories

### Architecture & System Design (Opus Preferred)

| Agent | Model | Specialisation |
|-------|-------|----------------|
| `backend-architect` | opus | RESTful APIs, microservice architecture, database design |
| `frontend-developer` | sonnet | React components, responsive layouts, state management |
| `graphql-architect` | opus | GraphQL schemas, federation, resolver patterns |
| `cloud-architect` | opus | AWS/Azure/GCP infrastructure, cost optimisation |
| `kubernetes-architect` | opus | Cloud-native infrastructure, Kubernetes, GitOps |

### Programming Languages (Primarily Sonnet)

#### Systems & Low-Level
- `c-pro`: System programming, memory management, OS interfaces
- `cpp-pro`: Modern C++, RAII, smart pointers
- `rust-pro`: Memory-safe systems programming
- `golang-pro`: Concurrent programming, channels, goroutines

#### Web & Application Development
- `javascript-pro`: Modern JavaScript, ES6+, Node.js patterns
- `typescript-pro`: Advanced TypeScript, type systems, generics
- `python-pro`: Python development, optimisation, advanced features
- `ruby-pro`: Ruby with metaprogramming, Rails patterns
- `php-pro`: Modern PHP, framework integration

#### Enterprise & JVM
- `java-pro`: Modern Java, streams, concurrency, JVM optimisation
- `scala-pro`: Enterprise Scala, functional programming, distributed systems
- `csharp-pro`: C#, .NET frameworks, design patterns

### Infrastructure & Operations

| Agent | Model | Focus Area |
|-------|-------|-----------|
| `devops-troubleshooter` | sonnet | Production debugging, log analysis |
| `cloud-architect` | opus | Scalable infrastructure design |
| `terraform-specialist` | opus | Infrastructure as Code, module management |
| `database-optimizer` | opus | Query optimisation, indexing strategies |
| `incident-responder` | opus | Production incident management |

### Quality Assurance & Security

| Agent | Model | Specialisation |
|-------|-------|----------------|
| `code-reviewer` | opus | Code review, security focus |
| `security-auditor` | opus | Vulnerability assessment, OWASP compliance |
| `test-automator` | sonnet | Unit, integration, E2E test creation |
| `performance-engineer` | opus | Profiling, optimisation analysis |

## Using Subagents Effectively

### Method 1: Automatic Delegation

Let Claude Code analyse your request and select the appropriate subagent:

```
"Create a TypeScript component for form validation"
→ Claude Code automatically selects: typescript-pro or frontend-developer
```

### Method 2: Explicit Invocation

Directly request a specific subagent:

```
"Use typescript-pro to create a type-safe form validation system"
"Have performance-engineer profile this slow endpoint"
"Get security-auditor to check for OWASP compliance"
```

### Method 3: Multi-Agent Workflows

Specify multiple agents for complex tasks:

```
"Build an authentication system:
  1. backend-architect: Design API structure
  2. typescript-pro: Implement with type safety
  3. security-auditor: Verify compliance
  4. test-automator: Create comprehensive tests"
```

## Subagent Selection Matrix

Use this matrix to select optimal agents for your tasks:

### For TypeScript Development

**Simple TypeScript task**
```
Request: "Add a new utility function"
→ typescript-pro (Sonnet)
```

**Complex TypeScript architecture**
```
Request: "Design type-safe event system"
→ typescript-pro (Sonnet) or architect-reviewer (Opus)
```

### For Architecture & Design

**System design**
```
Request: "Design microservice architecture"
→ backend-architect (Opus)
```

**Database design**
```
Request: "Optimise database schema"
→ database-architect (Opus)
```

### For DevOps & Infrastructure

**Production troubleshooting**
```
Request: "Debug high memory usage"
→ devops-troubleshooter (Sonnet)
```

**Infrastructure design**
```
Request: "Design multi-region deployment"
→ cloud-architect (Opus)
```

### For Security

**Vulnerability scanning**
```
Request: "Audit code for security issues"
→ security-auditor (Opus)
```

**Security implementation**
```
Request: "Implement secure API authentication"
→ backend-security-coder (Opus)
```

## Best Practices for Subagent Usage

### 1. Be Specific About Requirements

**Good:**
```
"Use typescript-pro to create a strongly-typed API client with
proper error handling and request validation using Zod."
```

**Weak:**
```
"Make a TypeScript API client"
```

### 2. Provide Context

Include relevant information:
```
"Using Next.js 15 App Router and React 19, have frontend-developer
create a server component that fetches user data with loading states."
```

### 3. Specify Quality Standards

```
"Use code-reviewer to audit this component for:
- Security vulnerabilities
- Performance issues
- Accessibility compliance
- Best practices adherence"
```

### 4. Leverage Specialist Combinations

**Good workflow sequence:**
```
1. backend-architect → API design
2. typescript-pro → Implementation
3. test-automator → Test suite
4. security-auditor → Security review
```

## Common Subagent Workflows

### Feature Development

```
"Build user authentication feature"
→ backend-architect (design)
→ typescript-pro (implementation)
→ test-automator (testing)
→ security-auditor (compliance)
```

### Performance Optimisation

```
"Optimise slow checkout process"
→ performance-engineer (profiling)
→ database-optimizer (query optimisation)
→ typescript-pro (code optimisation)
→ test-automator (regression testing)
```

### Production Incident

```
"Debug high memory usage in production"
→ incident-responder (immediate response)
→ devops-troubleshooter (root cause analysis)
→ performance-engineer (optimisation)
```

### Infrastructure Setup

```
"Deploy application to multiple regions"
→ cloud-architect (architecture)
→ terraform-specialist (IaC implementation)
→ devops-troubleshooter (deployment validation)
```

## Subagent Capability Areas

### TypeScript-Pro Capabilities

1. **Type System Mastery**: Advanced generics, conditional types, mapped types
2. **Performance Optimisation**: Compilation speed, bundle size reduction
3. **React Integration**: Server components, hooks, client-side rendering
4. **Error Handling**: Comprehensive error strategies
5. **Testing Architecture**: Type-safe test setup
6. **Configuration**: TypeScript compiler optimisation
7. **Strict Mode**: Full strict compiler support
8. **Tooling Integration**: Build tool optimisation
9. **Migration Strategy**: Legacy code modernisation
10. **Documentation**: Type definitions and JSDoc patterns
11. **Performance Budgeting**: Compile-time constraints
12. **Accessibility**: Type-safe ARIA implementations

### Code-Reviewer Capabilities

1. **Security Analysis**: OWASP compliance, vulnerability detection
2. **Performance Review**: Optimisation opportunities
3. **Code Quality**: Best practices, maintainability
4. **Accessibility**: WCAG compliance
5. **Type Safety**: TypeScript strictness verification
6. **Testing Coverage**: Test adequacy assessment
7. **Documentation**: Code clarity evaluation
8. **Design Patterns**: Architecture validation
9. **Error Handling**: Exception strategy review
10. **Performance**: Runtime efficiency analysis

## Troubleshooting Subagent Selection

### Issue: Wrong Agent Selected

**Solution**: Use explicit naming
```
"Use typescript-pro specifically (not general developer)"
```

### Issue: Agent Lacks Required Knowledge

**Solution**: Provide necessary context
```
"Using Next.js 15 App Router and Tailwind CSS,
have frontend-developer create a responsive component."
```

### Issue: Conflicting Recommendations

**Solution**: Request reconciliation
```
"Have backend-architect and performance-engineer
reconcile API design recommendations."
```

## Agent Orchestration Patterns

### Sequential Pattern (Conservative)

```
Agent A completes → Agent B uses output → Agent C validates
```

**When to use**: Critical implementations, security-sensitive code

### Parallel Pattern (Efficient)

```
Agent A (frontend) works alongside Agent B (backend)
→ Results merged by Agent C (architect)
```

**When to use**: Independent components, feature development

### Validation Pattern (Quality)

```
Agent A (implementation) → Agent B (reviewer) → Agent C (validator)
```

**When to use**: Production code, security requirements

## Advanced: Custom Subagent Configuration

If you need custom subagents, use this template:

```markdown
---
name: custom-subagent
description: "Activation trigger and specialisation area"
model: sonnet
tools: tool1, tool2, tool3
---

# System Prompt

You are a specialist in [domain].

## Core Expertise
- [Expertise 1]
- [Expertise 2]
- [Expertise 3]

## Capabilities
[Detailed capability list]

## Constraints
[Any specific limitations]

## Output Format
[Expected output structure]
```

## Performance Considerations

### Haiku Agents (11 total)
- **Response time**: <1 second average
- **Best for**: Quick tasks, content updates, SEO optimisation
- **Cost**: Lowest

### Sonnet Agents (50 total)
- **Response time**: 2-5 seconds average
- **Best for**: Standard development, most tasks
- **Cost**: Medium

### Opus Agents (22 total)
- **Response time**: 5-15 seconds average
- **Best for**: Complex architecture, critical decisions
- **Cost**: Highest

## Integration with Development Workflow

### Local Development

1. Install subagents to `~/.claude/agents/`
2. Use explicit agent naming in Claude Code requests
3. Follow verification steps before committing

### CI/CD Integration

```bash
# Example: Use code-reviewer in CI pipeline
claude-code --agent code-reviewer --audit src/
```

### Team Collaboration

```
# Developer creates PR with explicit agent review request
"Have security-auditor review this before merging"
```

## Monitoring Subagent Performance

Track which agents work best for your projects:

- **Timestamp requests** with specific agent names
- **Track success rates** for different task types
- **Monitor response times** and model selection
- **Collect feedback** on agent recommendations

## License and Attribution

Claude Code subagents are provided under MIT License. Attribution:

```
Subagents Collection by Anthropic
https://github.com/wshobson/agents
```

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Subagents Documentation](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Agent Repository](https://github.com/wshobson/agents)

---

**Last Updated**: October 2025
**Version**: 2.0
**Total Subagents**: 83 (Haiku: 11, Sonnet: 50, Opus: 22)
