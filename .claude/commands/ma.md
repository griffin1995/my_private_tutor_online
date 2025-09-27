---
description: Quick alias for multi-agent-analysis with standard configuration
category: analysis
argument-hint: <task_description> [options]
allowed-tools: Task, Read, Write, Edit, Grep, Glob, WebFetch
model: sonnet
---

# Multi-Agent Analysis - Quick Alias

Shorthand command for `/multi-agent-analysis` with standard 4-agent, 5-round execution.

## Usage

```bash
/ma <task_description> [options]
```

This is equivalent to:
```bash
/multi-agent-analysis <task_description> complexity:standard profile:balanced
```

## Examples

```bash
/ma "Optimize homepage loading performance"
/ma "Design user authentication system" profile:realistic
/ma "Add mobile responsiveness to dashboard" profile:fast
```

For full documentation, see `/multi-agent-analysis` command.