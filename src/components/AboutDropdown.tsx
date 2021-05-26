import * as React from 'react';

import { Popover, Transition } from '@headlessui/react';

import { ChevronDownIcon } from '@heroicons/react/solid';

const options = [
	{ name: `Tech Stack`, description: `Learn about how this site was built`, href: `/tech` },
	{ name: `Terms of Use`, description: `Learn about the rules for using this site`, href: `/terms` },
	{ name: `Privacy Policy`, description: `Learn how this site protects your privacy`, href: `/privacy` },
];

export const AboutDropdown = () => {
	return (
		<Popover className='relative'>
			{({ open }) => (
				<>
					<Popover.Button className='inline-flex items-center p-2 ml-2 text-base font-medium rounded-md text-brand-primary group hover-brand focus-brand-without-border'>
						<span>About</span>
						<ChevronDownIcon className='w-5 h-5 ml-2 text-brand-primary group-hover:text-brand-pink' aria-hidden='true' />
					</Popover.Button>
					<Transition
						show={open}
						as={React.Fragment}
						enter='transition ease-out duration-200'
						enterFrom='opacity-0 translate-y-1'
						enterTo='opacity-100 translate-y-0'
						leave='transition ease-in duration-150'
						leaveFrom='opacity-100 translate-y-0'
						leaveTo='opacity-0 translate-y-1'
					>
						<Popover.Panel static className='absolute z-10 w-screen max-w-xs px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0'>
							<div className='flex flex-col p-4 space-y-4 overflow-hidden rounded-lg shadow-lg bg-brand-secondary'>
								{options.map(item => (
									<a
										key={item.name}
										href={item.href}
										className='p-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 dark:hover:bg-brand-mediumGrey focus-brand-without-border'
									>
										<p className='text-base font-medium text-brand-primary'>{item.name}</p>
										<p className='mt-1 text-sm text-brand-secondary'>{item.description}</p>
									</a>
								))}
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};
