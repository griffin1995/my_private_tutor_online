import type { SubjectTuitionContent } from '@/lib/cms/cms-content';

interface EducationLevelContentProps {
	level: SubjectTuitionContent['educationLevels'][0];
}

export function EducationLevelContent({ level }: EducationLevelContentProps) {
	return (
		<div className="py-12 lg:py-16">
			<div className="mx-auto max-w-7xl">
				{/* Header Section */}
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
						{level.label}
					</h2>
					<p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
						{level.description}
					</p>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
					{/* Subjects Section */}
					<div>
						<h3 className="text-xl font-semibold text-primary-800 mb-6">
							Subjects We Cover
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{level.subjects.map((subject, index) => (
								<div
									key={index}
									className="flex items-center p-4 bg-neutral-50 rounded-lg border border-neutral-200"
								>
									<div className="w-2 h-2 bg-accent-600 rounded-full mr-3 flex-shrink-0" />
									<span className="text-neutral-700 font-medium">{subject}</span>
								</div>
							))}
						</div>
					</div>

					{/* Key Features Section */}
					<div>
						<h3 className="text-xl font-semibold text-primary-800 mb-6">
							Key Features
						</h3>
						<div className="space-y-4">
							{level.keyFeatures.map((feature, index) => (
								<div
									key={index}
									className="flex items-start p-4 bg-primary-50 rounded-lg border border-primary-200"
								>
									<div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0" />
									<span className="text-primary-700">{feature}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Call to Action */}
				<div className="mt-12 text-center">
					<div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-xl p-8">
						<h3 className="text-2xl font-bold text-white mb-4">
							Ready to Get Started?
						</h3>
						<p className="text-primary-100 mb-6 max-w-2xl mx-auto">
							Book a free consultation to discuss your {level.label.toLowerCase()} tutoring needs
							and create a personalised learning plan.
						</p>
						<button className="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
							Book Free Consultation
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}