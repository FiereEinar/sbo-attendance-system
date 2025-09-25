import type { Event } from '../types/events';
import axiosInstance from './axiosInstance';

export const fetchEvents = async (): Promise<Event[]> => {
	try {
		const { data } = await axiosInstance.get('/event');

		return data.data;
	} catch (error) {
		console.error('Failed to fetch events', error);
		throw error;
	}
};
