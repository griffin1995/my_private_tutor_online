module.exports = {
	ci: {
		collect: {
			url: [
				'http://localhost:3000',
				'http://localhost:3000/about',
				'http://localhost:3000/testimonials',
				'http://localhost:3000/video-masterclasses',
				'http://localhost:3000/subject-tuition',
				'http://localhost:3000/how-it-works',
			],
			numberOfRuns: 3,
			settings: {
				chromeFlags: '--no-sandbox --disable-dev-shm-usage',
				preset: 'desktop',
			},
		},
		assert: {
			assertions: {
				'categories:performance': ['warn', { minScore: 0.75 }],
				'categories:accessibility': ['error', { minScore: 0.90 }],
				'categories:seo': ['warn', { minScore: 0.85 }],
				'categories:best-practices': ['warn', { minScore: 0.80 }],
				'audits:first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
				'audits:largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
				'audits:cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
		startServerCommand: 'npm run dev',
		startServerReadyPattern: 'Ready in',
		startServerReadyTimeout: 120000,
	},
};