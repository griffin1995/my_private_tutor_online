import { z } from 'zod';

const contactFormSchema = z.object({
	firstName: z
		.string()
		.min(2, 'First name must be at least 2 characters')
		.max(50, 'First name must be less than 50 characters')
		.regex(
			/^[a-zA-Z\s'-]+$/,
			'First name can only contain letters, spaces, hyphens and apostrophes',
		),
	lastName: z
		.string()
		.min(2, 'Last name must be at least 2 characters')
		.max(50, 'Last name must be less than 50 characters')
		.regex(
			/^[a-zA-Z\s'-]+$/,
			'Last name can only contain letters, spaces, hyphens and apostrophes',
		),
	email: z.email('Please enter a valid email address')
		.max(255, 'Email address is too long'),
	phone: z
		.string()
		.min(10, 'Phone number must be at least 10 digits')
		.max(15, 'Phone number must be less than 15 digits')
		.regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number')
		.optional(),
	studentAge: z.int('Age must be a whole number')
		.min(5, 'Student must be at least 5 years old')
		.max(25, 'Please contact us directly for students over 25'),
	educationLevel: z.enum(
		[
			'primary',
			'secondary',
			'gcse',
			'a-level',
			'ib',
			'university',
			'adult-education',
		],
		{
			error: () => 'Please select an education level',
		},
	),
	subjects: z
		.array(z.string())
		.min(1, 'Please select at least one subject')
		.max(5, 'Please select no more than 5 subjects'),
	tutorType: z.enum(['online', 'in-person', 'hybrid'], {
		error: () => 'Please select a tutoring preference',
	}),
	urgency: z.enum(['immediate', 'this-week', 'this-month', 'flexible'], {
		error: () => 'Please select a timeframe',
	}),
	budget: z.enum(['25-35', '35-45', '45-60', '60-80', '80-plus', 'discuss'], {
		error: () => 'Please select a budget range',
	}),
	location: z.string().optional(),
	additionalInfo: z.string().max(1000, 'Additional information is too long').optional(),
	consent: z.boolean().refine((val) => val === true, {
		message: 'You must agree to our terms and privacy policy',
	}),
	honeypot: z.string().max(0, 'Please leave this field empty'),
});

export const newsletterSchema = z.object({
	email: z.email('Please enter a valid email address'),
	honeypot: z.string().max(0, 'Please leave this field empty'),
	consent: z.boolean().refine((val) => val === true, {
		message: 'You must agree to our privacy policy',
	}),
});

const consultationBookingSchema = z.object({
	firstName: z.string().min(2, 'First name must be at least 2 characters'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters'),
	email: z.email('Please enter a valid email address'),
	phone: z.string().optional(),
	preferredDate: z.string().min(1, 'Please select a preferred date'),
	preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
		error: () => 'Please select a preferred time',
	}),
	topics: z
		.array(
			z.enum([
				'educational-assessment',
				'tutoring-options',
				'exam-preparation',
				'university-applications',
				'special-needs',
				'career-guidance',
				'general-enquiry',
			]),
		)
		.min(1, 'Please select at least one topic'),
	additionalInfo: z.string().optional(),
	consent: z.boolean().refine((val) => val === true),
	honeypot: z.string().max(0),
});

const adminLoginSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	remember: z.boolean().optional(),
});

const fileUploadSchema = z.object({
	file: z.instanceof(File),
	type: z.enum(['image', 'document', 'video']),
	maxSize: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
	allowedFormats: z
		.array(z.string())
		.refine(
			(formats) =>
				formats.every((format) =>
					[
						'jpg',
						'jpeg',
						'png',
						'webp',
						'avif',
						'pdf',
						'doc',
						'docx',
						'mp4',
						'webm',
					].includes(format.toLowerCase()),
				),
			'Unsupported file format',
		)
		.optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
type ConsultationBookingData = z.infer<typeof consultationBookingSchema>;
type AdminLoginData = z.infer<typeof adminLoginSchema>;
type FileUploadData = z.infer<typeof fileUploadSchema>;

export const safeValidateForm = <T>(schema: z.ZodType<T>, data: unknown) => {
	const result = schema.safeParse(data);
	if (result.success) {
		return {
			success: true as const,
			data: result.data,
			errors: undefined,
		};
	}
	return {
		success: false as const,
		data: undefined,
		errors: z.treeifyError(result.error),
	};
};