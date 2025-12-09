import * as z from 'zod';
export const inputSchemas = {
	contactForm: z.object({
		name: z
			.string()
			.min(2)
			.max(100)
			.regex(/^[a-zA-Z\s\-']+$/),
		email: z.string().email().max(255),
		phone: z
			.string()
			.regex(/^[\d\s\-\+\(\)]+$/)
			.max(20)
			.optional(),
		subject: z.string().min(5).max(200),
		message: z.string().min(10).max(5000),
		preferredContact: z.enum(['email', 'phone']).optional(),
		studentAge: z.number().min(4).max(25).optional(),
		tutoringSubject: z.string().max(100).optional(),
	}),
	textInput: z
		.string()
		.max(1000)
		.regex(/^[^<>{}]*$/),
};
export function sanitiseInput<T>(
	data: unknown,
	schema: z.ZodSchema<T>,
): {
	success: boolean;
	data?: T;
	errors?: z.ZodError;
} {
	try {
		const validated = schema.parse(data);
		return {
			success: true,
			data: validated,
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: false,
				errors: error,
			};
		}
		throw error;
	}
}
export interface SecurityEvent {
	type:
		| 'rate_limit'
		| 'csrf_failure'
		| 'auth_failure'
		| 'suspicious_input'
		| 'sql_injection_attempt';
	severity: 'low' | 'medium' | 'high' | 'critical';
	timestamp: Date;
	clientIp: string;
	path: string;
	details: Record<string, any>;
}
export class SecurityMonitor {
	private events: SecurityEvent[] = [];
	private alertThresholds = {
		rate_limit: {
			count: 10,
			window: 300000,
		},
		csrf_failure: {
			count: 5,
			window: 300000,
		},
		auth_failure: {
			count: 3,
			window: 300000,
		},
		suspicious_input: {
			count: 5,
			window: 600000,
		},
		sql_injection_attempt: {
			count: 1,
			window: 3600000,
		},
	};
	logEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
		const fullEvent: SecurityEvent = {
			...event,
			timestamp: new Date(),
		};
		this.events.push(fullEvent);
		this.checkThresholds(fullEvent);
		const cutoff = Date.now() - 86400000;
		this.events = this.events.filter((e) => e.timestamp.getTime() > cutoff);
	}
	private checkThresholds(event: SecurityEvent): void {
		const threshold = this.alertThresholds[event.type];
		const recentEvents = this.events.filter(
			(e) =>
				e.type === event.type &&
				e.clientIp === event.clientIp &&
				e.timestamp.getTime() > Date.now() - threshold.window,
		);
		if (recentEvents.length >= threshold.count) {
			this.sendAlert({
				title: `Security Alert: ${event.type}`,
				severity: event.severity,
				message: `Threshold exceeded for ${event.type} from IP ${event.clientIp}`,
				events: recentEvents,
			});
		}
	}
	private sendAlert(alert: {
		title: string;
		severity: string;
		message: string;
		events: SecurityEvent[];
	}): void {
		console.error('[SECURITY ALERT]', alert);
	}
}
export const securityMonitor = new SecurityMonitor();
