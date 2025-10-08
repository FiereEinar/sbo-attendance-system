import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/ui/header';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { fetchSingleEvent } from '../api/event';
import { Check, ChevronLeft, X } from 'lucide-react';
import type { Event } from '../types/event';
import { format, isSameDay } from 'date-fns';
import { Button, Input, Select } from '@mantine/core';
import LiveClock from '../components/LiveClock';
import { useRef, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNotification } from '../hooks/useNotification';
import { fetchRecentlyRecordedAttendances } from '../api/attendance';
import { queryClient } from '../main';
import AttendanceTable from '../components/AttendanceTable';
import EventAttendanceSummary from '../components/EventAttendanceSummary';
import { getEventStatus } from '../lib/utils';

type TimeType = 'Time In' | 'Time Out';

export default function SingleEvent() {
	const studentIDInputRef = useRef<HTMLInputElement>(null);
	const notification = useNotification();
	const { eventID } = useParams();
	const [timeType, setTimeType] = useState<TimeType>('Time In');
	// const [isSubmittingAtt, setIsSubmittingAtt] = useState(false);

	const {
		data: event,
		isLoading,
		error,
	} = useQuery({
		queryKey: [QUERY_KEYS.EVENTS, eventID],
		queryFn: () => fetchSingleEvent(eventID ?? ''),
	});

	const {
		data: attendances,
		isLoading: isLoadingAttendances,
		error: errorAttendances,
	} = useQuery({
		queryKey: [QUERY_KEYS.ATTENDANCES, eventID],
		queryFn: () => fetchRecentlyRecordedAttendances(eventID ?? ''),
	});

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const studentID = e.target.value;
		// Check if student ID is valid
		if (studentID.toString().length != 10) return;

		try {
			// setIsSubmittingAtt(true);
			if (timeType === 'Time In') {
				await axiosInstance.post(
					`/attendance/record/time-in/event/${eventID}`,
					{ studentID }
				);
			}

			if (timeType === 'Time Out') {
				await axiosInstance.post(
					`/attendance/record/time-out/event/${eventID}`,
					{ studentID }
				);
			}

			notification({
				title: 'Attendance Recorded Successfully',
				icon: <Check />,
				color: 'teal',
			});
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.ATTENDANCES, eventID],
			});
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.EVENT_ATTENDANCE_SUMMARY, eventID],
			});
		} catch (error: any) {
			console.error('Failed to record attendance', error.message);
			notification({
				title: error.message,
				message: 'Failed to record attendance',
				icon: <X />,
				color: 'red',
			});
		} finally {
			// setIsSubmittingAtt(false);
			if (studentIDInputRef.current) {
				studentIDInputRef.current.value = '';
				studentIDInputRef.current.focus();
			}
		}
	};

	if (isLoading || isLoadingAttendances) return <div>Loading...</div>;

	if (error || !event || errorAttendances || !attendances)
		return <div>Error fetching event</div>;

	return (
		<div className='flex gap-5'>
			{/* left section */}
			<div className='flex flex-col gap-5 w-[70%]'>
				<TopSection event={event} />

				{/* middle section */}
				<div className='bg-[#242424] p-5 rounded-xl'>
					<p>Scan attendance here</p>
					<div className='flex gap-2'>
						<Input
							ref={studentIDInputRef}
							// disabled={isSubmittingAtt}
							onChange={onChange}
							autoFocus
							className='w-full'
							type='number'
						/>
						<Select
							placeholder='Select a value'
							data={['Time In', 'Time Out']}
							onChange={(value) => setTimeType(value as TimeType)}
							defaultValue={timeType}
						/>
					</div>
				</div>

				{/* bottom section */}
				<div className='bg-[#242424] p-5 rounded-xl min-h-80'>
					<p>Recently recorded attendance</p>
					<AttendanceTable attendances={attendances} />
				</div>
			</div>

			{/* Right section */}
			<aside className='bg-[#242424] p-5 w-[30%] rounded-xl space-y-5'>
				<EventAttendanceSummary event={event} />

				<div>
					<Link
						className='mt-5'
						to={`${import.meta.env.VITE_API_URL}/attendance/event/${
							event._id
						}/download/csv`}
						target='_blank'
					>
						<Button variant='light'>Export Attendance</Button>
					</Link>
				</div>

				<Header size='sm'>
					<LiveClock />
				</Header>
			</aside>
		</div>
	);
}

type TopSectionProps = {
	event: Event;
};

function TopSection({ event }: TopSectionProps) {
	const navigate = useNavigate();
	const eventStatus = getEventStatus(
		new Date(event.startTime),
		new Date(event.endTime)
	);

	return (
		<div className='bg-[#242424] p-5 rounded-xl flex items-center justify-between'>
			<div className='flex w-full flex-col items-start justify-between gap-2'>
				<div className='w-full flex justify-between items-center'>
					<div className='flex items-center gap-2'>
						<button onClick={() => navigate(-1)}>
							<ChevronLeft />
						</button>
						<div>
							<Header>{event.title}</Header>
							<p className='text-xs'>
								{event.type} @ {event.venue}
							</p>
						</div>
					</div>
					<div className='flex flex-col items-end'>
						<p>{eventStatus}</p>
						{isSameDay(new Date(event.startTime), new Date(event.endTime)) ? (
							<p className='text-xs'>
								{format(new Date(event.startTime), 'MMM dd, yyyy hh:mm aaa')} -{' '}
								{format(new Date(event.endTime), 'hh:mm aaa')}
							</p>
						) : (
							<p className='text-xs'>
								{format(new Date(event.startTime), 'MMM dd, yyyy hh:mm aaa')} -{' '}
								{format(new Date(event.endTime), 'MMM dd, yyyy hh:mm aaa')}
							</p>
						)}
					</div>
				</div>
				<p>{event.description}</p>
			</div>
		</div>
	);
}
