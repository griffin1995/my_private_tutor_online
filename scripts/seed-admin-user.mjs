// CONTEXT7 SOURCE: /payloadcms/payload - Automated admin user creation for Payload CMS
// ARCHITECTURE REASON: CLI-based user seeding for development setup

import dotenv from 'dotenv';
import { getPayload } from 'payload';
import config from '../src/payload.config.ts';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

console.log('🔄 Creating Payload CMS admin user...');

try {
	const payload = await getPayload({ config });

	// Check if admin user already exists
	const existingUsers = await payload.find({
		collection: 'users',
		where: {
			email: {
				equals: 'admin@myprivatetutoronline.co.uk',
			},
		},
	});

	if (existingUsers.docs.length > 0) {
		console.log('✅ Admin user already exists!');
		console.log('📧 Email: admin@myprivatetutoronline.co.uk');
		process.exit(0);
	}

	// Create admin user
	const adminUser = await payload.create({
		collection: 'users',
		data: {
			name: 'Elizabeth Burrows',
			email: 'admin@myprivatetutoronline.co.uk',
			password: 'AdminPassword123!', // Change this after first login
			role: 'admin',
		},
	});

	console.log('✅ Admin user created successfully!');
	console.log('📧 Email: admin@myprivatetutoronline.co.uk');
	console.log('🔑 Password: AdminPassword123!');
	console.log('⚠️  Please change your password after first login!');
	console.log('\n📍 Access Payload CMS at: http://localhost:3000/admin/cms');

	process.exit(0);
} catch (error) {
	console.error('❌ Failed to create admin user:', error.message);
	process.exit(1);
}
