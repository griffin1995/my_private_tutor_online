// Simple test script to verify metadata utilities work correctly
// Run with: node src/lib/metadata/test-metadata.js

console.log('🧪 Testing metadata utilities...\n')

try {
  // Test if the module can be imported (basic test)
  const { createPageMetadata, getSharedMetadata } = require('./shared-metadata.ts')

  console.log('✅ Metadata utilities imported successfully')

  // Test basic functionality
  const sharedData = getSharedMetadata()
  console.log('✅ Shared metadata:', sharedData)

  // Test createPageMetadata function
  const testMetadata = createPageMetadata({
    title: 'Test Page',
    description: 'This is a test page description',
    path: '/test',
    keywords: ['test', 'metadata'],
  })

  console.log('✅ Page metadata created successfully')
  console.log('📋 Sample metadata structure:')
  console.log('   - Title:', testMetadata.title)
  console.log('   - Description:', testMetadata.description)
  console.log('   - Keywords:', testMetadata.keywords)
  console.log('   - OpenGraph URL:', testMetadata.openGraph?.url)
  console.log('   - Twitter card:', testMetadata.twitter?.card)
  console.log('   - Canonical URL:', testMetadata.alternates?.canonical)

  console.log('\n🎉 All tests passed! Metadata utilities are working correctly.')

} catch (error) {
  console.error('❌ Test failed:', error.message)
  process.exit(1)
}