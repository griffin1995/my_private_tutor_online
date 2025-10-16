import React from 'react';
import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FAQRatingSystem } from '@/components/faq/faq-rating-system';
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
		generateReport: jest.fn(),
	},
}));
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});
describe('FAQRatingSystem', () => {
	const defaultProps = {
		questionId: 'test-question-1',
		questionText: 'How does online tutoring work?',
		onRatingSubmit: jest.fn(),
	};
	beforeEach(() => {
		jest.clearAllMocks();
		localStorageMock.getItem.mockReturnValue(null);
		localStorageMock.setItem.mockImplementation(() => {});
	});
	describe('Initial Rendering', () => {
		test('renders rating question and buttons', () => {
			render(<FAQRatingSystem {...defaultProps} />);
			expect(screen.getByText('Was this answer helpful?')).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: /yes, helpful/i,
				}),
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: /no, not helpful/i,
				}),
			).toBeInTheDocument();
		});
		test('shows additional feedback button initially', () => {
			render(<FAQRatingSystem {...defaultProps} />);
			expect(screen.getByText('Provide additional feedback')).toBeInTheDocument();
		});
		test('does not show analytics initially if no previous data', () => {
			render(<FAQRatingSystem {...defaultProps} />);
			expect(screen.queryByText(/found this helpful/)).not.toBeInTheDocument();
		});
	});
	describe('Rating Functionality', () => {
		test('allows user to rate as helpful', async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const helpfulButton = screen.getByRole('button', {
				name: /yes, helpful/i,
			});
			await user.click(helpfulButton);
			expect(localStorageMock.setItem).toHaveBeenCalledWith(
				'faq_rating_test-question-1',
				expect.stringContaining('"rating":"helpful"'),
			);
		});
		test('allows user to rate as not helpful and shows feedback form', async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
			expect(localStorageMock.setItem).toHaveBeenCalledWith(
				'faq_rating_test-question-1',
				expect.stringContaining('"rating":"not_helpful"'),
			);
			await waitFor(() => {
				expect(screen.getByText('What could be improved?')).toBeInTheDocument();
			});
		});
		test('prevents multiple ratings from same user', async () => {
			const user = userEvent.setup();
			localStorageMock.getItem.mockReturnValue(
				JSON.stringify({
					rating: 'helpful',
					timestamp: new Date().toISOString(),
				}),
			);
			render(<FAQRatingSystem {...defaultProps} />);
			const helpfulButton = screen.getByRole('button', {
				name: /yes, helpful/i,
			});
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			expect(helpfulButton).toBeDisabled();
			expect(notHelpfulButton).toBeDisabled();
		});
	});
	describe('Feedback Form', () => {
		beforeEach(async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
		});
		test('shows feedback form with required fields', async () => {
			await waitFor(() => {
				expect(screen.getByText('What could be improved?')).toBeInTheDocument();
				expect(screen.getByRole('combobox')).toBeInTheDocument();
				expect(screen.getByRole('textbox')).toBeInTheDocument();
			});
		});
		test('validates required feedback field', async () => {
			const user = userEvent.setup();
			await waitFor(() => {
				expect(
					screen.getByRole('button', {
						name: /submit feedback/i,
					}),
				).toBeInTheDocument();
			});
			const submitButton = screen.getByRole('button', {
				name: /submit feedback/i,
			});
			await user.click(submitButton);
			expect(
				screen.getByText('Please provide at least 10 characters of feedback'),
			).toBeInTheDocument();
		});
		test('validates feedback minimum length', async () => {
			const user = userEvent.setup();
			await waitFor(() => {
				expect(screen.getByRole('textbox')).toBeInTheDocument();
			});
			const feedbackTextarea = screen.getByRole('textbox');
			await user.type(feedbackTextarea, 'Too short');
			const submitButton = screen.getByRole('button', {
				name: /submit feedback/i,
			});
			await user.click(submitButton);
			expect(
				screen.getByText('Please provide at least 10 characters of feedback'),
			).toBeInTheDocument();
		});
		test('validates feedback maximum length', async () => {
			const user = userEvent.setup();
			await waitFor(() => {
				expect(screen.getByRole('textbox')).toBeInTheDocument();
			});
			const feedbackTextarea = screen.getByRole('textbox');
			const longFeedback = 'a'.repeat(1001);
			await user.type(feedbackTextarea, longFeedback);
			expect(
				screen.getByText('Feedback must be less than 1000 characters'),
			).toBeInTheDocument();
		});
		test('validates email format when provided', async () => {
			const user = userEvent.setup();
			await waitFor(() => {
				expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
			});
			const emailInput = screen.getByLabelText(/email/i);
			await user.type(emailInput, 'invalid-email');
			await user.tab();
			expect(
				screen.getByText('Please enter a valid email address'),
			).toBeInTheDocument();
		});
		test('submits valid feedback successfully', async () => {
			const user = userEvent.setup();
			await waitFor(() => {
				expect(screen.getByRole('combobox')).toBeInTheDocument();
				expect(screen.getByRole('textbox')).toBeInTheDocument();
			});
			const categorySelect = screen.getByRole('combobox');
			await user.selectOptions(categorySelect, 'clarity');
			const feedbackTextarea = screen.getByRole('textbox');
			await user.type(
				feedbackTextarea,
				'This answer could be more clear and detailed.',
			);
			const emailInput = screen.getByLabelText(/email/i);
			await user.type(emailInput, 'test@example.com');
			const submitButton = screen.getByRole('button', {
				name: /submit feedback/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(
					screen.getByText('Thank you for your feedback!'),
				).toBeInTheDocument();
			});
			expect(defaultProps.onRatingSubmit).toHaveBeenCalledWith(
				expect.objectContaining({
					questionId: 'test-question-1',
					rating: 'not_helpful',
					category: 'clarity',
					feedback: 'This answer could be more clear and detailed.',
					email: 'test@example.com',
				}),
			);
		});
	});
	describe('Spam Prevention', () => {
		test('includes honeypot field that is hidden', async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
			await waitFor(() => {
				const honeypotField = screen.getByRole('textbox', {
					hidden: true,
				});
				expect(honeypotField).toBeInTheDocument();
				expect(honeypotField).toHaveClass('hidden');
			});
		});
		test('rejects submission when honeypot is filled', async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
			await waitFor(() => {
				expect(screen.getByRole('textbox')).toBeInTheDocument();
			});
			const honeypotField = screen.getByRole('textbox', {
				hidden: true,
			});
			await user.type(honeypotField, 'spam');
			const feedbackTextarea = screen.getByRole('textbox', {
				hidden: false,
			});
			await user.type(feedbackTextarea, 'This is legitimate feedback');
			const submitButton = screen.getByRole('button', {
				name: /submit feedback/i,
			});
			await user.click(submitButton);
			expect(defaultProps.onRatingSubmit).not.toHaveBeenCalled();
		});
	});
	describe('GDPR Compliance', () => {
		test('shows privacy notice in feedback form', async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
			await waitFor(() => {
				expect(screen.getByText(/Privacy Notice/)).toBeInTheDocument();
				expect(screen.getByText(/GDPR regulations/)).toBeInTheDocument();
			});
		});
		test('includes GDPR consent in submission data', async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
			await waitFor(() => {
				expect(screen.getByRole('textbox')).toBeInTheDocument();
			});
			const feedbackTextarea = screen.getByRole('textbox');
			await user.type(feedbackTextarea, 'This answer needs improvement.');
			const submitButton = screen.getByRole('button', {
				name: /submit feedback/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(defaultProps.onRatingSubmit).toHaveBeenCalledWith(
					expect.objectContaining({
						gdprConsent: true,
					}),
				);
			});
		});
	});
	describe('Analytics Integration', () => {
		test('displays rating analytics when available', () => {
			localStorageMock.getItem.mockImplementation((key) => {
				if (key === 'faq_analytics_test-question-1') {
					return JSON.stringify({
						helpfulCount: 8,
						notHelpfulCount: 2,
						feedbackCount: 3,
					});
				}
				return null;
			});
			render(<FAQRatingSystem {...defaultProps} />);
			expect(screen.getByText('80% found this helpful')).toBeInTheDocument();
			expect(screen.getByText('(10 votes)')).toBeInTheDocument();
		});
		test('shows progress bar for rating distribution', () => {
			localStorageMock.getItem.mockImplementation((key) => {
				if (key === 'faq_analytics_test-question-1') {
					return JSON.stringify({
						helpfulCount: 7,
						notHelpfulCount: 3,
						feedbackCount: 2,
					});
				}
				return null;
			});
			render(<FAQRatingSystem {...defaultProps} />);
			const progressBar = screen.getByRole('progressbar');
			expect(progressBar).toHaveStyle({
				width: '70%',
			});
		});
	});
	describe('Accessibility', () => {
		test('has proper ARIA labels and roles', () => {
			render(<FAQRatingSystem {...defaultProps} />);
			const helpfulButton = screen.getByRole('button', {
				name: /yes, helpful/i,
			});
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			expect(helpfulButton).toHaveAccessibleName();
			expect(notHelpfulButton).toHaveAccessibleName();
		});
		test('shows error messages with proper ARIA attributes', async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
			await waitFor(() => {
				expect(screen.getByRole('textbox')).toBeInTheDocument();
			});
			const submitButton = screen.getByRole('button', {
				name: /submit feedback/i,
			});
			await user.click(submitButton);
			const errorMessage = screen.getByText(
				'Please provide at least 10 characters of feedback',
			);
			expect(errorMessage).toHaveAttribute('role', 'alert');
		});
		test('maintains focus management during form interactions', async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
			await waitFor(() => {
				const categorySelect = screen.getByRole('combobox');
				expect(categorySelect).toBeInTheDocument();
				expect(document.activeElement).toBe(categorySelect);
			});
		});
	});
	describe('Error Handling', () => {
		test('handles form submission errors gracefully', async () => {
			const user = userEvent.setup();
			const mockOnRatingSubmit = jest
				.fn()
				.mockRejectedValue(new Error('Network error'));
			render(
				<FAQRatingSystem
					{...defaultProps}
					onRatingSubmit={mockOnRatingSubmit}
				/>,
			);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
			await waitFor(() => {
				expect(screen.getByRole('textbox')).toBeInTheDocument();
			});
			const feedbackTextarea = screen.getByRole('textbox');
			await user.type(feedbackTextarea, 'This answer needs improvement.');
			const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
			const submitButton = screen.getByRole('button', {
				name: /submit feedback/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(alertSpy).toHaveBeenCalledWith(
					'Failed to submit feedback. Please try again.',
				);
			});
			alertSpy.mockRestore();
		});
		test('handles localStorage errors gracefully', () => {
			localStorageMock.setItem.mockImplementation(() => {
				throw new Error('Storage quota exceeded');
			});
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
			render(<FAQRatingSystem {...defaultProps} />);
			expect(screen.getByText('Was this answer helpful?')).toBeInTheDocument();
			consoleSpy.mockRestore();
		});
	});
	describe('Performance', () => {
		test('debounces feedback character count updates', async () => {
			const user = userEvent.setup();
			render(<FAQRatingSystem {...defaultProps} />);
			const notHelpfulButton = screen.getByRole('button', {
				name: /no, not helpful/i,
			});
			await user.click(notHelpfulButton);
			await waitFor(() => {
				expect(screen.getByRole('textbox')).toBeInTheDocument();
			});
			const feedbackTextarea = screen.getByRole('textbox');
			await user.type(feedbackTextarea, 'This is a test message');
			expect(screen.getByText(/\/1000$/)).toBeInTheDocument();
		});
	});
});
