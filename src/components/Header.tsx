import * as React from 'react';

import { AboutDropdown } from './AboutDropdown';
import { AuthUserContext } from 'next-firebase-auth';
import { DarkModeButton } from './DarkModeButton';
import { Link } from './Link';
import { Logo } from './Logo';
import { MobileMenuButton } from './MobileMenuButton';
import { ProfileDropdown } from './ProfileDropdown';

export const Header = ({ authUser }: { authUser: AuthUserContext }) => {
	return (
		<>
			<div className='h-1 bg-brand-gradient' />
			<header className='container flex items-center justify-center shadow-md h-14 bg-brand-secondary'>
				<div className='w-full max-w-7xl'>
					<div className='flex items-center justify-between h-full md:hidden'>
						<MobileMenuButton />
						<DarkModeButton />
					</div>
					<nav className='items-center justify-between hidden h-full md:flex'>
						<div className='flex items-center md:space-x-2'>
							<Logo label={`SteelPoll`} />
							<Link href='/create' label={`Create a Poll`} variant='link' />
							<Link href='/polls' label={`Explore Polls`} variant='link' />
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
										<Link href='/login' label={`Log In`} variant='link' />
										<Link href='/signup' label={`Sign Up`} variant='button' />
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
