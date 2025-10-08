import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createEventSchema } from '../../lib/validations/eventSchema';
import type z from 'zod';
import InputField from '../InputField';
import { DateTimePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNotification } from '../../hooks/useNotification';
import { queryClient } from '../../main';
import { QUERY_KEYS } from '../../constants';
import type { Event } from '../../types/event';

type EventFormValues = z.infer<typeof createEventSchema>;

type CreateEventFormProps = {
	event?: Event;
};

export default function CreateEventForm({ event }: CreateEventFormProps) {
	const notification = useNotification();
	const [startTime, setStartTime] = useState(new Date().toISOString());
	const [endTime, setEndTime] = useState('');

	const {
		handleSubmit,
		register,
		setError,
		setValue,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(createEventSchema),
	});

	useEffect(() => {
		if (event) {
			setValue('title', event.title);
			setValue('description', event.description);
			setValue('type', event.type);
			setValue('venue', event.venue);
			setStartTime(new Date(event.startTime).toISOString());
			setEndTime(new Date(event.endTime).toISOString());
		}
	}, [event]);

	const onSubmit = async (formData: EventFormValues) => {
		try {
			const body = {
				...formData,
				startTime: new Date(startTime),
				endTime: new Date(endTime),
			};

			const { data } = event
				? await axiosInstance.put(`/event/${event._id}`, body)
				: await axiosInstance.post('/event', body);

			notification({
				title: data.message,
				message: '',
			});

			await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
			!event && reset();
			!event && setEndTime('');
		} catch (error: any) {
			console.error('Failed to create event', error);
			setError('root', error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<InputField<EventFormValues>
				name='title'
				id='title'
				label='Event Title:'
				registerFn={register}
				errors={errors}
			/>
			<InputField<EventFormValues>
				name='description'
				id='description'
				label='Event Description:'
				registerFn={register}
				errors={errors}
			/>
			<InputField<EventFormValues>
				name='type'
				id='type'
				label='Event Type:'
				registerFn={register}
				errors={errors}
			/>
			<InputField<EventFormValues>
				name='venue'
				id='venue'
				label='Event Venue:'
				registerFn={register}
				errors={errors}
			/>
			<DateTimePicker
				clearable
				value={startTime}
				onChange={(value) => setStartTime(new Date(value ?? '').toISOString())}
				label='Start time:'
				placeholder='Pick date and time'
				timePickerProps={
					{
						// withDropdown: true,
					}
				}
			/>
			<DateTimePicker
				clearable
				value={endTime}
				onChange={(value) => setEndTime(new Date(value ?? '').toISOString())}
				label='End time'
				placeholder='Pick date and time'
				timePickerProps={
					{
						// withDropdown: true,
					}
				}
			/>
			<div className='flex justify-end gap-2 mt-3'>
				<Button disabled={isSubmitting} type='submit'>
					Submit
				</Button>
			</div>
		</form>
	);
}
