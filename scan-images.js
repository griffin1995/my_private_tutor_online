const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const baseUrl = 'http://localhost:3000';
	const visited = new Set();
	const toVisit = [baseUrl];

	const allPages = []; // collect all pages and images

	while (toVisit.length) {
		const url = toVisit.pop();
		if (visited.has(url)) continue;
		visited.add(url);

		await page.goto(url, { waitUntil: 'networkidle0' });

		// Get all internal links
		const links = await page.evaluate(() =>
			Array.from(document.querySelectorAll('a[href]'))
				.map((a) => a.href)
				.filter((href) => href.startsWith(window.location.origin)),
		);

		// Add new links to queue
		links.forEach((link) => {
			if (!visited.has(link)) toVisit.push(link);
		});

		// Collect images
		const images = await page.evaluate(() =>
			Array.from(document.querySelectorAll('img')).map((img) => ({
				src: img.src,
				width: img.clientWidth,
				height: img.clientHeight,
				aspectRatio: (img.clientWidth / img.clientHeight).toFixed(2),
			})),
		);

		console.log(`Images on ${url}:`);
		console.table(images);

		allPages.push({ url, images });
	}

	await browser.close();

	// Save to JSON
	const outputPath = path.join(__dirname, 'raw-image-report.json');
	fs.writeFileSync(outputPath, JSON.stringify(allPages, null, 2), 'utf-8');
	console.log(`✅ Saved all images to ${outputPath}`);
})();
