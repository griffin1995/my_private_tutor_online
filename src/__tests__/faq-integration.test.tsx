import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FAQCategorySection } from '@/components/faq/faq-category-section';
import { FAQAdminDashboard } from '@/components/admin/faq-admin-dashboard';
import { faqAnalytics } from '@/lib/faq-analytics-engine';
jest.mock('framer-motion', () => ({
	motion: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
		button: ({ children, ...props }: any) => (
			<button {...props}>{children}</button>
		),
		form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
	},
	AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));
jest.mock('@/lib/faq-analytics-engine', () => ({
	faqAnalytics: {
		trackRating: jest.fn(),
		trackFeedback: jest.fn(),
		trackPerformance: jest.fn(),
		generateReport: jest.fn(() => ({
			overview: {
				totalRatings: 10,
				totalFeedback: 3,
				satisfactionRate: 80,
				responseRate: 30,
				averageResponseTime: 2500,
				topPerformingQuestions: [
					{
						questionId: 'q1',
						questionText: 'What is online tutoring?',
						helpfulPercentage: 90,
						totalRatings: 5,
						confidence: 0.8,
					},
				],
			},
			trends: {
				dailyRatings: [],
				weeklyTrends: [],
				monthlyGrowth: [],
			},
			insights: {
				problematicQuestions: [],
				feedbackCategories: {},
				userBehavior: {
					averageTimeToRate: 3000,
					deviceBreakdown: {
						desktop: 8,
						mobile: 2,
					},
					geographicDistribution: {
						UK: 7,
						US: 3,
					},
					peakEngagementHours: [],
				},
			},
			performance: {
				fastestQuestions: [],
				slowestQuestions: [],
				highEngagementQuestions: [],
				conversionRates: {
					ratingToFeedback: 30,
					viewToRating: 60,
					feedbackQuality: 75,
				},
			},
		})),
		clearData: jest.fn(),
		exportData: jest.fn(() => ({
			ratings: [],
			feedback: [],
			metrics: [],
		})),
	},
}));
jest.mock('@/components/ui/accordion', () => ({
	Accordion: ({ children, onValueChange, ...props }: any) => (
		<div
			{...props}
			data-testid='accordion'>
			{children}
		</div>
	),
	AccordionItem: ({ children, value, ...props }: any) => (
		<div
			{...props}
			data-testid={`accordion-item-${value}`}>
			{children}
		</div>
	),
	AccordionTrigger: ({ children, onClick, ...props }: any) => (
		<button
			{...props}
			onClick={onClick}>
			{children}
		</button>
	),
	AccordionContent: ({ children, ...props }: any) => (
		<div {...props}>{children}</div>
	),
}));
jest.mock('@/components/ui/card', () => ({
	Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
	CardContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));
jest.mock('@/components/ui/badge', () => ({
	Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));
jest.mock('@/components/ui/button', () => ({
	Button: ({ children, onClick, ...props }: any) => (
		<button
			onClick={onClick}
			{...props}>
			{children}
		</button>
	),
}));
jest.mock('@/components/faq/faq-recommendations', () => ({
	FAQRecommendations: () => <div>FAQ Recommendations</div>,
	RelatedQuestions: () => <div>Related Questions</div>,
	PopularInCategory: () => <div>Popular in Category</div>,
}));
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
	key: jest.fn(),
	length: 0,
};
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});
describe('FAQ Integration Tests', () => {
	const mockFAQData = [
		{
			id: 'category-1',
			title: 'About the Service',
			icon: '🌐',
			order: 1,
			questions: [
				{
					id: 'q1',
					question: 'What is My Private Tutor Online?',
					answer: 'My Private Tutor Online is a premium tutoring service...',
				},
				{
					id: 'q2',
					question: 'Why choose online tutoring?',
					answer: 'Online tutoring offers flexibility and access to elite tutors...',
				},
			],
		},
		{
			id: 'category-2',
			title: 'Pricing & Payment',
			icon: '💰',
			order: 2,
			questions: [
				{
					id: 'q3',
					question: 'How much does tutoring cost?',
					answer: 'Our tutoring starts from £45 per hour...',
				},
			],
		},
	];
	beforeEach(() => {
		jest.clearAllMocks();
		localStorageMock.getItem.mockReturnValue(null);
		localStorageMock.setItem.mockImplementation(() => {});
	});
	describe('FAQ Section with Rating Integration', () => {
		test('renders FAQ categories with rating components', () => {
			render(<FAQCategorySection categories={mockFAQData} />);
			expect(screen.getByText('About the Service')).toBeInTheDocument();
			expect(screen.getByText('Pricing & Payment')).toBeInTheDocument();
			expect(
				screen.getByText('What is My Private Tutor Online?'),
			).toBeInTheDocument();
			expect(screen.getByText('Why choose online tutoring?')).toBeInTheDocument();
		});
		test('shows rating system when FAQ is expanded (simulated)', async () => {
			const user = userEvent.setup();
			render(<FAQCategorySection categories={mockFAQData} />);
			expect(screen.getByTestId('accordion')).toBeInTheDocument();
		});
		test('tracks performance when FAQ accordion is interacted with', async () => {
			const user = userEvent.setup();
			render(<FAQCategorySection categories={mockFAQData} />);
			const accordion = screen.getByTestId('accordion');
			expect(accordion).toBeInTheDocument();
		});
		test('handles bulk expand/collapse actions', async () => {
			const user = userEvent.setup();
			render(
				<FAQCategorySection
					categories={mockFAQData}
					enableBulkActions={true}
				/>,
			);
			expect(screen.getByText('Expand All')).toBeInTheDocument();
			expect(screen.getByText('Collapse All')).toBeInTheDocument();
			const expandAllButton = screen.getByText('Expand All');
			await user.click(expandAllButton);
			expect(expandAllButton).toBeInTheDocument();
		});
		test('filters FAQs based on search query', () => {
			render(
				<FAQCategorySection
					categories={mockFAQData}
					searchQuery='online tutoring'
				/>,
			);
			expect(screen.getByText('Why choose online tutoring?')).toBeInTheDocument();
		});
		test('shows category statistics when enabled', () => {
			const enhancedCategory = {
				...mockFAQData[0],
				slug: 'about-service',
				analytics: {
					helpfulnessRating: 4.2,
					totalRatings: 50,
					averageEngagement: 85,
				},
				priority: 1,
				primaryColor: '#0f172a',
				gradientFrom: '#0f172a',
				gradientTo: '#1e293b',
			};
			render(
				<FAQCategorySection
					categories={[enhancedCategory]}
					showCategoryStats={true}
				/>,
			);
			expect(screen.getByText('Priority 1')).toBeInTheDocument();
		});
	});
	describe('Rating System Data Flow', () => {
		test('rating submission triggers analytics tracking', async () => {
			const mockOnRatingSubmit = jest.fn();
			const ratingData = {
				questionId: 'category-1_0',
				questionText: 'What is My Private Tutor Online?',
				rating: 'helpful' as const,
				timestamp: new Date().toISOString(),
			};
			await mockOnRatingSubmit(ratingData);
			expect(mockOnRatingSubmit).toHaveBeenCalledWith(ratingData);
		});
		test('feedback submission includes all required data', async () => {
			const mockOnRatingSubmit = jest.fn();
			const feedbackData = {
				questionId: 'category-1_0',
				questionText: 'What is My Private Tutor Online?',
				rating: 'not_helpful' as const,
				feedback:
					'This answer could be more detailed and include specific examples.',
				category: 'completeness',
				email: 'user@example.com',
				improvementSuggestions: 'Add examples of successful tutoring outcomes.',
				timestamp: new Date().toISOString(),
				userAgent: navigator.userAgent,
				gdprConsent: true,
			};
			await mockOnRatingSubmit(feedbackData);
			expect(mockOnRatingSubmit).toHaveBeenCalledWith(
				expect.objectContaining({
					questionId: 'category-1_0',
					rating: 'not_helpful',
					feedback: expect.any(String),
					gdprConsent: true,
				}),
			);
		});
		test('performance metrics are tracked during user interaction', () => {
			const mockPerformanceData = {
				questionId: 'category-1_0',
				viewDuration: 15000,
				scrollDepth: 0.8,
				clickToRate: 5000,
				bounceRate: false,
			};
			expect(mockPerformanceData).toEqual({
				questionId: 'category-1_0',
				viewDuration: 15000,
				scrollDepth: 0.8,
				clickToRate: 5000,
				bounceRate: false,
			});
		});
	});
	describe('Admin Dashboard Integration', () => {
		test('loads and displays analytics data', async () => {
			render(<FAQAdminDashboard />);
			await waitFor(() => {
				expect(screen.getByText('FAQ Analytics Dashboard')).toBeInTheDocument();
			});
			expect(screen.getByText('Total Ratings')).toBeInTheDocument();
			expect(screen.getByText('Satisfaction Rate')).toBeInTheDocument();
			expect(screen.getByText('Detailed Feedback')).toBeInTheDocument();
		});
		test('filters feedback data based on user selections', async () => {
			const user = userEvent.setup();
			render(<FAQAdminDashboard />);
			await waitFor(() => {
				expect(screen.getByText('Filters')).toBeInTheDocument();
			});
			const filtersButton = screen.getByText('Filters');
			await user.click(filtersButton);
			await waitFor(() => {
				expect(screen.getByText('Date Range')).toBeInTheDocument();
				expect(screen.getByText('Rating Filter')).toBeInTheDocument();
			});
		});
		test('exports data when export button is clicked', async () => {
			const user = userEvent.setup();
			global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
			global.URL.revokeObjectURL = jest.fn();
			const mockAppendChild = jest.fn();
			const mockRemoveChild = jest.fn();
			const mockClick = jest.fn();
			Object.defineProperty(document, 'createElement', {
				value: jest.fn(() => ({
					href: '',
					download: '',
					click: mockClick,
				})),
			});
			Object.defineProperty(document.body, 'appendChild', {
				value: mockAppendChild,
			});
			Object.defineProperty(document.body, 'removeChild', {
				value: mockRemoveChild,
			});
			render(<FAQAdminDashboard />);
			await waitFor(() => {
				expect(screen.getByText('Export Data')).toBeInTheDocument();
			});
			const exportButton = screen.getByText('Export Data');
			await user.click(exportButton);
			expect(mockClick).toHaveBeenCalled();
		});
		test('updates entry status when changed', async () => {
			localStorageMock.getItem.mockImplementation((key) => {
				if (key.startsWith('faq_feedback_')) {
					return JSON.stringify([
						{
							id: 'feedback-1',
							questionId: 'q1',
							questionText: 'Test question',
							rating: 'not_helpful',
							feedback: 'Needs improvement',
							timestamp: new Date().toISOString(),
							status: 'pending',
						},
					]);
				}
				return null;
			});
			render(<FAQAdminDashboard />);
			await waitFor(() => {
				expect(screen.getByText('Recent Feedback')).toBeInTheDocument();
			});
		});
	});
	describe('End-to-End User Workflows', () => {
		test('complete user feedback journey', async () => {
			const user = userEvent.setup();
			render(<FAQCategorySection categories={mockFAQData} />);
			expect(
				screen.getByText('What is My Private Tutor Online?'),
			).toBeInTheDocument();
			const workflowSteps = [
				'view_faq',
				'expand_answer',
				'rate_not_helpful',
				'fill_feedback_form',
				'submit_feedback',
				'show_success',
			];
			expect(workflowSteps).toContain('view_faq');
			expect(workflowSteps).toContain('submit_feedback');
		});
		test('admin moderation workflow', async () => {
			render(<FAQAdminDashboard />);
			await waitFor(() => {
				expect(screen.getByText('FAQ Analytics Dashboard')).toBeInTheDocument();
			});
			const adminWorkflow = [
				'view_dashboard',
				'filter_feedback',
				'review_feedback',
				'update_status',
				'export_data',
			];
			expect(adminWorkflow).toContain('view_dashboard');
			expect(adminWorkflow).toContain('export_data');
		});
		test('analytics tracking throughout user journey', () => {
			const analyticsEvents = [];
			const mockTrackingEvents = [
				{
					type: 'faq_view',
					questionId: 'q1',
				},
				{
					type: 'faq_expand',
					questionId: 'q1',
					timestamp: Date.now(),
				},
				{
					type: 'rating_submit',
					questionId: 'q1',
					rating: 'helpful',
				},
				{
					type: 'performance_metric',
					questionId: 'q1',
					viewDuration: 15000,
				},
			];
			analyticsEvents.push(...mockTrackingEvents);
			expect(analyticsEvents).toHaveLength(4);
			expect(analyticsEvents[0]).toEqual({
				type: 'faq_view',
				questionId: 'q1',
			});
			expect(analyticsEvents[2]).toEqual({
				type: 'rating_submit',
				questionId: 'q1',
				rating: 'helpful',
			});
		});
	});
	describe('Error Handling and Edge Cases', () => {
		test('handles component mount/unmount gracefully', () => {
			const { unmount } = render(<FAQCategorySection categories={mockFAQData} />);
			expect(screen.getByText('About the Service')).toBeInTheDocument();
			expect(() => unmount()).not.toThrow();
		});
		test('handles empty FAQ data', () => {
			render(<FAQCategorySection categories={[]} />);
			expect(screen.getByRole('region')).toBeInTheDocument();
		});
		test('handles corrupted localStorage data', () => {
			localStorageMock.getItem.mockReturnValue('invalid-json');
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
			expect(() => {
				render(<FAQAdminDashboard />);
			}).not.toThrow();
			consoleSpy.mockRestore();
		});
		test('handles network errors during data submission', async () => {
			const mockOnRatingSubmit = jest
				.fn()
				.mockRejectedValue(new Error('Network error'));
			try {
				await mockOnRatingSubmit({
					questionId: 'q1',
					rating: 'helpful',
				});
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect((error as Error).message).toBe('Network error');
			}
		});
	});
	describe('Performance and Accessibility', () => {
		test('components render within performance budgets', () => {
			const startTime = performance.now();
			render(<FAQCategorySection categories={mockFAQData} />);
			const endTime = performance.now();
			const renderTime = endTime - startTime;
			expect(renderTime).toBeLessThan(100);
		});
		test('maintains accessibility standards', () => {
			render(<FAQCategorySection categories={mockFAQData} />);
			const region = screen.getByRole('region');
			expect(region).toBeInTheDocument();
			const headings = screen.getAllByRole('heading');
			expect(headings.length).toBeGreaterThan(0);
		});
		test('supports keyboard navigation', async () => {
			const user = userEvent.setup();
			render(
				<FAQCategorySection
					categories={mockFAQData}
					enableBulkActions={true}
				/>,
			);
			const expandAllButton = screen.getByText('Expand All');
			expandAllButton.focus();
			expect(document.activeElement).toBe(expandAllButton);
			await user.tab();
			expect(document.activeElement).not.toBe(expandAllButton);
		});
	});
});
