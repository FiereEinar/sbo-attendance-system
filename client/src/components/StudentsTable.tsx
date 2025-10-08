import _ from 'lodash';
import { Table, Select, Loader, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { Student } from '../types/student';
import {
	useStudentFilterStore,
	type StudentFilterValues,
} from '../store/studentsFilter';
import { QUERY_KEYS } from '../constants';
import { fetchAvailableCourses, fetchStudents } from '../api/student';
import { queryClient } from '../main';

interface StudentsTableProps {
	students: Student[] | undefined;
	isLoading: boolean;
}

export default function StudentsTable({
	students,
	isLoading,
}: StudentsTableProps) {
	// const navigate = useNavigate();

	return (
		<Table highlightOnHover>
			<Table.Thead>
				<Table.Tr>
					<Table.Th style={{ width: 100 }}>Student ID</Table.Th>
					<Table.Th style={{ width: 250 }}>Full name</Table.Th>
					<Table.Th style={{ width: 150 }}>
						<TableHeadCoursePicker />
					</Table.Th>
					<Table.Th style={{ width: 100 }}>
						<TableHeadYearPicker />
					</Table.Th>
					<Table.Th style={{ width: 100 }}>
						<TableHeadGenderPicker />
					</Table.Th>
				</Table.Tr>
			</Table.Thead>

			<Table.Tbody>
				{isLoading && (
					<Table.Tr>
						<Table.Td colSpan={7}>
							<div style={{ textAlign: 'center', padding: '1rem' }}>
								<Loader size='sm' />
							</div>
						</Table.Td>
					</Table.Tr>
				)}

				{!students?.length && !isLoading && (
					<Table.Tr>
						<Table.Td colSpan={7}>
							<Text ta='center'>No students</Text>
						</Table.Td>
					</Table.Tr>
				)}

				{students?.map((student) => (
					<Table.Tr
						className='transition-all'
						key={student._id}
						// style={{ cursor: 'pointer' }}
						// onClick={() => navigate(`/student/${student.studentID}`)}
					>
						<Table.Td>{student.studentID}</Table.Td>
						<Table.Td>
							{_.startCase(
								`${student.firstname} ${student.middlename ?? ''} ${
									student.lastname
								}`.toLowerCase()
							)}
						</Table.Td>
						<Table.Td>{student.course}</Table.Td>
						<Table.Td>{student.year}</Table.Td>
						<Table.Td>{student.gender}</Table.Td>
					</Table.Tr>
				))}
			</Table.Tbody>

			{/* <Table.Tfoot>
				<Table.Tr>
					<Table.Td colSpan={6}>Total</Table.Td>
					<Table.Td style={{ textAlign: 'right' }}>{totalAmount}</Table.Td>
				</Table.Tr>
			</Table.Tfoot> */}
		</Table>
	);
}

function TableHeadCoursePicker() {
	const { course, page, pageSize, setCourse, getFilterValues } =
		useStudentFilterStore((state) => state);
	const { data: courses } = useQuery({
		queryKey: [QUERY_KEYS.STUDENT_COURSES],
		queryFn: fetchAvailableCourses,
	});

	const prefetch = (course: string) => {
		if (course !== 'All') {
			const filters = { ...getFilterValues(), course };
			const data = queryClient.getQueryData([QUERY_KEYS.STUDENTS, filters]);

			if (data) return;

			queryClient.prefetchQuery({
				queryKey: [QUERY_KEYS.STUDENTS, filters],
				queryFn: () => fetchStudents(filters, page, pageSize),
			});
		}
	};

	return (
		<Select
			placeholder='Course'
			value={course}
			onChange={(value) => value && setCourse(value)}
			data={courses ? ['All', ...courses] : ['All']}
			onDropdownOpen={() => courses?.forEach(prefetch)}
			// styles={{ input: { border: 'none' } }}
		/>
	);
}

function TableHeadYearPicker() {
	const { page, pageSize, year, setYear, getFilterValues } =
		useStudentFilterStore((state) => state);
	const yearsOptions = ['All', '1', '2', '3', '4'];

	const prefetch = (selectedYear: StudentFilterValues['year']) => {
		if (selectedYear !== 'All') {
			const filters = { ...getFilterValues(), year: selectedYear };
			const data = queryClient.getQueryData([QUERY_KEYS.STUDENTS, filters]);

			if (data) return;

			queryClient.prefetchQuery({
				queryKey: [QUERY_KEYS.STUDENTS, filters],
				queryFn: () => fetchStudents(filters, page, pageSize),
			});
		}
	};

	return (
		<Select
			placeholder='Year'
			value={year}
			onChange={(value) =>
				value && setYear(value as StudentFilterValues['year'])
			}
			data={yearsOptions}
			onDropdownOpen={() =>
				yearsOptions.forEach((year) =>
					prefetch(year as StudentFilterValues['year'])
				)
			}
			// styles={{ input: { border: 'none' } }}
		/>
	);
}

function TableHeadGenderPicker() {
	const { page, pageSize, gender, setGender, getFilterValues } =
		useStudentFilterStore((state) => state);
	const gendersOptions = ['All', 'M', 'F'];

	const prefetch = async (selectedGender: StudentFilterValues['gender']) => {
		if (selectedGender !== 'All') {
			const filters = { ...getFilterValues(), gender: selectedGender };
			const data = queryClient.getQueryData([QUERY_KEYS.STUDENTS, filters]);
			if (data) return;

			await queryClient.prefetchQuery({
				queryKey: [QUERY_KEYS.STUDENTS, filters],
				queryFn: () => fetchStudents(filters, page, pageSize),
			});
		}
	};

	return (
		<Select
			placeholder='Gender'
			value={gender}
			onChange={(value) =>
				value && setGender(value as StudentFilterValues['gender'])
			}
			data={gendersOptions}
			onDropdownOpen={() =>
				gendersOptions.forEach((gender) =>
					prefetch(gender as StudentFilterValues['gender'])
				)
			}
			// styles={{ input: { border: 'none' } }}
		/>
	);
}
