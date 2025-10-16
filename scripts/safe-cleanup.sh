#!/bin/bash

# Safe Cleanup Script - Systematic File Deletion Helper
# Usage:
#   1. Create a file list: bash scripts/list-files-by-age.sh > cleanup-candidates.txt
#   2. Edit cleanup-candidates.txt and keep only files you want to DELETE
#   3. Run this script: bash scripts/safe-cleanup.sh cleanup-candidates.txt

if [ -z "$1" ]; then
    echo "Error: No file list provided"
    echo ""
    echo "Usage:"
    echo "  1. Generate file list:"
    echo "     bash scripts/list-files-by-age.sh > cleanup-candidates.txt"
    echo ""
    echo "  2. Edit cleanup-candidates.txt to keep only files you want to DELETE"
    echo "     (Remove lines for files you want to KEEP)"
    echo ""
    echo "  3. Run cleanup:"
    echo "     bash scripts/safe-cleanup.sh cleanup-candidates.txt"
    echo ""
    echo "  4. Or use dry-run mode first (shows what would be deleted):"
    echo "     bash scripts/safe-cleanup.sh cleanup-candidates.txt --dry-run"
    exit 1
fi

FILE_LIST="$1"
DRY_RUN=false

if [ "$2" == "--dry-run" ]; then
    DRY_RUN=true
    echo "DRY RUN MODE - No files will be deleted"
    echo "========================================"
    echo ""
fi

if [ ! -f "$FILE_LIST" ]; then
    echo "Error: File list '$FILE_LIST' not found"
    exit 1
fi

# Extract file paths from the formatted list
# Expected format: "YYYY-MM-DD HH:MM:SS SIZE PATH" OR just "./path/to/file"
# Filter out comments (#), empty lines, and header lines
FILES_TO_DELETE=$(grep -v "^#\|^==\|^Format:\|^Tip:\|^Scanning\|^$" "$FILE_LIST" | sed 's/^[[:space:]]*//' | sed 's/^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}[+:0-9 ]*[0-9]\{2\}:[0-9]\{2\} *[0-9.KMGTiB]* *//')

if [ -z "$FILES_TO_DELETE" ]; then
    echo "No files found in the list"
    exit 0
fi

# Count files
FILE_COUNT=$(echo "$FILES_TO_DELETE" | wc -l)

echo "Files to delete: $FILE_COUNT"
echo ""

if [ "$DRY_RUN" = true ]; then
    echo "Would delete the following files:"
    echo "================================="
    echo "$FILES_TO_DELETE"
    echo ""
    echo "Total: $FILE_COUNT files"
    exit 0
fi

# Prompt for confirmation
echo "WARNING: This will permanently delete $FILE_COUNT files!"
echo ""
echo "First 10 files to be deleted:"
echo "$FILES_TO_DELETE" | head -10
echo ""

read -p "Do you want to continue? Type 'yes' to confirm: " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Aborted - no files deleted"
    exit 0
fi

echo ""
echo "Deleting files..."
echo "================="

DELETED=0
FAILED=0

while IFS= read -r file; do
    if [ -f "$file" ]; then
        if rm "$file" 2>/dev/null; then
            echo "✓ Deleted: $file"
            DELETED=$((DELETED + 1))
        else
            echo "✗ Failed: $file"
            FAILED=$((FAILED + 1))
        fi
    else
        echo "⊘ Not found: $file"
    fi
done <<< "$FILES_TO_DELETE"

echo ""
echo "====================="
echo "Cleanup Summary:"
echo "====================="
echo "Successfully deleted: $DELETED files"
echo "Failed: $FAILED files"
echo ""

# Offer to remove empty directories
if [ $DELETED -gt 0 ]; then
    echo "Searching for empty directories..."
    EMPTY_DIRS=$(find . -type d -empty -not -path "*/.git/*" -not -path "*/node_modules/*" 2>/dev/null)

    if [ -n "$EMPTY_DIRS" ]; then
        echo ""
        echo "Found empty directories:"
        echo "$EMPTY_DIRS"
        echo ""
        read -p "Remove empty directories? Type 'yes' to confirm: " CONFIRM_DIRS

        if [ "$CONFIRM_DIRS" == "yes" ]; then
            find . -type d -empty -not -path "*/.git/*" -not -path "*/node_modules/*" -delete 2>/dev/null
            echo "Empty directories removed"
        fi
    else
        echo "No empty directories found"
    fi
fi

echo ""
echo "Cleanup complete!"
