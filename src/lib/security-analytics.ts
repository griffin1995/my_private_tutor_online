import { SecurityEvent } from '@/middleware/security';
interface DeviceFingerprint {
	id: string;
	userAgent: string;
	screenResolution?: string;
	timezone?: string;
	language?: string;
	platform?: string;
	plugins?: string[];
	fonts?: string[];
	canvas?: string;
	webgl?: string;
	trustScore: number;
	lastSeen: Date;
	suspicious: boolean;
}
interface GeoLocation {
	ip: string;
	country: string;
	region: string;
	city: string;
	latitude: number;
	longitude: number;
	isp: string;
	vpn: boolean;
	proxy: boolean;
	tor: boolean;
	datacenter: boolean;
	riskScore: number;
}
interface ThreatPattern {
	id: string;
	name: string;
	indicators: string[];
	severity: 'low' | 'medium' | 'high' | 'critical';
	confidence: number;
	lastSeen: Date;
	occurrences: number;
}
interface UserBehaviorProfile {
	userId: string;
	normalPatterns: {
		accessTimes: number[];
		commonPaths: Map<string, number>;
		requestRate: number;
		geoLocations: Set<string>;
		userAgents: Set<string>;
	};
	riskScore: number;
	lastUpdate: Date;
}
export class ThreatScoringModel {
	private patterns: Map<string, ThreatPattern> = new Map();
	private userProfiles: Map<string, UserBehaviorProfile> = new Map();
	private deviceFingerprints: Map<string, DeviceFingerprint> = new Map();
	private geoLocations: Map<string, GeoLocation> = new Map();
	private readonly weights = {
		patternMatch: 0.25,
		anomalyScore: 0.2,
		frequency: 0.1,
		severity: 0.15,
		recency: 0.05,
		deviceTrust: 0.1,
		geoRisk: 0.1,
		mlConfidence: 0.05,
	};
	private readonly thresholds = {
		criticalThreat: 0.9,
		highThreat: 0.75,
		mediumThreat: 0.5,
		lowThreat: 0.25,
		deviceSuspicion: 0.7,
		geoAnomaly: 0.65,
	};
	public analyzeEvent(event: SecurityEvent): {
		threatScore: number;
		confidence: number;
		recommendations: string[];
		patterns: ThreatPattern[];
	} {
		const matchedPatterns = this.detectPatterns(event);
		const anomalyScore = this.calculateAnomalyScore(event);
		const threatScore = this.calculateThreatScore(
			matchedPatterns,
			anomalyScore,
			event,
		);
		const recommendations = this.generateRecommendations(
			threatScore,
			matchedPatterns,
			anomalyScore,
		);
		return {
			threatScore,
			confidence: this.calculateConfidence(matchedPatterns, anomalyScore),
			recommendations,
			patterns: matchedPatterns,
		};
	}
	private detectPatterns(event: SecurityEvent): ThreatPattern[] {
		const patterns: ThreatPattern[] = [];
		if (this.detectSQLInjection(event)) {
			patterns.push(this.getOrCreatePattern('sql_injection', 'critical'));
		}
		if (this.detectXSS(event)) {
			patterns.push(this.getOrCreatePattern('xss_attack', 'high'));
		}
		if (this.detectBruteForce(event)) {
			patterns.push(this.getOrCreatePattern('brute_force', 'high'));
		}
		if (this.detectDirectoryTraversal(event)) {
			patterns.push(this.getOrCreatePattern('directory_traversal', 'high'));
		}
		if (this.detectCommandInjection(event)) {
			patterns.push(this.getOrCreatePattern('command_injection', 'critical'));
		}
		return patterns;
	}
	private calculateAnomalyScore(event: SecurityEvent): number {
		const profile = this.getUserProfile(event.clientIp);
		if (!profile) {
			return 0.5;
		}
		let anomalyScore = 0;
		const factors = [];
		const hour = new Date(event.timestamp).getHours();
		const timeAnomaly = this.calculateTimeAnomaly(
			hour,
			profile.normalPatterns.accessTimes,
		);
		anomalyScore += timeAnomaly * 0.2;
		if (timeAnomaly > 0.7) factors.push('unusual_access_time');
		const pathAnomaly = this.calculatePathAnomaly(
			event.path,
			profile.normalPatterns.commonPaths,
		);
		anomalyScore += pathAnomaly * 0.3;
		if (pathAnomaly > 0.7) factors.push('unusual_path_access');
		const rateAnomaly = this.calculateRateAnomaly(
			profile.normalPatterns.requestRate,
		);
		anomalyScore += rateAnomaly * 0.25;
		if (rateAnomaly > 0.7) factors.push('abnormal_request_rate');
		const geoAnomaly = this.calculateGeoAnomaly(
			event.clientIp,
			profile.normalPatterns.geoLocations,
		);
		anomalyScore += geoAnomaly * 0.25;
		if (geoAnomaly > 0.7) factors.push('unusual_location');
		return Math.min(anomalyScore, 1);
	}
	private calculateThreatScore(
		patterns: ThreatPattern[],
		anomalyScore: number,
		event: SecurityEvent,
	): number {
		let score = 0;
		if (patterns.length > 0) {
			const patternScore =
				patterns.reduce((sum, p) => {
					const severityWeight = this.getSeverityWeight(p.severity);
					return sum + p.confidence * severityWeight;
				}, 0) / patterns.length;
			score += patternScore * this.weights.patternMatch;
		}
		score += anomalyScore * this.weights.anomalyScore;
		const frequencyScore = this.calculateFrequencyScore(event);
		score += frequencyScore * this.weights.frequency;
		const severityScore = this.getSeverityWeight(event.severity);
		score += severityScore * this.weights.severity;
		const recencyScore = this.calculateRecencyScore(event.timestamp);
		score += recencyScore * this.weights.recency;
		const deviceScore = this.calculateDeviceTrustScore(event);
		score += deviceScore * this.weights.deviceTrust;
		const geoScore = this.calculateGeoRiskScore(event.clientIp);
		score += geoScore * this.weights.geoRisk;
		const mlConfidence = this.calculateMLConfidence(patterns, anomalyScore);
		score += mlConfidence * this.weights.mlConfidence;
		return Math.min(score, 1);
	}
	private calculateDeviceTrustScore(event: SecurityEvent): number {
		const fingerprint = this.getOrCreateDeviceFingerprint(event);
		let trustScore = 0;
		if (
			fingerprint.lastSeen &&
			Date.now() - fingerprint.lastSeen.getTime() > 24 * 60 * 60 * 1000
		) {
			trustScore += 0.3;
		}
		if (fingerprint.suspicious) {
			return 0.9;
		}
		const spoofingIndicators = this.detectDeviceSpoofing(fingerprint);
		if (spoofingIndicators > 0) {
			trustScore += spoofingIndicators * 0.2;
		}
		return Math.min(1 - fingerprint.trustScore, 1);
	}
	private calculateGeoRiskScore(ip: string): number {
		const location = this.getOrSimulateGeoLocation(ip);
		let riskScore = location.riskScore;
		if (location.vpn) riskScore += 0.2;
		if (location.proxy) riskScore += 0.2;
		if (location.tor) riskScore += 0.3;
		if (location.datacenter) riskScore += 0.15;
		const highRiskCountries = ['CN', 'RU', 'KP', 'IR'];
		if (highRiskCountries.includes(location.country)) {
			riskScore += 0.25;
		}
		return Math.min(riskScore, 1);
	}
	private detectDeviceSpoofing(fingerprint: DeviceFingerprint): number {
		let spoofingScore = 0;
		if (fingerprint.platform && fingerprint.userAgent) {
			const platformInUA = fingerprint.userAgent.toLowerCase();
			const reportedPlatform = fingerprint.platform.toLowerCase();
			if (platformInUA.includes('windows') && !reportedPlatform.includes('win')) {
				spoofingScore += 0.3;
			}
			if (platformInUA.includes('mac') && !reportedPlatform.includes('mac')) {
				spoofingScore += 0.3;
			}
		}
		if (fingerprint.plugins && fingerprint.plugins.length === 0) {
			spoofingScore += 0.2;
		}
		const automationIndicators = ['webdriver', 'phantom', 'selenium'];
		if (fingerprint.userAgent) {
			for (const indicator of automationIndicators) {
				if (fingerprint.userAgent.toLowerCase().includes(indicator)) {
					spoofingScore += 0.5;
					break;
				}
			}
		}
		return Math.min(spoofingScore, 1);
	}
	private getOrCreateDeviceFingerprint(event: SecurityEvent): DeviceFingerprint {
		const fingerprintId = this.generateFingerprintId(event);
		if (this.deviceFingerprints.has(fingerprintId)) {
			const existing = this.deviceFingerprints.get(fingerprintId)!;
			existing.lastSeen = new Date();
			return existing;
		}
		const newFingerprint: DeviceFingerprint = {
			id: fingerprintId,
			userAgent: event.details?.userAgent || 'unknown',
			trustScore: 0.5,
			lastSeen: new Date(),
			suspicious: false,
		};
		this.deviceFingerprints.set(fingerprintId, newFingerprint);
		return newFingerprint;
	}
	private generateFingerprintId(event: SecurityEvent): string {
		const components = [
			event.clientIp,
			event.details?.userAgent || '',
			event.details?.screenResolution || '',
			event.details?.timezone || '',
		];
		return components.join('|').substring(0, 32);
	}
	private getOrSimulateGeoLocation(ip: string): GeoLocation {
		if (this.geoLocations.has(ip)) {
			return this.geoLocations.get(ip)!;
		}
		const locations: Partial<GeoLocation>[] = [
			{
				country: 'GB',
				city: 'London',
				vpn: false,
				proxy: false,
				tor: false,
				datacenter: false,
				riskScore: 0.1,
			},
			{
				country: 'US',
				city: 'New York',
				vpn: false,
				proxy: false,
				tor: false,
				datacenter: true,
				riskScore: 0.2,
			},
			{
				country: 'CN',
				city: 'Beijing',
				vpn: true,
				proxy: false,
				tor: false,
				datacenter: false,
				riskScore: 0.6,
			},
			{
				country: 'RU',
				city: 'Moscow',
				vpn: false,
				proxy: true,
				tor: false,
				datacenter: false,
				riskScore: 0.7,
			},
			{
				country: 'NL',
				city: 'Amsterdam',
				vpn: true,
				proxy: false,
				tor: true,
				datacenter: true,
				riskScore: 0.8,
			},
		];
		const selected = locations[Math.floor(Math.random() * locations.length)];
		const location: GeoLocation = {
			ip,
			country: selected.country || 'XX',
			region: 'Unknown',
			city: selected.city || 'Unknown',
			latitude: 0,
			longitude: 0,
			isp: 'Unknown ISP',
			vpn: selected.vpn || false,
			proxy: selected.proxy || false,
			tor: selected.tor || false,
			datacenter: selected.datacenter || false,
			riskScore: selected.riskScore || 0.5,
		};
		this.geoLocations.set(ip, location);
		return location;
	}
	private calculateMLConfidence(
		patterns: ThreatPattern[],
		anomalyScore: number,
	): number {
		const patternConfidence =
			patterns.length > 0 ?
				patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length
			:	0;
		return (patternConfidence + anomalyScore) / 2;
	}
	private detectSQLInjection(event: SecurityEvent): boolean {
		const sqlPatterns = [
			/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE)\b)/i,
			/(\b(OR|AND)\b\s*\d+\s*=\s*\d+)/i,
			/(--|\#|\/\*|\*\/)/,
			/(\bEXEC\b|\bEXECUTE\b)/i,
			/(\bSCRIPT\b.*\bFROM\b)/i,
			/(\bINTO\b\s+\bOUTFILE\b)/i,
		];
		const checkString = JSON.stringify(event.details);
		return sqlPatterns.some((pattern) => pattern.test(checkString));
	}
	private detectXSS(event: SecurityEvent): boolean {
		const xssPatterns = [
			/<script[^>]*>.*?<\/script>/gi,
			/<iframe[^>]*>.*?<\/iframe>/gi,
			/javascript:/gi,
			/on\w+\s*=/gi,
			/<img[^>]*onerror\s*=/gi,
			/<svg[^>]*onload\s*=/gi,
			/eval\s*\(/gi,
			/document\.(cookie|write|location)/gi,
		];
		const checkString = JSON.stringify(event.details);
		return xssPatterns.some((pattern) => pattern.test(checkString));
	}
	private detectBruteForce(event: SecurityEvent): boolean {
		return event.type === 'auth_failure' && event.severity === 'high';
	}
	private detectDirectoryTraversal(event: SecurityEvent): boolean {
		const traversalPatterns = [/\.\.\//g, /\.\.%2[fF]/g, /%2e%2e/gi, /\.\.\\/g];
		const checkString = event.path + JSON.stringify(event.details);
		return traversalPatterns.some((pattern) => pattern.test(checkString));
	}
	private detectCommandInjection(event: SecurityEvent): boolean {
		const cmdPatterns = [
			/;[\s]*(?:ls|cat|rm|del|wget|curl|nc|bash|sh)/i,
			/\|[\s]*(?:ls|cat|rm|del|wget|curl|nc|bash|sh)/i,
			/`[^`]*`/,
			/\$\([^)]+\)/,
			/&&[\s]*(?:ls|cat|rm|del|wget|curl|nc|bash|sh)/i,
		];
		const checkString = JSON.stringify(event.details);
		return cmdPatterns.some((pattern) => pattern.test(checkString));
	}
	private generateRecommendations(
		threatScore: number,
		patterns: ThreatPattern[],
		anomalyScore: number,
	): string[] {
		const recommendations: string[] = [];
		if (threatScore > 0.8) {
			recommendations.push('CRITICAL: Immediate investigation required');
			recommendations.push('Consider temporary IP blocking');
			recommendations.push('Enable enhanced monitoring mode');
		} else if (threatScore > 0.6) {
			recommendations.push('HIGH: Elevated threat detected');
			recommendations.push('Increase monitoring frequency');
			recommendations.push('Review recent activity logs');
		} else if (threatScore > 0.4) {
			recommendations.push('MEDIUM: Suspicious activity detected');
			recommendations.push('Monitor for pattern continuation');
		}
		patterns.forEach((pattern) => {
			switch (pattern.name) {
				case 'sql_injection':
					recommendations.push('Enable SQL query parameterization');
					recommendations.push('Review database access logs');
					break;
				case 'xss_attack':
					recommendations.push('Verify input sanitization');
					recommendations.push('Check CSP headers');
					break;
				case 'brute_force':
					recommendations.push('Implement rate limiting');
					recommendations.push('Consider CAPTCHA for authentication');
					break;
				case 'directory_traversal':
					recommendations.push('Review file access permissions');
					recommendations.push('Validate path inputs');
					break;
				case 'command_injection':
					recommendations.push('Audit system command usage');
					recommendations.push('Implement input validation');
					break;
			}
		});
		if (anomalyScore > 0.7) {
			recommendations.push('Unusual behavior detected - verify user identity');
		}
		return [...new Set(recommendations)];
	}
	private getSeverityWeight(severity: string): number {
		switch (severity) {
			case 'critical':
				return 1.0;
			case 'high':
				return 0.75;
			case 'medium':
				return 0.5;
			case 'low':
				return 0.25;
			default:
				return 0.1;
		}
	}
	private calculateConfidence(
		patterns: ThreatPattern[],
		anomalyScore: number,
	): number {
		if (patterns.length === 0) return anomalyScore * 0.5;
		const avgPatternConfidence =
			patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length;
		return (avgPatternConfidence + anomalyScore) / 2;
	}
	private calculateTimeAnomaly(hour: number, normalHours: number[]): number {
		if (normalHours.length === 0) return 0.5;
		const avgHour = normalHours.reduce((a, b) => a + b, 0) / normalHours.length;
		const deviation = Math.abs(hour - avgHour) / 12;
		return Math.min(deviation, 1);
	}
	private calculatePathAnomaly(
		path: string,
		commonPaths: Map<string, number>,
	): number {
		if (commonPaths.size === 0) return 0.5;
		if (commonPaths.has(path)) {
			const frequency = commonPaths.get(path)!;
			const totalRequests = Array.from(commonPaths.values()).reduce(
				(a, b) => a + b,
				0,
			);
			return 1 - frequency / totalRequests;
		}
		return 0.8;
	}
	private calculateRateAnomaly(normalRate: number): number {
		return 0.3;
	}
	private calculateGeoAnomaly(ip: string, knownLocations: Set<string>): number {
		return knownLocations.has(ip) ? 0 : 0.7;
	}
	private calculateFrequencyScore(event: SecurityEvent): number {
		return 0.4;
	}
	private calculateRecencyScore(timestamp: Date): number {
		const now = Date.now();
		const eventTime = timestamp.getTime();
		const hoursSince = (now - eventTime) / (1000 * 60 * 60);
		if (hoursSince < 1) return 1.0;
		if (hoursSince < 6) return 0.8;
		if (hoursSince < 24) return 0.6;
		if (hoursSince < 72) return 0.4;
		return 0.2;
	}
	private getOrCreatePattern(
		name: string,
		severity: 'low' | 'medium' | 'high' | 'critical',
	): ThreatPattern {
		if (this.patterns.has(name)) {
			const pattern = this.patterns.get(name)!;
			pattern.occurrences++;
			pattern.lastSeen = new Date();
			return pattern;
		}
		const newPattern: ThreatPattern = {
			id: crypto.randomUUID(),
			name,
			indicators: [],
			severity,
			confidence: 0.8,
			lastSeen: new Date(),
			occurrences: 1,
		};
		this.patterns.set(name, newPattern);
		return newPattern;
	}
	private getUserProfile(userId: string): UserBehaviorProfile | null {
		return this.userProfiles.get(userId) || null;
	}
	public updateUserProfile(userId: string, event: SecurityEvent): void {
		const profile =
			this.userProfiles.get(userId) || this.createNewProfile(userId);
		const hour = new Date(event.timestamp).getHours();
		profile.normalPatterns.accessTimes.push(hour);
		const pathCount = profile.normalPatterns.commonPaths.get(event.path) || 0;
		profile.normalPatterns.commonPaths.set(event.path, pathCount + 1);
		profile.normalPatterns.geoLocations.add(event.clientIp);
		profile.lastUpdate = new Date();
		this.userProfiles.set(userId, profile);
	}
	private createNewProfile(userId: string): UserBehaviorProfile {
		return {
			userId,
			normalPatterns: {
				accessTimes: [],
				commonPaths: new Map(),
				requestRate: 0,
				geoLocations: new Set(),
				userAgents: new Set(),
			},
			riskScore: 0,
			lastUpdate: new Date(),
		};
	}
}
export const threatScoringModel = new ThreatScoringModel();
export class RealTimeThreatAnalyzer {
	private eventQueue: SecurityEvent[] = [];
	private analysisResults: Map<string, any> = new Map();
	public async processEvent(event: SecurityEvent): Promise<{
		action: 'allow' | 'block' | 'challenge';
		threatLevel: number;
		details: any;
	}> {
		const analysis = threatScoringModel.analyzeEvent(event);
		this.analysisResults.set(event.clientIp, {
			...analysis,
			timestamp: new Date(),
		});
		let action: 'allow' | 'block' | 'challenge' = 'allow';
		if (analysis.threatScore > 0.9) {
			action = 'block';
		} else if (analysis.threatScore > 0.7) {
			action = 'challenge';
		}
		threatScoringModel.updateUserProfile(event.clientIp, event);
		return {
			action,
			threatLevel: analysis.threatScore,
			details: {
				patterns: analysis.patterns,
				recommendations: analysis.recommendations,
				confidence: analysis.confidence,
			},
		};
	}
	public getThreatLandscape(): {
		activeThreats: number;
		criticalEvents: number;
		topThreats: Array<{
			type: string;
			count: number;
		}>;
		riskLevel: 'low' | 'medium' | 'high' | 'critical';
	} {
		const recentAnalyses = Array.from(this.analysisResults.values()).filter(
			(a) => {
				const hoursSince = (Date.now() - a.timestamp.getTime()) / (1000 * 60 * 60);
				return hoursSince < 24;
			},
		);
		const activeThreats = recentAnalyses.filter(
			(a) => a.threatScore > 0.5,
		).length;
		const criticalEvents = recentAnalyses.filter(
			(a) => a.threatScore > 0.8,
		).length;
		const threatCounts = new Map<string, number>();
		recentAnalyses.forEach((analysis) => {
			analysis.patterns?.forEach((pattern: ThreatPattern) => {
				const count = threatCounts.get(pattern.name) || 0;
				threatCounts.set(pattern.name, count + 1);
			});
		});
		const topThreats = Array.from(threatCounts.entries())
			.map(([type, count]) => ({
				type,
				count,
			}))
			.sort((a, b) => b.count - a.count)
			.slice(0, 5);
		let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
		if (criticalEvents > 5) {
			riskLevel = 'critical';
		} else if (criticalEvents > 2 || activeThreats > 10) {
			riskLevel = 'high';
		} else if (activeThreats > 5) {
			riskLevel = 'medium';
		}
		return {
			activeThreats,
			criticalEvents,
			topThreats,
			riskLevel,
		};
	}
}
export const realTimeThreatAnalyzer = new RealTimeThreatAnalyzer();
