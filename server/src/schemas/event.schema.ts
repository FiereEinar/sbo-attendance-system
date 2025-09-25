import z from 'zod';

export const createEventSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	startTime: z.string().min(1, 'Start time is required'),
	endTime: z.string().min(1, 'End time is required'),
});
