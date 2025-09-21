import {
	LayoutDashboard,
	Building2,
	CalendarDays,
	ClipboardList,
	GraduationCap,
	Users,
	BarChart3,
	Settings,
	Moon,
	Sun,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useThemeStore } from '../store/theme';
import LogoutButton from './buttons/LogoutButton';

type SidebarItem = {
	title: string;
	path: string;
	icon: React.ElementType;
};

export const adminSidebarItems: SidebarItem[] = [
	{
		title: 'Dashboard',
		path: '/admin/dashboard',
		icon: LayoutDashboard,
	},
	{
		title: 'Organizations',
		path: '/admin/organizations',
		icon: Building2,
	},
	{
		title: 'Events',
		path: '/admin/events',
		icon: CalendarDays,
	},
	{
		title: 'Attendance Records',
		path: '/admin/attendance',
		icon: ClipboardList,
	},
	{
		title: 'Students',
		path: '/admin/students',
		icon: GraduationCap,
	},
	{
		title: 'Members',
		path: '/admin/members',
		icon: Users,
	},
	{
		title: 'Reports',
		path: '/admin/reports',
		icon: BarChart3,
	},
	{
		title: 'Settings',
		path: '/admin/settings',
		icon: Settings,
	},
];

export default function Sidebar() {
	const { theme, setTheme } = useThemeStore((state) => state);

	const onThemeClick = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<aside className='p-5 border-r border-r-neutral-600 min-h-screen'>
			<div className='flex flex-col justify-between gap-10'>
				<div className='flex flex-col gap-2 items-start'>
					<div className='flex gap-2 items-center'>
						<img
							className='shrink-0 size-12 md:size-16 rounded-full border'
							src='/images/SBO_LOGO.jpg'
							alt=''
						/>
						<div className='hidden md:flex flex-col text-muted-foreground'>
							<h4 className='text-3xl font-bold'>SEATS</h4>
							<p className='text-xs'>Student Event Attendance</p>
							<p className='text-xs'>Tracking System</p>
						</div>
					</div>

					<div>
						{adminSidebarItems.map((item) => (
							<NavLink
								key={item.title}
								to={item.path}
								className={({ isActive }) => {
									return `transition-all flex items-center gap-2 p-3 pl-0 rounded-md ${
										isActive ? 'text-blue-500' : 'hover:text-blue-500'
									}`;
								}}
							>
								<item.icon className='w-5 h-5' />
								<span>{item.title}</span>
							</NavLink>
						))}
					</div>
				</div>

				<div>
					<button
						onClick={onThemeClick}
						className='transition-all flex items-center gap-2 p-3 pl-0 rounded-md hover:text-blue-500'
					>
						{theme === 'dark' ? <Moon /> : <Sun />}
						<span>Toggle Theme</span>
					</button>
					<LogoutButton />
				</div>
			</div>
		</aside>
	);
}
