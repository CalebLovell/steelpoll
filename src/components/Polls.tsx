import { ArchiveIcon, ChartPieIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';

import Link from 'next/link';
import { Poll } from '@utils/pollTypes';
import dayjs from 'dayjs';

const PollCard = ({ poll }: { poll: Poll }) => {
	return (
		<li key={poll.id} className='col-span-1 p-4 space-y-3 rounded-lg shadow bg-brand-secondary'>
			<div className='flex items-center justify-between'>
				<h3 className='text-sm font-medium truncate text-brand-primary'>{poll?.title}</h3>
				<div className={`px-2 rounded-full flex items-center ${poll?.options?.protected ? `bg-blue-100` : `bg-green-100`}`}>
					<p className={`px-1 text-sm font-medium text-center ${poll?.options?.protected ? `text-brand-blue` : `text-green-800`}`}>
						{poll?.options?.protected ? `Users Only` : `Open To All`}
					</p>
					{poll?.options?.protected ? (
						<LockClosedIcon className={`w-4 h-4 ml-1 ${poll?.options?.protected ? `text-brand-blue` : `text-green-800`}`} aria-hidden='true' />
					) : (
						<LockOpenIcon className={`w-4 h-4 ml-1 ${poll?.options?.protected ? `text-brand-blue` : `text-green-800`}`} aria-hidden='true' />
					)}
				</div>
			</div>
			<p className='text-sm truncate text-brand-secondary'>{`Created on ${dayjs(poll?.createdAt).format(`MMMM D, YYYY`)}`}</p>
			<div className='flex justify-between'>
				<Link href={`poll/${poll?.id}`}>
					<a
						href={`poll/${poll?.id}`}
						className='flex items-center justify-center text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-4 ring-offset-brand-white dark:ring-offset-brand-lightGrey focus:ring-brand-blue'
					>
						<ArchiveIcon className='w-5 h-5 text-brand-blue' aria-hidden='true' />
						<span className='ml-3 text-brand-primary hover-brand'>Vote Now</span>
					</a>
				</Link>
				<Link href={`poll/${poll?.id}/results`}>
					<a
						href={`poll/${poll?.id}/results`}
						className='flex items-center justify-center text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-4 ring-offset-brand-white dark:ring-offset-brand-lightGrey focus:ring-brand-blue'
					>
						<ChartPieIcon className='w-5 h-5 text-brand-blue' aria-hidden='true' />
						<span className='ml-3 text-brand-primary hover-brand'>View Results</span>
					</a>
				</Link>
			</div>
		</li>
	);
};

export const Polls = ({ polls }: { polls: Poll[] | null | undefined }) => {
	return (
		<ul className='grid w-full grid-cols-1 gap-6 my-4 sm:grid-cols-2 lg:grid-cols-3'>
			{polls?.map(poll => (
				<PollCard key={poll.id} poll={poll} />
			))}
		</ul>
	);
};
