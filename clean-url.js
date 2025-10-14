const fs = require('fs');
const path = require('path');

// Paths
const inputPath = path.join(__dirname, 'raw-image-report.json'); // output from Puppeteer
const outputPath = path.join(__dirname, 'image-report-final.json');

// Widely used aspect ratios
const commonRatios = [
	{ label: '1:1', value: 1 },
	{ label: '4:3', value: 4 / 3 },
	{ label: '3:2', value: 3 / 2 },
	{ label: '16:9', value: 16 / 9 },
	{ label: '16:10', value: 16 / 10 },
	{ label: '21:9', value: 21 / 9 },
	{ label: '2:1', value: 2 },
	{ label: '3:1', value: 3 },
	{ label: '5:4', value: 5 / 4 },
];

// Decode Next.js _next/image URLs to actual paths
function decodeNextImageUrl(url) {
	try {
		const match = url.match(/\?url=(.+?)(&|$)/);
		if (match) return decodeURIComponent(match[1]);
		return url;
	} catch {
		return url;
	}
}

// Compute exact aspect ratio (width:height)
function exactRatio(width, height) {
	if (!width || !height) return 'NaN';
	const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
	const divisor = gcd(width, height);
	return `${width / divisor}:${height / divisor}`;
}

// Find closest standard aspect ratio
function closestRatio(width, height) {
	if (!width || !height) return 'NaN';
	const dec = width / height;
	let closest = commonRatios[0];
	let minDiff = Math.abs(dec - closest.value);

	for (let i = 1; i < commonRatios.length; i++) {
		const diff = Math.abs(dec - commonRatios[i].value);
		if (diff < minDiff) {
			minDiff = diff;
			closest = commonRatios[i];
		}
	}
	return closest.label;
}

// Read raw JSON
const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Process each image
data.forEach((page) => {
	page.images.forEach((img) => {
		img.src = decodeNextImageUrl(img.src);
		img.aspectRatio = exactRatio(img.width, img.height);
		img.closestTo = closestRatio(img.width, img.height);
	});
});

// Save final JSON
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`✅ Processed all images and saved to ${outputPath}`);
