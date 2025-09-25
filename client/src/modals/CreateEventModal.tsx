import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from 'lucide-react';
import CreateEventForm from '../components/forms/CreateEventForm';

export default function CreateEventModal() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<div>
			<Modal opened={opened} onClose={close} title='Create Event'>
				<CreateEventForm />
			</Modal>

			<Button onClick={open} leftSection={<Plus />}>
				Add Event
			</Button>
		</div>
	);
}
