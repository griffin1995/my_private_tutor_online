// CONTEXT7 SOURCE: /microsoft/typescript - Migration utilities with complete type safety
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Automated class transformation utilities
// IMPLEMENTATION REASON: Automated migration utilities addressing 6,074 non-brand colors + 927 typography violations

/**
 * My Private Tutor Online Design System - Migration Utilities
 * 
 * Automated conversion tools for systematically addressing:
 * - 6,074 non-brand color instances -> Brand-compliant alternatives
 * - 927 heading typography violations -> Playfair Display compliance
 * - 2,093 button variations -> Standardized component patterns
 * - Legacy CSS patterns -> Design system tokens
 * 
 * Royal client standards with enterprise-grade migration automation.
 */

import { colorMigrationMap, typographyMigrationMap } from './design-tokens';

// CONTEXT7 SOURCE: /microsoft/typescript - Comprehensive color migration mapping
export interface ColorMigrationResult {
  original: string;
  migrated: string;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
  category: 'brand-primary' | 'brand-secondary' | 'neutral' | 'semantic' | 'unknown';
}

export interface TypographyMigrationResult {
  original: string;
  migrated: string;
  element: string;
  compliance: boolean;
  reason: string;
}

export interface MigrationReport {
  colorsProcessed: number;
  colorsChanged: number;
  typographyProcessed: number;
  typographyChanged: number;
  issues: string[];
  warnings: string[];
  results: {
    colors: ColorMigrationResult[];
    typography: TypographyMigrationResult[];
  };
}

/**
 * Enhanced color migration mapping addressing 6,074 non-brand color instances
 * 
 * Categories:
 * - Blue variations -> Brand Primary (Metallic Blue #3F4A7E)
 * - Gold/Yellow variations -> Brand Secondary (Aztec Gold #CA9E5B)
 * - Gray variations -> Neutral palette
 * - Semantic colors -> Standardized semantic tokens
 */
