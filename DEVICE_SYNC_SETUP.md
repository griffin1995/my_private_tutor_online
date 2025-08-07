# 🔄 DEVICE SYNCHRONIZATION SETUP - MY PRIVATE TUTOR ONLINE

## 🎯 PURPOSE
Ensure consistent development environment setup across all devices with standardized configurations, environment variables, and project management protocols. This guide implements the complete device sync system from the aclue project, adapted for My Private Tutor Online.

---

## 📦 SETUP PACKAGE STRUCTURE

### 📋 Required Files for Device Sync
Create a setup package containing:

```
my-private-tutor-setup-files.zip/
├── web_env_local              # Frontend development environment
├── web_env_production         # Frontend production environment  
├── backend_env               # Backend development environment (if applicable)
├── backend_env_production    # Backend production environment (if applicable)
├── venv_setup.sh            # Development environment setup script
├── extraction_script.sh     # Automated extraction and setup process
├── validation_script.sh     # Comprehensive setup validation
└── SETUP_PACKAGE_README.txt  # Setup instructions and guidelines
```

### 🔧 Environment File Templates

#### Web Environment (Development) - `.env.local`
```bash
# NEXT.JS DEVELOPMENT CONFIGURATION
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development

# MAINTENANCE & FEATURE TOGGLES
NEXT_PUBLIC_MAINTENANCE_MODE=false
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_ANALYTICS_ENABLED=false

# VERCEL CONFIGURATION
VERCEL_ENV=development
VERCEL_URL=localhost:3000

# AUTHENTICATION (Development)
NEXTAUTH_SECRET=your-development-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# THIRD-PARTY SERVICES (Development Keys)
# Add your development API keys here
```

#### Web Environment (Production) - `.env.production`
```bash
# NEXT.JS PRODUCTION CONFIGURATION
NEXT_PUBLIC_API_URL=https://your-production-domain.com
NEXT_PUBLIC_WEB_URL=https://your-production-domain.com
NEXT_PUBLIC_ENVIRONMENT=production

# MAINTENANCE & FEATURE TOGGLES
NEXT_PUBLIC_MAINTENANCE_MODE=false
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_ANALYTICS_ENABLED=true

# VERCEL CONFIGURATION
VERCEL_ENV=production

# AUTHENTICATION (Production)
NEXTAUTH_SECRET=your-production-secret-key-here
NEXTAUTH_URL=https://your-production-domain.com

# THIRD-PARTY SERVICES (Production Keys)
# Add your production API keys here

# SECURITY HEADERS
NEXT_PUBLIC_CSP_ENABLED=true
NEXT_PUBLIC_SECURITY_HEADERS=true
```

---

## 🚀 SETUP SCRIPTS

### 📋 Development Environment Setup - `venv_setup.sh`
```bash
#!/bin/bash

# MY PRIVATE TUTOR ONLINE - Development Environment Setup
echo "🎓 Setting up My Private Tutor Online development environment..."

# Check prerequisites
check_prerequisites() {
    echo "📋 Checking prerequisites..."
    
    # Node.js check
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # npm check
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Git check
    if ! command -v git &> /dev/null; then
        echo "❌ Git is not installed. Please install Git first."
        exit 1
    fi
    
    echo "✅ Prerequisites satisfied"
}

# Create project directory structure
create_directories() {
    echo "📁 Creating project directory structure..."
    
    # Core directories
    mkdir -p public/videos
    mkdir -p public/images
    mkdir -p src/components
    mkdir -p src/lib
    mkdir -p src/app
    mkdir -p docs
    mkdir -p scripts
    
    echo "✅ Directory structure created"
}

# Copy environment files
setup_environment() {
    echo "🔧 Setting up environment files..."
    
    if [ -f "web_env_local" ]; then
        cp web_env_local .env.local
        echo "✅ Development environment configured"
    else
        echo "⚠️  web_env_local not found - creating template"
        touch .env.local
    fi
    
    if [ -f "web_env_production" ]; then
        cp web_env_production .env.production
        echo "✅ Production environment template created"
    else
        echo "⚠️  web_env_production not found - creating template"
        touch .env.production
    fi
    
    # Ensure .env files are gitignored
    echo ".env*" >> .gitignore
    echo "✅ Environment files secured in .gitignore"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing project dependencies..."
    
    if [ -f "package.json" ]; then
        npm install
        echo "✅ Dependencies installed successfully"
    else
        echo "⚠️  package.json not found - please ensure you're in the correct project directory"
    fi
}

# Validate setup
validate_setup() {
    echo "🔍 Validating setup..."
    
    # Check if Next.js is properly configured
    if [ -f "next.config.ts" ] || [ -f "next.config.js" ]; then
        echo "✅ Next.js configuration found"
    else
        echo "⚠️  Next.js configuration not found"
    fi
    
    # Check if environment files exist
    if [ -f ".env.local" ]; then
        echo "✅ Development environment file exists"
    else
        echo "❌ Development environment file missing"
    fi
    
    # Check if git is initialized
    if [ -d ".git" ]; then
        echo "✅ Git repository initialized"
    else
        echo "⚠️  Git repository not found - run 'git init' if needed"
    fi
}

# Main setup process
main() {
    echo "🎓 MY PRIVATE TUTOR ONLINE - Development Setup"
    echo "=============================================="
    
    check_prerequisites
    create_directories
    setup_environment
    install_dependencies
    validate_setup
    
    echo ""
    echo "✅ Setup completed successfully!"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Update .env.local with your development configuration"
    echo "2. Run 'npm run dev' to start the development server"
    echo "3. Open http://localhost:3000 to view the application"
    echo ""
    echo "📚 For detailed documentation, see CLAUDE.md"
}

# Execute main function
main "$@"
```

