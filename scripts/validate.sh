#!/bin/bash

# MY PRIVATE TUTOR ONLINE - Comprehensive Setup Validation
echo "🔍 Validating My Private Tutor Online setup..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Global validation status
VALIDATION_PASSED=true
WARNINGS_COUNT=0
ERRORS_COUNT=0

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS_COUNT++))
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    ((ERRORS_COUNT++))
    VALIDATION_PASSED=false
}

log_section() {
    echo ""
    echo -e "${BLUE}📋 $1${NC}"
    echo "----------------------------------------"
}

# Validate documentation files
validate_documentation() {
    log_section "DOCUMENTATION VALIDATION"
    
    local required_docs=(
        "CLAUDE.md"
        "DEVICE_SYNC_SETUP.md"
        "README.md"
    )
    
    local optional_docs=(
        "DEPLOYMENT.md"
        "CUSTOM_DOCS.md"
        "DOCUMENTATION_INDEX.md"
    )
    
    # Check required documentation
    for file in "${required_docs[@]}"; do
        if [ -f "$file" ]; then
            log_success "$file exists"
            
            # Check file size (should not be empty)
            if [ -s "$file" ]; then
                log_success "$file has content"
            else
                log_warning "$file is empty"
            fi
        else
            log_error "$file missing (required)"
        fi
    done
    
    # Check optional documentation
    for file in "${optional_docs[@]}"; do
        if [ -f "$file" ]; then
            log_success "$file exists (optional)"
        else
            log_info "$file not found (optional)"
        fi
    done
    
    # Validate CLAUDE.md content for specific requirements
    if [ -f "CLAUDE.md" ]; then
        if grep -q "Context-Manager System" CLAUDE.md; then
            log_success "CLAUDE.md contains Context-Manager System"
        else
            log_warning "CLAUDE.md missing Context-Manager System section"
        fi
        
        if grep -q "start project management" CLAUDE.md; then
            log_success "CLAUDE.md contains project management activation"
        else
            log_warning "CLAUDE.md missing project management activation instructions"
        fi
    fi
}

# Validate project structure
validate_project_structure() {
    log_section "PROJECT STRUCTURE VALIDATION"
    
    local required_dirs=(
        "src"
        "src/components"
        "src/lib"
        "src/app"
        "public"
        "scripts"
    )
    
    local optional_dirs=(
        "src/components/ui"
        "src/components/sections"
        "src/types"
        "src/hooks"
        "src/utils"
        "public/videos"
        "public/images"
        "docs"
        "tests"
    )
    
    # Check required directories
    for dir in "${required_dirs[@]}"; do
        if [ -d "$dir" ]; then
            log_success "$dir directory exists"
        else
            log_error "$dir directory missing (required)"
        fi
    done
    
    # Check optional directories
    for dir in "${optional_dirs[@]}"; do
        if [ -d "$dir" ]; then
            log_success "$dir directory exists (optional)"
        else
            log_info "$dir directory not found (optional)"
        fi
    done
    
    # Check for key files
    local key_files=(
        "package.json"
        "tsconfig.json"
        "next.config.ts"
        "tailwind.config.ts"
    )
    
    for file in "${key_files[@]}"; do
        if [ -f "$file" ] || [ -f "${file%.*}.js" ]; then
            log_success "Configuration file exists: $file"
        else
            log_warning "Configuration file missing: $file"
        fi
    done
}

