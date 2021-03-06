import * as React from 'react';

import { MoonIcon, SunIcon } from '@heroicons/react/solid';

import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

export const DarkModeButton = () => {
	const [mounted, setMounted] = React.useState(false);
	const { theme, setTheme } = useTheme();
	const { t: common } = useTranslation(`common`);

	// Wait for theme to load
	React.useEffect(() => setMounted(true), []);

	return (
		<button
			name='dark-mode-toggle'
			aria-label={common(`header.themeToggle`)}
			type='button'
			className='p-2 rounded-md focus-brand-without-border hover-brand text-brand-primary'
			onClick={() => setTheme(theme === `dark` ? `light` : `dark`)}
		>
			{mounted && (theme === `dark` ? <SunIcon className='w-6 h-6' /> : <MoonIcon className='w-6 h-6' />)}
		</button>
	);
};
