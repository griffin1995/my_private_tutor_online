---
description: Quick 2-agent analysis for simple tasks and rapid prototyping
category: analysis
argument-hint: <task_description> [profile]
allowed-tools: Task, Read, Write, Edit, Grep, Glob, WebFetch
model: haiku
---

# Multi-Agent Analysis - Simple Mode

Execute rapid 2-agent analysis for simple tasks requiring quick insights.

## Usage

```bash
/ma-simple <task_description> [profile:fast|balanced|realistic]
```

## Configuration
- **Agents**: 2 optimal specialists selected
- **Rounds**: 3 focused rounds (Assessment, Proposals, Consensus)
- **Duration**: 15-30 minutes
- **Model**: Haiku (optimized for speed)

## When to Use
- Simple feature additions
- Basic UI/UX improvements
- Quick technical questions
- Rapid prototyping decisions
- Code optimization tasks

## Examples

```bash
/ma-simple "Add tooltips to form fields"
/ma-simple "Fix responsive layout on mobile" profile:fast
/ma-simple "Optimize database query performance"
/ma-simple "Choose between REST vs GraphQL API"
```

## Output
- **Streamlined Analysis**: Concise 2-agent consensus
- **Quick Implementation Plan**: Essential steps only
- **Rapid ROI Assessment**: Basic value quantification
- **Fast Decision Support**: Clear recommendation with rationale