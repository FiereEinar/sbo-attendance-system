import { format, isSameDay } from 'date-fns';
import type { Event } from '../types/event';
import { Link } from 'react-router-dom';
import { getEventStatus } from '../lib/utils';
import Header from './ui/header';
import { queryClient } from '../main';
import axiosInstance from '../api/axiosInstance';
import { useNotification } from '../hooks/useNotification';
import { QUERY_KEYS } from '../constants';
import { Button } from '@mantine/core';
import EditEventModal from '../modals/EditEventModal';

type EventCardProps = {
	event: Event;
};

export default function EventCard({ event }: EventCardProps) {
	const notification = useNotification();
	const eventStatus = getEventStatus(
		new Date(event.startTime),
		new Date(event.endTime)
	);

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
		<article className='flex flex-col gap-2'>
			<div className='flex justify-between items-start'>
				<div>
					<Link to={`/admin/events/${event._id}`}>
						<Header size='sm'>{event.title}</Header>
					</Link>
					<p className='text-sm'>
						{event.type} at the {event.venue}
					</p>
				</div>
				<div className='text-end'>
					<p>{eventStatus}</p>
					<p className='text-sm'>
						{format(new Date(event.startTime), 'MMM dd, yyyy')}
						{!isSameDay(new Date(event.startTime), new Date(event.endTime)) && (
							<span> - {format(new Date(event.endTime), 'MMM dd, yyyy')}</span>
						)}
					</p>
					<p className='text-sm'>
						{format(new Date(event.startTime), 'hh:mm aaa')} -{' '}
						{format(new Date(event.endTime), 'hh:mm aaa')}
					</p>
				</div>
			</div>
			<div className='flex justify-between z-[100]'>
				<p>{event.description}</p>
				<div className='space-x-2'>
					<EditEventModal event={event} />
					<Button
						size='compact-xs'
						color='red'
						variant='light'
						onClick={() => onDelete(event._id)}
					>
						Delete
					</Button>
				</div>
			</div>
		</article>
	);
}
