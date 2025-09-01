#!/usr/bin/env node

// CONTEXT7 SOURCE: /babel/babel - AST parser for TypeScript and JSX syntax analysis
// CONTEXT7 SOURCE: /nodejs/node - Filesystem operations for recursive directory scanning
// IMPLEMENTATION PURPOSE: Comprehensive codebase scanner for My Private Tutor Online project
// ANALYSIS AREAS: Components, typography, colors, imports, styling patterns with surgical precision

const fs = require('fs');
const path = require('path');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const { performance } = require('perf_hooks');

// Try to import @babel/parser, fallback to regex analysis if not available
let parser;
try {
  parser = require('@babel/parser');
} catch (err) {
  console.warn('⚠️  @babel/parser not found, using regex-based analysis');
  parser = null;
}

// CONTEXT7 SOURCE: /babel/babel - Parser configuration for TypeScript and JSX
const BABEL_PARSER_CONFIG = {
  sourceType: 'unambiguous',
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  plugins: [
    'jsx',
    'typescript',
    'decorators-legacy',
    'classProperties',
    'objectRestSpread',
    'asyncGenerators',
    'functionBind',
    'exportDefaultFrom',
    'exportNamespaceFrom',
    'dynamicImport',
    'nullishCoalescingOperator',
    'optionalChaining',
    'importMeta',
    'topLevelAwait',
    'optionalCatchBinding'
  ],
  strictMode: false,
  errorRecovery: true
};

// File type patterns for scanning
const SCAN_PATTERNS = {
  source: /\.(tsx?|jsx?)$/i,  // Focus on React/TypeScript files only
  exclude: /node_modules|\.next|dist|build|coverage|\.git|scans|public\/admin|\.d\.ts$/,
  priorityDirs: ['src', 'app', 'components', 'pages', 'lib', 'utils', 'styles'],
  maxFileSize: 1024 * 1024 // Skip files larger than 1MB
};

// Brand colors for compliance tracking
const BRAND_COLORS = {
  '#3F4A7E': 'metallic-blue',
  '#CA9E5B': 'aztec-gold'
};

// CONTEXT7 SOURCE: /babel/babel - AST node type identification patterns
const COMPONENT_PATTERNS = {
  buttons: {
    magicui: /@\/components\/magicui/,
    headlessui: /@headlessui\/react/,
    radix: /@radix-ui/,
    native: /^button$/,
    custom: /Button$/,
    linkButton: /Link.*button|button.*Link/i
  },
  videos: {
    native: /^video$/,
    component: /Video/,
    aspectRatio: /AspectRatio/
  }
};

// Typography patterns for brand compliance
const TYPOGRAPHY_PATTERNS = {
  brandHeadings: /Playfair Display/i,
  brandBody: /Source Serif 4/i,
  headingTags: /^h[1-6]$/i
};

class ComprehensiveCodebaseScanner {
  constructor() {
    this.startTime = performance.now();
    this.stats = {
      totalFiles: 0,
      scannedFiles: 0,
      errors: 0,
      skipped: 0
    };
    this.cache = new Map();
    this.results = this.initializeResults();
  }

  // CONTEXT7 SOURCE: /nodejs/node - Initialize results structure for comprehensive analysis
  initializeResults() {
    return {
      metadata: {
        scanDate: new Date().toISOString(),
        totalFiles: 0,
        scanDuration: 0,
        filesPerSecond: 0
      },
      components: {
        buttons: [],
        videos: []
      },
      typography: {
        headings: [],
        bodyText: []
      },
      colors: {
        brandColors: [],
        nonBrandColors: []
      },
      imports: [],
      styling: {
        tailwindClasses: [],
        inlineStyles: [],
        hardcodedValues: []
      }
    };
  }

