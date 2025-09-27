#!/bin/bash

# CONTEXT7 SOURCE: /websites/daringfireball_net-projects-markdown - Enhanced PDF conversion script
# Script to convert markdown to PDF with proper color rendering

echo "🔧 Converting Markdown to PDF with Color Support..."

# Method 1: Using pandoc with CSS styling
echo "📋 Method 1: Pandoc with CSS styling"
pandoc "src/app/[locale]/sept-22.md" \
    --css="pandoc-pdf-styles.css" \
    --pdf-engine=wkhtmltopdf \
    --pdf-engine-opt=--enable-local-file-access \
    --pdf-engine-opt=--print-media-type \
    --pdf-engine-opt=--disable-smart-shrinking \
    -o "sept-22-method1.pdf" \
    2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Method 1: PDF created successfully (sept-22-method1.pdf)"
else
    echo "❌ Method 1: Failed (wkhtmltopdf may not be installed)"
fi

# Method 2: Using pandoc with HTML intermediate
echo "📋 Method 2: Pandoc HTML → PDF conversion"
pandoc "src/app/[locale]/sept-22.md" \
    --css="pandoc-pdf-styles.css" \
    --standalone \
    --self-contained \
    -o "sept-22-intermediate.html"

if [ -f "sept-22-intermediate.html" ]; then
    echo "✅ HTML intermediate created: sept-22-intermediate.html"
    echo "📝 Open this HTML file in Chrome and use Print → Save as PDF for best color rendering"
fi

# Method 3: Direct pandoc with built-in PDF engine
echo "📋 Method 3: Direct pandoc PDF conversion"
pandoc "src/app/[locale]/sept-22.md" \
    --pdf-engine=xelatex \
    -V geometry:margin=1in \
    -o "sept-22-method3.pdf" \
    2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Method 3: PDF created successfully (sept-22-method3.pdf)"
else
    echo "❌ Method 3: Failed (xelatex may not be installed)"
fi

echo ""
echo "🎯 RECOMMENDED APPROACH:"
echo "1. Use sept-22-intermediate.html - Open in Chrome browser"
echo "2. Press Ctrl+P (Print)"
echo "3. Choose 'Save as PDF' as destination"
echo "4. In 'More settings' → Check 'Background graphics'"
echo "5. This preserves colors and styling perfectly"

echo ""
echo "📁 Generated files:"
ls -la sept-22*.{pdf,html} 2>/dev/null | grep -E '\.(pdf|html)$' || echo "No files generated yet"