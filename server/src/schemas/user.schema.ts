import z from 'zod';

const MIN_PASSWORD_LEN = 6;

export const createUserSchema = z.object({
	id: z.string().min(1, 'ID is required'),
	firstname: z.string().min(1, 'Firstname is required'),
	lastname: z.string().min(1, 'Lastname is required'),
	email: z.string('Invalid email'),
	password: z
		.string()
		.min(
			MIN_PASSWORD_LEN,
			`Password must be atleast ${MIN_PASSWORD_LEN} characters`
		),
});

export const updateUserSchema = z.object({
	firstname: z.string().min(1, 'Firstname is required'),
	lastname: z.string().min(1, 'Lastname is required'),
	email: z.string('Invalid email'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
