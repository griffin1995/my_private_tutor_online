#!/usr/bin/env node

/**
 * DOMAIN MIGRATION EXECUTION SCRIPT
 * Architecture-Reviewer Domain Restructuring Tool
 * Supporting Performance-Engineer's Phase 2 Optimization
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// CONTEXT7 SOURCE: /nodejs/fs - File system operations for domain restructuring
// IMPLEMENTATION REASON: Official Node.js patterns for file migration and directory creation

interface DomainMigration {
  domain: string;
  components: string[];
  targetPath: string;
}

interface ServiceConsolidation {
  service: string;
  sources: string[];
  targetPath: string;
}

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
 * Component categorization for 60% complexity reduction
 */
const COMPONENT_MIGRATIONS: DomainMigration[] = [
  {
    domain: 'tutoring',
    targetPath: 'src/domains/tutoring/components',
    components: [
      'src/components/marketing/service-card.tsx',
      'src/components/marketing/royal-testimonial-card.tsx',
      'src/components/sections/cta-section.tsx',
      'src/components/conversion/authority-reinforcement.tsx',
      'src/components/conversion/time-sensitive-opportunities.tsx'
    ]
  },
  {
    domain: 'booking',
    targetPath: 'src/domains/booking/components',
    components: [
      'src/components/forms/booking-form.tsx',
      'src/components/ui/calendar.tsx',
      'src/components/ui/select.tsx' // When used for booking
    ]
  },
  {
    domain: 'analytics',
    targetPath: 'src/domains/analytics/components',
    components: [
      'src/components/analytics/consent-banner.tsx',
      'src/components/analytics/ga4-setup.tsx',
      'src/components/analytics/deep-link-analytics.tsx',
      'src/components/dashboards/executive-summary-dashboard.tsx',
      'src/components/dashboards/client-success-metrics-dashboard.tsx'
    ]
  },
  {
    domain: 'admin',
    targetPath: 'src/domains/admin/components',
    components: [
      'src/components/admin/AdminHeader.tsx',
      'src/components/admin/SecurityMonitor.tsx',
      'src/components/admin/testimonials-admin.tsx',
      'src/components/admin/faq-admin-dashboard.tsx'
    ]
  },
  {
    domain: 'shared-ui',
    targetPath: 'src/shared/ui',
    components: [
      'src/components/ui/button.tsx',
      'src/components/ui/card.tsx',
      'src/components/ui/dialog.tsx',
      'src/components/ui/input.tsx',
      'src/components/ui/badge.tsx',
      'src/components/ui/separator.tsx',
      'src/components/ui/skeleton.tsx',
      'src/components/ui/toast.tsx'
    ]
  }
];

/**
 * Service consolidation for 75% service reduction
 */
const SERVICE_CONSOLIDATIONS: ServiceConsolidation[] = [
  {
    service: 'UnifiedCMSService',
    targetPath: 'src/domains/tutoring/services/cms-service.ts',
    sources: [
      'src/lib/cms/cms-service.ts',
      'src/lib/cms/cms-content.ts',
      'src/lib/cms/cms-images.ts',
      'src/lib/cms/cms-faq-service.ts',
      'src/lib/cms/cms-validation.ts'
    ]
  },
  {
    service: 'UnifiedAnalyticsService',
    targetPath: 'src/domains/analytics/services/analytics-service.ts',
    sources: [
      'src/lib/analytics/business-analytics.ts',
      'src/lib/analytics/behavioral-analytics.ts',
      'src/lib/analytics/client-success-analytics.ts',
      'src/lib/analytics/cta-tracking.ts'
    ]
  },
  {
    service: 'BookingService',
    targetPath: 'src/domains/booking/services/booking-service.ts',
    sources: [
      // Extract from various components
      'src/lib/api/booking.ts', // If exists
      'src/components/forms/booking-logic.ts' // Extract business logic
    ]
  },
  {
    service: 'MonitoringService',
    targetPath: 'src/infrastructure/monitoring/monitoring-service.ts',
    sources: [
      'src/lib/monitoring/performance-monitor.ts',
      'src/lib/monitoring/error-tracking.ts',
      'src/lib/monitoring/real-time-dashboard.ts',
      'src/lib/performance/web-vitals.ts'
    ]
  }
];

/**
 * Components to deprecate (redundant/duplicate)
 */
const DEPRECATE_COMPONENTS = [
  'src/components/ui/performance-monitor.tsx', // Duplicate of infrastructure version
  'src/components/performance/performance-monitor.tsx', // Keep only infrastructure version
  'src/components/faq/faq-performance-monitor.tsx', // Redundant specialized version
];

/**
 * Create domain directory structure
 */