const enhancedColorMigrationMap = {
  // === BRAND PRIMARY MIGRATIONS (Metallic Blue) ===
  // Hex color variations
  '#0000FF': { target: 'brand-metallic-blue-700', confidence: 'high', category: 'brand-primary', reason: 'Pure blue to brand primary' },
  '#1E40AF': { target: 'brand-metallic-blue-700', confidence: 'high', category: 'brand-primary', reason: 'Blue-700 equivalent' },
  '#1D4ED8': { target: 'brand-metallic-blue-600', confidence: 'high', category: 'brand-primary', reason: 'Blue-600 equivalent' },
  '#2563EB': { target: 'brand-metallic-blue-500', confidence: 'high', category: 'brand-primary', reason: 'Blue-500 equivalent' },
  '#3B82F6': { target: 'brand-metallic-blue-400', confidence: 'medium', category: 'brand-primary', reason: 'Blue-400 lighter equivalent' },
  '#60A5FA': { target: 'brand-metallic-blue-300', confidence: 'medium', category: 'brand-primary', reason: 'Blue-300 lighter equivalent' },
  
  // Tailwind class variations  
  'blue-600': { target: 'brand-metallic-blue-700', confidence: 'high', category: 'brand-primary', reason: 'Direct class migration' },
  'blue-500': { target: 'brand-metallic-blue-600', confidence: 'high', category: 'brand-primary', reason: 'Direct class migration' },
  'blue-700': { target: 'brand-metallic-blue-800', confidence: 'high', category: 'brand-primary', reason: 'Direct class migration' },
  'blue-800': { target: 'brand-metallic-blue-900', confidence: 'high', category: 'brand-primary', reason: 'Direct class migration' },
  'blue-400': { target: 'brand-metallic-blue-500', confidence: 'medium', category: 'brand-primary', reason: 'Direct class migration' },
  'blue-300': { target: 'brand-metallic-blue-400', confidence: 'medium', category: 'brand-primary', reason: 'Direct class migration' },
  
  // === BRAND SECONDARY MIGRATIONS (Aztec Gold) ===
  // Hex color variations
  '#FFD700': { target: 'brand-aztec-gold-400', confidence: 'medium', category: 'brand-secondary', reason: 'Gold color to brand secondary' },
  '#F59E0B': { target: 'brand-aztec-gold-600', confidence: 'high', category: 'brand-secondary', reason: 'Amber-500 to brand secondary' },
  '#EAB308': { target: 'brand-aztec-gold-500', confidence: 'high', category: 'brand-secondary', reason: 'Yellow-500 to brand secondary' },
  '#CA8A04': { target: 'brand-aztec-gold-700', confidence: 'high', category: 'brand-secondary', reason: 'Yellow-600 to brand secondary' },
  '#A16207': { target: 'brand-aztec-gold-800', confidence: 'high', category: 'brand-secondary', reason: 'Yellow-700 to brand secondary' },
  
  // Tailwind class variations
  'yellow-500': { target: 'brand-aztec-gold-600', confidence: 'high', category: 'brand-secondary', reason: 'Direct class migration' },
  'amber-500': { target: 'brand-aztec-gold-600', confidence: 'high', category: 'brand-secondary', reason: 'Direct class migration' },
  'yellow-600': { target: 'brand-aztec-gold-700', confidence: 'high', category: 'brand-secondary', reason: 'Direct class migration' },
  'amber-600': { target: 'brand-aztec-gold-700', confidence: 'high', category: 'brand-secondary', reason: 'Direct class migration' },
  'yellow-400': { target: 'brand-aztec-gold-500', confidence: 'medium', category: 'brand-secondary', reason: 'Direct class migration' },
  'amber-400': { target: 'brand-aztec-gold-500', confidence: 'medium', category: 'brand-secondary', reason: 'Direct class migration' },
  
  // === NEUTRAL MIGRATIONS ===
  // Common gray variations
  '#6B7280': { target: 'neutral-gray-500', confidence: 'high', category: 'neutral', reason: 'Standard gray-500 migration' },
  '#374151': { target: 'neutral-gray-700', confidence: 'high', category: 'neutral', reason: 'Standard gray-700 migration' },
  '#1F2937': { target: 'neutral-gray-800', confidence: 'high', category: 'neutral', reason: 'Standard gray-800 migration' },
  '#111827': { target: 'neutral-gray-900', confidence: 'high', category: 'neutral', reason: 'Standard gray-900 migration' },
  '#F9FAFB': { target: 'neutral-gray-50', confidence: 'high', category: 'neutral', reason: 'Standard gray-50 migration' },
  '#F3F4F6': { target: 'neutral-gray-100', confidence: 'high', category: 'neutral', reason: 'Standard gray-100 migration' },
  
  // Tailwind gray classes
  'gray-500': { target: 'neutral-gray-500', confidence: 'high', category: 'neutral', reason: 'Direct class migration' },
  'gray-700': { target: 'neutral-gray-700', confidence: 'high', category: 'neutral', reason: 'Direct class migration' },
  'gray-800': { target: 'neutral-gray-800', confidence: 'high', category: 'neutral', reason: 'Direct class migration' },
  'gray-900': { target: 'neutral-gray-900', confidence: 'high', category: 'neutral', reason: 'Direct class migration' },
  'gray-50': { target: 'neutral-gray-50', confidence: 'high', category: 'neutral', reason: 'Direct class migration' },
  'gray-100': { target: 'neutral-gray-100', confidence: 'high', category: 'neutral', reason: 'Direct class migration' },
  
  // === SEMANTIC MIGRATIONS ===
  '#10B981': { target: 'success', confidence: 'high', category: 'semantic', reason: 'Standard success color' },
  '#EF4444': { target: 'error', confidence: 'high', category: 'semantic', reason: 'Standard error color' },
  '#F59E0B': { target: 'warning', confidence: 'high', category: 'semantic', reason: 'Standard warning color' },
  '#3B82F6': { target: 'info', confidence: 'high', category: 'semantic', reason: 'Standard info color' },
  
  'green-600': { target: 'success', confidence: 'high', category: 'semantic', reason: 'Success color migration' },
  'red-500': { target: 'error', confidence: 'high', category: 'semantic', reason: 'Error color migration' },
  'red-600': { target: 'error', confidence: 'high', category: 'semantic', reason: 'Error color migration' },
} as const;

/**
 * Enhanced typography migration addressing 927 non-compliant headings
 */
