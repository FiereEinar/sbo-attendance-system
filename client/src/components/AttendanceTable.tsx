import { Table } from '@mantine/core';
import { format } from 'date-fns';
import type { Attendance } from '../types/attendance';

type AttendanceTableProps = {
	attendances: Attendance[];
};

export default function AttendanceTable({ attendances }: AttendanceTableProps) {
	return (
		<Table.ScrollContainer minWidth={500} maxHeight={300}>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Student ID</Table.Th>
						<Table.Th>Name</Table.Th>
						<Table.Th>Course</Table.Th>
						<Table.Th>Year</Table.Th>
						<Table.Th>Time In</Table.Th>
						<Table.Th>Time Out</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{attendances.map((attendance) => (
						<Table.Tr className='' key={attendance._id}>
							<Table.Td>{attendance.studentID}</Table.Td>
							<Table.Td>
								{attendance.student.firstname} {attendance.student.lastname}
							</Table.Td>
							<Table.Td>{attendance.student.course}</Table.Td>
							<Table.Td>{attendance.student.year}</Table.Td>
							{/* old date format 'MM-dd-yyyy hh:mm aaa' */}
							<Table.Td>
								{attendance.timeIn
									? format(new Date(attendance.timeIn), 'hh:mm aaa')
									: '--'}
							</Table.Td>
							<Table.Td>
								{attendance.timeOut
									? format(new Date(attendance.timeOut), 'hh:mm aaa')
									: '--'}
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
}
