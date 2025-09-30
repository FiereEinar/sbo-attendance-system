import z from 'zod';

export const createAttendanceSchema = z.object({
	eventID: z.string().min(1, 'Event ID is required'),
	userID: z.string().min(1, 'User ID is required'),
	studentID: z.string().min(10, 'Student ID is 10 numbers minimum'),
	timeIn: z.string().optional(),
	timeOut: z.string().optional(),
});
