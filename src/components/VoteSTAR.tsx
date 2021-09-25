import * as React from 'react';

import { ChartPieIcon, ClipboardCheckIcon, ClipboardCopyIcon } from '@heroicons/react/solid';

import InputNumber from 'react-input-number';
import CopyToClipboard from 'react-copy-to-clipboard';
import Link from 'next/link';
import { Poll } from '@utils/pollTypes';
import { useRouter } from 'next/router';

export const VoteSTAR = ({ poll, STAR, setSTAR }: { poll: Poll | undefined; STAR; setSTAR }) => {
	const [copied, setCopied] = React.useState(false);
	const router = useRouter();
	// @ts-ignore
	const { pollId }: { pollId: string } = router.query;

	const onChange = (e, index) => {
		const currentState = STAR;
		const newArray: any[] = [];
		currentState?.forEach((x, i) => {
			if (i === index) {
				const newObj = { ...x, value: Number(e) };
				newArray.push(newObj);
			} else {
				newArray.push(x);
			}
		});
		setSTAR(newArray);
	};

	return (
		<div>
			<p className='mb-2 text-lg font-medium text-center text-brand-primary sm:text-2xl'>Score Then Automatic Runoff (STAR) Voting</p>
			<p className='mb-4 font-normal text-center text-md text-brand-secondary'>
				Assign each choice a value from 1 to 5. 1 is the lowest score, 5 is the highest. All the votes will be added together. The top two choices
				will participate in an instant runoff round, where the option that more voters preferred between those two will become the winner!
			</p>
			<ul className='border border-gray-300 divide-y divide-gray-300 dark:border-gray-700 dark:divide-gray-700'>
				{poll?.choices?.map((choice, i) => (
					<li key={choice?.id} className='flex items-center p-4 space-x-4 bg-brand-primary'>
						<InputNumber
							className='w-20 border-gray-300 rounded-md bg-brand-secondary dark:border-gray-700 text-brand-primary'
							name={`choice-${i + 1}`}
							type='number'
							value={STAR ? STAR[i]?.value : 3}
							onChange={e => onChange(e, i)}
							min={1}
							max={5}
						/>
						<label htmlFor={`choice-${i + 1}`} className='sr-only'>
							Choice {i + 1}
						</label>
						<p className='text-brand-primary'>{choice?.choice}</p>
					</li>
				))}
			</ul>
			<div className='flex flex-col justify-end mt-4 md:flex-row'>
				<Link href={`/poll/${pollId}/results`}>
					<a href={`/poll/${pollId}/results`} className='flex items-center justify-center px-4 py-1 text-sm font-normal text-center btn-primary'>
						View Results
						<ChartPieIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
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
	);
};
