import * as React from 'react';

import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';

import { Poll } from '@utils/pollTypes';
import { User } from '@utils/userTypes';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const localeObject = {
	relativeTime: {
		future: `in %s`,
		past: `%s ago`,
		s: `a few seconds`,
		m: `a minute`,
		mm: `%d minutes`,
		h: `an hour`,
		hh: `%d hours`,
		d: `a day`,
		dd: `%d days`,
		M: `a month`,
		MM: `%d months`,
		y: `a year`,
		yy: `%d years`,
	},
};

dayjs.locale(`en`, localeObject);

// import { useTranslation } from 'react-i18next';
dayjs.extend(relativeTime);

export const VoteTitleSection = ({ poll, user }: { poll: Poll | null | undefined; user: User | null | undefined }) => {
	const time = poll?.createdAt ? dayjs(poll?.createdAt).fromNow() : ``;

	return (
		<div>
			<h1 className='text-3xl font-medium text-center text-brand-primary'>
				{poll?.title}
				<span className='inline-flex items-center' title={poll?.options?.protected ? `Users Only` : `Open To All`}>
					{poll?.options?.protected ? (
						<LockClosedIcon className='w-6 h-6 ml-2' aria-hidden='true' />
					) : (
						<LockOpenIcon className='w-6 h-6 ml-2' aria-hidden='true' />
					)}
				</span>
			</h1>
			<h2 className='mt-2 text-base font-normal text-center text-brand-primary'>{poll?.description}</h2>
			<p className='mt-2 text-base text-center text-brand-secondary'>
				Poll created by {user?.name ? user?.name : `Anonymous`} {time}
			</p>
		</div>
	);
};
