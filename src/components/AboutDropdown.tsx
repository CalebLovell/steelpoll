import * as React from 'react';

import { Popover, Transition } from '@headlessui/react';

import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const AboutDropdown = () => {
	const { t: common } = useTranslation(`common`);

	const options = [
		{ name: common(`navigation.about.tech.title`), description: common(`navigation.about.tech.description`), href: `/tech` },
		{ name: common(`navigation.legal.privacy.title`), description: common(`navigation.legal.privacy.description`), href: `/privacy` },
		{ name: common(`navigation.legal.terms.title`), description: common(`navigation.legal.terms.description`), href: `/terms` },
	];
	return (
		<Popover className='relative'>
			{({ open }) => (
				<>
					<Popover.Button className='inline-flex items-center p-2 ml-2 text-base font-medium rounded-md text-brand-primary group hover-brand focus-brand-without-border'>
						<span>{common(`navigation.about.title`)}</span>
						<ChevronDownIcon className='w-5 h-5 ml-2 text-brand-primary group-hover:text-brand-blue' aria-hidden='true' />
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
									<Link href={item.href} key={item.name}>
										<a
											href={item.href}
											className='p-2 transition duration-150 ease-in-out rounded-md hover-brand hover:bg-gray-100 dark:hover:bg-gray-700 focus-brand-without-border'
										>
											<p className='text-base font-medium text-brand-primary'>{item.name}</p>
											<p className='mt-1 text-sm text-brand-secondary'>{item.description}</p>
										</a>
									</Link>
								))}
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};
