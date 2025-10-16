#!/bin/bash
# Fix duplicate export patterns like: export const X = X

FILES=(
  "src/components/analytics/faq-analytics-dashboard.tsx"
  "src/components/analytics/testimonials-executive-dashboard.tsx"
  "src/components/admin/faq-version-diff-viewer.tsx"
  "src/components/admin/faq-version-workflow-manager.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Check if file has duplicate export pattern
    if grep -q "^export const .* = .*$" "$file"; then
      echo "Checking: $file"
      grep "^export const .* = " "$file" | while read -r line; do
        # Extract variable name
        var=$(echo "$line" | sed -E 's/export const ([^ ]+) = .*/\1/')
        echo "  Found export: $var"
      done
    fi
  fi
done
