import type { Attendance } from '../types/attendance';
import axiosInstance from './axiosInstance';

export const fetchRecentlyRecordedAttendances = async (
	eventID: string,
	limit?: number
): Promise<Attendance[]> => {
	try {
		const { data } = await axiosInstance.get(
			`/attendance/event/${eventID}?limit=${limit}`
		);

		return data.data;
	} catch (error) {
		console.error(
			'Failed to fetch recently recorded attendances for an event',
			error
		);
		throw error;
	}
};

export const getEventAttendanceSummary = async (
	eventID: string
): Promise<{
	totalCheckedIn: number;
	totalCheckedOut: number;
	rate: number;
}> => {
	try {
		const { data } = await axiosInstance.get(`/event/${eventID}/summary`);

		return data.data;
	} catch (error) {
		console.error('Failed to fetch event summary', error);
		throw error;
	}
};
