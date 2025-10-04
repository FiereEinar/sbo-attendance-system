import { Button, Table } from '@mantine/core';
import Header from '../components/ui/header';
import CreateEventModal from '../modals/CreateEventModal';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { fetchEvents } from '../api/event';
import axiosInstance from '../api/axiosInstance';
import { useNotification } from '../hooks/useNotification';
import { queryClient } from '../main';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function Events() {
	const notification = useNotification();
	const navigate = useNavigate();
	const { data } = useQuery({
		queryFn: fetchEvents,
		queryKey: [QUERY_KEYS.EVENTS],
	});

	const onDelete = async (eventID: string) => {
		try {
			const { data } = await axiosInstance.delete(`/event/${eventID}`);

			notification({
				title: 'Event deleted',
				message: data.message ?? '',
			});
			await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
		} catch (error: any) {
			console.error('Failed to delete event', error);
			notification({
				title: 'Failed to delete event',
				message: error.message ?? '',
			});
		}
	};

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
								<Table.Th>Event Type</Table.Th>
								<Table.Th>Event Venue</Table.Th>
								<Table.Th>Start Time</Table.Th>
								<Table.Th>End Time</Table.Th>
								<Table.Th>Actions</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{data?.map((event) => (
								<Table.Tr className='' key={event._id}>
									<Table.Td
										onClick={() => navigate(`/admin/events/${event._id}`)}
										className='transition-all cursor-pointer hover:text-blue-500'
									>
										{event.title}
									</Table.Td>
									<Table.Td>{event.type}</Table.Td>
									<Table.Td>{event.venue}</Table.Td>
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
							))}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</div>
		</div>
	);
}