### 🔄 Automated Extraction Script - `extraction_script.sh`
```bash
#!/bin/bash

# MY PRIVATE TUTOR ONLINE - Automated Setup Extraction
echo "📦 Extracting My Private Tutor Online setup package..."

# Define package name
PACKAGE_NAME="my-private-tutor-setup-files.zip"
TEMP_DIR="setup_temp"

# Check if setup package exists
if [ ! -f "$PACKAGE_NAME" ]; then
    echo "❌ Setup package '$PACKAGE_NAME' not found!"
    echo "Please ensure the setup package is in the current directory."
    exit 1
fi

# Extract setup package
extract_package() {
    echo "📂 Extracting setup package..."
    
    # Create temporary directory
    mkdir -p "$TEMP_DIR"
    
    # Extract package
    if command -v unzip &> /dev/null; then
        unzip -q "$PACKAGE_NAME" -d "$TEMP_DIR"
        echo "✅ Package extracted successfully"
    else
        echo "❌ unzip command not found. Please install unzip utility."
        exit 1
    fi
}

# Copy configuration files
copy_configuration() {
    echo "🔧 Copying configuration files..."
    
    # Copy environment files
    if [ -f "$TEMP_DIR/web_env_local" ]; then
        cp "$TEMP_DIR/web_env_local" .env.local
        echo "✅ Development environment configured"
    fi
    
    if [ -f "$TEMP_DIR/web_env_production" ]; then
        cp "$TEMP_DIR/web_env_production" .env.production
        echo "✅ Production environment configured"
    fi
    
    # Copy setup scripts
    if [ -f "$TEMP_DIR/venv_setup.sh" ]; then
        cp "$TEMP_DIR/venv_setup.sh" ./venv_setup.sh
        chmod +x ./venv_setup.sh
        echo "✅ Setup script configured"
    fi
    
    # Copy validation script
    if [ -f "$TEMP_DIR/validation_script.sh" ]; then
        cp "$TEMP_DIR/validation_script.sh" ./validation_script.sh
        chmod +x ./validation_script.sh
        echo "✅ Validation script configured"
    fi
}

# Run setup process
run_setup() {
    echo "🚀 Running development environment setup..."
    
    if [ -f "./venv_setup.sh" ]; then
        ./venv_setup.sh
        echo "✅ Development environment setup completed"
    else
        echo "⚠️  Setup script not found - manual setup required"
    fi
}

# Cleanup temporary files
cleanup() {
    echo "🧹 Cleaning up temporary files..."
    rm -rf "$TEMP_DIR"
    echo "✅ Cleanup completed"
}

# Main extraction process
main() {
    echo "📦 MY PRIVATE TUTOR ONLINE - Automated Setup"
    echo "============================================="
    
    extract_package
    copy_configuration
    run_setup
    cleanup
    
    echo ""
    echo "✅ Extraction and setup completed successfully!"
    echo ""
    echo "🚀 Your development environment is ready!"
    echo "Run 'npm run dev' to start the development server."
}

# Execute main function
main "$@"
```

