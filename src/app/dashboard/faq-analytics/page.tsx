import FAQSearchAnalyticsDashboard from '@/components/dashboards/FAQSearchAnalyticsDashboard';
import { searchAnalyticsMockData } from '@/mocks/searchAnalyticsMock';
export default function FAQAnalyticsPage() {
	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6 text-navy-900'>
				FAQ Search Analytics
			</h1>

			<FAQSearchAnalyticsDashboard
				searchData={searchAnalyticsMockData.searchData}
				languageDistribution={searchAnalyticsMockData.languageDistribution}
			/>
		</div>
	);
}
