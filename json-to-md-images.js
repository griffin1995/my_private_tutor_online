const fs = require('fs');
const path = require('path');

// Paths
const inputPath = path.join(__dirname, 'image-display-report.json');
const outputPath = path.join(__dirname, 'image-report.md');

// Read JSON
const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Helper to escape Markdown special characters in src
function escapeMarkdown(text) {
	return text ? text.toString().replace(/([_*[\]()])/g, '\\$1') : 'N/A';
}

// Convert image URLs to local public path
function getPublicPath(imgSrc) {
	if (!imgSrc) return 'N/A';
	try {
		const url = new URL(imgSrc, 'http://example.com');
		const nextImageParam = url.searchParams.get('url');
		if (nextImageParam) {
			// local path for rendering in Markdown
			return path.join('public', decodeURIComponent(nextImageParam));
		}
	} catch {
		return path.join('public', imgSrc);
	}
	return imgSrc;
}

// Convert local/public path to website URL
function toWebsiteUrl(imgSrc) {
	if (!imgSrc || imgSrc === 'N/A') return 'N/A';
	const relativePath = imgSrc.replace(/^public[\\/]/, '');
	return `https://myprivatetutoronline.com/${relativePath.replace(/\\/g, '/')}`;
}

// Helper to safely get nested property or fallback
function safe(obj, prop, fallback = 'N/A') {
	return obj && obj[prop] !== undefined && obj[prop] !== null ?
			obj[prop]
		:	fallback;
}

// Compute aspect ratio safely in x:1 format
function computeAspectRatio(width, height) {
	if (width && height && height !== 0) {
		return `${(width / height).toFixed(1)}:1`;
	}
	return 'N/A';
}

// Check if two aspect ratios differ by more than a tolerance (20%)
function isAspectRatioSignificantlyDifferent(actual, target, tolerance = 0.2) {
	if (!actual || !target || actual === 'N/A' || target === 'N/A') return false;
	const [actualNum] = actual.split(':').map(Number);
	const [targetNum] = target.split(':').map(Number);
	return Math.abs(actualNum - targetNum) / targetNum > tolerance;
}

// Determine if an image "needs a fix"
function needsFix(img) {
	const desktop = img.desktop || {};
	const mobile = img.mobile || {};

	const actualAspect = computeAspectRatio(
		safe(desktop, 'naturalWidth'),
		safe(desktop, 'naturalHeight'),
	);
	const desktopAspect = computeAspectRatio(
		safe(desktop, 'displayedWidth'),
		safe(desktop, 'displayedHeight'),
	);
	const mobileAspect = computeAspectRatio(
		safe(mobile, 'displayedWidth'),
		safe(mobile, 'displayedHeight'),
	);

	const diff =
		isAspectRatioSignificantlyDifferent(actualAspect, desktopAspect) ||
		isAspectRatioSignificantlyDifferent(actualAspect, mobileAspect) ||
		isAspectRatioSignificantlyDifferent(desktopAspect, mobileAspect) ||
		safe(img, 'needsMobileVersion', false);

	return diff;
}

// Deduplicate images by path + desktopAspect + mobileAspect
const seenImages = new Set();

// Helper to create rectangle HTML for aspect ratio
function rectangleHTML(aspect, maxHeight = 50, colour = '#ADD8E6') {
	if (!aspect || aspect === 'N/A') return 'N/A';
	const ratio = parseFloat(aspect.split(':')[0]);
	const width = Math.round(ratio * maxHeight);
	return `<div style="width:${width}px;height:${maxHeight}px;background-color:${colour};border:1px solid #000;"></div>`;
}

// Gather all images needing attention for the summary table
const summaryRows = [];

data.forEach((page) => {
	if (!Array.isArray(page.images)) return;
	page.images.forEach((img) => {
		if (!needsFix(img)) return;

		const desktop = img.desktop || {};
		const mobile = img.mobile || {};

		const imgPath = getPublicPath(img.src);
		const actualAspect = computeAspectRatio(
			safe(desktop, 'naturalWidth'),
			safe(desktop, 'naturalHeight'),
		);
		const desktopAspect = computeAspectRatio(
			safe(desktop, 'displayedWidth'),
			safe(desktop, 'displayedHeight'),
		);
		const mobileAspect = computeAspectRatio(
			safe(mobile, 'displayedWidth'),
			safe(mobile, 'displayedHeight'),
		);

		const key = `${imgPath}|${desktopAspect}|${mobileAspect}`;
		if (seenImages.has(key)) return;
		seenImages.add(key);

		const displayDiff = 'Yes';
		const area =
			(safe(desktop, 'displayedWidth', 0) || 0) *
			(safe(desktop, 'displayedHeight', 0) || 0);

		summaryRows.push({
			imgPath,
			actualAspect,
			desktopAspect,
			mobileAspect,
			displayDiff,
			area,
		});
	});
});

// Sort table by largest image area first
summaryRows.sort((a, b) => b.area - a.area);

// Start Markdown with legend
let md = `
**Legend**:
- Thumbnail = Small preview of the image
- Actual Image Aspect Ratio = Ratio of the source image
- Desktop Site Requires x Aspect Ratio = Approximate ratio of the desktop container
- Mobile Site Requires x Aspect Ratio = Approximate ratio of the mobile container
- Does Desktop/Mobile require different images? = Indicates if separate images are likely needed
- Real URL to check = Original image URL on the website
- Rectangles visualise the aspect ratio of the images and containers
`;

