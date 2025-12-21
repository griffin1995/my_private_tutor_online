import { z } from 'zod';

/**
 * Contact form schema that aligns with the existing API route structure
 * while providing comprehensive validation and TypeScript types
 */
export const contactFormSchema = z.object({
	// Basic contact information
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name must not exceed 100 characters')
		.regex(/^[a-zA-Z\s\-']+$/, 'Name contains invalid characters'),

	email: z
		.email('Please enter a valid email address')
		.max(255, 'Email address is too long'),

	phone: z
		.string()
		.regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
		.min(10, 'Phone number must be at least 10 digits')
		.max(20, 'Phone number is too long')
		.optional()
		.or(z.literal('')),

	// Message details
	subject: z
		.string()
		.min(5, 'Subject must be at least 5 characters')
		.max(200, 'Subject is too long'),

	message: z
		.string()
		.min(10, 'Message must be at least 10 characters')
		.max(5000, 'Message is too long')
		.regex(/^[^<>{}]*$/, 'Message contains invalid characters'),

	// Contact preferences
	preferredContact: z
		.enum(['email', 'phone'], {
			error: () => 'Please select your preferred contact method'
		})
		.optional(),

	// Student information (optional)
	studentDetails: z
		.object({
			age: z
				.number()
				.int('Age must be a whole number')
				.min(4, 'Student must be at least 4 years old')
				.max(25, 'Please contact us directly for students over 25')
				.optional(),
			currentLevel: z
				.string()
				.max(50, 'Education level is too long')
				.optional(),
			subjects: z
				.array(z.string().max(50))
				.max(10, 'Please select no more than 10 subjects')
				.optional(),
			examBoard: z
				.string()
				.max(50, 'Exam board name is too long')
				.optional(),
		})
		.optional(),

	// Urgency level
	urgency: z
		.enum(['immediate', 'within_week', 'within_month', 'planning_ahead'], {
			error: () => 'Please select a timeframe'
		})
		.optional(),

	// How they found us
	referralSource: z
		.string()
		.max(100, 'Referral source is too long')
		.optional(),

	// Anti-spam protection
	honeypot: z.string().max(0, 'Please leave this field empty'),

	// Privacy consent
	consentToContact: z
		.boolean()
		.refine((val) => val === true, {
			message: 'You must agree to our privacy policy to submit this form'
		}),
});

// Type inference for TypeScript
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Pre-transform function to clean data before API submission
export const transformContactFormData = (data: ContactFormData) => {
	// Remove honeypot and consent fields for API submission
	const { honeypot, consentToContact, ...apiData } = data;

	// Clean up empty optional fields
	const cleanedData = {
		...apiData,
		phone: data.phone || undefined,
		preferredContact: data.preferredContact || undefined,
		studentDetails: data.studentDetails && Object.keys(data.studentDetails).length > 0
			? data.studentDetails
			: undefined,
		urgency: data.urgency || undefined,
		referralSource: data.referralSource || undefined,
	};

	return cleanedData;
};

// Default form values
export const contactFormDefaults: Partial<ContactFormData> = {
	name: '',
	email: '',
	phone: '',
	subject: '',
	message: '',
	preferredContact: 'email',
	urgency: 'within_week',
	honeypot: '',
	consentToContact: false,
};

// Education level options for dropdowns
export const educationLevels = [
	{ value: 'Primary School', label: 'Primary School (Ages 4-11)' },
	{ value: 'Secondary School', label: 'Secondary School (Ages 11-16)' },
	{ value: 'GCSE', label: 'GCSE Level' },
	{ value: 'A-Level', label: 'A-Level' },
	{ value: 'IB', label: 'International Baccalaureate' },
	{ value: 'University', label: 'University Level' },
	{ value: 'Adult Education', label: 'Adult Education' },
] as const;

// Subject options for multi-select
export const subjectOptions = [
	'Mathematics', 'English Language', 'English Literature', 'Science', 'Physics',
	'Chemistry', 'Biology', 'History', 'Geography', 'French', 'Spanish', 'German',
	'Art', 'Music', 'Computer Science', 'Economics', 'Psychology', 'Philosophy',
	'11+ Preparation', 'Common Entrance', 'Other'
] as const;

// Urgency options
export const urgencyOptions = [
	{ value: 'immediate', label: 'Immediate (within 3 days)' },
	{ value: 'within_week', label: 'This week' },
	{ value: 'within_month', label: 'This month' },
	{ value: 'planning_ahead', label: 'Planning ahead' },
] as const;

// Referral source options
export const referralSources = [
	'Google search', 'Social media', 'Word of mouth', 'Previous client',
	'Educational consultant', 'School recommendation', 'Other'
] as const;