  // CONTEXT7 SOURCE: /nodejs/node - Memory-optimized sequential file processing
  async scanCodebase(rootDir = process.cwd()) {
    console.log('🚀 Starting comprehensive codebase analysis...');
    console.log(`📁 Scanning directory: ${rootDir}`);
    
    try {
      const allFiles = await this.getAllFiles(rootDir);
      console.log(`📊 Found ${allFiles.length} files to analyze`);
      
      this.stats.totalFiles = allFiles.length;
      
      // Process files sequentially to avoid memory issues
      console.log('⚡ Processing files sequentially for memory efficiency');
      
      for (let i = 0; i < allFiles.length; i++) {
        const filePath = allFiles[i];
        
        await this.processFile(filePath);
        
        // Progress indicator every 50 files and memory cleanup
        if ((i + 1) % 50 === 0 || i === allFiles.length - 1) {
          const progress = ((i + 1) / allFiles.length * 100).toFixed(1);
          console.log(`✅ Processed ${i + 1}/${allFiles.length} files - Progress: ${progress}%`);
          
          // Force garbage collection every 50 files to prevent memory issues
          if (global.gc) {
            global.gc();
          }
        }
      }
      
      this.finalizeResults();
      await this.saveResults();
      
      console.log('🎉 Codebase analysis complete!');
      this.printSummary();
      
    } catch (error) {
      console.error('❌ Error during codebase scan:', error);
      throw error;
    }
  }

