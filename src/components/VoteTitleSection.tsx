import * as React from 'react';

import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';

import { Poll } from '@utils/pollTypes';
import { User } from '@utils/userTypes';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const localeObject = {
	name: `es`, // name String
	weekdays: `Domingo_Lunes ...`.split(`_`), // weekdays Array
	weekdaysShort: `Sun_M`.split(`_`), // OPTIONAL, short weekdays Array, use first three letters if not provided
	weekdaysMin: `Su_Mo`.split(`_`), // OPTIONAL, min weekdays Array, use first two letters if not provided
	weekStart: 1, // OPTIONAL, set the start of a week. If the value is 1, Monday will be the start of week instead of Sunday。
	yearStart: 4, // OPTIONAL, the week that contains Jan 4th is the first week of the year.
	months: `Enero_Febrero ... `.split(`_`), // months Array
	monthsShort: `Jan_F`.split(`_`), // OPTIONAL, short months Array, use first three letters if not provided
	ordinal: n => `${n}º`, // ordinal Function (number) => return number + output
	formats: {
		// abbreviated format options allowing localization
		LTS: `h:mm:ss A`,
		LT: `h:mm A`,
		L: `MM/DD/YYYY`,
		LL: `MMMM D, YYYY`,
		LLL: `MMMM D, YYYY h:mm A`,
		LLLL: `dddd, MMMM D, YYYY h:mm A`,
		// lowercase/short, optional formats for localization
		l: `D/M/YYYY`,
		ll: `D MMM, YYYY`,
		lll: `D MMM, YYYY h:mm A`,
		llll: `ddd, MMM D, YYYY h:mm A`,
	},
	relativeTime: {
		// relative time format strings, keep %s %d as the same
		future: `in %s`, // e.g. in 2 hours, %s been replaced with 2hours
		past: `%s ago`,
		s: `a few seconds`,
		m: `a minute`,
		mm: `%d minutes`,
		h: `an hour`,
		hh: `%d hours`, // e.g. 2 hours, %d been replaced with 2
		d: `a day`,
		dd: `%d days`,
		M: `a month`,
		MM: `%d months`,
		y: `a year`,
		yy: `%d years`,
	},
	meridiem: (hour) => {
		// OPTIONAL, AM/PM
		return hour > 12 ? `PM` : `AM`;
	},
};

dayjs.locale(localeObject, undefined, true);

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
