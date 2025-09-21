import z from 'zod';

export const signupSchema = z
	.object({
		firstname: z.string().min(1, 'Firstname is required'),
		lastname: z.string().min(1, 'Lastname is required'),
		email: z.string().email('Invalid email'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z
			.string()
			.min(6, 'Password must be at least 6 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});
