#!/usr/bin/env node

// CONTEXT7 SOURCE: /nodejs/node - Analysis summary generator for comprehensive codebase scan results
// IMPLEMENTATION PURPOSE: Generate strategic insights from scanResults.json for My Private Tutor Online
// FOCUS: Critical brand compliance, component usage patterns, and optimization opportunities

const fs = require('fs');
const path = require('path');

class CodebaseAnalysisSummary {
  constructor(resultsPath = './scanResults.json') {
    this.resultsPath = resultsPath;
    this.data = null;
  }

  async loadResults() {
    try {
      const content = await fs.promises.readFile(this.resultsPath, 'utf8');
      this.data = JSON.parse(content);
      console.log(`📊 Loaded scan results from ${this.resultsPath}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to load results: ${error.message}`);
      return false;
    }
  }

  // CONTEXT7 SOURCE: /nodejs/node - Component analysis and strategic insights
  analyzeComponents() {
    console.log('\n🎯 COMPONENT ANALYSIS SUMMARY');
    console.log('='.repeat(50));

    const { buttons, videos } = this.data.components;

    // Button type distribution
    const buttonTypes = {};
    buttons.forEach(btn => {
      buttonTypes[btn.type] = (buttonTypes[btn.type] || 0) + 1;
    });

    console.log(`\n📱 BUTTON COMPONENTS (${buttons.length} total):`);
    Object.entries(buttonTypes).forEach(([type, count]) => {
      const percentage = ((count / buttons.length) * 100).toFixed(1);
      console.log(`  • ${type}: ${count} (${percentage}%)`);
    });

    // Video component analysis
    const videosWithAspectRatio = videos.filter(v => v.hasAspectRatio).length;
    const videosWithoutAspectRatio = videos.length - videosWithAspectRatio;

    console.log(`\n🎥 VIDEO COMPONENTS (${videos.length} total):`);
    console.log(`  • With AspectRatio: ${videosWithAspectRatio}`);
    console.log(`  • Without AspectRatio: ${videosWithoutAspectRatio} ⚠️`);
    
    if (videosWithoutAspectRatio > 0) {
      console.log('\n⚠️  CRITICAL: Videos without AspectRatio may cause layout issues!');
    }

    // Button accessibility analysis
    const buttonsWithAriaLabels = buttons.filter(btn => btn.props.ariaLabel).length;
    const accessibilityScore = ((buttonsWithAriaLabels / buttons.length) * 100).toFixed(1);
    
    console.log(`\n♿ ACCESSIBILITY SCORE:`);
    console.log(`  • Buttons with aria-labels: ${buttonsWithAriaLabels}/${buttons.length} (${accessibilityScore}%)`);
  }

  // Brand compliance analysis
  analyzeBrandCompliance() {
    console.log('\n🎨 BRAND COMPLIANCE ANALYSIS');
    console.log('='.repeat(50));

    const { brandColors, nonBrandColors } = this.data.colors;
    const { headings } = this.data.typography;

    // Color compliance
    const totalColors = brandColors.length + nonBrandColors.length;
    const brandColorUsage = ((brandColors.length / totalColors) * 100).toFixed(1);
    
    console.log(`\n🎨 COLOR COMPLIANCE:`);
    console.log(`  • Brand colors used: ${brandColors.length}`);
    console.log(`  • Non-brand colors used: ${nonBrandColors.length}`);
    console.log(`  • Brand compliance score: ${brandColorUsage}%`);

    if (nonBrandColors.length > 100) {
      console.log(`\n⚠️  ATTENTION: ${nonBrandColors.length} non-brand colors detected - brand consistency at risk!`);
    }

    // Typography compliance
    const brandCompliantHeadings = headings.filter(h => h.brandCompliant).length;
    const typographyScore = headings.length > 0 ? ((brandCompliantHeadings / headings.length) * 100).toFixed(1) : '0';
    
    console.log(`\n📝 TYPOGRAPHY COMPLIANCE:`);
    console.log(`  • Total headings analyzed: ${headings.length}`);
    console.log(`  • Brand compliant headings: ${brandCompliantHeadings} (${typographyScore}%)`);
    
    if (typographyScore < 50) {
      console.log('\n🚨 CRITICAL: Typography brand compliance is critically low!');
      console.log('   Recommendation: Implement Playfair Display for headings');
    }
  }