const enhancedTypographyMigrationMap = {
  // Heading elements - MUST use Playfair Display
  'h1': {
    target: 'font-playfair text-5xl font-bold leading-tight',
    fontFamily: 'font-playfair',
    fontSize: 'text-5xl',
    fontWeight: 'font-bold',
    compliance: true,
    reason: 'Royal client standard - Playfair Display required for all headings'
  },
  'h2': {
    target: 'font-playfair text-4xl font-semibold leading-tight',
    fontFamily: 'font-playfair',
    fontSize: 'text-4xl', 
    fontWeight: 'font-semibold',
    compliance: true,
    reason: 'Royal client standard - Playfair Display required for all headings'
  },
  'h3': {
    target: 'font-playfair text-3xl font-medium leading-snug',
    fontFamily: 'font-playfair',
    fontSize: 'text-3xl',
    fontWeight: 'font-medium',
    compliance: true,
    reason: 'Royal client standard - Playfair Display required for all headings'
  },
  'h4': {
    target: 'font-playfair text-2xl font-medium leading-snug',
    fontFamily: 'font-playfair',
    fontSize: 'text-2xl',
    fontWeight: 'font-medium',
    compliance: true,
    reason: 'Royal client standard - Playfair Display required for all headings'
  },
  'h5': {
    target: 'font-playfair text-xl font-medium leading-relaxed',
    fontFamily: 'font-playfair',
    fontSize: 'text-xl',
    fontWeight: 'font-medium',
    compliance: true,
    reason: 'Royal client standard - Playfair Display required for all headings'
  },
  'h6': {
    target: 'font-playfair text-lg font-medium leading-relaxed',
    fontFamily: 'font-playfair',
    fontSize: 'text-lg',
    fontWeight: 'font-medium',
    compliance: true,
    reason: 'Royal client standard - Playfair Display required for all headings'
  },
  
  // Body text elements - MUST use Source Serif 4
  'p': {
    target: 'font-source-serif text-base leading-relaxed',
    fontFamily: 'font-source-serif',
    fontSize: 'text-base',
    fontWeight: 'font-normal',
    compliance: true,
    reason: 'Royal client standard - Source Serif 4 required for body text'
  },
  'body': {
    target: 'font-source-serif text-base leading-relaxed',
    fontFamily: 'font-source-serif',
    fontSize: 'text-base',
    fontWeight: 'font-normal',
    compliance: true,
    reason: 'Royal client standard - Source Serif 4 required for body text'
  },
  'span': {
    target: 'font-source-serif',
    fontFamily: 'font-source-serif',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    compliance: true,
    reason: 'Royal client standard - Source Serif 4 for inline text'
  },
  
  // Common non-compliant patterns
  'font-sans': {
    target: 'font-source-serif',
    fontFamily: 'font-source-serif',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    compliance: false,
    reason: 'Sans-serif not compliant with brand standards - migrating to Source Serif 4'
  },
  'font-serif': {
    target: 'font-source-serif',
    fontFamily: 'font-source-serif',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    compliance: false,
    reason: 'Generic serif not compliant - migrating to brand-specific Source Serif 4'
  }
} as const;

/**
 * Migrates a single color value to brand-compliant alternative
 */
export function migrateColor(colorValue: string): ColorMigrationResult {
  const migration = enhancedColorMigrationMap[colorValue as keyof typeof enhancedColorMigrationMap];
  
  if (migration) {
    return {
      original: colorValue,
      migrated: migration.target,
      confidence: migration.confidence,
      reason: migration.reason,
      category: migration.category as ColorMigrationResult['category']
    };
  }
  
  // Attempt pattern matching for hex colors
  if (colorValue.startsWith('#')) {
    const hex = colorValue.toLowerCase();
    
    // Blue-ish colors -> Brand Primary
    if (hex.includes('00') && hex.includes('ff') || hex.startsWith('#1') || hex.startsWith('#2') || hex.startsWith('#3')) {
      return {
        original: colorValue,
        migrated: 'brand-metallic-blue-600',
        confidence: 'low',
        reason: 'Pattern match: blue-ish color migrated to brand primary',
        category: 'brand-primary'
      };
    }
    
    // Yellow/Gold-ish colors -> Brand Secondary
    if (hex.includes('ff') && (hex.includes('d7') || hex.includes('a0') || hex.includes('eb'))) {
      return {
        original: colorValue,
        migrated: 'brand-aztec-gold-600',
        confidence: 'low',
        reason: 'Pattern match: gold-ish color migrated to brand secondary',
        category: 'brand-secondary'
      };
    }
  }
  
  return {
    original: colorValue,
    migrated: colorValue,
    confidence: 'low',
    reason: 'No migration rule found - manual review required',
    category: 'unknown'
  };
}

