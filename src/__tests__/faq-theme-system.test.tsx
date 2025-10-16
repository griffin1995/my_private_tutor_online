import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFAQTheme } from '@/hooks/use-faq-theme';
import { FAQThemeSwitcher } from '@/components/faq/faq-theme-switcher';
import '@testing-library/jest-dom';
const mockMatchMedia = jest.fn();
const mockLocalStorage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
};
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: mockMatchMedia,
});
Object.defineProperty(window, 'localStorage', {
	value: mockLocalStorage,
});
const mockHtmlElement = {
	setAttribute: jest.fn(),
	removeAttribute: jest.fn(),
	classList: {
		add: jest.fn(),
		remove: jest.fn(),
	},
};
Object.defineProperty(document, 'documentElement', {
	value: mockHtmlElement,
	writable: true,
});
describe('FAQ Theme System', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockLocalStorage.getItem.mockReturnValue(null);
		mockLocalStorage.setItem.mockClear();
		mockLocalStorage.removeItem.mockClear();
		mockMatchMedia.mockReturnValue({
			matches: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});
		mockHtmlElement.setAttribute.mockClear();
		mockHtmlElement.removeAttribute.mockClear();
		mockHtmlElement.classList.add.mockClear();
		mockHtmlElement.classList.remove.mockClear();
	});
	describe('useFAQTheme Hook', () => {
		test('initializes with default light theme', () => {
			const { result } = renderHook(() => useFAQTheme());
			expect(result.current.currentTheme).toBe('light');
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isSystemTheme).toBe(false);
		});
		test('detects system dark preference', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			});
			const { result } = renderHook(() =>
				useFAQTheme({
					enableSystemDetection: true,
				}),
			);
			expect(result.current.systemPreference).toBe('dark');
		});
		test('loads theme preference from localStorage', () => {
			mockLocalStorage.getItem.mockReturnValue('dark');
			const { result } = renderHook(() => useFAQTheme());
			expect(result.current.currentTheme).toBe('dark');
			expect(result.current.isSystemTheme).toBe(false);
		});
		test('sets theme and updates DOM', async () => {
			const { result } = renderHook(() => useFAQTheme());
			act(() => {
				result.current.setTheme('dark');
			});
			expect(result.current.currentTheme).toBe('dark');
			expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith(
				'data-faq-theme',
				'dark',
			);
			expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
				'faq-theme-preference',
				'dark',
			);
		});
		test('handles system theme selection', async () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			});
			const { result } = renderHook(() =>
				useFAQTheme({
					enableSystemDetection: true,
				}),
			);
			act(() => {
				result.current.setTheme('system');
			});
			expect(result.current.isSystemTheme).toBe(true);
			expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
				'faq-theme-preference',
			);
		});
		test('toggles between light and dark themes', async () => {
			const { result } = renderHook(() => useFAQTheme());
			expect(result.current.currentTheme).toBe('light');
			act(() => {
				result.current.toggleTheme();
			});
			expect(result.current.currentTheme).toBe('dark');
			act(() => {
				result.current.toggleTheme();
			});
			expect(result.current.currentTheme).toBe('light');
		});
		test('validates theme availability', () => {
			const { result } = renderHook(() =>
				useFAQTheme({
					enableSeasonalThemes: false,
				}),
			);
			expect(result.current.isThemeAvailable('light')).toBe(true);
			expect(result.current.isThemeAvailable('dark')).toBe(true);
			expect(result.current.isThemeAvailable('high-contrast')).toBe(true);
			expect(result.current.isThemeAvailable('christmas')).toBe(false);
		});
		test('handles seasonal theme availability', () => {
			const { result } = renderHook(() =>
				useFAQTheme({
					enableSeasonalThemes: true,
				}),
			);
			jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(11);
			expect(result.current.isThemeAvailable('christmas')).toBe(true);
		});
		test('resets to system preference', async () => {
			const { result } = renderHook(() => useFAQTheme());
			act(() => {
				result.current.setTheme('dark');
			});
			expect(result.current.isSystemTheme).toBe(false);
			act(() => {
				result.current.resetToSystem();
			});
			expect(result.current.isSystemTheme).toBe(true);
		});
	});
	describe('FAQThemeSwitcher Component', () => {
		const defaultProps = {
			currentTheme: 'light' as const,
			onThemeChange: jest.fn(),
			showSystemOption: true,
			showSeasonalThemes: false,
			compact: false,
		};
		test('renders theme switcher with current theme', () => {
			render(<FAQThemeSwitcher {...defaultProps} />);
			expect(screen.getByText('Royal Light')).toBeInTheDocument();
			expect(screen.getByLabelText('Switch FAQ theme')).toBeInTheDocument();
		});
		test('opens dropdown when clicked', async () => {
			const user = userEvent.setup();
			render(<FAQThemeSwitcher {...defaultProps} />);
			const button = screen.getByLabelText('Switch FAQ theme');
			await user.click(button);
			expect(screen.getByText('Choose Theme')).toBeInTheDocument();
			expect(screen.getByText('Royal Dark')).toBeInTheDocument();
			expect(screen.getByText('High Contrast')).toBeInTheDocument();
		});
		test('calls onThemeChange when theme is selected', async () => {
			const user = userEvent.setup();
			const mockOnThemeChange = jest.fn();
			render(
				<FAQThemeSwitcher
					{...defaultProps}
					onThemeChange={mockOnThemeChange}
				/>,
			);
			const button = screen.getByLabelText('Switch FAQ theme');
			await user.click(button);
			const darkThemeButton = screen.getByText('Royal Dark');
			await user.click(darkThemeButton);
			expect(mockOnThemeChange).toHaveBeenCalledWith('dark');
		});
		test('shows system option when enabled', async () => {
			const user = userEvent.setup();
			render(
				<FAQThemeSwitcher
					{...defaultProps}
					showSystemOption={true}
				/>,
			);
			const button = screen.getByLabelText('Switch FAQ theme');
			await user.click(button);
			expect(screen.getByText('System Preference')).toBeInTheDocument();
		});
		test('shows seasonal themes when enabled', async () => {
			const user = userEvent.setup();
			jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(11);
			render(
				<FAQThemeSwitcher
					{...defaultProps}
					showSeasonalThemes={true}
				/>,
			);
			const button = screen.getByLabelText('Switch FAQ theme');
			await user.click(button);
			expect(screen.getByText('Christmas')).toBeInTheDocument();
		});
		test('renders compact mode correctly', () => {
			render(
				<FAQThemeSwitcher
					{...defaultProps}
					compact={true}
				/>,
			);
			const button = screen.getByLabelText('Switch FAQ theme');
			expect(button).toHaveClass('w-10', 'h-10', 'rounded-full');
		});
		test('supports keyboard navigation', async () => {
			const user = userEvent.setup();
			render(<FAQThemeSwitcher {...defaultProps} />);
			const button = screen.getByLabelText('Switch FAQ theme');
			await user.type(button, '{enter}');
			expect(screen.getByText('Choose Theme')).toBeInTheDocument();
			await user.type(document.body, '{escape}');
			await waitFor(() => {
				expect(screen.queryByText('Choose Theme')).not.toBeInTheDocument();
			});
		});
		test('closes dropdown on outside click', async () => {
			const user = userEvent.setup();
			render(
				<div>
					<FAQThemeSwitcher {...defaultProps} />
					<div data-testid='outside'>Outside element</div>
				</div>,
			);
			const button = screen.getByLabelText('Switch FAQ theme');
			await user.click(button);
			expect(screen.getByText('Choose Theme')).toBeInTheDocument();
			const outsideElement = screen.getByTestId('outside');
			await user.click(outsideElement);
			await waitFor(() => {
				expect(screen.queryByText('Choose Theme')).not.toBeInTheDocument();
			});
		});
	});
	describe('Accessibility Compliance', () => {
		test('theme switcher has proper ARIA attributes', () => {
			render(<FAQThemeSwitcher {...defaultProps} />);
			const button = screen.getByLabelText('Switch FAQ theme');
			expect(button).toHaveAttribute('aria-expanded', 'false');
			expect(button).toHaveAttribute('aria-label', 'Switch FAQ theme');
		});
		test('updates ARIA expanded state when dropdown opens', async () => {
			const user = userEvent.setup();
			render(<FAQThemeSwitcher {...defaultProps} />);
			const button = screen.getByLabelText('Switch FAQ theme');
			await user.click(button);
			expect(button).toHaveAttribute('aria-expanded', 'true');
		});
		test('high contrast theme provides maximum contrast ratios', () => {
			const { result } = renderHook(() => useFAQTheme());
			act(() => {
				result.current.setTheme('high-contrast');
			});
			expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith(
				'data-faq-theme',
				'high-contrast',
			);
			const styles = getComputedStyle(document.documentElement);
		});
		test('respects reduced motion preference', () => {
			Object.defineProperty(window, 'matchMedia', {
				writable: true,
				value: jest.fn().mockImplementation((query) => ({
					matches: query === '(prefers-reduced-motion: reduce)',
					media: query,
					addEventListener: jest.fn(),
					removeEventListener: jest.fn(),
				})),
			});
			render(<FAQThemeSwitcher {...defaultProps} />);
			const button = screen.getByLabelText('Switch FAQ theme');
			expect(button).toBeInTheDocument();
		});
		test('provides proper focus management', async () => {
			const user = userEvent.setup();
			render(<FAQThemeSwitcher {...defaultProps} />);
			const button = screen.getByLabelText('Switch FAQ theme');
			await user.tab();
			expect(button).toHaveFocus();
			await user.keyboard('{Enter}');
			expect(screen.getByText('Choose Theme')).toBeInTheDocument();
		});
	});
	describe('Performance Optimization', () => {
		test('applies transition classes during theme changes', async () => {
			const { result } = renderHook(() =>
				useFAQTheme({
					transitionDuration: 100,
				}),
			);
			act(() => {
				result.current.setTheme('dark');
			});
			expect(mockHtmlElement.classList.add).toHaveBeenCalledWith(
				'faq-theme-transitioning',
			);
			await waitFor(
				() => {
					expect(result.current.isTransitioning).toBe(false);
				},
				{
					timeout: 200,
				},
			);
		});
		test('prevents layout shifts during theme loading', () => {
			const { result } = renderHook(() => useFAQTheme());
			expect(result.current.isLoading).toBe(true);
			waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});
		});
		test('debounces rapid theme changes', async () => {
			const { result } = renderHook(() =>
				useFAQTheme({
					transitionDuration: 50,
				}),
			);
			act(() => {
				result.current.setTheme('dark');
				result.current.setTheme('high-contrast');
				result.current.setTheme('light');
			});
			expect(result.current.currentTheme).toBe('light');
		});
	});
	describe('CSS Custom Properties Integration', () => {
		test('applies correct CSS custom properties for light theme', () => {
			const { result } = renderHook(() => useFAQTheme());
			act(() => {
				result.current.setTheme('light');
			});
			expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith(
				'data-faq-theme',
				'light',
			);
		});
		test('applies correct CSS custom properties for dark theme', () => {
			const { result } = renderHook(() => useFAQTheme());
			act(() => {
				result.current.setTheme('dark');
			});
			expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith(
				'data-faq-theme',
				'dark',
			);
		});
		test('applies system preference theme to DOM', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			});
			const { result } = renderHook(() =>
				useFAQTheme({
					enableSystemDetection: true,
				}),
			);
			act(() => {
				result.current.setTheme('system');
			});
			expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith(
				'data-faq-theme',
				'dark',
			);
		});
	});
	describe('Error Handling', () => {
		test('handles localStorage errors gracefully', () => {
			mockLocalStorage.getItem.mockImplementation(() => {
				throw new Error('LocalStorage error');
			});
			const { result } = renderHook(() =>
				useFAQTheme({
					debugMode: true,
				}),
			);
			expect(result.current.currentTheme).toBe('light');
			expect(result.current.isLoading).toBe(false);
		});
		test('handles invalid stored theme gracefully', () => {
			mockLocalStorage.getItem.mockReturnValue('invalid-theme');
			const { result } = renderHook(() => useFAQTheme());
			expect(result.current.isSystemTheme).toBe(true);
		});
		test('prevents setting unavailable themes', () => {
			const { result } = renderHook(() =>
				useFAQTheme({
					enableSeasonalThemes: false,
				}),
			);
			act(() => {
				result.current.setTheme('christmas');
			});
			expect(result.current.currentTheme).toBe('light');
			expect(mockHtmlElement.setAttribute).not.toHaveBeenCalledWith(
				'data-faq-theme',
				'christmas',
			);
		});
	});
	describe('Integration Testing', () => {
		test('complete theme switching workflow', async () => {
			const user = userEvent.setup();
			const mockOnThemeChange = jest.fn();
			render(
				<FAQThemeSwitcher
					{...defaultProps}
					onThemeChange={mockOnThemeChange}
				/>,
			);
			const button = screen.getByLabelText('Switch FAQ theme');
			await user.click(button);
			expect(screen.getByText('Royal Light')).toBeInTheDocument();
			expect(screen.getByText('Royal Dark')).toBeInTheDocument();
			expect(screen.getByText('High Contrast')).toBeInTheDocument();
			const darkTheme = screen.getByText('Royal Dark');
			await user.click(darkTheme);
			expect(mockOnThemeChange).toHaveBeenCalledWith('dark');
			await waitFor(() => {
				expect(screen.queryByText('Choose Theme')).not.toBeInTheDocument();
			});
		});
		test('theme persistence across component remounts', () => {
			mockLocalStorage.getItem.mockReturnValue('dark');
			const { result: result1 } = renderHook(() => useFAQTheme());
			expect(result1.current.currentTheme).toBe('dark');
			const { result: result2 } = renderHook(() => useFAQTheme());
			expect(result2.current.currentTheme).toBe('dark');
		});
	});
});
export function getThemeCustomProperty(property: string): string {
	return getComputedStyle(document.documentElement).getPropertyValue(property);
}
export function mockSystemThemePreference(isDark: boolean) {
	const mockMediaQuery = {
		matches: isDark,
		media: '(prefers-color-scheme: dark)',
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
	};
	window.matchMedia = jest.fn().mockReturnValue(mockMediaQuery);
	return mockMediaQuery;
}
export async function expectSmoothTransition(
	transitionDuration: number = 300,
): Promise<void> {
	const startTime = performance.now();
	await waitFor(() => {
		const elapsed = performance.now() - startTime;
		expect(elapsed).toBeLessThanOrEqual(transitionDuration + 50);
	});
}
export default {
	getThemeCustomProperty,
	mockSystemThemePreference,
	expectSmoothTransition,
};
