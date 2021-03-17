import { PollWithId } from '@utils/pollTypes';

export const PollCard = ({ poll }: { poll: PollWithId }) => {
	return (
		<li>
			<a href={`poll/${poll.id}`} className='flex col-span-1 rounded-md shadow-sm'>
				<div className='flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white bg-pink-600 rounded-l-md'>
					<svg className='inline w-8' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
						/>
					</svg>
				</div>
				<div className='flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md'>
					<div className='flex-1 px-4 py-2 text-sm truncate'>
						{poll.title}
						<p className='text-gray-500'>{poll.description}</p>
					</div>
				</div>
			</a>
		</li>
	);
};
