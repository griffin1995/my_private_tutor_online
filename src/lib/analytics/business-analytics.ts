interface BusinessEvent {
	event: string;
	category: 'engagement' | 'conversion' | 'navigation' | 'error' | 'performance';
	action: string;
	label?: string;
	value?: number;
	metadata?: Record<string, string | number | boolean>;
	timestamp: number;
	sessionId: string;
	pageUrl: string;
	userId?: string;
}
export enum TutoringEvents {
	SERVICE_TIER_VIEW = 'service_tier_view',
	INQUIRY_FORM_START = 'inquiry_form_start',
	INQUIRY_FORM_SUBMIT = 'inquiry_form_submit',
	BOOTCAMP_REGISTER_COMPLETE = 'bootcamp_register_complete',
	TESTIMONIAL_VIEW = 'testimonial_view',
	VIDEO_PLAY = 'video_play',
	VIDEO_COMPLETE = 'video_complete',
	PAGE_VIEW = 'page_view',
	EXTERNAL_LINK_CLICK = 'external_link_click',
	PHONE_CALL_CLICK = 'phone_call_click',
	EMAIL_CLICK = 'email_click',
	}
interface AnalyticsProvider {
	name: string;
	enabled: boolean;
	track: (event: BusinessEvent) => Promise<void>;
	identify?: (userId: string, traits: Record<string, any>) => Promise<void>;
	group?: (groupId: string, traits: Record<string, any>) => Promise<void>;
}
class SessionManager {
	private sessionId: string;
	private sessionStart: number;
	private pageViews: number = 0;
	private events: BusinessEvent[] = [];
	constructor() {
		this.sessionId = this.generateSessionId();
		this.sessionStart = Date.now();
		this.loadSessionFromStorage();
	}
	private generateSessionId(): string {
		return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
	}
	private loadSessionFromStorage() {
		if (typeof window !== 'undefined') {
			const stored = sessionStorage.getItem('analytics_session');
			if (stored) {
				try {
					const session = JSON.parse(stored);
					if (Date.now() - session.start < 30 * 60 * 1000) {
						this.sessionId = session.id;
						this.sessionStart = session.start;
						this.pageViews = session.pageViews || 0;
					}
				} catch (e) {}
			}
			this.saveSessionToStorage();
		}
	}
	private saveSessionToStorage() {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem(
				'analytics_session',
				JSON.stringify({
					id: this.sessionId,
					start: this.sessionStart,
					pageViews: this.pageViews,
				}),
			);
		}
	}
	getSessionId(): string {
		return this.sessionId;
	}
	incrementPageViews() {
		this.pageViews++;
		this.saveSessionToStorage();
	}
	addEvent(event: BusinessEvent) {
		this.events.push(event);
		if (this.events.length > 100) {
			this.events = this.events.slice(-100);
		}
	}
	getSessionSummary() {
		return {
			sessionId: this.sessionId,
			duration: Date.now() - this.sessionStart,
			pageViews: this.pageViews,
			eventCount: this.events.length,
			events: this.events,
		};
	}
}
class BusinessAnalytics {
	private providers: AnalyticsProvider[] = [];
	private sessionManager: SessionManager;
	private eventQueue: BusinessEvent[] = [];
	private flushInterval: NodeJS.Timeout | null = null;
	private isInitialized = false;
	constructor() {
		this.sessionManager = new SessionManager();
		this.setupProviders();
		this.startEventFlushing();
	}
	private setupProviders() {
		this.providers.push({
			name: 'vercel',
			enabled: process.env.NODE_ENV === 'production',
			track: async (event: BusinessEvent) => {
				if (typeof window !== 'undefined' && (window as any).va) {
					(window as any).va('track', event.event, {
						category: event.category,
						action: event.action,
						label: event.label,
						value: event.value,
						...event.metadata,
					});
				}
			},
		});
		this.providers.push({
			name: 'ga4',
			enabled: !!process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'],
			track: async (event: BusinessEvent) => {
				if (typeof window !== 'undefined' && (window as any).gtag) {
					(window as any).gtag('event', event.action, {
						event_category: event.category,
						event_label: event.label,
						value: event.value,
						custom_parameter_session_id: event.sessionId,
						...event.metadata,
					});
				}
			},
			identify: async (userId: string, traits: Record<string, any>) => {
				if (typeof window !== 'undefined' && (window as any).gtag) {
					(window as any).gtag('config', process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'], {
						user_id: userId,
						custom_map: traits,
					});
				}
			},
		});
		this.providers.push({
			name: 'custom',
			enabled: true,
			track: async (event: BusinessEvent) => {
				this.eventQueue.push(event);
			},
		});
	}
	private startEventFlushing() {
		this.flushInterval = setInterval(() => {
			this.flushEvents();
		}, 10000);
		if (typeof window !== 'undefined') {
			window.addEventListener('beforeunload', () => {
				this.flushEvents();
			});
			window.addEventListener('pagehide', () => {
				this.flushEvents();
			});
		}
	}
	private async flushEvents() {
		if (this.eventQueue.length === 0) return;
		const events = [...this.eventQueue];
		this.eventQueue = [];
		try {
			await fetch('/api/analytics/events', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					events,
					session: this.sessionManager.getSessionSummary(),
					timestamp: Date.now(),
				}),
				keepalive: true,
			});
		} catch (error) {
			console.error('[Business Analytics] Failed to flush events:', error);
			this.eventQueue.unshift(...events);
		}
	}
	async track(
		event: TutoringEvents | string,
		properties: {
			category?: BusinessEvent['category'];
			action?: string;
			label?: string;
			value?: number;
			metadata?: Record<string, string | number | boolean>;
		} = {},
	) {
		const businessEvent: BusinessEvent = {
			event,
			category: properties.category || 'engagement',
			action: properties.action || event,
			label: properties.label,
			value: properties.value,
			metadata: properties.metadata,
			timestamp: Date.now(),
			sessionId: this.sessionManager.getSessionId(),
			pageUrl: typeof window !== 'undefined' ? window.location.href : '',
		};
		this.sessionManager.addEvent(businessEvent);
		const promises = this.providers
			.filter((provider) => provider.enabled)
			.map((provider) =>
				provider
					.track(businessEvent)
					.catch((err) =>
						console.error(`[Analytics] ${provider.name} failed:`, err),
					),
			);
		await Promise.allSettled(promises);
		if (process.env.NODE_ENV === 'development') {
			console.log('[Business Analytics]', businessEvent);
		}
	}
	async identify(userId: string, traits: Record<string, any> = {}) {
		const promises = this.providers
			.filter((provider) => provider.enabled && provider.identify)
			.map((provider) =>
				provider.identify!(userId, traits).catch((err) =>
					console.error(`[Analytics] ${provider.name} identify failed:`, err),
				),
			);
		await Promise.allSettled(promises);
	}
	async group(groupId: string, traits: Record<string, any> = {}) {
		const promises = this.providers
			.filter((provider) => provider.enabled && provider.group)
			.map((provider) =>
				provider.group!(groupId, traits).catch((err) =>
					console.error(`[Analytics] ${provider.name} group failed:`, err),
				),
			);
		await Promise.allSettled(promises);
	}
	async trackServiceTierView(tier: string, pricing?: number) {
		return this.track(TutoringEvents.SERVICE_TIER_VIEW, {
			category: 'engagement',
			action: 'service_tier_view',
			label: tier,
			value: pricing,
			metadata: {
				tier,
				pricing: pricing || 0,
				timestamp: Date.now(),
			},
		});
	}
	async trackInquiryFormStart(formType: string) {
		return this.track(TutoringEvents.INQUIRY_FORM_START, {
			category: 'conversion',
			action: 'inquiry_form_start',
			label: formType,
			metadata: {
				formType,
				startTime: Date.now(),
			},
		});
	}
	async trackInquiryFormSubmit(
		formType: string,
		subject?: string,
		level?: string,
	) {
		return this.track(TutoringEvents.INQUIRY_FORM_SUBMIT, {
			category: 'conversion',
			action: 'inquiry_form_submit',
			label: formType,
			value: 1,
			metadata: {
				formType,
				subject: subject || 'unknown',
				level: level || 'unknown',
				completionTime: Date.now(),
			},
		});
	}
	async trackBootcampRegistration(bootcampType: string, tier: string) {
		return this.track(TutoringEvents.BOOTCAMP_REGISTER_COMPLETE, {
			category: 'conversion',
			action: 'bootcamp_registration',
			label: `${bootcampType}_${tier}`,
			value: 1,
			metadata: {
				bootcampType,
				tier,
				registrationTime: Date.now(),
			},
		});
	}
	async trackVideoEngagement(
		videoId: string,
		duration: number,
		completed: boolean,
	) {
		return this.track(
			completed ? TutoringEvents.VIDEO_COMPLETE : TutoringEvents.VIDEO_PLAY,
			{
				category: 'engagement',
				action: completed ? 'video_complete' : 'video_play',
				label: videoId,
				value: duration,
				metadata: {
					videoId,
					duration,
					completed,
					timestamp: Date.now(),
				},
			},
		);
	}
	async trackPageView(page: string, title?: string) {
		this.sessionManager.incrementPageViews();
		return this.track(TutoringEvents.PAGE_VIEW, {
			category: 'navigation',
			action: 'page_view',
			label: page,
			metadata: {
				page,
				title: title || document?.title,
				referrer: document?.referrer,
				timestamp: Date.now(),
			},
		});
	}
	async trackError(error: string, context?: Record<string, any>) {
		return this.track('error', {
			category: 'error',
			action: 'error',
			label: error,
			metadata: {
				error,
				stack: context?.['stack'],
				url: window.location.href,
				userAgent: navigator.userAgent,
				timestamp: Date.now(),
				...context,
			},
		});
	}
	init() {
		if (this.isInitialized) return;
		if (typeof window !== 'undefined') {
			this.trackPageView(window.location.pathname, document.title);
			this.setupAutoTracking();
		}
		this.isInitialized = true;
	}
	private setupAutoTracking() {
		document.addEventListener('submit', (e) => {
			const form = e.target as HTMLFormElement;
			const formType = form.dataset['formType'] || form.id || 'unknown';
			this.trackInquiryFormSubmit(formType);
		});
		document.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			const link = target.closest('a');
			if (link && link.href) {
				if (link.href.startsWith('tel:')) {
					this.track(TutoringEvents.PHONE_CALL_CLICK, {
						category: 'engagement',
						action: 'phone_call',
						label: link.href,
					});
				} else if (link.href.startsWith('mailto:')) {
					this.track(TutoringEvents.EMAIL_CLICK, {
						category: 'engagement',
						action: 'email_click',
						label: link.href,
					});
				} else if (!link.href.includes(window.location.hostname)) {
					this.track(TutoringEvents.EXTERNAL_LINK_CLICK, {
						category: 'engagement',
						action: 'external_link',
						label: link.href,
					});
				}
			}
		});
		let maxScrollDepth = 0;
		const trackScrollDepth = () => {
			const scrollPercent = Math.round(
				(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100,
			);
			if (scrollPercent > maxScrollDepth && scrollPercent >= 25) {
				maxScrollDepth = Math.floor(scrollPercent / 25) * 25;
				this.track('scroll_depth', {
					category: 'engagement',
					action: 'scroll',
					label: `${maxScrollDepth}%`,
					value: maxScrollDepth,
				});
			}
		};
		window.addEventListener('scroll', trackScrollDepth, {
			passive: true,
		});
	}
	getSessionAnalytics() {
		return this.sessionManager.getSessionSummary();
	}
	destroy() {
		if (this.flushInterval) {
			clearInterval(this.flushInterval);
		}
		this.flushEvents();
	}
}
export const businessAnalytics = new BusinessAnalytics();
if (typeof window !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => businessAnalytics.init());
	} else {
		businessAnalytics.init();
	}
}
