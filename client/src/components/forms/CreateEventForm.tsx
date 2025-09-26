import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createEventSchema } from '../../lib/validations/eventSchema';
import type z from 'zod';
import InputField from '../InputField';
import { DateTimePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import '@mantine/dates/styles.css';
import { Button } from '@mantine/core';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNotification } from '../../hooks/useNotification';
import { queryClient } from '../../main';
import { QUERY_KEYS } from '../../constants';

type EventFormValues = z.infer<typeof createEventSchema>;

export default function CreateEventForm() {
	const notification = useNotification();
	const [startTime, setStartTime] = useState(new Date().toISOString());
	const [endTime, setEndTime] = useState('');

	const {
		handleSubmit,
		register,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(createEventSchema),
	});

	const onSubmit = async (formData: EventFormValues) => {
		try {
			const body = { ...formData, startTime, endTime };
			await axiosInstance.post('/event', body);

			notification({
				title: 'Event created successfully!',
				message: '',
			});
			await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
			reset();
			setEndTime('');
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
