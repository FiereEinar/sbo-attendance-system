import Header from '../components/ui/header';
import CreateEventModal from '../modals/CreateEventModal';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { fetchEvents } from '../api/event';
import EventCard from '../components/EventCard';

export default function Events() {
	const { data: events } = useQuery({
		queryFn: fetchEvents,
		queryKey: [QUERY_KEYS.EVENTS],
	});

	return (
		<div className='flex flex-col gap-5'>
			<div className='w-full bg-[#242424] p-5 rounded-xl flex items-center justify-between'>
				<Header>Events</Header>
				<CreateEventModal />
			</div>
			<section className='flex gap-5'>
				<div className='space-y-2 w-full'>
					{events?.map((event) => (
						<div className='w-full bg-[#242424] p-5 rounded-xl'>
							<EventCard key={event._id} event={event} />
						</div>
					))}
				</div>
				<div className='bg-[#242424] p-5 rounded-xl w-[30%]'>
					<Header size='md'>Events Summary</Header>
				</div>
			</section>
		</div>
	);
}
