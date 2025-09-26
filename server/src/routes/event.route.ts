import express from 'express';
import {
	createEventHandler,
	deleteEventHandler,
	getEventsHandler,
	getSingleEvent,
	updateEventHandler,
} from '../controllers/event.controller';
const router = express.Router();

router.get('/', getEventsHandler);
router.post('/', createEventHandler);
router.get('/:eventID', getSingleEvent);
router.put('/:eventID', updateEventHandler);
router.delete('/:eventID', deleteEventHandler);

export default router;
