import * as React from 'react';

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
		<Listbox value={router.locale} onChange={lang => onChange(lang)} as='div' className='relative rounded-md focus-brand'>
			<Listbox.Button className='relative flex p-2 rounded-md focus-brand hover-brand text-brand-accent-base hover:text-white hover:dark:text-brand-accent-base'>
				<span className='mr-2 font-medium'>{router?.locale?.toUpperCase()}</span>
				<svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z'
						clipRule='evenodd'
					/>
				</svg>
			</Listbox.Button>
			<Listbox.Options className='py-1 origin-top-right absolute right-0.5 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-brand-primary-base ring-2 ring-black ring-opacity-5'>
				{languages.map(language => (
					<Listbox.Option key={language.id} value={language.locale}>
						{({ active }) => (
							<div
								className={`px-2 py-1 cursor-default text-right font-medium text-brand-accent-base ${
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
