'use client';

export type ConversionEventType =
	| 'about_section_view'
	| 'founder_image_view'
	| 'credentials_interaction'
	| 'video_engagement'
	| 'scroll_milestone'
	| 'time_on_section'
	| 'exit_intent'
	| 'cta_impression'
	| 'trust_signal_view'
	| 'mobile_optimization';
export type ABTestVariant = 'control' | 'variant_a' | 'variant_b' | 'variant_c';
export interface ConversionEvent {
	type: ConversionEventType;
	timestamp: number;
	variant: ABTestVariant;
	sessionId: string;
	metadata: {
		scrollPercentage?: number;
		timeOnSection?: number;
		viewport?: {
			width: number;
			height: number;
		};
		deviceType?: 'mobile' | 'tablet' | 'desktop';
		engagementScore?: number;
		coordinates?: {
			x: number;
			y: number;
		};
		performanceMetrics?: {
			loadTime: number;
			renderTime: number;
			interactionDelay: number;
		};
	};
	properties?: Record<string, any>;
}
export interface ConversionFunnelStage {
	stage: string;
	name: string;
	requiredEvents: ConversionEventType[];
	completionRate?: number;
	averageTime?: number;
}
export interface ABTestConfig {
	testId: string;
	name: string;
	description: string;
	variants: {
		[K in ABTestVariant]?: {
			weight: number;
			config: Record<string, any>;
		};
	};
	dateRange: {
		start: Date;
		end: Date;
	};
	successMetrics: ConversionEventType[];
}
export class ConversionTracker {
	private events: ConversionEvent[] = [];
	private sessionId: string;
	private currentVariant: ABTestVariant = 'control';
	private sectionStartTime: number;
	private engagementScore: number = 0;
	private observers: IntersectionObserver[] = [];
	constructor() {
		this.sessionId = this.generateSessionId();
		this.sectionStartTime = Date.now();
		this.initializeTracking();
	}
	private generateSessionId(): string {
		return `about_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}
	private initializeTracking(): void {
		if (typeof window === 'undefined') return;
		this.setupIntersectionObservers();
		this.setupEngagementTracking();
		this.setupExitIntentTracking();
		this.assignABTestVariant();
	}
	private setupIntersectionObservers(): void {
		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.trackEvent('about_section_view', {
							scrollPercentage: this.getScrollPercentage(),
							viewport: this.getViewportDimensions(),
							deviceType: this.getDeviceType(),
						});
					}
				});
			},
			{
				threshold: 0.5,
				rootMargin: '50px',
			},
		);
		const imageObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.trackEvent('founder_image_view', {
							timeOnSection: Date.now() - this.sectionStartTime,
							engagementScore: this.engagementScore,
						});
						this.increaseEngagementScore(10);
					}
				});
			},
			{
				threshold: 0.8,
			},
		);
		const credentialsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.trackEvent('trust_signal_view', {
							scrollPercentage: this.getScrollPercentage(),
							timeOnSection: Date.now() - this.sectionStartTime,
						});
						this.increaseEngagementScore(15);
					}
				});
			},
			{
				threshold: 0.6,
			},
		);
		this.observers.push(sectionObserver, imageObserver, credentialsObserver);
		setTimeout(() => {
			const aboutSection = document.getElementById('about');
			const founderImage = document.querySelector('[alt*="Elizabeth Burrows"]');
			const credentialsSection = document.querySelector(
				'[role="group"][aria-labelledby="credentials-heading"]',
			);
			if (aboutSection) sectionObserver.observe(aboutSection);
			if (founderImage) imageObserver.observe(founderImage as Element);
			if (credentialsSection) credentialsObserver.observe(credentialsSection);
		}, 1000);
	}
	private setupEngagementTracking(): void {
		let scrollTimeout: NodeJS.Timeout;
		let lastScrollY = 0;
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
			lastScrollY = currentScrollY;
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				const scrollPercentage = this.getScrollPercentage();
				if (scrollPercentage >= 25 && scrollPercentage < 50) {
					this.trackEvent('scroll_milestone', {
						scrollPercentage: 25,
					});
					this.increaseEngagementScore(5);
				} else if (scrollPercentage >= 50 && scrollPercentage < 75) {
					this.trackEvent('scroll_milestone', {
						scrollPercentage: 50,
					});
					this.increaseEngagementScore(8);
				} else if (scrollPercentage >= 75) {
					this.trackEvent('scroll_milestone', {
						scrollPercentage: 75,
					});
					this.increaseEngagementScore(12);
				}
			}, 100);
		};
		const trackTimeOnSection = () => {
			const timeOnSection = Date.now() - this.sectionStartTime;
			if (timeOnSection >= 10000) {
				this.trackEvent('time_on_section', {
					timeOnSection,
				});
				this.increaseEngagementScore(20);
			}
		};
		window.addEventListener('scroll', handleScroll, {
			passive: true,
		});
		setTimeout(trackTimeOnSection, 10000);
	}
	private setupExitIntentTracking(): void {
		const handleMouseLeave = (e: MouseEvent) => {
			if (e.clientY <= 0) {
				this.trackEvent('exit_intent', {
					timeOnSection: Date.now() - this.sectionStartTime,
					engagementScore: this.engagementScore,
					scrollPercentage: this.getScrollPercentage(),
				});
			}
		};
		document.addEventListener('mouseleave', handleMouseLeave);
	}
	private assignABTestVariant(): void {
		try {
			const existingVariant = localStorage.getItem(
				'about_section_variant',
			) as ABTestVariant;
			if (
				existingVariant &&
				['control', 'variant_a', 'variant_b', 'variant_c'].includes(existingVariant)
			) {
				this.currentVariant = existingVariant;
			} else {
				const random = Math.random();
				if (random < 0.4) {
					this.currentVariant = 'control';
				} else if (random < 0.7) {
					this.currentVariant = 'variant_a';
				} else if (random < 0.9) {
					this.currentVariant = 'variant_b';
				} else {
					this.currentVariant = 'variant_c';
				}
				localStorage.setItem('about_section_variant', this.currentVariant);
			}
			this.trackEvent('about_section_view', {
				metadata: {
					assignedVariant: this.currentVariant,
				},
			});
		} catch (error) {
			console.warn('A/B testing variant assignment failed:', error);
			this.currentVariant = 'control';
		}
	}
	public trackEvent(
		type: ConversionEventType,
		additionalMetadata: Record<string, any> = {},
	): void {
		const event: ConversionEvent = {
			type,
			timestamp: Date.now(),
			variant: this.currentVariant,
			sessionId: this.sessionId,
			metadata: {
				scrollPercentage: this.getScrollPercentage(),
				timeOnSection: Date.now() - this.sectionStartTime,
				viewport: this.getViewportDimensions(),
				deviceType: this.getDeviceType(),
				engagementScore: this.engagementScore,
				performanceMetrics: this.getPerformanceMetrics(),
				...additionalMetadata,
			},
		};
		this.events.push(event);
		this.sendToAnalytics(event);
		if (process.env.NODE_ENV === 'development') {
			console.log('Conversion Event:', {
				type: event.type,
				variant: event.variant,
				engagement: event.metadata.engagementScore,
				time: Math.round((event.metadata.timeOnSection || 0) / 1000) + 's',
			});
		}
	}
	private sendToAnalytics(event: ConversionEvent): void {
		if (typeof window !== 'undefined' && (window as any).gtag) {
			(window as any).gtag('event', event.type, {
				event_category: 'about_section_conversion',
				event_label: event.variant,
				value: event.metadata.engagementScore,
				custom_parameters: {
					session_id: event.sessionId,
					time_on_section: event.metadata.timeOnSection,
					scroll_percentage: event.metadata.scrollPercentage,
					device_type: event.metadata.deviceType,
					viewport_width: event.metadata.viewport?.width,
					viewport_height: event.metadata.viewport?.height,
				},
			});
		}
		if (typeof window !== 'undefined') {
			fetch('/api/analytics/conversion-events', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(event),
			}).catch((error) => {
				console.warn('Failed to send conversion event:', error);
			});
		}
	}
	private getScrollPercentage(): number {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const scrollHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		return Math.round((scrollTop / scrollHeight) * 100);
	}
	private getViewportDimensions(): {
		width: number;
		height: number;
	} {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}
	private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
		const width = window.innerWidth;
		if (width < 768) return 'mobile';
		if (width < 1024) return 'tablet';
		return 'desktop';
	}
	private increaseEngagementScore(points: number): void {
		this.engagementScore += points;
	}
	private getPerformanceMetrics() {
		if (typeof window === 'undefined') return undefined;
		const navigation = performance.getEntriesByType(
			'navigation',
		)[0] as PerformanceNavigationTiming;
		return navigation ?
				{
					loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
					renderTime: Math.round(
						navigation.domContentLoadedEventEnd - navigation.fetchStart,
					),
					interactionDelay: Math.round(
						navigation.loadEventEnd - navigation.domContentLoadedEventEnd,
					),
				}
			:	undefined;
	}
	public getCurrentVariant(): ABTestVariant {
		return this.currentVariant;
	}
	public getConversionSummary() {
		return {
			sessionId: this.sessionId,
			variant: this.currentVariant,
			totalEvents: this.events.length,
			engagementScore: this.engagementScore,
			timeOnSection: Date.now() - this.sectionStartTime,
			events: this.events.map((e) => ({
				type: e.type,
				timestamp: e.timestamp,
			})),
		};
	}
	public cleanup(): void {
		this.observers.forEach((observer) => observer.disconnect());
		this.observers = [];
		this.events = [];
	}
}
let conversionTrackerInstance: ConversionTracker | null = null;
export const getConversionTracker = (): ConversionTracker => {
	if (!conversionTrackerInstance) {
		conversionTrackerInstance = new ConversionTracker();
	}
	return conversionTrackerInstance;
};
export const useConversionTracking = (
	p0: string,
	p1: {
		enableABTesting: boolean;
		trackScrollMilestones: boolean;
		trackExitIntent: boolean;
		trackVideoEngagement: boolean;
	},
) => {
	if (typeof window === 'undefined') return null;
	const tracker = getConversionTracker();
	return {
		tracker,
		trackEvent: (type: ConversionEventType, metadata?: Record<string, any>) =>
			tracker.trackEvent(type, metadata),
		getCurrentVariant: () => tracker.getCurrentVariant(),
		getConversionSummary: () => tracker.getConversionSummary(),
	};
};
export type { ABTestConfig, ConversionEvent, ConversionFunnelStage };
