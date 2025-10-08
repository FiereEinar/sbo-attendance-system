import type { StudentFilterValues } from '../store/studentsFilter';
import type { APIPaginatedResponse } from '../types/api-response';
import type { Student } from '../types/student';
import axiosInstance from './axiosInstance';

export const fetchStudents = async (
	filters: StudentFilterValues,
	page: number = 1,
	pageSize: number = 50
): Promise<APIPaginatedResponse<Student[]> | undefined> => {
	try {
		const defaultFilterValue = 'All';

		filters.course =
			filters.course === defaultFilterValue ? undefined : filters.course;
		filters.year =
			filters.year === defaultFilterValue ? undefined : filters.year;
		filters.gender =
			filters.gender === defaultFilterValue ? undefined : filters.gender;

		let url = `/student?page=${page}&pageSize=${pageSize}`;
		if (filters.search) url = url + `&search=${filters.search}`;
		if (filters.course) url = url + `&course=${filters.course}`;
		if (filters.year) url = url + `&year=${filters.year}`;
		if (filters.gender) url = url + `&gender=${filters.gender}`;
		if (filters.sortBy) url = url + `&sortBy=${filters.sortBy}`;

		const { data } = await axiosInstance.get<APIPaginatedResponse<Student[]>>(
			url
		);

		return data;
	} catch (err: any) {
		throw err;
	}
};

export const fetchAvailableCourses = async (): Promise<
	string[] | undefined
> => {
	try {
		const { data } = await axiosInstance.get(`/student/courses`);

		return data.data;
	} catch (err: any) {
		throw err;
	}
};
