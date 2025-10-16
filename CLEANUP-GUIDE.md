# Project Cleanup Guide

This guide helps you systematically identify and remove obsolete files from the
project.

## Quick Start

### Option 1: Review Pre-Filtered List (Recommended)

```bash
# 1. Review the obvious cleanup candidates
cat obvious-cleanup-candidates.txt

# 2. Edit the file to remove any lines for files you want to KEEP
nano obvious-cleanup-candidates.txt

# 3. Test with dry-run (shows what would be deleted without deleting)
bash scripts/safe-cleanup.sh obvious-cleanup-candidates.txt --dry-run

# 4. If satisfied, run actual cleanup
bash scripts/safe-cleanup.sh obvious-cleanup-candidates.txt
```

### Option 2: Full Custom Review

```bash
# 1. Generate complete file list sorted by age (oldest first)
bash scripts/list-files-by-age.sh > my-cleanup-list.txt

# 2. Review and edit the list - DELETE lines for files you want to KEEP
#    KEEP only lines for files you want to DELETE
nano my-cleanup-list.txt

# 3. Dry-run to preview deletions
bash scripts/safe-cleanup.sh my-cleanup-list.txt --dry-run

# 4. Execute cleanup
bash scripts/safe-cleanup.sh my-cleanup-list.txt
```

## Cleanup Categories

### Safe to Delete (Usually)

**Build Logs:**

- `build*.log`
- `deployment-output.log`
- `dev*.log`
- `server.log`

**Dependency Analysis:**

- `unused-*.txt`
- `knip-*.txt`
- `all-unused-deps.txt`

**Test Artifacts:**

- `test-*.html`
- `*-intermediate.html`
- Temporary viewport test files

**One-time Reports:**

- `MASTER_ANALYSIS_REPORT.json`
- `QUALITY_TRANSFORMATION_METRICS.json`
- Weekly performance report snapshots

### Review Carefully

**Configuration Files:**

- `playwright-mcp-config.json` - Only if you're not using Playwright MCP
- `performance-budget.json` - If you don't track performance budgets
- `commitlint.config.js` - If you don't use commitlint

**Generated Files:**

- `tina/__generated__/*` - These regenerate but check if Tina CMS is active
- `.claude/context/*` - Claude Code context files (regenerate automatically)

**Content Files:**

- `src/content/*.json` - These are likely content/data files
- `src/messages/*.json` - i18n translations
- Check before deleting!

### Never Delete

**Core Configuration:**

- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `next.config.js`
- `.env` files

**Documentation:**

- `README.md`
- `CLAUDE.md`
- `REVISIONS*.md`

**Source Code:**

- Anything in `src/` that's not obviously a test artifact
- `public/` assets (images, fonts, etc.)

## Advanced Usage

### Filter by File Type

```bash
# Show only log files
bash scripts/list-files-by-age.sh | grep '\.log$'

# Show only JSON files
bash scripts/list-files-by-age.sh | grep '\.json$'

# Show only HTML test files
bash scripts/list-files-by-age.sh | grep '\.html$'

# Show files from specific date range
bash scripts/list-files-by-age.sh | grep '2025-10-'
```

### Show All Files (Including node_modules)

```bash
bash scripts/list-files-by-age.sh --all
```

### Save Output for Later Review

```bash
# Save full list
bash scripts/list-files-by-age.sh > full-file-audit-$(date +%Y%m%d).txt

# Save only specific types
bash scripts/list-files-by-age.sh | grep -E '\.(log|txt|html)$' > temp-files-audit.txt
```

## Safety Features

1. **Dry-Run Mode**: Always test with `--dry-run` first
2. **Confirmation Required**: Script asks for "yes" confirmation before deleting
3. **Empty Directory Cleanup**: Optionally removes empty directories after file
   deletion
4. **Deletion Log**: Shows which files were deleted successfully and which
   failed

## Workflow Example

```bash
# 1. Start with obvious candidates
cat obvious-cleanup-candidates.txt

# 2. Remove any lines you want to keep (e.g., specific JSON reports you need)
nano obvious-cleanup-candidates.txt

# 3. Dry-run check
bash scripts/safe-cleanup.sh obvious-cleanup-candidates.txt --dry-run

# Output shows:
# DRY RUN MODE - No files will be deleted
# ========================================
# Would delete the following files:
# ...

# 4. If everything looks good, execute
bash scripts/safe-cleanup.sh obvious-cleanup-candidates.txt

# 5. Review summary
# Cleanup Summary:
# Successfully deleted: 42 files
# Failed: 0 files
```

## Recovery

If you accidentally delete something important:

```bash
# If you haven't committed:
git restore <filename>

# If files are staged but not committed:
git restore --staged <filename>
git restore <filename>

# If you need to see what was deleted:
git status
git diff
```

## Post-Cleanup

After cleanup, verify your build still works:

```bash
npm run build
```

If issues arise, check git status and restore any necessary files:

```bash
git status
git restore <file-if-needed>
```

## Regular Cleanup Schedule

Consider running cleanup:

- After major development phases
- Before creating releases/tags
- Monthly during active development
- Before repository backups

## Tips

1. **Start Small**: Begin with obvious log files
2. **Use Dry-Run**: Always preview deletions first
3. **Commit First**: Commit working code before cleanup
4. **Review by Age**: Older files are usually safer to delete
5. **Check File Size**: Large files in root directory are often cleanup
   candidates
6. **Grep is Your Friend**: Use grep to filter file lists by pattern

## File Size Analysis

```bash
# Show files larger than 1MB
bash scripts/list-files-by-age.sh | awk '$2 ~ /MiB/ && $2+0 > 1'

# Show largest files first (instead of oldest)
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" -exec ls -lh {} \; | sort -k5 -hr | head -20
```

## Questions?

- Check the script source: `cat scripts/list-files-by-age.sh`
- Review safe-cleanup script: `cat scripts/safe-cleanup.sh`
- Test with dry-run: `--dry-run` flag never deletes anything