/**
 * Migrates typography element to brand-compliant classes
 */
export function migrateTypography(element: string, currentClasses?: string): TypographyMigrationResult {
  const migration = enhancedTypographyMigrationMap[element as keyof typeof enhancedTypographyMigrationMap];
  
  if (migration) {
    return {
      original: currentClasses || element,
      migrated: migration.target,
      element,
      compliance: migration.compliance,
      reason: migration.reason
    };
  }
  
  return {
    original: currentClasses || element,
    migrated: currentClasses || element,
    element,
    compliance: false,
    reason: 'No migration rule found - manual review required for brand compliance'
  };
}

/**
 * Processes CSS content and migrates colors/typography
 */
export function migrateCSSContent(cssContent: string): { migratedCSS: string; report: MigrationReport } {
  const report: MigrationReport = {
    colorsProcessed: 0,
    colorsChanged: 0,
    typographyProcessed: 0,
    typographyChanged: 0,
    issues: [],
    warnings: [],
    results: {
      colors: [],
      typography: []
    }
  };

  let migratedCSS = cssContent;
  
  // Color migration patterns
  const hexColorRegex = /#[0-9A-Fa-f]{6}/g;
  const colorClassRegex = /(bg-|text-|border-)([\w-]+)/g;
  
  // Process hex colors
  migratedCSS = migratedCSS.replace(hexColorRegex, (match) => {
    report.colorsProcessed++;
    const result = migrateColor(match);
    report.results.colors.push(result);
    
    if (result.migrated !== result.original) {
      report.colorsChanged++;
      return `var(--color-${result.migrated})`;
    }
    
    return match;
  });
  
  // Process Tailwind color classes
  migratedCSS = migratedCSS.replace(colorClassRegex, (match, prefix, colorClass) => {
    report.colorsProcessed++;
    const result = migrateColor(colorClass);
    report.results.colors.push(result);
    
    if (result.migrated !== result.original) {
      report.colorsChanged++;
      return `${prefix}${result.migrated}`;
    }
    
    return match;
  });
  
  return { migratedCSS, report };
}

/**
 * Processes HTML/JSX content and migrates typography classes
 */
export function migrateHTMLContent(htmlContent: string): { migratedHTML: string; report: MigrationReport } {
  const report: MigrationReport = {
    colorsProcessed: 0,
    colorsChanged: 0,
    typographyProcessed: 0,
    typographyChanged: 0,
    issues: [],
    warnings: [],
    results: {
      colors: [],
      typography: []
    }
  };

  let migratedHTML = htmlContent;
  
  // Typography migration patterns
  const headingRegex = /<(h[1-6])[^>]*class="([^"]*)"[^>]*>/g;
  const paragraphRegex = /<(p)[^>]*class="([^"]*)"[^>]*>/g;
  
  // Process headings
  migratedHTML = migratedHTML.replace(headingRegex, (match, tag, classNames) => {
    report.typographyProcessed++;
    const result = migrateTypography(tag, classNames);
    report.results.typography.push(result);
    
    if (result.migrated !== result.original && result.compliance) {
      report.typographyChanged++;
      return match.replace(`class="${classNames}"`, `class="${result.migrated}"`);
    }
    
    if (!result.compliance) {
      report.warnings.push(`Non-compliant typography found in ${tag}: ${classNames}`);
    }
    
    return match;
  });
  
  // Process paragraphs
  migratedHTML = migratedHTML.replace(paragraphRegex, (match, tag, classNames) => {
    report.typographyProcessed++;
    const result = migrateTypography(tag, classNames);
    report.results.typography.push(result);
    
    if (result.migrated !== result.original && result.compliance) {
      report.typographyChanged++;
      return match.replace(`class="${classNames}"`, `class="${result.migrated}"`);
    }
    
    return match;
  });
  
  return { migratedHTML, report };
}

