import Header from '../components/ui/header';
import CreateEventModal from '../modals/CreateEventModal';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { fetchEvents } from '../api/event';
import EventCard from '../components/EventCard';
import { useEffect, useState } from 'react';
import { countEventsStats, type EventStats } from '../lib/utils';

export default function Events() {
	const [eventsStats, setEventsStats] = useState<EventStats | null>(null);
	const { data: events } = useQuery({
		queryFn: fetchEvents,
		queryKey: [QUERY_KEYS.EVENTS],
	});

	useEffect(() => {
		if (events) {
			setEventsStats(countEventsStats(events));
		}
	}, [events]);

	return (
		<div className='flex flex-col gap-5'>
			<div className='w-full bg-[#242424] p-5 rounded-xl flex items-center justify-between'>
				<Header>Events</Header>
				<CreateEventModal />
			</div>
			<section className='flex gap-5'>
				<div className='space-y-2 w-full'>
					{events?.map((event) => (
						<div className='w-full bg-[#242424] p-5 rounded-xl' key={event._id}>
							<EventCard event={event} />
						</div>
					))}
				</div>
				<div className='bg-[#242424] p-5 rounded-xl w-[30%] space-y-2'>
					<Header size='md'>Events Summary</Header>
					<div>
						<p>Total Events: {events?.length ?? 0}</p>
						<p>Ongoing: {eventsStats?.ongoing ?? 0}</p>
						<p>Today: {eventsStats?.today ?? 0}</p>
						<p>Ended: {eventsStats?.ended ?? 0}</p>
						<p>Upcoming: {eventsStats?.upcoming ?? 0}</p>
					</div>
				</div>
			</section>
		</div>
	);
}
