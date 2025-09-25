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

			<section className='bg-[#0A0A0A] p-5 w-full min-h-screen'>
				<Outlet />
			</section>
		</main>
	);
}

export default App;
