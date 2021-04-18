import { DarkModeButton } from './DarkModeButton';
import { LanguageButton } from './LanguageButton';
import { Link } from './Link';
import { Logo } from './Logo';
import { MobileMenuButton } from './MobileMenuButton';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks/user';
import { ProfileDropdown } from './ProfileDropdown';

export const Header = () => {
	const { t } = useTranslation(`common`);
	const { data: user } = useUser();
	return (
		<header className='container bg-white shadow-md dark:bg-brand-primary-base h-14'>
			<div className='flex items-center justify-between h-full md:hidden'>
				<MobileMenuButton />
				<div className='flex items-center space-x-2'>
					<LanguageButton />
					<DarkModeButton />
				</div>
			</div>
			<nav className='items-center justify-between hidden h-full md:flex'>
				<div className='flex items-center md:space-x-2'>
					<Logo label={t(`header.home`)} />
					<Link href='/create' label={t(`header.create`)} variant='link' />
					<Link href='/account' label={t(`header.account`)} variant='link' />
				</div>
				<div className='flex items-center md:space-x-2 xl:space-x-10'>
					<div className='flex items-center space-x-2'>
						<LanguageButton />
						<DarkModeButton />
					</div>
					<div className='flex items-center md:space-x-2'>
						{user ? (
							<ProfileDropdown />
						) : (
							<>
								<Link href='/login' label={t(`header.login`)} variant='link' />
								<Link href='/signup' label={t(`header.signup`)} variant='button' />
							</>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};
