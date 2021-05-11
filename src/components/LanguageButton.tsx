import * as React from 'react';

import { GlobeAltIcon } from '@heroicons/react/solid';
import { Listbox } from '@headlessui/react';
import { useRouter } from 'next/router';

const languages = [
	{ id: 1, name: `English`, locale: `en` },
	{ id: 2, name: `Español`, locale: `es` },
	{ id: 3, name: `Português`, locale: `pt` },
];

export const LanguageButton = () => {
	const router = useRouter();

	const onChange = lang => {
		router.push(router.pathname, router.pathname, { locale: lang });
	};

	return (
		<Listbox value={router.locale} onChange={lang => onChange(lang)} as='div' className='relative rounded-md focus-brand-without-border'>
			<Listbox.Button className='relative flex p-2 rounded-md focus-brand-without-border hover-brand text-brand-primary'>
				<span className='mr-2 font-medium'>{router?.locale?.toUpperCase()}</span>
				<GlobeAltIcon className='w-6 h-6' />
			</Listbox.Button>
			<Listbox.Options className='py-1 origin-top-right absolute right-0.5 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-brand-primary-base ring-2 ring-black ring-opacity-5'>
				{languages.map(language => (
					<Listbox.Option key={language.id} value={language.locale}>
						{({ active }) => (
							<div
								className={`px-2 py-1 cursor-default text-right font-medium text-brand-primary ${
									active ? `bg-brand-primary-light dark:bg-gray-700` : `bg-white dark:bg-brand-primary-base`
								}`}
							>
								{language.name}
							</div>
						)}
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
};
