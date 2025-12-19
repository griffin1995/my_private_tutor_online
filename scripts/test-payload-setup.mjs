// Test script to verify Payload CMS setup and database connectivity
import dotenv from 'dotenv';
import { getPayload } from 'payload';
import config from '../payload.config.ts';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔍 Testing Payload CMS setup...\n');

// Debug environment variables
console.log('📋 Environment check:');
console.log('  - DATABASE_URL:', process.env.DATABASE_URL ? '✅ Found' : '❌ Missing');
console.log('  - PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ Found' : '❌ Missing');
console.log('  - SERVER_URL:', process.env.SERVER_URL ? '✅ Found' : '❌ Missing');

try {
  // Initialize Payload
  console.log('\n1. Initializing Payload...');
  const payload = await getPayload({ config });
  console.log('✅ Payload initialized successfully');

  // Test database connection
  console.log('\n2. Testing database connectivity...');
  const dbStatus = await payload.db.ping();
  console.log('✅ Database connection successful');

  // Test collections exist
  console.log('\n3. Checking available collections...');
  const collections = Object.keys(payload.config.collections);
  console.log('📝 Available collections:', collections.join(', '));

  // Test globals exist
  console.log('\n4. Checking available globals...');
  const globals = Object.keys(payload.config.globals || {});
  console.log('🌍 Available globals:', globals.join(', '));

  // Test basic CRUD - check if we can query users
  console.log('\n5. Testing basic query functionality...');
  const usersCount = await payload.count({ collection: 'users' });
  console.log(`👥 Users collection: ${usersCount.totalDocs} user(s) found`);

  console.log('\n🎉 Payload CMS setup verification completed successfully!');
  console.log('✨ You can now access the admin interface at http://localhost:3000/admin');

} catch (error) {
  console.error('\n❌ Payload CMS setup verification failed:');
  console.error(error.message);
  if (error.stack) {
    console.error('\nStack trace:', error.stack);
  }
  process.exit(1);
}

process.exit(0);