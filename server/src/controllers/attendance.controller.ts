import asyncHandler from 'express-async-handler';
import AttendanceModel from '../models/mongodb/attendance.model';
import CustomResponse from '../models/utils/response';
import StudentModel from '../models/mongodb/student.model';
import appAssert from '../errors/app-assert';
import { BAD_REQUEST, NOT_FOUND } from '../constants/http';
import EventModel from '../models/mongodb/event.model';

/**
 * @route GET /api/v1/attendance - get recently recorded attendances
 */
export const getAttendanceHandler = asyncHandler(async (req, res) => {
	const { limit } = req.query;

	const attendances = await AttendanceModel.find().limit(
		parseInt(limit?.toString() ?? '10')
	);

	res.json(
		new CustomResponse(true, attendances, 'Attendances fetched successfully')
	);
});

/**
 * @route GET /api/v1/attendance/event/:eventID - Get recently recorded attendances of an event
 */
export const getEventAttendanceHandler = asyncHandler(async (req, res) => {
	const { eventID } = req.params;
	const { limit } = req.query;

	const attendances = await AttendanceModel.find({ event: eventID })
		.limit(parseInt(limit?.toString() ?? '10'))
		.populate('student')
		.populate('event');

	res.json(
		new CustomResponse(true, attendances, 'Attendances fetched successfully')
	);
});

/**
 * @route GET /api/v1/attendance/:attendanceID - Get single attendance of an event
 */
export const getSingleAttendanceHandler = asyncHandler(async (req, res) => {
	const { attendanceID } = req.params;

	const attendance = await AttendanceModel.findById(attendanceID);

	res.json(
		new CustomResponse(true, attendance, 'Attendance fetched successfully')
	);
});

/**
 * @route POST /api/v1/attendance/record/time-in/event/:eventID - Record attendance (time in)
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

	// Check if student has already checked in
	const existingAttendance = await AttendanceModel.findOne({
		event: eventID,
		studentID,
	});
	appAssert(
		!existingAttendance?.timeIn,
		BAD_REQUEST,
		'Student has already checked in'
	);

	const attendance = await AttendanceModel.create({
		event: eventID,
		studentID,
		recordedBy: req.user._id,
		student: student._id,
		timeIn: new Date(),
		timeOut: null,
	});

	res.json(
		new CustomResponse(true, attendance, 'Attendance recorded successfully')
	);
});

/**
 * @route POST /api/v1/attendance/record/time-out/event/:eventID - Record attendance (time out)
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
		event: eventID,
		studentID,
	});

	// If the student has not checked in, create a new record, but only time out
	if (!attendance) {
		const newAttendance = await AttendanceModel.create({
			event: eventID,
			studentID,
			recordedBy: req.user._id,
			student: student._id,
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
