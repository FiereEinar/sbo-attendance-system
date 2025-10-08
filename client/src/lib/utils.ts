import { clsx, type ClassValue } from 'clsx';
import { isFuture, isPast, isToday, isWithinInterval } from 'date-fns';
import { twMerge } from 'tailwind-merge';

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
