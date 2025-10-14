const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

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

function closestRatio(width, height) {
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

const outputPath = path.join(__dirname, 'image-display-report.json');
const baseUrl = 'http://localhost:3000';
const visited = new Set();
const toVisit = [baseUrl];

fs.writeFileSync(outputPath, '[\n');
console.log(`🚀 Starting scraping from ${baseUrl}`);

// generic sleep function compatible with all Puppeteer versions
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Scroll the page progressively to trigger lazy-loading
async function scrollPage(page) {
	await page.evaluate(async () => {
		const step = 200;
		const delay = (ms) => new Promise((res) => setTimeout(res, ms));
		for (let y = 0; y < document.body.scrollHeight; y += step) {
			window.scrollTo(0, y);
			await delay(100);
		}
		window.scrollTo(0, 0);
	});
}

// Capture image info from page
async function captureImages(page) {
	return await page.evaluate(() => {
		const getImageData = (img) => {
			const parent = img.parentElement;
			const rect = img.getBoundingClientRect();
			const styles = window.getComputedStyle(img);
			const visible = rect.width > 0 && rect.height > 0;

			return {
				src: img.src,
				naturalWidth: img.naturalWidth,
				naturalHeight: img.naturalHeight,
				displayedWidth: img.clientWidth,
				displayedHeight: img.clientHeight,
				parentWidth: parent ? parent.clientWidth : null,
				parentHeight: parent ? parent.clientHeight : null,
				boundingRect: {
					width: rect.width,
					height: rect.height,
					top: rect.top,
					left: rect.left,
				},
				styles: {
					maxWidth: styles.maxWidth,
					maxHeight: styles.maxHeight,
					objectFit: styles.objectFit,
					objectPosition: styles.objectPosition,
				},
				devicePixelRatio: window.devicePixelRatio,
				renderedPixelsWidth: img.clientWidth * window.devicePixelRatio,
				renderedPixelsHeight: img.clientHeight * window.devicePixelRatio,
				visible,
				alt: img.alt || null,
				ariaLabel: img.getAttribute('aria-label') || null,
				srcset: img.srcset || null,
				sizes: img.sizes || null,
			};
		};

		return Array.from(document.querySelectorAll('img')).map(getImageData);
	});
}

(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.setRequestInterception(true);
	page.on('request', (req) => {
		if (['font', 'stylesheet', 'script'].includes(req.resourceType()))
			req.abort();
		else req.continue();
	});

	while (toVisit.length) {
		const url = toVisit.pop();
		if (visited.has(url)) continue;
		visited.add(url);

		console.log(`🌐 Visiting: ${url}`);

		try {
			// DESKTOP
			await page.setViewport({ width: 1440, height: 900 });
			try {
				await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
			} catch (navErr) {
				console.warn(`⚠️ Navigation timeout for desktop at ${url}, continuing...`);
			}
			await scrollPage(page);
			console.log(`⏱ Waiting 10s for desktop content to fully load...`);
			await sleep(10000);

			let desktopImages = [];
			try {
				desktopImages = await captureImages(page);
				console.log(`🖼 Found ${desktopImages.length} images on desktop`);
			} catch (imgErr) {
				console.warn(`⚠️ Error capturing desktop images at ${url}, continuing...`);
			}

			// MOBILE
			await page.setViewport({ width: 375, height: 667 });
			try {
				await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
			} catch (navErr) {
				console.warn(`⚠️ Navigation timeout for mobile at ${url}, continuing...`);
			}
			await scrollPage(page);
			console.log(`⏱ Waiting 10s for mobile content to fully load...`);
			await sleep(10000);

			let mobileImages = [];
			try {
				mobileImages = await captureImages(page);
				console.log(
					`🖼 Captured mobile rendering for ${mobileImages.length} images`,
				);
			} catch (imgErr) {
				console.warn(`⚠️ Error capturing mobile images at ${url}, continuing...`);
			}

			// Merge desktop & mobile data
			const enhancedImages = desktopImages.map((img) => {
				const mobileImg = mobileImages.find((m) => m.src === img.src) || {};

				const widthScale = img.displayedWidth / img.naturalWidth;
				const heightScale = img.displayedHeight / img.naturalHeight;
				const overallScale = Math.sqrt(widthScale * heightScale);
				const displayedAspectRatio = img.displayedWidth / img.displayedHeight;
				const naturalAspectRatio = img.naturalWidth / img.naturalHeight;

				let orientation = 'landscape';
				if (displayedAspectRatio < 1) orientation = 'portrait';
				else if (displayedAspectRatio === 1) orientation = 'square';

				console.log(`📸 Processing image: ${img.src}`);
				console.log(
					`   Desktop: ${img.displayedWidth}x${img.displayedHeight}, Mobile: ${mobileImg.displayedWidth || 0}x${mobileImg.displayedHeight || 0}`,
				);
				console.log(
					`   Overall scale: ${overallScale.toFixed(2)}, Visible: ${img.visible}`,
				);

				return {
					src: img.src,
					desktop: img,
					mobile: mobileImg,
					scaling: {
						widthScale: widthScale.toFixed(2),
						heightScale: heightScale.toFixed(2),
						overallScale: overallScale.toFixed(2),
						upscaled: overallScale > 1,
						downscaled: overallScale < 1,
					},
					aspectRatio: {
						exact: `${img.naturalWidth}:${img.naturalHeight}`,
						closestToStandard: closestRatio(img.naturalWidth, img.naturalHeight),
						displayed: `${img.displayedWidth}:${img.displayedHeight}`,
						displayedClosestStandard: closestRatio(
							img.displayedWidth,
							img.displayedHeight,
						),
					},
					orientation,
					needsLandscapeSwap: naturalAspectRatio < 1 && displayedAspectRatio > 1,
					needsMobileVersion:
						(mobileImg.displayedWidth &&
							mobileImg.displayedWidth > img.naturalWidth) ||
						(mobileImg.displayedHeight &&
							mobileImg.displayedHeight > img.naturalHeight),
				};
			});

			fs.appendFileSync(
				outputPath,
				JSON.stringify({ url, images: enhancedImages }, null, 2) + ',\n',
			);
			console.log(`💾 Saved report for ${url}`);

			const links = await page.evaluate(() =>
				Array.from(document.querySelectorAll('a[href]'))
					.map((a) => a.href)
					.filter((href) => href.startsWith(window.location.origin)),
			);
			console.log(`🔗 Found ${links.length} internal links on ${url}`);
			links.forEach((link) => {
				if (!visited.has(link)) toVisit.push(link);
			});
		} catch (err) {
			console.error(`❌ Error processing ${url}: ${err.message}, continuing...`);
		}
	}

	await browser.close();
	fs.appendFileSync(outputPath, '{}\n]');
	console.log(`✅ Image display report saved to ${outputPath}`);
})();
