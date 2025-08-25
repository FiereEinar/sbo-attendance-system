import '@mantine/core/styles.css';
import { Button, MantineProvider, TextInput } from '@mantine/core';
import { useState } from 'react';

function App() {
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');

	const onThemeClick = () => {
		console.log('Clicked! theme is ', theme);
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	return (
		<MantineProvider forceColorScheme={theme}>
			<div className='p-5'>
				<h1 className='text-blue-500'>Hello World!</h1>
				<TextInput label='Your name' placeholder='Your name' />
				<TextInput label='Email' placeholder='Email' mt='md' />
				<Button onClick={onThemeClick}>Click Me!</Button>
			</div>
		</MantineProvider>
	);
}

export default App;
