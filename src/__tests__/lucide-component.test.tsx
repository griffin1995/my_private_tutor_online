import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as LucideIcons from 'lucide-react';
const IconTestComponent = () => {
	const { Crown, Star, CheckCircle } = LucideIcons;
	return (
		<div>
			<Crown data-testid='crown-icon' />
			<Star data-testid='star-icon' />
			<CheckCircle data-testid='check-icon' />
			<span>Component with icons</span>
		</div>
	);
};
describe('Lucide React Icon Testing', () => {
	it('should render icons correctly with mocks', () => {
		render(<IconTestComponent />);
		expect(screen.getByTestId('crown-icon')).toBeInTheDocument();
		expect(screen.getByTestId('star-icon')).toBeInTheDocument();
		expect(screen.getByTestId('check-icon')).toBeInTheDocument();
		expect(screen.getByText('Component with icons')).toBeInTheDocument();
		const crownIcon = screen.getByTestId('crown-icon');
		expect(crownIcon).toHaveAttribute('aria-label', 'Crown');
		expect(crownIcon.tagName.toLowerCase()).toBe('svg');
		expect(crownIcon).toHaveClass('lucide lucide-crown');
	});
});
