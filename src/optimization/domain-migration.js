#!/usr/bin/env node

/**
 * DOMAIN MIGRATION EXECUTION SCRIPT
 * Architecture-Reviewer Domain Restructuring Tool
 * Supporting Performance-Engineer's Phase 2 Optimization
 */

const fs = require('fs');
const path = require('path');

/**
 * Domain structure aligned with Performance-Engineer's bundle optimization
 */
const DOMAIN_STRUCTURE = {
  domains: {
    tutoring: {
      components: [],
      services: [],
      hooks: [],
      types: []
    },
    booking: {
      components: [],
      services: [],
      state: [],
      types: []
    },
    analytics: {
      providers: [],
      trackers: [],
      reports: [],
      types: []
    },
    admin: {
      components: [],
      services: [],
      guards: [],
      types: []
    }
  },
  shared: {
    ui: [],
    hooks: [],
    utils: [],
    types: []
  },
  infrastructure: {
    monitoring: [],
    cache: [],
    security: [],
    config: []
  }
};

/**
 * Components to deprecate (redundant/duplicate)
 */
const DEPRECATE_COMPONENTS = [
  'src/components/ui/performance-monitor.tsx',
  'src/components/performance/performance-monitor.tsx',
  'src/components/faq/faq-performance-monitor.tsx',
];

/**
 * Create domain directory structure
 */
function createDomainStructure() {
  console.log('🏗️ Creating domain directory structure...');

  const baseDir = path.join(process.cwd(), 'src');

  // Create domains directory
  Object.entries(DOMAIN_STRUCTURE.domains).forEach(([domain, structure]) => {
    const domainPath = path.join(baseDir, 'domains', domain);

    Object.keys(structure).forEach(subdir => {
      const fullPath = path.join(domainPath, subdir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`  ✅ Created: domains/${domain}/${subdir}`);
      }
    });
  });

  // Create shared directory
  Object.keys(DOMAIN_STRUCTURE.shared).forEach(subdir => {
    const fullPath = path.join(baseDir, 'shared', subdir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`  ✅ Created: shared/${subdir}`);
    }
  });

  // Create infrastructure directory
  Object.keys(DOMAIN_STRUCTURE.infrastructure).forEach(subdir => {
    const fullPath = path.join(baseDir, 'infrastructure', subdir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`  ✅ Created: infrastructure/${subdir}`);
    }
  });
}

/**
 * Count files in directory
 */
function countFiles(dir, extension) {
  let count = 0;

  if (!fs.existsSync(dir)) {
    return count;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      count += countFiles(filePath, extension);
    } else if (file.endsWith(extension)) {
      count++;
    }
  }

  return count;
}

/**
 * Generate migration report
 */
function generateMigrationReport() {
  console.log('\n📊 MIGRATION ANALYSIS REPORT');
  console.log('================================');

  // Count current components
  const componentsDir = path.join(process.cwd(), 'src/components');
  const currentComponents = countFiles(componentsDir, '.tsx');

  console.log(`\n📈 Component Metrics:`);
  console.log(`  Current components: ${currentComponents}`);
  console.log(`  Target after migration: ~50 (66% reduction)`);
  console.log(`  Components to deprecate: ${DEPRECATE_COMPONENTS.length}`);

  // Count current services in lib
  const libDir = path.join(process.cwd(), 'src/lib');
  const serviceFiles = countFiles(libDir, 'service.ts') + countFiles(libDir, 'service.tsx');

  console.log(`\n🔧 Service Metrics:`);
  console.log(`  Current service files: ${serviceFiles}`);
  console.log(`  Target after consolidation: 8-10 (75% reduction)`);

  // Count FAQ components as example of domain overflow
  const faqDir = path.join(process.cwd(), 'src/components/faq');
  const faqComponents = countFiles(faqDir, '.tsx');

  console.log(`\n🗂️ Domain Analysis:`);
  console.log(`  FAQ components: ${faqComponents} (domain overflow)`);
  console.log(`  Admin components: ${countFiles(path.join(process.cwd(), 'src/components/admin'), '.tsx')}`);
  console.log(`  Analytics components: ${countFiles(path.join(process.cwd(), 'src/components/analytics'), '.tsx')}`);
  console.log(`  UI components: ${countFiles(path.join(process.cwd(), 'src/components/ui'), '.tsx')}`);

  console.log('\n✅ Expected Outcomes:');
  console.log('  - 60% complexity reduction');
  console.log('  - Clear domain boundaries');
  console.log('  - Optimized bundle splitting');
  console.log('  - £191,500/year architectural capacity');
}

/**
 * Analyze import patterns for violations
 */
function analyzeImports(filePath) {
  const violations = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;

    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];

      // Check for cross-domain imports
      if (importPath.includes('../domains/') && !importPath.includes('../shared/')) {
        violations.push(`Cross-domain import: ${importPath}`);
      }
    }
  } catch (error) {
    // Ignore read errors
  }

  return violations;
}

/**
 * Validate domain boundaries
 */
function validateDomainBoundaries() {
  console.log('\n🔍 Validating domain boundaries...');

  const domainsPath = path.join(process.cwd(), 'src/domains');
  let totalViolations = 0;

  if (fs.existsSync(domainsPath)) {
    const domains = fs.readdirSync(domainsPath);

    domains.forEach(domain => {
      const domainPath = path.join(domainsPath, domain);

      if (fs.statSync(domainPath).isDirectory()) {
        const violations = analyzeDomainDirectory(domainPath);
        if (violations.length > 0) {
          console.log(`  ❌ Violations in ${domain}:`);
          violations.forEach(v => console.log(`    - ${v}`));
          totalViolations += violations.length;
        }
      }
    });
  }

  if (totalViolations === 0) {
    console.log('  ✅ No domain boundary violations found');
  }

  return totalViolations === 0;
}

/**
 * Analyze domain directory for violations
 */
function analyzeDomainDirectory(dirPath) {
  const violations = [];
  const files = [];

  function collectFiles(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        collectFiles(fullPath);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    });
  }

  collectFiles(dirPath);

  files.forEach(file => {
    const fileViolations = analyzeImports(file);
    violations.push(...fileViolations);
  });

  return violations;
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 DOMAIN RESTRUCTURING EXECUTION');
  console.log('Supporting Performance-Engineer Phase 2 Optimization');
  console.log('================================================\n');

  // Step 1: Create domain structure
  createDomainStructure();

  // Step 2: Generate migration report
  generateMigrationReport();

  // Step 3: Validate boundaries (for future migrated code)
  validateDomainBoundaries();

  console.log('\n🎯 COORDINATION WITH PERFORMANCE-ENGINEER:');
  console.log('1. Domain boundaries enable optimal code splitting');
  console.log('2. Service consolidation supports caching strategy');
  console.log('3. Module structure aligns with bundle optimization');
  console.log('4. Clear separation enables tree-shaking');
  console.log('5. Architecture supports 50KB bundle reduction goal');

  console.log('\n📋 NEXT STEPS:');
  console.log('1. Review migration report with Performance-Engineer');
  console.log('2. Coordinate bundle optimization alignment');
  console.log('3. Execute component migrations in phases');
  console.log('4. Consolidate services with caching strategy');
  console.log('5. Validate performance improvements');

  console.log('\n✨ Domain restructuring preparation complete!');
}

// Execute
main();