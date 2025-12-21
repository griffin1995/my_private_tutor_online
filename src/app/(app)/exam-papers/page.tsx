'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { ArrowRight, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

// CONTEXT7 SOURCE: /metalrockseducation.co.uk - Category structure inspired by reference site
// Real category structure based on client requirements
const categories = [
	{
		id: 'entrance-exams',
		name: 'Entrance Exams',
		count: 150,
		subcategories: [
			{
				id: '7-plus',
				name: '7+ Entrance',
				count: 20,
				subcategories: [
					{ id: '7-plus-english', name: 'English', count: 5 },
					{ id: '7-plus-maths', name: 'Mathematics', count: 5 },
					{ id: '7-plus-reasoning', name: 'Reasoning', count: 5 },
					{ id: '7-plus-other', name: 'Other Subjects', count: 5 },
				],
			},
			{
				id: '8-plus',
				name: '8+ Entrance',
				count: 20,
				subcategories: [
					{ id: '8-plus-english', name: 'English', count: 5 },
					{ id: '8-plus-maths', name: 'Mathematics', count: 5 },
					{ id: '8-plus-reasoning', name: 'Reasoning', count: 5 },
					{ id: '8-plus-other', name: 'Other Subjects', count: 5 },
				],
			},
			{
				id: '11-plus',
				name: '11+ Entrance',
				count: 40,
				subcategories: [
					{ id: '11-plus-english', name: 'English', count: 8 },
					{ id: '11-plus-maths', name: 'Mathematics', count: 8 },
					{ id: '11-plus-verbal', name: 'Verbal Reasoning', count: 8 },
					{ id: '11-plus-non-verbal', name: 'Non-Verbal Reasoning', count: 8 },
					{ id: '11-plus-science', name: 'Science', count: 4 },
					{ id: '11-plus-languages', name: 'Languages', count: 2 },
					{ id: '11-plus-arts', name: 'Arts', count: 2 },
				],
			},
			{
				id: '13-plus',
				name: '13+ Entrance',
				count: 40,
				subcategories: [
					{ id: '13-plus-english', name: 'English', count: 8 },
					{ id: '13-plus-maths', name: 'Mathematics', count: 8 },
					{ id: '13-plus-science', name: 'Science', count: 8 },
					{ id: '13-plus-languages', name: 'Languages', count: 8 },
					{ id: '13-plus-humanities', name: 'Humanities', count: 4 },
					{ id: '13-plus-arts', name: 'Arts', count: 4 },
				],
			},
			{
				id: '16-plus',
				name: '16+ Entrance',
				count: 30,
				subcategories: [
					{ id: '16-plus-english', name: 'English', count: 6 },
					{ id: '16-plus-maths', name: 'Mathematics', count: 6 },
					{ id: '16-plus-sciences', name: 'Sciences', count: 6 },
					{ id: '16-plus-languages', name: 'Languages', count: 6 },
					{ id: '16-plus-humanities', name: 'Humanities', count: 6 },
				],
			},
		],
	},
	{
		id: 'gcse',
		name: 'GCSEs',
		count: 200,
		subcategories: [
			{
				id: 'gcse-aqa',
				name: 'AQA',
				count: 80,
				subcategories: [
					{ id: 'gcse-aqa-english', name: 'English', count: 15 },
					{ id: 'gcse-aqa-maths', name: 'Mathematics', count: 15 },
					{ id: 'gcse-aqa-sciences', name: 'Sciences', count: 15 },
					{ id: 'gcse-aqa-humanities', name: 'Humanities', count: 15 },
					{ id: 'gcse-aqa-languages', name: 'Languages', count: 10 },
					{ id: 'gcse-aqa-other', name: 'Other Subjects', count: 10 },
				],
			},
			{
				id: 'gcse-edexcel',
				name: 'Edexcel',
				count: 80,
				subcategories: [
					{ id: 'gcse-edexcel-english', name: 'English', count: 15 },
					{ id: 'gcse-edexcel-maths', name: 'Mathematics', count: 15 },
					{ id: 'gcse-edexcel-sciences', name: 'Sciences', count: 15 },
					{ id: 'gcse-edexcel-humanities', name: 'Humanities', count: 15 },
					{ id: 'gcse-edexcel-languages', name: 'Languages', count: 10 },
					{ id: 'gcse-edexcel-other', name: 'Other Subjects', count: 10 },
				],
			},
			{
				id: 'gcse-ocr',
				name: 'OCR',
				count: 40,
				subcategories: [
					{ id: 'gcse-ocr-sciences', name: 'Sciences', count: 15 },
					{ id: 'gcse-ocr-computing', name: 'Computing', count: 10 },
					{ id: 'gcse-ocr-other', name: 'Other Subjects', count: 15 },
				],
			},
		],
	},
	{
		id: 'igcse',
		name: 'iGCSEs',
		count: 120,
		subcategories: [
			{
				id: 'igcse-cambridge',
				name: 'Cambridge',
				count: 80,
				subcategories: [
					{ id: 'igcse-cambridge-english', name: 'English', count: 15 },
					{ id: 'igcse-cambridge-maths', name: 'Mathematics', count: 15 },
					{ id: 'igcse-cambridge-sciences', name: 'Sciences', count: 15 },
					{ id: 'igcse-cambridge-humanities', name: 'Humanities', count: 15 },
					{ id: 'igcse-cambridge-languages', name: 'Languages', count: 10 },
					{ id: 'igcse-cambridge-other', name: 'Other Subjects', count: 10 },
				],
			},
			{
				id: 'igcse-edexcel',
				name: 'Edexcel',
				count: 40,
				subcategories: [
					{ id: 'igcse-edexcel-english', name: 'English', count: 10 },
					{ id: 'igcse-edexcel-maths', name: 'Mathematics', count: 10 },
					{ id: 'igcse-edexcel-sciences', name: 'Sciences', count: 10 },
					{ id: 'igcse-edexcel-other', name: 'Other Subjects', count: 10 },
				],
			},
		],
	},
	{
		id: 'a-level',
		name: 'A-Levels',
		count: 180,
		subcategories: [
			{
				id: 'a-level-aqa',
				name: 'AQA',
				count: 60,
				subcategories: [
					{ id: 'a-level-aqa-maths', name: 'Mathematics', count: 15 },
					{ id: 'a-level-aqa-sciences', name: 'Sciences', count: 15 },
					{ id: 'a-level-aqa-english', name: 'English', count: 10 },
					{ id: 'a-level-aqa-humanities', name: 'Humanities', count: 10 },
					{ id: 'a-level-aqa-languages', name: 'Languages', count: 10 },
				],
			},
			{
				id: 'a-level-edexcel',
				name: 'Edexcel',
				count: 60,
				subcategories: [
					{ id: 'a-level-edexcel-maths', name: 'Mathematics', count: 15 },
					{ id: 'a-level-edexcel-sciences', name: 'Sciences', count: 15 },
					{ id: 'a-level-edexcel-english', name: 'English', count: 10 },
					{ id: 'a-level-edexcel-humanities', name: 'Humanities', count: 10 },
					{ id: 'a-level-edexcel-business', name: 'Business', count: 10 },
				],
			},
			{
				id: 'a-level-ocr',
				name: 'OCR',
				count: 60,
				subcategories: [
					{ id: 'a-level-ocr-maths', name: 'Mathematics', count: 15 },
					{ id: 'a-level-ocr-sciences', name: 'Sciences', count: 15 },
					{ id: 'a-level-ocr-computing', name: 'Computing', count: 15 },
					{ id: 'a-level-ocr-other', name: 'Other Subjects', count: 15 },
				],
			},
		],
	},
	{
		id: 'ib',
		name: 'International Baccalaureate (IB)',
		count: 100,
		subcategories: [
			{
				id: 'ib-sl',
				name: 'Standard Level (SL)',
				count: 50,
				subcategories: [
					{ id: 'ib-sl-maths', name: 'Mathematics', count: 10 },
					{ id: 'ib-sl-sciences', name: 'Sciences', count: 10 },
					{ id: 'ib-sl-english', name: 'English', count: 10 },
					{ id: 'ib-sl-languages', name: 'Languages', count: 10 },
					{ id: 'ib-sl-humanities', name: 'Humanities', count: 10 },
				],
			},
			{
				id: 'ib-hl',
				name: 'Higher Level (HL)',
				count: 50,
				subcategories: [
					{ id: 'ib-hl-maths', name: 'Mathematics', count: 10 },
					{ id: 'ib-hl-sciences', name: 'Sciences', count: 10 },
					{ id: 'ib-hl-english', name: 'English', count: 10 },
					{ id: 'ib-hl-languages', name: 'Languages', count: 10 },
					{ id: 'ib-hl-humanities', name: 'Humanities', count: 10 },
				],
			},
		],
	},
	{
		id: 'predicted-papers',
		name: 'Predicted Papers',
		count: 80,
		subcategories: [
			{
				id: 'predicted-gcse',
				name: 'GCSE Predicted',
				count: 30,
				subcategories: [
					{ id: 'predicted-gcse-maths', name: 'Mathematics', count: 10 },
					{ id: 'predicted-gcse-english', name: 'English', count: 10 },
					{ id: 'predicted-gcse-sciences', name: 'Sciences', count: 10 },
				],
			},
			{
				id: 'predicted-a-level',
				name: 'A-Level Predicted',
				count: 30,
				subcategories: [
					{ id: 'predicted-a-level-maths', name: 'Mathematics', count: 10 },
					{ id: 'predicted-a-level-sciences', name: 'Sciences', count: 10 },
					{ id: 'predicted-a-level-other', name: 'Other Subjects', count: 10 },
				],
			},
			{
				id: 'predicted-ib',
				name: 'IB Predicted',
				count: 20,
				subcategories: [
					{ id: 'predicted-ib-maths', name: 'Mathematics', count: 7 },
					{ id: 'predicted-ib-sciences', name: 'Sciences', count: 7 },
					{ id: 'predicted-ib-other', name: 'Other Subjects', count: 6 },
				],
			},
		],
	},
];

