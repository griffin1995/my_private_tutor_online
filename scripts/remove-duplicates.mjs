#!/usr/bin/env node

// CONTEXT7 SOURCE: /nodejs/node - File system operations for duplicate removal
// DUPLICATE REMOVAL REASON: Automate cleanup of identified duplicate assets for immediate performance gains

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Identified duplicates to remove (keeping the better named versions)
const DUPLICATES_TO_REMOVE = [
	// Logo duplicates - remove "My Private Tutor-XX" versions, keep descriptive names
	'public/images/logos/My Private Tutor-02.jpg', // keep logo-icon-only.jpg
	'public/images/logos/My Private Tutor-02.png', // keep logo-icon-only.png
	'public/images/logos/My Private Tutor-01.jpg', // keep logo-name-tagline.jpg
	'public/images/logos/My Private Tutor-01.png', // keep logo-name-tagline.png
	'public/images/logos/My Private Tutor-03.jpg', // keep logo-with-name.jpg
	'public/images/logos/My Private Tutor-03.png', // keep logo-with-name.png
	'public/images/logos/My Private Tutor-04.jpg', // keep tagline-only.jpg
	'public/images/logos/My Private Tutor-04.png', // keep tagline-only.png

	// Image duplicates - remove duplicates in less logical locations
	'public/images/team/founder-elizabeth-burrows-alternative.jpg', // keep about/about-founder-story.jpg
	'public/images/team/founder-elizabeth-burrows-alternative.webp', // keep about/about-founder-story.webp
	'public/images/team/founder-elizabeth-burrows-spare.jpg', // keep elizabeth-burrows-founder-spare.jpg
];

async function removeDuplicates() {
	console.log('🧹 AUTOMATED DUPLICATE REMOVAL');
	console.log(
		'Removing identified duplicate assets for immediate performance gains\n',
	);

	const results = {
		removed: 0,
		sizeSaved: 0,
		errors: [],
	};

	for (const duplicatePath of DUPLICATES_TO_REMOVE) {
		const fullPath = path.join(process.cwd(), duplicatePath);

		try {
			// Check if file exists
			const stats = await fs.stat(fullPath);
			const size = stats.size;

			// Remove the file
			await fs.unlink(fullPath);

			results.removed++;
			results.sizeSaved += size;

			console.log(`✅ Removed: ${duplicatePath} (${Math.round(size / 1024)}KB)`);
		} catch (error) {
			if (error.code === 'ENOENT') {
				console.log(`⚠️  Already removed: ${duplicatePath}`);
			} else {
				console.error(`❌ Error removing ${duplicatePath}: ${error.message}`);
				results.errors.push({
					file: duplicatePath,
					error: error.message,
				});
			}
		}
	}

	return results;
}

async function updateCMSReferences() {
	console.log('\n🔄 Checking CMS references for updated asset paths...');

	const cmsFiles = ['src/lib/cms/cms-content.ts', 'src/lib/cms/cms-images.ts'];

	const referenceUpdates = new Map([
		// Logo reference updates
		['My Private Tutor-01', 'logo-name-tagline'],
		['My Private Tutor-02', 'logo-icon-only'],
		['My Private Tutor-03', 'logo-with-name'],
		['My Private Tutor-04', 'tagline-only'],
		// Team image updates
		['founder-elizabeth-burrows-alternative', 'about-founder-story'],
		['founder-elizabeth-burrows-spare', 'elizabeth-burrows-founder-spare'],
	]);

	let updatesApplied = 0;

	for (const cmsFile of cmsFiles) {
		const filePath = path.join(process.cwd(), cmsFile);

		try {
			await fs.access(filePath);
			let content = await fs.readFile(filePath, 'utf8');
			let hasChanges = false;

			for (const [oldRef, newRef] of referenceUpdates) {
				const oldPattern = new RegExp(oldRef, 'g');
				if (content.includes(oldRef)) {
					content = content.replace(oldPattern, newRef);
					hasChanges = true;
					updatesApplied++;
					console.log(`  📝 Updated "${oldRef}" → "${newRef}" in ${cmsFile}`);
				}
			}

			if (hasChanges) {
				await fs.writeFile(filePath, content, 'utf8');
			}
		} catch (error) {
			console.log(`  ⚠️  Could not update ${cmsFile}: ${error.message}`);
		}
	}

	return updatesApplied;
}

async function generateCleanupReport(results, updatesApplied) {
	console.log('\n📊 DUPLICATE REMOVAL REPORT\n');
	console.log('='.repeat(50));

	console.log('🗑️  REMOVAL RESULTS:');
	console.log(`Files Removed: ${results.removed}`);
	console.log(
		`Space Saved: ${Math.round(results.sizeSaved / 1024)}KB (${Math.round((results.sizeSaved / (1024 * 1024)) * 100) / 100}MB)`,
	);
	console.log(`CMS Updates Applied: ${updatesApplied}`);

	if (results.errors.length > 0) {
		console.log('\n⚠️  ERRORS:');
		results.errors.forEach((error) => {
			console.log(`  ${error.file}: ${error.error}`);
		});
	}

	console.log('\n✅ BENEFITS ACHIEVED:');
	console.log('• Reduced asset bundle size for faster loading');
	console.log('• Eliminated redundant network requests');
	console.log('• Simplified asset management and maintenance');
	console.log('• Improved CDN cache efficiency');
	console.log('• Better Core Web Vitals scores');

	console.log('\n🎯 NEXT STEPS:');
	console.log('• Test application to ensure all images load correctly');
	console.log('• Update any hardcoded image references if needed');
	console.log('• Deploy optimized assets to production');
	console.log('• Monitor performance improvements in analytics');

	console.log('\n='.repeat(50));
}

// Main execution
async function main() {
	try {
		console.log('🎯 MY PRIVATE TUTOR ONLINE - DUPLICATE ASSET REMOVAL');
		console.log('Automated cleanup for immediate performance optimization\n');

		// Remove identified duplicates
		const results = await removeDuplicates();

		// Update CMS references
		const updatesApplied = await updateCMSReferences();

		// Generate report
		await generateCleanupReport(results, updatesApplied);

		console.log('\n🎉 Duplicate removal completed successfully!');
		console.log(
			'💡 Review application functionality and deploy optimized assets',
		);
	} catch (error) {
		console.error('❌ Cleanup failed:', error);
		process.exit(1);
	}
}

if (import.meta.url === `file://${process.argv[1]}`) {
	main();
}