### ✅ Comprehensive Validation Script - `validation_script.sh`
```bash
#!/bin/bash

# MY PRIVATE TUTOR ONLINE - Setup Validation
echo "🔍 Validating My Private Tutor Online setup..."

VALIDATION_PASSED=true

# Validation categories
validate_documentation() {
    echo "📚 Validating documentation files..."
    
    local files=("CLAUDE.md" "README.md" "DEVICE_SYNC_SETUP.md")
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            echo "  ✅ $file exists"
        else
            echo "  ❌ $file missing"
            VALIDATION_PASSED=false
        fi
    done
}

validate_project_structure() {
    echo "📁 Validating project structure..."
    
    local directories=("src" "public" "src/components" "src/lib" "src/app")
    
    for dir in "${directories[@]}"; do
        if [ -d "$dir" ]; then
            echo "  ✅ $dir directory exists"
        else
            echo "  ❌ $dir directory missing"
            VALIDATION_PASSED=false
        fi
    done
}

validate_environment_files() {
    echo "🔧 Validating environment files..."
    
    if [ -f ".env.local" ]; then
        echo "  ✅ Development environment file exists"
        
        # Check for required environment variables
        local required_vars=("NEXT_PUBLIC_API_URL" "NEXT_PUBLIC_WEB_URL" "NEXT_PUBLIC_ENVIRONMENT")
        
        for var in "${required_vars[@]}"; do
            if grep -q "$var" .env.local; then
                echo "    ✅ $var configured"
            else
                echo "    ⚠️  $var not found in .env.local"
            fi
        done
    else
        echo "  ❌ .env.local missing"
        VALIDATION_PASSED=false
    fi
    
    if [ -f ".env.production" ]; then
        echo "  ✅ Production environment file exists"
    else
        echo "  ⚠️  .env.production missing"
    fi
}

validate_dependencies() {
    echo "📦 Validating dependencies..."
    
    if [ -f "package.json" ]; then
        echo "  ✅ package.json exists"
        
        # Check if node_modules exists
        if [ -d "node_modules" ]; then
            echo "  ✅ Dependencies installed"
        else
            echo "  ⚠️  Dependencies not installed - run 'npm install'"
        fi
    else
        echo "  ❌ package.json missing"
        VALIDATION_PASSED=false
    fi
}

validate_git_configuration() {
    echo "🔧 Validating Git configuration..."
    
    if [ -d ".git" ]; then
        echo "  ✅ Git repository initialized"
        
        # Check .gitignore
        if [ -f ".gitignore" ]; then
            echo "  ✅ .gitignore exists"
            
            if grep -q ".env" .gitignore; then
                echo "    ✅ Environment files ignored"
            else
                echo "    ⚠️  Environment files not in .gitignore"
            fi
        else
            echo "  ⚠️  .gitignore missing"
        fi
    else
        echo "  ⚠️  Git repository not initialized"
    fi
}

validate_next_js_configuration() {
    echo "⚡ Validating Next.js configuration..."
    
    if [ -f "next.config.ts" ] || [ -f "next.config.js" ]; then
        echo "  ✅ Next.js configuration exists"
    else
        echo "  ⚠️  Next.js configuration not found"
    fi
    
    if [ -f "tsconfig.json" ]; then
        echo "  ✅ TypeScript configuration exists"
    else
        echo "  ⚠️  TypeScript configuration not found"
    fi
    
    if [ -f "tailwind.config.ts" ] || [ -f "tailwind.config.js" ]; then
        echo "  ✅ Tailwind CSS configuration exists"
    else
        echo "  ⚠️  Tailwind CSS configuration not found"
    fi
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
    validate_next_js_configuration
    
    echo ""
    echo "=============================================="
    
    if [ "$VALIDATION_PASSED" = true ]; then
        echo "✅ All validations passed successfully!"
        echo "🚀 Your development environment is properly configured."
    else
        echo "❌ Some validations failed."
        echo "📋 Please review the issues above and resolve them."
        exit 1
    fi
    
    echo ""
    echo "🎓 Ready to start development!"
    echo "Run 'npm run dev' to start the development server."
}

# Execute main function
main "$@"
```

---

## 🔄 GIT WORKFLOW STANDARDS

### 📋 Branch Strategy
```bash
main        → Production deployments (protected)
develop     → Integration branch for features
feature/*   → Feature development branches
hotfix/*    → Emergency production fixes
release/*   → Release preparation branches
```

### 📝 Commit Message Standards
```bash
# Format: type(scope): description
feat(components): add premium booking form component
fix(auth): resolve JWT token refresh issue
docs(setup): update device synchronization guide
refactor(cms): improve content management structure
test(api): add comprehensive endpoint testing
style(ui): update button hover states
perf(images): optimize image loading performance
build(deps): update Next.js to version 15
ci(deploy): configure automated deployment pipeline
```

