---
allowed-tools: Bash(npm run build:*), Bash(npm run typecheck:*), Bash(npm run lint:*), Bash(npm run test:*)
description: Run comprehensive build and test validation
---

<!--
CONTEXT7 SOURCE: /websites/docs_anthropic_com-en-docs-claude-code - Slash command frontmatter pattern
IMPLEMENTATION REASON: Official Claude Code documentation for comprehensive build validation slash command
-->

# Test & Build Validation

Execute comprehensive validation of the codebase:

## Build Validation

1. **TypeScript Compilation**
   ```bash
   npm run typecheck
   ```

2. **Production Build**
   ```bash
   npm run build
   ```

3. **Linting Check**
   ```bash
   npm run lint
   ```

4. **Test Suite**
   ```bash
   npm run test
   ```

## Quality Gates

All checks must pass:
- ✅ TypeScript compilation without errors
- ✅ Production build completes successfully
- ✅ ESLint passes with zero errors
- ✅ Test suite achieves >90% coverage
- ✅ Build time remains under 25 seconds
- ✅ Bundle size under 229kB

## Performance Monitoring

Track and report:
- Build duration (target: <25s)
- Bundle size analysis
- TypeScript compilation time
- Test execution time
- Memory usage during build

## Failure Handling

If any check fails:
1. Stop execution immediately
2. Report specific failure details
3. Provide remediation guidance
4. Suggest relevant fix commands

Execute all validation checks now and report comprehensive results.