  // CONTEXT7 SOURCE: /nodejs/node - Recursive file system traversal with filtering
  async getAllFiles(dir, files = []) {
    try {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          // Skip excluded directories
          if (SCAN_PATTERNS.exclude.test(fullPath) || SCAN_PATTERNS.exclude.test(entry.name)) {
            continue;
          }
          await this.getAllFiles(fullPath, files);
        } else if (entry.isFile()) {
          // Include only source files that are not too large
          if (SCAN_PATTERNS.source.test(entry.name) && !SCAN_PATTERNS.exclude.test(fullPath)) {
            try {
              const stats = await fs.promises.stat(fullPath);
              if (stats.size <= SCAN_PATTERNS.maxFileSize) {
                files.push(fullPath);
              } else {
                console.log(`⏭️  Skipping large file: ${fullPath} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
              }
            } catch (statError) {
              console.warn(`⚠️  Could not stat file: ${fullPath}`);
            }
          }
        }
      }
      
      return files;
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error.message);
      return files;
    }
  }

  // Create file processing batches
  createBatches(items, batchSize) {
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  // CONTEXT7 SOURCE: /babel/babel - File processing with AST parsing
  async processFile(filePath) {
    try {
      const content = await fs.promises.readFile(filePath, 'utf8');
      const stats = await fs.promises.stat(filePath);
      
      // Skip empty files
      if (content.trim().length === 0) {
        this.stats.skipped++;
        return;
      }
      
      // Check cache for unchanged files
      const cacheKey = `${filePath}:${stats.mtimeMs}`;
      if (this.cache.has(cacheKey)) {
        this.mergeResults(this.cache.get(cacheKey));
        this.stats.scannedFiles++;
        return;
      }
      
      const fileResults = await this.analyzeFile(filePath, content);
      this.cache.set(cacheKey, fileResults);
      this.mergeResults(fileResults);
      
      this.stats.scannedFiles++;
      
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
      this.stats.errors++;
    }
  }

  // CONTEXT7 SOURCE: /babel/babel - AST-based file analysis with comprehensive pattern detection
  async analyzeFile(filePath, content) {
    const results = this.initializeResults();
    const lines = content.split('\n');
    
    try {
      if (parser) {
        // Parse with Babel for AST analysis
        const ast = parser.parse(content, BABEL_PARSER_CONFIG);
        
        // Traverse AST for comprehensive analysis
        this.traverseAST(ast, filePath, lines, results);
      } else {
        // Fallback to regex-based analysis
        this.analyzeWithRegex(filePath, content, lines, results);
      }
      
    } catch (parseError) {
      // Fallback to regex-based analysis for unparseable files
      console.warn(`AST parsing failed for ${filePath}, using regex analysis:`, parseError.message);
      this.analyzeWithRegex(filePath, content, lines, results);
    }
    
    return results;
  }

  // CONTEXT7 SOURCE: /babel/babel - AST traversal for surgical component detection
  traverseAST(node, filePath, lines, results) {
    if (!node || typeof node !== 'object') return;
    
    // Component detection
    this.detectComponents(node, filePath, lines, results);
    
    // Typography analysis
    this.analyzeTypography(node, filePath, lines, results);
    
    // Color detection
    this.detectColors(node, filePath, lines, results);
    
    // Import analysis
    this.analyzeImports(node, filePath, lines, results);
    
    // Styling analysis
    this.analyzeStyling(node, filePath, lines, results);
    
    // Recursively traverse child nodes
    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        const child = node[key];
        if (Array.isArray(child)) {
          child.forEach(item => this.traverseAST(item, filePath, lines, results));
        } else if (child && typeof child === 'object') {
          this.traverseAST(child, filePath, lines, results);
        }
      }
    }
  }

  // CONTEXT7 SOURCE: /babel/babel - Button component detection with variant analysis
  detectComponents(node, filePath, lines, results) {
    if (!node.type) return;
    
    // Button detection
    if (this.isButtonComponent(node)) {
      const button = this.analyzeButtonComponent(node, filePath, lines);
      if (button) {
        results.components.buttons.push(button);
      }
    }
    
    // Video detection
    if (this.isVideoComponent(node)) {
      const video = this.analyzeVideoComponent(node, filePath, lines);
      if (video) {
        results.components.videos.push(video);
      }
    }
  }

  // CONTEXT7 SOURCE: /babel/babel - Button component identification patterns
  isButtonComponent(node) {
    if (node.type === 'JSXElement' && node.openingElement) {
      const name = this.getElementName(node.openingElement);
      return /button|Button/i.test(name);
    }
    return false;
  }

  // CONTEXT7 SOURCE: /babel/babel - Button component analysis with props extraction
  analyzeButtonComponent(node, filePath, lines) {
    const elementName = this.getElementName(node.openingElement);
    const lineNumber = node.loc ? node.loc.start.line : 0;
    const code = lines[lineNumber - 1] || '';
    
    // Determine button type
    let buttonType = 'native';
    if (/@\/components\/magicui/.test(code)) buttonType = 'magic-ui';
    else if (/@headlessui\/react/.test(code)) buttonType = 'headless-ui';
    else if (/@radix-ui/.test(code)) buttonType = 'radix';
    else if (/Button$/.test(elementName)) buttonType = 'custom';
    else if (/Link.*button|button.*Link/i.test(code)) buttonType = 'link-as-button';
    
    // Extract props
    const props = this.extractProps(node.openingElement);
    
    // Extract text content
    const textContent = this.extractTextContent(node);
    
    return {
      type: buttonType,
      file: filePath,
      line: lineNumber,
      code: code.trim(),
      props: {
        variant: props.variant || null,
        size: props.size || null,
        className: props.className || null,
        onClick: !!props.onClick,
        disabled: !!props.disabled,
        type: props.type || null,
        textContent: textContent,
        ariaLabel: props['aria-label'] || props.ariaLabel || null
      }
    };
  }

  // Video component detection and analysis
  isVideoComponent(node) {
    if (node.type === 'JSXElement' && node.openingElement) {
      const name = this.getElementName(node.openingElement);
      return /video|Video/i.test(name);
    }
    return false;
  }

  analyzeVideoComponent(node, filePath, lines) {
    const lineNumber = node.loc ? node.loc.start.line : 0;
    const code = lines[lineNumber - 1] || '';
    
    const props = this.extractProps(node.openingElement);
    
    // Check for AspectRatio wrapper
    const hasAspectRatio = /AspectRatio/.test(code) || this.findAspectRatioWrapper(node);
    const aspectRatio = this.extractAspectRatio(code, props);
    
    return {
      hasAspectRatio: hasAspectRatio,
      aspectRatio: aspectRatio,
      file: filePath,
      line: lineNumber,
      code: code.trim(),
      poster: props.poster || null,
      autoplay: !!props.autoplay,
      sources: this.extractVideoSources(node, props)
    };
  }

  // CONTEXT7 SOURCE: /babel/babel - Typography analysis for brand compliance
  analyzeTypography(node, filePath, lines, results) {
    if (node.type === 'JSXElement' && node.openingElement) {
      const elementName = this.getElementName(node.openingElement);
      const lineNumber = node.loc ? node.loc.start.line : 0;
      const code = lines[lineNumber - 1] || '';
      
      // Heading analysis
      if (TYPOGRAPHY_PATTERNS.headingTags.test(elementName)) {
        const props = this.extractProps(node.openingElement);
        const fontFamily = this.extractFontFamily(code, props);
        
        results.typography.headings.push({
          tag: elementName,
          fontFamily: fontFamily,
          brandCompliant: TYPOGRAPHY_PATTERNS.brandHeadings.test(fontFamily || ''),
          file: filePath,
          line: lineNumber,
          code: code.trim()
        });
      }
      
      // Body text analysis
      if (['p', 'div', 'span', 'text'].includes(elementName.toLowerCase())) {
        const props = this.extractProps(node.openingElement);
        const fontFamily = this.extractFontFamily(code, props);
        
        if (fontFamily) {
          results.typography.bodyText.push({
            fontFamily: fontFamily,
            brandCompliant: TYPOGRAPHY_PATTERNS.brandBody.test(fontFamily),
            file: filePath,
            line: lineNumber,
            code: code.trim()
          });
        }
      }
    }
  }

  // CONTEXT7 SOURCE: /babel/babel - Color detection with brand compliance tracking
  detectColors(node, filePath, lines, results) {
    if (!node.loc) return;
    
    const lineNumber = node.loc.start.line;
    const code = lines[lineNumber - 1] || '';
    
    // Color regex patterns
    const colorPatterns = [
      /#[0-9A-Fa-f]{6}/g,
      /#[0-9A-Fa-f]{3}/g,
      /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g,
      /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/g,
      /hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)/g
    ];
    
    colorPatterns.forEach(pattern => {
      const matches = code.match(pattern) || [];
      matches.forEach(color => {
        const normalizedColor = color.toUpperCase();
        
        if (BRAND_COLORS[normalizedColor]) {
          results.colors.brandColors.push({
            color: normalizedColor,
            type: BRAND_COLORS[normalizedColor],
            usage: this.determineColorUsage(code, color),
            file: filePath,
            line: lineNumber,
            code: code.trim()
          });
        } else {
          results.colors.nonBrandColors.push({
            color: color,
            file: filePath,
            line: lineNumber,
            code: code.trim(),
            suggestedReplacement: this.suggestBrandColor(color)
          });
        }
      });
    });
  }

  // CONTEXT7 SOURCE: /babel/babel - Import statement analysis
  analyzeImports(node, filePath, lines, results) {
    if (node.type === 'ImportDeclaration') {
      const lineNumber = node.loc ? node.loc.start.line : 0;
      const code = lines[lineNumber - 1] || '';
      
      results.imports.push({
        statement: code.trim(),
        source: node.source.value,
        type: this.getImportType(node.source.value),
        used: true, // Would need more analysis to determine actual usage
        file: filePath,
        line: lineNumber
      });
    }
  }

  // Styling analysis
  analyzeStyling(node, filePath, lines, results) {
    if (node.type === 'JSXElement' && node.openingElement) {
      const props = this.extractProps(node.openingElement);
      const lineNumber = node.loc ? node.loc.start.line : 0;
      
      // Tailwind classes
      if (props.className) {
        const classes = props.className.split(/\s+/);
        classes.forEach(cls => {
          const existing = results.styling.tailwindClasses.find(item => item.class === cls);
          if (existing) {
            existing.frequency++;
          } else {
            results.styling.tailwindClasses.push({ class: cls, frequency: 1 });
          }
        });
      }
      
      // Inline styles
      if (props.style) {
        results.styling.inlineStyles.push({
          file: filePath,
          line: lineNumber,
          styles: props.style
        });
      }
    }
  }

  // Regex-based analysis fallback
  analyzeWithRegex(filePath, content, lines, results) {
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Button detection
      if (/button|Button/i.test(line)) {
        results.components.buttons.push({
          type: 'detected-by-regex',
          file: filePath,
          line: lineNumber,
          code: line.trim(),
          props: {
            variant: this.extractRegexProp(line, 'variant'),
            size: this.extractRegexProp(line, 'size'),
            className: this.extractRegexProp(line, 'className'),
            onClick: /onClick/.test(line),
            disabled: /disabled/.test(line),
            type: this.extractRegexProp(line, 'type'),
            textContent: this.extractRegexTextContent(line),
            ariaLabel: this.extractRegexProp(line, 'aria-label')
          }
        });
      }
      
      // Video detection
      if (/<video|<Video/i.test(line)) {
        results.components.videos.push({
          hasAspectRatio: /AspectRatio/.test(line),
          aspectRatio: this.extractAspectRatio(line, {}),
          file: filePath,
          line: lineNumber,
          code: line.trim(),
          poster: this.extractRegexProp(line, 'poster'),
          autoplay: /autoplay/.test(line),
          sources: this.extractRegexVideoSources(line)
        });
      }
      
      // Typography detection
      const headingMatch = line.match(/<(h[1-6])/i);
      if (headingMatch) {
        const fontFamily = this.extractFontFamily(line, {});
        results.typography.headings.push({
          tag: headingMatch[1].toLowerCase(),
          fontFamily: fontFamily,
          brandCompliant: TYPOGRAPHY_PATTERNS.brandHeadings.test(fontFamily || ''),
          file: filePath,
          line: lineNumber,
          code: line.trim()
        });
      }
      
      // Color detection
      const colorMatches = line.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g) || [];
      colorMatches.forEach(color => {
        const normalizedColor = color.toUpperCase();
        if (BRAND_COLORS[normalizedColor]) {
          results.colors.brandColors.push({
            color: normalizedColor,
            type: BRAND_COLORS[normalizedColor],
            usage: this.determineColorUsage(line, color),
            file: filePath,
            line: lineNumber,
            code: line.trim()
          });
        } else {
          results.colors.nonBrandColors.push({
            color: color,
            file: filePath,
            line: lineNumber,
            code: line.trim(),
            suggestedReplacement: this.suggestBrandColor(color)
          });
        }
      });
      
      // Import detection
      if (/^import/.test(line.trim())) {
        const sourceMatch = line.match(/from\s+['"]([^'"]+)['"]/);
        if (sourceMatch) {
          results.imports.push({
            statement: line.trim(),
            source: sourceMatch[1],
            type: this.getImportType(sourceMatch[1]),
            used: true,
            file: filePath,
            line: lineNumber
          });
        }
      }
      
      // Tailwind classes detection
      const classMatches = line.match(/className=['"]([^'"]+)['"]/g) || [];
      classMatches.forEach(match => {
        const classes = match.replace(/className=['"]|['"]/g, '').split(/\s+/);
        classes.forEach(cls => {
          const existing = results.styling.tailwindClasses.find(item => item.class === cls);
          if (existing) {
            existing.frequency++;
          } else {
            results.styling.tailwindClasses.push({ class: cls, frequency: 1 });
          }
        });
      });
    });
  }

  // Helper methods for regex extraction
  extractRegexProp(line, propName) {
    const regex = new RegExp(`${propName}=['"]([^'"]+)['"]`);
    const match = line.match(regex);
    return match ? match[1] : null;
  }

  extractRegexTextContent(line) {
    const match = line.match(/>([^<]+)</);
    return match ? match[1].trim() : '';
  }

  extractRegexVideoSources(line) {
    const srcMatch = line.match(/src=['"]([^'"]+)['"]/);
    return srcMatch ? [srcMatch[1]] : [];
  }

  // Helper methods
  getElementName(openingElement) {
    if (openingElement.name.type === 'JSXIdentifier') {
      return openingElement.name.name;
    }
    if (openingElement.name.type === 'JSXMemberExpression') {
      return `${openingElement.name.object.name}.${openingElement.name.property.name}`;
    }
    return '';
  }

  extractProps(openingElement) {
    const props = {};
    
    if (openingElement.attributes) {
      openingElement.attributes.forEach(attr => {
        if (attr.type === 'JSXAttribute' && attr.name.name) {
          let value = null;
          
          if (attr.value) {
            if (attr.value.type === 'StringLiteral') {
              value = attr.value.value;
            } else if (attr.value.type === 'JSXExpressionContainer') {
              value = true; // Simplified - would need more complex analysis
            }
          } else {
            value = true;
          }
          
          props[attr.name.name] = value;
        }
      });
    }
    
    return props;
  }

  extractTextContent(node) {
    if (node.children) {
      return node.children
        .filter(child => child.type === 'JSXText')
        .map(child => child.value.trim())
        .join(' ')
        .trim();
    }
    return '';
  }

  extractFontFamily(code, props) {
    // Check for font-family in various formats
    const fontFamilyMatch = code.match(/font-family:\s*['"](.*?)['"]|fontFamily:\s*['"](.*?)['"]/) ||
                           code.match(/font-\[(.*?)\]/) ||
                           (props.style && props.style.fontFamily);
    
    return fontFamilyMatch ? (fontFamilyMatch[1] || fontFamilyMatch[2] || fontFamilyMatch[0]) : null;
  }

  extractAspectRatio(code, props) {
    if (/ratio={16\/9}|ratio="16\/9"/.test(code)) return '16/9';
    if (/ratio={4\/3}|ratio="4\/3"/.test(code)) return '4/3';
    if (/ratio={1}|ratio="1"/.test(code)) return '1/1';
    return 'none';
  }

  findAspectRatioWrapper(node) {
    // Would need to traverse up the AST to find AspectRatio wrapper
    return false;
  }

  extractVideoSources(node, props) {
    const sources = [];
    if (props.src) sources.push(props.src);
    // Would need more complex analysis for source elements
    return sources;
  }

  determineColorUsage(code, color) {
    if (/background|bg-/.test(code)) return 'background';
    if (/color|text-/.test(code)) return 'text';
    if (/border/.test(code)) return 'border';
    return 'unknown';
  }

  suggestBrandColor(color) {
    // Simple heuristic for color replacement
    const rgb = this.hexToRgb(color);
    if (!rgb) return null;
    
    const { r, g, b } = rgb;
    
    // Suggest based on color characteristics
    if (b > r && b > g) return '#3F4A7E'; // Blue-ish colors -> Metallic Blue
    if (r > 150 && g > 150) return '#CA9E5B'; // Warm colors -> Aztec Gold
    
    return null;
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  getImportType(source) {
    if (source.startsWith('.')) return 'relative';
    if (source.startsWith('/') || source.startsWith('@/')) return 'absolute';
    return 'external';
  }

  // Merge results from individual file analysis
  mergeResults(fileResults) {
    // Components
    this.results.components.buttons.push(...fileResults.components.buttons);
    this.results.components.videos.push(...fileResults.components.videos);
    
    // Typography
    this.results.typography.headings.push(...fileResults.typography.headings);
    this.results.typography.bodyText.push(...fileResults.typography.bodyText);
    
    // Colors
    this.results.colors.brandColors.push(...fileResults.colors.brandColors);
    this.results.colors.nonBrandColors.push(...fileResults.colors.nonBrandColors);
    
    // Imports
    this.results.imports.push(...fileResults.imports);
    
    // Styling - merge Tailwind classes with frequency
    fileResults.styling.tailwindClasses.forEach(fileClass => {
      const existing = this.results.styling.tailwindClasses.find(cls => cls.class === fileClass.class);
      if (existing) {
        existing.frequency += fileClass.frequency;
      } else {
        this.results.styling.tailwindClasses.push({ ...fileClass });
      }
    });
    
    this.results.styling.inlineStyles.push(...fileResults.styling.inlineStyles);
    this.results.styling.hardcodedValues.push(...fileResults.styling.hardcodedValues);
  }

  // Finalize results with metadata
  finalizeResults() {
    const endTime = performance.now();
    const duration = (endTime - this.startTime) / 1000;
    
    this.results.metadata = {
      scanDate: new Date().toISOString(),
      totalFiles: this.stats.totalFiles,
      scanDuration: parseFloat(duration.toFixed(2)),
      filesPerSecond: parseFloat((this.stats.scannedFiles / duration).toFixed(2))
    };
    
    // Sort Tailwind classes by frequency
    this.results.styling.tailwindClasses.sort((a, b) => b.frequency - a.frequency);
  }

  // CONTEXT7 SOURCE: /nodejs/node - Save results to JSON file
  async saveResults() {
    const resultsPath = path.join(process.cwd(), 'scanResults.json');
    
    try {
      await fs.promises.writeFile(
        resultsPath,
        JSON.stringify(this.results, null, 2),
        'utf8'
      );
      console.log(`💾 Results saved to: ${resultsPath}`);
    } catch (error) {
      console.error('❌ Error saving results:', error);
      throw error;
    }
  }

  // Print comprehensive summary
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPREHENSIVE CODEBASE ANALYSIS SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`📁 Files analyzed: ${this.stats.scannedFiles}/${this.stats.totalFiles}`);
    console.log(`⚡ Scan duration: ${this.results.metadata.scanDuration}s`);
    console.log(`🚀 Performance: ${this.results.metadata.filesPerSecond} files/sec`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log(`⏭️  Skipped: ${this.stats.skipped}`);
    
    console.log('\n🎯 COMPONENT ANALYSIS:');
    console.log(`  • Buttons detected: ${this.results.components.buttons.length}`);
    console.log(`  • Videos detected: ${this.results.components.videos.length}`);
    
    console.log('\n🎨 TYPOGRAPHY ANALYSIS:');
    console.log(`  • Headings analyzed: ${this.results.typography.headings.length}`);
    const brandCompliantHeadings = this.results.typography.headings.filter(h => h.brandCompliant).length;
    console.log(`  • Brand compliant headings: ${brandCompliantHeadings}/${this.results.typography.headings.length}`);
    
    console.log('\n🎨 COLOR ANALYSIS:');
    console.log(`  • Brand colors found: ${this.results.colors.brandColors.length}`);
    console.log(`  • Non-brand colors found: ${this.results.colors.nonBrandColors.length}`);
    
    console.log('\n📦 IMPORT ANALYSIS:');
    console.log(`  • Total imports: ${this.results.imports.length}`);
    
    console.log('\n💅 STYLING ANALYSIS:');
    console.log(`  • Unique Tailwind classes: ${this.results.styling.tailwindClasses.length}`);
    console.log(`  • Inline styles found: ${this.results.styling.inlineStyles.length}`);
    
    if (this.results.styling.tailwindClasses.length > 0) {
      console.log('\n🔥 TOP TAILWIND CLASSES:');
      this.results.styling.tailwindClasses.slice(0, 10).forEach((cls, index) => {
        console.log(`  ${index + 1}. ${cls.class} (${cls.frequency} uses)`);
      });
    }
    
    console.log('\n✅ Analysis complete! Check scanResults.json for detailed data.');
    console.log('='.repeat(60));
  }
}

// Main execution
async function main() {
  try {
    const scanner = new ComprehensiveCodebaseScanner();
    const targetDir = process.argv[2] || process.cwd();
    
    console.log('🎯 My Private Tutor Online - Comprehensive Codebase Scanner');
    console.log('⚡ Powered by Context7 MCP Documentation');
    console.log('🔍 AST-based analysis with surgical precision\n');
    
    await scanner.scanCodebase(targetDir);
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main();
}

module.exports = ComprehensiveCodebaseScanner;