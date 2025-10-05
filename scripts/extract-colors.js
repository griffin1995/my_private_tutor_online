const fs = require('fs');
const path = require('path');

// Simple color extraction from CSS
function extractColors(cssContent) {
  const colors = new Set();

  // Hex colors
  const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
  const hexColors = cssContent.match(hexPattern) || [];
  hexColors.forEach(color => colors.add(color.toLowerCase()));

  // RGB/RGBA colors
  const rgbPattern = /rgba?\([^)]+\)/g;
  const rgbColors = cssContent.match(rgbPattern) || [];
  rgbColors.forEach(color => colors.add(color));

  // HSL/HSLA colors
  const hslPattern = /hsla?\([^)]+\)/g;
  const hslColors = cssContent.match(hslPattern) || [];
  hslColors.forEach(color => colors.add(color));

  return Array.from(colors);
}

// Read CSS files
const cssDir = '.next/static/css';
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
let allColors = new Set();

files.forEach(file => {
  const cssContent = fs.readFileSync(path.join(cssDir, file), 'utf8');
  const colors = extractColors(cssContent);
  colors.forEach(color => allColors.add(color));
});

const colorsArray = Array.from(allColors).map(color => ({ color }));

// Save results
fs.writeFileSync(
  'reports/audits/colors.json',
  JSON.stringify(colorsArray, null, 2)
);

console.log(`✅ Extracted ${colorsArray.length} unique colors`);