# Validate environment configuration
validate_environment_files() {
    log_section "ENVIRONMENT CONFIGURATION VALIDATION"
    
    # Check environment templates
    if [ -f ".env.template" ]; then
        log_success "Environment template exists"
    else
        log_warning "Environment template missing"
    fi
    
    if [ -f ".env.production.template" ]; then
        log_success "Production environment template exists"
    else
        log_warning "Production environment template missing"
    fi
    
    # Check development environment
    if [ -f ".env.local" ]; then
        log_success "Development environment file exists"
        
        # Check for required environment variables
        local required_vars=(
            "NEXT_PUBLIC_API_URL"
            "NEXT_PUBLIC_WEB_URL"
            "NEXT_PUBLIC_ENVIRONMENT"
        )
        
        for var in "${required_vars[@]}"; do
            if grep -q "^$var=" .env.local; then
                log_success "$var configured in .env.local"
            else
                log_warning "$var not found in .env.local"
            fi
        done
        
        # Check for development-specific settings
        local dev_vars=(
            "NEXT_PUBLIC_DEBUG_MODE"
            "NEXTAUTH_SECRET"
        )
        
        for var in "${dev_vars[@]}"; do
            if grep -q "^$var=" .env.local; then
                log_success "$var configured (development)"
            else
                log_info "$var not configured (optional for development)"
            fi
        done
        
        # Validate localhost URLs in development
        if grep -q "localhost" .env.local; then
            log_success "Development URLs use localhost"
        else
            log_warning "Development environment may not use localhost URLs"
        fi
        
    else
        log_error "Development environment file missing (.env.local)"
    fi
    
    # Check production environment
    if [ -f ".env.production" ]; then
        log_success "Production environment file exists"
        
        # Check for production URLs (should not contain localhost)
        if grep -q "localhost" .env.production; then
            log_error "Production environment contains localhost URLs"
        else
            log_success "Production environment uses proper domain URLs"
        fi
        
    else
        log_info "Production environment file not found (optional)"
    fi
    
    # Check .gitignore for environment files
    if [ -f ".gitignore" ]; then
        if grep -q ".env" .gitignore; then
            log_success "Environment files are gitignored"
        else
            log_error "Environment files not in .gitignore (security risk)"
        fi
    else
        log_warning ".gitignore file missing"
    fi
}

# Validate dependencies
validate_dependencies() {
    log_section "DEPENDENCIES VALIDATION"
    
    # Check package.json
    if [ -f "package.json" ]; then
        log_success "package.json exists"
        
        # Check for required scripts
        local required_scripts=(
            "dev"
            "build"
        )
        
        for script in "${required_scripts[@]}"; do
            if grep -q "\"$script\":" package.json; then
                log_success "Script '$script' configured"
            else
                log_error "Script '$script' missing in package.json"
            fi
        done
        
        # Check for optional but recommended scripts
        local optional_scripts=(
            "lint"
            "test"
            "type-check"
        )
        
        for script in "${optional_scripts[@]}"; do
            if grep -q "\"$script\":" package.json; then
                log_success "Script '$script' configured (recommended)"
            else
                log_info "Script '$script' not configured (optional)"
            fi
        done
        
        # Check if node_modules exists
        if [ -d "node_modules" ]; then
            log_success "Dependencies installed (node_modules exists)"
            
            # Check package-lock.json
            if [ -f "package-lock.json" ]; then
                log_success "Dependency lock file exists"
            else
                log_warning "package-lock.json missing (consider running npm install)"
            fi
        else
            log_error "Dependencies not installed (run npm install)"
        fi
        
        # Check for key dependencies
        local key_deps=(
            "next"
            "react"
            "typescript"
        )
        
        for dep in "${key_deps[@]}"; do
            if grep -q "\"$dep\":" package.json; then
                log_success "Key dependency '$dep' found"
            else
                log_warning "Key dependency '$dep' not found"
            fi
        done
        
    else
        log_error "package.json missing"
    fi
}

# Validate Git configuration
validate_git_configuration() {
    log_section "GIT CONFIGURATION VALIDATION"
    
    if [ -d ".git" ]; then
        log_success "Git repository initialized"
        
        # Check .gitignore
        if [ -f ".gitignore" ]; then
            log_success ".gitignore exists"
            
            local ignore_patterns=(
                "node_modules"
                ".env"
                ".next"
                "dist"
            )
            
            for pattern in "${ignore_patterns[@]}"; do
                if grep -q "$pattern" .gitignore; then
                    log_success "$pattern is gitignored"
                else
                    log_warning "$pattern not in .gitignore"
                fi
            done
        else
            log_warning ".gitignore missing"
        fi
        
        # Check for Git hooks
        if [ -f ".git/hooks/pre-commit" ]; then
            log_success "Pre-commit hook configured"
        else
            log_info "Pre-commit hook not configured (optional)"
        fi
        
        # Check current branch
        if command -v git &> /dev/null; then
            CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
            if [ -n "$CURRENT_BRANCH" ]; then
                log_success "Current Git branch: $CURRENT_BRANCH"
            else
                log_info "Git branch information not available"
            fi
        fi
        
    else
        log_warning "Git repository not initialized"
        log_info "Consider running 'git init' to initialize version control"
    fi
}

