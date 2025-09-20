import '@mantine/core/styles.css';
import { TextInput } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { setNavigate } from './lib/navigate';

function App() {
	const navigate = useNavigate();
	setNavigate(navigate);

	return (
		<main className='flex items-start'>
			<Sidebar />
			<section className='p-5'>
				<h1 className='text-blue-500'>Hello World!</h1>
				<TextInput label='Your name' placeholder='Your name' />
				<TextInput label='Email' placeholder='Email' mt='md' />
				<div>
					<Outlet />
				</div>
			</section>
		</main>
	);
}

export default App;
