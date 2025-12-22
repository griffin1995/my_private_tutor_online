/**
 * Image utilities for debugging and validation
 */

import { blogPosts } from '@/data/blog-posts';

/**
 * Analyse all blog post images and report potential issues
 */
function analyseBlogpostImages() {
  const analysis = blogPosts.map(post => {
    const hasImage = Boolean(post.image && post.image.trim() !== '');
    const isValidPath = hasImage && !post.image.includes('undefined') && !post.image.includes('null');

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      category: post.category,
      originalImage: post.image,
      hasImage,
      isValidPath,
      status: isValidPath ? 'valid' : hasImage ? 'invalid' : 'missing'
    };
  });

  const summary = {
    total: blogPosts.length,
    valid: analysis.filter(p => p.status === 'valid').length,
    invalid: analysis.filter(p => p.status === 'invalid').length,
    missing: analysis.filter(p => p.status === 'missing').length
  };

  return {
    analysis,
    summary,
    issues: analysis.filter(p => p.status !== 'valid')
  };
}

/**
 * Check if an image URL is accessible
 */
async function checkImageAccessibility(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Batch check image accessibility
 */
async function batchCheckImages(imageUrls: string[]): Promise<Array<{url: string, accessible: boolean}>> {
  const results = await Promise.allSettled(
    imageUrls.map(async (url) => ({
      url,
      accessible: await checkImageAccessibility(url)
    }))
  );

  return results.map((result, index) => ({
    url: imageUrls[index],
    accessible: result.status === 'fulfilled' ? result.value.accessible : false
  }));
}

/**
 * Get unique blog image paths
 */
function getUniqueBlogImagePaths(): string[] {
  const imagePaths = blogPosts
    .map(post => post.image)
    .filter(image => image && image.trim() !== '')
    .filter((image, index, array) => array.indexOf(image) === index);

  return imagePaths;
}

/**
 * Debug: Log current image analysis to console
 */
export function debugBlogImages() {
  if (process.env.NODE_ENV === 'development') {
    const analysis = analyseBlogpostImages();

    console.group('Blog Images Analysis');
    console.log('Summary:', analysis.summary);

    if (analysis.issues.length > 0) {
      console.group('Issues Found:');
      analysis.issues.forEach(issue => {
        console.log(`Post ${issue.id} (${issue.slug}): ${issue.status} - ${issue.originalImage}`);
      });
      console.groupEnd();
    }

    console.log('All unique image paths:', getUniqueBlogImagePaths());
    console.groupEnd();
  }
}