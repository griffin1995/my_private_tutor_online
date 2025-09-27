# Save Development Progress

Complete save workflow with validation and git operations.

## Execution Steps

1. **Development Validation**
   - Run linting checks (npm run lint)
   - Execute type checking (npm run typecheck)
   - Validate build process (npm run build)
   - Confirm test suite passes if applicable

2. **Git Operations**
   - Stage all relevant changes (git add .)
   - Create descriptive commit message
   - Commit changes with proper attribution
   - Push to remote repository if specified

3. **Memory MCP Update**
   - Update Memory MCP with latest project state
   - Record completed tasks and current status
   - Store session progress and next steps

4. **Project State Documentation**
   - Update relevant documentation files
   - Refresh CLAUDE.md with current status
   - Log development milestones achieved

## Validation Checks

- No linting errors present
- TypeScript compilation successful
- Build process completes without errors
- Git status clean after commit

## Usage

Run: `/save` to execute complete save workflow with validation and git operations.

## Optional Parameters

- `/save --no-build` - Skip build validation
- `/save --no-push` - Skip git push operation
- `/save --message "custom message"` - Use custom commit message