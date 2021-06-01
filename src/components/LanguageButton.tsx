import * as React from 'react';

import { GlobeAltIcon } from '@heroicons/react/solid';
import { Listbox } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export const LanguageButton = () => {
	const router = useRouter();
	const { t: common } = useTranslation(`common`);
	const languages = [
		{ id: 1, name: common(`languages.english.name`), locale: common(`languages.english.locale`) },
		{ id: 2, name: common(`languages.spanish.name`), locale: common(`languages.spanish.locale`) },
		{ id: 3, name: common(`languages.portuguese.name`), locale: common(`languages.portuguese.locale`) },
	];

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
					<Listbox.Option
						key={language.id}
						value={language.locale}
						className={({ active }) => `${active ? `bg-gray-100 dark:bg-gray-700` : ``}`}
					>
						<div className='block px-4 py-2 text-sm hover-brand text-brand-primary'>{language.name}</div>
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
};
