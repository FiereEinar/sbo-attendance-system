import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFount';
import { MantineProvider } from '@mantine/core';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';

export default function Route() {
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');

	const onThemeClick = () => {
		console.log('Clicked! theme is ', theme);
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	const route = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			errorElement: <NotFound />,
			children: [
				{
					index: true,
					element: <Dashboard />,
				},
				{
					path: '/attendance',
					element: <Attendance />,
				},
			],
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/signup',
			element: <Signup />,
		},
	]);

	return (
		<MantineProvider forceColorScheme={theme}>
			<RouterProvider router={route} />
			{/* <Button onClick={onThemeClick}>Click Me!</Button> */}
		</MantineProvider>
	);
}
