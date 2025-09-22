// NotificationProvider.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import { Notification } from '@mantine/core';

type NotificationData = {
	title: string;
	message: string;
	duration?: number; // default 5000 ms
};

type NotificationContextType = {
	showNotification: (data: NotificationData) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const [notification, setNotification] = useState<NotificationData | null>(
		null
	);

	const showNotification = (data: NotificationData) => {
		setNotification(data);
		const timeout = data.duration ?? 5000;
		setTimeout(() => setNotification(null), timeout);
	};

	const handleClose = () => setNotification(null);

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}
			{notification && (
				<div className='absolute bottom-3 left-3 z-50'>
					<Notification
						title={notification.title}
						onClose={handleClose}
						withCloseButton
					>
						{notification.message}
					</Notification>
				</div>
			)}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const ctx = useContext(NotificationContext);
	if (!ctx)
		throw new Error('useNotification must be used within NotificationProvider');
	return ctx.showNotification;
};
