const fs = require("fs");
const path = require("path");

// Allowed brand colours
const allowedColours = ["#ffffff", "#ca9e5b", "#3f4a7e"];

// --- Colour utilities ---
function parseRGB(rgbString) {
  if (!rgbString) return null;
  const match = rgbString.match(/\d+/g);
  if (!match) return null;
  return match.slice(0, 3).map(Number);
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toLowerCase()
  );
}

function relativeLuminance([r, g, b]) {
  const srgb = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(fgRGB, bgRGB) {
  const L1 = relativeLuminance(fgRGB);
  const L2 = relativeLuminance(bgRGB);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

// --- Check each element ---
function checkElement(el) {
  const issues = [];

  // Guard against missing computedStyles
  if (!el.computedStyles) return issues;

  const fg = parseRGB(el.computedStyles.color);
  const bg = parseRGB(el.computedStyles.backgroundColor);
  const fgHex = fg ? rgbToHex(...fg) : null;
  const bgHex = bg ? rgbToHex(...bg) : null;

  // --- Non-brand colour ---
  if (fgHex && !allowedColours.includes(fgHex)) {
    issues.push({
      type: "non-brand-colour",
      text: el.text || "",
      color: fgHex,
      selector: el.selector || "",
      inlineStyles: el.inlineStyles || null,
      matchedCSSRules: el.matchedCSSRules || [],
    });
  }

  // --- Low contrast ---
  if (fg && bg) {
    const ratio = contrastRatio(fg, bg);
    const size = parseFloat(el.computedStyles.fontSize) || 0;
    const weight = parseInt(el.computedStyles.fontWeight) || 400;
    const isLarge = size >= 24 || (size >= 19 && weight >= 700);
    const minRatio = isLarge ? 3 : 4.5;

    if (ratio < minRatio) {
      issues.push({
        type: "low-contrast",
        text: el.text || "",
        ratio: ratio.toFixed(2),
        fg: fgHex,
        bg: bgHex,
        selector: el.selector || "",
        inlineStyles: el.inlineStyles || null,
        matchedCSSRules: el.matchedCSSRules || [],
      });
    }
  }

  // --- Small font size ---
  const fontSize = parseFloat(el.computedStyles.fontSize) || 0;
  if (fontSize > 0 && fontSize < 14) {
    issues.push({
      type: "small-text",
      text: el.text || "",
      size: el.computedStyles.fontSize || "",
      selector: el.selector || "",
      inlineStyles: el.inlineStyles || null,
      matchedCSSRules: el.matchedCSSRules || [],
    });
  }

  // --- Empty text styled ---
  if (!el.text || !el.text.trim()) {
    issues.push({
      type: "empty-text",
      selector: el.selector || "",
      inlineStyles: el.inlineStyles || null,
      matchedCSSRules: el.matchedCSSRules || [],
    });
  }

  return issues;
}

// --- Directories ---
const scansDir = path.join(__dirname, "scans");
const refinedDir = path.join(scansDir, "refined_scans");
if (!fs.existsSync(refinedDir)) fs.mkdirSync(refinedDir);

// --- Process all scan JSON files ---
fs.readdirSync(scansDir).forEach((file) => {
  if (!file.endsWith(".json") || file.startsWith("refined-")) return;

  const filePath = path.join(scansDir, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    console.error(`❌ Failed to parse ${file}: ${e.message}`);
    return;
  }

  const allIssues = [];
  data.forEach((el) => allIssues.push(...checkElement(el)));

  // --- Categorise issues ---
  const categories = {};
  allIssues.forEach((issue) => {
    if (!categories[issue.type]) categories[issue.type] = [];
    categories[issue.type].push(issue);
  });

  // Sort each category by selector
  for (const type in categories) {
    categories[type] = categories[type].sort((a, b) =>
      (a.selector || "").localeCompare(b.selector || "")
    );
  }

  // --- Console output ---
  if (allIssues.length) {
    console.log(`\n❌ Issues in ${file}:`);
    Object.keys(categories)
      .sort()
      .forEach((type) => {
        console.log(`\n--- ${type.toUpperCase()} ---`);
        const tableData = categories[type].map((i) => ({
          text: i.text
            ? i.text.slice(0, 50) + (i.text.length > 50 ? "…" : "")
            : "",
          selector: i.selector.split(">").slice(0, 5).join(" > "),
          color: i.color || "",
          bg: i.bg || "",
          ratio: i.ratio || "",
          size: i.size || "",
        }));
        console.table(tableData);
      });
  } else {
    console.log(`✅ ${file} passed all checks`);
  }

  // --- Save refined JSON ---
  const refinedFile = path.join(refinedDir, `refined-font-report-${file}`);
  fs.writeFileSync(refinedFile, JSON.stringify(categories, null, 2));
  console.log(`💾 Refined report saved → ${refinedFile}`);
});
