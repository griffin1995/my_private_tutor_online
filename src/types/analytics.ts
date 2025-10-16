export interface SearchQueryData {
	timestamp: string;
	queryVolume: number;
	zeroResultQueries: number;
	averageResponseTime: number;
}
export interface LanguageDistribution {
	language: string;
	percentage: number;
}
export interface SearchAnalyticsData {
	searchData: SearchQueryData[];
	languageDistribution: LanguageDistribution[];
}
