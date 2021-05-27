import * as React from 'react';

import FocusLock from 'react-focus-lock';
import Link from 'next/link';
import { Logo } from '@components/Logo';
import { MobileMenuButton } from '@components/MobileMenuButton';
import { Link as MyLink } from '@components/Link';
import { useAuthUser } from 'next-firebase-auth';
import { useGlobalDispatch } from './GlobalProvider';
import useKeypress from 'react-use-keypress';
import { useLogout } from '@hooks/authentication';
import { useTranslation } from 'react-i18next';

export const MobileMenu = () => {
	const globalDispatch = useGlobalDispatch();
	const { t } = useTranslation(`common`);
	const authUser = useAuthUser();
	const { mutate: logout } = useLogout();

	useKeypress([`Escape`], (event: KeyboardEvent) => {
		if (event.key === `Escape`) globalDispatch({ type: `SET_MOBILE_NAV_OPEN`, payload: false });
	});

	return (
		<FocusLock>
			<div className='absolute inset-x-0 top-0 z-20 m-2 transition origin-top-right transform'>
				<div className='divide-y-2 divide-gray-100 rounded-lg shadow-lg bg-brand-secondary min-height-mobile dark:divide-gray-700'>
					<div className='flex items-center justify-between p-2'>
						<Logo label={t(`header.home`)} />
						<MobileMenuButton />
					</div>
					<nav className='flex flex-col items-start p-2 space-y-2'>
						<MyLink href='/create' label='Create a Poll' variant='mobile' />
						<MyLink href='/polls' label='Explore Polls' variant='mobile' />
						<MyLink href='/tech' label='Tech Stack' variant='mobile' />
						<MyLink href='/terms' label='Terms of Use' variant='mobile' />
						<MyLink href='/privacy' label='Privacy Policy' variant='mobile' />
						{authUser.id && (
							<>
								<MyLink href='/account' label='Account' variant='mobile' />
								<button
									onClick={() => logout()}
									className='w-full p-2 font-medium text-left transition duration-150 ease-in-out rounded-md focus-brand-without-border hover-brand lg:px-4 text-brand-primary'
								>
									Logout
								</button>
							</>
						)}
						{!authUser.id && (
							<div className='w-full'>
								<div className='flex flex-col p-2'>
									<Link href='/signup'>
										<a href='/signup' className='p-2 font-medium text-center btn-primary'>
											Sign Up
										</a>
									</Link>
								</div>
								<div className='flex items-center justify-center p-2'>
									<p className='pr-2 font-medium text-center text-brand-secondary'>Already have an account?</p>
									<Link href='/login'>
										<a href='/login' className='p-1 text-base font-semibold rounded-md text-brand-primary focus-brand-without-border'>
											Log in
										</a>
									</Link>
								</div>
							</div>
						)}
					</nav>
				</div>
			</div>
		</FocusLock>
	);
};