# Validate Next.js specific configuration
validate_nextjs_configuration() {
    log_section "NEXT.JS CONFIGURATION VALIDATION"
    
    # Check Next.js config
    if [ -f "next.config.ts" ]; then
        log_success "Next.js TypeScript configuration exists"
    elif [ -f "next.config.js" ]; then
        log_success "Next.js JavaScript configuration exists"
    else
        log_warning "Next.js configuration not found"
    fi
    
    # Check TypeScript configuration
    if [ -f "tsconfig.json" ]; then
        log_success "TypeScript configuration exists"
        
        # Check for Next.js specific TypeScript settings
        if grep -q "next/core-web-vitals" tsconfig.json; then
            log_success "Next.js ESLint config included"
        else
            log_info "Next.js ESLint config not found in tsconfig.json"
        fi
    else
        log_warning "TypeScript configuration missing"
    fi
    
    # Check Tailwind CSS configuration
    if [ -f "tailwind.config.ts" ]; then
        log_success "Tailwind CSS TypeScript configuration exists"
    elif [ -f "tailwind.config.js" ]; then
        log_success "Tailwind CSS JavaScript configuration exists"
    else
        log_warning "Tailwind CSS configuration not found"
    fi
    
    # Check for app directory structure
    if [ -d "src/app" ]; then
        log_success "App Router directory structure detected"
        
        # Check for layout file
        if [ -f "src/app/layout.tsx" ] || [ -f "src/app/layout.js" ]; then
            log_success "Root layout file exists"
        else
            log_warning "Root layout file missing"
        fi
        
        # Check for page file
        if [ -f "src/app/page.tsx" ] || [ -f "src/app/page.js" ]; then
            log_success "Root page file exists"
        else
            log_warning "Root page file missing"
        fi
    else
        log_info "App Router directory not found (may be using pages directory)"
    fi
}

# Test build process
test_build_process() {
    log_section "BUILD PROCESS VALIDATION"
    
    if [ -f "package.json" ] && grep -q "\"build\":" package.json && [ -d "node_modules" ]; then
        log_info "Testing build process..."
        
        # Attempt to build (with timeout to prevent hanging)
        if timeout 60s npm run build > /tmp/build.log 2>&1; then
            log_success "Build process completed successfully"
            
            # Check if .next directory was created
            if [ -d ".next" ]; then
                log_success "Build output directory created"
            else
                log_warning "Build output directory not found"
            fi
        else
            log_error "Build process failed"
            log_info "Check build errors in /tmp/build.log"
            
            # Show last few lines of build log
            if [ -f "/tmp/build.log" ]; then
                echo ""
                log_info "Last few lines of build log:"
                tail -5 /tmp/build.log
            fi
        fi
    else
        log_info "Skipping build test - requirements not met"
    fi
}

# Validate specific project requirements
validate_project_specific() {
    log_section "PROJECT-SPECIFIC VALIDATION"
    
    # Check for My Private Tutor Online specific files
    local project_files=(
        "src/lib/cms-content.ts"
        "src/lib/cms-images.ts"
    )
    
    for file in "${project_files[@]}"; do
        if [ -f "$file" ]; then
            log_success "Project-specific file exists: $file"
        else
            log_info "Project-specific file not found: $file (may not be implemented yet)"
        fi
    done
    
    # Check for Context7 MCP compliance in CLAUDE.md
    if [ -f "CLAUDE.md" ]; then
        if grep -q "Context7 MCP" CLAUDE.md; then
            log_success "CLAUDE.md references Context7 MCP compliance"
        else
            log_warning "CLAUDE.md missing Context7 MCP references"
        fi
        
        if grep -q "British English" CLAUDE.md; then
            log_success "CLAUDE.md specifies British English requirement"
        else
            log_warning "CLAUDE.md missing British English specification"
        fi
    fi
    
    # Check for accessibility considerations
    local a11y_indicators=(
        "aria-"
        "sr-only"
        "focus:"
        "WCAG"
    )
    
    local a11y_found=false
    for indicator in "${a11y_indicators[@]}"; do
        if find src -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | xargs grep -l "$indicator" >/dev/null 2>&1; then
            log_success "Accessibility considerations found in code ($indicator)"
            a11y_found=true
            break
        fi
    done
    
    if [ "$a11y_found" = false ]; then
        log_info "No accessibility indicators found in source code (may not be implemented yet)"
    fi
}

