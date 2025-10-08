import asyncHandler from 'express-async-handler';
import appAssert from '../errors/app-assert';
import { BAD_REQUEST } from '../constants/http';
import CustomResponse, {
	CustomPaginatedResponse,
} from '../models/utils/response';
import { serverlessCSVLoader } from '../utils/csv';
import { FilterQuery, PipelineStage } from 'mongoose';
import StudentModel, { IStudent } from '../models/mongodb/student.model';

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

/**
 * @route GET /api/v1/students - paginated response of all students
 */
export const getStudentsHandler = asyncHandler(async (req, res) => {
	const { page, pageSize, search, course, year, gender, sortBy } = req.query;

	const defaultPage = 1;
	const defaultPageSize = 100;

	const pageNum = page ? parseInt(page as string) : defaultPage;
	const pageSizeNum = pageSize ? parseInt(pageSize as string) : defaultPageSize;
	const skipAmount = (pageNum - 1 || 0) * pageSizeNum;

	const filters: FilterQuery<IStudent>[] = [];

	if (course) filters.push({ course: course });
	if (year) filters.push({ year: parseInt(year as string) });
	if (gender) filters.push({ gender: gender });
	if (search) {
		const searchRegex = new RegExp(search as string, 'i');
		filters.push({
			$or: [
				{ studentID: { $regex: searchRegex } },
				{ firstname: { $regex: searchRegex } },
				{ lastname: { $regex: searchRegex } },
				{ middlename: { $regex: searchRegex } },
			],
		});
	}

	const aggregatePipeline: PipelineStage[] = [
		{
			$lookup: {
				from: 'transactions',
				localField: '_id',
				foreignField: 'owner',
				as: 'transactions',
			},
		},
		{
			$addFields: {
				totalTransactions: { $size: '$transactions' },
				totalTransactionsAmount: { $sum: '$transactions.amount' },
			},
		},
		{
			$project: {
				transactions: 0,
			},
		},
		{
			$sort: {
				firstname: sortBy === 'dec' ? -1 : 1,
			},
		},
		{
			$skip: skipAmount,
		},
		{
			$limit: pageSizeNum,
		},
	];

	if (filters.length > 0) {
		aggregatePipeline.unshift({
			$match: {
				$and: filters,
			},
		});
	}

	const students = await StudentModel.aggregate(aggregatePipeline);

	const next =
		(await StudentModel.countDocuments({ $and: filters })) >
		skipAmount + pageSizeNum
			? pageNum + 1
			: -1;
	const prev = pageNum > 1 ? pageNum - 1 : -1;

	res.json(
		new CustomPaginatedResponse(true, students, 'All students', next, prev)
	);
});

/**
 * @route GET /api/v1/students/courses - list of all available courses
 */
export const getAvailableCourses = asyncHandler(async (req, res) => {
	const courses = await StudentModel.find().distinct('course');

	res.json(new CustomResponse(true, courses, 'Students courses'));
});
