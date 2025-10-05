const fs = require('fs');
const path = require('path');

async function generateAuditReport() {
  const reportsDir = 'reports/audits';
  const timestamp = new Date().toISOString();

  // Ensure reports directory exists
  if (!fs.existsSync(reportsDir)) {
    console.log('⚠️  No audit reports found. Run audit:full first.');
    return;
  }

  let cssAnalysis = {};
  let colors = [];

  // Read CSS analysis if exists
  const cssAnalysisPath = `${reportsDir}/css-analysis.json`;
  if (fs.existsSync(cssAnalysisPath)) {
    try {
      cssAnalysis = JSON.parse(fs.readFileSync(cssAnalysisPath, 'utf8'));
    } catch (e) {
      console.warn('Could not parse CSS analysis:', e.message);
    }
  }

  // Read colors if exists
  const colorsPath = `${reportsDir}/colors.json`;
  if (fs.existsSync(colorsPath)) {
    try {
      colors = JSON.parse(fs.readFileSync(colorsPath, 'utf8'));
    } catch (e) {
      console.warn('Could not parse colors:', e.message);
    }
  }

  // Extract values from Wallace analysis structure
  const uniqueColors = cssAnalysis?.stylesheet?.embeddedContent?.types?.totalUnique || 0;
  const fontFamilies = cssAnalysis?.atrules?.fontface?.totalUnique || 0;
  const selectors = cssAnalysis?.selectors?.totalUnique || 0;
  const rules = cssAnalysis?.rules?.total || 0;

  const report = `
# Design System Audit Report - My Private Tutor Online
Generated: ${timestamp}

## Executive Summary
- **Total CSS Rules**: ${rules}
- **Unique Selectors**: ${selectors}
- **Font Face Declarations**: ${fontFamilies}
- **Total Colors Extracted**: ${colors.length}
- **Embedded Content Types**: ${uniqueColors}

## Color Palette Analysis
- Total unique colors found: **${colors.length}**
- Target threshold: **25 unique colors**
- Status: ${colors.length > 25 ? '⚠️  **EXCEEDS THRESHOLD** - Recommend consolidation' : '✅ **WITHIN LIMITS**'}

### Color Distribution
${colors.slice(0, 10).map(c => `- ${c.color}`).join('\n')}
${colors.length > 10 ? `\n... and ${colors.length - 10} more colors` : ''}

## Typography Analysis
- **Font Face Declarations**: ${fontFamilies}
- **Target**: Maximum 3 font families
- Status: ${fontFamilies > 3 ? '⚠️  **TOO MANY FONTS**' : '✅ **WITHIN LIMITS**'}

## CSS Complexity Metrics
- **Total Rules**: ${rules}
- **Unique Selectors**: ${selectors}
- **Selector Reusability**: ${((selectors / rules) * 100).toFixed(1)}%

## Compliance Status
${colors.length > 25 ? '⚠️ Color palette requires consolidation\n' : '✅ Color palette within limits\n'}${fontFamilies > 3 ? '⚠️ Font family count exceeds best practices\n' : '✅ Font families within limits\n'}
## Recommendations
${colors.length > 25 ? '1. **Color Consolidation**: Reduce color palette to 25 or fewer unique colors\n' : ''}${fontFamilies > 3 ? '2. **Font Optimization**: Consider reducing to 3 or fewer font families\n' : ''}3. **Design Token Integration**: Use CSS variables from /build/css/variables.css
4. **Accessibility Audit**: Run accessibility tests on all core pages
5. **Visual Regression**: Set up baseline screenshots for design consistency

## Next Steps
1. Review /build/css/variables.css for design token implementation
2. Run accessibility audit: \`npm run audit:accessibility\`
3. Set up visual regression testing
4. Implement automated design consistency checks in CI/CD
  `;

  const reportPath = `${reportsDir}/audit-report-${Date.now()}.md`;
  fs.writeFileSync(reportPath, report);
  console.log('✅ Audit report generated:', reportPath);
  console.log('\nKey Metrics:');
  console.log(`  - Colors: ${colors.length} (target: ≤25)`);
  console.log(`  - Font Families: ${fontFamilies} (target: ≤3)`);
  console.log(`  - CSS Rules: ${rules}`);
  console.log(`  - Unique Selectors: ${selectors}`);
}

generateAuditReport().catch(console.error);