// Resource card interface with isFree field for filtering
interface ResourceCard {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	isFree: boolean;

// CONTEXT7 SOURCE: /metalrockseducation.co.uk - Product card structure
// Mock resource cards - 3 cards per leaf-level subcategory for testing functionality
const resourceCards: ResourceCard[] = [
	// FREE SAMPLE RESOURCES - For testing free filter functionality
	{
		id: 1001,
		title: '11+ English Sample Paper (Free)',
		price: 0,
		category: '11-plus-english',
		description:
			'Free sample English paper to help you prepare for 11+ entrance exams',
		isFree: true,
	},
	{
		id: 1002,
		title: '11+ Mathematics Taster Pack (Free)',
		price: 0,
		category: '11-plus-maths',
		description:
			'Free mathematics practice questions to get started with your preparation',
		isFree: true,
	},
	{
		id: 1003,
		title: 'GCSE English Literature Introduction (Free)',
		price: 0,
		category: 'gcse-aqa-english',
		description:
			'Complimentary guide to GCSE English Literature analysis techniques',
		isFree: true,
	},
	{
		id: 1004,
		title: 'A-Level Chemistry Starter Guide (Free)',
		price: 0,
		category: 'a-level-aqa-sciences',
		description:
			'Free introduction to A-Level Chemistry concepts and study strategies',
		isFree: true,
	},
	{
		id: 1005,
		title: 'IB Mathematics Foundation (Free)',
		price: 0,
		category: 'ib-sl-maths',
		description: 'Complimentary IB Mathematics standard level revision notes',
		isFree: true,
	},
	// 7+ Entrance Exams
	{
		id: 1,
		title: '7+ English Practice Papers',
		price: 24.99,
		category: '7-plus-english',
		description: 'Comprehensive English practice papers for 7+ entrance exams',
		isFree: false,
	},
	{
		id: 2,
		title: '7+ English Vocabulary Builder',
		price: 19.99,
		category: '7-plus-english',
		description: 'Essential vocabulary exercises for young learners',
		isFree: false,
	},
	{
		id: 3,
		title: '7+ English Reading Comprehension',
		price: 22.99,
		category: '7-plus-english',
		description: 'Engaging reading comprehension materials',
		isFree: false,
	},
	{
		id: 4,
		title: '7+ Mathematics Foundation Pack',
		price: 24.99,
		category: '7-plus-maths',
		description: 'Core mathematics concepts for 7+ preparation',
		isFree: false,
	},
	{
		id: 5,
		title: '7+ Mathematics Problem Solving',
		price: 21.99,
		category: '7-plus-maths',
		description: 'Problem-solving strategies for young mathematicians',
		isFree: false,
	},
	{
		id: 6,
		title: '7+ Mathematics Mental Arithmetic',
		price: 18.99,
		category: '7-plus-maths',
		description: 'Quick mental arithmetic practice exercises',
		isFree: false,
	},
	{
		id: 7,
		title: '7+ Reasoning Skills Introduction',
		price: 23.99,
		category: '7-plus-reasoning',
		description: 'Introduction to reasoning for early learners',
		isFree: false,
	},
	{
		id: 8,
		title: '7+ Reasoning Pattern Recognition',
		price: 20.99,
		category: '7-plus-reasoning',
		description: 'Pattern recognition and logical thinking',
		isFree: false,
	},
	{
		id: 9,
		title: '7+ Reasoning Puzzle Collection',
		price: 19.99,
		category: '7-plus-reasoning',
		description: 'Engaging puzzles to develop reasoning skills',
		isFree: false,
	},
	{
		id: 10,
		title: '7+ General Knowledge Pack',
		price: 17.99,
		category: '7-plus-other',
		description: 'Broad general knowledge for well-rounded preparation',
		isFree: false,
	},
	{
		id: 11,
		title: '7+ Creative Writing Starter',
		price: 18.99,
		category: '7-plus-other',
		description: 'Creative writing exercises for young writers',
		isFree: false,
	},
	{
		id: 12,
		title: '7+ Interview Preparation Guide',
		price: 21.99,
		category: '7-plus-other',
		description: 'Build confidence for entrance interviews',
		isFree: false,
	},

	// 8+ Entrance Exams
	{
		id: 13,
		title: '8+ English Advanced Practice',
		price: 26.99,
		category: '8-plus-english',
		description: 'Advanced English practice for 8+ entrance',
		isFree: false,
	},
	{
		id: 14,
		title: '8+ English Grammar Mastery',
		price: 22.99,
		category: '8-plus-english',
		description: 'Comprehensive grammar exercises',
		isFree: false,
	},
	{
		id: 15,
		title: '8+ English Creative Writing',
		price: 23.99,
		category: '8-plus-english',
		description: 'Develop creative writing skills',
		isFree: false,
	},
	{
		id: 16,
		title: '8+ Mathematics Core Skills',
		price: 27.99,
		category: '8-plus-maths',
		description: 'Essential mathematics for 8+ preparation',
		isFree: false,
	},
	{
		id: 17,
		title: '8+ Mathematics Advanced Problems',
		price: 24.99,
		category: '8-plus-maths',
		description: 'Challenging mathematical problems',
		isFree: false,
	},
	{
		id: 18,
		title: '8+ Mathematics Speed Tests',
		price: 19.99,
		category: '8-plus-maths',
		description: 'Timed mathematics practice tests',
		isFree: false,
	},
	{
		id: 19,
		title: '8+ Reasoning Complete Guide',
		price: 25.99,
		category: '8-plus-reasoning',
		description: 'Comprehensive reasoning preparation',
		isFree: false,
	},
	{
		id: 20,
		title: '8+ Reasoning Verbal Skills',
		price: 23.99,
		category: '8-plus-reasoning',
		description: 'Verbal reasoning mastery',
		isFree: false,
	},
	{
		id: 21,
		title: '8+ Reasoning Non-Verbal Skills',
		price: 23.99,
		category: '8-plus-reasoning',
		description: 'Non-verbal reasoning excellence',
		isFree: false,
	},
	{
		id: 22,
		title: '8+ Science Introduction',
		price: 20.99,
		category: '8-plus-other',
		description: 'Introduction to scientific concepts',
		isFree: false,
	},
	{
		id: 23,
		title: '8+ General Studies Pack',
		price: 19.99,
		category: '8-plus-other',
		description: 'Broad general studies material',
		isFree: false,
	},
	{
		id: 24,
		title: '8+ Interview Skills Builder',
		price: 22.99,
		category: '8-plus-other',
		description: 'Interview confidence and technique',
		isFree: false,
	},

	// 11+ Entrance Exams
	{
		id: 25,
		title: '11+ English Literature Analysis',
		price: 29.99,
		category: '11-plus-english',
		description: 'Advanced literature comprehension skills',
		isFree: false,
	},
	{
		id: 26,
		title: '11+ English Writing Excellence',
		price: 27.99,
		category: '11-plus-english',
		description: 'Master persuasive and creative writing',
		isFree: false,
	},
	{
		id: 27,
		title: '11+ English Grammar & Punctuation',
		price: 24.99,
		category: '11-plus-english',
		description: 'Perfect grammar and punctuation skills',
		isFree: false,
	},
	{
		id: 28,
		title: '11+ Mathematics Complete Revision',
		price: 32.99,
		category: '11-plus-maths',
		description: 'Comprehensive mathematics revision',
		isFree: false,
	},
	{
		id: 29,
		title: '11+ Mathematics Advanced Topics',
		price: 29.99,
		category: '11-plus-maths',
		description: 'Challenging mathematical concepts',
		isFree: false,
	},
	{
		id: 30,
		title: '11+ Mathematics Practice Tests',
		price: 26.99,
		category: '11-plus-maths',
		description: 'Realistic timed practice examinations',
		isFree: false,
	},
	{
		id: 31,
		title: '11+ Verbal Reasoning Mastery',
		price: 28.99,
		category: '11-plus-verbal',
		description: 'Complete verbal reasoning preparation',
		isFree: false,
	},
	{
		id: 32,
		title: '11+ Verbal Reasoning Strategies',
		price: 26.99,
		category: '11-plus-verbal',
		description: 'Proven strategies for success',
		isFree: false,
	},
	{
		id: 33,
		title: '11+ Verbal Reasoning Mock Tests',
		price: 25.99,
		category: '11-plus-verbal',
		description: 'Authentic mock examination papers',
		isFree: false,
	},
	{
		id: 34,
		title: '11+ Non-Verbal Reasoning Complete',
		price: 28.99,
		category: '11-plus-non-verbal',
		description: 'Master visual reasoning skills',
		isFree: false,
	},
	{
		id: 35,
		title: '11+ Non-Verbal Patterns & Sequences',
		price: 26.99,
		category: '11-plus-non-verbal',
		description: 'Pattern recognition excellence',
		isFree: false,
	},
	{
		id: 36,
		title: '11+ Non-Verbal Practice Papers',
		price: 24.99,
		category: '11-plus-non-verbal',
		description: 'Comprehensive practice materials',
		isFree: false,
	},
	{
		id: 37,
		title: '11+ Science Foundation Pack',
		price: 27.99,
		category: '11-plus-science',
		description: 'Core scientific concepts and experiments',
		isFree: false,
	},
	{
		id: 38,
		title: '11+ Science Practice Questions',
		price: 25.99,
		category: '11-plus-science',
		description: 'Engaging scientific investigations',
		isFree: false,
	},
	{
		id: 39,
		title: '11+ Science Mock Examinations',
		price: 23.99,
		category: '11-plus-science',
		description: 'Realistic science exam papers',
		isFree: false,
	},
	{
		id: 40,
		title: '11+ French Language Starter',
		price: 24.99,
		category: '11-plus-languages',
		description: 'Introduction to French for entrance exams',
		isFree: false,
	},
	{
		id: 41,
		title: '11+ Latin Fundamentals',
		price: 26.99,
		category: '11-plus-languages',
		description: 'Essential Latin grammar and vocabulary',
		isFree: false,
	},
	{
		id: 42,
		title: '11+ Spanish Basics',
		price: 24.99,
		category: '11-plus-languages',
		description: 'Foundational Spanish language skills',
		isFree: false,
	},
	{
		id: 43,
		title: '11+ Art Portfolio Development',
		price: 22.99,
		category: '11-plus-arts',
		description: 'Build an impressive art portfolio',
		isFree: false,
	},
	{
		id: 44,
		title: '11+ Music Theory Essentials',
		price: 23.99,
		category: '11-plus-arts',
		description: 'Music theory for entrance examinations',
		isFree: false,
	},
	{
		id: 45,
		title: '11+ Drama & Performance Skills',
		price: 21.99,
		category: '11-plus-arts',
		description: 'Drama techniques and confidence building',
		isFree: false,
	},

	// 13+ Entrance Exams
	{
		id: 46,
		title: '13+ English Literature Advanced',
		price: 34.99,
		category: '13-plus-english',
		description: 'Advanced literary analysis and criticism',
		isFree: false,
	},
	{
		id: 47,
		title: '13+ English Creative Writing Portfolio',
		price: 31.99,
		category: '13-plus-english',
		description: 'Develop a strong writing portfolio',
		isFree: false,
	},
	{
		id: 48,
		title: '13+ English Language Mastery',
		price: 29.99,
		category: '13-plus-english',
		description: 'Advanced language and rhetoric skills',
		isFree: false,
	},
	{
		id: 49,
		title: '13+ Mathematics Higher Level',
		price: 36.99,
		category: '13-plus-maths',
		description: 'Advanced mathematical concepts',
		isFree: false,
	},
	{
		id: 50,
		title: '13+ Mathematics Problem Solving',
		price: 33.99,
		category: '13-plus-maths',
		description: 'Complex problem-solving techniques',
		isFree: false,
	},
	{
		id: 51,
		title: '13+ Mathematics Examination Pack',
		price: 31.99,
		category: '13-plus-maths',
		description: 'Comprehensive exam preparation',
		isFree: false,
	},
	{
		id: 52,
		title: '13+ Science Complete Trilogy',
		price: 38.99,
		category: '13-plus-science',
		description: 'Biology, Chemistry, and Physics combined',
		isFree: false,
	},
	{
		id: 53,
		title: '13+ Science Practical Skills',
		price: 34.99,
		category: '13-plus-science',
		description: 'Laboratory techniques and experiments',
		isFree: false,
	},
	{
		id: 54,
		title: '13+ Science Theory & Practice',
		price: 32.99,
		category: '13-plus-science',
		description: 'Scientific theory with practical applications',
		isFree: false,
	},
	{
		id: 55,
		title: '13+ French Advanced Grammar',
		price: 29.99,
		category: '13-plus-languages',
		description: 'Advanced French language skills',
		isFree: false,
	},
	{
		id: 56,
		title: '13+ Latin Classical Texts',
		price: 31.99,
		category: '13-plus-languages',
		description: 'Classical Latin literature and translation',
		isFree: false,
	},
	{
		id: 57,
		title: '13+ Spanish Conversation & Writing',
		price: 29.99,
		category: '13-plus-languages',
		description: 'Fluency development in Spanish',
		isFree: false,
	},
	{
		id: 58,
		title: '13+ History & Geography Combined',
		price: 33.99,
		category: '13-plus-humanities',
		description: 'Comprehensive humanities preparation',
		isFree: false,
	},
	{
		id: 59,
		title: '13+ Religious Studies Guide',
		price: 28.99,
		category: '13-plus-humanities',
		description: 'Religious studies and philosophy',
		isFree: false,
	},
	{
		id: 60,
		title: '13+ Classics & Ancient History',
		price: 30.99,
		category: '13-plus-humanities',
		description: 'Ancient civilisations and classical studies',
		isFree: false,
	},
	{
		id: 61,
		title: '13+ Art & Design Portfolio',
		price: 32.99,
		category: '13-plus-arts',
		description: 'Create an exceptional art portfolio',
		isFree: false,
	},
	{
		id: 62,
		title: '13+ Music Performance & Theory',
		price: 34.99,
		category: '13-plus-arts',
		description: 'Advanced music skills and composition',
		isFree: false,
	},
	{
		id: 63,
		title: '13+ Drama & Theatre Studies',
		price: 30.99,
		category: '13-plus-arts',
		description: 'Performance techniques and theatre history',
		isFree: false,
	},

	// 16+ Entrance Exams (sixth form)
	{
		id: 64,
		title: '16+ English Literature A-Level Prep',
		price: 36.99,
		category: '16-plus-english',
		description: 'Transition to A-Level English Literature',
		isFree: false,
	},
	{
		id: 65,
		title: '16+ English Language Advanced',
		price: 34.99,
		category: '16-plus-english',
		description: 'Advanced linguistic analysis skills',
		isFree: false,
	},
	{
		id: 66,
		title: '16+ English Critical Thinking',
		price: 32.99,
		category: '16-plus-english',
		description: 'Critical analysis and essay writing',
		isFree: false,
	},
	{
		id: 67,
		title: '16+ Mathematics Pre-A-Level',
		price: 38.99,
		category: '16-plus-maths',
		description: 'Bridge to A-Level mathematics',
		isFree: false,
	},
	{
		id: 68,
		title: '16+ Further Mathematics Introduction',
		price: 36.99,
		category: '16-plus-maths',
		description: 'Introduction to further mathematics',
		isFree: false,
	},
	{
		id: 69,
		title: '16+ Mathematics Scholarship Pack',
		price: 34.99,
		category: '16-plus-maths',
		description: 'Scholarship-level mathematics preparation',
		isFree: false,
	},
	{
		id: 70,
		title: '16+ Sciences A-Level Transition',
		price: 39.99,
		category: '16-plus-sciences',
		description: 'GCSE to A-Level science bridge',
		isFree: false,
	},
	{
		id: 71,
		title: '16+ Chemistry Advanced Topics',
		price: 37.99,
		category: '16-plus-sciences',
		description: 'Advanced chemistry concepts',
		isFree: false,
	},
	{
		id: 72,
		title: '16+ Physics & Mathematics',
		price: 38.99,
		category: '16-plus-sciences',
		description: 'Combined physics and mathematics',
		isFree: false,
	},
	{
		id: 73,
		title: '16+ Modern Languages Advanced',
		price: 35.99,
		category: '16-plus-languages',
		description: 'Advanced language proficiency',
		isFree: false,
	},
	{
		id: 74,
		title: '16+ Classical Languages',
		price: 34.99,
		category: '16-plus-languages',
		description: 'Latin and Ancient Greek studies',
		isFree: false,
	},
	{
		id: 75,
		title: '16+ Language Literature & Culture',
		price: 33.99,
		category: '16-plus-languages',
		description: 'Cultural context and literature',
		isFree: false,
	},
	{
		id: 76,
		title: '16+ History & Politics',
		price: 36.99,
		category: '16-plus-humanities',
		description: 'Historical and political analysis',
		isFree: false,
	},
	{
		id: 77,
		title: '16+ Geography & Economics',
		price: 35.99,
		category: '16-plus-humanities',
		description: 'Human and physical geography with economics',
		isFree: false,
	},
	{
		id: 78,
		title: '16+ Philosophy & Ethics',
		price: 33.99,
		category: '16-plus-humanities',
		description: 'Philosophical thinking and ethical reasoning',
		isFree: false,
	},

	// GCSE AQA
	{
		id: 79,
		title: 'GCSE AQA English Language Revision',
		price: 28.99,
		category: 'gcse-aqa-english',
		description: 'Complete AQA English Language revision',
		isFree: false,
	},
	{
		id: 80,
		title: 'GCSE AQA English Literature Guide',
		price: 29.99,
		category: 'gcse-aqa-english',
		description: 'Set texts and poetry analysis',
		isFree: false,
	},
	{
		id: 81,
		title: 'GCSE AQA English Exam Practice',
		price: 26.99,
		category: 'gcse-aqa-english',
		description: 'Past papers and mark schemes',
		isFree: false,
	},
	{
		id: 82,
		title: 'GCSE AQA Mathematics Foundation',
		price: 29.99,
		category: 'gcse-aqa-maths',
		description: 'Foundation tier mathematics revision',
		isFree: false,
	},
	{
		id: 83,
		title: 'GCSE AQA Mathematics Higher',
		price: 31.99,
		category: 'gcse-aqa-maths',
		description: 'Higher tier mathematics mastery',
		isFree: false,
	},
	{
		id: 84,
		title: 'GCSE AQA Mathematics Practice Papers',
		price: 27.99,
		category: 'gcse-aqa-maths',
		description: 'Realistic practice examinations',
		isFree: false,
	},
	{
		id: 85,
		title: 'GCSE AQA Combined Science Trilogy',
		price: 34.99,
		category: 'gcse-aqa-sciences',
		description: 'Biology, Chemistry, and Physics',
		isFree: false,
	},
	{
		id: 86,
		title: 'GCSE AQA Separate Sciences Pack',
		price: 42.99,
		category: 'gcse-aqa-sciences',
		description: 'Individual science specifications',
		isFree: false,
	},
	{
		id: 87,
		title: 'GCSE AQA Science Practical Skills',
		price: 29.99,
		category: 'gcse-aqa-sciences',
		description: 'Required practical investigations',
		isFree: false,
	},
	{
		id: 88,
		title: 'GCSE AQA History Modern World',
		price: 30.99,
		category: 'gcse-aqa-humanities',
		description: 'Modern world history 1900-present',
		isFree: false,
	},
	{
		id: 89,
		title: 'GCSE AQA Geography Physical & Human',
		price: 31.99,
		category: 'gcse-aqa-humanities',
		description: 'Complete geography specification',
		isFree: false,
	},
	{
		id: 90,
		title: 'GCSE AQA Religious Studies',
		price: 27.99,
		category: 'gcse-aqa-humanities',
		description: 'Religious beliefs and practices',
		isFree: false,
	},
	{
		id: 91,
		title: 'GCSE AQA French Complete Course',
		price: 32.99,
		category: 'gcse-aqa-languages',
		description: 'French language skills and culture',
		isFree: false,
	},
	{
		id: 92,
		title: 'GCSE AQA Spanish Revision Guide',
		price: 32.99,
		category: 'gcse-aqa-languages',
		description: 'Spanish language mastery',
		isFree: false,
	},
	{
		id: 93,
		title: 'GCSE AQA German Language Pack',
		price: 32.99,
		category: 'gcse-aqa-languages',
		description: 'Comprehensive German preparation',
		isFree: false,
	},
	{
		id: 94,
		title: 'GCSE AQA Business Studies',
		price: 29.99,
		category: 'gcse-aqa-other',
		description: 'Business concepts and case studies',
		isFree: false,
	},
	{
		id: 95,
		title: 'GCSE AQA Computer Science',
		price: 31.99,
		category: 'gcse-aqa-other',
		description: 'Programming and computational thinking',
		isFree: false,
	},
	{
		id: 96,
		title: 'GCSE AQA Design Technology',
		price: 28.99,
		category: 'gcse-aqa-other',
		description: 'Design processes and materials',
		isFree: false,
	},

	// GCSE Edexcel
	{
		id: 97,
		title: 'GCSE Edexcel English Language Course',
		price: 28.99,
		category: 'gcse-edexcel-english',
		description: 'Edexcel English Language specification',
		isFree: false,
	},
	{
		id: 98,
		title: 'GCSE Edexcel English Literature Texts',
		price: 29.99,
		category: 'gcse-edexcel-english',
		description: 'Set texts and unseen poetry',
		isFree: false,
	},
	{
		id: 99,
		title: 'GCSE Edexcel English Exam Techniques',
		price: 26.99,
		category: 'gcse-edexcel-english',
		description: 'Examination strategies and practice',
		isFree: false,
	},
	{
		id: 100,
		title: 'GCSE Edexcel Mathematics Foundation',
		price: 29.99,
		category: 'gcse-edexcel-maths',
		description: 'Foundation mathematics revision',
		isFree: false,
	},
	{
		id: 101,
		title: 'GCSE Edexcel Mathematics Higher',
		price: 31.99,
		category: 'gcse-edexcel-maths',
		description: 'Higher tier preparation',
		isFree: false,
	},
	{
		id: 102,
		title: 'GCSE Edexcel Mathematics Mock Exams',
		price: 27.99,
		category: 'gcse-edexcel-maths',
		description: 'Authentic mock examinations',
		isFree: false,
	},
	{
		id: 103,
		title: 'GCSE Edexcel Combined Science',
		price: 34.99,
		category: 'gcse-edexcel-sciences',
		description: 'Combined science specification',
		isFree: false,
	},
	{
		id: 104,
		title: 'GCSE Edexcel Biology Separate',
		price: 30.99,
		category: 'gcse-edexcel-sciences',
		description: 'Separate biology specification',
		isFree: false,
	},
	{
		id: 105,
		title: 'GCSE Edexcel Chemistry & Physics',
		price: 38.99,
		category: 'gcse-edexcel-sciences',
		description: 'Chemistry and Physics combined',
		isFree: false,
	},
	{
		id: 106,
		title: 'GCSE Edexcel History Thematic Study',
		price: 30.99,
		category: 'gcse-edexcel-humanities',
		description: 'Thematic history studies',
		isFree: false,
	},
	{
		id: 107,
		title: 'GCSE Edexcel Geography A & B',
		price: 31.99,
		category: 'gcse-edexcel-humanities',
		description: 'Both geography specifications',
		isFree: false,
	},
	{
		id: 108,
		title: 'GCSE Edexcel Religious Studies',
		price: 27.99,
		category: 'gcse-edexcel-humanities',
		description: 'Religious and philosophical themes',
		isFree: false,
	},
	{
		id: 109,
		title: 'GCSE Edexcel French Listening & Speaking',
		price: 32.99,
		category: 'gcse-edexcel-languages',
		description: 'Oral French examination preparation',
		isFree: false,
	},
	{
		id: 110,
		title: 'GCSE Edexcel Spanish Complete',
		price: 32.99,
		category: 'gcse-edexcel-languages',
		description: 'All four language skills',
		isFree: false,
	},
	{
		id: 111,
		title: 'GCSE Edexcel Mandarin Chinese',
		price: 34.99,
		category: 'gcse-edexcel-languages',
		description: 'Mandarin language skills',
		isFree: false,
	},
	{
		id: 112,
		title: 'GCSE Edexcel Business Enterprise',
		price: 29.99,
		category: 'gcse-edexcel-other',
		description: 'Business and enterprise concepts',
		isFree: false,
	},
	{
		id: 113,
		title: 'GCSE Edexcel Computer Science',
		price: 31.99,
		category: 'gcse-edexcel-other',
		description: 'Computational thinking and programming',
		isFree: false,
	},
	{
		id: 114,
		title: 'GCSE Edexcel Art & Design',
		price: 33.99,
		category: 'gcse-edexcel-other',
		description: 'Portfolio development and techniques',
		isFree: false,
	},

	// GCSE OCR
	{
		id: 115,
		title: 'GCSE OCR Gateway Science Suite',
		price: 36.99,
		category: 'gcse-ocr-sciences',
		description: 'Gateway science combined',
		isFree: false,
	},
	{
		id: 116,
		title: 'GCSE OCR Twenty First Century Science',
		price: 36.99,
		category: 'gcse-ocr-sciences',
		description: '21st century science specification',
		isFree: false,
	},
	{
		id: 117,
		title: 'GCSE OCR Science Practical Endorsement',
		price: 28.99,
		category: 'gcse-ocr-sciences',
		description: 'Practical skills assessment',
		isFree: false,
	},
	{
		id: 118,
		title: 'GCSE OCR Computer Science Programming',
		price: 33.99,
		category: 'gcse-ocr-computing',
		description: 'Python and computational thinking',
		isFree: false,
	},
	{
		id: 119,
		title: 'GCSE OCR Computing Theory',
		price: 31.99,
		category: 'gcse-ocr-computing',
		description: 'Computer systems and networks',
		isFree: false,
	},
	{
		id: 120,
		title: 'GCSE OCR Computing Project Guide',
		price: 29.99,
		category: 'gcse-ocr-computing',
		description: 'Programming project development',
		isFree: false,
	},
	{
		id: 121,
		title: 'GCSE OCR History Medieval to Modern',
		price: 30.99,
		category: 'gcse-ocr-other',
		description: 'History through the ages',
		isFree: false,
	},
	{
		id: 122,
		title: 'GCSE OCR Geography A',
		price: 31.99,
		category: 'gcse-ocr-other',
		description: 'Geographical themes and enquiry',
		isFree: false,
	},
	{
		id: 123,
		title: 'GCSE OCR Media Studies',
		price: 29.99,
		category: 'gcse-ocr-other',
		description: 'Media analysis and production',
		isFree: false,
	},

	// iGCSE Cambridge
	{
		id: 124,
		title: 'Cambridge iGCSE English First Language',
		price: 31.99,
		category: 'igcse-cambridge-english',
		description: 'First language English course',
		isFree: false,
	},
	{
		id: 125,
		title: 'Cambridge iGCSE English Literature',
		price: 32.99,
		category: 'igcse-cambridge-english',
		description: 'International literature texts',
		isFree: false,
	},
	{
		id: 126,
		title: 'Cambridge iGCSE English Second Language',
		price: 29.99,
		category: 'igcse-cambridge-english',
		description: 'English as a second language',
		isFree: false,
	},
	{
		id: 127,
		title: 'Cambridge iGCSE Mathematics Core',
		price: 32.99,
		category: 'igcse-cambridge-maths',
		description: 'Core mathematics syllabus',
		isFree: false,
	},
	{
		id: 128,
		title: 'Cambridge iGCSE Mathematics Extended',
		price: 34.99,
		category: 'igcse-cambridge-maths',
		description: 'Extended mathematics topics',
		isFree: false,
	},
	{
		id: 129,
		title: 'Cambridge iGCSE Additional Mathematics',
		price: 36.99,
		category: 'igcse-cambridge-maths',
		description: 'Advanced mathematical concepts',
		isFree: false,
	},
	{
		id: 130,
		title: 'Cambridge iGCSE Combined Science',
		price: 38.99,
		category: 'igcse-cambridge-sciences',
		description: 'Co-ordinated sciences course',
		isFree: false,
	},
	{
		id: 131,
		title: 'Cambridge iGCSE Biology',
		price: 33.99,
		category: 'igcse-cambridge-sciences',
		description: 'Separate biology specification',
		isFree: false,
	},
	{
		id: 132,
		title: 'Cambridge iGCSE Chemistry & Physics',
		price: 42.99,
		category: 'igcse-cambridge-sciences',
		description: 'Chemistry and physics combined',
		isFree: false,
	},
	{
		id: 133,
		title: 'Cambridge iGCSE History International',
		price: 32.99,
		category: 'igcse-cambridge-humanities',
		description: 'International history course',
		isFree: false,
	},
	{
		id: 134,
		title: 'Cambridge iGCSE Geography',
		price: 33.99,
		category: 'igcse-cambridge-humanities',
		description: 'Global geographical themes',
		isFree: false,
	},
	{
		id: 135,
		title: 'Cambridge iGCSE Economics',
		price: 34.99,
		category: 'igcse-cambridge-humanities',
		description: 'Economic principles and applications',
		isFree: false,
	},
	{
		id: 136,
		title: 'Cambridge iGCSE French Foreign Language',
		price: 34.99,
		category: 'igcse-cambridge-languages',
		description: 'French as a foreign language',
		isFree: false,
	},
	{
		id: 137,
		title: 'Cambridge iGCSE Spanish',
		price: 34.99,
		category: 'igcse-cambridge-languages',
		description: 'Spanish language course',
		isFree: false,
	},
	{
		id: 138,
		title: 'Cambridge iGCSE Mandarin Chinese',
		price: 36.99,
		category: 'igcse-cambridge-languages',
		description: 'Mandarin for international students',
		isFree: false,
	},
	{
		id: 139,
		title: 'Cambridge iGCSE Business Studies',
		price: 33.99,
		category: 'igcse-cambridge-other',
		description: 'International business concepts',
		isFree: false,
	},
	{
		id: 140,
		title: 'Cambridge iGCSE Computer Science',
		price: 35.99,
		category: 'igcse-cambridge-other',
		description: 'Programming and theory',
		isFree: false,
	},
	{
		id: 141,
		title: 'Cambridge iGCSE Art & Design',
		price: 32.99,
		category: 'igcse-cambridge-other',
		description: 'Portfolio-based assessment',
		isFree: false,
	},

	// iGCSE Edexcel
	{
		id: 142,
		title: 'Edexcel iGCSE English Language A',
		price: 30.99,
		category: 'igcse-edexcel-english',
		description: 'Language skills for international students',
		isFree: false,
	},
	{
		id: 143,
		title: 'Edexcel iGCSE English Literature',
		price: 31.99,
		category: 'igcse-edexcel-english',
		description: 'Literary analysis and criticism',
		isFree: false,
	},
	{
		id: 144,
		title: 'Edexcel iGCSE English Language B',
		price: 29.99,
		category: 'igcse-edexcel-english',
		description: 'Alternative language specification',
		isFree: false,
	},
	{
		id: 145,
		title: 'Edexcel iGCSE Mathematics A',
		price: 32.99,
		category: 'igcse-edexcel-maths',
		description: 'Standard mathematics course',
		isFree: false,
	},
	{
		id: 146,
		title: 'Edexcel iGCSE Mathematics B',
		price: 32.99,
		category: 'igcse-edexcel-maths',
		description: 'Alternative mathematics specification',
		isFree: false,
	},
	{
		id: 147,
		title: 'Edexcel iGCSE Further Pure Mathematics',
		price: 36.99,
		category: 'igcse-edexcel-maths',
		description: 'Advanced pure mathematics',
		isFree: false,
	},
	{
		id: 148,
		title: 'Edexcel iGCSE Science Double Award',
		price: 37.99,
		category: 'igcse-edexcel-sciences',
		description: 'Double award science course',
		isFree: false,
	},
	{
		id: 149,
		title: 'Edexcel iGCSE Single Sciences',
		price: 44.99,
		category: 'igcse-edexcel-sciences',
		description: 'Separate science specifications',
		isFree: false,
	},
	{
		id: 150,
		title: 'Edexcel iGCSE Science Practical Skills',
		price: 28.99,
		category: 'igcse-edexcel-sciences',
		description: 'Laboratory techniques guide',
		isFree: false,
	},
	{
		id: 151,
		title: 'Edexcel iGCSE Business Studies',
		price: 32.99,
		category: 'igcse-edexcel-other',
		description: 'International business environment',
		isFree: false,
	},
	{
		id: 152,
		title: 'Edexcel iGCSE ICT',
		price: 33.99,
		category: 'igcse-edexcel-other',
		description: 'Information and communication technology',
		isFree: false,
	},
	{
		id: 153,
		title: 'Edexcel iGCSE Economics',
		price: 34.99,
		category: 'igcse-edexcel-other',
		description: 'Economic theory and practice',
		isFree: false,
	},

	// A-Level AQA
	{
		id: 154,
		title: 'A-Level AQA Mathematics Pure & Applied',
		price: 44.99,
		category: 'a-level-aqa-maths',
		description: 'Complete A-Level mathematics course',
		isFree: false,
	},
	{
		id: 155,
		title: 'A-Level AQA Further Mathematics',
		price: 46.99,
		category: 'a-level-aqa-maths',
		description: 'Further mathematics specification',
		isFree: false,
	},
	{
		id: 156,
		title: 'A-Level AQA Mathematics Statistics',
		price: 38.99,
		category: 'a-level-aqa-maths',
		description: 'Statistical methods and analysis',
		isFree: false,
	},
	{
		id: 157,
		title: 'A-Level AQA Biology Complete',
		price: 42.99,
		category: 'a-level-aqa-sciences',
		description: 'Full biology specification',
		isFree: false,
	},
	{
		id: 158,
		title: 'A-Level AQA Chemistry Revision',
		price: 42.99,
		category: 'a-level-aqa-sciences',
		description: 'Comprehensive chemistry course',
		isFree: false,
	},
	{
		id: 159,
		title: 'A-Level AQA Physics & Mathematics',
		price: 45.99,
		category: 'a-level-aqa-sciences',
		description: 'Physics with mathematical applications',
		isFree: false,
	},
	{
		id: 160,
		title: 'A-Level AQA English Literature A',
		price: 39.99,
		category: 'a-level-aqa-english',
		description: 'Literary analysis and criticism',
		isFree: false,
	},
	{
		id: 161,
		title: 'A-Level AQA English Literature B',
		price: 39.99,
		category: 'a-level-aqa-english',
		description: 'Alternative literature specification',
		isFree: false,
	},
	{
		id: 162,
		title: 'A-Level AQA English Language',
		price: 38.99,
		category: 'a-level-aqa-english',
		description: 'Linguistic analysis and investigation',
		isFree: false,
	},
	{
		id: 163,
		title: 'A-Level AQA History Modern Britain',
		price: 41.99,
		category: 'a-level-aqa-humanities',
		description: 'British history 1851-1964',
		isFree: false,
	},
	{
		id: 164,
		title: 'A-Level AQA Geography Physical',
		price: 42.99,
		category: 'a-level-aqa-humanities',
		description: 'Physical geography processes',
		isFree: false,
	},
	{
		id: 165,
		title: 'A-Level AQA Psychology',
		price: 40.99,
		category: 'a-level-aqa-humanities',
		description: 'Psychological theories and research',
		isFree: false,
	},
	{
		id: 166,
		title: 'A-Level AQA French Language & Culture',
		price: 43.99,
		category: 'a-level-aqa-languages',
		description: 'Advanced French studies',
		isFree: false,
	},
	{
		id: 167,
		title: 'A-Level AQA Spanish Hispanic Culture',
		price: 43.99,
		category: 'a-level-aqa-languages',
		description: 'Spanish language and society',
		isFree: false,
	},
	{
		id: 168,
		title: 'A-Level AQA German Studies',
		price: 43.99,
		category: 'a-level-aqa-languages',
		description: 'German language and culture',
		isFree: false,
	},

	// A-Level Edexcel
	{
		id: 169,
		title: 'A-Level Edexcel Mathematics Pure',
		price: 44.99,
		category: 'a-level-edexcel-maths',
		description: 'Pure mathematics mastery',
		isFree: false,
	},
	{
		id: 170,
		title: 'A-Level Edexcel Further Mathematics',
		price: 46.99,
		category: 'a-level-edexcel-maths',
		description: 'Advanced mathematical topics',
		isFree: false,
	},
	{
		id: 171,
		title: 'A-Level Edexcel Mechanics & Statistics',
		price: 42.99,
		category: 'a-level-edexcel-maths',
		description: 'Applied mathematics modules',
		isFree: false,
	},
	{
		id: 172,
		title: 'A-Level Edexcel Biology Specification A',
		price: 42.99,
		category: 'a-level-edexcel-sciences',
		description: 'Salters-Nuffield biology',
		isFree: false,
	},
	{
		id: 173,
		title: 'A-Level Edexcel Chemistry Complete',
		price: 42.99,
		category: 'a-level-edexcel-sciences',
		description: 'Full chemistry course',
		isFree: false,
	},
	{
		id: 174,
		title: 'A-Level Edexcel Physics Advanced',
		price: 44.99,
		category: 'a-level-edexcel-sciences',
		description: 'Advanced physics concepts',
		isFree: false,
	},
	{
		id: 175,
		title: 'A-Level Edexcel English Literature',
		price: 39.99,
		category: 'a-level-edexcel-english',
		description: 'Literary heritage and criticism',
		isFree: false,
	},
	{
		id: 176,
		title: 'A-Level Edexcel English Language',
		price: 38.99,
		category: 'a-level-edexcel-english',
		description: 'Language variation and change',
		isFree: false,
	},
	{
		id: 177,
		title: 'A-Level Edexcel English Combined',
		price: 44.99,
		category: 'a-level-edexcel-english',
		description: 'Language and literature combined',
		isFree: false,
	},
	{
		id: 178,
		title: 'A-Level Edexcel History Route C',
		price: 41.99,
		category: 'a-level-edexcel-humanities',
		description: 'European and world history',
		isFree: false,
	},
	{
		id: 179,
		title: 'A-Level Edexcel Geography',
		price: 42.99,
		category: 'a-level-edexcel-humanities',
		description: 'Dynamic planet geography',
		isFree: false,
	},
	{
		id: 180,
		title: 'A-Level Edexcel Sociology',
		price: 39.99,
		category: 'a-level-edexcel-humanities',
		description: 'Social structures and processes',
		isFree: false,
	},
	{
		id: 181,
		title: 'A-Level Edexcel Business Studies',
		price: 41.99,
		category: 'a-level-edexcel-business',
		description: 'Business themes and decisions',
		isFree: false,
	},
	{
		id: 182,
		title: 'A-Level Edexcel Economics A',
		price: 42.99,
		category: 'a-level-edexcel-business',
		description: 'Markets and business behaviour',
		isFree: false,
	},
	{
		id: 183,
		title: 'A-Level Edexcel Accounting',
		price: 40.99,
		category: 'a-level-edexcel-business',
		description: 'Financial and management accounting',
		isFree: false,
	},

	// A-Level OCR
	{
		id: 184,
		title: 'A-Level OCR Mathematics A (MEI)',
		price: 44.99,
		category: 'a-level-ocr-maths',
		description: 'MEI mathematics specification',
		isFree: false,
	},
	{
		id: 185,
		title: 'A-Level OCR Mathematics B',
		price: 44.99,
		category: 'a-level-ocr-maths',
		description: 'Alternative mathematics course',
		isFree: false,
	},
	{
		id: 186,
		title: 'A-Level OCR Further Mathematics',
		price: 46.99,
		category: 'a-level-ocr-maths',
		description: 'Advanced further mathematics',
		isFree: false,
	},
	{
		id: 187,
		title: 'A-Level OCR Biology A',
		price: 42.99,
		category: 'a-level-ocr-sciences',
		description: 'Biology specification A',
		isFree: false,
	},
	{
		id: 188,
		title: 'A-Level OCR Chemistry A Salters',
		price: 42.99,
		category: 'a-level-ocr-sciences',
		description: 'Salters chemistry course',
		isFree: false,
	},
	{
		id: 189,
		title: 'A-Level OCR Physics A',
		price: 44.99,
		category: 'a-level-ocr-sciences',
		description: 'Physics specification A',
		isFree: false,
	},
	{
		id: 190,
		title: 'A-Level OCR Computer Science',
		price: 43.99,
		category: 'a-level-ocr-computing',
		description: 'Programming and algorithms',
		isFree: false,
	},
	{
		id: 191,
		title: 'A-Level OCR Computing Theory',
		price: 41.99,
		category: 'a-level-ocr-computing',
		description: 'Computer systems and architecture',
		isFree: false,
	},
	{
		id: 192,
		title: 'A-Level OCR Computing Project',
		price: 38.99,
		category: 'a-level-ocr-computing',
		description: 'NEA project development guide',
		isFree: false,
	},
	{
		id: 193,
		title: 'A-Level OCR History Enquiries',
		price: 41.99,
		category: 'a-level-ocr-other',
		description: 'Historical enquiries specification',
		isFree: false,
	},
	{
		id: 194,
		title: 'A-Level OCR Geography',
		price: 42.99,
		category: 'a-level-ocr-other',
		description: 'Geographical themes and investigations',
		isFree: false,
	},
	{
		id: 195,
		title: 'A-Level OCR Religious Studies',
		price: 39.99,
		category: 'a-level-ocr-other',
		description: 'Philosophy and ethics',
		isFree: false,
	},

	// IB Standard Level
	{
		id: 196,
		title: 'IB Mathematics SL Analysis',
		price: 46.99,
		category: 'ib-sl-maths',
		description: 'Mathematical analysis standard level',
		isFree: false,
	},
	{
		id: 197,
		title: 'IB Mathematics SL Applications',
		price: 44.99,
		category: 'ib-sl-maths',
		description: 'Mathematical applications SL',
		isFree: false,
	},
	{
		id: 198,
		title: 'IB Mathematics SL Studies',
		price: 42.99,
		category: 'ib-sl-maths',
		description: 'Mathematics studies course',
		isFree: false,
	},
	{
		id: 199,
		title: 'IB Biology SL Complete',
		price: 45.99,
		category: 'ib-sl-sciences',
		description: 'Standard level biology course',
		isFree: false,
	},
	{
		id: 200,
		title: 'IB Chemistry SL Revision',
		price: 45.99,
		category: 'ib-sl-sciences',
		description: 'Chemistry SL comprehensive guide',
		isFree: false,
	},
	{
		id: 201,
		title: 'IB Physics SL Core Topics',
		price: 46.99,
		category: 'ib-sl-sciences',
		description: 'Physics standard level essentials',
		isFree: false,
	},
	{
		id: 202,
		title: 'IB English A Literature SL',
		price: 43.99,
		category: 'ib-sl-english',
		description: 'Literature analysis standard level',
		isFree: false,
	},
	{
		id: 203,
		title: 'IB English A Language & Literature SL',
		price: 43.99,
		category: 'ib-sl-english',
		description: 'Language and literature SL',
		isFree: false,
	},
	{
		id: 204,
		title: 'IB English B Standard Level',
		price: 41.99,
		category: 'ib-sl-english',
		description: 'English as additional language',
		isFree: false,
	},
	{
		id: 205,
		title: 'IB French B Standard Level',
		price: 44.99,
		category: 'ib-sl-languages',
		description: 'French language acquisition SL',
		isFree: false,
	},
	{
		id: 206,
		title: 'IB Spanish Ab Initio',
		price: 42.99,
		category: 'ib-sl-languages',
		description: 'Spanish for beginners',
		isFree: false,
	},
	{
		id: 207,
		title: 'IB Mandarin B Standard Level',
		price: 46.99,
		category: 'ib-sl-languages',
		description: 'Mandarin language course SL',
		isFree: false,
	},
	{
		id: 208,
		title: 'IB History SL Routes',
		price: 44.99,
		category: 'ib-sl-humanities',
		description: 'Historical routes standard level',
		isFree: false,
	},
	{
		id: 209,
		title: 'IB Geography SL',
		price: 43.99,
		category: 'ib-sl-humanities',
		description: 'Geographical themes SL',
		isFree: false,
	},
	{
		id: 210,
		title: 'IB Economics SL',
		price: 45.99,
		category: 'ib-sl-humanities',
		description: 'Economic theories SL',
		isFree: false,
	},

	// IB Higher Level
	{
		id: 211,
		title: 'IB Mathematics HL Analysis',
		price: 52.99,
		category: 'ib-hl-maths',
		description: 'Mathematical analysis higher level',
		isFree: false,
	},
	{
		id: 212,
		title: 'IB Mathematics HL Applications',
		price: 50.99,
		category: 'ib-hl-maths',
		description: 'Mathematical applications HL',
		isFree: false,
	},
	{
		id: 213,
		title: 'IB Further Mathematics HL',
		price: 54.99,
		category: 'ib-hl-maths',
		description: 'Further mathematics higher level',
		isFree: false,
	},
	{
		id: 214,
		title: 'IB Biology HL Advanced',
		price: 51.99,
		category: 'ib-hl-sciences',
		description: 'Higher level biology comprehensive',
		isFree: false,
	},
	{
		id: 215,
		title: 'IB Chemistry HL Complete',
		price: 51.99,
		category: 'ib-hl-sciences',
		description: 'Chemistry HL full course',
		isFree: false,
	},
	{
		id: 216,
		title: 'IB Physics HL Core & Options',
		price: 53.99,
		category: 'ib-hl-sciences',
		description: 'Physics higher level mastery',
		isFree: false,
	},
	{
		id: 217,
		title: 'IB English A Literature HL',
		price: 48.99,
		category: 'ib-hl-english',
		description: 'Literature higher level analysis',
		isFree: false,
	},
	{
		id: 218,
		title: 'IB English A Language & Literature HL',
		price: 48.99,
		category: 'ib-hl-english',
		description: 'Language and literature HL',
		isFree: false,
	},
	{
		id: 219,
		title: 'IB English B Higher Level',
		price: 46.99,
		category: 'ib-hl-english',
		description: 'Advanced English language',
		isFree: false,
	},
	{
		id: 220,
		title: 'IB French B Higher Level',
		price: 49.99,
		category: 'ib-hl-languages',
		description: 'French language acquisition HL',
		isFree: false,
	},
	{
		id: 221,
		title: 'IB Spanish B Higher Level',
		price: 49.99,
		category: 'ib-hl-languages',
		description: 'Spanish language mastery HL',
		isFree: false,
	},
	{
		id: 222,
		title: 'IB Mandarin B Higher Level',
		price: 51.99,
		category: 'ib-hl-languages',
		description: 'Advanced Mandarin course HL',
		isFree: false,
	},
	{
		id: 223,
		title: 'IB History HL World History',
		price: 50.99,
		category: 'ib-hl-humanities',
		description: 'World history higher level',
		isFree: false,
	},
	{
		id: 224,
		title: 'IB Geography HL',
		price: 49.99,
		category: 'ib-hl-humanities',
		description: 'Advanced geographical studies',
		isFree: false,
	},
	{
		id: 225,
		title: 'IB Economics HL',
		price: 51.99,
		category: 'ib-hl-humanities',
		description: 'Higher level economic theory',
		isFree: false,
	},

	// Predicted Papers - GCSE
	{
		id: 226,
		title: 'GCSE Mathematics Predicted Papers 2026',
		price: 34.99,
		category: 'predicted-gcse-maths',
		description: 'Expert-predicted mathematics papers',
		isFree: false,
	},
	{
		id: 227,
		title: 'GCSE Mathematics Predicted Higher Tier',
		price: 36.99,
		category: 'predicted-gcse-maths',
		description: 'Higher tier predicted examinations',
		isFree: false,
	},
	{
		id: 228,
		title: 'GCSE Mathematics Predicted Foundation',
		price: 32.99,
		category: 'predicted-gcse-maths',
		description: 'Foundation tier predictions',
		isFree: false,
	},
	{
		id: 229,
		title: 'GCSE English Language Predicted 2026',
		price: 33.99,
		category: 'predicted-gcse-english',
		description: 'Predicted English language papers',
		isFree: false,
	},
	{
		id: 230,
		title: 'GCSE English Literature Predicted',
		price: 34.99,
		category: 'predicted-gcse-english',
		description: 'Literature examination predictions',
		isFree: false,
	},
	{
		id: 231,
		title: 'GCSE English Combined Predicted Pack',
		price: 39.99,
		category: 'predicted-gcse-english',
		description: 'Language and literature predictions',
		isFree: false,
	},
	{
		id: 232,
		title: 'GCSE Combined Science Predicted 2026',
		price: 38.99,
		category: 'predicted-gcse-sciences',
		description: 'Trilogy science predicted papers',
		isFree: false,
	},
	{
		id: 233,
		title: 'GCSE Biology Predicted Papers',
		price: 34.99,
		category: 'predicted-gcse-sciences',
		description: 'Separate biology predictions',
		isFree: false,
	},
	{
		id: 234,
		title: 'GCSE Chemistry & Physics Predicted',
		price: 42.99,
		category: 'predicted-gcse-sciences',
		description: 'Chemistry and physics predictions',
		isFree: false,
	},

	// Predicted Papers - A-Level
	{
		id: 235,
		title: 'A-Level Mathematics Predicted 2026',
		price: 48.99,
		category: 'predicted-a-level-maths',
		description: 'Pure and applied maths predictions',
		isFree: false,
	},
	{
		id: 236,
		title: 'A-Level Further Maths Predicted',
		price: 52.99,
		category: 'predicted-a-level-maths',
		description: 'Further mathematics predictions',
		isFree: false,
	},
	{
		id: 237,
		title: 'A-Level Statistics Predicted Papers',
		price: 44.99,
		category: 'predicted-a-level-maths',
		description: 'Statistical analysis predictions',
		isFree: false,
	},
	{
		id: 238,
		title: 'A-Level Biology Predicted 2026',
		price: 46.99,
		category: 'predicted-a-level-sciences',
		description: 'Biology predicted examinations',
		isFree: false,
	},
	{
		id: 239,
		title: 'A-Level Chemistry Predicted Papers',
		price: 46.99,
		category: 'predicted-a-level-sciences',
		description: 'Chemistry predictions and solutions',
		isFree: false,
	},
	{
		id: 240,
		title: 'A-Level Physics Predicted 2026',
		price: 48.99,
		category: 'predicted-a-level-sciences',
		description: 'Physics predicted papers',
		isFree: false,
	},
	{
		id: 241,
		title: 'A-Level English Literature Predicted',
		price: 44.99,
		category: 'predicted-a-level-other',
		description: 'Literature examination predictions',
		isFree: false,
	},
	{
		id: 242,
		title: 'A-Level History Predicted Papers',
		price: 45.99,
		category: 'predicted-a-level-other',
		description: 'History predicted examinations',
		isFree: false,
	},
	{
		id: 243,
		title: 'A-Level Psychology Predicted 2026',
		price: 44.99,
		category: 'predicted-a-level-other',
		description: 'Psychology paper predictions',
		isFree: false,
	},

	// Predicted Papers - IB
	{
		id: 244,
		title: 'IB Mathematics Predicted Papers 2026',
		price: 52.99,
		category: 'predicted-ib-maths',
		description: 'IB maths SL & HL predictions',
		isFree: false,
	},
	{
		id: 245,
		title: 'IB Mathematics AA Predicted',
		price: 54.99,
		category: 'predicted-ib-maths',
		description: 'Analysis & approaches predictions',
		isFree: false,
	},
	{
		id: 246,
		title: 'IB Mathematics AI Predicted',
		price: 52.99,
		category: 'predicted-ib-maths',
		description: 'Applications & interpretation predictions',
		isFree: false,
	},
	{
		id: 247,
		title: 'IB Sciences Predicted 2026',
		price: 56.99,
		category: 'predicted-ib-sciences',
		description: 'Biology, Chemistry, Physics predictions',
		isFree: false,
	},
	{
		id: 248,
		title: 'IB Biology Predicted Papers',
		price: 49.99,
		category: 'predicted-ib-sciences',
		description: 'Biology SL & HL predictions',
		isFree: false,
	},
	{
		id: 249,
		title: 'IB Chemistry & Physics Predicted',
		price: 54.99,
		category: 'predicted-ib-sciences',
		description: 'Chemistry and Physics predictions',
		isFree: false,
	},
	{
		id: 250,
		title: 'IB English A Predicted 2026',
		price: 48.99,
		category: 'predicted-ib-other',
		description: 'English literature predictions',
		isFree: false,
	},
	{
		id: 251,
		title: 'IB History Predicted Papers',
		price: 49.99,
		category: 'predicted-ib-other',
		description: 'History routes predicted papers',
		isFree: false,
	},
	{
		id: 252,
		title: 'IB Economics Predicted 2026',
		price: 50.99,
		category: 'predicted-ib-other',
		description: 'Economics SL & HL predictions',
		isFree: false,
	},
];

// Recursive Category Item Component for nested categories - Using shadcn Collapsible
function CategoryItem({
	category,
	selectedCategory,
	expandedCategories,
	onCategorySelect,
	toggleCategory,
	level = 0,
}: {
	category: any;
	selectedCategory: string | null;
	expandedCategories: Set<string>;
	onCategorySelect: (categoryId: string | null) => void;
	toggleCategory: (categoryId: string) => void;
	level?: number;
}) {
	const hasChildren =
		category.subcategories && category.subcategories.length > 0;
	const isExpanded = expandedCategories.has(category.id);
	const isSelected = selectedCategory === category.id;

	// Indentation increases with nesting level
	const marginLeft = level * 16; // 16px = 1rem per level

	return (
		<li>
			<Collapsible
				open={isExpanded}
				onOpenChange={() => toggleCategory(category.id)}>
				<div
					className='flex items-center'
					style={{ marginLeft: `${marginLeft}px` }}>
					{hasChildren && (
						<CollapsibleTrigger asChild>
							<button
								className='p-1 hover:bg-neutral-100 flex-shrink-0 transition-transform rounded-none'
								aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.name}`}>
								<ChevronRight
									className={`w-4 h-4 transition-transform ${
										isExpanded ? 'rotate-90' : ''
									}`}
								/>
							</button>
						</CollapsibleTrigger>
					)}
					{!hasChildren && <div className='w-6' />}
					<button
						onClick={() => onCategorySelect(category.id)}
						className={`flex-1 text-left px-3 py-2 transition-colors rounded-none ${
							isSelected ?
								'bg-primary-100 text-primary-900 font-medium'
							:	'text-neutral-600 hover:bg-neutral-100'
						} ${
							level === 0 ? 'font-medium'
							: level === 1 ? 'text-sm'
							: 'text-xs'
						}`}>
						{category.name}
						<span
							className={`text-neutral-500 ml-2 ${
								level === 2 ? 'text-xs' : 'text-sm'
							}`}>
							({category.count})
						</span>
					</button>
				</div>

				{/* Recursively render subcategories with Collapsible animation */}
				{hasChildren && (
					<CollapsibleContent className='mt-1'>
						<ul className='space-y-1'>
							{category.subcategories.map((subCategory: any) => (
								<CategoryItem
									key={subCategory.id}
									category={subCategory}
									selectedCategory={selectedCategory}
									expandedCategories={expandedCategories}
									onCategorySelect={onCategorySelect}
									toggleCategory={toggleCategory}
									level={level + 1}
								/>
							))}
						</ul>
					</CollapsibleContent>
				)}
			</Collapsible>
		</li>
	);

// Category Tab Bar Component - Horizontal scrollable tabs for MD breakpoint only
function CategoryTabBar({
	selectedCategory,
	onCategorySelect,
	showFreeOnly,
	onFreeFilterChange,
}: {
	selectedCategory: string | null;
	onCategorySelect: (categoryId: string | null) => void;
	showFreeOnly: boolean;
	onFreeFilterChange: (value: boolean) => void;
}) {
	return (
		<div className='hidden md:block lg:hidden border-b border-neutral-200 bg-white'>
			{/* Free Resources Filter - Independent checkbox */}
			<div className='px-4 py-3 bg-neutral-50 border-b border-neutral-200'>
				<label className='flex items-center gap-3 cursor-pointer'>
					<Checkbox
						checked={showFreeOnly}
						onCheckedChange={(checked) => {
							onFreeFilterChange(checked === true);
						className='data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700'
					/>
					<span className='text-sm font-medium text-neutral-700 select-none'>
						Free Papers
					</span>
					<span className='text-xs text-neutral-500 ml-auto'>
						({resourceCards.filter((r) => r.isFree).length})
					</span>
				</label>
			</div>

			{/* Horizontal scrollable container */}
			<div className='overflow-x-auto scrollbar-hide'>
				<div className='flex gap-2 p-4 min-w-min'>
					{/* All Resources chip */}
					<button
						onClick={() => onCategorySelect(null)}
						className={`flex-shrink-0 px-4 py-2 rounded-none text-sm font-medium transition-colors whitespace-nowrap ${
							selectedCategory === null ?
								'bg-primary-700 text-white'
							:	'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
						}`}>
						All Resources ({resourceCards.length})
					</button>

					{/* Top-level category chips */}
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => onCategorySelect(category.id)}
							className={`flex-shrink-0 px-4 py-2 rounded-none text-sm font-medium transition-colors whitespace-nowrap ${
								selectedCategory === category.id ?
									'bg-primary-700 text-white'
								:	'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
							}`}>
							{category.name} ({category.count})
						</button>
					))}
				</div>
			</div>
		</div>
	);

// Category Sidebar Component with sticky positioning
function CategorySidebar({
	selectedCategory,
	onCategorySelect,
	showFreeOnly,
	onFreeFilterChange,
}: {
	selectedCategory: string | null;
	onCategorySelect: (categoryId: string | null) => void;
	showFreeOnly: boolean;
	onFreeFilterChange: (value: boolean) => void;
}) {
	const [expandedCategories, setExpandedCategories] = useState<Set<string>(
		new Set(),
	);

	const toggleCategory = (categoryId: string) => {
		const newExpanded = new Set(expandedCategories);
		if (newExpanded.has(categoryId)) {
			newExpanded.delete(categoryId);
		} else {
			newExpanded.add(categoryId);
		setExpandedCategories(newExpanded);
	};

	return (
		<aside className='hidden lg:block pr-4 sm:pr-6 lg:pr-8 border-r border-neutral-200'>
			<div className='py-4 sm:py-6 lg:py-6'>
				<h2 className='font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-4 px-2 sm:px-3 md:px-3 text-neutral-600'>
					Categories
				</h2>

				{/* Free Resources Filter - Independent checkbox above categories */}
				<div className='mb-4 pb-4 border-b border-neutral-200'>
					<label className='flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-neutral-50 transition-colors rounded-none'>
						<Checkbox
							checked={showFreeOnly}
							onCheckedChange={(checked) => {
								onFreeFilterChange(checked === true);
							className='data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700'
						/>
						<span className='text-sm font-medium text-neutral-700 select-none'>
							Free Papers
						</span>
						<span className='text-xs text-neutral-500 ml-auto'>
							({resourceCards.filter((r) => r.isFree).length})
						</span>
					</label>
				</div>

				<nav aria-label='Resource categories'>
					<ul className='space-y-2'>
						{/* All Resources option */}
						<li>
							<button
								onClick={() => onCategorySelect(null)}
								className={`w-full text-left px-3 py-2 transition-colors rounded-none ${
									selectedCategory === null ?
										'bg-primary-100 text-primary-900 font-medium'
									:	'!text-neutral-600 hover:bg-neutral-100'
								}`}>
								All Resources
								<span className='text-sm text-neutral-500 ml-2'>
									({resourceCards.length})
								</span>
							</button>
						</li>

						{/* Recursive category tree */}
						{categories.map((category) => (
							<CategoryItem
								key={category.id}
								category={category}
								selectedCategory={selectedCategory}
								expandedCategories={expandedCategories}
								onCategorySelect={onCategorySelect}
								toggleCategory={toggleCategory}
								level={0}
							/>
						))}
					</ul>
				</nav>
			</div>
		</aside>
	);

// Resource Card Component - Official Blog7 card structure from shadcnblocks
// Using exact inline Tailwind classes from Blog7 example
function ResourceCard({ resource }: { resource: (typeof resourceCards)[0] }) {
	return (
		<div
			className='h-full'>
			<Card className='flex flex-col pt-0 h-full rounded-none bg-white relative'>
				{/* Free Badge - positioned in top-right corner */}
				{resource.isFree && (
					<Badge className='absolute top-3 right-3 z-10 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-none shadow-md'>
						Free
					</Badge>
				)}
				<div className='aspect-16/9 w-full flex-shrink-0 border-b'>
					<button
						type='button'
						onClick={() => {
							/* Download handler */
						className='block w-full h-full transition-opacity duration-200 hover:opacity-70'>
						<img
							src='/images/exam-papers/pdf-document.svg'
							alt={resource.title}
							className='h-full w-full object-contain object-center rounded-none p-12'
						/>
					</button>
				</div>

				<CardHeader className='space-y-0 px-4 pt-4 pb-2 flex-shrink-0 h-[5rem]'>
					<h3 className='text-lg font-semibold leading-tight tracking-tight !text-slate-900 text-left md:text-xl'>
						<button
							type='button'
							onClick={() => {
								/* Download handler */
							className='!text-slate-900 no-underline hover:underline hover:!text-slate-700 text-left'>
		{resource.title}
						</button>
					</h3>
				</CardHeader>

				<CardContent className='px-4 pb-2 h-[5rem] flex items-start'>
					<p className='!text-neutral-600 text-sm leading-relaxed text-left'>
						{resource.description}
					</p>
				</CardContent>

				<CardFooter className='flex items-center justify-between px-4 pb-3 pt-2 flex-shrink-0'>
					<button
						type='button'
						onClick={() => {
							/* Download handler */
						className='!text-slate-900 inline-flex items-center text-sm font-medium no-underline hover:underline hover:!text-slate-700'>
						Download
						<ArrowRight className='ml-2 size-4' />
					</button>
					{resource.isFree ?
						<span className='text-sm font-semibold text-slate-900'>Free</span>
					:	<span className='text-sm font-medium text-slate-900'>
							£{resource.price.toFixed(2)}
						</span>
				</CardFooter>
			</Card>
		</div>
	);

// Pagination Component
function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}) {
	return (
		<div className='flex items-center justify-center gap-2 mt-8'>
			<Button
				variant='outline'
				size='sm'
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='rounded-none'>
				Previous
			</Button>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
				<Button
					key={page}
					variant={currentPage === page ? 'default' : 'outline'}
					size='sm'
					onClick={() => onPageChange(page)}
					className='min-w-[2.5rem] rounded-none'>
		{page}
				</Button>
			))}

			<Button
				variant='outline'
				size='sm'
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='rounded-none'>
				Next
			</Button>
		</div>
	);

export default function ResourcesPage() {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [showFreeOnly, setShowFreeOnly] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	// Helper function to get all subcategory IDs for a given category
	const getAllSubcategoryIds = (categoryId: string): string[] => {
		const ids: string[] = [categoryId];

		// Find the category in the tree
		const findAndCollectIds = (cats: typeof categories): void => {
			for (const cat of cats) {
				if (cat.id === categoryId) {
					const collectFromSubcategories = (subCats: any[]): void => {
						for (const subCat of subCats) {
							ids.push(subCat.id);
							if (subCat.subcategories) {
								collectFromSubcategories(subCat.subcategories);
					};
					if (cat.subcategories) {
						collectFromSubcategories(cat.subcategories);
					return;
				if (cat.subcategories) {
					findAndCollectIds(cat.subcategories);
		};

		findAndCollectIds(categories);
		return ids;
	};

	// Filter resources based on selected category, search, and free filter
	const filteredResources = resourceCards.filter((resource) => {
		const matchesCategory =
			!selectedCategory ||
			getAllSubcategoryIds(selectedCategory).includes(resource.category);
		const matchesSearch =
			!searchQuery ||
			resource.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFreeFilter = !showFreeOnly || resource.isFree;
		return matchesCategory && matchesSearch && matchesFreeFilter;
	});

	// Pagination logic
	const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedResources = filteredResources.slice(
		startIndex,
		startIndex + itemsPerPage,
	);

	return (
		<>
			{/* Hero Section */}
			<SimpleHero
				backgroundImage="/images/hero/exam-papers-header-new.jpg"
				h1="Premium"
				h1AccentText="Exam Papers"
				h2="Comprehensive past papers and expert-curated examination resources to support your academic journey"
			/>

			{/* Main Content with Sidebar */}
			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'
				verticalSpacing='lg'>
				<div className='w-full px-4 sm:px-6 md:px-8'>
					{/* Search Bar */}
					<div className='flex items-center justify-center py-5 sm:py-6 md:py-7 lg:py-8 xl:py-9 2xl:py-10'>
						<div className='max-w-2xl mx-auto w-full'>
							<div className='relative flex items-center'>
								<Search className='absolute left-3 sm:left-4 md:left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5' />
								<Input
									type='search'
									placeholder='Search for resources, subjects, or topics...'
									className='pl-10 sm:pl-12 md:pl-12 py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-lg w-full rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:outline-none'
									value={searchQuery}
									onChange={(e) => {
										setSearchQuery(e.target.value);
										setCurrentPage(1); // Reset to first page on search
								/>
							</div>
						</div>
					</div>

					{/* Horizontal Tab Bar for MD breakpoint (768px-1023px) */}
					<CategoryTabBar
						selectedCategory={selectedCategory}
						onCategorySelect={(categoryId) => {
							setSelectedCategory(categoryId);
							setCurrentPage(1); // Reset to first page on category change
						showFreeOnly={showFreeOnly}
						onFreeFilterChange={(value) => {
							setShowFreeOnly(value);
							setCurrentPage(1); // Reset to first page on filter change
					/>

					{/* Sidebar + Grid Layout with fixed height container */}
					<div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-0 border-t border-b border-neutral-200'>
						{/* Sticky Sidebar - Left Column */}
						<CategorySidebar
							selectedCategory={selectedCategory}
							onCategorySelect={(categoryId) => {
								setSelectedCategory(categoryId);
								setCurrentPage(1); // Reset to first page on category change
							showFreeOnly={showFreeOnly}
							onFreeFilterChange={(value) => {
								setShowFreeOnly(value);
								setCurrentPage(1); // Reset to first page on filter change
						/>

						{/* Main Content Area - Right Column with independent scroll */}
						<div
							className='p-3 sm:p-4 md:p-6 bg-neutral-100'
							style={{ overscrollBehavior: 'contain' }}>
							{/* Results count */}
							<div className='flex items-center justify-center py-3 sm:py-4 md:py-4'>
								<p className='text-xs sm:text-sm md:text-base text-neutral-600 m-0 p-0 leading-none self-center'>
									Showing {startIndex + 1}-
									{Math.min(startIndex + itemsPerPage, filteredResources.length)} of{' '}
									{filteredResources.length} exam papers
								</p>
							</div>

							{/* Responsive Grid: 1 col (mobile) -> 2 cols (sm) -> 3 cols (md) -> 4 cols (lg+) */}
							<div className='grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6'>
								{paginatedResources.map((resource) => (
									<ResourceCard
										key={resource.id}
										resource={resource}
									/>
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={setCurrentPage}
								/>
							)}

							{/* No results message */}
							{filteredResources.length === 0 && (
								<div className='text-center py-12 sm:py-16 md:py-16'>
									<p className='text-lg sm:text-xl md:text-2xl text-neutral-600 mb-3 sm:mb-4 md:mb-4'>
										No resources found matching your criteria
									</p>
									<Button
										variant='outline'
										onClick={() => {
											setSearchQuery('');
											setSelectedCategory(null);
											setShowFreeOnly(false);
											setCurrentPage(1);
										Clear filters
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</PageLayout>
		</>
	);