// Add summary table
if (summaryRows.length > 0) {
	md += `\n\n## Summary of Images Needing Attention\n\n`;
	md += `| Thumbnail | Display Diff | Real URL | Actual Rect | Desktop Rect | Mobile Rect |\n`;
	md += `| --------- | ------------ | -------- | ----------- | ------------ | ----------- |\n`;
	summaryRows.forEach((row) => {
		md += `| <img src="${escapeMarkdown(row.imgPath)}" width="100"> | ${row.displayDiff} | [Open Image](${escapeMarkdown(toWebsiteUrl(row.imgPath))}) | ${rectangleHTML(row.actualAspect, 30, '#ADD8E6')} | ${rectangleHTML(row.desktopAspect, 30, '#90EE90')} | ${rectangleHTML(row.mobileAspect, 30, '#FFB6C1')} |\n`;
	});
	md += `\n`;
}

// Render each page individually
data.forEach((page) => {
	let pageName;
	try {
		pageName =
			page.url ?
				new URL(page.url).pathname === '/' ?
					'Landing Page'
				:	page.url
			:	'Unknown Page';
	} catch {
		pageName = page.url || 'Invalid URL';
	}

	md += `\n# ${pageName}\n`;

	if (!Array.isArray(page.images) || page.images.length === 0) {
		md += '_No images found on this page_\n\n';
		return;
	}

	const needsFixImages = page.images.filter(needsFix);
	const fineImages = page.images.filter((img) => !needsFix(img));

	function renderImages(images, category) {
		if (images.length === 0) return;
		md += `\n## ${category}\n`;
		images.forEach((img, idx) => {
			md += `\n### Image ${idx + 1}\n`;

			const imgPath = getPublicPath(img.src);
			const imgFileName = path.basename(imgPath);
			const desktop = img.desktop || {};
			const mobile = img.mobile || {};

			const rawAspect = computeAspectRatio(
				safe(desktop, 'naturalWidth'),
				safe(desktop, 'naturalHeight'),
			);
			const desktopAspect = computeAspectRatio(
				safe(desktop, 'displayedWidth'),
				safe(desktop, 'displayedHeight'),
			);
			const mobileAspect = computeAspectRatio(
				safe(mobile, 'displayedWidth'),
				safe(mobile, 'displayedHeight'),
			);

			md += `![${imgFileName}](${escapeMarkdown(imgPath)})\n\n`;
			md += `**Source:** ${escapeMarkdown(imgPath)}\n\n`;
			md += `**Open Image:** [Link](${escapeMarkdown(toWebsiteUrl(imgPath))})\n\n`;
			md += `**Raw Image Width x Height:** ${safe(desktop, 'naturalWidth')} x ${safe(desktop, 'naturalHeight')}\n\n`;
			md += `**Container Width x Height (Desktop):** ${safe(desktop, 'displayedWidth')} x ${safe(desktop, 'displayedHeight')}\n\n`;
			md += `**Container Width x Height (Mobile):** ${safe(mobile, 'displayedWidth')} x ${safe(mobile, 'displayedHeight')}\n\n`;

			// Commenting out numeric aspect ratios
			// md += `**Raw Aspect Ratio:** ${rawAspect}\n\n`;
			// md += `**Container Aspect Ratio (Desktop):** ${desktopAspect}\n\n`;
			// md += `**Container Aspect Ratio (Mobile):** ${mobileAspect}\n\n`;

			md += `**Current Orientation:** ${safe(img, 'orientation')}\n\n`;
			md += `**Preferential Orientation (Desktop):** ${safe(desktop, 'naturalWidth') >= safe(desktop, 'naturalHeight') ? 'Landscape' : 'Portrait'}\n\n`;
			md += `**Preferential Orientation (Mobile):** ${safe(mobile, 'displayedWidth') >= safe(mobile, 'displayedHeight') ? 'Landscape' : 'Portrait'}\n\n`;

			const displayDiff =
				(
					isAspectRatioSignificantlyDifferent(rawAspect, desktopAspect) ||
					isAspectRatioSignificantlyDifferent(rawAspect, mobileAspect) ||
					isAspectRatioSignificantlyDifferent(desktopAspect, mobileAspect)
				) ?
					'Yes'
				:	'No';

			md += `**Display Difference:** ${displayDiff}\n\n`;

			// Keep rectangles
			md += `**Actual Image Rectangle:** ${rectangleHTML(rawAspect, 30, '#ADD8E6')}\n\n`;
			md += `**Desktop Container Rectangle:** ${rectangleHTML(desktopAspect, 30, '#90EE90')}\n\n`;
			md += `**Mobile Container Rectangle:** ${rectangleHTML(mobileAspect, 30, '#FFB6C1')}\n\n`;
		});
	}

	renderImages(needsFixImages, 'Images Needing Attention');
	renderImages(fineImages, 'Images Displaying Correctly');
});

// Save Markdown
fs.writeFileSync(outputPath, md, 'utf-8');
console.log(`✅ Markdown file generated at ${outputPath}`);
