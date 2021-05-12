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
		<Listbox value={router.locale} onChange={lang => onChange(lang)} as='div' className='relative flex-shrink-0'>
			<Listbox.Button className='relative flex p-2 rounded-md focus-brand-without-border hover-brand text-brand-primary'>
				<span className='mr-2 font-medium'>{router?.locale?.toUpperCase()}</span>
				<GlobeAltIcon className='w-6 h-6' />
			</Listbox.Button>
			<Listbox.Options className='py-1 origin-top-right absolute right-0.5 mt-2 w-48 rounded-md shadow-lg bg-brand-secondary focus-brand-without-border'>
				{languages.map(language => (
					<Listbox.Option key={language.id} value={language.locale}>
						<div className='block px-4 py-2 text-sm text-brand-primary hover-brand'>{language.name}</div>
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
};
