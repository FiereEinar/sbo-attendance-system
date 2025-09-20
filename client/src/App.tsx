import '@mantine/core/styles.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { setNavigate } from './lib/navigate';

function App() {
	const navigate = useNavigate();
	setNavigate(navigate);

	return (
		<main className='flex items-start min-h-screen '>
			<Sidebar />
			<section className='p-5'>
				<h1 className='text-blue-500'>Hello World!</h1>
				<div>
					<Outlet />
				</div>
			</section>
		</main>
	);
}

export default App;
