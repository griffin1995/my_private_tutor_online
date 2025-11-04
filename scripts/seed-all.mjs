// CONTEXT7 SOURCE: /payloadcms/payload - Master seeding script for complete Payload CMS setup
// ARCHITECTURE REASON: Automated CLI-based database initialization

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting complete Payload CMS seeding process...\n');

// Function to run a script
function runScript(scriptPath, description) {
	return new Promise((resolve, reject) => {
		console.log(`📋 ${description}...`);
		const child = spawn('npx', ['tsx', scriptPath], {
			stdio: 'inherit',
			cwd: join(__dirname, '..'),
		});

		child.on('close', (code) => {
			if (code !== 0) {
				reject(new Error(`${description} failed with code ${code}`));
			} else {
				console.log(`✅ ${description} complete!\n`);
				resolve();
			}
		});

		child.on('error', (error) => {
			reject(error);
		});
	});
}

try {
	// Run seeding scripts in sequence
	await runScript(
		join(__dirname, 'seed-admin-user.mjs'),
		'Creating admin user'
	);
	await runScript(
		join(__dirname, 'seed-recognition-cards.mjs'),
		'Seeding recognition cards'
	);

	console.log('═══════════════════════════════════════════════════════════');
	console.log('🎉 PAYLOAD CMS SETUP COMPLETE!');
	console.log('═══════════════════════════════════════════════════════════');
	console.log('\n📍 Access Points:');
	console.log('   • Payload CMS Admin: http://localhost:3000/admin/cms');
	console.log('   • Homepage (with recognition cards): http://localhost:3000');
	console.log('\n🔑 Admin Credentials:');
	console.log('   • Email: admin@myprivatetutoronline.co.uk');
	console.log('   • Password: AdminPassword123!');
	console.log('   ⚠️  Change password after first login!');
	console.log('\n💾 MongoDB:');
	console.log('   • Container: mongodb-tutor-online (running on port 27017)');
	console.log('   • Database: my-tutor-online');
	console.log('\n✨ Next Steps:');
	console.log('   1. Start dev server: npm run dev');
	console.log('   2. Visit http://localhost:3000/admin/cms');
	console.log('   3. Log in with admin credentials');
	console.log('   4. Verify recognition cards in About Section');
	console.log('═══════════════════════════════════════════════════════════\n');

	process.exit(0);
} catch (error) {
	console.error('\n❌ Seeding failed:', error.message);
	process.exit(1);
}
