import express from 'express';
import {
	getAvailableCourses,
	getStudentsHandler,
	importStudentHandler,
} from '../controllers/student.controller';
import upload from '../utils/multer';

const router = express.Router();

router.get('/', getStudentsHandler);
router.get('/courses', getAvailableCourses);
router.post(
	'/file/import',
	upload.single('students_file_csv'),
	importStudentHandler
);

export default router;
