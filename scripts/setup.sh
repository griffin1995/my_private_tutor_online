#!/bin/bash

# MY PRIVATE TUTOR ONLINE - Development Environment Setup
echo "🎓 Setting up My Private Tutor Online development environment..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Node.js check
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18+ first."
        log_info "Visit: https://nodejs.org/"
        exit 1
    else
        NODE_VERSION=$(node --version)
        log_success "Node.js found: $NODE_VERSION"
    fi
    
    # npm check
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm first."
        exit 1
    else
        NPM_VERSION=$(npm --version)
        log_success "npm found: v$NPM_VERSION"
    fi
    
    # Git check
    if ! command -v git &> /dev/null; then
        log_error "Git is not installed. Please install Git first."
        log_info "Visit: https://git-scm.com/"
        exit 1
    else
        GIT_VERSION=$(git --version)
        log_success "Git found: $GIT_VERSION"
    fi
    
    log_success "Prerequisites satisfied"
}

# Create project directory structure
create_directories() {
    log_info "Creating project directory structure..."
    
    # Core directories
    directories=(
        "public/videos"
        "public/images"
        "public/assets"
        "src/components/ui"
        "src/components/sections"
        "src/lib"
        "src/app"
        "src/types"
        "src/hooks"
        "src/utils"
        "docs"
        "scripts"
        "tests/__tests__"
        "tests/e2e"
    )
    
    for dir in "${directories[@]}"; do
        if mkdir -p "$dir"; then
            log_success "Created directory: $dir"
        else
            log_error "Failed to create directory: $dir"
        fi
    done
    
    log_success "Directory structure created"
}

# Setup environment files
setup_environment() {
    log_info "Setting up environment files..."
    
    # Check if .env.template exists
    if [ -f ".env.template" ]; then
        if [ ! -f ".env.local" ]; then
            cp .env.template .env.local
            log_success "Development environment configured from template"
        else
            log_warning ".env.local already exists - skipping"
        fi
    else
        log_warning ".env.template not found - creating basic .env.local"
        touch .env.local
        echo "NEXT_PUBLIC_API_URL=http://localhost:3000" >> .env.local
        echo "NEXT_PUBLIC_WEB_URL=http://localhost:3000" >> .env.local
        echo "NEXT_PUBLIC_ENVIRONMENT=development" >> .env.local
    fi
    
    # Setup production template
    if [ -f ".env.production.template" ] && [ ! -f ".env.production" ]; then
        cp .env.production.template .env.production
        log_success "Production environment template created"
    fi
    
    # Ensure .env files are gitignored
    if ! grep -q ".env" .gitignore 2>/dev/null; then
        echo "" >> .gitignore
        echo "# Environment files" >> .gitignore
        echo ".env*" >> .gitignore
        echo "!.env.template" >> .gitignore
        echo "!.env.production.template" >> .gitignore
        log_success "Environment files secured in .gitignore"
    else
        log_success "Environment files already in .gitignore"
    fi
}

# Install dependencies
install_dependencies() {
    log_info "Installing project dependencies..."
    
    if [ -f "package.json" ]; then
        # Check if node_modules exists
        if [ -d "node_modules" ]; then
            log_info "Dependencies already installed. Checking for updates..."
            npm update
        else
            log_info "Installing fresh dependencies..."
            npm install
        fi
        log_success "Dependencies installed successfully"
    else
        log_warning "package.json not found - please ensure you're in the correct project directory"
        return 1
    fi
}

# Setup git hooks (if applicable)
setup_git_hooks() {
    log_info "Setting up Git hooks..."
    
    if [ -d ".git" ]; then
        # Pre-commit hook for linting
        if [ -f "package.json" ] && grep -q "lint" package.json; then
            cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Run linting before commit
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix the issues before committing."
    exit 1
fi
EOF
            chmod +x .git/hooks/pre-commit
            log_success "Pre-commit hook configured"
        fi
        
        # Commit message template
        if [ ! -f ".gitmessage" ]; then
            cat > .gitmessage << 'EOF'
# Type: Brief description (50 chars max)
#
# Detailed explanation (72 chars per line)
#
# Types:
# feat: New feature
# fix: Bug fix
# docs: Documentation
# style: Formatting
# refactor: Code restructuring
# test: Adding tests
# chore: Maintenance
EOF
            git config commit.template .gitmessage
            log_success "Git commit template configured"
        fi
    else
        log_info "Git repository not found - skipping Git hooks setup"
    fi
}

