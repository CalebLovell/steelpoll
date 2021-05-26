import * as React from 'react';

import { Poll } from '@utils/pollTypes';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
	return classes.filter(Boolean).join(` `);
}

export const VoteFPTP = ({ poll }: { poll: Poll | undefined }) => {
	const [firstPastThePost, setFirstPastThePost] = React.useState(poll?.choices[0]);

	return (
		<RadioGroup value={firstPastThePost} onChange={setFirstPastThePost}>
			<RadioGroup.Label className='text-lg font-medium text-brand-primary'>First Past The Post (Winner Take All) Voting</RadioGroup.Label>
			<p className='text-base text-brand-secondary'>
				Select one of the available choices. Whichever has the most votes will win!
			</p>
			<div className='mt-2 bg-brand-secondary'>
				{poll?.choices?.map((choice, i) => (
					<RadioGroup.Option
						key={choice.id}
						value={choice}
						className={({ checked }) =>
							classNames(
								i === 0 ? `` : ``,
								i === poll?.choices?.length - 1 ? `` : ``,
								checked ? `bg-indigo-50 dark:bg-gray-700 z-10 border-brand-blue` : `border-gray-300 dark:border-gray-700`,
								`relative p-4 flex cursor-pointer focus:outline-none border`
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
												: `border-gray-300`,
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
	);
};