  // Technical insights
  analyzeTechnicalInsights() {
    console.log('\n⚡ TECHNICAL INSIGHTS');
    console.log('='.repeat(50));

    const { imports, styling } = this.data;
    const { tailwindClasses, inlineStyles } = styling;

    // Import analysis
    const importTypes = {};
    imports.forEach(imp => {
      importTypes[imp.type] = (importTypes[imp.type] || 0) + 1;
    });

    console.log(`\n📦 IMPORT DISTRIBUTION (${imports.length} total):`);
    Object.entries(importTypes).forEach(([type, count]) => {
      const percentage = ((count / imports.length) * 100).toFixed(1);
      console.log(`  • ${type}: ${count} (${percentage}%)`);
    });

    // Tailwind usage analysis
    const topClasses = tailwindClasses.slice(0, 10);
    console.log(`\n💅 TOP TAILWIND CLASSES:`);
    topClasses.forEach((cls, index) => {
      console.log(`  ${index + 1}. ${cls.class}: ${cls.frequency} uses`);
    });

    // Inline styles warning
    if (inlineStyles.length > 50) {
      console.log(`\n⚠️  WARNING: ${inlineStyles.length} inline styles detected`);
      console.log('   Recommendation: Migrate to Tailwind classes for consistency');
    }

    // Performance insights
    const { scanDuration, filesPerSecond } = this.data.metadata;
    console.log(`\n⚡ SCAN PERFORMANCE:`);
    console.log(`  • Duration: ${scanDuration}s`);
    console.log(`  • Speed: ${filesPerSecond} files/sec`);
  }

  // Critical issues identification
  identifyCriticalIssues() {
    console.log('\n🚨 CRITICAL ISSUES & RECOMMENDATIONS');
    console.log('='.repeat(50));

    const issues = [];

    // Typography compliance
    const { headings } = this.data.typography;
    const brandCompliantHeadings = headings.filter(h => h.brandCompliant).length;
    const typographyScore = headings.length > 0 ? ((brandCompliantHeadings / headings.length) * 100) : 0;
    
    if (typographyScore < 10) {
      issues.push({
        severity: 'CRITICAL',
        category: 'Brand Compliance',
        issue: 'Typography brand compliance extremely low',
        impact: 'Brand inconsistency across entire site',
        solution: 'Implement Playfair Display font family for all headings',
        priority: 'HIGH'
      });
    }

    // Video AspectRatio compliance
    const { videos } = this.data.components;
    const videosWithoutAspectRatio = videos.filter(v => !v.hasAspectRatio).length;
    
    if (videosWithoutAspectRatio > 5) {
      issues.push({
        severity: 'HIGH',
        category: 'Layout Stability',
        issue: `${videosWithoutAspectRatio} videos without AspectRatio wrapper`,
        impact: 'Cumulative Layout Shift (CLS) performance issues',
        solution: 'Wrap all videos in AspectRatio with ratio={16/9}',
        priority: 'HIGH'
      });
    }

    // Color compliance
    const { brandColors, nonBrandColors } = this.data.colors;
    const colorComplianceScore = ((brandColors.length / (brandColors.length + nonBrandColors.length)) * 100);
    
    if (colorComplianceScore < 10) {
      issues.push({
        severity: 'HIGH',
        category: 'Brand Compliance',
        issue: `${nonBrandColors.length} non-brand colors in use`,
        impact: 'Brand dilution and visual inconsistency',
        solution: 'Replace with brand colors #3F4A7E and #CA9E5B',
        priority: 'MEDIUM'
      });
    }

    // Accessibility issues
    const { buttons } = this.data.components;
    const buttonsWithAriaLabels = buttons.filter(btn => btn.props.ariaLabel).length;
    const accessibilityScore = ((buttonsWithAriaLabels / buttons.length) * 100);
    
    if (accessibilityScore < 30) {
      issues.push({
        severity: 'MEDIUM',
        category: 'Accessibility',
        issue: `${buttons.length - buttonsWithAriaLabels} buttons missing aria-labels`,
        impact: 'Poor accessibility for screen readers',
        solution: 'Add descriptive aria-label to all interactive buttons',
        priority: 'MEDIUM'
      });
    }

    // Display issues
    if (issues.length === 0) {
      console.log('✅ No critical issues detected - excellent codebase quality!');
    } else {
      issues.forEach((issue, index) => {
        console.log(`\n${index + 1}. [${issue.severity}] ${issue.category}`);
        console.log(`   Issue: ${issue.issue}`);
        console.log(`   Impact: ${issue.impact}`);
        console.log(`   Solution: ${issue.solution}`);
        console.log(`   Priority: ${issue.priority}`);
      });
    }

    return issues;
  }

