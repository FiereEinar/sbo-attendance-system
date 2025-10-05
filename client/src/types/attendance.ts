import type { Event } from './event';
import type { Student } from './student';
import type { User } from './user';

export type Attendance = {
	_id: string;
	event: Event;
	recordedBy: User;
	student: Student;
	studentID: string;
	timeIn: Date;
	timeOut: Date;
};
