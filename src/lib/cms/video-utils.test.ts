import { describe, it, expect, beforeEach } from '@jest/globals';
import {
	extractVideoId,
	getVideoMetadata,
	isVideoFree,
	getVideoUrlForPlayer,
	getFreeVideos,
	getPaidVideos,
	isValidVideoUrl,
	formatVideoDuration,
	getAllVideoIds,
	getVideoById,
} from './video-utils';
const mockVideoData = {
	testFreeVideo: {
		id: 'test-free-video',
		src: 'https://www.youtube.com/embed/testVideoId123',
		title: 'Test Free Video',
		description: 'A test video for unit testing',
		duration: 120,
		isFree: true,
		thumbnailUrl: '/images/test-thumbnail.png',
		videoUrl: 'https://www.youtube.com/watch?v=testVideoId123',
		videoId: 'testVideoId123',
	},
	testPaidVideo: {
		id: 'test-paid-video',
		src: 'https://www.youtube.com/embed/testPaidId456',
		title: 'Test Paid Video',
		description: 'A test paid video for unit testing',
		duration: 180,
		isFree: false,
		thumbnailUrl: '/images/test-paid-thumbnail.png',
		videoUrl: 'https://www.youtube.com/watch?v=testPaidId456',
		videoId: 'testPaidId456',
		price: '£29.99',
		paymentUrl: 'https://buy.stripe.com/test123',
	},
	testLocalVideo: {
		id: 'test-local-video',
		src: '/videos/test-local-video.mp4',
		title: 'Test Local Video',
		description: 'A test local video file',
		duration: 90,
		isFree: false,
		thumbnailUrl: '/images/test-local-thumbnail.png',
		videoUrl: '/videos/test-local-video.mp4',
		videoId: null,
		price: '£19.99',
		paymentUrl: 'https://buy.stripe.com/test456',
	},
};
jest.mock('./cms-images', () => ({
	MASTERCLASS_VIDEOS: mockVideoData,
}));
describe('Video ID Extraction', () => {
	describe('extractVideoId', () => {
		it('should extract video ID from standard YouTube URLs', () => {
			const testUrls = [
				'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
				'https://youtube.com/watch?v=dQw4w9WgXcQ',
				'http://www.youtube.com/watch?v=dQw4w9WgXcQ',
				'www.youtube.com/watch?v=dQw4w9WgXcQ',
			];
			testUrls.forEach((url) => {
				expect(extractVideoId(url)).toBe('dQw4w9WgXcQ');
			});
		});
		it('should extract video ID from YouTube short URLs', () => {
			const testUrls = [
				'https://youtu.be/dQw4w9WgXcQ',
				'http://youtu.be/dQw4w9WgXcQ',
				'youtu.be/dQw4w9WgXcQ',
			];
			testUrls.forEach((url) => {
				expect(extractVideoId(url)).toBe('dQw4w9WgXcQ');
			});
		});
		it('should extract video ID from YouTube embed URLs', () => {
			const testUrls = [
				'https://www.youtube.com/embed/dQw4w9WgXcQ',
				'https://www.youtube.com/embed/dQw4w9WgXcQ?si=abc123',
				'http://www.youtube.com/embed/dQw4w9WgXcQ?start=30',
			];
			testUrls.forEach((url) => {
				expect(extractVideoId(url)).toBe('dQw4w9WgXcQ');
			});
		});
		it('should return video ID when already a clean ID', () => {
			expect(extractVideoId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
			expect(extractVideoId('testVideoId123')).toBe('testVideoId123');
		});
		it('should return null for invalid URLs', () => {
			const invalidUrls = [
				'',
				'not-a-url',
				'https://vimeo.com/123456',
				'https://example.com/video',
				'invalid-video-id-too-long',
				null,
				undefined,
			];
			invalidUrls.forEach((url) => {
				expect(extractVideoId(url as any)).toBeNull();
			});
		});
		it('should handle URLs with additional parameters', () => {
			const urlsWithParams = [
				'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s',
				'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLexample&index=1',
				'https://youtu.be/dQw4w9WgXcQ?t=45',
			];
			urlsWithParams.forEach((url) => {
				expect(extractVideoId(url)).toBe('dQw4w9WgXcQ');
			});
		});
	});
});
describe('CMS Video Integration', () => {
	describe('getVideoMetadata', () => {
		it('should retrieve video metadata for existing videos', () => {
			const metadata = getVideoMetadata('testFreeVideo');
			expect(metadata).not.toBeNull();
			expect(metadata?.id).toBe('test-free-video');
			expect(metadata?.title).toBe('Test Free Video');
			expect(metadata?.isFree).toBe(true);
			expect(metadata?.duration).toBe(120);
			expect(metadata?.videoId).toBe('testVideoId123');
		});
		it('should return null for non-existent videos', () => {
			const metadata = getVideoMetadata('nonExistentVideo');
			expect(metadata).toBeNull();
		});
		it('should handle paid video metadata correctly', () => {
			const metadata = getVideoMetadata('testPaidVideo');
			expect(metadata).not.toBeNull();
			expect(metadata?.isFree).toBe(false);
			expect(metadata?.price).toBe('£29.99');
			expect(metadata?.paymentUrl).toBe('https://buy.stripe.com/test123');
		});
		it('should handle local video files', () => {
			const metadata = getVideoMetadata('testLocalVideo');
			expect(metadata).not.toBeNull();
			expect(metadata?.videoId).toBeNull();
			expect(metadata?.price).toBe('£19.99');
		});
	});
	describe('isVideoFree', () => {
		it('should correctly identify free videos', () => {
			expect(isVideoFree('testFreeVideo')).toBe(true);
			expect(isVideoFree('testPaidVideo')).toBe(false);
			expect(isVideoFree('nonExistentVideo')).toBe(false);
		});
	});
	describe('getVideoUrlForPlayer', () => {
		it('should return properly formatted YouTube URLs', () => {
			const url = getVideoUrlForPlayer('testFreeVideo');
			expect(url).toBe('https://www.youtube.com/watch?v=testVideoId123');
		});
		it('should return null for videos without valid IDs', () => {
			const url = getVideoUrlForPlayer('testLocalVideo');
			expect(url).toBeNull();
		});
		it('should return null for non-existent videos', () => {
			const url = getVideoUrlForPlayer('nonExistentVideo');
			expect(url).toBeNull();
		});
	});
	describe('getFreeVideos', () => {
		it('should return only free videos', () => {
			const freeVideos = getFreeVideos();
			expect(freeVideos).toHaveLength(1);
			expect(freeVideos[0].id).toBe('test-free-video');
			expect(freeVideos[0].isFree).toBe(true);
		});
		it('should return array with proper video metadata structure', () => {
			const freeVideos = getFreeVideos();
			const video = freeVideos[0];
			expect(video).toHaveProperty('id');
			expect(video).toHaveProperty('title');
			expect(video).toHaveProperty('description');
			expect(video).toHaveProperty('videoId');
			expect(video).toHaveProperty('thumbnailUrl');
			expect(video).toHaveProperty('duration');
		});
	});
	describe('getPaidVideos', () => {
		it('should return only paid videos with payment information', () => {
			const paidVideos = getPaidVideos();
			expect(paidVideos).toHaveLength(2);
			paidVideos.forEach((video) => {
				expect(video.isFree).toBe(false);
				expect(video).toHaveProperty('price');
				expect(video).toHaveProperty('paymentUrl');
				expect(video.price).toMatch(/£\d+\.\d{2}/);
				expect(video.paymentUrl).toMatch(/^https:\/\//);
			});
		});
	});
});
describe('Video Utility Functions', () => {
	describe('formatVideoDuration', () => {
		it('should format duration correctly', () => {
			expect(formatVideoDuration(0)).toBe('0:00');
			expect(formatVideoDuration(30)).toBe('0:30');
			expect(formatVideoDuration(60)).toBe('1:00');
			expect(formatVideoDuration(90)).toBe('1:30');
			expect(formatVideoDuration(3600)).toBe('60:00');
			expect(formatVideoDuration(3665)).toBe('61:05');
		});
		it('should handle edge cases', () => {
			expect(formatVideoDuration(-1)).toBe('0:00');
			expect(formatVideoDuration(NaN)).toBe('0:00');
			expect(formatVideoDuration('invalid' as any)).toBe('0:00');
		});
		it('should pad seconds correctly', () => {
			expect(formatVideoDuration(65)).toBe('1:05');
			expect(formatVideoDuration(125)).toBe('2:05');
			expect(formatVideoDuration(3605)).toBe('60:05');
		});
	});
	describe('isValidVideoUrl', () => {
		it('should validate YouTube URLs correctly', () => {
			const validUrls = [
				'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
				'https://youtu.be/dQw4w9WgXcQ',
				'https://www.youtube.com/embed/dQw4w9WgXcQ',
			];
			validUrls.forEach((url) => {
				expect(isValidVideoUrl(url)).toBe(true);
			});
		});
		it('should validate local video files correctly', () => {
			const validUrls = ['/videos/test.mp4', 'https://example.com/video.mp4'];
			validUrls.forEach((url) => {
				expect(isValidVideoUrl(url)).toBe(true);
			});
		});
		it('should reject invalid URLs', () => {
			const invalidUrls = [
				'',
				'not-a-url',
				'https://example.com/notavideo',
				null,
				undefined,
				'ftp://example.com/video.mp4',
			];
			invalidUrls.forEach((url) => {
				expect(isValidVideoUrl(url as any)).toBe(false);
			});
		});
	});
	describe('getAllVideoIds', () => {
		it('should return all valid video IDs from CMS', () => {
			const videoIds = getAllVideoIds();
			expect(videoIds).toContain('testVideoId123');
			expect(videoIds).toContain('testPaidId456');
			expect(videoIds).toHaveLength(2);
		});
		it('should exclude null video IDs', () => {
			const videoIds = getAllVideoIds();
			expect(videoIds).not.toContain(null);
			expect(videoIds).not.toContain(undefined);
		});
	});
	describe('getVideoById', () => {
		it('should find video by video ID', () => {
			const video = getVideoById('testVideoId123');
			expect(video).not.toBeNull();
			expect(video?.id).toBe('test-free-video');
			expect(video?.key).toBe('testFreeVideo');
			expect(video?.isFree).toBe(true);
		});
		it('should return null for non-existent video ID', () => {
			const video = getVideoById('nonExistentId');
			expect(video).toBeNull();
		});
		it('should include complete metadata in search result', () => {
			const video = getVideoById('testPaidId456');
			expect(video).toHaveProperty('key');
			expect(video).toHaveProperty('id');
			expect(video).toHaveProperty('title');
			expect(video).toHaveProperty('description');
			expect(video).toHaveProperty('videoId');
			expect(video).toHaveProperty('thumbnailUrl');
			expect(video).toHaveProperty('duration');
			expect(video).toHaveProperty('isFree');
			expect(video).toHaveProperty('price');
			expect(video).toHaveProperty('paymentUrl');
		});
	});
});
describe('Performance Optimization', () => {
	describe('Video ID Extraction Performance', () => {
		it('should extract video IDs quickly for batch operations', () => {
			const testUrls = Array(1000).fill(
				'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			);
			const startTime = performance.now();
			testUrls.forEach((url) => extractVideoId(url));
			const endTime = performance.now();
			const duration = endTime - startTime;
			expect(duration).toBeLessThan(100);
		});
		it('should handle CMS metadata retrieval efficiently', () => {
			const videoKeys = ['testFreeVideo', 'testPaidVideo', 'testLocalVideo'];
			const startTime = performance.now();
			for (let i = 0; i < 100; i++) {
				videoKeys.forEach((key) => {
					getVideoMetadata(key);
					isVideoFree(key);
					getVideoUrlForPlayer(key);
				});
			}
			const endTime = performance.now();
			const duration = endTime - startTime;
			expect(duration).toBeLessThan(50);
		});
	});
});
describe('OptimizedVideoPlayer Integration', () => {
	describe('Component Compatibility', () => {
		it('should provide data in format expected by OptimizedVideoPlayer', () => {
			const metadata = getVideoMetadata('testFreeVideo');
			const videoUrl = getVideoUrlForPlayer('testFreeVideo');
			expect(metadata).toHaveProperty('title');
			expect(metadata).toHaveProperty('videoId');
			expect(metadata).toHaveProperty('thumbnailUrl');
			expect(videoUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
		});
		it('should handle edge cases gracefully for component consumption', () => {
			const metadata = getVideoMetadata('nonExistent');
			expect(metadata).toBeNull();
			const localMetadata = getVideoMetadata('testLocalVideo');
			expect(localMetadata?.videoId).toBeNull();
			const localUrl = getVideoUrlForPlayer('testLocalVideo');
			expect(localUrl).toBeNull();
		});
	});
});
export { mockVideoData };
export default describe;
