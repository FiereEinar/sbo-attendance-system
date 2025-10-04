import { Button, Table } from '@mantine/core';
import Header from '../components/ui/header';
import { Link } from 'react-router-dom';

export default function Attendance() {
	return (
		<div className='flex flex-col gap-10'>
			<div className='w-full flex items-center justify-between'>
				<div>
					<Header>Attendance</Header>
					<p>Recently recorded attendance</p>
				</div>
				<div>
					<Link to='/admin/attendance/record'>
						<Button>Record Attendance</Button>
					</Link>
				</div>
			</div>
			<div>
				<Table.ScrollContainer minWidth={500} maxHeight={300}>
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Event Title</Table.Th>
								<Table.Th>Event Description</Table.Th>
								<Table.Th>Start Time</Table.Th>
								<Table.Th>End Time</Table.Th>
								<Table.Th>Actions</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{/* {data?.map((event) => (
										<Table.Tr className='' key={event._id}>
											<Table.Td
												onClick={() => navigate(`/admin/events/${event._id}`)}
												className='transition-all cursor-pointer hover:text-blue-500'
											>
												{event.title}
											</Table.Td>
											<Table.Td>{event.description}</Table.Td>
											<Table.Td>
												{format(
													new Date(event.startTime),
													'MMM dd, yyyy hh:mm aaa'
												)}
											</Table.Td>
											<Table.Td>
												{format(new Date(event.endTime), 'MMM dd, yyyy hh:mm aaa')}
											</Table.Td>
											<Table.Td className='flex gap-2 items-center justify-center'>
												<Button
													variant='subtle'
													onClick={() => console.log('Hello')}
													size='compact-xs'
												>
													Edit
												</Button>
												<Button
													variant='subtle'
													color='red'
													onClick={() => onDelete(event._id)}
													size='compact-xs'
												>
													Delete
												</Button>
											</Table.Td>
										</Table.Tr>
									))} */}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</div>
		</div>
	);
}