  // Generate actionable recommendations
  generateRecommendations() {
    console.log('\n📋 ACTIONABLE RECOMMENDATIONS');
    console.log('='.repeat(50));

    const recommendations = [
      {
        category: 'Brand Compliance',
        action: 'Implement consistent typography system',
        details: 'Set up Playfair Display for headings and Source Serif 4 for body text',
        impact: 'High - Brand consistency',
        effort: 'Medium'
      },
      {
        category: 'Performance',
        action: 'Add AspectRatio to all videos',
        details: 'Wrap video elements with AspectRatio component (ratio={16/9})',
        impact: 'High - CLS performance',
        effort: 'Low'
      },
      {
        category: 'Component Library',
        action: 'Standardize button components',
        details: 'Create unified Button component with consistent variants',
        impact: 'Medium - Code maintainability',
        effort: 'High'
      },
      {
        category: 'Accessibility',
        action: 'Audit and improve button accessibility',
        details: 'Add aria-labels to all interactive buttons and links',
        impact: 'High - User experience',
        effort: 'Medium'
      },
      {
        category: 'Code Quality',
        action: 'Reduce inline styles usage',
        details: 'Migrate inline styles to Tailwind utility classes',
        impact: 'Medium - Maintainability',
        effort: 'Low'
      }
    ];

    recommendations.forEach((rec, index) => {
      console.log(`\n${index + 1}. ${rec.category}: ${rec.action}`);
      console.log(`   Details: ${rec.details}`);
      console.log(`   Impact: ${rec.impact}`);
      console.log(`   Effort: ${rec.effort}`);
    });
  }

  // Generate complete summary report
  async generateSummary() {
    if (!await this.loadResults()) {
      return false;
    }

    console.log('🎯 MY PRIVATE TUTOR ONLINE - CODEBASE ANALYSIS SUMMARY');
    console.log('='.repeat(70));
    console.log(`📅 Analysis Date: ${new Date(this.data.metadata.scanDate).toLocaleDateString()}`);
    console.log(`📁 Files Analyzed: ${this.data.metadata.totalFiles}`);
    console.log(`⚡ Scan Duration: ${this.data.metadata.scanDuration}s`);

    this.analyzeComponents();
    this.analyzeBrandCompliance();
    this.analyzeTechnicalInsights();
    
    const criticalIssues = this.identifyCriticalIssues();
    
    this.generateRecommendations();

    console.log('\n🎯 SUMMARY SCORE');
    console.log('='.repeat(50));
    
    // Calculate overall scores
    const { brandColors, nonBrandColors } = this.data.colors;
    const { headings } = this.data.typography;
    const { buttons, videos } = this.data.components;

    const colorScore = ((brandColors.length / (brandColors.length + nonBrandColors.length)) * 100) || 0;
    const typographyScore = headings.length > 0 ? ((headings.filter(h => h.brandCompliant).length / headings.length) * 100) : 0;
    const videoScore = videos.length > 0 ? ((videos.filter(v => v.hasAspectRatio).length / videos.length) * 100) : 100;
    const accessibilityScore = ((buttons.filter(btn => btn.props.ariaLabel).length / buttons.length) * 100) || 0;

    const overallScore = ((colorScore + typographyScore + videoScore + accessibilityScore) / 4);

    console.log(`🎨 Brand Color Compliance: ${colorScore.toFixed(1)}%`);
    console.log(`📝 Typography Compliance: ${typographyScore.toFixed(1)}%`);
    console.log(`🎥 Video Optimization: ${videoScore.toFixed(1)}%`);
    console.log(`♿ Accessibility Score: ${accessibilityScore.toFixed(1)}%`);
    console.log(`\n🏆 OVERALL CODEBASE QUALITY: ${overallScore.toFixed(1)}%`);

    if (overallScore >= 80) {
      console.log('✅ Excellent - Royal client ready!');
    } else if (overallScore >= 60) {
      console.log('⚠️  Good - Some improvements needed');
    } else {
      console.log('🚨 Needs attention - Multiple issues to address');
    }

    console.log('\n' + '='.repeat(70));
    console.log('📊 Analysis complete! Use this data to prioritize improvements.');
    
    return true;
  }
}

// Main execution
async function main() {
  const analyzer = new CodebaseAnalysisSummary();
  await analyzer.generateSummary();
}

if (require.main === module) {
  main();
}

module.exports = CodebaseAnalysisSummary;