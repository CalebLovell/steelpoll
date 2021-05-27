import * as React from 'react';

import { Poll } from '@utils/pollTypes';
import { User } from '@utils/userTypes';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import { useTranslation } from 'react-i18next';
dayjs.extend(relativeTime);

export const VoteTitleSection = ({ poll, user }: { poll: Poll | undefined; user: User | null | undefined }) => {
	const time = poll?.createdAt ? dayjs(poll?.createdAt).fromNow() : ``;

	return (
		<div>
			<h1 className='text-3xl font-medium text-center text-brand-primary'>{poll?.title}</h1>
			<h2 className='mt-2 text-base font-normal text-center text-brand-primary'>{poll?.description}</h2>
			<p className='mt-2 text-base text-center text-brand-secondary'>
				Poll created by {user?.name ? user?.name : `Anonymous`} {time}
			</p>
		</div>
	);
};