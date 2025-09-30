import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type IAttendance = {
	eventID: mongoose.Types.ObjectId;
	userID: mongoose.Types.ObjectId;
	studentID: string;
	timeIn: Date;
	timeOut: Date;
};

const AttendanceSchema = new Schema<IAttendance>({
	eventID: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
	userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	studentID: { type: String, required: true },
	timeIn: { type: Date },
	timeOut: { type: Date },
});

const AttendanceModel = mongoose.model<IAttendance>(
	'Attendance',
	AttendanceSchema
);

export default AttendanceModel;
