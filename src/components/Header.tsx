import * as React from 'react';

import { AboutDropdown } from './AboutDropdown';
import { AuthUserContext } from 'next-firebase-auth';
import { DarkModeButton } from './DarkModeButton';
import { Link } from './Link';
import { Logo } from './Logo';
import { MobileMenuButton } from './MobileMenuButton';
import { ProfileDropdown } from './ProfileDropdown';
import { useTranslation } from 'react-i18next';

// import { LanguageButton } from './LanguageButton';

export const Header = ({ authUser }: { authUser: AuthUserContext }) => {
	const { t: common } = useTranslation(`common`);
	return (
		<>
			<div className='h-1 bg-brand-gradient' />
			<header className='container flex items-center justify-center shadow-md h-14 bg-brand-secondary'>
				<div className='w-full max-w-7xl'>
					<div className='flex items-center justify-between h-full md:hidden'>
						<MobileMenuButton />
						<div className='flex items-center space-x-2'>
							{/* <LanguageButton /> */}
							<DarkModeButton />
						</div>
					</div>
					<nav className='items-center justify-between hidden h-full md:flex'>
						<div className='flex items-center md:space-x-2'>
							<Logo label={common(`navigation.website.home.title`)} />
							<Link href='/create' label={common(`navigation.website.create.title`)} variant='link' />
							<Link href='/polls' label={common(`navigation.website.polls.title`)} variant='link' />
							<AboutDropdown />
						</div>
						<div className='flex items-center md:space-x-2 xl:space-x-10'>
							<div className='flex items-center space-x-2'>
								{/* <LanguageButton /> */}
								<DarkModeButton />
							</div>
							<div className='flex items-center md:space-x-2'>
								{!!authUser.id ? (
									<ProfileDropdown />
								) : (
									<>
										<Link href='/login' label={common(`navigation.auth.login.title`)} variant='link' />
										<Link href='/signup' label={common(`navigation.auth.signup.title`)} variant='button' />
									</>
								)}
							</div>
						</div>
					</nav>
				</div>
			</header>
		</>
	);
};
