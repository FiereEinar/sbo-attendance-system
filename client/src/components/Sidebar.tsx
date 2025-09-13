export default function Sidebar() {
	return (
		<aside className='p-5 shrink-0 flex gap-2 items-center'>
			<img
				className='shrink-0 size-12 md:size-16 rounded-full border'
				src='/images/SBO_LOGO.jpg'
				alt=''
			/>
			<div className='hidden md:flex flex-col text-muted-foreground'>
				<h4 className='text-3xl font-bold'>SIMS</h4>
				<p className='text-xs'>Student Event Attendance</p>
				<p className='text-xs'>Tracking System</p>
			</div>
		</aside>
	);
}
