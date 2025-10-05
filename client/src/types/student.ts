export type Student = {
	_id: string;
	studentID: string;
	firstname: string;
	lastname: string;
	middlename?: string;
	gender: string;
	course: string;
	year: number;
	email?: string;
	createdAt: Date;
	updatedAt: Date;
};
