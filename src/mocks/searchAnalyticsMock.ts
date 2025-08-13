// CONTEXT7 SOURCE: /context7/react_dev - Mock Data Generation
// REVISION REASON: Create realistic mock data for FAQ search analytics testing

import { SearchAnalyticsData } from '../types/analytics';

// Generates mock search analytics data with realistic patterns
export const generateSearchAnalyticsMockData = (): SearchAnalyticsData => {
  const generateTimestamps = () => {
    const timestamps = [];
    const startDate = new Date('2025-01-01');
    
    for (let i = 0; i < 30; i++) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i);
      timestamps.push(newDate.toISOString().split('T')[0]);
    }
    
    return timestamps;
  };

  const timestamps = generateTimestamps();

  const searchData = timestamps.map((timestamp, index) => ({
    timestamp,
    queryVolume: Math.floor(Math.random() * 500) + 100 + (Math.sin(index) * 100),
    zeroResultQueries: Math.floor(Math.random() * 50) + 10,
    averageResponseTime: parseFloat((Math.random() * 200 + 50).toFixed(2))
  }));

  const languageDistribution = [
    { language: 'English', percentage: 65 },
    { language: 'Mandarin', percentage: 15 },
    { language: 'Spanish', percentage: 10 },
    { language: 'Other', percentage: 10 }
  ];

  return { searchData, languageDistribution };
};

export const searchAnalyticsMockData = generateSearchAnalyticsMockData();