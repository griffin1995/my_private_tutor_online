#!/usr/bin/env node

// CONTEXT7 SOURCE: /vercel/next.js - Advanced image optimization pipeline
// Phase 2 Core Optimization: Enhanced image pipeline with Sharp for 50% bundle reduction

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { glob } from 'glob';
import pLimit from 'p-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Phase 2 optimization configuration
const CONFIG = {
	// Source directories
	sourceDirs: [
		'public/images',
		'public/videos/thumbnails',
		'public/masterclass-images',
		'src/assets/images',
	],

	// Output configuration
	outputDir: 'public/optimized',

	// Format configurations
	formats: {
		avif: {
			quality: 80,
			effort: 6,
			chromaSubsampling: '4:2:0',
		},
		webp: {
			quality: 85,
			effort: 6,
			nearLossless: true,
			smartSubsample: true,
		},
		jpg: {
			quality: 88,
			progressive: true,
			mozjpeg: true,
			optimizeScans: true,
		},
	},

	// Responsive sizes for srcset generation
	responsiveSizes: [
		{ width: 320, suffix: 'xs' },
		{ width: 640, suffix: 'sm' },
		{ width: 768, suffix: 'md' },
		{ width: 1024, suffix: 'lg' },
		{ width: 1440, suffix: 'xl' },
		{ width: 1920, suffix: '2xl' },
		{ width: 2560, suffix: '3xl' },
	],

	// Processing limits
	concurrency: 4, // Parallel processing limit
	maxFileSize: 10 * 1024 * 1024, // 10MB max

	// Optimization thresholds
	thresholds: {
		skipBelow: 10 * 1024, // Skip files under 10KB
		aggressiveAbove: 1 * 1024 * 1024, // Aggressive optimization above 1MB
	},
};

// Statistics tracking
const stats = {
	processed: 0,
	skipped: 0,
	errors: 0,
	originalSize: 0,
	optimizedSize: 0,
	formats: {
		avif: 0,
		webp: 0,
		jpg: 0,
	},
};

// Limit concurrent operations
const limit = pLimit(CONFIG.concurrency);

/**
 * Process a single image through the optimization pipeline
 */
async function processImage(inputPath, relativePath) {
	try {
		const stat = await fs.stat(inputPath);
		stats.originalSize += stat.size;

		// Skip small files
		if (stat.size < CONFIG.thresholds.skipBelow) {
			stats.skipped++;
			console.log(`⏭️  Skipping small file: ${relativePath}`);
			return;
		}

		// Load image with Sharp
		const image = sharp(inputPath);
		const metadata = await image.metadata();

		// Determine if aggressive optimization is needed
		const aggressive = stat.size > CONFIG.thresholds.aggressiveAbove;

		// Process each responsive size
		for (const size of CONFIG.responsiveSizes) {
			// Skip if image is smaller than target size
			if (metadata.width && metadata.width < size.width) continue;

			const outputBase = path.join(
				CONFIG.outputDir,
				relativePath.replace(/\.[^.]+$/, `-${size.suffix}`),
			);

			// Ensure output directory exists
			await fs.mkdir(path.dirname(outputBase), { recursive: true });

			// Generate AVIF (best compression)
			if (metadata.format !== 'gif') {
				const avifPath = `${outputBase}.avif`;
				await image
					.resize(size.width, null, {
						withoutEnlargement: true,
						fit: 'inside',
					})
					.avif({
						...CONFIG.formats.avif,
						quality: aggressive ? 75 : CONFIG.formats.avif.quality,
					})
					.toFile(avifPath);

				const avifStat = await fs.stat(avifPath);
				stats.formats.avif += avifStat.size;
			}

			// Generate WebP (wide support)
			const webpPath = `${outputBase}.webp`;
			await image
				.resize(size.width, null, {
					withoutEnlargement: true,
					fit: 'inside',
				})
				.webp({
					...CONFIG.formats.webp,
					quality: aggressive ? 80 : CONFIG.formats.webp.quality,
				})
				.toFile(webpPath);

			const webpStat = await fs.stat(webpPath);
			stats.formats.webp += webpStat.size;

			// Generate optimized JPEG (fallback)
			if (metadata.format !== 'png' || !metadata.hasAlpha) {
				const jpgPath = `${outputBase}.jpg`;
				await image
					.resize(size.width, null, {
						withoutEnlargement: true,
						fit: 'inside',
					})
					.jpeg({
						...CONFIG.formats.jpg,
						quality: aggressive ? 85 : CONFIG.formats.jpg.quality,
					})
					.toFile(jpgPath);

				const jpgStat = await fs.stat(jpgPath);
				stats.formats.jpg += jpgStat.size;
			}
		}

		stats.processed++;
		console.log(`✅ Processed: ${relativePath}`);
	} catch (error) {
		stats.errors++;
		console.error(`❌ Error processing ${relativePath}:`, error.message);
	}
}

