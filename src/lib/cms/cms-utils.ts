export interface SafeIndexAccess {
	readonly [key: string]: unknown;
}
export function getCMSProperty<T = unknown>(
	content: SafeIndexAccess | Record<string, unknown>,
	key: string,
	defaultValue?: T,
): T | undefined {
	if (!content || typeof content !== 'object') {
		return defaultValue;
	}
	return (content[key] as T) ?? defaultValue;
}
export function getCMSNestedProperty<T = unknown>(
	content: SafeIndexAccess | Record<string, unknown>,
	path: string[],
	defaultValue?: T,
): T | undefined {
	return (
		(path.reduce((current, key) => {
			if (!current || typeof current !== 'object') {
				return defaultValue;
			}
			return current[key];
		}, content) as T) ?? defaultValue
	);
}
export function getCMSArrayProperty<T = unknown>(
	content: SafeIndexAccess | Record<string, unknown>,
	key: string,
	defaultValue: T[] = [],
): T[] {
	const result = getCMSProperty(content, key, defaultValue);
	return Array.isArray(result) ? result : defaultValue;
}
export interface PriorityLevel {
	CRITICAL: number;
	HIGH: number;
	MEDIUM: number;
	LOW: number;
}
export function getPriorityValue(
	priorities: PriorityLevel,
	priority: string,
): number {
	const priorityKey = priority as keyof PriorityLevel;
	if (priorityKey in priorities) {
		return priorities[priorityKey];
	}
	return priorities.LOW;
}
export function isCMSContentValid(
	content: unknown,
): content is SafeIndexAccess {
	return (
		content !== null && content !== undefined && typeof content === 'object'
	);
}
export function getCMSProperties<T extends Record<string, unknown>>(
	content: SafeIndexAccess | Record<string, unknown>,
	keys: (keyof T)[],
	defaults: Partial<T> = {},
): Partial<T> {
	return keys.reduce((result, key) => {
		const keyString = String(key);
		result[key] = getCMSProperty(content, keyString, defaults[key]);
		return result;
	}, {} as Partial<T>);
}
export function getCMSStringProperty(
	content: SafeIndexAccess | Record<string, unknown>,
	key: string,
	defaultValue: string = '',
): string {
	const value = getCMSProperty(content, key, defaultValue);
	return typeof value === 'string' ? value : defaultValue;
}
export function getCMSNumberProperty(
	content: SafeIndexAccess | Record<string, unknown>,
	key: string,
	defaultValue: number = 0,
): number {
	const value = getCMSProperty(content, key, defaultValue);
	if (typeof value === 'number') {
		return value;
	}
	if (typeof value === 'string') {
		const parsed = parseFloat(value);
		return isNaN(parsed) ? defaultValue : parsed;
	}
	return defaultValue;
}
export function getCMSBooleanProperty(
	content: SafeIndexAccess | Record<string, unknown>,
	key: string,
	defaultValue: boolean = false,
): boolean {
	const value = getCMSProperty(content, key, defaultValue);
	if (typeof value === 'boolean') {
		return value;
	}
	if (typeof value === 'string') {
		return value.toLowerCase() === 'true';
	}
	return defaultValue;
}
export interface EnhancedCMSContent extends SafeIndexAccess {
	readonly title?: string;
	readonly description?: string;
	readonly content?: string;
	readonly metadata?: SafeIndexAccess;
	readonly timestamp?: string;
	readonly version?: string;
	readonly [key: string]: unknown;
}
export interface CMSComponentProps {
	content?: EnhancedCMSContent | SafeIndexAccess;
	className?: string;
	children?: React.ReactNode;
	readonly [key: string]: unknown;
}
export interface CMSCollection<T = EnhancedCMSContent> extends SafeIndexAccess {
	readonly items: T[];
	readonly total?: number;
	readonly page?: number;
	readonly limit?: number;
	readonly [key: string]: unknown;
}
export interface CMSContentMap extends SafeIndexAccess {
	[section: string]: EnhancedCMSContent | EnhancedCMSContent[] | any;
}
export type {
	SafeIndexAccess,
	PriorityLevel,
	EnhancedCMSContent,
	CMSComponentProps,
	CMSCollection,
	CMSContentMap,
};
