/**
 * Blog Posts Data
 *
 * Education Insights - My Private Tutor Online
 *
 * Comprehensive blog content covering all aspects of premium tutoring services
 */

export interface BlogPost {
	id: number;
	title: string;
	category: string;
	image: string;
	date: string;
	excerpt?: string;
	author?: string;
}

export const blogCategories = [
	{ id: 'all', name: 'All Categories' },
	{ id: '11-plus-exams', name: '11+ Exams' },
	{ id: 'a-levels', name: 'A-Levels' },
	{ id: 'child-wellbeing', name: 'Child Wellbeing' },
	{ id: 'common-entrance', name: 'Common Entrance' },
	{ id: 'exam-preparation', name: 'Exam Preparation' },
	{ id: 'gcses', name: 'GCSEs' },
	{ id: 'home-schooling', name: 'Home Schooling' },
	{ id: 'nursery-pre-prep', name: 'Nursery and Pre-Prep' },
	{ id: 'oxbridge', name: 'Oxbridge' },
	{ id: 'primary', name: 'Primary' },
	{ id: 'school-applications', name: 'School Applications' },
	{ id: 'secondary', name: 'Secondary' },
	{ id: 'summer-learning', name: 'Summer Learning' },
	{ id: 'university-applications', name: 'University Applications' },
] as const;

