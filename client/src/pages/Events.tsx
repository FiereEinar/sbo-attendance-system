import { Table } from '@mantine/core';
import Header from '../components/ui/header';
import CreateEventModal from '../modals/CreateEventModal';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { fetchEvents } from '../api/event';
import dayjs from 'dayjs';

export default function Events() {
	const { data } = useQuery({
		queryFn: fetchEvents,
		queryKey: [QUERY_KEYS.EVENTS],
	});

	return (
		<div className='flex flex-col gap-10'>
			<div className='w-full flex items-center justify-between'>
				<Header>Events</Header>
				<CreateEventModal />
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
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{data?.map((event) => (
								<Table.Tr key={event._id}>
									<Table.Td>{event.title}</Table.Td>
									<Table.Td>{event.description}</Table.Td>
									<Table.Td>
										{dayjs(event.startTime).format('YY-MM-DD HH:mm')}
									</Table.Td>
									<Table.Td>
										{dayjs(event.endTime).format('YY-MM-DD HH:mm')}
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</div>
		</div>
	);
}
