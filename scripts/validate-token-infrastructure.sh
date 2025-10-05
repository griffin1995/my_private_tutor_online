#!/bin/bash

# CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design Token Infrastructure Validation Script
# VALIDATION REASON: Automated testing of design token infrastructure completeness
# PURPOSE: Quick validation script for token infrastructure health check

echo "=================================================="
echo "Design Token Infrastructure Validation"
echo "My Private Tutor Online - Enterprise Quality"
echo "=================================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track validation results
PASS_COUNT=0
FAIL_COUNT=0

# Function to check and report
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ PASS${NC}: $2"
        ((PASS_COUNT++))
    else
        echo -e "${RED}❌ FAIL${NC}: $2"
        echo "   Missing file: $1"
        ((FAIL_COUNT++))
    fi
}

check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✅ PASS${NC}: $3"
        ((PASS_COUNT++))
    else
        echo -e "${RED}❌ FAIL${NC}: $3"
        echo "   Pattern not found: $2 in $1"
        ((FAIL_COUNT++))
    fi
}

echo "1. CHECKING SOURCE TOKEN FILES"
echo "================================"
check_file "src/design-tokens/colors.json" "Color tokens source file exists"
check_file "src/design-tokens/typography.json" "Typography tokens source file exists"
check_file "src/design-tokens/spacing.json" "Spacing tokens source file exists"
check_file "src/design-tokens/config.json" "Style Dictionary config exists"
echo ""

echo "2. CHECKING GENERATED TOKEN FILES"
echo "=================================="
check_file "src/design-tokens/generated/variables.css" "CSS variables file generated"
check_file "src/design-tokens/generated/tokens.json" "Token JSON file generated"
check_file "src/design-tokens/generated/tokens.ts" "TypeScript tokens file generated"
echo ""

echo "3. CHECKING TAILWIND CONFIGURATION"
echo "===================================="
check_content "tailwind.config.ts" "token-primary" "Primary token colors in Tailwind config"
check_content "tailwind.config.ts" "token-secondary" "Secondary token colors in Tailwind config"
check_content "tailwind.config.ts" "token-neutral" "Neutral token colors in Tailwind config"
check_content "tailwind.config.ts" "token-semantic" "Semantic token colors in Tailwind config"
echo ""

echo "4. CHECKING CSS VARIABLES IMPORT"
echo "=================================="
check_content "src/app/globals.css" "@import '../design-tokens/generated/variables.css'" "CSS variables imported in globals.css"
echo ""

echo "5. CHECKING BRAND COLOR VALUES"
echo "================================"
check_content "src/design-tokens/generated/variables.css" "#3f4a7e" "Primary navy color (#3F4A7E) defined"
check_content "src/design-tokens/generated/variables.css" "#ca9e5b" "Secondary gold color (#CA9E5B) defined"
echo ""

echo "6. CHECKING TEST INFRASTRUCTURE"
echo "================================="
check_file "src/components/design-tokens/TokenTestComponent.tsx" "Token test component exists"
check_file "src/app/[locale]/design-tokens-test/page.tsx" "Token test page exists"
echo ""

echo "7. CHECKING CRITICAL CSS VARIABLES"
echo "===================================="
check_content "src/design-tokens/generated/variables.css" "color-primary-base:" "Primary base variable defined"
check_content "src/design-tokens/generated/variables.css" "color-secondary-base:" "Secondary base variable defined"
check_content "src/design-tokens/generated/variables.css" "color-neutral-white:" "Neutral white variable defined"
check_content "src/design-tokens/generated/variables.css" "color-semantic-success:" "Semantic success variable defined"
echo ""

echo "=================================================="
echo "VALIDATION SUMMARY"
echo "=================================================="
echo -e "Total Checks: $((PASS_COUNT + FAIL_COUNT))"
echo -e "${GREEN}Passed: $PASS_COUNT${NC}"
echo -e "${RED}Failed: $FAIL_COUNT${NC}"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ INFRASTRUCTURE COMPLETE${NC}"
    echo "All design token infrastructure components are operational."
    echo ""
    echo "Next Steps:"
    echo "1. Run 'npm run dev' to start development server"
    echo "2. Navigate to http://localhost:3000/en/design-tokens-test"
    echo "3. Visually verify all 25 color tokens render correctly"
    echo "4. Proceed with component migration to token classes"
    echo ""
    exit 0
else
    echo -e "${RED}❌ INFRASTRUCTURE INCOMPLETE${NC}"
    echo "Some infrastructure components are missing or misconfigured."
    echo ""
    echo "Recommended Actions:"
    echo "1. Run 'npm run tokens:build' to regenerate tokens"
    echo "2. Verify all source files exist in src/design-tokens/"
    echo "3. Check that Style Dictionary is installed correctly"
    echo "4. Review validation errors above for specific issues"
    echo ""
    exit 1
fi
