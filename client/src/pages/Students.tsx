import ImportStudentsButton from '../components/buttons/ImportStudentsButton';
import Header from '../components/ui/header';

export default function Students() {
	return (
		<div className='flex flex-col gap-5'>
			<div className='w-full bg-[#242424] p-5 rounded-xl flex items-center justify-between'>
				<Header>Students</Header>
			</div>
			<div className='w-[400px]'>
				<ImportStudentsButton />
			</div>
		</div>
	);
}
