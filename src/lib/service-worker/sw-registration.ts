'use client';

interface ServiceWorkerConfig {
	aboutCacheName: string;
	cacheVersion: string;
	criticalResources: string[];
	dynamicResources: string[];
	cacheExpiry: number;
}
const aboutSectionSWConfig: ServiceWorkerConfig = {
	aboutCacheName: 'about-section-cache-v1',
	cacheVersion: '1.0.0',
	criticalResources: [
		'/images/team/elizabeth-burrows-founder-spare.jpg',
		'/images/media/tatler-logo.png',
		'/images/media/schools-guide-uk-logo.png',
	],
	dynamicResources: ['/api/about-content', '/api/performance-metrics'],
	cacheExpiry: 24 * 60 * 60 * 1000,
};
export const registerAboutSectionSW = async (): Promise<boolean> => {
	return false;
};
export const unregisterAboutSectionSW = async (): Promise<boolean> => {
	if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
		return false;
	}
	try {
		const registrations = await navigator.serviceWorker.getRegistrations();
		for (const registration of registrations) {
			if (registration.scope.includes('about')) {
				await registration.unregister();
				console.log('About section service worker unregistered');
			}
		}
		return true;
	} catch (error) {
		console.error('About section service worker unregistration failed:', error);
		return false;
	}
};
export const preloadAboutResources = async (): Promise<void> => {
	if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
		navigator.serviceWorker.controller.postMessage({
			type: 'PRELOAD_ABOUT_RESOURCES',
			resources: aboutSectionSWConfig.criticalResources,
		});
	}
};
export const invalidateAboutCache = async (): Promise<void> => {
	if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
		navigator.serviceWorker.controller.postMessage({
			type: 'INVALIDATE_ABOUT_CACHE',
			cacheNames: [aboutSectionSWConfig.aboutCacheName],
		});
	}
};
export { aboutSectionSWConfig };
export type { ServiceWorkerConfig };
