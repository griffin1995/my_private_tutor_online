const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;
const { glob } = require('glob');

function removeCommentsFromFile(filePath) {
	const code = fs.readFileSync(filePath, 'utf8');

	try {
		// Parse with TypeScript + JSX support
		const ast = parse(code, {
			sourceType: 'module',
			plugins: ['typescript', 'jsx'],
		});

		// Remove all comment nodes
		ast.comments = [];

		// Generate code without comments
		const output = generate(
			ast,
			{
				comments: false, // Critical: don't include comments
				retainLines: false, // Don't preserve line numbers (cleaner output)
				compact: false, // Keep readable formatting
			},
			code,
		);

		// Write back to file
		fs.writeFileSync(filePath, output.code, 'utf8');
		console.log(`✓ Cleaned: ${filePath}`);
	} catch (error) {
		console.error(`✗ Failed: ${filePath}`, error.message);
	}
}

// Process all TS/TSX files in src directory
const pattern = 'src/**/*.{ts,tsx}';
const files = glob.sync(pattern, { ignore: 'node_modules/**' });

console.log(`Found ${files.length} files to process...\n`);
files.forEach(removeCommentsFromFile);
console.log('\nComplete! All comments removed from source files.');
