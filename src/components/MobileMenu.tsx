import * as React from 'react';

import FocusLock from 'react-focus-lock';
import { Link } from '@components/Link';
import { Logo } from '@components/Logo';
import { MobileMenuButton } from '@components/MobileMenuButton';
import { useGlobalDispatch } from './GlobalProvider';
import useKeypress from 'react-use-keypress';
import { useTranslation } from 'react-i18next';

export const MobileMenu = () => {
	const globalDispatch = useGlobalDispatch();
	const { t } = useTranslation(`common`);

	useKeypress([`Escape`], (event: KeyboardEvent) => {
		if (event.key === `Escape`) globalDispatch({ type: `SET_MOBILE_NAV_OPEN`, payload: false });
	});

	return (
		<FocusLock>
			<div className='absolute inset-x-0 top-0 z-20 m-2 transition origin-top-right transform'>
				<div className='bg-white divide-y-2 rounded-lg shadow-lg min-height-mobile divide-gray-50 dark:divide-transparent dark:bg-brand-primary-base'>
					<div className='flex items-center justify-between p-2'>
						<Logo label={t(`header.home`)} />
						<MobileMenuButton />
					</div>
					<nav className='flex flex-col items-start p-2 space-y-2'>
						<Link href='/about' label='About' variant='mobile' />
						<Link href='/blog' label='Blog' variant='mobile' />
						<Link href='/contact' label='Contact' variant='mobile' />
					</nav>
					<div className='flex flex-col p-2'>
						<Link href='/signup' label='Sign up' variant='button' />
					</div>
					<div className='flex items-center justify-center p-2'>
						<p className='pr-2 font-medium text-center text-gray-500 dark:text-white'>Already have an account?</p>
						<a
							href='/signin'
							className='p-1 text-base font-semibold rounded-md text-brand-accent-base hover:text-brand-accent-dark focus-brand'
						>
							Sign in
						</a>
					</div>
				</div>
			</div>
		</FocusLock>
	);
};
