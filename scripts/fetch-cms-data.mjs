// CONTEXT7 SOURCE: /payloadcms/payload - REST API client for build-time data fetching
// ARCHITECTURE REASON: Fetch data at build time, convert to static JSON for synchronous frontend access

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'https://payload-cms-xxx.railway.app';
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY;

if (!PAYLOAD_API_KEY) {
  console.error('❌ PAYLOAD_API_KEY environment variable is required');
  process.exit(1);
}

/**
 * Fetch a collection from Payload CMS API
 * @param {string} collectionSlug - Collection slug (e.g., 'testimonials', 'faq')
 * @returns {Promise<Array>} Array of documents
 */
const fetchCollection = async (collectionSlug) => {
  const url = `${PAYLOAD_API_URL}/api/${collectionSlug}?limit=1000&where[status][equals]=published`;

  console.log(`📥 Fetching ${collectionSlug} from ${url}...`);

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${PAYLOAD_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const docs = data.docs || [];

    console.log(`✅ Fetched ${docs.length} ${collectionSlug} documents`);
    return docs;
  } catch (error) {
    console.error(`❌ Failed to fetch ${collectionSlug}:`, error.message);
    throw error;
  }
};

/**
 * Clean document to remove internal Payload fields
 * @param {object} doc - Document from Payload
 * @returns {object} Cleaned document
 */
const cleanDocument = (doc) => {
  // Remove internal Payload fields
  const { _status, __v, createdAt, updatedAt, ...cleanedDoc } = doc;
  return cleanedDoc;
};

/**
 * Sync all CMS data from Payload to static JSON files
 */
const syncCMSData = async () => {
  const startTime = Date.now();
  console.log('🚀 Starting CMS data sync...\n');

  // Content directory
  const contentDir = path.join(__dirname, '..', 'content');
  await fs.mkdir(contentDir, { recursive: true });

  try {
    // Fetch all collections in parallel for speed
    const [testimonials, faqs, pages, recognitionCards] = await Promise.all([
      fetchCollection('testimonials'),
      fetchCollection('faq'),
      fetchCollection('pages'),
      fetchCollection('recognition-cards'),
    ]);

    // Clean documents to remove internal fields
    const cleanedTestimonials = testimonials.map(cleanDocument);
    const cleanedFaqs = faqs.map(cleanDocument);
    const cleanedPages = pages.map(cleanDocument);
    const cleanedRecognitionCards = recognitionCards.map(cleanDocument);

    // Write all files in parallel
    await Promise.all([
      fs.writeFile(
        path.join(contentDir, 'testimonials.json'),
        JSON.stringify({ testimonials: cleanedTestimonials }, null, 2)
      ),
      fs.writeFile(
        path.join(contentDir, 'faq.json'),
        JSON.stringify({ faqs: cleanedFaqs }, null, 2)
      ),
      fs.writeFile(
        path.join(contentDir, 'pages.json'),
        JSON.stringify({ pages: cleanedPages }, null, 2)
      ),
      fs.writeFile(
        path.join(contentDir, 'recognition-cards.json'),
        JSON.stringify({ recognitionCards: cleanedRecognitionCards }, null, 2)
      ),
    ]);

    // Write sync metadata
    const metadata = {
      lastSync: new Date().toISOString(),
      collections: {
        testimonials: cleanedTestimonials.length,
        faqs: cleanedFaqs.length,
        pages: cleanedPages.length,
        recognitionCards: cleanedRecognitionCards.length,
      },
      totalDocuments: cleanedTestimonials.length + cleanedFaqs.length + cleanedPages.length + cleanedRecognitionCards.length,
      syncDuration: Date.now() - startTime,
    };

    await fs.writeFile(
      path.join(contentDir, '.sync-metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('\n✅ CMS data sync completed successfully!');
    console.log(`📊 Total documents synced: ${metadata.totalDocuments}`);
    console.log(`⏱️  Duration: ${duration}s\n`);

    console.log('📁 Files created:');
    console.log(`   - content/testimonials.json (${cleanedTestimonials.length} items)`);
    console.log(`   - content/faq.json (${cleanedFaqs.length} items)`);
    console.log(`   - content/pages.json (${cleanedPages.length} items)`);
    console.log(`   - content/recognition-cards.json (${cleanedRecognitionCards.length} items)`);
    console.log(`   - content/.sync-metadata.json (metadata)\n`);

  } catch (error) {
    console.error('\n❌ CMS data sync failed:', error);
    process.exit(1);
  }
};

// Run sync
syncCMSData();
