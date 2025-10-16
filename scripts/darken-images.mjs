#!/usr/bin/env node
/**
 * CONTEXT7 SOURCE: /lovell/sharp - Image processing with brightness modulation for web-friendly images
 * BRIGHTNESS MODULATION REASON: Official Sharp documentation demonstrates brightness control for replacing CSS overlay effects
 *
 * Image Darkening Script for My Private Tutor Online
 * ==================================================
 *
 * This script uses Sharp's modulate operation to darken images by reducing brightness,
 * eliminating the need for CSS overlays that can cause child element rendering issues.
 *
 * Sharp Features Used:
 * - modulate({ brightness }): Multiplicative brightness adjustment (0.7 = 30% darker)
 * - High-performance native image processing
 * - Maintains image quality while reducing brightness
 * - Creates web-optimized output with proper compression
 *
 * Usage: npm run darken:images [brightness-factor] [input-pattern] [output-suffix]
 * Example: npm run darken:images 0.7 "public/images/hero/*.jpg" "-dark"
 */

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

/**
 * CONTEXT7 SOURCE: /lovell/sharp - Command line argument parsing for image processing scripts
 * CLI CONFIGURATION REASON: Sharp documentation shows command-line usage patterns for batch image processing
 */
const DEFAULT_BRIGHTNESS = 0.7; // 30% darker (0.7 = 70% of original brightness)
const DEFAULT_PATTERN = 'public/images/**/*.{jpg,jpeg,png,webp}';
const DEFAULT_SUFFIX = '-dark';

// Parse command line arguments
const [, , brightnessArg, patternArg, suffixArg] = process.argv;
const brightness = parseFloat(brightnessArg) || DEFAULT_BRIGHTNESS;
const inputPattern = patternArg || DEFAULT_PATTERN;
const outputSuffix = suffixArg || DEFAULT_SUFFIX;

/**
 * CONTEXT7 SOURCE: /lovell/sharp - Sharp modulate operation for brightness adjustment
 * BRIGHTNESS MODULATION REASON: Official Sharp documentation Section 4.1 shows modulate for brightness control
 *
 * Darkens a single image using Sharp's modulate operation
 * @param {string} inputPath - Path to the source image
 * @param {string} outputPath - Path for the darkened image
 * @param {number} brightnessFactor - Brightness multiplier (0.7 = 30% darker)
 */
async function darkenImage(inputPath, outputPath, brightnessFactor) {
	try {
		// CONTEXT7 SOURCE: /lovell/sharp - Image processing pipeline with modulate brightness
		// MODULATE OPERATION REASON: Sharp documentation demonstrates brightness adjustment for web-friendly image optimization
		await sharp(inputPath)
			.modulate({
				brightness: brightnessFactor, // Multiplicative brightness: 0.7 = 30% darker
			})
			.jpeg({
				quality: 85, // High quality for professional appearance
				progressive: true, // Progressive JPEG for faster loading
				mozjpeg: true, // Use mozjpeg encoder for better compression
			})
			.png({
				quality: 90, // High quality PNG
				compressionLevel: 6, // Balanced compression
				adaptiveFiltering: true, // Better compression for complex images
			})
			.webp({
				quality: 85, // High quality WebP
				effort: 6, // Better compression with reasonable processing time
			})
			.toFile(outputPath);

		console.log(
			`✅ Darkened: ${path.basename(inputPath)} → ${path.basename(outputPath)}`,
		);
		return true;
	} catch (error) {
		console.error(`❌ Failed to darken ${inputPath}:`, error.message);
		return false;
	}
}

/**
 * CONTEXT7 SOURCE: /nodejs/nodejs.org - File path manipulation for batch processing
 * PATH GENERATION REASON: Node.js documentation shows path.parse for filename manipulation in batch operations
 *
 * Generates output path with suffix before file extension
 * @param {string} inputPath - Original file path
 * @param {string} suffix - Suffix to add (e.g., '-dark')
 * @returns {string} New path with suffix
 */
function generateOutputPath(inputPath, suffix) {
	const parsedPath = path.parse(inputPath);
	return path.join(
		parsedPath.dir,
		`${parsedPath.name}${suffix}${parsedPath.ext}`,
	);
}

/**
 * CONTEXT7 SOURCE: /lovell/sharp - Batch image processing with error handling and progress reporting
 * BATCH PROCESSING REASON: Sharp documentation demonstrates parallel processing patterns for multiple images
 *
 * Main function to process all matching images
 */
async function main() {
	try {
		console.log('🔍 Finding images to darken...');
		console.log(`📁 Pattern: ${inputPattern}`);
		console.log(
			`🔅 Brightness: ${brightness} (${Math.round((1 - brightness) * 100)}% darker)`,
		);
		console.log(`📝 Suffix: ${outputSuffix}`);
		console.log('');

		// CONTEXT7 SOURCE: /glob/glob - File pattern matching for image batch processing
		// GLOB PATTERN REASON: Standard Node.js pattern for finding multiple files matching criteria
		const inputFiles = await glob(inputPattern, {
			absolute: true,
			ignore: ['**/*-dark*', '**/*-darkened*'], // Skip already processed files
		});

		if (inputFiles.length === 0) {
			console.log('❌ No matching images found.');
			console.log('💡 Try a different pattern, e.g.: "public/images/hero/*.jpg"');
			process.exit(1);
		}

		console.log(`📸 Found ${inputFiles.length} image(s) to process:\n`);

		// Process each image
		const results = [];
		let successCount = 0;
		let failCount = 0;

		// CONTEXT7 SOURCE: /lovell/sharp - Parallel image processing with Promise.allSettled
		// PARALLEL PROCESSING REASON: Sharp documentation shows concurrent processing for better performance
		const promises = inputFiles.map(async (inputPath) => {
			const outputPath = generateOutputPath(inputPath, outputSuffix);

			// Check if output already exists
			try {
				await fs.access(outputPath);
				console.log(`⏭️  Skipping (already exists): ${path.basename(outputPath)}`);
				return { success: true, skipped: true };
			} catch {
				// File doesn't exist, proceed with processing
			}

			const success = await darkenImage(inputPath, outputPath, brightness);
			return { success, inputPath, outputPath, skipped: false };
		});

		const results_array = await Promise.allSettled(promises);

		// Count results
		results_array.forEach((result) => {
			if (result.status === 'fulfilled') {
				if (result.value.success) {
					successCount++;
				} else if (!result.value.skipped) {
					failCount++;
				}
			} else {
				failCount++;
			}
		});

		console.log('\n📊 Processing Summary:');
		console.log(`✅ Successfully processed: ${successCount}`);
		if (failCount > 0) {
			console.log(`❌ Failed: ${failCount}`);
		}
		console.log('');

		if (successCount > 0) {
			console.log('🎉 Image darkening complete!');
			console.log(
				'💡 You can now use the darkened images instead of CSS overlays.',
			);
			console.log('💡 This should fix child element rendering issues.');
		}
	} catch (error) {
		console.error('❌ Script failed:', error.message);
		process.exit(1);
	}
}

// Run the script
main();