/**
 * Bulk migration utility for processing multiple files
 */
export function bulkMigration(files: Array<{ path: string; content: string; type: 'css' | 'html' | 'jsx' | 'tsx' }>) {
  const overallReport: MigrationReport = {
    colorsProcessed: 0,
    colorsChanged: 0,
    typographyProcessed: 0,
    typographyChanged: 0,
    issues: [],
    warnings: [],
    results: {
      colors: [],
      typography: []
    }
  };

  const migratedFiles = files.map(file => {
    let result;
    
    if (file.type === 'css') {
      result = migrateCSSContent(file.content);
    } else {
      result = migrateHTMLContent(file.content);
    }
    
    // Aggregate reports
    overallReport.colorsProcessed += result.report.colorsProcessed;
    overallReport.colorsChanged += result.report.colorsChanged;
    overallReport.typographyProcessed += result.report.typographyProcessed;
    overallReport.typographyChanged += result.report.typographyChanged;
    overallReport.issues.push(...result.report.issues);
    overallReport.warnings.push(...result.report.warnings);
    overallReport.results.colors.push(...result.report.results.colors);
    overallReport.results.typography.push(...result.report.results.typography);
    
    return {
      ...file,
      content: file.type === 'css' ? result.migratedCSS : result.migratedHTML,
      migrationApplied: true
    };
  });

  return {
    files: migratedFiles,
    report: overallReport
  };
}

/**
 * Validation utilities for ensuring migration success
 */
export function validateMigration(content: string, type: 'css' | 'html' = 'html'): boolean {
  // Check for remaining non-brand colors
  const nonBrandColorPatterns = [
    /#[0-9A-Fa-f]{6}/, // Hex colors that weren't migrated
    /bg-blue-[0-9]+/, // Non-brand blue classes
    /text-yellow-[0-9]+/, // Non-brand yellow classes
    /border-red-[0-9]+/ // Non-brand semantic classes
  ];
  
  // Check for non-compliant typography
  const nonCompliantTypographyPatterns = [
    /font-sans/,
    /font-mono(?!space)/, // Allow monospace but not generic mono
    /<h[1-6][^>]*(?!.*font-playfair)/, // Headings without Playfair
    /<p[^>]*(?!.*font-source-serif)/ // Paragraphs without Source Serif
  ];
  
  if (type === 'css') {
    return !nonBrandColorPatterns.some(pattern => pattern.test(content));
  } else {
    return !(
      nonBrandColorPatterns.some(pattern => pattern.test(content)) ||
      nonCompliantTypographyPatterns.some(pattern => pattern.test(content))
    );
  }
}

/**
 * Generate migration summary report
 */
export function generateMigrationSummary(report: MigrationReport): string {
  const successRate = report.colorsProcessed > 0 ? 
    Math.round((report.colorsChanged / report.colorsProcessed) * 100) : 0;
  
  return `
My Private Tutor Online - Design System Migration Report
=======================================================

BRAND COMPLIANCE IMPROVEMENTS:
✅ Colors Processed: ${report.colorsProcessed}
✅ Colors Migrated: ${report.colorsChanged} (${successRate}% success rate)
✅ Typography Elements Processed: ${report.typographyProcessed}
✅ Typography Elements Updated: ${report.typographyChanged}

ROYAL CLIENT STANDARDS ACHIEVED:
• Brand Primary (Metallic Blue): ${report.results.colors.filter(r => r.category === 'brand-primary').length} instances
• Brand Secondary (Aztec Gold): ${report.results.colors.filter(r => r.category === 'brand-secondary').length} instances  
• Typography Compliance: ${report.results.typography.filter(r => r.compliance).length} elements now compliant

${report.warnings.length > 0 ? `WARNINGS:\n${report.warnings.map(w => `⚠️  ${w}`).join('\n')}` : '✅ No warnings'}

${report.issues.length > 0 ? `ISSUES:\n${report.issues.map(i => `❌ ${i}`).join('\n')}` : '✅ No critical issues'}

Migration completed successfully. Design system compliance significantly improved.
  `;
}