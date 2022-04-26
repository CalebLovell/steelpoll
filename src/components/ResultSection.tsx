import * as React from 'react';

import { ArchiveIcon, ClipboardCheckIcon, ClipboardCopyIcon, RefreshIcon } from '@heroicons/react/solid';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from 'next/link';
import { LoadingSpinner } from './LoadingSpinner';
import { ResultsTable } from '@components/ResultsTable';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicChart = dynamic(() => import(`@components/PieChart`).then(mod => mod.PieChart), {
	loading: () => (
		<div className='flex items-center justify-center w-full h-full'>
			<LoadingSpinner />
		</div>
	),
	ssr: false,
});

export const ResultSection = ({ title, poll, votesCast, results }) => {
	const [copied, setCopied] = React.useState(false);
	const router = useRouter();
	// @ts-ignore
	const { pollId }: { pollId: string } = router.query;

	const winners = results?.votes?.filter(vote => {
		const isWinner = results?.winners?.includes(vote.choiceId);
		return isWinner ? vote : null;
	});

	const plural = winners.length > 1;

	return (
		<section className='w-full p-4 rounded-md sm:p-4 bg-brand-secondary'>
			<div className='flex items-center'>
				<div className='w-14' />
				<p className='mb-2 ml-auto mr-1 text-lg font-medium text-center sm:mr-0 sm:text-2xl text-brand-primary'>{title}</p>
				<p className='inline-flex items-center pb-2 ml-auto tracking-wider text-red-500 uppercase'>
					Live
					<svg aria-hidden='true' className='inline-flex items-center w-4 h-4 ml-2 text-center' viewBox='0 0 576 512'>
						<path
							fill='currentColor'
							d='M40.55 0c-6.2 0-11.97 3.53-14.54 9.17C9.45 45.43 0 85.59 0 128c0 42.4 9.45 82.57 26.01 118.83 2.58 5.64 8.35 9.17 14.54 9.17 11.7 0 19.2-12.08 14.34-22.72C40.26 201.15 32 165.55 32 128s8.26-73.15 22.9-105.28C59.75 12.08 52.26 0 40.55 0zm285.89 178.84C341.87 167.14 352 148.81 352 128c0-35.3-28.72-64-64-64s-64 28.7-64 64c0 20.92 10.23 39.35 25.79 51.03l-137.13 315.4c-1.76 4.05.1 8.77 4.15 10.53l14.7 6.38c4.05 1.76 8.76-.1 10.52-4.15L209.51 352h157.3l67.47 155.19c1.76 4.05 6.47 5.91 10.52 4.15l14.7-6.38a8.005 8.005 0 0 0 4.15-10.53L326.44 178.84zM288 96c17.67 0 32 14.33 32 32s-14.33 32-32 32-32-14.33-32-32 14.33-32 32-32zm-64.58 224l56.03-128.87c2.82.38 5.62.87 8.55.87 3.03 0 5.94-.49 8.86-.9L352.9 320H223.42zM118.99 192c10.7 0 18.1-10.24 15.15-20.53-3.97-13.82-6.14-28.38-6.14-43.47s2.17-29.65 6.14-43.47C137.09 74.24 129.69 64 118.99 64h-.15c-6.93 0-13.28 4.42-15.21 11.07C98.73 91.89 96 109.62 96 128s2.73 36.11 7.63 52.93c1.94 6.66 8.28 11.07 15.21 11.07h.15zM457.16 64h-.15c-10.7 0-18.1 10.24-15.15 20.53C445.83 98.35 448 112.91 448 128s-2.17 29.65-6.14 43.47c-2.95 10.29 4.45 20.53 15.15 20.53h.15c6.94 0 13.28-4.42 15.22-11.07 4.89-16.82 7.62-34.54 7.62-52.93s-2.73-36.11-7.62-52.93C470.44 68.42 464.09 64 457.16 64zm92.83-54.83C547.41 3.53 541.65 0 535.45 0c-11.7 0-19.19 12.08-14.34 22.72C535.74 54.85 544 90.45 544 128s-8.26 73.15-22.9 105.28c-4.85 10.65 2.64 22.72 14.34 22.72 6.2 0 11.97-3.53 14.54-9.17C566.56 210.57 576 170.4 576 128c0-42.41-9.44-82.57-26.01-118.83z'
						/>
					</svg>
				</p>
			</div>
			<p className='mb-2 font-semibold text-center text-md text-brand-secondary'>Total Votes: {votesCast}</p>
			<p className='mb-4 font-normal text-center text-md text-brand-primary'>{`Winner${plural ? `s` : ``}: ${winners?.map(
				winner => ` ${poll?.choices?.find(x => x.id === winner.choiceId)?.choice}`
			)}`}</p>
			<div className='flex flex-col items-center justify-between space-y-4 md:space-y-0 md:flex-row md:items-start'>
				<ResultsTable results={results} poll={poll} />
				<div className='w-full max-w-sm ml-0 md:ml-4'>
					<DynamicChart data={results?.votes} />
				</div>
			</div>
			<div className='flex flex-col justify-between mt-4 space-y-2 sm:space-y-0 sm:flex-row'>
				<div className='flex flex-col justify-center md:flex-row'>
					<button
						type='button'
						onClick={() => location.reload()}
						className='flex items-center justify-center px-4 py-1 text-sm font-normal text-center sm:mr-6 md:mr-24 btn-primary'
					>
						Manually Refresh
						<RefreshIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
					</button>
				</div>
				<div className='flex flex-col md:flex-row'>
					<Link href={`/poll/${pollId}`}>
						<a href={`/poll/${pollId}`} className='flex items-center justify-center px-4 py-1 text-sm font-normal text-center btn-primary'>
							Back to Vote
							<ArchiveIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
						</a>
					</Link>
					<CopyToClipboard text={`https://www.steelpoll.com/poll/${pollId}`}>
						<button
							type='button'
							onClick={() => setCopied(true)}
							className='flex items-center justify-center px-4 py-1 mt-2 text-sm font-normal text-center md:mt-0 md:ml-3 btn-primary'
						>
							<span className='block'>Copy Link</span>
							{copied ? (
								<ClipboardCheckIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
							) : (
								<ClipboardCopyIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
							)}
						</button>
					</CopyToClipboard>
				</div>
			</div>
		</section>
	);
};
