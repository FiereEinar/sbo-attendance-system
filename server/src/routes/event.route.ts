import express from 'express';
import {
	archiveEventHandler,
	createEventHandler,
	deleteEventHandler,
	getEventAttendanceSummary,
	getEventsHandler,
	getSingleEvent,
	unarchiveEventHandler,
	updateEventHandler,
} from '../controllers/event.controller';
const router = express.Router();

router.get('/', getEventsHandler);
router.post('/', createEventHandler);
router.get('/:eventID/summary', getEventAttendanceSummary);
router.get('/:eventID', getSingleEvent);
router.put('/:eventID', updateEventHandler);
router.delete('/:eventID', deleteEventHandler);
router.patch('/:eventID/archive', archiveEventHandler);
router.patch('/:eventID/unarchive', unarchiveEventHandler);

export default router;
