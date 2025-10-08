import { clsx, type ClassValue } from 'clsx';
import { isFuture, isPast, isToday, isWithinInterval } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import type { Event } from '../types/event';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getEventStatus = (start: Date, end: Date): string => {
	let eventStatus = '🕒Upcoming';
	const now = new Date();

	if (isWithinInterval(now, { start, end })) {
		eventStatus = '🟢Ongoing';
	} else if (isToday(start) && isFuture(start)) {
		eventStatus = '🕒Today';
	} else if (isPast(end)) {
		eventStatus = '🔴Ended';
	}

	return eventStatus;
};

export type EventStats = {
	ongoing: number;
	today: number;
	ended: number;
	upcoming: number;
};

export const countEventsStats = (events: Event[]): EventStats => {
	const now = new Date();
	const stats: EventStats = {
		ongoing: 0,
		today: 0,
		ended: 0,
		upcoming: 0,
	};

	events.map((event) => {
		const start = new Date(event.startTime);
		const end = new Date(event.endTime);

		if (isWithinInterval(now, { start, end })) {
			stats.ongoing++;
		} else if (isToday(start) && isFuture(start)) {
			stats.today++;
		} else if (isPast(end)) {
			stats.ended++;
		} else {
			stats.upcoming++;
		}
	});

	return stats;
};
