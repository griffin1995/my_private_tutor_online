import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
const SimpleComponent = ({ title }: { title: string }) => {
	return (
		<div>
			<h1>{title}</h1>
			<p>This is a simple test component</p>
		</div>
	);
};
describe('Simple Component Test Infrastructure', () => {
	it('should render a simple component correctly', () => {
		render(<SimpleComponent title='Test Title' />);
		expect(
			screen.getByRole('heading', {
				level: 1,
			}),
		).toHaveTextContent('Test Title');
		expect(
			screen.getByText('This is a simple test component'),
		).toBeInTheDocument();
	});
	it('should handle different props', () => {
		render(<SimpleComponent title='Different Title' />);
		expect(
			screen.getByRole('heading', {
				level: 1,
			}),
		).toHaveTextContent('Different Title');
	});
});
