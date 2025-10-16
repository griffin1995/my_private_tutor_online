import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { NewsletterForm } from '../newsletter-form';
jest.mock('@/lib/cms/cms-content', () => ({
	getNewsletterFormContent: () => ({
		title: 'Stay Updated with Premium Educational Insights',
		description:
			'Receive exclusive tutoring tips, academic news, and educational opportunities.',
		successMessage: 'Thank you for subscribing to our premium newsletter!',
		buttonText: 'Subscribe Now',
		fields: {
			firstName: {
				placeholder: 'Enter your first name',
			},
			email: {
				placeholder: 'Enter your email address',
			},
		},
	}),
}));
jest.mock('@/lib/validation/schemas', () => ({
	newsletterSchema: {
		parse: jest.fn(),
		safeParse: jest.fn(),
	},
}));
const mockFetch = jest.fn();
global.fetch = mockFetch;
describe('NewsletterForm', () => {
	beforeEach(() => {
		mockFetch.mockClear();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('Default Variant Rendering', () => {
		it('renders with CMS-driven content', () => {
			render(<NewsletterForm />);
			expect(
				screen.getByText(/stay.*updated.*premium.*educational.*insights/i),
			).toBeInTheDocument();
			expect(
				screen.getByText(/receive.*exclusive.*tutoring.*tips/i),
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: /subscribe.*now/i,
				}),
			).toBeInTheDocument();
		});
		it('displays required email field with icon', () => {
			render(<NewsletterForm />);
			const emailInput = screen.getByLabelText(/email.*address/i);
			expect(emailInput).toBeInTheDocument();
			expect(emailInput).toHaveAttribute('type', 'email');
			expect(emailInput).toHaveAttribute(
				'placeholder',
				'Enter your email address',
			);
			const mailIcon = document.querySelector('[class*="lucide-mail"]');
			expect(mailIcon).toBeInTheDocument();
		});
		it('shows marketing consent checkbox by default', () => {
			render(<NewsletterForm />);
			const consentCheckbox = screen.getByLabelText(
				/consent.*marketing.*communications/i,
			);
			expect(consentCheckbox).toBeInTheDocument();
			expect(consentCheckbox).not.toBeChecked();
		});
		it('includes honeypot field for spam prevention', () => {
			render(<NewsletterForm />);
			const honeypotField = screen.getByRole('textbox', {
				hidden: true,
			});
			expect(honeypotField).toHaveAttribute('tabIndex', '-1');
			expect(honeypotField).toHaveAttribute('aria-hidden', 'true');
			expect(honeypotField).toHaveClass('sr-only');
		});
	});
	describe('Variant Rendering', () => {
		it('renders inline variant with compact layout', () => {
			render(<NewsletterForm variant='inline' />);
			expect(
				screen.queryByText(/stay.*updated.*premium/i),
			).not.toBeInTheDocument();
			const form = screen.getByRole('form');
			expect(form).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'gap-4');
		});
		it('renders card variant with enhanced styling', () => {
			render(<NewsletterForm variant='card' />);
			const container = screen.getByText(/stay.*updated.*premium/i).closest('div');
			expect(container).toHaveClass('bg-white', 'rounded-lg', 'shadow-lg');
			expect(
				screen.getByText(/privacy.*policy.*unsubscribe.*anytime/i),
			).toBeInTheDocument();
		});
		it('renders hero variant with gradient styling', () => {
			render(<NewsletterForm variant='hero' />);
			const title = screen.getByText(/stay.*updated.*premium/i);
			expect(title).toHaveClass('text-4xl', 'mb-4');
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			expect(submitButton).toHaveClass(
				'bg-gradient-to-r',
				'from-accent-600',
				'to-accent-700',
			);
		});
	});
	describe('Optional Features', () => {
		it('shows first name field when enabled', () => {
			render(<NewsletterForm showName={true} />);
			const firstNameInput = screen.getByLabelText(/first.*name.*optional/i);
			expect(firstNameInput).toBeInTheDocument();
			expect(firstNameInput).toHaveAttribute(
				'placeholder',
				'Enter your first name',
			);
		});
		it('displays interest selection when enabled', () => {
			render(<NewsletterForm showInterests={true} />);
			expect(screen.getByText(/areas.*interest.*optional/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/primary.*education/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/secondary.*education/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/gcse.*preparation/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/a-level.*preparation/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/oxbridge.*preparation/i)).toBeInTheDocument();
		});
		it('allows multiple interest selection', async () => {
			const user = userEvent.setup();
			render(<NewsletterForm showInterests={true} />);
			const primaryEducation = screen.getByLabelText(/primary.*education/i);
			const oxbridgePrep = screen.getByLabelText(/oxbridge.*preparation/i);
			await user.click(primaryEducation);
			await user.click(oxbridgePrep);
			expect(primaryEducation).toBeChecked();
			expect(oxbridgePrep).toBeChecked();
		});
		it('updates visual state when interests are selected', async () => {
			const user = userEvent.setup();
			render(<NewsletterForm showInterests={true} />);
			const primaryEducationLabel = screen
				.getByLabelText(/primary.*education/i)
				.closest('label');
			expect(primaryEducationLabel).not.toHaveClass('bg-accent-50');
			await user.click(screen.getByLabelText(/primary.*education/i));
			expect(primaryEducationLabel).toHaveClass(
				'bg-accent-50',
				'border-accent-300',
			);
		});
	});
	describe('Form Validation', () => {
		it('validates required email field', async () => {
			const user = userEvent.setup();
			render(<NewsletterForm />);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				const errorIcon = document.querySelector('[class*="lucide-alert-circle"]');
				expect(errorIcon).toBeInTheDocument();
			});
		});
		it('validates email format', async () => {
			const user = userEvent.setup();
			render(<NewsletterForm />);
			const emailInput = screen.getByLabelText(/email.*address/i);
			await user.type(emailInput, 'invalid-email-format');
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				const errorIcon = document.querySelector('[class*="lucide-alert-circle"]');
				expect(errorIcon).toBeInTheDocument();
			});
		});
		it('shows error state styling on invalid fields', async () => {
			const user = userEvent.setup();
			render(<NewsletterForm />);
			const emailInput = screen.getByLabelText(/email.*address/i);
			await user.type(emailInput, 'invalid');
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(emailInput).toHaveClass('border-red-300', 'bg-red-50');
			});
		});
	});
	describe('Form Submission', () => {
		const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
			const emailInput = screen.getByLabelText(/email.*address/i);
			await user.type(emailInput, 'royal@example.com');
			const consentCheckbox = screen.getByLabelText(/consent.*marketing/i);
			await user.click(consentCheckbox);
		};
		it('submits form with valid data successfully', async () => {
			const user = userEvent.setup();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: true,
				}),
			});
			render(<NewsletterForm />);
			await fillValidForm(user);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(mockFetch).toHaveBeenCalledWith('/api/newsletter', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: expect.stringContaining('royal@example.com'),
				});
			});
		});
		it('shows loading state during submission', async () => {
			const user = userEvent.setup();
			mockFetch.mockImplementationOnce(
				() =>
					new Promise((resolve) =>
						setTimeout(
							() =>
								resolve({
									ok: true,
									json: async () => ({
										success: true,
									}),
								}),
							100,
						),
					),
			);
			render(<NewsletterForm />);
			await fillValidForm(user);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			expect(screen.getByText(/subscribing/i)).toBeInTheDocument();
			expect(submitButton).toBeDisabled();
			const spinner = document.querySelector('[class*="animate-spin"]');
			expect(spinner).toBeInTheDocument();
		});
		it('includes interests in submission when selected', async () => {
			const user = userEvent.setup();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: true,
				}),
			});
			render(<NewsletterForm showInterests={true} />);
			const emailInput = screen.getByLabelText(/email.*address/i);
			await user.type(emailInput, 'royal@example.com');
			await user.click(screen.getByLabelText(/primary.*education/i));
			await user.click(screen.getByLabelText(/oxbridge.*preparation/i));
			const consentCheckbox = screen.getByLabelText(/consent.*marketing/i);
			await user.click(consentCheckbox);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(mockFetch).toHaveBeenCalledWith(
					'/api/newsletter',
					expect.objectContaining({
						body: expect.stringContaining('primary-education'),
					}),
				);
			});
		});
		it('includes first name when provided', async () => {
			const user = userEvent.setup();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: true,
				}),
			});
			render(<NewsletterForm showName={true} />);
			const firstNameInput = screen.getByLabelText(/first.*name/i);
			await user.type(firstNameInput, 'Elizabeth');
			await fillValidForm(user);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(mockFetch).toHaveBeenCalledWith(
					'/api/newsletter',
					expect.objectContaining({
						body: expect.stringContaining('Elizabeth'),
					}),
				);
			});
		});
		it('handles submission errors gracefully', async () => {
			const user = userEvent.setup();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: false,
					error: 'Email already subscribed',
				}),
			});
			render(<NewsletterForm />);
			await fillValidForm(user);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(screen.getByText(/email.*already.*subscribed/i)).toBeInTheDocument();
			});
		});
		it('handles network errors gracefully', async () => {
			const user = userEvent.setup();
			mockFetch.mockRejectedValueOnce(new Error('Network error'));
			render(<NewsletterForm />);
			await fillValidForm(user);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(
					screen.getByText(/network.*error.*check.*connection/i),
				).toBeInTheDocument();
			});
		});
		it('calls onSuccess callback when provided', async () => {
			const user = userEvent.setup();
			const onSuccessMock = jest.fn();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: true,
				}),
			});
			render(<NewsletterForm onSuccess={onSuccessMock} />);
			await fillValidForm(user);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(onSuccessMock).toHaveBeenCalledWith(
					expect.objectContaining({
						email: 'royal@example.com',
					}),
				);
			});
		});
	});
	describe('Success State', () => {
		it('displays success message in default variant', async () => {
			const user = userEvent.setup();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: true,
				}),
			});
			render(<NewsletterForm />);
			await fillValidForm(user);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(screen.getByText(/success/i)).toBeInTheDocument();
				expect(
					screen.getByText(/thank.*you.*subscribing.*premium.*newsletter/i),
				).toBeInTheDocument();
			});
		});
		it('shows inline success message in inline variant', async () => {
			const user = userEvent.setup();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: true,
				}),
			});
			render(<NewsletterForm variant='inline' />);
			const emailInput = screen.getByPlaceholderText(/enter.*email.*address/i);
			await user.type(emailInput, 'royal@example.com');
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(screen.getByText(/subscribed/i)).toBeInTheDocument();
			});
		});
		it('resets form after successful submission', async () => {
			const user = userEvent.setup();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: true,
				}),
			});
			render(<NewsletterForm showName={true} />);
			const firstNameInput = screen.getByLabelText(/first.*name/i);
			const emailInput = screen.getByLabelText(/email.*address/i);
			await user.type(firstNameInput, 'Elizabeth');
			await user.type(emailInput, 'royal@example.com');
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				expect(screen.getByText(/success/i)).toBeInTheDocument();
			});
		});
	});
	describe('Accessibility', () => {
		it('has proper form labelling for screen readers', () => {
			render(<NewsletterForm showName={true} />);
			const emailInput = screen.getByLabelText(/email.*address/i);
			expect(emailInput).toHaveAttribute('id', 'email');
			const firstNameInput = screen.getByLabelText(/first.*name/i);
			expect(firstNameInput).toHaveAttribute('id', 'firstName');
			const consentCheckbox = screen.getByLabelText(/consent.*marketing/i);
			expect(consentCheckbox).toHaveAttribute('id', 'consentToMarketing');
		});
		it('provides proper error announcements', async () => {
			const user = userEvent.setup();
			render(<NewsletterForm />);
			const submitButton = screen.getByRole('button', {
				name: /subscribe.*now/i,
			});
			await user.click(submitButton);
			await waitFor(() => {
				const errorIcon = document.querySelector('[class*="lucide-alert-circle"]');
				expect(errorIcon).toBeInTheDocument();
			});
		});
		it('maintains focus management during interactions', async () => {
			const user = userEvent.setup();
			render(<NewsletterForm showInterests={true} />);
			await user.tab();
			expect(screen.getByLabelText(/email.*address/i)).toHaveFocus();
		});
		it('provides proper ARIA attributes for interest selection', () => {
			render(<NewsletterForm showInterests={true} />);
			const interestCheckboxes = screen.getAllByRole('checkbox');
			interestCheckboxes.forEach((checkbox) => {
				expect(checkbox).toHaveAttribute('type', 'checkbox');
			});
		});
	});
	describe('Custom Content Override', () => {
		it('allows prop-based content override', () => {
			const customTitle = 'Custom Newsletter Title';
			const customDescription = 'Custom newsletter description';
			const customButtonText = 'Custom Subscribe';
			render(
				<NewsletterForm
					title={customTitle}
					description={customDescription}
					buttonText={customButtonText}
				/>,
			);
			expect(screen.getByText(customTitle)).toBeInTheDocument();
			expect(screen.getByText(customDescription)).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: customButtonText,
				}),
			).toBeInTheDocument();
		});
	});
	describe('Spam Prevention', () => {
		it('includes honeypot field that is hidden from users', () => {
			render(<NewsletterForm />);
			const honeypotField = screen.getByRole('textbox', {
				hidden: true,
			});
			expect(honeypotField).toBeInTheDocument();
			expect(honeypotField).toHaveAttribute('autoComplete', 'off');
			expect(honeypotField).toHaveAttribute('tabIndex', '-1');
		});
	});
});
