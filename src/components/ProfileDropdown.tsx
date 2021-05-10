import * as React from 'react';

import { Menu, Transition } from '@headlessui/react';

import { UserCircleIcon } from '@heroicons/react/outline';
import { useUser } from '@hooks/user';

const userNavigation = [
	{ name: `Your Profile`, href: `/account` },
	{ name: `Logout`, href: `/logout` },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(` `);
}

export const ProfileDropdown = () => {
	const { data: user } = useUser();
	return (
		<Menu as='div' className='relative flex-shrink-0 ml-4'>
			{({ open }) => (
				<>
					<Menu.Button className='flex text-sm text-white rounded-full focus:outline-none focus:bg-light-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-900 focus:ring-white'>
						<span className='sr-only'>Open user menu</span>
						{user?.photoUrl ? (
							<img className='w-8 h-8 rounded-full' src={user?.photoUrl} alt='profile face' />
						) : (
							<UserCircleIcon className='w-6 h-6 text-black dark:text-white' />
						)}
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
							className='absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
						>
							{userNavigation.map(item => (
								<Menu.Item key={item.name}>
									{({ active }) => (
										<a href={item.href} className={classNames(active ? `bg-gray-100` : ``, `block py-2 px-4 text-sm text-gray-700`)}>
											{item.name}
										</a>
									)}
								</Menu.Item>
							))}
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};