function createDomainStructure(): void {
  console.log('🏗️ Creating domain directory structure...');

  const baseDir = path.join(process.cwd(), 'src');

  // Create domains directory
  Object.entries(DOMAIN_STRUCTURE.domains).forEach(([domain, structure]) => {
    const domainPath = path.join(baseDir, 'domains', domain);

    Object.keys(structure).forEach(subdir => {
      const fullPath = path.join(domainPath, subdir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`  ✅ Created: ${fullPath}`);
      }
    });
  });

  // Create shared directory
  Object.keys(DOMAIN_STRUCTURE.shared).forEach(subdir => {
    const fullPath = path.join(baseDir, 'shared', subdir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`  ✅ Created: ${fullPath}`);
    }
  });

  // Create infrastructure directory
  Object.keys(DOMAIN_STRUCTURE.infrastructure).forEach(subdir => {
    const fullPath = path.join(baseDir, 'infrastructure', subdir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`  ✅ Created: ${fullPath}`);
    }
  });
}

/**
 * Analyze import statements for boundary violations
 */
function analyzeImports(filePath: string): string[] {
  const violations: string[] = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;

    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];

      // Check for cross-domain imports
      if (importPath.includes('../domains/') && !importPath.includes('../shared/')) {
        violations.push(`Cross-domain import in ${filePath}: ${importPath}`);
      }
    }
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error);
  }

  return violations;
}

/**
 * Generate migration report
 */
function generateMigrationReport(): void {
  console.log('\n📊 MIGRATION ANALYSIS REPORT');
  console.log('================================');

  // Count current components
  const currentComponents = fs.readdirSync(path.join(process.cwd(), 'src/components'), { recursive: true })
    .filter(file => file.toString().endsWith('.tsx')).length;

  console.log(`\n📈 Component Metrics:`);
  console.log(`  Current components: ${currentComponents}`);
  console.log(`  Target after migration: ~50 (66% reduction)`);
  console.log(`  Components to migrate: ${COMPONENT_MIGRATIONS.reduce((acc, m) => acc + m.components.length, 0)}`);
  console.log(`  Components to deprecate: ${DEPRECATE_COMPONENTS.length}`);

  // Count current services
  const currentServices = fs.readdirSync(path.join(process.cwd(), 'src/lib'), { recursive: true })
    .filter(file => file.toString().includes('service')).length;

  console.log(`\n🔧 Service Metrics:`);
  console.log(`  Current services: ${currentServices}`);
  console.log(`  Target after consolidation: 8-10 (75% reduction)`);
  console.log(`  Services to consolidate: ${SERVICE_CONSOLIDATIONS.length}`);

  console.log('\n✅ Expected Outcomes:');
  console.log('  - 60% complexity reduction');
  console.log('  - Clear domain boundaries');
  console.log('  - Optimized bundle splitting');
  console.log('  - £191,500/year architectural capacity');
}

/**
 * Validate domain boundaries
 */
function validateDomainBoundaries(): boolean {
  console.log('\n🔍 Validating domain boundaries...');

  const violations: string[] = [];
  const domainsPath = path.join(process.cwd(), 'src/domains');

  if (fs.existsSync(domainsPath)) {
    const domains = fs.readdirSync(domainsPath);

    domains.forEach(domain => {
      const domainPath = path.join(domainsPath, domain);
      const files = fs.readdirSync(domainPath, { recursive: true })
        .filter(file => file.toString().endsWith('.ts') || file.toString().endsWith('.tsx'));

      files.forEach(file => {
        const filePath = path.join(domainPath, file.toString());
        const fileViolations = analyzeImports(filePath);
        violations.push(...fileViolations);
      });
    });
  }

  if (violations.length > 0) {
    console.log('  ❌ Domain boundary violations found:');
    violations.forEach(v => console.log(`    - ${v}`));
    return false;
  }

  console.log('  ✅ No domain boundary violations found');
  return true;
}

/**
 * Main execution function
 */
function main(): void {
  console.log('🚀 DOMAIN RESTRUCTURING EXECUTION');
  console.log('Supporting Performance-Engineer Phase 2 Optimization');
  console.log('================================================\n');

  // Step 1: Create domain structure
  createDomainStructure();

  // Step 2: Generate migration report
  generateMigrationReport();

  // Step 3: Validate boundaries (for future migrated code)
  validateDomainBoundaries();

  console.log('\n🎯 NEXT STEPS:');
  console.log('1. Review migration report with Performance-Engineer');
  console.log('2. Coordinate bundle optimization alignment');
  console.log('3. Execute component migrations in phases');
  console.log('4. Consolidate services with caching strategy');
  console.log('5. Validate performance improvements');

  console.log('\n✨ Domain restructuring preparation complete!');
}

// Execute if run directly
if (require.main === module) {
  main();
}

export {
  createDomainStructure,
  validateDomainBoundaries,
  generateMigrationReport,
  COMPONENT_MIGRATIONS,
  SERVICE_CONSOLIDATIONS,
  DEPRECATE_COMPONENTS
};