/**
 * Generate picture element HTML helper
 */
async function generatePictureHelper() {
	const helperContent = `// CONTEXT7 SOURCE: /vercel/next.js - Picture element helper for optimized images
// Phase 2: Auto-generated helper for responsive image loading

import React from 'react';

interface PictureProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export function Picture({
  src,
  alt,
  className = '',
  sizes = '100vw',
  loading = 'lazy',
  priority = false
}: PictureProps) {
  const basePath = src.replace(/\\.[^.]+$/, '');

  return (
    <picture>
      {/* AVIF - Best compression */}
      <source
        type="image/avif"
        srcSet={\`
          /optimized\${basePath}-xs.avif 320w,
          /optimized\${basePath}-sm.avif 640w,
          /optimized\${basePath}-md.avif 768w,
          /optimized\${basePath}-lg.avif 1024w,
          /optimized\${basePath}-xl.avif 1440w,
          /optimized\${basePath}-2xl.avif 1920w
        \`}
        sizes={sizes}
      />

      {/* WebP - Wide support */}
      <source
        type="image/webp"
        srcSet={\`
          /optimized\${basePath}-xs.webp 320w,
          /optimized\${basePath}-sm.webp 640w,
          /optimized\${basePath}-md.webp 768w,
          /optimized\${basePath}-lg.webp 1024w,
          /optimized\${basePath}-xl.webp 1440w,
          /optimized\${basePath}-2xl.webp 1920w
        \`}
        sizes={sizes}
      />

      {/* JPEG fallback */}
      <img
        src={\`/optimized\${basePath}-lg.jpg\`}
        srcSet={\`
          /optimized\${basePath}-xs.jpg 320w,
          /optimized\${basePath}-sm.jpg 640w,
          /optimized\${basePath}-md.jpg 768w,
          /optimized\${basePath}-lg.jpg 1024w,
          /optimized\${basePath}-xl.jpg 1440w,
          /optimized\${basePath}-2xl.jpg 1920w
        \`}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
}`;

	await fs.writeFile(
		path.join(process.cwd(), 'src/components/shared/media/Picture.tsx'),
		helperContent,
	);

	console.log('📝 Generated Picture component helper');
}

/**
 * Main optimization pipeline
 */
async function main() {
	console.log('🚀 Phase 2 Image Optimization Pipeline');
	console.log('======================================\n');

	const startTime = Date.now();

	// Collect all image files
	const imageFiles = [];
	for (const dir of CONFIG.sourceDirs) {
		const pattern = path.join(
			process.cwd(),
			dir,
			'**/*.{jpg,jpeg,png,webp,avif}',
		);
		const files = await glob(pattern, { ignore: '**/node_modules/**' });

		for (const file of files) {
			const relativePath = path.relative(path.join(process.cwd(), dir), file);
			imageFiles.push({ file, relativePath, dir });
		}
	}

	console.log(`📊 Found ${imageFiles.length} images to process\n`);

	// Process images with concurrency limit
	const tasks = imageFiles.map(({ file, relativePath }) =>
		limit(() => processImage(file, relativePath)),
	);

	await Promise.all(tasks);

	// Generate helper component
	await generatePictureHelper();

	// Calculate optimization results
	stats.optimizedSize =
		stats.formats.avif + stats.formats.webp + stats.formats.jpg;
	const reduction = (
		(1 - stats.optimizedSize / stats.originalSize) *
		100
	).toFixed(1);
	const duration = ((Date.now() - startTime) / 1000).toFixed(1);

	// Print results
	console.log('\n======================================');
	console.log('📈 OPTIMIZATION RESULTS:');
	console.log(`   Processed: ${stats.processed} images`);
	console.log(`   Skipped: ${stats.skipped} images`);
	console.log(`   Errors: ${stats.errors}`);
	console.log(
		`   Original Size: ${(stats.originalSize / 1024 / 1024).toFixed(2)} MB`,
	);
	console.log(
		`   Optimized Size: ${(stats.optimizedSize / 1024 / 1024).toFixed(2)} MB`,
	);
	console.log(`   Size Reduction: ${reduction}%`);
	console.log(`   Processing Time: ${duration}s`);
	console.log('\n📦 FORMAT BREAKDOWN:');
	console.log(`   AVIF: ${(stats.formats.avif / 1024 / 1024).toFixed(2)} MB`);
	console.log(`   WebP: ${(stats.formats.webp / 1024 / 1024).toFixed(2)} MB`);
	console.log(`   JPEG: ${(stats.formats.jpg / 1024 / 1024).toFixed(2)} MB`);
	console.log('\n✅ Phase 2 image optimization complete!');
}

// Run the pipeline
main().catch(console.error);
