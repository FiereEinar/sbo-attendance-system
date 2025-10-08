import Header from '../components/ui/header';

export default function Dashboard() {
	return (
		<div className='flex flex-col gap-5'>
			<div className='w-full bg-[#242424] p-5 rounded-xl flex items-center justify-between'>
				<Header>Dashboard</Header>
			</div>
		</div>
	);
}