export const blogPosts: BlogPost[] = [
	{
		id: 1,
		title: "Preparing for Westminster School's New 4+ Entry: A Parent's Guide",
		category: 'nursery-pre-prep',
		image: '/images/students/adult-student-with-teacher.jpg',
		date: '2025-03-15',
		excerpt: 'Expert guidance on navigating Westminster School\'s new early entry process with confidence.',
	},
	{
		id: 2,
		title: 'Supporting Children with SEND in School: How We Can Help',
		category: 'child-wellbeing',
		image: '/images/students/entrance-exam-preparation-alt.jpg',
		date: '2025-03-14',
		excerpt: 'Comprehensive strategies for supporting children with special educational needs and disabilities.',
	},
	{
		id: 3,
		title: 'How to Write an Effective Personal Essay',
		category: 'university-applications',
		image: '/images/students/entrance-exam-preparation.jpg',
		date: '2025-03-13',
		excerpt: 'Master the art of crafting compelling personal essays that stand out in university applications.',
	},
	{
		id: 4,
		title: 'Relocating to London? Discover Premier Areas for Prestigious Schools and Family Life',
		category: 'school-applications',
		image: '/images/students/entrance-exam-preparation.png',
		date: '2025-03-12',
		excerpt: 'Navigate London\'s most prestigious school catchment areas and family-friendly neighbourhoods.',
	},
	{
		id: 5,
		title: 'Dyslexia Assessment: What Is It and How Can It Help?',
		category: 'child-wellbeing',
		image: '/images/students/online-homeschooling.jpg',
		date: '2025-03-11',
		excerpt: 'Understanding dyslexia assessments and how early intervention can transform learning outcomes.',
	},
	{
		id: 6,
		title: 'UCAS Personal Statement Changes in 2025: What Parents Need to Know',
		category: 'university-applications',
		image: '/images/students/online-homeschooling.webp',
		date: '2025-03-10',
		excerpt: 'Stay ahead of the latest UCAS reforms and help your child navigate the new application process.',
	},
	{
		id: 7,
		title: 'How to Maximise Your UCAS Points',
		category: 'a-levels',
		image: '/images/students/primary-school-support.jpg',
		date: '2025-03-09',
		excerpt: 'Strategic guidance on accumulating UCAS points through A-levels, EPQ, and additional qualifications.',
	},
	{
		id: 8,
		title: 'How to Help Your Child Navigate Transitions',
		category: 'child-wellbeing',
		image: '/images/students/primary-school-support.webp',
		date: '2025-03-08',
		excerpt: 'Essential strategies for supporting children through educational transitions with confidence.',
	},
	{
		id: 9,
		title: 'Local Authority Funded Home Schooling for Students with EHCPs',
		category: 'home-schooling',
		image: '/images/students/secondary-school-support.jpg',
		date: '2025-03-07',
		excerpt: 'Comprehensive guide to accessing local authority support for home-schooled children with EHCPs.',
	},
	{
		id: 10,
		title: 'Preparing for the ISEB Pre-Tests',
		category: '11-plus-exams',
		image: '/images/students/secondary-school-support.webp',
		date: '2025-03-06',
		excerpt: 'Expert preparation strategies for the ISEB Common Pre-Test used by leading independent schools.',
	},
	{
		id: 11,
		title: 'Calming the Nervous System: Strategies for Students with ADHD Coping with Exam Stress',
		category: 'exam-preparation',
		image: '/images/students/sen-support.jpg',
		date: '2025-03-05',
		excerpt: 'Evidence-based techniques for managing exam anxiety in students with ADHD.',
	},
	{
		id: 12,
		title: 'What to Expect from an 11+ Interview',
		category: '11-plus-exams',
		image: '/images/students/student-child.jpg',
		date: '2025-03-04',
		excerpt: 'Insider guidance on navigating selective school interviews with confidence and authenticity.',
	},
	{
		id: 13,
		title: 'GCSE Revision Strategies That Actually Work',
		category: 'gcses',
		image: '/images/students/student-inside-holding-pencil.jpg',
		date: '2025-03-03',
		excerpt: 'Proven revision techniques backed by educational research for optimal GCSE performance.',
	},
	{
		id: 14,
		title: 'Common Entrance Exams Explained: Everything You Need to Know',
		category: 'common-entrance',
		image: '/images/students/student-learning-piano.jpg',
		date: '2025-03-02',
		excerpt: 'Comprehensive overview of Common Entrance examinations for independent school entry.',
	},
	{
		id: 15,
		title: 'Building Resilience in Children: Essential Life Skills',
		category: 'child-wellbeing',
		image: '/images/students/student-on-laptop-teacher-on-screen.jpg',
		date: '2025-03-01',
		excerpt: 'Develop your child\'s resilience through proven psychological and educational strategies.',
	},
	{
		id: 16,
		title: 'Primary School Mathematics: Making Numbers Fun',
		category: 'primary',
		image: '/images/students/student-oxbridge.jpg',
		date: '2025-02-28',
		excerpt: 'Engaging approaches to mathematics that build confidence and numerical fluency.',
	},
	{
		id: 17,
		title: 'Secondary School Success: Essential Study Skills',
		category: 'secondary',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-27',
		excerpt: 'Foundation study skills that ensure academic success throughout secondary education.',
	},
	{
		id: 18,
		title: 'Oxbridge Applications: Standing Out in a Competitive Field',
		category: 'oxbridge',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-26',
		excerpt: 'Strategic guidance for navigating the rigorous Oxbridge application and interview process.',
	},
	{
		id: 19,
		title: 'Summer Learning Activities: Preventing the Summer Slide',
		category: 'summer-learning',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-25',
		excerpt: 'Maintain academic momentum during summer holidays with engaging educational activities.',
	},
	{
		id: 20,
		title: 'Independent School Applications: Navigating the Process',
		category: 'school-applications',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-24',
		excerpt: 'Comprehensive guide to the independent school application journey from start to finish.',
	},
	{
		id: 21,
		title: 'A-Level Subject Combinations: Maximising University Success',
		category: 'a-levels',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-23',
		excerpt: 'Strategic A-level subject selection aligned with university course requirements.',
	},
	{
		id: 22,
		title: "Early Years Development: Supporting Your Child's Foundation",
		category: 'nursery-pre-prep',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-22',
		excerpt: 'Essential early years educational approaches that establish lifelong learning foundations.',
	},
	{
		id: 23,
		title: '13+ Scholarship Exams: How to Stand Out',
		category: 'common-entrance',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-21',
		excerpt: 'Differentiate your child in competitive scholarship examinations for independent schools.',
	},
	{
		id: 24,
		title: 'Managing Exam Anxiety: Practical Strategies',
		category: 'exam-preparation',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-20',
		excerpt: 'Evidence-based techniques for managing exam stress and optimising performance under pressure.',
	},
];
