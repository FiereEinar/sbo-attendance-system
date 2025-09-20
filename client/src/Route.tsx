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
					path: '/admin/attendance',
					element: <Attendance />,
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
			<RouterProvider router={route} />
			{/* <Button onClick={onThemeClick}>Click Me!</Button> */}
		</MantineProvider>
	);
}
