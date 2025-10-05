import { useQuery } from '@tanstack/react-query';
import type { Event } from '../types/event';
import Header from './ui/header';
import { QUERY_KEYS } from '../constants';
import { getEventAttendanceSummary } from '../api/attendance';

type EventAttendanceSummaryProps = {
	event: Event;
};

export default function EventAttendanceSummary({
	event,
}: EventAttendanceSummaryProps) {
	const {
		data: eventAttendanceSummary,
		isLoading,
		error,
	} = useQuery({
		queryKey: [QUERY_KEYS.EVENT_ATTENDANCE_SUMMARY, event._id],
		queryFn: () => getEventAttendanceSummary(event._id),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error || !eventAttendanceSummary) {
		return <p>Error fetching event attendance summary</p>;
	}

	return (
		<>
			<Header size='md'>Event Summary</Header>
			<div>
				<p>Total Checked In: {eventAttendanceSummary.totalCheckedIn}</p>
				<p>Checked Out: {eventAttendanceSummary.totalCheckedOut}</p>
				<p>Attendance Rate: {eventAttendanceSummary.rate}%</p>
			</div>
		</>
	);
}