### 🔧 Git Configuration
```bash
# Set up consistent commit formatting
git config --global commit.template ~/.gitmessage
git config --global core.editor "code --wait"
git config --global push.default current
git config --global pull.rebase true

# Configure line ending handling
git config --global core.autocrlf input    # macOS/Linux
git config --global core.autocrlf true     # Windows
```

---

## 🚀 DEPLOYMENT CONFIGURATION

### ⚡ Vercel Configuration - `vercel.json`
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["lhr1"],
  "functions": {
    "src/app/**/*.tsx": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/dashboard",
      "permanent": false
    }
  ]
}
```

---

## 🔒 SECURITY STANDARDS

### 🛡️ Environment Security Checklist
- [ ] Environment variables in `.env` files (gitignored)
- [ ] Separate development and production configurations
- [ ] JWT secrets different between environments
- [ ] API keys restricted to specific domains
- [ ] HTTPS enforced in production
- [ ] Security headers configured
- [ ] CORS properly configured for production domains
- [ ] Database connections use SSL in production

### 🔐 Sensitive Data Management
```bash
# NEVER commit these files:
.env
.env.local
.env.production
.env.development

# Always in .gitignore:
.env*
*.log
node_modules/
.DS_Store
dist/
build/
```

---

## 📊 TESTING & VALIDATION

### 🧪 Testing Strategy
```bash
# Unit Tests
npm run test

# Integration Tests  
npm run test:integration

# E2E Tests
npm run test:e2e

# Build Test
npm run build

# Type Check
npm run type-check

# Lint Check
npm run lint

# Performance Audit
npm run audit
```

### ✅ Deployment Checklist
```markdown
## Pre-Deployment Validation
- [ ] All tests passing (`npm run test`)
- [ ] Build successful (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Environment variables configured
- [ ] Security headers tested
- [ ] Performance metrics acceptable
- [ ] Content and images optimized
- [ ] Database migrations applied (if applicable)
- [ ] Backup created (if applicable)

## Post-Deployment Verification
- [ ] Application loads successfully
- [ ] All pages render correctly
- [ ] Forms and interactions working
- [ ] Analytics tracking active
- [ ] Error monitoring active
- [ ] Performance within acceptable limits
- [ ] Mobile responsiveness verified
```

---

## 🎯 PROJECT-SPECIFIC IMPLEMENTATION

### 🎓 My Private Tutor Online Specifics
- **Royal Client Standards**: Enterprise-grade implementations only
- **British English**: All content and documentation
- **Premium Service**: No shortcuts or basic implementations
- **Accessibility**: WCAG 2.1 AA compliance mandatory
- **Performance**: Core Web Vitals optimization required
- **Context7 MCP**: All code changes must follow Context7 documentation patterns

### 📋 Quality Gates
Every deployment must pass:
1. **Context7 Compliance**: All code follows official documentation patterns
2. **British English**: Consistent spelling and terminology
3. **Performance**: LCP <2.5s, FID <100ms, CLS <0.1
4. **Accessibility**: axe-core validation passing
5. **Security**: All security headers and configurations verified
6. **Content**: CMS-driven content with no hardcoded strings

---

## 🔧 TROUBLESHOOTING

### 🐛 Common Issues

#### Environment Variables Not Loading
```bash
# Check file exists and is properly named
ls -la .env*

# Verify Next.js can read the file
npm run dev -- --debug

# Check environment variable format
cat .env.local | grep NEXT_PUBLIC
```

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

#### Deployment Issues
```bash
# Verify Vercel configuration
vercel --debug

# Check build output
npm run build

# Verify environment variables in Vercel dashboard
vercel env ls
```

### 📞 Support Resources
- **Documentation**: CLAUDE.md for project standards
- **Setup Issues**: Run validation_script.sh for diagnostics
- **Deployment**: Check DEPLOYMENT.md for deployment procedures
- **Context7**: Use Context7 MCP for all code documentation

---

## 📚 ADDITIONAL DOCUMENTATION

This device sync setup integrates with:
- **CLAUDE.md**: Project rules and development standards
- **DOCUMENTATION_INDEX.md**: Complete project documentation reference
- **CUSTOM_DOCS.md**: Proven implementation patterns
- **DEPLOYMENT.md**: Production deployment procedures

For complete project setup, ensure all documentation files are present and follow the validation checklist above.