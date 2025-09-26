import { useParams } from 'react-router-dom';
import Header from '../components/ui/header';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { fetchSingleQuery } from '../api/event';

export default function SingleEvent() {
	const { eventID } = useParams();
	const { data: event } = useQuery({
		queryKey: [QUERY_KEYS.EVENTS, eventID],
		queryFn: () => fetchSingleQuery(eventID ?? ''),
	});

	return (
		<div className='flex flex-col gap-10'>
			<div className='w-full flex flex-col items-start justify-between'>
				<Header>{event?.title}</Header>
				<p>{event?.description}</p>
			</div>
		</div>
	);
}
