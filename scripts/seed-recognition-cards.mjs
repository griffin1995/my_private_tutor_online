// CONTEXT7 SOURCE: /payloadcms/payload - Automated recognition cards seeding for About Section
// ARCHITECTURE REASON: CLI-based data seeding for development setup

import dotenv from 'dotenv';
import { getPayload } from 'payload';
import config from '../src/payload.config.ts';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

console.log('🔄 Seeding recognition cards...');

const recognitionCardsData = [
	{
		headerText: 'As featured in',
		contentType: 'icon',
		iconPath:
			'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
		iconAlt: 'Tatler Address Book 2025',
		footerText: "Tatler's Address Book",
		sortOrder: 1,
		status: 'published',
	},
	{
		headerText: 'As recommended by',
		contentType: 'icon',
		iconPath:
			'M9 11.75A2.25 2.25 0 1111.75 9 2.25 2.25 0 019 11.75zm0-3.5A1.25 1.25 0 1010.25 9 1.25 1.25 0 009 8.25z M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zm0 18H4V4h16z',
		iconAlt: "School Guide's Top Pick",
		footerText: "'Top Pick' for Private Tuition",
		sortOrder: 2,
		status: 'published',
	},
	{
		headerText: 'Trusted by',
		contentType: 'icon',
		iconPath:
			'M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4zm0 2.18l6 3V12c0 4.52-3.12 8.89-7 10-3.88-1.11-7-5.48-7-10V7.18l6-3z M12 6a3 3 0 100 6 3 3 0 000-6z',
		iconAlt: 'Royal Clientele',
		footerText: 'Royal Families',
		sortOrder: 3,
		status: 'published',
	},
];

try {
	const payload = await getPayload({ config });

	// Check if recognition cards already exist
	const existingCards = await payload.find({
		collection: 'recognition-cards',
		limit: 1,
	});

	if (existingCards.docs.length > 0) {
		console.log('✅ Recognition cards already exist!');
		console.log(`📚 Found ${existingCards.totalDocs} existing card(s)`);
		process.exit(0);
	}

	// Create recognition cards
	console.log(`📝 Creating ${recognitionCardsData.length} recognition cards...`);

	for (const cardData of recognitionCardsData) {
		const card = await payload.create({
			collection: 'recognition-cards',
			data: cardData,
		});
		console.log(`✅ Created: "${card.headerText}" (${card.contentType})`);
	}

	console.log('\n✅ All recognition cards created successfully!');
	console.log('📍 View in Payload CMS: http://localhost:3000/admin/cms/collections/recognition-cards');
	console.log('🏠 View on homepage: http://localhost:3000 (About Section)');

	process.exit(0);
} catch (error) {
	console.error('❌ Failed to seed recognition cards:', error.message);
	console.error(error);
	process.exit(1);
}
