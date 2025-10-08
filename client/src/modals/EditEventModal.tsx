import { Button, Modal } from '@mantine/core';
import CreateEventForm from '../components/forms/CreateEventForm';
import { useDisclosure } from '@mantine/hooks';
import type { Event } from '../types/event';

type EditEventModalProps = {
	event: Event;
};

export default function EditEventModal({ event }: EditEventModalProps) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} title='Edit Event'>
				<CreateEventForm event={event} />
			</Modal>
			<Button onClick={open} variant='light' size='compact-xs'>
				edit
			</Button>
		</>
	);
}
