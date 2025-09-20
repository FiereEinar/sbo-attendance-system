import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { LogOut, LogOutIcon } from 'lucide-react';

export default function LogoutButton() {
	const navigate = useNavigate();

	const onLogout = async () => {
		try {
			await axiosInstance.get('/auth/logout');
			localStorage.removeItem('accessToken');
			navigate('/login');
		} catch (err: any) {
			console.error('Failed to logout');
		}
	};

	return (
		<button
			onClick={onLogout}
			className='transition-all flex items-center gap-2 p-3 pl-0 rounded-md hover:text-blue-500'
		>
			<LogOut />
			<span>Logout</span>
		</button>
		// <button onClick={onLogout}>
		// 	<div className='pointer-events-none'>
		// 		<SidebarLink
		// 			link={{ icon: 'logout', name: 'Logout', path: '/logout' }}
		// 		/>
		// 	</div>
		// </button>
	);
}
