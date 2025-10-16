#!/bin/bash

# List Files By Age - Cleanup Helper Script
# Lists all files sorted by modification date (oldest first)
# Usage: bash scripts/list-files-by-age.sh [--all]

echo "Scanning project files by modification date (oldest first)..."
echo "================================================================"
echo ""

# Check if --all flag is provided
SHOW_ALL=false
if [[ "$1" == "--all" ]]; then
    SHOW_ALL=true
fi

# Find command with exclusions
if [ "$SHOW_ALL" = true ]; then
    # Include everything except .git
    find . -type f -not -path "*/.git/*" -printf '%T+ %12s %p\n' | sort | while read -r line; do
        # Extract timestamp, size, and path
        timestamp=$(echo "$line" | cut -d' ' -f1)
        size=$(echo "$line" | awk '{print $2}')
        path=$(echo "$line" | cut -d' ' -f3-)

        # Convert timestamp to readable format
        date_readable=$(date -d "${timestamp}" '+%Y-%m-%d %H:%M:%S' 2>/dev/null || echo "$timestamp")

        # Convert size to human readable
        if command -v numfmt &> /dev/null; then
            size_readable=$(numfmt --to=iec-i --suffix=B --padding=8 "$size" 2>/dev/null || echo "$size")
        else
            size_readable=$(printf "%8s" "$size")
        fi

        # Print formatted line
        printf "%-19s %10s  %s\n" "$date_readable" "$size_readable" "$path"
    done
else
    # Exclude common development directories
    find . -type f \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/.next/*" \
        -not -path "*/dist/*" \
        -not -path "*/build/*" \
        -not -path "*/.vercel/*" \
        -not -path "*/.turbo/*" \
        -printf '%T+ %12s %p\n' | sort | while read -r line; do

        # Extract timestamp, size, and path
        timestamp=$(echo "$line" | cut -d' ' -f1)
        size=$(echo "$line" | awk '{print $2}')
        path=$(echo "$line" | cut -d' ' -f3-)

        # Convert timestamp to readable format
        date_readable=$(date -d "${timestamp}" '+%Y-%m-%d %H:%M:%S' 2>/dev/null || echo "$timestamp")

        # Convert size to human readable
        if command -v numfmt &> /dev/null; then
            size_readable=$(numfmt --to=iec-i --suffix=B --padding=8 "$size" 2>/dev/null || echo "$size")
        else
            size_readable=$(printf "%8s" "$size")
        fi

        # Print formatted line
        printf "%-19s %10s  %s\n" "$date_readable" "$size_readable" "$path"
    done
fi

echo ""
echo "================================================================"
echo "Format: [Date Time] [Size] [Path]"
echo "Tip: Pipe to 'less' for easier viewing: bash scripts/list-files-by-age.sh | less"
echo "Tip: Save to file: bash scripts/list-files-by-age.sh > file-audit.txt"
echo "Tip: Show all files including node_modules: bash scripts/list-files-by-age.sh --all"
