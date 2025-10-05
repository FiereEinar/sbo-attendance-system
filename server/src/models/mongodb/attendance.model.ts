import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type IAttendance = {
	event: mongoose.Types.ObjectId;
	recordedBy: mongoose.Types.ObjectId;
	student: mongoose.Types.ObjectId;
	studentID: string;
	timeIn: Date;
	timeOut: Date;
};

const AttendanceSchema = new Schema<IAttendance>({
	event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
	recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	student: {
		type: Schema.Types.ObjectId,
		ref: 'Student',
		required: true,
	},
	studentID: { type: String, required: true },
	timeIn: { type: Date },
	timeOut: { type: Date },
});

const AttendanceModel = mongoose.model<IAttendance>(
	'Attendance',
	AttendanceSchema
);

export default AttendanceModel;
