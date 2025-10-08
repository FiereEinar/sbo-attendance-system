import { useQuery } from '@tanstack/react-query';
import ImportStudentsButton from '../components/buttons/ImportStudentsButton';
import StudentsTable from '../components/StudentsTable';
import Header from '../components/ui/header';
import { QUERY_KEYS } from '../constants';
import { useStudentFilterStore } from '../store/studentsFilter';
import { fetchStudents } from '../api/student';
import { Pagination } from '@mantine/core';

export default function Students() {
	const { getFilterValues, page, pageSize, setPage } = useStudentFilterStore(
		(state) => state
	);
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.STUDENTS, getFilterValues()],
		queryFn: () => fetchStudents(getFilterValues(), page, pageSize),
	});

	if (error) return <div>Error fetching students</div>;

	return (
		<div className='flex flex-col gap-5'>
			<div className='w-full bg-[#242424] p-5 rounded-xl flex items-center justify-between'>
				<Header>Students</Header>
			</div>
			<div className='w-[400px]'>
				<ImportStudentsButton />
			</div>
			<StudentsTable isLoading={isLoading} students={data?.data} />
			<Pagination
				className='self-center'
				total={data?.next ?? 0}
				value={page}
				onChange={setPage}
			/>
		</div>
	);
}
