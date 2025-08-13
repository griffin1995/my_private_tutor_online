// CONTEXT7 SOURCE: /context7/react_dev - TypeScript Type Definitions
// REVISION REASON: Create robust type definitions for FAQ search analytics

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