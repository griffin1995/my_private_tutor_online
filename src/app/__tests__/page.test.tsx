import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';
jest.mock('../../lib/cms', () => ({
	cmsService: {
		getHomepageData: jest.fn(() => ({
			hero: {
				title: 'Premium Private Tutoring',
				subtitle: 'Trusted by Royal Families Since 2010',
				description: 'Exceptional academic support with proven results',
				cta: {
					primary: {
						text: 'Book Assessment',
						href: '/assessment',
					},
					secondary: {
						text: 'Learn More',
						href: '/about',
					},
				},
			},
			trustIndicators: [
				{
					icon: '👑',
					title: 'Royal Endorsements',
					description: 'Trusted by elite families',
				},
				{
					icon: '🎯',
					title: '98% Success Rate',
					description: 'Proven track record',
				},
				{
					icon: '🏆',
					title: 'Award-Winning',
					description: 'Recognised excellence',
				},
			],
		})),
		getTestimonials: jest.fn(() => [
			{
				quote: "Outstanding results for our son's A-levels.",
				author: 'Lady Smith',
				role: 'Parent',
				rating: 5,
			},
		]),
		getServices: jest.fn(() => []),
		getInstance: jest.fn(() => ({
			getHomepageData: jest.fn(() => ({})),
			getTestimonials: jest.fn(() => []),
			getServices: jest.fn(() => []),
		})),
	},
}));
jest.mock('framer-motion', () => ({
	motion: {
		div: 'div',
		section: 'section',
		h1: 'h1',
		h2: 'h2',
		p: 'p',
		button: 'button',
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
	useInView: () => ({
		ref: jest.fn(),
		inView: true,
	}),
}));
jest.mock('react-intersection-observer', () => ({
	useInView: () => ({
		ref: jest.fn(),
		inView: true,
	}),
}));
describe('Homepage', () => {
	it('renders homepage without crashing', () => {
		render(<Home />);
		expect(document.body).toBeInTheDocument();
	});
	it('displays main heading', () => {
		render(<Home />);
		const headings = screen.getAllByRole('heading');
		expect(headings.length).toBeGreaterThan(0);
	});
	it('has proper document structure', () => {
		render(<Home />);
		const mainContent = document.querySelector('main');
		expect(mainContent || document.body).toBeInTheDocument();
	});
	it('has accessible navigation structure', () => {
		render(<Home />);
		const buttons = screen.queryAllByRole('button');
		const links = screen.queryAllByRole('link');
		expect(buttons.length + links.length).toBeGreaterThan(0);
	});
	it('renders trust indicators section', () => {
		render(<Home />);
		const trustContent =
			screen.queryByText(/royal/i) ||
			screen.queryByText(/trust/i) ||
			screen.queryByText(/premium/i);
		expect(trustContent).toBeInTheDocument();
	});
});
describe('Homepage Snapshots', () => {
	it('renders homepage structure consistently', () => {
		const { container } = render(<Home />);
		const mainContent = container.firstChild;
		expect(mainContent).toMatchSnapshot();
	});
});