# Validate setup
validate_setup() {
    log_info "Validating setup..."
    
    local validation_passed=true
    
    # Check Next.js configuration
    if [ -f "next.config.ts" ] || [ -f "next.config.js" ]; then
        log_success "Next.js configuration found"
    else
        log_warning "Next.js configuration not found"
        validation_passed=false
    fi
    
    # Check TypeScript configuration
    if [ -f "tsconfig.json" ]; then
        log_success "TypeScript configuration found"
    else
        log_warning "TypeScript configuration not found"
    fi
    
    # Check environment files
    if [ -f ".env.local" ]; then
        log_success "Development environment file exists"
        
        # Validate required variables
        local required_vars=("NEXT_PUBLIC_API_URL" "NEXT_PUBLIC_WEB_URL" "NEXT_PUBLIC_ENVIRONMENT")
        
        for var in "${required_vars[@]}"; do
            if grep -q "$var" .env.local; then
                log_success "$var configured"
            else
                log_warning "$var not found in .env.local"
            fi
        done
    else
        log_error "Development environment file missing"
        validation_passed=false
    fi
    
    # Check if git is initialized
    if [ -d ".git" ]; then
        log_success "Git repository initialized"
    else
        log_warning "Git repository not found - run 'git init' if needed"
    fi
    
    # Check essential dependencies
    if [ -f "package.json" ]; then
        if [ -d "node_modules" ]; then
            log_success "Dependencies installed"
        else
            log_error "Dependencies not installed"
            validation_passed=false
        fi
    fi
    
    return $([ "$validation_passed" = true ] && echo 0 || echo 1)
}

# Health check - try to start the development server briefly
health_check() {
    log_info "Performing health check..."
    
    if [ -f "package.json" ] && grep -q "\"dev\":" package.json; then
        log_info "Testing development server startup..."
        
        # Start dev server in background and check if it starts successfully
        timeout 10s npm run dev > /dev/null 2>&1 &
        DEV_PID=$!
        
        sleep 5
        
        if kill -0 $DEV_PID 2>/dev/null; then
            kill $DEV_PID 2>/dev/null
            log_success "Development server starts successfully"
        else
            log_warning "Development server may have issues starting"
        fi
    else
        log_info "Skipping health check - no dev script found"
    fi
}

# Display next steps
show_next_steps() {
    echo ""
    log_success "Setup completed successfully!"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Update .env.local with your specific configuration"
    echo "2. Review and customize the environment variables"
    echo "3. Run 'npm run dev' to start the development server"
    echo "4. Open http://localhost:3000 to view the application"
    echo ""
    echo "📚 Documentation:"
    echo "- CLAUDE.md: Development standards and rules"
    echo "- DEVICE_SYNC_SETUP.md: Complete setup guide"
    echo "- README.md: Project information"
    echo ""
    echo "🔧 Useful commands:"
    echo "- npm run dev: Start development server"
    echo "- npm run build: Build for production"
    echo "- npm run lint: Run code linting"
    echo "- npm run test: Run tests (if configured)"
    echo ""
    echo "✨ Happy coding!"
}

# Main setup process
main() {
    echo "🎓 MY PRIVATE TUTOR ONLINE - Development Setup"
    echo "=============================================="
    echo ""
    
    check_prerequisites
    echo ""
    
    create_directories
    echo ""
    
    setup_environment
    echo ""
    
    install_dependencies
    echo ""
    
    setup_git_hooks
    echo ""
    
    if validate_setup; then
        echo ""
        health_check
        echo ""
        show_next_steps
    else
        echo ""
        log_error "Setup validation failed!"
        log_info "Please review the warnings above and resolve any issues."
        exit 1
    fi
}

# Execute main function with error handling
set -e
trap 'log_error "Setup failed on line $LINENO"' ERR

# Check if script is being run from project root
if [ ! -f "package.json" ] && [ ! -f "CLAUDE.md" ]; then
    log_error "Please run this script from the project root directory"
    log_info "Current directory: $(pwd)"
    log_info "Expected files: package.json, CLAUDE.md"
    exit 1
fi

main "$@"