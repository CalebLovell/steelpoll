import * as React from 'react';

import { Menu, Transition } from '@headlessui/react';

import { UserCircleIcon } from '@heroicons/react/outline';
import { useLogout } from '@hooks/authentication';
import { useTranslation } from 'react-i18next';

export const ProfileDropdown = () => {
	const { mutate: logout } = useLogout();
	const { t: common } = useTranslation(`common`);
	return (
		<Menu as='div' className='relative flex-shrink-0 ml-4'>
			{({ open }) => (
				<>
					<Menu.Button className='flex p-2 text-sm rounded-md text-brand-primary hover-brand focus-brand-without-border'>
						<span className='sr-only'>{common(`navigation.header.userMenuToggle`)}</span>
						<UserCircleIcon className='w-6 h-6' />
					</Menu.Button>
					<Transition
						show={open}
						as={React.Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items
							static
							className='absolute right-0.5 w-48 py-1 mt-2 origin-top-right bg-brand-secondary rounded-md shadow-lg focus-brand-without-border'
						>
							<Menu.Item
								as='a'
								href='/account'
								className='block w-full px-4 py-2 text-sm text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-700 hover-brand'
							>
								{common(`navigation.auth.account.title`)}
							</Menu.Item>
							<Menu.Item
								as='button'
								type='button'
								onClick={() => logout()}
								className='block w-full px-4 py-2 text-sm text-left text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-700 hover-brand'
							>
								{common(`navigation.auth.logout.title`)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};
