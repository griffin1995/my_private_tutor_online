---
allowed-tools: Bash(npm run build:*), Bash(npm run typecheck:*), Task
description: Analyze code for performance issues and suggest optimizations
argument-hint: [file path or component name]
---

<!--
CONTEXT7 SOURCE: /websites/docs_anthropic_com-en-docs-claude-code - Slash command frontmatter and $ARGUMENTS pattern
IMPLEMENTATION REASON: Official Claude Code documentation for performance analysis slash command
-->

# Performance Optimization Analysis

Analyze the specified code for performance issues and suggest three specific optimizations:

## Target for Analysis
$ARGUMENTS

## Analysis Focus

1. **Performance Bottlenecks**
   - Identify slow operations
   - Analyze render cycles
   - Check for memory leaks
   - Review bundle size impact

2. **Code Efficiency**
   - Algorithm optimization opportunities
   - Unnecessary re-renders
   - Inefficient data structures
   - Database query optimization

3. **Best Practices**
   - React performance patterns
   - TypeScript optimization
   - Build process improvements
   - Caching strategies

## Output Format

Provide specific, actionable recommendations with:
- Current performance metrics where available
- Exact code changes needed
- Expected improvement percentages
- Implementation complexity (Low/Medium/High)
- Priority ranking (Critical/High/Medium/Low)

Execute analysis now and provide detailed optimization recommendations.