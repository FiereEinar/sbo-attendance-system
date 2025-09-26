import asyncHandler from 'express-async-handler';
import { createEventSchema } from '../schemas/event.schema';
import EventModel from '../models/mongodb/event.model';
import CustomResponse from '../models/utils/response';
import appAssert from '../errors/app-assert';
import { BAD_REQUEST, NO_CONTENT, NOT_FOUND } from '../constants/http';

/**
 * @route GET /api/v1/event
 */
export const getEventsHandler = asyncHandler(async (req, res) => {
	const events = await EventModel.find();
	res.json(new CustomResponse(true, events, 'Events fetched successfully'));
});

/**
 * @route GET /api/v1/event/:eventID
 */
export const getSingleEvent = asyncHandler(async (req, res) => {
	const { eventID } = req.params;
	const event = await EventModel.findById(eventID);
	appAssert(event, NOT_FOUND, 'Event not found');

	res.json(new CustomResponse(true, event, 'Event found'));
});

/**
 * @route POST /api/v1/event
 */
export const createEventHandler = asyncHandler(async (req, res) => {
	const body = createEventSchema.parse(req.body);

	const event = await EventModel.create({ ...body, createdBy: req.user._id });
	res.json(new CustomResponse(true, event, 'Event created successfully'));
});

/**
 * @route PUT /api/v1/event/:eventID
 */
export const updateEventHandler = asyncHandler(async (req, res) => {
	const body = createEventSchema.parse(req.body);
	const eventID = req.params.eventID;

	const event = await EventModel.findByIdAndUpdate(eventID, body, {
		new: true,
	});

	appAssert(event, BAD_REQUEST, 'Event not found');

	res.json(new CustomResponse(true, event, 'Event updated successfully'));
});

/**
 * @route DELETE /api/v1/event/:eventID
 */
export const deleteEventHandler = asyncHandler(async (req, res) => {
	const eventID = req.params.eventID;
	const event = await EventModel.findByIdAndDelete(eventID);

	appAssert(event, NO_CONTENT, 'Event not found');

	res.json(new CustomResponse(true, event, 'Event deleted successfully'));
});
