import z from 'zod';

export const createAttendanceSchema = z.object({
	event: z.string().min(1, 'Event ID is required'),
	recordedBy: z.string().min(1, 'User ID is required'),
	student: z.string().min(1, 'Student mongo ID is required'),
	studentID: z.string().min(10, 'Student ID is 10 numbers minimum'),
	timeIn: z.string().optional(),
	timeOut: z.string().optional(),
});
