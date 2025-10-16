import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TestimonialCard } from '../testimonial-card';
jest.mock('framer-motion', () => ({
	m: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
		span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
	},
}));
const mockTestimonial = {
	id: 'test-testimonial-1',
	name: 'Lady Catherine Windsor',
	role: 'Parent',
	content:
		'Exceptional tutoring service that helped our son achieve outstanding results. The personalized approach and expert guidance exceeded our expectations.',
	rating: 5,
	verified: true,
	location: 'London, UK',
	date: '2024-03-15',
	subjects: ['Mathematics', 'English Literature'],
	schoolType: 'Independent',
	achievement: 'Oxford University Acceptance',
	image: '/testimonials/catherine-windsor.jpg',
	helpful: 42,
	hasVideo: true,
	videoUrl: '/videos/testimonial-catherine.mp4',
	expandedContent:
		'The detailed approach taken by My Private Tutor Online was remarkable. From the initial assessment to the final results, every step was meticulously planned and executed. Our son not only improved academically but also gained confidence that will serve him well throughout his educational journey.',
	tags: ['Oxbridge', 'A-Level', 'Premium Service'],
	credibility: {
		schoolName: 'Westminster School',
		yearGroup: 'Year 13',
		previousResults: 'A*A*A predicted',
	},
};
describe('TestimonialCard', () => {
	describe('Basic Rendering', () => {
		it('renders testimonial card with essential information', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			expect(screen.getByText('Lady Catherine Windsor')).toBeInTheDocument();
			expect(screen.getByText('Parent')).toBeInTheDocument();
			expect(
				screen.getByText(/exceptional tutoring service/i),
			).toBeInTheDocument();
			expect(screen.getByText('London, UK')).toBeInTheDocument();
		});
		it('displays rating stars correctly', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const stars = document.querySelectorAll('[class*="lucide-star"]');
			expect(stars.length).toBeGreaterThanOrEqual(5);
		});
		it('shows verification badge for verified testimonials', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			expect(screen.getByText(/verified/i)).toBeInTheDocument();
			const shieldIcon = document.querySelector('[class*="lucide-shield"]');
			expect(shieldIcon).toBeInTheDocument();
		});
		it('displays location and date information', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			expect(screen.getByText('London, UK')).toBeInTheDocument();
			const mapIcon = document.querySelector('[class*="lucide-map-pin"]');
			expect(mapIcon).toBeInTheDocument();
			const calendarIcon = document.querySelector('[class*="lucide-calendar"]');
			expect(calendarIcon).toBeInTheDocument();
		});
		it('shows subject tags', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			expect(screen.getByText('Mathematics')).toBeInTheDocument();
			expect(screen.getByText('English Literature')).toBeInTheDocument();
		});
		it('displays achievement information', () => {
			render(<Testimonial testimonial={mockTestimonial} />);
			expect(screen.getByText('Oxford University Acceptance')).toBeInTheDocument();
		});
	});
	describe('Interactive Features', () => {
		it('shows expand button for longer content', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const expandButton = screen.getByRole('button', {
				name: /read more/i,
			});
			expect(expandButton).toBeInTheDocument();
			const chevronIcon = document.querySelector('[class*="lucide-chevron-down"]');
			expect(chevronIcon).toBeInTheDocument();
		});
		it('expands content when expand button is clicked', async () => {
			const user = userEvent.setup();
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const expandButton = screen.getByRole('button', {
				name: /read more/i,
			});
			await user.click(expandButton);
			expect(screen.getByText(/detailed approach taken/i)).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: /read less/i,
				}),
			).toBeInTheDocument();
		});
		it('collapses content when clicked again', async () => {
			const user = userEvent.setup();
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const expandButton = screen.getByRole('button', {
				name: /read more/i,
			});
			await user.click(expandButton);
			const collapseButton = screen.getByRole('button', {
				name: /read less/i,
			});
			await user.click(collapseButton);
			expect(
				screen.getByRole('button', {
					name: /read more/i,
				}),
			).toBeInTheDocument();
		});
		it('handles helpful votes interaction', async () => {
			const user = userEvent.setup();
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const helpfulButton = screen.getByRole('button', {
				name: /helpful/i,
			});
			expect(helpfulButton).toBeInTheDocument();
			const thumbsUpIcon = document.querySelector('[class*="lucide-thumbs-up"]');
			expect(thumbsUpIcon).toBeInTheDocument();
			expect(screen.getByText('42')).toBeInTheDocument();
		});
		it('calls onClick callback when card is clicked', async () => {
			const user = userEvent.setup();
			const onClickMock = jest.fn();
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					onClick={onClickMock}
				/>,
			);
			const card = screen.getByRole('article');
			await user.click(card);
			expect(onClickMock).toHaveBeenCalledWith(mockTestimonial);
		});
	});
	describe('Video Testimonial Features', () => {
		it('shows video play button for video testimonials', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const playButton = screen.getByRole('button', {
				name: /watch video/i,
			});
			expect(playButton).toBeInTheDocument();
			const playIcon = document.querySelector('[class*="lucide-play"]');
			expect(playIcon).toBeInTheDocument();
		});
		it('handles video testimonials without video content', () => {
			const testimonialWithoutVideo = {
				...mockTestimonial,
				hasVideo: false,
				videoUrl: undefined,
			};
			render(<TestimonialCard testimonial={testimonialWithoutVideo} />);
			const playButton = screen.queryByRole('button', {
				name: /watch video/i,
			});
			expect(playButton).not.toBeInTheDocument();
		});
	});
	describe('Layout Variants', () => {
		it('applies masonry layout styling', () => {
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					layout='masonry'
				/>,
			);
			const card = screen.getByRole('article');
			expect(card).toBeInTheDocument();
		});
		it('applies grid layout styling', () => {
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					layout='grid'
				/>,
			);
			const card = screen.getByRole('article');
			expect(card).toBeInTheDocument();
		});
		it('applies list layout styling', () => {
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					layout='list'
				/>,
			);
			const card = screen.getByRole('article');
			expect(card).toBeInTheDocument();
		});
		it('applies carousel layout styling', () => {
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					layout='carousel'
				/>,
			);
			const card = screen.getByRole('article');
			expect(card).toBeInTheDocument();
		});
	});
	describe('Accessibility', () => {
		it('provides proper ARIA landmarks', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const card = screen.getByRole('article');
			expect(card).toBeInTheDocument();
			expect(card).toHaveAttribute(
				'aria-label',
				expect.stringContaining('Lady Catherine Windsor'),
			);
		});
		it('supports keyboard navigation', async () => {
			const user = userEvent.setup();
			render(<TestimonialCard testimonial={mockTestimonial} />);
			await user.tab();
			const expandButton = screen.getByRole('button', {
				name: /read more/i,
			});
			expect(expandButton).toHaveFocus();
		});
		it('provides proper button labelling', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const expandButton = screen.getByRole('button', {
				name: /read more/i,
			});
			expect(expandButton).toHaveAttribute('aria-expanded', 'false');
			const helpfulButton = screen.getByRole('button', {
				name: /helpful/i,
			});
			expect(helpfulButton).toBeInTheDocument();
			const videoButton = screen.getByRole('button', {
				name: /watch video/i,
			});
			expect(videoButton).toBeInTheDocument();
		});
		it('updates ARIA attributes when content is expanded', async () => {
			const user = userEvent.setup();
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const expandButton = screen.getByRole('button', {
				name: /read more/i,
			});
			await user.click(expandButton);
			const collapseButton = screen.getByRole('button', {
				name: /read less/i,
			});
			expect(collapseButton).toHaveAttribute('aria-expanded', 'true');
		});
		it('provides alt text for avatar images', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			const avatar = screen.getByRole('img', {
				name: /lady catherine windsor/i,
			});
			expect(avatar).toBeInTheDocument();
		});
	});
	describe('Premium Features', () => {
		it('displays credibility information for premium testimonials', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			expect(screen.getByText('Westminster School')).toBeInTheDocument();
			expect(screen.getByText('Year 13')).toBeInTheDocument();
			expect(screen.getByText(/A\*A\*A predicted/i)).toBeInTheDocument();
		});
		it('shows premium tags and badges', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			expect(screen.getByText('Oxbridge')).toBeInTheDocument();
			expect(screen.getByText('A-Level')).toBeInTheDocument();
			expect(screen.getByText('Premium Service')).toBeInTheDocument();
		});
		it('includes school type classification', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			expect(screen.getByText('Independent')).toBeInTheDocument();
		});
	});
	describe('Hover and Animation States', () => {
		it('handles hover interactions when enabled', async () => {
			const user = userEvent.setup();
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					enableHover={true}
				/>,
			);
			const card = screen.getByRole('article');
			await user.hover(card);
			expect(card).toBeInTheDocument();
		});
		it('disables hover effects when disabled', () => {
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					enableHover={false}
				/>,
			);
			const card = screen.getByRole('article');
			expect(card).toBeInTheDocument();
		});
	});
	describe('Content Display Options', () => {
		it('shows full content when enabled', () => {
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					showFullContent={true}
				/>,
			);
			expect(screen.getByText(/detailed approach taken/i)).toBeInTheDocument();
			const expandButton = screen.queryByRole('button', {
				name: /read more/i,
			});
			expect(expandButton).not.toBeInTheDocument();
		});
		it('truncates content by default', () => {
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					showFullContent={false}
				/>,
			);
			expect(
				screen.getByText(/exceptional tutoring service/i),
			).toBeInTheDocument();
			const expandButton = screen.getByRole('button', {
				name: /read more/i,
			});
			expect(expandButton).toBeInTheDocument();
		});
	});
	describe('Royal Client Standards', () => {
		it('maintains premium language and presentation', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			expect(screen.getByText('Lady Catherine Windsor')).toBeInTheDocument();
			expect(screen.getByText('Oxford University Acceptance')).toBeInTheDocument();
			expect(screen.getByText(/verified/i)).toBeInTheDocument();
		});
		it('displays elite educational credentials', () => {
			render(<TestimonialCard testimonial={mockTestimonial} />);
			expect(screen.getByText('Westminster School')).toBeInTheDocument();
			expect(screen.getByText(/A\*A\*A predicted/i)).toBeInTheDocument();
		});
	});
	describe('Error Handling', () => {
		it('handles missing testimonial data gracefully', () => {
			const incompleteTestimonial = {
				id: 'incomplete',
				name: 'Test User',
				content: 'Test content',
			};
			expect(() =>
				render(<TestimonialCard testimonial={incompleteTestimonial as any} />),
			).not.toThrow();
		});
		it('handles missing image gracefully', () => {
			const testimonialWithoutImage = {
				...mockTestimonial,
				image: undefined,
			};
			render(<TestimonialCard testimonial={testimonialWithoutImage} />);
			const avatar = screen.getByText('LC');
			expect(avatar).toBeInTheDocument();
		});
		it('handles missing video URL gracefully', () => {
			const testimonialWithBrokenVideo = {
				...mockTestimonial,
				hasVideo: true,
				videoUrl: undefined,
			};
			render(<TestimonialCard testimonial={testimonialWithBrokenVideo} />);
			const playButton = screen.queryByRole('button', {
				name: /watch video/i,
			});
			expect(playButton).not.toBeInTheDocument();
		});
	});
	describe('Custom Styling', () => {
		it('accepts and applies custom className', () => {
			render(
				<TestimonialCard
					testimonial={mockTestimonial}
					className='custom-testimonial'
				/>,
			);
			const card = screen.getByRole('article');
			expect(card).toHaveClass('custom-testimonial');
		});
	});
});
