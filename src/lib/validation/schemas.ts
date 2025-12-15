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
	email: z
		.string()
		.email('Please enter a valid email address')
		.max(255, 'Email address is too long'),
	phone: z
		.string()
		.min(10, 'Phone number must be at least 10 digits')
		.max(15, 'Phone number must be less than 15 digits')
		.regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number')
		.optional(),
	studentAge: z
		.number()
		.int('Age must be a whole number')
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
			errorMap: () => ({
				message: 'Please select an education level',
			}),
		},
	),
	subjects: z
		.array(z.string())
		.min(1, 'Please select at least one subject')
		.max(5, 'Please select no more than 5 subjects'),
	tutorType: z.enum(['online', 'in-person', 'hybrid'], {
		errorMap: () => ({
			message: 'Please select a tutoring preference',
		}),
	}),
	sessionFrequency: z
		.enum([
			'once-weekly',
			'twice-weekly',
			'intensive',
			'exam-preparation',
			'flexible',
		])
		.optional(),
	specificRequirements: z
		.string()
		.max(1000, 'Requirements must be less than 1000 characters')
		.optional(),
	goals: z
		.string()
		.max(500, 'Goals must be less than 500 characters')
		.optional(),
	preferredStartDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)')
		.optional(),
	budget: z.enum(['standard', 'premium', 'luxury', 'flexible']).optional(),
	consentToContact: z.boolean().refine((val) => val === true, {
		message: 'You must consent to being contacted',
	}),
	marketingConsent: z.boolean().optional(),
	honeypot: z.string().max(0, 'Please leave this field empty').optional(),
});
export const newsletterSchema = z.object({
	email: z
		.string()
		.email('Please enter a valid email address')
		.max(255, 'Email address is too long'),
	firstName: z
		.string()
		.min(2, 'First name must be at least 2 characters')
		.max(50, 'First name must be less than 50 characters')
		.optional(),
	interests: z
		.array(
			z.enum([
				'primary-education',
				'secondary-education',
				'gcse-preparation',
				'a-level-preparation',
				'university-preparation',
				'oxbridge-preparation',
				'independent-school-preparation',
				'adult-learning',
			]),
		)
		.optional(),
	consentToMarketing: z.boolean().refine((val) => val === true, {
		message: 'You must consent to receiving marketing communications',
	}),
	honeypot: z.string().max(0).optional(),
});
const consultationBookingSchema = z.object({
	parentName: z
		.string()
		.min(2, 'Parent/Guardian name is required')
		.max(100, 'Name must be less than 100 characters'),
	studentName: z
		.string()
		.min(2, 'Student name is required')
		.max(100, 'Name must be less than 100 characters'),
	email: z
		.string()
		.email('Please enter a valid email address')
		.max(255, 'Email address is too long'),
	phone: z
		.string()
		.min(10, 'Phone number is required')
		.regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number'),
	preferredDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
	preferredTime: z
		.string()
		.regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please select a valid time'),
	alternativeDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'Please provide an alternative date')
		.optional(),
	alternativeTime: z
		.string()
		.regex(
			/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
			'Please provide an alternative time',
		)
		.optional(),
	consultationType: z.enum(['online', 'phone', 'in-person'], {
		errorMap: () => ({
			message: 'Please select a consultation type',
		}),
	}),
	urgency: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
	currentChallenges: z
		.string()
		.max(500, 'Please keep challenges description under 500 characters')
		.optional(),
	previousTutoring: z.boolean().optional(),
	specialRequirements: z
		.string()
		.max(300, 'Special requirements must be under 300 characters')
		.optional(),
	dataProcessingConsent: z.boolean().refine((val) => val === true, {
		message: 'You must consent to data processing for consultation booking',
	}),
	honeypot: z.string().max(0).optional(),
});
const adminLoginSchema = z.object({
	email: z
		.string()
		.email('Please enter a valid email address')
		.max(255, 'Email address is too long'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(128, 'Password is too long'),
	rememberMe: z.boolean().optional(),
	csrfToken: z.string().min(1, 'Security token is required'),
	honeypot: z.string().max(0).optional(),
});
const fileUploadSchema = z.object({
	file: z
		.any()
		.refine((file) => file instanceof File, 'Please select a valid file')
		.refine(
			(file) => file.size <= 10 * 1024 * 1024,
			'File size must be less than 10MB',
		)
		.refine(
			(file) =>
				[
					'image/jpeg',
					'image/png',
					'image/webp',
					'image/avif',
					'application/pdf',
				].includes(file.type),
			'File must be an image (JPEG, PNG, WebP, AVIF) or PDF',
		),
	altText: z
		.string()
		.min(5, 'Alt text must be at least 5 characters for accessibility')
		.max(200, 'Alt text must be less than 200 characters')
		.optional(),
	category: z
		.enum([
			'logos',
			'team-photos',
			'student-images',
			'institution-logos',
			'marketing-materials',
			'testimonial-media',
			'documents',
		])
		.optional(),
});
type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
type ConsultationBookingData = z.infer<typeof consultationBookingSchema>;
type AdminLoginData = z.infer<typeof adminLoginSchema>;
type FileUploadData = z.infer<typeof fileUploadSchema>;
const validateForm = <T>(
	schema: z.ZodSchema<T>,
	data: unknown,
): {
	success: boolean;
	data?: T;
	errors?: z.ZodError;
} => {
	try {
		const validData = schema.parse(data);
		return {
			success: true,
			data: validData,
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: false,
				errors: error,
			};
		}
		throw error;
	}
};
export const safeValidateForm = <T>(schema: z.ZodSchema<T>, data: unknown) => {
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
		errors: result.error.format(),
	};
};
const isValidContactForm = (data: unknown): data is ContactFormData => {
	return contactFormSchema.safeParse(data).success;
};
const isValidNewsletterSubscription = (
	data: unknown,
): data is NewsletterData => {
	return newsletterSchema.safeParse(data).success;
};
const isValidConsultationBooking = (
	data: unknown,
): data is ConsultationBookingData => {
	return consultationBookingSchema.safeParse(data).success;
};
const isValidAdminLogin = (data: unknown): data is AdminLoginData => {
	return adminLoginSchema.safeParse(data).success;
};
const isValidFileUpload = (data: unknown): data is FileUploadData => {
	return fileUploadSchema.safeParse(data).success;
};
const formatValidationErrors = (
	errors: z.ZodError,
): Record<string, string> => {
	const formattedErrors: Record<string, string> = {};
	errors.issues.forEach((issue) => {
		const path = issue.path.join('.');
		formattedErrors[path] = issue.message;
	});
	return formattedErrors;
};
const ukPhoneNumberSchema = z
	.string()
	.regex(/^(\+44\s?|0)([1-9]\d{8,9})$/, 'Please enter a valid UK phone number');
const ukPostcodeSchema = z
	.string()
	.regex(
		/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
		'Please enter a valid UK postcode',
	)
	.transform((val) => val.toUpperCase().replace(/\s+/g, ' ').trim());
const validationPatterns = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	ukPhone: /^(\+44\s?|0)([1-9]\d{8,9})$/,
	ukPostcode: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
	nameChars: /^[a-zA-Z\s'-]+$/,
	strongPassword:
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
} as const;
const validationMessages = {
	required: 'This field is required',
	email: 'Please enter a valid email address',
	phone: 'Please enter a valid phone number',
	postcode: 'Please enter a valid postcode',
	nameFormat: 'Name can only contain letters, spaces, hyphens and apostrophes',
	ageRange: 'Please enter a valid age',
	tooShort: (min: number) => `Must be at least ${min} characters`,
	tooLong: (max: number) => `Must be no more than ${max} characters`,
	invalidFormat: 'Invalid format',
	consent: 'You must provide consent to continue',
	honeypot: 'Please leave this field empty',
} as const;
