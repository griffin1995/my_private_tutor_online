import { TokenTestComponent } from '@/components/design-tokens/TokenTestComponent';
export const metadata = {
	title: 'Design Token Infrastructure Test | My Private Tutor Online',
	description: 'Comprehensive validation of 25 strategic design tokens',
	robots: 'noindex, nofollow',
};
export default function DesignTokensTestPage() {
	return (
		<main className='min-h-screen bg-white py-12'>
			<TokenTestComponent />
		</main>
	);
}
