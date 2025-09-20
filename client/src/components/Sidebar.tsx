import {
	LayoutDashboard,
	Building2,
	CalendarDays,
	ClipboardList,
	GraduationCap,
	Users,
	BarChart3,
	Settings,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

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
	return (
		<aside className='p-5 border-r border-r-neutral-600 min-h-screen'>
			<div className='flex flex-col justify-between gap-5'>
				<div className='shrink-0 flex gap-2 items-center'>
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
									isActive
										? 'text-blue-500'
										: 'text-muted-foreground hover:text-blue-500'
								}`;
							}}
						>
							<item.icon className='w-5 h-5' />
							<span>{item.title}</span>
						</NavLink>
					))}
				</div>
			</div>
		</aside>
	);
}
