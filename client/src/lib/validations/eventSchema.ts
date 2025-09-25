import z from 'zod';

export const createEventSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	startTime: z.string().optional(),
	endTime: z.string().optional(),
});
