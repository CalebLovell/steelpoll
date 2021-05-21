import { ArchiveIcon, ChartPieIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';

import { Poll } from '@utils/pollTypes';
import dayjs from 'dayjs';

const PollCard = ({ poll }: { poll: Poll }) => {
	return (
		<li key={poll.title} className='col-span-1 divide-y divide-gray-200 rounded-lg shadow bg-brand-primary'>
			<div className='flex items-center justify-between w-full p-6 space-x-6'>
				<div className='flex-1 truncate'>
					<div className='flex items-center justify-between space-x-3'>
						<h3 className='text-sm font-medium truncate text-brand-primary'>{poll?.title}</h3>
						<div className={`px-2 py-0.5 rounded-full flex ${poll?.options?.protected ? `bg-blue-100` : `bg-green-100`}`}>
							<p className={`text-xs font-medium ${poll?.options?.protected ? `text-blue-800` : `text-green-800`}`}>{poll?.options?.protected ? `Users Only` : `Open To All`}</p>
							{poll?.options?.protected ? (
								<LockClosedIcon className={`w-4 h-4 ml-1 ${poll?.options?.protected ? `text-blue-800` : `text-green-800`}`} aria-hidden='true' />
							) : (
								<LockOpenIcon className={`w-4 h-4 ml-1 ${poll?.options?.protected ? `text-blue-800` : `text-green-800`}`} aria-hidden='true' />
							)}
						</div>
					</div>
					<p className='mt-1 text-sm truncate text-brand-secondary'>{`Created on ${dayjs(poll?.createdAt).format(`MMMM D, YYYY`)}`}</p>
				</div>
			</div>
			<div>
				<div className='flex -mt-px divide-x divide-gray-200'>
					<div className='flex flex-1 w-0'>
						<a
							href={`poll/${poll?.id}`}
							className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500'
						>
							<ArchiveIcon className='w-5 h-5 text-brand-primary' aria-hidden='true' />
							<span className='ml-3 text-brand-primary'>Vote</span>
						</a>
					</div>
					<div className='flex flex-1 w-0 -ml-px'>
						<a
							href={`poll/${poll?.id}/results`}
							className='relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500'
						>
							<ChartPieIcon className='w-5 h-5 text-brand-primary' aria-hidden='true' />
							<span className='ml-3 text-brand-primary'>Results</span>
						</a>
					</div>
				</div>
			</div>
		</li>
	);
};

export const Polls = ({ polls }: { polls: Poll[] | undefined }) => {
	return (
		<div>
			<h1 className='mb-4 text-2xl font-medium text-brand-primary'>Explore Polls</h1>
			<ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{polls?.reverse().map(poll => (
					<PollCard key={poll?.id} poll={poll} />
				))}
			</ul>
		</div>
	);
};
