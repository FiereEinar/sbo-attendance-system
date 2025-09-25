import asyncHandler from 'express-async-handler';
import appAssert from '../errors/app-assert';
import { BAD_REQUEST } from '../constants/http';
import CustomResponse from '../models/utils/response';
import { serverlessCSVLoader } from '../utils/csv';

/**
 * @route POST /api/v1/students/file/import
 */
export const importStudentHandler = asyncHandler(async (req, res) => {
	const file = req.file;
	appAssert(file, BAD_REQUEST, 'Server did not recieve any file');

	appAssert(
		file.mimetype === 'text/csv',
		BAD_REQUEST,
		'File should be in csv format'
	);

	const valid = await serverlessCSVLoader(req, file.buffer);

	appAssert(
		valid,
		BAD_REQUEST,
		'File was not read succesfully, make sure to check if the headers are proper and the file format is correct'
	);

	await serverlessCSVLoader(req, file.buffer, true);

	res.json(new CustomResponse(true, null, 'File imported successfully'));
});
