import * as React from 'react';

import { ChartPieIcon, ClipboardCheckIcon, ClipboardCopyIcon } from '@heroicons/react/solid';

import CopyToClipboard from 'react-copy-to-clipboard';
import Link from 'next/link';
import { Poll } from '@utils/pollTypes';
import { RadioGroup } from '@headlessui/react';
import { useRouter } from 'next/router';

function classNames(...classes) {
	return classes.filter(Boolean).join(` `);
}

export const VoteFPTP = ({ poll, firstPastThePost, setFirstPastThePost }: { poll: Poll | undefined; firstPastThePost; setFirstPastThePost }) => {
	const [copied, setCopied] = React.useState(false);
	const router = useRouter();
	// @ts-ignore
	const { pollId }: { pollId: string } = router.query;

	return (
		<>
			<RadioGroup value={firstPastThePost} onChange={setFirstPastThePost}>
				<div className='mb-2 text-center'>
					<RadioGroup.Label className='text-lg font-medium text-brand-primary sm:text-2xl'>
						First Past The Post (Winner Take All) Voting
					</RadioGroup.Label>
				</div>
				<p className='mb-4 font-normal text-center text-md text-brand-secondary'>
					Select one of the available choices. Whichever has the most votes will win!
				</p>
				<div className='mt-2 border border-gray-300 divide-y divide-gray-300 dark:border-gray-700 dark:divide-gray-700 bg-brand-primary'>
					{poll?.choices?.map((choice, i) => (
						<RadioGroup.Option
							key={choice.id}
							value={choice}
							className={({ checked }) =>
								classNames(
									i === 0 ? `` : ``,
									i === poll?.choices?.length - 1 ? `` : ``,
									checked ? `bg-indigo-100 dark:bg-gray-700` : ``,
									`relative p-4 flex cursor-pointer focus:outline-none`
								)
							}
						>
							{({ checked }) => (
								<div className='flex space-x-4'>
									<div className='flex items-center'>
										<span
											className={classNames(
												checked
													? `bg-brand-blue border-white dark:border-gray-700 outline-none ring-2 ring-offset-1 ring-brand-blue dark:ring-offset-gray-700`
													: `border-gray-500`,
												`h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center`
											)}
											aria-hidden='true'
										>
											<span className={classNames(checked ? `bg-white dark:bg-gray-700` : ``, `rounded-full w-1.5 h-1.5`)} />
										</span>
									</div>
									<div className='flex flex-col'>
										<RadioGroup.Label
											as='span'
											className={classNames(checked ? `text-brand-primary` : `text-brand-primary`, `block text-sm font-medium`)}
										>
											{choice?.choice}
										</RadioGroup.Label>
									</div>
								</div>
							)}
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
			<div className='flex flex-col justify-end mt-4 md:flex-row'>
				<Link href={`/poll/${pollId}/results`}>
					<a href={`/poll/${pollId}/results`} className='flex items-center justify-center px-4 py-1 text-sm font-normal text-center btn-primary'>
						View Results
						<ChartPieIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
					</a>
				</Link>
				<CopyToClipboard text={`www.steelpoll.com/poll/${pollId}`}>
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
		</>
	);
};
