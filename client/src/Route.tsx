import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFount';
import { MantineProvider } from '@mantine/core';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import UploadStudents from './pages/UploadStudents';
import { useThemeStore } from './store/theme';
import ProtectedRoute from './components/ProtectedRoute';
import { NotificationProvider } from './hooks/useNotification';
import Events from './pages/Events';
import Students from './pages/Students';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function Route() {
	const theme = useThemeStore((state) => state.theme);

	const route = createBrowserRouter([
		{
			path: '/',
			element: (
				<ProtectedRoute>
					<App />
				</ProtectedRoute>
			),
			errorElement: <NotFound />,
			children: [
				{
					path: '/admin/dashboard',
					element: <Dashboard />,
				},
				{
					path: '/admin/events',
					element: <Events />,
				},
				{
					path: '/admin/attendance',
					element: <Attendance />,
				},
				{
					path: '/admin/students',
					element: <Students />,
				},
				{
					path: '/admin/reports',
					element: <Reports />,
				},
				{
					path: '/admin/settings',
					element: <Settings />,
				},
				{
					path: '/upload-students',
					element: <UploadStudents />,
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
			<NotificationProvider>
				<RouterProvider router={route} />
			</NotificationProvider>
		</MantineProvider>
	);
}
