// CONTEXT7 SOURCE: /vercel/next.js - App Router Page Component
// REVISION REASON: Create FAQ Search Analytics Dashboard page

import React from 'react';
import FAQSearchAnalyticsDashboard from '@/components/dashboards/FAQSearchAnalyticsDashboard';
import { searchAnalyticsMockData } from '@/mocks/searchAnalyticsMock';

// CONTEXT7 SOURCE: /context7/react_dev - Server Component Best Practices
export default function FAQAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-navy-900">
        FAQ Search Analytics
      </h1>
      
      <FAQSearchAnalyticsDashboard 
        searchData={searchAnalyticsMockData.searchData}
        languageDistribution={searchAnalyticsMockData.languageDistribution}
      />
    </div>
  );
}