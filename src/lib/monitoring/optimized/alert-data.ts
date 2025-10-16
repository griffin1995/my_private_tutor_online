export interface AlertData {
	active: Array<{
		id: string;
		type: 'performance' | 'error' | 'security' | 'business';
		severity: 'low' | 'medium' | 'high' | 'critical';
		message: string;
		timestamp: string;
	}>;
	statistics: {
		total: number;
		resolved: number;
		pending: number;
		criticalCount: number;
	};
}
export async function getAlertData(): Promise<AlertData> {
	return {
		active: [
			{
				id: 'perf-001',
				type: 'performance',
				severity: 'low',
				message: 'Bundle size optimization in progress',
				timestamp: new Date().toISOString(),
			},
		],
		statistics: {
			total: 12,
			resolved: 10,
			pending: 2,
			criticalCount: 0,
		},
	};
}
export default {
	getAlertData,
};
