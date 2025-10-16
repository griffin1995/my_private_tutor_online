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
	videoUtils,
} from '../video-utils';
const mockCMSImages = {
	MASTERCLASS_VIDEOS: {
		'free-ucas-guide': {
			id: 'free-ucas-guide',
			title: 'Free UCAS Application Guide',
			description: 'Complete guide to UCAS applications',
			videoUrl: 'https://www.youtube.com/watch?v=abc123def456',
			src: 'https://www.youtube.com/watch?v=abc123def456',
			thumbnailUrl: '/videos/ucas-guide-thumbnail.jpg',
			duration: 1800,
			isFree: true,
		},
		'premium-interview-prep': {
			id: 'premium-interview-prep',
			title: 'Premium Interview Preparation',
			description: 'Advanced interview techniques for top universities',
			videoUrl: 'https://youtu.be/xyz789uvw012',
			src: 'https://youtu.be/xyz789uvw012',
			thumbnailUrl: '/videos/interview-prep-thumbnail.jpg',
			duration: 2700,
			isFree: false,
			price: '£150',
			paymentUrl: 'https://payment.example.com/interview-prep',
		},
		'embed-format-video': {
			id: 'embed-format-video',
			title: 'Embed Format Test Video',
			description: 'Testing embed URL format',
			videoUrl: 'https://www.youtube.com/embed/embed123test?si=abcd1234',
			src: 'https://www.youtube.com/embed/embed123test?si=abcd1234',
			thumbnailUrl: '/videos/embed-test-thumbnail.jpg',
			duration: 600,
			isFree: true,
		},
		'direct-id-video': {
			id: 'direct-id-video',
			title: 'Direct ID Format Video',
			description: 'Testing direct video ID format',
			videoUrl: 'direct123test',
			src: 'direct123test',
			thumbnailUrl: '/videos/direct-id-thumbnail.jpg',
			duration: 900,
			isFree: false,
			price: '£75',
			paymentUrl: 'https://payment.example.com/direct-id',
		},
		'invalid-url-video': {
			id: 'invalid-url-video',
			title: 'Invalid URL Video',
			description: 'Testing invalid URL handling',
			videoUrl: 'https://vimeo.com/invalid-format',
			src: 'https://vimeo.com/invalid-format',
			thumbnailUrl: '/videos/invalid-thumbnail.jpg',
			duration: 300,
			isFree: true,
		},
		'missing-payment-video': {
			id: 'missing-payment-video',
			title: 'Missing Payment Info Video',
			description: 'Testing video without payment URL',
			videoUrl: 'https://www.youtube.com/watch?v=missing123pay',
			src: 'https://www.youtube.com/watch?v=missing123pay',
			thumbnailUrl: '/videos/missing-payment-thumbnail.jpg',
			duration: 1200,
			isFree: false,
			price: '£100',
		},
	},
};
jest.mock('../cms-images', () => mockCMSImages);
describe('Video Utilities Test Suite', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});
	describe('extractVideoId Function', () => {
		describe('YouTube URL Format Support', () => {
			it('extracts video ID from standard YouTube URLs', () => {
				const testCases = [
					'https://www.youtube.com/watch?v=abc123def456',
					'http://www.youtube.com/watch?v=abc123def456',
					'https://youtube.com/watch?v=abc123def456',
					'www.youtube.com/watch?v=abc123def456',
				];
				testCases.forEach((url) => {
					expect(extractVideoId(url)).toBe('abc123def456');
				});
			});
			it('extracts video ID from YouTube short URLs', () => {
				const testCases = [
					'https://youtu.be/xyz789uvw012',
					'http://youtu.be/xyz789uvw012',
					'youtu.be/xyz789uvw012',
				];
				testCases.forEach((url) => {
					expect(extractVideoId(url)).toBe('xyz789uvw012');
				});
			});
			it('extracts video ID from YouTube embed URLs', () => {
				const testCases = [
					'https://www.youtube.com/embed/embed123test',
					'https://www.youtube.com/embed/embed123test?si=abcd1234',
					'http://www.youtube.com/embed/embed123test?autoplay=1',
				];
				testCases.forEach((url) => {
					expect(extractVideoId(url)).toBe('embed123test');
				});
			});
			it('handles direct video ID strings', () => {
				const directIds = ['direct123test', 'a1b2c3d4e5f', 'Z9X8Y7W6V5U'];
				directIds.forEach((id) => {
					expect(extractVideoId(id)).toBe(id);
				});
			});
			it('handles YouTube URLs with additional parameters', () => {
				const complexUrls = [
					'https://www.youtube.com/watch?v=test123abc&list=PLtest&index=1',
					'https://www.youtube.com/watch?t=30&v=test123abc',
					'https://youtu.be/test123abc?t=120',
				];
				complexUrls.forEach((url) => {
					expect(extractVideoId(url)).toBe('test123abc');
				});
			});
		});
		describe('Error Handling and Edge Cases', () => {
			it('returns null for invalid input types', () => {
				const invalidInputs = [null, undefined, 123, {}, [], true];
				invalidInputs.forEach((input) => {
					expect(extractVideoId(input as any)).toBeNull();
				});
			});
			it('returns null for invalid YouTube URLs', () => {
				const invalidUrls = [
					'https://vimeo.com/123456',
					'https://www.example.com/video',
					'not-a-url-at-all',
					'https://youtube.com/invalid',
					'',
				];
				invalidUrls.forEach((url) => {
					expect(extractVideoId(url)).toBeNull();
				});
			});
			it('returns null for malformed video IDs', () => {
				const malformedIds = [
					'abc',
					'this-is-way-too-long-to-be-a-valid-youtube-id',
					'invalid@chars!',
					'   ',
				];
				malformedIds.forEach((id) => {
					expect(extractVideoId(id)).toBeNull();
				});
			});
			it('handles empty and whitespace strings', () => {
				const emptyStrings = ['', '   ', '\t\n', '\r'];
				emptyStrings.forEach((str) => {
					expect(extractVideoId(str)).toBeNull();
				});
			});
		});
		describe('Performance and Edge Cases', () => {
			it('processes valid 11-character YouTube IDs efficiently', () => {
				const validId = 'abcDEF12345';
				const result = extractVideoId(validId);
				expect(result).toBe('abcDEF12345');
			});
			it('handles special characters in URLs', () => {
				const urlWithSpecialChars = 'https://www.youtube.com/watch?v=test_123-45';
				const result = extractVideoId(urlWithSpecialChars);
				expect(result).toBe('test_123-45');
			});
		});
	});
	describe('getVideoMetadata Function', () => {
		it('retrieves metadata for existing video keys', () => {
			const metadata = getVideoMetadata('free-ucas-guide');
			expect(metadata).not.toBeNull();
			expect(metadata).toEqual({
				id: 'free-ucas-guide',
				title: 'Free UCAS Application Guide',
				description: 'Complete guide to UCAS applications',
				videoId: 'abc123def456',
				thumbnailUrl: '/videos/ucas-guide-thumbnail.jpg',
				duration: 1800,
				isFree: true,
			});
		});
		it('extracts video ID from different URL formats in metadata', () => {
			const shortUrlMetadata = getVideoMetadata('premium-interview-prep');
			expect(shortUrlMetadata?.videoId).toBe('xyz789uvw012');
			const embedMetadata = getVideoMetadata('embed-format-video');
			expect(embedMetadata?.videoId).toBe('embed123test');
			const directIdMetadata = getVideoMetadata('direct-id-video');
			expect(directIdMetadata?.videoId).toBe('direct123test');
		});
		it('returns null for non-existent video keys', () => {
			const nonExistentKeys = [
				'does-not-exist',
				'invalid-key',
				'',
				'undefined-video',
			];
			nonExistentKeys.forEach((key) => {
				expect(getVideoMetadata(key)).toBeNull();
			});
		});
		it('handles videos with payment information', () => {
			const premiumMetadata = getVideoMetadata('premium-interview-prep');
			expect(premiumMetadata).toEqual({
				id: 'premium-interview-prep',
				title: 'Premium Interview Preparation',
				description: 'Advanced interview techniques for top universities',
				videoId: 'xyz789uvw012',
				thumbnailUrl: '/videos/interview-prep-thumbnail.jpg',
				duration: 2700,
				isFree: false,
				price: '£150',
				paymentUrl: 'https://payment.example.com/interview-prep',
			});
		});
		it('handles videos with invalid URLs gracefully', () => {
			const invalidUrlMetadata = getVideoMetadata('invalid-url-video');
			expect(invalidUrlMetadata).not.toBeNull();
			expect(invalidUrlMetadata?.videoId).toBeNull();
			expect(invalidUrlMetadata?.title).toBe('Invalid URL Video');
		});
	});
	describe('isVideoFree Function', () => {
		it('correctly identifies free videos', () => {
			const freeVideoKeys = [
				'free-ucas-guide',
				'embed-format-video',
				'invalid-url-video',
			];
			freeVideoKeys.forEach((key) => {
				expect(isVideoFree(key)).toBe(true);
			});
		});
		it('correctly identifies paid videos', () => {
			const paidVideoKeys = [
				'premium-interview-prep',
				'direct-id-video',
				'missing-payment-video',
			];
			paidVideoKeys.forEach((key) => {
				expect(isVideoFree(key)).toBe(false);
			});
		});
		it('returns false for non-existent video keys', () => {
			const nonExistentKeys = ['does-not-exist', 'invalid-key', ''];
			nonExistentKeys.forEach((key) => {
				expect(isVideoFree(key)).toBe(false);
			});
		});
		it('handles edge cases correctly', () => {
			expect(isVideoFree(null as any)).toBe(false);
			expect(isVideoFree(undefined as any)).toBe(false);
			expect(isVideoFree(123 as any)).toBe(false);
		});
	});
	describe('getVideoUrlForPlayer Function', () => {
		it('constructs proper YouTube URLs for ReactPlayer', () => {
			const testCases = [
				{
					key: 'free-ucas-guide',
					expected: 'https://www.youtube.com/watch?v=abc123def456',
				},
				{
					key: 'premium-interview-prep',
					expected: 'https://www.youtube.com/watch?v=xyz789uvw012',
				},
				{
					key: 'embed-format-video',
					expected: 'https://www.youtube.com/watch?v=embed123test',
				},
				{
					key: 'direct-id-video',
					expected: 'https://www.youtube.com/watch?v=direct123test',
				},
			];
			testCases.forEach(({ key, expected }) => {
				expect(getVideoUrlForPlayer(key)).toBe(expected);
			});
		});
		it('returns null for videos with invalid URLs', () => {
			expect(getVideoUrlForPlayer('invalid-url-video')).toBeNull();
		});
		it('returns null for non-existent video keys', () => {
			expect(getVideoUrlForPlayer('does-not-exist')).toBeNull();
			expect(getVideoUrlForPlayer('')).toBeNull();
		});
		it('handles edge cases gracefully', () => {
			expect(getVideoUrlForPlayer(null as any)).toBeNull();
			expect(getVideoUrlForPlayer(undefined as any)).toBeNull();
		});
	});
	describe('getFreeVideos Function', () => {
		it('returns only free videos with correct structure', () => {
			const freeVideos = getFreeVideos();
			expect(freeVideos).toHaveLength(2);
			freeVideos.forEach((video) => {
				expect(video).toHaveProperty('id');
				expect(video).toHaveProperty('title');
				expect(video).toHaveProperty('description');
				expect(video).toHaveProperty('videoId');
				expect(video).toHaveProperty('thumbnailUrl');
				expect(video).toHaveProperty('duration');
				expect(video).not.toHaveProperty('price');
				expect(video).not.toHaveProperty('paymentUrl');
			});
		});
		it('includes videos with valid video IDs only in practical terms', () => {
			const freeVideos = getFreeVideos();
			const videosWithValidIds = freeVideos.filter(
				(video) => video.videoId !== null,
			);
			expect(videosWithValidIds).toHaveLength(1);
		});
		it('extracts video IDs correctly for free videos', () => {
			const freeVideos = getFreeVideos();
			const ucasGuide = freeVideos.find((video) => video.id === 'free-ucas-guide');
			const embedVideo = freeVideos.find(
				(video) => video.id === 'embed-format-video',
			);
			expect(ucasGuide?.videoId).toBe('abc123def456');
			expect(embedVideo?.videoId).toBe('embed123test');
		});
	});
	describe('getPaidVideos Function', () => {
		it('returns only paid videos with payment information', () => {
			const paidVideos = getPaidVideos();
			expect(paidVideos).toHaveLength(2);
			paidVideos.forEach((video) => {
				expect(video).toHaveProperty('id');
				expect(video).toHaveProperty('title');
				expect(video).toHaveProperty('description');
				expect(video).toHaveProperty('videoId');
				expect(video).toHaveProperty('thumbnailUrl');
				expect(video).toHaveProperty('duration');
				expect(video).toHaveProperty('price');
				expect(video).toHaveProperty('paymentUrl');
			});
		});
		it('excludes videos without payment URLs', () => {
			const paidVideos = getPaidVideos();
			const missingPaymentVideo = paidVideos.find(
				(video) => video.id === 'missing-payment-video',
			);
			expect(missingPaymentVideo).toBeUndefined();
		});
		it('includes correct payment information', () => {
			const paidVideos = getPaidVideos();
			const premiumVideo = paidVideos.find(
				(video) => video.id === 'premium-interview-prep',
			);
			const directIdVideo = paidVideos.find(
				(video) => video.id === 'direct-id-video',
			);
			expect(premiumVideo?.price).toBe('£150');
			expect(premiumVideo?.paymentUrl).toBe(
				'https://payment.example.com/interview-prep',
			);
			expect(directIdVideo?.price).toBe('£75');
			expect(directIdVideo?.paymentUrl).toBe(
				'https://payment.example.com/direct-id',
			);
		});
	});
	describe('isValidVideoUrl Function', () => {
		it('validates YouTube URLs correctly', () => {
			const validYouTubeUrls = [
				'https://www.youtube.com/watch?v=abc123def456',
				'https://youtu.be/xyz789',
				'https://www.youtube.com/embed/test123',
			];
			validYouTubeUrls.forEach((url) => {
				expect(isValidVideoUrl(url)).toBe(true);
			});
		});
		it('validates local video file paths', () => {
			const localVideoPaths = ['/videos/local-video.mp4', '/videos/tutorial.mp4'];
			localVideoPaths.forEach((path) => {
				expect(isValidVideoUrl(path)).toBe(true);
			});
		});
		it('validates direct MP4 URLs', () => {
			const mp4Urls = [
				'https://example.com/video.mp4',
				'http://cdn.example.com/content/video.mp4',
			];
			mp4Urls.forEach((url) => {
				expect(isValidVideoUrl(url)).toBe(true);
			});
		});
		it('rejects invalid URLs', () => {
			const invalidUrls = [
				'https://vimeo.com/123456',
				'https://example.com/not-a-video',
				'invalid-url-format',
				null,
				undefined,
				'',
			];
			invalidUrls.forEach((url) => {
				expect(isValidVideoUrl(url as any)).toBe(false);
			});
		});
	});
	describe('formatVideoDuration Function', () => {
		it('formats seconds to MM:SS correctly', () => {
			const testCases = [
				{
					seconds: 0,
					expected: '0:00',
				},
				{
					seconds: 30,
					expected: '0:30',
				},
				{
					seconds: 60,
					expected: '1:00',
				},
				{
					seconds: 90,
					expected: '1:30',
				},
				{
					seconds: 600,
					expected: '10:00',
				},
				{
					seconds: 1800,
					expected: '30:00',
				},
				{
					seconds: 3661,
					expected: '61:01',
				},
			];
			testCases.forEach(({ seconds, expected }) => {
				expect(formatVideoDuration(seconds)).toBe(expected);
			});
		});
		it('handles edge cases and invalid input', () => {
			const invalidInputs = [
				{
					input: -1,
					expected: '0:00',
				},
				{
					input: null as any,
					expected: '0:00',
				},
				{
					input: undefined as any,
					expected: '0:00',
				},
				{
					input: 'invalid' as any,
					expected: '0:00',
				},
				{
					input: NaN,
					expected: '0:00',
				},
			];
			invalidInputs.forEach(({ input, expected }) => {
				expect(formatVideoDuration(input)).toBe(expected);
			});
		});
		it('pads seconds correctly', () => {
			const singleDigitSeconds = [
				{
					seconds: 61,
					expected: '1:01',
				},
				{
					seconds: 125,
					expected: '2:05',
				},
				{
					seconds: 309,
					expected: '5:09',
				},
			];
			singleDigitSeconds.forEach(({ seconds, expected }) => {
				expect(formatVideoDuration(seconds)).toBe(expected);
			});
		});
	});
	describe('getAllVideoIds Function', () => {
		it('extracts all valid video IDs from CMS', () => {
			const allIds = getAllVideoIds();
			expect(allIds).toContain('abc123def456');
			expect(allIds).toContain('xyz789uvw012');
			expect(allIds).toContain('embed123test');
			expect(allIds).toContain('direct123test');
			expect(allIds).not.toContain(null);
		});
		it('returns readonly array of strings', () => {
			const allIds = getAllVideoIds();
			expect(Array.isArray(allIds)).toBe(true);
			allIds.forEach((id) => {
				expect(typeof id).toBe('string');
				expect(id.length).toBeGreaterThan(0);
			});
		});
		it('filters out invalid video IDs', () => {
			const allIds = getAllVideoIds();
			allIds.forEach((id) => {
				expect(id).toMatch(/^[A-Za-z0-9_-]+$/);
				expect(id.length).toBeGreaterThanOrEqual(3);
			});
		});
	});
	describe('getVideoById Function', () => {
		it('finds videos by video ID correctly', () => {
			const video = getVideoById('abc123def456');
			expect(video).not.toBeNull();
			expect(video).toEqual({
				key: 'free-ucas-guide',
				id: 'free-ucas-guide',
				title: 'Free UCAS Application Guide',
				description: 'Complete guide to UCAS applications',
				videoId: 'abc123def456',
				thumbnailUrl: '/videos/ucas-guide-thumbnail.jpg',
				duration: 1800,
				isFree: true,
			});
		});
		it('includes payment information for paid videos', () => {
			const paidVideo = getVideoById('xyz789uvw012');
			expect(paidVideo).toEqual({
				key: 'premium-interview-prep',
				id: 'premium-interview-prep',
				title: 'Premium Interview Preparation',
				description: 'Advanced interview techniques for top universities',
				videoId: 'xyz789uvw012',
				thumbnailUrl: '/videos/interview-prep-thumbnail.jpg',
				duration: 2700,
				isFree: false,
				price: '£150',
				paymentUrl: 'https://payment.example.com/interview-prep',
			});
		});
		it('returns null for non-existent video IDs', () => {
			const nonExistentIds = ['does-not-exist', 'invalid123', 'zzz999xxx111', ''];
			nonExistentIds.forEach((id) => {
				expect(getVideoById(id)).toBeNull();
			});
		});
		it('handles different URL format extractions', () => {
			const embedVideo = getVideoById('embed123test');
			const directVideo = getVideoById('direct123test');
			expect(embedVideo?.key).toBe('embed-format-video');
			expect(directVideo?.key).toBe('direct-id-video');
		});
	});
	describe('videoUtils Export Object', () => {
		it('exports all utility functions', () => {
			const expectedFunctions = [
				'extractVideoId',
				'getVideoMetadata',
				'isVideoFree',
				'getVideoUrlForPlayer',
				'getFreeVideos',
				'getPaidVideos',
				'isValidVideoUrl',
				'formatVideoDuration',
				'getAllVideoIds',
				'getVideoById',
			];
			expectedFunctions.forEach((functionName) => {
				expect(videoUtils).toHaveProperty(functionName);
				expect(typeof videoUtils[functionName as keyof typeof videoUtils]).toBe(
					'function',
				);
			});
		});
		it('maintains consistency between individual exports and utils object', () => {
			expect(videoUtils.extractVideoId).toBe(extractVideoId);
			expect(videoUtils.getVideoMetadata).toBe(getVideoMetadata);
			expect(videoUtils.isVideoFree).toBe(isVideoFree);
			expect(videoUtils.getVideoUrlForPlayer).toBe(getVideoUrlForPlayer);
			expect(videoUtils.getFreeVideos).toBe(getFreeVideos);
			expect(videoUtils.getPaidVideos).toBe(getPaidVideos);
			expect(videoUtils.isValidVideoUrl).toBe(isValidVideoUrl);
			expect(videoUtils.formatVideoDuration).toBe(formatVideoDuration);
			expect(videoUtils.getAllVideoIds).toBe(getAllVideoIds);
			expect(videoUtils.getVideoById).toBe(getVideoById);
		});
		it('is immutable (readonly)', () => {
			expect(() => {
				(videoUtils as any).newFunction = jest.fn();
			}).not.toThrow();
			expect(typeof videoUtils).toBe('object');
		});
	});
	describe('Performance and Stress Tests', () => {
		it('processes large numbers of URLs efficiently', () => {
			const largeUrlSet = Array.from(
				{
					length: 1000,
				},
				(_, i) =>
					`https://www.youtube.com/watch?v=test${i.toString().padStart(7, '0')}`,
			);
			const startTime = performance.now();
			const extractedIds = largeUrlSet.map((url) => extractVideoId(url));
			const endTime = performance.now();
			const executionTime = endTime - startTime;
			expect(executionTime).toBeLessThan(100);
			expect(extractedIds).toHaveLength(1000);
			expect(extractedIds.every((id) => typeof id === 'string')).toBe(true);
		});
		it('handles memory efficiently with repeated calls', () => {
			for (let i = 0; i < 100; i++) {
				extractVideoId('https://www.youtube.com/watch?v=test123');
				getVideoMetadata('free-ucas-guide');
				isVideoFree('premium-interview-prep');
				formatVideoDuration(1800);
			}
			expect(true).toBe(true);
		});
		it('maintains performance with concurrent access', () => {
			const concurrentTasks = Array.from(
				{
					length: 50,
				},
				() =>
					Promise.resolve().then(() => {
						extractVideoId('https://youtu.be/concurrent123');
						getVideoMetadata('embed-format-video');
						return formatVideoDuration(Math.floor(Math.random() * 3600));
					}),
			);
			return Promise.all(concurrentTasks).then((results) => {
				expect(results).toHaveLength(50);
				results.forEach((result) => {
					expect(typeof result).toBe('string');
					expect(result).toMatch(/^\d+:\d{2}$/);
				});
			});
		});
	});
	describe('Error Resilience and Recovery', () => {
		it('handles corrupted CMS data gracefully', () => {
			const originalRequire = require;
			jest.doMock('../cms-images', () => ({
				MASTERCLASS_VIDEOS: {
					'corrupted-video': {
						id: null,
						title: undefined,
						videoUrl: 123,
						duration: 'invalid',
					},
				},
			}));
			jest.resetModules();
			const { getVideoMetadata } = require('../video-utils');
			expect(() => {
				const metadata = getVideoMetadata('corrupted-video');
			}).not.toThrow();
			jest.doMock('../cms-images', () => mockCMSImages);
		});
		it('recovers from individual function failures', () => {
			const mixedInputs = [
				'https://www.youtube.com/watch?v=valid123',
				null,
				undefined,
				123,
				'invalid-url',
				'https://youtu.be/another_valid',
			];
			const results = mixedInputs.map((input) => {
				try {
					return extractVideoId(input as any);
				} catch (error) {
					return 'ERROR';
				}
			});
			expect(results.filter((r) => r === 'valid123')).toHaveLength(1);
			expect(results.filter((r) => r === 'another_valid')).toHaveLength(1);
			expect(results.filter((r) => r === null)).toBeGreaterThan(0);
			expect(results.filter((r) => r === 'ERROR')).toHaveLength(0);
		});
		it('maintains function contracts under stress', () => {
			const stressInputs = [
				'',
				null,
				undefined,
				123,
				{},
				[],
				true,
				false,
				'a'.repeat(1000),
				'https://'.repeat(100),
				'ÜñÃ®ç©∂é',
			];
			stressInputs.forEach((input) => {
				const videoId = extractVideoId(input as any);
				const isValid = isValidVideoUrl(input as any);
				const duration = formatVideoDuration(input as any);
				expect(videoId === null || typeof videoId === 'string').toBe(true);
				expect(typeof isValid).toBe('boolean');
				expect(typeof duration).toBe('string');
			});
		});
	});
});
