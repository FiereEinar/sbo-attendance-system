import asyncHandler from 'express-async-handler';
import AttendanceModel from '../models/mongodb/attendance.model';
import CustomResponse from '../models/utils/response';
import StudentModel from '../models/mongodb/student.model';
import appAssert from '../errors/app-assert';
import { NOT_FOUND } from '../constants/http';
import EventModel from '../models/mongodb/event.model';

/**
 * @route GET /api/v1/attendance - get recently recorded attendances
 */
export const getAttendanceHandler = asyncHandler(async (req, res) => {
	const { limit } = req.body;

	const attendances = await AttendanceModel.find().limit(limit ?? 10);

	res.json(
		new CustomResponse(true, attendances, 'Attendances fetched successfully')
	);
});

/**
 * @route GET /api/v1/event/:eventID/attendance - Get recently recorded attendances of an event
 */
export const getEventAttendanceHandler = asyncHandler(async (req, res) => {
	const { eventID } = req.params;

	const attendances = await AttendanceModel.find({ eventID });

	res.json(
		new CustomResponse(true, attendances, 'Attendances fetched successfully')
	);
});

/**
 * @route GET /api/v1/event/:eventID/attendance/:attendanceID - Get single attendance of an event
 */
export const getSingleAttendanceHandler = asyncHandler(async (req, res) => {
	const { attendanceID } = req.params;

	const attendance = await AttendanceModel.findById(attendanceID);

	res.json(
		new CustomResponse(true, attendance, 'Attendance fetched successfully')
	);
});

/**
 * @route POST /api/v1/event/:eventID/attendance - Record attendance (time in)
 */
export const recordTimeInAttendanceHandler = asyncHandler(async (req, res) => {
	const { eventID } = req.params;
	const { studentID } = req.body;

	// Check if student exists
	const student = await StudentModel.findOne({ studentID });
	appAssert(student, NOT_FOUND, 'Student not found');

	// Check if event exists
	const event = await EventModel.findById(eventID);
	appAssert(event, NOT_FOUND, 'Event not found');

	const attendance = await AttendanceModel.create({
		eventID,
		studentID,
		userID: req.user._id,
		timeIn: new Date(),
		timeOut: null,
	});

	res.json(
		new CustomResponse(true, attendance, 'Attendance recorded successfully')
	);
});

/**
 * @route POST /api/v1/event/:eventID/attendance - Record attendance (time out)
 */
export const recordTimeOutAttendanceHandler = asyncHandler(async (req, res) => {
	const { eventID } = req.params;
	const { studentID } = req.body;

	// Check if student exists
	const student = await StudentModel.findOne({ studentID });
	appAssert(student, NOT_FOUND, 'Student not found');

	// Check if event exists
	const event = await EventModel.findById(eventID);
	appAssert(event, NOT_FOUND, 'Event not found');

	const attendance = await AttendanceModel.findOne({
		eventID,
		studentID,
	});

	// If the student has not checked in, create a new record, but only time out
	if (!attendance) {
		const newAttendance = await AttendanceModel.create({
			eventID,
			studentID,
			userID: req.user._id,
			timeIn: null,
			timeOut: new Date(),
		});

		res.json(
			new CustomResponse(
				true,
				newAttendance,
				'Attendance recorded successfully'
			)
		);
		return;
	}

	// If the student has checked in, update the record
	attendance.timeOut = new Date();
	await attendance.save();

	res.json(
		new CustomResponse(true, attendance, 'Attendance recorded successfully')
	);
});
