import express from 'express';
import { importStudentController } from '../controllers/student.controller';
import upload from '../utils/multer';

const router = express.Router();

router.post(
	'/file/import',
	upload.single('students_file_csv'),
	importStudentController
);

export default router;