# Performance and security checks
validate_performance_security() {
    log_section "PERFORMANCE & SECURITY VALIDATION"
    
    # Check for security-related configurations
    if [ -f ".env.local" ]; then
        # Check for default/weak secrets
        if grep -q "your-.*-secret" .env.local; then
            log_error "Default placeholder secrets found in .env.local (security risk)"
        else
            log_success "No default placeholder secrets in .env.local"
        fi
        
        # Check for hardcoded localhost in production-like vars
        if grep -E "PROD|LIVE" .env.local | grep -q "localhost"; then
            log_warning "Production variables contain localhost URLs"
        fi
    fi
    
    # Check for common security files
    if [ -f "vercel.json" ]; then
        if grep -q "headers" vercel.json; then
            log_success "Security headers configuration found in vercel.json"
        else
            log_info "No security headers in vercel.json"
        fi
    fi
    
    # Check for performance optimizations
    if [ -f "next.config.ts" ] || [ -f "next.config.js" ]; then
        local config_file="next.config.ts"
        [ ! -f "$config_file" ] && config_file="next.config.js"
        
        if grep -q "images" "$config_file"; then
            log_success "Image optimization configuration found"
        else
            log_info "Image optimization not configured"
        fi
    fi
}

# Generate validation report
generate_report() {
    echo ""
    echo "=============================================="
    log_section "VALIDATION SUMMARY"
    
    echo "📊 Validation Results:"
    echo "  • Total Errors: $ERRORS_COUNT"
    echo "  • Total Warnings: $WARNINGS_COUNT"
    
    if [ "$VALIDATION_PASSED" = true ]; then
        if [ $WARNINGS_COUNT -eq 0 ]; then
            log_success "Perfect setup! All validations passed with no warnings."
            echo ""
            echo "🚀 Your development environment is optimally configured!"
            echo "✨ Ready for premium development work!"
        else
            log_success "Setup validation passed with $WARNINGS_COUNT warnings."
            echo ""
            echo "🚀 Your development environment is ready!"
            echo "💡 Consider addressing the warnings above for optimal setup."
        fi
    else
        log_error "Setup validation failed with $ERRORS_COUNT errors."
        echo ""
        echo "🔧 Please resolve the errors above before proceeding."
        echo "📋 Run this validation again after making fixes."
        return 1
    fi
    
    echo ""
    echo "🎓 MY PRIVATE TUTOR ONLINE Development Environment"
    echo "📚 Next steps:"
    echo "  1. Address any warnings or errors above"
    echo "  2. Update .env.local with your specific configuration"
    echo "  3. Run 'npm run dev' to start development"
    echo "  4. Open http://localhost:3000 to view the application"
    echo ""
    echo "📖 Documentation:"
    echo "  • CLAUDE.md: Development standards"
    echo "  • DEVICE_SYNC_SETUP.md: Complete setup guide"
    echo "  • README.md: Project overview"
}

# Main validation process
main() {
    echo "🔍 MY PRIVATE TUTOR ONLINE - Setup Validation"
    echo "=============================================="
    
    validate_documentation
    validate_project_structure
    validate_environment_files
    validate_dependencies
    validate_git_configuration
    validate_nextjs_configuration
    validate_project_specific
    validate_performance_security
    test_build_process
    
    generate_report
}

# Execute main function with error handling
set -e
trap 'log_error "Validation failed on line $LINENO"' ERR

# Check if script is being run from project root
if [ ! -f "package.json" ] && [ ! -f "CLAUDE.md" ]; then
    log_error "Please run this script from the project root directory"
    log_info "Current directory: $(pwd)"
    log_info "Expected files: package.json, CLAUDE.md"
    exit 1
fi

main "$@"